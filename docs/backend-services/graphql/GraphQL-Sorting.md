The implementation of a GraphQL Service requires a certain structure to follow for `Slickgrid-Universal` to work correctly (it will fail if your GraphQL Schema is any different than what is shown below).

### Implementation
For the implementation in your code, refer to the [GraphQL Service](../GraphQL.md) section.

### orderBy
The sorting uses `orderBy` as per this [GitHub Suggestion](https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222) of a Facebook employee. The query will have a `orderBy` argument with an array of filter properties:
- `orderBy`: array of sorting object(s) (see below)
  - `field`: field name to sort
  - `direction`: a GraphQL enum (server side) that can have 1 of these choices:
    - `ASC`, `DESC`

**Note:** the `orderBy` order is following the order of how the filter objects were entered in the array.

For example
```ts
users (first: 20, offset: 10, orderBy: [{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]) {
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
import { GraphqlService, GraphqlPaginatedResult, GraphqlServiceApi, } from '@slickgrid-universal/graphql';

export class Sample {
  prepareDatagrid(private graphqlService: GraphqlService ) {
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

```ts
// the orderBy/filterBy fields will keep the dot notation while nodes are exploded
{
  users(first: 20, offset: 0, orderBy: [{field: "billing.address.street", direction: ASC}]) {
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