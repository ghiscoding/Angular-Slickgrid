import { Grouping } from './grouping.interface';
import { ItemMetadata } from './itemMetadata.interface';
import { PagingInfo } from './pagingInfo.interface';
import { SlickEvent } from './slickEvent.interface';
import { SlickGrid } from './slickGrid.interface';

export interface SlickDataView {
  // --
  // Slick DataView Available Methods

  /** Add an item to the DataView */
  addItem(item: any): void;

  /** Add multiple items to the DataView */
  addItems(items: any[]): void;

  /**
   * Begin Data Update Transaction
   * @param {Boolean} isBulkUpdate - are we doing a bulk update transactions? Defaults to false
   */
  beginUpdate(isBulkUpdate?: boolean): void;

  /** Collapse all Groups, optionally pass a level number to only collapse that level */
  collapseAllGroups(level?: number): void;

  /**
   * Collapse a Group by passing either a Slick.Group's "groupingKey" property, or a
   * variable argument list of grouping values denoting a unique path to the row.
   * For example, calling collapseGroup('high', '10%') will collapse the '10%' subgroup of the 'high' group.
   */
  collapseGroup(...args: any): void;

  /** Delete an item from the DataView identified by its id */
  deleteItem(id: string | number): void;

  /** Delete multiple items from the DataView identified by their given ids */
  deleteItems(ids: Array<string | number>): void;

  /** End Data Update Transaction */
  endUpdate(): void;

  /** Expand all Groups, optionally pass a level number to only expand that level */
  expandAllGroups(level?: number): void;

  /** Expand or Collapse all Groups */
  expandCollapseAllGroups(level: number, collapse: boolean): void;

  /** Expand or Collapse a specific Group by its grouping key */
  expandCollapseGroup(level: number, groupingKey: string | number, collapse: boolean): void;

  /**
   * Expand a Group by passing either a Slick.Group's "groupingKey" property, or a
   * variable argument list of grouping values denoting a unique path to the row.
   * For example, calling collapseGroup('high', '10%') will collapse the '10%' subgroup of the 'high' group.
   */
  expandGroup(...args: any): void;

  /**
   * Provides a workaround for the extremely slow sorting in IE.
   * Does a [lexicographic] sort on a give column by temporarily overriding Object.prototype.toString
   * to return the value of that field and then doing a native Array.sort().
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  fastSort(field: string | Function, ascending: boolean): void;

  /** Get current Filter used by the DataView */
  getFilter(): any;

  /** Get only the dataset filtered items */
  getFilteredItems: <T = any>() => T[];

  /** Get current Grouping info */
  getGrouping(): Grouping[];

  /** Get current Grouping groups */
  getGroups(): any[];

  /** Get the DataView Id property name to use (defaults to "Id" but could be customized to something else when instantiating the DataView) */
  getIdPropertyName(): string;

  /** Get all DataView Items */
  getItems: <T = any>() => T[];

  /** Get DataView item at specific index */
  getItem: <T = any>(index: number) => T;

  /** Get an item in the DataView by its Id */
  getItemById: <T = any>(id: string | number) => T;

  /** Get an item in the DataView by its row index */
  getItemByIdx(idx: number): number;

  /** Get row index in the DataView by its Id */
  getIdxById(id: string | number): number | undefined;

  /** Get item count, full dataset length that is defined in the DataView */
  getItemCount(): number;

  /** Get item metadata at specific index */
  getItemMetadata(index: number): ItemMetadata | null;

  /** Get DataView length */
  getLength(): number;

  /** Get Paging Options */
  getPagingInfo(): PagingInfo;

  /** Get row number of an item in the DataView */
  getRowByItem(item: any): number;

  /** Get row number of an item in the DataView by its Id */
  getRowById(id: string | number): number | undefined;

  /** Insert an item to the DataView before a specific index */
  insertItem(insertBefore: number, item: any): void;

  /** Insert multiple items to the DataView before a specific index */
  insertItems(insertBefore: number, items: any[]): void;

