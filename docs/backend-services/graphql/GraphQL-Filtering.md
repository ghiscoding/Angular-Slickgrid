##### index
- [filterBy](#filterby)
- [Complex Objects](#complex-objects)
- [Extra Query Arguments](#extra-query-arguments)
- [Override the filter query](#override-the-filter-query)

### Introduction
The implementation of a GraphQL Service requires a certain structure to follow for `Slickgrid-Universal` to work correctly (it will fail if your GraphQL Schema is any different than what is shown below).

### Implementation
For the implementation in your code, refer to the [GraphQL Service](../GraphQL.md) section.

### filterBy
The filtering uses `filterBy` with a structure which we think is flexible enough. The query will have a `filterBy` argument with an array of filter properties:
- `filterBy`: array of filter object(s) (see below)
  - `field`: field name to filter
  - `value`: search filter value
  - `operator`: a GraphQL enum (server side) that can have 1 of these choices:
    - `LT`, `LE`, `GT`, `GE`, `NE`, `EQ`, `Contains`, `Not_Contains`, `StartsWith`, `EndsWith`, `IN`, `NIN`
      - `Contains` is the default and will be used (by the grid) when operator is not provided
      - `IN` and `NIN` (alias to `NOT_IN`) are mainly used for multi-select filtering

**Note:** the `filterBy` order is following the order of how the filter objects were entered in the array.

For example, a filter that would search for a firstName that starts with "John"
- matches: "John", "Johnny", ...
```typescript
users (first: 20, offset: 10, filterBy: [{field: firstName, operator: StartsWith, value: 'John'}]) {
  totalCount
  nodes {
    name
    firstName
    lastName
    gender
  }
}
```

### Complex Objects
Dealing with complex objects are a little bit more involving. Because of some limitation with our [GraphQL for .Net](https://github.com/graphql-dotnet/graphql-dotnet) implementation, we decided to leave `field` as regular strings and keep the dot notation within the string. For that behavior to work, a new `keepArgumentFieldDoubleQuotes` property was added that can be passed to the GraphQL `initOptions()` function. For example, given a complex object field (defined in the Column Definition) that is `field: "billing.street"` will give this GraphQL query (if you have `keepArgumentFieldDoubleQuotes` set to True).

##### Grid Definition example
```ts
import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from 'angular-slickgrid';

@Component({
  templateUrl: './grid-basic.component.html'
})
export class GridBasicComponent implements OnInit {
  columnDefinitions: Column[];
  gridOptions: GridOption;
  dataset: any[];

  ngOnInit(): void {
    this.columnDefinitions = [
      { id: 'name', name: 'Name', field: 'name', filterable: true, sortable: true },
      { id: 'company', name: 'Company', field: 'company', filterable: true },
      { id: 'billingStreet', name: 'Billing Address Street', field: 'billing.address.street', filterable: true, sortable: true },
      { id: 'billingZip', name: 'Billing Address Zip', field: 'billing.address.zip', filterable: true, sortable: true },
    ];

    this.gridOptions = {
      backendServiceApi: {
        service: new GraphqlService(),
        process: (query) => this.userService.getAll<Customer[]>(query),
        options: {
          columnDefinitions: this.columnDefinitions,
          datasetName: 'customers'
        }
      }
    };
  }
}
```

##### GraphQL Query
```typescript
// the orderBy/filterBy fields will keep the dot notation while nodes are exploded
{
  users(first: 20, offset: 0, filterBy: [{field: "billing.address.street", operator: EQ, value: "123 Queens Street"}]) {
    totalCount,
    nodes {
      name,
      company,
      billing {
        address {
          street,
          zip
        }
      }
    }
  }
}
```

From the previous example, you can see that the `orderBy` keeps the (.) dot notation, while the `nodes` is exploded as it should `billing { street }}`. So keep this in mind while building your backend GraphQL service.

### Extra Query Arguments
If you want to pass extra arguments outside of the `filterBy` argument, that will be used for the life of the grid. You can do so by using the `extraQueryArguments` which accept an array of field/value. For example, let say you want to load a grid of items that belongs to a particular user (with a `userId`). You can pass the `extraQueryArguments` to the `backendServiceApi` `options` property, like so

##### Component
```typescript
this.gridOptions = {
  backendServiceApi: {
    service: new GraphqlService(),
    process: (query) => this.userService.getAll<User[]>(query),
    options: {
      columnDefinitions: this.columnDefinitions,
      datasetName: 'users',
      extraQueryArguments: [{
        field: 'userId',
        value: 123
      }]
    }
  }
};
```

##### GraphQL Query
```typescript
// the orderBy/filterBy fields will keep the dot notation while nodes are exploded
{
  users(first: 20, offset: 0, userId: 123) {
    totalCount,
    nodes {
      name,
      company,
      billing {
        address {
          street,
          zip
        }
      }
    }
  }
}
```

### Override the filter query

Column filters may have a `Custom` Operator, that acts as a placeholder for you to define your own logic. To do so, the easiest way is to provide the `filterQueryOverride` callback in the GraphQL Options. This method will be called with `BackendServiceFilterQueryOverrideArgs` to let you decide dynamically on how the filter should be assembled.

E.g. you could listen for a specific column and the active `OperatorType.custom` in order to switch the filter to an SQL LIKE search in GraphQL:

> **Note** technically speaking GraphQL isn't a database query language like SQL, it's an application query language. Depending on your configuration, your GraphQL Server might already support regex querying (e.g. Hasura [_regex](https://hasura.io/docs/latest/queries/postgres/filters/text-search-operators/#_regex)) or you could add your own implementation (e.g. see this SO: https://stackoverflow.com/a/37981802/1212166). Just make sure that whatever custom operator that you want to use, is already included in your GraphQL Schema.
```ts
backendServiceApi: {
  options: {
    filterQueryOverride: ({ fieldName, columnDef, columnFilterOperator, searchValues }) => {
      if (columnFilterOperator === OperatorType.custom && columnDef?.id === 'name') {
        // the `operator` is a string, make sure to implement this new operator in your GraphQL Schema
        return { field: fieldName, operator: 'Like', value: searchValues[0] };
      }
    },
  }
}
```