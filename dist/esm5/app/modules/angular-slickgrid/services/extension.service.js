/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExtensionName, } from '../models/index';
import { AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, DraggableGroupingExtension, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowMoveManagerExtension, RowSelectionExtension, } from '../extensions/index';
import { SharedService } from './shared.service';
var ExtensionService = /** @class */ (function () {
    function ExtensionService(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
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
    /** Dispose of all the controls & plugins */
    /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    ExtensionService.prototype.dispose = /**
     * Dispose of all the controls & plugins
     * @return {?}
     */
    function () {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this.extensionList.forEach(function (item) {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        });
        this.extensionList = [];
    };
    /** Get all columns (includes visible and non-visible) */
    /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    ExtensionService.prototype.getAllColumns = /**
     * Get all columns (includes visible and non-visible)
     * @return {?}
     */
    function () {
        return this.sharedService.allColumns || [];
    };
    /** Get only visible columns */
    /**
     * Get only visible columns
     * @return {?}
     */
    ExtensionService.prototype.getVisibleColumns = /**
     * Get only visible columns
     * @return {?}
     */
    function () {
        return this.sharedService.visibleColumns || [];
    };
    /** Get all Extensions */
    /**
     * Get all Extensions
     * @return {?}
     */
    ExtensionService.prototype.getAllExtensions = /**
     * Get all Extensions
     * @return {?}
     */
    function () {
        return this.extensionList;
    };
    /**
     * Get an Extension by it's name
     *  @param name
     */
    /**
     * Get an Extension by it's name
     * @param {?} name
     * @return {?}
     */
    ExtensionService.prototype.getExtensionByName = /**
     * Get an Extension by it's name
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.extensionList.find(function (p) { return p.name === name; });
    };
    /** Auto-resize all the column in the grid to fit the grid width */
    /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    ExtensionService.prototype.autoResizeColumns = /**
     * Auto-resize all the column in the grid to fit the grid width
     * @return {?}
     */
    function () {
        this.sharedService.grid.autosizeColumns();
    };
    /** Attach/Create different Controls or Plugins after the Grid is created */
    /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    ExtensionService.prototype.attachDifferentExtensions = /**
     * Attach/Create different Controls or Plugins after the Grid is created
     * @return {?}
     */
    function () {
        var _this = this;
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
                var rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
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
                this.sharedService.gridOptions.registerPlugins.forEach(function (plugin) {
                    _this.sharedService.grid.registerPlugin(plugin);
                    _this.extensionList.push({ name: ExtensionName.noname, class: null, extension: plugin });
                });
            }
            else {
                this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                this.extensionList.push({ name: ExtensionName.noname, class: null, extension: this.sharedService.gridOptions.registerPlugins });
            }
        }
    };
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param columnDefinitions
     * @param options
     */
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    ExtensionService.prototype.createExtensionsBeforeGridCreation = /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param {?} columnDefinitions
     * @param {?} options
     * @return {?}
     */
    function (columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
        if (options.enableDraggableGrouping) {
            /** @type {?} */
            var plugin = this.draggableGroupingExtension.create(options);
            options.enableColumnReorder = plugin.getSetupColumnReorder;
        }
    };
    /** Hide a column from the grid */
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    ExtensionService.prototype.hideColumn = /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    };
    /** Refresh the dataset through the Backend Service */
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    ExtensionService.prototype.refreshBackendDataset = /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    };
    /**
     * Remove a column from the grid by it's index in the grid
     * @param array input
     * @param index
     */
    /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    ExtensionService.prototype.removeColumnByIndex = /**
     * Remove a column from the grid by it's index in the grid
     * @param {?} array input
     * @param {?} index
     * @return {?}
     */
    function (array, index) {
        return array.filter(function (el, i) {
            return index !== i;
        });
    };
    /** Translate the Column Picker and it's last 2 checkboxes */
    /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    ExtensionService.prototype.translateColumnPicker = /**
     * Translate the Column Picker and it's last 2 checkboxes
     * @return {?}
     */
    function () {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    ExtensionService.prototype.translateGridMenu = /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    function () {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    ExtensionService.prototype.translateHeaderMenu = /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     * @return {?}
     */
    function () {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    };
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale to use
     * @param new column definitions (optional)
     */
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    ExtensionService.prototype.translateColumnHeaders = /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param {?=} locale to use
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    function (locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use((/** @type {?} */ (locale)));
        }
        /** @type {?} */
        var columnDefinitions = newColumnDefinitions || this.sharedService.columnDefinitions;
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    };
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     */
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    ExtensionService.prototype.renderColumnHeaders = /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     * @param {?=} newColumnDefinitions
     * @return {?}
     */
    function (newColumnDefinitions) {
        /** @type {?} */
        var collection = newColumnDefinitions || this.sharedService.columnDefinitions;
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    };
    /** Translate the an array of items from an input key and assign to the output key */
    /**
     * Translate the an array of items from an input key and assign to the output key
     * @private
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    ExtensionService.prototype.translateItems = /**
     * Translate the an array of items from an input key and assign to the output key
     * @private
     * @param {?} items
     * @param {?} inputKey
     * @param {?} outputKey
     * @return {?}
     */
    function (items, inputKey, outputKey) {
        var e_1, _a;
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (item[inputKey]) {
                    item[outputKey] = this.translate.instant(item[inputKey]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ExtensionService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ExtensionService.ctorParameters = function () { return [
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
    ]; };
    return ExtensionService;
}());
export { ExtensionService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sNENBQTRDLENBQUM7QUFDcEQsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLDRDQUE0QyxDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUdMLGFBQWEsR0FFZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsZ0NBQWdDLEVBQ2hDLHlCQUF5QixFQUN6QixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQiw4QkFBOEIsRUFDOUIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIscUJBQXFCLEdBQ3RCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2pEO0lBSUUsMEJBQ1Usb0JBQTBDLEVBQzFDLHlCQUEyRCxFQUMzRCx5QkFBb0QsRUFDcEQscUJBQTRDLEVBQzVDLDBCQUFzRCxFQUN0RCxpQkFBb0MsRUFDcEMsc0JBQXNELEVBQ3RELHFCQUE0QyxFQUM1QyxtQkFBd0MsRUFDeEMsdUJBQWdELEVBQ2hELHFCQUE0QyxFQUM1QyxhQUE0QixFQUM1QixTQUEyQjtRQVozQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBa0M7UUFDM0QsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCwwQkFBcUIsR0FBckIscUJBQXFC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LElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUMxRDthQUNGOzs7Ozs7Ozs7SUFDSCxDQUFDOztnQkEzUUYsVUFBVTs7OztnQkFqQlQsb0JBQW9CO2dCQUNwQixnQ0FBZ0M7Z0JBQ2hDLHlCQUF5QjtnQkFDekIscUJBQXFCO2dCQUNyQiwwQkFBMEI7Z0JBQzFCLGlCQUFpQjtnQkFDakIsOEJBQThCO2dCQUM5QixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2QixxQkFBcUI7Z0JBRWQsYUFBYTtnQkFwQmIsZ0JBQWdCOztJQXFTekIsdUJBQUM7Q0FBQSxBQTVRRCxJQTRRQztTQTNRWSxnQkFBZ0I7OztJQUMzQix5Q0FBcUM7Ozs7O0lBR25DLGdEQUFrRDs7Ozs7SUFDbEQscURBQW1FOzs7OztJQUNuRSxxREFBNEQ7Ozs7O0lBQzVELGlEQUFvRDs7Ozs7SUFDcEQsc0RBQThEOzs7OztJQUM5RCw2Q0FBNEM7Ozs7O0lBQzVDLGtEQUE4RDs7Ozs7SUFDOUQsaURBQW9EOzs7OztJQUNwRCwrQ0FBZ0Q7Ozs7O0lBQ2hELG1EQUF3RDs7Ozs7SUFDeEQsaURBQW9EOzs7OztJQUNwRCx5Q0FBb0M7Ozs7O0lBQ3BDLHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBjb21tb24gM3JkIHBhcnR5IFNsaWNrR3JpZCBwbHVnaW5zL2xpYnNcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxscmFuZ2VkZWNvcmF0b3InO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxyYW5nZXNlbGVjdG9yJztcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxsc2VsZWN0aW9ubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEV4dGVuc2lvbk1vZGVsLFxyXG4gIEV4dGVuc2lvbk5hbWUsXHJcbiAgR3JpZE9wdGlvbixcclxufSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQge1xyXG4gIEF1dG9Ub29sdGlwRXh0ZW5zaW9uLFxyXG4gIENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gIERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLFxyXG4gIEdyaWRNZW51RXh0ZW5zaW9uLFxyXG4gIEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbixcclxuICBIZWFkZXJCdXR0b25FeHRlbnNpb24sXHJcbiAgSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcclxuICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbn0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9pbmRleCc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblNlcnZpY2Uge1xyXG4gIGV4dGVuc2lvbkxpc3Q6IEV4dGVuc2lvbk1vZGVsW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dG9Ub29sdGlwRXh0ZW5zaW9uOiBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbjogQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb246IENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNvbHVtblBpY2tlckV4dGVuc2lvbjogQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbjogRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGdyaWRNZW51RXh0ZW5zaW9uOiBHcmlkTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbjogR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBoZWFkZXJCdXR0b25FeHRlbnNpb246IEhlYWRlckJ1dHRvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgaGVhZGVyTWVudUV4dGVuc2lvbjogSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93TW92ZU1hbmFnZXJFeHRlbnNpb246IFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSByb3dTZWxlY3Rpb25FeHRlbnNpb246IFJvd1NlbGVjdGlvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgY29udHJvbHMgJiBwbHVnaW5zICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IFtdO1xyXG5cclxuICAgIC8vIGRpc3Bvc2Ugb2YgZWFjaCBjb250cm9sL3BsdWdpbiAmIHJlc2V0IHRoZSBsaXN0XHJcbiAgICB0aGlzLmV4dGVuc2lvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNsYXNzICYmIGl0ZW0uY2xhc3MuZGlzcG9zZSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3MuZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZXh0ZW5zaW9uTGlzdCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBhbGwgY29sdW1ucyAoaW5jbHVkZXMgdmlzaWJsZSBhbmQgbm9uLXZpc2libGUpICovXHJcbiAgZ2V0QWxsQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMgfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IG9ubHkgdmlzaWJsZSBjb2x1bW5zICovXHJcbiAgZ2V0VmlzaWJsZUNvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyB8fCBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgYWxsIEV4dGVuc2lvbnMgKi9cclxuICBnZXRBbGxFeHRlbnNpb25zKCk6IEV4dGVuc2lvbk1vZGVsW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uTGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBFeHRlbnNpb24gYnkgaXQncyBuYW1lXHJcbiAgICogIEBwYXJhbSBuYW1lXHJcbiAgICovXHJcbiAgZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWU6IEV4dGVuc2lvbk5hbWUpOiBFeHRlbnNpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25MaXN0LmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKiogQXV0by1yZXNpemUgYWxsIHRoZSBjb2x1bW4gaW4gdGhlIGdyaWQgdG8gZml0IHRoZSBncmlkIHdpZHRoICovXHJcbiAgYXV0b1Jlc2l6ZUNvbHVtbnMoKSB7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBBdHRhY2gvQ3JlYXRlIGRpZmZlcmVudCBDb250cm9scyBvciBQbHVnaW5zIGFmdGVyIHRoZSBHcmlkIGlzIGNyZWF0ZWQgKi9cclxuICBhdHRhY2hEaWZmZXJlbnRFeHRlbnNpb25zKCkge1xyXG4gICAgLy8gbWFrZSBzdXJlIGFsbCBjb2x1bW5zIGFyZSB0cmFuc2xhdGVkIGJlZm9yZSBjcmVhdGluZyBDb2x1bW5QaWNrZXIvR3JpZE1lbnUgQ29udHJvbHNcclxuICAgIC8vIHRoaXMgaXMgdG8gYXZvaWQgaGF2aW5nIGhpZGRlbiBjb2x1bW5zIG5vdCBiZWluZyB0cmFuc2xhdGVkIG9uIGZpcnN0IGxvYWRcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgIHRoaXMudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEF1dG8gVG9vbHRpcCBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Rvb2x0aXApIHtcclxuICAgICAgaWYgKHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24gJiYgdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5hdXRvVG9vbHRpcCwgY2xhc3M6IHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29sdW1uIFBpY2tlciBDb250cm9sXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNvbHVtblBpY2tlcikge1xyXG4gICAgICBpZiAodGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24gJiYgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCBjbGFzczogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIERyYWdnYWJsZSBHcm91cGluZyBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gJiYgdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZywgY2xhc3M6IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR3JpZCBNZW51IENvbnRyb2xcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlR3JpZE1lbnUpIHtcclxuICAgICAgaWYgKHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24gJiYgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ncmlkTWVudSwgY2xhc3M6IHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR3JvdXBpbmcgUGx1Z2luXHJcbiAgICAvLyByZWdpc3RlciB0aGUgZ3JvdXAgaXRlbSBtZXRhZGF0YSBwcm92aWRlciB0byBhZGQgZXhwYW5kL2NvbGxhcHNlIGdyb3VwIGhhbmRsZXJzXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyb3VwaW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24gJiYgdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmdyb3VwSXRlbU1ldGFQcm92aWRlciwgY2xhc3M6IHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrYm94IFNlbGVjdG9yIFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIGlmICh0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24gJiYgdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5jaGVja2JveFNlbGVjdG9yLCBjbGFzczogdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcihyb3dTZWxlY3Rpb25FeHRlbnNpb24pIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUm93IE1vdmUgTWFuYWdlciBQbHVnaW5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlUm93TW92ZU1hbmFnZXIpIHtcclxuICAgICAgaWYgKHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24gJiYgdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5yb3dNb3ZlTWFuYWdlciwgY2xhc3M6IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUm93IFNlbGVjdGlvbiBQbHVnaW5cclxuICAgIGlmICghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbikge1xyXG4gICAgICBpZiAodGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24gJiYgdGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uLCBjbGFzczogdGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlYWRlciBCdXR0b24gUGx1Z2luXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlckJ1dHRvbikge1xyXG4gICAgICBpZiAodGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uLCBjbGFzczogdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5oZWFkZXJCdXR0b25FeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlYWRlciBNZW51IFBsdWdpblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XHJcbiAgICAgIGlmICh0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmhlYWRlck1lbnUsIGNsYXNzOiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDZWxsIEV4dGVybmFsIENvcHkgTWFuYWdlciBQbHVnaW4gKEV4Y2VsIExpa2UpXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUV4Y2VsQ29weUJ1ZmZlcikge1xyXG4gICAgICBpZiAodGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uICYmIHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlciwgY2xhc3M6IHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hbnVhbGx5IHJlZ2lzdGVyIG90aGVyIHBsdWdpbnNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucykpIHtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4ocGx1Z2luKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBleHRlbnNpb246IHBsdWdpbiB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zKTtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUubm9uYW1lLCBjbGFzczogbnVsbCwgZXh0ZW5zaW9uOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2gvQ3JlYXRlIGNlcnRhaW4gcGx1Z2lucyBiZWZvcmUgdGhlIEdyaWQgY3JlYXRpb24sIGVsc2UgdGhleSBtaWdodCBiZWhhdmUgb2RkbHkuXHJcbiAgICogTW9zdGx5IGJlY2F1c2UgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBtaWdodCBjaGFuZ2UgYWZ0ZXIgdGhlIGdyaWQgY3JlYXRpb25cclxuICAgKiBAcGFyYW0gY29sdW1uRGVmaW5pdGlvbnNcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIGNyZWF0ZUV4dGVuc2lvbnNCZWZvcmVHcmlkQ3JlYXRpb24oY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdLCBvcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5jcmVhdGUoY29sdW1uRGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5jcmVhdGUob3B0aW9ucyk7XHJcbiAgICAgIG9wdGlvbnMuZW5hYmxlQ29sdW1uUmVvcmRlciA9IHBsdWdpbi5nZXRTZXR1cENvbHVtblJlb3JkZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXHJcbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcclxuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW4uaWQpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSB0aGlzLnJlbW92ZUNvbHVtbkJ5SW5kZXgodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpLCBjb2x1bW5JbmRleCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZWZyZXNoIHRoZSBkYXRhc2V0IHRocm91Z2ggdGhlIEJhY2tlbmQgU2VydmljZSAqL1xyXG4gIHJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucz86IEdyaWRPcHRpb24pIHtcclxuICAgIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVmcmVzaEJhY2tlbmREYXRhc2V0KGdyaWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkIGJ5IGl0J3MgaW5kZXggaW4gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gYXJyYXkgaW5wdXRcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKi9cclxuICByZW1vdmVDb2x1bW5CeUluZGV4KGFycmF5OiBhbnlbXSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGFycmF5LmZpbHRlcigoZWw6IGFueSwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIHJldHVybiBpbmRleCAhPT0gaTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgQ29sdW1uIFBpY2tlciBhbmQgaXQncyBsYXN0IDIgY2hlY2tib3hlcyAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtblBpY2tlcigpIHtcclxuICAgIGlmICh0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbiAmJiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi50cmFuc2xhdGVDb2x1bW5QaWNrZXIpIHtcclxuICAgICAgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24udHJhbnNsYXRlQ29sdW1uUGlja2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgdGhlIEhlYWRlciBNZW51IHRpdGxlcywgd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbiBkZWZpbml0aW9uIHRvIHJlLXRyYW5zbGF0ZSB0aGVtXHJcbiAgICovXHJcbiAgdHJhbnNsYXRlR3JpZE1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkTWVudUV4dGVuc2lvbiAmJiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUdyaWRNZW51KSB7XHJcbiAgICAgIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVIZWFkZXJNZW51KCkge1xyXG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24udHJhbnNsYXRlSGVhZGVyTWVudSkge1xyXG4gICAgICB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24udHJhbnNsYXRlSGVhZGVyTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIG1hbnVhbGx5IHRoZSBoZWFkZXIgdGl0bGVzLlxyXG4gICAqIFdlIGNvdWxkIG9wdGlvbmFsbHkgcGFzcyBhIGxvY2FsZSAodGhhdCB3aWxsIGNoYW5nZSBjdXJyZW50bHkgbG9hZGVkIGxvY2FsZSksIGVsc2UgaXQgd2lsbCB1c2UgY3VycmVudCBsb2NhbGVcclxuICAgKiBAcGFyYW0gbG9jYWxlIHRvIHVzZVxyXG4gICAqIEBwYXJhbSBuZXcgY29sdW1uIGRlZmluaXRpb25zIChvcHRpb25hbClcclxuICAgKi9cclxuICB0cmFuc2xhdGVDb2x1bW5IZWFkZXJzKGxvY2FsZT86IGJvb2xlYW4gfCBzdHJpbmcsIG5ld0NvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcclxuICAgIGlmIChsb2NhbGUpIHtcclxuICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxvY2FsZSBhcyBzdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbHVtbkRlZmluaXRpb25zID0gbmV3Q29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zO1xyXG5cclxuICAgIHRoaXMudHJhbnNsYXRlSXRlbXMoY29sdW1uRGVmaW5pdGlvbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG4gICAgdGhpcy50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcblxyXG4gICAgLy8gcmUtcmVuZGVyIHRoZSBjb2x1bW4gaGVhZGVyc1xyXG4gICAgdGhpcy5yZW5kZXJDb2x1bW5IZWFkZXJzKGNvbHVtbkRlZmluaXRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlciAob3IgcmUtcmVuZGVyKSB0aGUgY29sdW1uIGhlYWRlcnMgZnJvbSBjb2x1bW4gZGVmaW5pdGlvbnMuXHJcbiAgICogY2FsbGluZyBzZXRDb2x1bW5zKCkgd2lsbCB0cmlnZ2VyIGEgZ3JpZCByZS1yZW5kZXJcclxuICAgKi9cclxuICByZW5kZXJDb2x1bW5IZWFkZXJzKG5ld0NvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBuZXdDb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMoY29sbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBhbiBhcnJheSBvZiBpdGVtcyBmcm9tIGFuIGlucHV0IGtleSBhbmQgYXNzaWduIHRvIHRoZSBvdXRwdXQga2V5ICovXHJcbiAgcHJpdmF0ZSB0cmFuc2xhdGVJdGVtcyhpdGVtczogYW55W10sIGlucHV0S2V5OiBzdHJpbmcsIG91dHB1dEtleTogc3RyaW5nKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgaWYgKGl0ZW1baW5wdXRLZXldKSB7XHJcbiAgICAgICAgaXRlbVtvdXRwdXRLZXldID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChpdGVtW2lucHV0S2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19