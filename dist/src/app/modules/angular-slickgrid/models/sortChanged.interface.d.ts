import { Column } from './column.interface';
export interface SortChanged {
    columnId?: string | number;
    sortAsc?: boolean;
    sortCol?: Column;
}
