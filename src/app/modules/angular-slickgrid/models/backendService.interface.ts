import {
  BackendServiceOption,
  ColumnFilters,
  ColumnSort,
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  FilterChangedArgs,
  Pagination,
  PaginationChangedArgs,
  SortChangedArgs,
} from './../models/index';

export interface BackendService {
  /** Backend Service options */
  options?: BackendServiceOption;

  /** Build and the return the backend service query string */
  buildQuery: (serviceOptions?: BackendServiceOption) => string;

  /** Clear all sorts */
  clearFilters?: () => void;

  /** Clear all sorts */
  clearSorters?: () => void;

  /** initialize the backend service with certain options */
  init?: (serviceOptions?: BackendServiceOption, pagination?: Pagination, grid?: any) => void;

  /** Get the dataset name */
  getDatasetName?: () => string;

  /** Get the Filters that are currently used by the grid */
  getCurrentFilters?: () => ColumnFilters | CurrentFilter[];

  /** Get the Pagination that is currently used by the grid */
  getCurrentPagination?: () => CurrentPagination;

  /** Get the Sorters that are currently used by the grid */
  getCurrentSorters?: () => CurrentSorter[];

  /** Reset the pagination options */
  resetPaginationOptions: () => void;

  /** Update the Filters options with a set of new options */
  updateFilters?: (columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPresetOrDynamically: boolean) => void;

  /** Update the Pagination component with it's new page number and size */
  updatePagination?: (newPage: number, pageSize: number) => void;

  /** Update the Sorters options with a set of new options */
  updateSorters?: (sortColumns?: ColumnSort[], presetSorters?: CurrentSorter[]) => void;

  /** Update the backend service options */
  updateOptions: (serviceOptions?: BackendServiceOption) => void;

  // --
  // Events / Methods
  // -----------------

  /** Execute when any of the filters changed */
  // @deprecated return output should be string only not Promise
  processOnFilterChanged: (event: Event, args: FilterChangedArgs) => string | Promise<string>;

  /** Execute when the pagination changed */
  processOnPaginationChanged: (event: Event | undefined, args: PaginationChangedArgs) => string;

  /** Execute when any of the sorters changed */
  processOnSortChanged: (event: Event, args: SortChangedArgs) => string;
}
