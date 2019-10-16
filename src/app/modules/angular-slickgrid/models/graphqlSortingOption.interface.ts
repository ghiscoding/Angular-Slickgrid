import { SortDirection, SortDirectionString } from './index';

export interface GraphqlSortingOption {
  field: string;
  direction: SortDirection | SortDirectionString;
}
