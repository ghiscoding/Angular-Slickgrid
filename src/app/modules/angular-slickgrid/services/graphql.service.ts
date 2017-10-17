import { CaseType, FilterChangedArgs, FieldType, GraphqlServiceOption, OdataOption, PaginationChangedArgs, SortChangedArgs } from './../models';
import QueryBuilder from 'graphql-query-builder';

export class GraphqlService {
  serviceOptions: GraphqlServiceOption = {};

  /**
   * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
   * @param serviceOptions GraphqlServiceOption
   */
  buildQuery(serviceOptions?: GraphqlServiceOption) {
    if (!this.serviceOptions.datasetName || !this.serviceOptions.dataFilters) {
      throw new Error('GraphQL Service requires "datasetName" & "dataFilters" properties for it to work');
    }
    const pageFilterQb = new QueryBuilder(this.serviceOptions.datasetName);
    const pageInfoQb = new QueryBuilder('pageInfo');
    const dataQb = (this.serviceOptions.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');

    if (this.serviceOptions.isWithCursor) {
      pageInfoQb.find('hasNextPage', 'endCursor');
      dataQb.find(['cursor', {'node': this.serviceOptions.dataFilters}]);
    } else {
      pageInfoQb.find('hasNextPage');
      dataQb.find(this.serviceOptions.dataFilters);
    }
    pageFilterQb.find(['totalCount', pageInfoQb, dataQb]);
    pageFilterQb.filter(this.serviceOptions.paginationOptions);

    return pageFilterQb.toString();
  }

  initOptions(serviceOptions?: GraphqlServiceOption): void {
    this.serviceOptions = serviceOptions || {};
  }

  removeColumnFilter(fieldName: string): void {

  }

  /*
   * Reset the pagination options
   */
  resetPaginationOptions() {
    let paginationOptions;
    if (this.serviceOptions.isWithCursor) {
      // first, last, after, before
      paginationOptions = {
        after: '',
        before: undefined,
        last: undefined
      };
    } else {
      // first, last, offset
      paginationOptions = {
        offset: 0
      };
    }
    this.updateOptions({ paginationOptions: paginationOptions });
  }

  updateOptions(serviceOptions?: GraphqlServiceOption) {
    this.serviceOptions = { ...this.serviceOptions, ...serviceOptions };
  }

  saveColumnFilter(fieldName: string, value: string, terms?: any[]) {
  }

  /*
   * FILTERING
   */
  onFilterChanged(event: Event, args: FilterChangedArgs) {
  }

  /*
   * PAGINATION
   * With cursor, the query can have 4 arguments (first, after, last, before), for example:
   *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
   *     totalCount
   *     pageInfo {
   *       hasNextPage
   *       endCursor
   *     }
   *     edges {
   *       cursor
   *       node {
   *         name
   *         gender
   *       }
   *     }
   *   }
   * Without cursor, the query can have 3 arguments (first, last, offset), for example:
   *   users (first:20, offset: 10) {
   *     totalCount
   *     pageInfo {
   *       hasNextPage
   *     }
   *     nodes {
   *       name
   *       gender
   *     }
   *   }
   */
  onPaginationChanged(event: Event, args: PaginationChangedArgs) {
    let paginationOptions;
    if (this.serviceOptions.isWithCursor) {
      paginationOptions = {
        first: args.pageSize
      };
    } else {
      paginationOptions = {
        first: args.pageSize,
        offset: (args.newPage - 1) * args.pageSize
      };
    }

    this.updateOptions({ paginationOptions: paginationOptions });

    // build the OData query which we will use in the WebAPI callback
    return this.buildQuery();
  }

  /*
   * SORTING
   */
  onSortChanged(event: Event, args: SortChangedArgs) {
    // will use sorting as per a FB suggestion
    // https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
  }
}
