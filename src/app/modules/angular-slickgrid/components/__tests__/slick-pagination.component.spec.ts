import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { SlickPaginationComponent } from '../slick-pagination.component';
import { Column, GridOption, Pager } from '../../models';
import { PaginationService } from '../../services';

const dataviewStub = {
  onRowCountChanged: jest.fn(),
  onRowsChanged: jest.fn(),
};

const mockBackendService = {
  resetPaginationOptions: jest.fn(),
  buildQuery: jest.fn(),
  updateOptions: jest.fn(),
  processOnFilterChanged: jest.fn(),
  processOnSortChanged: jest.fn(),
  processOnPaginationChanged: jest.fn(),
};

const mockGridOption = {
  enableAutoResize: true,
  backendServiceApi: {
    service: mockBackendService,
    process: jest.fn(),
    options: {
      columnDefinitions: [{ id: 'name', field: 'name' }] as Column[],
      datasetName: 'user',
    }
  },
  pagination: {
    pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
    pageSize: 25,
    totalItems: 85
  }
} as GridOption;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getOptions: () => mockGridOption,
  getColumns: jest.fn(),
  setColumns: jest.fn(),
  onColumnsReordered: jest.fn(),
  onColumnsResized: jest.fn(),
  registerPlugin: jest.fn(),
};

const paginationServiceStub = {
  onPaginationRefreshed: new Subject<boolean>(),
  onPaginationChanged: new Subject<Pager>(),
  goToFirstPage: jest.fn(),
  goToLastPage: jest.fn(),
  goToNextPage: jest.fn(),
  goToPreviousPage: jest.fn(),
  goToPageNumber: jest.fn(),
  changeItemPerPage: jest.fn(),
  dispose: jest.fn(),
  init: jest.fn(),
} as unknown as PaginationService;

