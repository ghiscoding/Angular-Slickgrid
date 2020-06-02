import { GridOption } from './gridOption.interface';
import { Column } from './column.interface';
import { ColumnSort } from './columnSort.interface';
import { Editor } from './editor.interface';
import { ElementPosition } from './elementPosition.interface';
import { FormatterResultObject } from './formatterResultObject.interface';
import { PagingInfo } from './pagingInfo.interface';
import { SlickEvent } from './slickEvent.interface';

export interface SlickGrid {
  /**
   * Adds an "overlay" of CSS classes to cell DOM elements. SlickGrid can have many such overlays associated with different keys and they are frequently used by plugins. For example, SlickGrid uses this method internally to decorate selected cells with selectedCellCssClass (see options).
   * @param key A unique key you can use in calls to setCellCssStyles and removeCellCssStyles. If a hash with that key has already been set, an exception will be thrown.
   * @param hash A hash of additional cell CSS classes keyed by row number and then by column id. Multiple CSS classes can be specified and separated by space.
   * @example
   * {
   * 	0:    {
   * 		number_column: SlickEvent;
   * 		title_column: SlickEvent;
   * 	},
   * 	4:    {
   * 		percent_column: SlickEvent;
   * 	}
   * }
   */
  addCellCssStyles(key: string, hash: any): void;

  /** Apply a Formatter Result to a Cell DOM Node */
  applyFormatResultToCellNode(formatterResult?: FormatterResultObject, cellNode?: HTMLElement, suppressRemove?: boolean): void;

  /** Proportionally resize a specific column by its name, index or Id */
  autosizeColumn(columnOrIndexOrId: string | number, isInit: boolean): void;

  /** Proportionately resizes all columns to fill available horizontal space. This does not take the cell contents into consideration. */
  autosizeColumns(): void;

  /**
   * Returns true if you can click on a given cell and make it the active focus.
   * @param row A row index.
   * @param col A column index.
   */
  canCellBeActive(row: number, col: number): boolean;

  /**
   * Returns true if selecting the row causes this particular cell to have the selectedCellCssClass applied to it. A cell can be selected if it exists and if it isn't on an empty / "Add New" row and if it is not marked as "unselectable" in the column definition.
   * @param row A row index.
   * @param col A column index.
   */
  canCellBeSelected(row: number, col: number): boolean;

  /** Destroy (dispose) of SlickGrid */
  destroy(): void;

  /**
   * Attempts to switch the active cell into edit mode. Will throw an error if the cell is set to be not editable. Uses the specified editor, otherwise defaults to any default editor for that given cell.
   * @param editor A SlickGrid editor (see examples in slick.editors.js).
   */
  editActiveCell(editor: Editor): void;

  /**
   * Flashes the cell twice by toggling the CSS class 4 times.
   * @param row A row index.
   * @param cell A column index.
   * @param speed (optional) - The milliseconds delay between the toggling calls. Defaults to 100 ms.
   */
  flashCell(row: number, cell: number, speed?: number): void;

  /** Set focus */
  focus(): void;

  /** Get the canvas DOM element */
  getActiveCanvasNode(): HTMLElement;

  /**
   * Returns an object representing the coordinates of the currently active cell:
   * @example
   * 	{
   * 	  row: activeRow,
   * 	  cell: activeCell
   * 	}
   */
  getActiveCell(): number;

  /** Returns the DOM element containing the currently active cell. If no cell is active, null is returned. */
  getActiveCellNode(): HTMLElement;

  /** Returns an object representing information about the active cell's position. All coordinates are absolute and take into consideration the visibility and scrolling position of all ancestors. */
  getActiveCellPosition(): ElementPosition;

  /** Get the active Viewport DOM node element */
  getActiveViewportNode(): HTMLElement;

  /** Get the canvas DOM element */
  getCanvases(): HTMLElement;

  /** Get Grid Canvas Node DOM Element */
  getCanvasNode(): HTMLCanvasElement;

  /** Get the grid canvas width */
  getCanvasWidth(): number;

  /**
   * Accepts a key name, returns the group of CSS styles defined under that name. See setCellCssStyles for more info.
   * @param key A string.
   */
  getCellCssStyles(key: string): any;

  /** Returns the active cell editor. If there is no actively edited cell, null is returned.   */
  getCellEditor(): Editor;

  /**
   * Returns a hash containing row and cell indexes from a standard W3C/jQuery event.
   * @param e A standard W3C/jQuery event.
   */
  getCellFromEvent(e: Event): any;

  /**
   * Returns a hash containing row and cell indexes. Coordinates are relative to the top left corner of the grid beginning with the first row (not including the column headers).
   * @param x An x coordinate.
   * @param y A y coordinate.
   */
  getCellFromPoint(x: number, y: number): any;

