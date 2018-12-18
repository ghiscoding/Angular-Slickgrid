/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import { CaseType, FieldType, SortDirection } from './../models/index';
import { OdataService } from './odata.service';
/** @type {?} */
let timer;
/** @type {?} */
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
/** @type {?} */
const DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
const DEFAULT_PAGE_SIZE = 20;
export class GridOdataService {
    constructor() {
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * @return {?}
     */
    buildQuery() {
        return this.odataService.buildQuery();
    }
    /**
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    init(options, pagination, grid) {
        this._grid = grid;
        /** @type {?} */
        const mergedOptions = Object.assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = Object.assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
        this.options = this.odataService.options;
        this.pagination = pagination;
        // save current pagination as Page 1 and page size as "top"
        this._currentPagination = {
            pageNumber: 1,
            pageSize: this.odataService.options.top || this.defaultOptions.top
        };
        if (grid && grid.getColumns) {
            this._columnDefinitions = (options && options.columnDefinitions) || grid.getColumns();
            this._columnDefinitions = this._columnDefinitions.filter((column) => !column.excludeFromQuery);
        }
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    }
    /**
     * @param {?} fieldName
     * @return {?}
     */
    removeColumnFilter(fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    }
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    getCurrentFilters() {
        return this._currentFilters;
    }
    /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    getCurrentPagination() {
        return this._currentPagination;
    }
    /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    getCurrentSorters() {
        return this._currentSorters;
    }
    /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    resetPaginationOptions() {
        this.odataService.updateOptions({
            skip: 0
        });
    }
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    saveColumnFilter(fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    }
    /*
       * FILTERING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    processOnFilterChanged(event, args) {
        /** @type {?} */
        const serviceOptions = args.grid.getOptions();
        /** @type {?} */
        const backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        /** @type {?} */
        let debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        /** @type {?} */
        const promise = new Promise((resolve, reject) => {
            // reset Pagination, then build the OData query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer);
            timer = setTimeout(() => {
                // loop through all columns to inspect filters & set the query
                this.updateFilters(args.columnFilters);
                this.resetPaginationOptions();
                resolve(this.odataService.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    }
    /*
       * PAGINATION
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    processOnPaginationChanged(event, args) {
        /** @type {?} */
        const pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE);
        this.updatePagination(args.newPage, pageSize);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /*
       * SORTING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    processOnSortChanged(event, args) {
        /** @type {?} */
        const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        let searchBy = '';
        /** @type {?} */
        const searchByArray = [];
        // loop through all columns to inspect filters
        for (const columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                /** @type {?} */
                const columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                /** @type {?} */
                let columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((column) => {
                        return column.id === columnFilter.columnId;
                    });
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                /** @type {?} */
                let fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                /** @type {?} */
                const fieldType = columnDef.type || 'string';
                /** @type {?} */
                const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                /** @type {?} */
                let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                const operator = columnFilter.operator || ((matches) ? matches[1] : '');
                /** @type {?} */
                let searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                /** @type {?} */
                const bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
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
                }
                else {
                    searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    if (this.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 1) {
                        /** @type {?} */
                        const tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (let j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(`${fieldName} eq '${searchTerms[j]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = `(${searchBy})`;
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (let k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(`${fieldName} ne '${searchTerms[k]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = `(${searchBy})`;
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = (operator === '*' || operator === '*z')
                            ? `endswith(${fieldName}, '${searchValue}')`
                            : `startswith(${fieldName}, '${searchValue}')`;
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        /** @type {?} */
                        const dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        if (operator === '') {
                            searchBy = `substringof('${searchValue}', ${fieldName})`;
                        }
                        else {
                            // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} '${searchValue}'`;
                        }
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
                        searchBy = `${fieldName} ${this.mapOdataOperator(operator)} ${searchValue}`;
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
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    updatePagination(newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize
        };
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    }
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    updateSorters(sortColumns, presetSorters) {
        /** @type {?} */
        let sortByArray = [];
        /** @type {?} */
        const sorterArray = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in lowercase for OData
            sortByArray = presetSorters;
            sortByArray.forEach((sorter) => sorter.direction = (/** @type {?} */ (sorter.direction.toLowerCase())));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            const tmpSorterArray = sortByArray.map((sorter) => {
                /** @type {?} */
                const columnDef = this._columnDefinitions.find((column) => column.id === sorter.columnId);
                sorterArray.push({
                    columnId: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
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
            this._grid.setSortColumns(tmpSorterArray);
        }
        else if (sortColumns && !presetSorters) {
            // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
            if (sortColumns && sortColumns.length === 0) {
                sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
            }
            else {
                if (sortColumns) {
                    for (const columnDef of sortColumns) {
                        if (columnDef.sortCol) {
                            /** @type {?} */
                            let fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            /** @type {?} */
                            let columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            if (this.odataService.options.caseType === CaseType.pascalCase) {
                                fieldName = String.titleCase(fieldName);
                                columnFieldName = String.titleCase(columnFieldName);
                            }
                            sorterArray.push({
                                columnId: columnFieldName,
                                direction: columnDef.sortAsc ? 'asc' : 'desc'
                            });
                        }
                    }
                    sortByArray = sorterArray;
                }
            }
        }
        // transform the sortby array into a CSV string for OData
        sortByArray = (/** @type {?} */ (sortByArray));
        /** @type {?} */
        const csvString = sortByArray.map((sorter) => `${sorter.columnId} ${sorter.direction.toLowerCase()}`).join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
        });
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = (/** @type {?} */ (sortByArray));
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @private
     * @param {?} columnFilters
     * @return {?}
     */
    castFilterToColumnFilter(columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        /** @type {?} */
        const filtersArray = (/** @type {?} */ (((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters)));
        return filtersArray.map((filter) => {
            /** @type {?} */
            const columnDef = filter.columnDef;
            /** @type {?} */
            const header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
            /** @type {?} */
            const tmpFilter = { columnId: filter.columnId || '' };
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
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @private
     * @param {?} operator
     * @return {?} string map
     */
    mapOdataOperator(operator) {
        /** @type {?} */
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
GridOdataService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridOdataService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._currentFilters;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._currentPagination;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._currentSorters;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._columnDefinitions;
    /**
     * @type {?}
     * @private
     */
    GridOdataService.prototype._grid;
    /** @type {?} */
    GridOdataService.prototype.odataService;
    /** @type {?} */
    GridOdataService.prototype.options;
    /** @type {?} */
    GridOdataService.prototype.pagination;
    /** @type {?} */
    GridOdataService.prototype.defaultOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1vZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLW9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxRQUFRLEVBU1IsU0FBUyxFQU9ULGFBQWEsRUFFZCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFFM0MsS0FBVTs7TUFDUiw4QkFBOEIsR0FBRyxHQUFHOztNQUNwQyxzQkFBc0IsR0FBRyxFQUFFOztNQUMzQixpQkFBaUIsR0FBRyxFQUFFO0FBRzVCLE1BQU0sT0FBTyxnQkFBZ0I7SUFlM0I7UUFOQSxtQkFBYyxHQUFnQjtZQUM1QixHQUFHLEVBQUUsc0JBQXNCO1lBQzNCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsUUFBUSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1NBQzlCLENBQUM7UUFHQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBR0QsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QyxDQUFD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QUFHLElBQUksQ0FBQztnQkFDWCxNQUFNO1lBQ1IsS0FBSyxJQUFJO2dCQUNQLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNYLE1BQU07WUFDUixLQUFLLElBQUk7Z0JBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDWCxNQUFNO1lBQ1IsS0FBSyxJQUFJLENBQUM7WUFDVixLQUFLLElBQUk7Z0JBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDWCxNQUFNO1lBQ1IsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLElBQUksQ0FBQztZQUNWO2dCQUNFLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsTUFBTTtTQUNUO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs7WUF0YUYsVUFBVTs7Ozs7Ozs7O0lBRVQsMkNBQXlDOzs7OztJQUN6Qyw4Q0FBOEM7Ozs7O0lBQzlDLDJDQUF5Qzs7Ozs7SUFDekMsOENBQXFDOzs7OztJQUNyQyxpQ0FBbUI7O0lBQ25CLHdDQUEyQjs7SUFDM0IsbUNBQXFCOztJQUNyQixzQ0FBbUM7O0lBQ25DLDBDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2dsb2JhbC11dGlsaXRpZXMnO1xuaW1wb3J0IHsgcGFyc2VVdGNEYXRlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFja2VuZFNlcnZpY2UsXG4gIENhc2VUeXBlLFxuICBDb2x1bW4sXG4gIENvbHVtbkZpbHRlcixcbiAgQ29sdW1uRmlsdGVycyxcbiAgQ29sdW1uU29ydCxcbiAgQ3VycmVudEZpbHRlcixcbiAgQ3VycmVudFBhZ2luYXRpb24sXG4gIEN1cnJlbnRTb3J0ZXIsXG4gIEZpbHRlckNoYW5nZWRBcmdzLFxuICBGaWVsZFR5cGUsXG4gIEdyaWRPcHRpb24sXG4gIE9kYXRhT3B0aW9uLFxuICBQYWdpbmF0aW9uLFxuICBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MsXG4gIFNlYXJjaFRlcm0sXG4gIFNvcnRDaGFuZ2VkQXJncyxcbiAgU29ydERpcmVjdGlvbixcbiAgU29ydERpcmVjdGlvblN0cmluZ1xufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBPZGF0YVNlcnZpY2UgfSBmcm9tICcuL29kYXRhLnNlcnZpY2UnO1xuXG5sZXQgdGltZXI6IGFueTtcbmNvbnN0IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRSA9IDc1MDtcbmNvbnN0IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UgPSAyNTtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmlkT2RhdGFTZXJ2aWNlIGltcGxlbWVudHMgQmFja2VuZFNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXJyZW50RmlsdGVyczogQ3VycmVudEZpbHRlcltdO1xuICBwcml2YXRlIF9jdXJyZW50UGFnaW5hdGlvbjogQ3VycmVudFBhZ2luYXRpb247XG4gIHByaXZhdGUgX2N1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW107XG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBvZGF0YVNlcnZpY2U6IE9kYXRhU2VydmljZTtcbiAgb3B0aW9uczogT2RhdGFPcHRpb247XG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb24gfCB1bmRlZmluZWQ7XG4gIGRlZmF1bHRPcHRpb25zOiBPZGF0YU9wdGlvbiA9IHtcbiAgICB0b3A6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UsXG4gICAgb3JkZXJCeTogJycsXG4gICAgY2FzZVR5cGU6IENhc2VUeXBlLnBhc2NhbENhc2VcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9kYXRhU2VydmljZSA9IG5ldyBPZGF0YVNlcnZpY2UoKTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICBidWlsZFF1ZXJ5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcbiAgfVxuXG4gIGluaXQob3B0aW9uczogT2RhdGFPcHRpb24sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uLCBncmlkPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICAgIGlmIChwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24ucGFnZVNpemUpIHtcbiAgICAgIG1lcmdlZE9wdGlvbnMudG9wID0gcGFnaW5hdGlvbi5wYWdlU2l6ZTtcbiAgICB9XG4gICAgdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucyA9IHsgLi4ubWVyZ2VkT3B0aW9ucywgdG9wOiBtZXJnZWRPcHRpb25zLnRvcCB8fCB0aGlzLmRlZmF1bHRPcHRpb25zLnRvcCB9O1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnM7XG4gICAgdGhpcy5wYWdpbmF0aW9uID0gcGFnaW5hdGlvbjtcblxuICAgIC8vIHNhdmUgY3VycmVudCBwYWdpbmF0aW9uIGFzIFBhZ2UgMSBhbmQgcGFnZSBzaXplIGFzIFwidG9wXCJcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy50b3AgfHwgdGhpcy5kZWZhdWx0T3B0aW9ucy50b3BcbiAgICB9O1xuXG4gICAgaWYgKGdyaWQgJiYgZ3JpZC5nZXRDb2x1bW5zKSB7XG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IChvcHRpb25zICYmIG9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnMpIHx8IGdyaWQuZ2V0Q29sdW1ucygpO1xuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoc2VydmljZU9wdGlvbnM/OiBPZGF0YU9wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5zZXJ2aWNlT3B0aW9ucyB9O1xuICB9XG5cbiAgcmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vZGF0YVNlcnZpY2UucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBGaWx0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IEN1cnJlbnRGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRGaWx0ZXJzO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgUGFnaW5hdGlvbiB0aGF0IGlzIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2luYXRpb247XG4gIH1cblxuICAvKiogR2V0IHRoZSBTb3J0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTb3J0ZXJzO1xuICB9XG5cbiAgLypcbiAgICogUmVzZXQgdGhlIHBhZ2luYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpIHtcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcbiAgICAgIHNraXA6IDBcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRlcm1zPzogYW55W10pIHtcbiAgICB0aGlzLm9kYXRhU2VydmljZS5zYXZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSwgdmFsdWUsIHRlcm1zKTtcbiAgfVxuXG4gIC8qXG4gICAqIEZJTFRFUklOR1xuICAgKi9cbiAgcHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IEZpbHRlckNoYW5nZWRBcmdzKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzZXJ2aWNlT3B0aW9uczogR3JpZE9wdGlvbiA9IGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCk7XG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHNlcnZpY2VPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuXG4gICAgaWYgKGJhY2tlbmRBcGkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgR3JpZE9kYXRhU2VydmljZSwgXCJiYWNrZW5kU2VydmljZUFwaVwiIGlzIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgYWRkIGEgZGVsYXkgd2hlbiB1c2VyIGlzIHR5cGluZywgb24gc2VsZWN0IGRyb3Bkb3duIGZpbHRlciBpdCB3aWxsIGV4ZWN1dGUgcmlnaHQgYXdheVxuICAgIGxldCBkZWJvdW5jZVR5cGluZ0RlbGF5ID0gMDtcbiAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgfHwgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSkge1xuICAgICAgZGVib3VuY2VUeXBpbmdEZWxheSA9IGJhY2tlbmRBcGkuZmlsdGVyVHlwaW5nRGVib3VuY2UgfHwgREVGQVVMVF9GSUxURVJfVFlQSU5HX0RFQk9VTkNFO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihhcmdzLmNvbHVtbkZpbHRlcnMpO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gcmVzZXQgUGFnaW5hdGlvbiwgdGhlbiBidWlsZCB0aGUgT0RhdGEgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xuICAgICAgLy8gd2FpdCBhIG1pbmltdW0gdXNlciB0eXBpbmcgaW5hY3Rpdml0eSBiZWZvcmUgcHJvY2Vzc2luZyBhbnkgcXVlcnlcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgc2V0IHRoZSBxdWVyeVxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoYXJncy5jb2x1bW5GaWx0ZXJzKTtcblxuICAgICAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKTtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCkpO1xuICAgICAgfSwgZGVib3VuY2VUeXBpbmdEZWxheSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qXG4gICAqIFBBR0lOQVRJT05cbiAgICovXG4gIHByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSB7XG4gICAgY29uc3QgcGFnZVNpemUgPSArKGFyZ3MucGFnZVNpemUgfHwgREVGQVVMVF9QQUdFX1NJWkUpO1xuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbihhcmdzLm5ld1BhZ2UsIHBhZ2VTaXplKTtcblxuICAgIC8vIGJ1aWxkIHRoZSBPRGF0YSBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNPUlRJTkdcbiAgICovXG4gIHByb2Nlc3NPblNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogU29ydENoYW5nZWRBcmdzKSB7XG4gICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7IHNvcnRDb2w6IGFyZ3Muc29ydENvbCwgc29ydEFzYzogYXJncy5zb3J0QXNjIH0pO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHNldCB0aGUgcXVlcnlcbiAgICB0aGlzLnVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnMpO1xuXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIGZpbHRlcmluZ09wdGlvbnNcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcbiAgICovXG4gIHVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSwgaXNVcGRhdGVkQnlQcmVzZXQ/OiBib29sZWFuKSB7XG4gICAgbGV0IHNlYXJjaEJ5ID0gJyc7XG4gICAgY29uc3Qgc2VhcmNoQnlBcnJheTogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnNcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIGNvbHVtbkZpbHRlcnMpIHtcbiAgICAgIGlmIChjb2x1bW5GaWx0ZXJzLmhhc093blByb3BlcnR5KGNvbHVtbklkKSkge1xuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBjb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcblxuICAgICAgICAvLyBpZiB1c2VyIGRlZmluZWQgc29tZSBcInByZXNldHNcIiwgdGhlbiB3ZSBuZWVkIHRvIGZpbmQgdGhlIGZpbHRlcnMgZnJvbSB0aGUgY29sdW1uIGRlZmluaXRpb25zIGluc3RlYWRcbiAgICAgICAgbGV0IGNvbHVtbkRlZjogQ29sdW1uIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaXNVcGRhdGVkQnlQcmVzZXQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykpIHtcbiAgICAgICAgICBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5pZCA9PT0gY29sdW1uRmlsdGVyLmNvbHVtbklkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tCYWNrZW5kIFNlcnZpY2UgQVBJXTogU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdHJ5aW5nIHRvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gb2YgdGhlIHNwZWNpZmllZCBmaWx0ZXIgKG9yIHByZXNldCBmaWx0ZXJzKS4gRGlkIHlvdSBtYWtlIGEgdHlwbyBvbiB0aGUgZmlsdGVyIGNvbHVtbklkPycpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJztcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uRGVmLnR5cGUgfHwgJ3N0cmluZyc7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gKGNvbHVtbkZpbHRlciA/IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcyA6IG51bGwpIHx8IFtdO1xuICAgICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKSAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVGVybXNbMF0gOiAnJztcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSAhPT0gJ3N0cmluZycgJiYgIXNlYXJjaFRlcm1zKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPRGRhdGEgZmlsdGVyIHNlYXJjaFRlcm0gcHJvcGVydHkgbXVzdCBiZSBwcm92aWRlZCBhcyB0eXBlIFwic3RyaW5nXCIsIGlmIHlvdSB1c2UgZmlsdGVyIHdpdGggb3B0aW9ucyB0aGVuIG1ha2Ugc3VyZSB5b3VyIElEcyBhcmUgYWxzbyBzdHJpbmcuIEZvciBleGFtcGxlOiBmaWx0ZXI6IHttb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IGlkOiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfV1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBmaWVsZFNlYXJjaFZhbHVlLm1hdGNoKC9eKFs8PiE9XFwqXXswLDJ9KSguKltePD4hPVxcKl0pKFtcXCpdPykkLyk7IC8vIGdyb3VwIDE6IE9wZXJhdG9yLCAyOiBzZWFyY2hWYWx1ZSwgMzogbGFzdCBjaGFyIGlzICcqJyAobWVhbmluZyBzdGFydHMgd2l0aCwgZXguOiBhYmMqKVxuICAgICAgICBjb25zdCBvcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvciB8fCAoKG1hdGNoZXMpID8gbWF0Y2hlc1sxXSA6ICcnKTtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XG4gICAgICAgIGNvbnN0IGJ5cGFzc09kYXRhUXVlcnkgPSBjb2x1bW5GaWx0ZXIuYnlwYXNzQmFja2VuZFF1ZXJ5IHx8IGZhbHNlO1xuXG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XG4gICAgICAgIGlmIChmaWVsZE5hbWUgJiYgc2VhcmNoVmFsdWUgPT09ICcnICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXG4gICAgICAgIHNlYXJjaFZhbHVlID0gc2VhcmNoVmFsdWUucmVwbGFjZShgJ2AsIGAnJ2ApOyAvLyBlc2NhcGUgc2luZ2xlIHF1b3RlcyBieSBkb3VibGluZyB0aGVtXG4gICAgICAgIHNlYXJjaFZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFZhbHVlKTsgLy8gZW5jb2RlIFVSSSBvZiB0aGUgZmluYWwgc2VhcmNoIHZhbHVlXG5cbiAgICAgICAgLy8gZXh0cmEgcXVlcnkgYXJndW1lbnRzXG4gICAgICAgIGlmIChieXBhc3NPZGF0YVF1ZXJ5KSB7XG4gICAgICAgICAgLy8gcHVzaCB0byBvdXIgdGVtcCBhcnJheSBhbmQgYWxzbyB0cmltIHdoaXRlIHNwYWNlc1xuICAgICAgICAgIGlmIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWUsIGZpZWxkU2VhcmNoVmFsdWUsIHNlYXJjaFRlcm1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VhcmNoQnkgPSAnJztcblxuICAgICAgICAgIC8vIHRpdGxlQ2FzZSB0aGUgZmllbGROYW1lIHNvIHRoYXQgaXQgbWF0Y2hlcyB0aGUgV2ViQXBpIG5hbWVzXG4gICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcbiAgICAgICAgICAgIGZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoZmllbGROYW1lIHx8ICcnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB3aGVuIGhhdmluZyBtb3JlIHRoYW4gMSBzZWFyY2ggdGVybSAodGhlbiBjaGVjayBpZiB3ZSBoYXZlIGEgXCJJTlwiIG9yIFwiTk9UIElOXCIgZmlsdGVyIHNlYXJjaClcbiAgICAgICAgICBpZiAoc2VhcmNoVGVybXMgJiYgc2VhcmNoVGVybXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgdG1wU2VhcmNoVGVybXMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnSU4nKSB7XG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgZXEgXCJFeHBpcmVkXCIgb3IgU3RhZ2UgZXEgXCJSZW5ld2FsXCIpXG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsbmogPSBzZWFyY2hUZXJtcy5sZW5ndGg7IGogPCBsbmo7IGorKykge1xuICAgICAgICAgICAgICAgIHRtcFNlYXJjaFRlcm1zLnB1c2goYCR7ZmllbGROYW1lfSBlcSAnJHtzZWFyY2hUZXJtc1tqXX0nYCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSB0bXBTZWFyY2hUZXJtcy5qb2luKCcgb3IgJyk7XG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCgke3NlYXJjaEJ5fSlgO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ05JTicgfHwgb3BlcmF0b3IgPT09ICdOT1RJTicgfHwgb3BlcmF0b3IgPT09ICdOT1QgSU4nKSB7XG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgbmUgXCJFeHBpcmVkXCIgYW5kIFN0YWdlIG5lIFwiUmVuZXdhbFwiKVxuICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbG5rID0gc2VhcmNoVGVybXMubGVuZ3RoOyBrIDwgbG5rOyBrKyspIHtcbiAgICAgICAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gbmUgJyR7c2VhcmNoVGVybXNba119J2ApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gdG1wU2VhcmNoVGVybXMuam9pbignIGFuZCAnKTtcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgKCR7c2VhcmNoQnl9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBmaXJzdC9sYXN0IGNoYXJhY3RlciBpcyBhICcqJyB3aWxsIGJlIGEgc3RhcnRzV2l0aCBvciBlbmRzV2l0aFxuICAgICAgICAgICAgc2VhcmNoQnkgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JylcbiAgICAgICAgICAgICAgPyBgZW5kc3dpdGgoJHtmaWVsZE5hbWV9LCAnJHtzZWFyY2hWYWx1ZX0nKWBcbiAgICAgICAgICAgICAgOiBgc3RhcnRzd2l0aCgke2ZpZWxkTmFtZX0sICcke3NlYXJjaFZhbHVlfScpYDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gRmllbGRUeXBlLmRhdGUpIHtcbiAgICAgICAgICAgIC8vIGRhdGUgZmllbGQgbmVlZHMgdG8gYmUgVVRDIGFuZCB3aXRoaW4gRGF0ZVRpbWUgZnVuY3Rpb25cbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXR0ZWQgPSBwYXJzZVV0Y0RhdGUoc2VhcmNoVmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgJHtmaWVsZE5hbWV9ICR7dGhpcy5tYXBPZGF0YU9wZXJhdG9yKG9wZXJhdG9yKX0gRGF0ZVRpbWUnJHtkYXRlRm9ybWF0dGVkfSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSBGaWVsZFR5cGUuc3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzdHJpbmcgZmllbGQgbmVlZHMgdG8gYmUgaW4gc2luZ2xlIHF1b3Rlc1xuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnJykge1xuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGBzdWJzdHJpbmdvZignJHtzZWFyY2hWYWx1ZX0nLCAke2ZpZWxkTmFtZX0pYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHNlYXJjaEJ5ID0gYHN1YnN0cmluZ29mKCcke3NlYXJjaFZhbHVlfScsICR7ZmllbGROYW1lQ2FzZWR9KSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9IHRydWVgO1xuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGAke2ZpZWxkTmFtZX0gJHt0aGlzLm1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3IpfSAnJHtzZWFyY2hWYWx1ZX0nYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYW55IG90aGVyIGZpZWxkIHR5cGUgKG9yIHVuZGVmaW5lZCB0eXBlKVxuICAgICAgICAgICAgc2VhcmNoVmFsdWUgPSBmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5udW1iZXIgPyBzZWFyY2hWYWx1ZSA6IGAnJHtzZWFyY2hWYWx1ZX0nYDtcbiAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9ICR7c2VhcmNoVmFsdWV9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXG4gICAgICAgICAgaWYgKHNlYXJjaEJ5ICE9PSAnJykge1xuICAgICAgICAgICAgc2VhcmNoQnlBcnJheS5wdXNoKFN0cmluZy50cmltKHNlYXJjaEJ5KSk7XG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lIHx8ICcnLCBmaWVsZFNlYXJjaFZhbHVlLCBzZWFyY2hUZXJtcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCBmaWx0ZXJzIGZvciB0aGUgYnVpbGRRdWVyeSgpIHRvIHdvcmsgbGF0ZXJcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcbiAgICAgIGZpbHRlcjogKHNlYXJjaEJ5QXJyYXkubGVuZ3RoID4gMCkgPyBzZWFyY2hCeUFycmF5LmpvaW4oJyBhbmQgJykgOiAnJyxcbiAgICAgIHNraXA6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQgd2l0aCBpdCdzIG5ldyBwYWdlIG51bWJlciBhbmQgc2l6ZVxuICAgKiBAcGFyYW0gbmV3UGFnZVxuICAgKiBAcGFyYW0gcGFnZVNpemVcbiAgICovXG4gIHVwZGF0ZVBhZ2luYXRpb24obmV3UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XG4gICAgICBwYWdlTnVtYmVyOiBuZXdQYWdlLFxuICAgICAgcGFnZVNpemVcbiAgICB9O1xuXG4gICAgdGhpcy5vZGF0YVNlcnZpY2UudXBkYXRlT3B0aW9ucyh7XG4gICAgICB0b3A6IHBhZ2VTaXplLFxuICAgICAgc2tpcDogKG5ld1BhZ2UgLSAxKSAqIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2Ugb3JkZXJCeVxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xuICAgKi9cbiAgdXBkYXRlU29ydGVycyhzb3J0Q29sdW1ucz86IENvbHVtblNvcnRbXSwgcHJlc2V0U29ydGVycz86IEN1cnJlbnRTb3J0ZXJbXSkge1xuICAgIGxldCBzb3J0QnlBcnJheTogYW55W10gPSBbXTtcbiAgICBjb25zdCBzb3J0ZXJBcnJheTogQ3VycmVudFNvcnRlcltdID0gW107XG5cbiAgICBpZiAoIXNvcnRDb2x1bW5zICYmIHByZXNldFNvcnRlcnMpIHtcbiAgICAgIC8vIG1ha2UgdGhlIHByZXNldHMgdGhlIGN1cnJlbnQgc29ydGVycywgYWxzbyBtYWtlIHN1cmUgdGhhdCBhbGwgZGlyZWN0aW9uIGFyZSBpbiBsb3dlcmNhc2UgZm9yIE9EYXRhXG4gICAgICBzb3J0QnlBcnJheSA9IHByZXNldFNvcnRlcnM7XG4gICAgICBzb3J0QnlBcnJheS5mb3JFYWNoKChzb3J0ZXIpID0+IHNvcnRlci5kaXJlY3Rpb24gPSBzb3J0ZXIuZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZyk7XG5cbiAgICAgIC8vIGRpc3BsYXkgdGhlIGNvcnJlY3Qgc29ydGluZyBpY29ucyBvbiB0aGUgVUksIGZvciB0aGF0IGl0IHJlcXVpcmVzIChjb2x1bW5JZCwgc29ydEFzYykgcHJvcGVydGllc1xuICAgICAgY29uc3QgdG1wU29ydGVyQXJyYXkgPSBzb3J0QnlBcnJheS5tYXAoKHNvcnRlcikgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBzb3J0ZXIuY29sdW1uSWQpO1xuXG4gICAgICAgIHNvcnRlckFycmF5LnB1c2goe1xuICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYgPyAoKGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQpICsgJycpIDogKHNvcnRlci5jb2x1bW5JZCArICcnKSxcbiAgICAgICAgICBkaXJlY3Rpb246IHNvcnRlci5kaXJlY3Rpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmV0dXJuIG9ubHkgdGhlIGNvbHVtbihzKSBmb3VuZCBpbiB0aGUgQ29sdW1uIERlZmluaXRpb25zIEVMU0UgbnVsbFxuICAgICAgICBpZiAoY29sdW1uRGVmKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0ZXIuY29sdW1uSWQsXG4gICAgICAgICAgICBzb3J0QXNjOiBzb3J0ZXIuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZ3JpZC5zZXRTb3J0Q29sdW1ucyh0bXBTb3J0ZXJBcnJheSk7XG4gICAgfSBlbHNlIGlmIChzb3J0Q29sdW1ucyAmJiAhcHJlc2V0U29ydGVycykge1xuICAgICAgLy8gYnVpbGQgdGhlIFNvcnRCeSBzdHJpbmcsIGl0IGNvdWxkIGJlIG11bHRpc29ydCwgZXhhbXBsZTogY3VzdG9tZXJObyBhc2MsIHB1cmNoYXNlck5hbWUgZGVzY1xuICAgICAgaWYgKHNvcnRDb2x1bW5zICYmIHNvcnRDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzb3J0QnlBcnJheSA9IG5ldyBBcnJheSh0aGlzLmRlZmF1bHRPcHRpb25zLm9yZGVyQnkpOyAvLyB3aGVuIGVtcHR5LCB1c2UgdGhlIGRlZmF1bHQgc29ydFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNvcnRDb2x1bW5zKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5EZWYgb2Ygc29ydENvbHVtbnMpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc29ydENvbCkge1xuICAgICAgICAgICAgICBsZXQgZmllbGROYW1lID0gKGNvbHVtbkRlZi5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnNvcnRDb2wucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5EZWYuc29ydENvbC5maWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5pZCkgKyAnJztcbiAgICAgICAgICAgICAgbGV0IGNvbHVtbkZpZWxkTmFtZSA9IChjb2x1bW5EZWYuc29ydENvbC5maWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5pZCkgKyAnJztcbiAgICAgICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWUgPSBTdHJpbmcudGl0bGVDYXNlKGZpZWxkTmFtZSk7XG4gICAgICAgICAgICAgICAgY29sdW1uRmllbGROYW1lID0gU3RyaW5nLnRpdGxlQ2FzZShjb2x1bW5GaWVsZE5hbWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc29ydGVyQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGNvbHVtbkRlZi5zb3J0QXNjID8gJ2FzYycgOiAnZGVzYydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNvcnRCeUFycmF5ID0gc29ydGVyQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmFuc2Zvcm0gdGhlIHNvcnRieSBhcnJheSBpbnRvIGEgQ1NWIHN0cmluZyBmb3IgT0RhdGFcbiAgICBzb3J0QnlBcnJheSA9IHNvcnRCeUFycmF5IGFzIEN1cnJlbnRTb3J0ZXJbXTtcbiAgICBjb25zdCBjc3ZTdHJpbmcgPSBzb3J0QnlBcnJheS5tYXAoKHNvcnRlcikgPT4gYCR7c29ydGVyLmNvbHVtbklkfSAke3NvcnRlci5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKX1gKS5qb2luKCcsJyk7XG4gICAgdGhpcy5vZGF0YVNlcnZpY2UudXBkYXRlT3B0aW9ucyh7XG4gICAgICBvcmRlckJ5OiAodGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy5jYXNlVHlwZSA9PT0gQ2FzZVR5cGUucGFzY2FsQ2FzZSkgPyBTdHJpbmcudGl0bGVDYXNlKGNzdlN0cmluZykgOiBjc3ZTdHJpbmdcbiAgICB9KTtcblxuICAgIC8vIGtlZXAgY3VycmVudCBTb3J0ZXJzIGFuZCB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIHRoZSBuZXcgc29ydGluZ1xuICAgIHRoaXMuX2N1cnJlbnRTb3J0ZXJzID0gc29ydEJ5QXJyYXkgYXMgQ3VycmVudFNvcnRlcltdO1xuXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ2FzdCBwcm92aWRlZCBmaWx0ZXJzIChjb3VsZCBiZSBpbiBtdWx0aXBsZSBmb3JtYXQpIGludG8gYW4gYXJyYXkgb2YgQ29sdW1uRmlsdGVyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXG4gICAqL1xuICBwcml2YXRlIGNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdKTogQ3VycmVudEZpbHRlcltdIHtcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxuICAgIGNvbnN0IGZpbHRlcnNBcnJheTogQ29sdW1uRmlsdGVyW10gPSAoKHR5cGVvZiBjb2x1bW5GaWx0ZXJzID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyhjb2x1bW5GaWx0ZXJzKS5tYXAoa2V5ID0+IGNvbHVtbkZpbHRlcnNba2V5XSkgOiBjb2x1bW5GaWx0ZXJzKSBhcyBDdXJyZW50RmlsdGVyW107XG5cbiAgICByZXR1cm4gZmlsdGVyc0FycmF5Lm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBmaWx0ZXIuY29sdW1uRGVmO1xuICAgICAgY29uc3QgaGVhZGVyID0gKGNvbHVtbkRlZikgPyAoY29sdW1uRGVmLmhlYWRlcktleSB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJykgOiAnJztcbiAgICAgIGNvbnN0IHRtcEZpbHRlcjogQ3VycmVudEZpbHRlciA9IHsgY29sdW1uSWQ6IGZpbHRlci5jb2x1bW5JZCB8fCAnJyB9O1xuICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcikge1xuICAgICAgICB0bXBGaWx0ZXIub3BlcmF0b3IgPSBmaWx0ZXIub3BlcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpKSB7XG4gICAgICAgIHRtcEZpbHRlci5zZWFyY2hUZXJtcyA9IGZpbHRlci5zZWFyY2hUZXJtcztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXBGaWx0ZXI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWFwcGVyIGZvciBtYXRoZW1hdGljYWwgb3BlcmF0b3JzIChleC46IDw9IGlzIFwibGVcIiwgPiBpcyBcImd0XCIpXG4gICAqIEBwYXJhbSBzdHJpbmcgb3BlcmF0b3JcbiAgICogQHJldHVybnMgc3RyaW5nIG1hcFxuICAgKi9cbiAgcHJpdmF0ZSBtYXBPZGF0YU9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcpIHtcbiAgICBsZXQgbWFwID0gJyc7XG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIG1hcCA9ICdsdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPD0nOlxuICAgICAgICBtYXAgPSAnbGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz4nOlxuICAgICAgICBtYXAgPSAnZ3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgbWFwID0gJ2dlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc8Pic6XG4gICAgICBjYXNlICchPSc6XG4gICAgICAgIG1hcCA9ICduZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPSc6XG4gICAgICBjYXNlICc9PSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXAgPSAnZXEnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG59XG4iXX0=