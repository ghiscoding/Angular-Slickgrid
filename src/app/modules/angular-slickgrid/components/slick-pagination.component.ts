import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Optional, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { BackendServiceApi, Locale, Pager, Pagination } from './../models/index';
import { PaginationService } from '../services/pagination.service';
import { unsubscribeAllObservables } from '../services/utilities';

@Component({
  selector: 'slick-pagination',
  templateUrl: './slick-pagination.component.html'
})
export class SlickPaginationComponent implements AfterViewInit, OnDestroy {
  private _isFirstRender = true;
  private _pager: Pager;
  private _totalItems: number;
  private subscriptions: Subscription[] = [];

  @Output() onPaginationChanged = new EventEmitter<Pagination>();
  @Input() enableTranslate: boolean;
  @Input() options: Pagination;
  @Input() dataView: any;
  @Input() locales: Locale;
  @Input() backendServiceApi: BackendServiceApi;
  @Input()
  set totalItems(total: number) {
    if (this._isFirstRender || this._totalItems === undefined) {
      this._isFirstRender = true;
    }
    this._totalItems = total;
    this._isFirstRender = false;
    if (this.paginationService) {
      this.paginationService.totalItems = total;
    }
  }
  get totalItems(): number {
    return this._totalItems;
  }
  @Input() grid: any;

  // text translations (handled by ngx-translate or by custom locale)
  textItemsPerPage: string;
  textItems: string;
  textOf: string;
  textPage: string;

  /** Constructor */
  constructor(private paginationService: PaginationService, @Optional() private translate: TranslateService) {
    // translate all the text using ngx-translate or custom locales
    this.translateAllUiTexts(this.locales);
    if (translate && translate.onLangChange) {
      this.subscriptions.push(this.translate.onLangChange.subscribe(() => this.translateAllUiTexts(this.locales)));
    }

    // translate all the text using ngx-translate or custom locales
    this.paginationService.onPaginationRefreshed.subscribe(() => this.translateAllUiTexts(this.locales));

    this.paginationService.onPaginationChanged.subscribe(pager => {
      this._pager = pager;

      // emit the changes to the parent component with only necessary properties
      if (!this._isFirstRender) {
        this.onPaginationChanged.emit({
          pageNumber: this.pager.pageNumber,
          pageSizes: this.pager.availablePageSizes,
          pageSize: this.pager.itemsPerPage,
          totalItems: this.pager.totalItems,
        });
      }
    });
  }

  get pager(): Pager {
    return this._pager || this.paginationService.pager;
  }

  ngOnDestroy() {
    this.dispose();
  }

  ngAfterViewInit() {
    if (this.enableTranslate && !this.translate) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }
    // Angular throws the infamous "ExpressionChangedAfterItHasBeenCheckedError"
    // none of the code refactoring worked to go over the error expect adding a delay, so we'll keep that for now
    setTimeout(() => this.paginationService.init(this.grid, this.dataView, this.options, this.backendServiceApi));
  }

  changeToFirstPage(event: any) {
    this.paginationService.goToFirstPage(event);
  }

  changeToLastPage(event: any) {
    this.paginationService.goToLastPage(event);
  }

  changeToNextPage(event: any) {
    this.paginationService.goToNextPage(event);
  }

  changeToPreviousPage(event: any) {
    this.paginationService.goToPreviousPage(event);
  }

  changeToCurrentPage(event: any) {
    let pageNumber = 1;
    if (event && event.currentTarget && event.currentTarget.value) {
      pageNumber = +(event.currentTarget.value);
    }
    this.paginationService.goToPageNumber(pageNumber, event);
  }

  changeItemPerPage(event: any) {
    let itemsPerPage = 1;
    if (event && event.currentTarget && event.currentTarget.value) {
      itemsPerPage = +(event.currentTarget.value);
    }
    this.paginationService.changeItemPerPage(itemsPerPage, event);
  }

  dispose() {
    this.onPaginationChanged.unsubscribe();
    this.paginationService.dispose();

    // also unsubscribe all Angular Subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  // --
  // private functions
  // --------------------

  /** Translate all the texts shown in the UI, use ngx-translate service when available or custom locales when service is null */
  private translateAllUiTexts(locales: Locale) {
    if (this.translate && this.translate.instant) {
      this.textItemsPerPage = this.translate.instant('ITEMS_PER_PAGE');
      this.textItems = this.translate.instant('ITEMS');
      this.textOf = this.translate.instant('OF');
      this.textPage = this.translate.instant('PAGE');
    } else if (locales) {
      this.textItemsPerPage = locales.TEXT_ITEMS_PER_PAGE || 'TEXT_ITEMS_PER_PAGE';
      this.textItems = locales.TEXT_ITEMS || 'TEXT_ITEMS';
      this.textOf = locales.TEXT_OF || 'TEXT_OF';
      this.textPage = locales.TEXT_PAGE || 'TEXT_PAGE';
    }
  }
}
