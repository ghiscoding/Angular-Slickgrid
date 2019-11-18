import { GridOption } from './../models/index';
import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';

// using external non-typed js libraries
declare var $: any;

// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;

export interface GridDimension {
  height?: number;
  width?: number;
  heightWithPagination?: number;
}

export class ResizerService {
  private _fixedHeight: number | null;
  private _fixedWidth: number | null;
  private _grid: any;
  private _lastDimensions: GridDimension;
  private _timer: any;
  private _resizePaused = false;
  onGridAfterResize = new Subject<GridDimension>();
  onGridBeforeResize = new Subject<Event>();

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  private get _gridUid(): string {
    return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions && this._gridOptions.gridId;
  }

  init(grid: any, fixedDimensions?: GridDimension): void {
    this._grid = grid;
    if (fixedDimensions) {
      this._fixedHeight = fixedDimensions.height;
      this._fixedWidth = fixedDimensions.width;
    }
  }

  /** Bind an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
   * Options: we could also provide a % factor to resize on each height/width independently
   */
  bindAutoResizeDataGrid(newSizes?: GridDimension) {
    // if we can't find the grid to resize, return without binding anything
    const gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
    if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
      return null;
    }

    // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
    // -- also we add a slight delay (in ms) so that we resize after the grid render is done
    this.resizeGrid(10, newSizes);

    // -- 2nd bind a trigger on the Window DOM element, so that it happens also when resizing after first load
    // -- bind auto-resize to Window object only if it exist
    $(window).on(`resize.grid.${this._gridUid}`, (event: Event) => {
      this.onGridBeforeResize.next(event);
      if (!this._resizePaused) {
        this.resizeGrid(0, newSizes);
      }
    });
  }

  /**
   * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
   * object gridOptions
   */
  calculateGridNewDimensions(gridOptions: GridOption): GridDimension | null {
    const gridDomElm = $(`#${gridOptions.gridId}`);
    const autoResizeOptions = gridOptions && gridOptions.autoResize || {};
    const containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $(`#${autoResizeOptions.containerId}`) : $(`#${gridOptions.gridContainerId}`);
    if (!window || containerElm === undefined || gridDomElm === undefined || gridDomElm.offset() === undefined) {
      return null;
    }

    // calculate bottom padding
    // if using pagination, we need to add the pagination height to this bottom padding
    let bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
    if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
      bottomPadding += DATAGRID_PAGINATION_HEIGHT;
    }

    let gridHeight = 0;
    let gridOffsetTop = 0;

    // which DOM element are we using to calculate the available size for the grid?
    if (autoResizeOptions.calculateAvailableSizeBy === 'container') {
      // uses the container's height to calculate grid height without any top offset
      gridHeight = containerElm.height() || 0;
    } else {
      // uses the browser's window height with its top offset to calculate grid height
      gridHeight = window.innerHeight || 0;
      const coordOffsetTop = gridDomElm.offset();
      gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
    }

    const availableHeight = gridHeight - gridOffsetTop - bottomPadding;
    const availableWidth = containerElm.width() || window.innerWidth || 0;
    const maxHeight = autoResizeOptions && autoResizeOptions.maxHeight || undefined;
    const minHeight = autoResizeOptions && autoResizeOptions.minHeight || DATAGRID_MIN_HEIGHT;
    const maxWidth = autoResizeOptions && autoResizeOptions.maxWidth || undefined;
    const minWidth = autoResizeOptions && autoResizeOptions.minWidth || DATAGRID_MIN_WIDTH;

    let newHeight = availableHeight;
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
   */
  dispose() {
    $(window).off(`resize.grid.${this._gridUid}`);
  }

  /**
   * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
   * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
   * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
   * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
   */
  compensateHorizontalScroll(grid: any, gridOptions: GridOption) {
    const gridElm = $(`#${gridOptions.gridId}`);

    const scrollbarDimensions = grid && grid.getScrollbarDimensions();
    const slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
    const calculatedScrollbarWidth = getScrollBarWidth();

    // if scrollbar width is different from SlickGrid calculation to our custom calculation
    // then resize the grid with the missing pixels to remove scroll (usually only 3px)
    if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
      gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
    }
  }

  /**
   * Return the last resize dimensions used by the service
   * @return last dimensions
   */
  getLastResizeDimensions(): GridDimension {
    return this._lastDimensions;
  }

  /** Provide the possibility to pause the resizer for some time, until user decides to re-enabled it later if he wish to. */
  pauseResizer(isResizePaused: boolean) {
    this._resizePaused = isResizePaused;
  }

  /** Resize the datagrid to fit the browser height & width */
  resizeGrid(delay = 10, newSizes?: GridDimension): Promise<GridDimension> {
    if (!this._grid || !this._gridOptions) {
      throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling bindAutoResizeDataGrid()`);
    }

    return new Promise((resolve) => {
      // because of the javascript async nature, we might want to delay the resize a little bit
      delay = delay || 0;

      if (delay > 0) {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => resolve(this.resizeGridCallback(newSizes)), delay);
      } else {
        resolve(this.resizeGridCallback(newSizes));
      }
    });
  }

  resizeGridCallback(newSizes: GridDimension) {
    const lastDimensions = this.resizeGridWithDimensions(newSizes);
    this.onGridAfterResize.next(lastDimensions);
    return lastDimensions;
  }

  resizeGridWithDimensions(newSizes?: GridDimension): GridDimension {
    // calculate the available sizes with minimum height defined as a constant
    const availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
    const gridElm = $(`#${this._gridOptions.gridId}`) || {};
    const gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};

    if ((newSizes || availableDimensions) && gridElm.length > 0) {
      // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
      // basically if user passes 1 of the dimension, let say he passes just the height,
      // we will use the height as a fixed height but the width will be resized by it's available space
      const newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
      const newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;

      // apply these new height/width to the datagrid
      if (!this._gridOptions.autoHeight) {
        gridElm.height(newHeight);
        gridContainerElm.height(newHeight);
      }
      gridElm.width(newWidth);
      gridContainerElm.width(newWidth);

      // resize the slickgrid canvas on all browser except some IE versions
      // exclude all IE below IE11
      // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
      if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid && this._grid.resizeCanvas) {
        this._grid.resizeCanvas();
      }

      // also call the grid auto-size columns so that it takes available when going bigger
      if (this._gridOptions && this._gridOptions.enableAutoSizeColumns && this._grid.autosizeColumns) {
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
