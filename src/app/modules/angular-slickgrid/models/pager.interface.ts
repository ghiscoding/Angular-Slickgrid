export interface Pager {
  from: number;
  to: number;
  itemsPerPage: number;
  pageCount: number;
  pageNumber: number;
  availablePageSizes: number[];
  totalItems: number;
}
