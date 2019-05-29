import { Injectable } from '@angular/core';
import { CellArgs, Column, GridOption, OnEventArgs } from './../models/index';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';

// using external non-typed js libraries
declare var $: any;
declare var Slick: any;

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
      grid: this._grid,
      gridDefinition: this._gridOptions
    };
  }

  /** Get data item by it's row index number */
  getDataItemByRowNumber(rowNumber: number) {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object');
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

      if (item && item._dirty) {
        meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
      }

      if (!meta) {
        meta = { cssClasses: '' };
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
  highlightRow(rowNumber: number | number[], fadeDelay: number = 1500) {
    // create a SelectionModel if there's not one yet
    if (!this._grid.getSelectionModel()) {
      const rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
      this._grid.setSelectionModel(rowSelectionPlugin);
    }

    const rowIndexes = Array.isArray(rowNumber) ? rowNumber : [rowNumber];
    this._grid.setSelectedRows(rowIndexes);

    if (Array.isArray(rowNumber)) {
      rowNumber.forEach(row => this.highlightRowByMetadata(row, fadeDelay));
    } else {
      this.highlightRowByMetadata(rowNumber, fadeDelay);
    }
  }

  highlightRowByMetadata(rowNumber: number, fadeDelay: number = 1500) {
    this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);

    const item = this._dataView.getItem(rowNumber);
    if (item && item.id) {
      item.rowClass = 'highlight';
      this._dataView.updateItem(item.id, item);
      const gridOptions = this._grid.getOptions() as GridOption;

      // highlight the row for a user defined timeout
      $(`#${gridOptions.gridId}`)
        .find(`.highlight.row${rowNumber}`)
        .first();

      // delete the row's CSS that was attached for highlighting
      setTimeout(() => {
        if (item && item.id) {
          delete item.rowClass;
          const gridIdx = this._dataView.getIdxById(item.id);
          if (gridIdx !== undefined) {
            this._dataView.updateItem(item.id, item);
          }
        }
      }, fadeDelay + 10);
    }
  }

  /** Get the Data Item from a grid row index */
  getDataItemByRowIndex(index: number) {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object');
    }

    return this._grid.getDataItem(index);
  }

  /** Get the Data Item from an array of grid row indexes */
  getDataItemByRowIndexes(indexes: number[]) {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object');
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
  getSelectedRows() {
    return this._grid.getSelectedRows();
  }

  /** Get the currently selected rows item data */
  getSelectedRowsDataItem() {
    if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
      throw new Error('We could not find SlickGrid Grid object');
    }

    const selectedRowIndexes = this._grid.getSelectedRows();
    return this.getDataItemByRowIndexes(selectedRowIndexes);
  }

  /** Select the selected row by a row index */
  setSelectedRow(rowIndex: number) {
    this._grid.setSelectedRows([rowIndex]);
  }

  /** Set selected rows with provided array of row indexes */
  setSelectedRows(rowIndexes: number[]) {
    this._grid.setSelectedRows(rowIndexes);
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
  addItemToDatagrid(item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number {
    return this.addItem(item, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent);
  }

  /** @deprecated please use "addItems" method instead */
  addItemsToDatagrid(items: any[], shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number[] {
    return this.addItems(items, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent);
  }

  /**
   * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param shouldHighlightRow do we want to highlight the row after adding item
   * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   * @return rowIndex: typically index 0
   */
  addItem(item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number {
    if (!this._grid || !this._gridOptions || !this._dataView) {
      throw new Error('We could not find SlickGrid Grid, DataView objects');
    }

    this._dataView.insertItem(0, item); // insert at index 0

    if (!shouldResortGrid) {
      this._grid.scrollRowIntoView(0); // scroll to row 0
    }

    // highlight the row we just added, if highlight is defined
    let rowNumber = 0;
    if (shouldHighlightRow && !shouldResortGrid) {
      this.highlightRow(rowNumber, 1500);
    }

    // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
    if (shouldResortGrid) {
      this._dataView.reSort();

      // if user wanted to see highlighted row
      // we need to do it here after resort and get each row number because it possibly changes after the sort
      if (shouldHighlightRow) {
        rowNumber = this._dataView.getRowById(item.id);
        this.highlightRow(rowNumber, 1500);
      }
    }

    // do we want to trigger an event after adding the item
    if (shouldTriggerEvent) {
      this.onItemAdded.next(item);
    }

    return rowNumber;
  }

  /**
   * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param shouldHighlightRow do we want to highlight the row after adding item
   * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  addItems(items: any[], shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number[] {
    let highlightRow = shouldHighlightRow;
    if (shouldResortGrid) {
      highlightRow = false; // don't highlight until later when shouldResortGrid is set to true
    }

    const rowNumbers: number[] = [];

    // loop through all items to add
    if (Array.isArray(items)) {
      items.forEach((item: any) => this.addItem(item, highlightRow, false, false));
    }

    // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
    if (shouldResortGrid) {
      this._dataView.reSort();

      // if user wanted to see highlighted row
      // we need to do it here after resort and get each row number because it possibly changes after the sort
      if (shouldHighlightRow) {
        items.forEach((item: any) => {
          const rowNumber = this._dataView.getRowById(item.id);
          rowNumbers.push(rowNumber);
          this.highlightRow(rowNumber, 1500);
        });
      }
    }

    // do we want to trigger an event after adding the item
    if (shouldTriggerEvent) {
      this.onItemAdded.next(items);
    }

    return rowNumbers;
  }

  /** @deprecated please use "deleteItem" method instead */
  deleteDataGridItem(item: any, shouldTriggerEvent = true) {
    this.deleteItem(item, shouldTriggerEvent);
  }

  /** @deprecated please use "deleteItems" method instead */
  deleteDataGridItems(items: any[], shouldTriggerEvent = true) {
    this.deleteItems(items, shouldTriggerEvent);
  }

  /** @deprecated please use "deleteItemById" method instead */
  deleteDataGridItemById(itemId: string | number, shouldTriggerEvent = true) {
    this.deleteItemById(itemId, shouldTriggerEvent);
  }

  /** @deprecated please use "deleteItemByIds" method instead */
  deleteDataGridItemByIds(itemIds: number[] | string[], shouldTriggerEvent = true) {
    this.deleteItemByIds(itemIds, shouldTriggerEvent);
  }

  /**
   * Delete an existing item from the datagrid (dataView)
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteItem(item: any, shouldTriggerEvent = true) {
    if (!item || !item.hasOwnProperty('id')) {
      throw new Error(`Deleting an item requires the item to include an "id" property`);
    }
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
    this.deleteItemById(itemId, shouldTriggerEvent);
  }

  /**
   * Delete an array of existing items from the datagrid
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteItems(items: any[], shouldTriggerEvent = true) {
    // when it's not an array, we can call directly the single item delete
    if (!Array.isArray(items)) {
      this.deleteItem(items, shouldTriggerEvent);
    }
    items.forEach((item: any) => this.deleteItem(item, false));

    // do we want to trigger an event after deleting the item
    if (shouldTriggerEvent) {
      this.onItemDeleted.next(items);
    }
  }

  /**
   * Delete an existing item from the datagrid (dataView) by it's id
   * @param itemId: item unique id
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteItemById(itemId: string | number, shouldTriggerEvent = true) {
    if (itemId === undefined) {
      throw new Error(`Cannot delete a row without a valid "id"`);
    }

    // when user has row selection enabled, we should clear any selection to avoid confusion after a delete
    if (this._grid && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
      this._grid.setSelectedRows([]);
    }

    // delete the item from the dataView
    this._dataView.deleteItem(itemId);

    // do we want to trigger an event after deleting the item
    if (shouldTriggerEvent) {
      this.onItemDeleted.next(itemId);
    }
  }

  /**
   * Delete an array of existing items from the datagrid
   * @param itemIds array of item unique IDs
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteItemByIds(itemIds: number[] | string[], shouldTriggerEvent = true) {
    // when it's not an array, we can call directly the single item delete
    if (!Array.isArray(itemIds)) {
      this.deleteItemById(itemIds);
    }
    for (let i = 0; i < itemIds.length; i++) {
      if (itemIds[i] !== null) {
        this.deleteItemById(itemIds[i], false);
      }
    }

    // do we want to trigger an event after deleting the item
    if (shouldTriggerEvent) {
      this.onItemDeleted.next(itemIds);
    }
  }

  /** @deprecated please use "updateItem" method instead */
  updateDataGridItem(item: any, shouldHighlightRow = true, shouldTriggerEvent = true): number {
    return this.updateItem(item, shouldHighlightRow, shouldTriggerEvent);
  }

  /** @deprecated please use "updateItems" method instead */
  updateDataGridItems(items: any | any[], shouldHighlightRow = true, shouldTriggerEvent = true): number[] {
    return this.updateItems(items, shouldHighlightRow, shouldTriggerEvent);
  }

  /** @deprecated please use "updateItemById" method instead */
  updateDataGridItemById(itemId: number | string, item: any, shouldHighlightRow = true, shouldTriggerEvent = true): number {
    return this.updateItemById(itemId, item, shouldHighlightRow, shouldTriggerEvent);
  }

  /**
   * Update an existing item with new properties inside the datagrid
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   * @return grid row index
   */
  updateItem(item: any, shouldHighlightRow = true, shouldTriggerEvent = true): number {
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;

    if (itemId === undefined) {
      throw new Error(`Calling Update of an item requires the item to include an "id" property`);
    }

    return this.updateItemById(itemId, item, shouldHighlightRow, shouldTriggerEvent);
  }

  /**
   * Update an array of existing items with new properties inside the datagrid
   * @param item object arrays, which must contain unique "id" property and any other suitable properties
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   * @return grid row indexes
   */
  updateItems(items: any | any[], shouldHighlightRow = true, shouldTriggerEvent = true): number[] {
    // when it's not an array, we can call directly the single item update
    if (!Array.isArray(items)) {
      this.updateItem(items, shouldHighlightRow, shouldTriggerEvent);
    }

    const gridIndexes: number[] = [];
    items.forEach((item: any) => {
      gridIndexes.push(this.updateItem(item, false, false));
    });

    // only highlight at the end, all at once
    // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
    if (shouldHighlightRow) {
      this.highlightRow(gridIndexes);
    }

    // do we want to trigger an event after updating the item
    if (shouldTriggerEvent) {
      this.onItemUpdated.next(items);
    }

    return gridIndexes;
  }

  /**
   * Update an existing item in the datagrid by it's id and new properties
   * @param itemId: item unique id
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   * @return grid row index
   */
  updateItemById(itemId: number | string, item: any, shouldHighlightRow = true, shouldTriggerEvent = true): number {
    if (itemId === undefined) {
      throw new Error(`Cannot update a row without a valid "id"`);
    }
    const rowNumber = this._dataView.getRowById(itemId);

    if (!item || rowNumber === undefined) {
      throw new Error(`Deleting an item requires the item to include an "id" property`);
    }

    const gridIdx = this._dataView.getIdxById(itemId);
    if (gridIdx !== undefined) {
      // Update the item itself inside the dataView
      this._dataView.updateItem(itemId, item);
      this._grid.updateRow(rowNumber);

      // highlight the row we just updated, if defined
      if (shouldHighlightRow) {
        this.highlightRow(rowNumber, 1500);
      }

      // do we want to trigger an event after updating the item
      if (shouldTriggerEvent) {
        this.onItemUpdated.next(item);
      }

      return gridIdx;
    }
    return rowNumber;
  }

  /**
   * Insert a row into the grid if it doesn't already exist or update if it does.
   * @param item object which must contain a unique "id" property and any other suitable properties
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  upsertItem(item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number {
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;

    if (itemId === undefined) {
      throw new Error(`Calling Upsert of an item requires the item to include an "id" property`);
    }

    return this.upsertItemById(itemId, item, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent);
  }

  /**
 * Update an array of existing items with new properties inside the datagrid
 * @param item object arrays, which must contain unique "id" property and any other suitable properties
 * @param shouldHighlightRow do we want to highlight the row after update
 * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
 * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
 */
  upsertItems(items: any | any[], shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number[] {
    // when it's not an array, we can call directly the single item update
    if (!Array.isArray(items)) {
      return [this.upsertItem(items, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent)];
    }

    const gridIndexes: number[] = [];
    items.forEach((item: any) => {
      gridIndexes.push(this.upsertItem(item, false, false, false));
    });

    // only highlight at the end, all at once
    // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
    if (shouldHighlightRow) {
      this.highlightRow(gridIndexes);
    }

    // do we want to trigger an event after updating the item
    if (shouldTriggerEvent) {
      this.onItemUpserted.next(items);
    }
    return gridIndexes;
  }

  /**
 * Update an existing item in the datagrid by it's id and new properties
 * @param itemId: item unique id
 * @param item object which must contain a unique "id" property and any other suitable properties
 * @param shouldHighlightRow do we want to highlight the row after update
 * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
 * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
 * @return grid row index
 */
  upsertItemById(itemId: number | string, item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true): number {
    if (itemId === undefined) {
      throw new Error(`Calling Upsert of an item requires the item to include a valid and unique "id" property`);
    }

    let rowNumber: number;
    if (this._dataView.getRowById(itemId) === undefined) {
      rowNumber = this.addItem(item, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent);
    } else {
      rowNumber = this.updateItem(item, shouldHighlightRow, shouldTriggerEvent);
    }

    // do we want to trigger an event after updating the item
    if (shouldTriggerEvent) {
      this.onItemUpserted.next(item);
    }
    return rowNumber;
  }
}
