import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.groupitemmetadataprovider';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { AfterViewInit, EventEmitter, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularGridInstance, Column, GridOption, GridStateChange, Pagination } from './../models/index';
import { ControlAndPluginService } from './../services/controlAndPlugin.service';
import { ExportService } from './../services/export.service';
import { FilterService } from './../services/filter.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { ResizerService } from './../services/resizer.service';
import { SortService } from './../services/sort.service';
import { Subscription } from 'rxjs/Subscription';
export declare class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
    private controlAndPluginService;
    private elm;
    private exportService;
    private filterService;
    private gridService;
    private gridEventService;
    private gridStateService;
    private groupingAndColspanService;
    private resizer;
    private sortService;
    private translate;
    private forRootConfig;
    private _dataset;
    private _columnDefinitions;
    private _dataView;
    private _eventHandler;
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
    gridId: string;
    gridOptions: GridOption;
    gridHeight: number;
    gridWidth: number;
    columnDefinitions: Column[];
    dataset: any[];
    constructor(controlAndPluginService: ControlAndPluginService, elm: ElementRef, exportService: ExportService, filterService: FilterService, gridService: GridService, gridEventService: GridEventService, gridStateService: GridStateService, groupingAndColspanService: GroupingAndColspanService, resizer: ResizerService, sortService: SortService, translate: TranslateService, forRootConfig: GridOption);
    ngOnInit(): void;
    ngOnDestroy(): void;
    destroy(emptyDomElementContainer?: boolean): void;
    ngAfterViewInit(): void;
    initialization(): void;
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feautre and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    createBackendApiInternalPostProcessCallback(gridOptions: GridOption): void;
    attachDifferentHooks(grid: any, gridOptions: GridOption, dataView: any): void;
    attachBackendCallbackFunctions(gridOptions: GridOption): void;
    attachResizeHook(grid: any, options: GridOption): void;
    executeAfterDataviewCreated(grid: any, gridOptions: GridOption, dataView: any): void;
    mergeGridOptions(gridOptions: any): GridOption;
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection, we need to reset them to nothing selected
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
    private dispatchCustomEvent(eventName, data?, isBubbling?, isCancelable?);
}
