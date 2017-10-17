import { FilterChangedArgs, GraphqlServiceOption, PaginationChangedArgs, SortChangedArgs } from './../models';
export declare class GraphqlService {
    serviceOptions: GraphqlServiceOption;
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param serviceOptions GraphqlServiceOption
     */
    buildQuery(serviceOptions?: GraphqlServiceOption): any;
    initOptions(serviceOptions?: GraphqlServiceOption): void;
    removeColumnFilter(fieldName: string): void;
    resetPaginationOptions(): void;
    updateOptions(serviceOptions?: GraphqlServiceOption): void;
    saveColumnFilter(fieldName: string, value: string, terms?: any[]): void;
    onFilterChanged(event: Event, args: FilterChangedArgs): void;
    onPaginationChanged(event: Event, args: PaginationChangedArgs): any;
    onSortChanged(event: Event, args: SortChangedArgs): void;
}