  /**
   * Returns a DOM element containing a cell at a given row and cell.
   * @param row A row index.
   * @param cell A column index.
   */
  getCellNode(row: number, cell: number): HTMLElement;

  /**
   * Returns an object representing information about a cell's position. All coordinates are absolute and take into consideration the visibility and scrolling position of all ancestors.
   * @param row A row index.
   * @param cell A column index.
   */
  getCellNodeBox(row: number, cell: number): ElementPosition;

  /**
   * Returns the index of a column with a given id. Since columns can be reordered by the user, this can be used to get the column definition independent of the order:
   * @param id A column id.
   */
  getColumnIndex(id: string | number): number;

  /** Returns an array of column definitions, containing the option settings for each individual column.*/
  getColumns(): Column[];

  /** Get Grid Canvas Node DOM Element */
  getContainerNode(): HTMLElement;

  /** Returns an array of every data object, unless you're using DataView in which case it returns a DataView object. */
  getData(): any;

  /**
   * Returns the databinding item at a given position.
   * @param index Item index.
   */
  getDataItem(index: number): any;

  /** Returns the size of the databinding source. */
  getDataLength(): number;

  /** Get Editor lock */
  getEditorLock(): any;

  /** Get Editor Controller */
  getEditController(): { commitCurrentEdit(): boolean; cancelCurrentEdit(): boolean; };

  /** Get the Footer DOM element */
  getFooterRow(): HTMLElement;

  /** Get the Footer Row Column DOM element */
  getFooterRowColumn(columnIdOrIdx: string | number): HTMLElement;

  /** Get frozen (pinned) row offset */
  getFrozenRowOffset(row: number): number;

  /** Get the Grid Position */
  getGridPosition(): ElementPosition;

  /** Get the Header DOM element */
  getHeader(columnDef: Column): HTMLElement;

  /** Get a specific Header Column DOM element */
  getHeaderColumn(columnIdOrIdx: string | number): HTMLElement;

  /** Get Header Column Width Difference in pixel */
  getHeaderColumnWidthDiff(): number;

  /** Get the Header Row DOM element */
  getHeaderRow(): HTMLElement;

  /** Get Header Row Column DOM element by its column Id */
  getHeaderRowColumn(columnId: string | number): HTMLElement;

  /** Get the headers width in pixel */
  getHeadersWidth(): number;

  /** Returns an object containing all of the Grid options set on the grid. See a list of Grid Options here.  */
  getOptions(): GridOption;

  /** Get a Plugin (addon) by its name */
  getPluginByName(name: string): any;

  /** Get the Pre-Header Panel DOM node element */
  getPreHeaderPanel(): HTMLElement;

  /** Get the Pre-Header Panel Left DOM node element */
  getPreHeaderPanelLeft(): HTMLElement;

  /** Get the Pre-Header Panel Right DOM node element */
  getPreHeaderPanelRight(): HTMLElement;

  /** Get rendered range */
  getRenderedRange(viewportTop: number, viewportLeft: number): { top: number; bottom: number; leftPx: number; rightPx: number; };

  /** Get scrollbar dimensions */
  getScrollbarDimensions(): { height: number; width: number; };

  /** Returns an array of row indices corresponding to the currently selected rows. */
  getSelectedRows(): number[];

  /** Returns the current SelectionModel. See here for more information about SelectionModels.*/
  getSelectionModel(): any;

  /** Get sorted columns **/
  getSortColumns(): ColumnSort[];

  /** Get Top Panel DOM element */
  getTopPanel(): HTMLElement;

  /** Get grid unique identifier */
  getUID(): string;

  /** Get Viewport position */
  getViewport(viewportTop?: number, viewportLeft?: number): { top: number; bottom: number; leftPx: number; rightPx: number; };

  /** Get the Viewport DOM node element */
  getViewportNode(): HTMLElement;

  /**
   * Accepts a row integer and a cell integer, scrolling the view to the row where row is its row index, and cell is its cell index. Optionally accepts a forceEdit boolean which, if true, will attempt to initiate the edit dialogue for the field in the specified cell.
   * Unlike setActiveCell, this scrolls the row into the viewport and sets the keyboard focus.
   * @param row A row index.
   * @param cell A column index.
   * @param forceEdit If true, will attempt to initiate the edit dialogue for the field in the specified cell.
   */
  gotoCell(row: number, cell: number, forceEdit?: boolean): void;

  /** Initializes the grid. Called after plugins are registered. Normally, this is called by the constructor, so you don't need to call it. However, in certain cases you may need to delay the initialization until some other process has finished. In that case, set the explicitInitialization option to true and call the grid.init() manually. */
  init(): void;

  /** Invalidate all rows and re-render the grid rows */
  invalidate(): void;

  /** Invalidate all rows */
  invalidateAllRows(): void;

  /** Invalidate a specific row number */
  invalidateRow(row: number): void;

