import { isObservable, Subject } from 'rxjs';

import {
  Column,
  ColumnSort,
  CurrentSorter,
  EmitterType,
  FieldType,
  GridOption,
  SlickEventHandler,
  SortDirection,
  SortDirectionNumber,
  SortDirectionString,
  TreeDataOption,
} from './../models/index';
import { executeBackendCallback, refreshBackendDataset } from './backend-utilities';
import { getDescendantProperty, flattenToParentChildArray } from './utilities';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class SortService {
  private _currentLocalSorters: CurrentSorter[] = [];
  private _eventHandler: SlickEventHandler;
  private _grid: any;
  private _isBackendGrid = false;
  private httpCancelRequests$: Subject<void> = new Subject<void>(); // this will be used to cancel any pending http request
  onSortChanged = new Subject<CurrentSorter[]>();
  onSortCleared = new Subject<boolean>();

  constructor(private sharedService: SharedService) {
    this._eventHandler = new Slick.EventHandler();
  }

  /** Getter of the SlickGrid Event Handler */
  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  private get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  /** Getter of SlickGrid DataView object */
  private get _dataView(): any {
    return (this._grid && this._grid.getData) ? this._grid.getData() : {};
  }

  /**
   * Bind a backend sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param dataView SlickGrid DataView object
   */
  bindBackendOnSort(grid: any) {
    this._isBackendGrid = true;
    this._grid = grid;

    // subscribe to the SlickGrid event and call the backend execution
    this._eventHandler.subscribe(grid.onSort, this.onBackendSortChanged.bind(this));
  }

  /**
   * Bind a local sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   * @param dataView
   */
  bindLocalOnSort(grid: any) {
    this._isBackendGrid = false;
    this._grid = grid;

    this.processTreeDataInitialSort();
    this._eventHandler.subscribe(grid.onSort, this.handleLocalOnSort.bind(this));
  }

  handleLocalOnSort(_e: any, args: any) {
    if (args && (args.sortCols || args.sortCol)) {
      // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
      // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
      const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });

      // keep current sorters
      this._currentLocalSorters = []; // reset current local sorters
      if (Array.isArray(sortColumns)) {
        sortColumns.forEach((sortColumn: { sortCol: Column; sortAsc: boolean; }) => {
          if (sortColumn.sortCol) {
            this._currentLocalSorters.push({
              columnId: sortColumn.sortCol.id,
              direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
            });
          }
        });
      }

      this.onLocalSortChanged(this._grid, sortColumns);
      this.emitSortChanged(EmitterType.local);
    }
  }

  clearSortByColumnId(event: Event | undefined, columnId: string | number) {
    // get previously sorted columns
    const allSortedCols: ColumnSort[] = this.getCurrentColumnSorts();
    const sortedColsWithoutCurrent: ColumnSort[] = this.getCurrentColumnSorts(`${columnId}`);

    if (Array.isArray(allSortedCols) && Array.isArray(sortedColsWithoutCurrent) && allSortedCols.length !== sortedColsWithoutCurrent.length) {
      if (this._gridOptions.backendServiceApi) {
        this.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this._grid });
      } else if (this._dataView) {
        this.onLocalSortChanged(this._grid, sortedColsWithoutCurrent, true, true);
      } else {
        // when using customDataView, we will simply send it as a onSort event with notify
        const isMultiSort = this._gridOptions && this._gridOptions.multiColumnSort || false;
        const sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
        this._grid.onSort.notify(sortOutput);
      }

      // update the grid sortColumns array which will at the same add the visual sort icon(s) on the UI
      const updatedSortColumns: ColumnSort[] = sortedColsWithoutCurrent.map((col) => {
        return {
          columnId: col && col.sortCol && col.sortCol.id,
          sortAsc: col && col.sortAsc,
          sortCol: col && col.sortCol,
        };
      });
      this._grid.setSortColumns(updatedSortColumns); // add sort icon in UI
    }

    // when there's no more sorting, we re-sort by the default sort field, user can customize it "defaultColumnSortFieldId", defaults to "id"
    if (Array.isArray(sortedColsWithoutCurrent) && sortedColsWithoutCurrent.length === 0) {
      this.sortLocalGridByDefaultSortFieldId();
    }
  }

  /**
   * Clear Sorting
   * - 1st, remove the SlickGrid sort icons (this setSortColumns function call really does only that)
   * - 2nd, we also need to trigger a sort change
   *   - for a backend grid, we will trigger a backend sort changed with an empty sort columns array
   *   - however for a local grid, we need to pass a sort column and so we will sort by the 1st column
   * @param trigger query event after executing clear filter?
   */
  clearSorting(triggerQueryEvent = true) {
    if (this._grid && this._gridOptions && this._dataView) {
      // remove any sort icons (this setSortColumns function call really does only that)
      this._grid.setSortColumns([]);

      // we also need to trigger a sort change
      // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
      // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
      if (triggerQueryEvent) {
        if (this._isBackendGrid) {
          this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [], clearSortTriggered: true });
        } else {
          if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
            this.sortLocalGridByDefaultSortFieldId();
          }
        }
      } else if (this._isBackendGrid) {
        const backendService = this._gridOptions && this._gridOptions.backendServiceApi && this._gridOptions.backendServiceApi.service;
        if (backendService && backendService.clearSorters) {
          backendService.clearSorters();
        }
      }
    }

    // set current sorter to empty & emit a sort changed event
    this._currentLocalSorters = [];

    // emit an event when sorts are all cleared
    this.onSortCleared.next(true);
  }

  dispose() {
    // unsubscribe all SlickGrid events
    if (this._eventHandler && this._eventHandler.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
    if (isObservable(this.httpCancelRequests$)) {
      this.httpCancelRequests$.next(); // this cancels any pending http requests
      this.httpCancelRequests$.complete();
    }
  }

  /**
   * Toggle the Sorting Functionality
   * @param {boolean} isSortingDisabled - optionally force a disable/enable of the Sort Functionality? Defaults to True
   * @param {boolean} clearSortingWhenDisabled - when disabling the sorting, do we also want to clear the sorting as well? Defaults to True
   */
  disableSortFunctionality(isSortingDisabled = true, clearSortingWhenDisabled = true) {
    const prevSorting = this._gridOptions.enableSorting;
    const newSorting = !prevSorting;

    this._gridOptions.enableSorting = newSorting;
    let updatedColumnDefinitions;
    if (isSortingDisabled) {
      if (clearSortingWhenDisabled) {
        this.clearSorting();
      }
      this._eventHandler.unsubscribeAll();
      updatedColumnDefinitions = this.disableAllSortingCommands(true);
    } else {
      updatedColumnDefinitions = this.disableAllSortingCommands(false);
      const onSortHandler = this._grid.onSort;
      this._eventHandler.subscribe(onSortHandler, (e: Event, args: any) => this.handleLocalOnSort(e, args));
    }
    this._grid.setOptions({ enableSorting: this._gridOptions.enableSorting }, false, true);
    this.sharedService.gridOptions = this._gridOptions;

    // reset columns so that it recreate the column headers and remove/add the sort icon hints
    // basically without this, the sort icon hints were still showing up even after disabling the Sorting
    this._grid.setColumns(updatedColumnDefinitions);
  }

  /**
   * Toggle the Sorting functionality
   * @param {boolean} clearSortingWhenDisabled - when disabling the sorting, do we also want to clear the sorting as well? Defaults to True
   */
  toggleSortFunctionality(clearSortingOnDisable = true) {
    const previousSorting = this._gridOptions.enableSorting;
    this.disableSortFunctionality(previousSorting, clearSortingOnDisable);
  }

  /**
   * A simple function that is binded to the subscriber and emit a change when the sort is called.
   * Other services, like Pagination, can then subscribe to it.
   * @param sender
   */
  emitSortChanged(sender: EmitterType, currentLocalSorters?: CurrentSorter[]) {
    if (sender === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
      let currentSorters: CurrentSorter[] = [];
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService && backendService.getCurrentSorters) {
        currentSorters = backendService.getCurrentSorters() as CurrentSorter[];
      }
      this.onSortChanged.next(currentSorters);
    } else if (sender === EmitterType.local) {
      if (currentLocalSorters) {
        this._currentLocalSorters = currentLocalSorters;
      }
      this.onSortChanged.next(this.getCurrentLocalSorters());
    }
  }

  getCurrentLocalSorters(): CurrentSorter[] {
    return this._currentLocalSorters;
  }

  /**
   * Get current column sorts,
   * If a column is passed as an argument, that will be exclusion so we won't add this column to our output array since it is already in the array.
   * The usage of this method is that we want to know the sort prior to calling the next sorting command
   */
  getCurrentColumnSorts(excludedColumnId?: string): { sortCol: Column; sortAsc: boolean; }[] {
    // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
    const oldSortColumns = this._grid && this._grid.getSortColumns();

    // get the column definition but only keep column which are not equal to our current column
    if (Array.isArray(oldSortColumns)) {
      const sortedCols = oldSortColumns.reduce((cols, col) => {
        if (!excludedColumnId || col.columnId !== excludedColumnId) {
          cols.push({ sortCol: this._columnDefinitions[this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
        }
        return cols;
      }, []);

      return sortedCols;
    }
    return [];
  }

  /** Load defined Sorting (sorters) into the grid */
  loadGridSorters(sorters: CurrentSorter[]): ColumnSort[] {
    this._currentLocalSorters = []; // reset current local sorters
    const sortCols: ColumnSort[] = [];

    if (Array.isArray(sorters)) {
      sorters.forEach((sorter: CurrentSorter) => {
        const gridColumn = this._columnDefinitions.find((col: Column) => col.id === sorter.columnId);
        if (gridColumn) {
          sortCols.push({
            columnId: gridColumn.id,
            sortAsc: ((sorter.direction.toUpperCase() === SortDirection.ASC) ? true : false),
            sortCol: gridColumn
          });

          // keep current sorters
          this._currentLocalSorters.push({
            columnId: gridColumn.id + '',
            direction: sorter.direction.toUpperCase() as SortDirectionString
          });
        }
      });

      this.onLocalSortChanged(this._grid, sortCols);
      this._grid.setSortColumns(sortCols.map(col => ({ columnId: col.columnId, sortAsc: col.sortAsc }))); // use this to add sort icon(s) in UI
    }

    return sortCols;
  }

  /** Process the initial sort, typically it will sort ascending by the column that has the Tree Data unless user specifies a different initialSort */
  processTreeDataInitialSort() {
    // when a Tree Data view is defined, we must sort the data so that the UI works correctly
    if (this._gridOptions?.enableTreeData && this._gridOptions.treeDataOptions) {
      // first presort it once by tree level
      const treeDataOptions = this._gridOptions.treeDataOptions;
      const columnWithTreeData = this._columnDefinitions.find((col: Column) => col.id === treeDataOptions.columnId);
      if (columnWithTreeData) {
        let sortDirection = SortDirection.ASC;
        let sortTreeLevelColumn: ColumnSort = { columnId: treeDataOptions.columnId, sortCol: columnWithTreeData, sortAsc: true };

        // user could provide a custom sort field id, if so get that column and sort by it
        if (treeDataOptions?.initialSort?.columnId) {
          const initialSortColumnId = treeDataOptions.initialSort.columnId;
          const initialSortColumn = this._columnDefinitions.find((col: Column) => col.id === initialSortColumnId);
          sortDirection = (treeDataOptions.initialSort.direction || SortDirection.ASC).toUpperCase() as SortDirection;
          sortTreeLevelColumn = { columnId: initialSortColumnId, sortCol: initialSortColumn, sortAsc: (sortDirection === SortDirection.ASC) } as ColumnSort;
        }

        // when we have a valid column with Tree Data, we can sort by that column
        if (sortTreeLevelColumn?.columnId && this.sharedService?.hierarchicalDataset) {
          this.updateSorting([{ columnId: sortTreeLevelColumn.columnId || '', direction: sortDirection }]);
        }
      }
    }
  }

  onBackendSortChanged(event: Event | undefined, args: { multiColumnSort?: boolean; grid: any; sortCols: ColumnSort[]; clearSortTriggered?: boolean; }) {
    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying to bind the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
    }
    const gridOptions: GridOption = (args.grid && args.grid.getOptions) ? args.grid.getOptions() : {};
    const backendApi = gridOptions.backendServiceApi;

    if (!backendApi || !backendApi.process || !backendApi.service) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    // keep start time & end timestamps & return it after process execution
    const startTime = new Date();

    if (backendApi.preProcess) {
      backendApi.preProcess();
    }

    // query backend
    const query = backendApi.service.processOnSortChanged(event, args);
    const totalItems = gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems;
    executeBackendCallback(backendApi, query, args, startTime, totalItems, this.emitSortChanged.bind(this), this.httpCancelRequests$);
  }

  /** When a Sort Changes on a Local grid (JSON dataset) */
  onLocalSortChanged(grid: any, sortColumns: Array<ColumnSort & { clearSortTriggered?: boolean; }>, forceReSort = false, emitSortChanged = false) {
    const datasetIdPropertyName = this._gridOptions?.datasetIdPropertyName ?? 'id';
    const isTreeDataEnabled = this._gridOptions && this._gridOptions.enableTreeData || false;
    const dataView = grid && grid.getData && grid.getData();

    if (grid && dataView) {
      if (forceReSort && !isTreeDataEnabled) {
        dataView.reSort();
      }

      if (isTreeDataEnabled && this.sharedService && Array.isArray(this.sharedService.hierarchicalDataset)) {
        const hierarchicalDataset = this.sharedService.hierarchicalDataset;
        const datasetSortResult = this.sortHierarchicalDataset(hierarchicalDataset, sortColumns);

        // we could use the DataView sort but that would require re-sorting again (since the 2nd array that is currently in the DataView would have to be resorted against the 1st array that was sorting from tree sort)
        // it is simply much faster to just replace the entire dataset
        this._dataView.setItems(datasetSortResult.flat, datasetIdPropertyName);
      } else {
        dataView.sort(this.sortComparers.bind(this, sortColumns));
      }

      grid.invalidate();
      grid.render();

      if (emitSortChanged) {
        this.emitSortChanged(EmitterType.local, sortColumns.map(col => {
          return {
            columnId: col.sortCol && col.sortCol.id || 'id',
            direction: col.sortAsc ? SortDirection.ASC : SortDirection.DESC
          };
        }));
      }
    }
  }

  /** Takes a hierarchical dataset and sort it recursively,  */
  sortHierarchicalDataset<T>(hierarchicalDataset: T[], sortColumns: Array<ColumnSort & { clearSortTriggered?: boolean; }>) {
    this.sortTreeData(hierarchicalDataset, sortColumns);
    const dataViewIdIdentifier = this._gridOptions?.datasetIdPropertyName ?? 'id';
    const treeDataOpt: TreeDataOption = this._gridOptions?.treeDataOptions ?? { columnId: '' };
    const treeDataOptions = { ...treeDataOpt, identifierPropName: treeDataOpt.identifierPropName ?? dataViewIdIdentifier, shouldAddTreeLevelNumber: true };
    const sortedFlatArray = flattenToParentChildArray(hierarchicalDataset, treeDataOptions);

    return { hierarchical: hierarchicalDataset, flat: sortedFlatArray };
  }

  /** Call a local grid sort by its default sort field id (user can customize default field by configuring "defaultColumnSortFieldId" in the grid options, defaults to "id") */
  sortLocalGridByDefaultSortFieldId() {
    const sortColFieldId = this._gridOptions && this._gridOptions.defaultColumnSortFieldId || this._gridOptions.datasetIdPropertyName || 'id';
    const sortCol = { id: sortColFieldId, field: sortColFieldId } as Column;
    this.onLocalSortChanged(this._grid, new Array({ sortAsc: true, sortCol, clearSortTriggered: true }));
  }

  sortComparers(sortColumns: ColumnSort[], dataRow1: any, dataRow2: any): number {
    if (Array.isArray(sortColumns)) {
      for (const sortColumn of sortColumns) {
        const result = this.sortComparer(sortColumn, dataRow1, dataRow2);
        if (result !== undefined) {
          return result;
        }
      }
    }
    return SortDirectionNumber.neutral;
  }

  sortComparer(sortColumn: ColumnSort, dataRow1: any, dataRow2: any, querySortField?: string): number | undefined {
    if (sortColumn && sortColumn.sortCol) {
      const columnDef = sortColumn.sortCol;
      const sortDirection = sortColumn.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
      let queryFieldName1 = querySortField || columnDef.queryFieldSorter || columnDef.queryField || columnDef.field;
      let queryFieldName2 = queryFieldName1;
      const fieldType = columnDef.type || FieldType.string;

      // if user provided a query field name getter callback, we need to get the name on each item independently
      if (typeof columnDef.queryFieldNameGetterFn === 'function') {
        queryFieldName1 = columnDef.queryFieldNameGetterFn(dataRow1);
        queryFieldName2 = columnDef.queryFieldNameGetterFn(dataRow2);
      }

      let value1 = dataRow1[queryFieldName1];
      let value2 = dataRow2[queryFieldName2];

      // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
      if (queryFieldName1 && queryFieldName1.indexOf('.') >= 0) {
        value1 = getDescendantProperty(dataRow1, queryFieldName1);
      }
      if (queryFieldName2 && queryFieldName2.indexOf('.') >= 0) {
        value2 = getDescendantProperty(dataRow2, queryFieldName2);
      }

      // user could provide his own custom Sorter
      if (columnDef.sorter) {
        const customSortResult = columnDef.sorter(value1, value2, sortDirection, columnDef, this._gridOptions);
        if (customSortResult !== SortDirectionNumber.neutral) {
          return customSortResult;
        }
      } else {
        const sortResult = sortByFieldType(fieldType, value1, value2, sortDirection, columnDef, this._gridOptions);
        if (sortResult !== SortDirectionNumber.neutral) {
          return sortResult;
        }
      }
    }
    return undefined;
  }

  sortTreeData(treeArray: any[], sortColumns: Array<ColumnSort>) {
    if (Array.isArray(sortColumns)) {
      for (const sortColumn of sortColumns) {
        this.sortTreeChild(treeArray, sortColumn, 0);
      }
    }
  }

  /** Sort the Tree Children of a hierarchical dataset by recursion */
  sortTreeChild(treeArray: any[], sortColumn: ColumnSort, treeLevel: number) {
    const treeDataOptions = this._gridOptions?.treeDataOptions;
    const childrenPropName = treeDataOptions?.childrenPropName ?? 'children';
    treeArray.sort((a: any, b: any) => this.sortComparer(sortColumn, a, b) ?? SortDirectionNumber.neutral);

    // when item has a child, we'll sort recursively
    for (const item of treeArray) {
      if (item) {
        const hasChildren = item.hasOwnProperty(childrenPropName) && Array.isArray(item[childrenPropName]);
        // when item has a child, we'll sort recursively
        if (hasChildren) {
          treeLevel++;
          this.sortTreeChild(item[childrenPropName], sortColumn, treeLevel);
          treeLevel--;
        }
      }
    }
  }

  /**
   * Update Sorting (sorters) dynamically just by providing an array of sorter(s).
   * You can also choose emit (default) a Sort Changed event that will be picked by the Grid State Service.
   *
   * Also for backend service only, you can choose to trigger a backend query (default) or not if you wish to do it later,
   * this could be useful when using updateFilters & updateSorting and you wish to only send the backend query once.
   * @param sorters array
   * @param triggerEvent defaults to True, do we want to emit a sort changed event?
   * @param triggerBackendQuery defaults to True, which will query the backend.
   */
  updateSorting(sorters: CurrentSorter[], emitChangedEvent = true, triggerBackendQuery = true) {
    if (!this._gridOptions || !this._gridOptions.enableSorting) {
      throw new Error('[Angular-Slickgrid] in order to use "updateSorting" method, you need to have Sortable Columns defined in your grid and "enableSorting" set in your Grid Options');
    }

    if (Array.isArray(sorters)) {
      const backendApi = this._gridOptions?.backendServiceApi;

      if (backendApi) {
        const backendApiService = backendApi?.service;
        if (backendApiService?.updateSorters) {
          backendApiService.updateSorters(undefined, sorters);
          if (triggerBackendQuery) {
            refreshBackendDataset(this._gridOptions);
          }
        }
      } else {
        this.loadGridSorters(sorters);
      }

      if (emitChangedEvent) {
        const emitterType = backendApi ? EmitterType.remote : EmitterType.local;
        this.emitSortChanged(emitterType);
      }
    }
  }

  // --
  // private functions
  // -------------------

  /**
   * Loop through all column definitions and do the following 2 things
   * 1. disable/enable the "sortable" property of each column
   * 2. loop through each Header Menu commands and change the "hidden" commands to show/hide depending if it's enabled/disabled
   * Also note that we aren't deleting any properties, we just toggle their flags so that we can reloop through at later point in time.
   * (if we previously deleted these properties we wouldn't be able to change them back since these properties wouldn't exist anymore, hence why we just hide the commands)
   * @param {boolean} isDisabling - are we disabling the sort functionality? Defaults to true
   */
  private disableAllSortingCommands(isDisabling = true): Column[] {
    const columnDefinitions = this._grid.getColumns();

    // loop through column definition to hide/show header menu commands
    columnDefinitions.forEach((col: Column) => {
      if (typeof col.sortable !== undefined) {
        col.sortable = !isDisabling;
      }
      if (col && col.header && col.header.menu) {
        col.header.menu.items.forEach(menuItem => {
          if (menuItem && typeof menuItem !== 'string') {
            const menuCommand = menuItem.command;
            if (menuCommand === 'sort-asc' || menuCommand === 'sort-desc' || menuCommand === 'clear-sort') {
              menuItem.hidden = isDisabling;
            }
          }
        });
      }
    });

    // loop through column definition to hide/show grid menu commands
    if (this._gridOptions && this._gridOptions.gridMenu && this._gridOptions.gridMenu.customItems) {
      this._gridOptions.gridMenu.customItems.forEach((menuItem) => {
        if (menuItem && typeof menuItem !== 'string') {
          const menuCommand = menuItem.command;
          if (menuCommand === 'clear-sorting') {
            menuItem.hidden = isDisabling;
          }
        }
      });
    }

    return columnDefinitions;
  }
}
