import { FilterService } from './filter.service';
import { GridExtraService } from './gridExtra.service';
import { Column, GridOption } from './../models';
export declare class ControlAndPluginService {
    private filterService;
    private gridExtraService;
    _dataView: any;
    _grid: any;
    _visibleColumns: Column[];
    autoTooltipPlugin: any;
    checkboxSelectorPlugin: any;
    columnPickerControl: any;
    headerButtonsPlugin: any;
    headerMenuPlugin: any;
    gridMenuControl: any;
    rowSelectionPlugin: any;
    constructor(filterService: FilterService, gridExtraService: GridExtraService);
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @param {any} grid
     * @param {Column[]} columnDefinitions
     * @param {GridOptions} options
     * @param {any} dataView
     */
    attachDifferentControlOrPlugins(grid: any, columnDefinitions: Column[], options: GridOption, dataView: any): void;
    hideColumn(column: Column): void;
    removeColumnByIndex(array: any[], index: number): any[];
    autoResizeColumns(): void;
    destroy(): void;
    private addGridMenuCustomCommands(grid, options);
    private prepareGridMenu(grid, options);
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {Column[]} columnDefinitions
     * @param {GridOptions} options
     */
    createPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption): void;
}
