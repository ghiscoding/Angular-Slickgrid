import { GridOption } from './../models';
import $ from 'jquery';

// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
let timer: any;

export class ResizerService {
  private _grid: any;
  private _gridOptions: GridOption;

  init(grid: any, gridOptions: GridOption): void {
    this._grid = grid;
    this._gridOptions = gridOptions;
  }

  /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
   * Options: we could also provide a % factor to resize on each height/width independently
   */
  attachAutoResizeDataGrid() {
    // if we can't find the grid to resize, return without attaching anything
    const gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
    if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
      return null;
    }

    // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
    this.resizeGrid();

    // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
    // -- attach auto-resize to Window object only if it exist
    $(window).on('resize.grid', () => {
      // for some yet unknown reason, calling the resize twice removes any stuttering/flickering when changing the height and makes it much smoother
      this.resizeGrid();
      this.resizeGrid();
    });
  }

  /**
   * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
   * object gridOptions
   */
  calculateGridNewDimensions(gridOptions: GridOption): any {
    const gridDomElm = $(`#${gridOptions.gridId}`);
    const containerElm = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $(`#${gridOptions.autoResize.containerId}`) : $(`#${gridOptions.gridContainerId}`);
    const windowElm = $(window);
    if (windowElm === undefined || containerElm === undefined || gridDomElm === undefined) {
      return null;
    }

    // calculate bottom padding
    // if using pagination, we need to add the pagination height to this bottom padding
    let bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
    if (bottomPadding && gridOptions.enablePagination) {
      bottomPadding += DATAGRID_PAGINATION_HEIGHT;
    }

    const gridHeight = windowElm.height() || 0;
    const coordOffsetTop = gridDomElm.offset();
    const gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
    const availableHeight = gridHeight - gridOffsetTop - bottomPadding;
    const availableWidth = containerElm.width() || 0;
    const minHeight = (gridOptions.autoResize && gridOptions.autoResize.minHeight < 0) ? gridOptions.autoResize.minHeight : DATAGRID_MIN_HEIGHT;
    const minWidth = (gridOptions.autoResize && gridOptions.autoResize.minWidth < 0) ? gridOptions.autoResize.minWidth : DATAGRID_MIN_WIDTH;

    let newHeight = availableHeight;
    let newWidth = (gridOptions.autoResize && gridOptions.autoResize.sidePadding) ? availableWidth - gridOptions.autoResize.sidePadding : availableWidth;
    if (newHeight < minHeight) {
      newHeight = minHeight;
    }
    if (newWidth < minWidth) {
      newWidth = minWidth;
    }

    return {
      height: newHeight,
      width: newWidth
    };
  }

  /**
   * Destroy function when element is destroyed
   */
  destroy() {
    $(window).off('resize.grid');
  }

  /** Resize the datagrid to fit the browser height & width */
  resizeGrid(delay?: number, newSizes?: { height: number, width: number }): void {
    if (!this._grid || !this._gridOptions) {
      throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling attachAutoResizeDataGrid()`);
    }

    // because of the javascript async nature, we might want to delay the resize a little bit
    delay = delay || 0;

    clearTimeout(timer);
    timer = setTimeout(() => {
      // calculate new available sizes but with minimum height of 220px
      newSizes = newSizes || this.calculateGridNewDimensions(this._gridOptions);
      const gridElm = $(`#${this._gridOptions.gridId}`) || {};
      const gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};

      if (newSizes && gridElm.length > 0) {
        // apply these new height/width to the datagrid
        gridElm.height(newSizes.height);
        gridElm.width(newSizes.width);
        gridContainerElm.height(newSizes.height);
        gridContainerElm.width(newSizes.width);

        // resize the slickgrid canvas on all browser except some IE versions
        // exclude all IE below IE11
        // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
        if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid) {
          this._grid.resizeCanvas();
        }

        // also call the grid auto-size columns so that it takes available when going bigger
        this._grid.autosizeColumns();
      }
    }, delay);
  }
}
