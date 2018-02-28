import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import {
  BackendService,
  CaseType,
  Column,
  ColumnFilters,
  FilterChangedArgs,
  FieldType,
  GridOption,
  OdataOption,
  Pagination,
  PaginationChangedArgs,
  PresetFilter,
  PresetSorter,
  SortChanged,
  SortChangedArgs,
  SortDirection,
  SortDirectionString
} from './../models/index';
import { OdataService } from './odata.service';

let timer: any;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
const DEFAULT_ITEMS_PER_PAGE = 25;

@Injectable()
export class GridOdataService implements BackendService {
  private _currentFilters: ColumnFilters | PresetFilter[];
  private _currentSorters: PresetSorter[];
  private _columnDefinitions: Column[];
  private _gridOptions: GridOption;
  private _grid: any;
  options: OdataOption;
  pagination: Pagination;
  defaultOptions: OdataOption = {
    top: DEFAULT_ITEMS_PER_PAGE,
    orderBy: ''
  };

  constructor(private odataService: OdataService) { }

  buildQuery(): string {
    return this.odataService.buildQuery();
  }

  init(options: OdataOption, pagination?: Pagination, grid?: any): void {
    this._grid = grid;
    this.odataService.options = { ...this.defaultOptions, ...options, top: options.top || (pagination ? pagination.pageSize : null) || this.defaultOptions.top };
    this.options = options;
    this.pagination = pagination;

    if (grid && grid.getColumns && grid.getOptions) {
      this._columnDefinitions = grid.getColumns() || options.columnDefinitions;
      this._gridOptions = grid.getOptions();
    }
  }

  updateOptions(serviceOptions?: OdataOption) {
    this.options = { ...this.options, ...serviceOptions };
  }

  removeColumnFilter(fieldName: string): void {
    this.odataService.removeColumnFilter(fieldName);
  }

  /** Get the Filters that are currently used by the grid */
  getCurrentFilters(): ColumnFilters | PresetFilter[] {
    return this._currentFilters;
  }

  /** Get the Sorters that are currently used by the grid */
  getCurrentSorters(): PresetSorter[] {
    return this._currentSorters;
  }

  /*
   * Reset the pagination options
   */
  resetPaginationOptions() {
    this.odataService.updateOptions({
      skip: 0
    });
  }

  saveColumnFilter(fieldName: string, value: string, terms?: any[]) {
    this.odataService.saveColumnFilter(fieldName, value, terms);
  }

