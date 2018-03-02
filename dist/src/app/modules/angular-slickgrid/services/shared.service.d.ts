import { GridOption, Column } from './../models/index';
export declare class SharedService {
    dataView: any;
    grid: any;
    gridOptions: GridOption;
    columnDefinitions: Column[];
    init(grid: any, dataView: any, gridOptions: GridOption, columnDefinitions: Column[]): void;
}
