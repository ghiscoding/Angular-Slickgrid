import { EventEmitter } from '@angular/core';
import { Column, GridOption } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
export declare class FilterService {
    private translate;
    private _filters;
    private _columnFilters;
    private _dataView;
    private _grid;
    private _onFilterChangedOptions;
    private subscriber;
    onFilterChanged: EventEmitter<string>;
    constructor(translate: TranslateService);
    init(grid: any, gridOptions: GridOption, columnDefinitions: Column[]): void;
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     */
    attachBackendOnFilter(grid: any, options: GridOption): void;
    attachBackendOnFilterSubscribe(event: Event, args: any): Promise<void>;
    /** Clear the search filters (below the column titles) */
    clearFilters(): void;
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnFilter(grid: any, options: GridOption, dataView: any): void;
    customLocalFilter(dataView: any, item: any, args: any): boolean;
    destroy(): void;
    /**
     * Destroy the filters, since it's a singleton, we don't want to affect other grids with same columns
     */
    destroyFilters(): void;
    callbackSearchEvent(e: Event | undefined, args: {
        columnDef: Column;
        operator?: string;
        searchTerms?: string[] | number[];
    }): void;
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
    emitFilterChangedBy(sender: string): void;
    private keepColumnFilters(searchTerm, searchTerms, columnDef);
    private triggerEvent(evt, args, e);
}
