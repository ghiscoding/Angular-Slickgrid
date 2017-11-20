import { EventEmitter } from '@angular/core';
import { Column, ColumnFilters, GridOption, SlickEvent } from './../models/index';
export declare class FilterService {
    _columnFilters: ColumnFilters;
    _columnDefinitions: Column[];
    _dataView: any;
    _grid: any;
    _gridOptions: GridOption;
    _onFilterChangedOptions: any;
    subscriber: SlickEvent;
    onFilterChanged: EventEmitter<string>;
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
    testFilterCondition(operator: string, value1: any, value2: any): boolean;
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnFilter(grid: any, options: GridOption, dataView: any): void;
    customFilter(item: any, args: any): boolean;
    destroy(): void;
    callbackSearchEvent(e: any, args: any): void;
    addFilterTemplateToHeaderRow(args: any): void;
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {string} sender
     */
    emitFilterChangedBy(sender: string): void;
    private keepColumnFilters(searchTerm, listTerm, columnDef);
    private triggerEvent(evt, args, e);
}
