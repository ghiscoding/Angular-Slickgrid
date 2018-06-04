import { SortDirection, SortDirectionString } from './../models/index';
export interface CurrentSorter {
    columnId: string | number;
    direction: SortDirection | SortDirectionString;
}
