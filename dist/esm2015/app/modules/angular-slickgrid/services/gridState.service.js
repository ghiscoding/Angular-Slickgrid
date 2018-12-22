/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ExtensionName, GridStateType, } from './../models/index';
import { Subject } from 'rxjs';
export class GridStateService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
        this._columns = [];
        this._currentColumns = [];
        this.subscriptions = [];
        this.onGridStateChanged = new Subject();
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
     * Initialize the Export Service
     * @param {?} grid
     * @param {?} extensionService
     * @param {?} filterService
     * @param {?} sortService
     * @return {?}
     */
    init(grid, extensionService, filterService, sortService) {
        this._grid = grid;
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.subscribeToAllGridChanges(grid);
    }
    /**
     * Dispose of all the SlickGrid & Angular subscriptions
     * @return {?}
     */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // also unsubscribe all Angular Subscriptions
        this.subscriptions.forEach((subscription) => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
    }
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return {?} grid state
     */
    getCurrentGridState() {
        /** @type {?} */
        const gridState = {
            columns: this.getCurrentColumns(),
            filters: this.getCurrentFilters(),
            sorters: this.getCurrentSorters()
        };
        /** @type {?} */
        const currentPagination = this.getCurrentPagination();
        if (currentPagination) {
            gridState.pagination = currentPagination;
        }
        return gridState;
    }
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    getColumns() {
        return this._columns || this._grid.getColumns();
    }
    /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param {?} gridColumns
     * @return {?}
     */
    getAssociatedCurrentColumns(gridColumns) {
        /** @type {?} */
        const currentColumns = [];
        if (gridColumns && Array.isArray(gridColumns)) {
            gridColumns.forEach((column, index) => {
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
    }
    /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param {?} grid
     * @param {?} currentColumns
     * @return {?}
     */
    getAssociatedGridColumns(grid, currentColumns) {
        /** @type {?} */
        const columns = [];
        /** @type {?} */
        const gridColumns = grid.getColumns();
        if (currentColumns && Array.isArray(currentColumns)) {
            currentColumns.forEach((currentColumn, index) => {
                /** @type {?} */
                const gridColumn = gridColumns.find((c) => c.id === currentColumn.columnId);
                if (gridColumn && gridColumn.id) {
                    columns.push(Object.assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                }
            });
        }
        this._columns = columns;
        return columns;
    }
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return {?} current columns
     */
    getCurrentColumns() {
        /** @type {?} */
        let currentColumns = [];
        if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
            currentColumns = this._currentColumns;
        }
        else {
            currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
        }
        return currentColumns;
    }
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return {?} current filters
     */
    getCurrentFilters() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                return (/** @type {?} */ (backendService.getCurrentFilters()));
            }
        }
        else if (this.filterService && this.filterService.getCurrentLocalFilters) {
            return this.filterService.getCurrentLocalFilters();
        }
        return null;
    }
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return {?} current pagination state
     */
    getCurrentPagination() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentPagination) {
                return backendService.getCurrentPagination();
            }
        }
        else {
            // TODO implement this whenever local pagination gets implemented
        }
        return null;
    }
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return {?} current sorters
     */
    getCurrentSorters() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            /** @type {?} */
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                return (/** @type {?} */ (backendService.getCurrentSorters()));
            }
        }
        else if (this.sortService && this.sortService.getCurrentLocalSorters) {
            return this.sortService.getCurrentLocalSorters();
        }
        return null;
    }
    /**
     * Hook a SlickGrid Extension Event to a Grid State change event
     * @param {?} extensionName
     * @param {?} eventName
     * @return {?}
     */
    hookExtensionEventToGridStateChange(extensionName, eventName) {
        /** @type {?} */
        const extension = this.extensionService && this.extensionService.getExtensionByName(extensionName);
        if (extension && extension.class && extension.class[eventName] && extension.class[eventName].subscribe) {
            this._eventHandler.subscribe(extension.class[eventName], (e, args) => {
                /** @type {?} */
                const columns = args && args.columns;
                /** @type {?} */
                const currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            });
        }
    }
    /**
     * Hook a Grid Event to a Grid State change event
     * @param {?} eventName
     * @param {?} grid
     * @return {?}
     */
    hookSlickGridEventToGridStateChange(eventName, grid) {
        if (grid && grid[eventName] && grid[eventName].subscribe) {
            this._eventHandler.subscribe(grid[eventName], (e, args) => {
                /** @type {?} */
                const columns = grid.getColumns();
                /** @type {?} */
                const currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            });
        }
    }
    /**
     * @param {?=} columnDefinitions
     * @return {?}
     */
    resetColumns(columnDefinitions) {
        /** @type {?} */
        const columns = columnDefinitions || this._columns;
        /** @type {?} */
        const currentColumns = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
    }
    /**
     * if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @return {?}
     */
    resetRowSelection() {
        if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
            // this also requires the Row Selection Model to be registered as well
            /** @type {?} */
            const rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
            if (rowSelectionExtension && rowSelectionExtension.extension) {
                this._grid.setSelectedRows([]);
            }
        }
    }
    /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     * @param {?} grid
     * @return {?}
     */
    subscribeToAllGridChanges(grid) {
        // Subscribe to Event Emitter of Filter changed
        this.subscriptions.push(this.filterService.onFilterChanged.subscribe((currentFilters) => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Filter cleared
        this.subscriptions.push(this.filterService.onFilterCleared.subscribe(() => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort changed
        this.subscriptions.push(this.sortService.onSortChanged.subscribe((currentSorters) => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort cleared
        this.subscriptions.push(this.sortService.onSortCleared.subscribe(() => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
        this.hookExtensionEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
        this.hookExtensionEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');
        // subscribe to Column Resize & Reordering
        this.hookSlickGridEventToGridStateChange('onColumnsReordered', grid);
        this.hookSlickGridEventToGridStateChange('onColumnsResized', grid);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZFN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBTUwsYUFBYSxFQUliLGFBQWEsR0FDZCxNQUFNLG1CQUFtQixDQUFDO0FBSTNCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBTTdDLE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFDVSxrQkFBYSxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBS3RDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUMzQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztJQTRRdEQsQ0FBQzs7Ozs7O0lBelFDLElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQzs7Ozs7Ozs7O0lBU0QsSUFBSSxDQUFDLElBQVMsRUFBRSxnQkFBa0MsRUFBRSxhQUE0QixFQUFFLFdBQXdCO1FBQ3hHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUUvQixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFD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LENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsbUNBQW1DLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXJGLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjs7Ozs7O0lBcFJDLHlDQUFpRDs7Ozs7SUFDakQsb0NBQWdDOzs7OztJQUNoQywyQ0FBOEM7Ozs7O0lBQzlDLGlDQUFtQjs7Ozs7SUFDbkIsNENBQTJDOzs7OztJQUMzQyx5Q0FBcUM7Ozs7O0lBQ3JDLHVDQUFpQzs7Ozs7SUFDakMseUNBQTJDOztJQUMzQyw4Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDdXJyZW50Q29sdW1uLFxyXG4gIEN1cnJlbnRGaWx0ZXIsXHJcbiAgQ3VycmVudFBhZ2luYXRpb24sXHJcbiAgQ3VycmVudFNvcnRlcixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZFN0YXRlLFxyXG4gIEdyaWRTdGF0ZUNoYW5nZSxcclxuICBHcmlkU3RhdGVUeXBlLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uU2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi9zb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyaWRTdGF0ZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9jb2x1bW5zOiBDb2x1bW5bXSA9IFtdO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBleHRlbnNpb25TZXJ2aWNlOiBFeHRlbnNpb25TZXJ2aWNlO1xyXG4gIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZTtcclxuICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgb25HcmlkU3RhdGVDaGFuZ2VkID0gbmV3IFN1YmplY3Q8R3JpZFN0YXRlQ2hhbmdlPigpO1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEV4cG9ydCBTZXJ2aWNlXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKiBAcGFyYW0gZmlsdGVyU2VydmljZVxyXG4gICAqIEBwYXJhbSBzb3J0U2VydmljZVxyXG4gICAqIEBwYXJhbSBkYXRhVmlld1xyXG4gICAqL1xyXG4gIGluaXQoZ3JpZDogYW55LCBleHRlbnNpb25TZXJ2aWNlOiBFeHRlbnNpb25TZXJ2aWNlLCBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLCBzb3J0U2VydmljZTogU29ydFNlcnZpY2UpOiB2b2lkIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlID0gZXh0ZW5zaW9uU2VydmljZTtcclxuICAgIHRoaXMuZmlsdGVyU2VydmljZSA9IGZpbHRlclNlcnZpY2U7XHJcbiAgICB0aGlzLnNvcnRTZXJ2aWNlID0gc29ydFNlcnZpY2U7XHJcblxyXG4gICAgdGhpcy5zdWJzY3JpYmVUb0FsbEdyaWRDaGFuZ2VzKGdyaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIERpc3Bvc2Ugb2YgYWxsIHRoZSBTbGlja0dyaWQgJiBBbmd1bGFyIHN1YnNjcmlwdGlvbnMgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG5cclxuICAgIC8vIGFsc28gdW5zdWJzY3JpYmUgYWxsIEFuZ3VsYXIgU3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgIGlmIChzdWJzY3JpcHRpb24gJiYgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKSB7XHJcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgZ3JpZCBzdGF0ZSAoZmlsdGVycy9zb3J0ZXJzL3BhZ2luYXRpb24pXHJcbiAgICogQHJldHVybiBncmlkIHN0YXRlXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudEdyaWRTdGF0ZSgpOiBHcmlkU3RhdGUge1xyXG4gICAgY29uc3QgZ3JpZFN0YXRlOiBHcmlkU3RhdGUgPSB7XHJcbiAgICAgIGNvbHVtbnM6IHRoaXMuZ2V0Q3VycmVudENvbHVtbnMoKSxcclxuICAgICAgZmlsdGVyczogdGhpcy5nZXRDdXJyZW50RmlsdGVycygpLFxyXG4gICAgICBzb3J0ZXJzOiB0aGlzLmdldEN1cnJlbnRTb3J0ZXJzKClcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY3VycmVudFBhZ2luYXRpb24gPSB0aGlzLmdldEN1cnJlbnRQYWdpbmF0aW9uKCk7XHJcbiAgICBpZiAoY3VycmVudFBhZ2luYXRpb24pIHtcclxuICAgICAgZ3JpZFN0YXRlLnBhZ2luYXRpb24gPSBjdXJyZW50UGFnaW5hdGlvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBncmlkU3RhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIENvbHVtbnMgKGFuZCB0aGVpciBzdGF0ZTogdmlzaWJpbGl0eS9wb3NpdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgY29sdW1uc1xyXG4gICAqL1xyXG4gIGdldENvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnMgfHwgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIGFuIGFycmF5IG9mIEdyaWQgQ29sdW1uIERlZmluaXRpb25zLCBnZXQgdGhlIGFzc29jaWF0ZWQgQ3VycmVudCBDb2x1bW5zXHJcbiAgICogQHBhcmFtIGdyaWRDb2x1bW5zXHJcbiAgICovXHJcbiAgZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGdyaWRDb2x1bW5zOiBDb2x1bW5bXSk6IEN1cnJlbnRDb2x1bW5bXSB7XHJcbiAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XHJcblxyXG4gICAgaWYgKGdyaWRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoZ3JpZENvbHVtbnMpKSB7XHJcbiAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goKGNvbHVtbjogQ29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4uaWQpIHtcclxuICAgICAgICAgIGN1cnJlbnRDb2x1bW5zLnB1c2goe1xyXG4gICAgICAgICAgICBjb2x1bW5JZDogY29sdW1uLmlkIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IGNvbHVtbi5jc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgaGVhZGVyQ3NzQ2xhc3M6IGNvbHVtbi5oZWFkZXJDc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aCB8fCAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY3VycmVudENvbHVtbnMgPSBjdXJyZW50Q29sdW1ucztcclxuICAgIHJldHVybiBjdXJyZW50Q29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYW4gYXJyYXkgb2YgQ3VycmVudCBDb2x1bW5zLCBnZXQgdGhlIGFzc29jaWF0ZWQgR3JpZCBDb2x1bW4gRGVmaW5pdGlvbnNcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqIEBwYXJhbSBjdXJyZW50Q29sdW1uc1xyXG4gICAqL1xyXG4gIGdldEFzc29jaWF0ZWRHcmlkQ29sdW1ucyhncmlkOiBhbnksIGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10pOiBDb2x1bW5bXSB7XHJcbiAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IFtdO1xyXG4gICAgY29uc3QgZ3JpZENvbHVtbnM6IENvbHVtbltdID0gZ3JpZC5nZXRDb2x1bW5zKCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoY3VycmVudENvbHVtbnMpKSB7XHJcbiAgICAgIGN1cnJlbnRDb2x1bW5zLmZvckVhY2goKGN1cnJlbnRDb2x1bW46IEN1cnJlbnRDb2x1bW4sIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBncmlkQ29sdW1uOiBDb2x1bW4gPSBncmlkQ29sdW1ucy5maW5kKChjOiBDb2x1bW4pID0+IGMuaWQgPT09IGN1cnJlbnRDb2x1bW4uY29sdW1uSWQpO1xyXG4gICAgICAgIGlmIChncmlkQ29sdW1uICYmIGdyaWRDb2x1bW4uaWQpIHtcclxuICAgICAgICAgIGNvbHVtbnMucHVzaCh7XHJcbiAgICAgICAgICAgIC4uLmdyaWRDb2x1bW4sXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBjdXJyZW50Q29sdW1uLmNzc0NsYXNzLFxyXG4gICAgICAgICAgICBoZWFkZXJDc3NDbGFzczogY3VycmVudENvbHVtbi5oZWFkZXJDc3NDbGFzcyxcclxuICAgICAgICAgICAgd2lkdGg6IGN1cnJlbnRDb2x1bW4ud2lkdGhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcclxuICAgIHJldHVybiBjb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDb2x1bW5zIChhbmQgdGhlaXIgc3RhdGU6IHZpc2liaWxpdHkvcG9zaXRpb24pIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IGNvbHVtbnNcclxuICAgKi9cclxuICBnZXRDdXJyZW50Q29sdW1ucygpOiBDdXJyZW50Q29sdW1uW10ge1xyXG4gICAgbGV0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcclxuICAgIGlmICh0aGlzLl9jdXJyZW50Q29sdW1ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2N1cnJlbnRDb2x1bW5zKSAmJiB0aGlzLl9jdXJyZW50Q29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGN1cnJlbnRDb2x1bW5zID0gdGhpcy5fY3VycmVudENvbHVtbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjdXJyZW50Q29sdW1ucyA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudENvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIEZpbHRlcnMgKGFuZCB0aGVpciBzdGF0ZSwgY29sdW1uSWQsIHNlYXJjaFRlcm0ocykpIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IGZpbHRlcnNcclxuICAgKi9cclxuICBnZXRDdXJyZW50RmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10gfCBudWxsIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycykge1xyXG4gICAgICAgIHJldHVybiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycygpIGFzIEN1cnJlbnRGaWx0ZXJbXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyU2VydmljZS5nZXRDdXJyZW50TG9jYWxGaWx0ZXJzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjdXJyZW50IFBhZ2luYXRpb24gKGFuZCBpdCdzIHN0YXRlLCBwYWdlTnVtYmVyLCBwYWdlU2l6ZSkgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgcGFnaW5hdGlvbiBzdGF0ZVxyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xyXG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFBhZ2luYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFBhZ2luYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVE9ETyBpbXBsZW1lbnQgdGhpcyB3aGVuZXZlciBsb2NhbCBwYWdpbmF0aW9uIGdldHMgaW1wbGVtZW50ZWRcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IFNvcnRlcnMgKGFuZCB0aGVpciBzdGF0ZSwgY29sdW1uSWQsIGRpcmVjdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgc29ydGVyc1xyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcclxuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKCkgYXMgQ3VycmVudFNvcnRlcltdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc29ydFNlcnZpY2UgJiYgdGhpcy5zb3J0U2VydmljZS5nZXRDdXJyZW50TG9jYWxTb3J0ZXJzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNvcnRTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSG9vayBhIFNsaWNrR3JpZCBFeHRlbnNpb24gRXZlbnQgdG8gYSBHcmlkIFN0YXRlIGNoYW5nZSBldmVudFxyXG4gICAqIEBwYXJhbSBleHRlbnNpb24gbmFtZVxyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICovXHJcbiAgaG9va0V4dGVuc2lvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoZXh0ZW5zaW9uTmFtZTogRXh0ZW5zaW9uTmFtZSwgZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZSAmJiB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0RXh0ZW5zaW9uQnlOYW1lKGV4dGVuc2lvbk5hbWUpO1xyXG5cclxuICAgIGlmIChleHRlbnNpb24gJiYgZXh0ZW5zaW9uLmNsYXNzICYmIGV4dGVuc2lvbi5jbGFzc1tldmVudE5hbWVdICYmIGV4dGVuc2lvbi5jbGFzc1tldmVudE5hbWVdLnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGV4dGVuc2lvbi5jbGFzc1tldmVudE5hbWVdLCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gYXJncyAmJiBhcmdzLmNvbHVtbnM7XHJcbiAgICAgICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50Q29sdW1ucywgdHlwZTogR3JpZFN0YXRlVHlwZS5jb2x1bW5zIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSG9vayBhIEdyaWQgRXZlbnQgdG8gYSBHcmlkIFN0YXRlIGNoYW5nZSBldmVudFxyXG4gICAqIEBwYXJhbSBldmVudCBuYW1lXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKi9cclxuICBob29rU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZShldmVudE5hbWU6IHN0cmluZywgZ3JpZDogYW55KSB7XHJcbiAgICBpZiAoZ3JpZCAmJiBncmlkW2V2ZW50TmFtZV0gJiYgZ3JpZFtldmVudE5hbWVdLnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWRbZXZlbnROYW1lXSwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IGdyaWQuZ2V0Q29sdW1ucygpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhjb2x1bW5zKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudENvbHVtbnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuY29sdW1ucyB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0Q29sdW1ucyhjb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XHJcbiAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IGNvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuX2NvbHVtbnM7XHJcbiAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoY29sdW1ucyk7XHJcbiAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudENvbHVtbnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuY29sdW1ucyB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIGlmIHdlIHVzZSBSb3cgU2VsZWN0aW9uIG9yIHRoZSBDaGVja2JveCBTZWxlY3Rvciwgd2UgbmVlZCB0byByZXNldCBhbnkgc2VsZWN0aW9uICovXHJcbiAgcmVzZXRSb3dTZWxlY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcclxuICAgICAgLy8gdGhpcyBhbHNvIHJlcXVpcmVzIHRoZSBSb3cgU2VsZWN0aW9uIE1vZGVsIHRvIGJlIHJlZ2lzdGVyZWQgYXMgd2VsbFxyXG4gICAgICBjb25zdCByb3dTZWxlY3Rpb25FeHRlbnNpb24gPSB0aGlzLmV4dGVuc2lvblNlcnZpY2UgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZSAmJiB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgaWYgKHJvd1NlbGVjdGlvbkV4dGVuc2lvbiAmJiByb3dTZWxlY3Rpb25FeHRlbnNpb24uZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoW10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gYWxsIG5lY2Vzc2FyeSBTbGlja0dyaWQgb3IgU2VydmljZSBFdmVudHMgdGhhdCBkZWFscyB3aXRoIGEgR3JpZCBjaGFuZ2UsXHJcbiAgICogd2hlbiB0cmlnZ2VyZWQsIHdlIHdpbGwgcHVibGlzaCBhIEdyaWQgU3RhdGUgRXZlbnQgd2l0aCBjdXJyZW50IEdyaWQgU3RhdGVcclxuICAgKi9cclxuICBzdWJzY3JpYmVUb0FsbEdyaWRDaGFuZ2VzKGdyaWQ6IGFueSkge1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgRmlsdGVyIGNoYW5nZWRcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudEZpbHRlcnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuZmlsdGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgRmlsdGVyIGNsZWFyZWRcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2xlYXJlZC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXNldFJvd1NlbGVjdGlvbigpO1xyXG4gICAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IFtdLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmZpbHRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcblxyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgU29ydCBjaGFuZ2VkXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5zb3J0U2VydmljZS5vblNvcnRDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudFNvcnRlcnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuc29ydGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIFNvcnQgY2xlYXJlZFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Tb3J0Q2xlYXJlZC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogW10sIHR5cGU6IEdyaWRTdGF0ZVR5cGUuc29ydGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBDb2x1bW5QaWNrZXIgYW5kL29yIEdyaWRNZW51IGZvciBzaG93L2hpZGUgQ29sdW1ucyB2aXNpYmlsaXR5IGNoYW5nZXNcclxuICAgIHRoaXMuaG9va0V4dGVuc2lvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoRXh0ZW5zaW9uTmFtZS5jb2x1bW5QaWNrZXIsICdvbkNvbHVtbnNDaGFuZ2VkJyk7XHJcbiAgICB0aGlzLmhvb2tFeHRlbnNpb25FdmVudFRvR3JpZFN0YXRlQ2hhbmdlKEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnUsICdvbkNvbHVtbnNDaGFuZ2VkJyk7XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIENvbHVtbiBSZXNpemUgJiBSZW9yZGVyaW5nXHJcbiAgICB0aGlzLmhvb2tTbGlja0dyaWRFdmVudFRvR3JpZFN0YXRlQ2hhbmdlKCdvbkNvbHVtbnNSZW9yZGVyZWQnLCBncmlkKTtcclxuICAgIHRoaXMuaG9va1NsaWNrR3JpZEV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoJ29uQ29sdW1uc1Jlc2l6ZWQnLCBncmlkKTtcclxuICB9XHJcbn1cclxuIl19