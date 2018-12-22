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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFJTCxTQUFTLEVBR1QsYUFBYSxFQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CO0lBQUE7UUFDVSx5QkFBb0IsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJOUMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUMvQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFtUXpDLENBQUM7SUFoUUMsc0JBQVkscUNBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFHRCxzQkFBWSwyQ0FBa0I7UUFEOUIsdUVBQXVFOzs7Ozs7UUFDdkU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFD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Ozs7SUFDdEQsZ0NBQXVCOzs7OztJQUN2Qiw0QkFBbUI7Ozs7O0lBQ25CLHVDQUFxQzs7Ozs7SUFDckMscUNBQStCOztJQUMvQixvQ0FBK0M7O0lBQy9DLG9DQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNvcnREaXJlY3Rpb25OdW1iZXIgfSBmcm9tICcuLy4uL21vZGVscy9zb3J0RGlyZWN0aW9uTnVtYmVyLmVudW0nO1xyXG5pbXBvcnQgeyBjYXN0VG9Qcm9taXNlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDb2x1bW5Tb3J0LFxyXG4gIEN1cnJlbnRTb3J0ZXIsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgU2xpY2tFdmVudCxcclxuICBTb3J0RGlyZWN0aW9uLFxyXG4gIFNvcnREaXJlY3Rpb25TdHJpbmdcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgc29ydEJ5RmllbGRUeXBlIH0gZnJvbSAnLi4vc29ydGVycy9zb3J0ZXJVdGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ydFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2N1cnJlbnRMb2NhbFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX3NsaWNrU3Vic2NyaWJlcjogU2xpY2tFdmVudDtcclxuICBwcml2YXRlIF9pc0JhY2tlbmRHcmlkID0gZmFsc2U7XHJcbiAgb25Tb3J0Q2hhbmdlZCA9IG5ldyBTdWJqZWN0PEN1cnJlbnRTb3J0ZXJbXT4oKTtcclxuICBvblNvcnRDbGVhcmVkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2ggYSBiYWNrZW5kIHNvcnQgKHNpbmdsZS9tdWx0aSkgaG9vayB0byB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxyXG4gICAqIEBwYXJhbSBkYXRhVmlldyBTbGlja0dyaWQgRGF0YVZpZXcgb2JqZWN0XHJcbiAgICovXHJcbiAgYXR0YWNoQmFja2VuZE9uU29ydChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIHRoaXMuX2lzQmFja2VuZEdyaWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gZ3JpZC5vblNvcnQ7XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBTbGlja0dyaWQgZXZlbnQgYW5kIGNhbGwgdGhlIGJhY2tlbmQgZXhlY3V0aW9uXHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMub25CYWNrZW5kU29ydENoYW5nZWQuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IGFueSkge1xyXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdHRhY2ggdGhlIFwib25CYWNrZW5kU29ydENoYW5nZWQoZXZlbnQsIGFyZ3MpXCIgZnVuY3Rpb24sIGl0IHNlZW1zIHRoYXQgXCJhcmdzXCIgaXMgbm90IHBvcHVsYXRlZCBjb3JyZWN0bHknKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uID0gYXJncy5ncmlkLmdldE9wdGlvbnMoKSB8fCB7fTtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cclxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uU29ydENoYW5nZWQoZXZlbnQsIGFyZ3MpO1xyXG4gICAgICB0aGlzLmVtaXRTb3J0Q2hhbmdlZCgncmVtb3RlJyk7XHJcblxyXG4gICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxyXG4gICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxyXG4gICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcclxuICAgICAgY29uc3QgcHJvY2Vzc1Jlc3VsdCA9IGF3YWl0IGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSk7XHJcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgLy8gZnJvbSB0aGUgcmVzdWx0LCBjYWxsIG91ciBpbnRlcm5hbCBwb3N0IHByb2Nlc3MgdG8gdXBkYXRlIHRoZSBEYXRhc2V0IGFuZCBQYWdpbmF0aW9uIGluZm9cclxuICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gICAgICBpZiAoYmFja2VuZEFwaS5wb3N0UHJvY2Vzcykge1xyXG4gICAgICAgIGlmIChwcm9jZXNzUmVzdWx0IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgZW5kVGltZSxcclxuICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxyXG4gICAgICAgICAgICB0b3RhbEl0ZW1Db3VudDogdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXNcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5vbkVycm9yKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5vbkVycm9yKGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCBhIGxvY2FsIHNvcnQgKHNpbmdsZS9tdWx0aSkgaG9vayB0byB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxyXG4gICAqIEBwYXJhbSBncmlkT3B0aW9ucyBHcmlkIE9wdGlvbnMgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFWaWV3XHJcbiAgICovXHJcbiAgYXR0YWNoTG9jYWxPblNvcnQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9pc0JhY2tlbmRHcmlkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBncmlkLm9uU29ydDtcclxuXHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAvLyBtdWx0aVNvcnQgYW5kIHNpbmdsZVNvcnQgYXJlIG5vdCBleGFjdGx5IHRoZSBzYW1lLCBidXQgd2Ugd2FudCB0byBzdHJ1Y3R1cmUgaXQgdGhlIHNhbWUgZm9yIHRoZSAoZm9yIGxvb3ApIGFmdGVyXHJcbiAgICAgIC8vIGFsc28gdG8gYXZvaWQgaGF2aW5nIHRvIHJld3JpdGUgdGhlIGZvciBsb29wIGluIHRoZSBzb3J0LCB3ZSB3aWxsIG1ha2UgdGhlIHNpbmdsZVNvcnQgYW4gYXJyYXkgb2YgMSBvYmplY3RcclxuICAgICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7c29ydEFzYzogYXJncy5zb3J0QXNjLCBzb3J0Q29sOiBhcmdzLnNvcnRDb2x9KTtcclxuXHJcbiAgICAgIC8vIGtlZXAgY3VycmVudCBzb3J0ZXJzXHJcbiAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTsgLy8gcmVzZXQgY3VycmVudCBsb2NhbCBzb3J0ZXJzXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvcnRDb2x1bW5zKSkge1xyXG4gICAgICAgIHNvcnRDb2x1bW5zLmZvckVhY2goKHNvcnRDb2x1bW46IHsgc29ydENvbDogQ29sdW1uLCBzb3J0QXNjOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHNvcnRDb2x1bW4uc29ydENvbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0Q29sdW1uLnNvcnRDb2wuaWQsXHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBzb3J0Q29sdW1uLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uLkFTQyA6IFNvcnREaXJlY3Rpb24uREVTQ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQoZ3JpZCwgZGF0YVZpZXcsIHNvcnRDb2x1bW5zKTtcclxuICAgICAgdGhpcy5lbWl0U29ydENoYW5nZWQoJ2xvY2FsJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyU29ydGluZygpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2RhdGFWaWV3KSB7XHJcbiAgICAgIC8vIHJlbW92ZSBhbnkgc29ydCBpY29ucyAodGhpcyBzZXRTb3J0Q29sdW1ucyBmdW5jdGlvbiBjYWxsIHJlYWxseSBkb2VzIG9ubHkgdGhhdClcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTb3J0Q29sdW1ucyhbXSk7XHJcblxyXG4gICAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gdHJpZ2dlciBhIHNvcnQgY2hhbmdlXHJcbiAgICAgIC8vIGZvciBhIGJhY2tlbmQgZ3JpZCwgd2Ugd2lsbCB0cmlnZ2VyIGEgYmFja2VuZCBzb3J0IGNoYW5nZWQgd2l0aCBhbiBlbXB0eSBzb3J0IGNvbHVtbnMgYXJyYXlcclxuICAgICAgLy8gaG93ZXZlciBmb3IgYSBsb2NhbCBncmlkLCB3ZSBuZWVkIHRvIHBhc3MgYSBzb3J0IGNvbHVtbiBhbmQgc28gd2Ugd2lsbCBzb3J0IGJ5IHRoZSAxc3QgY29sdW1uXHJcbiAgICAgIGlmICh0aGlzLl9pc0JhY2tlbmRHcmlkKSB7XHJcbiAgICAgICAgdGhpcy5vbkJhY2tlbmRTb3J0Q2hhbmdlZCh1bmRlZmluZWQsIHsgZ3JpZDogdGhpcy5fZ3JpZCwgc29ydENvbHM6IFtdIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xyXG4gICAgICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQodGhpcy5fZ3JpZCwgdGhpcy5fZGF0YVZpZXcsIG5ldyBBcnJheSh7c29ydEFzYzogdHJ1ZSwgc29ydENvbDogdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbMF0gfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gc2V0IGN1cnJlbnQgc29ydGVyIHRvIGVtcHR5ICYgZW1pdCBhIHNvcnQgY2hhbmdlZCBldmVudFxyXG4gICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdO1xyXG5cclxuICAgIC8vIGVtaXQgYW4gZXZlbnQgd2hlbiBmaWx0ZXJzIGFyZSBhbGwgY2xlYXJlZFxyXG4gICAgdGhpcy5vblNvcnRDbGVhcmVkLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudExvY2FsU29ydGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjb2x1bW4gc29ydHMsXHJcbiAgICogSWYgYSBjb2x1bW4gaXMgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCB3ZSB3b24ndCBhZGQgdGhpcyBjb2x1bW4gdG8gb3VyIG91dHB1dCBhcnJheSBzaW5jZSBpdCBpcyBhbHJlYWR5IGluIHRoZSBhcnJheVxyXG4gICAqIFdlIHdhbnQgdG8ga25vdyB0aGUgc29ydCBwcmlvciB0byBjYWxsaW5nIHRoZSBuZXh0IHNvcnRpbmcgY29tbWFuZFxyXG4gICAqL1xyXG4gIGdldFByZXZpb3VzQ29sdW1uU29ydHMoY29sdW1uSWQ/OiBzdHJpbmcpIHtcclxuICAgIC8vIGdldFNvcnRDb2x1bW5zKCkgb25seSByZXR1cm5zIHNvcnRBc2MgJiBjb2x1bW5JZCwgd2Ugd2FudCB0aGUgZW50aXJlIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICBjb25zdCBvbGRTb3J0Q29sdW1ucyA9IHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRTb3J0Q29sdW1ucygpO1xyXG5cclxuICAgIC8vIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gYnV0IG9ubHkga2VlcCBjb2x1bW4gd2hpY2ggYXJlIG5vdCBlcXVhbCB0byBvdXIgY3VycmVudCBjb2x1bW5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KG9sZFNvcnRDb2x1bW5zKSkge1xyXG4gICAgICBjb25zdCBzb3J0ZWRDb2xzID0gb2xkU29ydENvbHVtbnMucmVkdWNlKChjb2xzLCBjb2wpID0+IHtcclxuICAgICAgICBpZiAoIWNvbHVtbklkIHx8IGNvbC5jb2x1bW5JZCAhPT0gY29sdW1uSWQpIHtcclxuICAgICAgICAgIGNvbHMucHVzaCh7IHNvcnRDb2w6IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zW3RoaXMuX2dyaWQuZ2V0Q29sdW1uSW5kZXgoY29sLmNvbHVtbklkKV0sIHNvcnRBc2M6IGNvbC5zb3J0QXNjIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29scztcclxuICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgcmV0dXJuIHNvcnRlZENvbHM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb2FkIGFueSBwcmVzZXRzIGlmIHRoZXJlIGFyZSBhbnlcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqIEBwYXJhbSBkYXRhVmlld1xyXG4gICAqL1xyXG4gIGxvYWRMb2NhbFByZXNldHMoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICBjb25zdCBzb3J0Q29sczogQ29sdW1uU29ydFtdID0gW107XHJcbiAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzID0gW107IC8vIHJlc2V0IGN1cnJlbnQgbG9jYWwgc29ydGVyc1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKSB7XHJcbiAgICAgIGNvbnN0IHNvcnRlcnMgPSB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnM7XHJcblxyXG4gICAgICBzb3J0ZXJzLmZvckVhY2goKHByZXNldFNvcnRpbmc6IEN1cnJlbnRTb3J0ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBncmlkQ29sdW1uID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sOiBDb2x1bW4pID0+IGNvbC5pZCA9PT0gcHJlc2V0U29ydGluZy5jb2x1bW5JZCk7XHJcbiAgICAgICAgaWYgKGdyaWRDb2x1bW4pIHtcclxuICAgICAgICAgIHNvcnRDb2xzLnB1c2goe1xyXG4gICAgICAgICAgICBjb2x1bW5JZDogZ3JpZENvbHVtbi5pZCxcclxuICAgICAgICAgICAgc29ydEFzYzogKChwcmVzZXRTb3J0aW5nLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBTb3J0RGlyZWN0aW9uLkFTQykgPyB0cnVlIDogZmFsc2UpLFxyXG4gICAgICAgICAgICBzb3J0Q29sOiBncmlkQ29sdW1uXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyBrZWVwIGN1cnJlbnQgc29ydGVyc1xyXG4gICAgICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycy5wdXNoKHtcclxuICAgICAgICAgICAgY29sdW1uSWQ6IGdyaWRDb2x1bW4uaWQgKyAnJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBwcmVzZXRTb3J0aW5nLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoc29ydENvbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMub25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQsIGRhdGFWaWV3LCBzb3J0Q29scyk7XHJcbiAgICAgICAgZ3JpZC5zZXRTb3J0Q29sdW1ucyhzb3J0Q29scyk7IC8vIHVzZSB0aGlzIHRvIGFkZCBzb3J0IGljb24ocykgaW4gVUlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSwgc29ydENvbHVtbnM6IENvbHVtblNvcnRbXSkge1xyXG4gICAgaWYgKGdyaWQgJiYgZGF0YVZpZXcpIHtcclxuICAgICAgZGF0YVZpZXcuc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc29ydENvbHVtbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5Tb3J0T2JqID0gc29ydENvbHVtbnNbaV07XHJcbiAgICAgICAgICBpZiAoY29sdW1uU29ydE9iaiAmJiBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wpIHtcclxuICAgICAgICAgICAgY29uc3Qgc29ydERpcmVjdGlvbiA9IGNvbHVtblNvcnRPYmouc29ydEFzYyA/IFNvcnREaXJlY3Rpb25OdW1iZXIuYXNjIDogU29ydERpcmVjdGlvbk51bWJlci5kZXNjO1xyXG4gICAgICAgICAgICBjb25zdCBzb3J0RmllbGQgPSBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wuZmllbGQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IGNvbHVtblNvcnRPYmouc29ydENvbC50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBkYXRhUm93MVtzb3J0RmllbGRdO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUyID0gZGF0YVJvdzJbc29ydEZpZWxkXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHdoZW4gaXRlbSBpcyBhIGNvbXBsZXggb2JqZWN0IChkb3QgXCIuXCIgbm90YXRpb24pLCB3ZSBuZWVkIHRvIGZpbHRlciB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBvYmplY3QgdHJlZVxyXG4gICAgICAgICAgICBpZiAoc29ydEZpZWxkICYmIHNvcnRGaWVsZC5pbmRleE9mKCcuJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgIHZhbHVlMSA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShkYXRhUm93MSwgc29ydEZpZWxkKTtcclxuICAgICAgICAgICAgICB2YWx1ZTIgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoZGF0YVJvdzIsIHNvcnRGaWVsZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gc29ydFJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xyXG4gICAgICB9KTtcclxuICAgICAgZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIGdyaWQucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgbG9jYWwgZXZlbnRcclxuICAgIGlmICh0aGlzLl9zbGlja1N1YnNjcmliZXIgJiYgdHlwZW9mIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIHNpbXBsZSBmdW5jdGlvbiB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBzdWJzY3JpYmVyIGFuZCBlbWl0IGEgY2hhbmdlIHdoZW4gdGhlIHNvcnQgaXMgY2FsbGVkLlxyXG4gICAqIE90aGVyIHNlcnZpY2VzLCBsaWtlIFBhZ2luYXRpb24sIGNhbiB0aGVuIHN1YnNjcmliZSB0byBpdC5cclxuICAgKiBAcGFyYW0gc2VuZGVyXHJcbiAgICovXHJcbiAgZW1pdFNvcnRDaGFuZ2VkKHNlbmRlcjogJ2xvY2FsJyB8ICdyZW1vdGUnKSB7XHJcbiAgICBpZiAoc2VuZGVyID09PSAncmVtb3RlJyAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBsZXQgY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycykge1xyXG4gICAgICAgIGN1cnJlbnRTb3J0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMoKSBhcyBDdXJyZW50U29ydGVyW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vblNvcnRDaGFuZ2VkLm5leHQoY3VycmVudFNvcnRlcnMpO1xyXG4gICAgfSBlbHNlIGlmIChzZW5kZXIgPT09ICdsb2NhbCcpIHtcclxuICAgICAgdGhpcy5vblNvcnRDaGFuZ2VkLm5leHQodGhpcy5nZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=