  /** From the items array provided, return the mapped rows */
  mapItemsToRows(items: any[]): number[];

  /** From the Ids array provided, return the mapped rows */
  mapIdsToRows(ids: Array<number | string>): number[];

  /** From the rows array provided, return the mapped Ids */
  mapRowsToIds(rows: Array<number>): Array<number | string>;

  /** Refresh the DataView */
  refresh(): void;

  /** Re-Sort the dataset */
  reSort(): void;

  /** Set some Grouping */
  setGrouping(groupingInfo: Grouping | Grouping[]): void;

  /** Set a Filter that will be used by the DataView */
  // eslint-disable-next-line @typescript-eslint/ban-types
  setFilter(filterFn: Function): void;

  /** Set the Items with a new Dataset and optionally pass a different Id property name */
  setItems(data: any[], objectIdProperty?: string): void;

  /** Set Paging Options */
  setPagingOptions(args: PagingInfo): void;

  /** Set Refresh Hints */
  setRefreshHints(hints: any): void;

  /** Set extra Filter arguments which will be used by the Filter method */
  setFilterArgs(args: any): void;

  /** Sort Method to use by the DataView */
  // eslint-disable-next-line @typescript-eslint/ban-types
  sort(comparer: Function, ascending?: boolean): void;

  /** Add an item in a sorted dataset (a Sort function must be defined) */
  sortedAddItem(item: any): void;

  /** Update an item in a sorted dataset (a Sort function must be defined) */
  sortedUpdateItem(id: string | number, item: number): void;

  /** Get the sorted index of the item to search */
  sortedIndex(searchItem: any): number;

  /**
   * Wires the grid and the DataView together to keep row selection tied to item ids.
   * This is useful since, without it, the grid only knows about rows, so if the items
   * move around, the same rows stay selected instead of the selection moving along
   * with the items.
   *
   * NOTE:  This doesn't work with cell selection model.
   *
   * @param grid {Slick.Grid} The grid to sync selection with.
   * @param preserveHidden {Boolean} Whether to keep selected items that go out of the
   *     view due to them getting filtered out.
   * @param preserveHiddenOnSelectionChange {Boolean} Whether to keep selected items
   *     that are currently out of the view (see preserveHidden) as selected when selection
   *     changes.
   * @return {Slick.Event} An event that notifies when an internal list of selected row ids
   *     changes.  This is useful since, in combination with the above two options, it allows
   *     access to the full list selected row ids, and not just the ones visible to the grid.
   */
  syncGridSelection(grid: SlickGrid, preserveHidden: boolean, preserveHiddenOnSelectionChange?: boolean): SlickEvent;

  syncGridCellCssStyles(grid: SlickGrid, key: string): void;

  /** Update a specific Index */
  updateIdxById(startingIndex: number): void;

  /** Update an item in the DataView identified by its Id */
  updateItem<T = any>(id: string | number, item: T): void;

  /** Update multiple items in the DataView identified by their Ids */
  updateItems<T = any>(id: Array<string | number>, items: T[]): void;

  // ---------------------------
  // Available DataView Events
  // ---------------------------

  /** Event triggered when "setItems" function is called */
  onSetItemsCalled: SlickEvent;

  /** Event triggered when the dataset row count changes */
  onRowCountChanged: SlickEvent;

  /** Event triggered when any of the row got changed */
  onRowsChanged: SlickEvent;

  /** Event triggered when the  dataset row count changes OR any of the row got changed */
  onRowsOrCountChanged: SlickEvent;

  /** Event triggered when before Paging Info got changed */
  onBeforePagingInfoChanged: SlickEvent;

  /** Event triggered while Paging Info is getting changed */
  onPagingInfoChanged: SlickEvent;

  /** Event triggered while Grouping is Expanding */
  onGroupExpanded: SlickEvent;

  /** Event triggered while Grouping is Collapsing */
  onGroupCollapsed: SlickEvent;
}
