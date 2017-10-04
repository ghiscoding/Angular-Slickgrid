import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Column } from './../models/column.interface';
import { GridOption } from './../models/gridOption.interface';

@Component({
  selector: 'slick-pagination',
  template: `
    <div class="slick-pagination">
    <div class="slick-pagination-nav">
        <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" [ngClass]="pageNumber === 1 ? 'disabled' : ''">
            <a class="page-link icon-seek-first fa fa-angle-double-left" aria-label="First" (click)="changeToFirstPage($event)">
            </a>
            </li>
            <li class="page-item" [ngClass]="pageNumber === 1 ? 'disabled' : ''">
            <a class="page-link icon-seek-prev fa fa-angle-left" aria-label="Previous" (click)="changeToPreviousPage($event)">
            </a>
            </li>
        </ul>
        </nav>

        <div class="slick-page-number">
        page {{pageNumber}} of {{pageCount}}
        </div>

        <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" [ngClass]="pageNumber === pageCount ? 'disabled' : ''">
            <a class="page-link icon-seek-next fa fa-angle-right" aria-label="Next" (click)="changeToNextPage($event)">
            </a>
            </li>
            <li class="page-item" [ngClass]="pageNumber === pageCount ? 'disabled' : ''">
            <a class="page-link icon-seek-end fa fa-angle-double-right" aria-label="Last" (click)="changeToLastPage($event)">
            </a>
            </li>
        </ul>
        </nav>
    </div>
    <span class="slick-pagination-settings">
        <select id="items-per-page-label" [value]="itemsPerPage" (change)="onChangeItemPerPage($event)">
        <option value="{{pageSize}}" *ngFor="let pageSize of paginationPageSizes;">{{pageSize}}</option>
        </select>
        items per page,
        <span class="slick-pagination-count">
        {{dataFrom}}-{{dataTo}} of {{totalItems}} items
        </span>
    </span>
    </div>
  `,
  styles: [
    `
      /* Pagination styling */
      .slick-pagination {
        border-top: 0 none;
        border-right: 0 none;
        border-bottom: 0 none;
        border-left: 0 none;
        width: 100%;
        height: 34px;
        padding-top: 4px;
        vertical-align: middle;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 13px;
        font-weight: 400;
        color: #808080;
      }
      .slick-pagination .slick-pagination-status {
        display: inline-block;
        padding: 6px;
      }
      .slick-pagination .ui-icon-container {
        display: inline-block;
        border-color: #ddd;
      }
      .slick-pagination .slick-pagination-nav {
        display: inline-block;
        padding: 2px;
        height: 34px;
      }
      .slick-pagination .slick-pagination-nav nav {
        display: inline-block;
      }
      .slick-pagination .slick-pagination-nav .slick-page-number {
        vertical-align: top;
        margin-top: 6px;
        display: inline-block;
        padding: 0 5px;
      }
      .slick-pagination .slick-pagination-nav .pagination {
        margin: 0;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-link {
        font-size: 13px;
        font-weight: bold;
        border: 1px solid #ccc;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item {
        cursor: pointer;
        font-weight: bold;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item a[class*="icon-seek-"] {
        text-decoration: none;
        font-size: 14px;
        border-color: silver;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled {
        cursor: not-allowed;
        font-weight: normal;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled > .page-link {
        font-weight: normal;
      }
      .slick-pagination .slick-pagination-nav .pagination .page-item.disabled a[class*="icon-seek-"] {
        background-color: #f9f9f9;
        border-color: #dedede;
      }
      .slick-pagination .slick-pagination-settings {
        display: block;
        float: right;
        padding: 2px;
        vertical-align: middle;
      }
      .slick-pagination .slick-pagination-settings select {
        font-size: 12px;
        line-height: 1.5;
        height: 32px;
        width: 62px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      .slick-pagination .slick-pagination-settings .slick-pagination-count {
        padding-left: 10px;
      }
    `
  ]
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
    const itemsPerPage = <number>event.target.value;
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
      if (this._gridPaginationOptions.onPaginationChanged) {
          this.paginationCallback = this._gridPaginationOptions.onPaginationChanged;
      }
      this.totalItems = this._gridPaginationOptions.pagination.totalItems;
      this.dataTo = this.itemsPerPage;
    }
    this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChanged(event?: Event, pageNumber?: number) {
    this.recalculateFromToIndexes();

    if (this.dataTo > this.totalItems) {
      this.dataTo = this.totalItems;
    }
    if (typeof this.paginationCallback === 'function') {
      const itemsPerPage = this.itemsPerPage;
      this.paginationCallback(event, { newPage: pageNumber, pageSize: itemsPerPage });
    }
  }

  recalculateFromToIndexes() {
    this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
    this.dataTo = (this.pageNumber * this.itemsPerPage);
  }
}
