import { Grouping } from './grouping.interface';
import { PagingInfo } from './pagingInfo.interface';
import { SlickEvent } from './slickEvent.interface';
import { SlickGrid } from './slickGrid.interface';

export interface SlickDataView {
  // --
  // Available Methods

  /** Add an item to the dataset */
  addItem(item: any): void;

  /** Begin Data Update Transaction */
  beginUpdate(): void;

  /** Collapse all Groups, optionally pass a level number to only collapse that level */
  collapseAllGroups(level?: number): void;

  /**
   * Collapse a Group by passing either a Slick.Group's "groupingKey" property, or a
   * variable argument list of grouping values denoting a unique path to the row.
   * For example, calling collapseGroup('high', '10%') will collapse the '10%' subgroup of the 'high' group.
   */
  collapseGroup(...args: any): void;

  /** Delete an item from the dataset */
  deleteItem(id: string | number): void;

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

  /** Get all Dataset Items */
  getItems: <T = any>() => T[];

  /** Get dataset item at specific index */
  getItem: <T = any>(index: number) => T;

  /** Get an item in the dataset by its Id */
  getItemById: <T = any>(id: string | number) => T;

  /** Get an item in the dataset by its row index */
  getItemByIdx: <T = any>(idx: number) => T;

  /** Get row index in the dataset by its Id */
  getIdxById(id: string | number): number;

  /** Get item metadata at specific index */
  getItemMetadata(index: number): any;

  /** Get dataset length */
  getLength(): number;

  /** Get Paging Options */
  getPagingInfo(): PagingInfo;

  /** Get row number of an item in the dataset */
  getRowByItem(item: any): number;

  /** Get row number of an item in the dataset by its Id */
  getRowById(id: string | number): number;

  /** Insert an item to the dataset before a specific index */
  insertItem(insertBefore: number, item: any): void;

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

  /** Set a Filter that:  will be used by the DataView */
  // eslint-disable-next-line @typescript-eslint/ban-types
  setFilter(filterFn: Function): void;

  /** Set the Items with a new Dataset and optionally pass a different Id property name */
  setItems(data: any[], objectIdProperty?: string): void;

  /** Set Paging Options */
  setPagingOptions(args: PagingInfo): void;

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

  /** Update an item in the dataset by its Id */
  updateItem(id: string | number, item: any): void;

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
