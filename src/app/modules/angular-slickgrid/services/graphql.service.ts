import { mapOperatorType, parseUtcDate } from './utilities';
import {
  BackendService,
  BackendServiceOption,
  CaseType,
  FilterChangedArgs,
  FieldType,
  GraphqlCursorPaginationOption,
  GraphqlDatasetFilter,
  GraphqlFilteringOption,
  GraphqlPaginationOption,
  GraphqlServiceOption,
  GraphqlSortingOption,
  PaginationChangedArgs,
  SortChangedArgs,
  SortDirection
} from './../models';
import QueryBuilder from './graphqlQueryBuilder';
let timer: any;

export class GraphqlService implements BackendService {
  serviceOptions: GraphqlServiceOption = {};
  defaultOrderBy: GraphqlSortingOption = { field: 'id', direction: SortDirection.ASC };

  /**
   * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
   * @param serviceOptions GraphqlServiceOption
   */
  buildQuery(serviceOptions?: GraphqlServiceOption) {
    if (!this.serviceOptions.datasetName || !this.serviceOptions.dataFilters) {
      throw new Error('GraphQL Service requires "datasetName" & "dataFilters" properties for it to work');
    }
    const queryQb = new QueryBuilder('query');
    const datasetQb = new QueryBuilder(this.serviceOptions.datasetName);
    const pageInfoQb = new QueryBuilder('pageInfo');
    const dataQb = (this.serviceOptions.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');

    if (this.serviceOptions.isWithCursor) {
      // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
      pageInfoQb.find('hasNextPage', 'endCursor');
      dataQb.find(['cursor', { 'node': this.serviceOptions.dataFilters }]);
    } else {
      // ...pageInfo { hasNextPage }, nodes { _filters_ }
      pageInfoQb.find('hasNextPage');
      dataQb.find(this.serviceOptions.dataFilters);
    }

    datasetQb.find(['totalCount', pageInfoQb, dataQb]);

    // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
    const datasetFilters: GraphqlDatasetFilter = this.serviceOptions.paginationOptions;
    if (this.serviceOptions.sortingOptions) {
      // orderBy: [{ field:x, direction: 'ASC' }]
      datasetFilters.orderBy = this.serviceOptions.sortingOptions;
    }
    if (this.serviceOptions.filteringOptions) {
      // filterBy: [{ fieldName: date, fieldOperator: '>', fieldValue: '2000-10-10' }]
      datasetFilters.filterBy = this.serviceOptions.filteringOptions;
    }

    // query { users(first: 20, orderBy: [], filterBy: [])}
    datasetQb.filter(datasetFilters);
    queryQb.find(datasetQb);

    const enumSearchProperties = ['direction:', 'field:', 'operator:'];
    return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties);
  }