  /*
   * FILTERING
   */
  onFilterChanged(event: Event, args: FilterChangedArgs): Promise<string> {
    const serviceOptions: GridOption = args.grid.getOptions();
    const backendApi = serviceOptions.backendServiceApi || serviceOptions.onBackendEventApi;

    if (backendApi === undefined) {
      throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
    }

    // only add a delay when user is typing, on select dropdown filter it will execute right away
    let debounceTypingDelay = 0;
    if (event && (event.type === 'keyup' || event.type === 'keydown')) {
      debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
    }

    const promise = new Promise<string>((resolve, reject) => {
      // loop through all columns to inspect filters & set the query
      this.updateFilters(args.columnFilters);

      // reset Pagination, then build the OData query which we will use in the WebAPI callback
      // wait a minimum user typing inactivity before processing any query
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.resetPaginationOptions();
        resolve (this.odataService.buildQuery());
      }, debounceTypingDelay);
    });

    return promise;
  }

  /*
   * PAGINATION
   */
  onPaginationChanged(event: Event, args: PaginationChangedArgs) {
    const pageSize = +args.pageSize || 20;

    this.odataService.updateOptions({
      top: pageSize,
      skip: (args.newPage - 1) * pageSize
    });

    // build the OData query which we will use in the WebAPI callback
    return this.odataService.buildQuery();
  }

  /*
   * SORTING
   */
  onSortChanged(event: Event, args: SortChangedArgs) {
    const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });

    // loop through all columns to inspect sorters & set the query
    this.updateSorters(sortColumns);

    // build the OData query which we will use in the WebAPI callback
    return this.odataService.buildQuery();
  }

  /**
   * loop through all columns to inspect filters & update backend service filteringOptions
   * @param columnFilters
   */
  updateFilters(columnFilters: ColumnFilters | PresetFilter[], isUpdatedByPreset?: boolean) {
    // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
    this._currentFilters = (!!isUpdatedByPreset) ? columnFilters : Object.keys(columnFilters).map(key => columnFilters[key]);
    let searchBy = '';
    const searchByArray: string[] = [];

    // loop through all columns to inspect filters
    for (const columnId in columnFilters) {
      if (columnFilters.hasOwnProperty(columnId)) {
        const columnFilter = columnFilters[columnId];

        // if user defined some "presets", then we need to find the filters from the column definitions instead
        let columnDef: Column;
        if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
          columnDef = this._columnDefinitions.find((column: Column) => {
            return column.id === columnFilter.columnId;
          });
        } else {
          columnDef = columnFilter.columnDef;
        }
        if (!columnDef) {
          throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
        }

        const fieldName = columnDef.queryField || columnDef.field || columnDef.name || '';
        const fieldType = columnDef.type || 'string';
        const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
        let fieldSearchValue = columnFilter.searchTerm;
        if (typeof fieldSearchValue === 'undefined') {
          fieldSearchValue = '';
        }

        if (typeof fieldSearchValue !== 'string' && !searchTerms) {
          throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FilterType.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
        }

        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
        const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
        const operator = columnFilter.operator || ((matches) ? matches[1] : '');
        let searchValue = (!!matches) ? matches[2] : '';
        const lastValueChar = (!!matches) ? matches[3] : '';
        const bypassOdataQuery = columnFilter.bypassBackendQuery || false;

        // no need to query if search value is empty
        if (fieldName && searchValue === '') {
          this.removeColumnFilter(fieldName);
          continue;
        }

        // escaping the search value
        searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
        searchValue = encodeURIComponent(searchValue); // encode URI of the final search value

        // extra query arguments
        if (bypassOdataQuery) {
          // push to our temp array and also trim white spaces
          if (fieldName) {
            this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
          }
        } else {
          searchBy = '';

          // titleCase the fieldName so that it matches the WebApi names
          const fieldNameTitleCase = String.titleCase(fieldName || '');

          // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
          if (searchTerms && searchTerms.length > 0) {
            const tmpSearchTerms = [];

            if (operator === 'IN') {
              // example:: (Stage eq "Expired" or Stage eq "Renewal")
              for (let j = 0, lnj = searchTerms.length; j < lnj; j++) {
                tmpSearchTerms.push(`${fieldNameTitleCase} eq '${searchTerms[j]}'`);
              }
              searchBy = tmpSearchTerms.join(' or ');
              searchBy = `(${searchBy})`;
            } else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
              // example:: (Stage ne "Expired" and Stage ne "Renewal")
              for (let k = 0, lnk = searchTerms.length; k < lnk; k++) {
                tmpSearchTerms.push(`${fieldNameTitleCase} ne '${searchTerms[k]}'`);
              }
              searchBy = tmpSearchTerms.join(' and ');
              searchBy = `(${searchBy})`;
            }
          } else if (operator === '*' || lastValueChar !== '') {
            // first/last character is a '*' will be a startsWith or endsWith
            searchBy = operator === '*'
              ? `endswith(${fieldNameTitleCase}, '${searchValue}')`
              : `startswith(${fieldNameTitleCase}, '${searchValue}')`;
          } else if (fieldType === FieldType.date) {
            // date field needs to be UTC and within DateTime function
            const dateFormatted = parseUtcDate(searchValue, true);
            if (dateFormatted) {
              searchBy = `${fieldNameTitleCase} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
            }
          } else if (fieldType === FieldType.string) {
            // string field needs to be in single quotes
            if (operator === '') {
              searchBy = `substringof('${searchValue}', ${fieldNameTitleCase})`;
            } else {
              // searchBy = `substringof('${searchValue}', ${fieldNameTitleCase}) ${this.mapOdataOperator(operator)} true`;
              searchBy = `${fieldNameTitleCase} ${this.mapOdataOperator(operator)} '${searchValue}'`;
            }
          } else {
            // any other field type (or undefined type)
            searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
            searchBy = `${fieldNameTitleCase} ${this.mapOdataOperator(operator)} ${searchValue}`;
          }

          // push to our temp array and also trim white spaces
          if (searchBy !== '') {
            searchByArray.push(String.trim(searchBy));
            this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
          }
        }
      }
    }

    // update the service options with filters for the buildQuery() to work later
    this.odataService.updateOptions({
      filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
      skip: undefined
    });
  }

  /**
   * loop through all columns to inspect sorters & update backend service orderBy
   * @param columnFilters
   */
  updateSorters(sortColumns?: SortChanged[], presetSorters?: PresetSorter[]) {
    let sortByArray = [];
    const sorterArray: PresetSorter[] = [];

    if (!sortColumns && presetSorters) {
      sortByArray = presetSorters;

      // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
      sortByArray.forEach((sorter) => {
        sorter.sortAsc = (sorter.direction.toUpperCase() === SortDirection.ASC);
      });
      this._grid.setSortColumns(sortByArray);
    } else if (sortColumns && !presetSorters) {
      // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
      if (sortColumns && sortColumns.length === 0) {
        sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
      } else {
        if (sortColumns) {
          for (const column of sortColumns) {
            let fieldName = (column.sortCol.queryField || column.sortCol.field || column.sortCol.id) + '';
            if (this.odataService.options.caseType === CaseType.pascalCase) {
              fieldName = String.titleCase(fieldName);
            }

            sorterArray.push({
              columnId: fieldName,
              direction: column.sortAsc ? 'asc' : 'desc'
            });
          }
          sortByArray = sorterArray;
        }
      }
    }

    // transform the sortby array into a CSV string for OData
    const csvString = sortByArray.map((sorter) => `${sorter.columnId} ${sorter.direction.toLowerCase()}` ).join(',');
    this.odataService.updateOptions({
      orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
    });

    // keep current Sorters and update the service options with the new sorting
    this._currentSorters = sortByArray;

    // build the OData query which we will use in the WebAPI callback
    return this.odataService.buildQuery();
  }

  /**
   * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
   * @param string operator
   * @returns string map
   */
  private mapOdataOperator(operator: string) {
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
}
