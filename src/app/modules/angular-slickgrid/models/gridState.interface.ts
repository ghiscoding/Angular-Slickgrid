import {
  CurrentColumn,
  CurrentFilter,
  CurrentPagination,
  CurrentPinning,
  CurrentRowSelection,
  CurrentSorter,
  TreeToggleStateChange,
} from './index';

export interface GridState {
  /** Columns (and their state: visibility/position) that are currently applied in the grid */
  columns?: CurrentColumn[] | null;

  /** Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid */
  filters?: CurrentFilter[] | null;

  /** Sorters (and their state, columnId, direction) that are currently applied in the grid */
  sorters?: CurrentSorter[] | null;

  /** Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid */
  pagination?: CurrentPagination | null;

  /** Pinning (frozen) column & row position */
  pinning?: CurrentPinning;

  /** Row Selections (by their dataContext IDs and/or grid row indexes) */
  rowSelection?: CurrentRowSelection | null;

  /** Tree Data changes which include toggled items (when the change is an item toggle, this could be `null` when the change is a full collapse/expand) */
  treeData?: Partial<TreeToggleStateChange> | null;
}
