
import {
  Column,
  GridOption,
  SlickEventHandler,
} from './../models/index';

// using external non-typed js libraries
declare let $: any;

// using external non-typed js libraries
declare var Slick: any;

export class GroupingAndColspanService {
  private _eventHandler: SlickEventHandler;
  private _grid: any;

  constructor() {
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
        this._eventHandler.subscribe(grid.onSort, (e: Event, args: any) => {
          this.createPreHeaderRowGroupingTitle();
        });
        this._eventHandler.subscribe(grid.onColumnsResized, (e: Event, args: any) => {
          this.createPreHeaderRowGroupingTitle();
        });
        this._eventHandler.subscribe(dataView.onRowCountChanged, (e: Event, args: any) => {
          this.createPreHeaderRowGroupingTitle();
        });

        // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
        // probably some kind of timing issues and delaying it until the grid is fully ready does help
        setTimeout(() => this.createPreHeaderRowGroupingTitle(), 50);
      }
    }
  }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
  }

  createPreHeaderRowGroupingTitle() {
    if (this._gridOptions && this._gridOptions.frozenColumn >= 0) {
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

    let m;
    let header;
    let lastColumnGroup = '';
    let widthTotal = 0;

    for (let i = start; i < end; i++) {
      m = this._columnDefinitions[i];
      if (lastColumnGroup === m.columnGroup && i > 0) {
        widthTotal += m.width;
        header.width(widthTotal - headerColumnWidthDiff);
      } else {
        widthTotal = m.width;
        header = $(`<div class="ui-state-default slick-header-column" />`)
          .html(`<span class="slick-column-name">${m.columnGroup || ''}</span>`)
          .width(m.width - headerColumnWidthDiff)
          .appendTo(preHeaderPanel);
      }
      lastColumnGroup = m.columnGroup;
    }
  }
}
