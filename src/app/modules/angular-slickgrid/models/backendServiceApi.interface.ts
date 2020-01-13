import { Observable } from 'rxjs';

import { BackendService } from './backendService.interface';

export interface BackendServiceApi {
  /** How long to wait until we start querying backend to avoid sending too many requests to backend server. Default to 750ms */
  filterTypingDebounce?: number;

  /** Backend Service Options */
  options?: any;

  /** Backend Service instance (could be OData, GraphQL or any other Backend Service) */
  service: BackendService;

  /**
   * Do we want to optionally use the local (in memory) filtering strategy?
   * This could be useful if user wishes to load the entire dataset only once with a OData/GraphQL Backend Service
   * and then use local filter strategy (with SlickGrid DataView) with only current local dataset (only what got loaded in memory).
   * This option could be used alone and/or with the "useLocalSorting" property.
   */
  useLocalFiltering?: boolean;

  /**
   * Do we want to optionally use the local (in memory) sorting strategy?
   * This could be useful if user wishes to load the entire dataset only once with a OData/GraphQL Backend Service
   * and then use local sorting strategy (with SlickGrid DataView) with only current local dataset (only what got loaded in memory).
   * This option could be used alone and/or with the "useLocalFiltering" property.
   */
  useLocalSorting?: boolean;

  // --
  // available methods
  // ------------------

  /** On error callback, when an error is thrown by the process execution */
  onError?: (e) => void;

  /** On init (or on page load), what action to perform? */
  onInit?: (query: string) => Promise<any> | Observable<any>;

  /** Before executing the query, what action to perform? For example, start a spinner */
  preProcess?: () => void;

  /** On Processing, we get the query back from the service, and we need to provide a Promise/Observable. For example: this.http.get(myGraphqlUrl) */
  process: (query: string) => Promise<any> | Observable<any>;

  /** After executing the query, what action to perform? For example, stop the spinner */
  postProcess?: (response: any) => void;


  /**
   * INTERNAL USAGE ONLY by Angular-Slickgrid
   * This internal process will be run just before postProcess and is meant to refresh the Dataset & Pagination after a GraphQL call
   */
  internalPostProcess?: (result: any) => void;
}
