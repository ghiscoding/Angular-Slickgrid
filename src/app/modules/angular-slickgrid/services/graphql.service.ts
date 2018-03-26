import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { mapOperatorType, mapOperatorByFilterType, mapOperatorByFieldType } from './utilities';
import {
  BackendService,
  Column,
  ColumnFilter,
  ColumnFilters,
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  FieldType,
  FilterChangedArgs,
  GraphqlCursorPaginationOption,
  GraphqlDatasetFilter,
  GraphqlFilteringOption,
  GraphqlPaginationOption,
  GraphqlServiceOption,
  GraphqlSortingOption,
  GridOption,
  Pagination,
  PaginationChangedArgs,
  SortChanged,
  SortChangedArgs,
  SortDirection,
  SortDirectionString
} from './../models/index';
import QueryBuilder from './graphqlQueryBuilder';

// timer for keeping track of user typing waits
let timer: any;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class GraphqlService implements BackendService {
  private _currentFilters: ColumnFilters | CurrentFilter[];
  private _currentPagination: CurrentPagination;
  private _currentSorters: CurrentSorter[];
  private _columnDefinitions: Column[];
  private _gridOptions: GridOption;
  private _grid: any;
  options: GraphqlServiceOption;
  pagination: Pagination | undefined;
  defaultOrderBy: GraphqlSortingOption = { field: 'id', direction: SortDirection.ASC };
  defaultPaginationOptions: GraphqlPaginationOption | GraphqlCursorPaginationOption = {
    first: DEFAULT_ITEMS_PER_PAGE,
    offset: 0
  };

  constructor(private translate: TranslateService) {}

  /**
   * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
   * @param serviceOptions GraphqlServiceOption
   */
  buildQuery() {
    if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
      throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
    }

    // get the column definitions and exclude some if they were tagged as excluded
    let columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
    columnDefinitions = columnDefinitions.filter((column: Column) => !column.excludeFromQuery);

    const queryQb = new QueryBuilder('query');
    const datasetQb = new QueryBuilder(this.options.datasetName);
    const pageInfoQb = new QueryBuilder('pageInfo');
    const dataQb = (this.options.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');

    // get all the columnds Ids for the filters to work
    let columnIds: string[] = [];
    if (columnDefinitions && Array.isArray(columnDefinitions)) {
      for (const column of columnDefinitions) {
        columnIds.push(column.field);

        // if extra "fields" are passed, also push them to columnIds
        if (column.fields) {
          columnIds.push(...column.fields);
        }
      }
      // columnIds = columnDefinitions.map((column) => column.field);
    } else {
      columnIds = this.options.columnIds || [];
    }

    // Slickgrid also requires the "id" field to be part of DataView
    // add it to the GraphQL query if it wasn't already part of the list
    if (columnIds.indexOf('id') === -1) {
      columnIds.unshift('id');
    }

    const filters = this.buildFilterQuery(columnIds);

    if (this.options.isWithCursor) {
      // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
      pageInfoQb.find('hasNextPage', 'endCursor');
      dataQb.find(['cursor', { node: filters }]);
    } else {
      // ...pageInfo { hasNextPage }, nodes { _filters_ }
      pageInfoQb.find('hasNextPage');
      dataQb.find(filters);
    }

    datasetQb.find(['totalCount', pageInfoQb, dataQb]);

    // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
    const datasetFilters: GraphqlDatasetFilter = {
      ...this.options.paginationOptions,
      first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first
    };

    if (!this.options.isWithCursor) {
      datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
    }

    if (this.options.sortingOptions && Array.isArray(this.options.sortingOptions) && this.options.sortingOptions.length > 0) {
      // orderBy: [{ field:x, direction: 'ASC' }]
      datasetFilters.orderBy = this.options.sortingOptions;
    }
    if (this.options.filteringOptions && Array.isArray(this.options.filteringOptions) && this.options.filteringOptions.length > 0) {
      // filterBy: [{ field: date, operator: '>', value: '2000-10-10' }]
      datasetFilters.filterBy = this.options.filteringOptions;
    }
    if (this.options.addLocaleIntoQuery) {
      // first: 20, ... locale: "en-CA"
      datasetFilters.locale = this.translate.currentLang || 'en';
    }

    // query { users(first: 20, orderBy: [], filterBy: [])}
    datasetQb.filter(datasetFilters);
    queryQb.find(datasetQb);

    const enumSearchProperties = ['direction:', 'field:', 'operator:'];
    return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
  }

  /**
   * From an input array of strings, we want to build a GraphQL query string.
   * The process has to take the dot notation and parse it into a valid GraphQL query
   * Following this SO answer https://stackoverflow.com/a/47705476/1212166
   *
   * INPUT
   *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
   * OUTPUT
   * firstName, lastName, billing{address{street, zip}}
   * @param inputArray
   */
  buildFilterQuery(inputArray: string[]) {

    const set = (o: any = {}, a: any) => {
      const k = a.shift();
      o[k] = a.length ? set(o[k], a) : null;
      return o;
    };

    const output = inputArray.reduce((o: any, a: string) => set(o, a.split('.')), {});

    return JSON.stringify(output)
      .replace(/\"|\:|null/g, '')
      .replace(/^\{/, '')
      .replace(/\}$/, '');
  }

  init(serviceOptions?: GraphqlServiceOption, pagination?: Pagination, grid?: any): void {
    this._grid = grid;
    this.options = serviceOptions || {};
    this.pagination = pagination;

    if (grid && grid.getColumns && grid.getOptions) {
      this._columnDefinitions = grid.getColumns();
      this._gridOptions = grid.getOptions();
    }
  }

  /**
   * Get an initialization of Pagination options
   * @return Pagination Options
   */
  getInitPaginationOptions(): GraphqlDatasetFilter {
    return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
  }

  /** Get the GraphQL dataset name */
  getDatasetName(): string {
    return this.options.datasetName || '';
  }

  /** Get the Filters that are currently used by the grid */
  getCurrentFilters(): ColumnFilters | CurrentFilter[] {
    return this._currentFilters;
  }

  /** Get the Pagination that is currently used by the grid */
  getCurrentPagination(): CurrentPagination {
    return this._currentPagination;
  }

  /** Get the Sorters that are currently used by the grid */
  getCurrentSorters(): CurrentSorter[] {
    return this._currentSorters;
  }

  /*
   * Reset the pagination options
   */
  resetPaginationOptions() {
    let paginationOptions;
    if (this.options.isWithCursor) {
      // first, last, after, before
      paginationOptions = {
        after: '',
        before: undefined,
        last: undefined
      } as GraphqlCursorPaginationOption;
    } else {
      // first, last, offset
      paginationOptions = (this.options.paginationOptions || this.getInitPaginationOptions()) as GraphqlPaginationOption;
      paginationOptions.offset = 0;
    }

    // save current pagination as Page 1 and page size as "first" set size
    this._currentPagination = {
      pageNumber: 1,
      pageSize: paginationOptions.first
    };

    this.updateOptions({ paginationOptions });
  }

  updateOptions(serviceOptions?: GraphqlServiceOption) {
    this.options = { ...this.options, ...serviceOptions };
  }

  /*
   * FILTERING
   */
  onFilterChanged(event: Event, args: FilterChangedArgs): Promise<string> {
    const gridOptions: GridOption = this._gridOptions || args.grid.getOptions();
    const backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;

    if (backendApi === undefined) {
      throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
    }

    // only add a delay when user is typing, on select dropdown filter it will execute right away
    let debounceTypingDelay = 0;
    if (event && (event.type === 'keyup' || event.type === 'keydown')) {
      debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
    }

    const promise = new Promise<string>((resolve, reject) => {
      if (!args || !args.grid) {
        throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
      }

      // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
      // wait a minimum user typing inactivity before processing any query
      clearTimeout(timer);
      timer = setTimeout(() => {
        // loop through all columns to inspect filters & set the query
        this.updateFilters(args.columnFilters, false);

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
    const pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
    this.updatePagination(args.newPage, pageSize);

    // build the GraphQL query which we will use in the WebAPI callback
    return this.buildQuery();
  }

  /*
   * SORTING
   * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
   * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
   */
  onSortChanged(event: Event, args: SortChangedArgs) {
    const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });

    // loop through all columns to inspect sorters & set the query
    this.updateSorters(sortColumns);

    // build the GraphQL query which we will use in the WebAPI callback
    return this.buildQuery();
  }

  /**
   * loop through all columns to inspect filters & update backend service filteringOptions
   * @param columnFilters
   */
  updateFilters(columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPreset: boolean) {
    // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
    this._currentFilters = this.castFilterToColumnFilter(columnFilters);

    const searchByArray: GraphqlFilteringOption[] = [];
    let searchValue: string | string[];

    for (const columnId in columnFilters) {
      if (columnFilters.hasOwnProperty(columnId)) {
        const columnFilter = columnFilters[columnId];

        // if user defined some "presets", then we need to find the filters from the column definitions instead
        let columnDef: Column | undefined;
        if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
          columnDef = this._columnDefinitions.find((column: Column) => column.id === columnFilter.columnId);
        } else {
          columnDef = columnFilter.columnDef;
        }
        if (!columnDef) {
          throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
        }

        const fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
        const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
        let fieldSearchValue = columnFilter.searchTerm;
        if (typeof fieldSearchValue === 'undefined') {
          fieldSearchValue = '';
        }

        if (typeof fieldSearchValue !== 'string' && !searchTerms) {
          throw new Error(`GraphQL filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FilterType.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
        }

        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
        const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
        let operator = columnFilter.operator || ((matches) ? matches[1] : '');
        searchValue = (!!matches) ? matches[2] : '';
        const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');

        // no need to query if search value is empty
        if (fieldName && searchValue === '' && searchTerms.length === 0) {
          continue;
        }

        // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
        if (searchTerms && searchTerms.length > 0) {
          searchValue = searchTerms.join(',');
        } else if (typeof searchValue === 'string') {
          // escaping the search value
          searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
          if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
            operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
          }
        }

        // if we didn't find an Operator but we have a Filter Type, we should use default Operator
        // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
        if (!operator && columnDef.filter) {
          operator = mapOperatorByFilterType(columnDef.filter.type || '');
        }

        // if we still don't have an operator find the proper Operator to use by it's field type
        if (!operator) {
          operator = mapOperatorByFieldType(columnDef.type || FieldType.string);
        }

        searchByArray.push({
          field: fieldName,
          operator: mapOperatorType(operator),
          value: searchValue
        });
      }
    }

    // update the service options with filters for the buildQuery() to work later
    this.updateOptions({ filteringOptions: searchByArray });
  }

  /**
   * Update the pagination component with it's new page number and size
   * @param newPage
   * @param pageSize
   */
  updatePagination(newPage: number, pageSize: number) {
    this._currentPagination = {
      pageNumber: newPage,
      pageSize
    };

    let paginationOptions;
    if (this.options.isWithCursor) {
      paginationOptions = {
        first: pageSize
      };
    } else {
      paginationOptions = {
        first: pageSize,
        offset: (newPage - 1) * pageSize
      };
    }

    this.updateOptions({ paginationOptions });
  }

  /**
   * loop through all columns to inspect sorters & update backend service sortingOptions
   * @param columnFilters
   */
  updateSorters(sortColumns?: SortChanged[], presetSorters?: CurrentSorter[]) {
    let currentSorters: CurrentSorter[] = [];
    let graphqlSorters: GraphqlSortingOption[] = [];

    if (!sortColumns && presetSorters) {
      // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
      currentSorters = presetSorters;
      currentSorters.forEach((sorter) => sorter.direction = sorter.direction.toUpperCase() as SortDirectionString);

      // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
      const tmpSorterArray = currentSorters.map((sorter) => {
        const columnDef = this._columnDefinitions.find((column: Column) => column.id === sorter.columnId);
        graphqlSorters.push({
          field: (columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '',
          direction: sorter.direction
        });
        return {
          columnId: sorter.columnId,
          sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
        };
      });
      this._grid.setSortColumns(tmpSorterArray);
    } else if (sortColumns && !presetSorters) {
      // build the orderBy array, it could be multisort, example
      // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
      if (sortColumns && sortColumns.length === 0) {
        graphqlSorters = new Array(this.defaultOrderBy); // when empty, use the default sort
        currentSorters = new Array({ columnId: this.defaultOrderBy.field, direction: this.defaultOrderBy.direction });
      } else {
        if (sortColumns) {
          for (const column of sortColumns) {
            if (column && column.sortCol) {
              currentSorters.push({
                columnId: column.sortCol.id + '',
                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
              });

              graphqlSorters.push({
                field: (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '',
                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
              });
            }
          }
        }
      }
    }

    // keep current Sorters and update the service options with the new sorting
    this._currentSorters = currentSorters;
    this.updateOptions({ sortingOptions: graphqlSorters });
  }

  /**
   * A function which takes an input string and removes double quotes only
   * on certain fields are identified as GraphQL enums (except fields with dot notation)
   * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
   * then the result will be:
   * FROM
   * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
   * TO
   * query { users (orderBy:[{field: firstName, direction: ASC}})}
   *
   * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
   * these fields will keep double quotes while everything else will be stripped of double quotes
   * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
   * TO
   * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
   * @param inputStr input string
   * @param enumSearchWords array of enum words to filter
   * @returns outputStr output string
   */
  trimDoubleQuotesOnEnumField(inputStr: string, enumSearchWords: string[], keepArgumentFieldDoubleQuotes: boolean) {
    const patternWordInQuotes = `\s?((field:\s*)?".*?")`;
    let patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
    patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
    // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
    const reg = new RegExp(patternRegex, 'g');

    return inputStr.replace(reg, (group1, group2, group3) => {
      // remove double quotes except when the string starts with a "field:"
      let removeDoubleQuotes = true;
      if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
        removeDoubleQuotes = false;
      }
      const rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
      return rep;
    });
  }

  //
  // private functions
  // -------------------
  /**
   * Cast provided filters (could be in multiple format) into an array of ColumnFilter
   * @param columnFilters
   */
  private castFilterToColumnFilter(columnFilters: ColumnFilters | CurrentFilter[]): CurrentFilter[] {
    // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
    const filtersArray: ColumnFilter[] = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters;

    return filtersArray.map((filter) => {
      const columnDef = filter.columnDef;
      const header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
      const tmpFilter: CurrentFilter = { columnId: filter.columnId || '' };
      if (filter.operator) {
        tmpFilter.operator = filter.operator;
      }
      if (Array.isArray(filter.searchTerms)) {
        tmpFilter.searchTerms = filter.searchTerms;
      } else {
        tmpFilter.searchTerm = filter.searchTerm;
      }
      return tmpFilter;
    });
  }
}
