/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class GridMenuExtension {
    /**
     * @param {?} exportService
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     */
    constructor(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
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
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
     * @return {?}
     */
    register() {
        // keep original user grid menu, useful when switching locale to translate
        this._userOriginalGridMenu = Object.assign({}, this.sharedService.gridOptions.gridMenu);
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
            this.sharedService.gridOptions.gridMenu = Object.assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = [...this._userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this._extension = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                this._eventHandler.subscribe(this._extension.onBeforeMenuShow, (e, args) => {
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onColumnsChanged, (e, args) => {
                    this._areVisibleColumnDifferent = true;
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                        this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onCommand, (e, args) => {
                    this.executeGridMenuInternalCustomCommands(e, args);
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                        this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                    }
                });
                this._eventHandler.subscribe(this._extension.onMenuClose, (e, args) => {
                    if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                        this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    // we also want to resize the columns if the user decided to hide certain column(s)
                    if (this.sharedService.grid && typeof this.sharedService.grid.autosizeColumns === 'function') {
                        // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                        /** @type {?} */
                        const gridUid = this.sharedService.grid.getUID();
                        if (this._areVisibleColumnDifferent && gridUid && $(`.${gridUid}`).length > 0) {
                            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                                this.sharedService.grid.autosizeColumns();
                            }
                            this._areVisibleColumnDifferent = false;
                        }
                    }
                });
            }
            return this._extension;
        }
        return null;
    }
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeGridMenuInternalCustomCommands(e, args) {
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
    }
    /**
     * Refresh the dataset through the Backend Service
     * @param {?=} gridOptions
     * @return {?}
     */
    refreshBackendDataset(gridOptions) {
        /** @type {?} */
        let query = '';
        // user can pass new set of grid options which will override current ones
        if (gridOptions) {
            this.sharedService.gridOptions = Object.assign({}, this.sharedService.gridOptions, gridOptions);
        }
        /** @type {?} */
        const backendApi = this.sharedService.gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            // keep start time & end timestamps & return it after process execution
            /** @type {?} */
            const startTime = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            /** @type {?} */
            const observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then((processResult) => {
                /** @type {?} */
                const endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi && backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime,
                            endTime,
                            executionTime: endTime.valueOf() - startTime.valueOf(),
                            totalItemCount: this.sharedService.gridOptions && this.sharedService.gridOptions.pagination && this.sharedService.gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            });
        }
    }
    /**
     * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
     * @private
     * @return {?}
     */
    addGridMenuCustomCommands() {
        /** @type {?} */
        const backendApi = this.sharedService.gridOptions.backendServiceApi || null;
        /** @type {?} */
        const gridMenuCustomItems = [];
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
    }
    /**
     * Execute the Header Menu Commands that was triggered by the onCommand subscribe
     * @param {?} e
     * @param {?} args
     * @return {?}
     */
    executeHeaderMenuInternalCommands(e, args) {
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
                    const cols = this.sortService.getPreviousColumnSorts(args.column.id + '');
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
                    const newSortColumns = cols.map((col) => {
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
    }
    /**
     * Hide a column from the grid
     * @param {?} column
     * @return {?}
     */
    hideColumn(column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            /** @type {?} */
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /**
     * Translate the Grid Menu titles and column picker
     * @return {?}
     */
    translateGridMenu() {
        // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
        // we also need to call the control init so that it takes the new Grid object with latest values
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = [...this._userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
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
    }
    /**
     * @private
     * @return {?}
     */
    emptyGridMenuTitles() {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customTitle = '';
            this.sharedService.gridOptions.gridMenu.columnTitle = '';
            this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
        }
    }
    /**
     * @private
     * @return {?} default Grid Menu options
     */
    getDefaultGridMenuOptions() {
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
    }
}
GridMenuExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GridMenuExtension.ctorParameters = () => [
    { type: ExportService },
    { type: ExtensionUtility },
    { type: FilterService },
    { type: SharedService },
    { type: SortService },
    { type: TranslateService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnVFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZ3JpZE1lbnVFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBSUwsYUFBYSxFQUViLGFBQWEsRUFDYixRQUFRLEdBTVQsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU8zRCxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7Ozs7SUFNNUIsWUFDVSxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsV0FBd0IsRUFDeEIsU0FBMkI7UUFMM0Isa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FB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QWUsRUFBRSxVQUFVLENBQUM7WUFDNUYsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUM7WUFDaEcsWUFBWSxFQUFFLFlBQVk7WUFDMUIsU0FBUyxFQUFFLEVBQUU7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLDBCQUEwQixFQUFFLEtBQUs7WUFDakMseUJBQXlCLEVBQUUsS0FBSztZQUNoQyx1QkFBdUIsRUFBRSxLQUFLO1NBQy9CLENBQUM7SUFDSixDQUFDOzs7WUE3WUYsVUFBVTs7OztZQVhGLGFBQWE7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtZQUdiLGFBQWE7WUFGYixXQUFXO1lBbkJYLGdCQUFnQjs7Ozs7OztJQTZCdkIsdURBQTJDOzs7OztJQUMzQywwQ0FBc0Q7Ozs7O0lBQ3RELHVDQUF3Qjs7Ozs7SUFDeEIsa0RBQXdDOzs7OztJQUd0QywwQ0FBb0M7Ozs7O0lBQ3BDLDZDQUEwQzs7Ozs7SUFDMUMsMENBQW9DOzs7OztJQUNwQywwQ0FBb0M7Ozs7O0lBQ3BDLHdDQUFnQzs7Ozs7SUFDaEMsc0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgQ2VsbEFyZ3MsXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtblNvcnQsXHJcbiAgRGVsaW1pdGVyVHlwZSxcclxuICBFeHRlbnNpb24sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBGaWxlVHlwZSxcclxuICBHcmFwaHFsUmVzdWx0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZE1lbnUsXHJcbiAgR3JpZE1lbnVJdGVtLFxyXG4gIEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzLFxyXG59IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcmlkTWVudUV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbjogYW55O1xyXG4gIHByaXZhdGUgX3VzZXJPcmlnaW5hbEdyaWRNZW51OiBHcmlkTWVudTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4cG9ydFNlcnZpY2U6IEV4cG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIHRoZSBIZWFkZXIgTWVudSBhbmQgZXhwb3NlIGFsbCB0aGUgYXZhaWxhYmxlIGhvb2tzIHRoYXQgdXNlciBjYW4gc3Vic2NyaWJlIChvbkNvbW1hbmQsIG9uQmVmb3JlTWVudVNob3csIC4uLikgKi9cclxuICByZWdpc3RlcigpOiBhbnkge1xyXG4gICAgLy8ga2VlcCBvcmlnaW5hbCB1c2VyIGdyaWQgbWVudSwgdXNlZnVsIHdoZW4gc3dpdGNoaW5nIGxvY2FsZSB0byB0cmFuc2xhdGVcclxuICAgIHRoaXMuX3VzZXJPcmlnaW5hbEdyaWRNZW51ID0geyAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgfTtcclxuXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gd2l0aCByZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmdyaWRNZW51KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ID0geyAuLi50aGlzLmdldERlZmF1bHRHcmlkTWVudU9wdGlvbnMoKSwgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51IH07XHJcblxyXG4gICAgICAvLyBtZXJnZSBvcmlnaW5hbCB1c2VyIGdyaWQgbWVudSBpdGVtcyB3aXRoIGludGVybmFsIGl0ZW1zXHJcbiAgICAgIC8vIHRoZW4gc29ydCBhbGwgR3JpZCBNZW51IEN1c3RvbSBJdGVtcyAoc29ydGVkIGJ5IHBvaW50ZXIsIG5vIG5lZWQgdG8gdXNlIHRoZSByZXR1cm4pXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyA9IFsuLi50aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudS5jdXN0b21JdGVtcyB8fCBbXSwgLi4udGhpcy5hZGRHcmlkTWVudUN1c3RvbUNvbW1hbmRzKCldO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnNvcnRJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICdwb3NpdGlvbk9yZGVyJyk7XHJcblxyXG4gICAgICB0aGlzLl9leHRlbnNpb24gPSBuZXcgU2xpY2suQ29udHJvbHMuR3JpZE1lbnUodGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCwgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKTtcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uQmVmb3JlTWVudVNob3csIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25CZWZvcmVNZW51U2hvdyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25CZWZvcmVNZW51U2hvdyhlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkNvbHVtbnNDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCA9IHRydWU7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db2x1bW5zQ2hhbmdlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db2x1bW5zQ2hhbmdlZChlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2V4dGVuc2lvbi5vbkNvbW1hbmQsIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5leGVjdXRlR3JpZE1lbnVJbnRlcm5hbEN1c3RvbUNvbW1hbmRzKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29tbWFuZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db21tYW5kKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fZXh0ZW5zaW9uLm9uTWVudUNsb3NlLCAoZTogYW55LCBhcmdzOiBDZWxsQXJncykgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uTWVudUNsb3NlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbk1lbnVDbG9zZShlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB3ZSBhbHNvIHdhbnQgdG8gcmVzaXplIHRoZSBjb2x1bW5zIGlmIHRoZSB1c2VyIGRlY2lkZWQgdG8gaGlkZSBjZXJ0YWluIGNvbHVtbihzKVxyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGdyaWQgc3RpbGwgZXhpc3QgKGJ5IGxvb2tpbmcgaWYgdGhlIEdyaWQgVUlEIGlzIGZvdW5kIGluIHRoZSBET00gdHJlZSlcclxuICAgICAgICAgICAgY29uc3QgZ3JpZFVpZCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFVJRCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCAmJiBncmlkVWlkICYmICQoYC4ke2dyaWRVaWR9YCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuX2FyZVZpc2libGVDb2x1bW5EaWZmZXJlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogRXhlY3V0ZSB0aGUgR3JpZCBNZW51IEN1c3RvbSBjb21tYW5kIGNhbGxiYWNrIHRoYXQgd2FzIHRyaWdnZXJlZCBieSB0aGUgb25Db21tYW5kIHN1YnNjcmliZVxyXG4gICogVGhlc2UgYXJlIHRoZSBkZWZhdWx0IGludGVybmFsIGN1c3RvbSBjb21tYW5kc1xyXG4gICogQHBhcmFtIGV2ZW50XHJcbiAgKiBAcGFyYW0gR3JpZE1lbnVJdGVtIGFyZ3NcclxuICAqL1xyXG4gIGV4ZWN1dGVHcmlkTWVudUludGVybmFsQ3VzdG9tQ29tbWFuZHMoZTogRXZlbnQsIGFyZ3M6IEdyaWRNZW51SXRlbSkge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb21tYW5kKSB7XHJcbiAgICAgIHN3aXRjaCAoYXJncy5jb21tYW5kKSB7XHJcbiAgICAgICAgY2FzZSAnY2xlYXItZmlsdGVyJzpcclxuICAgICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlcnMoKTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhci1zb3J0aW5nJzpcclxuICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKCk7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcucmVmcmVzaCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZXhwb3J0LWNzdic6XHJcbiAgICAgICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuZXhwb3J0VG9GaWxlKHtcclxuICAgICAgICAgICAgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLmNvbW1hLFxyXG4gICAgICAgICAgICBmaWxlbmFtZTogJ2V4cG9ydCcsXHJcbiAgICAgICAgICAgIGZvcm1hdDogRmlsZVR5cGUuY3N2LFxyXG4gICAgICAgICAgICB1c2VVdGY4V2l0aEJvbTogdHJ1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdleHBvcnQtdGV4dC1kZWxpbWl0ZWQnOlxyXG4gICAgICAgICAgdGhpcy5leHBvcnRTZXJ2aWNlLmV4cG9ydFRvRmlsZSh7XHJcbiAgICAgICAgICAgIGRlbGltaXRlcjogRGVsaW1pdGVyVHlwZS50YWIsXHJcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnZXhwb3J0JyxcclxuICAgICAgICAgICAgZm9ybWF0OiBGaWxlVHlwZS50eHQsXHJcbiAgICAgICAgICAgIHVzZVV0ZjhXaXRoQm9tOiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvZ2dsZS1maWx0ZXInOlxyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0SGVhZGVyUm93VmlzaWJpbGl0eSghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dIZWFkZXJSb3cpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlLXRvcHBhbmVsJzpcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFRvcFBhbmVsVmlzaWJpbGl0eSghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dUb3BQYW5lbCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b2dnbGUtcHJlaGVhZGVyJzpcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFByZUhlYWRlclBhbmVsVmlzaWJpbGl0eSghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dQcmVIZWFkZXJQYW5lbCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZyZXNoLWRhdGFzZXQnOlxyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoQmFja2VuZERhdGFzZXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlZnJlc2ggdGhlIGRhdGFzZXQgdGhyb3VnaCB0aGUgQmFja2VuZCBTZXJ2aWNlICovXHJcbiAgcmVmcmVzaEJhY2tlbmREYXRhc2V0KGdyaWRPcHRpb25zPzogR3JpZE9wdGlvbikge1xyXG4gICAgbGV0IHF1ZXJ5ID0gJyc7XHJcblxyXG4gICAgLy8gdXNlciBjYW4gcGFzcyBuZXcgc2V0IG9mIGdyaWQgb3B0aW9ucyB3aGljaCB3aWxsIG92ZXJyaWRlIGN1cnJlbnQgb25lc1xyXG4gICAgaWYgKGdyaWRPcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyA9IHsgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLCAuLi5ncmlkT3B0aW9ucyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkuc2VydmljZSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJhY2tlbmRBcGkuc2VydmljZSkge1xyXG4gICAgICBxdWVyeSA9IGJhY2tlbmRBcGkuc2VydmljZS5idWlsZFF1ZXJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXJ5ICYmIHF1ZXJ5ICE9PSAnJykge1xyXG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aGUgcHJvY2VzcyBjb3VsZCBiZSBhbiBPYnNlcnZhYmxlIChsaWtlIEh0dHBDbGllbnQpIG9yIGEgUHJvbWlzZVxyXG4gICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxyXG4gICAgICBjb25zdCBvYnNlcnZhYmxlT3JQcm9taXNlID0gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KTtcclxuXHJcbiAgICAgIGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSkudGhlbigocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBmcm9tIHRoZSByZXN1bHQsIGNhbGwgb3VyIGludGVybmFsIHBvc3QgcHJvY2VzcyB0byB1cGRhdGUgdGhlIERhdGFzZXQgYW5kIFBhZ2luYXRpb24gaW5mb1xyXG4gICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gICAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MpIHtcclxuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0IGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NSZXN1bHQuc3RhdGlzdGljcyA9IHtcclxuICAgICAgICAgICAgICBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgZW5kVGltZSxcclxuICAgICAgICAgICAgICBleGVjdXRpb25UaW1lOiBlbmRUaW1lLnZhbHVlT2YoKSAtIHN0YXJ0VGltZS52YWx1ZU9mKCksXHJcbiAgICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIEdyaWQgTWVudSB3aXRoIEN1c3RvbSBDb21tYW5kcyBpZiB1c2VyIGhhcyBlbmFibGVkIEZpbHRlcnMgYW5kL29yIHVzZXMgYSBCYWNrZW5kIFNlcnZpY2UgKE9EYXRhLCBHcmFwaFFMKSAqL1xyXG4gIHByaXZhdGUgYWRkR3JpZE1lbnVDdXN0b21Db21tYW5kcygpIHtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgfHwgbnVsbDtcclxuICAgIGNvbnN0IGdyaWRNZW51Q3VzdG9tSXRlbXM6IEdyaWRNZW51SXRlbVtdID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiBjbGVhciBhbGwgZmlsdGVyc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZCB8fCAnZmEgZmEtZmlsdGVyIHRleHQtZGFuZ2VyJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDTEVBUl9BTExfRklMVEVSUycpIDogQ29uc3RhbnRzLlRFWFRfQ0xFQVJfQUxMX0ZJTFRFUlMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ2NsZWFyLWZpbHRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHRvZ2dsZSBmaWx0ZXIgcm93XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25Ub2dnbGVGaWx0ZXJDb21tYW5kIHx8ICdmYSBmYS1yYW5kb20nLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1RPR0dMRV9GSUxURVJfUk9XJykgOiBDb25zdGFudHMuVEVYVF9UT0dHTEVfRklMVEVSX1JPVyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAndG9nZ2xlLWZpbHRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHJlZnJlc2ggZGF0YXNldFxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVSZWZyZXNoRGF0YXNldENvbW1hbmQgJiYgYmFja2VuZEFwaSkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblJlZnJlc2hEYXRhc2V0Q29tbWFuZCB8fCAnZmEgZmEtcmVmcmVzaCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVGUkVTSF9EQVRBU0VUJykgOiBDb25zdGFudHMuVEVYVF9SRUZSRVNIX0RBVEFTRVQsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3JlZnJlc2gtZGF0YXNldCcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDU0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuc2hvd1ByZUhlYWRlclBhbmVsKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiB0b2dnbGUgcHJlLWhlYWRlciByb3dcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZCkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblRvZ2dsZVByZUhlYWRlckNvbW1hbmQgfHwgJ2ZhIGZhLXJhbmRvbScsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnVE9HR0xFX1BSRV9IRUFERVJfUk9XJykgOiBDb25zdGFudHMuVEVYVF9UT0dHTEVfUFJFX0hFQURFUl9ST1csXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3RvZ2dsZS1wcmVoZWFkZXInLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVNvcnRpbmcpIHtcclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IGNsZWFyIGFsbCBzb3J0aW5nXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUNsZWFyQWxsU29ydGluZ0NvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25DbGVhckFsbFNvcnRpbmdDb21tYW5kIHx8ICdmYSBmYS11bnNvcnRlZCB0ZXh0LWRhbmdlcicsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ0xFQVJfQUxMX1NPUlRJTkcnKSA6IENvbnN0YW50cy5URVhUX0NMRUFSX0FMTF9TT1JUSU5HLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdjbGVhci1zb3J0aW5nJyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTFcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvdyBncmlkIG1lbnU6IGV4cG9ydCB0byBmaWxlXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUV4cG9ydENzdkNvbW1hbmQpIHtcclxuICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25FeHBvcnRDc3ZDb21tYW5kIHx8ICdmYSBmYS1kb3dubG9hZCcsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VYUE9SVF9UT19DU1YnKSA6IENvbnN0YW50cy5URVhUX0VYUE9SVF9JTl9DU1ZfRk9STUFULFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgY29tbWFuZDogJ2V4cG9ydC1jc3YnLFxyXG4gICAgICAgICAgcG9zaXRpb25PcmRlcjogNTNcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93IGdyaWQgbWVudTogZXhwb3J0IHRvIHRleHQgZmlsZSBhcyB0YWIgZGVsaW1pdGVkXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kKSB7XHJcbiAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQgfHwgJ2ZhIGZhLWRvd25sb2FkJyxcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRVhQT1JUX1RPX1RBQl9ERUxJTUlURUQnKSA6IENvbnN0YW50cy5URVhUX0VYUE9SVF9JTl9URVhUX0ZPUk1BVCxcclxuICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgIGNvbW1hbmQ6ICdleHBvcnQtdGV4dC1kZWxpbWl0ZWQnLFxyXG4gICAgICAgICAgcG9zaXRpb25PcmRlcjogNTRcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIHRoZSBjdXN0b20gXCJDb21tYW5kc1wiIHRpdGxlIGlmIHRoZXJlIGFyZSBhbnkgY29tbWFuZHNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIChncmlkTWVudUN1c3RvbUl0ZW1zLmxlbmd0aCA+IDAgfHwgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMubGVuZ3RoID4gMCkpKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSB8fCB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2N1c3RvbVRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdyaWRNZW51Q3VzdG9tSXRlbXM7XHJcbiAgfVxyXG5cclxuICAvKiogRXhlY3V0ZSB0aGUgSGVhZGVyIE1lbnUgQ29tbWFuZHMgdGhhdCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBvbkNvbW1hbmQgc3Vic2NyaWJlICovXHJcbiAgZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGU6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb21tYW5kKSB7XHJcbiAgICAgIHN3aXRjaCAoYXJncy5jb21tYW5kKSB7XHJcbiAgICAgICAgY2FzZSAnaGlkZSc6XHJcbiAgICAgICAgICB0aGlzLmhpZGVDb2x1bW4oYXJncy5jb2x1bW4pO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc29ydC1hc2MnOlxyXG4gICAgICAgIGNhc2UgJ3NvcnQtZGVzYyc6XHJcbiAgICAgICAgICAvLyBnZXQgcHJldmlvdXNseSBzb3J0ZWQgY29sdW1uc1xyXG4gICAgICAgICAgY29uc3QgY29sczogQ29sdW1uU29ydFtdID0gdGhpcy5zb3J0U2VydmljZS5nZXRQcmV2aW91c0NvbHVtblNvcnRzKGFyZ3MuY29sdW1uLmlkICsgJycpO1xyXG5cclxuICAgICAgICAgIC8vIGFkZCB0byB0aGUgY29sdW1uIGFycmF5LCB0aGUgY29sdW1uIHNvcnRlZCBieSB0aGUgaGVhZGVyIG1lbnVcclxuICAgICAgICAgIGNvbHMucHVzaCh7IHNvcnRDb2w6IGFyZ3MuY29sdW1uLCBzb3J0QXNjOiAoYXJncy5jb21tYW5kID09PSAnc29ydC1hc2MnKSB9KTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkJhY2tlbmRTb3J0Q2hhbmdlZChlLCB7IG11bHRpQ29sdW1uU29ydDogdHJ1ZSwgc29ydENvbHM6IGNvbHMsIGdyaWQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkxvY2FsU29ydENoYW5nZWQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldywgY29scyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9iaiBzb3J0Q29sdW1ucyBhcnJheSB3aGljaCB3aWxsIGF0IHRoZSBzYW1lIGFkZCB0aGUgdmlzdWFsIHNvcnQgaWNvbihzKSBvbiB0aGUgVUlcclxuICAgICAgICAgIGNvbnN0IG5ld1NvcnRDb2x1bW5zOiBDb2x1bW5Tb3J0W10gPSBjb2xzLm1hcCgoY29sKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbCAmJiBjb2wuc29ydENvbCAmJiBjb2wuc29ydENvbC5pZCxcclxuICAgICAgICAgICAgICBzb3J0QXNjOiBjb2wgJiYgY29sLnNvcnRBc2NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U29ydENvbHVtbnMobmV3U29ydENvbHVtbnMpOyAvLyBhZGQgc29ydCBpY29uIGluIFVJXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cclxuICBoaWRlQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmFycmF5UmVtb3ZlSXRlbUJ5SW5kZXgodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpLCBjb2x1bW5JbmRleCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIEdyaWQgTWVudSB0aXRsZXMgYW5kIGNvbHVtbiBwaWNrZXIgKi9cclxuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcclxuICAgIC8vIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBieSBwb2ludGVycywgdGhhdCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IEdyaWQgTWVudSBDb250cm9sIHRvIHNlZSB0aGUgbmV3IHZhbHVlc1xyXG4gICAgLy8gd2UgYWxzbyBuZWVkIHRvIGNhbGwgdGhlIGNvbnRyb2wgaW5pdCBzbyB0aGF0IGl0IHRha2VzIHRoZSBuZXcgR3JpZCBvYmplY3Qgd2l0aCBsYXRlc3QgdmFsdWVzXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5lbXB0eUdyaWRNZW51VGl0bGVzKCk7XHJcblxyXG4gICAgICAvLyBtZXJnZSBvcmlnaW5hbCB1c2VyIGdyaWQgbWVudSBpdGVtcyB3aXRoIGludGVybmFsIGl0ZW1zXHJcbiAgICAgIC8vIHRoZW4gc29ydCBhbGwgR3JpZCBNZW51IEN1c3RvbSBJdGVtcyAoc29ydGVkIGJ5IHBvaW50ZXIsIG5vIG5lZWQgdG8gdXNlIHRoZSByZXR1cm4pXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyA9IFsuLi50aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudS5jdXN0b21JdGVtcyB8fCBbXSwgLi4udGhpcy5hZGRHcmlkTWVudUN1c3RvbUNvbW1hbmRzKCldO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnNvcnRJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICdwb3NpdGlvbk9yZGVyJyk7XHJcblxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY29sdW1uVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2NvbHVtblRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5mb3JjZUZpdFRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5zeW5jUmVzaXplVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ3N5bmNSZXNpemVUaXRsZScsICdncmlkTWVudScpO1xyXG5cclxuICAgICAgLy8gdHJhbnNsYXRlIGFsbCBjb2x1bW5zIChpbmNsdWRpbmcgbm9uLXZpc2libGUpXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcblxyXG4gICAgICAvLyByZS1pbml0aWFsaXplIHRoZSBHcmlkIE1lbnUsIHRoYXQgd2lsbCByZWNyZWF0ZSBhbGwgdGhlIG1lbnVzICYgbGlzdFxyXG4gICAgICAvLyBkb2luZyBhbiBcImluaXQoKVwiIHdvbid0IGRyb3AgYW55IGV4aXN0aW5nIGNvbW1hbmQgYXR0YWNoZWRcclxuICAgICAgaWYgKHRoaXMuX2V4dGVuc2lvbi5pbml0KSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9uLmluaXQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtcHR5R3JpZE1lbnVUaXRsZXMoKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbVRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jb2x1bW5UaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuZm9yY2VGaXRUaXRsZSA9ICcnO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuc3luY1Jlc2l6ZVRpdGxlID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm4gZGVmYXVsdCBHcmlkIE1lbnUgb3B0aW9uc1xyXG4gICovXHJcbiAgcHJpdmF0ZSBnZXREZWZhdWx0R3JpZE1lbnVPcHRpb25zKCk6IEdyaWRNZW51IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGN1c3RvbVRpdGxlOiB1bmRlZmluZWQsXHJcbiAgICAgIGNvbHVtblRpdGxlOiB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2NvbHVtblRpdGxlJywgJ2dyaWRNZW51JyksXHJcbiAgICAgIGZvcmNlRml0VGl0bGU6IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnZm9yY2VGaXRUaXRsZScsICdncmlkTWVudScpLFxyXG4gICAgICBzeW5jUmVzaXplVGl0bGU6IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnc3luY1Jlc2l6ZVRpdGxlJywgJ2dyaWRNZW51JyksXHJcbiAgICAgIGljb25Dc3NDbGFzczogJ2ZhIGZhLWJhcnMnLFxyXG4gICAgICBtZW51V2lkdGg6IDE4LFxyXG4gICAgICBjdXN0b21JdGVtczogW10sXHJcbiAgICAgIGhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kOiBmYWxzZSxcclxuICAgICAgaGlkZVJlZnJlc2hEYXRhc2V0Q29tbWFuZDogZmFsc2UsXHJcbiAgICAgIGhpZGVUb2dnbGVGaWx0ZXJDb21tYW5kOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==