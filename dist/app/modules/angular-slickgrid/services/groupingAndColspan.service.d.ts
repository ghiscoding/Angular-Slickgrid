export declare class GroupingAndColspanService {
    private _eventHandler;
    private _dataView;
    private _grid;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /** Getter for the Column Definitions pulled through the Grid Object */
    private readonly _columnDefinitions;
    init(grid: any, dataView: any): void;
    dispose(): void;
    createPreHeaderRowGroupingTitle(): void;
}
