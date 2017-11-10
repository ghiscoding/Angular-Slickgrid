export declare class GridExtraService {
    private _grid;
    private _dataView;
    init(grid: any, dataView: any): void;
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
    setSelectedRow(rowIndex: number): void;
    setSelectedRows(rowIndexes: number[]): void;
}
