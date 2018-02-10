import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import { BackendService, BackendServiceOption, CaseType, FilterChangedArgs, FieldType, OdataOption, PaginationChangedArgs, SortChangedArgs } from './../models';
import { GridOption } from '../models/gridOption.interface';
import { OdataService } from './odata.service';
import { Pagination } from './../models/pagination.interface';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
let timer: any;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;

@Injectable()
export class GridOdataService implements BackendService {
  options: OdataOption;
  pagination: Pagination;
  defaultOptions: OdataOption = {
    top: 25,
    orderBy: ''
  };

  constructor(private odataService: OdataService) { }

  buildQuery(): string {
    return this.odataService.buildQuery();
  }

  initOptions(options: OdataOption, pagination?: Pagination): void {
    this.odataService.options = { ...this.defaultOptions, ...options, top: options.top || (pagination ? pagination.pageSize : null) || this.defaultOptions.top };
    this.options = options;
    this.pagination = pagination;
  }

  updateOptions(serviceOptions?: OdataOption) {
    this.options = { ...this.options, ...serviceOptions };
  }

  removeColumnFilter(fieldName: string): void {
    this.odataService.removeColumnFilter(fieldName);
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
    let searchBy = '';
    const searchByArray: string[] = [];
    const serviceOptions: GridOption = args.grid.getOptions();
    const backendApi = serviceOptions.backendServiceApi || serviceOptions.onBackendEventApi;

    if (backendApi === undefined) {
      throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
    }

    // only add a delay when user is typing, on select dropdown filter it will execute right away
    let debounceTypingDelay = 0;
    if (event.type === 'keyup' || event.type === 'keydown') {
      debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
    }

    const promise = new Promise<string>((resolve, reject) => {
      // loop through all columns to inspect filters
      for (const columnId in args.columnFilters) {
        if (args.columnFilters.hasOwnProperty(columnId)) {
          const columnFilter = args.columnFilters[columnId];
          const columnDef = columnFilter.columnDef;
          const fieldName = columnDef.queryField || columnDef.field || columnDef.name;
          const fieldType = columnDef.type || 'string';
          const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
          let fieldSearchValue = columnFilter.searchTerm;
          if (typeof fieldSearchValue === 'undefined') {
            fieldSearchValue = '';
          }

          if (typeof fieldSearchValue !== 'string' && !searchTerms) {
            throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {type: FormElementType.select, selectOptions: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
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
              searchBy = `substringof('${searchValue}', ${fieldNameTitleCase})`;
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

      // build the filter query
      this.odataService.updateOptions({
        filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
        skip: undefined
      });

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
    let sortByArray = [];
    const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });

    // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
    if (sortColumns && sortColumns.length === 0) {
      sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
    } else {
      if (sortColumns) {
        for (const column of sortColumns) {
          let fieldName = column.sortCol.queryField || column.sortCol.field || column.sortCol.id;
          if (this.odataService.options.caseType === CaseType.pascalCase) {
            fieldName = String.titleCase(fieldName);
          }
          const direction = column.sortAsc ? 'asc' : 'desc';
          const sortByColumnString = `${fieldName} ${direction}`;
          sortByArray.push(sortByColumnString);
        }
      }
    }

    // transform the sortby array into a CSV string
    const csvArray = sortByArray.join(',');
    this.odataService.updateOptions({
      orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvArray) : csvArray
    });

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
