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
        // Grouping Plugin & Draggable Grouping Plugin
        // register the group item metadata provider to add expand/collapse group handlers
        if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxPQUFPLDJDQUEyQyxDQUFDO0FBQ25ELE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixnQ0FBZ0MsRUFDaEMseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixxQkFBcUIsR0FDdEIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFNakQsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7OztJQUczQixZQUNVLG9CQUEwQyxFQUMxQyx5QkFBMkQsRUFDM0QseUJBQW9ELEVBQ3BELHFCQUE0QyxFQUM1QywwQkFBc0QsRUFDdEQsaUJBQW9DLEVBQ3BDLHNCQUFzRCxFQUN0RCxxQkFBNEMsRUFDNUMsbUJBQXdDLEVBQ3hDLHVCQUFnRCxFQUNoRCxxQkFBNEMsRUFDNUMsYUFBNEIsRUFDNUIsU0FBMkI7UUFaM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQWtDO1FBQzNELDhCQUF5QixHQUF6Qix5QkFBeUIs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QyxnREFBa0Q7Ozs7O0lBQ2xELHFEQUFtRTs7Ozs7SUFDbkUscURBQTREOzs7OztJQUM1RCxpREFBb0Q7Ozs7O0lBQ3BELHNEQUE4RDs7Ozs7SUFDOUQsNkNBQTRDOzs7OztJQUM1QyxrREFBOEQ7Ozs7O0lBQzlELGlEQUFvRDs7Ozs7SUFDcEQsK0NBQWdEOzs7OztJQUNoRCxtREFBd0Q7Ozs7O0lBQ3hELGlEQUFvRDs7Ozs7SUFDcEQseUNBQW9DOzs7OztJQUNwQyxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY29tbW9uIDNyZCBwYXJ0eSBTbGlja0dyaWQgcGx1Z2lucy9saWJzXG5pbXBvcnQgJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxyYW5nZWRlY29yYXRvcic7XG5pbXBvcnQgJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxyYW5nZXNlbGVjdG9yJztcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHNlbGVjdGlvbm1vZGVsJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBFeHRlbnNpb25Nb2RlbCxcbiAgRXh0ZW5zaW9uTmFtZSxcbiAgR3JpZE9wdGlvbixcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7XG4gIEF1dG9Ub29sdGlwRXh0ZW5zaW9uLFxuICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcbiAgQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbixcbiAgQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxuICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcbiAgR3JpZE1lbnVFeHRlbnNpb24sXG4gIEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbixcbiAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxuICBIZWFkZXJNZW51RXh0ZW5zaW9uLFxuICBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcbiAgUm93U2VsZWN0aW9uRXh0ZW5zaW9uLFxufSBmcm9tICcuLi9leHRlbnNpb25zL2luZGV4JztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblNlcnZpY2Uge1xuICBleHRlbnNpb25MaXN0OiBFeHRlbnNpb25Nb2RlbFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhdXRvVG9vbHRpcEV4dGVuc2lvbjogQXV0b1Rvb2x0aXBFeHRlbnNpb24sXG4gICAgcHJpdmF0ZSBjZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uOiBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcbiAgICBwcml2YXRlIGNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb246IENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXG4gICAgcHJpdmF0ZSBjb2x1bW5QaWNrZXJFeHRlbnNpb246IENvbHVtblBpY2tlckV4dGVuc2lvbixcbiAgICBwcml2YXRlIGRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uOiBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcbiAgICBwcml2YXRlIGdyaWRNZW51RXh0ZW5zaW9uOiBHcmlkTWVudUV4dGVuc2lvbixcbiAgICBwcml2YXRlIGdyb3VwSXRlbU1ldGFFeHRlbnNpb246IEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbixcbiAgICBwcml2YXRlIGhlYWRlckJ1dHRvbkV4dGVuc2lvbjogSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgaGVhZGVyTWVudUV4dGVuc2lvbjogSGVhZGVyTWVudUV4dGVuc2lvbixcbiAgICBwcml2YXRlIHJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uOiBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcbiAgICBwcml2YXRlIHJvd1NlbGVjdGlvbkV4dGVuc2lvbjogUm93U2VsZWN0aW9uRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgKSB7IH1cblxuICAvKiogRGlzcG9zZSBvZiBhbGwgdGhlIGNvbnRyb2xzICYgcGx1Z2lucyAqL1xuICBkaXNwb3NlKCkge1xuICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSBbXTtcblxuICAgIC8vIGRpc3Bvc2Ugb2YgZWFjaCBjb250cm9sL3BsdWdpbiAmIHJlc2V0IHRoZSBsaXN0XG4gICAgdGhpcy5leHRlbnNpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtICYmIGl0ZW0uY2xhc3MgJiYgaXRlbS5jbGFzcy5kaXNwb3NlKSB7XG4gICAgICAgIGl0ZW0uY2xhc3MuZGlzcG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZXh0ZW5zaW9uTGlzdCA9IFtdO1xuICB9XG5cbiAgLyoqIEdldCBhbGwgY29sdW1ucyAoaW5jbHVkZXMgdmlzaWJsZSBhbmQgbm9uLXZpc2libGUpICovXG4gIGdldEFsbENvbHVtbnMoKTogQ29sdW1uW10ge1xuICAgIHJldHVybiB0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucyB8fCBbXTtcbiAgfVxuXG4gIC8qKiBHZXQgb25seSB2aXNpYmxlIGNvbHVtbnMgKi9cbiAgZ2V0VmlzaWJsZUNvbHVtbnMoKTogQ29sdW1uW10ge1xuICAgIHJldHVybiB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgfHwgW107XG4gIH1cblxuICAvKiogR2V0IGFsbCBFeHRlbnNpb25zICovXG4gIGdldEFsbEV4dGVuc2lvbnMoKTogRXh0ZW5zaW9uTW9kZWxbXSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gRXh0ZW5zaW9uIGJ5IGl0J3MgbmFtZVxuICAgKiAgQHBhcmFtIG5hbWVcbiAgICovXG4gIGdldEV4dGVuc2lvbkJ5TmFtZShuYW1lOiBFeHRlbnNpb25OYW1lKTogRXh0ZW5zaW9uTW9kZWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkxpc3QuZmluZCgocCkgPT4gcC5uYW1lID09PSBuYW1lKTtcbiAgfVxuXG4gIC8qKiBBdXRvLXJlc2l6ZSBhbGwgdGhlIGNvbHVtbiBpbiB0aGUgZ3JpZCB0byBmaXQgdGhlIGdyaWQgd2lkdGggKi9cbiAgYXV0b1Jlc2l6ZUNvbHVtbnMoKSB7XG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKiogQXR0YWNoL0NyZWF0ZSBkaWZmZXJlbnQgQ29udHJvbHMgb3IgUGx1Z2lucyBhZnRlciB0aGUgR3JpZCBpcyBjcmVhdGVkICovXG4gIGF0dGFjaERpZmZlcmVudEV4dGVuc2lvbnMoKSB7XG4gICAgLy8gbWFrZSBzdXJlIGFsbCBjb2x1bW5zIGFyZSB0cmFuc2xhdGVkIGJlZm9yZSBjcmVhdGluZyBDb2x1bW5QaWNrZXIvR3JpZE1lbnUgQ29udHJvbHNcbiAgICAvLyB0aGlzIGlzIHRvIGF2b2lkIGhhdmluZyBoaWRkZW4gY29sdW1ucyBub3QgYmVpbmcgdHJhbnNsYXRlZCBvbiBmaXJzdCBsb2FkXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcbiAgICAgIHRoaXMudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xuICAgIH1cblxuICAgIC8vIEF1dG8gVG9vbHRpcCBQbHVnaW5cbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9Ub29sdGlwKSB7XG4gICAgICBpZiAodGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbiAmJiB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5hdXRvVG9vbHRpcCwgY2xhc3M6IHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbHVtbiBQaWNrZXIgQ29udHJvbFxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ29sdW1uUGlja2VyKSB7XG4gICAgICBpZiAodGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24gJiYgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlciwgY2xhc3M6IHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpblxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uICYmIHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmRyYWdnYWJsZUdyb3VwaW5nLCBjbGFzczogdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR3JpZCBNZW51IENvbnRyb2xcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyaWRNZW51KSB7XG4gICAgICBpZiAodGhpcy5ncmlkTWVudUV4dGVuc2lvbiAmJiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ncmlkTWVudSwgY2xhc3M6IHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdyb3VwaW5nIFBsdWdpbiAmIERyYWdnYWJsZSBHcm91cGluZyBQbHVnaW5cbiAgICAvLyByZWdpc3RlciB0aGUgZ3JvdXAgaXRlbSBtZXRhZGF0YSBwcm92aWRlciB0byBhZGQgZXhwYW5kL2NvbGxhcHNlIGdyb3VwIGhhbmRsZXJzXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlR3JvdXBpbmcpIHtcbiAgICAgIGlmICh0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24gJiYgdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXIsIGNsYXNzOiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2tib3ggU2VsZWN0b3IgUGx1Z2luXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XG4gICAgICBpZiAodGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uICYmIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcikge1xuICAgICAgICBjb25zdCByb3dTZWxlY3Rpb25FeHRlbnNpb24gPSB0aGlzLmdldEV4dGVuc2lvbkJ5TmFtZShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5jaGVja2JveFNlbGVjdG9yLCBjbGFzczogdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcihyb3dTZWxlY3Rpb25FeHRlbnNpb24pIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJvdyBNb3ZlIE1hbmFnZXIgUGx1Z2luXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dNb3ZlTWFuYWdlcikge1xuICAgICAgaWYgKHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24gJiYgdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbi5yZWdpc3Rlcikge1xuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUucm93TW92ZU1hbmFnZXIsIGNsYXNzOiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSb3cgU2VsZWN0aW9uIFBsdWdpblxuICAgIGlmICghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24sIGNsYXNzOiB0aGlzLnJvd1NlbGVjdGlvbkV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLnJvd1NlbGVjdGlvbkV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhlYWRlciBCdXR0b24gUGx1Z2luXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVIZWFkZXJCdXR0b24pIHtcbiAgICAgIGlmICh0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbi5yZWdpc3Rlcikge1xuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uLCBjbGFzczogdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIZWFkZXIgTWVudSBQbHVnaW5cbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcbiAgICAgIGlmICh0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5oZWFkZXJNZW51LCBjbGFzczogdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENlbGwgRXh0ZXJuYWwgQ29weSBNYW5hZ2VyIFBsdWdpbiAoRXhjZWwgTGlrZSlcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUV4Y2VsQ29weUJ1ZmZlcikge1xuICAgICAgaWYgKHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbiAmJiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmNlbGxFeHRlcm5hbENvcHlNYW5hZ2VyLCBjbGFzczogdGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG1hbnVhbGx5IHJlZ2lzdGVyIG90aGVyIHBsdWdpbnNcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zKSkge1xuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4ge1xuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbik7XG4gICAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLm5vbmFtZSwgY2xhc3M6IG51bGwsIGV4dGVuc2lvbjogcGx1Z2luIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUubm9uYW1lLCBjbGFzczogbnVsbCwgZXh0ZW5zaW9uOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2gvQ3JlYXRlIGNlcnRhaW4gcGx1Z2lucyBiZWZvcmUgdGhlIEdyaWQgY3JlYXRpb24sIGVsc2UgdGhleSBtaWdodCBiZWhhdmUgb2RkbHkuXG4gICAqIE1vc3RseSBiZWNhdXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgbWlnaHQgY2hhbmdlIGFmdGVyIHRoZSBncmlkIGNyZWF0aW9uXG4gICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY3JlYXRlRXh0ZW5zaW9uc0JlZm9yZUdyaWRDcmVhdGlvbihjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10sIG9wdGlvbnM6IEdyaWRPcHRpb24pIHtcbiAgICBpZiAob3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XG4gICAgICB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24uY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uY3JlYXRlKG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5lbmFibGVDb2x1bW5SZW9yZGVyID0gcGx1Z2luLmdldFNldHVwQ29sdW1uUmVvcmRlcjtcbiAgICB9XG4gIH1cblxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXG4gIGhpZGVDb2x1bW4oY29sdW1uOiBDb2x1bW4pIHtcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW4uaWQpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5yZW1vdmVDb2x1bW5CeUluZGV4KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMoKSwgY29sdW1uSW5kZXgpO1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZWZyZXNoIHRoZSBkYXRhc2V0IHRocm91Z2ggdGhlIEJhY2tlbmQgU2VydmljZSAqL1xuICByZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnM/OiBHcmlkT3B0aW9uKSB7XG4gICAgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkIGJ5IGl0J3MgaW5kZXggaW4gdGhlIGdyaWRcbiAgICogQHBhcmFtIGFycmF5IGlucHV0XG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgcmVtb3ZlQ29sdW1uQnlJbmRleChhcnJheTogYW55W10sIGluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbDogYW55LCBpOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBpbmRleCAhPT0gaTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBUcmFuc2xhdGUgdGhlIENvbHVtbiBQaWNrZXIgYW5kIGl0J3MgbGFzdCAyIGNoZWNrYm94ZXMgKi9cbiAgdHJhbnNsYXRlQ29sdW1uUGlja2VyKCkge1xuICAgIGlmICh0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbiAmJiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi50cmFuc2xhdGVDb2x1bW5QaWNrZXIpIHtcbiAgICAgIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnRyYW5zbGF0ZUNvbHVtblBpY2tlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgdGhlIEhlYWRlciBNZW51IHRpdGxlcywgd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbiBkZWZpbml0aW9uIHRvIHJlLXRyYW5zbGF0ZSB0aGVtXG4gICAqL1xuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcbiAgICBpZiAodGhpcy5ncmlkTWVudUV4dGVuc2lvbiAmJiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUdyaWRNZW51KSB7XG4gICAgICB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUdyaWRNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cbiAgICovXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24udHJhbnNsYXRlSGVhZGVyTWVudSkge1xuICAgICAgdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUhlYWRlck1lbnUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIG1hbnVhbGx5IHRoZSBoZWFkZXIgdGl0bGVzLlxuICAgKiBXZSBjb3VsZCBvcHRpb25hbGx5IHBhc3MgYSBsb2NhbGUgKHRoYXQgd2lsbCBjaGFuZ2UgY3VycmVudGx5IGxvYWRlZCBsb2NhbGUpLCBlbHNlIGl0IHdpbGwgdXNlIGN1cnJlbnQgbG9jYWxlXG4gICAqIEBwYXJhbSBsb2NhbGUgdG8gdXNlXG4gICAqIEBwYXJhbSBuZXcgY29sdW1uIGRlZmluaXRpb25zIChvcHRpb25hbClcbiAgICovXG4gIHRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMobG9jYWxlPzogYm9vbGVhbiB8IHN0cmluZywgbmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xuICAgIGlmIChsb2NhbGUpIHtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnVzZShsb2NhbGUgYXMgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2x1bW5EZWZpbml0aW9ucyA9IG5ld0NvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcblxuICAgIHRoaXMudHJhbnNsYXRlSXRlbXMoY29sdW1uRGVmaW5pdGlvbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xuICAgIHRoaXMudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xuXG4gICAgLy8gcmUtcmVuZGVyIHRoZSBjb2x1bW4gaGVhZGVyc1xuICAgIHRoaXMucmVuZGVyQ29sdW1uSGVhZGVycyhjb2x1bW5EZWZpbml0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIChvciByZS1yZW5kZXIpIHRoZSBjb2x1bW4gaGVhZGVycyBmcm9tIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICogY2FsbGluZyBzZXRDb2x1bW5zKCkgd2lsbCB0cmlnZ2VyIGEgZ3JpZCByZS1yZW5kZXJcbiAgICovXG4gIHJlbmRlckNvbHVtbkhlYWRlcnMobmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBuZXdDb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucykge1xuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyhjb2xsZWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKiogVHJhbnNsYXRlIHRoZSBhbiBhcnJheSBvZiBpdGVtcyBmcm9tIGFuIGlucHV0IGtleSBhbmQgYXNzaWduIHRvIHRoZSBvdXRwdXQga2V5ICovXG4gIHByaXZhdGUgdHJhbnNsYXRlSXRlbXMoaXRlbXM6IGFueVtdLCBpbnB1dEtleTogc3RyaW5nLCBvdXRwdXRLZXk6IHN0cmluZykge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgaWYgKGl0ZW1baW5wdXRLZXldKSB7XG4gICAgICAgIGl0ZW1bb3V0cHV0S2V5XSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoaXRlbVtpbnB1dEtleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19