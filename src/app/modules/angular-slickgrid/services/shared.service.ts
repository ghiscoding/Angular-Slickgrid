import { Subject } from 'rxjs';

import { Column, CurrentPagination, SlickDataView, GridOption, SlickGrid } from '../models';

export class SharedService {
  private _allColumns: Column[];
  private _dataView: SlickDataView;
  private _groupItemMetadataProvider: any;
  private _grid: SlickGrid;
  private _gridOptions: GridOption;
  private _currentPagination: CurrentPagination;
  private _hideHeaderRowAfterPageLoad = false;
  private _visibleColumns: Column[];
  private _hierarchicalDataset: any[];
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

  /** Getter for the Current Pagination (when Pagination is enabled) */
  get currentPagination(): CurrentPagination | undefined {
    return this._currentPagination;
  }

  /** Setter for the Current Pagination (when Pagination is enabled) */
  set currentPagination(currentPagination: CurrentPagination) {
    this._currentPagination = currentPagination;
  }

  /** Getter for SlickGrid DataView object */
  get dataView(): SlickDataView {
    return this._dataView;
  }
  /** Setter for SlickGrid DataView object */
  set dataView(dataView: SlickDataView) {
    this._dataView = dataView;
  }

  /** Getter for SlickGrid Grid object */
  get grid(): SlickGrid {
    return this._grid;
  }
  /** Setter for SlickGrid Grid object */
  set grid(grid: SlickGrid) {
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

  /** Getter to know if user want to hide header row after 1st page load */
  get hideHeaderRowAfterPageLoad(): boolean {
    return this._hideHeaderRowAfterPageLoad;
  }
  /** Setter for knowing if user want to hide header row after 1st page load */
  set hideHeaderRowAfterPageLoad(hideHeaderRowAfterPageLoad: boolean) {
    this._hideHeaderRowAfterPageLoad = hideHeaderRowAfterPageLoad;
  }

  /** Getter for the Visible Columns in the grid */
  get visibleColumns(): Column[] {
    return this._visibleColumns;
  }
  /** Setter for the Visible Columns in the grid */
  set visibleColumns(visibleColumns: Column[]) {
    this._visibleColumns = visibleColumns;
  }

  /** Getter for the Hierarchical Tree Data dataset when the feature is enabled */
  get hierarchicalDataset(): any[] {
    return this._hierarchicalDataset;
  }

  /** Getter for the Hierarchical Tree Data dataset when the feature is enabled */
  set hierarchicalDataset(hierarchicalDataset: any[]) {
    this._hierarchicalDataset = hierarchicalDataset;
  }
}
