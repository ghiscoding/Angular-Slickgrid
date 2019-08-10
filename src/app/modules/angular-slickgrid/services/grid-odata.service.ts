import { mapOperatorByFieldType, parseUtcDate, titleCase } from './utilities';
import { Injectable } from '@angular/core';
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
  OdataSortingOption,
  OperatorType
} from './../models/index';
import { OdataQueryBuilderService } from './odataQueryBuilder.service';

const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class GridOdataService implements BackendService {
  private _currentFilters: CurrentFilter[] = [];
  private _currentPagination: CurrentPagination;
  private _currentSorters: CurrentSorter[] = [];
  private _columnDefinitions: Column[];
  private _grid: any;
  private _odataService: OdataQueryBuilderService;
  options: OdataOption;
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

  init(serviceOptions: OdataOption, pagination?: Pagination, grid?: any): void {
    this._grid = grid;
    const mergedOptions = { ...this.defaultOptions, ...serviceOptions };
    if (pagination && pagination.pageSize) {
      mergedOptions.top = pagination.pageSize;
    }
    this._odataService.options = { ...mergedOptions, top: mergedOptions.top || this.defaultOptions.top };
    this.options = this._odataService.options;
    this.pagination = pagination;

    // save current pagination as Page 1 and page size as "top"
    this._currentPagination = {
      pageNumber: 1,
      pageSize: this._odataService.options.top || this.defaultOptions.top || DEFAULT_PAGE_SIZE
    };

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

  updateOptions(serviceOptions?: OdataOption) {
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
  getCurrentPagination(): CurrentPagination {
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
  processOnFilterChanged(event: Event, args: FilterChangedArgs): string {
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
  processOnPaginationChanged(event: Event, args: PaginationChangedArgs) {
    const pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
    this.updatePagination(args.newPage, pageSize);

    // build the OData query which we will use in the WebAPI callback
    return this._odataService.buildQuery();
  }

  /*
   * SORTING
   */
  processOnSortChanged(event: Event, args: SortChangedArgs) {
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
  updateFilters(columnFilters: ColumnFilters | CurrentFilter[], isUpdatedByPreset?: boolean) {
    let searchBy = '';
    const searchByArray: string[] = [];

    // on filter preset load, we need to keep current filters
    if (isUpdatedByPreset) {
      this._currentFilters = this.castFilterToColumnFilters(columnFilters);
    }

    // loop through all columns to inspect filters
    for (const columnId in columnFilters) {
      if (columnFilters.hasOwnProperty(columnId)) {
        const columnFilter = columnFilters[columnId];

        // if user defined some "presets", then we need to find the filters from the column definitions instead
        let columnDef: Column | undefined;
        if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
          columnDef = this._columnDefinitions.find((column: Column) => {
            return column.id === columnFilter.columnId;
          });
        } else {
          columnDef = columnFilter.columnDef;
        }
        if (!columnDef) {
          throw new Error('[GridOData Service]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
        }

        let fieldName = columnDef.queryFieldFilter || columnDef.queryField || columnDef.field || columnDef.name || '';
        const fieldType = columnDef.type || FieldType.string;
        const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
        let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
        if (typeof fieldSearchValue === 'undefined') {
          fieldSearchValue = '';
        }

        if (!fieldName) {
          throw new Error(`GridOData filter could not find the field name to query the search, your column definition must include a valid "field" or "name" (optionally you can also use the "queryfield" or "queryFieldFilter").`);
        }

        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
        const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
        let operator = columnFilter.operator || ((matches) ? matches[1] : '');
        let searchValue = (!!matches) ? matches[2] : '';
        const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
        const bypassOdataQuery = columnFilter.bypassBackendQuery || false;

        // no need to query if search value is empty
        if (fieldName && searchValue === '' && searchTerms.length <= 1) {
          this.removeColumnFilter(fieldName);
          continue;
        }

        // escaping the search value
        searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
        searchValue = encodeURIComponent(searchValue); // encode URI of the final search value

        // if we didn't find an Operator but we have a Column Operator inside the Filter (DOM Element), we should use its default Operator
        // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
        if (!operator && columnDef.filter) {
          operator = columnDef.filter.operator;
        }

        // if we still don't have an operator find the proper Operator to use by it's field type
        if (!operator) {
          operator = mapOperatorByFieldType(columnDef.type || FieldType.string);
        }

        // extra query arguments
        if (bypassOdataQuery) {
          // push to our temp array and also trim white spaces
          if (fieldName) {
            this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
          }
        } else {
          searchBy = '';

          // titleCase the fieldName so that it matches the WebApi names
          if (this._odataService.options.caseType === CaseType.pascalCase) {
            fieldName = titleCase(fieldName || '');
          }

          // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
          if (searchTerms && searchTerms.length > 1) {
            const tmpSearchTerms = [];

            if (operator === 'IN') {
              // example:: (Stage eq "Expired" or Stage eq "Renewal")
              for (let j = 0, lnj = searchTerms.length; j < lnj; j++) {
                tmpSearchTerms.push(`${fieldName} eq '${searchTerms[j]}'`);
              }
              searchBy = tmpSearchTerms.join(' or ');
              if (!(typeof searchBy === 'string' && searchBy[0] === '(' && searchBy.slice(-1) === ')')) {
                searchBy = `(${searchBy})`;
              }
            } else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN' || operator === 'NOT_IN') {
              // example:: (Stage ne "Expired" and Stage ne "Renewal")
              for (let k = 0, lnk = searchTerms.length; k < lnk; k++) {
                tmpSearchTerms.push(`${fieldName} ne '${searchTerms[k]}'`);
              }
              searchBy = tmpSearchTerms.join(' and ');
              if (!(typeof searchBy === 'string' && searchBy[0] === '(' && searchBy.slice(-1) === ')')) {
                searchBy = `(${searchBy})`;
              }
            }
          } else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
            // first/last character is a '*' will be a startsWith or endsWith
            searchBy = (operator === '*' || operator === '*z')
              ? `endswith(${fieldName}, '${searchValue}')`
              : `startswith(${fieldName}, '${searchValue}')`;
          } else if (fieldType === FieldType.date) {
            // date field needs to be UTC and within DateTime function
            const dateFormatted = parseUtcDate(searchValue, true);
            if (dateFormatted) {
              searchBy = `${fieldName} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
            }
          } else if (fieldType === FieldType.string) {
            // string field needs to be in single quotes
            if (operator === '' || operator === OperatorType.contains || operator === OperatorType.notContains) {
              if (this._odataService.options.version >= 4) {
                searchBy = `contains(${fieldName}, '${searchValue}')`;
              } else {
                searchBy = `substringof('${searchValue}', ${fieldName})`;
              }
              if (operator === OperatorType.notContains) {
                searchBy = `not ${searchBy}`;
              }
            } else {
              searchBy = `${fieldName} ${this.mapOdataOperator(operator)} '${searchValue}'`;
            }
          } else {
            // any other field type (or undefined type)
            searchValue = (fieldType === FieldType.number || fieldType === FieldType.boolean) ? searchValue : `'${searchValue}'`;
            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} ${searchValue}`;
          }

          // push to our temp array and also trim white spaces
          if (searchBy !== '') {
            searchByArray.push(searchBy.trim());
            this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
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
      pageSize
    };

    this._odataService.updateOptions({
      top: pageSize,
      skip: (newPage - 1) * pageSize
    });
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
      if (sorter && sorter.field) {
        const sortField = (this._odataService.options.caseType === CaseType.pascalCase) ? titleCase(sorter.field) : sorter.field;
        return `${sortField} ${sorter && sorter.direction && sorter.direction.toLowerCase() || ''}`;
      }
      return '';
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
    const filtersArray: ColumnFilter[] = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters;

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
}
