
import { Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as DOMPurify from 'dompurify';

import { EmptyWarning, GridOption } from '../models/index';
import { TranslaterService } from '../services/translater.service';

export class SlickEmptyWarningComponent {
  private _grid: any;
  private _warningLeftElement?: HTMLDivElement;
  private _warningRightElement?: HTMLDivElement;
  private isPreviouslyShown = false;
  private defHeightPane?: number;
  private defHeightRow?: number;

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  set grid(slickGrid: any) {
    this._grid = slickGrid;
  }

  constructor(@Optional() private translaterService?: TranslaterService) { }

  dispose() {
    if (this._warningLeftElement && this._warningLeftElement.remove) {
      this._warningLeftElement.remove();
    }
    if (this._warningRightElement && this._warningRightElement.remove) {
      this._warningRightElement.remove();
    }
    this._warningLeftElement = undefined;
    this._warningRightElement = undefined;
  }

  /**
   * Display a warning of empty data when the filtered dataset is empty
   * NOTE: to make this code reusable, you could (should) move this code into a utility service
   * @param isShowing - are we showing the message?
   * @param options - any styling options you'd like to pass like the text color
   */
  showEmptyDataMessage(isShowing = true, options?: EmptyWarning): boolean {
    if (!this._grid || !this.gridOptions || this.isPreviouslyShown === isShowing) {
      return false;
    }

    // keep reference so that we won't re-render the warning if the status is the same
    this.isPreviouslyShown = isShowing;

    const gridUid = this._grid && this._grid.getUID();
    const defaultMessage = 'No data to display.';
    const mergedOptions: EmptyWarning = { message: defaultMessage, ...this.gridOptions.emptyDataWarning, ...options };
    const emptyDataClassName = mergedOptions && mergedOptions.className || 'slick-empty-data-warning';
    this._warningLeftElement = document.querySelector<HTMLDivElement>(`.${gridUid} .${emptyDataClassName}`) as HTMLDivElement;
    const gridCanvasLeftElm = document.querySelector<HTMLDivElement>(`.${gridUid} .grid-canvas.grid-canvas-left`);
    const gridCanvasRightElm = document.querySelector<HTMLDivElement>(`.${gridUid} .grid-canvas.grid-canvas-right`);
    const leftElementMarginLeft = mergedOptions.leftViewportMarginLeft || 0;
    const rightElementMarginLeft = mergedOptions.rightViewportMarginLeft || 0;
    const leftElementFrozenMarginLeft = mergedOptions.frozenLeftViewportMarginLeft || 0;
    const rightElementFrozenMarginLeft = mergedOptions.frozenRightViewportMarginLeft || 0;
    const isFrozenGrid = (this.gridOptions.frozenColumn !== undefined && this.gridOptions.frozenColumn >= 0);
    const leftViewportMarginLeft = typeof leftElementMarginLeft === 'string' ? leftElementMarginLeft : `${leftElementMarginLeft}px`;
    const rightViewportMarginLeft = typeof rightElementMarginLeft === 'string' ? rightElementMarginLeft : `${rightElementMarginLeft}px`;

    // when dealing with a grid that has "autoHeight" option, we need to override 2 height that get miscalculated
    // that is because it is not aware that we are adding this slick empty element in this grid DOM
    if (this.gridOptions.autoHeight) {
      const leftPaneElm = document.querySelector<HTMLDivElement>('.slick-pane.slick-pane-top.slick-pane-left');

      // get default values
      if (leftPaneElm && gridCanvasLeftElm) {
        this.defHeightPane = parseInt(leftPaneElm.style.height || '', 10); // this field auto calc by row height

        // get row height of each feature when enabled (rowHeight will always be defined because that is cell height)
        this.defHeightRow = this.gridOptions.rowHeight;
        const filterRowHeight = (this.gridOptions.enableFiltering ? this.gridOptions.headerRowHeight : 0) as number;
        const preHeaderRowHeight = (this.gridOptions.createPreHeaderPanel ? this.gridOptions.preHeaderPanelHeight : 0) as number;

        if (isShowing) {
          // use when height with rows more that 100px
          // AutoHeight option collapse dataview to 100px when show message without data in huge grid
          // (default autoHeight for message - 100px you can add as param if needed)
          let leftPaneMinHeight = (this.defHeightPane !== undefined && this.defHeightPane < 100) ? this.defHeightPane : 100;
          leftPaneMinHeight += filterRowHeight + preHeaderRowHeight; // add preHeader & filter height when enabled
          leftPaneElm.style.minHeight = `${leftPaneMinHeight}px`;
          gridCanvasLeftElm.style.minHeight = `${this.defHeightRow}px`;
        }
      }
    }

    // warning message could come from a translation key or by the warning options
    let warningMessage = mergedOptions.message;
    if (this.gridOptions.enableTranslate && this.translaterService?.translate && mergedOptions?.messageKey) {
      warningMessage = this.translaterService.translate(mergedOptions.messageKey);
    }

    if (!this._warningLeftElement && gridCanvasLeftElm && gridCanvasRightElm) {
      const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};

      // sanitize any unauthorized html tags like script and others
      // for the remaining allowed tags we'll permit all attributes
      const sanitizedText = (DOMPurify.sanitize(warningMessage, sanitizedOptions) || '').toString();

      this._warningLeftElement = document.createElement('div');
      this._warningLeftElement.classList.add(emptyDataClassName);
      this._warningLeftElement.classList.add('left');
      this._warningLeftElement.innerHTML = sanitizedText;

      // clone the warning element and add the "right" class to it so we can distinguish
      this._warningRightElement = this._warningLeftElement.cloneNode(true) as HTMLDivElement;
      this._warningRightElement.classList.add('right');

      // append both warning elements to both left/right canvas
      gridCanvasRightElm.appendChild(this._warningRightElement);
      gridCanvasLeftElm.appendChild(this._warningLeftElement);
    }

    // if we did find the Slick-Empty-Warning element then we'll display/hide at the grid position with some margin offsets (we need to position under the headerRow and filterRow)
    // when using a frozen/pinned grid, we also have extra options to hide left/right message
    if (this._warningLeftElement) {
      // display/hide right/left messages
      let leftDisplay = isShowing ? 'block' : 'none';
      if (isFrozenGrid && isShowing) {
        leftDisplay = (mergedOptions.hideFrozenLeftWarning) ? 'none' : 'block';
      }
      this._warningLeftElement.style.display = leftDisplay;

      // use correct left margin (defaults to 40% on regular grid or 10px on frozen grid)
      const leftFrozenMarginLeft = typeof leftElementFrozenMarginLeft === 'string' ? leftElementFrozenMarginLeft : `${leftElementFrozenMarginLeft}px`;
      this._warningLeftElement.style.marginLeft = isFrozenGrid ? leftFrozenMarginLeft : leftViewportMarginLeft;
    }

    if (this._warningRightElement) {
      // use correct left margin (defaults to 40% on regular grid or 10px on frozen grid)
      let rightDisplay = isShowing ? 'block' : 'none';
      if (isFrozenGrid && isShowing) {
        rightDisplay = (mergedOptions.hideFrozenRightWarning) ? 'none' : 'block';
      }
      this._warningRightElement.style.display = rightDisplay;

      // use correct left margin (defaults to 40% on regular grid or 10px on frozen grid)
      const rightFrozenMarginLeft = typeof rightElementFrozenMarginLeft === 'string' ? rightElementFrozenMarginLeft : `${rightElementFrozenMarginLeft}px`;
      this._warningRightElement.style.marginLeft = isFrozenGrid ? rightFrozenMarginLeft : rightViewportMarginLeft;
    }

    return isShowing;
  }
}
