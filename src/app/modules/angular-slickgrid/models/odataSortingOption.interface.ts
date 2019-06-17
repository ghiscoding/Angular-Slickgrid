import { SortDirection, SortDirectionString } from './index';

export interface OdataSortingOption {
  field: string;
  direction: SortDirection | SortDirectionString;
}
