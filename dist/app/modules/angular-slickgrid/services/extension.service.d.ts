import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import { TranslateService } from '@ngx-translate/core';
import { Column, ExtensionModel, ExtensionName, GridOption } from '../models/index';
import { AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, DraggableGroupingExtension, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowMoveManagerExtension, RowSelectionExtension } from '../extensions/index';
import { SharedService } from './shared.service';
export declare class ExtensionService {
    private autoTooltipExtension;
    private cellExternalCopyExtension;
    private checkboxSelectorExtension;
    private columnPickerExtension;
    private draggableGroupingExtension;
    private gridMenuExtension;
    private groupItemMetaExtension;
    private headerButtonExtension;
    private headerMenuExtension;
    private rowMoveManagerExtension;
    private rowSelectionExtension;
    private sharedService;
    private translate;
    extensionList: ExtensionModel[];
    constructor(autoTooltipExtension: AutoTooltipExtension, cellExternalCopyExtension: CellExternalCopyManagerExtension, checkboxSelectorExtension: CheckboxSelectorExtension, columnPickerExtension: ColumnPickerExtension, draggableGroupingExtension: DraggableGroupingExtension, gridMenuExtension: GridMenuExtension, groupItemMetaExtension: GroupItemMetaProviderExtension, headerButtonExtension: HeaderButtonExtension, headerMenuExtension: HeaderMenuExtension, rowMoveManagerExtension: RowMoveManagerExtension, rowSelectionExtension: RowSelectionExtension, sharedService: SharedService, translate: TranslateService);
    /** Dispose of all the controls & plugins */
    dispose(): void;
    /** Get all columns (includes visible and non-visible) */
    getAllColumns(): Column[];
    /** Get only visible columns */
    getVisibleColumns(): Column[];
    /** Get all Extensions */
    getAllExtensions(): ExtensionModel[];
    /**
     * Get an Extension by it's name
     *  @param name
     */
    getExtensionByName(name: ExtensionName): ExtensionModel | undefined;
    /** Auto-resize all the column in the grid to fit the grid width */
    autoResizeColumns(): void;
    /** Attach/Create different Controls or Plugins after the Grid is created */
    attachDifferentExtensions(): void;
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param columnDefinitions
     * @param options
     */
    createExtensionsBeforeGridCreation(columnDefinitions: Column[], options: GridOption): void;
    /** Hide a column from the grid */
    hideColumn(column: Column): void;
    /** Refresh the dataset through the Backend Service */
    refreshBackendDataset(gridOptions?: GridOption): void;
    /**
     * Remove a column from the grid by it's index in the grid
     * @param array input
     * @param index
     */
    removeColumnByIndex(array: any[], index: number): any[];
    /** Translate the Column Picker and it's last 2 checkboxes */
    translateColumnPicker(): void;
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateGridMenu(): void;
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateHeaderMenu(): void;
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale to use
     * @param new column definitions (optional)
     */
    translateColumnHeaders(locale?: boolean | string, newColumnDefinitions?: Column[]): void;
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     */
    renderColumnHeaders(newColumnDefinitions?: Column[]): void;
    /** Translate the an array of items from an input key and assign to the output key */
    private translateItems(items, inputKey, outputKey);
}
