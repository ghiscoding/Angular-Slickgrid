import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { Column, GridOption, SlickEventHandler, ExtensionName } from './../models/index';
import { ExtensionUtility } from '../extensions/extensionUtility';
import { ExtensionService } from './extension.service';
import { ResizerService } from './resizer.service';
import { unsubscribeAllObservables } from './utilities';
import { SharedService } from './shared.service';

// using external non-typed js libraries
declare let $: any;

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class GroupingAndColspanService {
  private _eventHandler: SlickEventHandler;
  private _grid: any;
  private subscriptions: Subscription[] = [];

  constructor(private extensionUtility: ExtensionUtility, private extensionService: ExtensionService, private resizerService: ResizerService, private sharedService: SharedService) {
    this._eventHandler = new Slick.EventHandler();
  }

  /** Getter of the SlickGrid Event Handler */
  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  private get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  init(grid: any, dataView: any) {
    this._grid = grid;

    if (grid && this._gridOptions) {
      // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
      // for all these events, we have to trigger a re-create
      if (this._gridOptions.createPreHeaderPanel) {
        // on all following events, call the
        this._eventHandler.subscribe(grid.onSort, () => this.renderPreHeaderRowGroupingTitles());
        this._eventHandler.subscribe(grid.onColumnsResized, () => this.renderPreHeaderRowGroupingTitles());
        this._eventHandler.subscribe(grid.onColumnsReordered, () => this.renderPreHeaderRowGroupingTitles());
        this._eventHandler.subscribe(dataView.onRowCountChanged, () => this.renderPreHeaderRowGroupingTitles());
        this.subscriptions.push(
          this.resizerService.onGridAfterResize.subscribe(() => this.renderPreHeaderRowGroupingTitles()),
          this.sharedService.onHeaderMenuHideColumns.subscribe(() => this.delayRenderPreHeaderRowGroupingTitles(0))
        );

        this._eventHandler.subscribe(grid.onSetOptions, (_e, args) => {
          // when user changes frozen columns dynamically (e.g. from header menu), we need to re-render the pre-header of the grouping titles
          if (args && args.optionsBefore && args.optionsAfter && args.optionsBefore.frozenColumn !== args.optionsAfter.frozenColumn) {
            this.delayRenderPreHeaderRowGroupingTitles(0);
          }
        });

        // for both picker (columnPicker/gridMenu) we also need to re-create after hiding/showing columns
        const columnPickerExtension = this.extensionService.getExtensionByName(ExtensionName.columnPicker);
        if (columnPickerExtension && columnPickerExtension.instance && columnPickerExtension.instance.onColumnsChanged) {
          this._eventHandler.subscribe(columnPickerExtension.instance.onColumnsChanged, () => this.renderPreHeaderRowGroupingTitles());
        }

        const gridMenuExtension = this.extensionService.getExtensionByName(ExtensionName.gridMenu);
        if (gridMenuExtension && gridMenuExtension.instance && gridMenuExtension.instance.onColumnsChanged && gridMenuExtension.instance.onMenuClose) {
          this._eventHandler.subscribe(gridMenuExtension.instance.onColumnsChanged, () => this.renderPreHeaderRowGroupingTitles());
          this._eventHandler.subscribe(gridMenuExtension.instance.onMenuClose, () => this.renderPreHeaderRowGroupingTitles());
        }

        // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
        // probably some kind of timing issues and delaying it until the grid is fully ready fixes this problem
        this.delayRenderPreHeaderRowGroupingTitles(50);
      }
    }
  }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    // also unsubscribe all Angular Subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  /** call "renderPreHeaderRowGroupingTitles()" with a setTimeout delay */
  delayRenderPreHeaderRowGroupingTitles(delay = 0) {
    setTimeout(() => this.renderPreHeaderRowGroupingTitles(), delay);
  }

  /** Create or Render the Pre-Header Row Grouping Titles */
  renderPreHeaderRowGroupingTitles() {
    if (this._gridOptions && this._gridOptions.frozenColumn !== undefined && this._gridOptions.frozenColumn >= 0) {
      // Add column groups to left panel
      let $preHeaderPanel = $(this._grid.getPreHeaderPanelLeft());
      this.renderHeaderGroups($preHeaderPanel, 0, this._gridOptions.frozenColumn + 1);

      // Add column groups to right panel
      $preHeaderPanel = $(this._grid.getPreHeaderPanelRight());
      this.renderHeaderGroups($preHeaderPanel, this._gridOptions.frozenColumn + 1, this._columnDefinitions.length);
    } else {
      // regular grid (not a frozen grid)
      const $preHeaderPanel = $(this._grid.getPreHeaderPanel());
      this.renderHeaderGroups($preHeaderPanel, 0, this._columnDefinitions.length);
    }
  }

  renderHeaderGroups(preHeaderPanel: any, start: number, end: number) {
    preHeaderPanel.empty()
      .addClass('slick-header-columns')
      .css('left', '-1000px')
      .width(this._grid.getHeadersWidth());
    preHeaderPanel.parent().addClass('slick-header');

    const headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();

    let colDef;
    let header;
    let lastColumnGroup = '';
    let widthTotal = 0;
    const frozenHeaderWidthCalcDifferential = this._gridOptions && this._gridOptions.frozenHeaderWidthCalcDifferential || 0;
    const isFrozenGrid = (this._gridOptions && (this._gridOptions.frozenColumn !== undefined && this._gridOptions.frozenColumn >= 0));

    for (let i = start; i < end; i++) {
      colDef = this._columnDefinitions[i];
      if (colDef) {
        if (lastColumnGroup === colDef.columnGroup && i > 0) {
          widthTotal += colDef.width || 0;
          if (header && header.width) {
            header.width(widthTotal - headerColumnWidthDiff - frozenHeaderWidthCalcDifferential); // remove possible frozen border
          }
        } else {
          widthTotal = colDef.width || 0;
          header = $(`<div class="ui-state-default slick-header-column ${isFrozenGrid ? 'frozen' : ''}" />`)
            .html(`<span class="slick-column-name">${colDef.columnGroup || ''}</span>`)
            .width(widthTotal - headerColumnWidthDiff)
            .appendTo(preHeaderPanel);
        }
        lastColumnGroup = colDef.columnGroup || '';
      }
    }
  }


  /** Translate Column Group texts and re-render them afterward. */
  translateGroupingAndColSpan() {
    const currentColumnDefinitions = this._grid.getColumns();
    this.extensionUtility.translateItems(currentColumnDefinitions, 'columnGroupKey', 'columnGroup');
    this._grid.setColumns(currentColumnDefinitions);
    this.renderPreHeaderRowGroupingTitles();
  }
}
