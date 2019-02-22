import { TranslateService } from '@ngx-translate/core';
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

  constructor(private extensionService: ExtensionService, private filterService: FilterService, private gridStateService: GridStateService, private sortService: SortService, private translate: TranslateService) { }

  /** Getter for the Column Definitions pulled through the Grid Object */
  private get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

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
      // const originalColumns = columnDefinitions || this._columnDefinitions;
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

  /**
   * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param object dataItem: item object holding all properties of that row
   * @param shouldHighlightRow do we want to highlight the row after adding item
   * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  addItemToDatagrid(item: any, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true) {
    if (!this._grid || !this._gridOptions || !this._dataView) {
      throw new Error('We could not find SlickGrid Grid, DataView objects');
    }

    this._dataView.insertItem(0, item); // insert at index 0

    if (!shouldResortGrid) {
      this._grid.scrollRowIntoView(0); // scroll to row 0
    }

    // highlight the row we just added, if highlight is defined
    if (shouldHighlightRow && !shouldResortGrid) {
      this.highlightRow(0, 1500);
    }

    // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
    if (shouldResortGrid) {
      this._dataView.reSort();

      // if user wanted to see highlighted row
      // we need to do it here after resort and get each row number because it possibly changes after the sort
      if (shouldHighlightRow) {
        const rowNumber = this._dataView.getRowById(item.id);
        this.highlightRow(rowNumber, 1500);
      }
    }

    // do we want to trigger an event after adding the item
    if (shouldTriggerEvent) {
      this.onItemAdded.next(item);
    }
  }

  /**
   * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
   * @param dataItem array: item object holding all properties of that row
   * @param shouldHighlightRow do we want to highlight the row after adding item
   * @param shouldResortGrid defaults to false, do we want the item to be sorted after insert? When set to False, it will add item on first row (default)
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  addItemsToDatagrid(items: any[], shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true) {
    let highlightRow = shouldHighlightRow;
    if (shouldResortGrid) {
      highlightRow = false; // don't highlight until later when shouldResortGrid is set to true
    }

    // loop through all items to add
    if (Array.isArray(items)) {
      items.forEach((item: any) => this.addItemToDatagrid(item, highlightRow, false, false));
    }

    // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
    if (shouldResortGrid) {
      this._dataView.reSort();

      // if user wanted to see highlighted row
      // we need to do it here after resort and get each row number because it possibly changes after the sort
      if (shouldHighlightRow) {
        items.forEach((item: any) => {
          const rowNumber = this._dataView.getRowById(item.id);
          this.highlightRow(rowNumber, 1500);
        });
      }
    }

    // do we want to trigger an event after adding the item
    if (shouldTriggerEvent) {
      this.onItemAdded.next(items);
    }
  }

  /**
   * Delete an existing item from the datagrid (dataView)
   * @param object item: item object holding all properties of that row
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteDataGridItem(item: any, shouldTriggerEvent = true) {
    if (!item || !item.hasOwnProperty('id')) {
      throw new Error(`deleteDataGridItem() requires an item object which includes the "id" property`);
    }
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
    this.deleteDataGridItemById(itemId, shouldTriggerEvent);
  }

  /**
   * Delete an array of existing items from the datagrid
   * @param object item: item object holding all properties of that row
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteDataGridItems(items: any[], shouldTriggerEvent = true) {
    // when it's not an array, we can call directly the single item delete
    if (!Array.isArray(items)) {
      this.deleteDataGridItem(items);
    }
    items.forEach((item: any) => this.deleteDataGridItem(item, false));

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
  deleteDataGridItemById(itemId: string | number, shouldTriggerEvent = true) {
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
   * @param object item: item object holding all properties of that row
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  deleteDataGridItemByIds(itemIds: number[] | string[], shouldTriggerEvent = true) {
    // when it's not an array, we can call directly the single item delete
    if (!Array.isArray(itemIds)) {
      this.deleteDataGridItemById(itemIds);
    }
    for (let i = 0; i < itemIds.length; i++) {
      if (itemIds[i] !== null) {
        this.deleteDataGridItemById(itemIds[i], false);
      }
    }

    // do we want to trigger an event after deleting the item
    if (shouldTriggerEvent) {
      this.onItemDeleted.next(itemIds);
    }
  }

  /**
   * Update an existing item with new properties inside the datagrid
   * @param object item: item object holding all properties of that row
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   * @return grid row index
   */
  updateDataGridItem(item: any, shouldHighlightRow = true, shouldTriggerEvent = true) {
    const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;

    if (itemId === undefined) {
      throw new Error(`Could not find the item in the grid or it's associated "id"`);
    }

    return this.updateDataGridItemById(itemId, item, shouldHighlightRow, shouldTriggerEvent);
  }

  /**
   * Update an array of existing items with new properties inside the datagrid
   * @param object item: array of item objects
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   */
  updateDataGridItems(items: any | any[], shouldHighlightRow = true, shouldTriggerEvent = true) {
    // when it's not an array, we can call directly the single item update
    if (!Array.isArray(items)) {
      this.updateDataGridItem(items, shouldHighlightRow);
    }

    const gridIndexes: number[] = [];
    items.forEach((item: any) => {
      gridIndexes.push(this.updateDataGridItem(item, false, false));
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
  }

  /**
   * Update an existing item in the datagrid by it's id and new properties
   * @param itemId: item unique id
   * @param object item: item object holding all properties of that row
   * @param shouldHighlightRow do we want to highlight the row after update
   * @param shouldTriggerEvent defaults to true, which will trigger an event (used by at least the pagination component)
   * @return grid row index
   */
  updateDataGridItemById(itemId: number | string, item: any, shouldHighlightRow = true, shouldTriggerEvent = true) {
    if (itemId === undefined) {
      throw new Error(`Cannot update a row without a valid "id"`);
    }
    const rowNumber = this._dataView.getRowById(itemId);

    if (!item || rowNumber === undefined) {
      throw new Error(`Could not find the item in the grid or it's associated "id"`);
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
  }
}