  buildPaginationQuery(serviceOptions?: GraphqlServiceOption) {

  }
  buildSortingQuery(serviceOptions?: GraphqlServiceOption) {

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
      } as GraphqlCursorPaginationOption;
    } else {
      // first, last, offset
      paginationOptions = this.serviceOptions.paginationOptions as GraphqlPaginationOption;
      paginationOptions.offset = 0 ;
    }
    this.updateOptions({ paginationOptions });
  }

  updateOptions(serviceOptions?: GraphqlServiceOption) {
    this.serviceOptions = { ...this.serviceOptions, ...serviceOptions };
  }

  saveColumnFilter(fieldName: string, value: string, terms?: any[]) {
  }

  filterChanged(event, args) {
    console.log(event, args);
  }
  sorterChanged(event, args) {
    console.log(event, args);
    return 'this is the query';
  }

  /*
   * FILTERING
   */
  onFilterChanged(event: Event, args: FilterChangedArgs): Promise<string> {
    const searchByArray: GraphqlFilteringOption[] = [];
    const serviceOptions: BackendServiceOption = args.grid.getOptions();
    let debounceTypingDelay = 0;
    if (event.type === 'keyup' || event.type === 'keydown') {
      debounceTypingDelay = serviceOptions.onBackendEventApi.filterTypingDebounce || 700;
    }

    const promise = new Promise<string>((resolve, reject) => {
      if (!args || !args.grid) {
        throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
      }

      // loop through all columns to inspect filters
      for (const columnId in args.columnFilters) {
        if (args.columnFilters.hasOwnProperty(columnId)) {
          const columnFilter = args.columnFilters[columnId];
          const columnDef = columnFilter.columnDef;
          const fieldName = columnDef.field || columnDef.name || '';
          const fieldType = columnDef.type || 'string';
          let fieldSearchValue = columnFilter.searchTerm;
          if (typeof fieldSearchValue === 'undefined') {
            fieldSearchValue = '';
          }
          if (typeof fieldSearchValue !== 'string') {
            throw new Error(`GraphQL filter term property must be provided type "string", if you use filter with options then make sure your ids are also string. For example: filter: {type: FormElementType.select, selectOptions: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
          }

          const searchTerms = columnFilter.listTerm || [];
          fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
          const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
          let operator = columnFilter.operator || ((matches) ? matches[1] : '');
          let searchValue = (!!matches) ? matches[2] : '';
          const lastValueChar = (!!matches) ? matches[3] : '';

          // no need to query if search value is empty
          if (fieldName && searchValue === '') {
            this.removeColumnFilter(fieldName);
            continue;
          }

          // escaping the search value
          searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
          searchValue = encodeURIComponent(searchValue); // encode URI of the final search value

          if (operator === '*' || lastValueChar === '*') {
            operator = (operator === '*') ? 'endsWith' : 'startsWith';
          }

          searchByArray.push({
            field: fieldName,
            operator: mapOperatorType(operator),
            value: searchValue
          });
        }
      }

      this.updateOptions({ filteringOptions: searchByArray });

      // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
      // wait a minimum user typing inactivity before processing any query
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.resetPaginationOptions();
        resolve(this.buildQuery());
      }, debounceTypingDelay);
    });

    return promise;
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

    this.updateOptions({ paginationOptions });

    // build the GraphQL query which we will use in the WebAPI callback
    return this.buildQuery();
  }

  /*
   * SORTING
   * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
   * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
   */
  onSortChanged(event: Event, args: SortChangedArgs) {
    let sortByArray: GraphqlSortingOption[] = [];
    const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });

    // build the orderBy array, it could be multisort, example
    // orderBy:[{sort: lastName, direction: ASC}, {sort: firstName, direction: DESC}]
    if (sortColumns && sortColumns.length === 0) {
      sortByArray = new Array(this.defaultOrderBy); // when empty, use the default sort
    } else {
      if (sortColumns) {
        for (const column of sortColumns) {
          const fieldName = column.sortCol.field || column.sortCol.id;
          const direction = column.sortAsc ? SortDirection.ASC : SortDirection.DESC;
          sortByArray.push({
            field: fieldName,
            direction
          });
        }
      }
    }

    this.updateOptions({ sortingOptions: sortByArray });

    // build the GraphQL query which we will use in the WebAPI callback
    return this.buildQuery();
  }

  /**
   * A function which takes an input string and removes double quotes only
   * on certain fields are identified as GraphQL enums
   * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
   * then the result will be:
   * FROM
   * query { users (orderBy:[{sort:"firstName", direction:"ASC"} }
   * TO
   * query { users (orderBy:[{sort: firstName, direction: ASC}}
   * @param inputStr input string
   * @param enumSearchWords array of enum words to filter
   * @returns outputStr output string
   */
  trimDoubleQuotesOnEnumField(inputStr: string, enumSearchWords: string[]) {
    const patternWordInQuotes = `\s?(".*?")`;
    let patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
    patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"

    // example with (sort: & direction:):  /sort:s?(".*?")|direction:s?(".*?")/
    const reg = new RegExp(patternRegex, 'g');

    return inputStr.replace(reg, function (group1, group2, group3) {
      const rep = group1.replace(/"/g, '');
      return rep;
    });
  }
}
