import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {
  CellArgs,
  Column,
  CurrentPinning,
  GridOption,
  GridServiceDeleteOption,
  GridServiceInsertOption,
  GridServiceUpdateOption,
  HideColumnOption,
  OnEventArgs
} from './../models/index';
import { arrayRemoveItemByIndex } from './utilities';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SharedService } from './shared.service';
import { SortService } from './sort.service';
import { TreeDataService } from './treeData.service';

// using external non-typed js libraries
declare const Slick: any;
let highlightTimerEnd: any;

const GridServiceDeleteOptionDefaults: GridServiceDeleteOption = { triggerEvent: true };
const GridServiceInsertOptionDefaults: GridServiceInsertOption = { highlightRow: true, position: 'top', resortGrid: false, selectRow: false, triggerEvent: true };
const GridServiceUpdateOptionDefaults: GridServiceUpdateOption = { highlightRow: true, selectRow: false, scrollRowIntoView: false, triggerEvent: true };
const HideColumnOptionDefaults: HideColumnOption = { autoResizeColumns: true, triggerEvent: true, hideFromColumnPicker: false, hideFromGridMenu: false };

@Injectable()
export class GridService {
  private _grid: any;
  private _dataView: any;
  private _rowSelectionPlugin: any;
  onItemAdded = new Subject<any | any[]>();
  onItemDeleted = new Subject<any | any[]>();
  onItemUpdated = new Subject<any | any[]>();
  onItemUpserted = new Subject<any | any[]>();
  onColumnsChanged = new Subject<Column[]>();

  constructor(
    private filterService: FilterService,
    private gridStateService: GridStateService,
    private sharedService: SharedService,
    private sortService: SortService,
    private treeDataService: TreeDataService,
  ) { }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  dispose() {
    if (this._rowSelectionPlugin && this._rowSelectionPlugin.destroy) {
      this._rowSelectionPlugin.destroy();
    }
  }

  init(grid: any, dataView: any): void {
    this._grid = grid;
    this._dataView = dataView;
  }

  /** Clear all Filters & Sorts */
  clearAllFiltersAndSorts() {
    // call both clear Filters & Sort but only trigger the last one to avoid sending multiple backend queries
    if (this.sortService && this.sortService.clearSorting) {
      this.sortService.clearSorting(false); // skip event trigger on this one
    }
    if (this.filterService && this.filterService.clearFilters) {
      this.filterService.clearFilters();
    }
  }

  /** Clear all the pinning (frozen) options */
  clearPinning() {
    const visibleColumns = [...this.sharedService.visibleColumns];
    this.sharedService.grid.setOptions({ frozenColumn: -1, frozenRow: -1, frozenBottom: false, enableMouseWheelScrollHandler: false });

    // SlickGrid seems to be somehow resetting the columns to their original positions,
    // so let's re-fix them to the position we kept as reference
    if (Array.isArray(visibleColumns)) {
      this.sharedService.grid.setColumns(visibleColumns);
    }
  }

  /**
   * Set pinning (frozen) grid options
   * @param  {Object} pinningOptions - which pinning/frozen options to modify
   * @param {Boolean} shouldAutosizeColumns - defaults to True, should we call an autosizeColumns after the pinning is done?
   * @param {Boolean} suppressRender - do we want to supress the grid re-rendering? (defaults to false)
   * @param {Boolean} suppressColumnSet - do we want to supress the columns set, via "setColumns()" method? (defaults to false)
   */
  setPinning(pinningOptions: CurrentPinning, shouldAutosizeColumns = true, suppressRender = false, suppressColumnSet = true) {
    this.sharedService.grid.setOptions(pinningOptions, suppressRender, suppressColumnSet);
    this.sharedService.gridOptions = { ...this.sharedService.gridOptions, ...pinningOptions };

    if (shouldAutosizeColumns) {
      this.sharedService.grid.autosizeColumns();
    }
  }

  /**
   * Get all column set in the grid, that is all visible/hidden columns
   * and also include any extra columns used by some plugins (like Row Selection, Row Detail, ...)
   */
  getAllColumnDefinitions() {
    return this.sharedService.allColumns;
  }

