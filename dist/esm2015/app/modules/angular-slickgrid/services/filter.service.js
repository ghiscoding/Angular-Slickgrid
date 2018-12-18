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
const isequal = isequal_;
export class FilterService {
    /**
     * @param {?} filterFactory
     */
    constructor(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject();
        this.onFilterCleared = new Subject();
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
     * Getter for the Column Definitions pulled through the Grid Object
     * @private
     * @return {?}
     */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * @param {?} grid
     * @return {?}
     */
    init(grid) {
        this._grid = grid;
    }
    /**
     * Attach a backend filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @return {?}
     */
    attachBackendOnFilter(grid) {
        this._filters = [];
        this._slickSubscriber = new Slick.Event();
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.attachBackendOnFilterSubscribe.bind(this));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e, args) => {
            this.addFilterTemplateToHeaderRow(args);
        });
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    attachBackendOnFilterSubscribe(event, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            /** @type {?} */
            const backendApi = this._gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            try {
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                const startTime = new Date();
                // run a preProcess callback if defined
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                // call the service to get a query back
                /** @type {?} */
                const query = yield backendApi.service.processOnFilterChanged(event, args);
                // emit an onFilterChanged event
                if (args && !args.clearFilterTriggered) {
                    this.emitFilterChanged('remote');
                }
                // the process could be an Observable (like HttpClient) or a Promise
                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                /** @type {?} */
                const observableOrPromise = backendApi.process(query);
                /** @type {?} */
                const processResult = yield castToPromise(observableOrPromise);
                /** @type {?} */
                const endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi.postProcess !== undefined) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime,
                            endTime,
                            executionTime: endTime.valueOf() - startTime.valueOf(),
                            totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            }
            catch (e) {
                if (backendApi && backendApi.onError) {
                    backendApi.onError(e);
                }
                else {
                    throw e;
                }
            }
        });
    }
    /**
     * Attach a local filter hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnFilter(grid, dataView) {
        this._filters = [];
        this._dataView = dataView;
        this._slickSubscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this._slickSubscriber.subscribe((e, args) => {
            /** @type {?} */
            const columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            if (args && !args.clearFilterTriggered) {
                this.emitFilterChanged('local');
            }
        });
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e, args) => {
            this.addFilterTemplateToHeaderRow(args);
        });
    }
    /**
     * Clear the search filters (below the column titles)
     * @return {?}
     */
    clearFilters() {
        this._filters.forEach((filter) => {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear();
            }
        });
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (const columnId in this._columnFilters) {
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
    }
    /**
     * @param {?} dataView
     * @param {?} item
     * @param {?} args
     * @return {?}
     */
    customLocalFilter(dataView, item, args) {
        for (const columnId of Object.keys(args.columnFilters)) {
            /** @type {?} */
            const columnFilter = args.columnFilters[columnId];
            /** @type {?} */
            const columnIndex = args.grid.getColumnIndex(columnId);
            /** @type {?} */
            const columnDef = args.grid.getColumns()[columnIndex];
            if (!columnDef) {
                return false;
            }
            /** @type {?} */
            const fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
            /** @type {?} */
            const fieldType = columnDef.type || FieldType.string;
            /** @type {?} */
            const filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            /** @type {?} */
            let cellValue = item[fieldName];
            // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
            if (fieldName.indexOf('.') >= 0) {
                cellValue = getDescendantProperty(item, fieldName);
            }
            // if we find searchTerms use them but make a deep copy so that we don't affect original array
            // we might have to overwrite the value(s) locally that are returned
            // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
            /** @type {?} */
            const searchValues = (columnFilter && columnFilter.searchTerms) ? [...columnFilter.searchTerms] : null;
            /** @type {?} */
            let fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
            fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
            // make sure it's a string
            /** @type {?} */
            const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/);
            // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            /** @type {?} */
            let operator = columnFilter.operator || ((matches) ? matches[1] : '');
            /** @type {?} */
            const searchTerm = (!!matches) ? matches[2] : '';
            /** @type {?} */
            const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
            if (searchValues && searchValues.length > 1) {
                fieldSearchValue = searchValues.join(',');
            }
            else if (typeof fieldSearchValue === 'string') {
                // escaping the search value
                fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape single quotes by doubling them
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
                for (let k = 0, ln = searchValues.length; k < ln; k++) {
                    // make sure all search terms are strings
                    searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                }
            }
            // when using localization (i18n), we should use the formatter output to search as the new cell value
            if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                /** @type {?} */
                const rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
            }
            // make sure cell value is always a string
            if (typeof cellValue === 'number') {
                cellValue = cellValue.toString();
            }
            /** @type {?} */
            const conditionOptions = {
                fieldType,
                searchTerms: searchValues,
                cellValue,
                operator,
                cellValueLastChar: lastValueChar,
                filterSearchType
            };
            if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                return false;
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    dispose() {
        this.disposeColumnFilters();
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    }
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     * @return {?}
     */
    disposeColumnFilters() {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (const columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // also destroy each Filter instances
        this._filters.forEach((filter, index) => {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        });
    }
    /**
     * @return {?}
     */
    getColumnFilters() {
        return this._columnFilters;
    }
    /**
     * @return {?}
     */
    getCurrentLocalFilters() {
        /** @type {?} */
        const currentFilters = [];
        if (this._columnFilters) {
            for (const colId of Object.keys(this._columnFilters)) {
                /** @type {?} */
                const columnFilter = this._columnFilters[colId];
                /** @type {?} */
                const columnDef = columnFilter.columnDef;
                /** @type {?} */
                const filter = (/** @type {?} */ ({ columnId: colId || '' }));
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
        return currentFilters;
    }
    /**
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    callbackSearchEvent(e, args) {
        if (args) {
            /** @type {?} */
            const searchTerm = ((e && e.target) ? ((/** @type {?} */ (e.target))).value : undefined);
            /** @type {?} */
            const searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            /** @type {?} */
            const columnDef = args.columnDef || null;
            /** @type {?} */
            const columnId = columnDef ? (columnDef.id || '') : '';
            /** @type {?} */
            const operator = args.operator || undefined;
            /** @type {?} */
            const hasSearchTerms = searchTerms && Array.isArray(searchTerms);
            /** @type {?} */
            const termsCount = hasSearchTerms && searchTerms.length;
            /** @type {?} */
            const oldColumnFilters = Object.assign({}, this._columnFilters);
            if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                /** @type {?} */
                const colId = (/** @type {?} */ ('' + columnId));
                /** @type {?} */
                const colFilter = {
                    columnId: colId,
                    columnDef,
                    searchTerms,
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
                    columnId,
                    columnDef: args.columnDef || null,
                    columnFilters: this._columnFilters,
                    operator,
                    searchTerms,
                    serviceOptions: this._onFilterChangedOptions,
                    grid: this._grid
                }, e);
            }
        }
    }
    /**
     * @param {?} args
     * @return {?}
     */
    addFilterTemplateToHeaderRow(args) {
        /** @type {?} */
        const columnDef = args.column;
        /** @type {?} */
        const columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            /** @type {?} */
            let searchTerms;
            /** @type {?} */
            let operator;
            /** @type {?} */
            const filter = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter && filter.operator) || undefined;
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
            const filterArguments = {
                grid: this._grid,
                operator,
                searchTerms,
                columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            if (filter) {
                filter.init(filterArguments);
                /** @type {?} */
                const filterExistIndex = this._filters.findIndex((filt) => filter.columnDef.name === filt.columnDef.name);
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter);
                }
                else {
                    this._filters[filterExistIndex] = filter;
                }
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                if (searchTerms && filter.setValues) {
                    filter.setValues(searchTerms);
                }
            }
        }
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    emitFilterChanged(sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            let currentFilters = [];
            /** @type {?} */
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = (/** @type {?} */ (backendService.getCurrentFilters()));
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (sender === 'local') {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    }
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     * @return {?}
     */
    populateColumnFilterSearchTerms() {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            /** @type {?} */
            const filters = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach((columnDef) => {
                // clear any columnDef searchTerms before applying Presets
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                /** @type {?} */
                const columnPreset = filters.find((presetFilter) => {
                    return presetFilter.columnId === columnDef.id;
                });
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            });
        }
    }
    /**
     * @private
     * @param {?} searchTerms
     * @param {?} columnDef
     * @param {?=} operator
     * @return {?}
     */
    updateColumnFilters(searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef,
                searchTerms,
                operator
            };
        }
    }
    /**
     * @private
     * @param {?} slickEvent
     * @param {?} args
     * @param {?} e
     * @return {?}
     */
    triggerEvent(slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
        // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
        /** @type {?} */
        let event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    }
}
FilterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilterService.ctorParameters = () => [
    { type: FilterFactory }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBT0wsU0FBUyxFQUVULFlBQVksRUFLYixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQzs7TUFDckMsT0FBTyxHQUFHLFFBQVE7QUFPeEIsTUFBTSxPQUFPLGFBQWE7Ozs7SUFXeEIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFWeEMsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUkzQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUVXLENBQUM7Ozs7OztJQUdyRCxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUs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Q29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJDb25kaXRpb25zIH0gZnJvbSAnLi8uLi9maWx0ZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge1xuICBDb2x1bW4sXG4gIENvbHVtbkZpbHRlcixcbiAgQ29sdW1uRmlsdGVycyxcbiAgRmlsdGVyLFxuICBGaWx0ZXJBcmd1bWVudHMsXG4gIEZpbHRlckNhbGxiYWNrQXJnLFxuICBGaWVsZFR5cGUsXG4gIEdyaWRPcHRpb24sXG4gIE9wZXJhdG9yVHlwZSxcbiAgQ3VycmVudEZpbHRlcixcbiAgU2VhcmNoVGVybSxcbiAgU2xpY2tFdmVudCxcbiAgT3BlcmF0b3JTdHJpbmdcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSwgZ2V0RGVzY2VuZGFudFByb3BlcnR5IH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgRmlsdGVyRmFjdG9yeSB9IGZyb20gJy4uL2ZpbHRlcnMvZmlsdGVyRmFjdG9yeSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBpc2VxdWFsXyBmcm9tICdsb2Rhc2guaXNlcXVhbCc7XG5jb25zdCBpc2VxdWFsID0gaXNlcXVhbF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgdG8gd29ya1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsdGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcbiAgcHJpdmF0ZSBfc2xpY2tTdWJzY3JpYmVyOiBTbGlja0V2ZW50O1xuICBwcml2YXRlIF9maWx0ZXJzOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIF9jb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzID0ge307XG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBfb25GaWx0ZXJDaGFuZ2VkT3B0aW9uczogYW55O1xuICBvbkZpbHRlckNoYW5nZWQgPSBuZXcgU3ViamVjdDxDdXJyZW50RmlsdGVyW10+KCk7XG4gIG9uRmlsdGVyQ2xlYXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWx0ZXJGYWN0b3J5OiBGaWx0ZXJGYWN0b3J5KSB7IH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XG4gIH1cblxuICBpbml0KGdyaWQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGJhY2tlbmQgZmlsdGVyIGhvb2sgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XG4gICAqL1xuICBhdHRhY2hCYWNrZW5kT25GaWx0ZXIoZ3JpZDogYW55KSB7XG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBTbGlja0dyaWQgZXZlbnQgYW5kIGNhbGwgdGhlIGJhY2tlbmQgZXhlY3V0aW9uXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSh0aGlzLmF0dGFjaEJhY2tlbmRPbkZpbHRlclN1YnNjcmliZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkhlYWRlclJvd0NlbGxSZW5kZXJlZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGF0dGFjaEJhY2tlbmRPbkZpbHRlclN1YnNjcmliZShldmVudDogRXZlbnQsIGFyZ3M6IGFueSkge1xuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gdHJ5aW5nIHRvIGF0dGFjaCB0aGUgXCJhdHRhY2hCYWNrZW5kT25GaWx0ZXJTdWJzY3JpYmUoZXZlbnQsIGFyZ3MpXCIgZnVuY3Rpb24sIGl0IHNlZW1zIHRoYXQgXCJhcmdzXCIgaXMgbm90IHBvcHVsYXRlZCBjb3JyZWN0bHknKTtcbiAgICB9XG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAvLyBydW4gYSBwcmVQcm9jZXNzIGNhbGxiYWNrIGlmIGRlZmluZWRcbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2UgdG8gZ2V0IGEgcXVlcnkgYmFja1xuICAgICAgY29uc3QgcXVlcnkgPSBhd2FpdCBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudCwgYXJncyk7XG5cbiAgICAgIC8vIGVtaXQgYW4gb25GaWx0ZXJDaGFuZ2VkIGV2ZW50XG4gICAgICBpZiAoYXJncyAmJiAhYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgICB0aGlzLmVtaXRGaWx0ZXJDaGFuZ2VkKCdyZW1vdGUnKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhlIHByb2Nlc3MgY291bGQgYmUgYW4gT2JzZXJ2YWJsZSAobGlrZSBIdHRwQ2xpZW50KSBvciBhIFByb21pc2VcbiAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXG4gICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcbiAgICAgIGNvbnN0IHByb2Nlc3NSZXN1bHQgPSBhd2FpdCBjYXN0VG9Qcm9taXNlKG9ic2VydmFibGVPclByb21pc2UpO1xuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIC8vIGZyb20gdGhlIHJlc3VsdCwgY2FsbCBvdXIgaW50ZXJuYWwgcG9zdCBwcm9jZXNzIHRvIHVwZGF0ZSB0aGUgRGF0YXNldCBhbmQgUGFnaW5hdGlvbiBpbmZvXG4gICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcbiAgICAgICAgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xuICAgICAgaWYgKGJhY2tlbmRBcGkucG9zdFByb2Nlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgICAgIGVuZFRpbWUsXG4gICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXG4gICAgICAgICAgICB0b3RhbEl0ZW1Db3VudDogdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5vbkVycm9yKSB7XG4gICAgICAgIGJhY2tlbmRBcGkub25FcnJvcihlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGxvY2FsIGZpbHRlciBob29rIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxuICAgKiBAcGFyYW0gZGF0YVZpZXdcbiAgICovXG4gIGF0dGFjaExvY2FsT25GaWx0ZXIoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gbmV3IFNsaWNrLkV2ZW50KCk7XG5cbiAgICBkYXRhVmlldy5zZXRGaWx0ZXJBcmdzKHsgY29sdW1uRmlsdGVyczogdGhpcy5fY29sdW1uRmlsdGVycywgZ3JpZDogdGhpcy5fZ3JpZCB9KTtcbiAgICBkYXRhVmlldy5zZXRGaWx0ZXIodGhpcy5jdXN0b21Mb2NhbEZpbHRlci5iaW5kKHRoaXMsIGRhdGFWaWV3KSk7XG5cbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuICAgICAgY29uc3QgY29sdW1uSWQgPSBhcmdzLmNvbHVtbklkO1xuICAgICAgaWYgKGNvbHVtbklkICE9IG51bGwpIHtcbiAgICAgICAgZGF0YVZpZXcucmVmcmVzaCgpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZ3MgJiYgIWFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZCgnbG9jYWwnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkhlYWRlclJvd0NlbGxSZW5kZXJlZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBDbGVhciB0aGUgc2VhcmNoIGZpbHRlcnMgKGJlbG93IHRoZSBjb2x1bW4gdGl0bGVzKSAqL1xuICBjbGVhckZpbHRlcnMoKSB7XG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXI6IEZpbHRlcikgPT4ge1xuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuY2xlYXIpIHtcbiAgICAgICAgLy8gY2xlYXIgZWxlbWVudCBhbmQgdHJpZ2dlciBhIGNoYW5nZVxuICAgICAgICBmaWx0ZXIuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5GaWx0ZXJzIGFuZCBkZWxldGUgdGhlbSAxIGJ5IDFcbiAgICAvLyBvbmx5IHRyeWluZyB0byBjbGVhciBjb2x1bW5GaWx0ZXIgKHdpdGhvdXQgbG9vcGluZyB0aHJvdWdoKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XG4gICAgICBpZiAoY29sdW1uSWQgJiYgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF0pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHdlIGFsc28gbmVlZCB0byByZWZyZXNoIHRoZSBkYXRhVmlldyBhbmQgb3B0aW9uYWxseSB0aGUgZ3JpZCAoaXQncyBvcHRpb25hbCBzaW5jZSB3ZSB1c2UgRGF0YVZpZXcpXG4gICAgaWYgKHRoaXMuX2RhdGFWaWV3KSB7XG4gICAgICB0aGlzLl9kYXRhVmlldy5yZWZyZXNoKCk7XG4gICAgICB0aGlzLl9ncmlkLmludmFsaWRhdGUoKTtcbiAgICAgIHRoaXMuX2dyaWQucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlcnMgYXJlIGFsbCBjbGVhcmVkXG4gICAgdGhpcy5vbkZpbHRlckNsZWFyZWQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGN1c3RvbUxvY2FsRmlsdGVyKGRhdGFWaWV3OiBhbnksIGl0ZW06IGFueSwgYXJnczogYW55KSB7XG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBvZiBPYmplY3Qua2V5cyhhcmdzLmNvbHVtbkZpbHRlcnMpKSB7XG4gICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBhcmdzLmNvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBhcmdzLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uSWQpO1xuICAgICAgY29uc3QgY29sdW1uRGVmID0gYXJncy5ncmlkLmdldENvbHVtbnMoKVtjb2x1bW5JbmRleF07XG4gICAgICBpZiAoIWNvbHVtbkRlZikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZDtcbiAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IGNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XG4gICAgICBjb25zdCBmaWx0ZXJTZWFyY2hUeXBlID0gKGNvbHVtbkRlZi5maWx0ZXJTZWFyY2hUeXBlKSA/IGNvbHVtbkRlZi5maWx0ZXJTZWFyY2hUeXBlIDogbnVsbDtcbiAgICAgIGxldCBjZWxsVmFsdWUgPSBpdGVtW2ZpZWxkTmFtZV07XG5cbiAgICAgIC8vIHdoZW4gaXRlbSBpcyBhIGNvbXBsZXggb2JqZWN0IChkb3QgXCIuXCIgbm90YXRpb24pLCB3ZSBuZWVkIHRvIGZpbHRlciB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBvYmplY3QgdHJlZVxuICAgICAgaWYgKGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPj0gMCkge1xuICAgICAgICBjZWxsVmFsdWUgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoaXRlbSwgZmllbGROYW1lKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgd2UgZmluZCBzZWFyY2hUZXJtcyB1c2UgdGhlbSBidXQgbWFrZSBhIGRlZXAgY29weSBzbyB0aGF0IHdlIGRvbid0IGFmZmVjdCBvcmlnaW5hbCBhcnJheVxuICAgICAgLy8gd2UgbWlnaHQgaGF2ZSB0byBvdmVyd3JpdGUgdGhlIHZhbHVlKHMpIGxvY2FsbHkgdGhhdCBhcmUgcmV0dXJuZWRcbiAgICAgIC8vIGUuZzogd2UgZG9uJ3Qgd2FudCB0byBvcGVyYXRvciB3aXRoaW4gdGhlIHNlYXJjaCB2YWx1ZSwgc2luY2UgaXQgd2lsbCBmYWlsIGZpbHRlciBjb25kaXRpb24gY2hlY2sgdHJpZ2dlciBhZnRlcndhcmRcbiAgICAgIGNvbnN0IHNlYXJjaFZhbHVlcyA9IChjb2x1bW5GaWx0ZXIgJiYgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSA/IFsuLi5jb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXNdIDogbnVsbDtcblxuICAgICAgbGV0IGZpZWxkU2VhcmNoVmFsdWUgPSAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVmFsdWVzWzBdIDogJyc7XG4gICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJycgKyBmaWVsZFNlYXJjaFZhbHVlOyAvLyBtYWtlIHN1cmUgaXQncyBhIHN0cmluZ1xuXG4gICAgICBjb25zdCBtYXRjaGVzID0gZmllbGRTZWFyY2hWYWx1ZS5tYXRjaCgvXihbPD4hPVxcKl17MCwyfSkoLipbXjw+IT1cXCpdKShbXFwqXT8pJC8pOyAvLyBncm91cCAxOiBPcGVyYXRvciwgMjogc2VhcmNoVmFsdWUsIDM6IGxhc3QgY2hhciBpcyAnKicgKG1lYW5pbmcgc3RhcnRzIHdpdGgsIGV4LjogYWJjKilcbiAgICAgIGxldCBvcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvciB8fCAoKG1hdGNoZXMpID8gbWF0Y2hlc1sxXSA6ICcnKTtcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbMl0gOiAnJztcbiAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XG5cbiAgICAgIGlmIChzZWFyY2hWYWx1ZXMgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlcy5qb2luKCcsJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSBmaWVsZFNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJ2EqJyB8fCBvcGVyYXRvciA9PT0gJyp6JyB8fCBsYXN0VmFsdWVDaGFyID09PSAnKicpIHtcbiAgICAgICAgICBvcGVyYXRvciA9IChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnKnonKSA/IE9wZXJhdG9yVHlwZS5lbmRzV2l0aCA6IE9wZXJhdG9yVHlwZS5zdGFydHNXaXRoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XG4gICAgICBpZiAoc2VhcmNoVGVybSA9PT0gJycgJiYgKCFzZWFyY2hWYWx1ZXMgfHwgKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAwKSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHNlYXJjaCB2YWx1ZSBoYXMgYSByZWdleCBtYXRjaCB3ZSB3aWxsIG9ubHkga2VlcCB0aGUgdmFsdWUgd2l0aG91dCB0aGUgb3BlcmF0b3JcbiAgICAgIC8vIGluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIG92ZXJ3cml0ZSB0aGUgcmV0dXJuZWQgc2VhcmNoIHZhbHVlcyB0byB0cnVuY2F0ZSBvcGVyYXRvciBmcm9tIHRoZSBzdHJpbmcgc2VhcmNoXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRjaGVzKSAmJiBtYXRjaGVzLmxlbmd0aCA+PSAxICYmIChBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA9PT0gMSkpIHtcbiAgICAgICAgc2VhcmNoVmFsdWVzWzBdID0gc2VhcmNoVGVybTtcbiAgICAgIH1cblxuICAgICAgLy8gZmlsdGVyIHNlYXJjaCB0ZXJtcyBzaG91bGQgYWx3YXlzIGJlIHN0cmluZyB0eXBlIChldmVuIHRob3VnaCB3ZSBwZXJtaXQgdGhlIGVuZCB1c2VyIHRvIGlucHV0IG51bWJlcnMpXG4gICAgICAvLyBzbyBtYWtlIHN1cmUgZWFjaCB0ZXJtIGFyZSBzdHJpbmdzLCBpZiB1c2VyIGhhcyBzb21lIGRlZmF1bHQgc2VhcmNoIHRlcm1zLCB3ZSB3aWxsIGNhc3QgdGhlbSB0byBzdHJpbmdcbiAgICAgIGlmIChzZWFyY2hWYWx1ZXMgJiYgQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwLCBsbiA9IHNlYXJjaFZhbHVlcy5sZW5ndGg7IGsgPCBsbjsgaysrKSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIGFsbCBzZWFyY2ggdGVybXMgYXJlIHN0cmluZ3NcbiAgICAgICAgICBzZWFyY2hWYWx1ZXNba10gPSAoKHNlYXJjaFZhbHVlc1trXSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFZhbHVlc1trXSA9PT0gbnVsbCkgPyAnJyA6IHNlYXJjaFZhbHVlc1trXSkgKyAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3aGVuIHVzaW5nIGxvY2FsaXphdGlvbiAoaTE4biksIHdlIHNob3VsZCB1c2UgdGhlIGZvcm1hdHRlciBvdXRwdXQgdG8gc2VhcmNoIGFzIHRoZSBuZXcgY2VsbCB2YWx1ZVxuICAgICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMudXNlRm9ybWF0dGVyT3VwdXRUb0ZpbHRlcikge1xuICAgICAgICBjb25zdCByb3dJbmRleCA9IChkYXRhVmlldyAmJiB0eXBlb2YgZGF0YVZpZXcuZ2V0SWR4QnlJZCA9PT0gJ2Z1bmN0aW9uJykgPyBkYXRhVmlldy5nZXRJZHhCeUlkKGl0ZW0uaWQpIDogMDtcbiAgICAgICAgY2VsbFZhbHVlID0gY29sdW1uRGVmLmZvcm1hdHRlcihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGNlbGxWYWx1ZSwgY29sdW1uRGVmLCBpdGVtLCB0aGlzLl9ncmlkKTtcbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBzdXJlIGNlbGwgdmFsdWUgaXMgYWx3YXlzIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNlbGxWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY2VsbFZhbHVlID0gY2VsbFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbmRpdGlvbk9wdGlvbnMgPSB7XG4gICAgICAgIGZpZWxkVHlwZSxcbiAgICAgICAgc2VhcmNoVGVybXM6IHNlYXJjaFZhbHVlcyxcbiAgICAgICAgY2VsbFZhbHVlLFxuICAgICAgICBvcGVyYXRvcixcbiAgICAgICAgY2VsbFZhbHVlTGFzdENoYXI6IGxhc3RWYWx1ZUNoYXIsXG4gICAgICAgIGZpbHRlclNlYXJjaFR5cGVcbiAgICAgIH07XG5cbiAgICAgIGlmICghRmlsdGVyQ29uZGl0aW9ucy5leGVjdXRlTWFwcGVkQ29uZGl0aW9uKGNvbmRpdGlvbk9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5kaXNwb3NlQ29sdW1uRmlsdGVycygpO1xuXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcblxuICAgIC8vIHVuc3Vic2NyaWJlIGxvY2FsIGV2ZW50XG4gICAgaWYgKHRoaXMuX3NsaWNrU3Vic2NyaWJlciAmJiB0eXBlb2YgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSBvZiB0aGUgZmlsdGVycywgc2luY2UgaXQncyBhIHNpbmdsZXRvbiwgd2UgZG9uJ3Qgd2FudCB0byBhZmZlY3Qgb3RoZXIgZ3JpZHMgd2l0aCBzYW1lIGNvbHVtbnNcbiAgICovXG4gIGRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCkge1xuICAgIC8vIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5GaWx0ZXJzIGFuZCBkZWxldGUgdGhlbSAxIGJ5IDFcbiAgICAvLyBvbmx5IHRyeWluZyB0byBtYWtlIGNvbHVtbkZpbHRlciBhbiBlbXB0eSAod2l0aG91dCBsb29waW5nKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XG4gICAgICBpZiAoY29sdW1uSWQgJiYgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF0pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFsc28gZGVzdHJveSBlYWNoIEZpbHRlciBpbnN0YW5jZXNcbiAgICB0aGlzLl9maWx0ZXJzLmZvckVhY2goKGZpbHRlciwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmRlc3Ryb3kpIHtcbiAgICAgICAgZmlsdGVyLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb2x1bW5GaWx0ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5GaWx0ZXJzO1xuICB9XG5cbiAgZ2V0Q3VycmVudExvY2FsRmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10ge1xuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10gPSBbXTtcbiAgICBpZiAodGhpcy5fY29sdW1uRmlsdGVycykge1xuICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBPYmplY3Qua2V5cyh0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXTtcbiAgICAgICAgY29uc3QgY29sdW1uRGVmID0gY29sdW1uRmlsdGVyLmNvbHVtbkRlZjtcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyBjb2x1bW5JZDogY29sSWQgfHwgJycgfSBhcyBDdXJyZW50RmlsdGVyO1xuXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXIgJiYgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSB7XG4gICAgICAgICAgZmlsdGVyLnNlYXJjaFRlcm1zID0gY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXIub3BlcmF0b3IpIHtcbiAgICAgICAgICBmaWx0ZXIub3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLnNlYXJjaFRlcm1zKSAmJiBmaWx0ZXIuc2VhcmNoVGVybXMubGVuZ3RoID4gMCAmJiBmaWx0ZXIuc2VhcmNoVGVybXNbMF0gIT09ICcnKSB7XG4gICAgICAgICAgY3VycmVudEZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50RmlsdGVycztcbiAgfVxuXG4gIGNhbGxiYWNrU2VhcmNoRXZlbnQoZTogRXZlbnQgfCB1bmRlZmluZWQsIGFyZ3M6IEZpbHRlckNhbGxiYWNrQXJnKSB7XG4gICAgaWYgKGFyZ3MpIHtcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoKGUgJiYgZS50YXJnZXQpID8gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIDogdW5kZWZpbmVkKTtcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm1zID0gKGFyZ3Muc2VhcmNoVGVybXMgJiYgQXJyYXkuaXNBcnJheShhcmdzLnNlYXJjaFRlcm1zKSkgPyBhcmdzLnNlYXJjaFRlcm1zIDogKHNlYXJjaFRlcm0gPyBbc2VhcmNoVGVybV0gOiB1bmRlZmluZWQpO1xuICAgICAgY29uc3QgY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWYgfHwgbnVsbDtcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmID8gKGNvbHVtbkRlZi5pZCB8fCAnJykgOiAnJztcbiAgICAgIGNvbnN0IG9wZXJhdG9yID0gYXJncy5vcGVyYXRvciB8fCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBoYXNTZWFyY2hUZXJtcyA9IHNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoVGVybXMpO1xuICAgICAgY29uc3QgdGVybXNDb3VudCA9IGhhc1NlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aDtcbiAgICAgIGNvbnN0IG9sZENvbHVtbkZpbHRlcnMgPSB7IC4uLnRoaXMuX2NvbHVtbkZpbHRlcnMgfTtcblxuICAgICAgaWYgKCFoYXNTZWFyY2hUZXJtcyB8fCB0ZXJtc0NvdW50ID09PSAwIHx8ICh0ZXJtc0NvdW50ID09PSAxICYmIHNlYXJjaFRlcm1zWzBdID09PSAnJykpIHtcbiAgICAgICAgLy8gZGVsZXRlIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBjb2x1bW5GaWx0ZXJzIHdoZW4gaXQgYmVjb21lcyBlbXB0eVxuICAgICAgICAvLyB3aXRob3V0IGRvaW5nIHRoaXMsIGl0IHdvdWxkIGxlYXZlIGFuIGluY29ycmVjdCBzdGF0ZSBvZiB0aGUgcHJldmlvdXMgY29sdW1uIGZpbHRlcnMgd2hlbiBmaWx0ZXJpbmcgb24gYW5vdGhlciBjb2x1bW5cbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29sSWQgPSAnJyArIGNvbHVtbklkIGFzIHN0cmluZztcbiAgICAgICAgY29uc3QgY29sRmlsdGVyOiBDb2x1bW5GaWx0ZXIgPSB7XG4gICAgICAgICAgY29sdW1uSWQ6IGNvbElkLFxuICAgICAgICAgIGNvbHVtbkRlZixcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgY29sRmlsdGVyLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2xJZF0gPSBjb2xGaWx0ZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIHRyaWdnZXIgYW4gZXZlbnQgb25seSBpZiBGaWx0ZXJzIGNoYW5nZWRcbiAgICAgIGlmICghaXNlcXVhbChvbGRDb2x1bW5GaWx0ZXJzLCB0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCh0aGlzLl9zbGlja1N1YnNjcmliZXIsIHtcbiAgICAgICAgICBjbGVhckZpbHRlclRyaWdnZXJlZDogYXJncyAmJiBhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkLFxuICAgICAgICAgIGNvbHVtbklkLFxuICAgICAgICAgIGNvbHVtbkRlZjogYXJncy5jb2x1bW5EZWYgfHwgbnVsbCxcbiAgICAgICAgICBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLFxuICAgICAgICAgIG9wZXJhdG9yLFxuICAgICAgICAgIHNlYXJjaFRlcm1zLFxuICAgICAgICAgIHNlcnZpY2VPcHRpb25zOiB0aGlzLl9vbkZpbHRlckNoYW5nZWRPcHRpb25zLFxuICAgICAgICAgIGdyaWQ6IHRoaXMuX2dyaWRcbiAgICAgICAgfSwgZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzOiB7IGNvbHVtbjogQ29sdW1uOyBncmlkOiBhbnk7IG5vZGU6IGFueSB9KSB7XG4gICAgY29uc3QgY29sdW1uRGVmID0gYXJncy5jb2x1bW47XG4gICAgY29uc3QgY29sdW1uSWQgPSBjb2x1bW5EZWYuaWQgfHwgJyc7XG5cbiAgICBpZiAoY29sdW1uRGVmICYmIGNvbHVtbklkICE9PSAnc2VsZWN0b3InICYmIGNvbHVtbkRlZi5maWx0ZXJhYmxlKSB7XG4gICAgICBsZXQgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcgfCBPcGVyYXRvclR5cGU7XG4gICAgICBjb25zdCBmaWx0ZXI6IEZpbHRlciB8IHVuZGVmaW5lZCA9IHRoaXMuZmlsdGVyRmFjdG9yeS5jcmVhdGVGaWx0ZXIoYXJncy5jb2x1bW4uZmlsdGVyKTtcbiAgICAgIG9wZXJhdG9yID0gKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuZmlsdGVyICYmIGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHx8IChmaWx0ZXIgJiYgZmlsdGVyLm9wZXJhdG9yKSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0pIHtcbiAgICAgICAgc2VhcmNoVGVybXMgPSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0uc2VhcmNoVGVybXMgfHwgdW5kZWZpbmVkO1xuICAgICAgICBvcGVyYXRvciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXS5vcGVyYXRvciB8fCB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGNvbHVtbkRlZi5maWx0ZXIpIHtcbiAgICAgICAgLy8gd2hlbiBoaWRpbmcvc2hvd2luZyAod2l0aCBDb2x1bW4gUGlja2VyIG9yIEdyaWQgTWVudSksIGl0IHdpbGwgdHJ5IHRvIHJlLWNyZWF0ZSB5ZXQgYWdhaW4gdGhlIGZpbHRlcnMgKHNpbmNlIFNsaWNrR3JpZCBkb2VzIGEgcmUtcmVuZGVyKVxuICAgICAgICAvLyBiZWNhdXNlIG9mIHRoYXQgd2UgbmVlZCB0byBmaXJzdCBnZXQgc2VhcmNoVGVybShzKSBmcm9tIHRoZSBjb2x1bW5GaWx0ZXJzICh0aGF0IGlzIHdoYXQgdGhlIHVzZXIgbGFzdCBlbnRlcmVkKVxuICAgICAgICBzZWFyY2hUZXJtcyA9IGNvbHVtbkRlZi5maWx0ZXIuc2VhcmNoVGVybXMgfHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbHVtbkZpbHRlcnMoc2VhcmNoVGVybXMsIGNvbHVtbkRlZiwgb3BlcmF0b3IpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWx0ZXJBcmd1bWVudHM6IEZpbHRlckFyZ3VtZW50cyA9IHtcbiAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZCxcbiAgICAgICAgb3BlcmF0b3IsXG4gICAgICAgIHNlYXJjaFRlcm1zLFxuICAgICAgICBjb2x1bW5EZWYsXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrU2VhcmNoRXZlbnQuYmluZCh0aGlzKVxuICAgICAgfTtcblxuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICBmaWx0ZXIuaW5pdChmaWx0ZXJBcmd1bWVudHMpO1xuICAgICAgICBjb25zdCBmaWx0ZXJFeGlzdEluZGV4ID0gdGhpcy5fZmlsdGVycy5maW5kSW5kZXgoKGZpbHQpID0+IGZpbHRlci5jb2x1bW5EZWYubmFtZSA9PT0gZmlsdC5jb2x1bW5EZWYubmFtZSk7XG5cbiAgICAgICAgLy8gYWRkIHRvIHRoZSBmaWx0ZXJzIGFycmF5cyBvciByZXBsYWNlIGl0IHdoZW4gZm91bmRcbiAgICAgICAgaWYgKGZpbHRlckV4aXN0SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fZmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZmlsdGVyc1tmaWx0ZXJFeGlzdEluZGV4XSA9IGZpbHRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcbiAgICAgICAgLy8gd2UgbmVlZCB0byBhbHNvIHNldCBhZ2FpbiB0aGUgdmFsdWVzIGluIHRoZSBET00gZWxlbWVudHMgaWYgdGhlIHZhbHVlcyB3ZXJlIHNldCBieSBhIHNlYXJjaFRlcm0ocylcbiAgICAgICAgaWYgKHNlYXJjaFRlcm1zICYmIGZpbHRlci5zZXRWYWx1ZXMpIHtcbiAgICAgICAgICBmaWx0ZXIuc2V0VmFsdWVzKHNlYXJjaFRlcm1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBmdW5jdGlvbiB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBzdWJzY3JpYmVyIGFuZCBlbWl0IGEgY2hhbmdlIHdoZW4gdGhlIHNvcnQgaXMgY2FsbGVkLlxuICAgKiBPdGhlciBzZXJ2aWNlcywgbGlrZSBQYWdpbmF0aW9uLCBjYW4gdGhlbiBzdWJzY3JpYmUgdG8gaXQuXG4gICAqIEBwYXJhbSBzZW5kZXJcbiAgICovXG4gIGVtaXRGaWx0ZXJDaGFuZ2VkKHNlbmRlcjogJ2xvY2FsJyB8ICdyZW1vdGUnKSB7XG4gICAgaWYgKHNlbmRlciA9PT0gJ3JlbW90ZScgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcbiAgICAgIGxldCBjdXJyZW50RmlsdGVyczogQ3VycmVudEZpbHRlcltdID0gW107XG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMpIHtcbiAgICAgICAgY3VycmVudEZpbHRlcnMgPSBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycygpIGFzIEN1cnJlbnRGaWx0ZXJbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25GaWx0ZXJDaGFuZ2VkLm5leHQoY3VycmVudEZpbHRlcnMpO1xuICAgIH0gZWxzZSBpZiAoc2VuZGVyID09PSAnbG9jYWwnKSB7XG4gICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlZC5uZXh0KHRoaXMuZ2V0Q3VycmVudExvY2FsRmlsdGVycygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB1c2VyIHBhc3NlcyBhbiBhcnJheSBvZiBwcmVzZXQgZmlsdGVycywgd2UgbmVlZCB0byBwcmUtcG9wdWxhdGUgZWFjaCBjb2x1bW4gZmlsdGVyIHNlYXJjaFRlcm0ocylcbiAgICogVGhlIHByb2Nlc3MgaXMgdG8gbG9vcCB0aHJvdWdoIHRoZSBwcmVzZXQgZmlsdGVycyBhcnJheSwgZmluZCB0aGUgYXNzb2NpYXRlZCBjb2x1bW4gZnJvbSBjb2x1bW5EZWZpbml0aW9ucyBhbmQgZmlsbCBpbiB0aGUgZmlsdGVyIG9iamVjdCBzZWFyY2hUZXJtKHMpXG4gICAqIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBzYW1lIGFzIGlmIHdlIHdvdWxkIG1hbnVhbGx5IGFkZCBzZWFyY2hUZXJtKHMpIHRvIGEgY29sdW1uIGZpbHRlciBvYmplY3QgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLCBidXQgd2UgZG8gaXQgcHJvZ3JhbW1hdGljYWxseS5cbiAgICogQXQgdGhlIGVuZCBvZiB0aGUgZGF5LCB3aGVuIGNyZWF0aW5nIHRoZSBGaWx0ZXIgKERPTSBFbGVtZW50KSwgaXQgd2lsbCB1c2UgdGhlc2Ugc2VhcmNoVGVybShzKSBzbyB3ZSBjYW4gdGFrZSBhZHZhbnRhZ2Ugb2YgdGhhdCB3aXRob3V0IHJlY29kaW5nIGVhY2ggRmlsdGVyIHR5cGUgKERPTSBlbGVtZW50KVxuICAgKi9cbiAgcG9wdWxhdGVDb2x1bW5GaWx0ZXJTZWFyY2hUZXJtcygpIHtcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycykgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnM7XG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4gIHtcbiAgICAgICAgLy8gY2xlYXIgYW55IGNvbHVtbkRlZiBzZWFyY2hUZXJtcyBiZWZvcmUgYXBwbHlpbmcgUHJlc2V0c1xuICAgICAgICBpZiAoY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zKSB7XG4gICAgICAgICAgZGVsZXRlIGNvbHVtbkRlZi5maWx0ZXIuc2VhcmNoVGVybXM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmcm9tIGVhY2ggcHJlc2V0cywgd2Ugd2lsbCBmaW5kIHRoZSBhc3NvY2lhdGVkIGNvbHVtbkRlZiBhbmQgYXBwbHkgdGhlIHByZXNldCBzZWFyY2hUZXJtcyAmIG9wZXJhdG9yIGlmIHRoZXJlIGlzXG4gICAgICAgIGNvbnN0IGNvbHVtblByZXNldCA9IGZpbHRlcnMuZmluZCgocHJlc2V0RmlsdGVyOiBDdXJyZW50RmlsdGVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByZXNldEZpbHRlci5jb2x1bW5JZCA9PT0gY29sdW1uRGVmLmlkO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvbHVtblByZXNldCAmJiBjb2x1bW5QcmVzZXQuc2VhcmNoVGVybXMgJiYgQXJyYXkuaXNBcnJheShjb2x1bW5QcmVzZXQuc2VhcmNoVGVybXMpKSB7XG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlciA9IGNvbHVtbkRlZi5maWx0ZXIgfHwge307XG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciA9IGNvbHVtblByZXNldC5vcGVyYXRvciB8fCBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yIHx8ICcnO1xuICAgICAgICAgIGNvbHVtbkRlZi5maWx0ZXIuc2VhcmNoVGVybXMgPSBjb2x1bW5QcmVzZXQuc2VhcmNoVGVybXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29sdW1uRmlsdGVycyhzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdIHwgdW5kZWZpbmVkLCBjb2x1bW5EZWY6IGFueSwgb3BlcmF0b3I/OiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZykge1xuICAgIGlmIChzZWFyY2hUZXJtcyAmJiBjb2x1bW5EZWYpIHtcbiAgICAgIC8vIHRoaXMuX2NvbHVtbkZpbHRlcnMuc2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcztcbiAgICAgIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXSA9IHtcbiAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkRlZi5pZCxcbiAgICAgICAgY29sdW1uRGVmLFxuICAgICAgICBzZWFyY2hUZXJtcyxcbiAgICAgICAgb3BlcmF0b3JcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmlnZ2VyRXZlbnQoc2xpY2tFdmVudDogYW55LCBhcmdzOiBhbnksIGU6IGFueSkge1xuICAgIHNsaWNrRXZlbnQgPSBzbGlja0V2ZW50IHx8IG5ldyBTbGljay5FdmVudCgpO1xuXG4gICAgLy8gZXZlbnQgbWlnaHQgaGF2ZSBiZWVuIGNyZWF0ZWQgYXMgYSBDdXN0b21FdmVudCAoZS5nLiBDb21wb3VuZERhdGVGaWx0ZXIpLCB3aXRob3V0IGJlaW5nIGEgdmFsaWQgU2xpY2suRXZlbnREYXRhLlxuICAgIC8vIGlmIHNvIHdlIHdpbGwgY3JlYXRlIGEgbmV3IFNsaWNrLkV2ZW50RGF0YSBhbmQgbWVyZ2UgaXQgd2l0aCB0aGF0IEN1c3RvbUV2ZW50IHRvIGF2b2lkIGhhdmluZyBTbGlja0dyaWQgZXJyb3JzXG4gICAgbGV0IGV2ZW50ID0gZTtcbiAgICBpZiAoZSAmJiB0eXBlb2YgZS5pc1Byb3BhZ2F0aW9uU3RvcHBlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZlbnQgPSAkLmV4dGVuZCh7fSwgbmV3IFNsaWNrLkV2ZW50RGF0YSgpLCBlKTtcbiAgICB9XG4gICAgc2xpY2tFdmVudC5ub3RpZnkoYXJncywgZXZlbnQsIGFyZ3MuZ3JpZCk7XG4gIH1cbn1cbiJdfQ==