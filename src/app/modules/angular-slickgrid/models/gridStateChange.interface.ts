import { Column, CurrentFilter, CurrentPagination, CurrentSorter, GridState, GridStateType } from './index';

export interface GridStateChange {
  /** Changes that were triggered */
  change?: {
    newValues: Column[] | CurrentFilter[] | CurrentSorter[] | CurrentPagination;
    type: GridStateType;
  };

  /** Current grid state */
  gridState?: GridState;
}
