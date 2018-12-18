/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { mapOperatorType, mapOperatorByFieldType } from './utilities';
import { FieldType, SortDirection } from './../models/index';
import QueryBuilder from './graphqlQueryBuilder';
// timer for keeping track of user typing waits
/** @type {?} */
var timer;
/** @type {?} */
var DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
/** @type {?} */
var DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
var DEFAULT_PAGE_SIZE = 20;
var GraphqlService = /** @class */ (function () {
    function GraphqlService() {
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
    }
    Object.defineProperty(GraphqlService.prototype, "_gridOptions", {
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
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param serviceOptions GraphqlServiceOption
     */
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    GraphqlService.prototype.buildQuery = /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b;
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        // get the column definitions and exclude some if they were tagged as excluded
        /** @type {?} */
        var columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
        /** @type {?} */
        var queryQb = new QueryBuilder('query');
        /** @type {?} */
        var datasetQb = new QueryBuilder(this.options.datasetName);
        /** @type {?} */
        var dataQb = (this.options.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        /** @type {?} */
        var columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            try {
                for (var columnDefinitions_1 = tslib_1.__values(columnDefinitions), columnDefinitions_1_1 = columnDefinitions_1.next(); !columnDefinitions_1_1.done; columnDefinitions_1_1 = columnDefinitions_1.next()) {
                    var column = columnDefinitions_1_1.value;
                    columnIds.push(column.field);
                    // if extra "fields" are passed, also push them to columnIds
                    if (column.fields) {
                        columnIds.push.apply(columnIds, tslib_1.__spread(column.fields));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columnDefinitions_1_1 && !columnDefinitions_1_1.done && (_a = columnDefinitions_1.return)) _a.call(columnDefinitions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // columnIds = columnDefinitions.map((column) => column.field);
        }
        else {
            columnIds = this.options.columnIds || [];
        }
        // Slickgrid also requires the "id" field to be part of DataView
        // add it to the GraphQL query if it wasn't already part of the list
        if (columnIds.indexOf('id') === -1) {
            columnIds.unshift('id');
        }
        /** @type {?} */
        var filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            /** @type {?} */
            var pageInfoQb = new QueryBuilder('pageInfo');
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { node: filters }]);
            datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        }
        else {
            // ...nodes { _filters_ }
            dataQb.find(filters);
            datasetQb.find(['totalCount', dataQb]);
        }
        // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
        /** @type {?} */
        var datasetFilters = {};
        // only add pagination if it's enabled in the grid options
        if (this._gridOptions.enablePagination !== false) {
            datasetFilters = tslib_1.__assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
            if (!this.options.isWithCursor) {
                datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
            }
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
            datasetFilters.locale = this._gridOptions && this._gridOptions.i18n && this._gridOptions.i18n.currentLang || 'en';
        }
        if (this.options.extraQueryArguments) {
            try {
                // first: 20, ... userId: 123
                for (var _c = tslib_1.__values(this.options.extraQueryArguments), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var queryArgument = _d.value;
                    datasetFilters[queryArgument.field] = queryArgument.value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        /** @type {?} */
        var enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
    };
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
    /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param {?} inputArray
     * @return {?}
     */
    GraphqlService.prototype.buildFilterQuery = /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param {?} inputArray
     * @return {?}
     */
    function (inputArray) {
        /** @type {?} */
        var set = function (o, a) {
            if (o === void 0) { o = {}; }
            /** @type {?} */
            var k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        };
        /** @type {?} */
        var output = inputArray.reduce(function (o, a) { return set(o, a.split('.')); }, {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    };
    /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    GraphqlService.prototype.init = /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    function (serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns) {
            this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
        }
    };
    /**
     * Get an initialization of Pagination options
     * @return Pagination Options
     */
    /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    GraphqlService.prototype.getInitPaginationOptions = /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    function () {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    };
    /** Get the GraphQL dataset name */
    /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    GraphqlService.prototype.getDatasetName = /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    function () {
        return this.options.datasetName || '';
    };
    /** Get the Filters that are currently used by the grid */
    /**
     * Get the Filters that are currently used by the grid
     * @return {?}
     */
    GraphqlService.prototype.getCurrentFilters = /**
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
    GraphqlService.prototype.getCurrentPagination = /**
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
    GraphqlService.prototype.getCurrentSorters = /**
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
    GraphqlService.prototype.resetPaginationOptions = /*
       * Reset the pagination options
       */
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var paginationOptions;
        if (this.options.isWithCursor) {
            // first, last, after, before
            paginationOptions = (/** @type {?} */ ({
                after: '',
                before: undefined,
                last: undefined
            }));
        }
        else {
            // first, last, offset
            paginationOptions = (/** @type {?} */ ((this.options.paginationOptions || this.getInitPaginationOptions())));
            paginationOptions.offset = 0;
        }
        // save current pagination as Page 1 and page size as "first" set size
        this._currentPagination = {
            pageNumber: 1,
            pageSize: paginationOptions.first
        };
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    GraphqlService.prototype.updateOptions = /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    function (serviceOptions) {
        this.options = tslib_1.__assign({}, this.options, serviceOptions);
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
    GraphqlService.prototype.processOnFilterChanged = /*
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
        var gridOptions = this._gridOptions || args.grid.getOptions();
        /** @type {?} */
        var backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
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
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            // reset Pagination, then build the GraphQL query which we will use in the WebAPI callback
            // wait a minimum user typing inactivity before processing any query
            clearTimeout(timer);
            timer = setTimeout(function () {
                // loop through all columns to inspect filters & set the query
                _this.updateFilters(args.columnFilters, false);
                _this.resetPaginationOptions();
                resolve(_this.buildQuery());
            }, debounceTypingDelay);
        });
        return promise;
    };
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
     *     nodes {
     *       name
     *       gender
     *     }
     *   }
     */
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
       *     nodes {
       *       name
       *       gender
       *     }
       *   }
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.processOnPaginationChanged = /*
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
       *     nodes {
       *       name
       *       gender
       *     }
       *   }
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        /** @type {?} */
        var pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
        this.updatePagination(args.newPage, pageSize);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /*
     * SORTING
     * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
     * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
     */
    /*
       * SORTING
       * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
       * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
       */
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    GraphqlService.prototype.processOnSortChanged = /*
       * SORTING
       * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
       * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
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
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    GraphqlService.prototype.updateFilters = /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    function (columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        var searchByArray = [];
        /** @type {?} */
        var searchValue;
        var _loop_1 = function (columnId) {
            if (columnFilters.hasOwnProperty(columnId)) {
                /** @type {?} */
                var columnFilter_1 = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                /** @type {?} */
                var columnDef = void 0;
                if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                    columnDef = this_1._columnDefinitions.find(function (column) { return column.id === columnFilter_1.columnId; });
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
                var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                /** @type {?} */
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    return "continue";
                }
                // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                if (searchTerms && searchTerms.length > 1) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    // escaping the search value
                    searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
                    }
                }
                // if we didn't find an Operator but we have a Filter Type, we should use default Operator
                // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
                if (!operator && columnDef.filter) {
                    operator = columnDef.filter.operator;
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
        };
        var this_1 = this;
        for (var columnId in columnFilters) {
            _loop_1(columnId);
        }
        // update the service options with filters for the buildQuery() to work later
        this.updateOptions({ filteringOptions: searchByArray });
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
    GraphqlService.prototype.updatePagination = /**
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
        /** @type {?} */
        var paginationOptions;
        if (this.options.isWithCursor) {
            paginationOptions = {
                first: pageSize
            };
        }
        else {
            paginationOptions = {
                first: pageSize,
                offset: (newPage - 1) * pageSize
            };
        }
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param columnFilters
     */
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    GraphqlService.prototype.updateSorters = /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    function (sortColumns, presetSorters) {
        var _this = this;
        var e_3, _a;
        /** @type {?} */
        var currentSorters = [];
        /** @type {?} */
        var graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
            currentSorters = presetSorters;
            currentSorters.forEach(function (sorter) { return sorter.direction = (/** @type {?} */ (sorter.direction.toUpperCase())); });
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            var tmpSorterArray = currentSorters.map(function (sorter) {
                /** @type {?} */
                var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
                graphqlSorters.push({
                    field: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
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
            // set the sort icons, but also make sure to filter out null values (happens when no columnDef found)
            if (Array.isArray(tmpSorterArray)) {
                this._grid.setSortColumns(tmpSorterArray.filter(function (sorter) { return sorter; }));
            }
        }
        else if (sortColumns && !presetSorters) {
            // build the orderBy array, it could be multisort, example
            // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
            if (sortColumns && sortColumns.length === 0) {
                graphqlSorters = new Array(this.defaultOrderBy); // when empty, use the default sort
                currentSorters = new Array({ columnId: this.defaultOrderBy.field, direction: this.defaultOrderBy.direction });
            }
            else {
                if (sortColumns) {
                    try {
                        for (var sortColumns_1 = tslib_1.__values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                            var column = sortColumns_1_1.value;
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
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        }
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = currentSorters;
        this.updateOptions({ sortingOptions: graphqlSorters });
    };
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
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    GraphqlService.prototype.trimDoubleQuotesOnEnumField = /**
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
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        /** @type {?} */
        var patternWordInQuotes = "s?((field:s*)?\".*?\")";
        /** @type {?} */
        var patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        /** @type {?} */
        var reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, function (group1, group2, group3) {
            // remove double quotes except when the string starts with a "field:"
            /** @type {?} */
            var removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            /** @type {?} */
            var rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        });
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
    GraphqlService.prototype.castFilterToColumnFilter = 
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
        var filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters;
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
    return GraphqlService;
}());
export { GraphqlService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._currentFilters;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._currentPagination;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._currentSorters;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._columnDefinitions;
    /**
     * @type {?}
     * @private
     */
    GraphqlService.prototype._grid;
    /** @type {?} */
    GraphqlService.prototype.options;
    /** @type {?} */
    GraphqlService.prototype.pagination;
    /** @type {?} */
    GraphqlService.prototype.defaultOrderBy;
    /** @type {?} */
    GraphqlService.prototype.defaultPaginationOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RFLE9BQU8sRUFTTCxTQUFTLEVBWVQsYUFBYSxFQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxZQUFZLE1BQU0sdUJBQXVCLENBQUM7OztJQUc3QyxLQUFVOztJQUNSLDhCQUE4QixHQUFHLEdBQUc7O0lBQ3BDLHNCQUFzQixHQUFHLEVBQUU7O0lBQzNCLGlCQUFpQixHQUFHLEVBQUU7QUFFNUI7SUFBQTtRQVFFLG1CQUFjLEdBQXlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JGLDZCQUF3QixHQUE0RDtZQUNsRixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FBQztJQXVnQkosQ0FBQztJQXBnQkMsc0JBQVksd0NBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7Ozs7O0lBQ0gsbUNBQVU7Ozs7SUFBVjs7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JB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ZXJhdG9yVHlwZSwgbWFwT3BlcmF0b3JCeUZpZWxkVHlwZSB9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7XG4gIEJhY2tlbmRTZXJ2aWNlLFxuICBDb2x1bW4sXG4gIENvbHVtbkZpbHRlcixcbiAgQ29sdW1uRmlsdGVycyxcbiAgQ29sdW1uU29ydCxcbiAgQ3VycmVudEZpbHRlcixcbiAgQ3VycmVudFBhZ2luYXRpb24sXG4gIEN1cnJlbnRTb3J0ZXIsXG4gIEZpZWxkVHlwZSxcbiAgRmlsdGVyQ2hhbmdlZEFyZ3MsXG4gIEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uLFxuICBHcmFwaHFsRGF0YXNldEZpbHRlcixcbiAgR3JhcGhxbEZpbHRlcmluZ09wdGlvbixcbiAgR3JhcGhxbFBhZ2luYXRpb25PcHRpb24sXG4gIEdyYXBocWxTZXJ2aWNlT3B0aW9uLFxuICBHcmFwaHFsU29ydGluZ09wdGlvbixcbiAgR3JpZE9wdGlvbixcbiAgUGFnaW5hdGlvbixcbiAgUGFnaW5hdGlvbkNoYW5nZWRBcmdzLFxuICBTb3J0Q2hhbmdlZEFyZ3MsXG4gIFNvcnREaXJlY3Rpb24sXG4gIFNvcnREaXJlY3Rpb25TdHJpbmdcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IFF1ZXJ5QnVpbGRlciBmcm9tICcuL2dyYXBocWxRdWVyeUJ1aWxkZXInO1xuXG4vLyB0aW1lciBmb3Iga2VlcGluZyB0cmFjayBvZiB1c2VyIHR5cGluZyB3YWl0c1xubGV0IHRpbWVyOiBhbnk7XG5jb25zdCBERUZBVUxUX0ZJTFRFUl9UWVBJTkdfREVCT1VOQ0UgPSA3NTA7XG5jb25zdCBERUZBVUxUX0lURU1TX1BFUl9QQUdFID0gMjU7XG5jb25zdCBERUZBVUxUX1BBR0VfU0laRSA9IDIwO1xuXG5leHBvcnQgY2xhc3MgR3JhcGhxbFNlcnZpY2UgaW1wbGVtZW50cyBCYWNrZW5kU2VydmljZSB7XG4gIHByaXZhdGUgX2N1cnJlbnRGaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdO1xuICBwcml2YXRlIF9jdXJyZW50UGFnaW5hdGlvbjogQ3VycmVudFBhZ2luYXRpb247XG4gIHByaXZhdGUgX2N1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW107XG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBvcHRpb25zOiBHcmFwaHFsU2VydmljZU9wdGlvbjtcbiAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbiB8IHVuZGVmaW5lZDtcbiAgZGVmYXVsdE9yZGVyQnk6IEdyYXBocWxTb3J0aW5nT3B0aW9uID0geyBmaWVsZDogJ2lkJywgZGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uLkFTQyB9O1xuICBkZWZhdWx0UGFnaW5hdGlvbk9wdGlvbnM6IEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uIHwgR3JhcGhxbEN1cnNvclBhZ2luYXRpb25PcHRpb24gPSB7XG4gICAgZmlyc3Q6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UsXG4gICAgb2Zmc2V0OiAwXG4gIH07XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgR3JhcGhRTCBxdWVyeSwgc2luY2UgdGhlIHNlcnZpY2UgaW5jbHVkZS9leGNsdWRlIGN1cnNvciwgdGhlIG91dHB1dCBxdWVyeSB3aWxsIGJlIGRpZmZlcmVudC5cbiAgICogQHBhcmFtIHNlcnZpY2VPcHRpb25zIEdyYXBocWxTZXJ2aWNlT3B0aW9uXG4gICAqL1xuICBidWlsZFF1ZXJ5KCkge1xuICAgIGlmICghdGhpcy5vcHRpb25zIHx8ICF0aGlzLm9wdGlvbnMuZGF0YXNldE5hbWUgfHwgKCF0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyAmJiAhdGhpcy5vcHRpb25zLmNvbHVtbkRlZmluaXRpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcmFwaFFMIFNlcnZpY2UgcmVxdWlyZXMgXCJkYXRhc2V0TmFtZVwiICYgXCJjb2x1bW5EZWZpbml0aW9uc1wiIHByb3BlcnRpZXMgZm9yIGl0IHRvIHdvcmsnKTtcbiAgICB9XG5cbiAgICAvLyBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBhbmQgZXhjbHVkZSBzb21lIGlmIHRoZXkgd2VyZSB0YWdnZWQgYXMgZXhjbHVkZWRcbiAgICBsZXQgY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLm9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnM7XG4gICAgY29sdW1uRGVmaW5pdGlvbnMgPSBjb2x1bW5EZWZpbml0aW9ucy5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkpO1xuXG4gICAgY29uc3QgcXVlcnlRYiA9IG5ldyBRdWVyeUJ1aWxkZXIoJ3F1ZXJ5Jyk7XG4gICAgY29uc3QgZGF0YXNldFFiID0gbmV3IFF1ZXJ5QnVpbGRlcih0aGlzLm9wdGlvbnMuZGF0YXNldE5hbWUpO1xuICAgIGNvbnN0IGRhdGFRYiA9ICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSA/IG5ldyBRdWVyeUJ1aWxkZXIoJ2VkZ2VzJykgOiBuZXcgUXVlcnlCdWlsZGVyKCdub2RlcycpO1xuXG4gICAgLy8gZ2V0IGFsbCB0aGUgY29sdW1uZHMgSWRzIGZvciB0aGUgZmlsdGVycyB0byB3b3JrXG4gICAgbGV0IGNvbHVtbklkczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjb2x1bW5EZWZpbml0aW9ucykpIHtcbiAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbkRlZmluaXRpb25zKSB7XG4gICAgICAgIGNvbHVtbklkcy5wdXNoKGNvbHVtbi5maWVsZCk7XG5cbiAgICAgICAgLy8gaWYgZXh0cmEgXCJmaWVsZHNcIiBhcmUgcGFzc2VkLCBhbHNvIHB1c2ggdGhlbSB0byBjb2x1bW5JZHNcbiAgICAgICAgaWYgKGNvbHVtbi5maWVsZHMpIHtcbiAgICAgICAgICBjb2x1bW5JZHMucHVzaCguLi5jb2x1bW4uZmllbGRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gY29sdW1uSWRzID0gY29sdW1uRGVmaW5pdGlvbnMubWFwKChjb2x1bW4pID0+IGNvbHVtbi5maWVsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbklkcyA9IHRoaXMub3B0aW9ucy5jb2x1bW5JZHMgfHwgW107XG4gICAgfVxuXG4gICAgLy8gU2xpY2tncmlkIGFsc28gcmVxdWlyZXMgdGhlIFwiaWRcIiBmaWVsZCB0byBiZSBwYXJ0IG9mIERhdGFWaWV3XG4gICAgLy8gYWRkIGl0IHRvIHRoZSBHcmFwaFFMIHF1ZXJ5IGlmIGl0IHdhc24ndCBhbHJlYWR5IHBhcnQgb2YgdGhlIGxpc3RcbiAgICBpZiAoY29sdW1uSWRzLmluZGV4T2YoJ2lkJykgPT09IC0xKSB7XG4gICAgICBjb2x1bW5JZHMudW5zaGlmdCgnaWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5idWlsZEZpbHRlclF1ZXJ5KGNvbHVtbklkcyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xuICAgICAgLy8gLi4ucGFnZUluZm8geyBoYXNOZXh0UGFnZSwgZW5kQ3Vyc29yIH0sIGVkZ2VzIHsgY3Vyc29yLCBub2RlIHsgX2ZpbHRlcnNfIH0gfVxuICAgICAgY29uc3QgcGFnZUluZm9RYiA9IG5ldyBRdWVyeUJ1aWxkZXIoJ3BhZ2VJbmZvJyk7XG4gICAgICBwYWdlSW5mb1FiLmZpbmQoJ2hhc05leHRQYWdlJywgJ2VuZEN1cnNvcicpO1xuICAgICAgZGF0YVFiLmZpbmQoWydjdXJzb3InLCB7IG5vZGU6IGZpbHRlcnMgfV0pO1xuICAgICAgZGF0YXNldFFiLmZpbmQoWyd0b3RhbENvdW50JywgcGFnZUluZm9RYiwgZGF0YVFiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIC4uLm5vZGVzIHsgX2ZpbHRlcnNfIH1cbiAgICAgIGRhdGFRYi5maW5kKGZpbHRlcnMpO1xuICAgICAgZGF0YXNldFFiLmZpbmQoWyd0b3RhbENvdW50JywgZGF0YVFiXSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGRhdGFzZXQgZmlsdGVycywgY291bGQgYmUgUGFnaW5hdGlvbiBhbmQgU29ydGluZ0ZpbHRlcnMgYW5kL29yIEZpZWxkRmlsdGVyc1xuICAgIGxldCBkYXRhc2V0RmlsdGVyczogR3JhcGhxbERhdGFzZXRGaWx0ZXIgPSB7fTtcblxuICAgIC8vIG9ubHkgYWRkIHBhZ2luYXRpb24gaWYgaXQncyBlbmFibGVkIGluIHRoZSBncmlkIG9wdGlvbnNcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgIGRhdGFzZXRGaWx0ZXJzID0ge1xuICAgICAgICAuLi50aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMsXG4gICAgICAgIGZpcnN0OiAoKHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuZmlyc3QpID8gdGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0IDogKCh0aGlzLnBhZ2luYXRpb24gJiYgdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplKSA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IG51bGwpKSB8fCB0aGlzLmRlZmF1bHRQYWdpbmF0aW9uT3B0aW9ucy5maXJzdFxuICAgICAgfTtcblxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSB7XG4gICAgICAgIGRhdGFzZXRGaWx0ZXJzLm9mZnNldCA9ICgodGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zICYmIHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnb2Zmc2V0JykpID8gK3RoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9uc1snb2Zmc2V0J10gOiAwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zKSAmJiB0aGlzLm9wdGlvbnMuc29ydGluZ09wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gb3JkZXJCeTogW3sgZmllbGQ6eCwgZGlyZWN0aW9uOiAnQVNDJyB9XVxuICAgICAgZGF0YXNldEZpbHRlcnMub3JkZXJCeSA9IHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucztcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLmZpbHRlcmluZ09wdGlvbnMpICYmIHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGZpbHRlckJ5OiBbeyBmaWVsZDogZGF0ZSwgb3BlcmF0b3I6ICc+JywgdmFsdWU6ICcyMDAwLTEwLTEwJyB9XVxuICAgICAgZGF0YXNldEZpbHRlcnMuZmlsdGVyQnkgPSB0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucztcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hZGRMb2NhbGVJbnRvUXVlcnkpIHtcbiAgICAgIC8vIGZpcnN0OiAyMCwgLi4uIGxvY2FsZTogXCJlbi1DQVwiXG4gICAgICBkYXRhc2V0RmlsdGVycy5sb2NhbGUgPSB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5pMThuICYmIHRoaXMuX2dyaWRPcHRpb25zLmkxOG4uY3VycmVudExhbmcgfHwgJ2VuJztcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5QXJndW1lbnRzKSB7XG4gICAgICAvLyBmaXJzdDogMjAsIC4uLiB1c2VySWQ6IDEyM1xuICAgICAgZm9yIChjb25zdCBxdWVyeUFyZ3VtZW50IG9mIHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5QXJndW1lbnRzKSB7XG4gICAgICAgIGRhdGFzZXRGaWx0ZXJzW3F1ZXJ5QXJndW1lbnQuZmllbGRdID0gcXVlcnlBcmd1bWVudC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBxdWVyeSB7IHVzZXJzKGZpcnN0OiAyMCwgb3JkZXJCeTogW10sIGZpbHRlckJ5OiBbXSl9XG4gICAgZGF0YXNldFFiLmZpbHRlcihkYXRhc2V0RmlsdGVycyk7XG4gICAgcXVlcnlRYi5maW5kKGRhdGFzZXRRYik7XG5cbiAgICBjb25zdCBlbnVtU2VhcmNoUHJvcGVydGllcyA9IFsnZGlyZWN0aW9uOicsICdmaWVsZDonLCAnb3BlcmF0b3I6J107XG4gICAgcmV0dXJuIHRoaXMudHJpbURvdWJsZVF1b3Rlc09uRW51bUZpZWxkKHF1ZXJ5UWIudG9TdHJpbmcoKSwgZW51bVNlYXJjaFByb3BlcnRpZXMsIHRoaXMub3B0aW9ucy5rZWVwQXJndW1lbnRGaWVsZERvdWJsZVF1b3RlcyB8fCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSBhbiBpbnB1dCBhcnJheSBvZiBzdHJpbmdzLCB3ZSB3YW50IHRvIGJ1aWxkIGEgR3JhcGhRTCBxdWVyeSBzdHJpbmcuXG4gICAqIFRoZSBwcm9jZXNzIGhhcyB0byB0YWtlIHRoZSBkb3Qgbm90YXRpb24gYW5kIHBhcnNlIGl0IGludG8gYSB2YWxpZCBHcmFwaFFMIHF1ZXJ5XG4gICAqIEZvbGxvd2luZyB0aGlzIFNPIGFuc3dlciBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc3MDU0NzYvMTIxMjE2NlxuICAgKlxuICAgKiBJTlBVVFxuICAgKiAgWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnLCAnYmlsbGluZy5hZGRyZXNzLnN0cmVldCcsICdiaWxsaW5nLmFkZHJlc3MuemlwJ11cbiAgICogT1VUUFVUXG4gICAqIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGJpbGxpbmd7YWRkcmVzc3tzdHJlZXQsIHppcH19XG4gICAqIEBwYXJhbSBpbnB1dEFycmF5XG4gICAqL1xuICBidWlsZEZpbHRlclF1ZXJ5KGlucHV0QXJyYXk6IHN0cmluZ1tdKSB7XG5cbiAgICBjb25zdCBzZXQgPSAobzogYW55ID0ge30sIGE6IGFueSkgPT4ge1xuICAgICAgY29uc3QgayA9IGEuc2hpZnQoKTtcbiAgICAgIG9ba10gPSBhLmxlbmd0aCA/IHNldChvW2tdLCBhKSA6IG51bGw7XG4gICAgICByZXR1cm4gbztcbiAgICB9O1xuXG4gICAgY29uc3Qgb3V0cHV0ID0gaW5wdXRBcnJheS5yZWR1Y2UoKG86IGFueSwgYTogc3RyaW5nKSA9PiBzZXQobywgYS5zcGxpdCgnLicpKSwge30pO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG91dHB1dClcbiAgICAgIC5yZXBsYWNlKC9cXFwifFxcOnxudWxsL2csICcnKVxuICAgICAgLnJlcGxhY2UoL15cXHsvLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXH0kLywgJycpO1xuICB9XG5cbiAgaW5pdChzZXJ2aWNlT3B0aW9ucz86IEdyYXBocWxTZXJ2aWNlT3B0aW9uLCBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbiwgZ3JpZD86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMub3B0aW9ucyA9IHNlcnZpY2VPcHRpb25zIHx8IHt9O1xuICAgIHRoaXMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb247XG5cbiAgICBpZiAoZ3JpZCAmJiBncmlkLmdldENvbHVtbnMpIHtcbiAgICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gc2VydmljZU9wdGlvbnMuY29sdW1uRGVmaW5pdGlvbnMgfHwgZ3JpZC5nZXRDb2x1bW5zKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBpbml0aWFsaXphdGlvbiBvZiBQYWdpbmF0aW9uIG9wdGlvbnNcbiAgICogQHJldHVybiBQYWdpbmF0aW9uIE9wdGlvbnNcbiAgICovXG4gIGdldEluaXRQYWdpbmF0aW9uT3B0aW9ucygpOiBHcmFwaHFsRGF0YXNldEZpbHRlciB7XG4gICAgcmV0dXJuICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSA/IHsgZmlyc3Q6ICh0aGlzLnBhZ2luYXRpb24gPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBERUZBVUxUX0lURU1TX1BFUl9QQUdFKSB9IDogeyBmaXJzdDogKHRoaXMucGFnaW5hdGlvbiA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UpLCBvZmZzZXQ6IDAgfTtcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIEdyYXBoUUwgZGF0YXNldCBuYW1lICovXG4gIGdldERhdGFzZXROYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kYXRhc2V0TmFtZSB8fCAnJztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIEZpbHRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cbiAgZ2V0Q3VycmVudEZpbHRlcnMoKTogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRGaWx0ZXJzO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgUGFnaW5hdGlvbiB0aGF0IGlzIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2luYXRpb247XG4gIH1cblxuICAvKiogR2V0IHRoZSBTb3J0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTb3J0ZXJzO1xuICB9XG5cbiAgLypcbiAgICogUmVzZXQgdGhlIHBhZ2luYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpIHtcbiAgICBsZXQgcGFnaW5hdGlvbk9wdGlvbnM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcbiAgICAgIC8vIGZpcnN0LCBsYXN0LCBhZnRlciwgYmVmb3JlXG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucyA9IHtcbiAgICAgICAgYWZ0ZXI6ICcnLFxuICAgICAgICBiZWZvcmU6IHVuZGVmaW5lZCxcbiAgICAgICAgbGFzdDogdW5kZWZpbmVkXG4gICAgICB9IGFzIEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmaXJzdCwgbGFzdCwgb2Zmc2V0XG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucyA9ICh0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgfHwgdGhpcy5nZXRJbml0UGFnaW5hdGlvbk9wdGlvbnMoKSkgYXMgR3JhcGhxbFBhZ2luYXRpb25PcHRpb247XG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucy5vZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIC8vIHNhdmUgY3VycmVudCBwYWdpbmF0aW9uIGFzIFBhZ2UgMSBhbmQgcGFnZSBzaXplIGFzIFwiZmlyc3RcIiBzZXQgc2l6ZVxuICAgIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uID0ge1xuICAgICAgcGFnZU51bWJlcjogMSxcbiAgICAgIHBhZ2VTaXplOiBwYWdpbmF0aW9uT3B0aW9ucy5maXJzdFxuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBwYWdpbmF0aW9uT3B0aW9ucyB9KTtcbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoc2VydmljZU9wdGlvbnM/OiBHcmFwaHFsU2VydmljZU9wdGlvbikge1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5vcHRpb25zLCAuLi5zZXJ2aWNlT3B0aW9ucyB9O1xuICB9XG5cbiAgLypcbiAgICogRklMVEVSSU5HXG4gICAqL1xuICBwcm9jZXNzT25GaWx0ZXJDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogRmlsdGVyQ2hhbmdlZEFyZ3MpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uID0gdGhpcy5fZ3JpZE9wdGlvbnMgfHwgYXJncy5ncmlkLmdldE9wdGlvbnMoKTtcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XG5cbiAgICBpZiAoYmFja2VuZEFwaSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIGluIHRoZSBHcmFwaHFsU2VydmljZSwgXCJiYWNrZW5kU2VydmljZUFwaVwiIGlzIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgYWRkIGEgZGVsYXkgd2hlbiB1c2VyIGlzIHR5cGluZywgb24gc2VsZWN0IGRyb3Bkb3duIGZpbHRlciBpdCB3aWxsIGV4ZWN1dGUgcmlnaHQgYXdheVxuICAgIGxldCBkZWJvdW5jZVR5cGluZ0RlbGF5ID0gMDtcbiAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgfHwgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSkge1xuICAgICAgZGVib3VuY2VUeXBpbmdEZWxheSA9IGJhY2tlbmRBcGkuZmlsdGVyVHlwaW5nRGVib3VuY2UgfHwgREVGQVVMVF9GSUxURVJfVFlQSU5HX0RFQk9VTkNFO1xuICAgIH1cblxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSB0aGlzLmNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihhcmdzLmNvbHVtbkZpbHRlcnMpO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyBjcmVhdGUgdGhlIEdyYXBoUUwgQmFja2VuZCBTZXJ2aWNlLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlc2V0IFBhZ2luYXRpb24sIHRoZW4gYnVpbGQgdGhlIEdyYXBoUUwgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xuICAgICAgLy8gd2FpdCBhIG1pbmltdW0gdXNlciB0eXBpbmcgaW5hY3Rpdml0eSBiZWZvcmUgcHJvY2Vzc2luZyBhbnkgcXVlcnlcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgc2V0IHRoZSBxdWVyeVxuICAgICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoYXJncy5jb2x1bW5GaWx0ZXJzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5yZXNldFBhZ2luYXRpb25PcHRpb25zKCk7XG4gICAgICAgIHJlc29sdmUodGhpcy5idWlsZFF1ZXJ5KCkpO1xuICAgICAgfSwgZGVib3VuY2VUeXBpbmdEZWxheSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qXG4gICAqIFBBR0lOQVRJT05cbiAgICogV2l0aCBjdXJzb3IsIHRoZSBxdWVyeSBjYW4gaGF2ZSA0IGFyZ3VtZW50cyAoZmlyc3QsIGFmdGVyLCBsYXN0LCBiZWZvcmUpLCBmb3IgZXhhbXBsZTpcbiAgICogICB1c2VycyAoZmlyc3Q6MjAsIGFmdGVyOlwiWVhKeVlYbGpiMjV1WldOMGFXOXVPak09XCIpIHtcbiAgICogICAgIHRvdGFsQ291bnRcbiAgICogICAgIHBhZ2VJbmZvIHtcbiAgICogICAgICAgaGFzTmV4dFBhZ2VcbiAgICogICAgICAgZW5kQ3Vyc29yXG4gICAqICAgICB9XG4gICAqICAgICBlZGdlcyB7XG4gICAqICAgICAgIGN1cnNvclxuICAgKiAgICAgICBub2RlIHtcbiAgICogICAgICAgICBuYW1lXG4gICAqICAgICAgICAgZ2VuZGVyXG4gICAqICAgICAgIH1cbiAgICogICAgIH1cbiAgICogICB9XG4gICAqIFdpdGhvdXQgY3Vyc29yLCB0aGUgcXVlcnkgY2FuIGhhdmUgMyBhcmd1bWVudHMgKGZpcnN0LCBsYXN0LCBvZmZzZXQpLCBmb3IgZXhhbXBsZTpcbiAgICogICB1c2VycyAoZmlyc3Q6MjAsIG9mZnNldDogMTApIHtcbiAgICogICAgIHRvdGFsQ291bnRcbiAgICogICAgIG5vZGVzIHtcbiAgICogICAgICAgbmFtZVxuICAgKiAgICAgICBnZW5kZXJcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqL1xuICBwcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IFBhZ2luYXRpb25DaGFuZ2VkQXJncykge1xuICAgIGNvbnN0IHBhZ2VTaXplID0gKyhhcmdzLnBhZ2VTaXplIHx8ICgodGhpcy5wYWdpbmF0aW9uKSA/IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSA6IERFRkFVTFRfUEFHRV9TSVpFKSk7XG4gICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKGFyZ3MubmV3UGFnZSwgcGFnZVNpemUpO1xuXG4gICAgLy8gYnVpbGQgdGhlIEdyYXBoUUwgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLmJ1aWxkUXVlcnkoKTtcbiAgfVxuXG4gIC8qXG4gICAqIFNPUlRJTkdcbiAgICogd2Ugd2lsbCB1c2Ugc29ydGluZyBhcyBwZXIgYSBGYWNlYm9vayBzdWdnZXN0aW9uIG9uIGEgR2l0aHViIGlzc3VlICh3aXRoIHNvbWUgc21hbGwgY2hhbmdlcylcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2dyYXBocWwvZ3JhcGhxbC1yZWxheS1qcy9pc3N1ZXMvMjAjaXNzdWVjb21tZW50LTIyMDQ5NDIyMlxuICAgKi9cbiAgcHJvY2Vzc09uU29ydENoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBTb3J0Q2hhbmdlZEFyZ3MpIHtcbiAgICBjb25zdCBzb3J0Q29sdW1ucyA9IChhcmdzLm11bHRpQ29sdW1uU29ydCkgPyBhcmdzLnNvcnRDb2xzIDogbmV3IEFycmF5KHsgc29ydENvbDogYXJncy5zb3J0Q29sLCBzb3J0QXNjOiBhcmdzLnNvcnRBc2MgfSk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBzb3J0ZXJzICYgc2V0IHRoZSBxdWVyeVxuICAgIHRoaXMudXBkYXRlU29ydGVycyhzb3J0Q29sdW1ucyk7XG5cbiAgICAvLyBidWlsZCB0aGUgR3JhcGhRTCBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRRdWVyeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIGZpbHRlcmluZ09wdGlvbnNcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcbiAgICovXG4gIHVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSwgaXNVcGRhdGVkQnlQcmVzZXQ6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBzZWFyY2hCeUFycmF5OiBHcmFwaHFsRmlsdGVyaW5nT3B0aW9uW10gPSBbXTtcbiAgICBsZXQgc2VhcmNoVmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiBjb2x1bW5GaWx0ZXJzKSB7XG4gICAgICBpZiAoY29sdW1uRmlsdGVycy5oYXNPd25Qcm9wZXJ0eShjb2x1bW5JZCkpIHtcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gY29sdW1uRmlsdGVyc1tjb2x1bW5JZF07XG5cbiAgICAgICAgLy8gaWYgdXNlciBkZWZpbmVkIHNvbWUgXCJwcmVzZXRzXCIsIHRoZW4gd2UgbmVlZCB0byBmaW5kIHRoZSBmaWx0ZXJzIGZyb20gdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBpbnN0ZWFkXG4gICAgICAgIGxldCBjb2x1bW5EZWY6IENvbHVtbiB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGlzVXBkYXRlZEJ5UHJlc2V0ICYmIEFycmF5LmlzQXJyYXkodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpKSB7XG4gICAgICAgICAgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IGNvbHVtbi5pZCA9PT0gY29sdW1uRmlsdGVyLmNvbHVtbklkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5EZWYgPSBjb2x1bW5GaWx0ZXIuY29sdW1uRGVmO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29sdW1uRGVmKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQmFja2VuZCBTZXJ2aWNlIEFQSV06IFNvbWV0aGluZyB3ZW50IHdyb25nIGluIHRyeWluZyB0byBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIG9mIHRoZSBzcGVjaWZpZWQgZmlsdGVyIChvciBwcmVzZXQgZmlsdGVycykuIERpZCB5b3UgbWFrZSBhIHR5cG8gb24gdGhlIGZpbHRlciBjb2x1bW5JZD8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJztcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybXMgPSAoY29sdW1uRmlsdGVyID8gY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zIDogbnVsbCkgfHwgW107XG4gICAgICAgIGxldCBmaWVsZFNlYXJjaFZhbHVlID0gKEFycmF5LmlzQXJyYXkoc2VhcmNoVGVybXMpICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA9PT0gMSkgPyBzZWFyY2hUZXJtc1swXSA6ICcnO1xuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlICE9PSAnc3RyaW5nJyAmJiAhc2VhcmNoVGVybXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdyYXBoUUwgZmlsdGVyIHNlYXJjaFRlcm0gcHJvcGVydHkgbXVzdCBiZSBwcm92aWRlZCBhcyB0eXBlIFwic3RyaW5nXCIsIGlmIHlvdSB1c2UgZmlsdGVyIHdpdGggb3B0aW9ucyB0aGVuIG1ha2Ugc3VyZSB5b3VyIElEcyBhcmUgYWxzbyBzdHJpbmcuIEZvciBleGFtcGxlOiBmaWx0ZXI6IHttb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IGlkOiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfV1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBmaWVsZFNlYXJjaFZhbHVlLm1hdGNoKC9eKFs8PiE9XFwqXXswLDJ9KSguKltePD4hPVxcKl0pKFtcXCpdPykkLyk7IC8vIGdyb3VwIDE6IE9wZXJhdG9yLCAyOiBzZWFyY2hWYWx1ZSwgMzogbGFzdCBjaGFyIGlzICcqJyAobWVhbmluZyBzdGFydHMgd2l0aCwgZXguOiBhYmMqKVxuICAgICAgICBsZXQgb3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3IgfHwgKChtYXRjaGVzKSA/IG1hdGNoZXNbMV0gOiAnJyk7XG4gICAgICAgIHNlYXJjaFZhbHVlID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XG4gICAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XG5cbiAgICAgICAgLy8gbm8gbmVlZCB0byBxdWVyeSBpZiBzZWFyY2ggdmFsdWUgaXMgZW1wdHlcbiAgICAgICAgaWYgKGZpZWxkTmFtZSAmJiBzZWFyY2hWYWx1ZSA9PT0gJycgJiYgc2VhcmNoVGVybXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIGhhdmluZyBtb3JlIHRoYW4gMSBzZWFyY2ggdGVybSAod2UgbmVlZCB0byBjcmVhdGUgYSBDU1Ygc3RyaW5nIGZvciBHcmFwaFFMIFwiSU5cIiBvciBcIk5PVCBJTlwiIGZpbHRlciBzZWFyY2gpXG4gICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hUZXJtcy5qb2luKCcsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlYXJjaFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIGVzY2FwaW5nIHRoZSBzZWFyY2ggdmFsdWVcbiAgICAgICAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgPT09ICcqJykge1xuICAgICAgICAgICAgb3BlcmF0b3IgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JykgPyAnZW5kc1dpdGgnIDogJ3N0YXJ0c1dpdGgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGRpZG4ndCBmaW5kIGFuIE9wZXJhdG9yIGJ1dCB3ZSBoYXZlIGEgRmlsdGVyIFR5cGUsIHdlIHNob3VsZCB1c2UgZGVmYXVsdCBPcGVyYXRvclxuICAgICAgICAvLyBtdWx0aXBsZVNlbGVjdCBpcyBcIklOXCIsIHdoaWxlIHNpbmdsZVNlbGVjdCBpcyBcIkVRXCIsIGVsc2UgZG9uJ3QgbWFwIGFueSBvcGVyYXRvclxuICAgICAgICBpZiAoIW9wZXJhdG9yICYmIGNvbHVtbkRlZi5maWx0ZXIpIHtcbiAgICAgICAgICBvcGVyYXRvciA9IGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBzdGlsbCBkb24ndCBoYXZlIGFuIG9wZXJhdG9yIGZpbmQgdGhlIHByb3BlciBPcGVyYXRvciB0byB1c2UgYnkgaXQncyBmaWVsZCB0eXBlXG4gICAgICAgIGlmICghb3BlcmF0b3IpIHtcbiAgICAgICAgICBvcGVyYXRvciA9IG1hcE9wZXJhdG9yQnlGaWVsZFR5cGUoY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLnN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWFyY2hCeUFycmF5LnB1c2goe1xuICAgICAgICAgIGZpZWxkOiBmaWVsZE5hbWUsXG4gICAgICAgICAgb3BlcmF0b3I6IG1hcE9wZXJhdG9yVHlwZShvcGVyYXRvciksXG4gICAgICAgICAgdmFsdWU6IHNlYXJjaFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgc2VydmljZSBvcHRpb25zIHdpdGggZmlsdGVycyBmb3IgdGhlIGJ1aWxkUXVlcnkoKSB0byB3b3JrIGxhdGVyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgZmlsdGVyaW5nT3B0aW9uczogc2VhcmNoQnlBcnJheSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50IHdpdGggaXQncyBuZXcgcGFnZSBudW1iZXIgYW5kIHNpemVcbiAgICogQHBhcmFtIG5ld1BhZ2VcbiAgICogQHBhcmFtIHBhZ2VTaXplXG4gICAqL1xuICB1cGRhdGVQYWdpbmF0aW9uKG5ld1BhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uID0ge1xuICAgICAgcGFnZU51bWJlcjogbmV3UGFnZSxcbiAgICAgIHBhZ2VTaXplXG4gICAgfTtcblxuICAgIGxldCBwYWdpbmF0aW9uT3B0aW9ucztcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSB7XG4gICAgICAgIGZpcnN0OiBwYWdlU2l6ZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSB7XG4gICAgICAgIGZpcnN0OiBwYWdlU2l6ZSxcbiAgICAgICAgb2Zmc2V0OiAobmV3UGFnZSAtIDEpICogcGFnZVNpemVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgcGFnaW5hdGlvbk9wdGlvbnMgfSk7XG4gIH1cblxuICAvKipcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2Ugc29ydGluZ09wdGlvbnNcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcbiAgICovXG4gIHVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnM/OiBDb2x1bW5Tb3J0W10sIHByZXNldFNvcnRlcnM/OiBDdXJyZW50U29ydGVyW10pIHtcbiAgICBsZXQgY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xuICAgIGxldCBncmFwaHFsU29ydGVyczogR3JhcGhxbFNvcnRpbmdPcHRpb25bXSA9IFtdO1xuXG4gICAgaWYgKCFzb3J0Q29sdW1ucyAmJiBwcmVzZXRTb3J0ZXJzKSB7XG4gICAgICAvLyBtYWtlIHRoZSBwcmVzZXRzIHRoZSBjdXJyZW50IHNvcnRlcnMsIGFsc28gbWFrZSBzdXJlIHRoYXQgYWxsIGRpcmVjdGlvbiBhcmUgaW4gdXBwZXJjYXNlIGZvciBHcmFwaFFMXG4gICAgICBjdXJyZW50U29ydGVycyA9IHByZXNldFNvcnRlcnM7XG4gICAgICBjdXJyZW50U29ydGVycy5mb3JFYWNoKChzb3J0ZXIpID0+IHNvcnRlci5kaXJlY3Rpb24gPSBzb3J0ZXIuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZyk7XG5cbiAgICAgIC8vIGRpc3BsYXkgdGhlIGNvcnJlY3Qgc29ydGluZyBpY29ucyBvbiB0aGUgVUksIGZvciB0aGF0IGl0IHJlcXVpcmVzIChjb2x1bW5JZCwgc29ydEFzYykgcHJvcGVydGllc1xuICAgICAgY29uc3QgdG1wU29ydGVyQXJyYXkgPSBjdXJyZW50U29ydGVycy5tYXAoKHNvcnRlcikgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBzb3J0ZXIuY29sdW1uSWQpO1xuXG4gICAgICAgIGdyYXBocWxTb3J0ZXJzLnB1c2goe1xuICAgICAgICAgIGZpZWxkOiBjb2x1bW5EZWYgPyAoKGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQpICsgJycpIDogKHNvcnRlci5jb2x1bW5JZCArICcnKSxcbiAgICAgICAgICBkaXJlY3Rpb246IHNvcnRlci5kaXJlY3Rpb25cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmV0dXJuIG9ubHkgdGhlIGNvbHVtbihzKSBmb3VuZCBpbiB0aGUgQ29sdW1uIERlZmluaXRpb25zIEVMU0UgbnVsbFxuICAgICAgICBpZiAoY29sdW1uRGVmKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0ZXIuY29sdW1uSWQsXG4gICAgICAgICAgICBzb3J0QXNjOiBzb3J0ZXIuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXQgdGhlIHNvcnQgaWNvbnMsIGJ1dCBhbHNvIG1ha2Ugc3VyZSB0byBmaWx0ZXIgb3V0IG51bGwgdmFsdWVzIChoYXBwZW5zIHdoZW4gbm8gY29sdW1uRGVmIGZvdW5kKVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodG1wU29ydGVyQXJyYXkpKSB7XG4gICAgICAgIHRoaXMuX2dyaWQuc2V0U29ydENvbHVtbnModG1wU29ydGVyQXJyYXkuZmlsdGVyKChzb3J0ZXIpID0+IHNvcnRlcikpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc29ydENvbHVtbnMgJiYgIXByZXNldFNvcnRlcnMpIHtcbiAgICAgIC8vIGJ1aWxkIHRoZSBvcmRlckJ5IGFycmF5LCBpdCBjb3VsZCBiZSBtdWx0aXNvcnQsIGV4YW1wbGVcbiAgICAgIC8vIG9yZGVyQnk6W3tmaWVsZDogbGFzdE5hbWUsIGRpcmVjdGlvbjogQVNDfSwge2ZpZWxkOiBmaXJzdE5hbWUsIGRpcmVjdGlvbjogREVTQ31dXG4gICAgICBpZiAoc29ydENvbHVtbnMgJiYgc29ydENvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGdyYXBocWxTb3J0ZXJzID0gbmV3IEFycmF5KHRoaXMuZGVmYXVsdE9yZGVyQnkpOyAvLyB3aGVuIGVtcHR5LCB1c2UgdGhlIGRlZmF1bHQgc29ydFxuICAgICAgICBjdXJyZW50U29ydGVycyA9IG5ldyBBcnJheSh7IGNvbHVtbklkOiB0aGlzLmRlZmF1bHRPcmRlckJ5LmZpZWxkLCBkaXJlY3Rpb246IHRoaXMuZGVmYXVsdE9yZGVyQnkuZGlyZWN0aW9uIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNvcnRDb2x1bW5zKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2Ygc29ydENvbHVtbnMpIHtcbiAgICAgICAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnNvcnRDb2wpIHtcbiAgICAgICAgICAgICAgY3VycmVudFNvcnRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbi5zb3J0Q29sLmlkICsgJycsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjb2x1bW4uc29ydEFzYyA/IFNvcnREaXJlY3Rpb24uQVNDIDogU29ydERpcmVjdGlvbi5ERVNDXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGdyYXBocWxTb3J0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGZpZWxkOiAoY29sdW1uLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW4uc29ydENvbC5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbi5zb3J0Q29sLmZpZWxkIHx8IGNvbHVtbi5zb3J0Q29sLmlkKSArICcnLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogY29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBrZWVwIGN1cnJlbnQgU29ydGVycyBhbmQgdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCB0aGUgbmV3IHNvcnRpbmdcbiAgICB0aGlzLl9jdXJyZW50U29ydGVycyA9IGN1cnJlbnRTb3J0ZXJzO1xuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHNvcnRpbmdPcHRpb25zOiBncmFwaHFsU29ydGVycyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHdoaWNoIHRha2VzIGFuIGlucHV0IHN0cmluZyBhbmQgcmVtb3ZlcyBkb3VibGUgcXVvdGVzIG9ubHlcbiAgICogb24gY2VydGFpbiBmaWVsZHMgYXJlIGlkZW50aWZpZWQgYXMgR3JhcGhRTCBlbnVtcyAoZXhjZXB0IGZpZWxkcyB3aXRoIGRvdCBub3RhdGlvbilcbiAgICogRm9yIGV4YW1wbGUgbGV0IHNheSB3ZSBpZGVudGlmaWVkIChcImRpcmVjdGlvbjpcIiwgXCJzb3J0XCIpIGFzIHdvcmQgd2hpY2ggYXJlIEdyYXBoUUwgZW51bSBmaWVsZHNcbiAgICogdGhlbiB0aGUgcmVzdWx0IHdpbGwgYmU6XG4gICAqIEZST01cbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOlwiZmlyc3ROYW1lXCIsIGRpcmVjdGlvbjpcIkFTQ1wifSB9XSkgfVxuICAgKiBUT1xuICAgKiBxdWVyeSB7IHVzZXJzIChvcmRlckJ5Olt7ZmllbGQ6IGZpcnN0TmFtZSwgZGlyZWN0aW9uOiBBU0N9fSl9XG4gICAqXG4gICAqIEVYQ0VQVElPTlMgKGZpZWxkcyB3aXRoIGRvdCBub3RhdGlvbiBcIi5cIiB3aGljaCBhcmUgaW5zaWRlIGEgXCJmaWVsZDpcIilcbiAgICogdGhlc2UgZmllbGRzIHdpbGwga2VlcCBkb3VibGUgcXVvdGVzIHdoaWxlIGV2ZXJ5dGhpbmcgZWxzZSB3aWxsIGJlIHN0cmlwcGVkIG9mIGRvdWJsZSBxdW90ZXNcbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOlwiYmlsbGluZy5zdHJlZXQubmFtZVwiLCBkaXJlY3Rpb246IFwiQVNDXCJ9IH1cbiAgICogVE9cbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOlwiYmlsbGluZy5zdHJlZXQubmFtZVwiLCBkaXJlY3Rpb246IEFTQ319XG4gICAqIEBwYXJhbSBpbnB1dFN0ciBpbnB1dCBzdHJpbmdcbiAgICogQHBhcmFtIGVudW1TZWFyY2hXb3JkcyBhcnJheSBvZiBlbnVtIHdvcmRzIHRvIGZpbHRlclxuICAgKiBAcmV0dXJucyBvdXRwdXRTdHIgb3V0cHV0IHN0cmluZ1xuICAgKi9cbiAgdHJpbURvdWJsZVF1b3Rlc09uRW51bUZpZWxkKGlucHV0U3RyOiBzdHJpbmcsIGVudW1TZWFyY2hXb3Jkczogc3RyaW5nW10sIGtlZXBBcmd1bWVudEZpZWxkRG91YmxlUXVvdGVzOiBib29sZWFuKSB7XG4gICAgY29uc3QgcGF0dGVybldvcmRJblF1b3RlcyA9IGBcXHM/KChmaWVsZDpcXHMqKT9cIi4qP1wiKWA7XG4gICAgbGV0IHBhdHRlcm5SZWdleCA9IGVudW1TZWFyY2hXb3Jkcy5qb2luKHBhdHRlcm5Xb3JkSW5RdW90ZXMgKyAnfCcpO1xuICAgIHBhdHRlcm5SZWdleCArPSBwYXR0ZXJuV29yZEluUXVvdGVzOyAvLyB0aGUgbGFzdCBvbmUgc2hvdWxkIGFsc28gaGF2ZSB0aGUgcGF0dGVybiBidXQgd2l0aG91dCB0aGUgcGlwZSBcInxcIlxuICAgIC8vIGV4YW1wbGUgd2l0aCAoZmllbGQ6ICYgZGlyZWN0aW9uOik6ICAvZmllbGQ6cz8oXCIuKj9cIil8ZGlyZWN0aW9uOnM/KFwiLio/XCIpL1xuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAocGF0dGVyblJlZ2V4LCAnZycpO1xuXG4gICAgcmV0dXJuIGlucHV0U3RyLnJlcGxhY2UocmVnLCAoZ3JvdXAxLCBncm91cDIsIGdyb3VwMykgPT4ge1xuICAgICAgLy8gcmVtb3ZlIGRvdWJsZSBxdW90ZXMgZXhjZXB0IHdoZW4gdGhlIHN0cmluZyBzdGFydHMgd2l0aCBhIFwiZmllbGQ6XCJcbiAgICAgIGxldCByZW1vdmVEb3VibGVRdW90ZXMgPSB0cnVlO1xuICAgICAgaWYgKGdyb3VwMS5zdGFydHNXaXRoKCdmaWVsZDonKSAmJiBrZWVwQXJndW1lbnRGaWVsZERvdWJsZVF1b3Rlcykge1xuICAgICAgICByZW1vdmVEb3VibGVRdW90ZXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlcCA9IHJlbW92ZURvdWJsZVF1b3RlcyA/IGdyb3VwMS5yZXBsYWNlKC9cIi9nLCAnJykgOiBncm91cDE7XG4gICAgICByZXR1cm4gcmVwO1xuICAgIH0pO1xuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogQ2FzdCBwcm92aWRlZCBmaWx0ZXJzIChjb3VsZCBiZSBpbiBtdWx0aXBsZSBmb3JtYXQpIGludG8gYW4gYXJyYXkgb2YgQ29sdW1uRmlsdGVyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXG4gICAqL1xuICBwcml2YXRlIGNhc3RGaWx0ZXJUb0NvbHVtbkZpbHRlcihjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdKTogQ3VycmVudEZpbHRlcltdIHtcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxuICAgIGNvbnN0IGZpbHRlcnNBcnJheTogQ29sdW1uRmlsdGVyW10gPSAodHlwZW9mIGNvbHVtbkZpbHRlcnMgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKGNvbHVtbkZpbHRlcnMpLm1hcChrZXkgPT4gY29sdW1uRmlsdGVyc1trZXldKSA6IGNvbHVtbkZpbHRlcnM7XG5cbiAgICByZXR1cm4gZmlsdGVyc0FycmF5Lm1hcCgoZmlsdGVyKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBmaWx0ZXIuY29sdW1uRGVmO1xuICAgICAgY29uc3QgaGVhZGVyID0gKGNvbHVtbkRlZikgPyAoY29sdW1uRGVmLmhlYWRlcktleSB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJykgOiAnJztcbiAgICAgIGNvbnN0IHRtcEZpbHRlcjogQ3VycmVudEZpbHRlciA9IHsgY29sdW1uSWQ6IGZpbHRlci5jb2x1bW5JZCB8fCAnJyB9O1xuICAgICAgaWYgKGZpbHRlci5vcGVyYXRvcikge1xuICAgICAgICB0bXBGaWx0ZXIub3BlcmF0b3IgPSBmaWx0ZXIub3BlcmF0b3I7XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpKSB7XG4gICAgICAgIHRtcEZpbHRlci5zZWFyY2hUZXJtcyA9IGZpbHRlci5zZWFyY2hUZXJtcztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXBGaWx0ZXI7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==