  /** Get only visible column definitions and also include any extra columns by some plugins (like Row Selection, Row Detail, ...) */
  getVisibleColumnDefinitions(): Column[] {
    return this.sharedService.visibleColumns;
  }

  /**
   * From a SlickGrid Event triggered get the Column Definition and Item Data Context
   *
   * For example the SlickGrid onClick will return cell arguments when subscribing to it.
   * From these cellArgs, we want to get the Column Definition and Item Data
   * @param cell event args
   * @return object with columnDef and dataContext
   */
  getColumnFromEventArguments(args: CellArgs): OnEventArgs {
    if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
      throw new Error('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');
    }

    return {
      row: args.row,
      cell: args.cell,
      columnDef: args.grid.getColumns()[args.cell],
      dataContext: args.grid.getDataItem(args.row),
      dataView: this._dataView,
      grid: this._grid
    };
  }

  /** Get data item by it's row index number */
  getDataItemByRowNumber<T = any>(rowNumber: number): T {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error(`We could not find SlickGrid Grid object or it's "getDataItem" method`);
    }
    return this._grid.getDataItem(rowNumber);
  }

  /** Chain the item Metadata with our implementation of Metadata at given row index */
  getItemRowMetadataToHighlight(previousItemMetadata: any) {
    return (rowNumber: number) => {
      const item = this._dataView.getItem(rowNumber);
      let meta = { cssClasses: '' };
      if (typeof previousItemMetadata === 'function') {
        meta = previousItemMetadata(rowNumber);
      }

      if (!meta) {
        meta = { cssClasses: '' };
      }

      if (item && item._dirty) {
        meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
      }

      if (item && item.rowClass && meta) {
        meta.cssClasses += ` ${item.rowClass}`;
        meta.cssClasses += ` row${rowNumber}`;
      }

      return meta;
    };
  }

  /**
     * @deprecated Hide a Column from the Grid (the column will just become hidden and will still show up in columnPicker/gridMenu)
     * @see hideColumnById
     * @param column
     */
  hideColumn(column: Column) {
    if (this._grid && this._grid.getColumns && this._grid.setColumns && this._grid.getColumnIndex) {
      const columnIndex = this._grid.getColumnIndex(column.id);
      if (columnIndex >= 0) {
        this.hideColumnByIndex(columnIndex);
      }
    }
  }

  /**
   * @deprecated Hide a Column from the Grid by its column definition index (the column will just become hidden and will still show up in columnPicker/gridMenu)
   * @see hideColumnById Please use "hideColumnById(id)" or "hideColumnByIds([ids])" instead since it has a lot more options
   * @param columnIndex - column definition index
   * @param triggerEvent - do we want to trigger an event (onHeaderMenuColumnsChanged) when column becomes hidden? Defaults to true.
   */
  hideColumnByIndex(columnIndex: number, triggerEvent = true) {
    if (this._grid && this._grid.getColumns && this._grid.setColumns) {
      const currentColumns = this._grid.getColumns();
      const visibleColumns = arrayRemoveItemByIndex<Column>(currentColumns, columnIndex);
      this.sharedService.visibleColumns = visibleColumns;
      this._grid.setColumns(visibleColumns);
      if (triggerEvent) {
        this.onColumnsChanged.next(visibleColumns);
      }
    }
  }

  /**
   * Hide a Column from the Grid by its column definition id, the column will just become hidden and will still show up in columnPicker/gridMenu
   * @param {string | number} columnId - column definition id
   * @param {boolean} triggerEvent - do we want to trigger an event (onHeaderMenuColumnsChanged) when column becomes hidden? Defaults to true.
   * @return {number} columnIndex - column index position when found or -1
   */
  hideColumnById(columnId: string | number, options?: HideColumnOption): number {
    options = { ...HideColumnOptionDefaults, ...options };
    if (this._grid && this._grid.getColumns && this._grid.setColumns) {
      const currentColumns = this._grid.getColumns();
      const colIndexFound = currentColumns.findIndex((col: Column) => col.id === columnId);

      if (colIndexFound >= 0) {
        const visibleColumns = arrayRemoveItemByIndex<Column>(currentColumns, colIndexFound);
        this.sharedService.visibleColumns = visibleColumns;
        this._grid.setColumns(visibleColumns);

        const columnIndexFromAllColumns = this.sharedService.allColumns.findIndex(col => col.id === columnId);
        if (columnIndexFromAllColumns) {
          if (options && options.hideFromColumnPicker) {
            this.sharedService.allColumns[columnIndexFromAllColumns].excludeFromColumnPicker = true;
          }
          if (options && options.hideFromGridMenu) {
            this.sharedService.allColumns[columnIndexFromAllColumns].excludeFromGridMenu = true;
          }
        }

        // do we want to auto-resize the columns in the grid after hidding some? most often yes
        if (options && options.autoResizeColumns) {
          this._grid.autosizeColumns();
        }

        // do we want to trigger an event after hidding
        if (options && options.triggerEvent) {
          this.onColumnsChanged.next(visibleColumns);
        }
        return colIndexFound;
      }
    }
    return -1;
  }

  /**
   * Hide a Column from the Grid by its column definition id(s), the column will just become hidden and will still show up in columnPicker/gridMenu
   * @param {Array<string | number>} columnIds - column definition ids, can be a single string and an array of strings
   * @param {boolean} triggerEvent - do we want to trigger an event (onHeaderMenuColumnsChanged) when column becomes hidden? Defaults to true.
   */
  hideColumnByIds(columnIds: Array<string | number>, options?: HideColumnOption) {
    options = { ...HideColumnOptionDefaults, ...options };
    if (Array.isArray(columnIds)) {
      for (const columnId of columnIds) {
        // hide each column by its id but wait after the for loop to auto resize columns in the grid
        this.hideColumnById(columnId, { ...options, triggerEvent: false, autoResizeColumns: false });
      }
      // do we want to auto-resize the columns in the grid after hidding some? most often yes
      if (options && options.autoResizeColumns) {
        this._grid.autosizeColumns();
      }
      // do we want to trigger an event after hidding
      if (options && options.triggerEvent) {
        this.onColumnsChanged.next(this.sharedService.visibleColumns);
      }
    }
  }

  /**
   * Highlight then fade a row for x seconds.
   * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
   * @param rowNumber
   * @param fadeDelay
   */
  highlightRow(rowNumber: number | number[], fadeDelay = 1500, fadeOutDelay = 300) {
    // create a SelectionModel if there's not one yet
    if (!this._grid.getSelectionModel() && Slick && Slick.RowSelectionModel) {
      this._rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
      this._grid.setSelectionModel(this._rowSelectionPlugin);
    }

    if (Array.isArray(rowNumber)) {
      rowNumber.forEach(row => this.highlightRowByMetadata(row, fadeDelay, fadeOutDelay));
    } else {
      this.highlightRowByMetadata(rowNumber, fadeDelay, fadeOutDelay);
    }
  }

  highlightRowByMetadata(rowNumber: number, fadeDelay = 1500, fadeOutDelay = 300) {
    this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);

    const item = this._dataView.getItem(rowNumber);
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';

    if (item && item[idPropName] !== undefined) {
      item.rowClass = 'highlight';
      this._dataView.updateItem(item[idPropName], item);
      this.renderGrid();

      // fade out
      clearTimeout(highlightTimerEnd);
      highlightTimerEnd = setTimeout(() => {
        item.rowClass = 'highlight-end';
        this._dataView.updateItem(item[idPropName], item);
        this.renderGrid();
      }, fadeOutDelay);

      // delete the row's CSS highlight classes once the delay is passed
      setTimeout(() => {
        if (item && item[idPropName] !== undefined) {
          delete item.rowClass;
          if (this._dataView.getIdxById(item[idPropName]) !== undefined) {
            this._dataView.updateItem(item[idPropName], item);
            this.renderGrid();
          }
        }
      }, fadeDelay + fadeOutDelay);
    }
  }

  /** Get the Data Item from a grid row index */
  getDataItemByRowIndex<T = any>(index: number): T {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
    }

    return this._grid.getDataItem(index);
  }

  /** Get the Data Item from an array of grid row indexes */
  getDataItemByRowIndexes<T = any>(indexes: number[]): T[] {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
    }

    const dataItems: any[] = [];

    if (Array.isArray(indexes)) {
      indexes.forEach((idx) => {
        dataItems.push(this._grid.getDataItem(idx));
      });
    }

    return dataItems;
  }

  /** Get the currently selected row indexes */
  getSelectedRows(): number[] {
    if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
    }
    return this._grid.getSelectedRows();
  }

  /** Get the currently selected rows item data */
  getSelectedRowsDataItem<T = any>(): T[] {
    if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
    }

    const selectedRowIndexes = this._grid.getSelectedRows();
    return this.getDataItemByRowIndexes<T>(selectedRowIndexes);
  }

  /** Select the selected row by a row index */
  setSelectedRow(rowIndex: number) {
    if (this._grid && this._grid.setSelectedRows) {
      this._grid.setSelectedRows([rowIndex]);
    }
  }

  /** Set selected rows with provided array of row indexes */
  setSelectedRows(rowIndexes: number[]) {
    if (this._grid && this._grid.setSelectedRows) {
      this._grid.setSelectedRows(rowIndexes);
    }
  }

  /** Re-Render the Grid */
  renderGrid() {
    if (this._grid && typeof this._grid.invalidate === 'function') {
      this._grid.invalidate();
      this._grid.render();
    }
  }

  /**
   * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
   * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
   * The reset will clear the Filters & Sort, then will reset the Columns to their original state
   */
  resetGrid(columnDefinitions?: Column[]) {
    // reset columns to original states & refresh the grid
    if (this._grid && this._dataView) {
      const originalColumns = this.sharedService.allColumns || [];

      if (Array.isArray(originalColumns) && originalColumns.length > 0) {
        // set the grid columns to it's original column definitions
        this._grid.setColumns(originalColumns);
        if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
          this._grid.autosizeColumns();
        }
        this.gridStateService.resetColumns(columnDefinitions);
      }
    }

    // clear any Pinning/Frozen columns/rows
    this.clearPinning();

    if (this.filterService && this.filterService.clearFilters) {
      this.filterService.clearFilters();
    }
    if (this.sortService && this.sortService.clearSorting) {
      this.sortService.clearSorting();
    }
  }

  /** @deprecated please use "addItem" method instead */
  addItemToDatagrid(item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true, shouldSelectRow = true): number | undefined {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "addItem" method since "addItemToDatagrid" will be deprecated in the future.');
    return this.addItem(item, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /** @deprecated please use "addItems" method instead */
  addItemsToDatagrid(items: any[], shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true, shouldSelectRow = true): number[] {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "addItems" method since "addItemsToDatagrid" will be deprecated in the future.');
    return this.addItems(items, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /**
   * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   * @return rowIndex: typically index 0 when adding to position "top" or a different number when adding to the "bottom"
   */
  addItem<T = any>(item: T, options?: GridServiceInsertOption): number | undefined {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    const insertPosition = options?.position ?? 'top';

    if (!this._grid || !this._gridOptions || !this._dataView) {
      throw new Error('We could not find SlickGrid Grid, DataView objects');
    }
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';
    if (!item || !(idPropName in item)) {
      throw new Error(`Adding an item requires the item to include an "${idPropName}" property`);
    }

    // insert position top/bottom, defaults to top
    // when position is top we'll call insert at index 0, else call addItem which just push to the DataView array
    if (insertPosition === 'bottom' || this._gridOptions?.enableTreeData) {
      this._dataView.addItem(item);
    } else {
      this._dataView.insertItem(0, item); // insert at index 0
    }

    // row number in the grid, by default it will be on first row (top is the default)
    let rowNumber: number | undefined = 0;
    const itemId = (item as any)?.[idPropName] ?? '';

    if (this._gridOptions?.enableTreeData) {
      // if we add/remove item(s) from the dataset, we need to also refresh our tree data filters
      this.invalidateHierarchicalDataset();
      rowNumber = this._dataView.getRowById(itemId);
      this._grid.scrollRowIntoView(rowNumber ?? 0, false);
    } else if (options.resortGrid) {
      // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
      this._dataView.reSort();

      // find the row number in the grid and if user wanted to see highlighted row
      // we need to do it here after resort and get each row number because it possibly changes after the sort
      rowNumber = this._dataView.getRowById(itemId);
    } else {
      // scroll to row index 0 when inserting on top else scroll to the bottom where it got inserted
      rowNumber = (insertPosition === 'bottom') ? this._dataView.getRowById(itemId) : 0;
      this._grid.scrollRowIntoView(rowNumber ?? 0);
    }

    // if highlight is enabled, we'll highlight the row we just added
    if (options.highlightRow && rowNumber !== undefined) {
      this.highlightRow(rowNumber);
    }

    // if row selection (checkbox selector) is enabled, we'll select the row in the grid
    if (rowNumber !== undefined && options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this.setSelectedRow(rowNumber);
    }

    // do we want to trigger an event after adding the item
    if (options.triggerEvent) {
      this.onItemAdded.next(item);
    }

    return rowNumber;
  }

  /**
   * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   */
  addItems<T = any>(items: T | T[], options?: GridServiceInsertOption): number[] {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';
    const insertPosition = options?.position ?? 'top';
    const rowNumbers: number[] = [];

    // loop through all items to add
    if (!Array.isArray(items)) {
      return [this.addItem<T>(items, options) || 0]; // on a single item, just call addItem()
    } else {
      // begin bulk transaction
      this._dataView.beginUpdate(true);

      // insert position top/bottom, defaults to top
      // when position is top we'll call insert at index 0, else call addItem which just push to the DataView array
      if (insertPosition === 'bottom' || this._gridOptions?.enableTreeData) {
        this._dataView.addItems(items);
      } else {
        this._dataView.insertItems(0, items); // insert at index 0 to the start of the dataset
      }

      // end the bulk transaction since we're all done
      this._dataView.endUpdate();
    }

    if (this._gridOptions?.enableTreeData) {
      // if we add/remove item(s) from the dataset, we need to also refresh our tree data filters
      this.invalidateHierarchicalDataset();
      const firstItemId = (items as any)[0]?.[idPropName] ?? '';
      const rowNumber = this._dataView.getRowById(firstItemId);
      this._grid.scrollRowIntoView(rowNumber ?? 0, false);
    } else if (options.resortGrid) {
      // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
      this._dataView.reSort();
    }

    // scroll to row index 0 when inserting on top else scroll to the bottom where it got inserted
    (insertPosition === 'bottom' && !this._gridOptions?.enableTreeData) ? this._grid.navigateBottom() : this._grid.navigateTop();

    // get row numbers of all new inserted items
    // we need to do it after resort and get each row number because it possibly changed after the sort
    items.forEach((item: T) => rowNumbers.push(this._dataView.getRowById((item as any)[idPropName]) as number));

    // if user wanted to see highlighted row
    if (options.highlightRow) {
      this.highlightRow(rowNumbers);
    }

    // select the row in the grid
    if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this.setSelectedRows(rowNumbers);
    }

    // do we want to trigger an event after adding the item
    if (options.triggerEvent) {
      this.onItemAdded.next(items);
    }

    return rowNumbers;
  }

  /** @deprecated please use "deleteItem" method instead */
  deleteDataGridItem(item: any, shouldTriggerEvent = true) {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "deleteItem" method since "deleteDataGridItem" will be deprecated in the future.');
    this.deleteItem(item, { triggerEvent: shouldTriggerEvent });
  }

  /** @deprecated please use "deleteItems" method instead */
  deleteDataGridItems(items: any[], shouldTriggerEvent = true) {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "deleteItems" method since "deleteDataGridItems" will be deprecated in the future.');
    this.deleteItems(items, { triggerEvent: shouldTriggerEvent });
  }

  /** @deprecated please use "deleteItemById" method instead */
  deleteDataGridItemById(itemId: string | number, shouldTriggerEvent = true) {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "deleteItemById" method since "deleteDataGridItemById" will be deprecated in the future.');
    this.deleteItemById(itemId, { triggerEvent: shouldTriggerEvent });
  }

  /** @deprecated please use "deleteItemByIds" method instead */
  deleteDataGridItemByIds(itemIds: number[] | string[], shouldTriggerEvent = true) {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "deleteItemByIds" method since "deleteDataGridItemByIds" will be deprecated in the future.');
    this.deleteItemByIds(itemIds, { triggerEvent: shouldTriggerEvent });
  }

  /**
   * Delete an existing item from the datagrid (dataView)
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
   * @return item id deleted
   */
  deleteItem<T = any>(item: T, options?: GridServiceDeleteOption): number | string {
    options = { ...GridServiceDeleteOptionDefaults, ...options };
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';

    if (!item || !(idPropName in item)) {
      throw new Error(`Deleting an item requires the item to include an "${idPropName}" property`);
    }
    return this.deleteItemById((item as any)[idPropName], options);
  }

  /**
   * Delete an array of existing items from the datagrid
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
   * @return item id deleted
   */
  deleteItems<T = any>(items: T | T[], options?: GridServiceDeleteOption): number[] | string[] {
    options = { ...GridServiceDeleteOptionDefaults, ...options };
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';

    // when it's not an array, we can call directly the single item delete
    if (!Array.isArray(items)) {
      this.deleteItem<T>(items, options);
      return [(items as any)[idPropName]];
    }

    // begin bulk transaction
    this._dataView.beginUpdate(true);

    const itemIds: string[] = [];
    items.forEach((item: T) => {
      if (item && (item as any)[idPropName] !== undefined) {
        itemIds.push((item as any)[idPropName]);
      }
    });

    // delete the item from the dataView
    this._dataView.deleteItems(itemIds);

    // end the bulk transaction since we're all done
    this._dataView.endUpdate();

    // do we want to trigger an event after deleting the item
    if (options.triggerEvent) {
      this.onItemDeleted.next(items);
    }
    return itemIds;
  }

  /**
   * Delete an existing item from the datagrid (dataView) by it's id
   * @param itemId: item unique id
   * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
   * @return item id deleted
   */
  deleteItemById(itemId: string | number, options?: GridServiceDeleteOption): number | string {
    options = { ...GridServiceDeleteOptionDefaults, ...options };

    if (itemId === null || itemId === undefined) {
      throw new Error(`Cannot delete a row without a valid "id"`);
    }

    // when user has row selection enabled, we should clear any selection to avoid confusion after a delete
    const isSyncGridSelectionEnabled = this.gridStateService && this.gridStateService.needToPreserveRowSelection() || false;
    if (!isSyncGridSelectionEnabled && this._grid && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this.setSelectedRows([]);
    }

    // delete the item from the dataView
    this._dataView.deleteItem(itemId);

    // do we want to trigger an event after deleting the item
    if (options.triggerEvent) {
      this.onItemDeleted.next(itemId);
    }
    return itemId;
  }

  /**
   * Delete an array of existing items from the datagrid
   * @param itemIds array of item unique IDs
   * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
   */
  deleteItemByIds(itemIds: number[] | string[], options?: GridServiceDeleteOption): number[] | string[] {
    options = { ...GridServiceDeleteOptionDefaults, ...options };

    // when it's not an array, we can call directly the single item delete
    if (Array.isArray(itemIds)) {
      // begin bulk transaction
      this._dataView.beginUpdate(true);
      for (let i = 0; i < itemIds.length; i++) {
        if (itemIds[i] !== null) {
          this.deleteItemById(itemIds[i], { triggerEvent: false });
        }
      }

      // end the bulk transaction since we're all done
      this._dataView.endUpdate();

      // do we want to trigger an event after deleting the item
      if (options.triggerEvent) {
        this.onItemDeleted.next(itemIds);
      }
      return itemIds;
    }
    return [];
  }

  /** @deprecated please use "updateItem" method instead */
  updateDataGridItem(item: any, shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true): number {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "updateItem" method since "updateDataGridItem" will be deprecated in the future.');
    return this.updateItem(item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /** @deprecated please use "updateItems" method instead */
  updateDataGridItems(items: any | any[], shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true): number[] {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "updateItems" method since "updateDataGridItems" will be deprecated in the future.');
    return this.updateItems(items, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /** @deprecated please use "updateItemById" method instead */
  updateDataGridItemById(itemId: number | string, item: any, shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true): number {
    console.warn('[Angular-Slickgrid - GridService] please consider using the new "updateItemById" method since "updateDataGridItemById" will be deprecated in the future.');
    return this.updateItemById(itemId, item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /**
   * Update an existing item with new properties inside the datagrid
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
   * @return grid row index
   */
  updateItem<T = any>(item: T, options?: GridServiceUpdateOption): number {
    options = { ...GridServiceUpdateOptionDefaults, ...options };
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';
    const itemId = (!item || !(idPropName in item)) ? undefined : (item as any)[idPropName];

    if (itemId === undefined) {
      throw new Error(`Calling Update of an item requires the item to include an "${idPropName}" property`);
    }

    return this.updateItemById<T>(itemId, item, options);
  }

  /**
   * Update an array of existing items with new properties inside the datagrid
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the update (highlightRow, selectRow, triggerEvent)
   * @return grid row indexes
   */
  updateItems<T = any>(items: T | T[], options?: GridServiceUpdateOption): number[] {
    options = { ...GridServiceUpdateOptionDefaults, ...options };
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';

    // when it's not an array, we can call directly the single item update
    if (!Array.isArray(items)) {
      return [this.updateItem<T>(items, options)];
    }

    // begin bulk transaction
    this._dataView.beginUpdate(true);

    // loop through each item, get their Ids
    // also call a grid render on the modified row for the item to be reflected in the UI
    const rowNumbers: number[] = [];
    const itemIds: Array<string | number> = [];
    items.forEach((item: T) => {
      const itemId = (!item || !(idPropName in item)) ? undefined : (item as any)[idPropName];
      itemIds.push(itemId); // keep item id reference

      if (this._dataView.getIdxById(itemId) !== undefined) {
        const rowNumber = this._dataView.getRowById(itemId);
        if (rowNumber !== undefined) {
          rowNumbers.push(rowNumber);
          this._grid.updateRow(rowNumber);
        }
      }
    });

    // Update the items in the dataView, note that the itemIds must be in the same order as the items
    this._dataView.updateItems(itemIds, items);

    // end the bulk transaction since we're all done
    this._dataView.endUpdate();

    // only highlight at the end, all at once
    // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
    if (options.highlightRow) {
      this.highlightRow(rowNumbers);
    }

    // select the row in the grid
    if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this.setSelectedRows(rowNumbers);
    }

    // do we want to trigger an event after updating the item
    if (options.triggerEvent) {
      this.onItemUpdated.next(items);
    }

    return rowNumbers;
  }

  /**
   * Update an existing item in the datagrid by it's id and new properties
   * @param itemId: item unique id
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
   * @return grid row number
   */
  updateItemById<T = any>(itemId: number | string, item: T, options?: GridServiceUpdateOption): number {
    options = { ...GridServiceUpdateOptionDefaults, ...options };
    if (itemId === undefined) {
      throw new Error(`Cannot update a row without a valid "id"`);
    }
    const rowNumber = this._dataView.getRowById(itemId);

    if (!item || rowNumber === undefined) {
      throw new Error(`The item to update in the grid was not found with id: ${itemId}`);
    }

    if (this._dataView.getIdxById(itemId) !== undefined) {
      // Update the item itself inside the dataView
      this._dataView.updateItem(itemId, item);
      this._grid.updateRow(rowNumber);

      // do we want to scroll to the row so that it shows in the Viewport (UI)
      if (options.scrollRowIntoView) {
        this._grid.scrollRowIntoView(rowNumber);
      }

      // highlight the row we just updated, if defined
      if (options.highlightRow) {
        this.highlightRow(rowNumber);
      }

      // select the row in the grid
      if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
        this.setSelectedRow(rowNumber);
      }

      // do we want to trigger an event after updating the item
      if (options.triggerEvent) {
        this.onItemUpdated.next(item);
      }
    }
    return rowNumber;
  }

  /**
   * Insert a row into the grid if it doesn't already exist or update if it does.
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   */
  upsertItem<T = any>(item: T, options?: GridServiceInsertOption): { added: number | undefined, updated: number | undefined } {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    const idPropName = this._gridOptions.datasetIdPropertyName || 'id';
    const itemId = (!item || !(idPropName in item)) ? undefined : (item as any)[idPropName];

    if (itemId === undefined) {
      throw new Error(`Calling Upsert of an item requires the item to include an "${idPropName}" property`);
    }

    return this.upsertItemById<T>(itemId, item, options);
  }

  /**
   * Update an array of existing items with new properties inside the datagrid
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   * @return row numbers in the grid
   */
  upsertItems<T = any>(items: T | T[], options?: GridServiceInsertOption): { added: number | undefined, updated: number | undefined }[] {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    // when it's not an array, we can call directly the single item upsert
    if (!Array.isArray(items)) {
      return [this.upsertItem<T>(items, options)];
    }

    // begin bulk transaction
    this._dataView.beginUpdate(true);
    const upsertedRows: { added: number | undefined, updated: number | undefined }[] = [];
    items.forEach((item: T) => {
      upsertedRows.push(this.upsertItem<T>(item, { ...options, highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }));
    });

    // end the bulk transaction since we're all done
    this._dataView.endUpdate();

    const rowNumbers = upsertedRows.map((upsertRow) => upsertRow.added !== undefined ? upsertRow.added : upsertRow.updated);
    // only highlight at the end, all at once
    // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
    if (options.highlightRow) {
      this.highlightRow(rowNumbers as number[]);
    }

    // select the row in the grid
    if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this.setSelectedRows(rowNumbers as number[]);
    }

    // do we want to trigger an event after updating the item
    if (options.triggerEvent) {
      this.onItemUpserted.next(items);
      const addedItems = upsertedRows.filter((upsertRow) => upsertRow.added !== undefined);
      if (Array.isArray(addedItems) && addedItems.length > 0) {
        this.onItemAdded.next(addedItems);
      }
      const updatedItems = upsertedRows.filter((upsertRow) => upsertRow.updated !== undefined);
      if (Array.isArray(updatedItems) && updatedItems.length > 0) {
        this.onItemUpdated.next(updatedItems);
      }
    }
    return upsertedRows;
  }

  /**
   * Update an existing item in the datagrid by it's id and new properties
   * @param itemId: item unique id
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   * @return grid row number in the grid
   */
  upsertItemById<T = any>(itemId: number | string, item: T, options?: GridServiceInsertOption): { added: number | undefined, updated: number | undefined } {
    let isItemAdded = false;
    options = { ...GridServiceInsertOptionDefaults, ...options };
    if (itemId === undefined) {
      if (!this.hasRowSelectionEnabled()) {
        throw new Error(`Calling Upsert of an item requires the item to include a valid and unique "id" property`);
      }
    }

    let rowNumberAdded;
    let rowNumberUpdated;
    if (this._dataView.getRowById(itemId) === undefined) {
      rowNumberAdded = this.addItem<T>(item, options);
      isItemAdded = true;
    } else {
      rowNumberUpdated = this.updateItem<T>(item, { highlightRow: options.highlightRow, selectRow: options.selectRow, triggerEvent: options.triggerEvent });
      isItemAdded = false;
    }

    // do we want to trigger an event after updating the item
    if (options.triggerEvent) {
      this.onItemUpserted.next(item);
      isItemAdded ? this.onItemAdded.next(item) : this.onItemUpdated.next(item);
    }
    return { added: rowNumberAdded, updated: rowNumberUpdated };
  }

  /**
   * When dealing with hierarchical dataset, we can invalidate all the rows and force a resort & re-render of the hierarchical dataset.
   * This method will automatically be called anytime user called `addItem()` or `addItems()`.
   * However please note that it won't be called when `updateItem`, if the data that gets updated does change the tree data column then you should call this method.
   */
  invalidateHierarchicalDataset() {
    // if we add/remove item(s) from the dataset, we need to also refresh our tree data filters
    if (this._gridOptions?.enableTreeData && this.treeDataService) {
      const sortedDatasetResult = this.treeDataService.convertToHierarchicalDatasetAndSort(this._dataView.getItems(), this.sharedService.allColumns, this._gridOptions);
      this.sharedService.hierarchicalDataset = sortedDatasetResult.hierarchical;
      this.filterService.refreshTreeDataFilters();
      this._dataView.setItems(sortedDatasetResult.flat);
    }
  }

  // --
  // private functions
  // -------------------

  /** Check wether the grid has the Row Selection enabled */
  private hasRowSelectionEnabled() {
    const selectionModel = this._grid.getSelectionModel();
    const isRowSelectionEnabled = this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector;
    return (isRowSelectionEnabled && selectionModel);
  }
}
