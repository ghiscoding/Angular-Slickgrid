import { Column, ColumnFilters, GridOption } from '../models';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
export declare class FilterService {
    _columnDefinitions: Column[];
    _columnFilters: ColumnFilters;
    _dataView: any;
    _grid: any;
    _gridOptions: GridOption;
    _onFilterChangedOptions: any;
    subscriber: any;
    init(grid: any, gridOptions: GridOption, columnDefinitions: Column[], columnFilters: any): void;
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     */
    attachBackendOnFilter(grid: any, options: any): void;
    attachBackendOnFilterSubscribe(event: any, args: any): Promise<void>;
    testFilterCondition(operator: string, value1: any, value2: any): boolean;
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
