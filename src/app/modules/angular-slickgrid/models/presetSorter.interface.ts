import { SortDirection, SortDirectionString } from './../models/index';

export interface PresetSorter {
  columnId: string;
  direction: SortDirection | SortDirectionString;
}
