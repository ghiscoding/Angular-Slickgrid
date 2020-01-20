export interface Pagination {
  /** How many pages do we have in total to display the entire dataset? */
  pageCount?: number;

  /** Current page number that we are we currently displaying. */
  pageNumber?: number;

  /** The available page sizes */
  pageSizes: number[];

  /** Current page size chosen */
  pageSize: number;

  /** The full total count of items for the entire dataset */
  totalItems?: number;

  /** Current From count (which displayed items are we starting from) */
  dataFrom?: number;

  /** Current To count (which displayed items are we ending to) */
  dataTo?: number;
}
