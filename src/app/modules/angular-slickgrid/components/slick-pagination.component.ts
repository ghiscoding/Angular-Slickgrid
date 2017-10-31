import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { castToPromise } from './../services/utilities';
import { Column, GridOption } from './../models/index';

@Component({
  selector: 'slick-pagination',
  templateUrl: './slick-pagination.component.html'
})
export class SlickPaginationComponent implements AfterViewInit, OnInit {
  private _gridPaginationOptions: GridOption;

  @Input()
  set gridPaginationOptions(gridPaginationOptions: GridOption) {
    this._gridPaginationOptions = gridPaginationOptions;
    if (!gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
      this.refreshPagination();
    }
  }
  get gridPaginationOptions(): GridOption {
    return this._gridPaginationOptions;
  }
  @Input() grid: any;
  dataFrom = 1;
  dataTo = 1;
  itemsPerPage = 25;
  pageCount = 0;
  pageNumber = 1;
  totalItems = 0;
  paginationCallback: Function;
  paginationPageSizes = [25, 75, 100];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._gridPaginationOptions = this._gridPaginationOptions;
    if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
      this.refreshPagination();
    }
  }

  ceil(number: number) {
    return Math.ceil(number);
  }
  onChangeItemPerPage(event: any) {
    const itemsPerPage = event.target.value as number;
    this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
    this.pageNumber = 1;
    this.itemsPerPage = itemsPerPage;
    this.onPageChanged(event, this.pageNumber);
  }

  changeToFirstPage(event: any) {
    this.pageNumber = 1;
    this.onPageChanged(event, this.pageNumber);
  }
  changeToLastPage(event: any) {
    this.pageNumber = this.pageCount;
    this.onPageChanged(event, this.pageNumber);
  }
  changeToNextPage(event: any) {
    if (this.pageNumber < this.pageCount) {
      this.pageNumber++;
      this.onPageChanged(event, this.pageNumber);
    }
  }
  changeToPreviousPage(event: any) {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.onPageChanged(event, this.pageNumber);
    }
  }

  gotoFirstPage() {
    this.pageNumber = 1;
    this.onPageChanged(undefined, this.pageNumber);
  }

  refreshPagination() {
    if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
      // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
      if (this.totalItems !== this._gridPaginationOptions.pagination.totalItems) {
        this.pageNumber = 1;
        this.recalculateFromToIndexes();
      }

      // calculate and refresh the multiple properties of the pagination UI
      this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
      this.itemsPerPage = this._gridPaginationOptions.pagination.pageSize;
      this.totalItems = this._gridPaginationOptions.pagination.totalItems;
      this.dataTo = this.itemsPerPage;
    }
    this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  async onPageChanged(event?: Event, pageNumber?: number) {
    this.recalculateFromToIndexes();

    if (this.dataTo > this.totalItems) {
      this.dataTo = this.totalItems;
    }
    if (this._gridPaginationOptions.onBackendEventApi) {
      const itemsPerPage = this.itemsPerPage;

      if (!this._gridPaginationOptions.onBackendEventApi.process || !this._gridPaginationOptions.onBackendEventApi.service) {
        throw new Error(`onBackendEventApi requires at least a "process" function and a "service" defined`);
      }
      if (this._gridPaginationOptions.onBackendEventApi.preProcess) {
        this._gridPaginationOptions.onBackendEventApi.preProcess();
      }
      const query = this._gridPaginationOptions.onBackendEventApi.service.onPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });

      // the process could be an Observable (like HttpClient) or a Promise
      // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
      const observableOrPromise = this._gridPaginationOptions.onBackendEventApi.process(query);
      const responseProcess = await castToPromise(observableOrPromise);

      // send the response process to the postProcess callback
      if (this._gridPaginationOptions.onBackendEventApi.postProcess) {
        this._gridPaginationOptions.onBackendEventApi.postProcess(responseProcess);
      }
    } else {
      throw new Error('Pagination with a backend service requires "onBackendEventApi" to be defined in your grid options');
    }
  }

  recalculateFromToIndexes() {
    this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
    this.dataTo = (this.pageNumber * this.itemsPerPage);
  }
}