  /** Invalidate a specific set of row numbers */
  invalidateRows(rows: number[]): void;

  /** Navigate to the bottom of the grid */
  navigateBottom(): void;

  /** Switches the active cell one row down skipping unselectable cells. Returns a boolean saying whether it was able to complete or not. */
  navigateDown(): boolean;

  /** Switches the active cell one cell left skipping unselectable cells. Unline navigatePrev, navigateLeft stops at the first cell of the row. Returns a boolean saying whether it was able to complete or not. */
  navigateLeft(): boolean;

  /** Tabs over active cell to the next selectable cell. Returns a boolean saying whether it was able to complete or not. */
  navigateNext(): boolean;

  /** Navigate (scroll) by a page up */
  navigatePageUp(): void;

  /** Navigate (scroll) by a page down */
  navigatePageDown(): void;

  /**  Tabs over active cell to the previous selectable cell. Returns a boolean saying whether it was able to complete or not. */
  navigatePrev(): boolean;

  /** Switches the active cell one cell right skipping unselectable cells. Unline navigateNext, navigateRight stops at the last cell of the row. Returns a boolean saying whether it was able to complete or not. */
  navigateRight(): boolean;

  /** Navigate to the start row in the grid */
  navigateRowStart(): boolean;

  /** Navigate to the end row in the grid */
  navigateRowEnd(): boolean;

  /** Navigate to the top of the grid */
  navigateTop(): void;

  /** Switches the active cell one row up skipping unselectable cells. Returns a boolean saying whether it was able to complete or not. */
  navigateUp(): boolean;

  /** (re)Render the grid */
  render(): void;

  /** Register an external Plugin (addon) */
  registerPlugin(plugin: any): void;

  /**
   * Removes an "overlay" of CSS classes from cell DOM elements. See setCellCssStyles for more.
   * @param key A string key.
   */
  removeCellCssStyles(key: string): void;

  /**  Resets active cell. */
  resetActiveCell(): void;

  /** Execute a Resize of the Canvas */
  resizeCanvas(): void;

  /** Scroll to a specific cell and make it into the view */
  scrollCellIntoView(row: number, cell: number, doPaging: boolean): void;

  /** Scroll to a specific column and show it into the viewport */
  scrollColumnIntoView(cell: number): void;

  /** Scroll to a specific row and make it into the view */
  scrollRowIntoView(row: number, doPaging?: boolean): void;

  /** Scroll to the top row and make it into the view */
  scrollRowToTop(row: number): void;

  /** Scroll to an Y position in the grid */
  scrollTo(yPos: number): void;

  /** Sets an active canvas node */
  setActiveCanvasNode(element: HTMLElement): void;

  /**
   * Sets an active cell.
   * @param row A row index.
   * @param cell A column index.
   * @param optionEditMode Option Edit Mode is Auto-Edit?
   * @param preClickModeOn Pre-Click Mode is Enabled?
   * @param suppressActiveCellChangedEvent Are we suppressing Active Cell Changed Event (defaults to false)
   */
  setActiveCell(row: number, cell: number, optionEditMode?: boolean, preClickModeOn?: boolean, suppressActiveCellChangedEvent?: boolean): void;

  /** Sets an active viewport node */
  setActiveViewportNode(element: HTMLElement): void;

  /**
   * Sets CSS classes to specific grid cells by calling removeCellCssStyles(key) followed by addCellCssStyles(key, hash). key is name for this set of styles so you can reference it later - to modify it or remove it, for example. hash is a per-row-index, per-column-name nested hash of CSS classes to apply.
   * Suppose you have a grid with columns:
   * ["login", "name", "birthday", "age", "likes_icecream", "favorite_cake"]
   * ...and you'd like to highlight the "birthday" and "age" columns for people whose birthday is today, in this case, rows at index 0 and 9. (The first and tenth row in the grid).
   * @param key A string key. Will overwrite any data already associated with this key.
   * @param hash A hash of additional cell CSS classes keyed by row number and then by column id. Multiple CSS classes can be specified and separated by space.
   */
  setCellCssStyles(key: string, hash: any): void;

  /** Set the Column Header Visibility and optionally enable/disable animation (enabled by default) */
  setColumnHeaderVisibility(visible: boolean, animate?: boolean): void;

  /**
   * Sets grid columns. Column headers will be recreated and all rendered rows will be removed. To rerender the grid (if necessary), call render().
   * @param columnDefinitions An array of column definitions.
   */
  setColumns(columnDefinitions: Column[]): void;

  /**
   * Sets a new source for databinding and removes all rendered rows. Note that this doesn't render the new rows - you can follow it with a call to render() to do that.
   * @param newData New databinding source using a regular JavaScript array.. or a custom object exposing getItem(index) and getLength() functions.
   * @param scrollToTop If true, the grid will reset the vertical scroll position to the top of the grid.
   */
  setData(newData: any | any[], scrollToTop: boolean): void;

