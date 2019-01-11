import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { castToPromise } from './utilities';
import {
  Column,
  ColumnSort,
  CurrentSorter,
  FieldType,
  GridOption,
  SlickEvent,
  SortDirection,
  SortDirectionString
} from './../models/index';
import { getDescendantProperty } from './utilities';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { Subject } from 'rxjs';

// using external non-typed js libraries
declare var Slick: any;

export class SortService {
  private _currentLocalSorters: CurrentSorter[] = [];
  private _eventHandler: any = new Slick.EventHandler();
  private _dataView: any;
  private _grid: any;
  private _slickSubscriber: SlickEvent;
  private _isBackendGrid = false;
  onSortChanged = new Subject<CurrentSorter[]>();
  onSortCleared = new Subject<boolean>();

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  private get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  /**
   * Attach a backend sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param dataView SlickGrid DataView object
   */
  attachBackendOnSort(grid: any, dataView: any) {
    this._isBackendGrid = true;
    this._grid = grid;
    this._dataView = dataView;
    this._slickSubscriber = grid.onSort;

    // subscribe to the SlickGrid event and call the backend execution
    this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
  }

  async onBackendSortChanged(event: Event, args: any) {
    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
    }
    const gridOptions: GridOption = args.grid.getOptions() || {};
    const backendApi = gridOptions.backendServiceApi;

    if (!backendApi || !backendApi.process || !backendApi.service) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    try {
      // keep start time & end timestamps & return it after process execution
      const startTime = new Date();

      if (backendApi.preProcess) {
        backendApi.preProcess();
      }

      const query = backendApi.service.processOnSortChanged(event, args);
      this.emitSortChanged('remote');

      // the process could be an Observable (like HttpClient) or a Promise
      // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
      const observableOrPromise = backendApi.process(query);
      const processResult = await castToPromise(observableOrPromise);
      const endTime = new Date();

      // from the result, call our internal post process to update the Dataset and Pagination info
      if (processResult && backendApi.internalPostProcess) {
        backendApi.internalPostProcess(processResult);
      }

      // send the response process to the postProcess callback
      if (backendApi.postProcess) {
        if (processResult instanceof Object) {
          processResult.statistics = {
            startTime,
            endTime,
            executionTime: endTime.valueOf() - startTime.valueOf(),
            totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
          };
        }
        backendApi.postProcess(processResult);
      }
    } catch (e) {
      if (backendApi && backendApi.onError) {
        backendApi.onError(e);
      } else {
        throw e;
      }
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
    this._slickSubscriber = grid.onSort;

    this._slickSubscriber.subscribe((e: any, args: any) => {
      // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
      // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
      const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({sortAsc: args.sortAsc, sortCol: args.sortCol});

      // keep current sorters
      this._currentLocalSorters = []; // reset current local sorters
      if (Array.isArray(sortColumns)) {
        sortColumns.forEach((sortColumn: { sortCol: Column, sortAsc: number }) => {
          if (sortColumn.sortCol) {
            this._currentLocalSorters.push({
              columnId: sortColumn.sortCol.id,
              direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
            });
          }
        });
      }

      this.onLocalSortChanged(grid, dataView, sortColumns);
      this.emitSortChanged('local');
    });
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
        if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
          this.onLocalSortChanged(this._grid, this._dataView, new Array({sortAsc: true, sortCol: this._columnDefinitions[0] }));
        }
      }
    }
    // set current sorter to empty & emit a sort changed event
    this._currentLocalSorters = [];

    // emit an event when filters are all cleared
    this.onSortCleared.next(true);
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
    const oldSortColumns = this._grid && this._grid.getSortColumns();

    // get the column definition but only keep column which are not equal to our current column
    if (Array.isArray(oldSortColumns)) {
      const sortedCols = oldSortColumns.reduce((cols, col) => {
        if (!columnId || col.columnId !== columnId) {
          cols.push({ sortCol: this._columnDefinitions[this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
        }
        return cols;
      }, []);

      return sortedCols;
    }
    return [];
  }

  /**
   * load any presets if there are any
   * @param grid
   * @param dataView
   */
  loadLocalPresets(grid: any, dataView: any) {
    const sortCols: ColumnSort[] = [];
    this._currentLocalSorters = []; // reset current local sorters
    if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
      const sorters = this._gridOptions.presets.sorters;

      sorters.forEach((presetSorting: CurrentSorter) => {
        const gridColumn = this._columnDefinitions.find((col: Column) => col.id === presetSorting.columnId);
        if (gridColumn) {
          sortCols.push({
            columnId: gridColumn.id,
            sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
            sortCol: gridColumn
          });

          // keep current sorters
          this._currentLocalSorters.push({
            columnId: gridColumn.id + '',
            direction: presetSorting.direction.toUpperCase() as SortDirectionString
          });
        }
      });

      if (sortCols.length > 0) {
        this.onLocalSortChanged(grid, dataView, sortCols);
        grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
      }
    }
  }

  onLocalSortChanged(grid: any, dataView: any, sortColumns: ColumnSort[], forceReSort = false) {
    if (grid && dataView) {
      if (forceReSort) {
        dataView.reSort();
      }

      dataView.sort((dataRow1: any, dataRow2: any) => {
        for (let i = 0, l = sortColumns.length; i < l; i++) {
          const columnSortObj = sortColumns[i];
          if (columnSortObj && columnSortObj.sortCol) {
            const sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
            const sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
            const fieldType = columnSortObj.sortCol.type || FieldType.string;
            let value1 = dataRow1[sortField];
            let value2 = dataRow2[sortField];

            // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
            if (sortField && sortField.indexOf('.') >= 0) {
              value1 = getDescendantProperty(dataRow1, sortField);
              value2 = getDescendantProperty(dataRow2, sortField);
            }

            // user could provide his own custom Sorter
            if (columnSortObj.sortCol && columnSortObj.sortCol.sorter) {
              const customSortResult = columnSortObj.sortCol.sorter(value1, value2, sortDirection, columnSortObj.sortCol);
              if (customSortResult !== SortDirectionNumber.neutral) {
                return customSortResult;
              }
            }

            const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnSortObj.sortCol);
            if (sortResult !== SortDirectionNumber.neutral) {
              return sortResult;
            }
          }
        }
        return SortDirectionNumber.neutral;
      });

      grid.invalidate();
      grid.render();
    }
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
