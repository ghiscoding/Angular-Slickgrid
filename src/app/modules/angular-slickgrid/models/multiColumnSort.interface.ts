import { ColumnSort } from './columnSort.interface';

export interface MultiColumnSort {
  /** SlickGrid grid object */
  grid?: any;

  /** Defaults to false, is it a multi-column sort? */
  multiColumnSort?: boolean;

  /** Array of Columns to be sorted */
  sortCols: ColumnSort[];
}
