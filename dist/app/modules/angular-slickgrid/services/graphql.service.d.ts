import { BackendService, ColumnFilters, ColumnSort, CurrentFilter, CurrentPagination, CurrentSorter, FilterChangedArgs, GraphqlCursorPaginationOption, GraphqlDatasetFilter, GraphqlPaginationOption, GraphqlServiceOption, GraphqlSortingOption, Pagination, PaginationChangedArgs, SortChangedArgs } from './../models/index';
export declare class GraphqlService implements BackendService {
    private _currentFilters;
    private _currentPagination;
    private _currentSorters;
    private _columnDefinitions;
    private _grid;
    options: GraphqlServiceOption;
    pagination: Pagination | undefined;
    defaultOrderBy: GraphqlSortingOption;
    defaultPaginationOptions: GraphqlPaginationOption | GraphqlCursorPaginationOption;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param serviceOptions GraphqlServiceOption
     */
    buildQuery(): string;
    /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param inputArray
     */
    buildFilterQuery(inputArray: string[]): string;
    init(serviceOptions?: GraphqlServiceOption, pagination?: Pagination, grid?: any): void;
    /**
     * Get an initialization of Pagination options
     * @return Pagination Options
     */
    getInitPaginationOptions(): GraphqlDatasetFilter;
    /** Get the GraphQL dataset name */
    getDatasetName(): string;
    /** Get the Filters that are currently used by the grid */
    getCurrentFilters(): ColumnFilters | CurrentFilter[];
    /** Get the Pagination that is currently used by the grid */
    getCurrentPagination(): CurrentPagination;
    /** Get the Sorters that are currently used by the grid */
    getCurrentSorters(): CurrentSorter[];
    resetPaginationOptions(): void;
    updateOptions(serviceOptions?: GraphqlServiceOption): void;
    processOnFilterChanged(event: Event, args: FilterChangedArgs): Promise<string>;
    processOnPaginationChanged(event: Event, args: PaginationChangedArgs): string;
    processOnSortChanged(event: Event, args: SortChangedArgs): string;
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    updateFilters(columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPreset: boolean): void;
    /**
     * Update the pagination component with it's new page number and size
     * @param newPage
     * @param pageSize
     */
    updatePagination(newPage: number, pageSize: number): void;
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param columnFilters
     */
    updateSorters(sortColumns?: ColumnSort[], presetSorters?: CurrentSorter[]): void;
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums (except fields with dot notation)
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
     * TO
     * query { users (orderBy:[{field: firstName, direction: ASC}})}
     *
     * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
     * these fields will keep double quotes while everything else will be stripped of double quotes
     * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
     * TO
     * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
     * @param inputStr input string
     * @param enumSearchWords array of enum words to filter
     * @returns outputStr output string
     */
    trimDoubleQuotesOnEnumField(inputStr: string, enumSearchWords: string[], keepArgumentFieldDoubleQuotes: boolean): string;
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param columnFilters
     */
    private castFilterToColumnFilter(columnFilters);
}
