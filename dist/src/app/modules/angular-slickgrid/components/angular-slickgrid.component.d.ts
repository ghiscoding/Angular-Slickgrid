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
import { FilterService } from './../services/filter.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridExtraService } from './../services/gridExtra.service';
import { ResizerService } from './../services/resizer.service';
import { SortService } from './../services/sort.service';
import { TranslateService } from '@ngx-translate/core';
export declare class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
    private filterService;
    private sortService;
    private gridExtraService;
    private gridEventService;
    private resizer;
    private controlAndPluginService;
    private translate;
    private _dataset;
    private _dataView;
    private _gridOptions;
    grid: any;
    gridPaginationOptions: GridOption;
    gridHeightString: string;
    gridWidthString: string;
    showPagination: boolean;
    dataviewChanged: EventEmitter<any>;
    gridChanged: EventEmitter<any>;
    onDataviewCreated: EventEmitter<any>;
    onGridCreated: EventEmitter<any>;
    onBeforeGridCreate: EventEmitter<boolean>;
    onBeforeGridDestroy: EventEmitter<any>;
    onGridDestroyed: EventEmitter<boolean>;
    gridId: string;
    columnDefinitions: Column[];
    gridOptions: GridOption;
    gridHeight: number;
    gridWidth: number;
    dataset: any[];
    constructor(filterService: FilterService, sortService: SortService, gridExtraService: GridExtraService, gridEventService: GridEventService, resizer: ResizerService, controlAndPluginService: ControlAndPluginService, translate: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    destroy(): void;
    ngAfterViewInit(): void;
    attachDifferentHooks(grid: any, options: GridOption, dataView: any): void;
    attachResizeHook(grid: any, options: GridOption): void;
    mergeGridOptions(): GridOption;
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param {object} dataset
     */
    refreshGridData(dataset: any[]): void;
    /** Toggle the filter row displayed on first row
     * @param {boolean} isShowing
     */
    showHeaderRow(isShowing: boolean): boolean;
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow(): boolean;
}
