export declare class GridExtraService {
    private _grid;
    private _dataView;
    private _columnDefinition;
    private _gridOptions;
    init(grid: any, columnDefinition: any, gridOptions: any, dataView: any): void;
    getDataItemByRowNumber(rowNumber: number): any;
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    getItemRowMetadata(previousItemMetadata: any): (rowNumber: number) => {
        cssClasses: string;
    };
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param {number} rowNumber
     * @param {number} fadeDelay
     */
    highlightRow(rowNumber: number, fadeDelay?: number): void;
    getSelectedRows(): any;
    setSelectedRow(rowIndex: number): void;
    setSelectedRows(rowIndexes: number[]): void;
    /** Add an item (data item) to the datagrid
     * @param object dataItem: item object holding all properties of that row
     */
    addItemToDatagrid(item: any): void;
    /** Update an existing item with new properties inside the datagrid
     * @param object item: item object holding all properties of that row
     */
    updateDataGridItem(item: any): void;
}
