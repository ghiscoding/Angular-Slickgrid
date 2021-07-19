import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getTranslationPrefix, Locale, PaginationService } from '@slickgrid-universal/common';
import { Subscription } from 'rxjs';

import { Constants } from '../constants';
import { GridOption, } from './../models/index';
import { unsubscribeAllObservables } from '../services/utilities';

@Component({
  selector: 'slick-pagination',
  templateUrl: './slick-pagination.component.html'
})
export class SlickPaginationComponent implements OnDestroy, OnInit {
  @Input() gridOptions!: GridOption;
  @Input() paginationService!: PaginationService;

  private subscriptions: Subscription[] = [];
  private _enableTranslate = false;
  private _gridOptions!: GridOption;
  private _locales!: Locale;

  // text translations (handled by ngx-translate or by custom locale)
  textItemsPerPage = 'items per page';
  textItems = 'items';
  textOf = 'of';
  textPage = 'Page';

  /** Constructor */
  constructor(@Optional() private readonly translate: TranslateService) { }

  get availablePageSizes(): number[] {
    return this.paginationService.availablePageSizes;
  }

  get dataFrom(): number {
    return this.paginationService.dataFrom;
  }

  get dataTo(): number {
    return this.paginationService.dataTo;
  }

  /** is the left side pagination disabled? */
  get isLeftPaginationDisabled(): boolean {
    return this.pageNumber === 1 || this.totalItems === 0;
  }

  /** is the right side pagination disabled? */
  get isRightPaginationDisabled(): boolean {
    return this.pageNumber === this.pageCount || this.totalItems === 0;
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
    this._gridOptions = this.gridOptions || {};
    this._enableTranslate = this._gridOptions && this._gridOptions.enableTranslate || false;
    this._locales = this._gridOptions && this._gridOptions.locales || Constants.locales;

    if (this._enableTranslate && !this.translate) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    this.translateAllUiTexts(this._locales);

    // translate all the text using ngx-translate or custom locales
    if (this._enableTranslate && this.translate && this.translate.onLangChange) {
      this.subscriptions.push(this.translate.onLangChange.subscribe(() => this.translateAllUiTexts(this._locales)));
    }
  }

  changeToFirstPage(event: MouseEvent) {
    if (!this.isLeftPaginationDisabled) {
      this.paginationService.goToFirstPage(event);
    }
  }

  changeToLastPage(event: MouseEvent) {
    if (!this.isRightPaginationDisabled) {
      this.paginationService.goToLastPage(event);
    }
  }

  changeToNextPage(event: MouseEvent) {
    if (!this.isRightPaginationDisabled) {
      this.paginationService.goToNextPage(event);
    }
  }

  changeToPreviousPage(event: MouseEvent) {
    if (!this.isLeftPaginationDisabled) {
      this.paginationService.goToPreviousPage(event);
    }
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
    // also unsubscribe all Angular Subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  // --
  // private functions
  // --------------------

  /** Translate all the texts shown in the UI, use ngx-translate service when available or custom locales when service is null */
  private translateAllUiTexts(locales: Locale) {
    if (this._enableTranslate && this.translate && this.translate.instant && this.translate.currentLang) {
      const translationPrefix = getTranslationPrefix(this._gridOptions);
      this.textItemsPerPage = this.translate.instant(`${translationPrefix}ITEMS_PER_PAGE`);
      this.textItems = this.translate.instant(`${translationPrefix}ITEMS`);
      this.textOf = this.translate.instant(`${translationPrefix}OF`);
      this.textPage = this.translate.instant(`${translationPrefix}PAGE`);
    } else if (locales) {
      this.textItemsPerPage = locales.TEXT_ITEMS_PER_PAGE || 'TEXT_ITEMS_PER_PAGE';
      this.textItems = locales.TEXT_ITEMS || 'TEXT_ITEMS';
      this.textOf = locales.TEXT_OF || 'TEXT_OF';
      this.textPage = locales.TEXT_PAGE || 'TEXT_PAGE';
    }
  }
}
