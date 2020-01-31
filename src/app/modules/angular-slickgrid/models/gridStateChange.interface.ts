import { Column, CurrentFilter, CurrentPagination, CurrentRowSelection, CurrentSorter, GridState, GridStateType } from './index';

export interface GridStateChange {
  /** Last Grid State Change that was triggered (only 1 type of change at a time) */
  change?: {
    /** Grid State change, the values of the new change */
    newValues: Column[] | CurrentFilter[] | CurrentSorter[] | CurrentPagination | CurrentRowSelection;

    /** The Grid State Type of change that was made (filter/sorter/...) */
    type: GridStateType;
  };

  /** Current Grid State, that will include all of the current states (columns/filters/sorters) and some optional ones (pagination/rowSelection) */
  gridState?: GridState;
}
