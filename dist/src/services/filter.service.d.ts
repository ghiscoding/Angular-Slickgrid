import { Column } from '../models/column.interface';
import { ColumnFilters } from '../models/columnFilters.interface';
import { GridOption } from '../models/gridOption.interface';
export declare class FilterService {
    _columnDefinitions: Column[];
    _columnFilters: ColumnFilters;
    _dataView: any;
    _grid: any;
    _gridOptions: GridOption;
    subscriber: any;
    constructor();
    init(grid: any, gridOptions: GridOption, columnDefinitions: Column[], columnFilters: any): void;
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     */
    attachBackendOnFilter(): void;
    testFilterCondition(operator: string, value1: any, value2: any): boolean | undefined;
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnFilter(dataView: any): void;
    customFilter(item: any, args: any): boolean;
    destroy(): void;
    callbackSearchEvent(e: any, args: any): void;
    addFilterTemplateToHeaderRow(): void;
    private keepColumnFilters(searchTerm, listTerm, columnDef);
    private triggerEvent(evt, args, e);
}
