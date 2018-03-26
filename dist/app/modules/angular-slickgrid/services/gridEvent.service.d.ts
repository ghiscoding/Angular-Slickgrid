import { GridOption } from './../models/index';
export declare class GridEventService {
    private _eventHandler;
    attachOnCellChange(grid: any, gridOptions: GridOption, dataView: any): void;
    attachOnClick(grid: any, gridOptions: GridOption, dataView: any): void;
    dispose(): void;
}
