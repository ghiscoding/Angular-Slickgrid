##### index
- [TypeScript signature](#typescript-signature)
- [Usage](#grid-definition--call-of-backendserviceapi)
- [Passing Extra Arguments](#passing-extra-arguments-to-the-query)
- [OData options](#odata-options)
- [Override the filter query](#override-the-filter-query)
- [Infinite Scroll](../grid-functionalities/infinite-scroll.md#infinite-scroll-with-backend-services)

### Description
OData Backend Service (for Pagination purposes) to get data from a backend server with the help of OData.

### Demo
[Demo Page](https://ghiscoding.github.io/Angular-Slickgrid/#/odata) / [Demo Component](https://github.com/ghiscoding/angular-slickgrid/blob/master/src/app/examples/grid-odata.component.ts)

### Note
Use it when you need to support **Pagination** (that is when your dataset is rather large, more than 5k rows) with a OData endpoint. If your dataset is small (less than 5k rows), then go with a [regular grid](https://ghiscoding.github.io/Angular-Slickgrid/#/basic) with the `[dataset]` binding property. SlickGrid can easily handle million of rows using a DataView object, but personally when the dataset is known to be large, I usually use a backend service (OData or GraphQL) and when it's small I go with a [regular grid](https://ghiscoding.github.io/Angular-Slickgrid/#/basic).

## Implementation
To connect a backend service into `Slickgrid-Universal`, you simply need to modify your `gridOptions` and add a declaration of `backendServiceApi` and pass it the `service`. See below for the signature and an example further down below.

### IMPORTANT NOTE
All the code below assumes that your Backend Server (probably in C#) will return the data into an `items` property. You could return the array directly **but it is strongly discouraged to do that** because that will conflict with the `metrics` that you will see in the code below. The best approach is to return your data into a property, like `items` or any property name you wish to use, on your backend server side. Your result should have this kind of structure
```ts
{
  items: [ /* your data */ ]
}
```

### TypeScript Signature
```typescript
backendServiceApi: {
  // Backend Service instance (could be OData or GraphQL Service)
  service: BackendService;

  // add any options you might want to provide to the backend service
  options: OdataOption | GraphqlServiceOption;

  // On init (or on page load), what action to perform?
  onInit?: (query: string) => Promise<any>;

  // Before executing the query, what action to perform? For example, start a spinner
  preProcess?: () => void;

  // On Processing, we get the query back from the service, and we need to provide a Promise. For example: this.http.get(myGraphqlUrl)
  process: (query: string) => Promise<any>;

  // After executing the query, what action to perform? For example, stop the spinner
  postProcess: (response: any) => void;

  // Throttle the amount of requests sent to the backend. Default to 500ms
  filterTypingDebounce?: number;
}
```
As you can see, you mainly need to define which service to use (GridODataService or GraphQLService) and finally add the `process` and `postProcess` callback.

#### Grid Definition & call of `backendServiceApi`
##### Notes
- Pagination is optional and if not defined, it will use what is set in the [Slickgrid-Universal - Global Options](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/common/src/global-grid-options.ts)
- `onInit` is optional and is there to initialize (pre-populate) the grid with data on first page load (typically the same call as `process`)
  - you could load the grid yourself outside of the `gridOptions` which is why it's optional
- `filterTypingDebounce` is a timer (in milliseconds) that waits for user input pause before querying the backend server
  - this is meant to throttle the amount of requests sent to the backend (we don't really want to query every keystroke)
  - 700ms is the default when not provided

##### Code
```ts
import { Component, Injectable, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';
import { GridOdataService, OdataServiceApi, OdataOption } from '@slickgrid-universal/odata';

@Injectable()
export class MyComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.definedGrid();
  }

  defineGrid() {
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
        service: new GridOdataService(),
        // define all the on Event callbacks
        options: {
          caseType: CaseType.pascalCase,
          top: defaultPageSize
        } as OdataOption,
        preProcess: () => this.displaySpinner(true),
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (response) => {
          this.displaySpinner(false);
          this.getCustomerCallback(response);
        }
      }
    };
  }

  // Web API call
  getCustomerApiCall(odataQuery) {
    return this.http.get(`/api/getCustomers?${odataQuery}`);
  }

  getCustomerCallback(response) {
    // totalItems property needs to be filled for pagination to work correctly
    // however we need to force the Framework to do a dirty check, doing a clone object will do just that
    let countPropName = 'totalRecordCount'; // you can use "totalRecordCount" or any name or "odata.count" when "enableCount" is set
    if (this.isCountEnabled) {
      countPropName = (this.odataVersion === 4) ? '@odata.count' : 'odata.count';
    }
    if (this.metrics) {
      this.metrics.totalItemCount = data[countPropName];
    }

    // once pagination totalItems is filled, we can update the dataset
    this.paginationOptions = { ...this.gridOptions.pagination, totalItems: totalItemCount } as Pagination;
    this.dataset = data.items as Customer[];
  }
}
```

### Passing Extra Arguments to the Query
You might need to pass extra arguments to your OData query, for example passing a `userId`, you can do that simply by modifying the query you sent to your `process` callback method. For example
```ts
// Web API call
getCustomerApiCall(odataQuery) { with Fetch Client
  const finalQuery = `${odataQuery}$filter=(userId eq 12345)`;
  return this.http.get(`/api/getCustomers?${finalQuery}`);
}
```

## OData options

All options can be found here: [Slickgrid-Universal - OData Options](https://github.com/ghiscoding/slickgrid-universal/blob/master/packages/odata/src/interfaces/odataOption.interface.ts)

Some are described in more detail below.

### OData version

By default the OData version is set to 2 because it was implemented with that version. If you wish to use version 4, then just change the `version: 4`, there are subtle differences.

```ts
this.gridOptions = {
  backendServiceApi: {
    service: new GridOdataService(),
      options: {
        enableCount: true, // add the count in the OData query, which will return a property named "odata.count" (v2) or "@odata.count" (v4)
        version: 4        // defaults to 2, the query string is slightly different between OData 2 and 4
      } as OdataOption,
      process: (query) => this.getCustomerApiCall(query),
      postProcess: (response) => {
        this.metrics = response.metrics;
        this.displaySpinner(false);
        this.getCustomerCallback(response);
      }
  } as OdataServiceApi
};
```

### Query total items count

The total items count can be queried from the backend by:
```ts
const oDataOptions: OdataOption = {
  enableCount: true;
}
```

When enabled that will add `$inlinecount=allpages` (v2/v3) or `$count=true` (v4) to the query. And the count from the backend's response is extracted and `pagination.totalItems` is updated with that count. The property in the response that is used depends on the oData version specified: `d.__count` for v2, `__count` for v3 and `@odata.count` for v4. If needed a custom extractor function can be set through `oDataOptions.countExtractor`.

### Query only the grid column's fields

Query only the grid column's fields from the backend by:
```ts
const oDataOptions: OdataOption = {
  enableSelect: true;
}
```

For example `columns: [{ id: 'col1', field: 'field1' }, { id: 'col2', field: 'field2' }]` results in the query: `?$select=id,field1,field2`.

A property `id` is always selected from the backend because the grid requires it. This property can be changed by setting `gridOptions.datasetIdPropertyName`.

### Query related resources / expand navigation properties

Specify that related resources (navigation properties) should be retrieved from the backend:
```ts
const oDataOptions: OdataOption = {
  enableExpand: true;
}
```

A navigation property is identified as a field having `/` in it's name. For example `columns: [{ id: 'col1', field: 'nav1/field1' }, { id: 'col2', field: 'nav2/field1' }]` results in the query `?$expand=nav1,nav2`

Often `enableSelect` and `enableExpand` are used in conjunction. And with oData v4 then also navigation properties are selected from the backend. For example `columns: [{ id: 'col1', field: 'nav1/field1' }, { id: 'col2', field: 'nav2/field1' }]` results in the query `?$select=id,$expand=nav1($select=field1),nav2($select=field2)`

```ts
const oDataOptions: OdataOption = {
  enableSelect: true;
  enableExpand: true;
  version: 4
}
```

Navigations within navigations are also supported. For example `columns: [{ id: 'col1', field: 'nav1/subnav1/field1' }]`.

The dataset from the backend is automatically extracted and navigation fields are flattened so the grid can display them and sort/filter just work. The exact property that is used as the dataset depends on the oData version: `d.results` for v2, `results` for v3 and `value` for v4. If needed a custom extractor function can be set through `oDataOptions.datasetExtractor`.
For example if the backend responds with `{ value: [{ id: 1, nav1: { field1: 'x' }, { nav2: { field2: 'y' } } ] }` this will be flattened to `{ value: [{ id: 1, 'nav1/field1': 'x', 'nav2/field2': 'y' } ] }`.

### Override the filter query

Column filters may have a `Custom` operator, that acts as a placeholder for you to define your own logic. To do so, the easiest way is to provide the `filterQueryOverride` callback in the OdataOptions. This method will be called with `BackendServiceFilterQueryOverrideArgs` to let you decide dynamically on how the filter should be assembled.

E.g. you could listen for a specific column and the active OperatorType.custom in order to switch the filter to a matchesPattern SQL LIKE search:

```ts
backendServiceApi: {
  options: {
    filterQueryOverride: ({ fieldName, columnDef, columnFilterOperator, searchValues }) => {
      if (columnFilterOperator === OperatorType.custom && columnDef?.id === 'name') {
        let matchesSearch = searchValues[0].replace(/\*/g, '.*');
        matchesSearch = matchesSearch.slice(0, 1) + '%5E' + matchesSearch.slice(1);
        matchesSearch = matchesSearch.slice(0, -1) + '$\'';

        return `matchesPattern(${fieldName}, ${matchesSearch})`;
      }
    },
  }
}

```
