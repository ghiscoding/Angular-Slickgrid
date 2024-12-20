import { Component, ElementRef } from '@angular/core';
import type {
  BasePaginationComponent,
  PaginationMetadata,
  PaginationService,
  PubSubService,
  SlickGrid,
  Subscription,
} from '@slickgrid-universal/common';

/** Custom Pagination Componnet, please note that you MUST `implements BasePaginationComponent` with required functions */
@Component({
  templateUrl: './grid-custom-pager.component.html',
  styleUrls: ['./grid-custom-pager.component.scss'],
})
export class CustomPagerComponent implements BasePaginationComponent {
  protected _paginationElement!: HTMLDivElement;
  protected _subscriptions: Subscription[] = [];
  protected _gridContainerElm?: HTMLElement;
  protected _grid!: SlickGrid;
  protected _paginationService!: PaginationService;
  protected _pubSubService!: PubSubService;
  currentPagination = {} as PaginationMetadata;

  constructor(protected readonly elm: ElementRef) {}

  init(grid: SlickGrid, paginationService: PaginationService, pubSubService: PubSubService) {
    this._grid = grid;
    this._paginationService = paginationService;
    this._pubSubService = pubSubService;
    this.currentPagination = this._paginationService.getFullPagination();

    // Anytime the pagination is initialized or has changes,
    // we'll copy the data into a local object so that we can add binding to this local object
    this._subscriptions.push(
      this._pubSubService.subscribe<PaginationMetadata>('onPaginationRefreshed', (paginationChanges) => {
        this.currentPagination.dataFrom = paginationChanges.dataFrom;
        this.currentPagination.dataTo = paginationChanges.dataTo;
        this.currentPagination.pageCount = paginationChanges.pageCount;
        this.currentPagination.pageNumber = paginationChanges.pageNumber;
        this.currentPagination.pageSize = paginationChanges.pageSize;
        this.currentPagination.pageSizes = paginationChanges.pageSizes;
        this.currentPagination.totalItems = paginationChanges.totalItems;
      })
    );
  }

  dispose() {
    this._pubSubService.unsubscribeAll(this._subscriptions);
    this.disposeElement();
  }

  disposeElement() {
    this._paginationElement.remove();
  }

  renderPagination(containerElm: HTMLElement, position: 'top' | 'bottom' = 'top') {
    this._gridContainerElm = containerElm;
    this._paginationElement = this.elm.nativeElement;
    this._paginationElement.id = 'pager';
    this._paginationElement.className = `pagination-container pager ${this._grid.getUID()}`;
    this._paginationElement.style.width = '100%';

    if (position === 'top') {
      // we can prepend the grid if we wish
      this._paginationElement.classList.add('top');
      containerElm.prepend(this._paginationElement);
    } else {
      // or append it at the bottom
      this._paginationElement.classList.add('bottom');
      containerElm.appendChild(this._paginationElement);
    }
  }

  onFirstPageClicked(event: MouseEvent): void {
    if (!this.isLeftPaginationDisabled()) {
      this._paginationService.goToFirstPage(event);
    }
  }

  onLastPageClicked(event: MouseEvent): void {
    if (!this.isRightPaginationDisabled()) {
      this._paginationService.goToLastPage(event);
    }
  }

  onNextPageClicked(event: MouseEvent): void {
    if (!this.isRightPaginationDisabled()) {
      this._paginationService.goToNextPage(event);
    }
  }

  onPreviousPageClicked(event: MouseEvent): void {
    if (!this.isLeftPaginationDisabled()) {
      this._paginationService.goToPreviousPage(event);
    }
  }

  isLeftPaginationDisabled(): boolean {
    return this.currentPagination.pageNumber === 1 || this.currentPagination.totalItems === 0;
  }

  isRightPaginationDisabled(): boolean {
    return this.currentPagination.pageNumber === this.currentPagination.pageCount || this.currentPagination.totalItems === 0;
  }
}
