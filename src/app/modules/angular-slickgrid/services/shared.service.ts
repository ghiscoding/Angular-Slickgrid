import { Subject } from 'rxjs';

import { Column, GridOption } from '../models';

export class SharedService {
  private _allColumns: Column[];
  private _dataView: any;
  private _groupItemMetadataProvider: any;
  private _grid: any;
  private _gridOptions: GridOption;
  private _visibleColumns: Column[];
  onColumnsChanged = new Subject<Column[]>();

  // --
  // public

  /** Getter for All Columns  in the grid (hidden/visible) */
  get allColumns(): Column[] {
    return this._allColumns;
  }
  /** Setter for All Columns  in the grid (hidden/visible) */
  set allColumns(allColumns: Column[]) {
    this._allColumns = allColumns;
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  get columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  /** Getter for SlickGrid DataView object */
  get dataView(): any {
    return this._dataView;
  }
  /** Setter for SlickGrid DataView object */
  set dataView(dataView: any) {
    this._dataView = dataView;
  }

  /** Getter for SlickGrid Grid object */
  get grid(): any {
    return this._grid;
  }
  /** Setter for SlickGrid Grid object */
  set grid(grid: any) {
    this._grid = grid;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return this._gridOptions || this._grid && this._grid.getOptions && this._grid.getOptions() || {};
  }

  /** Setter for the Grid Options pulled through the Grid Object */
  set gridOptions(gridOptions: GridOption) {
    this._gridOptions = gridOptions;
  }

  /** Getter for the Grid Options */
  get groupItemMetadataProvider(): any {
    return this._groupItemMetadataProvider;
  }
  /** Setter for the Grid Options */
  set groupItemMetadataProvider(groupItemMetadataProvider: any) {
    this._groupItemMetadataProvider = groupItemMetadataProvider;
  }

  /** Getter for the Visible Columns in the grid */
  get visibleColumns(): Column[] {
    return this._visibleColumns;
  }
  /** Setter for the Visible Columns in the grid */
  set visibleColumns(visibleColumns: Column[]) {
    this._visibleColumns = visibleColumns;
  }
}
