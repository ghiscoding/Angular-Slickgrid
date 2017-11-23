import { GridOption } from './../models';
export declare class ResizerService {
    private _grid;
    private _gridOptions;
    constructor();
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    attachAutoResizeDataGrid(grid: any, gridOptions: GridOption): any;
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    calculateGridNewDimensions(gridOptions: GridOption): any;
    /**
     * Destroy function when element is destroyed
     */
    destroy(): void;
    /** Resize the datagrid to fit the browser height & width */
    resizeGrid(delay?: number, newSizes?: {
        height: number;
        width: number;
    }): void;
}
