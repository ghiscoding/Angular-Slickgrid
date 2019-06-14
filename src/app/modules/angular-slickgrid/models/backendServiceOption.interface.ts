import { QueryArgument } from './queryArgument.interface';
import { BackendEventChanged } from './backendEventChanged.interface';

export interface BackendServiceOption {
  /** Array of column ids that are included in the column definitions */
  datasetName?: string;

  /** What are the pagination options? ex.: (first, last, offset) */
  paginationOptions?: any;

  /** array of Filtering Options, ex.: [{ field: 'firstName', operator: 'EQ', value: 'John' }] */
  filteringOptions?: any[];

  /** array of Filtering Options, ex.: [{ field: 'firstName', direction: 'DESC' }] */
  sortingOptions?: any[];

  /** Execute the process callback command on component init (page load) */
  executeProcessCommandOnInit?: boolean;

  /**
   * Extra query arguments that be passed in addition to the default query arguments
   * For example in GraphQL, if we want to pass "userId" and we want the query to look like
   * users (first: 20, offset: 10, userId: 123) { ... }
   */
  extraQueryArguments?: QueryArgument[];
}
