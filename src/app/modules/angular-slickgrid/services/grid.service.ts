import { Injectable } from '@angular/core';
import {
  CellArgs,
  Column,
  GridOption,
  GridServiceDeleteOption,
  GridServiceInsertOption,
  GridServiceUpdateOption,
  OnEventArgs
} from './../models/index';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';

// using external non-typed js libraries
declare var Slick: any;
let highlightTimerEnd: any;
const GridServiceDeleteOptionDefaults: GridServiceDeleteOption = { triggerEvent: true };
const GridServiceInsertOptionDefaults: GridServiceInsertOption = { highlightRow: true, position: 'top', resortGrid: false, selectRow: false, triggerEvent: true };
const GridServiceUpdateOptionDefaults: GridServiceUpdateOption = { highlightRow: true, selectRow: false, scrollRowIntoView: false, triggerEvent: true };

@Injectable()
export class GridService {
  private _grid: any;
  private _dataView: any;
  onItemAdded = new Subject<any | any[]>();
  onItemDeleted = new Subject<any | any[]>();
  onItemUpdated = new Subject<any | any[]>();
  onItemUpserted = new Subject<any | any[]>();

  constructor(
    private extensionService: ExtensionService,
    private filterService: FilterService,
    private gridStateService: GridStateService,
    private sortService: SortService
  ) { }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
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
  getDataItemByRowNumber(rowNumber: number) {
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
   * Highlight then fade a row for x seconds.
   * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
   * @param rowNumber
   * @param fadeDelay
   */
  highlightRow(rowNumber: number | number[], fadeDelay = 1500, fadeOutDelay = 300) {
    // create a SelectionModel if there's not one yet
    if (!this._grid.getSelectionModel()) {
      const rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
      this._grid.setSelectionModel(rowSelectionPlugin);
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
    if (item && item.id) {
      item.rowClass = 'highlight';
      this._dataView.updateItem(item.id, item);
      this.renderGrid();

      // fade out
      clearTimeout(highlightTimerEnd);
      highlightTimerEnd = setTimeout(() => {
        item.rowClass = 'highlight-end';
        this._dataView.updateItem(item.id, item);
        this.renderGrid();
      }, fadeOutDelay);

      // delete the row's CSS highlight classes once the delay is passed
      setTimeout(() => {
        if (item && item.id) {
          delete item.rowClass;
          if (this._dataView.getIdxById(item.id) !== undefined) {
            this._dataView.updateItem(item.id, item);
            this.renderGrid();
          }
        }
      }, fadeDelay + fadeOutDelay);
    }
  }

  /** Get the Data Item from a grid row index */
  getDataItemByRowIndex(index: number): any {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
    }

    return this._grid.getDataItem(index);
  }

  /** Get the Data Item from an array of grid row indexes */
  getDataItemByRowIndexes(indexes: number[]): any[] {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
    }

    const dataItems = [];

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
  getSelectedRowsDataItem(): any[] {
    if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
      throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
    }

    const selectedRowIndexes = this._grid.getSelectedRows();
    return this.getDataItemByRowIndexes(selectedRowIndexes);
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
      const originalColumns = this.extensionService.getAllColumns();

      if (Array.isArray(originalColumns) && originalColumns.length > 0) {
        // set the grid columns to it's original column definitions
        this._grid.setColumns(originalColumns);
        if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
          this._grid.autosizeColumns();
        }
        this.gridStateService.resetColumns(columnDefinitions);
      }
    }

    if (this.filterService && this.filterService.clearFilters) {
      this.filterService.clearFilters();
    }
    if (this.sortService && this.sortService.clearSorting) {
      this.sortService.clearSorting();
    }
  }

  /** @deprecated please use "addItem" method instead */
  addItemToDatagrid(item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true, shouldSelectRow = true): number {
    return this.addItem(item, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /** @deprecated please use "addItems" method instead */
  addItemsToDatagrid(items: any[], shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true, shouldSelectRow = true): number[] {
    return this.addItems(items, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /**
   * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   * @return rowIndex: typically index 0 when adding to position "top" or a different number when adding to the "bottom"
   */
  addItem(item: any, options?: GridServiceInsertOption): number {
    options = { ...GridServiceInsertOptionDefaults, ...options };

    if (!this._grid || !this._gridOptions || !this._dataView) {
      throw new Error('We could not find SlickGrid Grid, DataView objects');
    }
    if (!item || !item.hasOwnProperty('id')) {
      throw new Error(`Adding an item requires the item to include an "id" property`);
    }

    // insert position top/bottom, defaults to top
    // when position is top we'll call insert at index 0, else call addItem which just push to the DataView array
    if (options && options.position === 'bottom') {
      this._dataView.addItem(item);
    } else {
      this._dataView.insertItem(0, item); // insert at index 0
    }

    // row number in the grid, by default it will be on first row (top is the default)
    let rowNumber = 0;

    // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
    if (options.resortGrid) {
      this._dataView.reSort();

      // find the row number in the grid and if user wanted to see highlighted row
      // we need to do it here after resort and get each row number because it possibly changes after the sort
      rowNumber = this._dataView.getRowById(item.id);
    } else {
      // scroll to row index 0 when inserting on top else scroll to the bottom where it got inserted
      rowNumber = (options && options.position === 'bottom') ? this._dataView.getRowById(item.id) : 0;
      this._grid.scrollRowIntoView(rowNumber);
    }

    // if highlight is enabled, we'll highlight the row we just added
    if (options.highlightRow) {
      this.highlightRow(rowNumber);
    }

    // if row selection (checkbox selector) is enabled, we'll select the row in the grid
    if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
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
  addItems(items: any | any[], options?: GridServiceInsertOption): number[] {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    const rowNumbers: number[] = [];

    // loop through all items to add
    if (!Array.isArray(items)) {
      return [this.addItem(items, options)];
    } else {
      items.forEach((item: any) => this.addItem(item, { ...options, highlightRow: false, resortGrid: false, triggerEvent: false, selectRow: false }));
    }

    // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
    if (options.resortGrid) {
      this._dataView.reSort();
    }

    // scroll to row index 0 when inserting on top else scroll to the bottom where it got inserted
    (options && options.position === 'bottom') ? this._grid.navigateBottom() : this._grid.navigateTop();

    // get row numbers of all new inserted items
    // we need to do it after resort and get each row number because it possibly changed after the sort
    items.forEach((item: any) => rowNumbers.push(this._dataView.getRowById(item.id)));

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
    this.deleteItem(item, { triggerEvent: shouldTriggerEvent });
  }

  /** @deprecated please use "deleteItems" method instead */
  deleteDataGridItems(items: any[], shouldTriggerEvent = true) {
    this.deleteItems(items, { triggerEvent: shouldTriggerEvent });
  }

  /** @deprecated please use "deleteItemById" method instead */
  deleteDataGridItemById(itemId: string | number, shouldTriggerEvent = true) {
    this.deleteItemById(itemId, { triggerEvent: shouldTriggerEvent });
  }

  /** @deprecated please use "deleteItemByIds" method instead */
  deleteDataGridItemByIds(itemIds: number[] | string[], shouldTriggerEvent = true) {
    this.deleteItemByIds(itemIds, { triggerEvent: shouldTriggerEvent });
  }

  /**
   * Delete an existing item from the datagrid (dataView)
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
   * @return item id deleted
   */
  deleteItem(item: any, options?: GridServiceDeleteOption): number | string {
    options = { ...GridServiceDeleteOptionDefaults, ...options };

    if (!item || !item.hasOwnProperty('id')) {
      throw new Error(`Deleting an item requires the item to include an "id" property`);
    }
    return this.deleteItemById(item.id, options);
  }

  /**
   * Delete an array of existing items from the datagrid
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
   * @return item id deleted
   */
  deleteItems(items: any | any[], options?: GridServiceDeleteOption): number[] | string[] {
    options = { ...GridServiceDeleteOptionDefaults, ...options };

    // when it's not an array, we can call directly the single item delete
    if (!Array.isArray(items)) {
      this.deleteItem(items, options);
      return [items.id];
    }
    const itemIds = [];
    items.forEach((item: any) => {
      if (item && item.id !== undefined) {
        itemIds.push(item.id);
      }
      this.deleteItem(item, { ...options, triggerEvent: false });
    });

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
    if (this._grid && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
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
      for (let i = 0; i < itemIds.length; i++) {
        if (itemIds[i] !== null) {
          this.deleteItemById(itemIds[i], { triggerEvent: false });
        }
      }

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
    return this.updateItem(item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /** @deprecated please use "updateItems" method instead */
  updateDataGridItems(items: any | any[], shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true): number[] {
    return this.updateItems(items, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /** @deprecated please use "updateItemById" method instead */
  updateDataGridItemById(itemId: number | string, item: any, shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true): number {
    return this.updateItemById(itemId, item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
  }

  /**
   * Update an existing item with new properties inside the datagrid
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
   * @return grid row index
   */
  updateItem(item: any, options?: GridServiceUpdateOption): number {
    options = { ...GridServiceUpdateOptionDefaults, ...options };
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;

    if (itemId === undefined) {
      throw new Error(`Calling Update of an item requires the item to include an "id" property`);
    }

    return this.updateItemById(itemId, item, options);
  }

  /**
   * Update an array of existing items with new properties inside the datagrid
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
   * @return grid row indexes
   */
  updateItems(items: any | any[], options?: GridServiceUpdateOption): number[] {
    options = { ...GridServiceUpdateOptionDefaults, ...options };

    // when it's not an array, we can call directly the single item update
    if (!Array.isArray(items)) {
      return [this.updateItem(items, options)];
    }

    const gridRowNumbers: number[] = [];
    items.forEach((item: any) => {
      gridRowNumbers.push(this.updateItem(item, { ...options, highlightRow: false, selectRow: false, triggerEvent: false }));
    });

    // only highlight at the end, all at once
    // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
    if (options.highlightRow) {
      this.highlightRow(gridRowNumbers);
    }

    // select the row in the grid
    if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this.setSelectedRows(gridRowNumbers);
    }

    // do we want to trigger an event after updating the item
    if (options.triggerEvent) {
      this.onItemUpdated.next(items);
    }

    return gridRowNumbers;
  }

  /**
   * Update an existing item in the datagrid by it's id and new properties
   * @param itemId: item unique id
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
   * @return grid row number
   */
  updateItemById(itemId: number | string, item: any, options?: GridServiceUpdateOption): number {
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
  upsertItem(item: any, options?: GridServiceInsertOption): { added: number, updated: number } {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;

    if (itemId === undefined) {
      throw new Error(`Calling Upsert of an item requires the item to include an "id" property`);
    }

    return this.upsertItemById(itemId, item, options);
  }

  /**
   * Update an array of existing items with new properties inside the datagrid
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
   * @return row numbers in the grid
   */
  upsertItems(items: any | any[], options?: GridServiceInsertOption): { added: number, updated: number }[] {
    options = { ...GridServiceInsertOptionDefaults, ...options };
    // when it's not an array, we can call directly the single item update
    if (!Array.isArray(items)) {
      return [this.upsertItem(items, options)];
    }
    const upsertedRows: { added: number, updated: number }[] = [];
    items.forEach((item: any) => {
      upsertedRows.push(this.upsertItem(item, { ...options, highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }));
    });
    const rowNumbers = upsertedRows.map((upsertRow) => upsertRow.added !== undefined ? upsertRow.added : upsertRow.updated);
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
  upsertItemById(itemId: number | string, item: any, options?: GridServiceInsertOption): { added: number, updated: number } {
    let isItemAdded = false;
    options = { ...GridServiceInsertOptionDefaults, ...options };
    if (itemId === undefined) {
      throw new Error(`Calling Upsert of an item requires the item to include a valid and unique "id" property`);
    }

    let rowNumberAdded: number;
    let rowNumberUpdated: number;
    if (this._dataView.getRowById(itemId) === undefined) {
      rowNumberAdded = this.addItem(item, options);
      isItemAdded = true;
    } else {
      rowNumberUpdated = this.updateItem(item, { highlightRow: options.highlightRow, selectRow: options.selectRow, triggerEvent: options.triggerEvent });
      isItemAdded = false;
    }

    // do we want to trigger an event after updating the item
    if (options.triggerEvent) {
      this.onItemUpserted.next(item);
      isItemAdded ? this.onItemAdded.next(item) : this.onItemUpdated.next(item);
    }
    return { added: rowNumberAdded, updated: rowNumberUpdated };
  }
}
