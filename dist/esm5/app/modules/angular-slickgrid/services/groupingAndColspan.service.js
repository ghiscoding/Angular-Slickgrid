/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GroupingAndColspanService = /** @class */ (function () {
    function GroupingAndColspanService() {
        this._eventHandler = new Slick.EventHandler();
    }
    Object.defineProperty(GroupingAndColspanService.prototype, "_gridOptions", {
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
    Object.defineProperty(GroupingAndColspanService.prototype, "_columnDefinitions", {
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
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    GroupingAndColspanService.prototype.init = /**
     * @param {?} grid
     * @param {?} dataView
     * @return {?}
     */
    function (grid, dataView) {
        var _this = this;
        this._grid = grid;
        this._dataView = dataView;
        if (grid && this._gridOptions) {
            // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
            // for all these occasions, we have to trigger a re-create
            if (this._gridOptions.createPreHeaderPanel) {
                this._eventHandler.subscribe(grid.onSort, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(grid.onColumnsResized, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
                // probably some kind of timing issues and delaying it until the grid is fully ready does help
                setTimeout(function () {
                    _this.createPreHeaderRowGroupingTitle();
                }, 50);
            }
        }
    };
    /**
     * @return {?}
     */
    GroupingAndColspanService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    };
    /**
     * @return {?}
     */
    GroupingAndColspanService.prototype.createPreHeaderRowGroupingTitle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var $preHeaderPanel = $(this._grid.getPreHeaderPanel())
            .empty()
            .addClass('slick-header-columns')
            .css('left', '-1000px')
            .width(this._grid.getHeadersWidth());
        $preHeaderPanel.parent().addClass('slick-header');
        /** @type {?} */
        var headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
        /** @type {?} */
        var m;
        /** @type {?} */
        var header;
        /** @type {?} */
        var lastColumnGroup = '';
        /** @type {?} */
        var widthTotal = 0;
        for (var i = 0; i < this._columnDefinitions.length; i++) {
            m = this._columnDefinitions[i];
            if (lastColumnGroup === m.columnGroup && i > 0) {
                widthTotal += m.width;
                header.width(widthTotal - headerColumnWidthDiff);
            }
            else {
                widthTotal = m.width;
                header = $("<div class=\"ui-state-default slick-header-column\" />")
                    .html("<span class=\"slick-column-name\">" + (m.columnGroup || '') + "</span>")
                    .width(m.width - headerColumnWidthDiff)
                    .appendTo($preHeaderPanel);
            }
            lastColumnGroup = m.columnGroup;
        }
    };
    return GroupingAndColspanService;
}());
export { GroupingAndColspanService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GroupingAndColspanService.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    GroupingAndColspanService.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    GroupingAndColspanService.prototype._grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBpbmdBbmRDb2xzcGFuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyb3VwaW5nQW5kQ29sc3Bhbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFZQTtJQUFBO1FBQ1Usa0JBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQTBFbkQsQ0FBQztJQXJFQyxzQkFBWSxtREFBWTtRQUR4QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLHlEQUFrQjtRQUQ5Qix1RUFBdUU7Ozs7OztRQUN2RTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTs7Ozs7O0lBRUQsd0NBQUk7Ozs7O0lBQUosVUFBSyxJQUFTLEVBQUUsUUFBYTtRQUE3QixpQkF5QkM7UUF4QkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFFMUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM3QiwyR0FBMkc7WUFDM0csMERBQTBEO1lBQzFELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLENBQVEsRUFBRSxJQUFTO29CQUM1RCxLQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQUMsQ0FBUSxFQUFFLElBQVM7b0JBQ3RFLEtBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxDQUFRLEVBQUUsSUFBUztvQkFDM0UsS0FBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUVILDBHQUEwRztnQkFDMUcsOEZBQThGO2dCQUM5RixVQUFVLENBQUM7b0JBQ1QsS0FBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ3pDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNSO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsMkNBQU87OztJQUFQO1FBQ0UsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELG1FQUErQjs7O0lBQS9COztZQUNRLGVBQWUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ3RELEtBQUssRUFBRTthQUNQLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoQyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQzthQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztZQUM1QyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFOztZQUMvRCxDQUFDOztZQUNELE1BQU07O1lBQ04sZUFBZSxHQUFHLEVBQUU7O1lBQ3BCLFVBQVUsR0FBRyxDQUFDO1FBRWxCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZELENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxlQUFlLEtBQUssQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDckIsTUFBTSxHQUFHLENBQUMsQ0FBQyx3REFBc0QsQ0FBQztxQkFDL0QsSUFBSSxDQUFDLHdDQUFtQyxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsYUFBUyxDQUFDO3FCQUNyRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztxQkFDdEMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsZUFBZSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBM0VELElBMkVDOzs7Ozs7O0lBMUVDLGtEQUFpRDs7Ozs7SUFDakQsOENBQXVCOzs7OztJQUN2QiwwQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgR3JpZE9wdGlvblxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSBsZXQgJDogYW55O1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIEdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKSA/IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIDogW107XHJcbiAgfVxyXG5cclxuICBpbml0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG5cclxuICAgIGlmIChncmlkICYmIHRoaXMuX2dyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIFdoZW4gZGVhbGluZyB3aXRoIFByZS1IZWFkZXIgR3JvdXBpbmcgY29sc3Bhbiwgd2UgbmVlZCB0byByZS1jcmVhdGUgdGhlIHByZS1oZWFkZXIgaW4gbXVsdGlwbGUgb2NjYXNpb25zXHJcbiAgICAgIC8vIGZvciBhbGwgdGhlc2Ugb2NjYXNpb25zLCB3ZSBoYXZlIHRvIHRyaWdnZXIgYSByZS1jcmVhdGVcclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLmNyZWF0ZVByZUhlYWRlclBhbmVsKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uU29ydCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkNvbHVtbnNSZXNpemVkLCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcmVIZWFkZXJSb3dHcm91cGluZ1RpdGxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlldy5vblJvd0NvdW50Q2hhbmdlZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBhbHNvIG5vdCBzdXJlIHdoeSBhdCB0aGlzIHBvaW50LCBidXQgaXQgc2VlbXMgdGhhdCBJIG5lZWQgdG8gY2FsbCB0aGUgMXN0IGNyZWF0ZSBpbiBhIGRlbGF5ZWQgZXhlY3V0aW9uXHJcbiAgICAgICAgLy8gcHJvYmFibHkgc29tZSBraW5kIG9mIHRpbWluZyBpc3N1ZXMgYW5kIGRlbGF5aW5nIGl0IHVudGlsIHRoZSBncmlkIGlzIGZ1bGx5IHJlYWR5IGRvZXMgaGVscFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jcmVhdGVQcmVIZWFkZXJSb3dHcm91cGluZ1RpdGxlKCk7XHJcbiAgICAgICAgfSwgNTApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpIHtcclxuICAgIGNvbnN0ICRwcmVIZWFkZXJQYW5lbCA9ICQodGhpcy5fZ3JpZC5nZXRQcmVIZWFkZXJQYW5lbCgpKVxyXG4gICAgICAuZW1wdHkoKVxyXG4gICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWhlYWRlci1jb2x1bW5zJylcclxuICAgICAgLmNzcygnbGVmdCcsICctMTAwMHB4JylcclxuICAgICAgLndpZHRoKHRoaXMuX2dyaWQuZ2V0SGVhZGVyc1dpZHRoKCkpO1xyXG4gICAgJHByZUhlYWRlclBhbmVsLnBhcmVudCgpLmFkZENsYXNzKCdzbGljay1oZWFkZXInKTtcclxuICAgIGNvbnN0IGhlYWRlckNvbHVtbldpZHRoRGlmZiA9IHRoaXMuX2dyaWQuZ2V0SGVhZGVyQ29sdW1uV2lkdGhEaWZmKCk7XHJcbiAgICBsZXQgbTtcclxuICAgIGxldCBoZWFkZXI7XHJcbiAgICBsZXQgbGFzdENvbHVtbkdyb3VwID0gJyc7XHJcbiAgICBsZXQgd2lkdGhUb3RhbCA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbaV07XHJcbiAgICAgIGlmIChsYXN0Q29sdW1uR3JvdXAgPT09IG0uY29sdW1uR3JvdXAgJiYgaSA+IDApIHtcclxuICAgICAgICB3aWR0aFRvdGFsICs9IG0ud2lkdGg7XHJcbiAgICAgICAgaGVhZGVyLndpZHRoKHdpZHRoVG90YWwgLSBoZWFkZXJDb2x1bW5XaWR0aERpZmYpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpZHRoVG90YWwgPSBtLndpZHRoO1xyXG4gICAgICAgIGhlYWRlciA9ICQoYDxkaXYgY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHNsaWNrLWhlYWRlci1jb2x1bW5cIiAvPmApXHJcbiAgICAgICAgICAuaHRtbChgPHNwYW4gY2xhc3M9XCJzbGljay1jb2x1bW4tbmFtZVwiPiR7bS5jb2x1bW5Hcm91cCB8fCAnJ308L3NwYW4+YClcclxuICAgICAgICAgIC53aWR0aChtLndpZHRoIC0gaGVhZGVyQ29sdW1uV2lkdGhEaWZmKVxyXG4gICAgICAgICAgLmFwcGVuZFRvKCRwcmVIZWFkZXJQYW5lbCk7XHJcbiAgICAgIH1cclxuICAgICAgbGFzdENvbHVtbkdyb3VwID0gbS5jb2x1bW5Hcm91cDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19