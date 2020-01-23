export interface Pagination {
  /** Current page number that we are we currently displaying. */
  pageNumber?: number;

  /** The available page sizes */
  pageSizes: number[];

  /** Current page size chosen */
  pageSize: number;

  /** The full total count of items for the entire dataset */
  totalItems?: number;
}
