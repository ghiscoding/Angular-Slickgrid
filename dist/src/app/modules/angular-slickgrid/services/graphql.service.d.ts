import { BackendService, FilterChangedArgs, GraphqlServiceOption, GraphqlSortingOption, PaginationChangedArgs, SortChangedArgs } from './../models';
export declare class GraphqlService implements BackendService {
    serviceOptions: GraphqlServiceOption;
    defaultOrderBy: GraphqlSortingOption;
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param serviceOptions GraphqlServiceOption
     */
    buildQuery(serviceOptions?: GraphqlServiceOption): string;
    buildPaginationQuery(serviceOptions?: GraphqlServiceOption): void;
    buildSortingQuery(serviceOptions?: GraphqlServiceOption): void;
    initOptions(serviceOptions?: GraphqlServiceOption): void;
    removeColumnFilter(fieldName: string): void;
    resetPaginationOptions(): void;
    updateOptions(serviceOptions?: GraphqlServiceOption): void;
    saveColumnFilter(fieldName: string, value: string, terms?: any[]): void;
    filterChanged(event: any, args: any): void;
    sorterChanged(event: any, args: any): string;
    onFilterChanged(event: Event, args: FilterChangedArgs): Promise<string>;
    onPaginationChanged(event: Event, args: PaginationChangedArgs): string;
    onSortChanged(event: Event, args: SortChangedArgs): string;
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{sort:"firstName", direction:"ASC"} }
     * TO
     * query { users (orderBy:[{sort: firstName, direction: ASC}}
     * @param inputStr input string
     * @param enumSearchWords array of enum words to filter
     * @returns outputStr output string
     */
    trimDoubleQuotesOnEnumField(inputStr: string, enumSearchWords: string[]): string;
}
