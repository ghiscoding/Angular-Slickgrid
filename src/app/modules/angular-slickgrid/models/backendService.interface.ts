import {
  BackendServiceOption,
  Column,
  ColumnFilters,
  FilterChangedArgs,
  GridOption,
  Pagination,
  PaginationChangedArgs,
  PresetFilter,
  PresetSorter,
  SortChangedArgs,
  SortChanged
} from './../models/index';

export interface BackendService {
  /** Backend Service options */
  options?: BackendServiceOption;

  /** Build and the return the backend service query string */
  buildQuery: (serviceOptions?: BackendServiceOption) => string;

  /** initialize the backend service with certain options */
  init?: (serviceOptions?: BackendServiceOption, pagination?: Pagination, grid?: any) => void;

  /** DEPRECATED, please use "init()" instead */
  initOptions?: (serviceOptions?: BackendServiceOption, pagination?: Pagination, gridOptions?: GridOption, columnDefinitions?: Column[]) => void;

  /** Get the dataset name */
  getDatasetName?: () => string;

  /** Get the Filters that are currently used by the grid */
  getCurrentFilters?: () => ColumnFilters | PresetFilter[];

  /** Get the Sorters that are currently used by the grid */
  getCurrentSorters?: () => ColumnFilters | PresetFilter[];

  /** Reset the pagination options */
  resetPaginationOptions: () => void;

  /** Update the Filters options with a set of new options */
  updateFilters?: (columnFilters: ColumnFilters | PresetFilter[], isUpdatedByPreset: boolean) => void;

  /** Update the Sorters options with a set of new options */
  updateSorters?: (sortColumns?: SortChanged[], presetSorters?: PresetSorter[]) => void;

  /** Update the backend service options */
  updateOptions: (serviceOptions?: BackendServiceOption) => void;

  // --
  // Events
  // ---------

  /** Fired when any of the filters changed */
  onFilterChanged: (event: Event, args: FilterChangedArgs) => Promise<string>;

  /** Fired when the pagination changed */
  onPaginationChanged: (event: Event | undefined, args: PaginationChangedArgs) => string;

  /** Fired when any of the sorters changed */
  onSortChanged: (event: Event, args: SortChangedArgs) => string;
}
