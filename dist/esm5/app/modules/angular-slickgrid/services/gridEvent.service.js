/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GridEventService = /** @class */ (function () {
    function GridEventService() {
        this._eventHandler = new Slick.EventHandler();
    }
    /* OnCellChange Event */
    /* OnCellChange Event */
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    GridEventService.prototype.attachOnCellChange = /* OnCellChange Event */
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        this._eventHandler.subscribe(grid.onCellChange, function (e, args) {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            /** @type {?} */
            var column = grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                /** @type {?} */
                var returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    gridDefinition: grid.getOptions(),
                    grid: grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(e, returnedArgs);
            }
        });
    };
    /* OnClick Event */
    /* OnClick Event */
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    GridEventService.prototype.attachOnClick = /* OnClick Event */
    /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        this._eventHandler.subscribe(grid.onClick, function (e, args) {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            /** @type {?} */
            var column = grid.getColumns()[args.cell];
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                /** @type {?} */
                var returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    gridDefinition: grid.getOptions(),
                    grid: grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellClick.... function
                column.onCellClick(e, returnedArgs);
            }
        });
    };
    /**
     * @return {?}
     */
    GridEventService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this._eventHandler.unsubscribeAll();
    };
    return GridEventService;
}());
export { GridEventService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridEventService.prototype._eventHandler;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZEV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRFdmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFLQTtJQUFBO1FBQ1Usa0JBQWEsR0FBUSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQTJEeEQsQ0FBQztJQXpEQyx3QkFBd0I7Ozs7Ozs7SUFDeEIsNkNBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsSUFBUyxFQUFFLFFBQWE7UUFDekMsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxDQUFRLEVBQUUsSUFBYztZQUN2RSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzVGLE9BQU87YUFDUjs7Z0JBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTNDLDBGQUEwRjtZQUMxRixJQUFJLE9BQU8sTUFBTSxDQUFDLFlBQVksS0FBSyxVQUFVLEVBQUU7OztvQkFFdkMsWUFBWSxHQUFnQjtvQkFDaEMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixRQUFRLFVBQUE7b0JBQ1IsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2pDLElBQUksTUFBQTtvQkFDSixTQUFTLEVBQUUsTUFBTTtvQkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDeEM7Z0JBRUQsOERBQThEO2dCQUM5RCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELG1CQUFtQjs7Ozs7OztJQUNuQix3Q0FBYTs7Ozs7O0lBQWIsVUFBYyxJQUFTLEVBQUUsUUFBYTtRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBUSxFQUFFLElBQWM7WUFDbEUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM1RixPQUFPO2FBQ1I7O2dCQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUUzQyx5RkFBeUY7WUFDekYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFOzs7b0JBRXRDLFlBQVksR0FBZ0I7b0JBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsUUFBUSxVQUFBO29CQUNSLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNqQyxJQUFJLE1BQUE7b0JBQ0osU0FBUyxFQUFFLE1BQU07b0JBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ3hDO2dCQUVELDREQUE0RDtnQkFDNUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxrQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUE1REQsSUE0REM7Ozs7Ozs7SUEzREMseUNBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25FdmVudEFyZ3MsIENlbGxBcmdzLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyaWRFdmVudFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG5cclxuICAvKiBPbkNlbGxDaGFuZ2UgRXZlbnQgKi9cclxuICBhdHRhY2hPbkNlbGxDaGFuZ2UoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gdGhpcyBTbGlja2dyaWQgZXZlbnQgb2Ygb25DZWxsQ2hhbmdlXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWQub25DZWxsQ2hhbmdlLCAoZTogRXZlbnQsIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgIGlmICghZSB8fCAhYXJncyB8fCAhZ3JpZCB8fCBhcmdzLmNlbGwgPT09IHVuZGVmaW5lZCB8fCAhZ3JpZC5nZXRDb2x1bW5zIHx8ICFncmlkLmdldERhdGFJdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGdyaWQuZ2V0Q29sdW1ucygpW2FyZ3MuY2VsbF07XHJcblxyXG4gICAgICAvLyBpZiB0aGUgY29sdW1uIGRlZmluaXRpb24gaGFzIGEgb25DZWxsQ2hhbmdlIHByb3BlcnR5IChhIGNhbGxiYWNrIGZ1bmN0aW9uKSwgdGhlbiBydW4gaXRcclxuICAgICAgaWYgKHR5cGVvZiBjb2x1bW4ub25DZWxsQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gYWRkIHRvIHRoZSBvdXRwdXQgZ3JpZE9wdGlvbnMgJiBkYXRhVmlldyBzaW5jZSB3ZSdsbCBuZWVkIHRoZW0gaW5zaWRlIHRoZSBBSkFYIGNvbHVtbi5vbkNlbGxDaGFuZ2VcclxuICAgICAgICBjb25zdCByZXR1cm5lZEFyZ3M6IE9uRXZlbnRBcmdzID0ge1xyXG4gICAgICAgICAgcm93OiBhcmdzLnJvdyxcclxuICAgICAgICAgIGNlbGw6IGFyZ3MuY2VsbCxcclxuICAgICAgICAgIGRhdGFWaWV3LFxyXG4gICAgICAgICAgZ3JpZERlZmluaXRpb246IGdyaWQuZ2V0T3B0aW9ucygpLFxyXG4gICAgICAgICAgZ3JpZCxcclxuICAgICAgICAgIGNvbHVtbkRlZjogY29sdW1uLFxyXG4gICAgICAgICAgZGF0YUNvbnRleHQ6IGdyaWQuZ2V0RGF0YUl0ZW0oYXJncy5yb3cpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZmluYWxseSBjYWxsIHVwIHRoZSBTbGljay5jb2x1bW4ub25DZWxsQ2hhbmdlcy4uLi4gZnVuY3Rpb25cclxuICAgICAgICBjb2x1bW4ub25DZWxsQ2hhbmdlKGUsIHJldHVybmVkQXJncyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAvKiBPbkNsaWNrIEV2ZW50ICovXHJcbiAgYXR0YWNoT25DbGljayhncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkNsaWNrLCAoZTogRXZlbnQsIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgIGlmICghZSB8fCAhYXJncyB8fCAhZ3JpZCB8fCBhcmdzLmNlbGwgPT09IHVuZGVmaW5lZCB8fCAhZ3JpZC5nZXRDb2x1bW5zIHx8ICFncmlkLmdldERhdGFJdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGdyaWQuZ2V0Q29sdW1ucygpW2FyZ3MuY2VsbF07XHJcblxyXG4gICAgICAvLyBpZiB0aGUgY29sdW1uIGRlZmluaXRpb24gaGFzIGEgb25DZWxsQ2xpY2sgcHJvcGVydHkgKGEgY2FsbGJhY2sgZnVuY3Rpb24pLCB0aGVuIHJ1biBpdFxyXG4gICAgICBpZiAodHlwZW9mIGNvbHVtbi5vbkNlbGxDbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIGFkZCB0byB0aGUgb3V0cHV0IGdyaWRPcHRpb25zICYgZGF0YVZpZXcgc2luY2Ugd2UnbGwgbmVlZCB0aGVtIGluc2lkZSB0aGUgQUpBWCBjb2x1bW4ub25DbGlja1xyXG4gICAgICAgIGNvbnN0IHJldHVybmVkQXJnczogT25FdmVudEFyZ3MgPSB7XHJcbiAgICAgICAgICByb3c6IGFyZ3Mucm93LFxyXG4gICAgICAgICAgY2VsbDogYXJncy5jZWxsLFxyXG4gICAgICAgICAgZGF0YVZpZXcsXHJcbiAgICAgICAgICBncmlkRGVmaW5pdGlvbjogZ3JpZC5nZXRPcHRpb25zKCksXHJcbiAgICAgICAgICBncmlkLFxyXG4gICAgICAgICAgY29sdW1uRGVmOiBjb2x1bW4sXHJcbiAgICAgICAgICBkYXRhQ29udGV4dDogZ3JpZC5nZXREYXRhSXRlbShhcmdzLnJvdylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBmaW5hbGx5IGNhbGwgdXAgdGhlIFNsaWNrLmNvbHVtbi5vbkNlbGxDbGljay4uLi4gZnVuY3Rpb25cclxuICAgICAgICBjb2x1bW4ub25DZWxsQ2xpY2soZSwgcmV0dXJuZWRBcmdzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==