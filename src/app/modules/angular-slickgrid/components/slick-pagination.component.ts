import { AfterViewInit, Component, EventEmitter, Injectable, Input, OnDestroy, Optional, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { GraphqlResult, GridOption, Locale, Pagination } from './../models/index';
import { executeBackendProcessesCallback, onBackendError } from '../services/backend-utilities';
import { FilterService } from './../services/filter.service';
import { GridService } from './../services/grid.service';
import { isObservable, Subscription } from 'rxjs';
import { unsubscribeAllObservables } from '../services/utilities';

// using external non-typed js libraries
declare var Slick: any;

@Component({
  selector: 'slick-pagination',
  templateUrl: './slick-pagination.component.html'
})
@Injectable()
export class SlickPaginationComponent implements AfterViewInit, OnDestroy {
  private _eventHandler = new Slick.EventHandler();
  private _gridPaginationOptions: GridOption;
  private _isFirstRender = true;
  private _locales: Locale;
  private subscriptions: Subscription[] = [];

  @Output() onPaginationChanged = new EventEmitter<Pagination>();
  @Input() dataView: any;
  @Input()
  set gridPaginationOptions(gridPaginationOptions: GridOption) {
    this._gridPaginationOptions = gridPaginationOptions;
    if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
      this.refreshPagination();
      this._isFirstRender = false;
    }
  }
  get gridPaginationOptions(): GridOption {
    return this._gridPaginationOptions;
  }
  @Input() grid: any;
  dataFrom = 1;
  dataTo = 1;
  itemsPerPage: number;
  pageCount = 0;
  pageNumber = 1;
  totalItems = 0;
  paginationCallback: Function;
  paginationPageSizes = [25, 75, 100];
  fromToParams: any = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };

  // text translations (handled by ngx-translate or by custom locale)
  textItemsPerPage: string;
  textItems: string;
  textOf: string;
  textPage: string;

  /** Constructor */
  constructor(private filterService: FilterService, private gridService: GridService, @Optional() private translate: TranslateService) {
    if (this._gridPaginationOptions && this._gridPaginationOptions.enableTranslate && !this.translate) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }
    // translate all the text using ngx-translate or custom locales
    if (translate && translate.onLangChange) {
      this.subscriptions.push(this.translate.onLangChange.subscribe(() => this.translateAllUiTexts(this._locales)));
    }
  }

  ngOnDestroy() {
    this.dispose();
  }

  ngAfterViewInit() {
    this._gridPaginationOptions = this._gridPaginationOptions;
    if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
      this.refreshPagination();
    }

    // Subscribe to Filter Clear & Changed and go back to page 1 when that happen
    this.subscriptions.push(this.filterService.onFilterChanged.subscribe(() => this.refreshPagination(true)));
    this.subscriptions.push(this.filterService.onFilterCleared.subscribe(() => this.refreshPagination(true)));

    // Subscribe to any dataview row count changed so that when Adding/Deleting item(s) through the DataView
    // that would trigger a refresh of the pagination numbers
    if (this.dataView) {
      this.subscriptions.push(this.gridService.onItemAdded.subscribe((items: any | any[]) => this.onItemAddedOrRemoved(items, true)));
      this.subscriptions.push(this.gridService.onItemDeleted.subscribe((items: any | any[]) => this.onItemAddedOrRemoved(items, false)));
    }
  }

  ceil(number: number) {
    return Math.ceil(number);
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

  changeToCurrentPage(event: any) {
    this.pageNumber = +event.currentTarget.value;
    if (this.pageNumber < 1) {
      this.pageNumber = 1;
    } else if (this.pageNumber > this.pageCount) {
      this.pageNumber = this.pageCount;
    }

    this.onPageChanged(event, this.pageNumber);
  }

  dispose() {
    this.onPaginationChanged.unsubscribe();

    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    // also unsubscribe all Angular Subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  onChangeItemPerPage(event: any) {
    const itemsPerPage = +event.target.value;
    this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
    this.pageNumber = (this.totalItems > 0) ? 1 : 0;
    this.itemsPerPage = itemsPerPage;
    this.onPageChanged(event, this.pageNumber);
  }

  refreshPagination(isPageNumberReset: boolean = false) {
    const backendApi = this._gridPaginationOptions.backendServiceApi;
    if (!backendApi || !backendApi.service || !backendApi.process) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    // get locales provided by user in forRoot or else use default English locales via the Constants
    this._locales = this._gridPaginationOptions && this._gridPaginationOptions.locales || Constants.locales;

    // translate all the text using ngx-translate or custom locales
    this.translateAllUiTexts(this._locales);

    if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
      const pagination = this._gridPaginationOptions.pagination;
      // set the number of items per page if not already set
      if (!this.itemsPerPage) {
        this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
      }

      // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
      if (isPageNumberReset || this.totalItems !== pagination.totalItems) {
        if (this._isFirstRender && pagination.pageNumber && pagination.pageNumber > 1) {
          this.pageNumber = pagination.pageNumber || 1;
        } else {
          this.pageNumber = 1;
        }

        // when page number is set to 1 then also reset the "offset" of backend service
        if (this.pageNumber === 1) {
          backendApi.service.resetPaginationOptions();
        }
      }

      // calculate and refresh the multiple properties of the pagination UI
      this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
      this.totalItems = this._gridPaginationOptions.pagination.totalItems;
      this.recalculateFromToIndexes();
    }
    this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChanged(event: Event | undefined, pageNumber: number) {
    this.recalculateFromToIndexes();

    const backendApi = this._gridPaginationOptions.backendServiceApi;
    if (!backendApi || !backendApi.service || !backendApi.process) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    if (this.dataTo > this.totalItems) {
      this.dataTo = this.totalItems;
    } else if (this.totalItems < this.itemsPerPage) {
      this.dataTo = this.totalItems;
    }
    if (backendApi) {
      try {
        const itemsPerPage = +this.itemsPerPage;

        // keep start time & end timestamps & return it after process execution
        const startTime = new Date();

        // run any pre-process, if defined, for example a spinner
        if (backendApi.preProcess) {
          backendApi.preProcess();
        }

        const query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });

        // the processes can be Observables (like HttpClient) or Promises
        const process = backendApi.process(query);
        if (process instanceof Promise && process.then) {
          process.then((processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridPaginationOptions));
        } else if (isObservable(process)) {
          process.subscribe(
            (processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridPaginationOptions),
            (error: any) => onBackendError(error, backendApi)
          );
        }
      } catch (error) {
        onBackendError(error, backendApi);
      }
    } else {
      throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
    }

    // emit the changes to the parent component
    this.onPaginationChanged.emit({
      pageNumber: this.pageNumber,
      pageSizes: this.paginationPageSizes,
      pageSize: this.itemsPerPage,
      totalItems: this.totalItems
    });
  }

  recalculateFromToIndexes() {
    if (this.totalItems === 0) {
      this.dataFrom = 0;
      this.dataTo = 0;
      this.pageNumber = 0;
    } else {
      this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
      this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
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

  /**
   * When item is added or removed, we will refresh the numbers on the pagination however we won't trigger a backend change
   * This will have a side effect though, which is that the "To" count won't be matching the "items per page" count,
   * that is a necessary side effect to avoid triggering a backend query just to refresh the paging,
   * basically we assume that this offset is fine for the time being,
   * until user does an action which will refresh the data hence the pagination which will then become normal again
   */
  private onItemAddedOrRemoved(items: any | any[], isItemAdded = true) {
    if (items !== null) {
      const previousDataTo = this.dataTo;
      const itemCount = Array.isArray(items) ? items.length : 1;
      const itemCountWithDirection = isItemAdded ? +itemCount : -itemCount;

      // refresh the total count in the pagination and in the UI
      this.totalItems += itemCountWithDirection;
      this.recalculateFromToIndexes();

      // finally refresh the "To" count and we know it might be different than the "items per page" count
      // but this is necessary since we don't want an actual backend refresh
      this.dataTo = previousDataTo + itemCountWithDirection;
    }
  }
}
