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
  SortChangedArgs
} from './../models/index';

export interface BackendService {
  options?: BackendServiceOption;
  buildQuery: (serviceOptions?: BackendServiceOption) => string;
  initOptions: (serviceOptions?: BackendServiceOption, pagination?: Pagination, gridOptions?: GridOption, columnDefinitions?: Column[]) => void;
  getDatasetName?: () => string;
  getCurrentFilters?: () => ColumnFilters | PresetFilter[];
  resetPaginationOptions: () => void;
  updateFilters?: (columnFilters: ColumnFilters | PresetFilter[], isUpdatedByPreset?: boolean) => void;
  updateSorters?: (columnSorters: PresetSorter[]) => void;
  updateOptions: (serviceOptions?: BackendServiceOption) => void;
  onFilterChanged: (event: Event, args: FilterChangedArgs) => Promise<string>;
  onPaginationChanged: (event: Event | undefined, args: PaginationChangedArgs) => string;
  onSortChanged: (event: Event, args: SortChangedArgs) => string;
}
