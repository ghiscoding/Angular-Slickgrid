The implementation of a GraphQL Service requires a certain structure to follow for `Slickgrid-Universal` to work correctly (it will fail if your GraphQL Schema is any different than what is shown below).

### Implementation
For the implementation in your code, refer to the [GraphQL Service](../GraphQL.md) section.

### Without Cursor (recommended)
Pagination without cursor, this is the simplest implementation and is what we use on our side. The query can have any of the 3 arguments:
- `first`: integer representing how many rows of data to get from the start of dataset
- `last`: integer representing how many rows of data to get from the end of dataset
- `offset`: integer representing how many to skip

For example
```ts
users (first:20, offset: 10) {
  totalCount
  nodes {
    name
    gender
  }
}
```

### With Cursor `useCursor`
Cursor Pagination is more generally used for real-time data scenarios. It usually reads sequentially from the head or tail of a list. It cannot navigate directly to the middle of a list. It conceptually treats the data similarly to a LinkedList as opposed to a Vector.

Pagination with cursor, the query can have any of the 4 arguments:
- `first`: integer representing how many rows of data to get from the start of dataset
- `after`: pull data starting at `cursor` "x", where "x" is the last item `cursor`
- `last`: integer representing how many rows of data to get from the end of dataset
- `before`: pull data before a `cursor` "x", where "x" is the last item `cursor`

For example
```ts
users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
  totalCount
  pageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
  edges {
    cursor
    node {
      name
      gender
    }
  }
}
```

To retrieve subsequent data, the `pageInfo.endCursor` property should be used as part of the next query.
eg:
```ts
users (first:20, after:"${pageInfo.endCursor}")
```

or when navigating backwards
```ts
users (last:20, before:"${pageInfo.startCursor}")
```

When using the `paginationService`, this is handled by calling `setCursorPageInfo(pageInfo)`.

Also note the difference in behaviour between `relay` style pagination as it affects the returned `pageInfo` object.
eg
```ts
relay pagination - Infinte scrolling appending data
  page1: {startCursor: A, endCursor: B }
  page2: {startCursor: A, endCursor: C }
  page3: {startCursor: A, endCursor: D }

non-relay pagination - Getting page chunks
  page1: {startCursor: A, endCursor: B }
  page2: {startCursor: B, endCursor: C }
  page3: {startCursor: C, endCursor: D }
```