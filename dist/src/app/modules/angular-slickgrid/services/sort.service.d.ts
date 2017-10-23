import { GridOption } from './../models/gridOption.interface';
export declare class SortService {
    subscriber: any;
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     */
    attachBackendOnSort(grid: any, gridOptions: GridOption): void;
    attachBackendOnSortSubscribe(event: any, args: any): Promise<void>;
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnSort(grid: any, gridOptions: GridOption, dataView: any): void;
    destroy(): void;
}
