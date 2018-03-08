import { CurrentFilter, CurrentPagination, CurrentSorter, GridState, GridStateChange } from './../models/index';
import { FilterService, SortService } from './../services/index';
import { Subject } from 'rxjs/Subject';
export declare class GridStateService {
    private _grid;
    private _gridOptions;
    private _preset;
    private filterService;
    private _filterSubcription;
    private _sorterSubcription;
    private sortService;
    onGridStateChanged: Subject<GridStateChange>;
    /**
     * Initialize the Export Service
     * @param grid
     * @param gridOptions
     * @param dataView
     */
    init(grid: any, filterService: FilterService, sortService: SortService): void;
    dispose(): void;
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return grid state
     */
    getCurrentGridState(): GridState;
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return current filters
     */
    getCurrentFilters(): CurrentFilter[] | null;
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return current pagination state
     */
    getCurrentPagination(): CurrentPagination | null;
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return current sorters
     */
    getCurrentSorters(): CurrentSorter[] | null;
}
