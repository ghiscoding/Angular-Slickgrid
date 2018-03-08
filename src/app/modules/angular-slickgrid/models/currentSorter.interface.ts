import { SortDirection, SortDirectionString } from './../models/index';

export interface CurrentSorter {
  columnId: string;
  headerName?: string;
  direction: SortDirection | SortDirectionString;
}
