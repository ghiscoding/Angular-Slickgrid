import { CustomGridMenu, Column, Extension, GridOption, HeaderMenuOnCommandArgs } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import { FilterService } from './filter.service';
import { ExportService } from './export.service';
import { SortService } from './sort.service';
export declare class ControlAndPluginService {
    private exportService;
    private filterService;
    private sortService;
    private translate;
    private _dataView;
    private _grid;
    allColumns: Column[];
    visibleColumns: Column[];
    areVisibleColumnDifferent: boolean;
    extensionList: Extension[];
    autoTooltipPlugin: any;
    cellExternalCopyManagerPlugin: any;
    checkboxSelectorPlugin: any;
    columnPickerControl: any;
    groupItemMetaProviderPlugin: any;
    headerButtonsPlugin: any;
    headerMenuPlugin: any;
    gridMenuControl: any;
    rowSelectionPlugin: any;
    undoRedoBuffer: any;
    constructor(exportService: ExportService, filterService: FilterService, sortService: SortService, translate: TranslateService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    /** Getter for the Column Definitions pulled through the Grid Object */
    private readonly _columnDefinitions;
    /** Get all columns (includes visible and non-visible) */
    getAllColumns(): Column[];
    /** Get only visible columns */
    getVisibleColumns(): Column[];
    getAllExtensions(): Extension[];
    getExtensionByName(name: string): Extension | undefined;
    /** Auto-resize all the column in the grid to fit the grid width */
    autoResizeColumns(): void;
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @param grid
     * @param options
     * @param dataView
     */
    attachDifferentControlOrPlugins(grid: any, dataView: any, groupItemMetadataProvider: any): void;
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     * @param columnDefinitions
     * @param options
     */
    createCheckboxPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption): void;
    /** Create the Excel like copy manager */
    createCellExternalCopyManagerPlugin(grid: any): void;
    /**
     * Create the Column Picker and expose all the available hooks that user can subscribe (onColumnsChanged)
     * @param grid
     * @param columnDefinitions
     * @param gridOptions
     */
    createColumnPicker(grid: any, columnDefinitions: Column[]): any;
    /**
     * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
     * @param grid
     * @param columnDefinitions
     * @param _gridOptions
     */
    createGridMenu(grid: any, columnDefinitions: Column[]): any;
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @param grid
     * @param columnDefinitions
     * @param options
     */
    createHeaderMenu(grid: any, dataView: any, columnDefinitions: Column[]): any;
    /** Create an undo redo buffer used by the Excel like copy */
    createUndoRedoBuffer(): void;
    /** Hide a column from the grid */
    hideColumn(column: Column): void;
    /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
    hookUndoShortcutKey(): void;
    /** Dispose of all the controls & plugins */
    dispose(): void;
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @param grid
     * @return gridMenu
     */
    private addGridMenuCustomCommands(grid);
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param grid
     * @param dataView
     * @param options
     * @param columnDefinitions
     * @return header menu
     */
    private addHeaderMenuCustomCommands(grid, dataView, options, columnDefinitions);
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    executeHeaderMenuInternalCommands(e: Event, args: HeaderMenuOnCommandArgs): void;
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     */
    executeGridMenuInternalCustomCommands(e: Event, args: CustomGridMenu): void;
    /** Refresh the dataset through the Backend Service */
    refreshBackendDataset(): void;
    /** Remove a column from the grid by it's index in the grid */
    removeColumnByIndex(array: any[], index: number): any[];
    /** Translate the Column Picker and it's last 2 checkboxes */
    translateColumnPicker(): void;
    /** Translate the Grid Menu titles and column picker */
    translateGridMenu(): void;
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateHeaderMenu(): void;
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale locale to use
     */
    translateColumnHeaders(locale?: boolean | string, newColumnDefinitions?: Column[]): void;
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     */
    renderColumnHeaders(newColumnDefinitions?: Column[]): void;
    /**
     * @return default Grid Menu options
     */
    private getDefaultGridMenuOptions();
    /**
     * @return default Header Menu options
     */
    private getDefaultHeaderMenuOptions();
    private getDefaultTranslationByKey(key);
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    private resetGridMenuTranslations(gridMenu);
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    private resetHeaderMenuTranslations(columnDefinitions);
}
