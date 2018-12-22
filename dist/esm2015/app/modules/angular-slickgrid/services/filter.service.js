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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBT0wsU0FBUyxFQUVULFlBQVksRUFLYixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxLQUFLLFFBQVEsTUFBTSxnQkFBZ0IsQ0FBQzs7TUFDckMsT0FBTyxHQUFHLFFBQVE7QUFPeEIsTUFBTSxPQUFPLGFBQWE7Ozs7SUFXeEIsWUFBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFWeEMsa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUkzQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUVXLENBQUM7Ozs7OztJQUdyRCxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUs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Q29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZpbHRlckNvbmRpdGlvbnMgfSBmcm9tICcuLy4uL2ZpbHRlci1jb25kaXRpb25zJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIENvbHVtbkZpbHRlcnMsXHJcbiAgRmlsdGVyLFxyXG4gIEZpbHRlckFyZ3VtZW50cyxcclxuICBGaWx0ZXJDYWxsYmFja0FyZyxcclxuICBGaWVsZFR5cGUsXHJcbiAgR3JpZE9wdGlvbixcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgQ3VycmVudEZpbHRlcixcclxuICBTZWFyY2hUZXJtLFxyXG4gIFNsaWNrRXZlbnQsXHJcbiAgT3BlcmF0b3JTdHJpbmdcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UsIGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgRmlsdGVyRmFjdG9yeSB9IGZyb20gJy4uL2ZpbHRlcnMvZmlsdGVyRmFjdG9yeSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgaXNlcXVhbF8gZnJvbSAnbG9kYXNoLmlzZXF1YWwnO1xyXG5jb25zdCBpc2VxdWFsID0gaXNlcXVhbF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgdG8gd29ya1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfc2xpY2tTdWJzY3JpYmVyOiBTbGlja0V2ZW50O1xyXG4gIHByaXZhdGUgX2ZpbHRlcnM6IGFueVtdID0gW107XHJcbiAgcHJpdmF0ZSBfY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyA9IHt9O1xyXG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX29uRmlsdGVyQ2hhbmdlZE9wdGlvbnM6IGFueTtcclxuICBvbkZpbHRlckNoYW5nZWQgPSBuZXcgU3ViamVjdDxDdXJyZW50RmlsdGVyW10+KCk7XHJcbiAgb25GaWx0ZXJDbGVhcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaWx0ZXJGYWN0b3J5OiBGaWx0ZXJGYWN0b3J5KSB7IH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XHJcbiAgfVxyXG5cclxuICBpbml0KGdyaWQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2ggYSBiYWNrZW5kIGZpbHRlciBob29rIHRvIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XHJcbiAgICovXHJcbiAgYXR0YWNoQmFja2VuZE9uRmlsdGVyKGdyaWQ6IGFueSkge1xyXG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gbmV3IFNsaWNrLkV2ZW50KCk7XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBTbGlja0dyaWQgZXZlbnQgYW5kIGNhbGwgdGhlIGJhY2tlbmQgZXhlY3V0aW9uXHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMuYXR0YWNoQmFja2VuZE9uRmlsdGVyU3Vic2NyaWJlLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkLCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGF0dGFjaEJhY2tlbmRPbkZpbHRlclN1YnNjcmliZShldmVudDogRXZlbnQsIGFyZ3M6IGFueSkge1xyXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdHRhY2ggdGhlIFwiYXR0YWNoQmFja2VuZE9uRmlsdGVyU3Vic2NyaWJlKGV2ZW50LCBhcmdzKVwiIGZ1bmN0aW9uLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cclxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgIC8vIHJ1biBhIHByZVByb2Nlc3MgY2FsbGJhY2sgaWYgZGVmaW5lZFxyXG4gICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2UgdG8gZ2V0IGEgcXVlcnkgYmFja1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGF3YWl0IGJhY2tlbmRBcGkuc2VydmljZS5wcm9jZXNzT25GaWx0ZXJDaGFuZ2VkKGV2ZW50LCBhcmdzKTtcclxuXHJcbiAgICAgIC8vIGVtaXQgYW4gb25GaWx0ZXJDaGFuZ2VkIGV2ZW50XHJcbiAgICAgIGlmIChhcmdzICYmICFhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZCgncmVtb3RlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRoZSBwcm9jZXNzIGNvdWxkIGJlIGFuIE9ic2VydmFibGUgKGxpa2UgSHR0cENsaWVudCkgb3IgYSBQcm9taXNlXHJcbiAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXHJcbiAgICAgIGNvbnN0IG9ic2VydmFibGVPclByb21pc2UgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG4gICAgICBjb25zdCBwcm9jZXNzUmVzdWx0ID0gYXdhaXQgY2FzdFRvUHJvbWlzZShvYnNlcnZhYmxlT3JQcm9taXNlKTtcclxuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAvLyBmcm9tIHRoZSByZXN1bHQsIGNhbGwgb3VyIGludGVybmFsIHBvc3QgcHJvY2VzcyB0byB1cGRhdGUgdGhlIERhdGFzZXQgYW5kIFBhZ2luYXRpb24gaW5mb1xyXG4gICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpLnBvc3RQcm9jZXNzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgcHJvY2Vzc1Jlc3VsdC5zdGF0aXN0aWNzID0ge1xyXG4gICAgICAgICAgICBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgIGVuZFRpbWUsXHJcbiAgICAgICAgICAgIGV4ZWN1dGlvblRpbWU6IGVuZFRpbWUudmFsdWVPZigpIC0gc3RhcnRUaW1lLnZhbHVlT2YoKSxcclxuICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgdGhpcy5fZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub25FcnJvcikge1xyXG4gICAgICAgIGJhY2tlbmRBcGkub25FcnJvcihlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2ggYSBsb2NhbCBmaWx0ZXIgaG9vayB0byB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxyXG4gICAqIEBwYXJhbSBkYXRhVmlld1xyXG4gICAqL1xyXG4gIGF0dGFjaExvY2FsT25GaWx0ZXIoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9maWx0ZXJzID0gW107XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gbmV3IFNsaWNrLkV2ZW50KCk7XHJcblxyXG4gICAgZGF0YVZpZXcuc2V0RmlsdGVyQXJncyh7IGNvbHVtbkZpbHRlcnM6IHRoaXMuX2NvbHVtbkZpbHRlcnMsIGdyaWQ6IHRoaXMuX2dyaWQgfSk7XHJcbiAgICBkYXRhVmlldy5zZXRGaWx0ZXIodGhpcy5jdXN0b21Mb2NhbEZpbHRlci5iaW5kKHRoaXMsIGRhdGFWaWV3KSk7XHJcblxyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSgoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgY29sdW1uSWQgPSBhcmdzLmNvbHVtbklkO1xyXG4gICAgICBpZiAoY29sdW1uSWQgIT0gbnVsbCkge1xyXG4gICAgICAgIGRhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYXJncyAmJiAhYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICAgIHRoaXMuZW1pdEZpbHRlckNoYW5nZWQoJ2xvY2FsJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkLCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmFkZEZpbHRlclRlbXBsYXRlVG9IZWFkZXJSb3coYXJncyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBDbGVhciB0aGUgc2VhcmNoIGZpbHRlcnMgKGJlbG93IHRoZSBjb2x1bW4gdGl0bGVzKSAqL1xyXG4gIGNsZWFyRmlsdGVycygpIHtcclxuICAgIHRoaXMuX2ZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyOiBGaWx0ZXIpID0+IHtcclxuICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuY2xlYXIpIHtcclxuICAgICAgICAvLyBjbGVhciBlbGVtZW50IGFuZCB0cmlnZ2VyIGEgY2hhbmdlXHJcbiAgICAgICAgZmlsdGVyLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5GaWx0ZXJzIGFuZCBkZWxldGUgdGhlbSAxIGJ5IDFcclxuICAgIC8vIG9ubHkgdHJ5aW5nIHRvIGNsZWFyIGNvbHVtbkZpbHRlciAod2l0aG91dCBsb29waW5nIHRocm91Z2gpIHdvdWxkIG5vdCB0cmlnZ2VyIGEgZGF0YXNldCBjaGFuZ2VcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gdGhpcy5fY29sdW1uRmlsdGVycykge1xyXG4gICAgICBpZiAoY29sdW1uSWQgJiYgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF0pIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gcmVmcmVzaCB0aGUgZGF0YVZpZXcgYW5kIG9wdGlvbmFsbHkgdGhlIGdyaWQgKGl0J3Mgb3B0aW9uYWwgc2luY2Ugd2UgdXNlIERhdGFWaWV3KVxyXG4gICAgaWYgKHRoaXMuX2RhdGFWaWV3KSB7XHJcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIHRoaXMuX2dyaWQucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlcnMgYXJlIGFsbCBjbGVhcmVkXHJcbiAgICB0aGlzLm9uRmlsdGVyQ2xlYXJlZC5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tTG9jYWxGaWx0ZXIoZGF0YVZpZXc6IGFueSwgaXRlbTogYW55LCBhcmdzOiBhbnkpIHtcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgb2YgT2JqZWN0LmtleXMoYXJncy5jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBhcmdzLmNvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW5JZCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5zKClbY29sdW1uSW5kZXhdO1xyXG4gICAgICBpZiAoIWNvbHVtbkRlZikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmllbGROYW1lID0gY29sdW1uRGVmLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnF1ZXJ5RmllbGRGaWx0ZXIgfHwgY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xyXG4gICAgICBjb25zdCBmaWx0ZXJTZWFyY2hUeXBlID0gKGNvbHVtbkRlZi5maWx0ZXJTZWFyY2hUeXBlKSA/IGNvbHVtbkRlZi5maWx0ZXJTZWFyY2hUeXBlIDogbnVsbDtcclxuICAgICAgbGV0IGNlbGxWYWx1ZSA9IGl0ZW1bZmllbGROYW1lXTtcclxuXHJcbiAgICAgIC8vIHdoZW4gaXRlbSBpcyBhIGNvbXBsZXggb2JqZWN0IChkb3QgXCIuXCIgbm90YXRpb24pLCB3ZSBuZWVkIHRvIGZpbHRlciB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBvYmplY3QgdHJlZVxyXG4gICAgICBpZiAoZmllbGROYW1lLmluZGV4T2YoJy4nKSA+PSAwKSB7XHJcbiAgICAgICAgY2VsbFZhbHVlID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGl0ZW0sIGZpZWxkTmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHdlIGZpbmQgc2VhcmNoVGVybXMgdXNlIHRoZW0gYnV0IG1ha2UgYSBkZWVwIGNvcHkgc28gdGhhdCB3ZSBkb24ndCBhZmZlY3Qgb3JpZ2luYWwgYXJyYXlcclxuICAgICAgLy8gd2UgbWlnaHQgaGF2ZSB0byBvdmVyd3JpdGUgdGhlIHZhbHVlKHMpIGxvY2FsbHkgdGhhdCBhcmUgcmV0dXJuZWRcclxuICAgICAgLy8gZS5nOiB3ZSBkb24ndCB3YW50IHRvIG9wZXJhdG9yIHdpdGhpbiB0aGUgc2VhcmNoIHZhbHVlLCBzaW5jZSBpdCB3aWxsIGZhaWwgZmlsdGVyIGNvbmRpdGlvbiBjaGVjayB0cmlnZ2VyIGFmdGVyd2FyZFxyXG4gICAgICBjb25zdCBzZWFyY2hWYWx1ZXMgPSAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcykgPyBbLi4uY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zXSA6IG51bGw7XHJcblxyXG4gICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA9PT0gMSkgPyBzZWFyY2hWYWx1ZXNbMF0gOiAnJztcclxuICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnICsgZmllbGRTZWFyY2hWYWx1ZTsgLy8gbWFrZSBzdXJlIGl0J3MgYSBzdHJpbmdcclxuXHJcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBmaWVsZFNlYXJjaFZhbHVlLm1hdGNoKC9eKFs8PiE9XFwqXXswLDJ9KSguKltePD4hPVxcKl0pKFtcXCpdPykkLyk7IC8vIGdyb3VwIDE6IE9wZXJhdG9yLCAyOiBzZWFyY2hWYWx1ZSwgMzogbGFzdCBjaGFyIGlzICcqJyAobWVhbmluZyBzdGFydHMgd2l0aCwgZXguOiBhYmMqKVxyXG4gICAgICBsZXQgb3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3IgfHwgKChtYXRjaGVzKSA/IG1hdGNoZXNbMV0gOiAnJyk7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbMl0gOiAnJztcclxuICAgICAgY29uc3QgbGFzdFZhbHVlQ2hhciA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1szXSA6IChvcGVyYXRvciA9PT0gJyp6JyA/ICcqJyA6ICcnKTtcclxuXHJcbiAgICAgIGlmIChzZWFyY2hWYWx1ZXMgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gc2VhcmNoVmFsdWVzLmpvaW4oJywnKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmllbGRTZWFyY2hWYWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBlc2NhcGluZyB0aGUgc2VhcmNoIHZhbHVlXHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9IGZpZWxkU2VhcmNoVmFsdWUucmVwbGFjZShgJ2AsIGAnJ2ApOyAvLyBlc2NhcGUgc2luZ2xlIHF1b3RlcyBieSBkb3VibGluZyB0aGVtXHJcbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnKicgfHwgb3BlcmF0b3IgPT09ICdhKicgfHwgb3BlcmF0b3IgPT09ICcqeicgfHwgbGFzdFZhbHVlQ2hhciA9PT0gJyonKSB7XHJcbiAgICAgICAgICBvcGVyYXRvciA9IChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnKnonKSA/IE9wZXJhdG9yVHlwZS5lbmRzV2l0aCA6IE9wZXJhdG9yVHlwZS5zdGFydHNXaXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbm8gbmVlZCB0byBxdWVyeSBpZiBzZWFyY2ggdmFsdWUgaXMgZW1wdHlcclxuICAgICAgaWYgKHNlYXJjaFRlcm0gPT09ICcnICYmICghc2VhcmNoVmFsdWVzIHx8IChBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgc2VhcmNoVmFsdWVzLmxlbmd0aCA9PT0gMCkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHNlYXJjaCB2YWx1ZSBoYXMgYSByZWdleCBtYXRjaCB3ZSB3aWxsIG9ubHkga2VlcCB0aGUgdmFsdWUgd2l0aG91dCB0aGUgb3BlcmF0b3JcclxuICAgICAgLy8gaW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gb3ZlcndyaXRlIHRoZSByZXR1cm5lZCBzZWFyY2ggdmFsdWVzIHRvIHRydW5jYXRlIG9wZXJhdG9yIGZyb20gdGhlIHN0cmluZyBzZWFyY2hcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2hlcykgJiYgbWF0Y2hlcy5sZW5ndGggPj0gMSAmJiAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDEpKSB7XHJcbiAgICAgICAgc2VhcmNoVmFsdWVzWzBdID0gc2VhcmNoVGVybTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZmlsdGVyIHNlYXJjaCB0ZXJtcyBzaG91bGQgYWx3YXlzIGJlIHN0cmluZyB0eXBlIChldmVuIHRob3VnaCB3ZSBwZXJtaXQgdGhlIGVuZCB1c2VyIHRvIGlucHV0IG51bWJlcnMpXHJcbiAgICAgIC8vIHNvIG1ha2Ugc3VyZSBlYWNoIHRlcm0gYXJlIHN0cmluZ3MsIGlmIHVzZXIgaGFzIHNvbWUgZGVmYXVsdCBzZWFyY2ggdGVybXMsIHdlIHdpbGwgY2FzdCB0aGVtIHRvIHN0cmluZ1xyXG4gICAgICBpZiAoc2VhcmNoVmFsdWVzICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSkge1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwLCBsbiA9IHNlYXJjaFZhbHVlcy5sZW5ndGg7IGsgPCBsbjsgaysrKSB7XHJcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgYWxsIHNlYXJjaCB0ZXJtcyBhcmUgc3RyaW5nc1xyXG4gICAgICAgICAgc2VhcmNoVmFsdWVzW2tdID0gKChzZWFyY2hWYWx1ZXNba10gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hWYWx1ZXNba10gPT09IG51bGwpID8gJycgOiBzZWFyY2hWYWx1ZXNba10pICsgJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB3aGVuIHVzaW5nIGxvY2FsaXphdGlvbiAoaTE4biksIHdlIHNob3VsZCB1c2UgdGhlIGZvcm1hdHRlciBvdXRwdXQgdG8gc2VhcmNoIGFzIHRoZSBuZXcgY2VsbCB2YWx1ZVxyXG4gICAgICBpZiAoY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy51c2VGb3JtYXR0ZXJPdXB1dFRvRmlsdGVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm93SW5kZXggPSAoZGF0YVZpZXcgJiYgdHlwZW9mIGRhdGFWaWV3LmdldElkeEJ5SWQgPT09ICdmdW5jdGlvbicpID8gZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtLmlkKSA6IDA7XHJcbiAgICAgICAgY2VsbFZhbHVlID0gY29sdW1uRGVmLmZvcm1hdHRlcihyb3dJbmRleCwgY29sdW1uSW5kZXgsIGNlbGxWYWx1ZSwgY29sdW1uRGVmLCBpdGVtLCB0aGlzLl9ncmlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbWFrZSBzdXJlIGNlbGwgdmFsdWUgaXMgYWx3YXlzIGEgc3RyaW5nXHJcbiAgICAgIGlmICh0eXBlb2YgY2VsbFZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNlbGxWYWx1ZSA9IGNlbGxWYWx1ZS50b1N0cmluZygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb25kaXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGZpZWxkVHlwZSxcclxuICAgICAgICBzZWFyY2hUZXJtczogc2VhcmNoVmFsdWVzLFxyXG4gICAgICAgIGNlbGxWYWx1ZSxcclxuICAgICAgICBvcGVyYXRvcixcclxuICAgICAgICBjZWxsVmFsdWVMYXN0Q2hhcjogbGFzdFZhbHVlQ2hhcixcclxuICAgICAgICBmaWx0ZXJTZWFyY2hUeXBlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoIUZpbHRlckNvbmRpdGlvbnMuZXhlY3V0ZU1hcHBlZENvbmRpdGlvbihjb25kaXRpb25PcHRpb25zKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuZGlzcG9zZUNvbHVtbkZpbHRlcnMoKTtcclxuXHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcblxyXG4gICAgLy8gdW5zdWJzY3JpYmUgbG9jYWwgZXZlbnRcclxuICAgIGlmICh0aGlzLl9zbGlja1N1YnNjcmliZXIgJiYgdHlwZW9mIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2Ugb2YgdGhlIGZpbHRlcnMsIHNpbmNlIGl0J3MgYSBzaW5nbGV0b24sIHdlIGRvbid0IHdhbnQgdG8gYWZmZWN0IG90aGVyIGdyaWRzIHdpdGggc2FtZSBjb2x1bW5zXHJcbiAgICovXHJcbiAgZGlzcG9zZUNvbHVtbkZpbHRlcnMoKSB7XHJcbiAgICAvLyB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uRmlsdGVycyBhbmQgZGVsZXRlIHRoZW0gMSBieSAxXHJcbiAgICAvLyBvbmx5IHRyeWluZyB0byBtYWtlIGNvbHVtbkZpbHRlciBhbiBlbXB0eSAod2l0aG91dCBsb29waW5nKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbHVtbklkICYmIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBkZXN0cm95IGVhY2ggRmlsdGVyIGluc3RhbmNlc1xyXG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChmaWx0ZXIgJiYgZmlsdGVyLmRlc3Ryb3kpIHtcclxuICAgICAgICBmaWx0ZXIuZGVzdHJveSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDb2x1bW5GaWx0ZXJzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbkZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50TG9jYWxGaWx0ZXJzKCk6IEN1cnJlbnRGaWx0ZXJbXSB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsdGVyczogQ3VycmVudEZpbHRlcltdID0gW107XHJcbiAgICBpZiAodGhpcy5fY29sdW1uRmlsdGVycykge1xyXG4gICAgICBmb3IgKGNvbnN0IGNvbElkIG9mIE9iamVjdC5rZXlzKHRoaXMuX2NvbHVtbkZpbHRlcnMpKSB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVyID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2xJZF07XHJcbiAgICAgICAgY29uc3QgY29sdW1uRGVmID0gY29sdW1uRmlsdGVyLmNvbHVtbkRlZjtcclxuICAgICAgICBjb25zdCBmaWx0ZXIgPSB7IGNvbHVtbklkOiBjb2xJZCB8fCAnJyB9IGFzIEN1cnJlbnRGaWx0ZXI7XHJcblxyXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXIgJiYgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuc2VhcmNoVGVybXMgPSBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXIub3BlcmF0b3IpIHtcclxuICAgICAgICAgIGZpbHRlci5vcGVyYXRvciA9IGNvbHVtbkZpbHRlci5vcGVyYXRvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyLnNlYXJjaFRlcm1zKSAmJiBmaWx0ZXIuc2VhcmNoVGVybXMubGVuZ3RoID4gMCAmJiBmaWx0ZXIuc2VhcmNoVGVybXNbMF0gIT09ICcnKSB7XHJcbiAgICAgICAgICBjdXJyZW50RmlsdGVycy5wdXNoKGZpbHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudEZpbHRlcnM7XHJcbiAgfVxyXG5cclxuICBjYWxsYmFja1NlYXJjaEV2ZW50KGU6IEV2ZW50IHwgdW5kZWZpbmVkLCBhcmdzOiBGaWx0ZXJDYWxsYmFja0FyZykge1xyXG4gICAgaWYgKGFyZ3MpIHtcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9ICgoZSAmJiBlLnRhcmdldCkgPyAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgOiB1bmRlZmluZWQpO1xyXG4gICAgICBjb25zdCBzZWFyY2hUZXJtcyA9IChhcmdzLnNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoYXJncy5zZWFyY2hUZXJtcykpID8gYXJncy5zZWFyY2hUZXJtcyA6IChzZWFyY2hUZXJtID8gW3NlYXJjaFRlcm1dIDogdW5kZWZpbmVkKTtcclxuICAgICAgY29uc3QgY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWYgfHwgbnVsbDtcclxuICAgICAgY29uc3QgY29sdW1uSWQgPSBjb2x1bW5EZWYgPyAoY29sdW1uRGVmLmlkIHx8ICcnKSA6ICcnO1xyXG4gICAgICBjb25zdCBvcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3IgfHwgdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBoYXNTZWFyY2hUZXJtcyA9IHNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoVGVybXMpO1xyXG4gICAgICBjb25zdCB0ZXJtc0NvdW50ID0gaGFzU2VhcmNoVGVybXMgJiYgc2VhcmNoVGVybXMubGVuZ3RoO1xyXG4gICAgICBjb25zdCBvbGRDb2x1bW5GaWx0ZXJzID0geyAuLi50aGlzLl9jb2x1bW5GaWx0ZXJzIH07XHJcblxyXG4gICAgICBpZiAoIWhhc1NlYXJjaFRlcm1zIHx8IHRlcm1zQ291bnQgPT09IDAgfHwgKHRlcm1zQ291bnQgPT09IDEgJiYgc2VhcmNoVGVybXNbMF0gPT09ICcnKSkge1xyXG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgcHJvcGVydHkgZnJvbSB0aGUgY29sdW1uRmlsdGVycyB3aGVuIGl0IGJlY29tZXMgZW1wdHlcclxuICAgICAgICAvLyB3aXRob3V0IGRvaW5nIHRoaXMsIGl0IHdvdWxkIGxlYXZlIGFuIGluY29ycmVjdCBzdGF0ZSBvZiB0aGUgcHJldmlvdXMgY29sdW1uIGZpbHRlcnMgd2hlbiBmaWx0ZXJpbmcgb24gYW5vdGhlciBjb2x1bW5cclxuICAgICAgICBkZWxldGUgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5JZF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgY29sSWQgPSAnJyArIGNvbHVtbklkIGFzIHN0cmluZztcclxuICAgICAgICBjb25zdCBjb2xGaWx0ZXI6IENvbHVtbkZpbHRlciA9IHtcclxuICAgICAgICAgIGNvbHVtbklkOiBjb2xJZCxcclxuICAgICAgICAgIGNvbHVtbkRlZixcclxuICAgICAgICAgIHNlYXJjaFRlcm1zLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgICBjb2xGaWx0ZXIub3BlcmF0b3IgPSBvcGVyYXRvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY29sdW1uRmlsdGVyc1tjb2xJZF0gPSBjb2xGaWx0ZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRyaWdnZXIgYW4gZXZlbnQgb25seSBpZiBGaWx0ZXJzIGNoYW5nZWRcclxuICAgICAgaWYgKCFpc2VxdWFsKG9sZENvbHVtbkZpbHRlcnMsIHRoaXMuX2NvbHVtbkZpbHRlcnMpKSB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQodGhpcy5fc2xpY2tTdWJzY3JpYmVyLCB7XHJcbiAgICAgICAgICBjbGVhckZpbHRlclRyaWdnZXJlZDogYXJncyAmJiBhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkLFxyXG4gICAgICAgICAgY29sdW1uSWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWY6IGFyZ3MuY29sdW1uRGVmIHx8IG51bGwsXHJcbiAgICAgICAgICBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLFxyXG4gICAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICAgIHNlcnZpY2VPcHRpb25zOiB0aGlzLl9vbkZpbHRlckNoYW5nZWRPcHRpb25zLFxyXG4gICAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZFxyXG4gICAgICAgIH0sIGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRGaWx0ZXJUZW1wbGF0ZVRvSGVhZGVyUm93KGFyZ3M6IHsgY29sdW1uOiBDb2x1bW47IGdyaWQ6IGFueTsgbm9kZTogYW55IH0pIHtcclxuICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uO1xyXG4gICAgY29uc3QgY29sdW1uSWQgPSBjb2x1bW5EZWYuaWQgfHwgJyc7XHJcblxyXG4gICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5JZCAhPT0gJ3NlbGVjdG9yJyAmJiBjb2x1bW5EZWYuZmlsdGVyYWJsZSkge1xyXG4gICAgICBsZXQgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSB8IHVuZGVmaW5lZDtcclxuICAgICAgbGV0IG9wZXJhdG9yOiBPcGVyYXRvclN0cmluZyB8IE9wZXJhdG9yVHlwZTtcclxuICAgICAgY29uc3QgZmlsdGVyOiBGaWx0ZXIgfCB1bmRlZmluZWQgPSB0aGlzLmZpbHRlckZhY3RvcnkuY3JlYXRlRmlsdGVyKGFyZ3MuY29sdW1uLmZpbHRlcik7XHJcbiAgICAgIG9wZXJhdG9yID0gKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuZmlsdGVyICYmIGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHx8IChmaWx0ZXIgJiYgZmlsdGVyLm9wZXJhdG9yKSB8fCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBpZiAodGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdKSB7XHJcbiAgICAgICAgc2VhcmNoVGVybXMgPSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0uc2VhcmNoVGVybXMgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIG9wZXJhdG9yID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdLm9wZXJhdG9yIHx8IHVuZGVmaW5lZDtcclxuICAgICAgfSBlbHNlIGlmIChjb2x1bW5EZWYuZmlsdGVyKSB7XHJcbiAgICAgICAgLy8gd2hlbiBoaWRpbmcvc2hvd2luZyAod2l0aCBDb2x1bW4gUGlja2VyIG9yIEdyaWQgTWVudSksIGl0IHdpbGwgdHJ5IHRvIHJlLWNyZWF0ZSB5ZXQgYWdhaW4gdGhlIGZpbHRlcnMgKHNpbmNlIFNsaWNrR3JpZCBkb2VzIGEgcmUtcmVuZGVyKVxyXG4gICAgICAgIC8vIGJlY2F1c2Ugb2YgdGhhdCB3ZSBuZWVkIHRvIGZpcnN0IGdldCBzZWFyY2hUZXJtKHMpIGZyb20gdGhlIGNvbHVtbkZpbHRlcnMgKHRoYXQgaXMgd2hhdCB0aGUgdXNlciBsYXN0IGVudGVyZWQpXHJcbiAgICAgICAgc2VhcmNoVGVybXMgPSBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvbHVtbkZpbHRlcnMoc2VhcmNoVGVybXMsIGNvbHVtbkRlZiwgb3BlcmF0b3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmaWx0ZXJBcmd1bWVudHM6IEZpbHRlckFyZ3VtZW50cyA9IHtcclxuICAgICAgICBncmlkOiB0aGlzLl9ncmlkLFxyXG4gICAgICAgIG9wZXJhdG9yLFxyXG4gICAgICAgIHNlYXJjaFRlcm1zLFxyXG4gICAgICAgIGNvbHVtbkRlZixcclxuICAgICAgICBjYWxsYmFjazogdGhpcy5jYWxsYmFja1NlYXJjaEV2ZW50LmJpbmQodGhpcylcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICBmaWx0ZXIuaW5pdChmaWx0ZXJBcmd1bWVudHMpO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlckV4aXN0SW5kZXggPSB0aGlzLl9maWx0ZXJzLmZpbmRJbmRleCgoZmlsdCkgPT4gZmlsdGVyLmNvbHVtbkRlZi5uYW1lID09PSBmaWx0LmNvbHVtbkRlZi5uYW1lKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRvIHRoZSBmaWx0ZXJzIGFycmF5cyBvciByZXBsYWNlIGl0IHdoZW4gZm91bmRcclxuICAgICAgICBpZiAoZmlsdGVyRXhpc3RJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuX2ZpbHRlcnMucHVzaChmaWx0ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9maWx0ZXJzW2ZpbHRlckV4aXN0SW5kZXhdID0gZmlsdGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hlbiBoaWRpbmcvc2hvd2luZyAod2l0aCBDb2x1bW4gUGlja2VyIG9yIEdyaWQgTWVudSksIGl0IHdpbGwgdHJ5IHRvIHJlLWNyZWF0ZSB5ZXQgYWdhaW4gdGhlIGZpbHRlcnMgKHNpbmNlIFNsaWNrR3JpZCBkb2VzIGEgcmUtcmVuZGVyKVxyXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gYWxzbyBzZXQgYWdhaW4gdGhlIHZhbHVlcyBpbiB0aGUgRE9NIGVsZW1lbnRzIGlmIHRoZSB2YWx1ZXMgd2VyZSBzZXQgYnkgYSBzZWFyY2hUZXJtKHMpXHJcbiAgICAgICAgaWYgKHNlYXJjaFRlcm1zICYmIGZpbHRlci5zZXRWYWx1ZXMpIHtcclxuICAgICAgICAgIGZpbHRlci5zZXRWYWx1ZXMoc2VhcmNoVGVybXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBzaW1wbGUgZnVuY3Rpb24gdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgc3Vic2NyaWJlciBhbmQgZW1pdCBhIGNoYW5nZSB3aGVuIHRoZSBzb3J0IGlzIGNhbGxlZC5cclxuICAgKiBPdGhlciBzZXJ2aWNlcywgbGlrZSBQYWdpbmF0aW9uLCBjYW4gdGhlbiBzdWJzY3JpYmUgdG8gaXQuXHJcbiAgICogQHBhcmFtIHNlbmRlclxyXG4gICAqL1xyXG4gIGVtaXRGaWx0ZXJDaGFuZ2VkKHNlbmRlcjogJ2xvY2FsJyB8ICdyZW1vdGUnKSB7XHJcbiAgICBpZiAoc2VuZGVyID09PSAncmVtb3RlJyAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBsZXQgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycykge1xyXG4gICAgICAgIGN1cnJlbnRGaWx0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMoKSBhcyBDdXJyZW50RmlsdGVyW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dChjdXJyZW50RmlsdGVycyk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbmRlciA9PT0gJ2xvY2FsJykge1xyXG4gICAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlZC5uZXh0KHRoaXMuZ2V0Q3VycmVudExvY2FsRmlsdGVycygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdXNlciBwYXNzZXMgYW4gYXJyYXkgb2YgcHJlc2V0IGZpbHRlcnMsIHdlIG5lZWQgdG8gcHJlLXBvcHVsYXRlIGVhY2ggY29sdW1uIGZpbHRlciBzZWFyY2hUZXJtKHMpXHJcbiAgICogVGhlIHByb2Nlc3MgaXMgdG8gbG9vcCB0aHJvdWdoIHRoZSBwcmVzZXQgZmlsdGVycyBhcnJheSwgZmluZCB0aGUgYXNzb2NpYXRlZCBjb2x1bW4gZnJvbSBjb2x1bW5EZWZpbml0aW9ucyBhbmQgZmlsbCBpbiB0aGUgZmlsdGVyIG9iamVjdCBzZWFyY2hUZXJtKHMpXHJcbiAgICogVGhpcyBpcyBiYXNpY2FsbHkgdGhlIHNhbWUgYXMgaWYgd2Ugd291bGQgbWFudWFsbHkgYWRkIHNlYXJjaFRlcm0ocykgdG8gYSBjb2x1bW4gZmlsdGVyIG9iamVjdCBpbiB0aGUgY29sdW1uIGRlZmluaXRpb24sIGJ1dCB3ZSBkbyBpdCBwcm9ncmFtbWF0aWNhbGx5LlxyXG4gICAqIEF0IHRoZSBlbmQgb2YgdGhlIGRheSwgd2hlbiBjcmVhdGluZyB0aGUgRmlsdGVyIChET00gRWxlbWVudCksIGl0IHdpbGwgdXNlIHRoZXNlIHNlYXJjaFRlcm0ocykgc28gd2UgY2FuIHRha2UgYWR2YW50YWdlIG9mIHRoYXQgd2l0aG91dCByZWNvZGluZyBlYWNoIEZpbHRlciB0eXBlIChET00gZWxlbWVudClcclxuICAgKi9cclxuICBwb3B1bGF0ZUNvbHVtbkZpbHRlclNlYXJjaFRlcm1zKCkge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMpICYmIHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnM7XHJcbiAgICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZvckVhY2goKGNvbHVtbkRlZjogQ29sdW1uKSA9PiAge1xyXG4gICAgICAgIC8vIGNsZWFyIGFueSBjb2x1bW5EZWYgc2VhcmNoVGVybXMgYmVmb3JlIGFwcGx5aW5nIFByZXNldHNcclxuICAgICAgICBpZiAoY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zKSB7XHJcbiAgICAgICAgICBkZWxldGUgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZyb20gZWFjaCBwcmVzZXRzLCB3ZSB3aWxsIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uRGVmIGFuZCBhcHBseSB0aGUgcHJlc2V0IHNlYXJjaFRlcm1zICYgb3BlcmF0b3IgaWYgdGhlcmUgaXNcclxuICAgICAgICBjb25zdCBjb2x1bW5QcmVzZXQgPSBmaWx0ZXJzLmZpbmQoKHByZXNldEZpbHRlcjogQ3VycmVudEZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZXNldEZpbHRlci5jb2x1bW5JZCA9PT0gY29sdW1uRGVmLmlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb2x1bW5QcmVzZXQgJiYgY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zKSkge1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlciA9IGNvbHVtbkRlZi5maWx0ZXIgfHwge307XHJcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yID0gY29sdW1uUHJlc2V0Lm9wZXJhdG9yIHx8IGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IgfHwgJyc7XHJcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zID0gY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUNvbHVtbkZpbHRlcnMoc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSB8IHVuZGVmaW5lZCwgY29sdW1uRGVmOiBhbnksIG9wZXJhdG9yPzogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIGlmIChzZWFyY2hUZXJtcyAmJiBjb2x1bW5EZWYpIHtcclxuICAgICAgLy8gdGhpcy5fY29sdW1uRmlsdGVycy5zZWFyY2hUZXJtcyA9IHNlYXJjaFRlcm1zO1xyXG4gICAgICB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0gPSB7XHJcbiAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkRlZi5pZCxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgb3BlcmF0b3JcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50KHNsaWNrRXZlbnQ6IGFueSwgYXJnczogYW55LCBlOiBhbnkpIHtcclxuICAgIHNsaWNrRXZlbnQgPSBzbGlja0V2ZW50IHx8IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIC8vIGV2ZW50IG1pZ2h0IGhhdmUgYmVlbiBjcmVhdGVkIGFzIGEgQ3VzdG9tRXZlbnQgKGUuZy4gQ29tcG91bmREYXRlRmlsdGVyKSwgd2l0aG91dCBiZWluZyBhIHZhbGlkIFNsaWNrLkV2ZW50RGF0YS5cclxuICAgIC8vIGlmIHNvIHdlIHdpbGwgY3JlYXRlIGEgbmV3IFNsaWNrLkV2ZW50RGF0YSBhbmQgbWVyZ2UgaXQgd2l0aCB0aGF0IEN1c3RvbUV2ZW50IHRvIGF2b2lkIGhhdmluZyBTbGlja0dyaWQgZXJyb3JzXHJcbiAgICBsZXQgZXZlbnQgPSBlO1xyXG4gICAgaWYgKGUgJiYgdHlwZW9mIGUuaXNQcm9wYWdhdGlvblN0b3BwZWQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgZXZlbnQgPSAkLmV4dGVuZCh7fSwgbmV3IFNsaWNrLkV2ZW50RGF0YSgpLCBlKTtcclxuICAgIH1cclxuICAgIHNsaWNrRXZlbnQubm90aWZ5KGFyZ3MsIGV2ZW50LCBhcmdzLmdyaWQpO1xyXG4gIH1cclxufVxyXG4iXX0=