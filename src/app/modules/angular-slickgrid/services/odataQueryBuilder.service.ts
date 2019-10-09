import { CaseType, OdataOption } from '../models/index';
import { titleCase } from './utilities';

export class OdataQueryBuilderService {
  _columnFilters: any;
  _defaultSortBy: string;
  _filterCount: number;
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
    if (!this._odataOptions) {
      throw new Error('Odata Service requires certain options like "top" for it to work');
    }
    this._odataOptions.filterQueue = [];
    const queryTmpArray = [];

    // When enableCount is set, add it to the OData query
    if (this._odataOptions.enableCount === true) {
      const countQuery = (this._odataOptions.version >= 4) ? '$count=true' : '$inlinecount=allpages';
      queryTmpArray.push(countQuery);
    }

    if (this._odataOptions.top) {
      queryTmpArray.push(`$top=${this._odataOptions.top}`);
    }
    if (this._odataOptions.skip) {
      queryTmpArray.push(`$skip=${this._odataOptions.skip}`);
    }
    if (this._odataOptions.orderBy) {
      let argument = '';
      if (Array.isArray(this._odataOptions.orderBy)) {
        argument = this._odataOptions.orderBy.join(','); // csv, that will form a query, for example: $orderby=RoleName asc, Id desc
      } else {
        argument = this._odataOptions.orderBy;
      }
      queryTmpArray.push(`$orderby=${argument}`);
    }
    if (this._odataOptions.filterBy || this._odataOptions.filter) {
      const filterBy = this._odataOptions.filter || this._odataOptions.filterBy;
      if (filterBy) {
        this._filterCount = 1;
        this._odataOptions.filterQueue = [];
        let filterStr = filterBy;
        if (Array.isArray(filterBy)) {
          this._filterCount = filterBy.length;
          filterStr = filterBy.join(` ${this._odataOptions.filterBySeparator || 'and'} `);
        }

        if (typeof filterStr === 'string') {
          if (!(filterStr[0] === '(' && filterStr.slice(-1) === ')')) {
            this.addToFilterQueueWhenNotExists(`(${filterStr})`);
          } else {
            this.addToFilterQueueWhenNotExists(filterStr);
          }
        }
      }
    }
    if (this._odataOptions.filterQueue.length > 0) {
      const query = this._odataOptions.filterQueue.join(` ${this._odataOptions.filterBySeparator || 'and'} `);
      this._odataOptions.filter = query; // overwrite with
      queryTmpArray.push(`$filter=${query}`);
    }

    // join all the odata functions by a '&'
    return queryTmpArray.join('&');
  }

  getFilterCount(): number {
    return this._filterCount;
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
    if (this._columnFilters && this._columnFilters.hasOwnProperty(fieldName)) {
      delete this._columnFilters[fieldName];
    }
  }

  saveColumnFilter(fieldName: string, value: any, searchTerms?: any[]) {
    this._columnFilters[fieldName] = {
      search: searchTerms,
      value
    };
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
              inputArray[index] = titleCase(field);
            });
          } else {
            sortBy = titleCase(options[property]);
          }
        }
        this._odataOptions.orderBy = sortBy;
        this._defaultSortBy = sortBy;
      }
    }
  }

  //
  // private functions
  // -------------------

  private addToFilterQueueWhenNotExists(filterStr: string) {
    if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filterStr) === -1) {
      this._odataOptions.filterQueue.push(filterStr);
    }
  }
}
