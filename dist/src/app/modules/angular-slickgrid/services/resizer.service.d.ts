import { GridOption } from './../models/index';
export declare class ResizerService {
    private _grid;
    private _gridOptions;
    init(grid: any, gridOptions: GridOption): void;
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    attachAutoResizeDataGrid(): any;
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    calculateGridNewDimensions(gridOptions: GridOption): any;
    /**
     * Dispose function when element is destroyed
     */
    dispose(): void;
    /** Resize the datagrid to fit the browser height & width */
    resizeGrid(delay?: number, newSizes?: {
        height: number;
        width: number;
    }): void;
}
