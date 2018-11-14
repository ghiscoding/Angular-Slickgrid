import { Column, GridOption } from '../models';
export declare class SharedService {
    private _allColumns;
    private _dataView;
    private _groupItemMetadataProvider;
    private _grid;
    private _visibleColumns;
    /** Getter for All Columns  in the grid (hidden/visible) */
    /** Setter for All Columns  in the grid (hidden/visible) */
    allColumns: Column[];
    /** Getter for the Column Definitions pulled through the Grid Object */
    readonly columnDefinitions: Column[];
    /** Getter for SlickGrid DataView object */
    /** Setter for SlickGrid DataView object */
    dataView: any;
    /** Getter for SlickGrid Grid object */
    /** Setter for SlickGrid Grid object */
    grid: any;
    /** Getter for the Grid Options pulled through the Grid Object */
    /** Setter for the Grid Options pulled through the Grid Object */
    gridOptions: GridOption;
    /** Getter for the Grid Options */
    /** Setter for the Grid Options */
    groupItemMetadataProvider: any;
    /** Getter for the Visible Columns in the grid */
    /** Setter for the Visible Columns in the grid */
    visibleColumns: Column[];
}
