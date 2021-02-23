import { Injectable } from '@angular/core';
import { parseUtcDate, mapOperatorByFieldType, titleCase } from './utilities';
import {
  BackendService,
  CaseType,
  Column,
  ColumnFilter,
  ColumnFilters,
  ColumnSort,
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  FilterChangedArgs,
  FieldType,
  GridOption,
  OdataOption,
  Pagination,
  PaginationChangedArgs,
  SortChangedArgs,
  SortDirection,
  SortDirectionString,
  OperatorType,
  OdataSortingOption,
  OperatorString,
  SearchTerm
} from './../models/index';
import { OdataQueryBuilderService } from './odataQueryBuilder.service';

const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class GridOdataService implements BackendService {
  private _currentFilters: CurrentFilter[] = [];
  private _currentPagination?: CurrentPagination;
  private _currentSorters: CurrentSorter[] = [];
  private _columnDefinitions!: Column[];
  private _grid: any;
  private _odataService: OdataQueryBuilderService;
  options!: Partial<OdataOption>;
  pagination: Pagination | undefined;
  defaultOptions: OdataOption = {
    top: DEFAULT_ITEMS_PER_PAGE,
    orderBy: '',
    caseType: CaseType.pascalCase
  };

  /** Getter for the Column Definitions */
  get columnDefinitions() {
    return this._columnDefinitions;
  }

  /** Getter for the Odata Service */
  get odataService() {
    return this._odataService;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  constructor() {
    this._odataService = new OdataQueryBuilderService();
  }

  init(serviceOptions: Partial<OdataOption> | undefined, pagination?: Pagination, grid?: any): void {
    this._grid = grid;
    const mergedOptions = { ...this.defaultOptions, ...serviceOptions };

    // unless user specifically set "enablePagination" to False, we'll add "top" property for the pagination in every other cases
    if (this._gridOptions && !this._gridOptions.enablePagination) {
      // save current pagination as Page 1 and page size as "top"
      this._odataService.options = { ...mergedOptions, top: undefined };
      this._currentPagination = undefined;
    } else {
      const topOption = (pagination && pagination.pageSize) ? pagination.pageSize : this.defaultOptions.top;
      this._odataService.options = { ...mergedOptions, top: topOption };
      this._currentPagination = {
        pageNumber: 1,
        pageSize: this._odataService.options.top || this.defaultOptions.top || DEFAULT_PAGE_SIZE,
      };
    }

    this.options = this._odataService.options;
    this.pagination = pagination;

    if (grid && grid.getColumns) {
      this._columnDefinitions = serviceOptions && serviceOptions.columnDefinitions || grid.getColumns();
      this._columnDefinitions = this._columnDefinitions.filter((column: Column) => !column.excludeFromQuery);
    }
  }

  buildQuery(): string {
    return this._odataService.buildQuery();
  }

  clearFilters() {
    this._currentFilters = [];
    this.updateFilters([]);
  }

  clearSorters() {
    this._currentSorters = [];
    this.updateSorters([]);
  }

  updateOptions(serviceOptions?: Partial<OdataOption>) {
    this.options = { ...this.options, ...serviceOptions };
    this._odataService.options = this.options;
  }

  removeColumnFilter(fieldName: string): void {
    this._odataService.removeColumnFilter(fieldName);
  }

  /** Get the Filters that are currently used by the grid */
  getCurrentFilters(): CurrentFilter[] {
    return this._currentFilters;
  }

  /** Get the Pagination that is currently used by the grid */
  getCurrentPagination(): CurrentPagination | undefined {
    return this._currentPagination;
  }

  /** Get the Sorters that are currently used by the grid */
  getCurrentSorters(): CurrentSorter[] {
    return this._currentSorters;
  }

  /**
   * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
   * @param string operator
   * @returns string map
   */
  mapOdataOperator(operator: string) {
    let map = '';
    switch (operator) {
      case '<':
        map = 'lt';
        break;
      case '<=':
        map = 'le';
        break;
      case '>':
        map = 'gt';
        break;
      case '>=':
        map = 'ge';
        break;
      case '<>':
      case '!=':
        map = 'ne';
        break;
      case '=':
      case '==':
      default:
        map = 'eq';
        break;
    }

    return map;
  }

  /*
   * Reset the pagination options
   */
  resetPaginationOptions() {
    this._odataService.updateOptions({
      skip: 0
    });
  }

  saveColumnFilter(fieldName: string, value: string, terms?: any[]) {
    this._odataService.saveColumnFilter(fieldName, value, terms);
  }

  /*
   * FILTERING
   */
  processOnFilterChanged(event: Event | undefined, args: FilterChangedArgs): string {
    const gridOptions: GridOption = this._gridOptions;
    const backendApi = gridOptions.backendServiceApi;

    if (backendApi === undefined) {
      throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
    }

    // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
    this._currentFilters = this.castFilterToColumnFilters(args.columnFilters);

    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying create the GridOdataService, it seems that "args" is not populated correctly');
    }

    // loop through all columns to inspect filters & set the query
    this.updateFilters(args.columnFilters);

    this.resetPaginationOptions();
    return this._odataService.buildQuery();
  }

  /*
   * PAGINATION
   */
  processOnPaginationChanged(_event: Event | undefined, args: PaginationChangedArgs) {
    const pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
    this.updatePagination(args.newPage, pageSize);

    // build the OData query which we will use in the WebAPI callback
    return this._odataService.buildQuery();
  }

  /*
   * SORTING
   */
  processOnSortChanged(_event: Event | undefined, args: SortChangedArgs) {
    const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });

    // loop through all columns to inspect sorters & set the query
    this.updateSorters(sortColumns);

    // build the OData query which we will use in the WebAPI callback
    return this._odataService.buildQuery();
  }

  /**
   * loop through all columns to inspect filters & update backend service filters
   * @param columnFilters
   */
  updateFilters(columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPresetOrDynamically?: boolean) {
    let searchBy = '';
    const searchByArray: string[] = [];
    const odataVersion = this._odataService && this._odataService.options && this._odataService.options.version || 2;

    // on filter preset load, we need to keep current filters
    if (isUpdatedByPresetOrDynamically) {
      this._currentFilters = this.castFilterToColumnFilters(columnFilters);
    }

    // loop through all columns to inspect filters
    for (const columnId in columnFilters) {
      if (columnFilters.hasOwnProperty(columnId)) {
        const columnFilter = (columnFilters as any)[columnId];

        // if user defined some "presets", then we need to find the filters from the column definitions instead
        let columnDef: Column | undefined;
        if (isUpdatedByPresetOrDynamically && Array.isArray(this._columnDefinitions)) {
          columnDef = this._columnDefinitions.find((column: Column) => {
            return column.id === columnFilter.columnId;
          });
        } else {
          columnDef = columnFilter.columnDef;
        }
        if (!columnDef) {
          throw new Error('[GridOData Service]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
        }

        let fieldName = (columnDef.filter && columnDef.filter.queryField) || columnDef.queryFieldFilter || columnDef.queryField || columnDef.field || columnDef.name || '';
        const fieldType = columnDef.type || FieldType.string;
        let searchTerms = (columnFilter && columnFilter.searchTerms ? [...columnFilter.searchTerms] : null) || [];
        let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
        if (typeof fieldSearchValue === 'undefined') {
          fieldSearchValue = '';
        }

        if (!fieldName) {
          throw new Error(`GridOData filter could not find the field name to query the search, your column definition must include a valid "field" or "name" (optionally you can also use the "queryfield").`);
        }

        fieldSearchValue = (fieldSearchValue === undefined || fieldSearchValue === null) ? '' : `${fieldSearchValue}`; // make sure it's a string
        const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
        let operator = columnFilter.operator || ((matches) ? matches[1] : '');
        let searchValue = (!!matches) ? matches[2] : '';
        const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' || operator === OperatorType.endsWith) ? '*' : '';
        const bypassOdataQuery = columnFilter.bypassBackendQuery || false;

        // no need to query if search value is empty
        if (fieldName && searchValue === '' && searchTerms.length <= 1) {
          this.removeColumnFilter(fieldName);
          continue;
        }

        if (Array.isArray(searchTerms) && searchTerms.length === 1 && typeof searchTerms[0] === 'string' && searchTerms[0].indexOf('..') >= 0) {
          if (!operator) {
            operator = this._gridOptions.defaultFilterRangeOperator;
          }

          searchTerms = searchTerms[0].split('..', 2);
          if (searchTerms[0] === '') {
            operator = operator === OperatorType.rangeInclusive ? '<=' : operator === OperatorType.rangeExclusive ? '<' : operator;
            searchTerms = searchTerms.slice(1);
            searchValue = searchTerms[0];
          } else if (searchTerms[1] === '') {
            operator = operator === OperatorType.rangeInclusive ? '>=' : operator === OperatorType.rangeExclusive ? '>' : operator;
            searchTerms = searchTerms.slice(0, 1);
            searchValue = searchTerms[0];
          }
        }

        // if we didn't find an Operator but we have a Column Operator inside the Filter (DOM Element), we should use its default Operator
        // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
        if (!operator && columnDef.filter) {
          operator = columnDef.filter.operator;
        }

        // No operator and 2 search terms should lead to default range operator.
        if (!operator && Array.isArray(searchTerms) && searchTerms.length === 2 && searchTerms[0] && searchTerms[1]) {
          operator = this._gridOptions.defaultFilterRangeOperator;
        }

        // Range with 1 searchterm should lead to equals for a date field.
        if ((operator === OperatorType.rangeInclusive || OperatorType.rangeExclusive) && Array.isArray(searchTerms) && searchTerms.length === 1 && fieldType === FieldType.date) {
          operator = OperatorType.equal;
        }

        // if we still don't have an operator find the proper Operator to use by it's field type
        if (!operator) {
          operator = mapOperatorByFieldType(fieldType);
        }

        // extra query arguments
        if (bypassOdataQuery) {
          // push to our temp array and also trim white spaces
          if (fieldName) {
            this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
          }
        } else {
          // Normalize all search values
          searchValue = this.normalizeSearchValue(fieldType, searchValue, odataVersion);
          if (Array.isArray(searchTerms)) {
            searchTerms.forEach((part, index) => {
              searchTerms[index] = this.normalizeSearchValue(fieldType, searchTerms[index], odataVersion);
            });
          }

          searchBy = '';

          // titleCase the fieldName so that it matches the WebApi names
          if (this._odataService.options.caseType === CaseType.pascalCase) {
            fieldName = titleCase(fieldName || '');
          }

          if (searchTerms && searchTerms.length > 1 && (operator === 'IN' || operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN' || operator === 'NOT_IN')) {
            // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
            const tmpSearchTerms: string[] = [];
            if (operator === 'IN') {
              // example:: (Stage eq "Expired" or Stage eq "Renewal")
              for (let j = 0, lnj = searchTerms.length; j < lnj; j++) {
                tmpSearchTerms.push(`${fieldName} eq ${searchTerms[j]}`);
              }
              searchBy = tmpSearchTerms.join(' or ');
            } else {
              // example:: (Stage ne "Expired" and Stage ne "Renewal")
              for (let k = 0, lnk = searchTerms.length; k < lnk; k++) {
                tmpSearchTerms.push(`${fieldName} ne ${searchTerms[k]}`);
              }
              searchBy = tmpSearchTerms.join(' and ');
            }
            if (!(typeof searchBy === 'string' && searchBy[0] === '(' && searchBy.slice(-1) === ')')) {
              searchBy = `(${searchBy})`;
            }
          } else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*' || operator === OperatorType.startsWith || operator === OperatorType.endsWith) {
            // first/last character is a '*' will be a startsWith or endsWith
            searchBy = (operator === '*' || operator === '*z' || operator === OperatorType.endsWith) ? `endswith(${fieldName}, ${searchValue})` : `startswith(${fieldName}, ${searchValue})`;
          } else if (operator === OperatorType.rangeExclusive || operator === OperatorType.rangeInclusive) {
            // example:: (Name >= 'Bob' and Name <= 'Jane')
            searchBy = this.filterBySearchTermRange(fieldName, operator, searchTerms);
          } else if ((operator === '' || operator === OperatorType.contains || operator === OperatorType.notContains) &&
            (fieldType === FieldType.string || fieldType === FieldType.text || fieldType === FieldType.readonly)) {
            searchBy = odataVersion >= 4 ? `contains(${fieldName}, ${searchValue})` : `substringof(${searchValue}, ${fieldName})`;
            if (operator === OperatorType.notContains) {
              searchBy = `not ${searchBy}`;
            }
          } else {
            // any other field type (or undefined type)
            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} ${searchValue}`;
          }

          // push to our temp array and also trim white spaces
          if (searchBy !== '') {
            searchByArray.push(searchBy.trim());
            this.saveColumnFilter(fieldName || '', fieldSearchValue, searchValue);
          }
        }
      }
    }

    // update the service options with filters for the buildQuery() to work later
    this._odataService.updateOptions({
      filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
      skip: undefined
    });
  }

  /**
   * Update the pagination component with it's new page number and size
   * @param newPage
   * @param pageSize
   */
  updatePagination(newPage: number, pageSize: number) {
    this._currentPagination = {
      pageNumber: newPage,
      pageSize,
    };

    // unless user specifically set "enablePagination" to False, we'll update pagination options in every other cases
    if (this._gridOptions && (this._gridOptions.enablePagination || !this._gridOptions.hasOwnProperty('enablePagination'))) {
      this._odataService.updateOptions({
        top: pageSize,
        skip: (newPage - 1) * pageSize
      });
    }
  }

  /**
   * loop through all columns to inspect sorters & update backend service orderBy
   * @param columnFilters
   */
  updateSorters(sortColumns?: ColumnSort[], presetSorters?: CurrentSorter[]) {
    let currentSorters: CurrentSorter[] = [];
    const odataSorters: OdataSortingOption[] = [];

    if (!sortColumns && presetSorters) {
      // make the presets the current sorters, also make sure that all direction are in lowercase for OData
      currentSorters = presetSorters;
      currentSorters.forEach((sorter) => sorter.direction = sorter.direction.toLowerCase() as SortDirectionString);

      // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
      const tmpSorterArray = currentSorters.map((sorter) => {
        const columnDef = this._columnDefinitions.find((column: Column) => column.id === sorter.columnId);

        odataSorters.push({
          field: columnDef ? ((columnDef.queryFieldSorter || columnDef.queryField || columnDef.field) + '') : (sorter.columnId + ''),
          direction: sorter.direction
        });

        // return only the column(s) found in the Column Definitions ELSE null
        if (columnDef) {
          return {
            columnId: sorter.columnId,
            sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
          };
        }
        return null;
      });

      // set the sort icons, but also make sure to filter out null values (that happens when columnDef is not found)
      if (Array.isArray(tmpSorterArray)) {
        this._grid.setSortColumns(tmpSorterArray);
      }
    } else if (sortColumns && !presetSorters) {
      // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
      if (sortColumns && sortColumns.length === 0) {
        // TODO fix this line
        // currentSorters = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
      } else {
        if (sortColumns) {
          for (const columnDef of sortColumns) {
            if (columnDef.sortCol) {
              let fieldName = (columnDef.sortCol.queryFieldSorter || columnDef.sortCol.queryField || columnDef.sortCol.field) + '';
              let columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
              let queryField = (columnDef.sortCol.queryFieldSorter || columnDef.sortCol.queryField || columnDef.sortCol.field || '') + '';
              if (this._odataService.options.caseType === CaseType.pascalCase) {
                fieldName = titleCase(fieldName);
                columnFieldName = titleCase(columnFieldName);
                queryField = titleCase(queryField);
              }

              if (columnFieldName !== '') {
                currentSorters.push({
                  columnId: columnFieldName,
                  direction: columnDef.sortAsc ? 'asc' : 'desc'
                });
              }

              if (queryField !== '') {
                odataSorters.push({
                  field: queryField,
                  direction: columnDef.sortAsc ? SortDirection.ASC : SortDirection.DESC
                });
              }
            }
          }
        }
      }
    }

    // transform the sortby array into a CSV string for OData
    currentSorters = currentSorters || [] as CurrentSorter[];
    const csvString = odataSorters.map((sorter) => {
      let str = '';
      if (sorter && sorter.field) {
        const sortField = (this._odataService.options.caseType === CaseType.pascalCase) ? titleCase(sorter.field) : sorter.field;
        str = `${sortField} ${sorter && sorter.direction && sorter.direction.toLowerCase() || ''}`;
      }
      return str;
    }).join(',');

    this._odataService.updateOptions({
      orderBy: csvString
    });

    // keep current Sorters and update the service options with the new sorting
    this._currentSorters = currentSorters;

    // build the OData query which we will use in the WebAPI callback
    return this._odataService.buildQuery();
  }

  //
  // private functions
  // -------------------
  /**
   * Cast provided filters (could be in multiple format) into an array of ColumnFilter
   * @param columnFilters
   */
  private castFilterToColumnFilters(columnFilters: ColumnFilters | CurrentFilter[]): CurrentFilter[] {
    // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
    const filtersArray: ColumnFilter[] = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => (columnFilters as any)[key]) : columnFilters;

    if (!Array.isArray(filtersArray)) {
      return [];
    }

    return filtersArray.map((filter) => {
      const tmpFilter: CurrentFilter = { columnId: filter.columnId || '' };
      if (filter.operator) {
        tmpFilter.operator = filter.operator;
      }
      if (Array.isArray(filter.searchTerms)) {
        tmpFilter.searchTerms = filter.searchTerms;
      }
      return tmpFilter;
    });
  }

  /**
   * Filter by a range of searchTerms (2 searchTerms OR 1 string separated by 2 dots "value1..value2")
   */
  private filterBySearchTermRange(fieldName: string, operator: OperatorType | OperatorString, searchTerms: SearchTerm[]) {
    let query = '';
    if (Array.isArray(searchTerms) && searchTerms.length === 2) {
      if (operator === OperatorType.rangeInclusive) {
        // example:: (Duration >= 5 and Duration <= 10)
        query = `(${fieldName} ge ${searchTerms[0]}`;
        if (searchTerms[1] !== '') {
          query += ` and ${fieldName} le ${searchTerms[1]}`;
        }
        query += ')';
      } else if (operator === OperatorType.rangeExclusive) {
        // example:: (Duration > 5 and Duration < 10)
        query = `(${fieldName} gt ${searchTerms[0]}`;
        if (searchTerms[1] !== '') {
          query += ` and ${fieldName} lt ${searchTerms[1]}`;
        }
        query += ')';
      }
    }
    return query;
  }

  /**
   * Normalizes the search value according to field type and oData version.
   */
  private normalizeSearchValue(fieldType: FieldType, searchValue: any, version: number) {
    switch (fieldType) {
      case FieldType.date:
        searchValue = parseUtcDate(searchValue as string, true);
        searchValue = version >= 4 ? searchValue : `DateTime'${searchValue}'`;
        break;
      case FieldType.string:
      case FieldType.text:
      case FieldType.readonly:
        if (typeof searchValue === 'string') {
          // escape single quotes by doubling them
          searchValue = searchValue.replace(/'/g, `''`);
          // encode URI of the final search value
          searchValue = encodeURIComponent(searchValue);
          // strings need to be quoted.
          searchValue = `'${searchValue}'`;
        }
        break;
      case FieldType.integer:
      case FieldType.number:
      case FieldType.float:
        if (typeof searchValue === 'string') {
          // Parse a valid decimal from the string.

          // Replace double dots with single dots
          searchValue = searchValue.replace(/\.\./g, '.');
          // Remove a trailing dot
          searchValue = searchValue.replace(/\.+$/g, '');
          // Prefix a leading dot with 0
          searchValue = searchValue.replace(/^\.+/g, '0.');
          // Prefix leading dash dot with -0.
          searchValue = searchValue.replace(/^\-+\.+/g, '-0.');
          // Remove any non valid decimal characters from the search string
          searchValue = searchValue.replace(/(?!^\-)[^\d\.]/g, '');

          // if nothing left, search for 0
          if (searchValue === '' || searchValue === '-') {
            searchValue = '0';
          }
        }
        break;
    }

    return searchValue;
  }
}
