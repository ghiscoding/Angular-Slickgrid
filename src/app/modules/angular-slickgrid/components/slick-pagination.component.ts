import { AfterViewInit, Component, EventEmitter, Injectable, Input, OnDestroy, Optional, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Constants } from '../constants';
import { GridOption, Locale, Pager, Pagination } from './../models/index';
import { PaginationService } from '../services/pagination.service';
import { unsubscribeAllObservables } from '../services/utilities';

@Component({
  selector: 'slick-pagination',
  templateUrl: './slick-pagination.component.html'
})
@Injectable()
export class SlickPaginationComponent implements AfterViewInit, OnDestroy {
  private _gridPaginationOptions: GridOption;
  private _isFirstRender = true;
  private _locales: Locale;
  private _pager: Pager;
  private subscriptions: Subscription[] = [];

  @Output() onPaginationChanged = new EventEmitter<Pagination>();
  @Input() dataView: any;
  @Input()
  set gridPaginationOptions(gridPaginationOptions: GridOption) {
    this._gridPaginationOptions = gridPaginationOptions;
    if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.pager.totalItems)) {
      this.refreshPagination();
      this._isFirstRender = false;
    }
  }
  get gridPaginationOptions(): GridOption {
    return this._gridPaginationOptions;
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
    if (translate && translate.onLangChange) {
      this.subscriptions.push(this.translate.onLangChange.subscribe(() => this.translateAllUiTexts(this._locales)));
    }

    // translate all the text using ngx-translate or custom locales
    this.paginationService.onPaginationRefreshed.subscribe(() => this.translateAllUiTexts(this._locales));

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
    if (this._gridPaginationOptions && this._gridPaginationOptions.enableTranslate && !this.translate) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }
    // get locales provided by user in forRoot or else use default English locales via the Constants
    this._locales = this._gridPaginationOptions && this._gridPaginationOptions.locales || Constants.locales;

    this.paginationService.init(this.grid, this.dataView, this._gridPaginationOptions);
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

  refreshPagination() {
    if (this.paginationService) {
      this.paginationService.gridPaginationOptions = this._gridPaginationOptions;
      this.paginationService.refreshPagination();
    }
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
