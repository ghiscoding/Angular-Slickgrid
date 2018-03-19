import { Pagination } from './../models/pagination.interface';
import { AfterViewInit, EventEmitter, OnDestroy } from '@angular/core';
import { GridOption } from './../models/index';
import { FilterService, SortService } from './../services/index';
export declare class SlickPaginationComponent implements AfterViewInit, OnDestroy {
    private filterService;
    private sortService;
    private _filterSubcription;
    private _gridPaginationOptions;
    private _isFirstRender;
    onPaginationChanged: EventEmitter<Pagination>;
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
    fromToParams: any;
    /** Constructor */
    constructor(filterService: FilterService, sortService: SortService);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    ceil(number: number): number;
    changeToFirstPage(event: any): void;
    changeToLastPage(event: any): void;
    changeToNextPage(event: any): void;
    changeToPreviousPage(event: any): void;
    changeToCurrentPage(event: any): void;
    dispose(): void;
    onChangeItemPerPage(event: any): void;
    refreshPagination(isPageNumberReset?: boolean): void;
    onPageChanged(event: Event | undefined, pageNumber: number): Promise<void>;
    recalculateFromToIndexes(): void;
}
