import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { SlickPaginationComponent } from '../slick-pagination.component';
import { GridOption, ServicePagination } from '../../models';
import { PaginationService } from '../../services';

const paginationServiceStub = {
  dataFrom: 5,
  dataTo: 10,
  pageNumber: 2,
  pageCount: 1,
  itemsPerPage: 10,
  pageSize: 10,
  totalItems: 100,
  availablePageSizes: [5, 10, 15, 20],
  pageInfoTotalItems: jest.fn(),
  goToFirstPage: jest.fn(),
  goToLastPage: jest.fn(),
  goToNextPage: jest.fn(),
  goToPreviousPage: jest.fn(),
  goToPageNumber: jest.fn(),
  changeItemPerPage: jest.fn(),
  dispose: jest.fn(),
  init: jest.fn(),
  onShowPaginationChanged: new Subject<boolean>(),
  onPaginationChanged: new Subject<ServicePagination>(),
} as unknown as PaginationService;

describe('App Component', () => {
  let fixture: ComponentFixture<SlickPaginationComponent>;
  let component: SlickPaginationComponent;
  let translate: TranslateService;
  let mockServicePagination: ServicePagination;

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
      mockServicePagination = {
        dataFrom: 5,
        dataTo: 10,
        pageSize: 5,
        pageCount: 1,
        pageNumber: 2,
        pageSizes: [5, 10, 15, 20],
        totalItems: 100,
      };
      component.gridOptions = { enableTranslate: true } as GridOption;
      component.ngOnInit();
      paginationServiceStub.onPaginationChanged.next(mockServicePagination);
      fixture.detectChanges();
    });

    afterEach(() => {
      // clear all the spyOn mocks to not influence next test
      jest.clearAllMocks();
      spyOn(component, 'ngOnDestroy').and.callFake(() => { });
      fixture.destroy();
    });

    describe('getters & setters', () => {
      // the following 2 setters unit test are simply here for code coverage,
      // these 2 setters don't actually do anything
      it('should use the "itemsPerPage" setter but do nothing with it', () => {
        fixture.detectChanges();
        component.pageNumber = 3;
        expect(component.pageNumber).toBe(2);
      });
    });

    it('should create a the Slick-Pagination component in the DOM', () => {
      component.gridOptions = { enableTranslate: true } as GridOption;
      fixture.detectChanges();

      const elm = document.querySelector('.slick-pagination');
      const pageInfoFromTo = fixture.debugElement.query(By.css('.page-info-from-to')).nativeElement;
      const pageInfoTotalItems = fixture.debugElement.query(By.css('.page-info-total-items')).nativeElement;

      expect(translate.currentLang).toBe('fr');
      expect(elm.innerHTML).toContain('slick-pagination-nav');
      expect(pageInfoFromTo.innerHTML).toBe('<span data-test="item-from">5</span>-<span data-test="item-to">10</span> de ');
      expect(pageInfoTotalItems.innerHTML).toBe('<span data-test="total-items">100</span> éléments ');
      expect(component.totalItems).toBe(100);
    });

    it('should select the option with the current itemsPerPage in the select dropdown', () => {
      fixture.detectChanges();

      const selectElement = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;

      expect(selectElement.value).toBe('10');
      expect(selectElement.selectedIndex).toBe(1);
      const optionElement = selectElement.selectedOptions.item(0);
      expect(optionElement.value).toBe('10');
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
