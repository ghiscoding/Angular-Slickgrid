The GraphQL JSON result will always follow a certain structure where only the dataset name and the `nodes` array will change. With that in mind, if we look at the `GraphqlResult` TypeScript interface, the JSON result will mostly follow this structure (except when Pagination is disabled if so continue reading):

#### `GraphqlResult` TypeScript interface
The `datasetName` is the only dynamic portion of the structure and in our demo will be `users`.

##### with Pagination
```ts
export interface GraphqlPaginatedResult {
  data: {
    [datasetName: string]: {
      /** result set of data objects (array of data) */
      nodes: any[];

      /** Total count of items in the table (needed for the Pagination to work) */
      totalCount: number; 
    }
  };

  /** Some metrics of the last executed query (startTime, endTime, executionTime, itemCount, totalItemCount) */
  metrics?: Metrics;
}
```

##### without Pagination
```ts
export interface GraphqlResult {
  data: {
    [datasetName: string]: any[];
  };

  /** Some metrics of the last executed query (startTime, endTime, executionTime, itemCount, totalItemCount) */
  metrics?: Metrics;
}
```

### ResultSet
#### Users demo (with Pagination)
If we consider that we defined a grid of Users and we provided the `datasetName: 'users'` with 3 defined columns (firstName, lastName, email), note that `id` will **always** be included as it is a requirement from SlickGrid itself and it must be unique ids. The JSON result could look like the following:

```ts
{
  "data": {
    "users": {
      "totalCount": 2,
      "nodes": [
        {
          "id": 0,
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@doe.com"
        },
        {
          "id": 1,
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "john@doe.com"
        }
      ]
    }
  }
}
```

#### Users demo (**without** Pagination)

```ts
{
  "data": {
    "users": [
      {
        "id": 0,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@doe.com"
      },
      {
        "id": 1,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "john@doe.com"
      }
    ]
  }
}
```