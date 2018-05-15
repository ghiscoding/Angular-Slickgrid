import { CurrentFilter, CurrentPagination, CurrentSorter, GridState, GridStateChange } from './../models/index';
import { FilterService, SortService } from './../services/index';
import { Subject } from 'rxjs/Subject';
export declare class GridStateService {
    private _grid;
    private _preset;
    private filterService;
    private _filterSubcription;
    private _sorterSubcription;
    private sortService;
    onGridStateChanged: Subject<GridStateChange>;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /**
     * Initialize the Export Service
     * @param grid
     * @param filterService
     * @param sortService
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
