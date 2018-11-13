import {
  Column,
  CurrentColumn,
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  ExtensionName,
  GridOption,
  GridState,
  GridStateChange,
  GridStateType,
} from './../models/index';
import { ExtensionService, FilterService, SortService } from './../services/index';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// using external non-typed js libraries
declare var $: any;
declare var Slick: any;

export class GridStateService {
  private _eventHandler = new Slick.EventHandler();
  private _columns: Column[] = [];
  private _currentColumns: CurrentColumn[] = [];
  private _grid: any;
  private extensionService: ExtensionService;
  private filterService: FilterService;
  private sortService: SortService;
  private subscriptions: Subscription[] = [];
  onGridStateChanged = new Subject<GridStateChange>();

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /**
   * Initialize the Export Service
   * @param grid
   * @param filterService
   * @param sortService
   * @param dataView
   */
  init(grid: any, extensionService: ExtensionService, filterService: FilterService, sortService: SortService): void {
    this._grid = grid;
    this.extensionService = extensionService;
    this.filterService = filterService;
    this.sortService = sortService;

    this.subscribeToAllGridChanges(grid);
  }

  /** Dispose of all the SlickGrid & Angular subscriptions */
  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    // also unsubscribe all Angular Subscriptions
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
    this.subscriptions = [];
  }

  /**
   * Get the current grid state (filters/sorters/pagination)
   * @return grid state
   */
  getCurrentGridState(): GridState {
    const gridState: GridState = {
      columns: this.getCurrentColumns(),
      filters: this.getCurrentFilters(),
      sorters: this.getCurrentSorters()
    };

    const currentPagination = this.getCurrentPagination();
    if (currentPagination) {
      gridState.pagination = currentPagination;
    }
    return gridState;
  }

  /**
   * Get the Columns (and their state: visibility/position) that are currently applied in the grid
   * @return current columns
   */
  getColumns(): Column[] {
    return this._columns || this._grid.getColumns();
  }

  /**
   * From an array of Grid Column Definitions, get the associated Current Columns
   * @param gridColumns
   */
  getAssociatedCurrentColumns(gridColumns: Column[]): CurrentColumn[] {
    const currentColumns: CurrentColumn[] = [];

    if (gridColumns && Array.isArray(gridColumns)) {
      gridColumns.forEach((column: Column, index: number) => {
        if (column && column.id) {
          currentColumns.push({
            columnId: column.id as string,
            cssClass: column.cssClass || '',
            headerCssClass: column.headerCssClass || '',
            width: column.width || 0
          });
        }
      });
    }
    this._currentColumns = currentColumns;
    return currentColumns;
  }

  /**
   * From an array of Current Columns, get the associated Grid Column Definitions
   * @param grid
   * @param currentColumns
   */
  getAssociatedGridColumns(grid: any, currentColumns: CurrentColumn[]): Column[] {
    const columns: Column[] = [];
    const gridColumns: Column[] = grid.getColumns();

    if (currentColumns && Array.isArray(currentColumns)) {
      currentColumns.forEach((currentColumn: CurrentColumn, index: number) => {
        const gridColumn: Column = gridColumns.find((c: Column) => c.id === currentColumn.columnId);
        if (gridColumn && gridColumn.id) {
          columns.push({
            ...gridColumn,
            cssClass: currentColumn.cssClass,
            headerCssClass: currentColumn.headerCssClass,
            width: currentColumn.width
          });
        }
      });
    }
    this._columns = columns;
    return columns;
  }

  /**
   * Get the Columns (and their state: visibility/position) that are currently applied in the grid
   * @return current columns
   */
  getCurrentColumns(): CurrentColumn[] {
    let currentColumns: CurrentColumn[] = [];
    if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
      currentColumns = this._currentColumns;
    } else {
      currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
    }

    return currentColumns;
  }

  /**
   * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
   * @return current filters
   */
  getCurrentFilters(): CurrentFilter[] | null {
    if (this._gridOptions && this._gridOptions.backendServiceApi) {
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService && backendService.getCurrentFilters) {
        return backendService.getCurrentFilters() as CurrentFilter[];
      }
    } else if (this.filterService && this.filterService.getCurrentLocalFilters) {
      return this.filterService.getCurrentLocalFilters();
    }
    return null;
  }

  /**
   * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
   * @return current pagination state
   */
  getCurrentPagination(): CurrentPagination | null {
    if (this._gridOptions && this._gridOptions.backendServiceApi) {
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService && backendService.getCurrentPagination) {
        return backendService.getCurrentPagination();
      }
    } else {
      // TODO implement this whenever local pagination gets implemented
    }
    return null;
  }

  /**
   * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
   * @return current sorters
   */
  getCurrentSorters(): CurrentSorter[] | null {
    if (this._gridOptions && this._gridOptions.backendServiceApi) {
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService && backendService.getCurrentSorters) {
        return backendService.getCurrentSorters() as CurrentSorter[];
      }
    } else if (this.sortService && this.sortService.getCurrentLocalSorters) {
      return this.sortService.getCurrentLocalSorters();
    }
    return null;
  }

  /**
   * Hook a SlickGrid Extension Event to a Grid State change event
   * @param extension name
   * @param grid
   */
  hookExtensionEventToGridStateChange(extensionName: ExtensionName, eventName: string) {
    const extension = this.extensionService && this.extensionService.getExtensionByName(extensionName);

    if (extension && extension.class && extension.class[eventName] && extension.class[eventName].subscribe) {
      this._eventHandler.subscribe(extension.class[eventName], (e: Event, args: any) => {
        const columns: Column[] = args && args.columns;
        const currentColumns: CurrentColumn[] = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
      });
    }
  }

  /**
   * Hook a Grid Event to a Grid State change event
   * @param event name
   * @param grid
   */
  hookSlickGridEventToGridStateChange(eventName: string, grid: any) {
    if (grid && grid[eventName] && grid[eventName].subscribe) {
      this._eventHandler.subscribe(grid[eventName], (e: Event, args: any) => {
        const columns: Column[] = grid.getColumns();
        const currentColumns: CurrentColumn[] = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
      });
    }
  }

  resetColumns(columnDefinitions?: Column[]) {
    const columns: Column[] = columnDefinitions || this._columns;
    const currentColumns: CurrentColumn[] = this.getAssociatedCurrentColumns(columns);
    this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
  }

  /** if we use Row Selection or the Checkbox Selector, we need to reset any selection */
  resetRowSelection() {
    if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
      // this also requires the Row Selection Model to be registered as well
      const rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
      if (rowSelectionExtension && rowSelectionExtension.extension) {
        this._grid.setSelectedRows([]);
      }
    }
  }

  /**
   * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
   * when triggered, we will publish a Grid State Event with current Grid State
   */
  subscribeToAllGridChanges(grid: any) {
    // Subscribe to Event Emitter of Filter changed
    this.subscriptions.push(
      this.filterService.onFilterChanged.subscribe((currentFilters: CurrentFilter[]) => {
        this.resetRowSelection();
        this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: this.getCurrentGridState() });
      })
    );
    // Subscribe to Event Emitter of Filter cleared
      this.subscriptions.push(
        this.filterService.onFilterCleared.subscribe(() => {
          this.resetRowSelection();
          this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        })
      );

    // Subscribe to Event Emitter of Sort changed
    this.subscriptions.push(
      this.sortService.onSortChanged.subscribe((currentSorters: CurrentSorter[]) => {
        this.resetRowSelection();
        this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
      })
    );

    // Subscribe to Event Emitter of Sort cleared
    this.subscriptions.push(
      this.sortService.onSortCleared.subscribe(() => {
        this.resetRowSelection();
        this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
      })
    );

    // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
    this.hookExtensionEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
    this.hookExtensionEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');

    // subscribe to Column Resize & Reordering
    this.hookSlickGridEventToGridStateChange('onColumnsReordered', grid);
    this.hookSlickGridEventToGridStateChange('onColumnsResized', grid);
  }
}
