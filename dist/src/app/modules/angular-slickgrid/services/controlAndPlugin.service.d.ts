import { FilterService } from './filter.service';
import { GridExtraService } from './gridExtra.service';
import { Column, GridOption } from './../models';
import { TranslateService } from '@ngx-translate/core';
export declare class ControlAndPluginService {
    private filterService;
    private gridExtraService;
    private translate;
    private _dataView;
    private _grid;
    private _gridOptions;
    private _columnDefinitions;
    visibleColumns: Column[];
    autoTooltipPlugin: any;
    checkboxSelectorPlugin: any;
    columnPickerControl: any;
    headerButtonsPlugin: any;
    headerMenuPlugin: any;
    gridMenuControl: any;
    rowSelectionPlugin: any;
    constructor(filterService: FilterService, gridExtraService: GridExtraService, translate: TranslateService);
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @param {any} grid
     * @param {Column[]} columnDefinitions
     * @param {GridOptions} options
     * @param {any} dataView
     */
    attachDifferentControlOrPlugins(grid: any, columnDefinitions: Column[], options: GridOption, dataView: any): void;
    createGridMenu(grid: any, columnDefinitions: Column[], options: GridOption): any;
    hideColumn(column: Column): void;
    removeColumnByIndex(array: any[], index: number): any[];
    autoResizeColumns(): void;
    destroy(): void;
    private addGridMenuCustomCommands(grid, options);
    private prepareGridMenu(grid, options);
    /**
     * Translate the Grid Menu ColumnTitle and CustomTitle.
     * Note that the only way that seems to work is to destroy and re-create the Grid Menu
     * Changing only the gridMenu.columnTitle with i18n translate was not enough.
     */
    translateGridMenu(): void;
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {string} locale locale to use
     */
    translateHeaders(locale?: string): void;
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param {Column[]} columnDefinitions
     * @param {GridOptions} options
     */
    createPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption): void;
}
