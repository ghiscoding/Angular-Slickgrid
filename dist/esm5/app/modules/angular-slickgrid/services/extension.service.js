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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sNENBQTRDLENBQUM7QUFDcEQsT0FBTywyQ0FBMkMsQ0FBQztBQUNuRCxPQUFPLDRDQUE0QyxDQUFDO0FBRXBELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUdMLGFBQWEsR0FFZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsZ0NBQWdDLEVBQ2hDLHlCQUF5QixFQUN6QixxQkFBcUIsRUFDckIsMEJBQTBCLEVBQzFCLGlCQUFpQixFQUNqQiw4QkFBOEIsRUFDOUIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIscUJBQXFCLEdBQ3RCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2pEO0lBSUUsMEJBQ1Usb0JBQTBDLEVBQzFDLHlCQUEyRCxFQUMzRCx5QkFBb0QsRUFDcEQscUJBQTRDLEVBQzVDLDBCQUFzRCxFQUN0RCxpQkFBb0MsRUFDcEMsc0JBQXNELEVBQ3RELHFCQUE0QyxFQUM1QyxtQkFBd0MsRUFDeEMsdUJBQWdELEVBQ2hELHFCQUE0QyxFQUM1QyxhQUE0QixFQUM1QixTQUEyQjtRQVozQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBa0M7UUFDM0QsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCwwQkFBcUIsR0FBckIscUJBQXFC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QUEsK0NBQUU7Z0JBQXJCLElBQU0sSUFBSSxrQkFBQTtnQkFDYixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUMxRDthQUNGOzs7Ozs7Ozs7SUFDSCxDQUFDOztnQkEzUUYsVUFBVTs7OztnQkFqQlQsb0JBQW9CO2dCQUNwQixnQ0FBZ0M7Z0JBQ2hDLHlCQUF5QjtnQkFDekIscUJBQXFCO2dCQUNyQiwwQkFBMEI7Z0JBQzFCLGlCQUFpQjtnQkFDakIsOEJBQThCO2dCQUM5QixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2QixxQkFBcUI7Z0JBRWQsYUFBYTtnQkFwQmIsZ0JBQWdCOztJQXFTekIsdUJBQUM7Q0FBQSxBQTVRRCxJQTRRQztTQTNRWSxnQkFBZ0I7OztJQUMzQix5Q0FBcUM7Ozs7O0lBR25DLGdEQUFrRDs7Ozs7SUFDbEQscURBQW1FOzs7OztJQUNuRSxxREFBNEQ7Ozs7O0lBQzVELGlEQUFvRDs7Ozs7SUFDcEQsc0RBQThEOzs7OztJQUM5RCw2Q0FBNEM7Ozs7O0lBQzVDLGtEQUE4RDs7Ozs7SUFDOUQsaURBQW9EOzs7OztJQUNwRCwrQ0FBZ0Q7Ozs7O0lBQ2hELG1EQUF3RDs7Ozs7SUFDeEQsaURBQW9EOzs7OztJQUNwRCx5Q0FBb0M7Ozs7O0lBQ3BDLHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBjb21tb24gM3JkIHBhcnR5IFNsaWNrR3JpZCBwbHVnaW5zL2xpYnNcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHJhbmdlZGVjb3JhdG9yJztcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHJhbmdlc2VsZWN0b3InO1xuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxsc2VsZWN0aW9ubW9kZWwnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge1xuICBDb2x1bW4sXG4gIEV4dGVuc2lvbk1vZGVsLFxuICBFeHRlbnNpb25OYW1lLFxuICBHcmlkT3B0aW9uLFxufSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQXV0b1Rvb2x0aXBFeHRlbnNpb24sXG4gIENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uLFxuICBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxuICBDb2x1bW5QaWNrZXJFeHRlbnNpb24sXG4gIERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLFxuICBHcmlkTWVudUV4dGVuc2lvbixcbiAgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxuICBIZWFkZXJCdXR0b25FeHRlbnNpb24sXG4gIEhlYWRlck1lbnVFeHRlbnNpb24sXG4gIFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxuICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXG59IGZyb20gJy4uL2V4dGVuc2lvbnMvaW5kZXgnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uU2VydmljZSB7XG4gIGV4dGVuc2lvbkxpc3Q6IEV4dGVuc2lvbk1vZGVsW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGF1dG9Ub29sdGlwRXh0ZW5zaW9uOiBBdXRvVG9vbHRpcEV4dGVuc2lvbixcbiAgICBwcml2YXRlIGNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb246IENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbjogQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbixcbiAgICBwcml2YXRlIGNvbHVtblBpY2tlckV4dGVuc2lvbjogQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb246IERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgZ3JpZE1lbnVFeHRlbnNpb246IEdyaWRNZW51RXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbjogR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgaGVhZGVyQnV0dG9uRXh0ZW5zaW9uOiBIZWFkZXJCdXR0b25FeHRlbnNpb24sXG4gICAgcHJpdmF0ZSBoZWFkZXJNZW51RXh0ZW5zaW9uOiBIZWFkZXJNZW51RXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgcm93TW92ZU1hbmFnZXJFeHRlbnNpb246IFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxuICAgIHByaXZhdGUgcm93U2VsZWN0aW9uRXh0ZW5zaW9uOiBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXG4gICAgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICApIHsgfVxuXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgY29udHJvbHMgJiBwbHVnaW5zICovXG4gIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgPSBudWxsO1xuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IFtdO1xuXG4gICAgLy8gZGlzcG9zZSBvZiBlYWNoIGNvbnRyb2wvcGx1Z2luICYgcmVzZXQgdGhlIGxpc3RcbiAgICB0aGlzLmV4dGVuc2lvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5jbGFzcyAmJiBpdGVtLmNsYXNzLmRpc3Bvc2UpIHtcbiAgICAgICAgaXRlbS5jbGFzcy5kaXNwb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5leHRlbnNpb25MaXN0ID0gW107XG4gIH1cblxuICAvKiogR2V0IGFsbCBjb2x1bW5zIChpbmNsdWRlcyB2aXNpYmxlIGFuZCBub24tdmlzaWJsZSkgKi9cbiAgZ2V0QWxsQ29sdW1ucygpOiBDb2x1bW5bXSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zIHx8IFtdO1xuICB9XG5cbiAgLyoqIEdldCBvbmx5IHZpc2libGUgY29sdW1ucyAqL1xuICBnZXRWaXNpYmxlQ29sdW1ucygpOiBDb2x1bW5bXSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyB8fCBbXTtcbiAgfVxuXG4gIC8qKiBHZXQgYWxsIEV4dGVuc2lvbnMgKi9cbiAgZ2V0QWxsRXh0ZW5zaW9ucygpOiBFeHRlbnNpb25Nb2RlbFtdIHtcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25MaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBFeHRlbnNpb24gYnkgaXQncyBuYW1lXG4gICAqICBAcGFyYW0gbmFtZVxuICAgKi9cbiAgZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWU6IEV4dGVuc2lvbk5hbWUpOiBFeHRlbnNpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5zaW9uTGlzdC5maW5kKChwKSA9PiBwLm5hbWUgPT09IG5hbWUpO1xuICB9XG5cbiAgLyoqIEF1dG8tcmVzaXplIGFsbCB0aGUgY29sdW1uIGluIHRoZSBncmlkIHRvIGZpdCB0aGUgZ3JpZCB3aWR0aCAqL1xuICBhdXRvUmVzaXplQ29sdW1ucygpIHtcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKiBBdHRhY2gvQ3JlYXRlIGRpZmZlcmVudCBDb250cm9scyBvciBQbHVnaW5zIGFmdGVyIHRoZSBHcmlkIGlzIGNyZWF0ZWQgKi9cbiAgYXR0YWNoRGlmZmVyZW50RXh0ZW5zaW9ucygpIHtcbiAgICAvLyBtYWtlIHN1cmUgYWxsIGNvbHVtbnMgYXJlIHRyYW5zbGF0ZWQgYmVmb3JlIGNyZWF0aW5nIENvbHVtblBpY2tlci9HcmlkTWVudSBDb250cm9sc1xuICAgIC8vIHRoaXMgaXMgdG8gYXZvaWQgaGF2aW5nIGhpZGRlbiBjb2x1bW5zIG5vdCBiZWluZyB0cmFuc2xhdGVkIG9uIGZpcnN0IGxvYWRcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xuICAgICAgdGhpcy50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XG4gICAgfVxuXG4gICAgLy8gQXV0byBUb29sdGlwIFBsdWdpblxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Rvb2x0aXApIHtcbiAgICAgIGlmICh0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uICYmIHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmF1dG9Ub29sdGlwLCBjbGFzczogdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29sdW1uIFBpY2tlciBDb250cm9sXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDb2x1bW5QaWNrZXIpIHtcbiAgICAgIGlmICh0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbiAmJiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi5yZWdpc3Rlcikge1xuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCBjbGFzczogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcmFnZ2FibGUgR3JvdXBpbmcgUGx1Z2luXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gJiYgdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5yZWdpc3Rlcikge1xuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZHJhZ2dhYmxlR3JvdXBpbmcsIGNsYXNzOiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHcmlkIE1lbnUgQ29udHJvbFxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlR3JpZE1lbnUpIHtcbiAgICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmdyaWRNZW51LCBjbGFzczogdGhpcy5ncmlkTWVudUV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR3JvdXBpbmcgUGx1Z2luICYgRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpblxuICAgIC8vIHJlZ2lzdGVyIHRoZSBncm91cCBpdGVtIG1ldGFkYXRhIHByb3ZpZGVyIHRvIGFkZCBleHBhbmQvY29sbGFwc2UgZ3JvdXAgaGFuZGxlcnNcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZURyYWdnYWJsZUdyb3VwaW5nIHx8IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVHcm91cGluZykge1xuICAgICAgaWYgKHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiAmJiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmdyb3VwSXRlbU1ldGFQcm92aWRlciwgY2xhc3M6IHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24ucmVnaXN0ZXIoKSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVja2JveCBTZWxlY3RvciBQbHVnaW5cbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24gJiYgdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmNoZWNrYm94U2VsZWN0b3IsIGNsYXNzOiB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnJlZ2lzdGVyKHJvd1NlbGVjdGlvbkV4dGVuc2lvbikgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUm93IE1vdmUgTWFuYWdlciBQbHVnaW5cbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd01vdmVNYW5hZ2VyKSB7XG4gICAgICBpZiAodGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiAmJiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5yb3dNb3ZlTWFuYWdlciwgY2xhc3M6IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJvdyBTZWxlY3Rpb24gUGx1Z2luXG4gICAgaWYgKCF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24gJiYgdGhpcy5yb3dTZWxlY3Rpb25FeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbiwgY2xhc3M6IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLCBleHRlbnNpb246IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGVhZGVyIEJ1dHRvbiBQbHVnaW5cbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlckJ1dHRvbikge1xuICAgICAgaWYgKHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5oZWFkZXJCdXR0b24sIGNsYXNzOiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbiwgZXh0ZW5zaW9uOiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbi5yZWdpc3RlcigpIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhlYWRlciBNZW51IFBsdWdpblxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlSGVhZGVyTWVudSkge1xuICAgICAgaWYgKHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcbiAgICAgICAgdGhpcy5leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmhlYWRlck1lbnUsIGNsYXNzOiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2VsbCBFeHRlcm5hbCBDb3B5IE1hbmFnZXIgUGx1Z2luIChFeGNlbCBMaWtlKVxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRXhjZWxDb3B5QnVmZmVyKSB7XG4gICAgICBpZiAodGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uICYmIHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbi5yZWdpc3Rlcikge1xuICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIsIGNsYXNzOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24sIGV4dGVuc2lvbjogdGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uLnJlZ2lzdGVyKCkgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWFudWFsbHkgcmVnaXN0ZXIgb3RoZXIgcGx1Z2luc1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpKSB7XG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4ocGx1Z2luKTtcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUubm9uYW1lLCBjbGFzczogbnVsbCwgZXh0ZW5zaW9uOiBwbHVnaW4gfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyk7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBleHRlbnNpb246IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaC9DcmVhdGUgY2VydGFpbiBwbHVnaW5zIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbiwgZWxzZSB0aGV5IG1pZ2h0IGJlaGF2ZSBvZGRseS5cbiAgICogTW9zdGx5IGJlY2F1c2UgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBtaWdodCBjaGFuZ2UgYWZ0ZXIgdGhlIGdyaWQgY3JlYXRpb25cbiAgICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjcmVhdGVFeHRlbnNpb25zQmVmb3JlR3JpZENyZWF0aW9uKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xuICAgIGlmIChvcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5jcmVhdGUoY29sdW1uRGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5jcmVhdGUob3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmVuYWJsZUNvbHVtblJlb3JkZXIgPSBwbHVnaW4uZ2V0U2V0dXBDb2x1bW5SZW9yZGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSB0aGlzLnJlbW92ZUNvbHVtbkJ5SW5kZXgodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpLCBjb2x1bW5JbmRleCk7XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlZnJlc2ggdGhlIGRhdGFzZXQgdGhyb3VnaCB0aGUgQmFja2VuZCBTZXJ2aWNlICovXG4gIHJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucz86IEdyaWRPcHRpb24pIHtcbiAgICB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgYnkgaXQncyBpbmRleCBpbiB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gYXJyYXkgaW5wdXRcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICByZW1vdmVDb2x1bW5CeUluZGV4KGFycmF5OiBhbnlbXSwgaW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKGVsOiBhbnksIGk6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIGluZGV4ICE9PSBpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFRyYW5zbGF0ZSB0aGUgQ29sdW1uIFBpY2tlciBhbmQgaXQncyBsYXN0IDIgY2hlY2tib3hlcyAqL1xuICB0cmFuc2xhdGVDb2x1bW5QaWNrZXIoKSB7XG4gICAgaWYgKHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uICYmIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnRyYW5zbGF0ZUNvbHVtblBpY2tlcikge1xuICAgICAgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24udHJhbnNsYXRlQ29sdW1uUGlja2VyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cbiAgICovXG4gIHRyYW5zbGF0ZUdyaWRNZW51KCkge1xuICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUpIHtcbiAgICAgIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxuICAgKi9cbiAgdHJhbnNsYXRlSGVhZGVyTWVudSgpIHtcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KSB7XG4gICAgICB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24udHJhbnNsYXRlSGVhZGVyTWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgbWFudWFsbHkgdGhlIGhlYWRlciB0aXRsZXMuXG4gICAqIFdlIGNvdWxkIG9wdGlvbmFsbHkgcGFzcyBhIGxvY2FsZSAodGhhdCB3aWxsIGNoYW5nZSBjdXJyZW50bHkgbG9hZGVkIGxvY2FsZSksIGVsc2UgaXQgd2lsbCB1c2UgY3VycmVudCBsb2NhbGVcbiAgICogQHBhcmFtIGxvY2FsZSB0byB1c2VcbiAgICogQHBhcmFtIG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgKG9wdGlvbmFsKVxuICAgKi9cbiAgdHJhbnNsYXRlQ29sdW1uSGVhZGVycyhsb2NhbGU/OiBib29sZWFuIHwgc3RyaW5nLCBuZXdDb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XG4gICAgaWYgKGxvY2FsZSkge1xuICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxvY2FsZSBhcyBzdHJpbmcpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbHVtbkRlZmluaXRpb25zID0gbmV3Q29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zO1xuXG4gICAgdGhpcy50cmFuc2xhdGVJdGVtcyhjb2x1bW5EZWZpbml0aW9ucywgJ2hlYWRlcktleScsICduYW1lJyk7XG4gICAgdGhpcy50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XG5cbiAgICAvLyByZS1yZW5kZXIgdGhlIGNvbHVtbiBoZWFkZXJzXG4gICAgdGhpcy5yZW5kZXJDb2x1bW5IZWFkZXJzKGNvbHVtbkRlZmluaXRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgKG9yIHJlLXJlbmRlcikgdGhlIGNvbHVtbiBoZWFkZXJzIGZyb20gY29sdW1uIGRlZmluaXRpb25zLlxuICAgKiBjYWxsaW5nIHNldENvbHVtbnMoKSB3aWxsIHRyaWdnZXIgYSBncmlkIHJlLXJlbmRlclxuICAgKi9cbiAgcmVuZGVyQ29sdW1uSGVhZGVycyhuZXdDb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XG4gICAgY29uc3QgY29sbGVjdGlvbiA9IG5ld0NvbHVtbkRlZmluaXRpb25zIHx8IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKGNvbGxlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUcmFuc2xhdGUgdGhlIGFuIGFycmF5IG9mIGl0ZW1zIGZyb20gYW4gaW5wdXQga2V5IGFuZCBhc3NpZ24gdG8gdGhlIG91dHB1dCBrZXkgKi9cbiAgcHJpdmF0ZSB0cmFuc2xhdGVJdGVtcyhpdGVtczogYW55W10sIGlucHV0S2V5OiBzdHJpbmcsIG91dHB1dEtleTogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoaXRlbVtpbnB1dEtleV0pIHtcbiAgICAgICAgaXRlbVtvdXRwdXRLZXldID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChpdGVtW2lucHV0S2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=