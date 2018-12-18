/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExtensionName, } from '../models/index';
import { AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, DraggableGroupingExtension, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowMoveManagerExtension, RowSelectionExtension, } from '../extensions/index';
import { SharedService } from './shared.service';
export class ExtensionService {
    /**
     * @param {?} autoTooltipExtension
     * @param {?} cellExternalCopyExtension
     * @param {?} checkboxSelectorExtension
     * @param {?} columnPickerExtension
     * @param {?} draggableGroupingExtension
     * @param {?} gridMenuExtension
     * @param {?} groupItemMetaExtension
     * @param {?} headerButtonExtension
     * @param {?} headerMenuExtension
     * @param {?} rowMoveManagerExtension
     * @param {?} rowSelectionExtension
     * @param {?} sharedService
     * @param {?} translate
     */
    constructor(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
        this.autoTooltipExtension = autoTooltipExtension;
        this.cellExternalCopyExtension = cellExternalCopyExtension;
        this.checkboxSelectorExtension = checkboxSelectorExtension;
        this.columnPickerExtension = columnPickerExtension;
        this.draggableGroupingExtension = draggableGroupingExtension;
        this.gridMenuExtension = gridMenuExtension;
        this.groupItemMetaExtension = groupItemMetaExtension;
        this.headerButtonExtension = headerButtonExtension;
        this.headerMenuExtension = headerMenuExtension;
        this.rowMoveManagerExtension = rowMoveManagerExtension;
        this.rowSelectionExtension = rowSelectionExtension;
        this.sharedService = sharedService;
        this.translate = translate;
        this.extensionList = [];
    }
    /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    dispose() {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this.extensionList.forEach((item) => {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        });
        this.extensionList = [];
    }
    /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    getAllColumns() {
        return this.sharedService.allColumns || [];
    }
    /**
     * Get only visible columns
     * @return {?}
     */
    getVisibleColumns() {
        return this.sharedService.visibleColumns || [];
    }
    /**
     * Get all Extensions
     * @return {?}
     */
    getAllExtensions() {
        return this.extensionList;
    }
    /**
     * Get an Extension by it's name
     * @param {?} name
     * @return {?}
     */
    getExtensionByName(name) {
        return this.extensionList.find((p) => p.name === name);
    }
    /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    autoResizeColumns() {
        this.sharedService.grid.autosizeColumns();
    }
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    attachDifferentExtensions() {
        // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
        // this is to avoid having hidden columns not being translated on first load
        if (this.sharedService.gridOptions.enableTranslate) {
            this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        }
        // Auto Tooltip Plugin
        if (this.sharedService.gridOptions.enableAutoTooltip) {
            if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
                this.extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, extension: this.autoTooltipExtension.register() });
            }
        }
        // Column Picker Control
        if (this.sharedService.gridOptions.enableColumnPicker) {
            if (this.columnPickerExtension && this.columnPickerExtension.register) {
                this.extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, extension: this.columnPickerExtension.register() });
            }
        }
        // Draggable Grouping Plugin
        if (this.sharedService.gridOptions.enableDraggableGrouping) {
            if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
                this.extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, extension: this.draggableGroupingExtension.register() });
            }
        }
        // Grid Menu Control
        if (this.sharedService.gridOptions.enableGridMenu) {
            if (this.gridMenuExtension && this.gridMenuExtension.register) {
                this.extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, extension: this.gridMenuExtension.register() });
            }
        }
        // Grouping Plugin
        // register the group item metadata provider to add expand/collapse group handlers
        if (this.sharedService.gridOptions.enableGrouping) {
            if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
                this.extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, extension: this.groupItemMetaExtension.register() });
            }
        }
        // Checkbox Selector Plugin
        if (this.sharedService.gridOptions.enableCheckboxSelector) {
            if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
                /** @type {?} */
                const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                this.extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, extension: this.checkboxSelectorExtension.register(rowSelectionExtension) });
            }
        }
        // Row Move Manager Plugin
        if (this.sharedService.gridOptions.enableRowMoveManager) {
            if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
                this.extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, extension: this.rowMoveManagerExtension.register() });
            }
        }
        // Row Selection Plugin
        if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
            if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
                this.extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, extension: this.rowSelectionExtension.register() });
            }
        }
        // Header Button Plugin
        if (this.sharedService.gridOptions.enableHeaderButton) {
            if (this.headerButtonExtension && this.headerButtonExtension.register) {
                this.extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, extension: this.headerButtonExtension.register() });
            }
        }
        // Header Menu Plugin
        if (this.sharedService.gridOptions.enableHeaderMenu) {
            if (this.headerMenuExtension && this.headerMenuExtension.register) {
                this.extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, extension: this.headerMenuExtension.register() });
            }
        }
        // Cell External Copy Manager Plugin (Excel Like)
        if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
            if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
                this.extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, extension: this.cellExternalCopyExtension.register() });
            }
        }
        // manually register other plugins
        if (this.sharedService.gridOptions.registerPlugins !== undefined) {
            if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
                this.sharedService.gridOptions.registerPlugins.forEach((plugin) => {
                    this.sharedService.grid.registerPlugin(plugin);
                    this.extensionList.push({ name: ExtensionName.noname, class: null, extension: plugin });
                });
            }
            else {
                this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                this.extensionList.push({ name: ExtensionName.noname, class: null, extension: this.sharedService.gridOptions.registerPlugins });
            }
        }
    }
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    createExtensionsBeforeGridCreation(columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
        if (options.enableDraggableGrouping) {
            /** @type {?} */
            const plugin = this.draggableGroupingExtension.create(options);
            options.enableColumnReorder = plugin.getSetupColumnReorder;
        }
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    removeColumnByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    translateColumnPicker() {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateGridMenu() {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    translateHeaderMenu() {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    }
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    translateColumnHeaders(locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use((/** @type {?} */ (locale)));
        }
        /** @type {?} */
        const columnDefinitions = newColumnDefinitions || this.sharedService.columnDefinitions;
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    }
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    renderColumnHeaders(newColumnDefinitions) {
        /** @type {?} */
        const collection = newColumnDefinitions || this.sharedService.columnDefinitions;
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    }
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @private
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    translateItems(items, inputKey, outputKey) {
        for (const item of items) {
            if (item[inputKey]) {
                item[outputKey] = this.translate.instant(item[inputKey]);
            }
        }
    }
}
ExtensionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ExtensionService.ctorParameters = () => [
    { type: AutoTooltipExtension },
    { type: CellExternalCopyManagerExtension },
    { type: CheckboxSelectorExtension },
    { type: ColumnPickerExtension },
    { type: DraggableGroupingExtension },
    { type: GridMenuExtension },
    { type: GroupItemMetaProviderExtension },
    { type: HeaderButtonExtension },
    { type: HeaderMenuExtension },
    { type: RowMoveManagerExtension },
    { type: RowSelectionExtension },
    { type: SharedService },
    { type: TranslateService }
];
if (false) {
    /** @type {?} */
    ExtensionService.prototype.extensionList;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.autoTooltipExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.cellExternalCopyExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.checkboxSelectorExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.columnPickerExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.draggableGroupingExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.gridMenuExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.groupItemMetaExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.headerButtonExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.headerMenuExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.rowMoveManagerExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.rowSelectionExtension;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    ExtensionService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxPQUFPLDJDQUEyQyxDQUFDO0FBQ25ELE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixnQ0FBZ0MsRUFDaEMseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixxQkFBcUIsR0FDdEIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNakQsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7OztJQUczQixZQUNVLG9CQUEwQyxFQUMxQyx5QkFBMkQsRUFDM0QseUJBQW9ELEVBQ3BELHFCQUE0QyxFQUM1QywwQkFBc0QsRUFDdEQsaUJBQW9DLEVBQ3BDLHNCQUFzRCxFQUN0RCxxQkFBNEMsRUFDNUMsbUJBQXdDLEVBQ3hDLHVCQUFnRCxFQUNoRCxxQkFBNEMsRUFDNUMsYUFBNEIsRUFDNUIsU0FBMkI7UUFaM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQWtDO1FBQzNELDhCQUF5QixHQUF6Qix5QkFBeUIs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Ozs7OztJQUM1RCxpREFBb0Q7Ozs7O0lBQ3BELHNEQUE4RDs7Ozs7SUFDOUQsNkNBQTRDOzs7OztJQUM1QyxrREFBOEQ7Ozs7O0lBQzlELGlEQUFvRDs7Ozs7SUFDcEQsK0NBQWdEOzs7OztJQUNoRCxtREFBd0Q7Ozs7O0lBQ3hELGlEQUFvRDs7Ozs7SUFDcEQseUNBQW9DOzs7OztJQUNwQyxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY29tbW9uIDNyZCBwYXJ0eSBTbGlja0dyaWQgcGx1Z2lucy9saWJzXHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHJhbmdlZGVjb3JhdG9yJztcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxscmFuZ2VzZWxlY3Rvcic7XHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHNlbGVjdGlvbm1vZGVsJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBFeHRlbnNpb25Nb2RlbCxcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtcclxuICBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxyXG4gIENvbHVtblBpY2tlckV4dGVuc2lvbixcclxuICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICBHcmlkTWVudUV4dGVuc2lvbixcclxuICBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24sXHJcbiAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gIEhlYWRlck1lbnVFeHRlbnNpb24sXHJcbiAgUm93TW92ZU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgUm93U2VsZWN0aW9uRXh0ZW5zaW9uLFxyXG59IGZyb20gJy4uL2V4dGVuc2lvbnMvaW5kZXgnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25TZXJ2aWNlIHtcclxuICBleHRlbnNpb25MaXN0OiBFeHRlbnNpb25Nb2RlbFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhdXRvVG9vbHRpcEV4dGVuc2lvbjogQXV0b1Rvb2x0aXBFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb246IENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBjaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uOiBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBjb2x1bW5QaWNrZXJFeHRlbnNpb246IENvbHVtblBpY2tlckV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb246IERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBncmlkTWVudUV4dGVuc2lvbjogR3JpZE1lbnVFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGdyb3VwSXRlbU1ldGFFeHRlbnNpb246IEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgaGVhZGVyQnV0dG9uRXh0ZW5zaW9uOiBIZWFkZXJCdXR0b25FeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGhlYWRlck1lbnVFeHRlbnNpb246IEhlYWRlck1lbnVFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIHJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uOiBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93U2VsZWN0aW9uRXh0ZW5zaW9uOiBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcclxuICApIHsgfVxyXG5cclxuICAvKiogRGlzcG9zZSBvZiBhbGwgdGhlIGNvbnRyb2xzICYgcGx1Z2lucyAqL1xyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCA9IG51bGw7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSBbXTtcclxuXHJcbiAgICAvLyBkaXNwb3NlIG9mIGVhY2ggY29udHJvbC9wbHVnaW4gJiByZXNldCB0aGUgbGlzdFxyXG4gICAgdGhpcy5leHRlbnNpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5jbGFzcyAmJiBpdGVtLmNsYXNzLmRpc3Bvc2UpIHtcclxuICAgICAgICBpdGVtLmNsYXNzLmRpc3Bvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmV4dGVuc2lvbkxpc3QgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgYWxsIGNvbHVtbnMgKGluY2x1ZGVzIHZpc2libGUgYW5kIG5vbi12aXNpYmxlKSAqL1xyXG4gIGdldEFsbENvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBvbmx5IHZpc2libGUgY29sdW1ucyAqL1xyXG4gIGdldFZpc2libGVDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IGFsbCBFeHRlbnNpb25zICovXHJcbiAgZ2V0QWxsRXh0ZW5zaW9ucygpOiBFeHRlbnNpb25Nb2RlbFtdIHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkxpc3Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYW4gRXh0ZW5zaW9uIGJ5IGl0J3MgbmFtZVxyXG4gICAqICBAcGFyYW0gbmFtZVxyXG4gICAqL1xyXG4gIGdldEV4dGVuc2lvbkJ5TmFtZShuYW1lOiBFeHRlbnNpb25OYW1lKTogRXh0ZW5zaW9uTW9kZWwgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uTGlzdC5maW5kKChwKSA9PiBwLm5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEF1dG8tcmVzaXplIGFsbCB0aGUgY29sdW1uIGluIHRoZSBncmlkIHRvIGZpdCB0aGUgZ3JpZCB3aWR0aCAqL1xyXG4gIGF1dG9SZXNpemVDb2x1bW5zKCkge1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQXR0YWNoL0NyZWF0ZSBkaWZmZXJlbnQgQ29udHJvbHMgb3IgUGx1Z2lucyBhZnRlciB0aGUgR3JpZCBpcyBjcmVhdGVkICovXHJcbiAgYXR0YWNoRGlmZmVyZW50RXh0ZW5zaW9ucygpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSBhbGwgY29sdW1ucyBhcmUgdHJhbnNsYXRlZCBiZWZvcmUgY3JlYXRpbmcgQ29sdW1uUGlja2VyL0dyaWRNZW51IENvbnRyb2xzXHJcbiAgICAvLyB0aGlzIGlzIHRvIGF2b2lkIGhhdmluZyBoaWRkZW4gY29sdW1ucyBub3QgYmVpbmcgdHJhbnNsYXRlZCBvbiBmaXJzdCBsb2FkXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdXRvIFRvb2x0aXAgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9Ub29sdGlwKSB7XHJcbiAgICAgIGlmICh0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uICYmIHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXAsIGNsYXNzOiB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbHVtbiBQaWNrZXIgQ29udHJvbFxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDb2x1bW5QaWNrZXIpIHtcclxuICAgICAgaWYgKHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uICYmIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlciwgY2xhc3M6IHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEcmFnZ2FibGUgR3JvdXBpbmcgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZURyYWdnYWJsZUdyb3VwaW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uICYmIHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZHJhZ2dhYmxlR3JvdXBpbmcsIGNsYXNzOiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdyaWQgTWVudSBDb250cm9sXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyaWRNZW51KSB7XHJcbiAgICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnUsIGNsYXNzOiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdyb3VwaW5nIFBsdWdpblxyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIGdyb3VwIGl0ZW0gbWV0YWRhdGEgcHJvdmlkZXIgdG8gYWRkIGV4cGFuZC9jb2xsYXBzZSBncm91cCBoYW5kbGVyc1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVHcm91cGluZykge1xyXG4gICAgICBpZiAodGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uICYmIHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXIsIGNsYXNzOiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVja2JveCBTZWxlY3RvciBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICBpZiAodGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uICYmIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvciwgY2xhc3M6IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24ucmVnaXN0ZXIocm93U2VsZWN0aW9uRXh0ZW5zaW9uKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJvdyBNb3ZlIE1hbmFnZXIgUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd01vdmVNYW5hZ2VyKSB7XHJcbiAgICAgIGlmICh0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uICYmIHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUucm93TW92ZU1hbmFnZXIsIGNsYXNzOiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJvdyBTZWxlY3Rpb24gUGx1Z2luXHJcbiAgICBpZiAoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pIHtcclxuICAgICAgaWYgKHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbiwgY2xhc3M6IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWFkZXIgQnV0dG9uIFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVIZWFkZXJCdXR0b24pIHtcclxuICAgICAgaWYgKHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmhlYWRlckJ1dHRvbiwgY2xhc3M6IHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWFkZXIgTWVudSBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlSGVhZGVyTWVudSkge1xyXG4gICAgICBpZiAodGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5oZWFkZXJNZW51LCBjbGFzczogdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2VsbCBFeHRlcm5hbCBDb3B5IE1hbmFnZXIgUGx1Z2luIChFeGNlbCBMaWtlKVxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeGNlbENvcHlCdWZmZXIpIHtcclxuICAgICAgaWYgKHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbiAmJiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIsIGNsYXNzOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBtYW51YWxseSByZWdpc3RlciBvdGhlciBwbHVnaW5zXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpKSB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbik7XHJcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUubm9uYW1lLCBjbGFzczogbnVsbCwgZXh0ZW5zaW9uOiBwbHVnaW4gfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyk7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLm5vbmFtZSwgY2xhc3M6IG51bGwsIGV4dGVuc2lvbjogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoL0NyZWF0ZSBjZXJ0YWluIHBsdWdpbnMgYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLCBlbHNlIHRoZXkgbWlnaHQgYmVoYXZlIG9kZGx5LlxyXG4gICAqIE1vc3RseSBiZWNhdXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgbWlnaHQgY2hhbmdlIGFmdGVyIHRoZSBncmlkIGNyZWF0aW9uXHJcbiAgICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICBjcmVhdGVFeHRlbnNpb25zQmVmb3JlR3JpZENyZWF0aW9uKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24uY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZURyYWdnYWJsZUdyb3VwaW5nKSB7XHJcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uY3JlYXRlKG9wdGlvbnMpO1xyXG4gICAgICBvcHRpb25zLmVuYWJsZUNvbHVtblJlb3JkZXIgPSBwbHVnaW4uZ2V0U2V0dXBDb2x1bW5SZW9yZGVyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEhpZGUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCAqL1xyXG4gIGhpZGVDb2x1bW4oY29sdW1uOiBDb2x1bW4pIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5yZW1vdmVDb2x1bW5CeUluZGV4KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMoKSwgY29sdW1uSW5kZXgpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmVmcmVzaCB0aGUgZGF0YXNldCB0aHJvdWdoIHRoZSBCYWNrZW5kIFNlcnZpY2UgKi9cclxuICByZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnM/OiBHcmlkT3B0aW9uKSB7XHJcbiAgICB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCBieSBpdCdzIGluZGV4IGluIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGFycmF5IGlucHV0XHJcbiAgICogQHBhcmFtIGluZGV4XHJcbiAgICovXHJcbiAgcmVtb3ZlQ29sdW1uQnlJbmRleChhcnJheTogYW55W10sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKGVsOiBhbnksIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICByZXR1cm4gaW5kZXggIT09IGk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIENvbHVtbiBQaWNrZXIgYW5kIGl0J3MgbGFzdCAyIGNoZWNrYm94ZXMgKi9cclxuICB0cmFuc2xhdGVDb2x1bW5QaWNrZXIoKSB7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24gJiYgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24udHJhbnNsYXRlQ29sdW1uUGlja2VyKSB7XHJcbiAgICAgIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnRyYW5zbGF0ZUNvbHVtblBpY2tlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUdyaWRNZW51KCkge1xyXG4gICAgaWYgKHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24gJiYgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi50cmFuc2xhdGVHcmlkTWVudSkge1xyXG4gICAgICB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUdyaWRNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgdGhlIEhlYWRlciBNZW51IHRpdGxlcywgd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbiBkZWZpbml0aW9uIHRvIHJlLXRyYW5zbGF0ZSB0aGVtXHJcbiAgICovXHJcbiAgdHJhbnNsYXRlSGVhZGVyTWVudSgpIHtcclxuICAgIGlmICh0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUhlYWRlck1lbnUpIHtcclxuICAgICAgdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUhlYWRlck1lbnUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSBtYW51YWxseSB0aGUgaGVhZGVyIHRpdGxlcy5cclxuICAgKiBXZSBjb3VsZCBvcHRpb25hbGx5IHBhc3MgYSBsb2NhbGUgKHRoYXQgd2lsbCBjaGFuZ2UgY3VycmVudGx5IGxvYWRlZCBsb2NhbGUpLCBlbHNlIGl0IHdpbGwgdXNlIGN1cnJlbnQgbG9jYWxlXHJcbiAgICogQHBhcmFtIGxvY2FsZSB0byB1c2VcclxuICAgKiBAcGFyYW0gbmV3IGNvbHVtbiBkZWZpbml0aW9ucyAob3B0aW9uYWwpXHJcbiAgICovXHJcbiAgdHJhbnNsYXRlQ29sdW1uSGVhZGVycyhsb2NhbGU/OiBib29sZWFuIHwgc3RyaW5nLCBuZXdDb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XHJcbiAgICBpZiAobG9jYWxlKSB7XHJcbiAgICAgIHRoaXMudHJhbnNsYXRlLnVzZShsb2NhbGUgYXMgc3RyaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb2x1bW5EZWZpbml0aW9ucyA9IG5ld0NvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcclxuXHJcbiAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKGNvbHVtbkRlZmluaXRpb25zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuICAgIHRoaXMudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG5cclxuICAgIC8vIHJlLXJlbmRlciB0aGUgY29sdW1uIGhlYWRlcnNcclxuICAgIHRoaXMucmVuZGVyQ29sdW1uSGVhZGVycyhjb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXIgKG9yIHJlLXJlbmRlcikgdGhlIGNvbHVtbiBoZWFkZXJzIGZyb20gY29sdW1uIGRlZmluaXRpb25zLlxyXG4gICAqIGNhbGxpbmcgc2V0Q29sdW1ucygpIHdpbGwgdHJpZ2dlciBhIGdyaWQgcmUtcmVuZGVyXHJcbiAgICovXHJcbiAgcmVuZGVyQ29sdW1uSGVhZGVycyhuZXdDb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbmV3Q29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKGNvbGxlY3Rpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgYW4gYXJyYXkgb2YgaXRlbXMgZnJvbSBhbiBpbnB1dCBrZXkgYW5kIGFzc2lnbiB0byB0aGUgb3V0cHV0IGtleSAqL1xyXG4gIHByaXZhdGUgdHJhbnNsYXRlSXRlbXMoaXRlbXM6IGFueVtdLCBpbnB1dEtleTogc3RyaW5nLCBvdXRwdXRLZXk6IHN0cmluZykge1xyXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgIGlmIChpdGVtW2lucHV0S2V5XSkge1xyXG4gICAgICAgIGl0ZW1bb3V0cHV0S2V5XSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoaXRlbVtpbnB1dEtleV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==