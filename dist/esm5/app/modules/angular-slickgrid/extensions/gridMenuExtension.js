/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { DelimiterType, ExtensionName, FileType, } from '../models';
import { ExportService } from '../services/export.service';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { castToPromise } from '../services/utilities';
import { SharedService } from '../services/shared.service';
var GridMenuExtension = /** @class */ (function () {
    function GridMenuExtension(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
        this.exportService = exportService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._areVisibleColumnDifferent = false;
        this._eventHandler = new Slick.EventHandler();
    }
    /**
     * @return {?}
     */
    GridMenuExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    GridMenuExtension.prototype.register = /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    function () {
        var _this = this;
        // keep original user grid menu, useful when switching locale to translate
        this._userOriginalGridMenu = tslib_1.__assign({}, this.sharedService.gridOptions.gridMenu);
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
            this.sharedService.gridOptions.gridMenu = tslib_1.__assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = tslib_1.__spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this._extension = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                this._eventHandler.subscribe(this._extension.onBeforeMenuShow, function (e, args) {
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onColumnsChanged, function (e, args) {
                    _this._areVisibleColumnDifferent = true;
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onCommand, function (e, args) {
                    _this.executeGridMenuInternalCustomCommands(e, args);
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onMenuClose, function (e, args) {
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    // we also want to resize the columns if the user decided to hide certain column(s)
                    if (_this.sharedService.grid && typeof _this.sharedService.grid.autosizeColumns === 'function') {
                        // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                        /** @type {?} */
                        var gridUid = _this.sharedService.grid.getUID();
                        if (_this._areVisibleColumnDifferent && gridUid && $("." + gridUid).length > 0) {
                            if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableAutoSizeColumns) {
                                _this.sharedService.grid.autosizeColumns();
                            }
                            _this._areVisibleColumnDifferent = false;
                        }
                    }
                });
            }
            return this._extension;
        }
        return null;
    };
    /**
    * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
    * These are the default internal custom commands
    * @param event
    * @param GridMenuItem args
    */
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    GridMenuExtension.prototype.executeGridMenuInternalCustomCommands = /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'clear-filter':
                    this.filterService.clearFilters();
                    this.sharedService.dataView.refresh();
                    break;
                case 'clear-sorting':
                    this.sortService.clearSorting();
                    this.sharedService.dataView.refresh();
                    break;
                case 'export-csv':
                    this.exportService.exportToFile({
                        delimiter: DelimiterType.comma,
                        filename: 'export',
                        format: FileType.csv,
                        useUtf8WithBom: true
                    });
                    break;
                case 'export-text-delimited':
                    this.exportService.exportToFile({
                        delimiter: DelimiterType.tab,
                        filename: 'export',
                        format: FileType.txt,
                        useUtf8WithBom: true
                    });
                    break;
                case 'toggle-filter':
                    this.sharedService.grid.setHeaderRowVisibility(!this.sharedService.grid.getOptions().showHeaderRow);
                    break;
                case 'toggle-toppanel':
                    this.sharedService.grid.setTopPanelVisibility(!this.sharedService.grid.getOptions().showTopPanel);
                    break;
                case 'toggle-preheader':
                    this.sharedService.grid.setPreHeaderPanelVisibility(!this.sharedService.grid.getOptions().showPreHeaderPanel);
                    break;
                case 'refresh-dataset':
                    this.refreshBackendDataset();
                    break;
                default:
                    break;
            }
        }
    };
    /** Refresh the dataset through the Backend Service */
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    GridMenuExtension.prototype.refreshBackendDataset = /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    function (gridOptions) {
        var _this = this;
        /** @type {?} */
        var query = '';
        // user can pass new set of grid options which will override current ones
        if (gridOptions) {
            this.sharedService.gridOptions = tslib_1.__assign({}, this.sharedService.gridOptions, gridOptions);
        }
        /** @type {?} */
        var backendApi = this.sharedService.gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            var startTime_1 = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            /** @type {?} */
            var observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then(function (processResult) {
                /** @type {?} */
                var endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi && backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime: startTime_1,
                            endTime: endTime,
                            executionTime: endTime.valueOf() - startTime_1.valueOf(),
                            totalItemCount: _this.sharedService.gridOptions && _this.sharedService.gridOptions.pagination && _this.sharedService.gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            });
        }
    };
    /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @private
     * @return {?}
     */
    GridMenuExtension.prototype.addGridMenuCustomCommands = /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var backendApi = this.sharedService.gridOptions.backendServiceApi || null;
        /** @type {?} */
        var gridMenuCustomItems = [];
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableFiltering) {
            // show grid menu: clear all filters
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllFiltersCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            // show grid menu: toggle filter row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideToggleFilterCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 52
                });
            }
            // show grid menu: refresh dataset
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
                    disabled: false,
                    command: 'refresh-dataset',
                    positionOrder: 54
                });
            }
        }
        if (this.sharedService.gridOptions.showPreHeaderPanel) {
            // show grid menu: toggle pre-header row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideTogglePreHeaderCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconTogglePreHeaderCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_PRE_HEADER_ROW') : Constants.TEXT_TOGGLE_PRE_HEADER_ROW,
                    disabled: false,
                    command: 'toggle-preheader',
                    positionOrder: 52
                });
            }
        }
        if (this.sharedService.gridOptions.enableSorting) {
            // show grid menu: clear all sorting
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllSortingCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
                    disabled: false,
                    command: 'clear-sorting',
                    positionOrder: 51
                });
            }
        }
        // show grid menu: export to file
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportCsvCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
                disabled: false,
                command: 'export-csv',
                positionOrder: 53
            });
        }
        // show grid menu: export to text file as tab delimited
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
                disabled: false,
                command: 'export-text-delimited',
                positionOrder: 54
            });
        }
        // add the custom "Commands" title if there are any commands
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || (this.sharedService.gridOptions.gridMenu.customItems && this.sharedService.gridOptions.gridMenu.customItems.length > 0))) {
            this.sharedService.gridOptions.gridMenu.customTitle = this.sharedService.gridOptions.gridMenu.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
        }
        return gridMenuCustomItems;
    };
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    GridMenuExtension.prototype.executeHeaderMenuInternalCommands = /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    // get previously sorted columns
                    /** @type {?} */
                    var cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
                    // add to the column array, the column sorted by the header menu
                    cols.push({ sortCol: args.column, sortAsc: (args.command === 'sort-asc') });
                    if (this.sharedService.gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(e, { multiColumnSort: true, sortCols: cols, grid: this.sharedService.grid });
                    }
                    else {
                        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, cols);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    /** @type {?} */
                    var newSortColumns = cols.map(function (col) {
                        return {
                            columnId: col && col.sortCol && col.sortCol.id,
                            sortAsc: col && col.sortAsc
                        };
                    });
                    this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
                    break;
                default:
                    break;
            }
        }
    };
    /** Hide a column from the grid */
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    GridMenuExtension.prototype.hideColumn = /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    };
    /** Translate the Grid Menu titles and column picker */
    /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    GridMenuExtension.prototype.translateGridMenu = /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    function () {
        // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
        // we also need to call the control init so that it takes the new Grid object with latest values
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = tslib_1.__spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this.sharedService.gridOptions.gridMenu.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Grid Menu, that will recreate all the menus & list
            // doing an "init()" won't drop any existing command attached
            if (this._extension.init) {
                this._extension.init(this.sharedService.grid);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    GridMenuExtension.prototype.emptyGridMenuTitles = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customTitle = '';
            this.sharedService.gridOptions.gridMenu.columnTitle = '';
            this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
        }
    };
    /**
    * @return default Grid Menu options
    */
    /**
     * @private
     * @return {?} default Grid Menu options
     */
    GridMenuExtension.prototype.getDefaultGridMenuOptions = /**
     * @private
     * @return {?} default Grid Menu options
     */
    function () {
        return {
            customTitle: undefined,
            columnTitle: this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu'),
            forceFitTitle: this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
            syncResizeTitle: this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
            iconCssClass: 'fa fa-bars',
            menuWidth: 18,
            customItems: [],
            hideClearAllFiltersCommand: false,
            hideRefreshDatasetCommand: false,
            hideToggleFilterCommand: false,
        };
    };
    GridMenuExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GridMenuExtension.ctorParameters = function () { return [
        { type: ExportService },
        { type: ExtensionUtility },
        { type: FilterService },
        { type: SharedService },
        { type: SortService },
        { type: TranslateService }
    ]; };
    return GridMenuExtension;
}());
export { GridMenuExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._areVisibleColumnDifferent;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype._userOriginalGridMenu;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.exportService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    GridMenuExtension.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnVFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZ3JpZE1lbnVFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUlMLGFBQWEsRUFFYixhQUFhLEVBQ2IsUUFBUSxHQU1ULE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNM0Q7SUFPRSwyQkFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsU0FBMkI7UUFMM0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVg3QiwrQkFBMEIsR0FB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dEIsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDO1lBQ3hGLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQztZQUM1RixlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLGlCQUFpQixFQUFFLFVBQVUsQ0FBQztZQUNoRyxZQUFZLEVBQUUsWUFBWTtZQUMxQixTQUFTLEVBQUUsRUFBRTtZQUNiLFdBQVcsRUFBRSxFQUFFO1lBQ2YsMEJBQTBCLEVBQUUsS0FBSztZQUNqQyx5QkFBeUIsRUFBRSxLQUFLO1lBQ2hDLHVCQUF1QixFQUFFLEtBQUs7U0FDL0IsQ0FBQztJQUNKLENBQUM7O2dCQTdZRixVQUFVOzs7O2dCQVhGLGFBQWE7Z0JBQ2IsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUdiLGFBQWE7Z0JBRmIsV0FBVztnQkFuQlgsZ0JBQWdCOztJQXlhekIsd0JBQUM7Q0FBQSxBQTlZRCxJQThZQztTQTdZWSxpQkFBaUI7Ozs7OztJQUM1Qix1REFBMkM7Ozs7O0lBQzNDLDBDQUFzRDs7Ozs7SUFDdEQsdUNBQXdCOzs7OztJQUN4QixrREFBd0M7Ozs7O0lBR3RDLDBDQUFvQzs7Ozs7SUFDcEMsNkNBQTBDOzs7OztJQUMxQywwQ0FBb0M7Ozs7O0lBQ3BDLDBDQUFvQzs7Ozs7SUFDcEMsd0NBQWdDOzs7OztJQUNoQyxzQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBDZWxsQXJncyxcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uU29ydCxcclxuICBEZWxpbWl0ZXJUeXBlLFxyXG4gIEV4dGVuc2lvbixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEZpbGVUeXBlLFxyXG4gIEdyYXBocWxSZXN1bHQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBHcmlkTWVudSxcclxuICBHcmlkTWVudUl0ZW0sXHJcbiAgSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MsXHJcbn0gZnJvbSAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgRXhwb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyaWRNZW51RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfdXNlck9yaWdpbmFsR3JpZE1lbnU6IEdyaWRNZW51O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgdGhlIEhlYWRlciBNZW51IGFuZCBleHBvc2UgYWxsIHRoZSBhdmFpbGFibGUgaG9va3MgdGhhdCB1c2VyIGNhbiBzdWJzY3JpYmUgKG9uQ29tbWFuZCwgb25CZWZvcmVNZW51U2hvdywgLi4uKSAqL1xyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICAvLyBrZWVwIG9yaWdpbmFsIHVzZXIgZ3JpZCBtZW51LCB1c2VmdWwgd2hlbiBzd2l0Y2hpbmcgbG9jYWxlIHRvIHRyYW5zbGF0ZVxyXG4gICAgdGhpcy5fdXNlck9yaWdpbmFsR3JpZE1lbnUgPSB7IC4uLnRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSB9O1xyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51KSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnUpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdEdyaWRNZW51T3B0aW9ucygpLCAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgfTtcclxuXHJcbiAgICAgIC8vIG1lcmdlIG9yaWdpbmFsIHVzZXIgZ3JpZCBtZW51IGl0ZW1zIHdpdGggaW50ZXJuYWwgaXRlbXNcclxuICAgICAgLy8gdGhlbiBzb3J0IGFsbCBHcmlkIE1lbnUgQ3VzdG9tIEl0ZW1zIChzb3J0ZWQgYnkgcG9pbnRlciwgbm8gbmVlZCB0byB1c2UgdGhlIHJldHVybilcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zID0gWy4uLnRoaXMuX3VzZXJPcmlnaW5hbEdyaWRNZW51LmN1c3RvbUl0ZW1zIHx8IFtdLCAuLi50aGlzLmFkZEdyaWRNZW51Q3VzdG9tQ29tbWFuZHMoKV07XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkuc29ydEl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcywgJ3Bvc2l0aW9uT3JkZXInKTtcclxuXHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5Db250cm9scy5HcmlkTWVudSh0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpO1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25CZWZvcmVNZW51U2hvdywgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkJlZm9yZU1lbnVTaG93ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkJlZm9yZU1lbnVTaG93KGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQ29sdW1uc0NoYW5nZWQsIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkNvbHVtbnNDaGFuZ2VkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkNvbHVtbnNDaGFuZ2VkKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQ29tbWFuZCwgKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmV4ZWN1dGVHcmlkTWVudUludGVybmFsQ3VzdG9tQ29tbWFuZHMoZSwgYXJncyk7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db21tYW5kID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkNvbW1hbmQoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9leHRlbnNpb24ub25NZW51Q2xvc2UsIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25NZW51Q2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uTWVudUNsb3NlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHdlIGFsc28gd2FudCB0byByZXNpemUgdGhlIGNvbHVtbnMgaWYgdGhlIHVzZXIgZGVjaWRlZCB0byBoaWRlIGNlcnRhaW4gY29sdW1uKHMpXHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgZ3JpZCBzdGlsbCBleGlzdCAoYnkgbG9va2luZyBpZiB0aGUgR3JpZCBVSUQgaXMgZm91bmQgaW4gdGhlIERPTSB0cmVlKVxyXG4gICAgICAgICAgICBjb25zdCBncmlkVWlkID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0VUlEKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ICYmIGdyaWRVaWQgJiYgJChgLiR7Z3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5fYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBFeGVjdXRlIHRoZSBHcmlkIE1lbnUgQ3VzdG9tIGNvbW1hbmQgY2FsbGJhY2sgdGhhdCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBvbkNvbW1hbmQgc3Vic2NyaWJlXHJcbiAgKiBUaGVzZSBhcmUgdGhlIGRlZmF1bHQgaW50ZXJuYWwgY3VzdG9tIGNvbW1hbmRzXHJcbiAgKiBAcGFyYW0gZXZlbnRcclxuICAqIEBwYXJhbSBHcmlkTWVudUl0ZW0gYXJnc1xyXG4gICovXHJcbiAgZXhlY3V0ZUdyaWRNZW51SW50ZXJuYWxDdXN0b21Db21tYW5kcyhlOiBFdmVudCwgYXJnczogR3JpZE1lbnVJdGVtKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgc3dpdGNoIChhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgICBjYXNlICdjbGVhci1maWx0ZXInOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycygpO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2NsZWFyLXNvcnRpbmcnOlxyXG4gICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcoKTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdleHBvcnQtY3N2JzpcclxuICAgICAgICAgIHRoaXMuZXhwb3J0U2VydmljZS5leHBvcnRUb0ZpbGUoe1xyXG4gICAgICAgICAgICBkZWxpbWl0ZXI6IERlbGltaXRlclR5cGUuY29tbWEsXHJcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnZXhwb3J0JyxcclxuICAgICAgICAgICAgZm9ybWF0OiBGaWxlVHlwZS5jc3YsXHJcbiAgICAgICAgICAgIHVzZVV0ZjhXaXRoQm9tOiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2V4cG9ydC10ZXh0LWRlbGltaXRlZCc6XHJcbiAgICAgICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuZXhwb3J0VG9GaWxlKHtcclxuICAgICAgICAgICAgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLnRhYixcclxuICAgICAgICAgICAgZmlsZW5hbWU6ICdleHBvcnQnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IEZpbGVUeXBlLnR4dCxcclxuICAgICAgICAgICAgdXNlVXRmOFdpdGhCb206IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlLWZpbHRlcic6XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRIZWFkZXJSb3dWaXNpYmlsaXR5KCF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRPcHRpb25zKCkuc2hvd0hlYWRlclJvdyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2dnbGUtdG9wcGFuZWwnOlxyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0VG9wUGFuZWxWaXNpYmlsaXR5KCF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRPcHRpb25zKCkuc2hvd1RvcFBhbmVsKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvZ2dsZS1wcmVoZWFkZXInOlxyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0UHJlSGVhZGVyUGFuZWxWaXNpYmlsaXR5KCF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRPcHRpb25zKCkuc2hvd1ByZUhlYWRlclBhbmVsKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3JlZnJlc2gtZGF0YXNldCc6XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hCYWNrZW5kRGF0YXNldCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmVmcmVzaCB0aGUgZGF0YXNldCB0aHJvdWdoIHRoZSBCYWNrZW5kIFNlcnZpY2UgKi9cclxuICByZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnM/OiBHcmlkT3B0aW9uKSB7XHJcbiAgICBsZXQgcXVlcnkgPSAnJztcclxuXHJcbiAgICAvLyB1c2VyIGNhbiBwYXNzIG5ldyBzZXQgb2YgZ3JpZCBvcHRpb25zIHdoaWNoIHdpbGwgb3ZlcnJpZGUgY3VycmVudCBvbmVzXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zID0geyAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMsIC4uLmdyaWRPcHRpb25zIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmFja2VuZEFwaS5zZXJ2aWNlKSB7XHJcbiAgICAgIHF1ZXJ5ID0gYmFja2VuZEFwaS5zZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnkgJiYgcXVlcnkgIT09ICcnKSB7XHJcbiAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRoZSBwcm9jZXNzIGNvdWxkIGJlIGFuIE9ic2VydmFibGUgKGxpa2UgSHR0cENsaWVudCkgb3IgYSBQcm9taXNlXHJcbiAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXHJcbiAgICAgIGNvbnN0IG9ic2VydmFibGVPclByb21pc2UgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG5cclxuICAgICAgY2FzdFRvUHJvbWlzZShvYnNlcnZhYmxlT3JQcm9taXNlKS50aGVuKChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIGZyb20gdGhlIHJlc3VsdCwgY2FsbCBvdXIgaW50ZXJuYWwgcG9zdCBwcm9jZXNzIHRvIHVwZGF0ZSB0aGUgRGF0YXNldCBhbmQgUGFnaW5hdGlvbiBpbmZvXHJcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcclxuICAgICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5wb3N0UHJvY2Vzcykge1xyXG4gICAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdC5zdGF0aXN0aWNzID0ge1xyXG4gICAgICAgICAgICAgIHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgICBlbmRUaW1lLFxyXG4gICAgICAgICAgICAgIGV4ZWN1dGlvblRpbWU6IGVuZFRpbWUudmFsdWVPZigpIC0gc3RhcnRUaW1lLnZhbHVlT2YoKSxcclxuICAgICAgICAgICAgICB0b3RhbEl0ZW1Db3VudDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgR3JpZCBNZW51IHdpdGggQ3VzdG9tIENvbW1hbmRzIGlmIHVzZXIgaGFzIGVuYWJsZWQgRmlsdGVycyBhbmQvb3IgdXNlcyBhIEJhY2tlbmQgU2VydmljZSAoT0RhdGEsIEdyYXBoUUwpICovXHJcbiAgcHJpdmF0ZSBhZGRHcmlkTWVudUN1c3RvbUNvbW1hbmRzKCkge1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSB8fCBudWxsO1xyXG4gICAgY29uc3QgZ3JpZE1lbnVDdXN0b21JdGVtczogR3JpZE1lbnVJdGVtW10gPSBbXTtcclxuXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVGaWx0ZXJpbmcpIHtcclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IGNsZWFyIGFsbCBmaWx0ZXJzXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUNsZWFyQWxsRmlsdGVyc0NvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25DbGVhckFsbEZpbHRlcnNDb21tYW5kIHx8ICdmYSBmYS1maWx0ZXIgdGV4dC1kYW5nZXInLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NMRUFSX0FMTF9GSUxURVJTJykgOiBDb25zdGFudHMuVEVYVF9DTEVBUl9BTExfRklMVEVSUyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAnY2xlYXItZmlsdGVyJyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTBcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzaG93IGdyaWQgbWVudTogdG9nZ2xlIGZpbHRlciByb3dcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlVG9nZ2xlRmlsdGVyQ29tbWFuZCkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblRvZ2dsZUZpbHRlckNvbW1hbmQgfHwgJ2ZhIGZhLXJhbmRvbScsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnVE9HR0xFX0ZJTFRFUl9ST1cnKSA6IENvbnN0YW50cy5URVhUX1RPR0dMRV9GSUxURVJfUk9XLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICd0b2dnbGUtZmlsdGVyJyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTJcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzaG93IGdyaWQgbWVudTogcmVmcmVzaCBkYXRhc2V0XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZVJlZnJlc2hEYXRhc2V0Q29tbWFuZCAmJiBiYWNrZW5kQXBpKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uUmVmcmVzaERhdGFzZXRDb21tYW5kIHx8ICdmYSBmYS1yZWZyZXNoJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdSRUZSRVNIX0RBVEFTRVQnKSA6IENvbnN0YW50cy5URVhUX1JFRlJFU0hfREFUQVNFVCxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAncmVmcmVzaC1kYXRhc2V0JyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTRcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5zaG93UHJlSGVhZGVyUGFuZWwpIHtcclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHRvZ2dsZSBwcmUtaGVhZGVyIHJvd1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVUb2dnbGVQcmVIZWFkZXJDb21tYW5kKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZCB8fCAnZmEgZmEtcmFuZG9tJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdUT0dHTEVfUFJFX0hFQURFUl9ST1cnKSA6IENvbnN0YW50cy5URVhUX1RPR0dMRV9QUkVfSEVBREVSX1JPVyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAndG9nZ2xlLXByZWhlYWRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlU29ydGluZykge1xyXG4gICAgICAvLyBzaG93IGdyaWQgbWVudTogY2xlYXIgYWxsIHNvcnRpbmdcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlQ2xlYXJBbGxTb3J0aW5nQ29tbWFuZCkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvbkNsZWFyQWxsU29ydGluZ0NvbW1hbmQgfHwgJ2ZhIGZhLXVuc29ydGVkIHRleHQtZGFuZ2VyJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDTEVBUl9BTExfU09SVElORycpIDogQ29uc3RhbnRzLlRFWFRfQ0xFQVJfQUxMX1NPUlRJTkcsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ2NsZWFyLXNvcnRpbmcnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93IGdyaWQgbWVudTogZXhwb3J0IHRvIGZpbGVcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUV4cG9ydCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlRXhwb3J0Q3N2Q29tbWFuZCkge1xyXG4gICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvbkV4cG9ydENzdkNvbW1hbmQgfHwgJ2ZhIGZhLWRvd25sb2FkJyxcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRVhQT1JUX1RPX0NTVicpIDogQ29uc3RhbnRzLlRFWFRfRVhQT1JUX0lOX0NTVl9GT1JNQVQsXHJcbiAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICBjb21tYW5kOiAnZXhwb3J0LWNzdicsXHJcbiAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1M1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIC8vIHNob3cgZ3JpZCBtZW51OiBleHBvcnQgdG8gdGV4dCBmaWxlIGFzIHRhYiBkZWxpbWl0ZWRcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUV4cG9ydCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQpIHtcclxuICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25FeHBvcnRUZXh0RGVsaW1pdGVkQ29tbWFuZCB8fCAnZmEgZmEtZG93bmxvYWQnLFxyXG4gICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFWFBPUlRfVE9fVEFCX0RFTElNSVRFRCcpIDogQ29uc3RhbnRzLlRFWFRfRVhQT1JUX0lOX1RFWFRfRk9STUFULFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgY29tbWFuZDogJ2V4cG9ydC10ZXh0LWRlbGltaXRlZCcsXHJcbiAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1NFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGQgdGhlIGN1c3RvbSBcIkNvbW1hbmRzXCIgdGl0bGUgaWYgdGhlcmUgYXJlIGFueSBjb21tYW5kc1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgKGdyaWRNZW51Q3VzdG9tSXRlbXMubGVuZ3RoID4gMCB8fCAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcy5sZW5ndGggPiAwKSkpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbVRpdGxlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbVRpdGxlIHx8IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY3VzdG9tVGl0bGUnLCAnZ3JpZE1lbnUnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ3JpZE1lbnVDdXN0b21JdGVtcztcclxuICB9XHJcblxyXG4gIC8qKiBFeGVjdXRlIHRoZSBIZWFkZXIgTWVudSBDb21tYW5kcyB0aGF0IHdhcyB0cmlnZ2VyZWQgYnkgdGhlIG9uQ29tbWFuZCBzdWJzY3JpYmUgKi9cclxuICBleGVjdXRlSGVhZGVyTWVudUludGVybmFsQ29tbWFuZHMoZTogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgc3dpdGNoIChhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgICBjYXNlICdoaWRlJzpcclxuICAgICAgICAgIHRoaXMuaGlkZUNvbHVtbihhcmdzLmNvbHVtbik7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdzb3J0LWFzYyc6XHJcbiAgICAgICAgY2FzZSAnc29ydC1kZXNjJzpcclxuICAgICAgICAgIC8vIGdldCBwcmV2aW91c2x5IHNvcnRlZCBjb2x1bW5zXHJcbiAgICAgICAgICBjb25zdCBjb2xzOiBDb2x1bW5Tb3J0W10gPSB0aGlzLnNvcnRTZXJ2aWNlLmdldFByZXZpb3VzQ29sdW1uU29ydHMoYXJncy5jb2x1bW4uaWQgKyAnJyk7XHJcblxyXG4gICAgICAgICAgLy8gYWRkIHRvIHRoZSBjb2x1bW4gYXJyYXksIHRoZSBjb2x1bW4gc29ydGVkIGJ5IHRoZSBoZWFkZXIgbWVudVxyXG4gICAgICAgICAgY29scy5wdXNoKHsgc29ydENvbDogYXJncy5jb2x1bW4sIHNvcnRBc2M6IChhcmdzLmNvbW1hbmQgPT09ICdzb3J0LWFzYycpIH0pO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uQmFja2VuZFNvcnRDaGFuZ2VkKGUsIHsgbXVsdGlDb2x1bW5Tb3J0OiB0cnVlLCBzb3J0Q29sczogY29scywgZ3JpZDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCwgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LCBjb2xzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT2JqIHNvcnRDb2x1bW5zIGFycmF5IHdoaWNoIHdpbGwgYXQgdGhlIHNhbWUgYWRkIHRoZSB2aXN1YWwgc29ydCBpY29uKHMpIG9uIHRoZSBVSVxyXG4gICAgICAgICAgY29uc3QgbmV3U29ydENvbHVtbnM6IENvbHVtblNvcnRbXSA9IGNvbHMubWFwKChjb2wpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBjb2x1bW5JZDogY29sICYmIGNvbC5zb3J0Q29sICYmIGNvbC5zb3J0Q29sLmlkLFxyXG4gICAgICAgICAgICAgIHNvcnRBc2M6IGNvbCAmJiBjb2wuc29ydEFzY1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTb3J0Q29sdW1ucyhuZXdTb3J0Q29sdW1ucyk7IC8vIGFkZCBzb3J0IGljb24gaW4gVUlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEhpZGUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCAqL1xyXG4gIGhpZGVDb2x1bW4oY29sdW1uOiBDb2x1bW4pIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcclxuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW4uaWQpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuYXJyYXlSZW1vdmVJdGVtQnlJbmRleCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zKCksIGNvbHVtbkluZGV4KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgR3JpZCBNZW51IHRpdGxlcyBhbmQgY29sdW1uIHBpY2tlciAqL1xyXG4gIHRyYW5zbGF0ZUdyaWRNZW51KCkge1xyXG4gICAgLy8gdXBkYXRlIHRoZSBwcm9wZXJ0aWVzIGJ5IHBvaW50ZXJzLCB0aGF0IGlzIHRoZSBvbmx5IHdheSB0byBnZXQgR3JpZCBNZW51IENvbnRyb2wgdG8gc2VlIHRoZSBuZXcgdmFsdWVzXHJcbiAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gY2FsbCB0aGUgY29udHJvbCBpbml0IHNvIHRoYXQgaXQgdGFrZXMgdGhlIG5ldyBHcmlkIG9iamVjdCB3aXRoIGxhdGVzdCB2YWx1ZXNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51KSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmVtcHR5R3JpZE1lbnVUaXRsZXMoKTtcclxuXHJcbiAgICAgIC8vIG1lcmdlIG9yaWdpbmFsIHVzZXIgZ3JpZCBtZW51IGl0ZW1zIHdpdGggaW50ZXJuYWwgaXRlbXNcclxuICAgICAgLy8gdGhlbiBzb3J0IGFsbCBHcmlkIE1lbnUgQ3VzdG9tIEl0ZW1zIChzb3J0ZWQgYnkgcG9pbnRlciwgbm8gbmVlZCB0byB1c2UgdGhlIHJldHVybilcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zID0gWy4uLnRoaXMuX3VzZXJPcmlnaW5hbEdyaWRNZW51LmN1c3RvbUl0ZW1zIHx8IFtdLCAuLi50aGlzLmFkZEdyaWRNZW51Q3VzdG9tQ29tbWFuZHMoKV07XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkuc29ydEl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcywgJ3Bvc2l0aW9uT3JkZXInKTtcclxuXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jb2x1bW5UaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnZ3JpZE1lbnUnKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmZvcmNlRml0VGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2ZvcmNlRml0VGl0bGUnLCAnZ3JpZE1lbnUnKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LnN5bmNSZXNpemVUaXRsZSA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnc3luY1Jlc2l6ZVRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcblxyXG4gICAgICAvLyB0cmFuc2xhdGUgYWxsIGNvbHVtbnMgKGluY2x1ZGluZyBub24tdmlzaWJsZSlcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuXHJcbiAgICAgIC8vIHJlLWluaXRpYWxpemUgdGhlIEdyaWQgTWVudSwgdGhhdCB3aWxsIHJlY3JlYXRlIGFsbCB0aGUgbWVudXMgJiBsaXN0XHJcbiAgICAgIC8vIGRvaW5nIGFuIFwiaW5pdCgpXCIgd29uJ3QgZHJvcCBhbnkgZXhpc3RpbmcgY29tbWFuZCBhdHRhY2hlZFxyXG4gICAgICBpZiAodGhpcy5fZXh0ZW5zaW9uLmluaXQpIHtcclxuICAgICAgICB0aGlzLl9leHRlbnNpb24uaW5pdCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1wdHlHcmlkTWVudVRpdGxlcygpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tVGl0bGUgPSAnJztcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmNvbHVtblRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5mb3JjZUZpdFRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5zeW5jUmVzaXplVGl0bGUgPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogQHJldHVybiBkZWZhdWx0IEdyaWQgTWVudSBvcHRpb25zXHJcbiAgKi9cclxuICBwcml2YXRlIGdldERlZmF1bHRHcmlkTWVudU9wdGlvbnMoKTogR3JpZE1lbnUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY3VzdG9tVGl0bGU6IHVuZGVmaW5lZCxcclxuICAgICAgY29sdW1uVGl0bGU6IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnZ3JpZE1lbnUnKSxcclxuICAgICAgZm9yY2VGaXRUaXRsZTogdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2dyaWRNZW51JyksXHJcbiAgICAgIHN5bmNSZXNpemVUaXRsZTogdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdzeW5jUmVzaXplVGl0bGUnLCAnZ3JpZE1lbnUnKSxcclxuICAgICAgaWNvbkNzc0NsYXNzOiAnZmEgZmEtYmFycycsXHJcbiAgICAgIG1lbnVXaWR0aDogMTgsXHJcbiAgICAgIGN1c3RvbUl0ZW1zOiBbXSxcclxuICAgICAgaGlkZUNsZWFyQWxsRmlsdGVyc0NvbW1hbmQ6IGZhbHNlLFxyXG4gICAgICBoaWRlUmVmcmVzaERhdGFzZXRDb21tYW5kOiBmYWxzZSxcclxuICAgICAgaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19