import './global-utilities';
import { BackendService, ColumnFilters, ColumnSort, CurrentFilter, CurrentPagination, CurrentSorter, FilterChangedArgs, OdataOption, Pagination, PaginationChangedArgs, SortChangedArgs } from './../models/index';
import { OdataService } from './odata.service';
export declare class GridOdataService implements BackendService {
    private _currentFilters;
    private _currentPagination;
    private _currentSorters;
    private _columnDefinitions;
    private _grid;
    odataService: OdataService;
    options: OdataOption;
    pagination: Pagination | undefined;
    defaultOptions: OdataOption;
    constructor();
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    buildQuery(): string;
    init(options: OdataOption, pagination?: Pagination, grid?: any): void;
    updateOptions(serviceOptions?: OdataOption): void;
    removeColumnFilter(fieldName: string): void;
    /** Get the Filters that are currently used by the grid */
    getCurrentFilters(): CurrentFilter[];
    /** Get the Pagination that is currently used by the grid */
    getCurrentPagination(): CurrentPagination;
    /** Get the Sorters that are currently used by the grid */
    getCurrentSorters(): CurrentSorter[];
    resetPaginationOptions(): void;
    saveColumnFilter(fieldName: string, value: string, terms?: any[]): void;
    processOnFilterChanged(event: Event, args: FilterChangedArgs): Promise<string>;
    processOnPaginationChanged(event: Event, args: PaginationChangedArgs): string;
    processOnSortChanged(event: Event, args: SortChangedArgs): string;
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    updateFilters(columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPreset?: boolean): void;
    /**
     * Update the pagination component with it's new page number and size
     * @param newPage
     * @param pageSize
     */
    updatePagination(newPage: number, pageSize: number): void;
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param columnFilters
     */
    updateSorters(sortColumns?: ColumnSort[], presetSorters?: CurrentSorter[]): string;
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param columnFilters
     */
    private castFilterToColumnFilter;
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param string operator
     * @returns string map
     */
    private mapOdataOperator;
}
