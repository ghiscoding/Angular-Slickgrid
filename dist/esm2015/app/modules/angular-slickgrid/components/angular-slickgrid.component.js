/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// import 3rd party vendor libs
// only import the necessary core lib, each will be imported on demand when enabled (via require)
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import { Component, ElementRef, EventEmitter, Inject, Injectable, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { castToPromise, titleCase, unsubscribeAllObservables } from './../services/utilities';
import { GlobalGridOptions } from './../global-grid-options';
import { ExtensionName, GridStateType, } from './../models/index';
import { FilterFactory } from '../filters/filterFactory';
import { SlickgridConfig } from '../slickgrid-config';
import { Observable } from 'rxjs';
// Services
import { ExportService } from './../services/export.service';
import { ExtensionService } from '../services/extension.service';
import { ExtensionUtility } from '../extensions/extensionUtility';
import { FilterService } from './../services/filter.service';
import { GraphqlService } from './../services/graphql.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { ResizerService } from './../services/resizer.service';
import { SharedService } from '../services/shared.service';
import { SortService } from './../services/sort.service';
// Extensions (SlickGrid Controls & Plugins)
import { AutoTooltipExtension } from '../extensions/autoTooltipExtension';
import { CellExternalCopyManagerExtension } from '../extensions/cellExternalCopyManagerExtension';
import { CheckboxSelectorExtension } from '../extensions/checkboxSelectorExtension';
import { ColumnPickerExtension } from '../extensions/columnPickerExtension';
import { DraggableGroupingExtension } from '../extensions/draggableGroupingExtension';
import { GridMenuExtension } from '../extensions/gridMenuExtension';
import { GroupItemMetaProviderExtension } from '../extensions/groupItemMetaProviderExtension';
import { HeaderButtonExtension } from '../extensions/headerButtonExtension';
import { HeaderMenuExtension } from '../extensions/headerMenuExtension';
import { RowMoveManagerExtension } from '../extensions/rowMoveManagerExtension';
import { RowSelectionExtension } from '../extensions/rowSelectionExtension';
/** @type {?} */
const slickgridEventPrefix = 'sg';
export class AngularSlickgridComponent {
    /**
     * @param {?} elm
     * @param {?} exportService
     * @param {?} extensionService
     * @param {?} extensionUtility
     * @param {?} filterService
     * @param {?} gridService
     * @param {?} gridEventService
     * @param {?} gridStateService
     * @param {?} groupingAndColspanService
     * @param {?} resizer
     * @param {?} sharedService
     * @param {?} sortService
     * @param {?} translate
     * @param {?} forRootConfig
     */
    constructor(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
        this.elm = elm;
        this.exportService = exportService;
        this.extensionService = extensionService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.gridService = gridService;
        this.gridEventService = gridEventService;
        this.gridStateService = gridStateService;
        this.groupingAndColspanService = groupingAndColspanService;
        this.resizer = resizer;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this._eventHandler = new Slick.EventHandler();
        this._hideHeaderRowAfterPageLoad = false;
        this.groupingDefinition = {};
        this.showPagination = false;
        this.isGridInitialized = false;
        this.subscriptions = [];
        this.onAngularGridCreated = new EventEmitter();
        this.onDataviewCreated = new EventEmitter();
        this.onGridCreated = new EventEmitter();
        this.onGridInitialized = new EventEmitter();
        this.onBeforeGridCreate = new EventEmitter();
        this.onBeforeGridDestroy = new EventEmitter();
        this.onAfterGridDestroyed = new EventEmitter();
        this.onGridStateChanged = new EventEmitter();
    }
    /**
     * @param {?} height
     * @return {?}
     */
    set gridHeight(height) {
        this._fixedHeight = height;
    }
    /**
     * @param {?} width
     * @return {?}
     */
    set gridWidth(width) {
        this._fixedWidth = width;
    }
    /**
     * @param {?} columnDefinitions
     * @return {?}
     */
    set columnDefinitions(columnDefinitions) {
        this._columnDefinitions = columnDefinitions;
        if (this.isGridInitialized) {
            this.updateColumnDefinitionsList(columnDefinitions);
        }
    }
    /**
     * @return {?}
     */
    get columnDefinitions() {
        return this._columnDefinitions;
    }
    /**
     * @param {?} dataset
     * @return {?}
     */
    set dataset(dataset) {
        this._dataset = dataset;
        this.refreshGridData(dataset);
    }
    /**
     * @return {?}
     */
    get dataset() {
        return this._dataView.getItems();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onBeforeGridCreate.emit(true);
        if (this.gridOptions && !this.gridOptions.enableAutoResize && !this.gridOptions.autoResize) {
            this.gridHeightString = `${this._fixedHeight}px`;
            this.gridWidthString = `${this._fixedWidth}px`;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    }
    /**
     * @param {?=} emptyDomElementContainer
     * @return {?}
     */
    destroy(emptyDomElementContainer = false) {
        this._dataView = [];
        this.gridOptions = {};
        this._eventHandler.unsubscribeAll();
        this.extensionService.dispose();
        this.filterService.dispose();
        this.gridEventService.dispose();
        this.gridStateService.dispose();
        this.groupingAndColspanService.dispose();
        this.resizer.dispose();
        this.sortService.dispose();
        this.grid.destroy();
        if (emptyDomElementContainer) {
            $(this.gridOptions.gridContainerId).empty();
        }
        // also unsubscribe all RxJS subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialization();
        this.isGridInitialized = true;
    }
    /**
     * @return {?}
     */
    initialization() {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this.gridOptions = this.mergeGridOptions(this.gridOptions);
        this.createBackendApiInternalPostProcessCallback(this.gridOptions);
        if (!this.customDataView) {
            if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
                this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
                this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
                this._dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
            }
            else {
                this._dataView = new Slick.Data.DataView();
            }
        }
        // for convenience, we provide the property "editor" as an Angular-Slickgrid editor complex object
        // however "editor" is used internally by SlickGrid for it's own Editor Factory
        // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
        // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
        this._columnDefinitions = this._columnDefinitions.map((column) => {
            // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
            if (column.editor && column.editor.collectionAsync) {
                this.loadEditorCollectionAsync(column);
            }
            return Object.assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: Object.assign({}, column.editor) });
        });
        // save reference for all columns before they optionally become hidden/visible
        this.sharedService.allColumns = this._columnDefinitions;
        this.sharedService.visibleColumns = this._columnDefinitions;
        this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
        this.grid = new Slick.Grid(`#${this.gridId}`, this.customDataView || this._dataView, this._columnDefinitions, this.gridOptions);
        this.sharedService.dataView = this._dataView;
        this.sharedService.grid = this.grid;
        this.extensionService.attachDifferentExtensions();
        this.attachDifferentHooks(this.grid, this.gridOptions, this._dataView);
        // emit the Grid & DataView object to make them available in parent component
        this.onGridCreated.emit(this.grid);
        // initialize the SlickGrid grid
        this.grid.init();
        if (!this.customDataView && (this._dataView && this._dataView.beginUpdate && this._dataView.setItems && this._dataView.endUpdate)) {
            this.onDataviewCreated.emit(this._dataView);
            this._dataView.beginUpdate();
            this._dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
            this._dataView.endUpdate();
        }
        // user might want to hide the header row on page load but still have `enableFiltering: true`
        // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
        if (this._hideHeaderRowAfterPageLoad) {
            this.showHeaderRow(false);
        }
        // after the DataView is created & updated execute some processes
        this.executeAfterDataviewCreated(this.grid, this.gridOptions, this._dataView);
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this.gridOptions);
        // attach grouping and header grouping colspan service
        if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
            this.groupingAndColspanService.init(this.grid, this._dataView);
        }
        // attach grid  service
        this.gridService.init(this.grid, this._dataView);
        // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders();
        }
        // if Export is enabled, initialize the service with the necessary grid and other objects
        if (this.gridOptions.enableExport) {
            this.exportService.init(this.grid, this._dataView);
        }
        // once all hooks are in placed and the grid is initialized, we can emit an event
        this.onGridInitialized.emit(this.grid);
        // attach the Backend Service API callback functions only after the grid is initialized
        // because the preProcess() and onInit() might get triggered
        if (this.gridOptions && this.gridOptions.backendServiceApi) {
            this.attachBackendCallbackFunctions(this.gridOptions);
        }
        this.gridStateService.init(this.grid, this.extensionService, this.filterService, this.sortService);
        this.onAngularGridCreated.emit({
            // Slick Grid & DataView objects
            dataView: this._dataView,
            slickGrid: this.grid,
            // public methods
            destroy: this.destroy.bind(this),
            // return all available Services (non-singleton)
            backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
            exportService: this.exportService,
            filterService: this.filterService,
            gridEventService: this.gridEventService,
            gridStateService: this.gridStateService,
            gridService: this.gridService,
            groupingService: this.groupingAndColspanService,
            extensionService: this.extensionService,
            /**
             * @deprecated please use "extensionService" instead
             */
            pluginService: this.extensionService,
            resizerService: this.resizer,
            sortService: this.sortService,
        });
    }
    /**
     * Commits the current edit to the grid
     * @param {?} target
     * @return {?}
     */
    commitEdit(target) {
        if (this.grid.getOptions().autoCommitEdit) {
            /** @type {?} */
            const activeNode = this.grid.getActiveCellNode();
            // a timeout must be set or this could come into conflict when slickgrid
            // tries to commit the edit when going from one editor to another on the grid
            // through the click event. If the timeout was not here it would
            // try to commit/destroy the twice, which would throw a jquery
            // error about the element not being in the DOM
            setTimeout(() => {
                // make sure the target is the active editor so we do not
                // commit prematurely
                if (activeNode && activeNode.contains(target) && this.grid.getEditorLock().isActive()) {
                    this.grid.getEditorLock().commitCurrentEdit();
                }
            });
        }
    }
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     * @param {?} gridOptions
     * @return {?}
     */
    createBackendApiInternalPostProcessCallback(gridOptions) {
        if (gridOptions && gridOptions.backendServiceApi) {
            /** @type {?} */
            const backendApi = gridOptions.backendServiceApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi && backendApi.service && backendApi.service instanceof GraphqlService) {
                backendApi.internalPostProcess = (processResult) => {
                    /** @type {?} */
                    const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        this._dataset = processResult.data[datasetName].nodes;
                        this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        this._dataset = [];
                    }
                };
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    attachDifferentHooks(grid, gridOptions, dataView) {
        // on locale change, we have to manually translate the Headers, GridMenu
        this.subscriptions.push(this.translate.onLangChange.subscribe((event) => {
            if (gridOptions.enableTranslate) {
                this.extensionService.translateColumnHeaders();
                this.extensionService.translateColumnPicker();
                this.extensionService.translateGridMenu();
                this.extensionService.translateHeaderMenu();
            }
        }));
        // if user entered some Columns "presets", we need to reflect them all in the grid
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            /** @type {?} */
            const gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                // make sure that the checkbox selector is also visible if it is enabled
                if (gridOptions.enableCheckboxSelector) {
                    /** @type {?} */
                    const checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                    if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                        gridColumns.unshift(checkboxColumn);
                    }
                }
                // finally set the new presets columns (including checkbox selector if need be)
                grid.setColumns(gridColumns);
            }
        }
        // attach external sorting (backend) when available or default onSort (dataView)
        if (gridOptions.enableSorting && !this.customDataView) {
            gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (gridOptions.enableFiltering && !this.customDataView) {
            this.filterService.init(grid);
            // if user entered some "presets", we need to reflect them all in the DOM
            if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                this.filterService.populateColumnFilterSearchTerms();
            }
            gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid) : this.filterService.attachLocalOnFilter(grid, this._dataView);
        }
        // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
        if (gridOptions.backendServiceApi) {
            /** @type {?} */
            const backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        // expose all Slick Grid Events through dispatch
        for (const prop in grid) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(grid[prop], (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                });
            }
        }
        // expose all Slick DataView Events through dispatch
        for (const prop in dataView) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(dataView[prop], (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                });
            }
        }
        // expose GridState Service changes event through dispatch
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe((gridStateChange) => {
            this.onGridStateChanged.emit(gridStateChange);
        }));
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, dataView);
        this.gridEventService.attachOnClick(grid, dataView);
        if (dataView && grid) {
            this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
                grid.updateRowCount();
                grid.render();
            });
            this._eventHandler.subscribe(dataView.onRowsChanged, (e, args) => {
                grid.invalidateRows(args.rows);
                grid.render();
            });
        }
        // does the user have a colspan callback?
        if (gridOptions.colspanCallback) {
            this._dataView.getItemMetadata = (rowNumber) => {
                /** @type {?} */
                const item = this._dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            };
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    attachBackendCallbackFunctions(gridOptions) {
        /** @type {?} */
        const backendApi = gridOptions.backendServiceApi;
        /** @type {?} */
        const serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        /** @type {?} */
        const isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            /** @type {?} */
            const backendService = backendApi.service;
            // if user entered some any "presets", we need to reflect them all in the grid
            if (gridOptions && gridOptions.presets) {
                // Filters "presets"
                if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                    backendService.updateFilters(gridOptions.presets.filters, true);
                }
                // Sorters "presets"
                if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                    backendService.updateSorters(undefined, gridOptions.presets.sorters);
                }
                // Pagination "presets"
                if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
                    backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
                }
            }
            else {
                /** @type {?} */
                const columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            /** @type {?} */
            const query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            /** @type {?} */
            const observableOrPromise = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                // keep start time & end timestamps & return it after process execution
                /** @type {?} */
                const startTime = new Date();
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                try {
                    // the process could be an Observable (like HttpClient) or a Promise
                    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                    /** @type {?} */
                    const processResult = yield castToPromise(observableOrPromise);
                    /** @type {?} */
                    const endTime = new Date();
                    // define what our internal Post Process callback, only available for GraphQL Service for now
                    // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
                    if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
                        backendApi.internalPostProcess(processResult);
                    }
                    // send the response process to the postProcess callback
                    if (backendApi.postProcess) {
                        if (processResult instanceof Object) {
                            processResult.statistics = {
                                startTime,
                                endTime,
                                executionTime: endTime.valueOf() - startTime.valueOf(),
                                totalItemCount: this.gridOptions && this.gridOptions.pagination && this.gridOptions.pagination.totalItems
                            };
                        }
                        backendApi.postProcess(processResult);
                    }
                }
                catch (e) {
                    if (backendApi && backendApi.onError) {
                        backendApi.onError(e);
                    }
                    else {
                        throw e;
                    }
                }
            }));
        }
    }
    /**
     * @param {?} grid
     * @param {?} options
     * @return {?}
     */
    attachResizeHook(grid, options) {
        // expand/autofit columns on first page load
        if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
            grid.autosizeColumns();
            // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
            this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
        }
        // auto-resize grid on browser resize
        if (this._fixedHeight || this._fixedWidth) {
            this.resizer.init(grid, { height: this._fixedHeight, width: this._fixedWidth });
        }
        else {
            this.resizer.init(grid);
        }
        if (options.enableAutoResize) {
            this.resizer.attachAutoResizeDataGrid();
            if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
                grid.autosizeColumns();
            }
        }
    }
    /**
     * @param {?} grid
     * @param {?} gridOptions
     * @param {?} dataView
     * @return {?}
     */
    executeAfterDataviewCreated(grid, gridOptions, dataView) {
        // if user entered some Sort "presets", we need to reflect them all in the DOM
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    }
    /**
     * @param {?} gridOptions
     * @return {?}
     */
    mergeGridOptions(gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
        /** @type {?} */
        const options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
        // also make sure to show the header row if user have enabled filtering
        this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
        if (options.enableFiltering && !options.showHeaderRow) {
            options.showHeaderRow = options.enableFiltering;
        }
        return options;
    }
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     * @param {?} pagination
     * @return {?}
     */
    paginationChanged(pagination) {
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
            this.gridService.setSelectedRows([]);
        }
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    }
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {?} dataset
     * @param {?=} totalCount
     * @return {?}
     */
    refreshGridData(dataset, totalCount) {
        if (Array.isArray(dataset) && this.grid && this._dataView && typeof this._dataView.setItems === 'function') {
            this._dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
            if (!this.gridOptions.backendServiceApi) {
                this._dataView.reSort();
            }
            // this.grid.setData(dataset);
            this.grid.invalidate();
            this.grid.render();
            if (this.gridOptions.backendServiceApi) {
                // do we want to show pagination?
                // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
                this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;
                // before merging the grid options, make sure that it has the totalItems count
                // once we have that, we can merge and pass all these options to the pagination component
                if (!this.gridOptions.pagination) {
                    this.gridOptions.pagination = (this.gridOptions.pagination) ? this.gridOptions.pagination : undefined;
                }
                if (this.gridOptions.pagination && totalCount !== undefined) {
                    this.gridOptions.pagination.totalItems = totalCount;
                }
                if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
                    this.gridOptions.pagination.pageSize = this.gridOptions.presets.pagination.pageSize;
                    this.gridOptions.pagination.pageNumber = this.gridOptions.presets.pagination.pageNumber;
                }
                this.gridPaginationOptions = this.mergeGridOptions(this.gridOptions);
            }
            // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
            if (this.grid && this.gridOptions.enableAutoResize) {
                /** @type {?} */
                const delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                this.resizer.resizeGrid(delay || 10);
            }
        }
    }
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     * @param {?} newColumnDefinitions
     * @return {?}
     */
    updateColumnDefinitionsList(newColumnDefinitions) {
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
        }
        else {
            this.extensionService.renderColumnHeaders(newColumnDefinitions);
        }
        if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
            this.grid.autosizeColumns();
        }
    }
    /**
     * Toggle the filter row displayed on first row
     * @param {?} isShowing
     * @return {?}
     */
    showHeaderRow(isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    /**
     * Toggle the filter row displayed on first row
     * @return {?}
     */
    toggleHeaderRow() {
        /** @type {?} */
        const isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    //
    // private functions
    // ------------------
    /**
     * Dispatch of Custom Event, which by default will bubble & is cancelable
     * @private
     * @param {?} eventName
     * @param {?=} data
     * @param {?=} isBubbling
     * @param {?=} isCancelable
     * @return {?}
     */
    dispatchCustomEvent(eventName, data, isBubbling = true, isCancelable = true) {
        /** @type {?} */
        const eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    }
    /**
     * Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves
     * @private
     * @param {?} column
     * @return {?}
     */
    loadEditorCollectionAsync(column) {
        /** @type {?} */
        const collectionAsync = column && column.editor && column.editor.collectionAsync;
        if (collectionAsync instanceof Observable) {
            this.subscriptions.push(collectionAsync.subscribe((resolvedCollection) => this.updateEditorCollection(column, resolvedCollection)));
        }
    }
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     * @private
     * @param {?} column
     * @param {?} newCollection
     * @return {?}
     */
    updateEditorCollection(column, newCollection) {
        column.editor.collection = newCollection;
        // find the new column reference pointer
        /** @type {?} */
        const columns = this.grid.getColumns();
        if (Array.isArray(columns)) {
            /** @type {?} */
            const columnRef = columns.find((col) => col.id === column.id);
            columnRef.internalColumnEditor = column.editor;
        }
    }
}
AngularSlickgridComponent.decorators = [
    { type: Injectable },
    { type: Component, args: [{
                selector: 'angular-slickgrid',
                template: "<div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\" [style.width]=\"gridWidthString\">\r\n    <div attr.id='{{gridId}}' class=\"slickgrid-container\" style=\"width: 100%\" [style.height]=\"gridHeightString\">\r\n    </div>\r\n\r\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\"\r\n        *ngIf=\"showPagination\"\r\n        (onPaginationChanged)=\"paginationChanged($event)\"\r\n        [gridPaginationOptions]=\"gridPaginationOptions\">\r\n    </slick-pagination>\r\n</div>\r\n",
                providers: [
                    // make everything transient (non-singleton)
                    AutoTooltipExtension,
                    CellExternalCopyManagerExtension,
                    CheckboxSelectorExtension,
                    ColumnPickerExtension,
                    DraggableGroupingExtension,
                    ExtensionService,
                    ExportService,
                    ExtensionUtility,
                    FilterFactory,
                    FilterService,
                    GraphqlService,
                    GridEventService,
                    GridMenuExtension,
                    GridService,
                    GridStateService,
                    GroupingAndColspanService,
                    GroupItemMetaProviderExtension,
                    HeaderButtonExtension,
                    HeaderMenuExtension,
                    ResizerService,
                    RowMoveManagerExtension,
                    RowSelectionExtension,
                    SharedService,
                    SortService,
                    SlickgridConfig
                ]
            }] }
];
/** @nocollapse */
AngularSlickgridComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ExportService },
    { type: ExtensionService },
    { type: ExtensionUtility },
    { type: FilterService },
    { type: GridService },
    { type: GridEventService },
    { type: GridStateService },
    { type: GroupingAndColspanService },
    { type: ResizerService },
    { type: SharedService },
    { type: SortService },
    { type: TranslateService },
    { type: undefined, decorators: [{ type: Inject, args: ['config',] }] }
];
AngularSlickgridComponent.propDecorators = {
    onAngularGridCreated: [{ type: Output }],
    onDataviewCreated: [{ type: Output }],
    onGridCreated: [{ type: Output }],
    onGridInitialized: [{ type: Output }],
    onBeforeGridCreate: [{ type: Output }],
    onBeforeGridDestroy: [{ type: Output }],
    onAfterGridDestroyed: [{ type: Output }],
    onGridStateChanged: [{ type: Output }],
    customDataView: [{ type: Input }],
    gridId: [{ type: Input }],
    gridOptions: [{ type: Input }],
    gridHeight: [{ type: Input }],
    gridWidth: [{ type: Input }],
    columnDefinitions: [{ type: Input }],
    dataset: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._dataset;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._columnDefinitions;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._dataView;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._eventHandler;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._fixedHeight;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._fixedWidth;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype._hideHeaderRowAfterPageLoad;
    /** @type {?} */
    AngularSlickgridComponent.prototype.grid;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridPaginationOptions;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridHeightString;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridWidthString;
    /** @type {?} */
    AngularSlickgridComponent.prototype.groupingDefinition;
    /** @type {?} */
    AngularSlickgridComponent.prototype.groupItemMetadataProvider;
    /** @type {?} */
    AngularSlickgridComponent.prototype.showPagination;
    /** @type {?} */
    AngularSlickgridComponent.prototype.isGridInitialized;
    /** @type {?} */
    AngularSlickgridComponent.prototype.subscriptions;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onAngularGridCreated;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onDataviewCreated;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onGridCreated;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onGridInitialized;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onBeforeGridCreate;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onBeforeGridDestroy;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onAfterGridDestroyed;
    /** @type {?} */
    AngularSlickgridComponent.prototype.onGridStateChanged;
    /** @type {?} */
    AngularSlickgridComponent.prototype.customDataView;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridId;
    /** @type {?} */
    AngularSlickgridComponent.prototype.gridOptions;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.elm;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.exportService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.extensionService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.filterService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.gridService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.gridEventService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.gridStateService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.groupingAndColspanService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.resizer;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.sharedService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.sortService;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    AngularSlickgridComponent.prototype.forRootConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsT0FBTywwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLHVDQUF1QyxDQUFDO0FBQy9DLE9BQU8sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLDBCQUEwQixDQUFDO0FBRWxDLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFJTCxhQUFhLEVBSWIsYUFBYSxHQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQzs7QUFHaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xF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QUE0Qzs7SUFDNUMseUNBQVU7O0lBQ1YsMERBQWtDOztJQUNsQyxxREFBeUI7O0lBQ3pCLG9EQUF3Qjs7SUFDeEIsdURBQTZCOztJQUM3Qiw4REFBK0I7O0lBQy9CLG1EQUF1Qjs7SUFDdkIsc0RBQTBCOztJQUMxQixrREFBbUM7O0lBRW5DLHlEQUF5RTs7SUFDekUsc0RBQXNEOztJQUN0RCxrREFBa0Q7O0lBQ2xELHNEQUFzRDs7SUFDdEQsdURBQTJEOztJQUMzRCx3REFBd0Q7O0lBQ3hELHlEQUE2RDs7SUFDN0QsdURBQW1FOztJQUNuRSxtREFBNkI7O0lBQzdCLDJDQUF3Qjs7SUFDeEIsZ0RBQWlDOzs7OztJQStCL0Isd0NBQXVCOzs7OztJQUN2QixrREFBb0M7Ozs7O0lBQ3BDLHFEQUEwQzs7Ozs7SUFDMUMscURBQTBDOzs7OztJQUMxQyxrREFBb0M7Ozs7O0lBQ3BDLGdEQUFnQzs7Ozs7SUFDaEMscURBQTBDOzs7OztJQUMxQyxxREFBMEM7Ozs7O0lBQzFDLDhEQUE0RDs7Ozs7SUFDNUQsNENBQStCOzs7OztJQUMvQixrREFBb0M7Ozs7O0lBQ3BDLGdEQUFnQzs7Ozs7SUFDaEMsOENBQW1DOzs7OztJQUNuQyxrREFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgM3JkIHBhcnR5IHZlbmRvciBsaWJzXHJcbi8vIG9ubHkgaW1wb3J0IHRoZSBuZWNlc3NhcnkgY29yZSBsaWIsIGVhY2ggd2lsbCBiZSBpbXBvcnRlZCBvbiBkZW1hbmQgd2hlbiBlbmFibGVkICh2aWEgcmVxdWlyZSlcclxuaW1wb3J0ICdqcXVlcnktdWktZGlzdC9qcXVlcnktdWknO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9saWIvanF1ZXJ5LmV2ZW50LmRyYWctMi4zLjAnO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9zbGljay5jb3JlJztcclxuaW1wb3J0ICdzbGlja2dyaWQvc2xpY2suZ3JpZCc7XHJcbmltcG9ydCAnc2xpY2tncmlkL3NsaWNrLmRhdGF2aWV3JztcclxuXHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSwgdGl0bGVDYXNlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBHbG9iYWxHcmlkT3B0aW9ucyB9IGZyb20gJy4vLi4vZ2xvYmFsLWdyaWQtb3B0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhckdyaWRJbnN0YW5jZSxcclxuICBCYWNrZW5kU2VydmljZU9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBHcmFwaHFsUmVzdWx0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZFN0YXRlQ2hhbmdlLFxyXG4gIEdyaWRTdGF0ZVR5cGUsXHJcbiAgUGFnaW5hdGlvbixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEZpbHRlckZhY3RvcnkgfSBmcm9tICcuLi9maWx0ZXJzL2ZpbHRlckZhY3RvcnknO1xyXG5pbXBvcnQgeyBTbGlja2dyaWRDb25maWcgfSBmcm9tICcuLi9zbGlja2dyaWQtY29uZmlnJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyBTZXJ2aWNlc1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leHRlbnNpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuLi9leHRlbnNpb25zL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyYXBocWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkRXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkU3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyb3VwaW5nQW5kQ29sc3Bhbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzaXplclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3Jlc2l6ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UnO1xyXG5cclxuLy8gRXh0ZW5zaW9ucyAoU2xpY2tHcmlkIENvbnRyb2xzICYgUGx1Z2lucylcclxuaW1wb3J0IHsgQXV0b1Rvb2x0aXBFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2F1dG9Ub29sdGlwRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2NlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IENvbHVtblBpY2tlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY29sdW1uUGlja2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2RyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgR3JpZE1lbnVFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2dyaWRNZW51RXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9ncm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBIZWFkZXJCdXR0b25FeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2hlYWRlckJ1dHRvbkV4dGVuc2lvbic7XHJcbmltcG9ydCB7IEhlYWRlck1lbnVFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2hlYWRlck1lbnVFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvcm93TW92ZU1hbmFnZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBSb3dTZWxlY3Rpb25FeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL3Jvd1NlbGVjdGlvbkV4dGVuc2lvbic7XHJcblxyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5jb25zdCBzbGlja2dyaWRFdmVudFByZWZpeCA9ICdzZyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYW5ndWxhci1zbGlja2dyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hbmd1bGFyLXNsaWNrZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAvLyBtYWtlIGV2ZXJ5dGhpbmcgdHJhbnNpZW50IChub24tc2luZ2xldG9uKVxyXG4gICAgQXV0b1Rvb2x0aXBFeHRlbnNpb24sXHJcbiAgICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICAgIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBDb2x1bW5QaWNrZXJFeHRlbnNpb24sXHJcbiAgICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICAgIEV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIEZpbHRlckZhY3RvcnksXHJcbiAgICBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgR3JhcGhxbFNlcnZpY2UsXHJcbiAgICBHcmlkRXZlbnRTZXJ2aWNlLFxyXG4gICAgR3JpZE1lbnVFeHRlbnNpb24sXHJcbiAgICBHcmlkU2VydmljZSxcclxuICAgIEdyaWRTdGF0ZVNlcnZpY2UsXHJcbiAgICBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gICAgSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIFJlc2l6ZXJTZXJ2aWNlLFxyXG4gICAgUm93TW92ZU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbiAgICBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgU29ydFNlcnZpY2UsXHJcbiAgICBTbGlja2dyaWRDb25maWdcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIHByaXZhdGUgX2RhdGFzZXQ6IGFueVtdO1xyXG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogYW55ID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2ZpeGVkSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpeGVkV2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfaGlkZUhlYWRlclJvd0FmdGVyUGFnZUxvYWQgPSBmYWxzZTtcclxuICBncmlkOiBhbnk7XHJcbiAgZ3JpZFBhZ2luYXRpb25PcHRpb25zOiBHcmlkT3B0aW9uO1xyXG4gIGdyaWRIZWlnaHRTdHJpbmc6IHN0cmluZztcclxuICBncmlkV2lkdGhTdHJpbmc6IHN0cmluZztcclxuICBncm91cGluZ0RlZmluaXRpb246IGFueSA9IHt9O1xyXG4gIGdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI6IGFueTtcclxuICBzaG93UGFnaW5hdGlvbiA9IGZhbHNlO1xyXG4gIGlzR3JpZEluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgQE91dHB1dCgpIG9uQW5ndWxhckdyaWRDcmVhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmd1bGFyR3JpZEluc3RhbmNlPigpO1xyXG4gIEBPdXRwdXQoKSBvbkRhdGF2aWV3Q3JlYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkdyaWRDcmVhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG9uR3JpZEluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG9uQmVmb3JlR3JpZENyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgb25CZWZvcmVHcmlkRGVzdHJveSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkFmdGVyR3JpZERlc3Ryb3llZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgb25HcmlkU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxHcmlkU3RhdGVDaGFuZ2U+KCk7XHJcbiAgQElucHV0KCkgY3VzdG9tRGF0YVZpZXc6IGFueTtcclxuICBASW5wdXQoKSBncmlkSWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBncmlkT3B0aW9uczogR3JpZE9wdGlvbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZ3JpZEhlaWdodChoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdyaWRXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9maXhlZFdpZHRoID0gd2lkdGg7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb2x1bW5EZWZpbml0aW9ucyhjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pIHtcclxuICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICBpZiAodGhpcy5pc0dyaWRJbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUNvbHVtbkRlZmluaXRpb25zTGlzdChjb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBjb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRhdGFzZXQoZGF0YXNldDogYW55W10pIHtcclxuICAgIHRoaXMuX2RhdGFzZXQgPSBkYXRhc2V0O1xyXG4gICAgdGhpcy5yZWZyZXNoR3JpZERhdGEoZGF0YXNldCk7XHJcbiAgfVxyXG4gIGdldCBkYXRhc2V0KCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhVmlldy5nZXRJdGVtcygpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JpZFNlcnZpY2U6IEdyaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkRXZlbnRTZXJ2aWNlOiBHcmlkRXZlbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkU3RhdGVTZXJ2aWNlOiBHcmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlOiBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZXNpemVyOiBSZXNpemVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdjb25maWcnKSBwcml2YXRlIGZvclJvb3RDb25maWc6IEdyaWRPcHRpb25cclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkJlZm9yZUdyaWRDcmVhdGUuZW1pdCh0cnVlKTtcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmICF0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9SZXNpemUgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICB0aGlzLmdyaWRIZWlnaHRTdHJpbmcgPSBgJHt0aGlzLl9maXhlZEhlaWdodH1weGA7XHJcbiAgICAgIHRoaXMuZ3JpZFdpZHRoU3RyaW5nID0gYCR7dGhpcy5fZml4ZWRXaWR0aH1weGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMub25CZWZvcmVHcmlkRGVzdHJveS5lbWl0KHRoaXMuZ3JpZCk7XHJcbiAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIHRoaXMub25BZnRlckdyaWREZXN0cm95ZWQuZW1pdCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koZW1wdHlEb21FbGVtZW50Q29udGFpbmVyID0gZmFsc2UpIHtcclxuICAgIHRoaXMuX2RhdGFWaWV3ID0gW107XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zID0ge307XHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmZpbHRlclNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5ncmlkRXZlbnRTZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5yZXNpemVyLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuc29ydFNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5ncmlkLmRlc3Ryb3koKTtcclxuXHJcbiAgICBpZiAoZW1wdHlEb21FbGVtZW50Q29udGFpbmVyKSB7XHJcbiAgICAgICQodGhpcy5ncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWQpLmVtcHR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyB1bnN1YnNjcmliZSBhbGwgUnhKUyBzdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuc3Vic2NyaXB0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmluaXRpYWxpemF0aW9uKCk7XHJcbiAgICB0aGlzLmlzR3JpZEluaXRpYWxpemVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uKCkge1xyXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhc2V0IGlzIGluaXRpYWxpemVkIChpZiBub3QgaXQgd2lsbCB0aHJvdyBhbiBlcnJvciB0aGF0IGl0IGNhbm5vdCBnZXRMZW5ndGggb2YgbnVsbClcclxuICAgIHRoaXMuX2RhdGFzZXQgPSB0aGlzLl9kYXRhc2V0IHx8IFtdO1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHRoaXMubWVyZ2VHcmlkT3B0aW9ucyh0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIHRoaXMuY3JlYXRlQmFja2VuZEFwaUludGVybmFsUG9zdFByb2Nlc3NDYWxsYmFjayh0aGlzLmdyaWRPcHRpb25zKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YVZpZXcpIHtcclxuICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcgfHwgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVHcm91cGluZykge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IG5ldyBTbGljay5EYXRhLkdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IHRoaXMuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjtcclxuICAgICAgICB0aGlzLl9kYXRhVmlldyA9IG5ldyBTbGljay5EYXRhLkRhdGFWaWV3KHsgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjogdGhpcy5ncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2RhdGFWaWV3ID0gbmV3IFNsaWNrLkRhdGEuRGF0YVZpZXcoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBjb252ZW5pZW5jZSwgd2UgcHJvdmlkZSB0aGUgcHJvcGVydHkgXCJlZGl0b3JcIiBhcyBhbiBBbmd1bGFyLVNsaWNrZ3JpZCBlZGl0b3IgY29tcGxleCBvYmplY3RcclxuICAgIC8vIGhvd2V2ZXIgXCJlZGl0b3JcIiBpcyB1c2VkIGludGVybmFsbHkgYnkgU2xpY2tHcmlkIGZvciBpdCdzIG93biBFZGl0b3IgRmFjdG9yeVxyXG4gICAgLy8gc28gaW4gb3VyIGxpYiB3ZSB3aWxsIHN3YXAgXCJlZGl0b3JcIiBhbmQgY29weSBpdCBpbnRvIGEgbmV3IHByb3BlcnR5IGNhbGxlZCBcImludGVybmFsQ29sdW1uRWRpdG9yXCJcclxuICAgIC8vIHRoZW4gdGFrZSBiYWNrIFwiZWRpdG9yLm1vZGVsXCIgYW5kIG1ha2UgaXQgdGhlIG5ldyBcImVkaXRvclwiIHNvIHRoYXQgU2xpY2tHcmlkIEVkaXRvciBGYWN0b3J5IHN0aWxsIHdvcmtzXHJcbiAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLm1hcCgoY29sdW1uOiBDb2x1bW4gfCBhbnkpID0+IHtcclxuICAgICAgLy8gb24gZXZlcnkgRWRpdG9yIHRoYXQgaGF2ZSBhIFwiY29sbGVjdGlvbkFzeW5jXCIsIHJlc29sdmUgdGhlIGRhdGEgYW5kIGFzc2lnbiBpdCB0byB0aGUgXCJjb2xsZWN0aW9uXCIgcHJvcGVydHlcclxuICAgICAgaWYgKGNvbHVtbi5lZGl0b3IgJiYgY29sdW1uLmVkaXRvci5jb2xsZWN0aW9uQXN5bmMpIHtcclxuICAgICAgICB0aGlzLmxvYWRFZGl0b3JDb2xsZWN0aW9uQXN5bmMoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5jb2x1bW4sIGVkaXRvcjogY29sdW1uLmVkaXRvciAmJiBjb2x1bW4uZWRpdG9yLm1vZGVsLCBpbnRlcm5hbENvbHVtbkVkaXRvcjogeyAuLi5jb2x1bW4uZWRpdG9yICB9fTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHNhdmUgcmVmZXJlbmNlIGZvciBhbGwgY29sdW1ucyBiZWZvcmUgdGhleSBvcHRpb25hbGx5IGJlY29tZSBoaWRkZW4vdmlzaWJsZVxyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmNyZWF0ZUV4dGVuc2lvbnNCZWZvcmVHcmlkQ3JlYXRpb24odGhpcy5fY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGJ1aWxkIFNsaWNrR3JpZCBHcmlkLCBhbHNvIHVzZXIgbWlnaHQgb3B0aW9uYWxseSBwYXNzIGEgY3VzdG9tIGRhdGF2aWV3IChlLmcuIHJlbW90ZSBtb2RlbClcclxuICAgIHRoaXMuZ3JpZCA9IG5ldyBTbGljay5HcmlkKGAjJHt0aGlzLmdyaWRJZH1gLCB0aGlzLmN1c3RvbURhdGFWaWV3IHx8IHRoaXMuX2RhdGFWaWV3LCB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3ID0gdGhpcy5fZGF0YVZpZXc7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCA9IHRoaXMuZ3JpZDtcclxuXHJcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UuYXR0YWNoRGlmZmVyZW50RXh0ZW5zaW9ucygpO1xyXG4gICAgdGhpcy5hdHRhY2hEaWZmZXJlbnRIb29rcyh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMsIHRoaXMuX2RhdGFWaWV3KTtcclxuXHJcbiAgICAvLyBlbWl0IHRoZSBHcmlkICYgRGF0YVZpZXcgb2JqZWN0IHRvIG1ha2UgdGhlbSBhdmFpbGFibGUgaW4gcGFyZW50IGNvbXBvbmVudFxyXG4gICAgdGhpcy5vbkdyaWRDcmVhdGVkLmVtaXQodGhpcy5ncmlkKTtcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBTbGlja0dyaWQgZ3JpZFxyXG4gICAgdGhpcy5ncmlkLmluaXQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YVZpZXcgJiYgKHRoaXMuX2RhdGFWaWV3ICYmIHRoaXMuX2RhdGFWaWV3LmJlZ2luVXBkYXRlICYmIHRoaXMuX2RhdGFWaWV3LnNldEl0ZW1zICYmIHRoaXMuX2RhdGFWaWV3LmVuZFVwZGF0ZSkpIHtcclxuICAgICAgdGhpcy5vbkRhdGF2aWV3Q3JlYXRlZC5lbWl0KHRoaXMuX2RhdGFWaWV3KTtcclxuICAgICAgdGhpcy5fZGF0YVZpZXcuYmVnaW5VcGRhdGUoKTtcclxuICAgICAgdGhpcy5fZGF0YVZpZXcuc2V0SXRlbXModGhpcy5fZGF0YXNldCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy5lbmRVcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gaGlkZSB0aGUgaGVhZGVyIHJvdyBvbiBwYWdlIGxvYWQgYnV0IHN0aWxsIGhhdmUgYGVuYWJsZUZpbHRlcmluZzogdHJ1ZWBcclxuICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlIG5lZWQgdG8gaGlkZSB0aGUgaGVhZGVyUm93IE9OTFkgQUZURVIgYWxsIGZpbHRlcnMgZ290IGNyZWF0ZWQgJiBkYXRhVmlldyBleGlzdFxyXG4gICAgaWYgKHRoaXMuX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0hlYWRlclJvdyhmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWZ0ZXIgdGhlIERhdGFWaWV3IGlzIGNyZWF0ZWQgJiB1cGRhdGVkIGV4ZWN1dGUgc29tZSBwcm9jZXNzZXNcclxuICAgIHRoaXMuZXhlY3V0ZUFmdGVyRGF0YXZpZXdDcmVhdGVkKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucywgdGhpcy5fZGF0YVZpZXcpO1xyXG5cclxuICAgIC8vIGF0dGFjaCByZXNpemUgT05MWSBhZnRlciB0aGUgZGF0YVZpZXcgaXMgcmVhZHlcclxuICAgIHRoaXMuYXR0YWNoUmVzaXplSG9vayh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGF0dGFjaCBncm91cGluZyBhbmQgaGVhZGVyIGdyb3VwaW5nIGNvbHNwYW4gc2VydmljZVxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuY3JlYXRlUHJlSGVhZGVyUGFuZWwgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgdGhpcy5ncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLl9kYXRhVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXR0YWNoIGdyaWQgIHNlcnZpY2VcclxuICAgIHRoaXMuZ3JpZFNlcnZpY2UuaW5pdCh0aGlzLmdyaWQsIHRoaXMuX2RhdGFWaWV3KTtcclxuXHJcbiAgICAvLyB3aGVuIHVzZXIgZW5hYmxlcyB0cmFuc2xhdGlvbiwgd2UgbmVlZCB0byB0cmFuc2xhdGUgSGVhZGVycyBvbiBmaXJzdCBwYXNzICYgc3Vic2VxdWVudGx5IGluIHRoZSBhdHRhY2hEaWZmZXJlbnRIb29rc1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgRXhwb3J0IGlzIGVuYWJsZWQsIGluaXRpYWxpemUgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgbmVjZXNzYXJ5IGdyaWQgYW5kIG90aGVyIG9iamVjdHNcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUV4cG9ydCkge1xyXG4gICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuaW5pdCh0aGlzLmdyaWQsIHRoaXMuX2RhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbmNlIGFsbCBob29rcyBhcmUgaW4gcGxhY2VkIGFuZCB0aGUgZ3JpZCBpcyBpbml0aWFsaXplZCwgd2UgY2FuIGVtaXQgYW4gZXZlbnRcclxuICAgIHRoaXMub25HcmlkSW5pdGlhbGl6ZWQuZW1pdCh0aGlzLmdyaWQpO1xyXG5cclxuICAgIC8vIGF0dGFjaCB0aGUgQmFja2VuZCBTZXJ2aWNlIEFQSSBjYWxsYmFjayBmdW5jdGlvbnMgb25seSBhZnRlciB0aGUgZ3JpZCBpcyBpbml0aWFsaXplZFxyXG4gICAgLy8gYmVjYXVzZSB0aGUgcHJlUHJvY2VzcygpIGFuZCBvbkluaXQoKSBtaWdodCBnZXQgdHJpZ2dlcmVkXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIHRoaXMuYXR0YWNoQmFja2VuZENhbGxiYWNrRnVuY3Rpb25zKHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5pbml0KHRoaXMuZ3JpZCwgdGhpcy5leHRlbnNpb25TZXJ2aWNlLCB0aGlzLmZpbHRlclNlcnZpY2UsIHRoaXMuc29ydFNlcnZpY2UpO1xyXG5cclxuICAgIHRoaXMub25Bbmd1bGFyR3JpZENyZWF0ZWQuZW1pdCh7XHJcbiAgICAgIC8vIFNsaWNrIEdyaWQgJiBEYXRhVmlldyBvYmplY3RzXHJcbiAgICAgIGRhdGFWaWV3OiB0aGlzLl9kYXRhVmlldyxcclxuICAgICAgc2xpY2tHcmlkOiB0aGlzLmdyaWQsXHJcblxyXG4gICAgICAvLyBwdWJsaWMgbWV0aG9kc1xyXG4gICAgICBkZXN0cm95OiB0aGlzLmRlc3Ryb3kuYmluZCh0aGlzKSxcclxuXHJcbiAgICAgIC8vIHJldHVybiBhbGwgYXZhaWxhYmxlIFNlcnZpY2VzIChub24tc2luZ2xldG9uKVxyXG4gICAgICBiYWNrZW5kU2VydmljZTogdGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpICYmIHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZSxcclxuICAgICAgZXhwb3J0U2VydmljZTogdGhpcy5leHBvcnRTZXJ2aWNlLFxyXG4gICAgICBmaWx0ZXJTZXJ2aWNlOiB0aGlzLmZpbHRlclNlcnZpY2UsXHJcbiAgICAgIGdyaWRFdmVudFNlcnZpY2U6IHRoaXMuZ3JpZEV2ZW50U2VydmljZSxcclxuICAgICAgZ3JpZFN0YXRlU2VydmljZTogdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgICBncmlkU2VydmljZTogdGhpcy5ncmlkU2VydmljZSxcclxuICAgICAgZ3JvdXBpbmdTZXJ2aWNlOiB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UsXHJcbiAgICAgIGV4dGVuc2lvblNlcnZpY2U6IHRoaXMuZXh0ZW5zaW9uU2VydmljZSxcclxuXHJcbiAgICAgIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwiZXh0ZW5zaW9uU2VydmljZVwiIGluc3RlYWQgKi9cclxuICAgICAgcGx1Z2luU2VydmljZTogdGhpcy5leHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgICByZXNpemVyU2VydmljZTogdGhpcy5yZXNpemVyLFxyXG4gICAgICBzb3J0U2VydmljZTogdGhpcy5zb3J0U2VydmljZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tbWl0cyB0aGUgY3VycmVudCBlZGl0IHRvIHRoZSBncmlkXHJcbiAgICovXHJcbiAgY29tbWl0RWRpdCh0YXJnZXQ6IEVsZW1lbnQpIHtcclxuICAgIGlmICh0aGlzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZU5vZGUgPSB0aGlzLmdyaWQuZ2V0QWN0aXZlQ2VsbE5vZGUoKTtcclxuXHJcbiAgICAgIC8vIGEgdGltZW91dCBtdXN0IGJlIHNldCBvciB0aGlzIGNvdWxkIGNvbWUgaW50byBjb25mbGljdCB3aGVuIHNsaWNrZ3JpZFxyXG4gICAgICAvLyB0cmllcyB0byBjb21taXQgdGhlIGVkaXQgd2hlbiBnb2luZyBmcm9tIG9uZSBlZGl0b3IgdG8gYW5vdGhlciBvbiB0aGUgZ3JpZFxyXG4gICAgICAvLyB0aHJvdWdoIHRoZSBjbGljayBldmVudC4gSWYgdGhlIHRpbWVvdXQgd2FzIG5vdCBoZXJlIGl0IHdvdWxkXHJcbiAgICAgIC8vIHRyeSB0byBjb21taXQvZGVzdHJveSB0aGUgdHdpY2UsIHdoaWNoIHdvdWxkIHRocm93IGEganF1ZXJ5XHJcbiAgICAgIC8vIGVycm9yIGFib3V0IHRoZSBlbGVtZW50IG5vdCBiZWluZyBpbiB0aGUgRE9NXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgdGFyZ2V0IGlzIHRoZSBhY3RpdmUgZWRpdG9yIHNvIHdlIGRvIG5vdFxyXG4gICAgICAgIC8vIGNvbW1pdCBwcmVtYXR1cmVseVxyXG4gICAgICAgIGlmIChhY3RpdmVOb2RlICYmIGFjdGl2ZU5vZGUuY29udGFpbnModGFyZ2V0KSAmJiB0aGlzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIHdoYXQgb3VyIGludGVybmFsIFBvc3QgUHJvY2VzcyBjYWxsYmFjaywgaXQgd2lsbCBleGVjdXRlIGludGVybmFsbHkgYWZ0ZXIgd2UgZ2V0IGJhY2sgcmVzdWx0IGZyb20gdGhlIFByb2Nlc3MgYmFja2VuZCBjYWxsXHJcbiAgICogRm9yIG5vdywgdGhpcyBpcyBHcmFwaFFMIFNlcnZpY2Ugb25seSBmZWF0dXJlIGFuZCBpdCB3aWxsIGJhc2ljYWxseSByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiB3aXRob3V0IGhhdmluZyB0aGUgdXNlciB0byBjcmVhdGUgaGlzIG93biBQb3N0UHJvY2VzcyBldmVyeSB0aW1lXHJcbiAgICovXHJcbiAgY3JlYXRlQmFja2VuZEFwaUludGVybmFsUG9zdFByb2Nlc3NDYWxsYmFjayhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICAgIC8vIGludGVybmFsUG9zdFByb2Nlc3Mgb25seSB3b3JrcyB3aXRoIGEgR3JhcGhRTCBTZXJ2aWNlLCBzbyBtYWtlIHN1cmUgaXQgaXMgdGhhdCB0eXBlXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgaW5zdGFuY2VvZiBHcmFwaHFsU2VydmljZSkge1xyXG4gICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2VzcyA9IChwcm9jZXNzUmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGFzZXROYW1lID0gKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIHR5cGVvZiBiYWNrZW5kQXBpLnNlcnZpY2UuZ2V0RGF0YXNldE5hbWUgPT09ICdmdW5jdGlvbicpID8gYmFja2VuZEFwaS5zZXJ2aWNlLmdldERhdGFzZXROYW1lKCkgOiAnJztcclxuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIHByb2Nlc3NSZXN1bHQuZGF0YSAmJiBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFzZXQgPSBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdLm5vZGVzO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hHcmlkRGF0YSh0aGlzLl9kYXRhc2V0LCBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdLnRvdGFsQ291bnQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YXNldCA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaERpZmZlcmVudEhvb2tzKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24sIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIC8vIG9uIGxvY2FsZSBjaGFuZ2UsIHdlIGhhdmUgdG8gbWFudWFsbHkgdHJhbnNsYXRlIHRoZSBIZWFkZXJzLCBHcmlkTWVudVxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMudHJhbnNsYXRlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5QaWNrZXIoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVHcmlkTWVudSgpO1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUhlYWRlck1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIENvbHVtbnMgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgZ3JpZFxyXG4gICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLmNvbHVtbnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuY29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zOiBDb2x1bW5bXSA9IHRoaXMuZ3JpZFN0YXRlU2VydmljZS5nZXRBc3NvY2lhdGVkR3JpZENvbHVtbnMoZ3JpZCwgZ3JpZE9wdGlvbnMucHJlc2V0cy5jb2x1bW5zKTtcclxuICAgICAgaWYgKGdyaWRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoZ3JpZENvbHVtbnMpICYmIGdyaWRDb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgY2hlY2tib3ggc2VsZWN0b3IgaXMgYWxzbyB2aXNpYmxlIGlmIGl0IGlzIGVuYWJsZWRcclxuICAgICAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICAgICAgY29uc3QgY2hlY2tib3hDb2x1bW4gPSAoQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykgJiYgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMubGVuZ3RoID4gMCkgPyB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1swXSA6IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2hlY2tib3hDb2x1bW4gJiYgY2hlY2tib3hDb2x1bW4uaWQgPT09ICdfY2hlY2tib3hfc2VsZWN0b3InICYmIGdyaWRDb2x1bW5zWzBdLmlkICE9PSAnX2NoZWNrYm94X3NlbGVjdG9yJykge1xyXG4gICAgICAgICAgICBncmlkQ29sdW1ucy51bnNoaWZ0KGNoZWNrYm94Q29sdW1uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZpbmFsbHkgc2V0IHRoZSBuZXcgcHJlc2V0cyBjb2x1bW5zIChpbmNsdWRpbmcgY2hlY2tib3ggc2VsZWN0b3IgaWYgbmVlZCBiZSlcclxuICAgICAgICBncmlkLnNldENvbHVtbnMoZ3JpZENvbHVtbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXR0YWNoIGV4dGVybmFsIHNvcnRpbmcgKGJhY2tlbmQpIHdoZW4gYXZhaWxhYmxlIG9yIGRlZmF1bHQgb25Tb3J0IChkYXRhVmlldylcclxuICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVTb3J0aW5nICYmICF0aGlzLmN1c3RvbURhdGFWaWV3KSB7XHJcbiAgICAgIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpID8gdGhpcy5zb3J0U2VydmljZS5hdHRhY2hCYWNrZW5kT25Tb3J0KGdyaWQsIGRhdGFWaWV3KSA6IHRoaXMuc29ydFNlcnZpY2UuYXR0YWNoTG9jYWxPblNvcnQoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBleHRlcm5hbCBmaWx0ZXIgKGJhY2tlbmQpIHdoZW4gYXZhaWxhYmxlIG9yIGRlZmF1bHQgb25GaWx0ZXIgKGRhdGFWaWV3KVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhdGhpcy5jdXN0b21EYXRhVmlldykge1xyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuaW5pdChncmlkKTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIFwicHJlc2V0c1wiLCB3ZSBuZWVkIHRvIHJlZmxlY3QgdGhlbSBhbGwgaW4gdGhlIERPTVxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycykgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLmZpbHRlclNlcnZpY2UucG9wdWxhdGVDb2x1bW5GaWx0ZXJTZWFyY2hUZXJtcygpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpID8gdGhpcy5maWx0ZXJTZXJ2aWNlLmF0dGFjaEJhY2tlbmRPbkZpbHRlcihncmlkKSA6IHRoaXMuZmlsdGVyU2VydmljZS5hdHRhY2hMb2NhbE9uRmlsdGVyKGdyaWQsIHRoaXMuX2RhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB1c2VyIHNldCBhbiBvbkluaXQgQmFja2VuZCwgd2UnbGwgcnVuIGl0IHJpZ2h0IGF3YXkgKGFuZCBpZiBzbywgd2UgYWxzbyBuZWVkIHRvIHJ1biBwcmVQcm9jZXNzLCBpbnRlcm5hbFBvc3RQcm9jZXNzICYgcG9zdFByb2Nlc3MpXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIGJhY2tlbmRBcGkuc2VydmljZS5pbml0KSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5zZXJ2aWNlLmluaXQoYmFja2VuZEFwaS5vcHRpb25zLCBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLCB0aGlzLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwb3NlIGFsbCBTbGljayBHcmlkIEV2ZW50cyB0aHJvdWdoIGRpc3BhdGNoXHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gZ3JpZCkge1xyXG4gICAgICBpZiAoZ3JpZC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm9wLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWRbcHJvcF0sIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChgJHtzbGlja2dyaWRFdmVudFByZWZpeH0ke3RpdGxlQ2FzZShwcm9wKX1gLCB7IGV2ZW50RGF0YTogZSwgYXJncyB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBhbGwgU2xpY2sgRGF0YVZpZXcgRXZlbnRzIHRocm91Z2ggZGlzcGF0Y2hcclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBkYXRhVmlldykge1xyXG4gICAgICBpZiAoZGF0YVZpZXcuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcC5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlld1twcm9wXSwgKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KGAke3NsaWNrZ3JpZEV2ZW50UHJlZml4fSR7dGl0bGVDYXNlKHByb3ApfWAsIHsgZXZlbnREYXRhOiBlLCBhcmdzIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwb3NlIEdyaWRTdGF0ZSBTZXJ2aWNlIGNoYW5nZXMgZXZlbnQgdGhyb3VnaCBkaXNwYXRjaFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5vbkdyaWRTdGF0ZUNoYW5nZWQuc3Vic2NyaWJlKChncmlkU3RhdGVDaGFuZ2U6IEdyaWRTdGF0ZUNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLmVtaXQoZ3JpZFN0YXRlQ2hhbmdlKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG5cclxuICAgIC8vIG9uIGNlbGwgY2xpY2ssIG1haW5seSB1c2VkIHdpdGggdGhlIGNvbHVtbkRlZi5hY3Rpb24gY2FsbGJhY2tcclxuICAgIHRoaXMuZ3JpZEV2ZW50U2VydmljZS5hdHRhY2hPbkNlbGxDaGFuZ2UoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgdGhpcy5ncmlkRXZlbnRTZXJ2aWNlLmF0dGFjaE9uQ2xpY2soZ3JpZCwgZGF0YVZpZXcpO1xyXG5cclxuICAgIGlmIChkYXRhVmlldyAmJiBncmlkKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dDb3VudENoYW5nZWQsIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGdyaWQudXBkYXRlUm93Q291bnQoKTtcclxuICAgICAgICBncmlkLnJlbmRlcigpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlldy5vblJvd3NDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICBncmlkLmludmFsaWRhdGVSb3dzKGFyZ3Mucm93cyk7XHJcbiAgICAgICAgZ3JpZC5yZW5kZXIoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9lcyB0aGUgdXNlciBoYXZlIGEgY29sc3BhbiBjYWxsYmFjaz9cclxuICAgIGlmIChncmlkT3B0aW9ucy5jb2xzcGFuQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbU1ldGFkYXRhID0gKHJvd051bWJlcjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2RhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gZ3JpZE9wdGlvbnMuY29sc3BhbkNhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoQmFja2VuZENhbGxiYWNrRnVuY3Rpb25zKGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBjb25zdCBzZXJ2aWNlT3B0aW9uczogQmFja2VuZFNlcnZpY2VPcHRpb24gPSAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgJiYgYmFja2VuZEFwaS5zZXJ2aWNlLm9wdGlvbnMpID8gYmFja2VuZEFwaS5zZXJ2aWNlLm9wdGlvbnMgOiB7fTtcclxuICAgIGNvbnN0IGlzRXhlY3V0ZUNvbW1hbmRPbkluaXQgPSAoIXNlcnZpY2VPcHRpb25zKSA/IGZhbHNlIDogKChzZXJ2aWNlT3B0aW9ucyAmJiBzZXJ2aWNlT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXhlY3V0ZVByb2Nlc3NDb21tYW5kT25Jbml0JykpID8gc2VydmljZU9wdGlvbnNbJ2V4ZWN1dGVQcm9jZXNzQ29tbWFuZE9uSW5pdCddIDogdHJ1ZSk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGJhY2tlbmQgZmlsdGVycyAoaWYgbmVlZCBiZSkgYmVmb3JlIHRoZSBxdWVyeSBydW5zXHJcbiAgICBpZiAoYmFja2VuZEFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IGJhY2tlbmRBcGkuc2VydmljZTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIGFueSBcInByZXNldHNcIiwgd2UgbmVlZCB0byByZWZsZWN0IHRoZW0gYWxsIGluIHRoZSBncmlkXHJcbiAgICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5wcmVzZXRzKSB7XHJcbiAgICAgICAgIC8vIEZpbHRlcnMgXCJwcmVzZXRzXCJcclxuICAgICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBiYWNrZW5kU2VydmljZS51cGRhdGVGaWx0ZXJzKGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNvcnRlcnMgXCJwcmVzZXRzXCJcclxuICAgICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlU29ydGVycyAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycykgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZVNvcnRlcnModW5kZWZpbmVkLCBncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQYWdpbmF0aW9uIFwicHJlc2V0c1wiXHJcbiAgICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZVBhZ2luYXRpb24gJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uKSB7XHJcbiAgICAgICAgICBiYWNrZW5kU2VydmljZS51cGRhdGVQYWdpbmF0aW9uKGdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlTnVtYmVyLCBncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24ucGFnZVNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXJzID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmdldENvbHVtbkZpbHRlcnMoKTtcclxuICAgICAgICBpZiAoY29sdW1uRmlsdGVycyAmJiBiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVGaWx0ZXJzKSB7XHJcbiAgICAgICAgICBiYWNrZW5kU2VydmljZS51cGRhdGVGaWx0ZXJzKGNvbHVtbkZpbHRlcnMsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgJiYgKGJhY2tlbmRBcGkub25Jbml0IHx8IGlzRXhlY3V0ZUNvbW1hbmRPbkluaXQpKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gKHR5cGVvZiBiYWNrZW5kQXBpLnNlcnZpY2UuYnVpbGRRdWVyeSA9PT0gJ2Z1bmN0aW9uJykgPyBiYWNrZW5kQXBpLnNlcnZpY2UuYnVpbGRRdWVyeSgpIDogJyc7XHJcbiAgICAgIGNvbnN0IG9ic2VydmFibGVPclByb21pc2UgPSAoaXNFeGVjdXRlQ29tbWFuZE9uSW5pdCkgPyBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpIDogYmFja2VuZEFwaS5vbkluaXQocXVlcnkpO1xyXG5cclxuICAgICAgLy8gd3JhcCB0aGlzIGluc2lkZSBhIHNldFRpbWVvdXQgdG8gYXZvaWQgdGltaW5nIGlzc3VlIHNpbmNlIHRoZSBncmlkT3B0aW9ucyBuZWVkcyB0byBiZSByZWFkeSBiZWZvcmUgcnVubmluZyB0aGlzIG9uSW5pdFxyXG4gICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcclxuICAgICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIHRoZSBwcm9jZXNzIGNvdWxkIGJlIGFuIE9ic2VydmFibGUgKGxpa2UgSHR0cENsaWVudCkgb3IgYSBQcm9taXNlXHJcbiAgICAgICAgICAvLyBpbiBhbnkgY2FzZSwgd2UgbmVlZCB0byBoYXZlIGEgUHJvbWlzZSBzbyB0aGF0IHdlIGNhbiBhd2FpdCBvbiBpdCAoaWYgYW4gT2JzZXJ2YWJsZSwgY29udmVydCBpdCB0byBQcm9taXNlKVxyXG4gICAgICAgICAgY29uc3QgcHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSA9IGF3YWl0IGNhc3RUb1Byb21pc2Uob2JzZXJ2YWJsZU9yUHJvbWlzZSk7XHJcbiAgICAgICAgICBjb25zdCBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAvLyBkZWZpbmUgd2hhdCBvdXIgaW50ZXJuYWwgUG9zdCBQcm9jZXNzIGNhbGxiYWNrLCBvbmx5IGF2YWlsYWJsZSBmb3IgR3JhcGhRTCBTZXJ2aWNlIGZvciBub3dcclxuICAgICAgICAgIC8vIGl0IHdpbGwgYmFzaWNhbGx5IHJlZnJlc2ggdGhlIERhdGFzZXQgJiBQYWdpbmF0aW9uIHdpdGhvdXQgaGF2aW5nIHRoZSB1c2VyIHRvIGNyZWF0ZSBoaXMgb3duIFBvc3RQcm9jZXNzIGV2ZXJ5IHRpbWVcclxuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlIGluc3RhbmNlb2YgR3JhcGhxbFNlcnZpY2UgJiYgYmFja2VuZEFwaS5pbnRlcm5hbFBvc3RQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBzZW5kIHRoZSByZXNwb25zZSBwcm9jZXNzIHRvIHRoZSBwb3N0UHJvY2VzcyBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKGJhY2tlbmRBcGkucG9zdFByb2Nlc3MpIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICBwcm9jZXNzUmVzdWx0LnN0YXRpc3RpY3MgPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICBlbmRUaW1lLFxyXG4gICAgICAgICAgICAgICAgZXhlY3V0aW9uVGltZTogZW5kVGltZS52YWx1ZU9mKCkgLSBzdGFydFRpbWUudmFsdWVPZigpLFxyXG4gICAgICAgICAgICAgICAgdG90YWxJdGVtQ291bnQ6IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYWNrZW5kQXBpLnBvc3RQcm9jZXNzKHByb2Nlc3NSZXN1bHQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkub25FcnJvcikge1xyXG4gICAgICAgICAgICBiYWNrZW5kQXBpLm9uRXJyb3IoZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hSZXNpemVIb29rKGdyaWQ6IGFueSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgLy8gZXhwYW5kL2F1dG9maXQgY29sdW1ucyBvbiBmaXJzdCBwYWdlIGxvYWRcclxuICAgIGlmIChncmlkICYmIG9wdGlvbnMuYXV0b0ZpdENvbHVtbnNPbkZpcnN0TG9hZCAmJiBvcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICBncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG5cclxuICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdCAob25seSBzZWVtcyB0byBoYXBwZW4gaW4gQ2hyb21lIDEvNSBjb21wdXRlcnMpXHJcbiAgICAgIHRoaXMucmVzaXplci5jb21wZW5zYXRlSG9yaXpvbnRhbFNjcm9sbCh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1dG8tcmVzaXplIGdyaWQgb24gYnJvd3NlciByZXNpemVcclxuICAgIGlmICh0aGlzLl9maXhlZEhlaWdodCB8fCB0aGlzLl9maXhlZFdpZHRoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplci5pbml0KGdyaWQsIHsgaGVpZ2h0OiB0aGlzLl9maXhlZEhlaWdodCwgd2lkdGg6IHRoaXMuX2ZpeGVkV2lkdGggfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2l6ZXIuaW5pdChncmlkKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUF1dG9SZXNpemUpIHtcclxuICAgICAgdGhpcy5yZXNpemVyLmF0dGFjaEF1dG9SZXNpemVEYXRhR3JpZCgpO1xyXG4gICAgICBpZiAoZ3JpZCAmJiBvcHRpb25zLmF1dG9GaXRDb2x1bW5zT25GaXJzdExvYWQgJiYgb3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICBncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleGVjdXRlQWZ0ZXJEYXRhdmlld0NyZWF0ZWQoZ3JpZDogYW55LCBncmlkT3B0aW9uczogR3JpZE9wdGlvbiwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgLy8gaWYgdXNlciBlbnRlcmVkIHNvbWUgU29ydCBcInByZXNldHNcIiwgd2UgbmVlZCB0byByZWZsZWN0IHRoZW0gYWxsIGluIHRoZSBET01cclxuICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVTb3J0aW5nKSB7XHJcbiAgICAgIGlmIChncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuc29ydFNlcnZpY2UubG9hZExvY2FsUHJlc2V0cyhncmlkLCBkYXRhVmlldyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1lcmdlR3JpZE9wdGlvbnMoZ3JpZE9wdGlvbnMpOiBHcmlkT3B0aW9uIHtcclxuICAgIGdyaWRPcHRpb25zLmdyaWRJZCA9IHRoaXMuZ3JpZElkO1xyXG4gICAgZ3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkID0gYHNsaWNrR3JpZENvbnRhaW5lci0ke3RoaXMuZ3JpZElkfWA7XHJcblxyXG4gICAgLy8gdXNlIGpxdWVyeSBleHRlbmQgdG8gZGVlcCBtZXJnZSAmIGNvcHkgdG8gYXZvaWQgaW1tdXRhYmxlIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCBpbiBHbG9iYWxHcmlkT3B0aW9ucyBhZnRlciBhIHJvdXRlIGNoYW5nZVxyXG4gICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBHbG9iYWxHcmlkT3B0aW9ucywgdGhpcy5mb3JSb290Q29uZmlnLCBncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdG8gc2hvdyB0aGUgaGVhZGVyIHJvdyBpZiB1c2VyIGhhdmUgZW5hYmxlZCBmaWx0ZXJpbmdcclxuICAgIHRoaXMuX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkID0gKG9wdGlvbnMuc2hvd0hlYWRlclJvdyA9PT0gZmFsc2UpO1xyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nICYmICFvcHRpb25zLnNob3dIZWFkZXJSb3cpIHtcclxuICAgICAgb3B0aW9ucy5zaG93SGVhZGVyUm93ID0gb3B0aW9ucy5lbmFibGVGaWx0ZXJpbmc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGEgUGFnaW5hdGlvbiBjaGFuZ2VkLCB3ZSB3aWxsIHRyaWdnZXIgYSBHcmlkIFN0YXRlIGNoYW5nZWQgd2l0aCB0aGUgbmV3IHBhZ2luYXRpb24gaW5mb1xyXG4gICAqIEFsc28gaWYgd2UgdXNlIFJvdyBTZWxlY3Rpb24gb3IgdGhlIENoZWNrYm94IFNlbGVjdG9yLCB3ZSBuZWVkIHRvIHJlc2V0IGFueSBzZWxlY3Rpb25cclxuICAgKi9cclxuICBwYWdpbmF0aW9uQ2hhbmdlZChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24gfHwgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMuZ3JpZFNlcnZpY2Uuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2Uub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoe1xyXG4gICAgICBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBwYWdpbmF0aW9uLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnBhZ2luYXRpb24gfSxcclxuICAgICAgZ3JpZFN0YXRlOiB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZGF0YXNldCBjaGFuZ2VzLCB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIGVudGlyZSBncmlkIFVJICYgcG9zc2libHkgcmVzaXplIGl0IGFzIHdlbGxcclxuICAgKiBAcGFyYW0gZGF0YXNldFxyXG4gICAqL1xyXG4gIHJlZnJlc2hHcmlkRGF0YShkYXRhc2V0OiBhbnlbXSwgdG90YWxDb3VudD86IG51bWJlcikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YXNldCkgJiYgdGhpcy5ncmlkICYmIHRoaXMuX2RhdGFWaWV3ICYmIHR5cGVvZiB0aGlzLl9kYXRhVmlldy5zZXRJdGVtcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy5zZXRJdGVtcyhkYXRhc2V0LCB0aGlzLmdyaWRPcHRpb25zLmRhdGFzZXRJZFByb3BlcnR5TmFtZSk7XHJcbiAgICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFWaWV3LnJlU29ydCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0aGlzLmdyaWQuc2V0RGF0YShkYXRhc2V0KTtcclxuICAgICAgdGhpcy5ncmlkLmludmFsaWRhdGUoKTtcclxuICAgICAgdGhpcy5ncmlkLnJlbmRlcigpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICAvLyBkbyB3ZSB3YW50IHRvIHNob3cgcGFnaW5hdGlvbj9cclxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgYmFja2VuZFNlcnZpY2VBcGkgYW5kIHRoZSBlbmFibGVQYWdpbmF0aW9uIGlzIHVuZGVmaW5lZCwgd2UnbGwgYXNzdW1lIHRoYXQgd2UgZG8gd2FudCB0byBzZWUgaXQsIGVsc2UgZ2V0IHRoYXQgZGVmaW5lZCB2YWx1ZVxyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2luYXRpb24gPSAoKHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgJiYgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uID09PSB1bmRlZmluZWQpID8gdHJ1ZSA6IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbikgfHwgZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGJlZm9yZSBtZXJnaW5nIHRoZSBncmlkIG9wdGlvbnMsIG1ha2Ugc3VyZSB0aGF0IGl0IGhhcyB0aGUgdG90YWxJdGVtcyBjb3VudFxyXG4gICAgICAgIC8vIG9uY2Ugd2UgaGF2ZSB0aGF0LCB3ZSBjYW4gbWVyZ2UgYW5kIHBhc3MgYWxsIHRoZXNlIG9wdGlvbnMgdG8gdGhlIHBhZ2luYXRpb24gY29tcG9uZW50XHJcbiAgICAgICAgaWYgKCF0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24pIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiA9ICh0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24pID8gdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIHRvdGFsQ291bnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXMgPSB0b3RhbENvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5wcmVzZXRzICYmIHRoaXMuZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uICYmIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplID0gdGhpcy5ncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24ucGFnZVNpemU7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZU51bWJlciA9IHRoaXMuZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VOdW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JpZFBhZ2luYXRpb25PcHRpb25zID0gdGhpcy5tZXJnZUdyaWRPcHRpb25zKHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyByZXNpemUgdGhlIGdyaWQgaW5zaWRlIGEgc2xpZ2h0IHRpbWVvdXQsIGluIGNhc2Ugb3RoZXIgRE9NIGVsZW1lbnQgY2hhbmdlZCBwcmlvciB0byB0aGUgcmVzaXplIChsaWtlIGEgZmlsdGVyL3BhZ2luYXRpb24gY2hhbmdlZClcclxuICAgICAgaWYgKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9SZXNpemUpIHtcclxuICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuZ3JpZE9wdGlvbnMuYXV0b1Jlc2l6ZSAmJiB0aGlzLmdyaWRPcHRpb25zLmF1dG9SZXNpemUuZGVsYXk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVyLnJlc2l6ZUdyaWQoZGVsYXkgfHwgMTApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEeW5hbWljYWxseSBjaGFuZ2Ugb3IgdXBkYXRlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgbGlzdC5cclxuICAgKiBXZSB3aWxsIHJlLXJlbmRlciB0aGUgZ3JpZCBzbyB0aGF0IHRoZSBuZXcgaGVhZGVyIGFuZCBkYXRhIHNob3dzIHVwIGNvcnJlY3RseS5cclxuICAgKiBJZiB1c2luZyBpMThuLCB3ZSBhbHNvIG5lZWQgdG8gdHJpZ2dlciBhIHJlLXRyYW5zbGF0ZSBvZiB0aGUgY29sdW1uIGhlYWRlcnNcclxuICAgKi9cclxuICB1cGRhdGVDb2x1bW5EZWZpbml0aW9uc0xpc3QobmV3Q29sdW1uRGVmaW5pdGlvbnMpIHtcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlQ29sdW1uSGVhZGVycyhmYWxzZSwgbmV3Q29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnJlbmRlckNvbHVtbkhlYWRlcnMobmV3Q29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUb2dnbGUgdGhlIGZpbHRlciByb3cgZGlzcGxheWVkIG9uIGZpcnN0IHJvd1xyXG4gICAqIEBwYXJhbSBpc1Nob3dpbmdcclxuICAgKi9cclxuICBzaG93SGVhZGVyUm93KGlzU2hvd2luZzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5ncmlkLnNldEhlYWRlclJvd1Zpc2liaWxpdHkoaXNTaG93aW5nKTtcclxuICAgIHJldHVybiBpc1Nob3dpbmc7XHJcbiAgfVxyXG5cclxuICAvKiogVG9nZ2xlIHRoZSBmaWx0ZXIgcm93IGRpc3BsYXllZCBvbiBmaXJzdCByb3cgKi9cclxuICB0b2dnbGVIZWFkZXJSb3coKSB7XHJcbiAgICBjb25zdCBpc1Nob3dpbmcgPSAhdGhpcy5ncmlkLmdldE9wdGlvbnMoKS5zaG93SGVhZGVyUm93O1xyXG4gICAgdGhpcy5ncmlkLnNldEhlYWRlclJvd1Zpc2liaWxpdHkoaXNTaG93aW5nKTtcclxuICAgIHJldHVybiBpc1Nob3dpbmc7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBEaXNwYXRjaCBvZiBDdXN0b20gRXZlbnQsIHdoaWNoIGJ5IGRlZmF1bHQgd2lsbCBidWJibGUgJiBpcyBjYW5jZWxhYmxlICovXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaEN1c3RvbUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBpc0J1YmJsaW5nOiBib29sZWFuID0gdHJ1ZSwgaXNDYW5jZWxhYmxlOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgZXZlbnRJbml0OiBDdXN0b21FdmVudEluaXQgPSB7IGJ1YmJsZXM6IGlzQnViYmxpbmcsIGNhbmNlbGFibGU6IGlzQ2FuY2VsYWJsZSB9O1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgZXZlbnRJbml0LmRldGFpbCA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIGV2ZW50SW5pdCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqIExvYWQgdGhlIEVkaXRvciBDb2xsZWN0aW9uIGFzeW5jaHJvbm91c2x5IGFuZCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25cIiBwcm9wZXJ0eSB3aGVuIE9ic2VydmFibGUgcmVzb2x2ZXMgKi9cclxuICBwcml2YXRlIGxvYWRFZGl0b3JDb2xsZWN0aW9uQXN5bmMoY29sdW1uOiBDb2x1bW4pIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb25Bc3luYyA9IGNvbHVtbiAmJiBjb2x1bW4uZWRpdG9yICYmIGNvbHVtbi5lZGl0b3IuY29sbGVjdGlvbkFzeW5jO1xyXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYyBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgY29sbGVjdGlvbkFzeW5jLnN1YnNjcmliZSgocmVzb2x2ZWRDb2xsZWN0aW9uKSA9PiB0aGlzLnVwZGF0ZUVkaXRvckNvbGxlY3Rpb24oY29sdW1uLCByZXNvbHZlZENvbGxlY3Rpb24pKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBFZGl0b3IgXCJjb2xsZWN0aW9uXCIgcHJvcGVydHkgZnJvbSBhbiBhc3luYyBjYWxsIHJlc29sdmVkXHJcbiAgICogU2luY2UgdGhpcyBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGFzeW5jIGNhbGwgcmVzb2x2ZXMsIHRoZSBwb2ludGVyIHdpbGwgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSBcImNvbHVtblwiIGFyZ3VtZW50IHBhc3NlZC5cclxuICAgKiBPbmNlIHdlIGZvdW5kIHRoZSBuZXcgcG9pbnRlciwgd2Ugd2lsbCByZWFzc2lnbiB0aGUgXCJlZGl0b3JcIiBhbmQgXCJjb2xsZWN0aW9uXCIgdG8gdGhlIFwiaW50ZXJuYWxDb2x1bW5FZGl0b3JcIiBzbyBpdCBoYXMgbmV3ZXN0IGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUVkaXRvckNvbGxlY3Rpb24oY29sdW1uOiBDb2x1bW4sIG5ld0NvbGxlY3Rpb246IGFueVtdKSB7XHJcbiAgICBjb2x1bW4uZWRpdG9yLmNvbGxlY3Rpb24gPSBuZXdDb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIGZpbmQgdGhlIG5ldyBjb2x1bW4gcmVmZXJlbmNlIHBvaW50ZXJcclxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdyaWQuZ2V0Q29sdW1ucygpO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykpIHtcclxuICAgICAgY29uc3QgY29sdW1uUmVmOiBDb2x1bW4gPSBjb2x1bW5zLmZpbmQoKGNvbDogQ29sdW1uKSA9PiBjb2wuaWQgPT09IGNvbHVtbi5pZCk7XHJcbiAgICAgIGNvbHVtblJlZi5pbnRlcm5hbENvbHVtbkVkaXRvciA9IGNvbHVtbi5lZGl0b3I7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==