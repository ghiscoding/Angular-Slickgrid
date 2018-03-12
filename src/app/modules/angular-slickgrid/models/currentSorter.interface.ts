import { SortDirection, SortDirectionString } from './../models/index';

export interface CurrentSorter {
  columnId: string;
  direction: SortDirection | SortDirectionString;
}
