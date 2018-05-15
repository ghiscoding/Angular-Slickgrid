import { ColumnSort, CurrentSorter } from './../models/index';
import { Subject } from 'rxjs/Subject';
export declare class SortService {
    private _currentLocalSorters;
    private _eventHandler;
    private _dataView;
    private _grid;
    private _slickSubscriber;
    private _isBackendGrid;
    onSortChanged: Subject<CurrentSorter[]>;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /** Getter for the Column Definitions pulled through the Grid Object */
    private readonly _columnDefinitions;
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView SlickGrid DataView object
     */
    attachBackendOnSort(grid: any, dataView: any): void;
    onBackendSortChanged(event: Event, args: any): Promise<void>;
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnSort(grid: any, dataView: any): void;
    clearSorting(): void;
    getCurrentLocalSorters(): CurrentSorter[];
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     */
    getPreviousColumnSorts(columnId?: string): any;
    /**
     * load any presets if there are any
     * @param grid
     * @param dataView
     */
    loadLocalPresets(grid: any, dataView: any): void;
    onLocalSortChanged(grid: any, dataView: any, sortColumns: ColumnSort[]): void;
    dispose(): void;
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    emitSortChanged(sender: 'local' | 'remote'): void;
}
