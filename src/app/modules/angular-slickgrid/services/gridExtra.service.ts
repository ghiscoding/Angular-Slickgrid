import { Column, GridOption } from './../models';
import $ from 'jquery';

export class GridExtraService {
  private _grid: any;
  private _dataView: any;
  private _columnDefinition: Column[];
  private _gridOptions: GridOption;

  init(grid, columnDefinition, gridOptions, dataView) {
    this._grid = grid;
    this._columnDefinition = columnDefinition;
    this._gridOptions = gridOptions;
    this._dataView = dataView;
  }

  getDataItemByRowNumber(rowNumber: number) {
    if (!this._grid || typeof this._grid.getDataItem !== 'function') {
      throw new Error('We could not find SlickGrid Grid object');
    }
    return this._grid.getDataItem(rowNumber);
  }

  /** Chain the item Metadata with our implementation of Metadata at given row index */
  getItemRowMetadata(previousItemMetadata: any) {
    return (rowNumber: number) => {
      const item = this._dataView.getItem(rowNumber);
      let meta = {
        cssClasses: ''
      };
      if (typeof previousItemMetadata === 'object' && !$.isEmptyObject(previousItemMetadata)) {
        meta = previousItemMetadata(rowNumber);
      }

      if (item && item._dirty) {
        meta.cssClasses = (meta.cssClasses || '') + ' dirty';
      }
      if (item && item.rowClass) {
        meta.cssClasses += ` ${item.rowClass}`;
        meta.cssClasses += ` row${rowNumber}`;
      }

      return meta;
    };
  }

  /**
   * Highlight then fade a row for x seconds.
   * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
   * @param {number} rowNumber
   * @param {number} fadeDelay
   */
  highlightRow(rowNumber: number, fadeDelay: number = 1500) {
    // chain current item Metadata with our own Metadata for implementing highligh CSS styling
    const previousMetadata = this._dataView.getItemMetadata;
    this._grid.setSelectedRows([rowNumber]);
    this._dataView.getItemMetadata = this.getItemRowMetadata(this._dataView.getItemMetadata);

    const item = this._dataView.getItem(rowNumber);
    if (item && item.id) {
      item.rowClass = 'highlight';
      this._dataView.updateItem(item.id, item);
      const gridOptions = this._grid.getOptions() as GridOption;

      // highlight the row for a user defined timeout
      const rowElm = $(`#${gridOptions.gridId}`)
          .find(`.highlight.row${rowNumber}`)
          .first();

      // delete the row's CSS that was attached for highlighting
      setTimeout(() => {
        if (item && item.id) {
          delete item.rowClass;
          this._dataView.updateItem(item.id, item);
        }
      }, fadeDelay + 10);
    }
  }

  getSelectedRows() {
    return this._grid.getSelectedRows();
  }
  setSelectedRow(rowIndex: number) {
    this._grid.setSelectedRows([rowIndex]);
  }
  setSelectedRows(rowIndexes: number[]) {
    this._grid.setSelectedRows(rowIndexes);
  }

  renderGrid() {
    if (this._grid && typeof this._grid.invalidate === 'function') {
      this._grid.invalidate();
      this._grid.render();
    }
  }

  /**
   * Add an item (data item) to the datagrid
   * @param object dataItem: item object holding all properties of that row
   */
  addItemToDatagrid(item) {
    if (!this._grid || !this._gridOptions || !this._dataView) {
      throw new Error('We could not find SlickGrid Grid, DataView objects');
    }
    if (!this._gridOptions || (!this._gridOptions.enableCheckboxSelector && !this._gridOptions.enableRowSelection)) {
      throw new Error('addItemToDatagrid() requires to have a valid Slickgrid Selection Model. You can overcome this issue by enabling enableCheckboxSelector or enableRowSelection to True');
    }

    const row = 0;
    this._dataView.insertItem(row, item);
    this._grid.scrollRowIntoView(0); // scroll to row 0
    this.highlightRow(0, 1500);

    // refresh dataview & grid
    this._dataView.refresh();

    // get new dataset length
    const datasetLength = this._dataView.getLength();
  }

  /**
   * Update an existing item with new properties inside the datagrid
   * @param object item: item object holding all properties of that row
   */
  updateDataGridItem(item: any) {
    const row = this._dataView.getRowById(item.id);
    const itemId = (!item || !item.hasOwnProperty('id')) ? -1 : item.id;
    if (itemId === -1) {
      throw new Error(`Could not find the item in the item in the grid or it's associated "id"`);
    }

    if (item && itemId >= 0) {
      // Update the item itself inside the dataView
      this._dataView.updateItem(itemId, item);

      // highlight the row we just updated
      this.highlightRow(row, 1500);

      // refresh dataview & grid
      this._dataView.refresh();

      // get new dataset length
      const datasetLength = this._dataView.getLength();
    }
  }
}
