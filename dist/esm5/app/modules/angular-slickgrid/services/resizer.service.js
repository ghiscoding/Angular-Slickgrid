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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7SUFNekIsbUJBQW1CLEdBQUcsR0FBRzs7SUFDekIsa0JBQWtCLEdBQUcsR0FBRzs7SUFDeEIsdUJBQXVCLEdBQUcsRUFBRTs7SUFDNUIsMEJBQTBCLEdBQUcsRUFBRTs7OztBQUVyQyxtQ0FJQzs7O0lBSEMsK0JBQWU7O0lBQ2YsOEJBQWM7O0lBQ2QsNkNBQThCOztBQUdoQztJQUFBO1FBTUUsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQTZNOUMsQ0FBQztJQTFNQyxzQkFBWSx3Q0FBWTtRQUR4QixpRUFBaUU7Ozs7OztRQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLG9DQUFROzs7OztRQUFwQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQzVGLENBQUM7OztPQUFBOzs7Ozs7SUFFRCw2QkFBSTs7Ozs7SUFBSixVQUFLLElB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Q0FBQzthQUNoRTtZQUVELDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHO2dCQUNyQixNQUFNLEVBQUUsU0FBUztnQkFDakIsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQztZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbk5ELElBbU5DOzs7Ozs7O0lBbE5DLHNDQUFvQzs7Ozs7SUFDcEMscUNBQW1DOzs7OztJQUNuQywrQkFBbUI7Ozs7O0lBQ25CLHlDQUF1Qzs7Ozs7SUFDdkMsZ0NBQW9COztJQUNwQiw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkT3B0aW9uIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBnZXRTY3JvbGxCYXJXaWR0aCB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vLyBnbG9iYWwgY29uc3RhbnRzLCBoZWlnaHQvd2lkdGggYXJlIGluIHBpeGVsc1xyXG5jb25zdCBEQVRBR1JJRF9NSU5fSEVJR0hUID0gMTgwO1xyXG5jb25zdCBEQVRBR1JJRF9NSU5fV0lEVEggPSAzMDA7XHJcbmNvbnN0IERBVEFHUklEX0JPVFRPTV9QQURESU5HID0gMjA7XHJcbmNvbnN0IERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUID0gMzU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyaWREaW1lbnNpb24ge1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0V2l0aFBhZ2luYXRpb24/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXNpemVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZml4ZWRIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZml4ZWRXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfbGFzdERpbWVuc2lvbnM6IEdyaWREaW1lbnNpb247XHJcbiAgcHJpdmF0ZSBfdGltZXI6IGFueTtcclxuICBvbkdyaWRCZWZvcmVSZXNpemUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IF9ncmlkVWlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRVSUQpID8gdGhpcy5fZ3JpZC5nZXRVSUQoKSA6IHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZDtcclxuICB9XHJcblxyXG4gIGluaXQoZ3JpZDogYW55LCBmaXhlZERpbWVuc2lvbnM/OiBHcmlkRGltZW5zaW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIGlmIChmaXhlZERpbWVuc2lvbnMpIHtcclxuICAgICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBmaXhlZERpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICB0aGlzLl9maXhlZFdpZHRoID0gZml4ZWREaW1lbnNpb25zLndpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEF0dGFjaCBhbiBhdXRvIHJlc2l6ZSB0cmlnZ2VyIG9uIHRoZSBkYXRhZ3JpZCwgaWYgdGhhdCBpcyBlbmFibGUgdGhlbiBpdCB3aWxsIHJlc2l6ZSBpdHNlbGYgdG8gdGhlIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAqIE9wdGlvbnM6IHdlIGNvdWxkIGFsc28gcHJvdmlkZSBhICUgZmFjdG9yIHRvIHJlc2l6ZSBvbiBlYWNoIGhlaWdodC93aWR0aCBpbmRlcGVuZGVudGx5XHJcbiAgICovXHJcbiAgYXR0YWNoQXV0b1Jlc2l6ZURhdGFHcmlkKG5ld1NpemVzPzogR3JpZERpbWVuc2lvbikge1xyXG4gICAgLy8gaWYgd2UgY2FuJ3QgZmluZCB0aGUgZ3JpZCB0byByZXNpemUsIHJldHVybiB3aXRob3V0IGF0dGFjaGluZyBhbnl0aGluZ1xyXG4gICAgY29uc3QgZ3JpZERvbUVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZCA/IHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZCA6ICdncmlkMSd9YCk7XHJcbiAgICBpZiAoZ3JpZERvbUVsbSA9PT0gdW5kZWZpbmVkIHx8IGdyaWREb21FbG0ub2Zmc2V0KCkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLSAxc3QgcmVzaXplIHRoZSBkYXRhZ3JpZCBzaXplIGF0IGZpcnN0IGxvYWQgKHdlIG5lZWQgdGhpcyBiZWNhdXNlIHRoZSAub24gZXZlbnQgaXMgbm90IHRyaWdnZXJlZCBvbiBmaXJzdCBsb2FkKVxyXG4gICAgLy8gLS0gYWxzbyB3ZSBhZGQgYSBzbGlnaHQgZGVsYXkgKGluIG1zKSBzbyB0aGF0IHdlIHJlc2l6ZSBhZnRlciB0aGUgZ3JpZCByZW5kZXIgaXMgZG9uZVxyXG4gICAgdGhpcy5yZXNpemVHcmlkKDEwLCBuZXdTaXplcyk7XHJcblxyXG4gICAgLy8gLS0gMm5kIGF0dGFjaCBhIHRyaWdnZXIgb24gdGhlIFdpbmRvdyBET00gZWxlbWVudCwgc28gdGhhdCBpdCBoYXBwZW5zIGFsc28gd2hlbiByZXNpemluZyBhZnRlciBmaXJzdCBsb2FkXHJcbiAgICAvLyAtLSBhdHRhY2ggYXV0by1yZXNpemUgdG8gV2luZG93IG9iamVjdCBvbmx5IGlmIGl0IGV4aXN0XHJcbiAgICAkKHdpbmRvdykub24oYHJlc2l6ZS5ncmlkLiR7dGhpcy5fZ3JpZFVpZH1gLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub25HcmlkQmVmb3JlUmVzaXplLm5leHQodHJ1ZSk7XHJcbiAgICAgIHRoaXMucmVzaXplR3JpZCgwLCBuZXdTaXplcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgZGF0YWdyaWQgbmV3IGhlaWdodC93aWR0aCBmcm9tIHRoZSBhdmFpbGFibGUgc3BhY2UsIGFsc28gY29uc2lkZXIgdGhhdCBhICUgZmFjdG9yIG1pZ2h0IGJlIGFwcGxpZWQgdG8gY2FsY3VsYXRpb25cclxuICAgKiBvYmplY3QgZ3JpZE9wdGlvbnNcclxuICAgKi9cclxuICBjYWxjdWxhdGVHcmlkTmV3RGltZW5zaW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbik6IEdyaWREaW1lbnNpb24gfCBudWxsIHtcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YCk7XHJcbiAgICBjb25zdCBhdXRvUmVzaXplT3B0aW9ucyA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmF1dG9SZXNpemU7XHJcbiAgICBjb25zdCBjb250YWluZXJFbG0gPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuY29udGFpbmVySWQpID8gJChgIyR7YXV0b1Jlc2l6ZU9wdGlvbnMuY29udGFpbmVySWR9YCkgOiAkKGAjJHtncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCk7XHJcbiAgICBjb25zdCB3aW5kb3dFbG0gPSAkKHdpbmRvdyk7XHJcbiAgICBpZiAod2luZG93RWxtID09PSB1bmRlZmluZWQgfHwgY29udGFpbmVyRWxtID09PSB1bmRlZmluZWQgfHwgZ3JpZERvbUVsbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSBib3R0b20gcGFkZGluZ1xyXG4gICAgLy8gaWYgdXNpbmcgcGFnaW5hdGlvbiwgd2UgbmVlZCB0byBhZGQgdGhlIHBhZ2luYXRpb24gaGVpZ2h0IHRvIHRoaXMgYm90dG9tIHBhZGRpbmdcclxuICAgIGxldCBib3R0b21QYWRkaW5nID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLmJvdHRvbVBhZGRpbmcpID8gYXV0b1Jlc2l6ZU9wdGlvbnMuYm90dG9tUGFkZGluZyA6IERBVEFHUklEX0JPVFRPTV9QQURESU5HO1xyXG4gICAgaWYgKGJvdHRvbVBhZGRpbmcgJiYgKGdyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gfHwgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpKSB7XHJcbiAgICAgIGJvdHRvbVBhZGRpbmcgKz0gREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ3JpZEhlaWdodCA9IHdpbmRvd0VsbS5oZWlnaHQoKSB8fCAwO1xyXG4gICAgY29uc3QgY29vcmRPZmZzZXRUb3AgPSBncmlkRG9tRWxtLm9mZnNldCgpO1xyXG4gICAgY29uc3QgZ3JpZE9mZnNldFRvcCA9IChjb29yZE9mZnNldFRvcCAhPT0gdW5kZWZpbmVkKSA/IGNvb3JkT2Zmc2V0VG9wLnRvcCA6IDA7XHJcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBncmlkSGVpZ2h0IC0gZ3JpZE9mZnNldFRvcCAtIGJvdHRvbVBhZGRpbmc7XHJcbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IGNvbnRhaW5lckVsbS53aWR0aCgpIHx8IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHQgPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4SGVpZ2h0ICYmIGF1dG9SZXNpemVPcHRpb25zLm1heEhlaWdodCA+IDApID8gYXV0b1Jlc2l6ZU9wdGlvbnMubWF4SGVpZ2h0IDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbWluSGVpZ2h0ID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbkhlaWdodCAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5IZWlnaHQgPCAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1pbkhlaWdodCA6IERBVEFHUklEX01JTl9IRUlHSFQ7XHJcbiAgICBjb25zdCBtYXhXaWR0aCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhXaWR0aCAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhXaWR0aCA+IDApID8gYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBtaW5XaWR0aCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5XaWR0aCAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5XaWR0aCA8IDApID8gYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggOiBEQVRBR1JJRF9NSU5fV0lEVEg7XHJcblxyXG4gICAgbGV0IG5ld0hlaWdodCA9IGF2YWlsYWJsZUhlaWdodDtcclxuICAgIGxldCBuZXdXaWR0aCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5zaWRlUGFkZGluZykgPyBhdmFpbGFibGVXaWR0aCAtIGF1dG9SZXNpemVPcHRpb25zLnNpZGVQYWRkaW5nIDogYXZhaWxhYmxlV2lkdGg7XHJcblxyXG4gICAgLy8gb3B0aW9uYWxseSAod2hlbiBkZWZpbmVkKSwgbWFrZSBzdXJlIHRoYXQgZ3JpZCBoZWlnaHQgJiB3aWR0aCBhcmUgd2l0aGluIHRoZWlyIHRocmVzaG9sZHNcclxuICAgIGlmIChuZXdIZWlnaHQgPCBtaW5IZWlnaHQpIHtcclxuICAgICAgbmV3SGVpZ2h0ID0gbWluSGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYgKG1heEhlaWdodCAmJiBuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuICAgICAgbmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYgKG5ld1dpZHRoIDwgbWluV2lkdGgpIHtcclxuICAgICAgbmV3V2lkdGggPSBtaW5XaWR0aDtcclxuICAgIH1cclxuICAgIGlmIChtYXhXaWR0aCAmJiBuZXdXaWR0aCA+IG1heFdpZHRoKSB7XHJcbiAgICAgIG5ld1dpZHRoID0gbWF4V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJuIHRoZSBuZXcgZGltZW5zaW9ucyB1bmxlc3MgYSBmaXhlZCBoZWlnaHQvd2lkdGggd2FzIGRlZmluZWRcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlaWdodDogdGhpcy5fZml4ZWRIZWlnaHQgfHwgbmV3SGVpZ2h0LFxyXG4gICAgICB3aWR0aDogdGhpcy5fZml4ZWRXaWR0aCB8fCBuZXdXaWR0aFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3Bvc2UgZnVuY3Rpb24gd2hlbiBlbGVtZW50IGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAkKHdpbmRvdykub2ZmKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3Igc29tZSByZWFzb24gdGhpcyBvbmx5IHNlZW1zIHRvIGhhcHBlbiBpbiBDaHJvbWUgYW5kIGlzIHNvbWV0aW1lIG1pc2NhbGN1bGF0ZWQgYnkgU2xpY2tHcmlkIG1lYXN1cmVTcm9sbGJhcigpIG1ldGhvZFxyXG4gICAqIFdoZW4gdGhhdCBoYXBwZW5zIHdlIHdpbGwgY29tcGVuc2F0ZSBhbmQgcmVzaXplIHRoZSBHcmlkIFZpZXdwb3J0IHRvIGF2b2lkIHNlZWluZyBob3Jpem9udGFsIHNjcm9sbGJhclxyXG4gICAqIE1vc3Qgb2YgdGhlIHRpbWUgaXQgaGFwcGVucywgaXQncyBhIHRpbnkgb2Zmc2V0IGNhbGN1bGF0aW9uIG9mIHVzdWFsbHkgM3B4IChlbm91Z2ggdG8gc2hvdyBzY3JvbGxiYXIpXHJcbiAgICogR2l0SHViIGlzc3VlIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tLzZwYWMvU2xpY2tHcmlkL2lzc3Vlcy8yNzVcclxuICAgKi9cclxuICBjb21wZW5zYXRlSG9yaXpvbnRhbFNjcm9sbChncmlkOiBhbnksIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBncmlkRWxtID0gJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZElkfWApO1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbGJhckRpbWVuc2lvbnMgPSBncmlkICYmIGdyaWQuZ2V0U2Nyb2xsYmFyRGltZW5zaW9ucygpO1xyXG4gICAgY29uc3Qgc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxiYXJEaW1lbnNpb25zICYmIHNjcm9sbGJhckRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICBjb25zdCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBnZXRTY3JvbGxCYXJXaWR0aCgpO1xyXG5cclxuICAgICAvLyBpZiBzY3JvbGxiYXIgd2lkdGggaXMgZGlmZmVyZW50IGZyb20gU2xpY2tHcmlkIGNhbGN1bGF0aW9uIHRvIG91ciBjdXN0b20gY2FsY3VsYXRpb25cclxuICAgIC8vIHRoZW4gcmVzaXplIHRoZSBncmlkIHdpdGggdGhlIG1pc3NpbmcgcGl4ZWxzIHRvIHJlbW92ZSBzY3JvbGwgKHVzdWFsbHkgb25seSAzcHgpXHJcbiAgICBpZiAoc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGggPCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGgpIHtcclxuICAgICAgZ3JpZEVsbS53aWR0aChncmlkRWxtLndpZHRoKCkgKyAoY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoIC0gc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgbGFzdCByZXNpemUgZGltZW5zaW9ucyB1c2VkIGJ5IHRoZSBzZXJ2aWNlXHJcbiAgICogQHJldHVybiBsYXN0IGRpbWVuc2lvbnNcclxuICAgKi9cclxuICBnZXRMYXN0UmVzaXplRGltZW5zaW9ucygpOiBHcmlkRGltZW5zaW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0RGltZW5zaW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBSZXNpemUgdGhlIGRhdGFncmlkIHRvIGZpdCB0aGUgYnJvd3NlciBoZWlnaHQgJiB3aWR0aCAqL1xyXG4gIHJlc2l6ZUdyaWQoZGVsYXkgPSAxMCwgbmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogUHJvbWlzZTxHcmlkRGltZW5zaW9uPiB7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgIXRoaXMuX2dyaWRPcHRpb25zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXHJcbiAgICAgIEFuZ3VsYXItU2xpY2tncmlkIHJlc2l6ZXIgcmVxdWlyZXMgYSB2YWxpZCBHcmlkIG9iamVjdCBhbmQgR3JpZCBPcHRpb25zIGRlZmluZWQuXHJcbiAgICAgIFlvdSBjYW4gZml4IHRoaXMgYnkgc2V0dGluZyB5b3VyIGdyaWRPcHRpb24gdG8gdXNlIFwiZW5hYmxlQXV0b1Jlc2l6ZVwiIG9yIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgUmVzaXplclNlcnZpY2UgYnkgY2FsbGluZyBhdHRhY2hBdXRvUmVzaXplRGF0YUdyaWQoKWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAvLyBiZWNhdXNlIG9mIHRoZSBqYXZhc2NyaXB0IGFzeW5jIG5hdHVyZSwgd2UgbWlnaHQgd2FudCB0byBkZWxheSB0aGUgcmVzaXplIGEgbGl0dGxlIGJpdFxyXG4gICAgICBkZWxheSA9IGRlbGF5IHx8IDA7XHJcblxyXG4gICAgICBpZiAoZGVsYXkgPiAwKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcclxuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXMpO1xyXG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLl9sYXN0RGltZW5zaW9ucyk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzKTtcclxuICAgICAgICByZXNvbHZlKHRoaXMuX2xhc3REaW1lbnNpb25zKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogR3JpZERpbWVuc2lvbiB7XHJcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGF2YWlsYWJsZSBzaXplcyB3aXRoIG1pbmltdW0gaGVpZ2h0IGRlZmluZWQgYXMgYSBjb25zdGFudFxyXG4gICAgY29uc3QgYXZhaWxhYmxlRGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnModGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zLmdyaWRJZH1gKSB8fCB7fTtcclxuICAgIGNvbnN0IGdyaWRDb250YWluZXJFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCkgfHwge307XHJcblxyXG4gICAgaWYgKChuZXdTaXplcyB8fCBhdmFpbGFibGVEaW1lbnNpb25zKSAmJiBncmlkRWxtLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gZ2V0IHRoZSBuZXcgc2l6ZXMsIGlmIG5ldyBzaXplcyBhcmUgcGFzc2VkIChub3QgMCksIHdlIHdpbGwgdXNlIHRoZW0gZWxzZSB1c2UgYXZhaWxhYmxlIHNwYWNlXHJcbiAgICAgIC8vIGJhc2ljYWxseSBpZiB1c2VyIHBhc3NlcyAxIG9mIHRoZSBkaW1lbnNpb24sIGxldCBzYXkgaGUgcGFzc2VzIGp1c3QgdGhlIGhlaWdodCxcclxuICAgICAgLy8gd2Ugd2lsbCB1c2UgdGhlIGhlaWdodCBhcyBhIGZpeGVkIGhlaWdodCBidXQgdGhlIHdpZHRoIHdpbGwgYmUgcmVzaXplZCBieSBpdCdzIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSAobmV3U2l6ZXMgJiYgbmV3U2l6ZXMuaGVpZ2h0KSA/IG5ld1NpemVzLmhlaWdodCA6IGF2YWlsYWJsZURpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICBjb25zdCBuZXdXaWR0aCA9IChuZXdTaXplcyAmJiBuZXdTaXplcy53aWR0aCkgPyBuZXdTaXplcy53aWR0aCA6IGF2YWlsYWJsZURpbWVuc2lvbnMud2lkdGg7XHJcblxyXG4gICAgICAvLyBhcHBseSB0aGVzZSBuZXcgaGVpZ2h0L3dpZHRoIHRvIHRoZSBkYXRhZ3JpZFxyXG4gICAgICBncmlkRWxtLmhlaWdodChuZXdIZWlnaHQpO1xyXG4gICAgICBncmlkRWxtLndpZHRoKG5ld1dpZHRoKTtcclxuICAgICAgZ3JpZENvbnRhaW5lckVsbS5oZWlnaHQobmV3SGVpZ2h0KTtcclxuICAgICAgZ3JpZENvbnRhaW5lckVsbS53aWR0aChuZXdXaWR0aCk7XHJcblxyXG4gICAgICAvLyByZXNpemUgdGhlIHNsaWNrZ3JpZCBjYW52YXMgb24gYWxsIGJyb3dzZXIgZXhjZXB0IHNvbWUgSUUgdmVyc2lvbnNcclxuICAgICAgLy8gZXhjbHVkZSBhbGwgSUUgYmVsb3cgSUUxMVxyXG4gICAgICAvLyBJRTExIHdhbnRzIHRvIGJlIGEgYmV0dGVyIHN0YW5kYXJkIChXM0MpIGZvbGxvd2VyIChmaW5hbGx5KSB0aGV5IGV2ZW4gY2hhbmdlZCB0aGVpciBhcHBOYW1lIG91dHB1dCB0byBhbHNvIGhhdmUgJ05ldHNjYXBlJ1xyXG4gICAgICBpZiAobmV3IFJlZ0V4cCgnTVNJRSBbNi04XScpLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgPT09IG51bGwgJiYgdGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLnJlc2l6ZUNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuX2dyaWQucmVzaXplQ2FudmFzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFsc28gY2FsbCB0aGUgZ3JpZCBhdXRvLXNpemUgY29sdW1ucyBzbyB0aGF0IGl0IHRha2VzIGF2YWlsYWJsZSB3aGVuIGdvaW5nIGJpZ2dlclxyXG4gICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zICYmIHR5cGVvZiB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucykge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBncmlkIHN0aWxsIGV4aXN0IChieSBsb29raW5nIGlmIHRoZSBHcmlkIFVJRCBpcyBmb3VuZCBpbiB0aGUgRE9NIHRyZWUpIHRvIGF2b2lkIFNsaWNrR3JpZCBlcnJvciBcIm1pc3Npbmcgc3R5bGVzaGVldFwiXHJcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRVaWQgJiYgJChgLiR7dGhpcy5fZ3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdFxyXG4gICAgICAgIHRoaXMuY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwodGhpcy5fZ3JpZCwgdGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBrZWVwIGxhc3QgcmVzaXplZCBkaW1lbnNpb25zICYgcmVzb2x2ZSB0aGVtIHRvIHRoZSBQcm9taXNlXHJcbiAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiBuZXdXaWR0aFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xyXG4gICAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zLmhlaWdodFdpdGhQYWdpbmF0aW9uID0gbmV3SGVpZ2h0ICsgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==