describe('App Component', () => {
  let fixture: ComponentFixture<SlickPaginationComponent>;
  let component: SlickPaginationComponent;
  let translate: TranslateService;
  let mockPager: Pager;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SlickPaginationComponent
      ],
      providers: [
        { provide: PaginationService, useValue: paginationServiceStub },
        TranslateService,
      ],
      imports: [
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    // create the component
    fixture = TestBed.createComponent(SlickPaginationComponent);
    component = fixture.debugElement.componentInstance;
    translate = TestBed.get(TranslateService);

    translate.setTranslation('fr', {
      ITEMS: 'éléments',
      ITEMS_PER_PAGE: 'éléments par page',
      OF: 'de',
      PAGE: 'Page',
      PAGE_X_OF_Y: 'page {{x}} de {{y}}',
    });
    translate.setTranslation('en', {
      ITEMS: 'items',
      ITEMS_PER_PAGE: 'items per page',
      OF: 'of',
      PAGE: 'Page',
      PAGE_X_OF_Y: 'page {{x}} of {{y}}',
    });
    translate.use('fr');
    fixture.detectChanges();
  }));

  it('should create the Slick-Pagination component', () => {
    expect(component).toBeTruthy();
  });

  describe('Integration Tests', () => {
    beforeEach(() => {
      mockPager = {
        from: 5,
        to: 10,
        itemsPerPage: 5,
        pageCount: 1,
        pageNumber: 2,
        availablePageSizes: [5, 10, 15, 20],
        totalItems: 100,
      };
      component.enableTranslate = true;
      component.grid = gridStub;
      component.options = {
        pageNumber: mockPager.pageNumber,
        pageSizes: mockPager.availablePageSizes,
        pageSize: mockPager.itemsPerPage,
        totalItems: mockPager.totalItems,
      };
      component.backendServiceApi = mockGridOption.backendServiceApi;
      component.totalItems = mockPager.totalItems;

      paginationServiceStub.init(gridStub, dataviewStub, component.options, component.backendServiceApi);
      paginationServiceStub.onPaginationChanged.next(mockPager);
      fixture.detectChanges();
    });

    afterEach(() => {
      // clear all the spyOn mocks to not influence next test
      jest.clearAllMocks();
      spyOn(component, 'ngOnDestroy').and.callFake(() => { });
      fixture.destroy();
    });

    it('should create a the Slick-Pagination component in the DOM', () => {
      fixture.detectChanges();

      const elm = document.querySelector('.slick-pagination');
      const pageInfoFromTo = fixture.debugElement.query(By.css('.page-info-from-to')).nativeElement;
      const pageInfoTotalItems = fixture.debugElement.query(By.css('.page-info-total-items')).nativeElement;

      expect(elm.innerHTML).toContain('slick-pagination-nav');
      expect(pageInfoFromTo.innerHTML).toBe('<span data-test="item-from">5</span>-<span data-test="item-to">10</span> de ');
      expect(pageInfoTotalItems.innerHTML).toBe('<span data-test="total-items">100</span> éléments ');
      expect(component.totalItems).toBe(100);
    });

    it('should create a the Slick-Pagination component in the DOM and expect different locale when changed', () => {
      translate.use('en');
      fixture.detectChanges();

      const elm = document.querySelector('.slick-pagination');
      const pageInfoFromTo = fixture.debugElement.query(By.css('.page-info-from-to')).nativeElement;
      const pageInfoTotalItems = fixture.debugElement.query(By.css('.page-info-total-items')).nativeElement;

      expect(translate.currentLang).toBe('en');
      expect(elm.innerHTML).toContain('slick-pagination-nav');
      expect(pageInfoFromTo.innerHTML).toBe('<span data-test="item-from">5</span>-<span data-test="item-to">10</span> of ');
      expect(pageInfoTotalItems.innerHTML).toBe('<span data-test="total-items">100</span> items ');
      expect(component.totalItems).toBe(100);
    });

    it('should call changeToFirstPage() from the View and expect the pagination service to be called with correct method', fakeAsync(() => {
      const spy = jest.spyOn(paginationServiceStub, 'goToFirstPage');

      fixture.detectChanges();
      // const input = fixture.debugElement.nativeElement.querySelector('input.form-control');
      const firstPageButton = fixture.debugElement.nativeElement.querySelector('.icon-seek-first.fa-angle-double-left');
      expect(firstPageButton).not.toBeNull();
      firstPageButton.click();
      tick();

      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      // expect(input.value).toBe('1');
    }));

    it('should call changeToPreviousPage() from the View and expect the pagination service to be called with correct method', fakeAsync(() => {
      const spy = jest.spyOn(paginationServiceStub, 'goToPreviousPage');

      fixture.detectChanges();
      const prevPageButton = fixture.debugElement.nativeElement.querySelector('.icon-seek-prev.fa-angle-left');
      expect(prevPageButton).not.toBeNull();
      prevPageButton.click();
      tick();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    }));

    it('should call changeToNextPage() from the View and expect the pagination service to be called with correct method', fakeAsync(() => {
      const spy = jest.spyOn(paginationServiceStub, 'goToNextPage');

      fixture.detectChanges();
      const nextPageButton = fixture.debugElement.nativeElement.querySelector('.icon-seek-next.fa-angle-right');
      expect(nextPageButton).not.toBeNull();
      nextPageButton.click();
      tick();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    }));

    it('should call changeToLastPage() from the View and expect the pagination service to be called with correct method', fakeAsync(() => {
      const spy = jest.spyOn(paginationServiceStub, 'goToLastPage');

      fixture.detectChanges();
      const lastPageButton = fixture.debugElement.nativeElement.querySelector('.icon-seek-end.fa-angle-double-right');
      expect(lastPageButton).not.toBeNull();
      lastPageButton.click();
      tick();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    }));

    it('should change the page number and expect the pagination service to go to that page', (done) => {
      const spy = jest.spyOn(paginationServiceStub, 'goToPageNumber');

      const newPageNumber = 3;
      const mockEvent = { currentTarget: { value: newPageNumber } };
      const input = fixture.debugElement.query(By.css('input.form-control'));
      input.triggerEventHandler('change', mockEvent);
      fixture.detectChanges();

      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(newPageNumber, mockEvent);
        done();
      });
    });

    it('should change the changeItemPerPage select dropdown and expect the pagination service call a change', (done) => {
      const spy = jest.spyOn(paginationServiceStub, 'changeItemPerPage');

      const newItemsPerPage = 10;
      const mockEvent = { currentTarget: { value: newItemsPerPage } };
      const select = fixture.debugElement.query(By.css('select'));
      select.triggerEventHandler('change', mockEvent);
      fixture.detectChanges();

      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(newItemsPerPage, mockEvent);
        done();
      });
    });
  });
});
