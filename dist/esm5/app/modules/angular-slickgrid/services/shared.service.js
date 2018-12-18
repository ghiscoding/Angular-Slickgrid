/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SharedService = /** @class */ (function () {
    function SharedService() {
    }
    Object.defineProperty(SharedService.prototype, "allColumns", {
        // --
        // public
        /** Getter for All Columns  in the grid (hidden/visible) */
        get: 
        // --
        // public
        /**
         * Getter for All Columns  in the grid (hidden/visible)
         * @return {?}
         */
        function () {
            return this._allColumns;
        },
        /** Setter for All Columns  in the grid (hidden/visible) */
        set: /**
         * Setter for All Columns  in the grid (hidden/visible)
         * @param {?} allColumns
         * @return {?}
         */
        function (allColumns) {
            this._allColumns = allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: /**
         * Getter for the Column Definitions pulled through the Grid Object
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "dataView", {
        /** Getter for SlickGrid DataView object */
        get: /**
         * Getter for SlickGrid DataView object
         * @return {?}
         */
        function () {
            return this._dataView;
        },
        /** Setter for SlickGrid DataView object */
        set: /**
         * Setter for SlickGrid DataView object
         * @param {?} dataView
         * @return {?}
         */
        function (dataView) {
            this._dataView = dataView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "grid", {
        /** Getter for SlickGrid Grid object */
        get: /**
         * Getter for SlickGrid Grid object
         * @return {?}
         */
        function () {
            return this._grid;
        },
        /** Setter for SlickGrid Grid object */
        set: /**
         * Setter for SlickGrid Grid object
         * @param {?} grid
         * @return {?}
         */
        function (grid) {
            this._grid = grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        /** Setter for the Grid Options pulled through the Grid Object */
        set: /**
         * Setter for the Grid Options pulled through the Grid Object
         * @param {?} gridOptions
         * @return {?}
         */
        function (gridOptions) {
            this.gridOptions = gridOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "groupItemMetadataProvider", {
        /** Getter for the Grid Options */
        get: /**
         * Getter for the Grid Options
         * @return {?}
         */
        function () {
            return this._groupItemMetadataProvider;
        },
        /** Setter for the Grid Options */
        set: /**
         * Setter for the Grid Options
         * @param {?} groupItemMetadataProvider
         * @return {?}
         */
        function (groupItemMetadataProvider) {
            this._groupItemMetadataProvider = groupItemMetadataProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "visibleColumns", {
        /** Getter for the Visible Columns in the grid */
        get: /**
         * Getter for the Visible Columns in the grid
         * @return {?}
         */
        function () {
            return this._visibleColumns;
        },
        /** Setter for the Visible Columns in the grid */
        set: /**
         * Setter for the Visible Columns in the grid
         * @param {?} visibleColumns
         * @return {?}
         */
        function (visibleColumns) {
            this._visibleColumns = visibleColumns;
        },
        enumerable: true,
        configurable: true
    });
    return SharedService;
}());
export { SharedService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQUFBO0lBcUVBLENBQUM7SUExREMsc0JBQUkscUNBQVU7UUFKZCxLQUFLO1FBQ0wsU0FBUztRQUVULDJEQUEyRDs7Ozs7Ozs7UUFDM0Q7WUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIsQ0FBQztRQUNELDJEQUEyRDs7Ozs7O1FBQzNELFVBQWUsVUFBb0I7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDaEMsQ0FBQzs7O09BSkE7SUFPRCxzQkFBSSw0Q0FBaUI7UUFEckIsdUVBQXVFOzs7OztRQUN2RTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG1DQUFRO1FBRFosMkNBQTJDOzs7OztRQUMzQztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsMkNBQTJDOzs7Ozs7UUFDM0MsVUFBYSxRQUFhO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzVCLENBQUM7OztPQUpBO0lBT0Qsc0JBQUksK0JBQUk7UUFEUix1Q0FBdUM7Ozs7O1FBQ3ZDO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7UUFDRCx1Q0FBdUM7Ozs7OztRQUN2QyxVQUFTLElBQVM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQzs7O09BSkE7SUFPRCxzQkFBSSxzQ0FBVztRQURmLGlFQUFpRTs7Ozs7UUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQztRQUVELGlFQUFpRTs7Ozs7O1FBQ2pFLFVBQWdCLFdBQXVCO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLENBQUM7OztPQUxBO0lBUUQsc0JBQUksb0RBQXlCO1FBRDdCLGtDQUFrQzs7Ozs7UUFDbEM7WUFDRSxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQztRQUN6QyxDQUFDO1FBQ0Qsa0NBQWtDOzs7Ozs7UUFDbEMsVUFBOEIseUJBQThCO1lBQzFELElBQUksQ0FBQywwQkFBMEIsR0FBRyx5QkFBeUIsQ0FBQztRQUM5RCxDQUFDOzs7T0FKQTtJQU9ELHNCQUFJLHlDQUFjO1FBRGxCLGlEQUFpRDs7Ozs7UUFDakQ7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQztRQUNELGlEQUFpRDs7Ozs7O1FBQ2pELFVBQW1CLGNBQXdCO1lBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBQ3hDLENBQUM7OztPQUpBO0lBS0gsb0JBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDOzs7Ozs7O0lBcEVDLG9DQUE4Qjs7Ozs7SUFDOUIsa0NBQXVCOzs7OztJQUN2QixtREFBd0M7Ozs7O0lBQ3hDLDhCQUFtQjs7Ozs7SUFDbkIsd0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9hbGxDb2x1bW5zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfdmlzaWJsZUNvbHVtbnM6IENvbHVtbltdO1xyXG5cclxuICAvLyAtLVxyXG4gIC8vIHB1YmxpY1xyXG5cclxuICAvKiogR2V0dGVyIGZvciBBbGwgQ29sdW1ucyAgaW4gdGhlIGdyaWQgKGhpZGRlbi92aXNpYmxlKSAqL1xyXG4gIGdldCBhbGxDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxDb2x1bW5zO1xyXG4gIH1cclxuICAvKiogU2V0dGVyIGZvciBBbGwgQ29sdW1ucyAgaW4gdGhlIGdyaWQgKGhpZGRlbi92aXNpYmxlKSAqL1xyXG4gIHNldCBhbGxDb2x1bW5zKGFsbENvbHVtbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl9hbGxDb2x1bW5zID0gYWxsQ29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3QgKi9cclxuICBnZXQgZGF0YVZpZXcoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhVmlldztcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgU2xpY2tHcmlkIERhdGFWaWV3IG9iamVjdCAqL1xyXG4gIHNldCBkYXRhVmlldyhkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgU2xpY2tHcmlkIEdyaWQgb2JqZWN0ICovXHJcbiAgZ2V0IGdyaWQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkO1xyXG4gIH1cclxuICAvKiogU2V0dGVyIGZvciBTbGlja0dyaWQgR3JpZCBvYmplY3QgKi9cclxuICBzZXQgZ3JpZChncmlkOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogU2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHNldCBncmlkT3B0aW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IGdyaWRPcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyAqL1xyXG4gIGdldCBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjtcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyAqL1xyXG4gIHNldCBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyKGdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI6IGFueSkge1xyXG4gICAgdGhpcy5fZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IGdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgVmlzaWJsZSBDb2x1bW5zIGluIHRoZSBncmlkICovXHJcbiAgZ2V0IHZpc2libGVDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl92aXNpYmxlQ29sdW1ucztcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgdGhlIFZpc2libGUgQ29sdW1ucyBpbiB0aGUgZ3JpZCAqL1xyXG4gIHNldCB2aXNpYmxlQ29sdW1ucyh2aXNpYmxlQ29sdW1uczogQ29sdW1uW10pIHtcclxuICAgIHRoaXMuX3Zpc2libGVDb2x1bW5zID0gdmlzaWJsZUNvbHVtbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==