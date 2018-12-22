/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';
// global constants, height/width are in pixels
/** @type {?} */
const DATAGRID_MIN_HEIGHT = 180;
/** @type {?} */
const DATAGRID_MIN_WIDTH = 300;
/** @type {?} */
const DATAGRID_BOTTOM_PADDING = 20;
/** @type {?} */
const DATAGRID_PAGINATION_HEIGHT = 35;
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
export class ResizerService {
    constructor() {
        this.onGridBeforeResize = new Subject();
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
     * @private
     * @return {?}
     */
    get _gridUid() {
        return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions.gridId;
    }
    /**
     * @param {?} grid
     * @param {?=} fixedDimensions
     * @return {?}
     */
    init(grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    }
    /**
     * Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     * @param {?=} newSizes
     * @return {?}
     */
    attachAutoResizeDataGrid(newSizes) {
        // if we can't find the grid to resize, return without attaching anything
        /** @type {?} */
        const gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on(`resize.grid.${this._gridUid}`, () => {
            this.onGridBeforeResize.next(true);
            this.resizeGrid(0, newSizes);
        });
    }
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     * @param {?} gridOptions
     * @return {?}
     */
    calculateGridNewDimensions(gridOptions) {
        /** @type {?} */
        const gridDomElm = $(`#${gridOptions.gridId}`);
        /** @type {?} */
        const autoResizeOptions = gridOptions && gridOptions.autoResize;
        /** @type {?} */
        const containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $(`#${autoResizeOptions.containerId}`) : $(`#${gridOptions.gridContainerId}`);
        /** @type {?} */
        const windowElm = $(window);
        if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        /** @type {?} */
        let bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        /** @type {?} */
        const gridHeight = windowElm.height() || 0;
        /** @type {?} */
        const coordOffsetTop = gridDomElm.offset();
        /** @type {?} */
        const gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        /** @type {?} */
        const availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        /** @type {?} */
        const availableWidth = containerElm.width() || 0;
        /** @type {?} */
        const maxHeight = (autoResizeOptions && autoResizeOptions.maxHeight && autoResizeOptions.maxHeight > 0) ? autoResizeOptions.maxHeight : undefined;
        /** @type {?} */
        const minHeight = (autoResizeOptions && autoResizeOptions.minHeight && autoResizeOptions.minHeight < 0) ? autoResizeOptions.minHeight : DATAGRID_MIN_HEIGHT;
        /** @type {?} */
        const maxWidth = (autoResizeOptions && autoResizeOptions.maxWidth && autoResizeOptions.maxWidth > 0) ? autoResizeOptions.maxWidth : undefined;
        /** @type {?} */
        const minWidth = (autoResizeOptions && autoResizeOptions.minWidth && autoResizeOptions.minWidth < 0) ? autoResizeOptions.minWidth : DATAGRID_MIN_WIDTH;
        /** @type {?} */
        let newHeight = availableHeight;
        /** @type {?} */
        let newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
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
    }
    /**
     * Dispose function when element is destroyed
     * @return {?}
     */
    dispose() {
        $(window).off(`resize.grid.${this._gridUid}`);
    }
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     * @param {?} grid
     * @param {?} gridOptions
     * @return {?}
     */
    compensateHorizontalScroll(grid, gridOptions) {
        /** @type {?} */
        const gridElm = $(`#${gridOptions.gridId}`);
        /** @type {?} */
        const scrollbarDimensions = grid && grid.getScrollbarDimensions();
        /** @type {?} */
        const slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        /** @type {?} */
        const calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    }
    /**
     * Return the last resize dimensions used by the service
     * @return {?} last dimensions
     */
    getLastResizeDimensions() {
        return this._lastDimensions;
    }
    /**
     * Resize the datagrid to fit the browser height & width
     * @param {?=} delay
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGrid(delay = 10, newSizes) {
        if (!this._grid || !this._gridOptions) {
            throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()`);
        }
        return new Promise((resolve) => {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(this._timer);
                this._timer = setTimeout(() => {
                    this.resizeGridWithDimensions(newSizes);
                    resolve(this._lastDimensions);
                }, delay);
            }
            else {
                this.resizeGridWithDimensions(newSizes);
                resolve(this._lastDimensions);
            }
        });
    }
    /**
     * @param {?=} newSizes
     * @return {?}
     */
    resizeGridWithDimensions(newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        /** @type {?} */
        const availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        /** @type {?} */
        const gridElm = $(`#${this._gridOptions.gridId}`) || {};
        /** @type {?} */
        const gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            /** @type {?} */
            const newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            /** @type {?} */
            const newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
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
                if (this._gridUid && $(`.${this._gridUid}`).length > 0) {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7TUFNekIsbUJBQW1CLEdBQUcsR0FBRzs7TUFDekIsa0JBQWtCLEdBQUcsR0FBRzs7TUFDeEIsdUJBQXVCLEdBQUcsRUFBRTs7TUFDNUIsMEJBQTBCLEdBQUcsRUFBRTs7OztBQUVyQyxtQ0FJQzs7O0lBSEMsK0JBQWU7O0lBQ2YsOEJBQWM7O0lBQ2QsNkNBQThCOztBQUdoQyxNQUFNLE9BQU8sY0FBYztJQUEzQjtRQU1FLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUE2TTlDLENBQUM7Ozs7OztJQTFNQyxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBRUQsSUFBWSxRQUFRO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQzVGLENBQUM7Ozs7OztJQUVELElBQUksQ0FBQyxJQUFTLEVBQUUsZUFBK0I7UUFDN0MsSUFBSSxDQUFDLEtBQUss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LElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7Ozs7OztJQWxOQyxzQ0FBb0M7Ozs7O0lBQ3BDLHFDQUFtQzs7Ozs7SUFDbkMsK0JBQW1COzs7OztJQUNuQix5Q0FBdUM7Ozs7O0lBQ3ZDLGdDQUFvQjs7SUFDcEIsNENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZ2V0U2Nyb2xsQmFyV2lkdGggfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLy8gZ2xvYmFsIGNvbnN0YW50cywgaGVpZ2h0L3dpZHRoIGFyZSBpbiBwaXhlbHNcclxuY29uc3QgREFUQUdSSURfTUlOX0hFSUdIVCA9IDE4MDtcclxuY29uc3QgREFUQUdSSURfTUlOX1dJRFRIID0gMzAwO1xyXG5jb25zdCBEQVRBR1JJRF9CT1RUT01fUEFERElORyA9IDIwO1xyXG5jb25zdCBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVCA9IDM1O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkRGltZW5zaW9uIHtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodFdpdGhQYWdpbmF0aW9uPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzaXplclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2ZpeGVkSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpeGVkV2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX2xhc3REaW1lbnNpb25zOiBHcmlkRGltZW5zaW9uO1xyXG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XHJcbiAgb25HcmlkQmVmb3JlUmVzaXplID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBfZ3JpZFVpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0VUlEKSA/IHRoaXMuX2dyaWQuZ2V0VUlEKCkgOiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQ7XHJcbiAgfVxyXG5cclxuICBpbml0KGdyaWQ6IGFueSwgZml4ZWREaW1lbnNpb25zPzogR3JpZERpbWVuc2lvbik6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICBpZiAoZml4ZWREaW1lbnNpb25zKSB7XHJcbiAgICAgIHRoaXMuX2ZpeGVkSGVpZ2h0ID0gZml4ZWREaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgdGhpcy5fZml4ZWRXaWR0aCA9IGZpeGVkRGltZW5zaW9ucy53aWR0aDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBBdHRhY2ggYW4gYXV0byByZXNpemUgdHJpZ2dlciBvbiB0aGUgZGF0YWdyaWQsIGlmIHRoYXQgaXMgZW5hYmxlIHRoZW4gaXQgd2lsbCByZXNpemUgaXRzZWxmIHRvIHRoZSBhdmFpbGFibGUgc3BhY2VcclxuICAgKiBPcHRpb25zOiB3ZSBjb3VsZCBhbHNvIHByb3ZpZGUgYSAlIGZhY3RvciB0byByZXNpemUgb24gZWFjaCBoZWlnaHQvd2lkdGggaW5kZXBlbmRlbnRseVxyXG4gICAqL1xyXG4gIGF0dGFjaEF1dG9SZXNpemVEYXRhR3JpZChuZXdTaXplcz86IEdyaWREaW1lbnNpb24pIHtcclxuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgdGhlIGdyaWQgdG8gcmVzaXplLCByZXR1cm4gd2l0aG91dCBhdHRhY2hpbmcgYW55dGhpbmdcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgPyB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgOiAnZ3JpZDEnfWApO1xyXG4gICAgaWYgKGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCB8fCBncmlkRG9tRWxtLm9mZnNldCgpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0gMXN0IHJlc2l6ZSB0aGUgZGF0YWdyaWQgc2l6ZSBhdCBmaXJzdCBsb2FkICh3ZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgLm9uIGV2ZW50IGlzIG5vdCB0cmlnZ2VyZWQgb24gZmlyc3QgbG9hZClcclxuICAgIC8vIC0tIGFsc28gd2UgYWRkIGEgc2xpZ2h0IGRlbGF5IChpbiBtcykgc28gdGhhdCB3ZSByZXNpemUgYWZ0ZXIgdGhlIGdyaWQgcmVuZGVyIGlzIGRvbmVcclxuICAgIHRoaXMucmVzaXplR3JpZCgxMCwgbmV3U2l6ZXMpO1xyXG5cclxuICAgIC8vIC0tIDJuZCBhdHRhY2ggYSB0cmlnZ2VyIG9uIHRoZSBXaW5kb3cgRE9NIGVsZW1lbnQsIHNvIHRoYXQgaXQgaGFwcGVucyBhbHNvIHdoZW4gcmVzaXppbmcgYWZ0ZXIgZmlyc3QgbG9hZFxyXG4gICAgLy8gLS0gYXR0YWNoIGF1dG8tcmVzaXplIHRvIFdpbmRvdyBvYmplY3Qgb25seSBpZiBpdCBleGlzdFxyXG4gICAgJCh3aW5kb3cpLm9uKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCwgKCkgPT4ge1xyXG4gICAgICB0aGlzLm9uR3JpZEJlZm9yZVJlc2l6ZS5uZXh0KHRydWUpO1xyXG4gICAgICB0aGlzLnJlc2l6ZUdyaWQoMCwgbmV3U2l6ZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgdGhlIGRhdGFncmlkIG5ldyBoZWlnaHQvd2lkdGggZnJvbSB0aGUgYXZhaWxhYmxlIHNwYWNlLCBhbHNvIGNvbnNpZGVyIHRoYXQgYSAlIGZhY3RvciBtaWdodCBiZSBhcHBsaWVkIHRvIGNhbGN1bGF0aW9uXHJcbiAgICogb2JqZWN0IGdyaWRPcHRpb25zXHJcbiAgICovXHJcbiAgY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnMoZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pOiBHcmlkRGltZW5zaW9uIHwgbnVsbCB7XHJcbiAgICBjb25zdCBncmlkRG9tRWxtID0gJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZElkfWApO1xyXG4gICAgY29uc3QgYXV0b1Jlc2l6ZU9wdGlvbnMgPSBncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5hdXRvUmVzaXplO1xyXG4gICAgY29uc3QgY29udGFpbmVyRWxtID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLmNvbnRhaW5lcklkKSA/ICQoYCMke2F1dG9SZXNpemVPcHRpb25zLmNvbnRhaW5lcklkfWApIDogJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkfWApO1xyXG4gICAgY29uc3Qgd2luZG93RWxtID0gJCh3aW5kb3cpO1xyXG4gICAgaWYgKHdpbmRvd0VsbSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRhaW5lckVsbSA9PT0gdW5kZWZpbmVkIHx8IGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxjdWxhdGUgYm90dG9tIHBhZGRpbmdcclxuICAgIC8vIGlmIHVzaW5nIHBhZ2luYXRpb24sIHdlIG5lZWQgdG8gYWRkIHRoZSBwYWdpbmF0aW9uIGhlaWdodCB0byB0aGlzIGJvdHRvbSBwYWRkaW5nXHJcbiAgICBsZXQgYm90dG9tUGFkZGluZyA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5ib3R0b21QYWRkaW5nKSA/IGF1dG9SZXNpemVPcHRpb25zLmJvdHRvbVBhZGRpbmcgOiBEQVRBR1JJRF9CT1RUT01fUEFERElORztcclxuICAgIGlmIChib3R0b21QYWRkaW5nICYmIChncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xyXG4gICAgICBib3R0b21QYWRkaW5nICs9IERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdyaWRIZWlnaHQgPSB3aW5kb3dFbG0uaGVpZ2h0KCkgfHwgMDtcclxuICAgIGNvbnN0IGNvb3JkT2Zmc2V0VG9wID0gZ3JpZERvbUVsbS5vZmZzZXQoKTtcclxuICAgIGNvbnN0IGdyaWRPZmZzZXRUb3AgPSAoY29vcmRPZmZzZXRUb3AgIT09IHVuZGVmaW5lZCkgPyBjb29yZE9mZnNldFRvcC50b3AgOiAwO1xyXG4gICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gZ3JpZEhlaWdodCAtIGdyaWRPZmZzZXRUb3AgLSBib3R0b21QYWRkaW5nO1xyXG4gICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSBjb250YWluZXJFbG0ud2lkdGgoKSB8fCAwO1xyXG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1heEhlaWdodCAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhIZWlnaHQgPiAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1heEhlaWdodCA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG1pbkhlaWdodCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5IZWlnaHQgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluSGVpZ2h0IDwgMCkgPyBhdXRvUmVzaXplT3B0aW9ucy5taW5IZWlnaHQgOiBEQVRBR1JJRF9NSU5fSEVJR0hUO1xyXG4gICAgY29uc3QgbWF4V2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggPiAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1heFdpZHRoIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbWluV2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggPCAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1pbldpZHRoIDogREFUQUdSSURfTUlOX1dJRFRIO1xyXG5cclxuICAgIGxldCBuZXdIZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQ7XHJcbiAgICBsZXQgbmV3V2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuc2lkZVBhZGRpbmcpID8gYXZhaWxhYmxlV2lkdGggLSBhdXRvUmVzaXplT3B0aW9ucy5zaWRlUGFkZGluZyA6IGF2YWlsYWJsZVdpZHRoO1xyXG5cclxuICAgIC8vIG9wdGlvbmFsbHkgKHdoZW4gZGVmaW5lZCksIG1ha2Ugc3VyZSB0aGF0IGdyaWQgaGVpZ2h0ICYgd2lkdGggYXJlIHdpdGhpbiB0aGVpciB0aHJlc2hvbGRzXHJcbiAgICBpZiAobmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XHJcbiAgICAgIG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuICAgIH1cclxuICAgIGlmIChtYXhIZWlnaHQgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgIG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuICAgIGlmIChuZXdXaWR0aCA8IG1pbldpZHRoKSB7XHJcbiAgICAgIG5ld1dpZHRoID0gbWluV2lkdGg7XHJcbiAgICB9XHJcbiAgICBpZiAobWF4V2lkdGggJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xyXG4gICAgICBuZXdXaWR0aCA9IG1heFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiB0aGUgbmV3IGRpbWVuc2lvbnMgdW5sZXNzIGEgZml4ZWQgaGVpZ2h0L3dpZHRoIHdhcyBkZWZpbmVkXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBoZWlnaHQ6IHRoaXMuX2ZpeGVkSGVpZ2h0IHx8IG5ld0hlaWdodCxcclxuICAgICAgd2lkdGg6IHRoaXMuX2ZpeGVkV2lkdGggfHwgbmV3V2lkdGhcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIGZ1bmN0aW9uIHdoZW4gZWxlbWVudCBpcyBkZXN0cm95ZWRcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgJCh3aW5kb3cpLm9mZihgcmVzaXplLmdyaWQuJHt0aGlzLl9ncmlkVWlkfWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9yIHNvbWUgcmVhc29uIHRoaXMgb25seSBzZWVtcyB0byBoYXBwZW4gaW4gQ2hyb21lIGFuZCBpcyBzb21ldGltZSBtaXNjYWxjdWxhdGVkIGJ5IFNsaWNrR3JpZCBtZWFzdXJlU3JvbGxiYXIoKSBtZXRob2RcclxuICAgKiBXaGVuIHRoYXQgaGFwcGVucyB3ZSB3aWxsIGNvbXBlbnNhdGUgYW5kIHJlc2l6ZSB0aGUgR3JpZCBWaWV3cG9ydCB0byBhdm9pZCBzZWVpbmcgaG9yaXpvbnRhbCBzY3JvbGxiYXJcclxuICAgKiBNb3N0IG9mIHRoZSB0aW1lIGl0IGhhcHBlbnMsIGl0J3MgYSB0aW55IG9mZnNldCBjYWxjdWxhdGlvbiBvZiB1c3VhbGx5IDNweCAoZW5vdWdoIHRvIHNob3cgc2Nyb2xsYmFyKVxyXG4gICAqIEdpdEh1YiBpc3N1ZSByZWZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS82cGFjL1NsaWNrR3JpZC9pc3N1ZXMvMjc1XHJcbiAgICovXHJcbiAgY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwoZ3JpZDogYW55LCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke2dyaWRPcHRpb25zLmdyaWRJZH1gKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxiYXJEaW1lbnNpb25zID0gZ3JpZCAmJiBncmlkLmdldFNjcm9sbGJhckRpbWVuc2lvbnMoKTtcclxuICAgIGNvbnN0IHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoID0gc2Nyb2xsYmFyRGltZW5zaW9ucyAmJiBzY3JvbGxiYXJEaW1lbnNpb25zLndpZHRoO1xyXG4gICAgY29uc3QgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsQmFyV2lkdGgoKTtcclxuXHJcbiAgICAgLy8gaWYgc2Nyb2xsYmFyIHdpZHRoIGlzIGRpZmZlcmVudCBmcm9tIFNsaWNrR3JpZCBjYWxjdWxhdGlvbiB0byBvdXIgY3VzdG9tIGNhbGN1bGF0aW9uXHJcbiAgICAvLyB0aGVuIHJlc2l6ZSB0aGUgZ3JpZCB3aXRoIHRoZSBtaXNzaW5nIHBpeGVscyB0byByZW1vdmUgc2Nyb2xsICh1c3VhbGx5IG9ubHkgM3B4KVxyXG4gICAgaWYgKHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoIDwgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoKSB7XHJcbiAgICAgIGdyaWRFbG0ud2lkdGgoZ3JpZEVsbS53aWR0aCgpICsgKGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCAtIHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGxhc3QgcmVzaXplIGRpbWVuc2lvbnMgdXNlZCBieSB0aGUgc2VydmljZVxyXG4gICAqIEByZXR1cm4gbGFzdCBkaW1lbnNpb25zXHJcbiAgICovXHJcbiAgZ2V0TGFzdFJlc2l6ZURpbWVuc2lvbnMoKTogR3JpZERpbWVuc2lvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG5cclxuICAvKiogUmVzaXplIHRoZSBkYXRhZ3JpZCB0byBmaXQgdGhlIGJyb3dzZXIgaGVpZ2h0ICYgd2lkdGggKi9cclxuICByZXNpemVHcmlkKGRlbGF5ID0gMTAsIG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IFByb21pc2U8R3JpZERpbWVuc2lvbj4ge1xyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8ICF0aGlzLl9ncmlkT3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxyXG4gICAgICBBbmd1bGFyLVNsaWNrZ3JpZCByZXNpemVyIHJlcXVpcmVzIGEgdmFsaWQgR3JpZCBvYmplY3QgYW5kIEdyaWQgT3B0aW9ucyBkZWZpbmVkLlxyXG4gICAgICBZb3UgY2FuIGZpeCB0aGlzIGJ5IHNldHRpbmcgeW91ciBncmlkT3B0aW9uIHRvIHVzZSBcImVuYWJsZUF1dG9SZXNpemVcIiBvciBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZXJTZXJ2aWNlIGJ5IGNhbGxpbmcgYXR0YWNoQXV0b1Jlc2l6ZURhdGFHcmlkKClgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgLy8gYmVjYXVzZSBvZiB0aGUgamF2YXNjcmlwdCBhc3luYyBuYXR1cmUsIHdlIG1pZ2h0IHdhbnQgdG8gZGVsYXkgdGhlIHJlc2l6ZSBhIGxpdHRsZSBiaXRcclxuICAgICAgZGVsYXkgPSBkZWxheSB8fCAwO1xyXG5cclxuICAgICAgaWYgKGRlbGF5ID4gMCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzKTtcclxuICAgICAgICAgIHJlc29sdmUodGhpcy5fbGFzdERpbWVuc2lvbnMpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZUdyaWRXaXRoRGltZW5zaW9ucyhuZXdTaXplcyk7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl9sYXN0RGltZW5zaW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IEdyaWREaW1lbnNpb24ge1xyXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBhdmFpbGFibGUgc2l6ZXMgd2l0aCBtaW5pbXVtIGhlaWdodCBkZWZpbmVkIGFzIGEgY29uc3RhbnRcclxuICAgIGNvbnN0IGF2YWlsYWJsZURpbWVuc2lvbnMgPSB0aGlzLmNhbGN1bGF0ZUdyaWROZXdEaW1lbnNpb25zKHRoaXMuX2dyaWRPcHRpb25zKTtcclxuICAgIGNvbnN0IGdyaWRFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWR9YCkgfHwge307XHJcbiAgICBjb25zdCBncmlkQ29udGFpbmVyRWxtID0gJChgIyR7dGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkfWApIHx8IHt9O1xyXG5cclxuICAgIGlmICgobmV3U2l6ZXMgfHwgYXZhaWxhYmxlRGltZW5zaW9ucykgJiYgZ3JpZEVsbS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIGdldCB0aGUgbmV3IHNpemVzLCBpZiBuZXcgc2l6ZXMgYXJlIHBhc3NlZCAobm90IDApLCB3ZSB3aWxsIHVzZSB0aGVtIGVsc2UgdXNlIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAgICAvLyBiYXNpY2FsbHkgaWYgdXNlciBwYXNzZXMgMSBvZiB0aGUgZGltZW5zaW9uLCBsZXQgc2F5IGhlIHBhc3NlcyBqdXN0IHRoZSBoZWlnaHQsXHJcbiAgICAgIC8vIHdlIHdpbGwgdXNlIHRoZSBoZWlnaHQgYXMgYSBmaXhlZCBoZWlnaHQgYnV0IHRoZSB3aWR0aCB3aWxsIGJlIHJlc2l6ZWQgYnkgaXQncyBhdmFpbGFibGUgc3BhY2VcclxuICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gKG5ld1NpemVzICYmIG5ld1NpemVzLmhlaWdodCkgPyBuZXdTaXplcy5oZWlnaHQgOiBhdmFpbGFibGVEaW1lbnNpb25zLmhlaWdodDtcclxuICAgICAgY29uc3QgbmV3V2lkdGggPSAobmV3U2l6ZXMgJiYgbmV3U2l6ZXMud2lkdGgpID8gbmV3U2l6ZXMud2lkdGggOiBhdmFpbGFibGVEaW1lbnNpb25zLndpZHRoO1xyXG5cclxuICAgICAgLy8gYXBwbHkgdGhlc2UgbmV3IGhlaWdodC93aWR0aCB0byB0aGUgZGF0YWdyaWRcclxuICAgICAgZ3JpZEVsbS5oZWlnaHQobmV3SGVpZ2h0KTtcclxuICAgICAgZ3JpZEVsbS53aWR0aChuZXdXaWR0aCk7XHJcbiAgICAgIGdyaWRDb250YWluZXJFbG0uaGVpZ2h0KG5ld0hlaWdodCk7XHJcbiAgICAgIGdyaWRDb250YWluZXJFbG0ud2lkdGgobmV3V2lkdGgpO1xyXG5cclxuICAgICAgLy8gcmVzaXplIHRoZSBzbGlja2dyaWQgY2FudmFzIG9uIGFsbCBicm93c2VyIGV4Y2VwdCBzb21lIElFIHZlcnNpb25zXHJcbiAgICAgIC8vIGV4Y2x1ZGUgYWxsIElFIGJlbG93IElFMTFcclxuICAgICAgLy8gSUUxMSB3YW50cyB0byBiZSBhIGJldHRlciBzdGFuZGFyZCAoVzNDKSBmb2xsb3dlciAoZmluYWxseSkgdGhleSBldmVuIGNoYW5nZWQgdGhlaXIgYXBwTmFtZSBvdXRwdXQgdG8gYWxzbyBoYXZlICdOZXRzY2FwZSdcclxuICAgICAgaWYgKG5ldyBSZWdFeHAoJ01TSUUgWzYtOF0nKS5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09PSBudWxsICYmIHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMpIHtcclxuICAgICAgICB0aGlzLl9ncmlkLnJlc2l6ZUNhbnZhcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhbHNvIGNhbGwgdGhlIGdyaWQgYXV0by1zaXplIGNvbHVtbnMgc28gdGhhdCBpdCB0YWtlcyBhdmFpbGFibGUgd2hlbiBnb2luZyBiaWdnZXJcclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucyAmJiB0eXBlb2YgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgZ3JpZCBzdGlsbCBleGlzdCAoYnkgbG9va2luZyBpZiB0aGUgR3JpZCBVSUQgaXMgZm91bmQgaW4gdGhlIERPTSB0cmVlKSB0byBhdm9pZCBTbGlja0dyaWQgZXJyb3IgXCJtaXNzaW5nIHN0eWxlc2hlZXRcIlxyXG4gICAgICAgIGlmICh0aGlzLl9ncmlkVWlkICYmICQoYC4ke3RoaXMuX2dyaWRVaWR9YCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbXBlbnNhdGUgYW55dGltZSBTbGlja0dyaWQgbWVhc3VyZVNjcm9sbGJhciBpcyBpbmNvcnJlY3RcclxuICAgICAgICB0aGlzLmNvbXBlbnNhdGVIb3Jpem9udGFsU2Nyb2xsKHRoaXMuX2dyaWQsIHRoaXMuX2dyaWRPcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8ga2VlcCBsYXN0IHJlc2l6ZWQgZGltZW5zaW9ucyAmIHJlc29sdmUgdGhlbSB0byB0aGUgUHJvbWlzZVxyXG4gICAgICB0aGlzLl9sYXN0RGltZW5zaW9ucyA9IHtcclxuICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodCxcclxuICAgICAgICB3aWR0aDogbmV3V2lkdGhcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICgodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkpIHtcclxuICAgICAgICB0aGlzLl9sYXN0RGltZW5zaW9ucy5oZWlnaHRXaXRoUGFnaW5hdGlvbiA9IG5ld0hlaWdodCArIERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REaW1lbnNpb25zO1xyXG4gIH1cclxufVxyXG4iXX0=