import { BackendEventChanged } from './backendEventChanged.interface';

export interface BackendServiceOption {
  /** Array of column ids that are included in the column definitions */
  datasetName?: string;

  /** What are the pagination options? ex.: (first, last, offset) */
  paginationOptions?: any;

  /** array of Filtering Options, ex.: { field: name, operator: EQ, value: "John" }  */
  filteringOptions?: any[];

  /** array of Filtering Options, ex.: { field: name, direction: DESC }  */
  sortingOptions?: any[];

  /** Backend Event callbacks that will be used by the Backend Service */
  onBackendEventApi?: BackendEventChanged;
}
