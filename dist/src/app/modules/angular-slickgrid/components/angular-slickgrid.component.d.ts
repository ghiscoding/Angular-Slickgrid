import 'slickgrid/lib/jquery-ui-1.11.3';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellcopymanager';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { AfterViewInit, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Column, GridOption } from './../models';
import { ControlAndPluginService } from './../services/controlAndPlugin.service';
import { ExportService } from './../services/export.service';
import { FilterService } from './../services/filter.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridExtraService } from './../services/gridExtra.service';
import { ResizerService } from './../services/resizer.service';
import { SortService } from './../services/sort.service';
import { TranslateService } from '@ngx-translate/core';
export declare class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
    private controlAndPluginService;
    private exportService;
    private filterService;
    private gridExtraService;
    private gridEventService;
    private resizer;
    private sortService;
    private translate;
    private forRootConfig;
    private _dataset;
    private _dataView;
    private _gridOptions;
    grid: any;
    gridPaginationOptions: GridOption;
    gridHeightString: string;
    gridWidthString: string;
    groupingDefinition: any;
    showPagination: boolean;
    dataviewChanged: EventEmitter<any>;
    gridChanged: EventEmitter<any>;
    onDataviewCreated: EventEmitter<any>;
    onGridCreated: EventEmitter<any>;
    onBeforeGridCreate: EventEmitter<boolean>;
    onBeforeGridDestroy: EventEmitter<any>;
    onAfterGridDestroyed: EventEmitter<boolean>;
    gridId: string;
    columnDefinitions: Column[];
    gridOptions: GridOption;
    gridHeight: number;
    gridWidth: number;
    dataset: any[];
    constructor(controlAndPluginService: ControlAndPluginService, exportService: ExportService, filterService: FilterService, gridExtraService: GridExtraService, gridEventService: GridEventService, resizer: ResizerService, sortService: SortService, translate: TranslateService, forRootConfig: GridOption);
    ngOnInit(): void;
    ngOnDestroy(): void;
    destroy(): void;
    ngAfterViewInit(): void;
    /**
     * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service only feautre and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    createBackendApiInternalPostProcessCallback(gridOptions: GridOption): void;
    attachDifferentHooks(grid: any, gridOptions: GridOption, dataView: any): void;
    attachResizeHook(grid: any, options: GridOption): void;
    mergeGridOptions(): GridOption;
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param dataset
     */
    refreshGridData(dataset: any[], totalCount?: number): void;
    /** Toggle the filter row displayed on first row
     * @param isShowing
     */
    showHeaderRow(isShowing: boolean): boolean;
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow(): boolean;
}
