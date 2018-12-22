/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ExtensionName, GridStateType, } from './../models/index';
import { Subject } from 'rxjs';
var GridStateService = /** @class */ (function () {
    function GridStateService() {
        this._eventHandler = new Slick.EventHandler();
        this._columns = [];
        this._currentColumns = [];
        this.subscriptions = [];
        this.onGridStateChanged = new Subject();
    }
    Object.defineProperty(GridStateService.prototype, "_gridOptions", {
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
     * Initialize the Export Service
     * @param grid
     * @param filterService
     * @param sortService
     * @param dataView
     */
    /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} sortService
     * @return {?}
     */
    GridStateService.prototype.init = /**
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} sortService
     * @return {?}
     */
    function (grid, extensionService, filterService, sortService) {
        this._grid = grid;
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.subscribeToAllGridChanges(grid);
    };
    /** Dispose of all the SlickGrid & Angular subscriptions */
    /**
     * Dispose of all the SlickGrid & Angular subscriptions
     * @return {?}
     */
    GridStateService.prototype.dispose = /**
     * Dispose of all the SlickGrid & Angular subscriptions
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // also unsubscribe all Angular Subscriptions
        this.subscriptions.forEach(function (subscription) {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
    };
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return grid state
     */
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return {?} grid state
     */
    GridStateService.prototype.getCurrentGridState = /**
     * Get the current grid state (filters/sorters/pagination)
     * @return {?} grid state
     */
    function () {
        /** @type {?} */
        var gridState = {
            columns: this.getCurrentColumns(),
            filters: this.getCurrentFilters(),
            sorters: this.getCurrentSorters()
        };
        /** @type {?} */
        var currentPagination = this.getCurrentPagination();
        if (currentPagination) {
            gridState.pagination = currentPagination;
        }
        return gridState;
    };
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return current columns
     */
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    GridStateService.prototype.getColumns = /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    function () {
        return this._columns || this._grid.getColumns();
    };
    /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param gridColumns
     */
    /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param {?} gridColumns
     * @return {?}
     */
    GridStateService.prototype.getAssociatedCurrentColumns = /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param {?} gridColumns
     * @return {?}
     */
    function (gridColumns) {
        /** @type {?} */
        var currentColumns = [];
        if (gridColumns && Array.isArray(gridColumns)) {
            gridColumns.forEach(function (column, index) {
                if (column && column.id) {
                    currentColumns.push({
                        columnId: (/** @type {?} */ (column.id)),
                        cssClass: column.cssClass || '',
                        headerCssClass: column.headerCssClass || '',
                        width: column.width || 0
                    });
                }
            });
        }
        this._currentColumns = currentColumns;
        return currentColumns;
    };
    /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param grid
     * @param currentColumns
     */
    /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param {?} grid
     * @param {?} currentColumns
     * @return {?}
     */
    GridStateService.prototype.getAssociatedGridColumns = /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param {?} grid
     * @param {?} currentColumns
     * @return {?}
     */
    function (grid, currentColumns) {
        /** @type {?} */
        var columns = [];
        /** @type {?} */
        var gridColumns = grid.getColumns();
        if (currentColumns && Array.isArray(currentColumns)) {
            currentColumns.forEach(function (currentColumn, index) {
                /** @type {?} */
                var gridColumn = gridColumns.find(function (c) { return c.id === currentColumn.columnId; });
                if (gridColumn && gridColumn.id) {
                    columns.push(tslib_1.__assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                }
            });
        }
        this._columns = columns;
        return columns;
    };
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return current columns
     */
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    GridStateService.prototype.getCurrentColumns = /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    function () {
        /** @type {?} */
        var currentColumns = [];
        if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
            currentColumns = this._currentColumns;
        }
        else {
            currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
        }
        return currentColumns;
    };
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return current filters
     */
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return {?} current filters
     */
    GridStateService.prototype.getCurrentFilters = /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return {?} current filters
     */
    function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                return (/** @type {?} */ (backendService.getCurrentFilters()));
            }
        }
        else if (this.filterService && this.filterService.getCurrentLocalFilters) {
            return this.filterService.getCurrentLocalFilters();
        }
        return null;
    };
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return current pagination state
     */
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return {?} current pagination state
     */
    GridStateService.prototype.getCurrentPagination = /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return {?} current pagination state
     */
    function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentPagination) {
                return backendService.getCurrentPagination();
            }
        }
        else {
            // TODO implement this whenever local pagination gets implemented
        }
        return null;
    };
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return current sorters
     */
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return {?} current sorters
     */
    GridStateService.prototype.getCurrentSorters = /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return {?} current sorters
     */
    function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                return (/** @type {?} */ (backendService.getCurrentSorters()));
            }
        }
        else if (this.sortService && this.sortService.getCurrentLocalSorters) {
            return this.sortService.getCurrentLocalSorters();
        }
        return null;
    };
    /**
     * Hook a SlickGrid Extension Event to a Grid State change event
     * @param extension name
     * @param grid
     */
    /**
     * Hook a SlickGrid Extension Event to a Grid State change event
     * @param {?} extensionName
     * @param {?} eventName
     * @return {?}
     */
    GridStateService.prototype.hookExtensionEventToGridStateChange = /**
     * Hook a SlickGrid Extension Event to a Grid State change event
     * @param {?} extensionName
     * @param {?} eventName
     * @return {?}
     */
    function (extensionName, eventName) {
        var _this = this;
        /** @type {?} */
        var extension = this.extensionService && this.extensionService.getExtensionByName(extensionName);
        if (extension && extension.class && extension.class[eventName] && extension.class[eventName].subscribe) {
            this._eventHandler.subscribe(extension.class[eventName], function (e, args) {
                /** @type {?} */
                var columns = args && args.columns;
                /** @type {?} */
                var currentColumns = _this.getAssociatedCurrentColumns(columns);
                _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
            });
        }
    };
    /**
     * Hook a Grid Event to a Grid State change event
     * @param event name
     * @param grid
     */
    /**
     * Hook a Grid Event to a Grid State change event
     * @param {?} eventName
     * @param {?} grid
     * @return {?}
     */
    GridStateService.prototype.hookSlickGridEventToGridStateChange = /**
     * Hook a Grid Event to a Grid State change event
     * @param {?} eventName
     * @param {?} grid
     * @return {?}
     */
    function (eventName, grid) {
        var _this = this;
        if (grid && grid[eventName] && grid[eventName].subscribe) {
            this._eventHandler.subscribe(grid[eventName], function (e, args) {
                /** @type {?} */
                var columns = grid.getColumns();
                /** @type {?} */
                var currentColumns = _this.getAssociatedCurrentColumns(columns);
                _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
            });
        }
    };
    /**
     * @param {?=} columnDefinitions
     * @return {?}
     */
    GridStateService.prototype.resetColumns = /**
     * @param {?=} columnDefinitions
     * @return {?}
     */
    function (columnDefinitions) {
        /** @type {?} */
        var columns = columnDefinitions || this._columns;
        /** @type {?} */
        var currentColumns = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
    };
    /** if we use Row Selection or the Checkbox Selector, we need to reset any selection */
    /**
     * if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @return {?}
     */
    GridStateService.prototype.resetRowSelection = /**
     * if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @return {?}
     */
    function () {
        if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
            // this also requires the Row Selection Model to be registered as well
            /** @type {?} */
            var rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
            if (rowSelectionExtension && rowSelectionExtension.extension) {
                this._grid.setSelectedRows([]);
            }
        }
    };
    /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     */
    /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     * @param {?} grid
     * @return {?}
     */
    GridStateService.prototype.subscribeToAllGridChanges = /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        var _this = this;
        // Subscribe to Event Emitter of Filter changed
        this.subscriptions.push(this.filterService.onFilterChanged.subscribe(function (currentFilters) {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Filter cleared
        this.subscriptions.push(this.filterService.onFilterCleared.subscribe(function () {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort changed
        this.subscriptions.push(this.sortService.onSortChanged.subscribe(function (currentSorters) {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort cleared
        this.subscriptions.push(this.sortService.onSortCleared.subscribe(function () {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
        this.hookExtensionEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
        this.hookExtensionEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');
        // subscribe to Column Resize & Reordering
        this.hookSlickGridEventToGridStateChange('onColumnsReordered', grid);
        this.hookSlickGridEventToGridStateChange('onColumnsResized', grid);
    };
    return GridStateService;
}());
export { GridStateService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype._columns;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype._currentColumns;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype.extensionService;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    GridStateService.prototype.subscriptions;
    /** @type {?} */
    GridStateService.prototype.onGridStateChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZFN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQU1MLGFBQWEsRUFJYixhQUFhLEdBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUkzQixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQU03QztJQUFBO1FBQ1Usa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLG9CQUFlLEdBQW9CLEVBQUUsQ0FBQztRQUt0QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDM0MsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7SUE0UXRELENBQUM7SUF6UUMsc0JBQVksMENBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILCtCQUFJOzs7Ozs7OztJQUFKLFVBQUssSUFBUyxFQUFFLGdCQUFrQyxFQUFFLGFBQTRCLEVBQUUsV0FBd0I7UUFDeEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFD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Q0FBQztZQUN2QyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakksQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLHFGQUFxRjtRQUNyRixJQUFJLENBQUMsbUNBQW1DLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFckYsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsbUNBQW1DLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXJSRCxJQXFSQzs7Ozs7OztJQXBSQyx5Q0FBaUQ7Ozs7O0lBQ2pELG9DQUFnQzs7Ozs7SUFDaEMsMkNBQThDOzs7OztJQUM5QyxpQ0FBbUI7Ozs7O0lBQ25CLDRDQUEyQzs7Ozs7SUFDM0MseUNBQXFDOzs7OztJQUNyQyx1Q0FBaUM7Ozs7O0lBQ2pDLHlDQUEyQzs7SUFDM0MsOENBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ3VycmVudENvbHVtbixcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxyXG4gIEN1cnJlbnRTb3J0ZXIsXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBHcmlkT3B0aW9uLFxyXG4gIEdyaWRTdGF0ZSxcclxuICBHcmlkU3RhdGVDaGFuZ2UsXHJcbiAgR3JpZFN0YXRlVHlwZSxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4vZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4vc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkU3RhdGVTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfY29sdW1uczogQ29sdW1uW10gPSBbXTtcclxuICBwcml2YXRlIF9jdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZTtcclxuICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIG9uR3JpZFN0YXRlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEdyaWRTdGF0ZUNoYW5nZT4oKTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBFeHBvcnQgU2VydmljZVxyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICogQHBhcmFtIGZpbHRlclNlcnZpY2VcclxuICAgKiBAcGFyYW0gc29ydFNlcnZpY2VcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBpbml0KGdyaWQ6IGFueSwgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSwgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZSA9IGV4dGVuc2lvblNlcnZpY2U7XHJcbiAgICB0aGlzLmZpbHRlclNlcnZpY2UgPSBmaWx0ZXJTZXJ2aWNlO1xyXG4gICAgdGhpcy5zb3J0U2VydmljZSA9IHNvcnRTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaWJlVG9BbGxHcmlkQ2hhbmdlcyhncmlkKTtcclxuICB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgU2xpY2tHcmlkICYgQW5ndWxhciBzdWJzY3JpcHRpb25zICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHJcbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBBbmd1bGFyIFN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xyXG4gICAgICBpZiAoc3Vic2NyaXB0aW9uICYmIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkge1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IGdyaWQgc3RhdGUgKGZpbHRlcnMvc29ydGVycy9wYWdpbmF0aW9uKVxyXG4gICAqIEByZXR1cm4gZ3JpZCBzdGF0ZVxyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRHcmlkU3RhdGUoKTogR3JpZFN0YXRlIHtcclxuICAgIGNvbnN0IGdyaWRTdGF0ZTogR3JpZFN0YXRlID0ge1xyXG4gICAgICBjb2x1bW5zOiB0aGlzLmdldEN1cnJlbnRDb2x1bW5zKCksXHJcbiAgICAgIGZpbHRlcnM6IHRoaXMuZ2V0Q3VycmVudEZpbHRlcnMoKSxcclxuICAgICAgc29ydGVyczogdGhpcy5nZXRDdXJyZW50U29ydGVycygpXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRQYWdpbmF0aW9uID0gdGhpcy5nZXRDdXJyZW50UGFnaW5hdGlvbigpO1xyXG4gICAgaWYgKGN1cnJlbnRQYWdpbmF0aW9uKSB7XHJcbiAgICAgIGdyaWRTdGF0ZS5wYWdpbmF0aW9uID0gY3VycmVudFBhZ2luYXRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ3JpZFN0YXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDb2x1bW5zIChhbmQgdGhlaXIgc3RhdGU6IHZpc2liaWxpdHkvcG9zaXRpb24pIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IGNvbHVtbnNcclxuICAgKi9cclxuICBnZXRDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zIHx8IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhbiBhcnJheSBvZiBHcmlkIENvbHVtbiBEZWZpbml0aW9ucywgZ2V0IHRoZSBhc3NvY2lhdGVkIEN1cnJlbnQgQ29sdW1uc1xyXG4gICAqIEBwYXJhbSBncmlkQ29sdW1uc1xyXG4gICAqL1xyXG4gIGdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhncmlkQ29sdW1uczogQ29sdW1uW10pOiBDdXJyZW50Q29sdW1uW10ge1xyXG4gICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IFtdO1xyXG5cclxuICAgIGlmIChncmlkQ29sdW1ucyAmJiBBcnJheS5pc0FycmF5KGdyaWRDb2x1bW5zKSkge1xyXG4gICAgICBncmlkQ29sdW1ucy5mb3JFYWNoKChjb2x1bW46IENvbHVtbiwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLmlkKSB7XHJcbiAgICAgICAgICBjdXJyZW50Q29sdW1ucy5wdXNoKHtcclxuICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbi5pZCBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBjb2x1bW4uY3NzQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgIGhlYWRlckNzc0NsYXNzOiBjb2x1bW4uaGVhZGVyQ3NzQ2xhc3MgfHwgJycsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjb2x1bW4ud2lkdGggfHwgMFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2N1cnJlbnRDb2x1bW5zID0gY3VycmVudENvbHVtbnM7XHJcbiAgICByZXR1cm4gY3VycmVudENvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIGFuIGFycmF5IG9mIEN1cnJlbnQgQ29sdW1ucywgZ2V0IHRoZSBhc3NvY2lhdGVkIEdyaWQgQ29sdW1uIERlZmluaXRpb25zXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKiBAcGFyYW0gY3VycmVudENvbHVtbnNcclxuICAgKi9cclxuICBnZXRBc3NvY2lhdGVkR3JpZENvbHVtbnMoZ3JpZDogYW55LCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdKTogQ29sdW1uW10ge1xyXG4gICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBbXTtcclxuICAgIGNvbnN0IGdyaWRDb2x1bW5zOiBDb2x1bW5bXSA9IGdyaWQuZ2V0Q29sdW1ucygpO1xyXG5cclxuICAgIGlmIChjdXJyZW50Q29sdW1ucyAmJiBBcnJheS5pc0FycmF5KGN1cnJlbnRDb2x1bW5zKSkge1xyXG4gICAgICBjdXJyZW50Q29sdW1ucy5mb3JFYWNoKChjdXJyZW50Q29sdW1uOiBDdXJyZW50Q29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ3JpZENvbHVtbjogQ29sdW1uID0gZ3JpZENvbHVtbnMuZmluZCgoYzogQ29sdW1uKSA9PiBjLmlkID09PSBjdXJyZW50Q29sdW1uLmNvbHVtbklkKTtcclxuICAgICAgICBpZiAoZ3JpZENvbHVtbiAmJiBncmlkQ29sdW1uLmlkKSB7XHJcbiAgICAgICAgICBjb2x1bW5zLnB1c2goe1xyXG4gICAgICAgICAgICAuLi5ncmlkQ29sdW1uLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogY3VycmVudENvbHVtbi5jc3NDbGFzcyxcclxuICAgICAgICAgICAgaGVhZGVyQ3NzQ2xhc3M6IGN1cnJlbnRDb2x1bW4uaGVhZGVyQ3NzQ2xhc3MsXHJcbiAgICAgICAgICAgIHdpZHRoOiBjdXJyZW50Q29sdW1uLndpZHRoXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY29sdW1ucyA9IGNvbHVtbnM7XHJcbiAgICByZXR1cm4gY29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQ29sdW1ucyAoYW5kIHRoZWlyIHN0YXRlOiB2aXNpYmlsaXR5L3Bvc2l0aW9uKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxyXG4gICAqIEByZXR1cm4gY3VycmVudCBjb2x1bW5zXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudENvbHVtbnMoKTogQ3VycmVudENvbHVtbltdIHtcclxuICAgIGxldCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XHJcbiAgICBpZiAodGhpcy5fY3VycmVudENvbHVtbnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jdXJyZW50Q29sdW1ucykgJiYgdGhpcy5fY3VycmVudENvbHVtbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjdXJyZW50Q29sdW1ucyA9IHRoaXMuX2N1cnJlbnRDb2x1bW5zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudENvbHVtbnMgPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyh0aGlzLl9ncmlkLmdldENvbHVtbnMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRDb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBGaWx0ZXJzIChhbmQgdGhlaXIgc3RhdGUsIGNvbHVtbklkLCBzZWFyY2hUZXJtKHMpKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxyXG4gICAqIEByZXR1cm4gY3VycmVudCBmaWx0ZXJzXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudEZpbHRlcnMoKTogQ3VycmVudEZpbHRlcltdIHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xyXG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMpIHtcclxuICAgICAgICByZXR1cm4gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMoKSBhcyBDdXJyZW50RmlsdGVyW107XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5maWx0ZXJTZXJ2aWNlICYmIHRoaXMuZmlsdGVyU2VydmljZS5nZXRDdXJyZW50TG9jYWxGaWx0ZXJzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlclNlcnZpY2UuZ2V0Q3VycmVudExvY2FsRmlsdGVycygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY3VycmVudCBQYWdpbmF0aW9uIChhbmQgaXQncyBzdGF0ZSwgcGFnZU51bWJlciwgcGFnZVNpemUpIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IHBhZ2luYXRpb24gc3RhdGVcclxuICAgKi9cclxuICBnZXRDdXJyZW50UGFnaW5hdGlvbigpOiBDdXJyZW50UGFnaW5hdGlvbiB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcclxuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRQYWdpbmF0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRQYWdpbmF0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRPRE8gaW1wbGVtZW50IHRoaXMgd2hlbmV2ZXIgbG9jYWwgcGFnaW5hdGlvbiBnZXRzIGltcGxlbWVudGVkXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCBTb3J0ZXJzIChhbmQgdGhlaXIgc3RhdGUsIGNvbHVtbklkLCBkaXJlY3Rpb24pIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IHNvcnRlcnNcclxuICAgKi9cclxuICBnZXRDdXJyZW50U29ydGVycygpOiBDdXJyZW50U29ydGVyW10gfCBudWxsIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycykge1xyXG4gICAgICAgIHJldHVybiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycygpIGFzIEN1cnJlbnRTb3J0ZXJbXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuZ2V0Q3VycmVudExvY2FsU29ydGVycykge1xyXG4gICAgICByZXR1cm4gdGhpcy5zb3J0U2VydmljZS5nZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvb2sgYSBTbGlja0dyaWQgRXh0ZW5zaW9uIEV2ZW50IHRvIGEgR3JpZCBTdGF0ZSBjaGFuZ2UgZXZlbnRcclxuICAgKiBAcGFyYW0gZXh0ZW5zaW9uIG5hbWVcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqL1xyXG4gIGhvb2tFeHRlbnNpb25FdmVudFRvR3JpZFN0YXRlQ2hhbmdlKGV4dGVuc2lvbk5hbWU6IEV4dGVuc2lvbk5hbWUsIGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLmV4dGVuc2lvblNlcnZpY2UgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZShleHRlbnNpb25OYW1lKTtcclxuXHJcbiAgICBpZiAoZXh0ZW5zaW9uICYmIGV4dGVuc2lvbi5jbGFzcyAmJiBleHRlbnNpb24uY2xhc3NbZXZlbnROYW1lXSAmJiBleHRlbnNpb24uY2xhc3NbZXZlbnROYW1lXS5zdWJzY3JpYmUpIHtcclxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShleHRlbnNpb24uY2xhc3NbZXZlbnROYW1lXSwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IGFyZ3MgJiYgYXJncy5jb2x1bW5zO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhjb2x1bW5zKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudENvbHVtbnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuY29sdW1ucyB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhvb2sgYSBHcmlkIEV2ZW50IHRvIGEgR3JpZCBTdGF0ZSBjaGFuZ2UgZXZlbnRcclxuICAgKiBAcGFyYW0gZXZlbnQgbmFtZVxyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICovXHJcbiAgaG9va1NsaWNrR3JpZEV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoZXZlbnROYW1lOiBzdHJpbmcsIGdyaWQ6IGFueSkge1xyXG4gICAgaWYgKGdyaWQgJiYgZ3JpZFtldmVudE5hbWVdICYmIGdyaWRbZXZlbnROYW1lXS5zdWJzY3JpYmUpIHtcclxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkW2V2ZW50TmFtZV0sIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBncmlkLmdldENvbHVtbnMoKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldENvbHVtbnMoY29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBjb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLl9jb2x1bW5zO1xyXG4gICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGNvbHVtbnMpO1xyXG4gICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBpZiB3ZSB1c2UgUm93IFNlbGVjdGlvbiBvciB0aGUgQ2hlY2tib3ggU2VsZWN0b3IsIHdlIG5lZWQgdG8gcmVzZXQgYW55IHNlbGVjdGlvbiAqL1xyXG4gIHJlc2V0Um93U2VsZWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcclxuICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5leHRlbnNpb25TZXJ2aWNlICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XHJcbiAgICAgIGlmIChyb3dTZWxlY3Rpb25FeHRlbnNpb24gJiYgcm93U2VsZWN0aW9uRXh0ZW5zaW9uLmV4dGVuc2lvbikge1xyXG4gICAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIGFsbCBuZWNlc3NhcnkgU2xpY2tHcmlkIG9yIFNlcnZpY2UgRXZlbnRzIHRoYXQgZGVhbHMgd2l0aCBhIEdyaWQgY2hhbmdlLFxyXG4gICAqIHdoZW4gdHJpZ2dlcmVkLCB3ZSB3aWxsIHB1Ymxpc2ggYSBHcmlkIFN0YXRlIEV2ZW50IHdpdGggY3VycmVudCBHcmlkIFN0YXRlXHJcbiAgICovXHJcbiAgc3Vic2NyaWJlVG9BbGxHcmlkQ2hhbmdlcyhncmlkOiBhbnkpIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIEZpbHRlciBjaGFuZ2VkXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRGaWx0ZXJzLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmZpbHRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIEZpbHRlciBjbGVhcmVkXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNsZWFyZWQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBbXSwgdHlwZTogR3JpZFN0YXRlVHlwZS5maWx0ZXIgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIFNvcnQgY2hhbmdlZFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Tb3J0Q2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRTb3J0ZXJzLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnNvcnRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBTb3J0IGNsZWFyZWRcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uU29ydENsZWFyZWQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IFtdLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnNvcnRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gQ29sdW1uUGlja2VyIGFuZC9vciBHcmlkTWVudSBmb3Igc2hvdy9oaWRlIENvbHVtbnMgdmlzaWJpbGl0eSBjaGFuZ2VzXHJcbiAgICB0aGlzLmhvb2tFeHRlbnNpb25FdmVudFRvR3JpZFN0YXRlQ2hhbmdlKEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCAnb25Db2x1bW5zQ2hhbmdlZCcpO1xyXG4gICAgdGhpcy5ob29rRXh0ZW5zaW9uRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZShFeHRlbnNpb25OYW1lLmdyaWRNZW51LCAnb25Db2x1bW5zQ2hhbmdlZCcpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBDb2x1bW4gUmVzaXplICYgUmVvcmRlcmluZ1xyXG4gICAgdGhpcy5ob29rU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZSgnb25Db2x1bW5zUmVvcmRlcmVkJywgZ3JpZCk7XHJcbiAgICB0aGlzLmhvb2tTbGlja0dyaWRFdmVudFRvR3JpZFN0YXRlQ2hhbmdlKCdvbkNvbHVtbnNSZXNpemVkJywgZ3JpZCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==