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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFJTCxTQUFTLEVBR1QsYUFBYSxFQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSy9CLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ1UseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxrQkFBYSxHQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTlDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBbVF6QyxDQUFDOzs7Ozs7SUFoUUMsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDOzs7Ozs7SUFHRCxJQUFZLGtCQUFrQjtRQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFD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QWdCLElBQUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUNwRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDckM7UUFFRCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7O0lBT0QsZUFBZSxDQUFDLE1BQTBCO1FBQ3hDLElBQUksTUFBTSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUU7O2dCQUMvRSxjQUFjLEdBQW9CLEVBQUU7O2tCQUNsQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO1lBQ2xFLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEQsY0FBYyxHQUFHLG1CQUFBLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFtQixDQUFDO2FBQ3hFO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDekM7YUFBTSxJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBMVFDLDJDQUFtRDs7Ozs7SUFDbkQsb0NBQXNEOzs7OztJQUN0RCxnQ0FBdUI7Ozs7O0lBQ3ZCLDRCQUFtQjs7Ozs7SUFDbkIsdUNBQXFDOzs7OztJQUNyQyxxQ0FBK0I7O0lBQy9CLG9DQUErQzs7SUFDL0Msb0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ydERpcmVjdGlvbk51bWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3NvcnREaXJlY3Rpb25OdW1iZXIuZW51bSc7XG5pbXBvcnQgeyBjYXN0VG9Qcm9taXNlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5Tb3J0LFxuICBDdXJyZW50U29ydGVyLFxuICBGaWVsZFR5cGUsXG4gIEdyaWRPcHRpb24sXG4gIFNsaWNrRXZlbnQsXG4gIFNvcnREaXJlY3Rpb24sXG4gIFNvcnREaXJlY3Rpb25TdHJpbmdcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgZ2V0RGVzY2VuZGFudFByb3BlcnR5IH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgc29ydEJ5RmllbGRUeXBlIH0gZnJvbSAnLi4vc29ydGVycy9zb3J0ZXJVdGlsaXRpZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5leHBvcnQgY2xhc3MgU29ydFNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXJyZW50TG9jYWxTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBfc2xpY2tTdWJzY3JpYmVyOiBTbGlja0V2ZW50O1xuICBwcml2YXRlIF9pc0JhY2tlbmRHcmlkID0gZmFsc2U7XG4gIG9uU29ydENoYW5nZWQgPSBuZXcgU3ViamVjdDxDdXJyZW50U29ydGVyW10+KCk7XG4gIG9uU29ydENsZWFyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBiYWNrZW5kIHNvcnQgKHNpbmdsZS9tdWx0aSkgaG9vayB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcbiAgICogQHBhcmFtIGRhdGFWaWV3IFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3RcbiAgICovXG4gIGF0dGFjaEJhY2tlbmRPblNvcnQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgdGhpcy5faXNCYWNrZW5kR3JpZCA9IHRydWU7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBncmlkLm9uU29ydDtcblxuICAgIC8vIHN1YnNjcmliZSB0byB0aGUgU2xpY2tHcmlkIGV2ZW50IGFuZCBjYWxsIHRoZSBiYWNrZW5kIGV4ZWN1dGlvblxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUodGhpcy5vbkJhY2tlbmRTb3J0Q2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGFzeW5jIG9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogYW55KSB7XG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgdG8gYXR0YWNoIHRoZSBcIm9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50LCBhcmdzKVwiIGZ1bmN0aW9uLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XG4gICAgfVxuICAgIGNvbnN0IGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uID0gYXJncy5ncmlkLmdldE9wdGlvbnMoKSB8fCB7fTtcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XG5cbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xuICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVlcnkgPSBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uU29ydENoYW5nZWQoZXZlbnQsIGFyZ3MpO1xuICAgICAgdGhpcy5lbWl0U29ydENoYW5nZWQoJ3JlbW90ZScpO1xuXG4gICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxuICAgICAgLy8gaW4gYW55IGNhc2UsIHdlIG5lZWQgdG8gaGF2ZSBhIFByb21pc2Ugc28gdGhhdCB3ZSBjYW4gYXdhaXQgb24gaXQgKGlmIGFuIE9ic2VydmFibGUsIGNvbnZlcnQgaXQgdG8gUHJvbWlzZSlcbiAgICAgIGNvbnN0IG9ic2VydmFibGVPclByb21pc2UgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xuICAgICAgY29uc3QgcHJvY2Vzc1Jlc3VsdCA9IGF3YWl0IGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSk7XG4gICAgICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgLy8gZnJvbSB0aGUgcmVzdWx0LCBjYWxsIG91ciBpbnRlcm5hbCBwb3N0IHByb2Nlc3MgdG8gdXBkYXRlIHRoZSBEYXRhc2V0IGFuZCBQYWdpbmF0aW9uIGluZm9cbiAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcykge1xuICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXG4gICAgICBpZiAoYmFja2VuZEFwaS5wb3N0UHJvY2Vzcykge1xuICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgICAgIGVuZFRpbWUsXG4gICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXG4gICAgICAgICAgICB0b3RhbEl0ZW1Db3VudDogdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5vbkVycm9yKSB7XG4gICAgICAgIGJhY2tlbmRBcGkub25FcnJvcihlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGxvY2FsIHNvcnQgKHNpbmdsZS9tdWx0aSkgaG9vayB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcbiAgICogQHBhcmFtIGdyaWRPcHRpb25zIEdyaWQgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIGRhdGFWaWV3XG4gICAqL1xuICBhdHRhY2hMb2NhbE9uU29ydChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcbiAgICB0aGlzLl9pc0JhY2tlbmRHcmlkID0gZmFsc2U7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBncmlkLm9uU29ydDtcblxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUoKGU6IGFueSwgYXJnczogYW55KSA9PiB7XG4gICAgICAvLyBtdWx0aVNvcnQgYW5kIHNpbmdsZVNvcnQgYXJlIG5vdCBleGFjdGx5IHRoZSBzYW1lLCBidXQgd2Ugd2FudCB0byBzdHJ1Y3R1cmUgaXQgdGhlIHNhbWUgZm9yIHRoZSAoZm9yIGxvb3ApIGFmdGVyXG4gICAgICAvLyBhbHNvIHRvIGF2b2lkIGhhdmluZyB0byByZXdyaXRlIHRoZSBmb3IgbG9vcCBpbiB0aGUgc29ydCwgd2Ugd2lsbCBtYWtlIHRoZSBzaW5nbGVTb3J0IGFuIGFycmF5IG9mIDEgb2JqZWN0XG4gICAgICBjb25zdCBzb3J0Q29sdW1ucyA9IChhcmdzLm11bHRpQ29sdW1uU29ydCkgPyBhcmdzLnNvcnRDb2xzIDogbmV3IEFycmF5KHtzb3J0QXNjOiBhcmdzLnNvcnRBc2MsIHNvcnRDb2w6IGFyZ3Muc29ydENvbH0pO1xuXG4gICAgICAvLyBrZWVwIGN1cnJlbnQgc29ydGVyc1xuICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdOyAvLyByZXNldCBjdXJyZW50IGxvY2FsIHNvcnRlcnNcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvcnRDb2x1bW5zKSkge1xuICAgICAgICBzb3J0Q29sdW1ucy5mb3JFYWNoKChzb3J0Q29sdW1uOiB7IHNvcnRDb2w6IENvbHVtbiwgc29ydEFzYzogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBpZiAoc29ydENvbHVtbi5zb3J0Q29sKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICBjb2x1bW5JZDogc29ydENvbHVtbi5zb3J0Q29sLmlkLFxuICAgICAgICAgICAgICBkaXJlY3Rpb246IHNvcnRDb2x1bW4uc29ydEFzYyA/IFNvcnREaXJlY3Rpb24uQVNDIDogU29ydERpcmVjdGlvbi5ERVNDXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZChncmlkLCBkYXRhVmlldywgc29ydENvbHVtbnMpO1xuICAgICAgdGhpcy5lbWl0U29ydENoYW5nZWQoJ2xvY2FsJyk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhclNvcnRpbmcoKSB7XG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZGF0YVZpZXcpIHtcbiAgICAgIC8vIHJlbW92ZSBhbnkgc29ydCBpY29ucyAodGhpcyBzZXRTb3J0Q29sdW1ucyBmdW5jdGlvbiBjYWxsIHJlYWxseSBkb2VzIG9ubHkgdGhhdClcbiAgICAgIHRoaXMuX2dyaWQuc2V0U29ydENvbHVtbnMoW10pO1xuXG4gICAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gdHJpZ2dlciBhIHNvcnQgY2hhbmdlXG4gICAgICAvLyBmb3IgYSBiYWNrZW5kIGdyaWQsIHdlIHdpbGwgdHJpZ2dlciBhIGJhY2tlbmQgc29ydCBjaGFuZ2VkIHdpdGggYW4gZW1wdHkgc29ydCBjb2x1bW5zIGFycmF5XG4gICAgICAvLyBob3dldmVyIGZvciBhIGxvY2FsIGdyaWQsIHdlIG5lZWQgdG8gcGFzcyBhIHNvcnQgY29sdW1uIGFuZCBzbyB3ZSB3aWxsIHNvcnQgYnkgdGhlIDFzdCBjb2x1bW5cbiAgICAgIGlmICh0aGlzLl9pc0JhY2tlbmRHcmlkKSB7XG4gICAgICAgIHRoaXMub25CYWNrZW5kU29ydENoYW5nZWQodW5kZWZpbmVkLCB7IGdyaWQ6IHRoaXMuX2dyaWQsIHNvcnRDb2xzOiBbXSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xuICAgICAgICAgIHRoaXMub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuX2dyaWQsIHRoaXMuX2RhdGFWaWV3LCBuZXcgQXJyYXkoe3NvcnRBc2M6IHRydWUsIHNvcnRDb2w6IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zWzBdIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBzZXQgY3VycmVudCBzb3J0ZXIgdG8gZW1wdHkgJiBlbWl0IGEgc29ydCBjaGFuZ2VkIGV2ZW50XG4gICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdO1xuXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlcnMgYXJlIGFsbCBjbGVhcmVkXG4gICAgdGhpcy5vblNvcnRDbGVhcmVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBnZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbHVtbiBzb3J0cyxcbiAgICogSWYgYSBjb2x1bW4gaXMgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCB3ZSB3b24ndCBhZGQgdGhpcyBjb2x1bW4gdG8gb3VyIG91dHB1dCBhcnJheSBzaW5jZSBpdCBpcyBhbHJlYWR5IGluIHRoZSBhcnJheVxuICAgKiBXZSB3YW50IHRvIGtub3cgdGhlIHNvcnQgcHJpb3IgdG8gY2FsbGluZyB0aGUgbmV4dCBzb3J0aW5nIGNvbW1hbmRcbiAgICovXG4gIGdldFByZXZpb3VzQ29sdW1uU29ydHMoY29sdW1uSWQ/OiBzdHJpbmcpIHtcbiAgICAvLyBnZXRTb3J0Q29sdW1ucygpIG9ubHkgcmV0dXJucyBzb3J0QXNjICYgY29sdW1uSWQsIHdlIHdhbnQgdGhlIGVudGlyZSBjb2x1bW4gZGVmaW5pdGlvblxuICAgIGNvbnN0IG9sZFNvcnRDb2x1bW5zID0gdGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldFNvcnRDb2x1bW5zKCk7XG5cbiAgICAvLyBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGJ1dCBvbmx5IGtlZXAgY29sdW1uIHdoaWNoIGFyZSBub3QgZXF1YWwgdG8gb3VyIGN1cnJlbnQgY29sdW1uXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2xkU29ydENvbHVtbnMpKSB7XG4gICAgICBjb25zdCBzb3J0ZWRDb2xzID0gb2xkU29ydENvbHVtbnMucmVkdWNlKChjb2xzLCBjb2wpID0+IHtcbiAgICAgICAgaWYgKCFjb2x1bW5JZCB8fCBjb2wuY29sdW1uSWQgIT09IGNvbHVtbklkKSB7XG4gICAgICAgICAgY29scy5wdXNoKHsgc29ydENvbDogdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbdGhpcy5fZ3JpZC5nZXRDb2x1bW5JbmRleChjb2wuY29sdW1uSWQpXSwgc29ydEFzYzogY29sLnNvcnRBc2MgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbHM7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIHJldHVybiBzb3J0ZWRDb2xzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogbG9hZCBhbnkgcHJlc2V0cyBpZiB0aGVyZSBhcmUgYW55XG4gICAqIEBwYXJhbSBncmlkXG4gICAqIEBwYXJhbSBkYXRhVmlld1xuICAgKi9cbiAgbG9hZExvY2FsUHJlc2V0cyhncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcbiAgICBjb25zdCBzb3J0Q29sczogQ29sdW1uU29ydFtdID0gW107XG4gICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdOyAvLyByZXNldCBjdXJyZW50IGxvY2FsIHNvcnRlcnNcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpIHtcbiAgICAgIGNvbnN0IHNvcnRlcnMgPSB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnM7XG5cbiAgICAgIHNvcnRlcnMuZm9yRWFjaCgocHJlc2V0U29ydGluZzogQ3VycmVudFNvcnRlcikgPT4ge1xuICAgICAgICBjb25zdCBncmlkQ29sdW1uID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sOiBDb2x1bW4pID0+IGNvbC5pZCA9PT0gcHJlc2V0U29ydGluZy5jb2x1bW5JZCk7XG4gICAgICAgIGlmIChncmlkQ29sdW1uKSB7XG4gICAgICAgICAgc29ydENvbHMucHVzaCh7XG4gICAgICAgICAgICBjb2x1bW5JZDogZ3JpZENvbHVtbi5pZCxcbiAgICAgICAgICAgIHNvcnRBc2M6ICgocHJlc2V0U29ydGluZy5kaXJlY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gU29ydERpcmVjdGlvbi5BU0MpID8gdHJ1ZSA6IGZhbHNlKSxcbiAgICAgICAgICAgIHNvcnRDb2w6IGdyaWRDb2x1bW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIGtlZXAgY3VycmVudCBzb3J0ZXJzXG4gICAgICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBncmlkQ29sdW1uLmlkICsgJycsXG4gICAgICAgICAgICBkaXJlY3Rpb246IHByZXNldFNvcnRpbmcuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNvcnRDb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQoZ3JpZCwgZGF0YVZpZXcsIHNvcnRDb2xzKTtcbiAgICAgICAgZ3JpZC5zZXRTb3J0Q29sdW1ucyhzb3J0Q29scyk7IC8vIHVzZSB0aGlzIHRvIGFkZCBzb3J0IGljb24ocykgaW4gVUlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkxvY2FsU29ydENoYW5nZWQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55LCBzb3J0Q29sdW1uczogQ29sdW1uU29ydFtdKSB7XG4gICAgaWYgKGdyaWQgJiYgZGF0YVZpZXcpIHtcbiAgICAgIGRhdGFWaWV3LnNvcnQoKGRhdGFSb3cxOiBhbnksIGRhdGFSb3cyOiBhbnkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3J0Q29sdW1ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW5Tb3J0T2JqID0gc29ydENvbHVtbnNbaV07XG4gICAgICAgICAgaWYgKGNvbHVtblNvcnRPYmogJiYgY29sdW1uU29ydE9iai5zb3J0Q29sKSB7XG4gICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gY29sdW1uU29ydE9iai5zb3J0QXNjID8gU29ydERpcmVjdGlvbk51bWJlci5hc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2M7XG4gICAgICAgICAgICBjb25zdCBzb3J0RmllbGQgPSBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wuZmllbGQ7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wudHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xuICAgICAgICAgICAgbGV0IHZhbHVlMSA9IGRhdGFSb3cxW3NvcnRGaWVsZF07XG4gICAgICAgICAgICBsZXQgdmFsdWUyID0gZGF0YVJvdzJbc29ydEZpZWxkXTtcblxuICAgICAgICAgICAgLy8gd2hlbiBpdGVtIGlzIGEgY29tcGxleCBvYmplY3QgKGRvdCBcIi5cIiBub3RhdGlvbiksIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIG9iamVjdCB0cmVlXG4gICAgICAgICAgICBpZiAoc29ydEZpZWxkICYmIHNvcnRGaWVsZC5pbmRleE9mKCcuJykgPj0gMCkge1xuICAgICAgICAgICAgICB2YWx1ZTEgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoZGF0YVJvdzEsIHNvcnRGaWVsZCk7XG4gICAgICAgICAgICAgIHZhbHVlMiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShkYXRhUm93Miwgc29ydEZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc29ydFJlc3VsdCA9IHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTEsIHZhbHVlMiwgZmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChzb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNvcnRSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWw7XG4gICAgICB9KTtcbiAgICAgIGdyaWQuaW52YWxpZGF0ZSgpO1xuICAgICAgZ3JpZC5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGxvY2FsIGV2ZW50XG4gICAgaWYgKHRoaXMuX3NsaWNrU3Vic2NyaWJlciAmJiB0eXBlb2YgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIGZ1bmN0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHN1YnNjcmliZXIgYW5kIGVtaXQgYSBjaGFuZ2Ugd2hlbiB0aGUgc29ydCBpcyBjYWxsZWQuXG4gICAqIE90aGVyIHNlcnZpY2VzLCBsaWtlIFBhZ2luYXRpb24sIGNhbiB0aGVuIHN1YnNjcmliZSB0byBpdC5cbiAgICogQHBhcmFtIHNlbmRlclxuICAgKi9cbiAgZW1pdFNvcnRDaGFuZ2VkKHNlbmRlcjogJ2xvY2FsJyB8ICdyZW1vdGUnKSB7XG4gICAgaWYgKHNlbmRlciA9PT0gJ3JlbW90ZScgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcbiAgICAgIGxldCBjdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMpIHtcbiAgICAgICAgY3VycmVudFNvcnRlcnMgPSBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycygpIGFzIEN1cnJlbnRTb3J0ZXJbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25Tb3J0Q2hhbmdlZC5uZXh0KGN1cnJlbnRTb3J0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHNlbmRlciA9PT0gJ2xvY2FsJykge1xuICAgICAgdGhpcy5vblNvcnRDaGFuZ2VkLm5leHQodGhpcy5nZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCkpO1xuICAgIH1cbiAgfVxufVxuIl19