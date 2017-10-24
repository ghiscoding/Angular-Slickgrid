import { BackendServiceOption } from './backendServiceOption.interface';
import { SortChangedArgs } from './sortChangedArgs.interface';
import { PaginationChangedArgs } from './paginationChangedArgs.interface';
import { FilterChangedArgs } from './filterChangedArgs.interface';
export interface BackendService {
    buildQuery: (serviceOptions?: BackendServiceOption) => string;
    initOptions: (serviceOptions?: BackendServiceOption) => void;
    resetPaginationOptions: () => void;
    updateOptions: (serviceOptions?: BackendServiceOption) => void;
    onFilterChanged: (event: Event, args: FilterChangedArgs) => Promise<string>;
    onPaginationChanged: (event: Event, args: PaginationChangedArgs) => string;
    onSortChanged: (event: Event, args: SortChangedArgs) => string;
}
