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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7TUFNekIsbUJBQW1CLEdBQUcsR0FBRzs7TUFDekIsa0JBQWtCLEdBQUcsR0FBRzs7TUFDeEIsdUJBQXVCLEdBQUcsRUFBRTs7TUFDNUIsMEJBQTBCLEdBQUcsRUFBRTs7OztBQUVyQyxtQ0FJQzs7O0lBSEMsK0JBQWU7O0lBQ2YsOEJBQWM7O0lBQ2QsNkNBQThCOztBQUdoQyxNQUFNLE9BQU8sY0FBYztJQUEzQjtRQU1FLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUE2TTlDLENBQUM7Ozs7OztJQTFNQyxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7Ozs7O0lBRUQsSUFBWSxRQUFRO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQzVGLENBQUM7Ozs7OztJQUVELElBQUksQ0FBQyxJQUFTLEVBQUUsZUFBK0I7UUFDN0MsSUFBSSxDQUFDLEtBQUss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LElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7Ozs7OztJQWxOQyxzQ0FBb0M7Ozs7O0lBQ3BDLHFDQUFtQzs7Ozs7SUFDbkMsK0JBQW1COzs7OztJQUNuQix5Q0FBdUM7Ozs7O0lBQ3ZDLGdDQUFvQjs7SUFDcEIsNENBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGdldFNjcm9sbEJhcldpZHRoIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbi8vIGdsb2JhbCBjb25zdGFudHMsIGhlaWdodC93aWR0aCBhcmUgaW4gcGl4ZWxzXG5jb25zdCBEQVRBR1JJRF9NSU5fSEVJR0hUID0gMTgwO1xuY29uc3QgREFUQUdSSURfTUlOX1dJRFRIID0gMzAwO1xuY29uc3QgREFUQUdSSURfQk9UVE9NX1BBRERJTkcgPSAyMDtcbmNvbnN0IERBVEFHUklEX1BBR0lOQVRJT05fSEVJR0hUID0gMzU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZERpbWVuc2lvbiB7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHRXaXRoUGFnaW5hdGlvbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFJlc2l6ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZml4ZWRIZWlnaHQ6IG51bWJlciB8IG51bGw7XG4gIHByaXZhdGUgX2ZpeGVkV2lkdGg6IG51bWJlciB8IG51bGw7XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBfbGFzdERpbWVuc2lvbnM6IEdyaWREaW1lbnNpb247XG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XG4gIG9uR3JpZEJlZm9yZVJlc2l6ZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IF9ncmlkVWlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0VUlEKSA/IHRoaXMuX2dyaWQuZ2V0VUlEKCkgOiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQ7XG4gIH1cblxuICBpbml0KGdyaWQ6IGFueSwgZml4ZWREaW1lbnNpb25zPzogR3JpZERpbWVuc2lvbik6IHZvaWQge1xuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xuICAgIGlmIChmaXhlZERpbWVuc2lvbnMpIHtcbiAgICAgIHRoaXMuX2ZpeGVkSGVpZ2h0ID0gZml4ZWREaW1lbnNpb25zLmhlaWdodDtcbiAgICAgIHRoaXMuX2ZpeGVkV2lkdGggPSBmaXhlZERpbWVuc2lvbnMud2lkdGg7XG4gICAgfVxuICB9XG5cbiAgLyoqIEF0dGFjaCBhbiBhdXRvIHJlc2l6ZSB0cmlnZ2VyIG9uIHRoZSBkYXRhZ3JpZCwgaWYgdGhhdCBpcyBlbmFibGUgdGhlbiBpdCB3aWxsIHJlc2l6ZSBpdHNlbGYgdG8gdGhlIGF2YWlsYWJsZSBzcGFjZVxuICAgKiBPcHRpb25zOiB3ZSBjb3VsZCBhbHNvIHByb3ZpZGUgYSAlIGZhY3RvciB0byByZXNpemUgb24gZWFjaCBoZWlnaHQvd2lkdGggaW5kZXBlbmRlbnRseVxuICAgKi9cbiAgYXR0YWNoQXV0b1Jlc2l6ZURhdGFHcmlkKG5ld1NpemVzPzogR3JpZERpbWVuc2lvbikge1xuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgdGhlIGdyaWQgdG8gcmVzaXplLCByZXR1cm4gd2l0aG91dCBhdHRhY2hpbmcgYW55dGhpbmdcbiAgICBjb25zdCBncmlkRG9tRWxtID0gJChgIyR7dGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZElkID8gdGhpcy5fZ3JpZE9wdGlvbnMuZ3JpZElkIDogJ2dyaWQxJ31gKTtcbiAgICBpZiAoZ3JpZERvbUVsbSA9PT0gdW5kZWZpbmVkIHx8IGdyaWREb21FbG0ub2Zmc2V0KCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gLS0gMXN0IHJlc2l6ZSB0aGUgZGF0YWdyaWQgc2l6ZSBhdCBmaXJzdCBsb2FkICh3ZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgLm9uIGV2ZW50IGlzIG5vdCB0cmlnZ2VyZWQgb24gZmlyc3QgbG9hZClcbiAgICAvLyAtLSBhbHNvIHdlIGFkZCBhIHNsaWdodCBkZWxheSAoaW4gbXMpIHNvIHRoYXQgd2UgcmVzaXplIGFmdGVyIHRoZSBncmlkIHJlbmRlciBpcyBkb25lXG4gICAgdGhpcy5yZXNpemVHcmlkKDEwLCBuZXdTaXplcyk7XG5cbiAgICAvLyAtLSAybmQgYXR0YWNoIGEgdHJpZ2dlciBvbiB0aGUgV2luZG93IERPTSBlbGVtZW50LCBzbyB0aGF0IGl0IGhhcHBlbnMgYWxzbyB3aGVuIHJlc2l6aW5nIGFmdGVyIGZpcnN0IGxvYWRcbiAgICAvLyAtLSBhdHRhY2ggYXV0by1yZXNpemUgdG8gV2luZG93IG9iamVjdCBvbmx5IGlmIGl0IGV4aXN0XG4gICAgJCh3aW5kb3cpLm9uKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCwgKCkgPT4ge1xuICAgICAgdGhpcy5vbkdyaWRCZWZvcmVSZXNpemUubmV4dCh0cnVlKTtcbiAgICAgIHRoaXMucmVzaXplR3JpZCgwLCBuZXdTaXplcyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBkYXRhZ3JpZCBuZXcgaGVpZ2h0L3dpZHRoIGZyb20gdGhlIGF2YWlsYWJsZSBzcGFjZSwgYWxzbyBjb25zaWRlciB0aGF0IGEgJSBmYWN0b3IgbWlnaHQgYmUgYXBwbGllZCB0byBjYWxjdWxhdGlvblxuICAgKiBvYmplY3QgZ3JpZE9wdGlvbnNcbiAgICovXG4gIGNhbGN1bGF0ZUdyaWROZXdEaW1lbnNpb25zKGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKTogR3JpZERpbWVuc2lvbiB8IG51bGwge1xuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YCk7XG4gICAgY29uc3QgYXV0b1Jlc2l6ZU9wdGlvbnMgPSBncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5hdXRvUmVzaXplO1xuICAgIGNvbnN0IGNvbnRhaW5lckVsbSA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5jb250YWluZXJJZCkgPyAkKGAjJHthdXRvUmVzaXplT3B0aW9ucy5jb250YWluZXJJZH1gKSA6ICQoYCMke2dyaWRPcHRpb25zLmdyaWRDb250YWluZXJJZH1gKTtcbiAgICBjb25zdCB3aW5kb3dFbG0gPSAkKHdpbmRvdyk7XG4gICAgaWYgKHdpbmRvd0VsbSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRhaW5lckVsbSA9PT0gdW5kZWZpbmVkIHx8IGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIGJvdHRvbSBwYWRkaW5nXG4gICAgLy8gaWYgdXNpbmcgcGFnaW5hdGlvbiwgd2UgbmVlZCB0byBhZGQgdGhlIHBhZ2luYXRpb24gaGVpZ2h0IHRvIHRoaXMgYm90dG9tIHBhZGRpbmdcbiAgICBsZXQgYm90dG9tUGFkZGluZyA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5ib3R0b21QYWRkaW5nKSA/IGF1dG9SZXNpemVPcHRpb25zLmJvdHRvbVBhZGRpbmcgOiBEQVRBR1JJRF9CT1RUT01fUEFERElORztcbiAgICBpZiAoYm90dG9tUGFkZGluZyAmJiAoZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkpIHtcbiAgICAgIGJvdHRvbVBhZGRpbmcgKz0gREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZEhlaWdodCA9IHdpbmRvd0VsbS5oZWlnaHQoKSB8fCAwO1xuICAgIGNvbnN0IGNvb3JkT2Zmc2V0VG9wID0gZ3JpZERvbUVsbS5vZmZzZXQoKTtcbiAgICBjb25zdCBncmlkT2Zmc2V0VG9wID0gKGNvb3JkT2Zmc2V0VG9wICE9PSB1bmRlZmluZWQpID8gY29vcmRPZmZzZXRUb3AudG9wIDogMDtcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBncmlkSGVpZ2h0IC0gZ3JpZE9mZnNldFRvcCAtIGJvdHRvbVBhZGRpbmc7XG4gICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSBjb250YWluZXJFbG0ud2lkdGgoKSB8fCAwO1xuICAgIGNvbnN0IG1heEhlaWdodCA9IChhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhIZWlnaHQgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4SGVpZ2h0ID4gMCkgPyBhdXRvUmVzaXplT3B0aW9ucy5tYXhIZWlnaHQgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbWluSGVpZ2h0ID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbkhlaWdodCAmJiBhdXRvUmVzaXplT3B0aW9ucy5taW5IZWlnaHQgPCAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1pbkhlaWdodCA6IERBVEFHUklEX01JTl9IRUlHSFQ7XG4gICAgY29uc3QgbWF4V2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWF4V2lkdGggPiAwKSA/IGF1dG9SZXNpemVPcHRpb25zLm1heFdpZHRoIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG1pbldpZHRoID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbldpZHRoICYmIGF1dG9SZXNpemVPcHRpb25zLm1pbldpZHRoIDwgMCkgPyBhdXRvUmVzaXplT3B0aW9ucy5taW5XaWR0aCA6IERBVEFHUklEX01JTl9XSURUSDtcblxuICAgIGxldCBuZXdIZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQ7XG4gICAgbGV0IG5ld1dpZHRoID0gKGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLnNpZGVQYWRkaW5nKSA/IGF2YWlsYWJsZVdpZHRoIC0gYXV0b1Jlc2l6ZU9wdGlvbnMuc2lkZVBhZGRpbmcgOiBhdmFpbGFibGVXaWR0aDtcblxuICAgIC8vIG9wdGlvbmFsbHkgKHdoZW4gZGVmaW5lZCksIG1ha2Ugc3VyZSB0aGF0IGdyaWQgaGVpZ2h0ICYgd2lkdGggYXJlIHdpdGhpbiB0aGVpciB0aHJlc2hvbGRzXG4gICAgaWYgKG5ld0hlaWdodCA8IG1pbkhlaWdodCkge1xuICAgICAgbmV3SGVpZ2h0ID0gbWluSGVpZ2h0O1xuICAgIH1cbiAgICBpZiAobWF4SGVpZ2h0ICYmIG5ld0hlaWdodCA+IG1heEhlaWdodCkge1xuICAgICAgbmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgIH1cbiAgICBpZiAobmV3V2lkdGggPCBtaW5XaWR0aCkge1xuICAgICAgbmV3V2lkdGggPSBtaW5XaWR0aDtcbiAgICB9XG4gICAgaWYgKG1heFdpZHRoICYmIG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcbiAgICAgIG5ld1dpZHRoID0gbWF4V2lkdGg7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHRoZSBuZXcgZGltZW5zaW9ucyB1bmxlc3MgYSBmaXhlZCBoZWlnaHQvd2lkdGggd2FzIGRlZmluZWRcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiB0aGlzLl9maXhlZEhlaWdodCB8fCBuZXdIZWlnaHQsXG4gICAgICB3aWR0aDogdGhpcy5fZml4ZWRXaWR0aCB8fCBuZXdXaWR0aFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSBmdW5jdGlvbiB3aGVuIGVsZW1lbnQgaXMgZGVzdHJveWVkXG4gICAqL1xuICBkaXNwb3NlKCkge1xuICAgICQod2luZG93KS5vZmYoYHJlc2l6ZS5ncmlkLiR7dGhpcy5fZ3JpZFVpZH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3Igc29tZSByZWFzb24gdGhpcyBvbmx5IHNlZW1zIHRvIGhhcHBlbiBpbiBDaHJvbWUgYW5kIGlzIHNvbWV0aW1lIG1pc2NhbGN1bGF0ZWQgYnkgU2xpY2tHcmlkIG1lYXN1cmVTcm9sbGJhcigpIG1ldGhvZFxuICAgKiBXaGVuIHRoYXQgaGFwcGVucyB3ZSB3aWxsIGNvbXBlbnNhdGUgYW5kIHJlc2l6ZSB0aGUgR3JpZCBWaWV3cG9ydCB0byBhdm9pZCBzZWVpbmcgaG9yaXpvbnRhbCBzY3JvbGxiYXJcbiAgICogTW9zdCBvZiB0aGUgdGltZSBpdCBoYXBwZW5zLCBpdCdzIGEgdGlueSBvZmZzZXQgY2FsY3VsYXRpb24gb2YgdXN1YWxseSAzcHggKGVub3VnaCB0byBzaG93IHNjcm9sbGJhcilcbiAgICogR2l0SHViIGlzc3VlIHJlZmVyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tLzZwYWMvU2xpY2tHcmlkL2lzc3Vlcy8yNzVcbiAgICovXG4gIGNvbXBlbnNhdGVIb3Jpem9udGFsU2Nyb2xsKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcbiAgICBjb25zdCBncmlkRWxtID0gJChgIyR7Z3JpZE9wdGlvbnMuZ3JpZElkfWApO1xuXG4gICAgY29uc3Qgc2Nyb2xsYmFyRGltZW5zaW9ucyA9IGdyaWQgJiYgZ3JpZC5nZXRTY3JvbGxiYXJEaW1lbnNpb25zKCk7XG4gICAgY29uc3Qgc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxiYXJEaW1lbnNpb25zICYmIHNjcm9sbGJhckRpbWVuc2lvbnMud2lkdGg7XG4gICAgY29uc3QgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsQmFyV2lkdGgoKTtcblxuICAgICAvLyBpZiBzY3JvbGxiYXIgd2lkdGggaXMgZGlmZmVyZW50IGZyb20gU2xpY2tHcmlkIGNhbGN1bGF0aW9uIHRvIG91ciBjdXN0b20gY2FsY3VsYXRpb25cbiAgICAvLyB0aGVuIHJlc2l6ZSB0aGUgZ3JpZCB3aXRoIHRoZSBtaXNzaW5nIHBpeGVscyB0byByZW1vdmUgc2Nyb2xsICh1c3VhbGx5IG9ubHkgM3B4KVxuICAgIGlmIChzbGlja0dyaWRTY3JvbGxiYXJXaWR0aCA8IGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCkge1xuICAgICAgZ3JpZEVsbS53aWR0aChncmlkRWxtLndpZHRoKCkgKyAoY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoIC0gc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBsYXN0IHJlc2l6ZSBkaW1lbnNpb25zIHVzZWQgYnkgdGhlIHNlcnZpY2VcbiAgICogQHJldHVybiBsYXN0IGRpbWVuc2lvbnNcbiAgICovXG4gIGdldExhc3RSZXNpemVEaW1lbnNpb25zKCk6IEdyaWREaW1lbnNpb24ge1xuICAgIHJldHVybiB0aGlzLl9sYXN0RGltZW5zaW9ucztcbiAgfVxuXG4gIC8qKiBSZXNpemUgdGhlIGRhdGFncmlkIHRvIGZpdCB0aGUgYnJvd3NlciBoZWlnaHQgJiB3aWR0aCAqL1xuICByZXNpemVHcmlkKGRlbGF5ID0gMTAsIG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IFByb21pc2U8R3JpZERpbWVuc2lvbj4ge1xuICAgIGlmICghdGhpcy5fZ3JpZCB8fCAhdGhpcy5fZ3JpZE9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICBBbmd1bGFyLVNsaWNrZ3JpZCByZXNpemVyIHJlcXVpcmVzIGEgdmFsaWQgR3JpZCBvYmplY3QgYW5kIEdyaWQgT3B0aW9ucyBkZWZpbmVkLlxuICAgICAgWW91IGNhbiBmaXggdGhpcyBieSBzZXR0aW5nIHlvdXIgZ3JpZE9wdGlvbiB0byB1c2UgXCJlbmFibGVBdXRvUmVzaXplXCIgb3IgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBSZXNpemVyU2VydmljZSBieSBjYWxsaW5nIGF0dGFjaEF1dG9SZXNpemVEYXRhR3JpZCgpYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAvLyBiZWNhdXNlIG9mIHRoZSBqYXZhc2NyaXB0IGFzeW5jIG5hdHVyZSwgd2UgbWlnaHQgd2FudCB0byBkZWxheSB0aGUgcmVzaXplIGEgbGl0dGxlIGJpdFxuICAgICAgZGVsYXkgPSBkZWxheSB8fCAwO1xuXG4gICAgICBpZiAoZGVsYXkgPiAwKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXMpO1xuICAgICAgICAgIHJlc29sdmUodGhpcy5fbGFzdERpbWVuc2lvbnMpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlc2l6ZUdyaWRXaXRoRGltZW5zaW9ucyhuZXdTaXplcyk7XG4gICAgICAgIHJlc29sdmUodGhpcy5fbGFzdERpbWVuc2lvbnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IEdyaWREaW1lbnNpb24ge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgYXZhaWxhYmxlIHNpemVzIHdpdGggbWluaW11bSBoZWlnaHQgZGVmaW5lZCBhcyBhIGNvbnN0YW50XG4gICAgY29uc3QgYXZhaWxhYmxlRGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnModGhpcy5fZ3JpZE9wdGlvbnMpO1xuICAgIGNvbnN0IGdyaWRFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWR9YCkgfHwge307XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lckVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zLmdyaWRDb250YWluZXJJZH1gKSB8fCB7fTtcblxuICAgIGlmICgobmV3U2l6ZXMgfHwgYXZhaWxhYmxlRGltZW5zaW9ucykgJiYgZ3JpZEVsbS5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBnZXQgdGhlIG5ldyBzaXplcywgaWYgbmV3IHNpemVzIGFyZSBwYXNzZWQgKG5vdCAwKSwgd2Ugd2lsbCB1c2UgdGhlbSBlbHNlIHVzZSBhdmFpbGFibGUgc3BhY2VcbiAgICAgIC8vIGJhc2ljYWxseSBpZiB1c2VyIHBhc3NlcyAxIG9mIHRoZSBkaW1lbnNpb24sIGxldCBzYXkgaGUgcGFzc2VzIGp1c3QgdGhlIGhlaWdodCxcbiAgICAgIC8vIHdlIHdpbGwgdXNlIHRoZSBoZWlnaHQgYXMgYSBmaXhlZCBoZWlnaHQgYnV0IHRoZSB3aWR0aCB3aWxsIGJlIHJlc2l6ZWQgYnkgaXQncyBhdmFpbGFibGUgc3BhY2VcbiAgICAgIGNvbnN0IG5ld0hlaWdodCA9IChuZXdTaXplcyAmJiBuZXdTaXplcy5oZWlnaHQpID8gbmV3U2l6ZXMuaGVpZ2h0IDogYXZhaWxhYmxlRGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICBjb25zdCBuZXdXaWR0aCA9IChuZXdTaXplcyAmJiBuZXdTaXplcy53aWR0aCkgPyBuZXdTaXplcy53aWR0aCA6IGF2YWlsYWJsZURpbWVuc2lvbnMud2lkdGg7XG5cbiAgICAgIC8vIGFwcGx5IHRoZXNlIG5ldyBoZWlnaHQvd2lkdGggdG8gdGhlIGRhdGFncmlkXG4gICAgICBncmlkRWxtLmhlaWdodChuZXdIZWlnaHQpO1xuICAgICAgZ3JpZEVsbS53aWR0aChuZXdXaWR0aCk7XG4gICAgICBncmlkQ29udGFpbmVyRWxtLmhlaWdodChuZXdIZWlnaHQpO1xuICAgICAgZ3JpZENvbnRhaW5lckVsbS53aWR0aChuZXdXaWR0aCk7XG5cbiAgICAgIC8vIHJlc2l6ZSB0aGUgc2xpY2tncmlkIGNhbnZhcyBvbiBhbGwgYnJvd3NlciBleGNlcHQgc29tZSBJRSB2ZXJzaW9uc1xuICAgICAgLy8gZXhjbHVkZSBhbGwgSUUgYmVsb3cgSUUxMVxuICAgICAgLy8gSUUxMSB3YW50cyB0byBiZSBhIGJldHRlciBzdGFuZGFyZCAoVzNDKSBmb2xsb3dlciAoZmluYWxseSkgdGhleSBldmVuIGNoYW5nZWQgdGhlaXIgYXBwTmFtZSBvdXRwdXQgdG8gYWxzbyBoYXZlICdOZXRzY2FwZSdcbiAgICAgIGlmIChuZXcgUmVnRXhwKCdNU0lFIFs2LThdJykuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSA9PT0gbnVsbCAmJiB0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQucmVzaXplQ2FudmFzKSB7XG4gICAgICAgIHRoaXMuX2dyaWQucmVzaXplQ2FudmFzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFsc28gY2FsbCB0aGUgZ3JpZCBhdXRvLXNpemUgY29sdW1ucyBzbyB0aGF0IGl0IHRha2VzIGF2YWlsYWJsZSB3aGVuIGdvaW5nIGJpZ2dlclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucyAmJiB0eXBlb2YgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMpIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGdyaWQgc3RpbGwgZXhpc3QgKGJ5IGxvb2tpbmcgaWYgdGhlIEdyaWQgVUlEIGlzIGZvdW5kIGluIHRoZSBET00gdHJlZSkgdG8gYXZvaWQgU2xpY2tHcmlkIGVycm9yIFwibWlzc2luZyBzdHlsZXNoZWV0XCJcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRVaWQgJiYgJChgLiR7dGhpcy5fZ3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5fZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbXBlbnNhdGUgYW55dGltZSBTbGlja0dyaWQgbWVhc3VyZVNjcm9sbGJhciBpcyBpbmNvcnJlY3RcbiAgICAgICAgdGhpcy5jb21wZW5zYXRlSG9yaXpvbnRhbFNjcm9sbCh0aGlzLl9ncmlkLCB0aGlzLl9ncmlkT3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGtlZXAgbGFzdCByZXNpemVkIGRpbWVuc2lvbnMgJiByZXNvbHZlIHRoZW0gdG8gdGhlIFByb21pc2VcbiAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zID0ge1xuICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodCxcbiAgICAgICAgd2lkdGg6IG5ld1dpZHRoXG4gICAgICB9O1xuXG4gICAgICBpZiAoKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gfHwgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpKSB7XG4gICAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zLmhlaWdodFdpdGhQYWdpbmF0aW9uID0gbmV3SGVpZ2h0ICsgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REaW1lbnNpb25zO1xuICB9XG59XG4iXX0=