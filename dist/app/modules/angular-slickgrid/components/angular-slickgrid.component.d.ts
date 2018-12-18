import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularGridInstance, Column, GridOption, GridStateChange, Pagination } from './../models/index';
import { Subscription } from 'rxjs';
import { ExportService } from './../services/export.service';
import { ExtensionService } from '../services/extension.service';
import { ExtensionUtility } from '../extensions/extensionUtility';
import { FilterService } from './../services/filter.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { ResizerService } from './../services/resizer.service';
import { SharedService } from '../services/shared.service';
import { SortService } from './../services/sort.service';
export declare class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
    private elm;
    private exportService;
    private extensionService;
    private extensionUtility;
    private filterService;
    private gridService;
    private gridEventService;
    private gridStateService;
    private groupingAndColspanService;
    private resizer;
    private sharedService;
    private sortService;
    private translate;
    private forRootConfig;
    private _dataset;
    private _columnDefinitions;
    private _dataView;
    private _eventHandler;
    private _fixedHeight;
    private _fixedWidth;
    private _hideHeaderRowAfterPageLoad;
    grid: any;
    gridPaginationOptions: GridOption;
    gridHeightString: string;
    gridWidthString: string;
    groupingDefinition: any;
    groupItemMetadataProvider: any;
    showPagination: boolean;
    isGridInitialized: boolean;
    subscriptions: Subscription[];
    onAngularGridCreated: EventEmitter<AngularGridInstance>;
    onDataviewCreated: EventEmitter<any>;
    onGridCreated: EventEmitter<any>;
    onGridInitialized: EventEmitter<any>;
    onBeforeGridCreate: EventEmitter<boolean>;
    onBeforeGridDestroy: EventEmitter<any>;
    onAfterGridDestroyed: EventEmitter<boolean>;
    onGridStateChanged: EventEmitter<GridStateChange>;
    customDataView: any;
    gridId: string;
    gridOptions: GridOption;
    gridHeight: number;
    gridWidth: number;
    columnDefinitions: Column[];
    dataset: any[];
    constructor(elm: ElementRef, exportService: ExportService, extensionService: ExtensionService, extensionUtility: ExtensionUtility, filterService: FilterService, gridService: GridService, gridEventService: GridEventService, gridStateService: GridStateService, groupingAndColspanService: GroupingAndColspanService, resizer: ResizerService, sharedService: SharedService, sortService: SortService, translate: TranslateService, forRootConfig: GridOption);
    ngOnInit(): void;
    ngOnDestroy(): void;
    destroy(emptyDomElementContainer?: boolean): void;
    ngAfterViewInit(): void;
    initialization(): void;
    /**
     * Commits the current edit to the grid
     */
    commitEdit(target: Element): void;
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    createBackendApiInternalPostProcessCallback(gridOptions: GridOption): void;
    attachDifferentHooks(grid: any, gridOptions: GridOption, dataView: any): void;
    attachBackendCallbackFunctions(gridOptions: GridOption): void;
    attachResizeHook(grid: any, options: GridOption): void;
    executeAfterDataviewCreated(grid: any, gridOptions: GridOption, dataView: any): void;
    mergeGridOptions(gridOptions: any): GridOption;
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     */
    paginationChanged(pagination: Pagination): void;
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param dataset
     */
    refreshGridData(dataset: any[], totalCount?: number): void;
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     */
    updateColumnDefinitionsList(newColumnDefinitions: any): void;
    /** Toggle the filter row displayed on first row
     * @param isShowing
     */
    showHeaderRow(isShowing: boolean): boolean;
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow(): boolean;
    /** Dispatch of Custom Event, which by default will bubble & is cancelable */
    private dispatchCustomEvent;
    /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
    private loadEditorCollectionAsync;
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     */
    private updateEditorCollection;
}
