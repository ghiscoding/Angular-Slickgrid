/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import { CaseType, FieldType, SortDirection } from './../models/index';
import { OdataService } from './odata.service';
/** @type {?} */
var timer;
/** @type {?} */
var DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
/** @type {?} */
var DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
var DEFAULT_PAGE_SIZE = 20;
var GridOdataService = /** @class */ (function () {
    function GridOdataService() {
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
    }
    Object.defineProperty(GridOdataService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GridOdataService.prototype.buildQuery = /**
     * @return {?}
     */
    function () {
        return this.odataService.buildQuery();
    };
    /**
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    GridOdataService.prototype.init = /**
     * @param {?} options
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    function (options, pagination, grid) {
        this._grid = grid;
        /** @type {?} */
        var mergedOptions = tslib_1.__assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = tslib_1.__assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
        this.options = this.odataService.options;
        this.pagination = pagination;
        // save current pagination as Page 1 and page size as "top"
        this._currentPagination = {
            pageNumber: 1,
            pageSize: this.odataService.options.top || this.defaultOptions.top
        };
        if (grid && grid.getColumns) {
            this._columnDefinitions = (options && options.columnDefinitions) || grid.getColumns();
            this._columnDefinitions = this._columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
        }
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GridOdataService.prototype.updateOptions = /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    function (serviceOptions) {
        this.options = tslib_1.__assign({}, this.options, serviceOptions);
    };
    /**
     * @param {?} fieldName
     * @return {?}
     */
    GridOdataService.prototype.removeColumnFilter = /**
     * @param {?} fieldName
     * @return {?}
     */
    function (fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    };
    /** Get the Filters that are currently used by the grid */
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    GridOdataService.prototype.getCurrentFilters = /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    function () {
        return this._currentFilters;
    };
    /** Get the Pagination that is currently used by the grid */
    /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    GridOdataService.prototype.getCurrentPagination = /**
     * Get the Pagination that is currently used by the grid
     * @return {?}
     */
    function () {
        return this._currentPagination;
    };
    /** Get the Sorters that are currently used by the grid */
    /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    GridOdataService.prototype.getCurrentSorters = /**
     * Get the Sorters that are currently used by the grid
     * @return {?}
     */
    function () {
        return this._currentSorters;
    };
    /*
     * Reset the pagination options
     */
    /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    GridOdataService.prototype.resetPaginationOptions = /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    function () {
        this.odataService.updateOptions({
            skip: 0
        });
    };
    /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    GridOdataService.prototype.saveColumnFilter = /**
     * @param {?} fieldName
     * @param {?} value
     * @param {?=} terms
     * @return {?}
     */
    function (fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    };
    /*
     * FILTERING
     */
    /*
       * FILTERING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.processOnFilterChanged = /*
       * FILTERING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        var _this = this;
        /** @type {?} */
        var serviceOptions = args.grid.getOptions();
        /** @type {?} */
        var backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // only add a delay when user is typing, on select dropdown filter it will execute right away
        /** @type {?} */
        var debounceTypingDelay = 0;
        if (event && (event.type === 'keyup' || event.type === 'keydown')) {
            debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        /** @type {?} */
        var promise = new Promise(function (resolve, reject) {
            // reset Pagination, then build the OData query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer);
            timer = setTimeout(function () {
                // loop through all columns to inspect filters & set the query
                _this.updateFilters(args.columnFilters);
                _this.resetPaginationOptions();
                resolve(_this.odataService.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    };
    /*
     * PAGINATION
     */
    /*
       * PAGINATION
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.processOnPaginationChanged = /*
       * PAGINATION
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        /** @type {?} */
        var pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE);
        this.updatePagination(args.newPage, pageSize);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    /*
     * SORTING
     */
    /*
       * SORTING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GridOdataService.prototype.processOnSortChanged = /*
       * SORTING
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        /** @type {?} */
        var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    GridOdataService.prototype.updateFilters = /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?=} isUpdatedByPreset
     * @return {?}
     */
    function (columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        var searchBy = '';
        /** @type {?} */
        var searchByArray = [];
        var _loop_1 = function (columnId) {
            if (columnFilters.hasOwnProperty(columnId)) {
                /** @type {?} */
                var columnFilter_1 = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                /** @type {?} */
                var columnDef = void 0;
                if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                    columnDef = this_1._columnDefinitions.find(function (column) {
                        return column.id === columnFilter_1.columnId;
                    });
                }
                else {
                    columnDef = columnFilter_1.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                /** @type {?} */
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                /** @type {?} */
                var fieldType = columnDef.type || 'string';
                /** @type {?} */
                var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                /** @type {?} */
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("ODdata filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                /** @type {?} */
                var searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                /** @type {?} */
                var bypassOdataQuery = columnFilter_1.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    this_1.removeColumnFilter(fieldName);
                    return "continue";
                }
                // escaping the search value
                searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                // extra query arguments
                if (bypassOdataQuery) {
                    // push to our temp array and also trim white spaces
                    if (fieldName) {
                        this_1.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    if (this_1.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 1) {
                        /** @type {?} */
                        var tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (var j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(fieldName + " eq '" + searchTerms[j] + "'");
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = "(" + searchBy + ")";
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (var k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(fieldName + " ne '" + searchTerms[k] + "'");
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = "(" + searchBy + ")";
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = (operator === '*' || operator === '*z')
                            ? "endswith(" + fieldName + ", '" + searchValue + "')"
                            : "startswith(" + fieldName + ", '" + searchValue + "')";
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        /** @type {?} */
                        var dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " DateTime'" + dateFormatted + "'";
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        if (operator === '') {
                            searchBy = "substringof('" + searchValue + "', " + fieldName + ")";
                        }
                        else {
                            // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                            searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " '" + searchValue + "'";
                        }
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : "'" + searchValue + "'";
                        searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " " + searchValue;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
                        this_1.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        };
        var this_1 = this;
        // loop through all columns to inspect filters
        for (var columnId in columnFilters) {
            _loop_1(columnId);
        }
        // update the service options with filters for the buildQuery() to work later
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
    };
    /**
     * Update the pagination component with it's new page number and size
     * @param newPage
     * @param pageSize
     */
    /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    GridOdataService.prototype.updatePagination = /**
     * Update the pagination component with it's new page number and size
     * @param {?} newPage
     * @param {?} pageSize
     * @return {?}
     */
    function (newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize: pageSize
        };
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    };
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    GridOdataService.prototype.updateSorters = /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    function (sortColumns, presetSorters) {
        var _this = this;
        var e_1, _a;
        /** @type {?} */
        var sortByArray = [];
        /** @type {?} */
        var sorterArray = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in lowercase for OData
            sortByArray = presetSorters;
            sortByArray.forEach(function (sorter) { return sorter.direction = (/** @type {?} */ (sorter.direction.toLowerCase())); });
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            var tmpSorterArray = sortByArray.map(function (sorter) {
                /** @type {?} */
                var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
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
                    try {
                        for (var sortColumns_1 = tslib_1.__values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                            var columnDef = sortColumns_1_1.value;
                            if (columnDef.sortCol) {
                                /** @type {?} */
                                var fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                                /** @type {?} */
                                var columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
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
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    sortByArray = sorterArray;
                }
            }
        }
        // transform the sortby array into a CSV string for OData
        sortByArray = (/** @type {?} */ (sortByArray));
        /** @type {?} */
        var csvString = sortByArray.map(function (sorter) { return sorter.columnId + " " + sorter.direction.toLowerCase(); }).join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
        });
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = (/** @type {?} */ (sortByArray));
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    };
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param columnFilters
     */
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @private
     * @param {?} columnFilters
     * @return {?}
     */
    GridOdataService.prototype.castFilterToColumnFilter = 
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @private
     * @param {?} columnFilters
     * @return {?}
     */
    function (columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        /** @type {?} */
        var filtersArray = (/** @type {?} */ (((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters)));
        return filtersArray.map(function (filter) {
            /** @type {?} */
            var columnDef = filter.columnDef;
            /** @type {?} */
            var header = (columnDef) ? (columnDef.headerKey || columnDef.name || '') : '';
            /** @type {?} */
            var tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        });
    };
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param string operator
     * @returns string map
     */
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @private
     * @param {?} operator
     * @return {?} string map
     */
    GridOdataService.prototype.mapOdataOperator = /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @private
     * @param {?} operator
     * @return {?} string map
     */
    function (operator) {
        /** @type {?} */
        var map = '';
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
    };
    GridOdataService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridOdataService.ctorParameters = function () { return []; };
    return GridOdataService;
}());
export { GridOdataService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1vZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLW9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsUUFBUSxFQVNSLFNBQVMsRUFPVCxhQUFhLEVBRWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBRTNDLEtBQVU7O0lBQ1IsOEJBQThCLEdBQUcsR0FBRzs7SUFDcEMsc0JBQXNCLEdBQUcsRUFBRTs7SUFDM0IsaUJBQWlCLEdBQUcsRUFBRTtBQUU1QjtJQWdCRTtRQU5BLG1CQUFjLEdBQWdCO1lBQzVCLEdBQUcsRUFBRSxzQkFBc0I7WUFDM0IsT0FBTyxFQUFFLEVBQUU7WUFDWCxRQUFRLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDOUIsQ0FBQztRQUdBLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBR0Qsc0JBQVksMENBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7Ozs7SUFFRCxxQ0FBVTs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxF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QyxpQ0FBbUI7O0lBQ25CLHdDQUEyQjs7SUFDM0IsbUNBQXFCOztJQUNyQixzQ0FBbUM7O0lBQ25DLDBDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2dsb2JhbC11dGlsaXRpZXMnO1xuaW1wb3J0IHsgcGFyc2VVdGNEYXRlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmFja2VuZFNlcnZpY2UsXG4gIENhc2VUeXBlLFxuICBDb2x1bW4sXG4gIENvbHVtbkZpbHRlcixcbiAgQ29sdW1uRmlsdGVycyxcbiAgQ29sdW1uU29ydCxcbiAgQ3VycmVudEZpbHRlcixcbiAgQ3VycmVudFBhZ2luYXRpb24sXG4gIEN1cnJlbnRTb3J0ZXIsXG4gIEZpbHRlckNoYW5nZWRBcmdzLFxuICBGaWVsZFR5cGUsXG4gIEdyaWRPcHRpb24sXG4gIE9kYXRhT3B0aW9uLFxuICBQYWdpbmF0aW9uLFxuICBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MsXG4gIFNlYXJjaFRlcm0sXG4gIFNvcnRDaGFuZ2VkQXJncyxcbiAgU29ydERpcmVjdGlvbixcbiAgU29ydERpcmVjdGlvblN0cmluZ1xufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBPZGF0YVNlcnZpY2UgfSBmcm9tICcuL29kYXRhLnNlcnZpY2UnO1xuXG5sZXQgdGltZXI6IGFueTtcbmNvbnN0IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRSA9IDc1MDtcbmNvbnN0IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UgPSAyNTtcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcmlkT2RhdGFTZXJ2aWNlIGltcGxlbWVudHMgQmFja2VuZFNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXJyZW50RmlsdGVyczogQ3VycmVudEZpbHRlcltdO1xuICBwcml2YXRlIF9jdXJyZW50UGFnaW5hdGlvbjogQ3VycmVudFBhZ2luYXRpb247XG4gIHByaXZhdGUgX2N1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW107XG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBvZGF0YVNlcnZpY2U6IE9kYXRhU2VydmljZTtcbiAgb3B0aW9uczogT2RhdGFPcHRpb247XG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb24gfCB1bmRlZmluZWQ7XG4gIGRlZmF1bHRPcHRpb25zOiBPZGF0YU9wdGlvbiA9IHtcbiAgICB0b3A6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UsXG4gICAgb3JkZXJCeTogJycsXG4gICAgY2FzZVR5cGU6IENhc2VUeXBlLnBhc2NhbENhc2VcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9kYXRhU2VydmljZSA9IG5ldyBPZGF0YVNlcnZpY2UoKTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICBidWlsZFF1ZXJ5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcbiAgfVxuXG4gIGluaXQob3B0aW9uczogT2RhdGFPcHRpb24sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uLCBncmlkPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICAgIGlmIChwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24ucGFnZVNpemUpIHtcbiAgICAgIG1lcmdlZE9wdGlvbnMudG9wID0gcGFnaW5hdGlvbi5wYWdlU2l6ZTtcbiAgICB9XG4gICAgdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucyA9IHsgLi4ubWVyZ2VkT3B0aW9ucywgdG9wOiBtZXJnZWRPcHRpb25zLnRvcCB8fCB0aGlzLmRlZmF1bHRPcHRpb25zLnRvcCB9O1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnM7XG4gICAgdGhpcy5wYWdpbmF0aW9uID0gcGFnaW5hdGlvbjtcblxuICAgIC8vIHNhdmUgY3VycmVudCBwYWdpbmF0aW9uIGFzIFBhZ2UgMSBhbmQgcGFnZSBzaXplIGFzIFwidG9wXCJcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy50b3AgfHwgdGhpcy5kZWZhdWx0T3B0aW9ucy50b3BcbiAgICB9O1xuXG4gICAgaWYgKGdyaWQgJiYgZ3JpZC5nZXRDb2x1bW5zKSB7XG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IChvcHRpb25zICYmIG9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnMpIHx8IGdyaWQuZ2V0Q29sdW1ucygpO1xuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoc2VydmljZU9wdGlvbnM/OiBPZGF0YU9wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5zZXJ2aWNlT3B0aW9ucyB9O1xuICB9XG5cbiAgcmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5vZGF0YVNlcnZpY2UucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBGaWx0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IEN1cnJlbnRGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRGaWx0ZXJzO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgUGFnaW5hdGlvbiB0aGF0IGlzIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2luYXRpb247XG4gIH1cblxuICAvKiogR2V0IHRoZSBTb3J0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTb3J0ZXJzO1xuICB9XG5cbiAgLypcbiAgICogUmVzZXQgdGhlIHBhZ2luYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpIHtcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcbiAgICAgIHNraXA6IDBcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRlcm1zPzogYW55W10pIHtcbiAgICB0aGlzLm9kYXRhU2VydmljZS5zYXZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSwgdmFsdWUsIHRlcm1zKTtcbiAgfVxuXG4gIC8qXG4gICAqIEZJTFRFUklOR1xuICAgKi9cbiAgcHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IEZpbHRlckNoYW5nZWRBcmdzKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzZXJ2aWNlT3B0aW9uczogR3JpZE9wdGlvbiA9IGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCk7XG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHNlcnZpY2VPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuXG4gICAgaWYgKGJhY2tlbmRBcGkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgR3JpZE9kYXRhU2VydmljZSwgXCJiYWNrZW5kU2VydmljZUFwaVwiIGlzIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgYWRkIGEgZGVsYXkgd2hlbiB1c2VyIGlzIHR5cGluZywgb24gc2VsZWN0IGRyb3Bkb3duIGZpbHRlciBpdCB3aWxsIGV4ZWN1dGUgcmlnaHQgYXdheVxuICAgIGxldCBkZWJvdW5jZVR5cGluZ0RlbGF5ID0gMDtcbiAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgfHwgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSkge1xuICAgICAgZGVib3VuY2VUeXBpbmdEZWxheSA9IGJhY2tlbmRBcGkuZmlsdGVyVHlwaW5nRGVib3VuY2UgfHwgREVGQVVMVF9GSUxURVJfVFlQSU5HX0RFQk9VTkNFO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihhcmdzLmNvbHVtbkZpbHRlcnMpO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gcmVzZXQgUGFnaW5hdGlvbiwgdGhlbiBidWlsZCB0aGUgT0RhdGEgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xuICAgICAgLy8gd2FpdCBhIG1pbmltdW0gdXNlciB0eXBpbmcgaW5hY3Rpdml0eSBiZWZvcmUgcHJvY2Vzc2luZyBhbnkgcXVlcnlcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgc2V0IHRoZSBxdWVyeVxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoYXJncy5jb2x1bW5GaWx0ZXJzKTtcblxuICAgICAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKTtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCkpO1xuICAgICAgfSwgZGVib3VuY2VUeXBpbmdEZWxheSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qXG4gICAqIFBBR0lOQVRJT05cbiAgICovXG4gIHByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSB7XG4gICAgY29uc3QgcGFnZVNpemUgPSArKGFyZ3MucGFnZVNpemUgfHwgREVGQVVMVF9QQUdFX1NJWkUpO1xuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbihhcmdzLm5ld1BhZ2UsIHBhZ2VTaXplKTtcblxuICAgIC8vIGJ1aWxkIHRoZSBPRGF0YSBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNPUlRJTkdcbiAgICovXG4gIHByb2Nlc3NPblNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogU29ydENoYW5nZWRBcmdzKSB7XG4gICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7IHNvcnRDb2w6IGFyZ3Muc29ydENvbCwgc29ydEFzYzogYXJncy5zb3J0QXNjIH0pO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHNldCB0aGUgcXVlcnlcbiAgICB0aGlzLnVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnMpO1xuXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIGZpbHRlcmluZ09wdGlvbnNcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcbiAgICovXG4gIHVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSwgaXNVcGRhdGVkQnlQcmVzZXQ/OiBib29sZWFuKSB7XG4gICAgbGV0IHNlYXJjaEJ5ID0gJyc7XG4gICAgY29uc3Qgc2VhcmNoQnlBcnJheTogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnNcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIGNvbHVtbkZpbHRlcnMpIHtcbiAgICAgIGlmIChjb2x1bW5GaWx0ZXJzLmhhc093blByb3BlcnR5KGNvbHVtbklkKSkge1xuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBjb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcblxuICAgICAgICAvLyBpZiB1c2VyIGRlZmluZWQgc29tZSBcInByZXNldHNcIiwgdGhlbiB3ZSBuZWVkIHRvIGZpbmQgdGhlIGZpbHRlcnMgZnJvbSB0aGUgY29sdW1uIGRlZmluaXRpb25zIGluc3RlYWRcbiAgICAgICAgbGV0IGNvbHVtbkRlZjogQ29sdW1uIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaXNVcGRhdGVkQnlQcmVzZXQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykpIHtcbiAgICAgICAgICBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5pZCA9PT0gY29sdW1uRmlsdGVyLmNvbHVtbklkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tCYWNrZW5kIFNlcnZpY2UgQVBJXTogU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdHJ5aW5nIHRvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gb2YgdGhlIHNwZWNpZmllZCBmaWx0ZXIgKG9yIHByZXNldCBmaWx0ZXJzKS4gRGlkIHlvdSBtYWtlIGEgdHlwbyBvbiB0aGUgZmlsdGVyIGNvbHVtbklkPycpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJztcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uRGVmLnR5cGUgfHwgJ3N0cmluZyc7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gKGNvbHVtbkZpbHRlciA/IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcyA6IG51bGwpIHx8IFtdO1xuICAgICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKSAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVGVybXNbMF0gOiAnJztcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSAhPT0gJ3N0cmluZycgJiYgIXNlYXJjaFRlcm1zKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPRGRhdGEgZmlsdGVyIHNlYXJjaFRlcm0gcHJvcGVydHkgbXVzdCBiZSBwcm92aWRlZCBhcyB0eXBlIFwic3RyaW5nXCIsIGlmIHlvdSB1c2UgZmlsdGVyIHdpdGggb3B0aW9ucyB0aGVuIG1ha2Ugc3VyZSB5b3VyIElEcyBhcmUgYWxzbyBzdHJpbmcuIEZvciBleGFtcGxlOiBmaWx0ZXI6IHttb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IGlkOiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfV1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBmaWVsZFNlYXJjaFZhbHVlLm1hdGNoKC9eKFs8PiE9XFwqXXswLDJ9KSguKltePD4hPVxcKl0pKFtcXCpdPykkLyk7IC8vIGdyb3VwIDE6IE9wZXJhdG9yLCAyOiBzZWFyY2hWYWx1ZSwgMzogbGFzdCBjaGFyIGlzICcqJyAobWVhbmluZyBzdGFydHMgd2l0aCwgZXguOiBhYmMqKVxuICAgICAgICBjb25zdCBvcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvciB8fCAoKG1hdGNoZXMpID8gbWF0Y2hlc1sxXSA6ICcnKTtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XG4gICAgICAgIGNvbnN0IGJ5cGFzc09kYXRhUXVlcnkgPSBjb2x1bW5GaWx0ZXIuYnlwYXNzQmFja2VuZFF1ZXJ5IHx8IGZhbHNlO1xuXG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XG4gICAgICAgIGlmIChmaWVsZE5hbWUgJiYgc2VhcmNoVmFsdWUgPT09ICcnICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXG4gICAgICAgIHNlYXJjaFZhbHVlID0gc2VhcmNoVmFsdWUucmVwbGFjZShgJ2AsIGAnJ2ApOyAvLyBlc2NhcGUgc2luZ2xlIHF1b3RlcyBieSBkb3VibGluZyB0aGVtXG4gICAgICAgIHNlYXJjaFZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFZhbHVlKTsgLy8gZW5jb2RlIFVSSSBvZiB0aGUgZmluYWwgc2VhcmNoIHZhbHVlXG5cbiAgICAgICAgLy8gZXh0cmEgcXVlcnkgYXJndW1lbnRzXG4gICAgICAgIGlmIChieXBhc3NPZGF0YVF1ZXJ5KSB7XG4gICAgICAgICAgLy8gcHVzaCB0byBvdXIgdGVtcCBhcnJheSBhbmQgYWxzbyB0cmltIHdoaXRlIHNwYWNlc1xuICAgICAgICAgIGlmIChmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWUsIGZpZWxkU2VhcmNoVmFsdWUsIHNlYXJjaFRlcm1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VhcmNoQnkgPSAnJztcblxuICAgICAgICAgIC8vIHRpdGxlQ2FzZSB0aGUgZmllbGROYW1lIHNvIHRoYXQgaXQgbWF0Y2hlcyB0aGUgV2ViQXBpIG5hbWVzXG4gICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcbiAgICAgICAgICAgIGZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoZmllbGROYW1lIHx8ICcnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB3aGVuIGhhdmluZyBtb3JlIHRoYW4gMSBzZWFyY2ggdGVybSAodGhlbiBjaGVjayBpZiB3ZSBoYXZlIGEgXCJJTlwiIG9yIFwiTk9UIElOXCIgZmlsdGVyIHNlYXJjaClcbiAgICAgICAgICBpZiAoc2VhcmNoVGVybXMgJiYgc2VhcmNoVGVybXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgdG1wU2VhcmNoVGVybXMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnSU4nKSB7XG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgZXEgXCJFeHBpcmVkXCIgb3IgU3RhZ2UgZXEgXCJSZW5ld2FsXCIpXG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsbmogPSBzZWFyY2hUZXJtcy5sZW5ndGg7IGogPCBsbmo7IGorKykge1xuICAgICAgICAgICAgICAgIHRtcFNlYXJjaFRlcm1zLnB1c2goYCR7ZmllbGROYW1lfSBlcSAnJHtzZWFyY2hUZXJtc1tqXX0nYCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSB0bXBTZWFyY2hUZXJtcy5qb2luKCcgb3IgJyk7XG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCgke3NlYXJjaEJ5fSlgO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ05JTicgfHwgb3BlcmF0b3IgPT09ICdOT1RJTicgfHwgb3BlcmF0b3IgPT09ICdOT1QgSU4nKSB7XG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgbmUgXCJFeHBpcmVkXCIgYW5kIFN0YWdlIG5lIFwiUmVuZXdhbFwiKVxuICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMCwgbG5rID0gc2VhcmNoVGVybXMubGVuZ3RoOyBrIDwgbG5rOyBrKyspIHtcbiAgICAgICAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gbmUgJyR7c2VhcmNoVGVybXNba119J2ApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gdG1wU2VhcmNoVGVybXMuam9pbignIGFuZCAnKTtcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgKCR7c2VhcmNoQnl9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgIT09ICcnKSB7XG4gICAgICAgICAgICAvLyBmaXJzdC9sYXN0IGNoYXJhY3RlciBpcyBhICcqJyB3aWxsIGJlIGEgc3RhcnRzV2l0aCBvciBlbmRzV2l0aFxuICAgICAgICAgICAgc2VhcmNoQnkgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JylcbiAgICAgICAgICAgICAgPyBgZW5kc3dpdGgoJHtmaWVsZE5hbWV9LCAnJHtzZWFyY2hWYWx1ZX0nKWBcbiAgICAgICAgICAgICAgOiBgc3RhcnRzd2l0aCgke2ZpZWxkTmFtZX0sICcke3NlYXJjaFZhbHVlfScpYDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PT0gRmllbGRUeXBlLmRhdGUpIHtcbiAgICAgICAgICAgIC8vIGRhdGUgZmllbGQgbmVlZHMgdG8gYmUgVVRDIGFuZCB3aXRoaW4gRGF0ZVRpbWUgZnVuY3Rpb25cbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXR0ZWQgPSBwYXJzZVV0Y0RhdGUoc2VhcmNoVmFsdWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXR0ZWQpIHtcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgJHtmaWVsZE5hbWV9ICR7dGhpcy5tYXBPZGF0YU9wZXJhdG9yKG9wZXJhdG9yKX0gRGF0ZVRpbWUnJHtkYXRlRm9ybWF0dGVkfSdgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSBGaWVsZFR5cGUuc3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzdHJpbmcgZmllbGQgbmVlZHMgdG8gYmUgaW4gc2luZ2xlIHF1b3Rlc1xuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnJykge1xuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGBzdWJzdHJpbmdvZignJHtzZWFyY2hWYWx1ZX0nLCAke2ZpZWxkTmFtZX0pYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHNlYXJjaEJ5ID0gYHN1YnN0cmluZ29mKCcke3NlYXJjaFZhbHVlfScsICR7ZmllbGROYW1lQ2FzZWR9KSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9IHRydWVgO1xuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGAke2ZpZWxkTmFtZX0gJHt0aGlzLm1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3IpfSAnJHtzZWFyY2hWYWx1ZX0nYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYW55IG90aGVyIGZpZWxkIHR5cGUgKG9yIHVuZGVmaW5lZCB0eXBlKVxuICAgICAgICAgICAgc2VhcmNoVmFsdWUgPSBmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5udW1iZXIgPyBzZWFyY2hWYWx1ZSA6IGAnJHtzZWFyY2hWYWx1ZX0nYDtcbiAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9ICR7c2VhcmNoVmFsdWV9YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXG4gICAgICAgICAgaWYgKHNlYXJjaEJ5ICE9PSAnJykge1xuICAgICAgICAgICAgc2VhcmNoQnlBcnJheS5wdXNoKFN0cmluZy50cmltKHNlYXJjaEJ5KSk7XG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lIHx8ICcnLCBmaWVsZFNlYXJjaFZhbHVlLCBzZWFyY2hUZXJtcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCBmaWx0ZXJzIGZvciB0aGUgYnVpbGRRdWVyeSgpIHRvIHdvcmsgbGF0ZXJcbiAgICB0aGlzLm9kYXRhU2VydmljZS51cGRhdGVPcHRpb25zKHtcbiAgICAgIGZpbHRlcjogKHNlYXJjaEJ5QXJyYXkubGVuZ3RoID4gMCkgPyBzZWFyY2hCeUFycmF5LmpvaW4oJyBhbmQgJykgOiAnJyxcbiAgICAgIHNraXA6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnQgd2l0aCBpdCdzIG5ldyBwYWdlIG51bWJlciBhbmQgc2l6ZVxuICAgKiBAcGFyYW0gbmV3UGFnZVxuICAgKiBAcGFyYW0gcGFnZVNpemVcbiAgICovXG4gIHVwZGF0ZVBhZ2luYXRpb24obmV3UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XG4gICAgICBwYWdlTnVtYmVyOiBuZXdQYWdlLFxuICAgICAgcGFnZVNpemVcbiAgICB9O1xuXG4gICAgdGhpcy5vZGF0YVNlcnZpY2UudXBkYXRlT3B0aW9ucyh7XG4gICAgICB0b3A6IHBhZ2VTaXplLFxuICAgICAgc2tpcDogKG5ld1BhZ2UgLSAxKSAqIHBhZ2VTaXplXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2Ugb3JkZXJCeVxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xuICAgKi9cbiAgdXBkYXRlU29ydGVycyhzb3J0Q29sdW1ucz86IENvbHVtblNvcnRbXSwgcHJlc2V0U29ydGVycz86IEN1cnJlbnRTb3J0ZXJbXSkge1xuICAgIGxldCBzb3J0QnlBcnJheTogYW55W10gPSBbXTtcbiAgICBjb25zdCBzb3J0ZXJBcnJheTogQ3VycmVudFNvcnRlcltdID0gW107XG5cbiAgICBpZiAoIXNvcnRDb2x1bW5zICYmIHByZXNldFNvcnRlcnMpIHtcbiAgICAgIC8vIG1ha2UgdGhlIHByZXNldHMgdGhlIGN1cnJlbnQgc29ydGVycywgYWxzbyBtYWtlIHN1cmUgdGhhdCBhbGwgZGlyZWN0aW9uIGFyZSBpbiBsb3dlcmNhc2UgZm9yIE9EYXRhXG4gICAgICBzb3J0QnlBcnJheSA9IHByZXNldFNvcnRlcnM7XG4gICAgICBzb3J0QnlBcnJheS5mb3JFYWNoKChzb3J0ZXIpID0+IHNvcnRlci5kaXJlY3Rpb24gPSBzb3J0ZXIuZGlyZWN0aW9uLnRvTG93ZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZyk7XG5cbiAgICAgIC8vIGRpc3BsYXkgdGhlIGNvcnJlY3Qgc29ydGluZyBpY29ucyBvbiB0aGUgVUksIGZvciB0aGF0IGl0IHJlcXVpcmVzIChjb2x1bW5JZCwgc29ydEFzYykgcHJvcGVydGllc1xuICAgICAgY29uc3QgdG1wU29ydGVyQXJyYXkgPSBzb3J0QnlBcnJheS5tYXAoKHNvcnRlcikgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBzb3J0ZXIuY29sdW1uSWQpO1xuXG4gICAgICAgIHNvcnRlckFycmF5LnB1c2goe1xuICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYgPyAoKGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQpICsgJycpIDogKHNvcnRlci5jb2x1bW5JZCArICcnKSxcbiAgICAgICAgICBkaXJlY3Rpb246IHNvcnRlci5kaXJlY3Rpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmV0dXJuIG9ubHkgdGhlIGNvbHVtbihzKSBmb3VuZCBpbiB0aGUgQ29sdW1uIERlZmluaXRpb25zIEVMU0UgbnVsbFxuICAgICAgICBpZiAoY29sdW1uRGVmKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0ZXIuY29sdW1uSWQsXG4gICAgICAgICAgICBzb3J0QXNjOiBzb3J0ZXIuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZ3JpZC5zZXRTb3J0Q29sdW1ucyh0bXBTb3J0ZXJBcnJheSk7XG4gICAgfSBlbHNlIGlmIChzb3J0Q29sdW1ucyAmJiAhcHJlc2V0U29ydGVycykge1xuICAgICAgLy8gYnVpbGQgdGhlIFNvcnRCeSBzdHJpbmcsIGl0IGNvdWxkIGJlIG11bHRpc29ydCwgZXhhbXBsZTogY3VzdG9tZXJObyBhc2MsIHB1cmNoYXNlck5hbWUgZGVzY1xuICAgICAgaWYgKHNvcnRDb2x1bW5zICYmIHNvcnRDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzb3J0QnlBcnJheSA9IG5ldyBBcnJheSh0aGlzLmRlZmF1bHRPcHRpb25zLm9yZGVyQnkpOyAvLyB3aGVuIGVtcHR5LCB1c2UgdGhlIGRlZmF1bHQgc29ydFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNvcnRDb2x1bW5zKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBjb2x1bW5EZWYgb2Ygc29ydENvbHVtbnMpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc29ydENvbCkge1xuICAgICAgICAgICAgICBsZXQgZmllbGROYW1lID0gKGNvbHVtbkRlZi5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnNvcnRDb2wucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5EZWYuc29ydENvbC5maWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5pZCkgKyAnJztcbiAgICAgICAgICAgICAgbGV0IGNvbHVtbkZpZWxkTmFtZSA9IChjb2x1bW5EZWYuc29ydENvbC5maWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5pZCkgKyAnJztcbiAgICAgICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWUgPSBTdHJpbmcudGl0bGVDYXNlKGZpZWxkTmFtZSk7XG4gICAgICAgICAgICAgICAgY29sdW1uRmllbGROYW1lID0gU3RyaW5nLnRpdGxlQ2FzZShjb2x1bW5GaWVsZE5hbWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc29ydGVyQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGNvbHVtbkRlZi5zb3J0QXNjID8gJ2FzYycgOiAnZGVzYydcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNvcnRCeUFycmF5ID0gc29ydGVyQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmFuc2Zvcm0gdGhlIHNvcnRieSBhcnJheSBpbnRvIGEgQ1NWIHN0cmluZyBmb3IgT0RhdGFcbiAgICBzb3J0QnlBcnJheSA9IHNvcnRCeUFycmF5IGFzIEN1cnJlbnRTb3J0ZXJbXTtcbiAgICBjb25zdCBjc3ZTdHJpbmcgPSBzb3J0QnlBcnJheS5tYXAoKHNvcnRlcikgPT4gYCR7c29ydGVyLmNvbHVtbklkfSAke3NvcnRlci5kaXJlY3Rpb24udG9Mb3dlckNhc2UoKX1gKS5qb2luKCcsJyk7XG4gICAgdGhpcy5vZGF0YVNlcnZpY2UudXBkYXRlT3B0aW9ucyh7XG4gICAgICBvcmRlckJ5OiAodGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy5jYXNlVHlwZSA9PT0gQ2FzZVR5cGUucGFzY2FsQ2FzZSkgPyBTdHJpbmcudGl0bGVDYXNlKGNzdlN0cmluZykgOiBjc3ZTdHJpbmdcbiAgICB9KTtcblxuICAgIC8vIGtlZXAgY3VycmVudCBTb3J0ZXJzIGFuZCB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIHRoZSBuZXcgc29ydGluZ1xuICAgIHRoaXMuX2N1cnJlbnRTb3J0ZXJzID0gc29ydEJ5QXJyYXkgYXMgQ3VycmVudFNvcnRlcltdO1xuXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ2FzdCBwcm92aWRlZCBmaWx0ZXJzIChjb3VsZCBiZSBpbiBtdWx0aXBsZSBmb3JtYXQpIGludG8gYW4gYXJyYXkgb2YgQ29sdW1uRmlsdGVyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXG4gICAqL1xuICBwcml2YXRlIGNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdKTogQ3VycmVudEZpbHRlcltdIHtcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxuICAgIGNvbnN0IGZpbHRlcnNBcnJheTogQ29sdW1uRmlsdGVyW10gPSAoKHR5cGVvZiBjb2x1bW5GaWx0ZXJzID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyhjb2x1bW5GaWx0ZXJzKS5tYXAoa2V5ID0+IGNvbHVtbkZpbHRlcnNba2V5XSkgOiBjb2x1bW5GaWx0ZXJzKSBhcyBDdXJyZW50RmlsdGVyW107XG5cbiAgICByZXR1cm4gZmlsdGVyc0FycmF5Lm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBmaWx0ZXIuY29sdW1uRGVmO1xuICAgICAgY29uc3QgaGVhZGVyID0gKGNvbHVtbkRlZikgPyAoY29sdW1uRGVmLmhlYWRlcktleSB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJykgOiAnJztcbiAgICAgIGNvbnN0IHRtcEZpbHRlcjogQ3VycmVudEZpbHRlciA9IHsgY29sdW1uSWQ6IGZpbHRlci5jb2x1bW5JZCB8fCAnJyB9O1xuICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcikge1xuICAgICAgICB0bXBGaWx0ZXIub3BlcmF0b3IgPSBmaWx0ZXIub3BlcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpKSB7XG4gICAgICAgIHRtcEZpbHRlci5zZWFyY2hUZXJtcyA9IGZpbHRlci5zZWFyY2hUZXJtcztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXBGaWx0ZXI7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWFwcGVyIGZvciBtYXRoZW1hdGljYWwgb3BlcmF0b3JzIChleC46IDw9IGlzIFwibGVcIiwgPiBpcyBcImd0XCIpXG4gICAqIEBwYXJhbSBzdHJpbmcgb3BlcmF0b3JcbiAgICogQHJldHVybnMgc3RyaW5nIG1hcFxuICAgKi9cbiAgcHJpdmF0ZSBtYXBPZGF0YU9wZXJhdG9yKG9wZXJhdG9yOiBzdHJpbmcpIHtcbiAgICBsZXQgbWFwID0gJyc7XG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIG1hcCA9ICdsdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPD0nOlxuICAgICAgICBtYXAgPSAnbGUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz4nOlxuICAgICAgICBtYXAgPSAnZ3QnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgbWFwID0gJ2dlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICc8Pic6XG4gICAgICBjYXNlICchPSc6XG4gICAgICAgIG1hcCA9ICduZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnPSc6XG4gICAgICBjYXNlICc9PSc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXAgPSAnZXEnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG59XG4iXX0=