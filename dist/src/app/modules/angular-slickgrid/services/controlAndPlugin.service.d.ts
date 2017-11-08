import { Column, GridOption } from './../models';
export declare class ControlAndPluginService {
    _grid: any;
    _visibleColumns: Column[];
    attachDifferentControlOrPlugins(grid: any, columnDefinitions: Column[], options: GridOption, dataView: any): void;
    hideColumn(column: Column): void;
    removeColumnByIndex(array: any, index: any): any;
    autoResizeColumns(): void;
}
