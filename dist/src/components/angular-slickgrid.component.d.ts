import { Column, GridOption } from './../models';
import { AfterViewInit, OnInit } from '@angular/core';
import { FilterService, MouseService, SortService, ResizerService } from './../services';
export declare class AngularSlickgridComponent implements AfterViewInit, OnInit {
    private resizer;
    private mouseService;
    private filterService;
    private sortService;
    private _dataset;
    private _dataView;
    private _gridOptions;
    private _columnFilters;
    grid: any;
    gridPaginationOptions: GridOption;
    gridHeightString: string;
    gridWidthString: string;
    showPagination: boolean;
    onFilter: any;
    gridId: string;
    columnDefinitions: Column[];
    gridOptions: GridOption;
    gridHeight: number;
    gridWidth: number;
    dataset: any[];
    constructor(resizer: ResizerService, mouseService: MouseService, filterService: FilterService, sortService: SortService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    attachDifferentHooks(grid: any, options: GridOption, dataView: any): void;
    attachResizeHook(grid: any, options: GridOption): void;
    mergeGridOptions(): GridOption;
    /** Toggle the filter row displayed on first row */
    showHeaderRow(isShowing: boolean): boolean;
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow(): boolean;
    refreshGridData(dataset: any): void;
}
