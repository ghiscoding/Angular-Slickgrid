import { BackendServiceOption } from './backendServiceOption.interface';
import { SortChangedArgs } from './sortChangedArgs.interface';
import { PaginationChangedArgs } from './paginationChangedArgs.interface';
import { FilterChangedArgs } from './filterChangedArgs.interface';

export interface BackendService {
  options?: BackendServiceOption;
  buildQuery: (serviceOptions?: BackendServiceOption) => string;
  initOptions: (serviceOptions?: BackendServiceOption) => void;
  getDatasetName?: () => string;
  resetPaginationOptions: () => void;
  updateOptions: (serviceOptions?: BackendServiceOption) => void;
  onFilterChanged: (event: Event, args: FilterChangedArgs) => Promise<string>;
  onPaginationChanged: (event: Event, args: PaginationChangedArgs) => string;
  onSortChanged: (event: Event, args: SortChangedArgs) => string;
}
