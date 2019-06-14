import { Column } from './column.interface';

export interface ColumnSort {
  /** SlickGrid grid object */
  grid?: any;

  /** Defaults to false, is it a multi-column sort? */
  multiColumnSort?: boolean;

  /** Column Id to be sorted */
  columnId?: string | number;

  /** Are we sorting Ascending? */
  sortAsc: boolean;

  /** Column to be sorted */
  sortCol: Column;
}
