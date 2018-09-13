import { GridOption } from './../models/index';
import { Subject } from 'rxjs/Subject';
export interface GridDimension {
    height: number;
    width: number;
    heightWithPagination?: number;
}
export declare class ResizerService {
    private _grid;
    private _lastDimensions;
    onGridBeforeResize: Subject<boolean>;
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    private readonly _gridUid;
    init(grid: any): void;
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    attachAutoResizeDataGrid(newSizes?: GridDimension): any;
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    calculateGridNewDimensions(gridOptions: GridOption): GridDimension | null;
    /**
     * Dispose function when element is destroyed
     */
    dispose(): void;
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     */
    compensateHorizontalScroll(grid: any, gridOptions: GridOption): void;
    /**
     * Return the last resize dimensions used by the service
     * @return last dimensions
     */
    getLastResizeDimensions(): GridDimension;
    /** Resize the datagrid to fit the browser height & width */
    resizeGrid(delay?: number, newSizes?: GridDimension): Promise<GridDimension>;
}