  /** Set the Footer Visibility and optionally enable/disable animation (enabled by default) */
  setFooterRowVisibility(visible: boolean, animate?: boolean): void;

  /** Set the Header Row Visibility and optionally enable/disable animation (enabled by default) */
  setHeaderRowVisibility(visible: boolean, animate?: boolean): void;

  /**
   * Extends grid options with a given hash. If an there is an active edit, the grid will attempt to commit the changes and only continue if the attempt succeeds.
   * @options An object with configuration options.
   */
  setOptions(options: GridOption): void;

  /** Set the Pre-Header Visibility and optionally enable/disable animation (enabled by default) */
  setPreHeaderPanelVisibility(visible: boolean, animate?: boolean): void;

  /**
   * Accepts an array of row indices and applies the current selectedCellCssClass to the cells in the row, respecting whether cells have been flagged as selectable.
   * @param rowsArray An array of row numbers.
   */
  setSelectedRows(rowsArray: number[]): void;

  /**
   * Unregisters a current selection model and registers a new one. See the definition of SelectionModel for more information.
   * @selectionModel A SelectionModel.
   */
  setSelectionModel(selectionModel: any): void;		// todo: don't know the type of the event data type

  /**
   * Accepts a columnId string and an ascending boolean. Applies a sort glyph in either ascending or descending form to the header of the column. Note that this does not actually sort the column. It only adds the sort glyph to the header.
   * @param columnId
   * @param ascending
   */
  setSortColumn(columnId: string | number, ascending: boolean): void;

  /**
   * Accepts an array of objects in the form [ { columnId: [string], sortAsc: [boolean] }, ... ]. When called, this will apply a sort glyph in either ascending or descending form to the header of each column specified in the array. Note that this does not actually sort the column. It only adds the sort glyph to the header
   * @param cols
   */
  setSortColumns(cols: ColumnSort[]): void;

  /** Set the Top Panel Visibility and optionally enable/disable animation (enabled by default) */
  setTopPanelVisibility(visible: boolean, animate?: boolean): void;

  /** Unregister an external Plugin (addon) */
  unregisterPlugin(plugin: any): void;

  /** Update a specific cell by its row and column index */
  updateCell(row: number, cell: number): void;

  /**
   * Updates an existing column definition and a corresponding header DOM element with the new title and tooltip.
   * @param columnId Column id.
   * @param title New column name.
   * @param toolTip New column tooltip.
   */
  updateColumnHeader(columnId: string | number, title?: string, toolTip?: string): void;

  /** Update paging information status from the View */
  updatePagingStatusFromView(pagingInfo: PagingInfo): void;

  /** Update a specific row by its row index */
  updateRow(row: number): void;

  /** Update the dataset row count */
  updateRowCount(): void;

  // -----------------------------
  // Available Slick Grid Events
  // -----------------------------

  onActiveCellChanged: SlickEvent;
  onActiveCellPositionChanged: SlickEvent;
  onAddNewRow: SlickEvent;
  onAutosizeColumns: SlickEvent;
  onBeforeAppendCell: SlickEvent;
  onBeforeCellEditorDestroy: SlickEvent;
  onBeforeColumnsResize: SlickEvent;
  onBeforeDestroy: SlickEvent;
  onBeforeEditCell: SlickEvent;
  onBeforeHeaderCellDestroy: SlickEvent;
  onBeforeHeaderRowCellDestroy: SlickEvent;
  onBeforeFooterRowCellDestroy: SlickEvent;
  onCellChange: SlickEvent;
  onCellCssStylesChanged: SlickEvent;
  onClick: SlickEvent;
  onColumnsReordered: SlickEvent;
  onColumnsResized: SlickEvent;
  onContextMenu: SlickEvent;
  onDrag: SlickEvent;
  onDragEnd: SlickEvent;
  onDragInit: SlickEvent;
  onDragStart: SlickEvent;
  onDblClick: SlickEvent;
  onFooterContextMenu: SlickEvent;
  onFooterRowCellRendered: SlickEvent;
  onHeaderCellRendered: SlickEvent;
  onFooterClick: SlickEvent;
  onHeaderClick: SlickEvent;
  onHeaderContextMenu: SlickEvent;
  onHeaderMouseEnter: SlickEvent;
  onHeaderMouseLeave: SlickEvent;
  onHeaderRowCellRendered: SlickEvent;
  onKeyDown: SlickEvent;
  onMouseEnter: SlickEvent;
  onMouseLeave: SlickEvent;
  onValidationError: SlickEvent;
  onViewportChanged: SlickEvent;
  onRendered: SlickEvent;
  onSelectedRowsChanged: SlickEvent;
  onScroll: SlickEvent;
  onSort: SlickEvent;
}
