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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZFN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBTUwsYUFBYSxFQUliLGFBQWEsR0FDZCxNQUFNLG1CQUFtQixDQUFDO0FBSTNCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBTTdDLE1BQU0sT0FBTyxnQkFBZ0I7SUFBN0I7UUFDVSxrQkFBYSxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBS3RDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUMzQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztJQTRRdEQsQ0FBQzs7Ozs7O0lBelFDLElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQzs7Ozs7Ozs7O0lBU0QsSUFBSSxDQUFDLElBQVMsRUFBRSxnQkFBa0MsRUFBRSxhQUE0QixFQUFFLFdBQXdCO1FBQ3hHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUUvQixJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFD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LENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsbUNBQW1DLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXJGLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjs7Ozs7O0lBcFJDLHlDQUFpRDs7Ozs7SUFDakQsb0NBQWdDOzs7OztJQUNoQywyQ0FBOEM7Ozs7O0lBQzlDLGlDQUFtQjs7Ozs7SUFDbkIsNENBQTJDOzs7OztJQUMzQyx5Q0FBcUM7Ozs7O0lBQ3JDLHVDQUFpQzs7Ozs7SUFDakMseUNBQTJDOztJQUMzQyw4Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb2x1bW4sXG4gIEN1cnJlbnRDb2x1bW4sXG4gIEN1cnJlbnRGaWx0ZXIsXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxuICBDdXJyZW50U29ydGVyLFxuICBFeHRlbnNpb25OYW1lLFxuICBHcmlkT3B0aW9uLFxuICBHcmlkU3RhdGUsXG4gIEdyaWRTdGF0ZUNoYW5nZSxcbiAgR3JpZFN0YXRlVHlwZSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgRXh0ZW5zaW9uU2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4vZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ydFNlcnZpY2UgfSBmcm9tICcuL3NvcnQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuZXhwb3J0IGNsYXNzIEdyaWRTdGF0ZVNlcnZpY2Uge1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XG4gIHByaXZhdGUgX2NvbHVtbnM6IENvbHVtbltdID0gW107XG4gIHByaXZhdGUgX2N1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBwcml2YXRlIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2U7XG4gIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZTtcbiAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcbiAgb25HcmlkU3RhdGVDaGFuZ2VkID0gbmV3IFN1YmplY3Q8R3JpZFN0YXRlQ2hhbmdlPigpO1xuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRXhwb3J0IFNlcnZpY2VcbiAgICogQHBhcmFtIGdyaWRcbiAgICogQHBhcmFtIGZpbHRlclNlcnZpY2VcbiAgICogQHBhcmFtIHNvcnRTZXJ2aWNlXG4gICAqIEBwYXJhbSBkYXRhVmlld1xuICAgKi9cbiAgaW5pdChncmlkOiBhbnksIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2UsIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSk6IHZvaWQge1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZSA9IGV4dGVuc2lvblNlcnZpY2U7XG4gICAgdGhpcy5maWx0ZXJTZXJ2aWNlID0gZmlsdGVyU2VydmljZTtcbiAgICB0aGlzLnNvcnRTZXJ2aWNlID0gc29ydFNlcnZpY2U7XG5cbiAgICB0aGlzLnN1YnNjcmliZVRvQWxsR3JpZENoYW5nZXMoZ3JpZCk7XG4gIH1cblxuICAvKiogRGlzcG9zZSBvZiBhbGwgdGhlIFNsaWNrR3JpZCAmIEFuZ3VsYXIgc3Vic2NyaXB0aW9ucyAqL1xuICBkaXNwb3NlKCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XG5cbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBBbmd1bGFyIFN1YnNjcmlwdGlvbnNcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcbiAgICAgIGlmIChzdWJzY3JpcHRpb24gJiYgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBncmlkIHN0YXRlIChmaWx0ZXJzL3NvcnRlcnMvcGFnaW5hdGlvbilcbiAgICogQHJldHVybiBncmlkIHN0YXRlXG4gICAqL1xuICBnZXRDdXJyZW50R3JpZFN0YXRlKCk6IEdyaWRTdGF0ZSB7XG4gICAgY29uc3QgZ3JpZFN0YXRlOiBHcmlkU3RhdGUgPSB7XG4gICAgICBjb2x1bW5zOiB0aGlzLmdldEN1cnJlbnRDb2x1bW5zKCksXG4gICAgICBmaWx0ZXJzOiB0aGlzLmdldEN1cnJlbnRGaWx0ZXJzKCksXG4gICAgICBzb3J0ZXJzOiB0aGlzLmdldEN1cnJlbnRTb3J0ZXJzKClcbiAgICB9O1xuXG4gICAgY29uc3QgY3VycmVudFBhZ2luYXRpb24gPSB0aGlzLmdldEN1cnJlbnRQYWdpbmF0aW9uKCk7XG4gICAgaWYgKGN1cnJlbnRQYWdpbmF0aW9uKSB7XG4gICAgICBncmlkU3RhdGUucGFnaW5hdGlvbiA9IGN1cnJlbnRQYWdpbmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gZ3JpZFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQ29sdW1ucyAoYW5kIHRoZWlyIHN0YXRlOiB2aXNpYmlsaXR5L3Bvc2l0aW9uKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxuICAgKiBAcmV0dXJuIGN1cnJlbnQgY29sdW1uc1xuICAgKi9cbiAgZ2V0Q29sdW1ucygpOiBDb2x1bW5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnMgfHwgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSBhbiBhcnJheSBvZiBHcmlkIENvbHVtbiBEZWZpbml0aW9ucywgZ2V0IHRoZSBhc3NvY2lhdGVkIEN1cnJlbnQgQ29sdW1uc1xuICAgKiBAcGFyYW0gZ3JpZENvbHVtbnNcbiAgICovXG4gIGdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhncmlkQ29sdW1uczogQ29sdW1uW10pOiBDdXJyZW50Q29sdW1uW10ge1xuICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcblxuICAgIGlmIChncmlkQ29sdW1ucyAmJiBBcnJheS5pc0FycmF5KGdyaWRDb2x1bW5zKSkge1xuICAgICAgZ3JpZENvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBDb2x1bW4sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4uaWQpIHtcbiAgICAgICAgICBjdXJyZW50Q29sdW1ucy5wdXNoKHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW4uaWQgYXMgc3RyaW5nLFxuICAgICAgICAgICAgY3NzQ2xhc3M6IGNvbHVtbi5jc3NDbGFzcyB8fCAnJyxcbiAgICAgICAgICAgIGhlYWRlckNzc0NsYXNzOiBjb2x1bW4uaGVhZGVyQ3NzQ2xhc3MgfHwgJycsXG4gICAgICAgICAgICB3aWR0aDogY29sdW1uLndpZHRoIHx8IDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRDb2x1bW5zID0gY3VycmVudENvbHVtbnM7XG4gICAgcmV0dXJuIGN1cnJlbnRDb2x1bW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyb20gYW4gYXJyYXkgb2YgQ3VycmVudCBDb2x1bW5zLCBnZXQgdGhlIGFzc29jaWF0ZWQgR3JpZCBDb2x1bW4gRGVmaW5pdGlvbnNcbiAgICogQHBhcmFtIGdyaWRcbiAgICogQHBhcmFtIGN1cnJlbnRDb2x1bW5zXG4gICAqL1xuICBnZXRBc3NvY2lhdGVkR3JpZENvbHVtbnMoZ3JpZDogYW55LCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdKTogQ29sdW1uW10ge1xuICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gW107XG4gICAgY29uc3QgZ3JpZENvbHVtbnM6IENvbHVtbltdID0gZ3JpZC5nZXRDb2x1bW5zKCk7XG5cbiAgICBpZiAoY3VycmVudENvbHVtbnMgJiYgQXJyYXkuaXNBcnJheShjdXJyZW50Q29sdW1ucykpIHtcbiAgICAgIGN1cnJlbnRDb2x1bW5zLmZvckVhY2goKGN1cnJlbnRDb2x1bW46IEN1cnJlbnRDb2x1bW4sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgZ3JpZENvbHVtbjogQ29sdW1uID0gZ3JpZENvbHVtbnMuZmluZCgoYzogQ29sdW1uKSA9PiBjLmlkID09PSBjdXJyZW50Q29sdW1uLmNvbHVtbklkKTtcbiAgICAgICAgaWYgKGdyaWRDb2x1bW4gJiYgZ3JpZENvbHVtbi5pZCkge1xuICAgICAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgICAuLi5ncmlkQ29sdW1uLFxuICAgICAgICAgICAgY3NzQ2xhc3M6IGN1cnJlbnRDb2x1bW4uY3NzQ2xhc3MsXG4gICAgICAgICAgICBoZWFkZXJDc3NDbGFzczogY3VycmVudENvbHVtbi5oZWFkZXJDc3NDbGFzcyxcbiAgICAgICAgICAgIHdpZHRoOiBjdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcbiAgICByZXR1cm4gY29sdW1ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIENvbHVtbnMgKGFuZCB0aGVpciBzdGF0ZTogdmlzaWJpbGl0eS9wb3NpdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcbiAgICogQHJldHVybiBjdXJyZW50IGNvbHVtbnNcbiAgICovXG4gIGdldEN1cnJlbnRDb2x1bW5zKCk6IEN1cnJlbnRDb2x1bW5bXSB7XG4gICAgbGV0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcbiAgICBpZiAodGhpcy5fY3VycmVudENvbHVtbnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jdXJyZW50Q29sdW1ucykgJiYgdGhpcy5fY3VycmVudENvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgY3VycmVudENvbHVtbnMgPSB0aGlzLl9jdXJyZW50Q29sdW1ucztcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudENvbHVtbnMgPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyh0aGlzLl9ncmlkLmdldENvbHVtbnMoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRDb2x1bW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgRmlsdGVycyAoYW5kIHRoZWlyIHN0YXRlLCBjb2x1bW5JZCwgc2VhcmNoVGVybShzKSkgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcbiAgICogQHJldHVybiBjdXJyZW50IGZpbHRlcnNcbiAgICovXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IEN1cnJlbnRGaWx0ZXJbXSB8IG51bGwge1xuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRGaWx0ZXJzKSB7XG4gICAgICAgIHJldHVybiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycygpIGFzIEN1cnJlbnRGaWx0ZXJbXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLmZpbHRlclNlcnZpY2UuZ2V0Q3VycmVudExvY2FsRmlsdGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyU2VydmljZS5nZXRDdXJyZW50TG9jYWxGaWx0ZXJzKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IFBhZ2luYXRpb24gKGFuZCBpdCdzIHN0YXRlLCBwYWdlTnVtYmVyLCBwYWdlU2l6ZSkgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcbiAgICogQHJldHVybiBjdXJyZW50IHBhZ2luYXRpb24gc3RhdGVcbiAgICovXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFBhZ2luYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRQYWdpbmF0aW9uKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8gaW1wbGVtZW50IHRoaXMgd2hlbmV2ZXIgbG9jYWwgcGFnaW5hdGlvbiBnZXRzIGltcGxlbWVudGVkXG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBTb3J0ZXJzIChhbmQgdGhlaXIgc3RhdGUsIGNvbHVtbklkLCBkaXJlY3Rpb24pIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXG4gICAqIEByZXR1cm4gY3VycmVudCBzb3J0ZXJzXG4gICAqL1xuICBnZXRDdXJyZW50U29ydGVycygpOiBDdXJyZW50U29ydGVyW10gfCBudWxsIHtcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycykge1xuICAgICAgICByZXR1cm4gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMoKSBhcyBDdXJyZW50U29ydGVyW107XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuZ2V0Q3VycmVudExvY2FsU29ydGVycykge1xuICAgICAgcmV0dXJuIHRoaXMuc29ydFNlcnZpY2UuZ2V0Q3VycmVudExvY2FsU29ydGVycygpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGEgU2xpY2tHcmlkIEV4dGVuc2lvbiBFdmVudCB0byBhIEdyaWQgU3RhdGUgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSBleHRlbnNpb24gbmFtZVxuICAgKiBAcGFyYW0gZ3JpZFxuICAgKi9cbiAgaG9va0V4dGVuc2lvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoZXh0ZW5zaW9uTmFtZTogRXh0ZW5zaW9uTmFtZSwgZXZlbnROYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLmV4dGVuc2lvblNlcnZpY2UgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZShleHRlbnNpb25OYW1lKTtcblxuICAgIGlmIChleHRlbnNpb24gJiYgZXh0ZW5zaW9uLmNsYXNzICYmIGV4dGVuc2lvbi5jbGFzc1tldmVudE5hbWVdICYmIGV4dGVuc2lvbi5jbGFzc1tldmVudE5hbWVdLnN1YnNjcmliZSkge1xuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShleHRlbnNpb24uY2xhc3NbZXZlbnROYW1lXSwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBhcmdzICYmIGFyZ3MuY29sdW1ucztcbiAgICAgICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGNvbHVtbnMpO1xuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudENvbHVtbnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuY29sdW1ucyB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgYSBHcmlkIEV2ZW50IHRvIGEgR3JpZCBTdGF0ZSBjaGFuZ2UgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIGdyaWRcbiAgICovXG4gIGhvb2tTbGlja0dyaWRFdmVudFRvR3JpZFN0YXRlQ2hhbmdlKGV2ZW50TmFtZTogc3RyaW5nLCBncmlkOiBhbnkpIHtcbiAgICBpZiAoZ3JpZCAmJiBncmlkW2V2ZW50TmFtZV0gJiYgZ3JpZFtldmVudE5hbWVdLnN1YnNjcmliZSkge1xuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkW2V2ZW50TmFtZV0sIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gZ3JpZC5nZXRDb2x1bW5zKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhjb2x1bW5zKTtcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0Q29sdW1ucyhjb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XG4gICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBjb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLl9jb2x1bW5zO1xuICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhjb2x1bW5zKTtcbiAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudENvbHVtbnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuY29sdW1ucyB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xuICB9XG5cbiAgLyoqIGlmIHdlIHVzZSBSb3cgU2VsZWN0aW9uIG9yIHRoZSBDaGVja2JveCBTZWxlY3Rvciwgd2UgbmVlZCB0byByZXNldCBhbnkgc2VsZWN0aW9uICovXG4gIHJlc2V0Um93U2VsZWN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24gfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xuICAgICAgLy8gdGhpcyBhbHNvIHJlcXVpcmVzIHRoZSBSb3cgU2VsZWN0aW9uIE1vZGVsIHRvIGJlIHJlZ2lzdGVyZWQgYXMgd2VsbFxuICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5leHRlbnNpb25TZXJ2aWNlICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XG4gICAgICBpZiAocm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHJvd1NlbGVjdGlvbkV4dGVuc2lvbi5leHRlbnNpb24pIHtcbiAgICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoW10pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gYWxsIG5lY2Vzc2FyeSBTbGlja0dyaWQgb3IgU2VydmljZSBFdmVudHMgdGhhdCBkZWFscyB3aXRoIGEgR3JpZCBjaGFuZ2UsXG4gICAqIHdoZW4gdHJpZ2dlcmVkLCB3ZSB3aWxsIHB1Ymxpc2ggYSBHcmlkIFN0YXRlIEV2ZW50IHdpdGggY3VycmVudCBHcmlkIFN0YXRlXG4gICAqL1xuICBzdWJzY3JpYmVUb0FsbEdyaWRDaGFuZ2VzKGdyaWQ6IGFueSkge1xuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIEZpbHRlciBjaGFuZ2VkXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50RmlsdGVycywgdHlwZTogR3JpZFN0YXRlVHlwZS5maWx0ZXIgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBGaWx0ZXIgY2xlYXJlZFxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNsZWFyZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XG4gICAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IFtdLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmZpbHRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIFNvcnQgY2hhbmdlZFxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zb3J0U2VydmljZS5vblNvcnRDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50U29ydGVycywgdHlwZTogR3JpZFN0YXRlVHlwZS5zb3J0ZXIgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIFNvcnQgY2xlYXJlZFxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgdGhpcy5zb3J0U2VydmljZS5vblNvcnRDbGVhcmVkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IFtdLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnNvcnRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gU3Vic2NyaWJlIHRvIENvbHVtblBpY2tlciBhbmQvb3IgR3JpZE1lbnUgZm9yIHNob3cvaGlkZSBDb2x1bW5zIHZpc2liaWxpdHkgY2hhbmdlc1xuICAgIHRoaXMuaG9va0V4dGVuc2lvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoRXh0ZW5zaW9uTmFtZS5jb2x1bW5QaWNrZXIsICdvbkNvbHVtbnNDaGFuZ2VkJyk7XG4gICAgdGhpcy5ob29rRXh0ZW5zaW9uRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZShFeHRlbnNpb25OYW1lLmdyaWRNZW51LCAnb25Db2x1bW5zQ2hhbmdlZCcpO1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIENvbHVtbiBSZXNpemUgJiBSZW9yZGVyaW5nXG4gICAgdGhpcy5ob29rU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZSgnb25Db2x1bW5zUmVvcmRlcmVkJywgZ3JpZCk7XG4gICAgdGhpcy5ob29rU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZSgnb25Db2x1bW5zUmVzaXplZCcsIGdyaWQpO1xuICB9XG59XG4iXX0=