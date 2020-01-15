import { Column } from './column.interface';

export interface BackendServiceOption {
  /**
   * @deprecated (no longer required since the service is always initialized with the grid object and we can get the column definitions from there)
   * Column definitions, used by the Backend Service to build the query according to the columns defined in the grid
   */
  columnDefinitions?: Column[];

  /** What are the pagination options? ex.: (first, last, offset) */
  paginationOptions?: any;

  /** array of Filtering Options, ex.: [{ field: 'firstName', operator: 'EQ', value: 'John' }] */
  filteringOptions?: any[];

  /** array of Filtering Options, ex.: [{ field: 'firstName', direction: 'DESC' }] */
  sortingOptions?: any[];

  /** Execute the process callback command on component init (page load) */
  executeProcessCommandOnInit?: boolean;
}
