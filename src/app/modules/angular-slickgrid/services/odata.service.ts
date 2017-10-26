import './global-utilities';
import { CaseType, OdataOption } from './../models';

export class OdataService {
  _columnFilters: any;
  _defaultSortBy: string;
  _odataOptions: OdataOption;

  constructor() {
    this._odataOptions = {
      filterQueue: [],
      orderBy: ''
    };
    this._defaultSortBy = '';
    this._columnFilters = {};
  }

  /*
    * Build the OData query string from all the options provided
    * @return string OData query
    */
  buildQuery(): string {
    this._odataOptions.filterQueue = [];
    const queryTmpArray = [];

    if (this._odataOptions.top) {
      queryTmpArray.push(`$top=${this._odataOptions.top}`);
    }
    if (this._odataOptions.skip) {
      queryTmpArray.push(`$skip=${this._odataOptions.skip}`);
    }
    if (this._odataOptions.orderBy) {
      let argument = '';
      if (Array.isArray(this._odataOptions.orderBy)) {
        argument = this._odataOptions.orderBy.join(','); // csv, that will form a query example like: $orderby=RoleName asc, Id desc
      } else {
        argument = this._odataOptions.orderBy;
      }
      queryTmpArray.push(`$orderby=${argument}`);
    }
    if (this._odataOptions.filterBy || this._odataOptions.filter) {
      if (this._odataOptions.filter) {
        this._odataOptions.filterQueue = [];
        let filterStr = this._odataOptions.filter;
        if (Array.isArray(this._odataOptions.filter)) {
          const filterBySeparator = this._odataOptions.filterBySeparator || 'and';
          const separatorSpacedOut = ` ${filterBySeparator} `;
          filterStr = this._odataOptions.filter.join(separatorSpacedOut);
        }
        this._odataOptions.filterQueue.push(`(${filterStr})`);
      }
      // filterBy are passed manually by the user, however we will only add it if the column wasn't yet filtered
      if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
        if (this._odataOptions.filterBy.searchTerm !== '') {
          this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.listTerm);
          this.updateFilterFromListTerms(this._odataOptions.filterBy);
        }
      }
    }
    if (this._odataOptions.filterQueue.length > 0) {
      const filterBySeparator = this._odataOptions.filterBySeparator || 'and';
      const separatorSpacedOut = ` ${filterBySeparator} `;
      const query = this._odataOptions.filterQueue.join(separatorSpacedOut);
      this._odataOptions.filter = query; // overwrite with
      queryTmpArray.push(`$filter=${query}`);
    }

    // join all the odata functions by a '&'
    return queryTmpArray.join('&');
  }

  getFilterByColumn(columnName: string): string {
    return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
  }

  getFilterCount(): number {
    return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
  }

  get columnFilters(): any[] {
    return this._columnFilters;
  }

  get options(): OdataOption {
    return this._odataOptions;
  }

  set options(options: OdataOption) {
    this._odataOptions = options;
  }

  removeColumnFilter(fieldName: string) {
    delete this._columnFilters[fieldName];
  }

  saveColumnFilter(fieldName: string, value: any, searchTerms?: any[]) {
    this._columnFilters[fieldName] = {
      search: searchTerms,
      value
    };
  }

  /**
   * Update the filter by a list of terms usually passed manually by the user as default filters
   * @param {} filterOptions
   * @returns {}
   */
  updateFilterFromListTerms(filterOptions: any) {
    // build the filter query
    if (Array.isArray(filterOptions)) {
      filterOptions.forEach((filterOptionObject) => {
        this.updateFilterFromTerm(filterOptionObject);
      });
    } else {
      this.updateFilterFromTerm(filterOptions);
    }
  }

  updateFilterFromTerm(filterOptions: any) {
    let searchBy = '';
    const tmpSearchByArray = [];
    const fieldName = filterOptions.fieldName;
    const fieldSearchTerms = filterOptions.listTerm;
    const operator = filterOptions.operator;

    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
    if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
      const tmpSearchTerms = [];

      if (operator === 'IN') {
        // example:: (Stage eq "Expired" or Stage eq "Renewal")
        for (let j = 0, lnj = fieldSearchTerms.length; j < lnj; j++) {
          tmpSearchTerms.push(`${fieldName} eq '${fieldSearchTerms[j]}'`);
        }
        searchBy = tmpSearchTerms.join(' or ');
        searchBy = `$(${searchBy})`;
      } else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
        // example:: (Stage ne "Expired" and Stage ne "Renewal")
        for (let k = 0, lnk = fieldSearchTerms.length; k < lnk; k++) {
          tmpSearchTerms.push(`${fieldName} ne '${fieldSearchTerms[k]}'`);
        }
        searchBy = tmpSearchTerms.join(' and ');
        searchBy = `$(${searchBy})`;
      }
    }

    // push to our temp array and also trim white spaces
    tmpSearchByArray.push(String.trim(searchBy));

    // add to the filter queue only if it doesn't exist in the queue
    const filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
    if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
      this._odataOptions.filterQueue.push(filter);
    }
  }

  /**
   * Change any OData options that will be used to build the query
   * @param object options
   */
  updateOptions(options: OdataOption) {
    for (const property of Object.keys(options)) {
      if (options.hasOwnProperty(property)) {
        this._odataOptions[property] = options[property]; // replace of the property
      }

      // we need to keep the defaultSortBy for references whenever the user removes his Sorting
      // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
      if (property === 'orderBy' || property === 'sortBy') {
        let sortBy = options[property];

        // make sure first char of each orderBy field is capitalize
        if (this._odataOptions.caseType === CaseType.pascalCase) {
          if (Array.isArray(sortBy)) {
            sortBy.forEach((field, index, inputArray) => {
              inputArray[index] = String.titleCase(field);
            });
          } else {
            sortBy = String.titleCase(options[property]);
          }
        }
        this._odataOptions.orderBy = sortBy;
        this._defaultSortBy = sortBy;
      }
    }
  }

}
