##### index
- [Extra Query Arguments](#extra-query-arguments)
- [Changing/Updating Options Dynamically](#changingupdating-options-dynamically)
- [GraphQL without Pagination](#graphql-without-pagination)
- [GraphQL Server Definitions](#graphql-server-definitions)
  - [Pagination](graphql/GraphQL-Pagination.md)
  - [Sorting](graphql/GraphQL-Sorting.md)
  - [Filtering](graphql/GraphQL-Filtering.md)
- [Infinite Scroll](../grid-functionalities/infinite-scroll.md#infinite-scroll-with-backend-services)

### Description
GraphQL Backend Service (for Pagination purposes) to get data from a backend server with the help of GraphQL.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/gridgraphql) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-graphql.component.ts)

### Note
You can use it when you need to support **Pagination** (though you could disable Pagination if you wish), that is when your dataset is rather large and has typically more than 5k rows, with a GraphQL endpoint. If your dataset is small (less than 5k rows), then you might be better off with [regular grid](https://ghiscoding.github.io/Angular-Slickgrid/#/basic) with the "dataset.bind" property. SlickGrid can easily handle million of rows using a DataView object, but personally when the dataset is known to be large, I usually use a backend service (OData or GraphQL) and when it's small I go with a [regular grid](https://ghiscoding.github.io/Angular-Slickgrid/#/basic).

## Implementation
To connect a backend service into `Slickgrid-Universal`, you simply need to modify your `gridOptions` and add a declaration of `backendServiceApi`. See below for the signature and an example further down below.

### TypeScript Signature
```ts
backendServiceApi: {
  // On init (or on page load), what action to perform?
  onInit?: (query: string) => Promise<any>;

  // Before executing the query, what action to perform? For example, start a spinner
  preProcess?: () => void;

  // On Processing, we get the query back from the service, and we need to provide a Promise. For example: this.http.get(myGraphqlUrl)
  process: (query: string) => Promise<any>;

  // After executing the query, what action to perform? For example, stop the spinner
  postProcess: (response: any) => void;

  // Backend Service instance (could be OData or GraphQL Service)
  service: BackendService;

  // Throttle the amount of requests sent to the backend. Default to 500ms
  filterTypingDebounce?: number;
}
```
As you can see, you mainly need to define which service to use (GridODataService or GraphQLService) and finally add the `process` and `postProcess` callback, while all the rest are totally optional.

### Typescript GraphQL Service Options
You can also pass certain options to the `backendServiceApi` through the `options` property. The list of options is the following

```typescript
export interface GraphqlServiceOption extends BackendServiceOption {
  /**
   * When using Translation, we probably want to add locale in the query for the filterBy/orderBy to work
   * ex.: users(first: 10, offset: 0, locale: "en-CA", filterBy: [{field: name, operator: EQ, value:"John"}]) {
   */
  addLocaleIntoQuery?: boolean;

  /** Array of column ids that are included in the column definitions */
  columnIds?: string[];

  /** What is the dataset, this is required for the GraphQL query to be built */
  datasetName?: string;

  /** Column definitions, you can pass this instead of "columnIds" */
  columnDefinitions?: Column[];

  /** Used for defining the operation name when building the GraphQL query */
  operationName?: string;

  /** Use Pagination Cursor in the GraphQL Server. Note: previously named `isWithCursor */
  useCursor?: boolean;

  /** What are the pagination options? ex.: (first, last, offset) */
  paginationOptions?: GraphqlPaginationOption | GraphqlCursorPaginationOption;

  /** array of Filtering Options, ex.: { field: name, operator: EQ, value: "John" }  */
  filteringOptions?: GraphqlFilteringOption[];

  /** array of Filtering Options, ex.: { field: name, direction: DESC }  */
  sortingOptions?: GraphqlSortingOption[];

  /**
   * Do we want to keep double quotes on field arguments of filterBy/sortBy (field: "name" instead of field: name)
   * ex.: { field: "name", operator: EQ, value: "John" }
   */
  keepArgumentFieldDoubleQuotes?: boolean;

  /**
   * When false, searchTerms may be manipulated to be functional with certain filters eg: string only filters.
   * When true, JSON.stringify is used on the searchTerms and used in the query "as-is". It is then the responsibility of the developer to sanitise the `searchTerms` property if necessary.
   */
  useVerbatimSearchTerms?: boolean;
}
```

#### Grid Definition & call of `backendServiceApi`
##### Notes
- Pagination is optional and if not defined, it will use what is set in the  [Slickgrid-Universal - Global Options](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/global-grid-options.ts)
- `onInit` is optional and is there to initialize the grid with data on first page load (typically the same call as `process`)
  - you could load the grid yourself outside of the `gridOptions` which is why it's optional
- `filterTypingDebounce` is a timer (in milliseconds) that waits for user input pause before querying the backend server
  - this is meant to throttle the amount of requests sent to the backend (we don't really want to query every keystroke)
  - 700ms is the default when not provided

##### Code
```ts
import { Component, Injectable, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';
import { GraphqlService, GraphqlPaginatedResult, GraphqlServiceApi, } from '@slickgrid-universal/graphql';

@Injectable()

export class MyComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.columnDefinitions = [
      // your column definitions
    ];

    this.gridOptions = {
      enableFiltering: true,
      enablePagination: true,
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      backendServiceApi: {
        service: new GraphqlService(),

        // add some options to the backend service to work
        // shown below is the minimum setup for the service to work correctly
        options: {
          columnDefinitions: this.columnDefinitions,
          datasetName: 'users',
          paginationOptions: {
            first: 25,
            offset: 0
          }
        },

        // define all the on Event callbacks
        preProcess: () => this.displaySpinner(true),
        process: (query) => this.getAllCustomers(query),
        postProcess: (response) => this.displaySpinner(false)
      }
    };
  }

  // Web API call
  getAllCustomers(graphqlQuery) {
    return this.http.post('/api/customers', { query: graphqlQuery });
  }
}
```

### Extra Query Arguments
You can pass extra query arguments to the GraphQL query via the `extraQueryArguments` property defined in the `backendServiceApi.options`. For example let say you have a list of users and your GraphQL query accepts an optional `userId`, you can write it in code this way:
```ts
this.gridOptions = {
  backendServiceApi: {
    service: new GraphqlService(),

    // add some options to the backend service to work
    options: {
      columnDefinitions: this.columnDefinitions,
      executeProcessCommandOnInit: false, // true by default, which load the data on page load
      datasetName: 'users',
      paginationOptions: {
        first: 25,
        offset: 0
      },
      extraQueryArguments: [{
        field: 'userId',
        value: 567
      }]
    },

    // define all the on Event callbacks
    preProcess: () => this.displaySpinner(true),
    process: (query) => this.getCustomerApiCall(query),
    postProcess: (response) => this.displaySpinner(false)
  }
};
```

The GraphQL query built with these options will be
```ts
// extraQueryArguments will change the userId with
{
  users(first: 20, offset: 0, userId: 567) {
    totalCount,
    nodes {
      id,
      name,
      company
    }
  }
}
```

### Changing/Updating Options Dynamically
You might want to change certain options dynamically, for example passing new set of values to `extraQueryArguments`. For that you will have to first keep a reference to your `GraphqlService` instance and then you can call the `updateOptions` method.

##### Code Example
```ts
export class MyComponent implements OnInit {
  graphqlService: GraphqlService;
  columnDefinitions: Column[];
  gridOptions: GridOption;

  constructor() {
    this.graphqlService = GraphqlService();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  ngOnInit(): void {
    this.columnDefinitions = [
      // ...
    ];

    this.gridOptions = {
      backendServiceApi: {
        service: this.graphqlService,
        // ...
      }
    };
  }
}

changeQueryArguments() {
  // update any Backend Service Options you want
  this.graphqlService.updateOptions({
    extraQueryArguments: [{
      field: 'userId',
      value: 567
    }]
  });

  // then make sure to refresh the dataset
  this.angularGrid.pluginService.refreshBackendDataset();
}
```

### GraphQL without Pagination
By default, the Pagination is enabled and will produce a GraphQL query which includes page related information but you could also use the GraphQL Service without Pagination if you wish by disabling the flag `enablePagination: false` in the Grid Options. However please note that the GraphQL Query will be totally different since it won't include any page related information.

#### Code Example
```ts
this.gridOptions = {
  enablePagination: false,
  backendServiceApi: {
    service: this.graphqlService,
    // ...
  }
};
```

#### Query Change Example
If we take for example a GrahQL Query that includes Pagination versus without Pagination, you will see a much simpler query string. Also, note that the filtering and sorting won't be affected, they will remain as query input.

##### with Pagination
1. `query{ users(first:20, offset:40){ totalCount, nodes{ id, field1, field2 }}}`
2. `query{ users(first:20, offset:40, filterBy: [{ field: field1, value: 'test', operator: StartsWith }]){ totalCount, nodes{ id, field1, field2 }}}`

##### without Pagination
1. `query{ users{ id, field1, field2 }}`
2. `query{ users(filterBy: [{ field: field1, value: 'test', operator: StartsWith }]){ id, field1, field2 }}`

## GraphQL Server Definitions
For the implementation of all 3 actions (filtering, sorting, pagination) with your GraphQL Server, please refer to the sections below to configure your GraphQL Schema accordingly.
- [Pagination](graphql/GraphQL-Pagination.md)
- [Sorting](graphql/GraphQL-Sorting.md)
- [Filtering](graphql/GraphQL-Filtering.md)