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
export class SortService {
    constructor() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject();
        this.onSortCleared = new Subject();
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
     * Attach a backend sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView SlickGrid DataView object
     * @return {?}
     */
    attachBackendOnSort(grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    }
    /**
     * @param {?} event
     * @param {?} args
     * @return {?}
     */
    onBackendSortChanged(event, args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
            }
            /** @type {?} */
            const gridOptions = args.grid.getOptions() || {};
            /** @type {?} */
            const backendApi = gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
            }
            try {
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                const startTime = new Date();
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                /** @type {?} */
                const query = backendApi.service.processOnSortChanged(event, args);
                this.emitSortChanged('remote');
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
                if (backendApi.postProcess) {
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
     * Attach a local sort (single/multi) hook to the grid
     * @param {?} grid SlickGrid Grid object
     * @param {?} dataView
     * @return {?}
     */
    attachLocalOnSort(grid, dataView) {
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe((e, args) => {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            /** @type {?} */
            const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            // keep current sorters
            this._currentLocalSorters = []; // reset current local sorters
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach((sortColumn) => {
                    if (sortColumn.sortCol) {
                        this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                });
            }
            this.onLocalSortChanged(grid, dataView, sortColumns);
            this.emitSortChanged('local');
        });
    }
    /**
     * @return {?}
     */
    clearSorting() {
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
    }
    /**
     * @return {?}
     */
    getCurrentLocalSorters() {
        return this._currentLocalSorters;
    }
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     * @param {?=} columnId
     * @return {?}
     */
    getPreviousColumnSorts(columnId) {
        // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
        /** @type {?} */
        const oldSortColumns = this._grid && this._grid.getSortColumns();
        // get the column definition but only keep column which are not equal to our current column
        if (Array.isArray(oldSortColumns)) {
            /** @type {?} */
            const sortedCols = oldSortColumns.reduce((cols, col) => {
                if (!columnId || col.columnId !== columnId) {
                    cols.push({ sortCol: this._columnDefinitions[this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                }
                return cols;
            }, []);
            return sortedCols;
        }
        return [];
    }
    /**
     * load any presets if there are any
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    loadLocalPresets(grid, dataView) {
        /** @type {?} */
        const sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            /** @type {?} */
            const sorters = this._gridOptions.presets.sorters;
            sorters.forEach((presetSorting) => {
                /** @type {?} */
                const gridColumn = this._columnDefinitions.find((col) => col.id === presetSorting.columnId);
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    // keep current sorters
                    this._currentLocalSorters.push({
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
    }
    /**
     * @param {?} grid
     * @param {?} dataView
     * @param {?} sortColumns
     * @return {?}
     */
    onLocalSortChanged(grid, dataView, sortColumns) {
        if (grid && dataView) {
            dataView.sort((dataRow1, dataRow2) => {
                for (let i = 0, l = sortColumns.length; i < l; i++) {
                    /** @type {?} */
                    const columnSortObj = sortColumns[i];
                    if (columnSortObj && columnSortObj.sortCol) {
                        /** @type {?} */
                        const sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                        /** @type {?} */
                        const sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldFilter || columnSortObj.sortCol.field;
                        /** @type {?} */
                        const fieldType = columnSortObj.sortCol.type || FieldType.string;
                        /** @type {?} */
                        let value1 = dataRow1[sortField];
                        /** @type {?} */
                        let value2 = dataRow2[sortField];
                        // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                        if (sortField && sortField.indexOf('.') >= 0) {
                            value1 = getDescendantProperty(dataRow1, sortField);
                            value2 = getDescendantProperty(dataRow2, sortField);
                        }
                        /** @type {?} */
                        const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection);
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
    }
    /**
     * @return {?}
     */
    dispose() {
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param {?} sender
     * @return {?}
     */
    emitSortChanged(sender) {
        if (sender === 'remote' && this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            let currentSorters = [];
            /** @type {?} */
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = (/** @type {?} */ (backendService.getCurrentSorters()));
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === 'local') {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFJTCxTQUFTLEVBR1QsYUFBYSxFQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ1UseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxrQkFBYSxHQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTlDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBbVF6QyxDQUFDOzs7Ozs7SUFoUUMsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDOzs7Ozs7SUFHRCxJQUFZLGtCQUFrQjtRQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFD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QWdCLElBQUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUNwRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDckM7UUFFRCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7O0lBT0QsZUFBZSxDQUFDLE1BQTBCO1FBQ3hDLElBQUksTUFBTSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUU7O2dCQUMvRSxjQUFjLEdBQW9CLEVBQUU7O2tCQUNsQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO1lBQ2xFLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEQsY0FBYyxHQUFHLG1CQUFBLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFtQixDQUFDO2FBQ3hFO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDekM7YUFBTSxJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBMVFDLDJDQUFtRDs7Ozs7SUFDbkQsb0NBQXNEOzs7OztJQUN0RCxnQ0FBdUI7Ozs7O0lBQ3ZCLDRCQUFtQjs7Ozs7SUFDbkIsdUNBQXFDOzs7OztJQUNyQyxxQ0FBK0I7O0lBQy9CLG9DQUErQzs7SUFDL0Msb0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ydERpcmVjdGlvbk51bWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3NvcnREaXJlY3Rpb25OdW1iZXIuZW51bSc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtblNvcnQsXHJcbiAgQ3VycmVudFNvcnRlcixcclxuICBGaWVsZFR5cGUsXHJcbiAgR3JpZE9wdGlvbixcclxuICBTbGlja0V2ZW50LFxyXG4gIFNvcnREaXJlY3Rpb24sXHJcbiAgU29ydERpcmVjdGlvblN0cmluZ1xyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZ2V0RGVzY2VuZGFudFByb3BlcnR5IH0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBzb3J0QnlGaWVsZFR5cGUgfSBmcm9tICcuLi9zb3J0ZXJzL3NvcnRlclV0aWxpdGllcyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTb3J0U2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfY3VycmVudExvY2FsU29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfc2xpY2tTdWJzY3JpYmVyOiBTbGlja0V2ZW50O1xyXG4gIHByaXZhdGUgX2lzQmFja2VuZEdyaWQgPSBmYWxzZTtcclxuICBvblNvcnRDaGFuZ2VkID0gbmV3IFN1YmplY3Q8Q3VycmVudFNvcnRlcltdPigpO1xyXG4gIG9uU29ydENsZWFyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCBhIGJhY2tlbmQgc29ydCAoc2luZ2xlL211bHRpKSBob29rIHRvIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XHJcbiAgICogQHBhcmFtIGRhdGFWaWV3IFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3RcclxuICAgKi9cclxuICBhdHRhY2hCYWNrZW5kT25Tb3J0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5faXNCYWNrZW5kR3JpZCA9IHRydWU7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBncmlkLm9uU29ydDtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIFNsaWNrR3JpZCBldmVudCBhbmQgY2FsbCB0aGUgYmFja2VuZCBleGVjdXRpb25cclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUodGhpcy5vbkJhY2tlbmRTb3J0Q2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogYW55KSB7XHJcbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuZ3JpZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gdHJ5aW5nIHRvIGF0dGFjaCB0aGUgXCJvbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudCwgYXJncylcIiBmdW5jdGlvbiwgaXQgc2VlbXMgdGhhdCBcImFyZ3NcIiBpcyBub3QgcG9wdWxhdGVkIGNvcnJlY3RseScpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24gPSBhcmdzLmdyaWQuZ2V0T3B0aW9ucygpIHx8IHt9O1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IGJhY2tlbmRBcGkuc2VydmljZS5wcm9jZXNzT25Tb3J0Q2hhbmdlZChldmVudCwgYXJncyk7XHJcbiAgICAgIHRoaXMuZW1pdFNvcnRDaGFuZ2VkKCdyZW1vdGUnKTtcclxuXHJcbiAgICAgIC8vIHRoZSBwcm9jZXNzIGNvdWxkIGJlIGFuIE9ic2VydmFibGUgKGxpa2UgSHR0cENsaWVudCkgb3IgYSBQcm9taXNlXHJcbiAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXHJcbiAgICAgIGNvbnN0IG9ic2VydmFibGVPclByb21pc2UgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG4gICAgICBjb25zdCBwcm9jZXNzUmVzdWx0ID0gYXdhaXQgY2FzdFRvUHJvbWlzZShvYnNlcnZhYmxlT3JQcm9taXNlKTtcclxuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAvLyBmcm9tIHRoZSByZXN1bHQsIGNhbGwgb3VyIGludGVybmFsIHBvc3QgcHJvY2VzcyB0byB1cGRhdGUgdGhlIERhdGFzZXQgYW5kIFBhZ2luYXRpb24gaW5mb1xyXG4gICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcclxuICAgICAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICBlbmRUaW1lLFxyXG4gICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXHJcbiAgICAgICAgICAgIHRvdGFsSXRlbUNvdW50OiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIHRoaXMuX2dyaWRPcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtc1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYmFja2VuZEFwaS5wb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLm9uRXJyb3IpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIGEgbG9jYWwgc29ydCAoc2luZ2xlL211bHRpKSBob29rIHRvIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGdyaWQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0XHJcbiAgICogQHBhcmFtIGdyaWRPcHRpb25zIEdyaWQgT3B0aW9ucyBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBhdHRhY2hMb2NhbE9uU29ydChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIHRoaXMuX2lzQmFja2VuZEdyaWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IGdyaWQub25Tb3J0O1xyXG5cclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUoKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgIC8vIG11bHRpU29ydCBhbmQgc2luZ2xlU29ydCBhcmUgbm90IGV4YWN0bHkgdGhlIHNhbWUsIGJ1dCB3ZSB3YW50IHRvIHN0cnVjdHVyZSBpdCB0aGUgc2FtZSBmb3IgdGhlIChmb3IgbG9vcCkgYWZ0ZXJcclxuICAgICAgLy8gYWxzbyB0byBhdm9pZCBoYXZpbmcgdG8gcmV3cml0ZSB0aGUgZm9yIGxvb3AgaW4gdGhlIHNvcnQsIHdlIHdpbGwgbWFrZSB0aGUgc2luZ2xlU29ydCBhbiBhcnJheSBvZiAxIG9iamVjdFxyXG4gICAgICBjb25zdCBzb3J0Q29sdW1ucyA9IChhcmdzLm11bHRpQ29sdW1uU29ydCkgPyBhcmdzLnNvcnRDb2xzIDogbmV3IEFycmF5KHtzb3J0QXNjOiBhcmdzLnNvcnRBc2MsIHNvcnRDb2w6IGFyZ3Muc29ydENvbH0pO1xyXG5cclxuICAgICAgLy8ga2VlcCBjdXJyZW50IHNvcnRlcnNcclxuICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdOyAvLyByZXNldCBjdXJyZW50IGxvY2FsIHNvcnRlcnNcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydENvbHVtbnMpKSB7XHJcbiAgICAgICAgc29ydENvbHVtbnMuZm9yRWFjaCgoc29ydENvbHVtbjogeyBzb3J0Q29sOiBDb2x1bW4sIHNvcnRBc2M6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICBpZiAoc29ydENvbHVtbi5zb3J0Q29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IHNvcnRDb2x1bW4uc29ydENvbC5pZCxcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IHNvcnRDb2x1bW4uc29ydEFzYyA/IFNvcnREaXJlY3Rpb24uQVNDIDogU29ydERpcmVjdGlvbi5ERVNDXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZChncmlkLCBkYXRhVmlldywgc29ydENvbHVtbnMpO1xyXG4gICAgICB0aGlzLmVtaXRTb3J0Q2hhbmdlZCgnbG9jYWwnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTb3J0aW5nKCkge1xyXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZGF0YVZpZXcpIHtcclxuICAgICAgLy8gcmVtb3ZlIGFueSBzb3J0IGljb25zICh0aGlzIHNldFNvcnRDb2x1bW5zIGZ1bmN0aW9uIGNhbGwgcmVhbGx5IGRvZXMgb25seSB0aGF0KVxyXG4gICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKFtdKTtcclxuXHJcbiAgICAgIC8vIHdlIGFsc28gbmVlZCB0byB0cmlnZ2VyIGEgc29ydCBjaGFuZ2VcclxuICAgICAgLy8gZm9yIGEgYmFja2VuZCBncmlkLCB3ZSB3aWxsIHRyaWdnZXIgYSBiYWNrZW5kIHNvcnQgY2hhbmdlZCB3aXRoIGFuIGVtcHR5IHNvcnQgY29sdW1ucyBhcnJheVxyXG4gICAgICAvLyBob3dldmVyIGZvciBhIGxvY2FsIGdyaWQsIHdlIG5lZWQgdG8gcGFzcyBhIHNvcnQgY29sdW1uIGFuZCBzbyB3ZSB3aWxsIHNvcnQgYnkgdGhlIDFzdCBjb2x1bW5cclxuICAgICAgaWYgKHRoaXMuX2lzQmFja2VuZEdyaWQpIHtcclxuICAgICAgICB0aGlzLm9uQmFja2VuZFNvcnRDaGFuZ2VkKHVuZGVmaW5lZCwgeyBncmlkOiB0aGlzLl9ncmlkLCBzb3J0Q29sczogW10gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbHVtbkRlZmluaXRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpKSB7XHJcbiAgICAgICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLl9ncmlkLCB0aGlzLl9kYXRhVmlldywgbmV3IEFycmF5KHtzb3J0QXNjOiB0cnVlLCBzb3J0Q29sOiB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1swXSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBzZXQgY3VycmVudCBzb3J0ZXIgdG8gZW1wdHkgJiBlbWl0IGEgc29ydCBjaGFuZ2VkIGV2ZW50XHJcbiAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzID0gW107XHJcblxyXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlcnMgYXJlIGFsbCBjbGVhcmVkXHJcbiAgICB0aGlzLm9uU29ydENsZWFyZWQubmV4dCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKTogQ3VycmVudFNvcnRlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGNvbHVtbiBzb3J0cyxcclxuICAgKiBJZiBhIGNvbHVtbiBpcyBwYXNzZWQgYXMgYW4gYXJndW1lbnQsIHdlIHdvbid0IGFkZCB0aGlzIGNvbHVtbiB0byBvdXIgb3V0cHV0IGFycmF5IHNpbmNlIGl0IGlzIGFscmVhZHkgaW4gdGhlIGFycmF5XHJcbiAgICogV2Ugd2FudCB0byBrbm93IHRoZSBzb3J0IHByaW9yIHRvIGNhbGxpbmcgdGhlIG5leHQgc29ydGluZyBjb21tYW5kXHJcbiAgICovXHJcbiAgZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhjb2x1bW5JZD86IHN0cmluZykge1xyXG4gICAgLy8gZ2V0U29ydENvbHVtbnMoKSBvbmx5IHJldHVybnMgc29ydEFzYyAmIGNvbHVtbklkLCB3ZSB3YW50IHRoZSBlbnRpcmUgY29sdW1uIGRlZmluaXRpb25cclxuICAgIGNvbnN0IG9sZFNvcnRDb2x1bW5zID0gdGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldFNvcnRDb2x1bW5zKCk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBidXQgb25seSBrZWVwIGNvbHVtbiB3aGljaCBhcmUgbm90IGVxdWFsIHRvIG91ciBjdXJyZW50IGNvbHVtblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2xkU29ydENvbHVtbnMpKSB7XHJcbiAgICAgIGNvbnN0IHNvcnRlZENvbHMgPSBvbGRTb3J0Q29sdW1ucy5yZWR1Y2UoKGNvbHMsIGNvbCkgPT4ge1xyXG4gICAgICAgIGlmICghY29sdW1uSWQgfHwgY29sLmNvbHVtbklkICE9PSBjb2x1bW5JZCkge1xyXG4gICAgICAgICAgY29scy5wdXNoKHsgc29ydENvbDogdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbdGhpcy5fZ3JpZC5nZXRDb2x1bW5JbmRleChjb2wuY29sdW1uSWQpXSwgc29ydEFzYzogY29sLnNvcnRBc2MgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xzO1xyXG4gICAgICB9LCBbXSk7XHJcblxyXG4gICAgICByZXR1cm4gc29ydGVkQ29scztcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvYWQgYW55IHByZXNldHMgaWYgdGhlcmUgYXJlIGFueVxyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICogQHBhcmFtIGRhdGFWaWV3XHJcbiAgICovXHJcbiAgbG9hZExvY2FsUHJlc2V0cyhncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIGNvbnN0IHNvcnRDb2xzOiBDb2x1bW5Tb3J0W10gPSBbXTtcclxuICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTsgLy8gcmVzZXQgY3VycmVudCBsb2NhbCBzb3J0ZXJzXHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpIHtcclxuICAgICAgY29uc3Qgc29ydGVycyA9IHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMuc29ydGVycztcclxuXHJcbiAgICAgIHNvcnRlcnMuZm9yRWFjaCgocHJlc2V0U29ydGluZzogQ3VycmVudFNvcnRlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdyaWRDb2x1bW4gPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2w6IENvbHVtbikgPT4gY29sLmlkID09PSBwcmVzZXRTb3J0aW5nLmNvbHVtbklkKTtcclxuICAgICAgICBpZiAoZ3JpZENvbHVtbikge1xyXG4gICAgICAgICAgc29ydENvbHMucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbHVtbklkOiBncmlkQ29sdW1uLmlkLFxyXG4gICAgICAgICAgICBzb3J0QXNjOiAoKHByZXNldFNvcnRpbmcuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDKSA/IHRydWUgOiBmYWxzZSksXHJcbiAgICAgICAgICAgIHNvcnRDb2w6IGdyaWRDb2x1bW5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGtlZXAgY3VycmVudCBzb3J0ZXJzXHJcbiAgICAgICAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgICBjb2x1bW5JZDogZ3JpZENvbHVtbi5pZCArICcnLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246IHByZXNldFNvcnRpbmcuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChzb3J0Q29scy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQoZ3JpZCwgZGF0YVZpZXcsIHNvcnRDb2xzKTtcclxuICAgICAgICBncmlkLnNldFNvcnRDb2x1bW5zKHNvcnRDb2xzKTsgLy8gdXNlIHRoaXMgdG8gYWRkIHNvcnQgaWNvbihzKSBpbiBVSVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkxvY2FsU29ydENoYW5nZWQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55LCBzb3J0Q29sdW1uczogQ29sdW1uU29ydFtdKSB7XHJcbiAgICBpZiAoZ3JpZCAmJiBkYXRhVmlldykge1xyXG4gICAgICBkYXRhVmlldy5zb3J0KChkYXRhUm93MTogYW55LCBkYXRhUm93MjogYW55KSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3J0Q29sdW1ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgIGNvbnN0IGNvbHVtblNvcnRPYmogPSBzb3J0Q29sdW1uc1tpXTtcclxuICAgICAgICAgIGlmIChjb2x1bW5Tb3J0T2JqICYmIGNvbHVtblNvcnRPYmouc29ydENvbCkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gY29sdW1uU29ydE9iai5zb3J0QXNjID8gU29ydERpcmVjdGlvbk51bWJlci5hc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2M7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvcnRGaWVsZCA9IGNvbHVtblNvcnRPYmouc29ydENvbC5xdWVyeUZpZWxkIHx8IGNvbHVtblNvcnRPYmouc29ydENvbC5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtblNvcnRPYmouc29ydENvbC5maWVsZDtcclxuICAgICAgICAgICAgY29uc3QgZmllbGRUeXBlID0gY29sdW1uU29ydE9iai5zb3J0Q29sLnR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuICAgICAgICAgICAgbGV0IHZhbHVlMSA9IGRhdGFSb3cxW3NvcnRGaWVsZF07XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTIgPSBkYXRhUm93Mltzb3J0RmllbGRdO1xyXG5cclxuICAgICAgICAgICAgLy8gd2hlbiBpdGVtIGlzIGEgY29tcGxleCBvYmplY3QgKGRvdCBcIi5cIiBub3RhdGlvbiksIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIG9iamVjdCB0cmVlXHJcbiAgICAgICAgICAgIGlmIChzb3J0RmllbGQgJiYgc29ydEZpZWxkLmluZGV4T2YoJy4nKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgdmFsdWUxID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGRhdGFSb3cxLCBzb3J0RmllbGQpO1xyXG4gICAgICAgICAgICAgIHZhbHVlMiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShkYXRhUm93Miwgc29ydEZpZWxkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc29ydFJlc3VsdCA9IHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTEsIHZhbHVlMiwgZmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHNvcnRSZXN1bHQgIT09IFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWw7XHJcbiAgICAgIH0pO1xyXG4gICAgICBncmlkLmludmFsaWRhdGUoKTtcclxuICAgICAgZ3JpZC5yZW5kZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBsb2NhbCBldmVudFxyXG4gICAgaWYgKHRoaXMuX3NsaWNrU3Vic2NyaWJlciAmJiB0eXBlb2YgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2ltcGxlIGZ1bmN0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHN1YnNjcmliZXIgYW5kIGVtaXQgYSBjaGFuZ2Ugd2hlbiB0aGUgc29ydCBpcyBjYWxsZWQuXHJcbiAgICogT3RoZXIgc2VydmljZXMsIGxpa2UgUGFnaW5hdGlvbiwgY2FuIHRoZW4gc3Vic2NyaWJlIHRvIGl0LlxyXG4gICAqIEBwYXJhbSBzZW5kZXJcclxuICAgKi9cclxuICBlbWl0U29ydENoYW5nZWQoc2VuZGVyOiAnbG9jYWwnIHwgJ3JlbW90ZScpIHtcclxuICAgIGlmIChzZW5kZXIgPT09ICdyZW1vdGUnICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGxldCBjdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcclxuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKSB7XHJcbiAgICAgICAgY3VycmVudFNvcnRlcnMgPSBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycygpIGFzIEN1cnJlbnRTb3J0ZXJbXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uU29ydENoYW5nZWQubmV4dChjdXJyZW50U29ydGVycyk7XHJcbiAgICB9IGVsc2UgaWYgKHNlbmRlciA9PT0gJ2xvY2FsJykge1xyXG4gICAgICB0aGlzLm9uU29ydENoYW5nZWQubmV4dCh0aGlzLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==