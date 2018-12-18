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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBT0wsU0FBUyxFQUVULFlBQVksRUFLYixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFDckMsT0FBTyxHQUFHLFFBQVE7QUFNeEI7SUFZRSx1QkFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFWeEMsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUkzQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUVXLENBQUM7SUFHckQsc0JBQVksdUNBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFB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QUFHLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxVQUFVLEVBQUU7WUFDckQsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDOztnQkFwZEYsVUFBVTs7OztnQkFURixhQUFhOztJQThkdEIsb0JBQUM7Q0FBQSxBQXJkRCxJQXFkQztTQXBkWSxhQUFhOzs7Ozs7SUFDeEIsc0NBQWlEOzs7OztJQUNqRCx5Q0FBcUM7Ozs7O0lBQ3JDLGlDQUE2Qjs7Ozs7SUFDN0IsdUNBQTJDOzs7OztJQUMzQyxrQ0FBdUI7Ozs7O0lBQ3ZCLDhCQUFtQjs7Ozs7SUFDbkIsZ0RBQXFDOztJQUNyQyx3Q0FBaUQ7O0lBQ2pELHdDQUF5Qzs7Ozs7SUFFN0Isc0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9ucyB9IGZyb20gJy4vLi4vZmlsdGVyLWNvbmRpdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIENvbHVtbkZpbHRlcnMsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFja0FyZyxcbiAgRmllbGRUeXBlLFxuICBHcmlkT3B0aW9uLFxuICBPcGVyYXRvclR5cGUsXG4gIEN1cnJlbnRGaWx0ZXIsXG4gIFNlYXJjaFRlcm0sXG4gIFNsaWNrRXZlbnQsXG4gIE9wZXJhdG9yU3RyaW5nXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UsIGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7IEZpbHRlckZhY3RvcnkgfSBmcm9tICcuLi9maWx0ZXJzL2ZpbHRlckZhY3RvcnknO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgaXNlcXVhbF8gZnJvbSAnbG9kYXNoLmlzZXF1YWwnO1xuY29uc3QgaXNlcXVhbCA9IGlzZXF1YWxfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpbHRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XG4gIHByaXZhdGUgX3NsaWNrU3Vic2NyaWJlcjogU2xpY2tFdmVudDtcbiAgcHJpdmF0ZSBfZmlsdGVyczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBfY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyA9IHt9O1xuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xuICBwcml2YXRlIF9ncmlkOiBhbnk7XG4gIHByaXZhdGUgX29uRmlsdGVyQ2hhbmdlZE9wdGlvbnM6IGFueTtcbiAgb25GaWx0ZXJDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q3VycmVudEZpbHRlcltdPigpO1xuICBvbkZpbHRlckNsZWFyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlsdGVyRmFjdG9yeTogRmlsdGVyRmFjdG9yeSkgeyB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0Q29sdW1ucykgPyB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSA6IFtdO1xuICB9XG5cbiAgaW5pdChncmlkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBiYWNrZW5kIGZpbHRlciBob29rIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxuICAgKi9cbiAgYXR0YWNoQmFja2VuZE9uRmlsdGVyKGdyaWQ6IGFueSkge1xuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBuZXcgU2xpY2suRXZlbnQoKTtcblxuICAgIC8vIHN1YnNjcmliZSB0byB0aGUgU2xpY2tHcmlkIGV2ZW50IGFuZCBjYWxsIHRoZSBiYWNrZW5kIGV4ZWN1dGlvblxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUodGhpcy5hdHRhY2hCYWNrZW5kT25GaWx0ZXJTdWJzY3JpYmUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gU2xpY2tHcmlkIG9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkIGV2ZW50IHRvIGNyZWF0ZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWQub25IZWFkZXJSb3dDZWxsUmVuZGVyZWQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XG4gICAgICB0aGlzLmFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBhdHRhY2hCYWNrZW5kT25GaWx0ZXJTdWJzY3JpYmUoZXZlbnQ6IEV2ZW50LCBhcmdzOiBhbnkpIHtcbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuZ3JpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdHRhY2ggdGhlIFwiYXR0YWNoQmFja2VuZE9uRmlsdGVyU3Vic2NyaWJlKGV2ZW50LCBhcmdzKVwiIGZ1bmN0aW9uLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XG4gICAgfVxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgLy8gcnVuIGEgcHJlUHJvY2VzcyBjYWxsYmFjayBpZiBkZWZpbmVkXG4gICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XG4gICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIHRoZSBzZXJ2aWNlIHRvIGdldCBhIHF1ZXJ5IGJhY2tcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYXdhaXQgYmFja2VuZEFwaS5zZXJ2aWNlLnByb2Nlc3NPbkZpbHRlckNoYW5nZWQoZXZlbnQsIGFyZ3MpO1xuXG4gICAgICAvLyBlbWl0IGFuIG9uRmlsdGVyQ2hhbmdlZCBldmVudFxuICAgICAgaWYgKGFyZ3MgJiYgIWFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZCgncmVtb3RlJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSBwcm9jZXNzIGNvdWxkIGJlIGFuIE9ic2VydmFibGUgKGxpa2UgSHR0cENsaWVudCkgb3IgYSBQcm9taXNlXG4gICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxuICAgICAgY29uc3Qgb2JzZXJ2YWJsZU9yUHJvbWlzZSA9IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSk7XG4gICAgICBjb25zdCBwcm9jZXNzUmVzdWx0ID0gYXdhaXQgY2FzdFRvUHJvbWlzZShvYnNlcnZhYmxlT3JQcm9taXNlKTtcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAvLyBmcm9tIHRoZSByZXN1bHQsIGNhbGwgb3VyIGludGVybmFsIHBvc3QgcHJvY2VzcyB0byB1cGRhdGUgdGhlIERhdGFzZXQgYW5kIFBhZ2luYXRpb24gaW5mb1xuICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XG4gICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcbiAgICAgIH1cblxuICAgICAgLy8gc2VuZCB0aGUgcmVzcG9uc2UgcHJvY2VzcyB0byB0aGUgcG9zdFByb2Nlc3MgY2FsbGJhY2tcbiAgICAgIGlmIChiYWNrZW5kQXBpLnBvc3RQcm9jZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XG4gICAgICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgICAgICBlbmRUaW1lLFxuICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxuICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgdGhpcy5fZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub25FcnJvcikge1xuICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBsb2NhbCBmaWx0ZXIgaG9vayB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcbiAgICogQHBhcmFtIGRhdGFWaWV3XG4gICAqL1xuICBhdHRhY2hMb2NhbE9uRmlsdGVyKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xuXG4gICAgZGF0YVZpZXcuc2V0RmlsdGVyQXJncyh7IGNvbHVtbkZpbHRlcnM6IHRoaXMuX2NvbHVtbkZpbHRlcnMsIGdyaWQ6IHRoaXMuX2dyaWQgfSk7XG4gICAgZGF0YVZpZXcuc2V0RmlsdGVyKHRoaXMuY3VzdG9tTG9jYWxGaWx0ZXIuYmluZCh0aGlzLCBkYXRhVmlldykpO1xuXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSgoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gYXJncy5jb2x1bW5JZDtcbiAgICAgIGlmIChjb2x1bW5JZCAhPSBudWxsKSB7XG4gICAgICAgIGRhdGFWaWV3LnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmdzICYmICFhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XG4gICAgICAgIHRoaXMuZW1pdEZpbHRlckNoYW5nZWQoJ2xvY2FsJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gU2xpY2tHcmlkIG9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkIGV2ZW50IHRvIGNyZWF0ZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWQub25IZWFkZXJSb3dDZWxsUmVuZGVyZWQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XG4gICAgICB0aGlzLmFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJncyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQ2xlYXIgdGhlIHNlYXJjaCBmaWx0ZXJzIChiZWxvdyB0aGUgY29sdW1uIHRpdGxlcykgKi9cbiAgY2xlYXJGaWx0ZXJzKCkge1xuICAgIHRoaXMuX2ZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyOiBGaWx0ZXIpID0+IHtcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmNsZWFyKSB7XG4gICAgICAgIC8vIGNsZWFyIGVsZW1lbnQgYW5kIHRyaWdnZXIgYSBjaGFuZ2VcbiAgICAgICAgZmlsdGVyLmNsZWFyKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uRmlsdGVycyBhbmQgZGVsZXRlIHRoZW0gMSBieSAxXG4gICAgLy8gb25seSB0cnlpbmcgdG8gY2xlYXIgY29sdW1uRmlsdGVyICh3aXRob3V0IGxvb3BpbmcgdGhyb3VnaCkgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gdGhpcy5fY29sdW1uRmlsdGVycykge1xuICAgICAgaWYgKGNvbHVtbklkICYmIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gcmVmcmVzaCB0aGUgZGF0YVZpZXcgYW5kIG9wdGlvbmFsbHkgdGhlIGdyaWQgKGl0J3Mgb3B0aW9uYWwgc2luY2Ugd2UgdXNlIERhdGFWaWV3KVxuICAgIGlmICh0aGlzLl9kYXRhVmlldykge1xuICAgICAgdGhpcy5fZGF0YVZpZXcucmVmcmVzaCgpO1xuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XG4gICAgICB0aGlzLl9ncmlkLnJlbmRlcigpO1xuICAgIH1cblxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBmaWx0ZXJzIGFyZSBhbGwgY2xlYXJlZFxuICAgIHRoaXMub25GaWx0ZXJDbGVhcmVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBjdXN0b21Mb2NhbEZpbHRlcihkYXRhVmlldzogYW55LCBpdGVtOiBhbnksIGFyZ3M6IGFueSkge1xuICAgIGZvciAoY29uc3QgY29sdW1uSWQgb2YgT2JqZWN0LmtleXMoYXJncy5jb2x1bW5GaWx0ZXJzKSkge1xuICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gYXJncy5jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gYXJncy5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbklkKTtcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5zKClbY29sdW1uSW5kZXhdO1xuICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5EZWYuZmllbGQ7XG4gICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xuICAgICAgY29uc3QgZmlsdGVyU2VhcmNoVHlwZSA9IChjb2x1bW5EZWYuZmlsdGVyU2VhcmNoVHlwZSkgPyBjb2x1bW5EZWYuZmlsdGVyU2VhcmNoVHlwZSA6IG51bGw7XG4gICAgICBsZXQgY2VsbFZhbHVlID0gaXRlbVtmaWVsZE5hbWVdO1xuXG4gICAgICAvLyB3aGVuIGl0ZW0gaXMgYSBjb21wbGV4IG9iamVjdCAoZG90IFwiLlwiIG5vdGF0aW9uKSwgd2UgbmVlZCB0byBmaWx0ZXIgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgb2JqZWN0IHRyZWVcbiAgICAgIGlmIChmaWVsZE5hbWUuaW5kZXhPZignLicpID49IDApIHtcbiAgICAgICAgY2VsbFZhbHVlID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGl0ZW0sIGZpZWxkTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHdlIGZpbmQgc2VhcmNoVGVybXMgdXNlIHRoZW0gYnV0IG1ha2UgYSBkZWVwIGNvcHkgc28gdGhhdCB3ZSBkb24ndCBhZmZlY3Qgb3JpZ2luYWwgYXJyYXlcbiAgICAgIC8vIHdlIG1pZ2h0IGhhdmUgdG8gb3ZlcndyaXRlIHRoZSB2YWx1ZShzKSBsb2NhbGx5IHRoYXQgYXJlIHJldHVybmVkXG4gICAgICAvLyBlLmc6IHdlIGRvbid0IHdhbnQgdG8gb3BlcmF0b3Igd2l0aGluIHRoZSBzZWFyY2ggdmFsdWUsIHNpbmNlIGl0IHdpbGwgZmFpbCBmaWx0ZXIgY29uZGl0aW9uIGNoZWNrIHRyaWdnZXIgYWZ0ZXJ3YXJkXG4gICAgICBjb25zdCBzZWFyY2hWYWx1ZXMgPSAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcykgPyBbLi4uY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zXSA6IG51bGw7XG5cbiAgICAgIGxldCBmaWVsZFNlYXJjaFZhbHVlID0gKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAxKSA/IHNlYXJjaFZhbHVlc1swXSA6ICcnO1xuICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnICsgZmllbGRTZWFyY2hWYWx1ZTsgLy8gbWFrZSBzdXJlIGl0J3MgYSBzdHJpbmdcblxuICAgICAgY29uc3QgbWF0Y2hlcyA9IGZpZWxkU2VhcmNoVmFsdWUubWF0Y2goL14oWzw+IT1cXCpdezAsMn0pKC4qW148PiE9XFwqXSkoW1xcKl0/KSQvKTsgLy8gZ3JvdXAgMTogT3BlcmF0b3IsIDI6IHNlYXJjaFZhbHVlLCAzOiBsYXN0IGNoYXIgaXMgJyonIChtZWFuaW5nIHN0YXJ0cyB3aXRoLCBleC46IGFiYyopXG4gICAgICBsZXQgb3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3IgfHwgKChtYXRjaGVzKSA/IG1hdGNoZXNbMV0gOiAnJyk7XG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XG4gICAgICBjb25zdCBsYXN0VmFsdWVDaGFyID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzNdIDogKG9wZXJhdG9yID09PSAnKnonID8gJyonIDogJycpO1xuXG4gICAgICBpZiAoc2VhcmNoVmFsdWVzICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZXMuam9pbignLCcpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gZXNjYXBpbmcgdGhlIHNlYXJjaCB2YWx1ZVxuICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gZmllbGRTZWFyY2hWYWx1ZS5yZXBsYWNlKGAnYCwgYCcnYCk7IC8vIGVzY2FwZSBzaW5nbGUgcXVvdGVzIGJ5IGRvdWJsaW5nIHRoZW1cbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICdhKicgfHwgb3BlcmF0b3IgPT09ICcqeicgfHwgbGFzdFZhbHVlQ2hhciA9PT0gJyonKSB7XG4gICAgICAgICAgb3BlcmF0b3IgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JykgPyBPcGVyYXRvclR5cGUuZW5kc1dpdGggOiBPcGVyYXRvclR5cGUuc3RhcnRzV2l0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBubyBuZWVkIHRvIHF1ZXJ5IGlmIHNlYXJjaCB2YWx1ZSBpcyBlbXB0eVxuICAgICAgaWYgKHNlYXJjaFRlcm0gPT09ICcnICYmICghc2VhcmNoVmFsdWVzIHx8IChBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA9PT0gMCkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBzZWFyY2ggdmFsdWUgaGFzIGEgcmVnZXggbWF0Y2ggd2Ugd2lsbCBvbmx5IGtlZXAgdGhlIHZhbHVlIHdpdGhvdXQgdGhlIG9wZXJhdG9yXG4gICAgICAvLyBpbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBvdmVyd3JpdGUgdGhlIHJldHVybmVkIHNlYXJjaCB2YWx1ZXMgdG8gdHJ1bmNhdGUgb3BlcmF0b3IgZnJvbSB0aGUgc3RyaW5nIHNlYXJjaFxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2hlcykgJiYgbWF0Y2hlcy5sZW5ndGggPj0gMSAmJiAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDEpKSB7XG4gICAgICAgIHNlYXJjaFZhbHVlc1swXSA9IHNlYXJjaFRlcm07XG4gICAgICB9XG5cbiAgICAgIC8vIGZpbHRlciBzZWFyY2ggdGVybXMgc2hvdWxkIGFsd2F5cyBiZSBzdHJpbmcgdHlwZSAoZXZlbiB0aG91Z2ggd2UgcGVybWl0IHRoZSBlbmQgdXNlciB0byBpbnB1dCBudW1iZXJzKVxuICAgICAgLy8gc28gbWFrZSBzdXJlIGVhY2ggdGVybSBhcmUgc3RyaW5ncywgaWYgdXNlciBoYXMgc29tZSBkZWZhdWx0IHNlYXJjaCB0ZXJtcywgd2Ugd2lsbCBjYXN0IHRoZW0gdG8gc3RyaW5nXG4gICAgICBpZiAoc2VhcmNoVmFsdWVzICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSkge1xuICAgICAgICBmb3IgKGxldCBrID0gMCwgbG4gPSBzZWFyY2hWYWx1ZXMubGVuZ3RoOyBrIDwgbG47IGsrKykge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgc2VhcmNoIHRlcm1zIGFyZSBzdHJpbmdzXG4gICAgICAgICAgc2VhcmNoVmFsdWVzW2tdID0gKChzZWFyY2hWYWx1ZXNba10gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hWYWx1ZXNba10gPT09IG51bGwpID8gJycgOiBzZWFyY2hWYWx1ZXNba10pICsgJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiB1c2luZyBsb2NhbGl6YXRpb24gKGkxOG4pLCB3ZSBzaG91bGQgdXNlIHRoZSBmb3JtYXR0ZXIgb3V0cHV0IHRvIHNlYXJjaCBhcyB0aGUgbmV3IGNlbGwgdmFsdWVcbiAgICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLnVzZUZvcm1hdHRlck91cHV0VG9GaWx0ZXIpIHtcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSAoZGF0YVZpZXcgJiYgdHlwZW9mIGRhdGFWaWV3LmdldElkeEJ5SWQgPT09ICdmdW5jdGlvbicpID8gZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtLmlkKSA6IDA7XG4gICAgICAgIGNlbGxWYWx1ZSA9IGNvbHVtbkRlZi5mb3JtYXR0ZXIocm93SW5kZXgsIGNvbHVtbkluZGV4LCBjZWxsVmFsdWUsIGNvbHVtbkRlZiwgaXRlbSwgdGhpcy5fZ3JpZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBjZWxsIHZhbHVlIGlzIGFsd2F5cyBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjZWxsVmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNlbGxWYWx1ZSA9IGNlbGxWYWx1ZS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25kaXRpb25PcHRpb25zID0ge1xuICAgICAgICBmaWVsZFR5cGUsXG4gICAgICAgIHNlYXJjaFRlcm1zOiBzZWFyY2hWYWx1ZXMsXG4gICAgICAgIGNlbGxWYWx1ZSxcbiAgICAgICAgb3BlcmF0b3IsXG4gICAgICAgIGNlbGxWYWx1ZUxhc3RDaGFyOiBsYXN0VmFsdWVDaGFyLFxuICAgICAgICBmaWx0ZXJTZWFyY2hUeXBlXG4gICAgICB9O1xuXG4gICAgICBpZiAoIUZpbHRlckNvbmRpdGlvbnMuZXhlY3V0ZU1hcHBlZENvbmRpdGlvbihjb25kaXRpb25PcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuZGlzcG9zZUNvbHVtbkZpbHRlcnMoKTtcblxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XG5cbiAgICAvLyB1bnN1YnNjcmliZSBsb2NhbCBldmVudFxuICAgIGlmICh0aGlzLl9zbGlja1N1YnNjcmliZXIgJiYgdHlwZW9mIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2Ugb2YgdGhlIGZpbHRlcnMsIHNpbmNlIGl0J3MgYSBzaW5nbGV0b24sIHdlIGRvbid0IHdhbnQgdG8gYWZmZWN0IG90aGVyIGdyaWRzIHdpdGggc2FtZSBjb2x1bW5zXG4gICAqL1xuICBkaXNwb3NlQ29sdW1uRmlsdGVycygpIHtcbiAgICAvLyB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uRmlsdGVycyBhbmQgZGVsZXRlIHRoZW0gMSBieSAxXG4gICAgLy8gb25seSB0cnlpbmcgdG8gbWFrZSBjb2x1bW5GaWx0ZXIgYW4gZW1wdHkgKHdpdGhvdXQgbG9vcGluZykgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gdGhpcy5fY29sdW1uRmlsdGVycykge1xuICAgICAgaWYgKGNvbHVtbklkICYmIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhbHNvIGRlc3Ryb3kgZWFjaCBGaWx0ZXIgaW5zdGFuY2VzXG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5kZXN0cm95KSB7XG4gICAgICAgIGZpbHRlci5kZXN0cm95KHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29sdW1uRmlsdGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uRmlsdGVycztcbiAgfVxuXG4gIGdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKTogQ3VycmVudEZpbHRlcltdIHtcbiAgICBjb25zdCBjdXJyZW50RmlsdGVyczogQ3VycmVudEZpbHRlcltdID0gW107XG4gICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcbiAgICAgIGZvciAoY29uc3QgY29sSWQgb2YgT2JqZWN0LmtleXModGhpcy5fY29sdW1uRmlsdGVycykpIHtcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2xJZF07XG4gICAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgY29sdW1uSWQ6IGNvbElkIHx8ICcnIH0gYXMgQ3VycmVudEZpbHRlcjtcblxuICAgICAgICBpZiAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcykge1xuICAgICAgICAgIGZpbHRlci5zZWFyY2hUZXJtcyA9IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uRmlsdGVyLm9wZXJhdG9yKSB7XG4gICAgICAgICAgZmlsdGVyLm9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5zZWFyY2hUZXJtcykgJiYgZmlsdGVyLnNlYXJjaFRlcm1zLmxlbmd0aCA+IDAgJiYgZmlsdGVyLnNlYXJjaFRlcm1zWzBdICE9PSAnJykge1xuICAgICAgICAgIGN1cnJlbnRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudEZpbHRlcnM7XG4gIH1cblxuICBjYWxsYmFja1NlYXJjaEV2ZW50KGU6IEV2ZW50IHwgdW5kZWZpbmVkLCBhcmdzOiBGaWx0ZXJDYWxsYmFja0FyZykge1xuICAgIGlmIChhcmdzKSB7XG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gKChlICYmIGUudGFyZ2V0KSA/IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA6IHVuZGVmaW5lZCk7XG4gICAgICBjb25zdCBzZWFyY2hUZXJtcyA9IChhcmdzLnNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoYXJncy5zZWFyY2hUZXJtcykpID8gYXJncy5zZWFyY2hUZXJtcyA6IChzZWFyY2hUZXJtID8gW3NlYXJjaFRlcm1dIDogdW5kZWZpbmVkKTtcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmIHx8IG51bGw7XG4gICAgICBjb25zdCBjb2x1bW5JZCA9IGNvbHVtbkRlZiA/IChjb2x1bW5EZWYuaWQgfHwgJycpIDogJyc7XG4gICAgICBjb25zdCBvcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3IgfHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgaGFzU2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKTtcbiAgICAgIGNvbnN0IHRlcm1zQ291bnQgPSBoYXNTZWFyY2hUZXJtcyAmJiBzZWFyY2hUZXJtcy5sZW5ndGg7XG4gICAgICBjb25zdCBvbGRDb2x1bW5GaWx0ZXJzID0geyAuLi50aGlzLl9jb2x1bW5GaWx0ZXJzIH07XG5cbiAgICAgIGlmICghaGFzU2VhcmNoVGVybXMgfHwgdGVybXNDb3VudCA9PT0gMCB8fCAodGVybXNDb3VudCA9PT0gMSAmJiBzZWFyY2hUZXJtc1swXSA9PT0gJycpKSB7XG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgcHJvcGVydHkgZnJvbSB0aGUgY29sdW1uRmlsdGVycyB3aGVuIGl0IGJlY29tZXMgZW1wdHlcbiAgICAgICAgLy8gd2l0aG91dCBkb2luZyB0aGlzLCBpdCB3b3VsZCBsZWF2ZSBhbiBpbmNvcnJlY3Qgc3RhdGUgb2YgdGhlIHByZXZpb3VzIGNvbHVtbiBmaWx0ZXJzIHdoZW4gZmlsdGVyaW5nIG9uIGFub3RoZXIgY29sdW1uXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbElkID0gJycgKyBjb2x1bW5JZCBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IGNvbEZpbHRlcjogQ29sdW1uRmlsdGVyID0ge1xuICAgICAgICAgIGNvbHVtbklkOiBjb2xJZCxcbiAgICAgICAgICBjb2x1bW5EZWYsXG4gICAgICAgICAgc2VhcmNoVGVybXMsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgIGNvbEZpbHRlci5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdID0gY29sRmlsdGVyO1xuICAgICAgfVxuXG4gICAgICAvLyB0cmlnZ2VyIGFuIGV2ZW50IG9ubHkgaWYgRmlsdGVycyBjaGFuZ2VkXG4gICAgICBpZiAoIWlzZXF1YWwob2xkQ29sdW1uRmlsdGVycywgdGhpcy5fY29sdW1uRmlsdGVycykpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQodGhpcy5fc2xpY2tTdWJzY3JpYmVyLCB7XG4gICAgICAgICAgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IGFyZ3MgJiYgYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCxcbiAgICAgICAgICBjb2x1bW5JZCxcbiAgICAgICAgICBjb2x1bW5EZWY6IGFyZ3MuY29sdW1uRGVmIHx8IG51bGwsXG4gICAgICAgICAgY29sdW1uRmlsdGVyczogdGhpcy5fY29sdW1uRmlsdGVycyxcbiAgICAgICAgICBvcGVyYXRvcixcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcbiAgICAgICAgICBzZXJ2aWNlT3B0aW9uczogdGhpcy5fb25GaWx0ZXJDaGFuZ2VkT3B0aW9ucyxcbiAgICAgICAgICBncmlkOiB0aGlzLl9ncmlkXG4gICAgICAgIH0sIGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJnczogeyBjb2x1bW46IENvbHVtbjsgZ3JpZDogYW55OyBub2RlOiBhbnkgfSkge1xuICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uO1xuICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmLmlkIHx8ICcnO1xuXG4gICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5JZCAhPT0gJ3NlbGVjdG9yJyAmJiBjb2x1bW5EZWYuZmlsdGVyYWJsZSkge1xuICAgICAgbGV0IHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgb3BlcmF0b3I6IE9wZXJhdG9yU3RyaW5nIHwgT3BlcmF0b3JUeXBlO1xuICAgICAgY29uc3QgZmlsdGVyOiBGaWx0ZXIgfCB1bmRlZmluZWQgPSB0aGlzLmZpbHRlckZhY3RvcnkuY3JlYXRlRmlsdGVyKGFyZ3MuY29sdW1uLmZpbHRlcik7XG4gICAgICBvcGVyYXRvciA9IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB8fCAoZmlsdGVyICYmIGZpbHRlci5vcGVyYXRvcikgfHwgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdKSB7XG4gICAgICAgIHNlYXJjaFRlcm1zID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdLnNlYXJjaFRlcm1zIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgb3BlcmF0b3IgPSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0ub3BlcmF0b3IgfHwgdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChjb2x1bW5EZWYuZmlsdGVyKSB7XG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcbiAgICAgICAgLy8gYmVjYXVzZSBvZiB0aGF0IHdlIG5lZWQgdG8gZmlyc3QgZ2V0IHNlYXJjaFRlcm0ocykgZnJvbSB0aGUgY29sdW1uRmlsdGVycyAodGhhdCBpcyB3aGF0IHRoZSB1c2VyIGxhc3QgZW50ZXJlZClcbiAgICAgICAgc2VhcmNoVGVybXMgPSBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5GaWx0ZXJzKHNlYXJjaFRlcm1zLCBjb2x1bW5EZWYsIG9wZXJhdG9yKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsdGVyQXJndW1lbnRzOiBGaWx0ZXJBcmd1bWVudHMgPSB7XG4gICAgICAgIGdyaWQ6IHRoaXMuX2dyaWQsXG4gICAgICAgIG9wZXJhdG9yLFxuICAgICAgICBzZWFyY2hUZXJtcyxcbiAgICAgICAgY29sdW1uRGVmLFxuICAgICAgICBjYWxsYmFjazogdGhpcy5jYWxsYmFja1NlYXJjaEV2ZW50LmJpbmQodGhpcylcbiAgICAgIH07XG5cbiAgICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgICAgZmlsdGVyLmluaXQoZmlsdGVyQXJndW1lbnRzKTtcbiAgICAgICAgY29uc3QgZmlsdGVyRXhpc3RJbmRleCA9IHRoaXMuX2ZpbHRlcnMuZmluZEluZGV4KChmaWx0KSA9PiBmaWx0ZXIuY29sdW1uRGVmLm5hbWUgPT09IGZpbHQuY29sdW1uRGVmLm5hbWUpO1xuXG4gICAgICAgIC8vIGFkZCB0byB0aGUgZmlsdGVycyBhcnJheXMgb3IgcmVwbGFjZSBpdCB3aGVuIGZvdW5kXG4gICAgICAgIGlmIChmaWx0ZXJFeGlzdEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuX2ZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2ZpbHRlcnNbZmlsdGVyRXhpc3RJbmRleF0gPSBmaWx0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3aGVuIGhpZGluZy9zaG93aW5nICh3aXRoIENvbHVtbiBQaWNrZXIgb3IgR3JpZCBNZW51KSwgaXQgd2lsbCB0cnkgdG8gcmUtY3JlYXRlIHlldCBhZ2FpbiB0aGUgZmlsdGVycyAoc2luY2UgU2xpY2tHcmlkIGRvZXMgYSByZS1yZW5kZXIpXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gYWxzbyBzZXQgYWdhaW4gdGhlIHZhbHVlcyBpbiB0aGUgRE9NIGVsZW1lbnRzIGlmIHRoZSB2YWx1ZXMgd2VyZSBzZXQgYnkgYSBzZWFyY2hUZXJtKHMpXG4gICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBmaWx0ZXIuc2V0VmFsdWVzKSB7XG4gICAgICAgICAgZmlsdGVyLnNldFZhbHVlcyhzZWFyY2hUZXJtcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgZnVuY3Rpb24gdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgc3Vic2NyaWJlciBhbmQgZW1pdCBhIGNoYW5nZSB3aGVuIHRoZSBzb3J0IGlzIGNhbGxlZC5cbiAgICogT3RoZXIgc2VydmljZXMsIGxpa2UgUGFnaW5hdGlvbiwgY2FuIHRoZW4gc3Vic2NyaWJlIHRvIGl0LlxuICAgKiBAcGFyYW0gc2VuZGVyXG4gICAqL1xuICBlbWl0RmlsdGVyQ2hhbmdlZChzZW5kZXI6ICdsb2NhbCcgfCAncmVtb3RlJykge1xuICAgIGlmIChzZW5kZXIgPT09ICdyZW1vdGUnICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XG4gICAgICBsZXQgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRGaWx0ZXJzKSB7XG4gICAgICAgIGN1cnJlbnRGaWx0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMoKSBhcyBDdXJyZW50RmlsdGVyW107XG4gICAgICB9XG4gICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlZC5uZXh0KGN1cnJlbnRGaWx0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHNlbmRlciA9PT0gJ2xvY2FsJykge1xuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dCh0aGlzLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdXNlciBwYXNzZXMgYW4gYXJyYXkgb2YgcHJlc2V0IGZpbHRlcnMsIHdlIG5lZWQgdG8gcHJlLXBvcHVsYXRlIGVhY2ggY29sdW1uIGZpbHRlciBzZWFyY2hUZXJtKHMpXG4gICAqIFRoZSBwcm9jZXNzIGlzIHRvIGxvb3AgdGhyb3VnaCB0aGUgcHJlc2V0IGZpbHRlcnMgYXJyYXksIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uIGZyb20gY29sdW1uRGVmaW5pdGlvbnMgYW5kIGZpbGwgaW4gdGhlIGZpbHRlciBvYmplY3Qgc2VhcmNoVGVybShzKVxuICAgKiBUaGlzIGlzIGJhc2ljYWxseSB0aGUgc2FtZSBhcyBpZiB3ZSB3b3VsZCBtYW51YWxseSBhZGQgc2VhcmNoVGVybShzKSB0byBhIGNvbHVtbiBmaWx0ZXIgb2JqZWN0IGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiwgYnV0IHdlIGRvIGl0IHByb2dyYW1tYXRpY2FsbHkuXG4gICAqIEF0IHRoZSBlbmQgb2YgdGhlIGRheSwgd2hlbiBjcmVhdGluZyB0aGUgRmlsdGVyIChET00gRWxlbWVudCksIGl0IHdpbGwgdXNlIHRoZXNlIHNlYXJjaFRlcm0ocykgc28gd2UgY2FuIHRha2UgYWR2YW50YWdlIG9mIHRoYXQgd2l0aG91dCByZWNvZGluZyBlYWNoIEZpbHRlciB0eXBlIChET00gZWxlbWVudClcbiAgICovXG4gIHBvcHVsYXRlQ29sdW1uRmlsdGVyU2VhcmNoVGVybXMoKSB7XG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMpICYmIHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzO1xuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+ICB7XG4gICAgICAgIC8vIGNsZWFyIGFueSBjb2x1bW5EZWYgc2VhcmNoVGVybXMgYmVmb3JlIGFwcGx5aW5nIFByZXNldHNcbiAgICAgICAgaWYgKGNvbHVtbkRlZi5maWx0ZXIgJiYgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcykge1xuICAgICAgICAgIGRlbGV0ZSBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZnJvbSBlYWNoIHByZXNldHMsIHdlIHdpbGwgZmluZCB0aGUgYXNzb2NpYXRlZCBjb2x1bW5EZWYgYW5kIGFwcGx5IHRoZSBwcmVzZXQgc2VhcmNoVGVybXMgJiBvcGVyYXRvciBpZiB0aGVyZSBpc1xuICAgICAgICBjb25zdCBjb2x1bW5QcmVzZXQgPSBmaWx0ZXJzLmZpbmQoKHByZXNldEZpbHRlcjogQ3VycmVudEZpbHRlcikgPT4ge1xuICAgICAgICAgIHJldHVybiBwcmVzZXRGaWx0ZXIuY29sdW1uSWQgPT09IGNvbHVtbkRlZi5pZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb2x1bW5QcmVzZXQgJiYgY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zKSkge1xuICAgICAgICAgIGNvbHVtbkRlZi5maWx0ZXIgPSBjb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xuICAgICAgICAgIGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IgPSBjb2x1bW5QcmVzZXQub3BlcmF0b3IgfHwgY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciB8fCAnJztcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zID0gY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbHVtbkZpbHRlcnMoc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSB8IHVuZGVmaW5lZCwgY29sdW1uRGVmOiBhbnksIG9wZXJhdG9yPzogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcbiAgICBpZiAoc2VhcmNoVGVybXMgJiYgY29sdW1uRGVmKSB7XG4gICAgICAvLyB0aGlzLl9jb2x1bW5GaWx0ZXJzLnNlYXJjaFRlcm1zID0gc2VhcmNoVGVybXM7XG4gICAgICB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0gPSB7XG4gICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYuaWQsXG4gICAgICAgIGNvbHVtbkRlZixcbiAgICAgICAgc2VhcmNoVGVybXMsXG4gICAgICAgIG9wZXJhdG9yXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50KHNsaWNrRXZlbnQ6IGFueSwgYXJnczogYW55LCBlOiBhbnkpIHtcbiAgICBzbGlja0V2ZW50ID0gc2xpY2tFdmVudCB8fCBuZXcgU2xpY2suRXZlbnQoKTtcblxuICAgIC8vIGV2ZW50IG1pZ2h0IGhhdmUgYmVlbiBjcmVhdGVkIGFzIGEgQ3VzdG9tRXZlbnQgKGUuZy4gQ29tcG91bmREYXRlRmlsdGVyKSwgd2l0aG91dCBiZWluZyBhIHZhbGlkIFNsaWNrLkV2ZW50RGF0YS5cbiAgICAvLyBpZiBzbyB3ZSB3aWxsIGNyZWF0ZSBhIG5ldyBTbGljay5FdmVudERhdGEgYW5kIG1lcmdlIGl0IHdpdGggdGhhdCBDdXN0b21FdmVudCB0byBhdm9pZCBoYXZpbmcgU2xpY2tHcmlkIGVycm9yc1xuICAgIGxldCBldmVudCA9IGU7XG4gICAgaWYgKGUgJiYgdHlwZW9mIGUuaXNQcm9wYWdhdGlvblN0b3BwZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2ZW50ID0gJC5leHRlbmQoe30sIG5ldyBTbGljay5FdmVudERhdGEoKSwgZSk7XG4gICAgfVxuICAgIHNsaWNrRXZlbnQubm90aWZ5KGFyZ3MsIGV2ZW50LCBhcmdzLmdyaWQpO1xuICB9XG59XG4iXX0=