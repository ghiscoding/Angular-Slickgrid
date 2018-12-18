/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';
// global constants, height/width are in pixels
/** @type {?} */
var DATAGRID_MIN_HEIGHT = 180;
/** @type {?} */
var DATAGRID_MIN_WIDTH = 300;
/** @type {?} */
var DATAGRID_BOTTOM_PADDING = 20;
/** @type {?} */
var DATAGRID_PAGINATION_HEIGHT = 35;
/**
 * @record
 */
export function GridDimension() { }
if (false) {
    /** @type {?} */
    GridDimension.prototype.height;
    /** @type {?} */
    GridDimension.prototype.width;
    /** @type {?|undefined} */
    GridDimension.prototype.heightWithPagination;
}
var ResizerService = /** @class */ (function () {
    function ResizerService() {
        this.onGridBeforeResize = new Subject();
    }
    Object.defineProperty(ResizerService.prototype, "_gridOptions", {
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
    Object.defineProperty(ResizerService.prototype, "_gridUid", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions.gridId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    ResizerService.prototype.init = /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    function (grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    };
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.attachAutoResizeDataGrid = /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    function (newSizes) {
        var _this = this;
        // if we can't find the grid to resize, return without attaching anything
        /** @type {?} */
        var gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on("resize.grid." + this._gridUid, function () {
            _this.onGridBeforeResize.next(true);
            _this.resizeGrid(0, newSizes);
        });
    };
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.calculateGridNewDimensions = /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        /** @type {?} */
        var gridDomElm = $("#" + gridOptions.gridId);
        /** @type {?} */
        var autoResizeOptions = gridOptions && gridOptions.autoResize;
        /** @type {?} */
        var containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $("#" + autoResizeOptions.containerId) : $("#" + gridOptions.gridContainerId);
        /** @type {?} */
        var windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        /** @type {?} */
        var bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        /** @type {?} */
        var gridHeight = windowElm.height() || 0;
        /** @type {?} */
        var coordOffsetTop = gridDomElm.offset();
        /** @type {?} */
        var gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        /** @type {?} */
        var availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        /** @type {?} */
        var availableWidth = containerElm.width() || 0;
        /** @type {?} */
        var maxHeight = (autoResizeOptions && autoResizeOptions.maxHeight && autoResizeOptions.maxHeight > 0) ? autoResizeOptions.maxHeight : undefined;
        /** @type {?} */
        var minHeight = (autoResizeOptions && autoResizeOptions.minHeight && autoResizeOptions.minHeight < 0) ? autoResizeOptions.minHeight : DATAGRID_MIN_HEIGHT;
        /** @type {?} */
        var maxWidth = (autoResizeOptions && autoResizeOptions.maxWidth && autoResizeOptions.maxWidth > 0) ? autoResizeOptions.maxWidth : undefined;
        /** @type {?} */
        var minWidth = (autoResizeOptions && autoResizeOptions.minWidth && autoResizeOptions.minWidth < 0) ? autoResizeOptions.minWidth : DATAGRID_MIN_WIDTH;
        /** @type {?} */
        var newHeight = availableHeight;
        /** @type {?} */
        var newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
        // optionally (when defined), make sure that grid height & width are within their thresholds
        if (newHeight < minHeight) {
            newHeight = minHeight;
        }
        if (maxHeight && newHeight > maxHeight) {
            newHeight = maxHeight;
        }
        if (newWidth < minWidth) {
            newWidth = minWidth;
        }
        if (maxWidth && newWidth > maxWidth) {
            newWidth = maxWidth;
        }
        // return the new dimensions unless a fixed height/width was defined
        return {
            height: this._fixedHeight || newHeight,
            width: this._fixedWidth || newWidth
        };
    };
    /**
     * Dispose function when element is destroyed
     */
    /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    ResizerService.prototype.dispose = /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    function () {
        $(window).off("resize.grid." + this._gridUid);
    };
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     */
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    ResizerService.prototype.compensateHorizontalScroll = /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    function (grid, gridOptions) {
        /** @type {?} */
        var gridElm = $("#" + gridOptions.gridId);
        /** @type {?} */
        var scrollbarDimensions = grid && grid.getScrollbarDimensions();
        /** @type {?} */
        var slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        /** @type {?} */
        var calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    };
    /**
     * Return the last resize dimensions used by the service
     * @return last dimensions
     */
    /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    ResizerService.prototype.getLastResizeDimensions = /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    function () {
        return this._lastDimensions;
    };
    /** Resize the datagrid to fit the browser height & width */
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGrid = /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    function (delay, newSizes) {
        var _this = this;
        if (delay === void 0) { delay = 10; }
        if (!this._grid || !this._gridOptions) {
            throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()");
        }
        return new Promise(function (resolve) {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(_this._timer);
                _this._timer = setTimeout(function () {
                    _this.resizeGridWithDimensions(newSizes);
                    resolve(_this._lastDimensions);
                }, delay);
            }
            else {
                _this.resizeGridWithDimensions(newSizes);
                resolve(_this._lastDimensions);
            }
        });
    };
    /**
     * @param {?=} newSizes
     * @return {?}
     */
    ResizerService.prototype.resizeGridWithDimensions = /**
     * @param {?=} newSizes
     * @return {?}
     */
    function (newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        /** @type {?} */
        var availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        /** @type {?} */
        var gridElm = $("#" + this._gridOptions.gridId) || {};
        /** @type {?} */
        var gridContainerElm = $("#" + this._gridOptions.gridContainerId) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            /** @type {?} */
            var newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            /** @type {?} */
            var newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
            // apply these new height/width to the datagrid
            gridElm.height(newHeight);
            gridElm.width(newWidth);
            gridContainerElm.height(newHeight);
            gridContainerElm.width(newWidth);
            // resize the slickgrid canvas on all browser except some IE versions
            // exclude all IE below IE11
            // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
            if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid && this._grid.resizeCanvas) {
                this._grid.resizeCanvas();
            }
            // also call the grid auto-size columns so that it takes available when going bigger
            if (this._gridOptions && this._gridOptions.enableAutoSizeColumns && typeof this._grid.autosizeColumns) {
                // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree) to avoid SlickGrid error "missing stylesheet"
                if (this._gridUid && $("." + this._gridUid).length > 0) {
                    this._grid.autosizeColumns();
                }
                // compensate anytime SlickGrid measureScrollbar is incorrect
                this.compensateHorizontalScroll(this._grid, this._gridOptions);
            }
            // keep last resized dimensions & resolve them to the Promise
            this._lastDimensions = {
                height: newHeight,
                width: newWidth
            };
            if ((this._gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                this._lastDimensions.heightWithPagination = newHeight + DATAGRID_PAGINATION_HEIGHT;
            }
        }
        return this._lastDimensions;
    };
    return ResizerService;
}());
export { ResizerService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._fixedHeight;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._fixedWidth;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._grid;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._lastDimensions;
    /**
     * @type {?}
     * @private
     */
    ResizerService.prototype._timer;
    /** @type {?} */
    ResizerService.prototype.onGridBeforeResize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7SUFNekIsbUJBQW1CLEdBQUcsR0FBRzs7SUFDekIsa0JBQWtCLEdBQUcsR0FBRzs7SUFDeEIsdUJBQXVCLEdBQUcsRUFBRTs7SUFDNUIsMEJBQTBCLEdBQUcsRUFBRTs7OztBQUVyQyxtQ0FJQzs7O0lBSEMsK0JBQWU7O0lBQ2YsOEJBQWM7O0lBQ2QsNkNBQThCOztBQUdoQztJQUFBO1FBTUUsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQTZNOUMsQ0FBQztJQTFNQyxzQkFBWSx3Q0FBWTtRQUR4QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLG9DQUFROzs7OztRQUFwQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQzVGLENBQUM7OztPQUFBOzs7Ozs7SUFFRCw2QkFBSTs7Ozs7SUFBSixVQUFLLElBQVMsRUFBRSxlQUErQjtRQUM3QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLGVBQWUsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsaURBQXdCOzs7Ozs7SUFBeEIsVUFBeUIsUUFBd0I7UUFBakQsaUJBaUJDOzs7WUFmTyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDO1FBQzlHLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxvSEFBb0g7UUFDcEgsd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLDRHQUE0RztRQUM1RywwREFBMEQ7UUFDMUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBZSxJQUFJLENBQUMsUUFBVSxFQUFFO1lBQzNDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsbURBQTBCOzs7Ozs7SUFBMUIsVUFBMkIsV0FBdUI7O1lBQzFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBSSxXQUFXLENBQUMsTUFBUSxDQUFDOztZQUN4QyxpQkFBaUIsR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLFVBQVU7O1lBQ3pELFlBQVksR0FBRyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSSxpQkFBaUIsQ0FBQyxXQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUksV0FBVyxDQUFDLGVBQWlCLENBQUM7O1lBQ25KLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksU0FBUyxLQUFLLFNBQVMsSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDckYsT0FBTyxJQUFJLENBQUM7U0FDYjs7OztZQUlHLGFBQWEsR0FBRyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUN0SSxJQUFJLGFBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDMUYsYUFBYSxJQUFJLDBCQUEwQixDQUFDO1NBQzdDOztZQUVLLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzs7WUFDcEMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUU7O1lBQ3BDLGFBQWEsR0FBRyxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdkUsZUFBZSxHQUFHLFVBQVUsR0FBRyxhQUFhLEdBQUcsYUFBYTs7WUFDNUQsY0FBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDOztZQUMxQyxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLElBQUksaUJBQWlCLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVM7O1lBQzNJLFNBQVMsR0FBRyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsbUJBQW1COztZQUNySixRQUFRLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLElBQUksaUJBQWlCLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7O1lBQ3ZJLFFBQVEsR0FBRyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0JBQWtCOztZQUVsSixTQUFTLEdBQUcsZUFBZTs7WUFDM0IsUUFBUSxHQUFHLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWM7UUFFckksNEZBQTRGO1FBQzVGLElBQUksU0FBUyxHQUFHLFNBQVMsRUFBRTtZQUN6QixTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxTQUFTLElBQUksU0FBUyxHQUFHLFNBQVMsRUFBRTtZQUN0QyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxRQUFRLEdBQUcsUUFBUSxFQUFFO1lBQ3ZCLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDckI7UUFDRCxJQUFJLFFBQVEsSUFBSSxRQUFRLEdBQUcsUUFBUSxFQUFFO1lBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDckI7UUFFRCxvRUFBb0U7UUFDcEUsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLFNBQVM7WUFDdEMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUTtTQUNwQyxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILGdDQUFPOzs7O0lBQVA7UUFDRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFlLElBQUksQ0FBQyxRQUFVLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7Ozs7SUFDSCxtREFBMEI7Ozs7Ozs7OztJQUExQixVQUEyQixJQUFTLEVBQUUsV0FBdUI7O1lBQ3JELE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBSSxXQUFXLENBQUMsTUFBUSxDQUFDOztZQUVyQyxtQkFBbUIsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFOztZQUMzRCx1QkFBdUIsR0FBRyxtQkFBbUIsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLOztZQUMxRSx3QkFBd0IsR0FBRyxpQkFBaUIsRUFBRTtRQUVuRCx1RkFBdUY7UUFDeEYsbUZBQW1GO1FBQ25GLElBQUksdUJBQXVCLEdBQUcsd0JBQXdCLEVBQUU7WUFDdEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7U0FDdkY7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILGdEQUF1Qjs7OztJQUF2QjtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsNERBQTREOzs7Ozs7O0lBQzVELG1DQUFVOzs7Ozs7SUFBVixVQUFXLEtBQVUsRUFBRSxRQUF3QjtRQUEvQyxpQkFzQkM7UUF0QlUsc0JBQUEsRUFBQSxVQUFVO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLDJQQUV3SSxDQUFDLENBQUM7U0FDM0o7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN6Qix5RkFBeUY7WUFDekYsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUM7WUFFbkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO29CQUN2QixLQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3hDLE9BQU8sQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxpREFBd0I7Ozs7SUFBeEIsVUFBeUIsUUFBd0I7OztZQUV6QyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFDeEUsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBUSxDQUFDLElBQUksRUFBRTs7WUFDakQsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLE1BQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFpQixDQUFDLElBQUksRUFBRTtRQUV6RSxJQUFJLENBQUMsUUFBUSxJQUFJLG1CQUFtQixDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Ozs7O2dCQUlyRCxTQUFTLEdBQUcsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNOztnQkFDeEYsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUUxRiwrQ0FBK0M7WUFDL0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFakMscUVBQXFFO1lBQ3JFLDRCQUE0QjtZQUM1Qiw2SEFBNkg7WUFDN0gsSUFBSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUN4RyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzNCO1lBRUQsb0ZBQW9GO1lBQ3BGLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQ3JHLDBJQUEwSTtnQkFDMUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxRQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUM5QjtnQkFFRCw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNoRTtZQUVELDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHO2dCQUNyQixNQUFNLEVBQUUsU0FBUztnQkFDakIsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQztZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbk5ELElBbU5DOzs7Ozs7O0lBbE5DLHNDQUFvQzs7Ozs7SUFDcEMscUNBQW1DOzs7OztJQUNuQywrQkFBbUI7Ozs7O0lBQ25CLHlDQUF1Qzs7Ozs7SUFDdkMsZ0NBQW9COztJQUNwQiw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgZ2V0U2Nyb2xsQmFyV2lkdGggfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyICQ6IGFueTtcblxuLy8gZ2xvYmFsIGNvbnN0YW50cywgaGVpZ2h0L3dpZHRoIGFyZSBpbiBwaXhlbHNcbmNvbnN0IERBVEFHUklEX01JTl9IRUlHSFQgPSAxODA7XG5jb25zdCBEQVRBR1JJRF9NSU5fV0lEVEggPSAzMDA7XG5jb25zdCBEQVRBR1JJRF9CT1RUT01fUEFERElORyA9IDIwO1xuY29uc3QgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQgPSAzNTtcblxuZXhwb3J0IGludGVyZmFjZSBHcmlkRGltZW5zaW9uIHtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodFdpdGhQYWdpbmF0aW9uPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUmVzaXplclNlcnZpY2Uge1xuICBwcml2YXRlIF9maXhlZEhlaWdodDogbnVtYmVyIHwgbnVsbDtcbiAgcHJpdmF0ZSBfZml4ZWRXaWR0aDogbnVtYmVyIHwgbnVsbDtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBwcml2YXRlIF9sYXN0RGltZW5zaW9uczogR3JpZERpbWVuc2lvbjtcbiAgcHJpdmF0ZSBfdGltZXI6IGFueTtcbiAgb25HcmlkQmVmb3JlUmVzaXplID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgX2dyaWRVaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRVSUQpID8gdGhpcy5fZ3JpZC5nZXRVSUQoKSA6IHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZDtcbiAgfVxuXG4gIGluaXQoZ3JpZDogYW55LCBmaXhlZERpbWVuc2lvbnM/OiBHcmlkRGltZW5zaW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgaWYgKGZpeGVkRGltZW5zaW9ucykge1xuICAgICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBmaXhlZERpbWVuc2lvbnMuaGVpZ2h0O1xuICAgICAgdGhpcy5fZml4ZWRXaWR0aCA9IGZpeGVkRGltZW5zaW9ucy53aWR0aDtcbiAgICB9XG4gIH1cblxuICAvKiogQXR0YWNoIGFuIGF1dG8gcmVzaXplIHRyaWdnZXIgb24gdGhlIGRhdGFncmlkLCBpZiB0aGF0IGlzIGVuYWJsZSB0aGVuIGl0IHdpbGwgcmVzaXplIGl0c2VsZiB0byB0aGUgYXZhaWxhYmxlIHNwYWNlXG4gICAqIE9wdGlvbnM6IHdlIGNvdWxkIGFsc28gcHJvdmlkZSBhICUgZmFjdG9yIHRvIHJlc2l6ZSBvbiBlYWNoIGhlaWdodC93aWR0aCBpbmRlcGVuZGVudGx5XG4gICAqL1xuICBhdHRhY2hBdXRvUmVzaXplRGF0YUdyaWQobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKSB7XG4gICAgLy8gaWYgd2UgY2FuJ3QgZmluZCB0aGUgZ3JpZCB0byByZXNpemUsIHJldHVybiB3aXRob3V0IGF0dGFjaGluZyBhbnl0aGluZ1xuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgPyB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgOiAnZ3JpZDEnfWApO1xuICAgIGlmIChncmlkRG9tRWxtID09PSB1bmRlZmluZWQgfHwgZ3JpZERvbUVsbS5vZmZzZXQoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyAtLSAxc3QgcmVzaXplIHRoZSBkYXRhZ3JpZCBzaXplIGF0IGZpcnN0IGxvYWQgKHdlIG5lZWQgdGhpcyBiZWNhdXNlIHRoZSAub24gZXZlbnQgaXMgbm90IHRyaWdnZXJlZCBvbiBmaXJzdCBsb2FkKVxuICAgIC8vIC0tIGFsc28gd2UgYWRkIGEgc2xpZ2h0IGRlbGF5IChpbiBtcykgc28gdGhhdCB3ZSByZXNpemUgYWZ0ZXIgdGhlIGdyaWQgcmVuZGVyIGlzIGRvbmVcbiAgICB0aGlzLnJlc2l6ZUdyaWQoMTAsIG5ld1NpemVzKTtcblxuICAgIC8vIC0tIDJuZCBhdHRhY2ggYSB0cmlnZ2VyIG9uIHRoZSBXaW5kb3cgRE9NIGVsZW1lbnQsIHNvIHRoYXQgaXQgaGFwcGVucyBhbHNvIHdoZW4gcmVzaXppbmcgYWZ0ZXIgZmlyc3QgbG9hZFxuICAgIC8vIC0tIGF0dGFjaCBhdXRvLXJlc2l6ZSB0byBXaW5kb3cgb2JqZWN0IG9ubHkgaWYgaXQgZXhpc3RcbiAgICAkKHdpbmRvdykub24oYHJlc2l6ZS5ncmlkLiR7dGhpcy5fZ3JpZFVpZH1gLCAoKSA9PiB7XG4gICAgICB0aGlzLm9uR3JpZEJlZm9yZVJlc2l6ZS5uZXh0KHRydWUpO1xuICAgICAgdGhpcy5yZXNpemVHcmlkKDAsIG5ld1NpemVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGRhdGFncmlkIG5ldyBoZWlnaHQvd2lkdGggZnJvbSB0aGUgYXZhaWxhYmxlIHNwYWNlLCBhbHNvIGNvbnNpZGVyIHRoYXQgYSAlIGZhY3RvciBtaWdodCBiZSBhcHBsaWVkIHRvIGNhbGN1bGF0aW9uXG4gICAqIG9iamVjdCBncmlkT3B0aW9uc1xuICAgKi9cbiAgY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnMoZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pOiBHcmlkRGltZW5zaW9uIHwgbnVsbCB7XG4gICAgY29uc3QgZ3JpZERvbUVsbSA9ICQoYCMke2dyaWRPcHRpb25zLmdyaWRJZH1gKTtcbiAgICBjb25zdCBhdXRvUmVzaXplT3B0aW9ucyA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmF1dG9SZXNpemU7XG4gICAgY29uc3QgY29udGFpbmVyRWxtID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLmNvbnRhaW5lcklkKSA/ICQoYCMke2F1dG9SZXNpemVPcHRpb25zLmNvbnRhaW5lcklkfWApIDogJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkfWApO1xuICAgIGNvbnN0IHdpbmRvd0VsbSA9ICQod2luZG93KTtcbiAgICBpZiAod2luZG93RWxtID09PSB1bmRlZmluZWQgfHwgY29udGFpbmVyRWxtID09PSB1bmRlZmluZWQgfHwgZ3JpZERvbUVsbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGUgYm90dG9tIHBhZGRpbmdcbiAgICAvLyBpZiB1c2luZyBwYWdpbmF0aW9uLCB3ZSBuZWVkIHRvIGFkZCB0aGUgcGFnaW5hdGlvbiBoZWlnaHQgdG8gdGhpcyBib3R0b20gcGFkZGluZ1xuICAgIGxldCBib3R0b21QYWRkaW5nID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLmJvdHRvbVBhZGRpbmcpID8gYXV0b1Jlc2l6ZU9wdGlvbnMuYm90dG9tUGFkZGluZyA6IERBVEFHUklEX0JPVFRPTV9QQURESU5HO1xuICAgIGlmIChib3R0b21QYWRkaW5nICYmIChncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xuICAgICAgYm90dG9tUGFkZGluZyArPSBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVDtcbiAgICB9XG5cbiAgICBjb25zdCBncmlkSGVpZ2h0ID0gd2luZG93RWxtLmhlaWdodCgpIHx8IDA7XG4gICAgY29uc3QgY29vcmRPZmZzZXRUb3AgPSBncmlkRG9tRWxtLm9mZnNldCgpO1xuICAgIGNvbnN0IGdyaWRPZmZzZXRUb3AgPSAoY29vcmRPZmZzZXRUb3AgIT09IHVuZGVmaW5lZCkgPyBjb29yZE9mZnNldFRvcC50b3AgOiAwO1xuICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IGdyaWRIZWlnaHQgLSBncmlkT2Zmc2V0VG9wIC0gYm90dG9tUGFkZGluZztcbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IGNvbnRhaW5lckVsbS53aWR0aCgpIHx8IDA7XG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1heEhlaWdodCAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhIZWlnaHQgPiAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1heEhlaWdodCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBtaW5IZWlnaHQgPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluSGVpZ2h0ICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbkhlaWdodCA8IDApID8gYXV0b1Jlc2l6ZU9wdGlvbnMubWluSGVpZ2h0IDogREFUQUdSSURfTUlOX0hFSUdIVDtcbiAgICBjb25zdCBtYXhXaWR0aCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhXaWR0aCAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhXaWR0aCA+IDApID8gYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbWluV2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggPCAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1pbldpZHRoIDogREFUQUdSSURfTUlOX1dJRFRIO1xuXG4gICAgbGV0IG5ld0hlaWdodCA9IGF2YWlsYWJsZUhlaWdodDtcbiAgICBsZXQgbmV3V2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuc2lkZVBhZGRpbmcpID8gYXZhaWxhYmxlV2lkdGggLSBhdXRvUmVzaXplT3B0aW9ucy5zaWRlUGFkZGluZyA6IGF2YWlsYWJsZVdpZHRoO1xuXG4gICAgLy8gb3B0aW9uYWxseSAod2hlbiBkZWZpbmVkKSwgbWFrZSBzdXJlIHRoYXQgZ3JpZCBoZWlnaHQgJiB3aWR0aCBhcmUgd2l0aGluIHRoZWlyIHRocmVzaG9sZHNcbiAgICBpZiAobmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XG4gICAgICBuZXdIZWlnaHQgPSBtaW5IZWlnaHQ7XG4gICAgfVxuICAgIGlmIChtYXhIZWlnaHQgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XG4gICAgICBuZXdIZWlnaHQgPSBtYXhIZWlnaHQ7XG4gICAgfVxuICAgIGlmIChuZXdXaWR0aCA8IG1pbldpZHRoKSB7XG4gICAgICBuZXdXaWR0aCA9IG1pbldpZHRoO1xuICAgIH1cbiAgICBpZiAobWF4V2lkdGggJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xuICAgICAgbmV3V2lkdGggPSBtYXhXaWR0aDtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gdGhlIG5ldyBkaW1lbnNpb25zIHVubGVzcyBhIGZpeGVkIGhlaWdodC93aWR0aCB3YXMgZGVmaW5lZFxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IHRoaXMuX2ZpeGVkSGVpZ2h0IHx8IG5ld0hlaWdodCxcbiAgICAgIHdpZHRoOiB0aGlzLl9maXhlZFdpZHRoIHx8IG5ld1dpZHRoXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIGZ1bmN0aW9uIHdoZW4gZWxlbWVudCBpcyBkZXN0cm95ZWRcbiAgICovXG4gIGRpc3Bvc2UoKSB7XG4gICAgJCh3aW5kb3cpLm9mZihgcmVzaXplLmdyaWQuJHt0aGlzLl9ncmlkVWlkfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBzb21lIHJlYXNvbiB0aGlzIG9ubHkgc2VlbXMgdG8gaGFwcGVuIGluIENocm9tZSBhbmQgaXMgc29tZXRpbWUgbWlzY2FsY3VsYXRlZCBieSBTbGlja0dyaWQgbWVhc3VyZVNyb2xsYmFyKCkgbWV0aG9kXG4gICAqIFdoZW4gdGhhdCBoYXBwZW5zIHdlIHdpbGwgY29tcGVuc2F0ZSBhbmQgcmVzaXplIHRoZSBHcmlkIFZpZXdwb3J0IHRvIGF2b2lkIHNlZWluZyBob3Jpem9udGFsIHNjcm9sbGJhclxuICAgKiBNb3N0IG9mIHRoZSB0aW1lIGl0IGhhcHBlbnMsIGl0J3MgYSB0aW55IG9mZnNldCBjYWxjdWxhdGlvbiBvZiB1c3VhbGx5IDNweCAoZW5vdWdoIHRvIHNob3cgc2Nyb2xsYmFyKVxuICAgKiBHaXRIdWIgaXNzdWUgcmVmZXJlbmNlOiBodHRwczovL2dpdGh1Yi5jb20vNnBhYy9TbGlja0dyaWQvaXNzdWVzLzI3NVxuICAgKi9cbiAgY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwoZ3JpZDogYW55LCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xuICAgIGNvbnN0IGdyaWRFbG0gPSAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YCk7XG5cbiAgICBjb25zdCBzY3JvbGxiYXJEaW1lbnNpb25zID0gZ3JpZCAmJiBncmlkLmdldFNjcm9sbGJhckRpbWVuc2lvbnMoKTtcbiAgICBjb25zdCBzbGlja0dyaWRTY3JvbGxiYXJXaWR0aCA9IHNjcm9sbGJhckRpbWVuc2lvbnMgJiYgc2Nyb2xsYmFyRGltZW5zaW9ucy53aWR0aDtcbiAgICBjb25zdCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxCYXJXaWR0aCgpO1xuXG4gICAgIC8vIGlmIHNjcm9sbGJhciB3aWR0aCBpcyBkaWZmZXJlbnQgZnJvbSBTbGlja0dyaWQgY2FsY3VsYXRpb24gdG8gb3VyIGN1c3RvbSBjYWxjdWxhdGlvblxuICAgIC8vIHRoZW4gcmVzaXplIHRoZSBncmlkIHdpdGggdGhlIG1pc3NpbmcgcGl4ZWxzIHRvIHJlbW92ZSBzY3JvbGwgKHVzdWFsbHkgb25seSAzcHgpXG4gICAgaWYgKHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoIDwgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoKSB7XG4gICAgICBncmlkRWxtLndpZHRoKGdyaWRFbG0ud2lkdGgoKSArIChjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggLSBzbGlja0dyaWRTY3JvbGxiYXJXaWR0aCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGxhc3QgcmVzaXplIGRpbWVuc2lvbnMgdXNlZCBieSB0aGUgc2VydmljZVxuICAgKiBAcmV0dXJuIGxhc3QgZGltZW5zaW9uc1xuICAgKi9cbiAgZ2V0TGFzdFJlc2l6ZURpbWVuc2lvbnMoKTogR3JpZERpbWVuc2lvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhc3REaW1lbnNpb25zO1xuICB9XG5cbiAgLyoqIFJlc2l6ZSB0aGUgZGF0YWdyaWQgdG8gZml0IHRoZSBicm93c2VyIGhlaWdodCAmIHdpZHRoICovXG4gIHJlc2l6ZUdyaWQoZGVsYXkgPSAxMCwgbmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogUHJvbWlzZTxHcmlkRGltZW5zaW9uPiB7XG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8ICF0aGlzLl9ncmlkT3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIEFuZ3VsYXItU2xpY2tncmlkIHJlc2l6ZXIgcmVxdWlyZXMgYSB2YWxpZCBHcmlkIG9iamVjdCBhbmQgR3JpZCBPcHRpb25zIGRlZmluZWQuXG4gICAgICBZb3UgY2FuIGZpeCB0aGlzIGJ5IHNldHRpbmcgeW91ciBncmlkT3B0aW9uIHRvIHVzZSBcImVuYWJsZUF1dG9SZXNpemVcIiBvciBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZXJTZXJ2aWNlIGJ5IGNhbGxpbmcgYXR0YWNoQXV0b1Jlc2l6ZURhdGFHcmlkKClgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIC8vIGJlY2F1c2Ugb2YgdGhlIGphdmFzY3JpcHQgYXN5bmMgbmF0dXJlLCB3ZSBtaWdodCB3YW50IHRvIGRlbGF5IHRoZSByZXNpemUgYSBsaXR0bGUgYml0XG4gICAgICBkZWxheSA9IGRlbGF5IHx8IDA7XG5cbiAgICAgIGlmIChkZWxheSA+IDApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc2l6ZUdyaWRXaXRoRGltZW5zaW9ucyhuZXdTaXplcyk7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLl9sYXN0RGltZW5zaW9ucyk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzKTtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9sYXN0RGltZW5zaW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogR3JpZERpbWVuc2lvbiB7XG4gICAgLy8gY2FsY3VsYXRlIHRoZSBhdmFpbGFibGUgc2l6ZXMgd2l0aCBtaW5pbXVtIGhlaWdodCBkZWZpbmVkIGFzIGEgY29uc3RhbnRcbiAgICBjb25zdCBhdmFpbGFibGVEaW1lbnNpb25zID0gdGhpcy5jYWxjdWxhdGVHcmlkTmV3RGltZW5zaW9ucyh0aGlzLl9ncmlkT3B0aW9ucyk7XG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zLmdyaWRJZH1gKSB8fCB7fTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyRWxtID0gJChgIyR7dGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkfWApIHx8IHt9O1xuXG4gICAgaWYgKChuZXdTaXplcyB8fCBhdmFpbGFibGVEaW1lbnNpb25zKSAmJiBncmlkRWxtLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGdldCB0aGUgbmV3IHNpemVzLCBpZiBuZXcgc2l6ZXMgYXJlIHBhc3NlZCAobm90IDApLCB3ZSB3aWxsIHVzZSB0aGVtIGVsc2UgdXNlIGF2YWlsYWJsZSBzcGFjZVxuICAgICAgLy8gYmFzaWNhbGx5IGlmIHVzZXIgcGFzc2VzIDEgb2YgdGhlIGRpbWVuc2lvbiwgbGV0IHNheSBoZSBwYXNzZXMganVzdCB0aGUgaGVpZ2h0LFxuICAgICAgLy8gd2Ugd2lsbCB1c2UgdGhlIGhlaWdodCBhcyBhIGZpeGVkIGhlaWdodCBidXQgdGhlIHdpZHRoIHdpbGwgYmUgcmVzaXplZCBieSBpdCdzIGF2YWlsYWJsZSBzcGFjZVxuICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gKG5ld1NpemVzICYmIG5ld1NpemVzLmhlaWdodCkgPyBuZXdTaXplcy5oZWlnaHQgOiBhdmFpbGFibGVEaW1lbnNpb25zLmhlaWdodDtcbiAgICAgIGNvbnN0IG5ld1dpZHRoID0gKG5ld1NpemVzICYmIG5ld1NpemVzLndpZHRoKSA/IG5ld1NpemVzLndpZHRoIDogYXZhaWxhYmxlRGltZW5zaW9ucy53aWR0aDtcblxuICAgICAgLy8gYXBwbHkgdGhlc2UgbmV3IGhlaWdodC93aWR0aCB0byB0aGUgZGF0YWdyaWRcbiAgICAgIGdyaWRFbG0uaGVpZ2h0KG5ld0hlaWdodCk7XG4gICAgICBncmlkRWxtLndpZHRoKG5ld1dpZHRoKTtcbiAgICAgIGdyaWRDb250YWluZXJFbG0uaGVpZ2h0KG5ld0hlaWdodCk7XG4gICAgICBncmlkQ29udGFpbmVyRWxtLndpZHRoKG5ld1dpZHRoKTtcblxuICAgICAgLy8gcmVzaXplIHRoZSBzbGlja2dyaWQgY2FudmFzIG9uIGFsbCBicm93c2VyIGV4Y2VwdCBzb21lIElFIHZlcnNpb25zXG4gICAgICAvLyBleGNsdWRlIGFsbCBJRSBiZWxvdyBJRTExXG4gICAgICAvLyBJRTExIHdhbnRzIHRvIGJlIGEgYmV0dGVyIHN0YW5kYXJkIChXM0MpIGZvbGxvd2VyIChmaW5hbGx5KSB0aGV5IGV2ZW4gY2hhbmdlZCB0aGVpciBhcHBOYW1lIG91dHB1dCB0byBhbHNvIGhhdmUgJ05ldHNjYXBlJ1xuICAgICAgaWYgKG5ldyBSZWdFeHAoJ01TSUUgWzYtOF0nKS5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09PSBudWxsICYmIHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMpIHtcbiAgICAgICAgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxzbyBjYWxsIHRoZSBncmlkIGF1dG8tc2l6ZSBjb2x1bW5zIHNvIHRoYXQgaXQgdGFrZXMgYXZhaWxhYmxlIHdoZW4gZ29pbmcgYmlnZ2VyXG4gICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zICYmIHR5cGVvZiB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucykge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgZ3JpZCBzdGlsbCBleGlzdCAoYnkgbG9va2luZyBpZiB0aGUgR3JpZCBVSUQgaXMgZm91bmQgaW4gdGhlIERPTSB0cmVlKSB0byBhdm9pZCBTbGlja0dyaWQgZXJyb3IgXCJtaXNzaW5nIHN0eWxlc2hlZXRcIlxuICAgICAgICBpZiAodGhpcy5fZ3JpZFVpZCAmJiAkKGAuJHt0aGlzLl9ncmlkVWlkfWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdFxuICAgICAgICB0aGlzLmNvbXBlbnNhdGVIb3Jpem9udGFsU2Nyb2xsKHRoaXMuX2dyaWQsIHRoaXMuX2dyaWRPcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgLy8ga2VlcCBsYXN0IHJlc2l6ZWQgZGltZW5zaW9ucyAmIHJlc29sdmUgdGhlbSB0byB0aGUgUHJvbWlzZVxuICAgICAgdGhpcy5fbGFzdERpbWVuc2lvbnMgPSB7XG4gICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxuICAgICAgICB3aWR0aDogbmV3V2lkdGhcbiAgICAgIH07XG5cbiAgICAgIGlmICgodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkpIHtcbiAgICAgICAgdGhpcy5fbGFzdERpbWVuc2lvbnMuaGVpZ2h0V2l0aFBhZ2luYXRpb24gPSBuZXdIZWlnaHQgKyBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XG4gIH1cbn1cbiJdfQ==