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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZFN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQU1MLGFBQWEsRUFJYixhQUFhLEdBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUkzQixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQU03QztJQUFBO1FBQ1Usa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLG9CQUFlLEdBQW9CLEVBQUUsQ0FBQztRQUt0QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFDM0MsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7SUE0UXRELENBQUM7SUF6UUMsc0JBQVksMENBQVk7UUFEeEIsaUVBQWlFOzs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNILCtCQUFJOzs7Ozs7OztJQUFKLFVBQUssSUFBUyxFQUFFLGdCQUFrQyxFQUFFLGFBQTRCLEVBQUUsV0FBd0I7UUFDeEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFD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Q0FBQztZQUN2QyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakksQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLHFGQUFxRjtRQUNyRixJQUFJLENBQUMsbUNBQW1DLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFckYsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsbUNBQW1DLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXJSRCxJQXFSQzs7Ozs7OztJQXBSQyx5Q0FBaUQ7Ozs7O0lBQ2pELG9DQUFnQzs7Ozs7SUFDaEMsMkNBQThDOzs7OztJQUM5QyxpQ0FBbUI7Ozs7O0lBQ25CLDRDQUEyQzs7Ozs7SUFDM0MseUNBQXFDOzs7OztJQUNyQyx1Q0FBaUM7Ozs7O0lBQ2pDLHlDQUEyQzs7SUFDM0MsOENBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDdXJyZW50Q29sdW1uLFxuICBDdXJyZW50RmlsdGVyLFxuICBDdXJyZW50UGFnaW5hdGlvbixcbiAgQ3VycmVudFNvcnRlcixcbiAgRXh0ZW5zaW9uTmFtZSxcbiAgR3JpZE9wdGlvbixcbiAgR3JpZFN0YXRlLFxuICBHcmlkU3RhdGVDaGFuZ2UsXG4gIEdyaWRTdGF0ZVR5cGUsXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL2ZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi9zb3J0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBHcmlkU3RhdGVTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xuICBwcml2YXRlIF9jb2x1bW5zOiBDb2x1bW5bXSA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBleHRlbnNpb25TZXJ2aWNlOiBFeHRlbnNpb25TZXJ2aWNlO1xuICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2U7XG4gIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIG9uR3JpZFN0YXRlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEdyaWRTdGF0ZUNoYW5nZT4oKTtcblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEV4cG9ydCBTZXJ2aWNlXG4gICAqIEBwYXJhbSBncmlkXG4gICAqIEBwYXJhbSBmaWx0ZXJTZXJ2aWNlXG4gICAqIEBwYXJhbSBzb3J0U2VydmljZVxuICAgKiBAcGFyYW0gZGF0YVZpZXdcbiAgICovXG4gIGluaXQoZ3JpZDogYW55LCBleHRlbnNpb25TZXJ2aWNlOiBFeHRlbnNpb25TZXJ2aWNlLCBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLCBzb3J0U2VydmljZTogU29ydFNlcnZpY2UpOiB2b2lkIHtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UgPSBleHRlbnNpb25TZXJ2aWNlO1xuICAgIHRoaXMuZmlsdGVyU2VydmljZSA9IGZpbHRlclNlcnZpY2U7XG4gICAgdGhpcy5zb3J0U2VydmljZSA9IHNvcnRTZXJ2aWNlO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVUb0FsbEdyaWRDaGFuZ2VzKGdyaWQpO1xuICB9XG5cbiAgLyoqIERpc3Bvc2Ugb2YgYWxsIHRoZSBTbGlja0dyaWQgJiBBbmd1bGFyIHN1YnNjcmlwdGlvbnMgKi9cbiAgZGlzcG9zZSgpIHtcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xuXG4gICAgLy8gYWxzbyB1bnN1YnNjcmliZSBhbGwgQW5ndWxhciBTdWJzY3JpcHRpb25zXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XG4gICAgICBpZiAoc3Vic2NyaXB0aW9uICYmIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkge1xuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgZ3JpZCBzdGF0ZSAoZmlsdGVycy9zb3J0ZXJzL3BhZ2luYXRpb24pXG4gICAqIEByZXR1cm4gZ3JpZCBzdGF0ZVxuICAgKi9cbiAgZ2V0Q3VycmVudEdyaWRTdGF0ZSgpOiBHcmlkU3RhdGUge1xuICAgIGNvbnN0IGdyaWRTdGF0ZTogR3JpZFN0YXRlID0ge1xuICAgICAgY29sdW1uczogdGhpcy5nZXRDdXJyZW50Q29sdW1ucygpLFxuICAgICAgZmlsdGVyczogdGhpcy5nZXRDdXJyZW50RmlsdGVycygpLFxuICAgICAgc29ydGVyczogdGhpcy5nZXRDdXJyZW50U29ydGVycygpXG4gICAgfTtcblxuICAgIGNvbnN0IGN1cnJlbnRQYWdpbmF0aW9uID0gdGhpcy5nZXRDdXJyZW50UGFnaW5hdGlvbigpO1xuICAgIGlmIChjdXJyZW50UGFnaW5hdGlvbikge1xuICAgICAgZ3JpZFN0YXRlLnBhZ2luYXRpb24gPSBjdXJyZW50UGFnaW5hdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIENvbHVtbnMgKGFuZCB0aGVpciBzdGF0ZTogdmlzaWJpbGl0eS9wb3NpdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcbiAgICogQHJldHVybiBjdXJyZW50IGNvbHVtbnNcbiAgICovXG4gIGdldENvbHVtbnMoKTogQ29sdW1uW10ge1xuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zIHx8IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gYW4gYXJyYXkgb2YgR3JpZCBDb2x1bW4gRGVmaW5pdGlvbnMsIGdldCB0aGUgYXNzb2NpYXRlZCBDdXJyZW50IENvbHVtbnNcbiAgICogQHBhcmFtIGdyaWRDb2x1bW5zXG4gICAqL1xuICBnZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoZ3JpZENvbHVtbnM6IENvbHVtbltdKTogQ3VycmVudENvbHVtbltdIHtcbiAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XG5cbiAgICBpZiAoZ3JpZENvbHVtbnMgJiYgQXJyYXkuaXNBcnJheShncmlkQ29sdW1ucykpIHtcbiAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goKGNvbHVtbjogQ29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLmlkKSB7XG4gICAgICAgICAgY3VycmVudENvbHVtbnMucHVzaCh7XG4gICAgICAgICAgICBjb2x1bW5JZDogY29sdW1uLmlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgIGNzc0NsYXNzOiBjb2x1bW4uY3NzQ2xhc3MgfHwgJycsXG4gICAgICAgICAgICBoZWFkZXJDc3NDbGFzczogY29sdW1uLmhlYWRlckNzc0NsYXNzIHx8ICcnLFxuICAgICAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aCB8fCAwXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50Q29sdW1ucyA9IGN1cnJlbnRDb2x1bW5zO1xuICAgIHJldHVybiBjdXJyZW50Q29sdW1ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIGFuIGFycmF5IG9mIEN1cnJlbnQgQ29sdW1ucywgZ2V0IHRoZSBhc3NvY2lhdGVkIEdyaWQgQ29sdW1uIERlZmluaXRpb25zXG4gICAqIEBwYXJhbSBncmlkXG4gICAqIEBwYXJhbSBjdXJyZW50Q29sdW1uc1xuICAgKi9cbiAgZ2V0QXNzb2NpYXRlZEdyaWRDb2x1bW5zKGdyaWQ6IGFueSwgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSk6IENvbHVtbltdIHtcbiAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IFtdO1xuICAgIGNvbnN0IGdyaWRDb2x1bW5zOiBDb2x1bW5bXSA9IGdyaWQuZ2V0Q29sdW1ucygpO1xuXG4gICAgaWYgKGN1cnJlbnRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoY3VycmVudENvbHVtbnMpKSB7XG4gICAgICBjdXJyZW50Q29sdW1ucy5mb3JFYWNoKChjdXJyZW50Q29sdW1uOiBDdXJyZW50Q29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGdyaWRDb2x1bW46IENvbHVtbiA9IGdyaWRDb2x1bW5zLmZpbmQoKGM6IENvbHVtbikgPT4gYy5pZCA9PT0gY3VycmVudENvbHVtbi5jb2x1bW5JZCk7XG4gICAgICAgIGlmIChncmlkQ29sdW1uICYmIGdyaWRDb2x1bW4uaWQpIHtcbiAgICAgICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICAgICAgLi4uZ3JpZENvbHVtbixcbiAgICAgICAgICAgIGNzc0NsYXNzOiBjdXJyZW50Q29sdW1uLmNzc0NsYXNzLFxuICAgICAgICAgICAgaGVhZGVyQ3NzQ2xhc3M6IGN1cnJlbnRDb2x1bW4uaGVhZGVyQ3NzQ2xhc3MsXG4gICAgICAgICAgICB3aWR0aDogY3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fY29sdW1ucyA9IGNvbHVtbnM7XG4gICAgcmV0dXJuIGNvbHVtbnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBDb2x1bW5zIChhbmQgdGhlaXIgc3RhdGU6IHZpc2liaWxpdHkvcG9zaXRpb24pIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXG4gICAqIEByZXR1cm4gY3VycmVudCBjb2x1bW5zXG4gICAqL1xuICBnZXRDdXJyZW50Q29sdW1ucygpOiBDdXJyZW50Q29sdW1uW10ge1xuICAgIGxldCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkodGhpcy5fY3VycmVudENvbHVtbnMpICYmIHRoaXMuX2N1cnJlbnRDb2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIGN1cnJlbnRDb2x1bW5zID0gdGhpcy5fY3VycmVudENvbHVtbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRDb2x1bW5zID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnModGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50Q29sdW1ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIEZpbHRlcnMgKGFuZCB0aGVpciBzdGF0ZSwgY29sdW1uSWQsIHNlYXJjaFRlcm0ocykpIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXG4gICAqIEByZXR1cm4gY3VycmVudCBmaWx0ZXJzXG4gICAqL1xuICBnZXRDdXJyZW50RmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10gfCBudWxsIHtcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycykge1xuICAgICAgICByZXR1cm4gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMoKSBhcyBDdXJyZW50RmlsdGVyW107XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlclNlcnZpY2UuZ2V0Q3VycmVudExvY2FsRmlsdGVycygpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCBQYWdpbmF0aW9uIChhbmQgaXQncyBzdGF0ZSwgcGFnZU51bWJlciwgcGFnZVNpemUpIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXG4gICAqIEByZXR1cm4gY3VycmVudCBwYWdpbmF0aW9uIHN0YXRlXG4gICAqL1xuICBnZXRDdXJyZW50UGFnaW5hdGlvbigpOiBDdXJyZW50UGFnaW5hdGlvbiB8IG51bGwge1xuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRQYWdpbmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50UGFnaW5hdGlvbigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPIGltcGxlbWVudCB0aGlzIHdoZW5ldmVyIGxvY2FsIHBhZ2luYXRpb24gZ2V0cyBpbXBsZW1lbnRlZFxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgU29ydGVycyAoYW5kIHRoZWlyIHN0YXRlLCBjb2x1bW5JZCwgZGlyZWN0aW9uKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxuICAgKiBAcmV0dXJuIGN1cnJlbnQgc29ydGVyc1xuICAgKi9cbiAgZ2V0Q3VycmVudFNvcnRlcnMoKTogQ3VycmVudFNvcnRlcltdIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKCkgYXMgQ3VycmVudFNvcnRlcltdO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0U2VydmljZSAmJiB0aGlzLnNvcnRTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvcnRTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogSG9vayBhIFNsaWNrR3JpZCBFeHRlbnNpb24gRXZlbnQgdG8gYSBHcmlkIFN0YXRlIGNoYW5nZSBldmVudFxuICAgKiBAcGFyYW0gZXh0ZW5zaW9uIG5hbWVcbiAgICogQHBhcmFtIGdyaWRcbiAgICovXG4gIGhvb2tFeHRlbnNpb25FdmVudFRvR3JpZFN0YXRlQ2hhbmdlKGV4dGVuc2lvbk5hbWU6IEV4dGVuc2lvbk5hbWUsIGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5leHRlbnNpb25TZXJ2aWNlICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUoZXh0ZW5zaW9uTmFtZSk7XG5cbiAgICBpZiAoZXh0ZW5zaW9uICYmIGV4dGVuc2lvbi5jbGFzcyAmJiBleHRlbnNpb24uY2xhc3NbZXZlbnROYW1lXSAmJiBleHRlbnNpb24uY2xhc3NbZXZlbnROYW1lXS5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZXh0ZW5zaW9uLmNsYXNzW2V2ZW50TmFtZV0sIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gYXJncyAmJiBhcmdzLmNvbHVtbnM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhjb2x1bW5zKTtcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGEgR3JpZCBFdmVudCB0byBhIEdyaWQgU3RhdGUgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSBldmVudCBuYW1lXG4gICAqIEBwYXJhbSBncmlkXG4gICAqL1xuICBob29rU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZShldmVudE5hbWU6IHN0cmluZywgZ3JpZDogYW55KSB7XG4gICAgaWYgKGdyaWQgJiYgZ3JpZFtldmVudE5hbWVdICYmIGdyaWRbZXZlbnROYW1lXS5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZFtldmVudE5hbWVdLCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IGdyaWQuZ2V0Q29sdW1ucygpO1xuICAgICAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoY29sdW1ucyk7XG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50Q29sdW1ucywgdHlwZTogR3JpZFN0YXRlVHlwZS5jb2x1bW5zIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXNldENvbHVtbnMoY29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xuICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gY29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5fY29sdW1ucztcbiAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoY29sdW1ucyk7XG4gICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgfVxuXG4gIC8qKiBpZiB3ZSB1c2UgUm93IFNlbGVjdGlvbiBvciB0aGUgQ2hlY2tib3ggU2VsZWN0b3IsIHdlIG5lZWQgdG8gcmVzZXQgYW55IHNlbGVjdGlvbiAqL1xuICByZXNldFJvd1NlbGVjdGlvbigpIHtcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcbiAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcbiAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZSAmJiB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0RXh0ZW5zaW9uQnlOYW1lICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xuICAgICAgaWYgKHJvd1NlbGVjdGlvbkV4dGVuc2lvbiAmJiByb3dTZWxlY3Rpb25FeHRlbnNpb24uZXh0ZW5zaW9uKSB7XG4gICAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIGFsbCBuZWNlc3NhcnkgU2xpY2tHcmlkIG9yIFNlcnZpY2UgRXZlbnRzIHRoYXQgZGVhbHMgd2l0aCBhIEdyaWQgY2hhbmdlLFxuICAgKiB3aGVuIHRyaWdnZXJlZCwgd2Ugd2lsbCBwdWJsaXNoIGEgR3JpZCBTdGF0ZSBFdmVudCB3aXRoIGN1cnJlbnQgR3JpZCBTdGF0ZVxuICAgKi9cbiAgc3Vic2NyaWJlVG9BbGxHcmlkQ2hhbmdlcyhncmlkOiBhbnkpIHtcbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBGaWx0ZXIgY2hhbmdlZFxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10pID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFJvd1NlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudEZpbHRlcnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuZmlsdGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XG4gICAgICB9KVxuICAgICk7XG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgRmlsdGVyIGNsZWFyZWRcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgICB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDbGVhcmVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldFJvd1NlbGVjdGlvbigpO1xuICAgICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBbXSwgdHlwZTogR3JpZFN0YXRlVHlwZS5maWx0ZXIgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBTb3J0IGNoYW5nZWRcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Tb3J0Q2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10pID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFJvd1NlbGVjdGlvbigpO1xuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudFNvcnRlcnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuc29ydGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBTb3J0IGNsZWFyZWRcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Tb3J0Q2xlYXJlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBbXSwgdHlwZTogR3JpZFN0YXRlVHlwZS5zb3J0ZXIgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIFN1YnNjcmliZSB0byBDb2x1bW5QaWNrZXIgYW5kL29yIEdyaWRNZW51IGZvciBzaG93L2hpZGUgQ29sdW1ucyB2aXNpYmlsaXR5IGNoYW5nZXNcbiAgICB0aGlzLmhvb2tFeHRlbnNpb25FdmVudFRvR3JpZFN0YXRlQ2hhbmdlKEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCAnb25Db2x1bW5zQ2hhbmdlZCcpO1xuICAgIHRoaXMuaG9va0V4dGVuc2lvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoRXh0ZW5zaW9uTmFtZS5ncmlkTWVudSwgJ29uQ29sdW1uc0NoYW5nZWQnKTtcblxuICAgIC8vIHN1YnNjcmliZSB0byBDb2x1bW4gUmVzaXplICYgUmVvcmRlcmluZ1xuICAgIHRoaXMuaG9va1NsaWNrR3JpZEV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoJ29uQ29sdW1uc1Jlb3JkZXJlZCcsIGdyaWQpO1xuICAgIHRoaXMuaG9va1NsaWNrR3JpZEV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoJ29uQ29sdW1uc1Jlc2l6ZWQnLCBncmlkKTtcbiAgfVxufVxuIl19