import { Column, GridOption } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import { FilterService } from './filter.service';
import { ExportService } from './export.service';
import { SharedService } from './shared.service';
import { SortService } from './sort.service';
export declare class ControlAndPluginService {
    private exportService;
    private filterService;
    private sharedService;
    private sortService;
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
    constructor(exportService: ExportService, filterService: FilterService, sharedService: SharedService, sortService: SortService, translate: TranslateService);
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @param grid
     * @param columnDefinitions
     * @param options
     * @param dataView
     */
    attachDifferentControlOrPlugins(): void;
    createColumnPicker(grid: any, columnDefinitions: Column[], options: GridOption): void;
    /**
     * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
     * @param grid
     * @param columnDefinitions
     * @param options
     */
    createGridMenu(grid: any, columnDefinitions: Column[], options: GridOption): any;
    hideColumn(column: Column): void;
    removeColumnByIndex(array: any[], index: number): any[];
    autoResizeColumns(): void;
    dispose(): void;
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @param grid
     * @param options
     */
    private addGridMenuCustomCommands(grid, options);
    /**
     * @return default Grid Menu options
     */
    private getDefaultGridMenuOptions();
    refreshBackendDataset(gridOptions: GridOption): void;
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    private resetGridMenuTranslations(gridMenu);
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * Note that the only way that seems to work is to destroy and re-create the Column Picker
     * Changing only the columnPicker.columnTitle with i18n translate was not enough.
     */
    translateColumnPicker(): void;
    /**
     * Translate the Grid Menu ColumnTitle and CustomTitle.
     * Note that the only way that seems to work is to destroy and re-create the Grid Menu
     * Changing only the gridMenu.columnTitle with i18n translate was not enough.
     */
    translateGridMenu(): void;
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale locale to use
     */
    translateHeaders(locale?: string): void;
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param columnDefinitions
     * @param options
     */
    createPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption): void;
}
