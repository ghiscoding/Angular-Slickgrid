import { OnInit, AfterViewInit } from '@angular/core';
import { GridOption } from './../models/gridOption.interface';
export declare class SlickPaginationComponent implements AfterViewInit, OnInit {
    private _gridPaginationOptions;
    gridPaginationOptions: GridOption;
    grid: any;
    dataFrom: number;
    dataTo: number;
    itemsPerPage: number;
    pageCount: number;
    pageNumber: number;
    totalItems: number;
    paginationCallback: Function;
    paginationPageSizes: number[];
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ceil(number: number): number;
    onChangeItemPerPage(event: any): void;
    changeToFirstPage(event: any): void;
    changeToLastPage(event: any): void;
    changeToNextPage(event: any): void;
    changeToPreviousPage(event: any): void;
    gotoFirstPage(): void;
    refreshPagination(): void;
    onPageChanged(event?: Event, pageNumber?: number): void;
    recalculateFromToIndexes(): void;
}
