import { SortDirection, SortDirectionString } from './../models/index';
export interface GraphqlSortingOption {
    columnId: string;
    direction: SortDirection | SortDirectionString;
    sortAsc?: boolean;
}
