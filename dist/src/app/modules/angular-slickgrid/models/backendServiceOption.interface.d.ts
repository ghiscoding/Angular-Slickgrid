import { BackendEventChanged } from './backendEventChanged.interface';
export interface BackendServiceOption {
    datasetName?: string;
    paginationOptions?: any;
    filteringOptions?: any[];
    sortingOptions?: any[];
    onBackendEventApi?: BackendEventChanged;
}
