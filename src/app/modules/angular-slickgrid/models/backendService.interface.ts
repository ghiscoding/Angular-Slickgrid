import { BackendServiceOption } from './backendServiceOption.interface';
import { FilterChangedArgs } from './filterChangedArgs.interface';
import { Pagination } from './pagination.interface';
import { PaginationChangedArgs } from './paginationChangedArgs.interface';
import { SortChangedArgs } from './sortChangedArgs.interface';

export interface BackendService {
  options?: BackendServiceOption;
  buildQuery: (serviceOptions?: BackendServiceOption) => string;
  initOptions: (serviceOptions?: BackendServiceOption, pagination?: Pagination) => void;
  getDatasetName?: () => string;
  resetPaginationOptions: () => void;
  updateOptions: (serviceOptions?: BackendServiceOption) => void;
  onFilterChanged: (event: Event, args: FilterChangedArgs) => Promise<string>;
  onPaginationChanged: (event: Event | undefined, args: PaginationChangedArgs) => string;
  onSortChanged: (event: Event, args: SortChangedArgs) => string;
}
