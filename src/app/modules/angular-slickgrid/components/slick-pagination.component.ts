import { Component, EventEmitter, Input, OnDestroy, Optional, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Locale, Pagination } from './../models/index';
import { PaginationService } from '../services/pagination.service';
import { unsubscribeAllObservables } from '../services/utilities';

@Component({
  selector: 'slick-pagination',
  templateUrl: './slick-pagination.component.html'
})
export class SlickPaginationComponent implements OnDestroy, OnInit {
  private subscriptions: Subscription[] = [];

  @Input() enableTranslate: boolean;
  @Input() locales: Locale;

  // text translations (handled by ngx-translate or by custom locale)
  textItemsPerPage: string;
  textItems: string;
  textOf: string;
  textPage: string;

  /** Constructor */
  constructor(private paginationService: PaginationService, @Optional() private translate: TranslateService) {
    if (this.enableTranslate && !this.translate) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    // translate all the text using ngx-translate or custom locales
    this.translateAllUiTexts(this.locales);
    if (translate && translate.onLangChange) {
      this.subscriptions.push(this.translate.onLangChange.subscribe(() => this.translateAllUiTexts(this.locales)));
    }
  }

  get availablePageSizes(): number[] {
    return this.paginationService.availablePageSizes;
  }

  get dataFrom(): number {
    return this.paginationService.dataFrom;
  }

  get dataTo(): number {
    return this.paginationService.dataTo;
  }

  get itemsPerPage(): number {
    return this.paginationService.itemsPerPage;
  }

  get pageCount(): number {
    return this.paginationService.pageCount;
  }

  get pageNumber(): number {
    return this.paginationService.pageNumber;
  }
  set pageNumber(page: number) {
    // the setter has to be declared but we won't use it, instead we will use the "changeToCurrentPage()" to only update the value after ENTER keydown event
  }

  get totalItems() {
    return this.paginationService.totalItems;
  }

  ngOnDestroy() {
    this.dispose();
  }

  ngOnInit() {
    this.translateAllUiTexts(this.locales);
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
