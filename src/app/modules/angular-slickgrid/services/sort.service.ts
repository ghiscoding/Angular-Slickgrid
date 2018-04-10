import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { castToPromise } from './utilities';
import {
  CellArgs,
  Column,
  ColumnSort,
  CurrentSorter,
  FieldType,
  GridOption,
  SlickEvent,
  SortDirection,
  SortDirectionString
} from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { Sorters } from './../sorters';
import { Subject } from 'rxjs/Subject';

// using external non-typed js libraries
declare var Slick: any;

export class SortService {
  private _currentLocalSorters: CurrentSorter[] = [];
  private _eventHandler: any = new Slick.EventHandler();
  private _dataView: any;
  private _grid: any;
  private _gridOptions: GridOption;
  private _slickSubscriber: SlickEvent;
  private _isBackendGrid = false;
  onSortChanged = new Subject<CurrentSorter[]>();

  /**
   * Attach a backend sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   */
  attachBackendOnSort(grid: any, dataView: any) {
    this._isBackendGrid = true;
    this._grid = grid;
    this._dataView = dataView;
    if (grid) {
      this._gridOptions = grid.getOptions();
    }
    this._slickSubscriber = grid.onSort;

    // subscribe to the SlickGrid event and call the backend execution
    this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
  }

  async onBackendSortChanged(event: Event, args: any) {
    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
    }
    const gridOptions: GridOption = args.grid.getOptions() || {};
    const backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;

    if (!backendApi || !backendApi.process || !backendApi.service) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }
    if (backendApi.preProcess) {
      backendApi.preProcess();
    }
    const query = backendApi.service.onSortChanged(event, args);
    this.emitSortChanged('remote');

    // the process could be an Observable (like HttpClient) or a Promise
    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
    const observableOrPromise = backendApi.process(query);
    const processResult = await castToPromise(observableOrPromise);

    // from the result, call our internal post process to update the Dataset and Pagination info
    if (processResult && backendApi.internalPostProcess) {
      backendApi.internalPostProcess(processResult);
    }

    // send the response process to the postProcess callback
    if (backendApi.postProcess) {
      backendApi.postProcess(processResult);
    }
  }

  /**
   * Attach a local sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   * @param dataView
   */
  attachLocalOnSort(grid: any, dataView: any) {
    this._isBackendGrid = false;
    this._grid = grid;
    this._dataView = dataView;
    let columnDefinitions = [];

    if (grid) {
      this._gridOptions = grid.getOptions();
      columnDefinitions = grid.getColumns();
    }
    this._slickSubscriber = grid.onSort;

    this._slickSubscriber.subscribe((e: any, args: any) => {
      // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
      // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
      const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({sortAsc: args.sortAsc, sortCol: args.sortCol});

      // keep current sorters
      this._currentLocalSorters = []; // reset current local sorters
      if (Array.isArray(sortColumns)) {
        sortColumns.forEach((sortColumn) => {
          if (sortColumn.sortCol) {
            this._currentLocalSorters.push({
              columnId: sortColumn.sortCol.id,
              direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
            });
          }
        });
      }

      this.onLocalSortChanged(grid, this._gridOptions, dataView, sortColumns);
      this.emitSortChanged('local');
    });

    if (dataView && dataView.onRowCountChanged) {
      this._eventHandler.subscribe(dataView.onRowCountChanged, (e: Event, args: any) => {
        // load any presets if there are any
        if (args.current > 0) {
          this.loadLocalPresets(grid, this._gridOptions, dataView, columnDefinitions);
        }
      });
    }
  }

  clearSorting() {
    if (this._grid && this._gridOptions && this._dataView) {
      // remove any sort icons (this setSortColumns function call really does only that)
      this._grid.setSortColumns([]);

      // we also need to trigger a sort change
      // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
      // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
      if (this._isBackendGrid) {
        this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
      } else {
        const columnDefinitions = this._grid.getColumns() as Column[];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
          this.onLocalSortChanged(this._grid, this._gridOptions, this._dataView, new Array({sortAsc: true, sortCol: columnDefinitions[0] }));
        }
      }
    }
  }

  getCurrentLocalSorters(): CurrentSorter[] {
    return this._currentLocalSorters;
  }

  /**
   * Get column sorts,
   * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
   * We want to know the sort prior to calling the next sorting command
   */
  getPreviousColumnSorts(columnId?: string) {
    // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
    const oldSortColumns = this._grid.getSortColumns();
    const columnDefinitions = this._grid.getColumns();

    // get the column definition but only keep column which are not equal to our current column
    const sortedCols = oldSortColumns.reduce((cols, col) => {
      if (!columnId || col.columnId !== columnId) {
        cols.push({ sortCol: columnDefinitions[this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
      }
      return cols;
    }, []);

    return sortedCols;
  }

  /**
   * load any presets if there are any
   * @param grid
   * @param gridOptions
   * @param dataView
   * @param columnDefinitions
   */
  loadLocalPresets(grid: any, gridOptions: GridOption, dataView: any, columnDefinitions: Column[]) {
    const sortCols: ColumnSort[] = [];
    this._currentLocalSorters = []; // reset current local sorters
    if (gridOptions && gridOptions.presets && gridOptions.presets.sorters) {
      const sorters = gridOptions.presets.sorters;
      columnDefinitions.forEach((columnDef: Column) =>  {
        const columnPreset = sorters.find((currentSorter: CurrentSorter) => {
          return currentSorter.columnId === columnDef.id;
        });
        if (columnPreset) {
          sortCols.push({
            columnId: columnDef.id,
            sortAsc: ((columnPreset.direction.toUpperCase() === SortDirection.ASC) ? true : false),
            sortCol: columnDef
          });

          // keep current sorters
          this._currentLocalSorters.push({
            columnId: columnDef.id + '',
            direction: columnPreset.direction.toUpperCase() as SortDirectionString
          });
        }
      });

      if (sortCols.length > 0) {
        this.onLocalSortChanged(grid, gridOptions, dataView, sortCols);
        grid.setSortColumns(sortCols); // add sort icon in UI
      }
    }
  }

  onLocalSortChanged(grid: any, gridOptions: GridOption, dataView: any, sortColumns: ColumnSort[]) {
    dataView.sort((dataRow1: any, dataRow2: any) => {
      for (let i = 0, l = sortColumns.length; i < l; i++) {
        const columnSortObj = sortColumns[i];
        if (columnSortObj && columnSortObj.sortCol) {
          const sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
          const sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
          const fieldType = columnSortObj.sortCol.type || FieldType.string;
          const value1 = dataRow1[sortField];
          const value2 = dataRow2[sortField];
          const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
          if (sortResult !== SortDirectionNumber.neutral) {
            return sortResult;
          }
        }
      }
      return 0;
    });
    grid.invalidate();
    grid.render();
  }

  dispose() {
    // unsubscribe local event
    if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
      this._slickSubscriber.unsubscribe();
    }

    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
  }

  /**
   * A simple function that is attached to the subscriber and emit a change when the sort is called.
   * Other services, like Pagination, can then subscribe to it.
   * @param sender
   */
  emitSortChanged(sender: 'local' | 'remote') {
    if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
      let currentSorters: CurrentSorter[] = [];
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService && backendService.getCurrentSorters) {
        currentSorters = backendService.getCurrentSorters() as CurrentSorter[];
      }
      this.onSortChanged.next(currentSorters);
    } else if (sender === 'local') {
      this.onSortChanged.next(this.getCurrentLocalSorters());
    }
  }
}
