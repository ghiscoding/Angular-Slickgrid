/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FilterConditions } from './../filter-conditions';
import { FieldType, OperatorType } from './../models/index';
import { castToPromise, getDescendantProperty } from './utilities';
import { FilterFactory } from '../filters/filterFactory';
import { Subject } from 'rxjs';
import * as isequal_ from 'lodash.isequal';
/** @type {?} */
var isequal = isequal_;
var FilterService = /** @class */ (function () {
    function FilterService(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject();
        this.onFilterCleared = new Subject();
    }
    Object.defineProperty(FilterService.prototype, "_gridOptions", {
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
    Object.defineProperty(FilterService.prototype, "_columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: /**
         * Getter for the Column Definitions pulled through the Grid Object
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grid
     * @return {?}
     */
    FilterService.prototype.init = /**
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        this._grid = grid;
    };
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     */
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilter = /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @return {?}
     */
    function (grid) {
        var _this = this;
        this._filters = [];
        this._slickSubscriber = new Slick.Event();
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.attachBackendOnFilterSubscribe.bind(this));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        });
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.attachBackendOnFilterSubscribe = /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var backendApi, startTime, query, observableOrPromise, processResult, endTime, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        backendApi = this._gridOptions.backendServiceApi;
                        if (!backendApi || !backendApi.process || !backendApi.service) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        // keep start time & end timestamps & return it after process execution
                        startTime = new Date();
                        // run a preProcess callback if defined
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        // call the service to get a query back
                        return [4 /*yield*/, backendApi.service.processOnFilterChanged(event, args)];
                    case 2:
                        query = _a.sent();
                        // emit an onFilterChanged event
                        if (args && !args.clearFilterTriggered) {
                            this.emitFilterChanged('remote');
                        }
                        // the process could be an Observable (like HttpClient) or a Promise
                        // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 3:
                        processResult = _a.sent();
                        endTime = new Date();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess !== undefined) {
                            if (processResult instanceof Object) {
                                processResult.statistics = {
                                    startTime: startTime,
                                    endTime: endTime,
                                    executionTime: endTime.valueOf() - startTime.valueOf(),
                                    totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
                                };
                            }
                            backendApi.postProcess(processResult);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (backendApi && backendApi.onError) {
                            backendApi.onError(e_1);
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView
     */
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    FilterService.prototype.attachLocalOnFilter = /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        this._filters = [];
        this._dataView = dataView;
        this._slickSubscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this._slickSubscriber.subscribe(function (e, args) {
            /** @type {?} */
            var columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            if (args && !args.clearFilterTriggered) {
                _this.emitFilterChanged('local');
            }
        });
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
            _this.addFilterTemplateToHeaderRow(args);
        });
    };
    /** Clear the search filters (below the column titles) */
    /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    FilterService.prototype.clearFilters = /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    function () {
        this._filters.forEach(function (filter) {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear();
            }
        });
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (var columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
        if (this._dataView) {
            this._dataView.refresh();
            this._grid.invalidate();
            this._grid.render();
        }
        // emit an event when filters are all cleared
        this.onFilterCleared.next(true);
    };
    /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.customLocalFilter = /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    function (dataView, item, args) {
        var e_2, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(args.columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var columnId = _c.value;
                /** @type {?} */
                var columnFilter = args.columnFilters[columnId];
                /** @type {?} */
                var columnIndex = args.grid.getColumnIndex(columnId);
                /** @type {?} */
                var columnDef = args.grid.getColumns()[columnIndex];
                if (!columnDef) {
                    return false;
                }
                /** @type {?} */
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
                /** @type {?} */
                var fieldType = columnDef.type || FieldType.string;
                /** @type {?} */
                var filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
                /** @type {?} */
                var cellValue = item[fieldName];
                // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                if (fieldName.indexOf('.') >= 0) {
                    cellValue = getDescendantProperty(item, fieldName);
                }
                // if we find searchTerms use them but make a deep copy so that we don't affect original array
                // we might have to overwrite the value(s) locally that are returned
                // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
                /** @type {?} */
                var searchValues = (columnFilter && columnFilter.searchTerms) ? tslib_1.__spread(columnFilter.searchTerms) : null;
                /** @type {?} */
                var fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                // make sure it's a string
                /** @type {?} */
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
                // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                /** @type {?} */
                var operator = columnFilter.operator || ((matches) ? matches[1] : '');
                /** @type {?} */
                var searchTerm = (!!matches) ? matches[2] : '';
                /** @type {?} */
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                if (searchValues && searchValues.length > 1) {
                    fieldSearchValue = searchValues.join(',');
                }
                else if (typeof fieldSearchValue === 'string') {
                    // escaping the search value
                    fieldSearchValue = fieldSearchValue.replace("'", "''"); // escape single quotes by doubling them
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
                    }
                }
                // no need to query if search value is empty
                if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
                    return true;
                }
                // if search value has a regex match we will only keep the value without the operator
                // in this case we need to overwrite the returned search values to truncate operator from the string search
                if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
                    searchValues[0] = searchTerm;
                }
                // filter search terms should always be string type (even though we permit the end user to input numbers)
                // so make sure each term are strings, if user has some default search terms, we will cast them to string
                if (searchValues && Array.isArray(searchValues)) {
                    for (var k = 0, ln = searchValues.length; k < ln; k++) {
                        // make sure all search terms are strings
                        searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                    }
                }
                // when using localization (i18n), we should use the formatter output to search as the new cell value
                if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                    /** @type {?} */
                    var rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                    cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
                }
                // make sure cell value is always a string
                if (typeof cellValue === 'number') {
                    cellValue = cellValue.toString();
                }
                /** @type {?} */
                var conditionOptions = {
                    fieldType: fieldType,
                    searchTerms: searchValues,
                    cellValue: cellValue,
                    operator: operator,
                    cellValueLastChar: lastValueChar,
                    filterSearchType: filterSearchType
                };
                if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                    return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return true;
    };
    /**
     * @return {?}
     */
    FilterService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.disposeColumnFilters();
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    };
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     */
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    FilterService.prototype.disposeColumnFilters = /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    function () {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (var columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // also destroy each Filter instances
        this._filters.forEach(function (filter, index) {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        });
    };
    /**
     * @return {?}
     */
    FilterService.prototype.getColumnFilters = /**
     * @return {?}
     */
    function () {
        return this._columnFilters;
    };
    /**
     * @return {?}
     */
    FilterService.prototype.getCurrentLocalFilters = /**
     * @return {?}
     */
    function () {
        var e_3, _a;
        /** @type {?} */
        var currentFilters = [];
        if (this._columnFilters) {
            try {
                for (var _b = tslib_1.__values(Object.keys(this._columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var colId = _c.value;
                    /** @type {?} */
                    var columnFilter = this._columnFilters[colId];
                    /** @type {?} */
                    var columnDef = columnFilter.columnDef;
                    /** @type {?} */
                    var filter = (/** @type {?} */ ({ columnId: colId || '' }));
                    if (columnFilter && columnFilter.searchTerms) {
                        filter.searchTerms = columnFilter.searchTerms;
                    }
                    if (columnFilter.operator) {
                        filter.operator = columnFilter.operator;
                    }
                    if (Array.isArray(filter.searchTerms) && filter.searchTerms.length > 0 && filter.searchTerms[0] !== '') {
                        currentFilters.push(filter);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return currentFilters;
    };
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.callbackSearchEvent = /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        if (args) {
            /** @type {?} */
            var searchTerm = ((e && e.target) ? ((/** @type {?} */ (e.target))).value : undefined);
            /** @type {?} */
            var searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            /** @type {?} */
            var columnDef = args.columnDef || null;
            /** @type {?} */
            var columnId = columnDef ? (columnDef.id || '') : '';
            /** @type {?} */
            var operator = args.operator || undefined;
            /** @type {?} */
            var hasSearchTerms = searchTerms && Array.isArray(searchTerms);
            /** @type {?} */
            var termsCount = hasSearchTerms && searchTerms.length;
            /** @type {?} */
            var oldColumnFilters = tslib_1.__assign({}, this._columnFilters);
            if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                /** @type {?} */
                var colId = (/** @type {?} */ ('' + columnId));
                /** @type {?} */
                var colFilter = {
                    columnId: colId,
                    columnDef: columnDef,
                    searchTerms: searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            // trigger an event only if Filters changed
            if (!isequal(oldColumnFilters, this._columnFilters)) {
                this.triggerEvent(this._slickSubscriber, {
                    clearFilterTriggered: args && args.clearFilterTriggered,
                    columnId: columnId,
                    columnDef: args.columnDef || null,
                    columnFilters: this._columnFilters,
                    operator: operator,
                    searchTerms: searchTerms,
                    serviceOptions: this._onFilterChangedOptions,
                    grid: this._grid
                }, e);
            }
        }
    };
    /**
     * @param {?} args
     * @return {?}
     */
    FilterService.prototype.addFilterTemplateToHeaderRow = /**
     * @param {?} args
     * @return {?}
     */
    function (args) {
        /** @type {?} */
        var columnDef = args.column;
        /** @type {?} */
        var columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            /** @type {?} */
            var searchTerms = void 0;
            /** @type {?} */
            var operator = void 0;
            /** @type {?} */
            var filter_1 = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter_1 && filter_1.operator) || undefined;
            if (this._columnFilters[columnDef.id]) {
                searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                operator = this._columnFilters[columnDef.id].operator || undefined;
            }
            else if (columnDef.filter) {
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
                searchTerms = columnDef.filter.searchTerms || undefined;
                this.updateColumnFilters(searchTerms, columnDef, operator);
            }
            /** @type {?} */
            var filterArguments = {
                grid: this._grid,
                operator: operator,
                searchTerms: searchTerms,
                columnDef: columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            if (filter_1) {
                filter_1.init(filterArguments);
                /** @type {?} */
                var filterExistIndex = this._filters.findIndex(function (filt) { return filter_1.columnDef.name === filt.columnDef.name; });
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter_1);
                }
                else {
                    this._filters[filterExistIndex] = filter_1;
                }
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                if (searchTerms && filter_1.setValues) {
                    filter_1.setValues(searchTerms);
                }
            }
        }
    };
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    FilterService.prototype.emitFilterChanged = /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    function (sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var currentFilters = [];
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = (/** @type {?} */ (backendService.getCurrentFilters()));
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (sender === 'local') {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    };
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     */
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    FilterService.prototype.populateColumnFilterSearchTerms = /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    function () {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            /** @type {?} */
            var filters_1 = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach(function (columnDef) {
                // clear any columnDef searchTerms before applying Presets
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                /** @type {?} */
                var columnPreset = filters_1.find(function (presetFilter) {
                    return presetFilter.columnId === columnDef.id;
                });
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            });
        }
    };
    /**
     * @private
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    FilterService.prototype.updateColumnFilters = /**
     * @private
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    function (searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef: columnDef,
                searchTerms: searchTerms,
                operator: operator
            };
        }
    };
    /**
     * @private
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    FilterService.prototype.triggerEvent = /**
     * @private
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    function (slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
        // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
        /** @type {?} */
        var event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    };
    FilterService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilterService.ctorParameters = function () { return [
        { type: FilterFactory }
    ]; };
    return FilterService;
}());
export { FilterService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._slickSubscriber;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._filters;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._columnFilters;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype._onFilterChangedOptions;
    /** @type {?} */
    FilterService.prototype.onFilterChanged;
    /** @type {?} */
    FilterService.prototype.onFilterCleared;
    /**
     * @type {?}
     * @private
     */
    FilterService.prototype.filterFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBT0wsU0FBUyxFQUVULFlBQVksRUFLYixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFDckMsT0FBTyxHQUFHLFFBQVE7QUFNeEI7SUFZRSx1QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFWeEMsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUkzQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUVXLENBQUM7SUFHckQsc0JBQVksdUNBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFB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QUFHLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxVQUFVLEVBQUU7WUFDckQsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDOztnQkFwZEYsVUFBVTs7OztnQkFURixhQUFhOztJQThkdEIsb0JBQUM7Q0FBQSxBQXJkRCxJQXFkQztTQXBkWSxhQUFhOzs7Ozs7SUFDeEIsc0NBQWlEOzs7OztJQUNqRCx5Q0FBcUM7Ozs7O0lBQ3JDLGlDQUE2Qjs7Ozs7SUFDN0IsdUNBQTJDOzs7OztJQUMzQyxrQ0FBdUI7Ozs7O0lBQ3ZCLDhCQUFtQjs7Ozs7SUFDbkIsZ0RBQXFDOztJQUNyQyx3Q0FBaUQ7O0lBQ2pELHdDQUF5Qzs7Ozs7SUFFN0Isc0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGaWx0ZXJDb25kaXRpb25zIH0gZnJvbSAnLi8uLi9maWx0ZXItY29uZGl0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBDb2x1bW5GaWx0ZXJzLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2tBcmcsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIEN1cnJlbnRGaWx0ZXIsXHJcbiAgU2VhcmNoVGVybSxcclxuICBTbGlja0V2ZW50LFxyXG4gIE9wZXJhdG9yU3RyaW5nXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBjYXN0VG9Qcm9taXNlLCBnZXREZXNjZW5kYW50UHJvcGVydHkgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEZpbHRlckZhY3RvcnkgfSBmcm9tICcuLi9maWx0ZXJzL2ZpbHRlckZhY3RvcnknO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIGlzZXF1YWxfIGZyb20gJ2xvZGFzaC5pc2VxdWFsJztcclxuY29uc3QgaXNlcXVhbCA9IGlzZXF1YWxfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRmlsdGVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX3NsaWNrU3Vic2NyaWJlcjogU2xpY2tFdmVudDtcclxuICBwcml2YXRlIF9maWx0ZXJzOiBhbnlbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2NvbHVtbkZpbHRlcnM6IENvbHVtbkZpbHRlcnMgPSB7fTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBwcml2YXRlIF9vbkZpbHRlckNoYW5nZWRPcHRpb25zOiBhbnk7XHJcbiAgb25GaWx0ZXJDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q3VycmVudEZpbHRlcltdPigpO1xyXG4gIG9uRmlsdGVyQ2xlYXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsdGVyRmFjdG9yeTogRmlsdGVyRmFjdG9yeSkgeyB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0Q29sdW1ucykgPyB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgaW5pdChncmlkOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIGEgYmFja2VuZCBmaWx0ZXIgaG9vayB0byB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxyXG4gICAqL1xyXG4gIGF0dGFjaEJhY2tlbmRPbkZpbHRlcihncmlkOiBhbnkpIHtcclxuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byB0aGUgU2xpY2tHcmlkIGV2ZW50IGFuZCBjYWxsIHRoZSBiYWNrZW5kIGV4ZWN1dGlvblxyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSh0aGlzLmF0dGFjaEJhY2tlbmRPbkZpbHRlclN1YnNjcmliZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gU2xpY2tHcmlkIG9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkIGV2ZW50IHRvIGNyZWF0ZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkhlYWRlclJvd0NlbGxSZW5kZXJlZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5hZGRGaWx0ZXJUZW1wbGF0ZVRvSGVhZGVyUm93KGFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBhdHRhY2hCYWNrZW5kT25GaWx0ZXJTdWJzY3JpYmUoZXZlbnQ6IEV2ZW50LCBhcmdzOiBhbnkpIHtcclxuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgdG8gYXR0YWNoIHRoZSBcImF0dGFjaEJhY2tlbmRPbkZpbHRlclN1YnNjcmliZShldmVudCwgYXJncylcIiBmdW5jdGlvbiwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MgfHwgIWJhY2tlbmRBcGkuc2VydmljZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAvLyBydW4gYSBwcmVQcm9jZXNzIGNhbGxiYWNrIGlmIGRlZmluZWRcclxuICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHRvIGdldCBhIHF1ZXJ5IGJhY2tcclxuICAgICAgY29uc3QgcXVlcnkgPSBhd2FpdCBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudCwgYXJncyk7XHJcblxyXG4gICAgICAvLyBlbWl0IGFuIG9uRmlsdGVyQ2hhbmdlZCBldmVudFxyXG4gICAgICBpZiAoYXJncyAmJiAhYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICAgIHRoaXMuZW1pdEZpbHRlckNoYW5nZWQoJ3JlbW90ZScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxyXG4gICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxyXG4gICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcclxuICAgICAgY29uc3QgcHJvY2Vzc1Jlc3VsdCA9IGF3YWl0IGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSk7XHJcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgLy8gZnJvbSB0aGUgcmVzdWx0LCBjYWxsIG91ciBpbnRlcm5hbCBwb3N0IHByb2Nlc3MgdG8gdXBkYXRlIHRoZSBEYXRhc2V0IGFuZCBQYWdpbmF0aW9uIGluZm9cclxuICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gICAgICBpZiAoYmFja2VuZEFwaS5wb3N0UHJvY2VzcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcclxuICAgICAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICBlbmRUaW1lLFxyXG4gICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXHJcbiAgICAgICAgICAgIHRvdGFsSXRlbUNvdW50OiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIHRoaXMuX2dyaWRPcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtc1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYmFja2VuZEFwaS5wb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLm9uRXJyb3IpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIGEgbG9jYWwgZmlsdGVyIGhvb2sgdG8gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBhdHRhY2hMb2NhbE9uRmlsdGVyKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIGRhdGFWaWV3LnNldEZpbHRlckFyZ3MoeyBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLCBncmlkOiB0aGlzLl9ncmlkIH0pO1xyXG4gICAgZGF0YVZpZXcuc2V0RmlsdGVyKHRoaXMuY3VzdG9tTG9jYWxGaWx0ZXIuYmluZCh0aGlzLCBkYXRhVmlldykpO1xyXG5cclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUoKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gYXJncy5jb2x1bW5JZDtcclxuICAgICAgaWYgKGNvbHVtbklkICE9IG51bGwpIHtcclxuICAgICAgICBkYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGFyZ3MgJiYgIWFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgICB0aGlzLmVtaXRGaWx0ZXJDaGFuZ2VkKCdsb2NhbCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gU2xpY2tHcmlkIG9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkIGV2ZW50IHRvIGNyZWF0ZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkhlYWRlclJvd0NlbGxSZW5kZXJlZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5hZGRGaWx0ZXJUZW1wbGF0ZVRvSGVhZGVyUm93KGFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQ2xlYXIgdGhlIHNlYXJjaCBmaWx0ZXJzIChiZWxvdyB0aGUgY29sdW1uIHRpdGxlcykgKi9cclxuICBjbGVhckZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLl9maWx0ZXJzLmZvckVhY2goKGZpbHRlcjogRmlsdGVyKSA9PiB7XHJcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmNsZWFyKSB7XHJcbiAgICAgICAgLy8gY2xlYXIgZWxlbWVudCBhbmQgdHJpZ2dlciBhIGNoYW5nZVxyXG4gICAgICAgIGZpbHRlci5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uRmlsdGVycyBhbmQgZGVsZXRlIHRoZW0gMSBieSAxXHJcbiAgICAvLyBvbmx5IHRyeWluZyB0byBjbGVhciBjb2x1bW5GaWx0ZXIgKHdpdGhvdXQgbG9vcGluZyB0aHJvdWdoKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbHVtbklkICYmIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgYWxzbyBuZWVkIHRvIHJlZnJlc2ggdGhlIGRhdGFWaWV3IGFuZCBvcHRpb25hbGx5IHRoZSBncmlkIChpdCdzIG9wdGlvbmFsIHNpbmNlIHdlIHVzZSBEYXRhVmlldylcclxuICAgIGlmICh0aGlzLl9kYXRhVmlldykge1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgIHRoaXMuX2dyaWQuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB0aGlzLl9ncmlkLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBmaWx0ZXJzIGFyZSBhbGwgY2xlYXJlZFxyXG4gICAgdGhpcy5vbkZpbHRlckNsZWFyZWQubmV4dCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGN1c3RvbUxvY2FsRmlsdGVyKGRhdGFWaWV3OiBhbnksIGl0ZW06IGFueSwgYXJnczogYW55KSB7XHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIG9mIE9iamVjdC5rZXlzKGFyZ3MuY29sdW1uRmlsdGVycykpIHtcclxuICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gYXJncy5jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBhcmdzLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uSWQpO1xyXG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBhcmdzLmdyaWQuZ2V0Q29sdW1ucygpW2NvbHVtbkluZGV4XTtcclxuICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZDtcclxuICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuICAgICAgY29uc3QgZmlsdGVyU2VhcmNoVHlwZSA9IChjb2x1bW5EZWYuZmlsdGVyU2VhcmNoVHlwZSkgPyBjb2x1bW5EZWYuZmlsdGVyU2VhcmNoVHlwZSA6IG51bGw7XHJcbiAgICAgIGxldCBjZWxsVmFsdWUgPSBpdGVtW2ZpZWxkTmFtZV07XHJcblxyXG4gICAgICAvLyB3aGVuIGl0ZW0gaXMgYSBjb21wbGV4IG9iamVjdCAoZG90IFwiLlwiIG5vdGF0aW9uKSwgd2UgbmVlZCB0byBmaWx0ZXIgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgb2JqZWN0IHRyZWVcclxuICAgICAgaWYgKGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPj0gMCkge1xyXG4gICAgICAgIGNlbGxWYWx1ZSA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShpdGVtLCBmaWVsZE5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiB3ZSBmaW5kIHNlYXJjaFRlcm1zIHVzZSB0aGVtIGJ1dCBtYWtlIGEgZGVlcCBjb3B5IHNvIHRoYXQgd2UgZG9uJ3QgYWZmZWN0IG9yaWdpbmFsIGFycmF5XHJcbiAgICAgIC8vIHdlIG1pZ2h0IGhhdmUgdG8gb3ZlcndyaXRlIHRoZSB2YWx1ZShzKSBsb2NhbGx5IHRoYXQgYXJlIHJldHVybmVkXHJcbiAgICAgIC8vIGUuZzogd2UgZG9uJ3Qgd2FudCB0byBvcGVyYXRvciB3aXRoaW4gdGhlIHNlYXJjaCB2YWx1ZSwgc2luY2UgaXQgd2lsbCBmYWlsIGZpbHRlciBjb25kaXRpb24gY2hlY2sgdHJpZ2dlciBhZnRlcndhcmRcclxuICAgICAgY29uc3Qgc2VhcmNoVmFsdWVzID0gKGNvbHVtbkZpbHRlciAmJiBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMpID8gWy4uLmNvbHVtbkZpbHRlci5zZWFyY2hUZXJtc10gOiBudWxsO1xyXG5cclxuICAgICAgbGV0IGZpZWxkU2VhcmNoVmFsdWUgPSAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVmFsdWVzWzBdIDogJyc7XHJcbiAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXHJcblxyXG4gICAgICBjb25zdCBtYXRjaGVzID0gZmllbGRTZWFyY2hWYWx1ZS5tYXRjaCgvXihbPD4hPVxcKl17MCwyfSkoLipbXjw+IT1cXCpdKShbXFwqXT8pJC8pOyAvLyBncm91cCAxOiBPcGVyYXRvciwgMjogc2VhcmNoVmFsdWUsIDM6IGxhc3QgY2hhciBpcyAnKicgKG1lYW5pbmcgc3RhcnRzIHdpdGgsIGV4LjogYWJjKilcclxuICAgICAgbGV0IG9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yIHx8ICgobWF0Y2hlcykgPyBtYXRjaGVzWzFdIDogJycpO1xyXG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XHJcbiAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XHJcblxyXG4gICAgICBpZiAoc2VhcmNoVmFsdWVzICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlcy5qb2luKCcsJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgLy8gZXNjYXBpbmcgdGhlIHNlYXJjaCB2YWx1ZVxyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSBmaWVsZFNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxyXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgPT09ICcqJykge1xyXG4gICAgICAgICAgb3BlcmF0b3IgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JykgPyBPcGVyYXRvclR5cGUuZW5kc1dpdGggOiBPcGVyYXRvclR5cGUuc3RhcnRzV2l0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XHJcbiAgICAgIGlmIChzZWFyY2hUZXJtID09PSAnJyAmJiAoIXNlYXJjaFZhbHVlcyB8fCAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDApKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiBzZWFyY2ggdmFsdWUgaGFzIGEgcmVnZXggbWF0Y2ggd2Ugd2lsbCBvbmx5IGtlZXAgdGhlIHZhbHVlIHdpdGhvdXQgdGhlIG9wZXJhdG9yXHJcbiAgICAgIC8vIGluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIG92ZXJ3cml0ZSB0aGUgcmV0dXJuZWQgc2VhcmNoIHZhbHVlcyB0byB0cnVuY2F0ZSBvcGVyYXRvciBmcm9tIHRoZSBzdHJpbmcgc2VhcmNoXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoZXMpICYmIG1hdGNoZXMubGVuZ3RoID49IDEgJiYgKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAxKSkge1xyXG4gICAgICAgIHNlYXJjaFZhbHVlc1swXSA9IHNlYXJjaFRlcm07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZpbHRlciBzZWFyY2ggdGVybXMgc2hvdWxkIGFsd2F5cyBiZSBzdHJpbmcgdHlwZSAoZXZlbiB0aG91Z2ggd2UgcGVybWl0IHRoZSBlbmQgdXNlciB0byBpbnB1dCBudW1iZXJzKVxyXG4gICAgICAvLyBzbyBtYWtlIHN1cmUgZWFjaCB0ZXJtIGFyZSBzdHJpbmdzLCBpZiB1c2VyIGhhcyBzb21lIGRlZmF1bHQgc2VhcmNoIHRlcm1zLCB3ZSB3aWxsIGNhc3QgdGhlbSB0byBzdHJpbmdcclxuICAgICAgaWYgKHNlYXJjaFZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykpIHtcclxuICAgICAgICBmb3IgKGxldCBrID0gMCwgbG4gPSBzZWFyY2hWYWx1ZXMubGVuZ3RoOyBrIDwgbG47IGsrKykge1xyXG4gICAgICAgICAgLy8gbWFrZSBzdXJlIGFsbCBzZWFyY2ggdGVybXMgYXJlIHN0cmluZ3NcclxuICAgICAgICAgIHNlYXJjaFZhbHVlc1trXSA9ICgoc2VhcmNoVmFsdWVzW2tdID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVmFsdWVzW2tdID09PSBudWxsKSA/ICcnIDogc2VhcmNoVmFsdWVzW2tdKSArICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2hlbiB1c2luZyBsb2NhbGl6YXRpb24gKGkxOG4pLCB3ZSBzaG91bGQgdXNlIHRoZSBmb3JtYXR0ZXIgb3V0cHV0IHRvIHNlYXJjaCBhcyB0aGUgbmV3IGNlbGwgdmFsdWVcclxuICAgICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMudXNlRm9ybWF0dGVyT3VwdXRUb0ZpbHRlcikge1xyXG4gICAgICAgIGNvbnN0IHJvd0luZGV4ID0gKGRhdGFWaWV3ICYmIHR5cGVvZiBkYXRhVmlldy5nZXRJZHhCeUlkID09PSAnZnVuY3Rpb24nKSA/IGRhdGFWaWV3LmdldElkeEJ5SWQoaXRlbS5pZCkgOiAwO1xyXG4gICAgICAgIGNlbGxWYWx1ZSA9IGNvbHVtbkRlZi5mb3JtYXR0ZXIocm93SW5kZXgsIGNvbHVtbkluZGV4LCBjZWxsVmFsdWUsIGNvbHVtbkRlZiwgaXRlbSwgdGhpcy5fZ3JpZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG1ha2Ugc3VyZSBjZWxsIHZhbHVlIGlzIGFsd2F5cyBhIHN0cmluZ1xyXG4gICAgICBpZiAodHlwZW9mIGNlbGxWYWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBjZWxsVmFsdWUgPSBjZWxsVmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29uZGl0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICBmaWVsZFR5cGUsXHJcbiAgICAgICAgc2VhcmNoVGVybXM6IHNlYXJjaFZhbHVlcyxcclxuICAgICAgICBjZWxsVmFsdWUsXHJcbiAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgY2VsbFZhbHVlTGFzdENoYXI6IGxhc3RWYWx1ZUNoYXIsXHJcbiAgICAgICAgZmlsdGVyU2VhcmNoVHlwZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCFGaWx0ZXJDb25kaXRpb25zLmV4ZWN1dGVNYXBwZWRDb25kaXRpb24oY29uZGl0aW9uT3B0aW9ucykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLmRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCk7XHJcblxyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG5cclxuICAgIC8vIHVuc3Vic2NyaWJlIGxvY2FsIGV2ZW50XHJcbiAgICBpZiAodGhpcy5fc2xpY2tTdWJzY3JpYmVyICYmIHR5cGVvZiB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIG9mIHRoZSBmaWx0ZXJzLCBzaW5jZSBpdCdzIGEgc2luZ2xldG9uLCB3ZSBkb24ndCB3YW50IHRvIGFmZmVjdCBvdGhlciBncmlkcyB3aXRoIHNhbWUgY29sdW1uc1xyXG4gICAqL1xyXG4gIGRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCkge1xyXG4gICAgLy8gd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbkZpbHRlcnMgYW5kIGRlbGV0ZSB0aGVtIDEgYnkgMVxyXG4gICAgLy8gb25seSB0cnlpbmcgdG8gbWFrZSBjb2x1bW5GaWx0ZXIgYW4gZW1wdHkgKHdpdGhvdXQgbG9vcGluZykgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxyXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChjb2x1bW5JZCAmJiB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gZGVzdHJveSBlYWNoIEZpbHRlciBpbnN0YW5jZXNcclxuICAgIHRoaXMuX2ZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5kZXN0cm95KSB7XHJcbiAgICAgICAgZmlsdGVyLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRmlsdGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5GaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3VycmVudExvY2FsRmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10ge1xyXG4gICAgY29uc3QgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBPYmplY3Qua2V5cyh0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdO1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBjb2x1bW5JZDogY29sSWQgfHwgJycgfSBhcyBDdXJyZW50RmlsdGVyO1xyXG5cclxuICAgICAgICBpZiAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcykge1xyXG4gICAgICAgICAgZmlsdGVyLnNlYXJjaFRlcm1zID0gY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29sdW1uRmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgICAgICBmaWx0ZXIub3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5zZWFyY2hUZXJtcykgJiYgZmlsdGVyLnNlYXJjaFRlcm1zLmxlbmd0aCA+IDAgJiYgZmlsdGVyLnNlYXJjaFRlcm1zWzBdICE9PSAnJykge1xyXG4gICAgICAgICAgY3VycmVudEZpbHRlcnMucHVzaChmaWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRGaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgY2FsbGJhY2tTZWFyY2hFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCwgYXJnczogRmlsdGVyQ2FsbGJhY2tBcmcpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoKGUgJiYgZS50YXJnZXQpID8gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybXMgPSAoYXJncy5zZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KGFyZ3Muc2VhcmNoVGVybXMpKSA/IGFyZ3Muc2VhcmNoVGVybXMgOiAoc2VhcmNoVGVybSA/IFtzZWFyY2hUZXJtXSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmIHx8IG51bGw7XHJcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmID8gKGNvbHVtbkRlZi5pZCB8fCAnJykgOiAnJztcclxuICAgICAgY29uc3Qgb3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3QgaGFzU2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKTtcclxuICAgICAgY29uc3QgdGVybXNDb3VudCA9IGhhc1NlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aDtcclxuICAgICAgY29uc3Qgb2xkQ29sdW1uRmlsdGVycyA9IHsgLi4udGhpcy5fY29sdW1uRmlsdGVycyB9O1xyXG5cclxuICAgICAgaWYgKCFoYXNTZWFyY2hUZXJtcyB8fCB0ZXJtc0NvdW50ID09PSAwIHx8ICh0ZXJtc0NvdW50ID09PSAxICYmIHNlYXJjaFRlcm1zWzBdID09PSAnJykpIHtcclxuICAgICAgICAvLyBkZWxldGUgdGhlIHByb3BlcnR5IGZyb20gdGhlIGNvbHVtbkZpbHRlcnMgd2hlbiBpdCBiZWNvbWVzIGVtcHR5XHJcbiAgICAgICAgLy8gd2l0aG91dCBkb2luZyB0aGlzLCBpdCB3b3VsZCBsZWF2ZSBhbiBpbmNvcnJlY3Qgc3RhdGUgb2YgdGhlIHByZXZpb3VzIGNvbHVtbiBmaWx0ZXJzIHdoZW4gZmlsdGVyaW5nIG9uIGFub3RoZXIgY29sdW1uXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbElkID0gJycgKyBjb2x1bW5JZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgY29sRmlsdGVyOiBDb2x1bW5GaWx0ZXIgPSB7XHJcbiAgICAgICAgICBjb2x1bW5JZDogY29sSWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvcGVyYXRvcikge1xyXG4gICAgICAgICAgY29sRmlsdGVyLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdID0gY29sRmlsdGVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0cmlnZ2VyIGFuIGV2ZW50IG9ubHkgaWYgRmlsdGVycyBjaGFuZ2VkXHJcbiAgICAgIGlmICghaXNlcXVhbChvbGRDb2x1bW5GaWx0ZXJzLCB0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHRoaXMuX3NsaWNrU3Vic2NyaWJlciwge1xyXG4gICAgICAgICAgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IGFyZ3MgJiYgYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCxcclxuICAgICAgICAgIGNvbHVtbklkLFxyXG4gICAgICAgICAgY29sdW1uRGVmOiBhcmdzLmNvbHVtbkRlZiB8fCBudWxsLFxyXG4gICAgICAgICAgY29sdW1uRmlsdGVyczogdGhpcy5fY29sdW1uRmlsdGVycyxcclxuICAgICAgICAgIG9wZXJhdG9yLFxyXG4gICAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgICBzZXJ2aWNlT3B0aW9uczogdGhpcy5fb25GaWx0ZXJDaGFuZ2VkT3B0aW9ucyxcclxuICAgICAgICAgIGdyaWQ6IHRoaXMuX2dyaWRcclxuICAgICAgICB9LCBlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzOiB7IGNvbHVtbjogQ29sdW1uOyBncmlkOiBhbnk7IG5vZGU6IGFueSB9KSB7XHJcbiAgICBjb25zdCBjb2x1bW5EZWYgPSBhcmdzLmNvbHVtbjtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmLmlkIHx8ICcnO1xyXG5cclxuICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uSWQgIT09ICdzZWxlY3RvcicgJiYgY29sdW1uRGVmLmZpbHRlcmFibGUpIHtcclxuICAgICAgbGV0IHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQ7XHJcbiAgICAgIGxldCBvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcgfCBPcGVyYXRvclR5cGU7XHJcbiAgICAgIGNvbnN0IGZpbHRlcjogRmlsdGVyIHwgdW5kZWZpbmVkID0gdGhpcy5maWx0ZXJGYWN0b3J5LmNyZWF0ZUZpbHRlcihhcmdzLmNvbHVtbi5maWx0ZXIpO1xyXG4gICAgICBvcGVyYXRvciA9IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB8fCAoZmlsdGVyICYmIGZpbHRlci5vcGVyYXRvcikgfHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXSkge1xyXG4gICAgICAgIHNlYXJjaFRlcm1zID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdLnNlYXJjaFRlcm1zIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICBvcGVyYXRvciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXS5vcGVyYXRvciB8fCB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sdW1uRGVmLmZpbHRlcikge1xyXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcclxuICAgICAgICAvLyBiZWNhdXNlIG9mIHRoYXQgd2UgbmVlZCB0byBmaXJzdCBnZXQgc2VhcmNoVGVybShzKSBmcm9tIHRoZSBjb2x1bW5GaWx0ZXJzICh0aGF0IGlzIHdoYXQgdGhlIHVzZXIgbGFzdCBlbnRlcmVkKVxyXG4gICAgICAgIHNlYXJjaFRlcm1zID0gY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcyB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5GaWx0ZXJzKHNlYXJjaFRlcm1zLCBjb2x1bW5EZWYsIG9wZXJhdG9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmlsdGVyQXJndW1lbnRzOiBGaWx0ZXJBcmd1bWVudHMgPSB7XHJcbiAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZCxcclxuICAgICAgICBvcGVyYXRvcixcclxuICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tTZWFyY2hFdmVudC5iaW5kKHRoaXMpXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgICAgZmlsdGVyLmluaXQoZmlsdGVyQXJndW1lbnRzKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJFeGlzdEluZGV4ID0gdGhpcy5fZmlsdGVycy5maW5kSW5kZXgoKGZpbHQpID0+IGZpbHRlci5jb2x1bW5EZWYubmFtZSA9PT0gZmlsdC5jb2x1bW5EZWYubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0byB0aGUgZmlsdGVycyBhcnJheXMgb3IgcmVwbGFjZSBpdCB3aGVuIGZvdW5kXHJcbiAgICAgICAgaWYgKGZpbHRlckV4aXN0SW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLl9maWx0ZXJzLnB1c2goZmlsdGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fZmlsdGVyc1tmaWx0ZXJFeGlzdEluZGV4XSA9IGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcclxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGFsc28gc2V0IGFnYWluIHRoZSB2YWx1ZXMgaW4gdGhlIERPTSBlbGVtZW50cyBpZiB0aGUgdmFsdWVzIHdlcmUgc2V0IGJ5IGEgc2VhcmNoVGVybShzKVxyXG4gICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBmaWx0ZXIuc2V0VmFsdWVzKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuc2V0VmFsdWVzKHNlYXJjaFRlcm1zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2ltcGxlIGZ1bmN0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHN1YnNjcmliZXIgYW5kIGVtaXQgYSBjaGFuZ2Ugd2hlbiB0aGUgc29ydCBpcyBjYWxsZWQuXHJcbiAgICogT3RoZXIgc2VydmljZXMsIGxpa2UgUGFnaW5hdGlvbiwgY2FuIHRoZW4gc3Vic2NyaWJlIHRvIGl0LlxyXG4gICAqIEBwYXJhbSBzZW5kZXJcclxuICAgKi9cclxuICBlbWl0RmlsdGVyQ2hhbmdlZChzZW5kZXI6ICdsb2NhbCcgfCAncmVtb3RlJykge1xyXG4gICAgaWYgKHNlbmRlciA9PT0gJ3JlbW90ZScgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgbGV0IGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10gPSBbXTtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xyXG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMpIHtcclxuICAgICAgICBjdXJyZW50RmlsdGVycyA9IGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRGaWx0ZXJzKCkgYXMgQ3VycmVudEZpbHRlcltdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2VkLm5leHQoY3VycmVudEZpbHRlcnMpO1xyXG4gICAgfSBlbHNlIGlmIChzZW5kZXIgPT09ICdsb2NhbCcpIHtcclxuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dCh0aGlzLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHVzZXIgcGFzc2VzIGFuIGFycmF5IG9mIHByZXNldCBmaWx0ZXJzLCB3ZSBuZWVkIHRvIHByZS1wb3B1bGF0ZSBlYWNoIGNvbHVtbiBmaWx0ZXIgc2VhcmNoVGVybShzKVxyXG4gICAqIFRoZSBwcm9jZXNzIGlzIHRvIGxvb3AgdGhyb3VnaCB0aGUgcHJlc2V0IGZpbHRlcnMgYXJyYXksIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uIGZyb20gY29sdW1uRGVmaW5pdGlvbnMgYW5kIGZpbGwgaW4gdGhlIGZpbHRlciBvYmplY3Qgc2VhcmNoVGVybShzKVxyXG4gICAqIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBzYW1lIGFzIGlmIHdlIHdvdWxkIG1hbnVhbGx5IGFkZCBzZWFyY2hUZXJtKHMpIHRvIGEgY29sdW1uIGZpbHRlciBvYmplY3QgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLCBidXQgd2UgZG8gaXQgcHJvZ3JhbW1hdGljYWxseS5cclxuICAgKiBBdCB0aGUgZW5kIG9mIHRoZSBkYXksIHdoZW4gY3JlYXRpbmcgdGhlIEZpbHRlciAoRE9NIEVsZW1lbnQpLCBpdCB3aWxsIHVzZSB0aGVzZSBzZWFyY2hUZXJtKHMpIHNvIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGF0IHdpdGhvdXQgcmVjb2RpbmcgZWFjaCBGaWx0ZXIgdHlwZSAoRE9NIGVsZW1lbnQpXHJcbiAgICovXHJcbiAgcG9wdWxhdGVDb2x1bW5GaWx0ZXJTZWFyY2hUZXJtcygpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkodGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzO1xyXG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4gIHtcclxuICAgICAgICAvLyBjbGVhciBhbnkgY29sdW1uRGVmIHNlYXJjaFRlcm1zIGJlZm9yZSBhcHBseWluZyBQcmVzZXRzXHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZi5maWx0ZXIgJiYgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcykge1xyXG4gICAgICAgICAgZGVsZXRlIGNvbHVtbkRlZi5maWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmcm9tIGVhY2ggcHJlc2V0cywgd2Ugd2lsbCBmaW5kIHRoZSBhc3NvY2lhdGVkIGNvbHVtbkRlZiBhbmQgYXBwbHkgdGhlIHByZXNldCBzZWFyY2hUZXJtcyAmIG9wZXJhdG9yIGlmIHRoZXJlIGlzXHJcbiAgICAgICAgY29uc3QgY29sdW1uUHJlc2V0ID0gZmlsdGVycy5maW5kKChwcmVzZXRGaWx0ZXI6IEN1cnJlbnRGaWx0ZXIpID0+IHtcclxuICAgICAgICAgIHJldHVybiBwcmVzZXRGaWx0ZXIuY29sdW1uSWQgPT09IGNvbHVtbkRlZi5pZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoY29sdW1uUHJlc2V0ICYmIGNvbHVtblByZXNldC5zZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KGNvbHVtblByZXNldC5zZWFyY2hUZXJtcykpIHtcclxuICAgICAgICAgIGNvbHVtbkRlZi5maWx0ZXIgPSBjb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciA9IGNvbHVtblByZXNldC5vcGVyYXRvciB8fCBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yIHx8ICcnO1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcyA9IGNvbHVtblByZXNldC5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVDb2x1bW5GaWx0ZXJzKHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQsIGNvbHVtbkRlZjogYW55LCBvcGVyYXRvcj86IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XHJcbiAgICBpZiAoc2VhcmNoVGVybXMgJiYgY29sdW1uRGVmKSB7XHJcbiAgICAgIC8vIHRoaXMuX2NvbHVtbkZpbHRlcnMuc2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcztcclxuICAgICAgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdID0ge1xyXG4gICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYuaWQsXHJcbiAgICAgICAgY29sdW1uRGVmLFxyXG4gICAgICAgIHNlYXJjaFRlcm1zLFxyXG4gICAgICAgIG9wZXJhdG9yXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRyaWdnZXJFdmVudChzbGlja0V2ZW50OiBhbnksIGFyZ3M6IGFueSwgZTogYW55KSB7XHJcbiAgICBzbGlja0V2ZW50ID0gc2xpY2tFdmVudCB8fCBuZXcgU2xpY2suRXZlbnQoKTtcclxuXHJcbiAgICAvLyBldmVudCBtaWdodCBoYXZlIGJlZW4gY3JlYXRlZCBhcyBhIEN1c3RvbUV2ZW50IChlLmcuIENvbXBvdW5kRGF0ZUZpbHRlciksIHdpdGhvdXQgYmVpbmcgYSB2YWxpZCBTbGljay5FdmVudERhdGEuXHJcbiAgICAvLyBpZiBzbyB3ZSB3aWxsIGNyZWF0ZSBhIG5ldyBTbGljay5FdmVudERhdGEgYW5kIG1lcmdlIGl0IHdpdGggdGhhdCBDdXN0b21FdmVudCB0byBhdm9pZCBoYXZpbmcgU2xpY2tHcmlkIGVycm9yc1xyXG4gICAgbGV0IGV2ZW50ID0gZTtcclxuICAgIGlmIChlICYmIHR5cGVvZiBlLmlzUHJvcGFnYXRpb25TdG9wcGVkICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGV2ZW50ID0gJC5leHRlbmQoe30sIG5ldyBTbGljay5FdmVudERhdGEoKSwgZSk7XHJcbiAgICB9XHJcbiAgICBzbGlja0V2ZW50Lm5vdGlmeShhcmdzLCBldmVudCwgYXJncy5ncmlkKTtcclxuICB9XHJcbn1cclxuIl19