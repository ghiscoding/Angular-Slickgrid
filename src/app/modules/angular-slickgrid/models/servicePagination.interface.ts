import { Pagination } from './pagination.interface';

export interface ServicePagination extends Pagination {
  /** How many pages do we have in total to display the entire dataset? */
  pageCount?: number;

  /** Current From count (which displayed items are we starting from) */
  dataFrom?: number;

  /** Current To count (which displayed items are we ending to) */
  dataTo?: number;
}
