/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { castToPromise } from './utilities';
import { FieldType, SortDirection } from './../models/index';
import { getDescendantProperty } from './utilities';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { Subject } from 'rxjs';
var SortService = /** @class */ (function () {
    function SortService() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject();
        this.onSortCleared = new Subject();
    }
    Object.defineProperty(SortService.prototype, "_gridOptions", {
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
    Object.defineProperty(SortService.prototype, "_columnDefinitions", {
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
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView SlickGrid DataView object
     */
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView SlickGrid DataView object
     * @return {?}
     */
    SortService.prototype.attachBackendOnSort = /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView SlickGrid DataView object
     * @return {?}
     */
    function (grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    };
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    SortService.prototype.onBackendSortChanged = /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    function (event, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var gridOptions, backendApi, startTime, query, observableOrPromise, processResult, endTime, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!args || !args.grid) {
                            throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
                        }
                        gridOptions = args.grid.getOptions() || {};
                        backendApi = gridOptions.backendServiceApi;
                        if (!backendApi || !backendApi.process || !backendApi.service) {
                            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // keep start time & end timestamps & return it after process execution
                        startTime = new Date();
                        if (backendApi.preProcess) {
                            backendApi.preProcess();
                        }
                        query = backendApi.service.processOnSortChanged(event, args);
                        this.emitSortChanged('remote');
                        // the process could be an Observable (like HttpClient) or a Promise
                        // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                        observableOrPromise = backendApi.process(query);
                        return [4 /*yield*/, castToPromise(observableOrPromise)];
                    case 2:
                        processResult = _a.sent();
                        endTime = new Date();
                        // from the result, call our internal post process to update the Dataset and Pagination info
                        if (processResult && backendApi.internalPostProcess) {
                            backendApi.internalPostProcess(processResult);
                        }
                        // send the response process to the postProcess callback
                        if (backendApi.postProcess) {
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
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (backendApi && backendApi.onError) {
                            backendApi.onError(e_1);
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    SortService.prototype.attachLocalOnSort = /**
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe(function (e, args) {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            /** @type {?} */
            var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            // keep current sorters
            _this._currentLocalSorters = []; // reset current local sorters
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach(function (sortColumn) {
                    if (sortColumn.sortCol) {
                        _this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                });
            }
            _this.onLocalSortChanged(grid, dataView, sortColumns);
            _this.emitSortChanged('local');
        });
    };
    /**
     * @return {?}
     */
    SortService.prototype.clearSorting = /**
     * @return {?}
     */
    function () {
        if (this._grid && this._gridOptions && this._dataView) {
            // remove any sort icons (this setSortColumns function call really does only that)
            this._grid.setSortColumns([]);
            // we also need to trigger a sort change
            // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
            // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
            if (this._isBackendGrid) {
                this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
            }
            else {
                if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
                    this.onLocalSortChanged(this._grid, this._dataView, new Array({ sortAsc: true, sortCol: this._columnDefinitions[0] }));
                }
            }
        }
        // set current sorter to empty & emit a sort changed event
        this._currentLocalSorters = [];
        // emit an event when filters are all cleared
        this.onSortCleared.next(true);
    };
    /**
     * @return {?}
     */
    SortService.prototype.getCurrentLocalSorters = /**
     * @return {?}
     */
    function () {
        return this._currentLocalSorters;
    };
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     */
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     * @param {?=} columnId
     * @return {?}
     */
    SortService.prototype.getPreviousColumnSorts = /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     * @param {?=} columnId
     * @return {?}
     */
    function (columnId) {
        var _this = this;
        // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
        /** @type {?} */
        var oldSortColumns = this._grid && this._grid.getSortColumns();
        // get the column definition but only keep column which are not equal to our current column
        if (Array.isArray(oldSortColumns)) {
            /** @type {?} */
            var sortedCols = oldSortColumns.reduce(function (cols, col) {
                if (!columnId || col.columnId !== columnId) {
                    cols.push({ sortCol: _this._columnDefinitions[_this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                }
                return cols;
            }, []);
            return sortedCols;
        }
        return [];
    };
    /**
     * load any presets if there are any
     * @param grid
     * @param dataView
     */
    /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    SortService.prototype.loadLocalPresets = /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        /** @type {?} */
        var sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            /** @type {?} */
            var sorters = this._gridOptions.presets.sorters;
            sorters.forEach(function (presetSorting) {
                /** @type {?} */
                var gridColumn = _this._columnDefinitions.find(function (col) { return col.id === presetSorting.columnId; });
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    // keep current sorters
                    _this._currentLocalSorters.push({
                        columnId: gridColumn.id + '',
                        direction: (/** @type {?} */ (presetSorting.direction.toUpperCase()))
                    });
                }
            });
            if (sortCols.length > 0) {
                this.onLocalSortChanged(grid, dataView, sortCols);
                grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
            }
        }
    };
    /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} sortColumns
     * @return {?}
     */
    SortService.prototype.onLocalSortChanged = /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} sortColumns
     * @return {?}
     */
    function (grid, dataView, sortColumns) {
        if (grid && dataView) {
            dataView.sort(function (dataRow1, dataRow2) {
                for (var i = 0, l = sortColumns.length; i < l; i++) {
                    /** @type {?} */
                    var columnSortObj = sortColumns[i];
                    if (columnSortObj && columnSortObj.sortCol) {
                        /** @type {?} */
                        var sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                        /** @type {?} */
                        var sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
                        /** @type {?} */
                        var fieldType = columnSortObj.sortCol.type || FieldType.string;
                        /** @type {?} */
                        var value1 = dataRow1[sortField];
                        /** @type {?} */
                        var value2 = dataRow2[sortField];
                        // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                        if (sortField && sortField.indexOf('.') >= 0) {
                            value1 = getDescendantProperty(dataRow1, sortField);
                            value2 = getDescendantProperty(dataRow2, sortField);
                        }
                        /** @type {?} */
                        var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
                        if (sortResult !== SortDirectionNumber.neutral) {
                            return sortResult;
                        }
                    }
                }
                return SortDirectionNumber.neutral;
            });
            grid.invalidate();
            grid.render();
        }
    };
    /**
     * @return {?}
     */
    SortService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
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
    SortService.prototype.emitSortChanged = /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    function (sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var currentSorters = [];
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = (/** @type {?} */ (backendService.getCurrentSorters()));
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === 'local') {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    };
    return SortService;
}());
export { SortService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._currentLocalSorters;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._slickSubscriber;
    /**
     * @type {?}
     * @private
     */
    SortService.prototype._isBackendGrid;
    /** @type {?} */
    SortService.prototype.onSortChanged;
    /** @type {?} */
    SortService.prototype.onSortCleared;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFJTCxTQUFTLEVBR1QsYUFBYSxFQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CO0lBQUE7UUFDVSx5QkFBb0IsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJOUMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUMvQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFtUXpDLENBQUM7SUFoUUMsc0JBQVkscUNBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFHRCxzQkFBWSwyQ0FBa0I7UUFEOUIsdUVBQXVFOzs7Ozs7UUFDdkU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFD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Ozs7SUFDdEQsZ0NBQXVCOzs7OztJQUN2Qiw0QkFBbUI7Ozs7O0lBQ25CLHVDQUFxQzs7Ozs7SUFDckMscUNBQStCOztJQUMvQixvQ0FBK0M7O0lBQy9DLG9DQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnREaXJlY3Rpb25OdW1iZXIgfSBmcm9tICcuLy4uL21vZGVscy9zb3J0RGlyZWN0aW9uTnVtYmVyLmVudW0nO1xuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSB9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uU29ydCxcbiAgQ3VycmVudFNvcnRlcixcbiAgRmllbGRUeXBlLFxuICBHcmlkT3B0aW9uLFxuICBTbGlja0V2ZW50LFxuICBTb3J0RGlyZWN0aW9uLFxuICBTb3J0RGlyZWN0aW9uU3RyaW5nXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7IHNvcnRCeUZpZWxkVHlwZSB9IGZyb20gJy4uL3NvcnRlcnMvc29ydGVyVXRpbGl0aWVzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuZXhwb3J0IGNsYXNzIFNvcnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfY3VycmVudExvY2FsU29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xuICBwcml2YXRlIF9ncmlkOiBhbnk7XG4gIHByaXZhdGUgX3NsaWNrU3Vic2NyaWJlcjogU2xpY2tFdmVudDtcbiAgcHJpdmF0ZSBfaXNCYWNrZW5kR3JpZCA9IGZhbHNlO1xuICBvblNvcnRDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q3VycmVudFNvcnRlcltdPigpO1xuICBvblNvcnRDbGVhcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYmFja2VuZCBzb3J0IChzaW5nbGUvbXVsdGkpIGhvb2sgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XG4gICAqIEBwYXJhbSBkYXRhVmlldyBTbGlja0dyaWQgRGF0YVZpZXcgb2JqZWN0XG4gICAqL1xuICBhdHRhY2hCYWNrZW5kT25Tb3J0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xuICAgIHRoaXMuX2lzQmFja2VuZEdyaWQgPSB0cnVlO1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gZ3JpZC5vblNvcnQ7XG5cbiAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIFNsaWNrR3JpZCBldmVudCBhbmQgY2FsbCB0aGUgYmFja2VuZCBleGVjdXRpb25cbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMub25CYWNrZW5kU29ydENoYW5nZWQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBhc3luYyBvbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IGFueSkge1xuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gdHJ5aW5nIHRvIGF0dGFjaCB0aGUgXCJvbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudCwgYXJncylcIiBmdW5jdGlvbiwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xuICAgIH1cbiAgICBjb25zdCBncmlkT3B0aW9uczogR3JpZE9wdGlvbiA9IGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkgfHwge307XG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xuXG4gICAgaWYgKCFiYWNrZW5kQXBpIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MgfHwgIWJhY2tlbmRBcGkuc2VydmljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gYmFja2VuZEFwaS5zZXJ2aWNlLnByb2Nlc3NPblNvcnRDaGFuZ2VkKGV2ZW50LCBhcmdzKTtcbiAgICAgIHRoaXMuZW1pdFNvcnRDaGFuZ2VkKCdyZW1vdGUnKTtcblxuICAgICAgLy8gdGhlIHByb2Nlc3MgY291bGQgYmUgYW4gT2JzZXJ2YWJsZSAobGlrZSBIdHRwQ2xpZW50KSBvciBhIFByb21pc2VcbiAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXG4gICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcbiAgICAgIGNvbnN0IHByb2Nlc3NSZXN1bHQgPSBhd2FpdCBjYXN0VG9Qcm9taXNlKG9ic2VydmFibGVPclByb21pc2UpO1xuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgIC8vIGZyb20gdGhlIHJlc3VsdCwgY2FsbCBvdXIgaW50ZXJuYWwgcG9zdCBwcm9jZXNzIHRvIHVwZGF0ZSB0aGUgRGF0YXNldCBhbmQgUGFnaW5hdGlvbiBpbmZvXG4gICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcbiAgICAgICAgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xuICAgICAgaWYgKGJhY2tlbmRBcGkucG9zdFByb2Nlc3MpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XG4gICAgICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgICAgICBlbmRUaW1lLFxuICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxuICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgdGhpcy5fZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub25FcnJvcikge1xuICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBsb2NhbCBzb3J0IChzaW5nbGUvbXVsdGkpIGhvb2sgdG8gdGhlIGdyaWRcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XG4gICAqIEBwYXJhbSBncmlkT3B0aW9ucyBHcmlkIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSBkYXRhVmlld1xuICAgKi9cbiAgYXR0YWNoTG9jYWxPblNvcnQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgdGhpcy5faXNCYWNrZW5kR3JpZCA9IGZhbHNlO1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gZ3JpZC5vblNvcnQ7XG5cbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuICAgICAgLy8gbXVsdGlTb3J0IGFuZCBzaW5nbGVTb3J0IGFyZSBub3QgZXhhY3RseSB0aGUgc2FtZSwgYnV0IHdlIHdhbnQgdG8gc3RydWN0dXJlIGl0IHRoZSBzYW1lIGZvciB0aGUgKGZvciBsb29wKSBhZnRlclxuICAgICAgLy8gYWxzbyB0byBhdm9pZCBoYXZpbmcgdG8gcmV3cml0ZSB0aGUgZm9yIGxvb3AgaW4gdGhlIHNvcnQsIHdlIHdpbGwgbWFrZSB0aGUgc2luZ2xlU29ydCBhbiBhcnJheSBvZiAxIG9iamVjdFxuICAgICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7c29ydEFzYzogYXJncy5zb3J0QXNjLCBzb3J0Q29sOiBhcmdzLnNvcnRDb2x9KTtcblxuICAgICAgLy8ga2VlcCBjdXJyZW50IHNvcnRlcnNcbiAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTsgLy8gcmVzZXQgY3VycmVudCBsb2NhbCBzb3J0ZXJzXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3J0Q29sdW1ucykpIHtcbiAgICAgICAgc29ydENvbHVtbnMuZm9yRWFjaCgoc29ydENvbHVtbjogeyBzb3J0Q29sOiBDb2x1bW4sIHNvcnRBc2M6IG51bWJlciB9KSA9PiB7XG4gICAgICAgICAgaWYgKHNvcnRDb2x1bW4uc29ydENvbCkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IHNvcnRDb2x1bW4uc29ydENvbC5pZCxcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzb3J0Q29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQoZ3JpZCwgZGF0YVZpZXcsIHNvcnRDb2x1bW5zKTtcbiAgICAgIHRoaXMuZW1pdFNvcnRDaGFuZ2VkKCdsb2NhbCcpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJTb3J0aW5nKCkge1xuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2RhdGFWaWV3KSB7XG4gICAgICAvLyByZW1vdmUgYW55IHNvcnQgaWNvbnMgKHRoaXMgc2V0U29ydENvbHVtbnMgZnVuY3Rpb24gY2FsbCByZWFsbHkgZG9lcyBvbmx5IHRoYXQpXG4gICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKFtdKTtcblxuICAgICAgLy8gd2UgYWxzbyBuZWVkIHRvIHRyaWdnZXIgYSBzb3J0IGNoYW5nZVxuICAgICAgLy8gZm9yIGEgYmFja2VuZCBncmlkLCB3ZSB3aWxsIHRyaWdnZXIgYSBiYWNrZW5kIHNvcnQgY2hhbmdlZCB3aXRoIGFuIGVtcHR5IHNvcnQgY29sdW1ucyBhcnJheVxuICAgICAgLy8gaG93ZXZlciBmb3IgYSBsb2NhbCBncmlkLCB3ZSBuZWVkIHRvIHBhc3MgYSBzb3J0IGNvbHVtbiBhbmQgc28gd2Ugd2lsbCBzb3J0IGJ5IHRoZSAxc3QgY29sdW1uXG4gICAgICBpZiAodGhpcy5faXNCYWNrZW5kR3JpZCkge1xuICAgICAgICB0aGlzLm9uQmFja2VuZFNvcnRDaGFuZ2VkKHVuZGVmaW5lZCwgeyBncmlkOiB0aGlzLl9ncmlkLCBzb3J0Q29sczogW10gfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykpIHtcbiAgICAgICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLl9ncmlkLCB0aGlzLl9kYXRhVmlldywgbmV3IEFycmF5KHtzb3J0QXNjOiB0cnVlLCBzb3J0Q29sOiB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1swXSB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc2V0IGN1cnJlbnQgc29ydGVyIHRvIGVtcHR5ICYgZW1pdCBhIHNvcnQgY2hhbmdlZCBldmVudFxuICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTtcblxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBmaWx0ZXJzIGFyZSBhbGwgY2xlYXJlZFxuICAgIHRoaXMub25Tb3J0Q2xlYXJlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgZ2V0Q3VycmVudExvY2FsU29ydGVycygpOiBDdXJyZW50U29ydGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb2x1bW4gc29ydHMsXG4gICAqIElmIGEgY29sdW1uIGlzIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgd2Ugd29uJ3QgYWRkIHRoaXMgY29sdW1uIHRvIG91ciBvdXRwdXQgYXJyYXkgc2luY2UgaXQgaXMgYWxyZWFkeSBpbiB0aGUgYXJyYXlcbiAgICogV2Ugd2FudCB0byBrbm93IHRoZSBzb3J0IHByaW9yIHRvIGNhbGxpbmcgdGhlIG5leHQgc29ydGluZyBjb21tYW5kXG4gICAqL1xuICBnZXRQcmV2aW91c0NvbHVtblNvcnRzKGNvbHVtbklkPzogc3RyaW5nKSB7XG4gICAgLy8gZ2V0U29ydENvbHVtbnMoKSBvbmx5IHJldHVybnMgc29ydEFzYyAmIGNvbHVtbklkLCB3ZSB3YW50IHRoZSBlbnRpcmUgY29sdW1uIGRlZmluaXRpb25cbiAgICBjb25zdCBvbGRTb3J0Q29sdW1ucyA9IHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRTb3J0Q29sdW1ucygpO1xuXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBidXQgb25seSBrZWVwIGNvbHVtbiB3aGljaCBhcmUgbm90IGVxdWFsIHRvIG91ciBjdXJyZW50IGNvbHVtblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9sZFNvcnRDb2x1bW5zKSkge1xuICAgICAgY29uc3Qgc29ydGVkQ29scyA9IG9sZFNvcnRDb2x1bW5zLnJlZHVjZSgoY29scywgY29sKSA9PiB7XG4gICAgICAgIGlmICghY29sdW1uSWQgfHwgY29sLmNvbHVtbklkICE9PSBjb2x1bW5JZCkge1xuICAgICAgICAgIGNvbHMucHVzaCh7IHNvcnRDb2w6IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zW3RoaXMuX2dyaWQuZ2V0Q29sdW1uSW5kZXgoY29sLmNvbHVtbklkKV0sIHNvcnRBc2M6IGNvbC5zb3J0QXNjIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xzO1xuICAgICAgfSwgW10pO1xuXG4gICAgICByZXR1cm4gc29ydGVkQ29scztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvYWQgYW55IHByZXNldHMgaWYgdGhlcmUgYXJlIGFueVxuICAgKiBAcGFyYW0gZ3JpZFxuICAgKiBAcGFyYW0gZGF0YVZpZXdcbiAgICovXG4gIGxvYWRMb2NhbFByZXNldHMoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgY29uc3Qgc29ydENvbHM6IENvbHVtblNvcnRbXSA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTsgLy8gcmVzZXQgY3VycmVudCBsb2NhbCBzb3J0ZXJzXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKSB7XG4gICAgICBjb25zdCBzb3J0ZXJzID0gdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzO1xuXG4gICAgICBzb3J0ZXJzLmZvckVhY2goKHByZXNldFNvcnRpbmc6IEN1cnJlbnRTb3J0ZXIpID0+IHtcbiAgICAgICAgY29uc3QgZ3JpZENvbHVtbiA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZpbmQoKGNvbDogQ29sdW1uKSA9PiBjb2wuaWQgPT09IHByZXNldFNvcnRpbmcuY29sdW1uSWQpO1xuICAgICAgICBpZiAoZ3JpZENvbHVtbikge1xuICAgICAgICAgIHNvcnRDb2xzLnB1c2goe1xuICAgICAgICAgICAgY29sdW1uSWQ6IGdyaWRDb2x1bW4uaWQsXG4gICAgICAgICAgICBzb3J0QXNjOiAoKHByZXNldFNvcnRpbmcuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDKSA/IHRydWUgOiBmYWxzZSksXG4gICAgICAgICAgICBzb3J0Q29sOiBncmlkQ29sdW1uXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBrZWVwIGN1cnJlbnQgc29ydGVyc1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMucHVzaCh7XG4gICAgICAgICAgICBjb2x1bW5JZDogZ3JpZENvbHVtbi5pZCArICcnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBwcmVzZXRTb3J0aW5nLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzb3J0Q29scy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMub25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQsIGRhdGFWaWV3LCBzb3J0Q29scyk7XG4gICAgICAgIGdyaWQuc2V0U29ydENvbHVtbnMoc29ydENvbHMpOyAvLyB1c2UgdGhpcyB0byBhZGQgc29ydCBpY29uKHMpIGluIFVJXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSwgc29ydENvbHVtbnM6IENvbHVtblNvcnRbXSkge1xuICAgIGlmIChncmlkICYmIGRhdGFWaWV3KSB7XG4gICAgICBkYXRhVmlldy5zb3J0KChkYXRhUm93MTogYW55LCBkYXRhUm93MjogYW55KSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc29ydENvbHVtbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uU29ydE9iaiA9IHNvcnRDb2x1bW5zW2ldO1xuICAgICAgICAgIGlmIChjb2x1bW5Tb3J0T2JqICYmIGNvbHVtblNvcnRPYmouc29ydENvbCkge1xuICAgICAgICAgICAgY29uc3Qgc29ydERpcmVjdGlvbiA9IGNvbHVtblNvcnRPYmouc29ydEFzYyA/IFNvcnREaXJlY3Rpb25OdW1iZXIuYXNjIDogU29ydERpcmVjdGlvbk51bWJlci5kZXNjO1xuICAgICAgICAgICAgY29uc3Qgc29ydEZpZWxkID0gY29sdW1uU29ydE9iai5zb3J0Q29sLnF1ZXJ5RmllbGQgfHwgY29sdW1uU29ydE9iai5zb3J0Q29sLnF1ZXJ5RmllbGRGaWx0ZXIgfHwgY29sdW1uU29ydE9iai5zb3J0Q29sLmZpZWxkO1xuICAgICAgICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uU29ydE9iai5zb3J0Q29sLnR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcbiAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBkYXRhUm93MVtzb3J0RmllbGRdO1xuICAgICAgICAgICAgbGV0IHZhbHVlMiA9IGRhdGFSb3cyW3NvcnRGaWVsZF07XG5cbiAgICAgICAgICAgIC8vIHdoZW4gaXRlbSBpcyBhIGNvbXBsZXggb2JqZWN0IChkb3QgXCIuXCIgbm90YXRpb24pLCB3ZSBuZWVkIHRvIGZpbHRlciB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBvYmplY3QgdHJlZVxuICAgICAgICAgICAgaWYgKHNvcnRGaWVsZCAmJiBzb3J0RmllbGQuaW5kZXhPZignLicpID49IDApIHtcbiAgICAgICAgICAgICAgdmFsdWUxID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGRhdGFSb3cxLCBzb3J0RmllbGQpO1xuICAgICAgICAgICAgICB2YWx1ZTIgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoZGF0YVJvdzIsIHNvcnRGaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbik7XG4gICAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xuICAgICAgfSk7XG4gICAgICBncmlkLmludmFsaWRhdGUoKTtcbiAgICAgIGdyaWQucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAvLyB1bnN1YnNjcmliZSBsb2NhbCBldmVudFxuICAgIGlmICh0aGlzLl9zbGlja1N1YnNjcmliZXIgJiYgdHlwZW9mIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBmdW5jdGlvbiB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBzdWJzY3JpYmVyIGFuZCBlbWl0IGEgY2hhbmdlIHdoZW4gdGhlIHNvcnQgaXMgY2FsbGVkLlxuICAgKiBPdGhlciBzZXJ2aWNlcywgbGlrZSBQYWdpbmF0aW9uLCBjYW4gdGhlbiBzdWJzY3JpYmUgdG8gaXQuXG4gICAqIEBwYXJhbSBzZW5kZXJcbiAgICovXG4gIGVtaXRTb3J0Q2hhbmdlZChzZW5kZXI6ICdsb2NhbCcgfCAncmVtb3RlJykge1xuICAgIGlmIChzZW5kZXIgPT09ICdyZW1vdGUnICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XG4gICAgICBsZXQgY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKSB7XG4gICAgICAgIGN1cnJlbnRTb3J0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMoKSBhcyBDdXJyZW50U29ydGVyW107XG4gICAgICB9XG4gICAgICB0aGlzLm9uU29ydENoYW5nZWQubmV4dChjdXJyZW50U29ydGVycyk7XG4gICAgfSBlbHNlIGlmIChzZW5kZXIgPT09ICdsb2NhbCcpIHtcbiAgICAgIHRoaXMub25Tb3J0Q2hhbmdlZC5uZXh0KHRoaXMuZ2V0Q3VycmVudExvY2FsU29ydGVycygpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==