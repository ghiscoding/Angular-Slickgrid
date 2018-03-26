import { SortDirection, SortDirectionString } from './../models/index';
export interface GraphqlSortingOption {
    field: string;
    direction: SortDirection | SortDirectionString;
}
