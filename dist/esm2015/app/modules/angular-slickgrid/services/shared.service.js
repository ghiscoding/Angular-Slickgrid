/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SharedService {
    // --
    // public
    /**
     * Getter for All Columns  in the grid (hidden/visible)
     * @return {?}
     */
    get allColumns() {
        return this._allColumns;
    }
    /**
     * Setter for All Columns  in the grid (hidden/visible)
     * @param {?} allColumns
     * @return {?}
     */
    set allColumns(allColumns) {
        this._allColumns = allColumns;
    }
    /**
     * Getter for the Column Definitions pulled through the Grid Object
     * @return {?}
     */
    get columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * Getter for SlickGrid DataView object
     * @return {?}
     */
    get dataView() {
        return this._dataView;
    }
    /**
     * Setter for SlickGrid DataView object
     * @param {?} dataView
     * @return {?}
     */
    set dataView(dataView) {
        this._dataView = dataView;
    }
    /**
     * Getter for SlickGrid Grid object
     * @return {?}
     */
    get grid() {
        return this._grid;
    }
    /**
     * Setter for SlickGrid Grid object
     * @param {?} grid
     * @return {?}
     */
    set grid(grid) {
        this._grid = grid;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @return {?}
     */
    get gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Setter for the Grid Options pulled through the Grid Object
     * @param {?} gridOptions
     * @return {?}
     */
    set gridOptions(gridOptions) {
        this.gridOptions = gridOptions;
    }
    /**
     * Getter for the Grid Options
     * @return {?}
     */
    get groupItemMetadataProvider() {
        return this._groupItemMetadataProvider;
    }
    /**
     * Setter for the Grid Options
     * @param {?} groupItemMetadataProvider
     * @return {?}
     */
    set groupItemMetadataProvider(groupItemMetadataProvider) {
        this._groupItemMetadataProvider = groupItemMetadataProvider;
    }
    /**
     * Getter for the Visible Columns in the grid
     * @return {?}
     */
    get visibleColumns() {
        return this._visibleColumns;
    }
    /**
     * Setter for the Visible Columns in the grid
     * @param {?} visibleColumns
     * @return {?}
     */
    set visibleColumns(visibleColumns) {
        this._visibleColumns = visibleColumns;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype._allColumns;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype._groupItemMetadataProvider;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype._visibleColumns;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQVd4QixJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxVQUFVLENBQUMsVUFBb0I7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFHRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQzs7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsUUFBYTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDOzs7OztJQUdELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFFRCxJQUFJLElBQUksQ0FBQyxJQUFTO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBR0QsSUFBSSxXQUFXO1FBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7Ozs7OztJQUdELElBQUksV0FBVyxDQUFDLFdBQXVCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBR0QsSUFBSSx5QkFBeUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBRUQsSUFBSSx5QkFBeUIsQ0FBQyx5QkFBOEI7UUFDMUQsSUFBSSxDQUFDLDBCQUEwQixHQUFHLHlCQUF5QixDQUFDO0lBQzlELENBQUM7Ozs7O0lBR0QsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFFRCxJQUFJLGNBQWMsQ0FBQyxjQUF3QjtRQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7Ozs7OztJQXBFQyxvQ0FBOEI7Ozs7O0lBQzlCLGtDQUF1Qjs7Ozs7SUFDdkIsbURBQXdDOzs7OztJQUN4Qyw4QkFBbUI7Ozs7O0lBQ25CLHdDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgR3JpZE9wdGlvbiB9IGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfYWxsQ29sdW1uczogQ29sdW1uW107XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX3Zpc2libGVDb2x1bW5zOiBDb2x1bW5bXTtcclxuXHJcbiAgLy8gLS1cclxuICAvLyBwdWJsaWNcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgQWxsIENvbHVtbnMgIGluIHRoZSBncmlkIChoaWRkZW4vdmlzaWJsZSkgKi9cclxuICBnZXQgYWxsQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWxsQ29sdW1ucztcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgQWxsIENvbHVtbnMgIGluIHRoZSBncmlkIChoaWRkZW4vdmlzaWJsZSkgKi9cclxuICBzZXQgYWxsQ29sdW1ucyhhbGxDb2x1bW5zOiBDb2x1bW5bXSkge1xyXG4gICAgdGhpcy5fYWxsQ29sdW1ucyA9IGFsbENvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciBTbGlja0dyaWQgRGF0YVZpZXcgb2JqZWN0ICovXHJcbiAgZ2V0IGRhdGFWaWV3KCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVZpZXc7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3QgKi9cclxuICBzZXQgZGF0YVZpZXcoZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIFNsaWNrR3JpZCBHcmlkIG9iamVjdCAqL1xyXG4gIGdldCBncmlkKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZDtcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgU2xpY2tHcmlkIEdyaWQgb2JqZWN0ICovXHJcbiAgc2V0IGdyaWQoZ3JpZDogYW55KSB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIFNldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBzZXQgZ3JpZE9wdGlvbnMoZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSBncmlkT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgKi9cclxuICBnZXQgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgKi9cclxuICBzZXQgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcihncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIFZpc2libGUgQ29sdW1ucyBpbiB0aGUgZ3JpZCAqL1xyXG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZUNvbHVtbnM7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBWaXNpYmxlIENvbHVtbnMgaW4gdGhlIGdyaWQgKi9cclxuICBzZXQgdmlzaWJsZUNvbHVtbnModmlzaWJsZUNvbHVtbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl92aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zO1xyXG4gIH1cclxufVxyXG4iXX0=