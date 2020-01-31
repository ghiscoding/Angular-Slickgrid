import { CurrentColumn, CurrentFilter, CurrentPagination, CurrentRowSelection, CurrentSorter } from './index';

export interface GridState {
  /** Columns (and their state: visibility/position) that are currently applied in the grid */
  columns?: CurrentColumn[] | null;

  /** Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid */
  filters?: CurrentFilter[] | null;

  /** Sorters (and their state, columnId, direction) that are currently applied in the grid */
  sorters?: CurrentSorter[] | null;

  /** Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid */
  pagination?: CurrentPagination | null;

  /** Row Selections (by their dataContext IDs and/or grid row indexes) */
  rowSelection?: CurrentRowSelection | null;
}
