import { Column } from './column.interface';
export interface ColumnSort {
    columnId?: string | number;
    sortAsc?: boolean;
    sortCol?: Column;
}
