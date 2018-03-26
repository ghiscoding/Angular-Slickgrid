import { BackendServiceOption, Column, ColumnFilters, CurrentFilter, CurrentPagination, CurrentSorter, FilterChangedArgs, GridOption, Pagination, PaginationChangedArgs, SortChangedArgs, SortChanged } from './../models/index';
export interface BackendService {
    /** Backend Service options */
    options?: BackendServiceOption;
    /** Build and the return the backend service query string */
    buildQuery: (serviceOptions?: BackendServiceOption) => string;
    /** initialize the backend service with certain options */
    init?: (serviceOptions?: BackendServiceOption, pagination?: Pagination, grid?: any) => void;
    /** DEPRECATED, please use "init()" instead */
    initOptions?: (serviceOptions?: BackendServiceOption, pagination?: Pagination, gridOptions?: GridOption, columnDefinitions?: Column[]) => void;
    /** Get the dataset name */
    getDatasetName?: () => string;
    /** Get the Filters that are currently used by the grid */
    getCurrentFilters?: () => ColumnFilters | CurrentFilter[];
    /** Get the Pagination that is currently used by the grid */
    getCurrentPagination?: () => CurrentPagination;
    /** Get the Sorters that are currently used by the grid */
    getCurrentSorters?: () => ColumnFilters | CurrentFilter[];
    /** Reset the pagination options */
    resetPaginationOptions: () => void;
    /** Update the Filters options with a set of new options */
    updateFilters?: (columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPreset: boolean) => void;
    /** Update the Pagination component with it's new page number and size */
    updatePagination?: (newPage: number, pageSize: number) => void;
    /** Update the Sorters options with a set of new options */
    updateSorters?: (sortColumns?: SortChanged[], presetSorters?: CurrentSorter[]) => void;
    /** Update the backend service options */
    updateOptions: (serviceOptions?: BackendServiceOption) => void;
    /** Execute when any of the filters changed */
    onFilterChanged: (event: Event, args: FilterChangedArgs) => Promise<string>;
    /** Execute when the pagination changed */
    onPaginationChanged: (event: Event | undefined, args: PaginationChangedArgs) => string;
    /** Execute when any of the sorters changed */
    onSortChanged: (event: Event, args: SortChangedArgs) => string;
}
