import { GridOption } from './../models/index';
export declare class GridEventService {
    attachOnMouseHover(grid: any): void;
    attachOnCellChange(grid: any, gridOptions: GridOption, dataView: any): void;
    attachOnClick(grid: any, gridOptions: GridOption, dataView: any): void;
}
