import { BackendService } from './index';
import { BackendServiceOption } from './backendServiceOption.interface';
import { Observable } from 'rxjs';
import { GraphqlResult } from './graphqlResult.interface';

export interface BackendEventChanged {
  options?: BackendServiceOption;

  /** On init (or on page load), what action to perform? */
  onInit?: (query: string) => Promise<GraphqlResult | any> | Observable<GraphqlResult | any>;

  /** Before executing the query, what action to perform? For example, start a spinner */
  preProcess?: () => void;

  /** On Processing, we get the query back from the service, and we need to provide a Promise/Observable. For example: this.http.get(myGraphqlUrl) */
  process: (query: string) => Promise<GraphqlResult | any> | Observable<GraphqlResult | any>;


  /** After executing the query, what action to perform? For example, stop the spinner */
  postProcess?: (response: any) => void;

  /** Backend Service instance (could be OData or GraphQL Service) */
  service?: BackendService;

  /** How long to wait until we start querying backend to avoid sending too many requests to backend server. Default to 750ms */
  filterTypingDebounce?: number;

  /**
   * INTERNAL USAGE ONLY by Angular-Slickgrid
   * This internal process will be run just before postProcess and is meant to refresh the Dataset & Pagination after a GraphQL call
   */
  internalPostProcess?: (result: GraphqlResult) => void;
}
