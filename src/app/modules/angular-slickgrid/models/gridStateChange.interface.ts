import { Column, CurrentFilter, CurrentPagination, CurrentRowSelection, CurrentSorter, GridState, GridStateType } from './index';

export interface GridStateChange {
  /** Changes that were triggered */
  change?: {
    newValues: Column[] | CurrentFilter[] | CurrentSorter[] | CurrentPagination | CurrentRowSelection;
    type: GridStateType;
  };

  /** Current grid state */
  gridState?: GridState;
}
