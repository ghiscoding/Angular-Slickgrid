import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from './collection.service';
import { Column, ColumnFilters, FilterCallbackArg, CurrentFilter } from './../models/index';
import { Subject } from 'rxjs/Subject';
export declare class FilterService {
    private collectionService;
    private translate;
    private _eventHandler;
    private _slickSubscriber;
    private _filters;
    private _columnFilters;
    private _dataView;
    private _grid;
    private _onFilterChangedOptions;
    private _isFirstQuery;
    onFilterChanged: Subject<CurrentFilter[]>;
    constructor(collectionService: CollectionService, translate: TranslateService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /** Getter for the Column Definitions pulled through the Grid Object */
    private readonly _columnDefinitions;
    init(grid: any): void;
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     */
    attachBackendOnFilter(grid: any): void;
    attachBackendOnFilterSubscribe(event: Event, args: any): Promise<void>;
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView
     */
    attachLocalOnFilter(grid: any, dataView: any): void;
    /** Clear the search filters (below the column titles) */
    clearFilters(): void;
    customLocalFilter(dataView: any, item: any, args: any): boolean;
    dispose(): void;
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     */
    disposeColumnFilters(): void;
    getColumnFilters(): ColumnFilters;
    getCurrentLocalFilters(): CurrentFilter[];
    callbackSearchEvent(e: Event | undefined, args: FilterCallbackArg): void;
    addFilterTemplateToHeaderRow(args: {
        column: Column;
        grid: any;
        node: any;
    }): void;
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    emitFilterChanged(sender: 'local' | 'remote'): void;
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @param grid
     */
    populateColumnFilterSearchTerms(grid: any): Column[];
    private updateColumnFilters(searchTerm, searchTerms, columnDef);
    private triggerEvent(slickEvent, args, e);
}
