/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { mapOperatorType, mapOperatorByFieldType } from './utilities';
import { FieldType, SortDirection } from './../models/index';
import QueryBuilder from './graphqlQueryBuilder';
// timer for keeping track of user typing waits
/** @type {?} */
let timer;
/** @type {?} */
const DEFAULT_FILTER_TYPING_DEBOUNCE = 750;
/** @type {?} */
const DEFAULT_ITEMS_PER_PAGE = 25;
/** @type {?} */
const DEFAULT_PAGE_SIZE = 20;
export class GraphqlService {
    constructor() {
        this.defaultOrderBy = { field: 'id', direction: SortDirection.ASC };
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
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
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @return {?}
     */
    buildQuery() {
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        // get the column definitions and exclude some if they were tagged as excluded
        /** @type {?} */
        let columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter((column) => !column.excludeFromQuery);
        /** @type {?} */
        const queryQb = new QueryBuilder('query');
        /** @type {?} */
        const datasetQb = new QueryBuilder(this.options.datasetName);
        /** @type {?} */
        const dataQb = (this.options.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        /** @type {?} */
        let columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            for (const column of columnDefinitions) {
                columnIds.push(column.field);
                // if extra "fields" are passed, also push them to columnIds
                if (column.fields) {
                    columnIds.push(...column.fields);
                }
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
        const filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            /** @type {?} */
            const pageInfoQb = new QueryBuilder('pageInfo');
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
        let datasetFilters = {};
        // only add pagination if it's enabled in the grid options
        if (this._gridOptions.enablePagination !== false) {
            datasetFilters = Object.assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
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
            // first: 20, ... userId: 123
            for (const queryArgument of this.options.extraQueryArguments) {
                datasetFilters[queryArgument.field] = queryArgument.value;
            }
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        /** @type {?} */
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
     * @param {?} inputArray
     * @return {?}
     */
    buildFilterQuery(inputArray) {
        /** @type {?} */
        const set = (o = {}, a) => {
            /** @type {?} */
            const k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        };
        /** @type {?} */
        const output = inputArray.reduce((o, a) => set(o, a.split('.')), {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    }
    /**
     * @param {?=} serviceOptions
     * @param {?=} pagination
     * @param {?=} grid
     * @return {?}
     */
    init(serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns) {
            this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
        }
    }
    /**
     * Get an initialization of Pagination options
     * @return {?} Pagination Options
     */
    getInitPaginationOptions() {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    }
    /**
     * Get the GraphQL dataset name
     * @return {?}
     */
    getDatasetName() {
        return this.options.datasetName || '';
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
        /** @type {?} */
        let paginationOptions;
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
        this.updateOptions({ paginationOptions });
    }
    /**
     * @param {?=} serviceOptions
     * @return {?}
     */
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
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
        const gridOptions = this._gridOptions || args.grid.getOptions();
        /** @type {?} */
        const backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
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
    processOnPaginationChanged(event, args) {
        /** @type {?} */
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
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param {?} columnFilters
     * @param {?} isUpdatedByPreset
     * @return {?}
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        /** @type {?} */
        const searchByArray = [];
        /** @type {?} */
        let searchValue;
        for (const columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                /** @type {?} */
                const columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                /** @type {?} */
                let columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((column) => column.id === columnFilter.columnId);
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                /** @type {?} */
                const fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                /** @type {?} */
                const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                /** @type {?} */
                let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`GraphQL filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                let operator = columnFilter.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                /** @type {?} */
                const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    continue;
                }
                // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                if (searchTerms && searchTerms.length > 1) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    // escaping the search value
                    searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
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
        }
        // update the service options with filters for the buildQuery() to work later
        this.updateOptions({ filteringOptions: searchByArray });
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
        /** @type {?} */
        let paginationOptions;
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
        this.updateOptions({ paginationOptions });
    }
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param {?=} sortColumns
     * @param {?=} presetSorters
     * @return {?}
     */
    updateSorters(sortColumns, presetSorters) {
        /** @type {?} */
        let currentSorters = [];
        /** @type {?} */
        let graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
            currentSorters = presetSorters;
            currentSorters.forEach((sorter) => sorter.direction = (/** @type {?} */ (sorter.direction.toUpperCase())));
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            /** @type {?} */
            const tmpSorterArray = currentSorters.map((sorter) => {
                /** @type {?} */
                const columnDef = this._columnDefinitions.find((column) => column.id === sorter.columnId);
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
                this._grid.setSortColumns(tmpSorterArray.filter((sorter) => sorter));
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
     * @param {?} inputStr input string
     * @param {?} enumSearchWords array of enum words to filter
     * @param {?} keepArgumentFieldDoubleQuotes
     * @return {?} outputStr output string
     */
    trimDoubleQuotesOnEnumField(inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        /** @type {?} */
        const patternWordInQuotes = `\s?((field:\s*)?".*?")`;
        /** @type {?} */
        let patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        /** @type {?} */
        const reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, (group1, group2, group3) => {
            // remove double quotes except when the string starts with a "field:"
            /** @type {?} */
            let removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            /** @type {?} */
            const rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        });
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
        const filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters;
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQVNMLFNBQVMsRUFZVCxhQUFhLEVBRWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQzs7O0lBRzdDLEtBQVU7O01BQ1IsOEJBQThCLEdBQUcsR0FBRzs7TUFDcEMsc0JBQXNCLEdBQUcsRUFBRTs7TUFDM0IsaUJBQWlCLEdBQUcsRUFBRTtBQUU1QixNQUFNLE9BQU8sY0FBYztJQUEzQjtRQVFFLG1CQUFjLEdBQXlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JGLDZCQUF3QixHQUE0RDtZQUNsRixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FBQztJQXVnQkosQ0FBQzs7Ozs7O0lBcGdCQyxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBTUQsVUFBVTtRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMs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Ozs7OztJQUN6Qyw0Q0FBcUM7Ozs7O0lBQ3JDLCtCQUFtQjs7SUFDbkIsaUNBQThCOztJQUM5QixvQ0FBbUM7O0lBQ25DLHdDQUFxRjs7SUFDckYsa0RBR0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXBPcGVyYXRvclR5cGUsIG1hcE9wZXJhdG9yQnlGaWVsZFR5cGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQge1xuICBCYWNrZW5kU2VydmljZSxcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIENvbHVtbkZpbHRlcnMsXG4gIENvbHVtblNvcnQsXG4gIEN1cnJlbnRGaWx0ZXIsXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxuICBDdXJyZW50U29ydGVyLFxuICBGaWVsZFR5cGUsXG4gIEZpbHRlckNoYW5nZWRBcmdzLFxuICBHcmFwaHFsQ3Vyc29yUGFnaW5hdGlvbk9wdGlvbixcbiAgR3JhcGhxbERhdGFzZXRGaWx0ZXIsXG4gIEdyYXBocWxGaWx0ZXJpbmdPcHRpb24sXG4gIEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uLFxuICBHcmFwaHFsU2VydmljZU9wdGlvbixcbiAgR3JhcGhxbFNvcnRpbmdPcHRpb24sXG4gIEdyaWRPcHRpb24sXG4gIFBhZ2luYXRpb24sXG4gIFBhZ2luYXRpb25DaGFuZ2VkQXJncyxcbiAgU29ydENoYW5nZWRBcmdzLFxuICBTb3J0RGlyZWN0aW9uLFxuICBTb3J0RGlyZWN0aW9uU3RyaW5nXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9ncmFwaHFsUXVlcnlCdWlsZGVyJztcblxuLy8gdGltZXIgZm9yIGtlZXBpbmcgdHJhY2sgb2YgdXNlciB0eXBpbmcgd2FpdHNcbmxldCB0aW1lcjogYW55O1xuY29uc3QgREVGQVVMVF9GSUxURVJfVFlQSU5HX0RFQk9VTkNFID0gNzUwO1xuY29uc3QgREVGQVVMVF9JVEVNU19QRVJfUEFHRSA9IDI1O1xuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyMDtcblxuZXhwb3J0IGNsYXNzIEdyYXBocWxTZXJ2aWNlIGltcGxlbWVudHMgQmFja2VuZFNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXJyZW50RmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXTtcbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2luYXRpb246IEN1cnJlbnRQYWdpbmF0aW9uO1xuICBwcml2YXRlIF9jdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdO1xuICBwcml2YXRlIF9jb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW107XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgb3B0aW9uczogR3JhcGhxbFNlcnZpY2VPcHRpb247XG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb24gfCB1bmRlZmluZWQ7XG4gIGRlZmF1bHRPcmRlckJ5OiBHcmFwaHFsU29ydGluZ09wdGlvbiA9IHsgZmllbGQ6ICdpZCcsIGRpcmVjdGlvbjogU29ydERpcmVjdGlvbi5BU0MgfTtcbiAgZGVmYXVsdFBhZ2luYXRpb25PcHRpb25zOiBHcmFwaHFsUGFnaW5hdGlvbk9wdGlvbiB8IEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uID0ge1xuICAgIGZpcnN0OiBERUZBVUxUX0lURU1TX1BFUl9QQUdFLFxuICAgIG9mZnNldDogMFxuICB9O1xuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgdGhlIEdyYXBoUUwgcXVlcnksIHNpbmNlIHRoZSBzZXJ2aWNlIGluY2x1ZGUvZXhjbHVkZSBjdXJzb3IsIHRoZSBvdXRwdXQgcXVlcnkgd2lsbCBiZSBkaWZmZXJlbnQuXG4gICAqIEBwYXJhbSBzZXJ2aWNlT3B0aW9ucyBHcmFwaHFsU2VydmljZU9wdGlvblxuICAgKi9cbiAgYnVpbGRRdWVyeSgpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucyB8fCAhdGhpcy5vcHRpb25zLmRhdGFzZXROYW1lIHx8ICghdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgJiYgIXRoaXMub3B0aW9ucy5jb2x1bW5EZWZpbml0aW9ucykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignR3JhcGhRTCBTZXJ2aWNlIHJlcXVpcmVzIFwiZGF0YXNldE5hbWVcIiAmIFwiY29sdW1uRGVmaW5pdGlvbnNcIiBwcm9wZXJ0aWVzIGZvciBpdCB0byB3b3JrJyk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgYW5kIGV4Y2x1ZGUgc29tZSBpZiB0aGV5IHdlcmUgdGFnZ2VkIGFzIGV4Y2x1ZGVkXG4gICAgbGV0IGNvbHVtbkRlZmluaXRpb25zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5vcHRpb25zLmNvbHVtbkRlZmluaXRpb25zO1xuICAgIGNvbHVtbkRlZmluaXRpb25zID0gY29sdW1uRGVmaW5pdGlvbnMuZmlsdGVyKChjb2x1bW46IENvbHVtbikgPT4gIWNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5KTtcblxuICAgIGNvbnN0IHF1ZXJ5UWIgPSBuZXcgUXVlcnlCdWlsZGVyKCdxdWVyeScpO1xuICAgIGNvbnN0IGRhdGFzZXRRYiA9IG5ldyBRdWVyeUJ1aWxkZXIodGhpcy5vcHRpb25zLmRhdGFzZXROYW1lKTtcbiAgICBjb25zdCBkYXRhUWIgPSAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikgPyBuZXcgUXVlcnlCdWlsZGVyKCdlZGdlcycpIDogbmV3IFF1ZXJ5QnVpbGRlcignbm9kZXMnKTtcblxuICAgIC8vIGdldCBhbGwgdGhlIGNvbHVtbmRzIElkcyBmb3IgdGhlIGZpbHRlcnMgdG8gd29ya1xuICAgIGxldCBjb2x1bW5JZHM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uRGVmaW5pdGlvbnMpKSB7XG4gICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5EZWZpbml0aW9ucykge1xuICAgICAgICBjb2x1bW5JZHMucHVzaChjb2x1bW4uZmllbGQpO1xuXG4gICAgICAgIC8vIGlmIGV4dHJhIFwiZmllbGRzXCIgYXJlIHBhc3NlZCwgYWxzbyBwdXNoIHRoZW0gdG8gY29sdW1uSWRzXG4gICAgICAgIGlmIChjb2x1bW4uZmllbGRzKSB7XG4gICAgICAgICAgY29sdW1uSWRzLnB1c2goLi4uY29sdW1uLmZpZWxkcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNvbHVtbklkcyA9IGNvbHVtbkRlZmluaXRpb25zLm1hcCgoY29sdW1uKSA9PiBjb2x1bW4uZmllbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW5JZHMgPSB0aGlzLm9wdGlvbnMuY29sdW1uSWRzIHx8IFtdO1xuICAgIH1cblxuICAgIC8vIFNsaWNrZ3JpZCBhbHNvIHJlcXVpcmVzIHRoZSBcImlkXCIgZmllbGQgdG8gYmUgcGFydCBvZiBEYXRhVmlld1xuICAgIC8vIGFkZCBpdCB0byB0aGUgR3JhcGhRTCBxdWVyeSBpZiBpdCB3YXNuJ3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBsaXN0XG4gICAgaWYgKGNvbHVtbklkcy5pbmRleE9mKCdpZCcpID09PSAtMSkge1xuICAgICAgY29sdW1uSWRzLnVuc2hpZnQoJ2lkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVycyA9IHRoaXMuYnVpbGRGaWx0ZXJRdWVyeShjb2x1bW5JZHMpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcbiAgICAgIC8vIC4uLnBhZ2VJbmZvIHsgaGFzTmV4dFBhZ2UsIGVuZEN1cnNvciB9LCBlZGdlcyB7IGN1cnNvciwgbm9kZSB7IF9maWx0ZXJzXyB9IH1cbiAgICAgIGNvbnN0IHBhZ2VJbmZvUWIgPSBuZXcgUXVlcnlCdWlsZGVyKCdwYWdlSW5mbycpO1xuICAgICAgcGFnZUluZm9RYi5maW5kKCdoYXNOZXh0UGFnZScsICdlbmRDdXJzb3InKTtcbiAgICAgIGRhdGFRYi5maW5kKFsnY3Vyc29yJywgeyBub2RlOiBmaWx0ZXJzIH1dKTtcbiAgICAgIGRhdGFzZXRRYi5maW5kKFsndG90YWxDb3VudCcsIHBhZ2VJbmZvUWIsIGRhdGFRYl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyAuLi5ub2RlcyB7IF9maWx0ZXJzXyB9XG4gICAgICBkYXRhUWIuZmluZChmaWx0ZXJzKTtcbiAgICAgIGRhdGFzZXRRYi5maW5kKFsndG90YWxDb3VudCcsIGRhdGFRYl0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBkYXRhc2V0IGZpbHRlcnMsIGNvdWxkIGJlIFBhZ2luYXRpb24gYW5kIFNvcnRpbmdGaWx0ZXJzIGFuZC9vciBGaWVsZEZpbHRlcnNcbiAgICBsZXQgZGF0YXNldEZpbHRlcnM6IEdyYXBocWxEYXRhc2V0RmlsdGVyID0ge307XG5cbiAgICAvLyBvbmx5IGFkZCBwYWdpbmF0aW9uIGlmIGl0J3MgZW5hYmxlZCBpbiB0aGUgZ3JpZCBvcHRpb25zXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gIT09IGZhbHNlKSB7XG4gICAgICBkYXRhc2V0RmlsdGVycyA9IHtcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLFxuICAgICAgICBmaXJzdDogKCh0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zLmZpcnN0KSA/IHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCA6ICgodGhpcy5wYWdpbmF0aW9uICYmIHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSkgPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBudWxsKSkgfHwgdGhpcy5kZWZhdWx0UGFnaW5hdGlvbk9wdGlvbnMuZmlyc3RcbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xuICAgICAgICBkYXRhc2V0RmlsdGVycy5vZmZzZXQgPSAoKHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ29mZnNldCcpKSA/ICt0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnNbJ29mZnNldCddIDogMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5zb3J0aW5nT3B0aW9ucykgJiYgdGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIG9yZGVyQnk6IFt7IGZpZWxkOngsIGRpcmVjdGlvbjogJ0FTQycgfV1cbiAgICAgIGRhdGFzZXRGaWx0ZXJzLm9yZGVyQnkgPSB0aGlzLm9wdGlvbnMuc29ydGluZ09wdGlvbnM7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5maWx0ZXJpbmdPcHRpb25zKSAmJiB0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBmaWx0ZXJCeTogW3sgZmllbGQ6IGRhdGUsIG9wZXJhdG9yOiAnPicsIHZhbHVlOiAnMjAwMC0xMC0xMCcgfV1cbiAgICAgIGRhdGFzZXRGaWx0ZXJzLmZpbHRlckJ5ID0gdGhpcy5vcHRpb25zLmZpbHRlcmluZ09wdGlvbnM7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWRkTG9jYWxlSW50b1F1ZXJ5KSB7XG4gICAgICAvLyBmaXJzdDogMjAsIC4uLiBsb2NhbGU6IFwiZW4tQ0FcIlxuICAgICAgZGF0YXNldEZpbHRlcnMubG9jYWxlID0gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuaTE4biAmJiB0aGlzLl9ncmlkT3B0aW9ucy5pMThuLmN1cnJlbnRMYW5nIHx8ICdlbic7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeUFyZ3VtZW50cykge1xuICAgICAgLy8gZmlyc3Q6IDIwLCAuLi4gdXNlcklkOiAxMjNcbiAgICAgIGZvciAoY29uc3QgcXVlcnlBcmd1bWVudCBvZiB0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeUFyZ3VtZW50cykge1xuICAgICAgICBkYXRhc2V0RmlsdGVyc1txdWVyeUFyZ3VtZW50LmZpZWxkXSA9IHF1ZXJ5QXJndW1lbnQudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcXVlcnkgeyB1c2VycyhmaXJzdDogMjAsIG9yZGVyQnk6IFtdLCBmaWx0ZXJCeTogW10pfVxuICAgIGRhdGFzZXRRYi5maWx0ZXIoZGF0YXNldEZpbHRlcnMpO1xuICAgIHF1ZXJ5UWIuZmluZChkYXRhc2V0UWIpO1xuXG4gICAgY29uc3QgZW51bVNlYXJjaFByb3BlcnRpZXMgPSBbJ2RpcmVjdGlvbjonLCAnZmllbGQ6JywgJ29wZXJhdG9yOiddO1xuICAgIHJldHVybiB0aGlzLnRyaW1Eb3VibGVRdW90ZXNPbkVudW1GaWVsZChxdWVyeVFiLnRvU3RyaW5nKCksIGVudW1TZWFyY2hQcm9wZXJ0aWVzLCB0aGlzLm9wdGlvbnMua2VlcEFyZ3VtZW50RmllbGREb3VibGVRdW90ZXMgfHwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gYW4gaW5wdXQgYXJyYXkgb2Ygc3RyaW5ncywgd2Ugd2FudCB0byBidWlsZCBhIEdyYXBoUUwgcXVlcnkgc3RyaW5nLlxuICAgKiBUaGUgcHJvY2VzcyBoYXMgdG8gdGFrZSB0aGUgZG90IG5vdGF0aW9uIGFuZCBwYXJzZSBpdCBpbnRvIGEgdmFsaWQgR3JhcGhRTCBxdWVyeVxuICAgKiBGb2xsb3dpbmcgdGhpcyBTTyBhbnN3ZXIgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ3NzA1NDc2LzEyMTIxNjZcbiAgICpcbiAgICogSU5QVVRcbiAgICogIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ2JpbGxpbmcuYWRkcmVzcy5zdHJlZXQnLCAnYmlsbGluZy5hZGRyZXNzLnppcCddXG4gICAqIE9VVFBVVFxuICAgKiBmaXJzdE5hbWUsIGxhc3ROYW1lLCBiaWxsaW5ne2FkZHJlc3N7c3RyZWV0LCB6aXB9fVxuICAgKiBAcGFyYW0gaW5wdXRBcnJheVxuICAgKi9cbiAgYnVpbGRGaWx0ZXJRdWVyeShpbnB1dEFycmF5OiBzdHJpbmdbXSkge1xuXG4gICAgY29uc3Qgc2V0ID0gKG86IGFueSA9IHt9LCBhOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGsgPSBhLnNoaWZ0KCk7XG4gICAgICBvW2tdID0gYS5sZW5ndGggPyBzZXQob1trXSwgYSkgOiBudWxsO1xuICAgICAgcmV0dXJuIG87XG4gICAgfTtcblxuICAgIGNvbnN0IG91dHB1dCA9IGlucHV0QXJyYXkucmVkdWNlKChvOiBhbnksIGE6IHN0cmluZykgPT4gc2V0KG8sIGEuc3BsaXQoJy4nKSksIHt9KTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvdXRwdXQpXG4gICAgICAucmVwbGFjZSgvXFxcInxcXDp8bnVsbC9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9eXFx7LywgJycpXG4gICAgICAucmVwbGFjZSgvXFx9JC8sICcnKTtcbiAgfVxuXG4gIGluaXQoc2VydmljZU9wdGlvbnM/OiBHcmFwaHFsU2VydmljZU9wdGlvbiwgcGFnaW5hdGlvbj86IFBhZ2luYXRpb24sIGdyaWQ/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgICB0aGlzLm9wdGlvbnMgPSBzZXJ2aWNlT3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnBhZ2luYXRpb24gPSBwYWdpbmF0aW9uO1xuXG4gICAgaWYgKGdyaWQgJiYgZ3JpZC5nZXRDb2x1bW5zKSB7XG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IHNlcnZpY2VPcHRpb25zLmNvbHVtbkRlZmluaXRpb25zIHx8IGdyaWQuZ2V0Q29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gaW5pdGlhbGl6YXRpb24gb2YgUGFnaW5hdGlvbiBvcHRpb25zXG4gICAqIEByZXR1cm4gUGFnaW5hdGlvbiBPcHRpb25zXG4gICAqL1xuICBnZXRJbml0UGFnaW5hdGlvbk9wdGlvbnMoKTogR3JhcGhxbERhdGFzZXRGaWx0ZXIge1xuICAgIHJldHVybiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikgPyB7IGZpcnN0OiAodGhpcy5wYWdpbmF0aW9uID8gdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplIDogREVGQVVMVF9JVEVNU19QRVJfUEFHRSkgfSA6IHsgZmlyc3Q6ICh0aGlzLnBhZ2luYXRpb24gPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBERUZBVUxUX0lURU1TX1BFUl9QQUdFKSwgb2Zmc2V0OiAwIH07XG4gIH1cblxuICAvKiogR2V0IHRoZSBHcmFwaFFMIGRhdGFzZXQgbmFtZSAqL1xuICBnZXREYXRhc2V0TmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGF0YXNldE5hbWUgfHwgJyc7XG4gIH1cblxuICAvKiogR2V0IHRoZSBGaWx0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RmlsdGVycztcbiAgfVxuXG4gIC8qKiBHZXQgdGhlIFBhZ2luYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xuICBnZXRDdXJyZW50UGFnaW5hdGlvbigpOiBDdXJyZW50UGFnaW5hdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgU29ydGVycyB0aGF0IGFyZSBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xuICBnZXRDdXJyZW50U29ydGVycygpOiBDdXJyZW50U29ydGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U29ydGVycztcbiAgfVxuXG4gIC8qXG4gICAqIFJlc2V0IHRoZSBwYWdpbmF0aW9uIG9wdGlvbnNcbiAgICovXG4gIHJlc2V0UGFnaW5hdGlvbk9wdGlvbnMoKSB7XG4gICAgbGV0IHBhZ2luYXRpb25PcHRpb25zO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSB7XG4gICAgICAvLyBmaXJzdCwgbGFzdCwgYWZ0ZXIsIGJlZm9yZVxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSB7XG4gICAgICAgIGFmdGVyOiAnJyxcbiAgICAgICAgYmVmb3JlOiB1bmRlZmluZWQsXG4gICAgICAgIGxhc3Q6IHVuZGVmaW5lZFxuICAgICAgfSBhcyBHcmFwaHFsQ3Vyc29yUGFnaW5hdGlvbk9wdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmlyc3QsIGxhc3QsIG9mZnNldFxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSAodGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zIHx8IHRoaXMuZ2V0SW5pdFBhZ2luYXRpb25PcHRpb25zKCkpIGFzIEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uO1xuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMub2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICAvLyBzYXZlIGN1cnJlbnQgcGFnaW5hdGlvbiBhcyBQYWdlIDEgYW5kIHBhZ2Ugc2l6ZSBhcyBcImZpcnN0XCIgc2V0IHNpemVcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXG4gICAgICBwYWdlU2l6ZTogcGFnaW5hdGlvbk9wdGlvbnMuZmlyc3RcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgcGFnaW5hdGlvbk9wdGlvbnMgfSk7XG4gIH1cblxuICB1cGRhdGVPcHRpb25zKHNlcnZpY2VPcHRpb25zPzogR3JhcGhxbFNlcnZpY2VPcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4uc2VydmljZU9wdGlvbnMgfTtcbiAgfVxuXG4gIC8qXG4gICAqIEZJTFRFUklOR1xuICAgKi9cbiAgcHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IEZpbHRlckNoYW5nZWRBcmdzKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBncmlkT3B0aW9uczogR3JpZE9wdGlvbiA9IHRoaXMuX2dyaWRPcHRpb25zIHx8IGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCk7XG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuXG4gICAgaWYgKGJhY2tlbmRBcGkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgR3JhcGhxbFNlcnZpY2UsIFwiYmFja2VuZFNlcnZpY2VBcGlcIiBpcyBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBvbmx5IGFkZCBhIGRlbGF5IHdoZW4gdXNlciBpcyB0eXBpbmcsIG9uIHNlbGVjdCBkcm9wZG93biBmaWx0ZXIgaXQgd2lsbCBleGVjdXRlIHJpZ2h0IGF3YXlcbiAgICBsZXQgZGVib3VuY2VUeXBpbmdEZWxheSA9IDA7XG4gICAgaWYgKGV2ZW50ICYmIChldmVudC50eXBlID09PSAna2V5dXAnIHx8IGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykpIHtcbiAgICAgIGRlYm91bmNlVHlwaW5nRGVsYXkgPSBiYWNrZW5kQXBpLmZpbHRlclR5cGluZ0RlYm91bmNlIHx8IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRTtcbiAgICB9XG5cbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxuICAgIHRoaXMuX2N1cnJlbnRGaWx0ZXJzID0gdGhpcy5jYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoYXJncy5jb2x1bW5GaWx0ZXJzKTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgY3JlYXRlIHRoZSBHcmFwaFFMIEJhY2tlbmQgU2VydmljZSwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xuICAgICAgfVxuXG4gICAgICAvLyByZXNldCBQYWdpbmF0aW9uLCB0aGVuIGJ1aWxkIHRoZSBHcmFwaFFMIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcbiAgICAgIC8vIHdhaXQgYSBtaW5pbXVtIHVzZXIgdHlwaW5nIGluYWN0aXZpdHkgYmVmb3JlIHByb2Nlc3NpbmcgYW55IHF1ZXJ5XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3QgZmlsdGVycyAmIHNldCB0aGUgcXVlcnlcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJzKGFyZ3MuY29sdW1uRmlsdGVycywgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpO1xuICAgICAgICByZXNvbHZlKHRoaXMuYnVpbGRRdWVyeSgpKTtcbiAgICAgIH0sIGRlYm91bmNlVHlwaW5nRGVsYXkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKlxuICAgKiBQQUdJTkFUSU9OXG4gICAqIFdpdGggY3Vyc29yLCB0aGUgcXVlcnkgY2FuIGhhdmUgNCBhcmd1bWVudHMgKGZpcnN0LCBhZnRlciwgbGFzdCwgYmVmb3JlKSwgZm9yIGV4YW1wbGU6XG4gICAqICAgdXNlcnMgKGZpcnN0OjIwLCBhZnRlcjpcIllYSnlZWGxqYjI1dVpXTjBhVzl1T2pNPVwiKSB7XG4gICAqICAgICB0b3RhbENvdW50XG4gICAqICAgICBwYWdlSW5mbyB7XG4gICAqICAgICAgIGhhc05leHRQYWdlXG4gICAqICAgICAgIGVuZEN1cnNvclxuICAgKiAgICAgfVxuICAgKiAgICAgZWRnZXMge1xuICAgKiAgICAgICBjdXJzb3JcbiAgICogICAgICAgbm9kZSB7XG4gICAqICAgICAgICAgbmFtZVxuICAgKiAgICAgICAgIGdlbmRlclxuICAgKiAgICAgICB9XG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiBXaXRob3V0IGN1cnNvciwgdGhlIHF1ZXJ5IGNhbiBoYXZlIDMgYXJndW1lbnRzIChmaXJzdCwgbGFzdCwgb2Zmc2V0KSwgZm9yIGV4YW1wbGU6XG4gICAqICAgdXNlcnMgKGZpcnN0OjIwLCBvZmZzZXQ6IDEwKSB7XG4gICAqICAgICB0b3RhbENvdW50XG4gICAqICAgICBub2RlcyB7XG4gICAqICAgICAgIG5hbWVcbiAgICogICAgICAgZ2VuZGVyXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKi9cbiAgcHJvY2Vzc09uUGFnaW5hdGlvbkNoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MpIHtcbiAgICBjb25zdCBwYWdlU2l6ZSA9ICsoYXJncy5wYWdlU2l6ZSB8fCAoKHRoaXMucGFnaW5hdGlvbikgPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBERUZBVUxUX1BBR0VfU0laRSkpO1xuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbihhcmdzLm5ld1BhZ2UsIHBhZ2VTaXplKTtcblxuICAgIC8vIGJ1aWxkIHRoZSBHcmFwaFFMIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5idWlsZFF1ZXJ5KCk7XG4gIH1cblxuICAvKlxuICAgKiBTT1JUSU5HXG4gICAqIHdlIHdpbGwgdXNlIHNvcnRpbmcgYXMgcGVyIGEgRmFjZWJvb2sgc3VnZ2VzdGlvbiBvbiBhIEdpdGh1YiBpc3N1ZSAod2l0aCBzb21lIHNtYWxsIGNoYW5nZXMpXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmFwaHFsL2dyYXBocWwtcmVsYXktanMvaXNzdWVzLzIwI2lzc3VlY29tbWVudC0yMjA0OTQyMjJcbiAgICovXG4gIHByb2Nlc3NPblNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogU29ydENoYW5nZWRBcmdzKSB7XG4gICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7IHNvcnRDb2w6IGFyZ3Muc29ydENvbCwgc29ydEFzYzogYXJncy5zb3J0QXNjIH0pO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3Qgc29ydGVycyAmIHNldCB0aGUgcXVlcnlcbiAgICB0aGlzLnVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnMpO1xuXG4gICAgLy8gYnVpbGQgdGhlIEdyYXBoUUwgcXVlcnkgd2hpY2ggd2Ugd2lsbCB1c2UgaW4gdGhlIFdlYkFQSSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLmJ1aWxkUXVlcnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgdXBkYXRlIGJhY2tlbmQgc2VydmljZSBmaWx0ZXJpbmdPcHRpb25zXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXG4gICAqL1xuICB1cGRhdGVGaWx0ZXJzKGNvbHVtbkZpbHRlcnM6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10sIGlzVXBkYXRlZEJ5UHJlc2V0OiBib29sZWFuKSB7XG4gICAgY29uc3Qgc2VhcmNoQnlBcnJheTogR3JhcGhxbEZpbHRlcmluZ09wdGlvbltdID0gW107XG4gICAgbGV0IHNlYXJjaFZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gY29sdW1uRmlsdGVycykge1xuICAgICAgaWYgKGNvbHVtbkZpbHRlcnMuaGFzT3duUHJvcGVydHkoY29sdW1uSWQpKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlciA9IGNvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xuXG4gICAgICAgIC8vIGlmIHVzZXIgZGVmaW5lZCBzb21lIFwicHJlc2V0c1wiLCB0aGVuIHdlIG5lZWQgdG8gZmluZCB0aGUgZmlsdGVycyBmcm9tIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgaW5zdGVhZFxuICAgICAgICBsZXQgY29sdW1uRGVmOiBDb2x1bW4gfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xuICAgICAgICAgIGNvbHVtbkRlZiA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZpbmQoKGNvbHVtbjogQ29sdW1uKSA9PiBjb2x1bW4uaWQgPT09IGNvbHVtbkZpbHRlci5jb2x1bW5JZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1uRGVmID0gY29sdW1uRmlsdGVyLmNvbHVtbkRlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbHVtbkRlZikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW0JhY2tlbmQgU2VydmljZSBBUEldOiBTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0cnlpbmcgdG8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBvZiB0aGUgc3BlY2lmaWVkIGZpbHRlciAob3IgcHJlc2V0IGZpbHRlcnMpLiBEaWQgeW91IG1ha2UgYSB0eXBvIG9uIHRoZSBmaWx0ZXIgY29sdW1uSWQ/Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLm5hbWUgfHwgJyc7XG4gICAgICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gKGNvbHVtbkZpbHRlciA/IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcyA6IG51bGwpIHx8IFtdO1xuICAgICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKSAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVGVybXNbMF0gOiAnJztcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSAhPT0gJ3N0cmluZycgJiYgIXNlYXJjaFRlcm1zKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHcmFwaFFMIGZpbHRlciBzZWFyY2hUZXJtIHByb3BlcnR5IG11c3QgYmUgcHJvdmlkZWQgYXMgdHlwZSBcInN0cmluZ1wiLCBpZiB5b3UgdXNlIGZpbHRlciB3aXRoIG9wdGlvbnMgdGhlbiBtYWtlIHN1cmUgeW91ciBJRHMgYXJlIGFsc28gc3RyaW5nLiBGb3IgZXhhbXBsZTogZmlsdGVyOiB7bW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbeyBpZDogXCIwXCIsIHZhbHVlOiBcIjBcIiB9LCB7IGlkOiBcIjFcIiwgdmFsdWU6IFwiMVwiIH1dYCk7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJycgKyBmaWVsZFNlYXJjaFZhbHVlOyAvLyBtYWtlIHN1cmUgaXQncyBhIHN0cmluZ1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gZmllbGRTZWFyY2hWYWx1ZS5tYXRjaCgvXihbPD4hPVxcKl17MCwyfSkoLipbXjw+IT1cXCpdKShbXFwqXT8pJC8pOyAvLyBncm91cCAxOiBPcGVyYXRvciwgMjogc2VhcmNoVmFsdWUsIDM6IGxhc3QgY2hhciBpcyAnKicgKG1lYW5pbmcgc3RhcnRzIHdpdGgsIGV4LjogYWJjKilcbiAgICAgICAgbGV0IG9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yIHx8ICgobWF0Y2hlcykgPyBtYXRjaGVzWzFdIDogJycpO1xuICAgICAgICBzZWFyY2hWYWx1ZSA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1syXSA6ICcnO1xuICAgICAgICBjb25zdCBsYXN0VmFsdWVDaGFyID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzNdIDogKG9wZXJhdG9yID09PSAnKnonID8gJyonIDogJycpO1xuXG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XG4gICAgICAgIGlmIChmaWVsZE5hbWUgJiYgc2VhcmNoVmFsdWUgPT09ICcnICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2hlbiBoYXZpbmcgbW9yZSB0aGFuIDEgc2VhcmNoIHRlcm0gKHdlIG5lZWQgdG8gY3JlYXRlIGEgQ1NWIHN0cmluZyBmb3IgR3JhcGhRTCBcIklOXCIgb3IgXCJOT1QgSU5cIiBmaWx0ZXIgc2VhcmNoKVxuICAgICAgICBpZiAoc2VhcmNoVGVybXMgJiYgc2VhcmNoVGVybXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHNlYXJjaFZhbHVlID0gc2VhcmNoVGVybXMuam9pbignLCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWFyY2hWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXG4gICAgICAgICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS5yZXBsYWNlKGAnYCwgYCcnYCk7IC8vIGVzY2FwZSBzaW5nbGUgcXVvdGVzIGJ5IGRvdWJsaW5nIHRoZW1cbiAgICAgICAgICBpZiAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJ2EqJyB8fCBvcGVyYXRvciA9PT0gJyp6JyB8fCBsYXN0VmFsdWVDaGFyID09PSAnKicpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yID0gKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICcqeicpID8gJ2VuZHNXaXRoJyA6ICdzdGFydHNXaXRoJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhbiBPcGVyYXRvciBidXQgd2UgaGF2ZSBhIEZpbHRlciBUeXBlLCB3ZSBzaG91bGQgdXNlIGRlZmF1bHQgT3BlcmF0b3JcbiAgICAgICAgLy8gbXVsdGlwbGVTZWxlY3QgaXMgXCJJTlwiLCB3aGlsZSBzaW5nbGVTZWxlY3QgaXMgXCJFUVwiLCBlbHNlIGRvbid0IG1hcCBhbnkgb3BlcmF0b3JcbiAgICAgICAgaWYgKCFvcGVyYXRvciAmJiBjb2x1bW5EZWYuZmlsdGVyKSB7XG4gICAgICAgICAgb3BlcmF0b3IgPSBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2Ugc3RpbGwgZG9uJ3QgaGF2ZSBhbiBvcGVyYXRvciBmaW5kIHRoZSBwcm9wZXIgT3BlcmF0b3IgdG8gdXNlIGJ5IGl0J3MgZmllbGQgdHlwZVxuICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XG4gICAgICAgICAgb3BlcmF0b3IgPSBtYXBPcGVyYXRvckJ5RmllbGRUeXBlKGNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VhcmNoQnlBcnJheS5wdXNoKHtcbiAgICAgICAgICBmaWVsZDogZmllbGROYW1lLFxuICAgICAgICAgIG9wZXJhdG9yOiBtYXBPcGVyYXRvclR5cGUob3BlcmF0b3IpLFxuICAgICAgICAgIHZhbHVlOiBzZWFyY2hWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIGZpbHRlcnMgZm9yIHRoZSBidWlsZFF1ZXJ5KCkgdG8gd29yayBsYXRlclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IGZpbHRlcmluZ09wdGlvbnM6IHNlYXJjaEJ5QXJyYXkgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudCB3aXRoIGl0J3MgbmV3IHBhZ2UgbnVtYmVyIGFuZCBzaXplXG4gICAqIEBwYXJhbSBuZXdQYWdlXG4gICAqIEBwYXJhbSBwYWdlU2l6ZVxuICAgKi9cbiAgdXBkYXRlUGFnaW5hdGlvbihuZXdQYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcbiAgICAgIHBhZ2VOdW1iZXI6IG5ld1BhZ2UsXG4gICAgICBwYWdlU2l6ZVxuICAgIH07XG5cbiAgICBsZXQgcGFnaW5hdGlvbk9wdGlvbnM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zID0ge1xuICAgICAgICBmaXJzdDogcGFnZVNpemVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zID0ge1xuICAgICAgICBmaXJzdDogcGFnZVNpemUsXG4gICAgICAgIG9mZnNldDogKG5ld1BhZ2UgLSAxKSAqIHBhZ2VTaXplXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHBhZ2luYXRpb25PcHRpb25zIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IHNvcnRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIHNvcnRpbmdPcHRpb25zXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXG4gICAqL1xuICB1cGRhdGVTb3J0ZXJzKHNvcnRDb2x1bW5zPzogQ29sdW1uU29ydFtdLCBwcmVzZXRTb3J0ZXJzPzogQ3VycmVudFNvcnRlcltdKSB7XG4gICAgbGV0IGN1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10gPSBbXTtcbiAgICBsZXQgZ3JhcGhxbFNvcnRlcnM6IEdyYXBocWxTb3J0aW5nT3B0aW9uW10gPSBbXTtcblxuICAgIGlmICghc29ydENvbHVtbnMgJiYgcHJlc2V0U29ydGVycykge1xuICAgICAgLy8gbWFrZSB0aGUgcHJlc2V0cyB0aGUgY3VycmVudCBzb3J0ZXJzLCBhbHNvIG1ha2Ugc3VyZSB0aGF0IGFsbCBkaXJlY3Rpb24gYXJlIGluIHVwcGVyY2FzZSBmb3IgR3JhcGhRTFxuICAgICAgY3VycmVudFNvcnRlcnMgPSBwcmVzZXRTb3J0ZXJzO1xuICAgICAgY3VycmVudFNvcnRlcnMuZm9yRWFjaCgoc29ydGVyKSA9PiBzb3J0ZXIuZGlyZWN0aW9uID0gc29ydGVyLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmcpO1xuXG4gICAgICAvLyBkaXNwbGF5IHRoZSBjb3JyZWN0IHNvcnRpbmcgaWNvbnMgb24gdGhlIFVJLCBmb3IgdGhhdCBpdCByZXF1aXJlcyAoY29sdW1uSWQsIHNvcnRBc2MpIHByb3BlcnRpZXNcbiAgICAgIGNvbnN0IHRtcFNvcnRlckFycmF5ID0gY3VycmVudFNvcnRlcnMubWFwKChzb3J0ZXIpID0+IHtcbiAgICAgICAgY29uc3QgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IGNvbHVtbi5pZCA9PT0gc29ydGVyLmNvbHVtbklkKTtcblxuICAgICAgICBncmFwaHFsU29ydGVycy5wdXNoKHtcbiAgICAgICAgICBmaWVsZDogY29sdW1uRGVmID8gKChjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkKSArICcnKSA6IChzb3J0ZXIuY29sdW1uSWQgKyAnJyksXG4gICAgICAgICAgZGlyZWN0aW9uOiBzb3J0ZXIuZGlyZWN0aW9uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJldHVybiBvbmx5IHRoZSBjb2x1bW4ocykgZm91bmQgaW4gdGhlIENvbHVtbiBEZWZpbml0aW9ucyBFTFNFIG51bGxcbiAgICAgICAgaWYgKGNvbHVtbkRlZikge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2x1bW5JZDogc29ydGVyLmNvbHVtbklkLFxuICAgICAgICAgICAgc29ydEFzYzogc29ydGVyLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBTb3J0RGlyZWN0aW9uLkFTQ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2V0IHRoZSBzb3J0IGljb25zLCBidXQgYWxzbyBtYWtlIHN1cmUgdG8gZmlsdGVyIG91dCBudWxsIHZhbHVlcyAoaGFwcGVucyB3aGVuIG5vIGNvbHVtbkRlZiBmb3VuZClcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRtcFNvcnRlckFycmF5KSkge1xuICAgICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKHRtcFNvcnRlckFycmF5LmZpbHRlcigoc29ydGVyKSA9PiBzb3J0ZXIpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNvcnRDb2x1bW5zICYmICFwcmVzZXRTb3J0ZXJzKSB7XG4gICAgICAvLyBidWlsZCB0aGUgb3JkZXJCeSBhcnJheSwgaXQgY291bGQgYmUgbXVsdGlzb3J0LCBleGFtcGxlXG4gICAgICAvLyBvcmRlckJ5Olt7ZmllbGQ6IGxhc3ROYW1lLCBkaXJlY3Rpb246IEFTQ30sIHtmaWVsZDogZmlyc3ROYW1lLCBkaXJlY3Rpb246IERFU0N9XVxuICAgICAgaWYgKHNvcnRDb2x1bW5zICYmIHNvcnRDb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBncmFwaHFsU29ydGVycyA9IG5ldyBBcnJheSh0aGlzLmRlZmF1bHRPcmRlckJ5KTsgLy8gd2hlbiBlbXB0eSwgdXNlIHRoZSBkZWZhdWx0IHNvcnRcbiAgICAgICAgY3VycmVudFNvcnRlcnMgPSBuZXcgQXJyYXkoeyBjb2x1bW5JZDogdGhpcy5kZWZhdWx0T3JkZXJCeS5maWVsZCwgZGlyZWN0aW9uOiB0aGlzLmRlZmF1bHRPcmRlckJ5LmRpcmVjdGlvbiB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzb3J0Q29sdW1ucykge1xuICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIHNvcnRDb2x1bW5zKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5zb3J0Q29sKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRTb3J0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW4uc29ydENvbC5pZCArICcnLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogY29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBncmFwaHFsU29ydGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogKGNvbHVtbi5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uLnNvcnRDb2wucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW4uc29ydENvbC5maWVsZCB8fCBjb2x1bW4uc29ydENvbC5pZCkgKyAnJyxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGNvbHVtbi5zb3J0QXNjID8gU29ydERpcmVjdGlvbi5BU0MgOiBTb3J0RGlyZWN0aW9uLkRFU0NcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8ga2VlcCBjdXJyZW50IFNvcnRlcnMgYW5kIHVwZGF0ZSB0aGUgc2VydmljZSBvcHRpb25zIHdpdGggdGhlIG5ldyBzb3J0aW5nXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBjdXJyZW50U29ydGVycztcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBzb3J0aW5nT3B0aW9uczogZ3JhcGhxbFNvcnRlcnMgfSk7XG4gIH1cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB3aGljaCB0YWtlcyBhbiBpbnB1dCBzdHJpbmcgYW5kIHJlbW92ZXMgZG91YmxlIHF1b3RlcyBvbmx5XG4gICAqIG9uIGNlcnRhaW4gZmllbGRzIGFyZSBpZGVudGlmaWVkIGFzIEdyYXBoUUwgZW51bXMgKGV4Y2VwdCBmaWVsZHMgd2l0aCBkb3Qgbm90YXRpb24pXG4gICAqIEZvciBleGFtcGxlIGxldCBzYXkgd2UgaWRlbnRpZmllZCAoXCJkaXJlY3Rpb246XCIsIFwic29ydFwiKSBhcyB3b3JkIHdoaWNoIGFyZSBHcmFwaFFMIGVudW0gZmllbGRzXG4gICAqIHRoZW4gdGhlIHJlc3VsdCB3aWxsIGJlOlxuICAgKiBGUk9NXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDpcImZpcnN0TmFtZVwiLCBkaXJlY3Rpb246XCJBU0NcIn0gfV0pIH1cbiAgICogVE9cbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOiBmaXJzdE5hbWUsIGRpcmVjdGlvbjogQVNDfX0pfVxuICAgKlxuICAgKiBFWENFUFRJT05TIChmaWVsZHMgd2l0aCBkb3Qgbm90YXRpb24gXCIuXCIgd2hpY2ggYXJlIGluc2lkZSBhIFwiZmllbGQ6XCIpXG4gICAqIHRoZXNlIGZpZWxkcyB3aWxsIGtlZXAgZG91YmxlIHF1b3RlcyB3aGlsZSBldmVyeXRoaW5nIGVsc2Ugd2lsbCBiZSBzdHJpcHBlZCBvZiBkb3VibGUgcXVvdGVzXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDpcImJpbGxpbmcuc3RyZWV0Lm5hbWVcIiwgZGlyZWN0aW9uOiBcIkFTQ1wifSB9XG4gICAqIFRPXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDpcImJpbGxpbmcuc3RyZWV0Lm5hbWVcIiwgZGlyZWN0aW9uOiBBU0N9fVxuICAgKiBAcGFyYW0gaW5wdXRTdHIgaW5wdXQgc3RyaW5nXG4gICAqIEBwYXJhbSBlbnVtU2VhcmNoV29yZHMgYXJyYXkgb2YgZW51bSB3b3JkcyB0byBmaWx0ZXJcbiAgICogQHJldHVybnMgb3V0cHV0U3RyIG91dHB1dCBzdHJpbmdcbiAgICovXG4gIHRyaW1Eb3VibGVRdW90ZXNPbkVudW1GaWVsZChpbnB1dFN0cjogc3RyaW5nLCBlbnVtU2VhcmNoV29yZHM6IHN0cmluZ1tdLCBrZWVwQXJndW1lbnRGaWVsZERvdWJsZVF1b3RlczogYm9vbGVhbikge1xuICAgIGNvbnN0IHBhdHRlcm5Xb3JkSW5RdW90ZXMgPSBgXFxzPygoZmllbGQ6XFxzKik/XCIuKj9cIilgO1xuICAgIGxldCBwYXR0ZXJuUmVnZXggPSBlbnVtU2VhcmNoV29yZHMuam9pbihwYXR0ZXJuV29yZEluUXVvdGVzICsgJ3wnKTtcbiAgICBwYXR0ZXJuUmVnZXggKz0gcGF0dGVybldvcmRJblF1b3RlczsgLy8gdGhlIGxhc3Qgb25lIHNob3VsZCBhbHNvIGhhdmUgdGhlIHBhdHRlcm4gYnV0IHdpdGhvdXQgdGhlIHBpcGUgXCJ8XCJcbiAgICAvLyBleGFtcGxlIHdpdGggKGZpZWxkOiAmIGRpcmVjdGlvbjopOiAgL2ZpZWxkOnM/KFwiLio/XCIpfGRpcmVjdGlvbjpzPyhcIi4qP1wiKS9cbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKHBhdHRlcm5SZWdleCwgJ2cnKTtcblxuICAgIHJldHVybiBpbnB1dFN0ci5yZXBsYWNlKHJlZywgKGdyb3VwMSwgZ3JvdXAyLCBncm91cDMpID0+IHtcbiAgICAgIC8vIHJlbW92ZSBkb3VibGUgcXVvdGVzIGV4Y2VwdCB3aGVuIHRoZSBzdHJpbmcgc3RhcnRzIHdpdGggYSBcImZpZWxkOlwiXG4gICAgICBsZXQgcmVtb3ZlRG91YmxlUXVvdGVzID0gdHJ1ZTtcbiAgICAgIGlmIChncm91cDEuc3RhcnRzV2l0aCgnZmllbGQ6JykgJiYga2VlcEFyZ3VtZW50RmllbGREb3VibGVRdW90ZXMpIHtcbiAgICAgICAgcmVtb3ZlRG91YmxlUXVvdGVzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCByZXAgPSByZW1vdmVEb3VibGVRdW90ZXMgPyBncm91cDEucmVwbGFjZSgvXCIvZywgJycpIDogZ3JvdXAxO1xuICAgICAgcmV0dXJuIHJlcDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIENhc3QgcHJvdmlkZWQgZmlsdGVycyAoY291bGQgYmUgaW4gbXVsdGlwbGUgZm9ybWF0KSBpbnRvIGFuIGFycmF5IG9mIENvbHVtbkZpbHRlclxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xuICAgKi9cbiAgcHJpdmF0ZSBjYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSk6IEN1cnJlbnRGaWx0ZXJbXSB7XG4gICAgLy8ga2VlcCBjdXJyZW50IGZpbHRlcnMgJiBhbHdheXMgc2F2ZSBpdCBhcyBhbiBhcnJheSAoY29sdW1uRmlsdGVycyBjYW4gYmUgYW4gb2JqZWN0IHdoZW4gaXQgaXMgZGVhbHQgYnkgU2xpY2tHcmlkIEZpbHRlcilcbiAgICBjb25zdCBmaWx0ZXJzQXJyYXk6IENvbHVtbkZpbHRlcltdID0gKHR5cGVvZiBjb2x1bW5GaWx0ZXJzID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyhjb2x1bW5GaWx0ZXJzKS5tYXAoa2V5ID0+IGNvbHVtbkZpbHRlcnNba2V5XSkgOiBjb2x1bW5GaWx0ZXJzO1xuXG4gICAgcmV0dXJuIGZpbHRlcnNBcnJheS5tYXAoKGZpbHRlcikgPT4ge1xuICAgICAgY29uc3QgY29sdW1uRGVmID0gZmlsdGVyLmNvbHVtbkRlZjtcbiAgICAgIGNvbnN0IGhlYWRlciA9IChjb2x1bW5EZWYpID8gKGNvbHVtbkRlZi5oZWFkZXJLZXkgfHwgY29sdW1uRGVmLm5hbWUgfHwgJycpIDogJyc7XG4gICAgICBjb25zdCB0bXBGaWx0ZXI6IEN1cnJlbnRGaWx0ZXIgPSB7IGNvbHVtbklkOiBmaWx0ZXIuY29sdW1uSWQgfHwgJycgfTtcbiAgICAgIGlmIChmaWx0ZXIub3BlcmF0b3IpIHtcbiAgICAgICAgdG1wRmlsdGVyLm9wZXJhdG9yID0gZmlsdGVyLm9wZXJhdG9yO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLnNlYXJjaFRlcm1zKSkge1xuICAgICAgICB0bXBGaWx0ZXIuc2VhcmNoVGVybXMgPSBmaWx0ZXIuc2VhcmNoVGVybXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wRmlsdGVyO1xuICAgIH0pO1xuICB9XG59XG4iXX0=