import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { GridOption } from './../models/gridOption.interface';

declare var $: any;

// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;

@Injectable()
export class ResizerService {
  constructor(private router: Router) {
  }

  /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
   * Options: we could also provide a % factor to resize on each height/width independently
   */
  attachAutoResizeDataGrid(grid: any, gridOptions: GridOption): any|void {
    // if we can't find the grid to resize, return without attaching anything
    const gridDomElm = $(`#${gridOptions.gridId}`);
    if (!gridDomElm || typeof gridDomElm.offset() === 'undefined') {
      return null;
    }

    // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
    this.resizeGrid(grid, gridOptions);

    // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
    // -- attach auto-resize to Window object only if it exist
    $(window).on('resize.grid', () => {
      this.resizeGrid(grid, gridOptions);
    });

    // destroy the resizer on route change
    this.router.events.subscribe((event: NavigationEnd) => {
      this.destroy();
    });
  }

  /**
   * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
   * object gridOptions
   */
  calculateGridNewDimensions(gridOptions: GridOption): any {
    let bottomPadding = (gridOptions.autoResize && gridOptions.autoResize.bottomPadding) ? gridOptions.autoResize.bottomPadding : DATAGRID_BOTTOM_PADDING;
    if (bottomPadding && gridOptions.enablePagination) {
      bottomPadding += DATAGRID_PAGINATION_HEIGHT; // add pagination height to bottom padding
    }
    if (typeof $(`#${gridOptions.gridId}`).offset !== 'function') {
      return;
    }
    const availableHeight = $(window).height() - $(`#${gridOptions.gridId}`).offset().top - bottomPadding;
    const availableWidth = (gridOptions.autoResize && gridOptions.autoResize.containerId) ? $(`#${gridOptions.autoResize.containerId}`).width() : $(`#${gridOptions.gridContainerId}`).width();
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
    $(window).trigger('resize.grid').off('resize');
  }

  /** Resize the datagrid to fit the browser height & width */
  resizeGrid(grid: any, gridOptions: GridOption, newSizes?: { height: number, width: number}): void {
    // calculate new available sizes but with minimum height of 220px
    newSizes = newSizes || this.calculateGridNewDimensions(gridOptions);

    if (newSizes) {
      // apply these new height/width to the datagrid
      $(`#${gridOptions.gridId}`).height(newSizes.height);
      $(`#${gridOptions.gridId}`).width(newSizes.width);
      $(`#${gridOptions.gridContainerId}`).height(newSizes.height);
      $(`#${gridOptions.gridContainerId}`).width(newSizes.width);

      // resize the slickgrid canvas on all browser except some IE versions
      // exclude all IE below IE11
      // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
      if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && grid) {
        grid.resizeCanvas();
      }

      // also call the grid auto-size columns so that it takes available when going bigger
      grid.autosizeColumns();
    }
  }
}
