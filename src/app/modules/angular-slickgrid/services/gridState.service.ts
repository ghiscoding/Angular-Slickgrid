import {
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  GridOption,
  GridState,
  GridStateChange,
  GridStateType
} from './../models/index';
import { FilterService, SortService } from './../services/index';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// using external non-typed js libraries
declare var $: any;

export class GridStateService {
  private _grid: any;
  private _preset: GridState;
  private filterService: FilterService;
  private _filterSubcription: Subscription;
  private _sorterSubcription: Subscription;
  private sortService: SortService;
  onGridStateChanged = new Subject<GridStateChange>();

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
  init(grid: any, filterService: FilterService, sortService: SortService): void {
    this._grid = grid;
    this.filterService = filterService;
    this.sortService = sortService;

    // Subscribe to Event Emitter of Filter & Sort changed, go back to page 1 when that happen
    this._filterSubcription = this.filterService.onFilterChanged.subscribe((currentFilters: CurrentFilter[]) => {
      this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: this.getCurrentGridState() });
    });
    this._sorterSubcription = this.sortService.onSortChanged.subscribe((currentSorters: CurrentSorter[]) => {
      this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
    });
  }

  dispose() {
    this._filterSubcription.unsubscribe();
    this._sorterSubcription.unsubscribe();
  }

  /**
   * Get the current grid state (filters/sorters/pagination)
   * @return grid state
   */
  getCurrentGridState(): GridState {
    const gridState: GridState = {
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
}
