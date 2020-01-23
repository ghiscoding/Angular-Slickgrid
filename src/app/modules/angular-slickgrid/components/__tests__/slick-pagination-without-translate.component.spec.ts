import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { SlickPaginationComponent } from '../slick-pagination.component';
import { Locale, ServicePagination } from '../../models';
import { PaginationService } from '../../services';

const paginationServiceStub = {
  dataFrom: 5,
  dataTo: 10,
  pageNumber: 2,
  pageCount: 1,
  itemsPerPage: 5,
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
  onPaginationRefreshed: new Subject<boolean>(),
  onPaginationChanged: new Subject<ServicePagination>(),
} as unknown as PaginationService;

describe('without ngx-translate', () => {
  let fixture: ComponentFixture<SlickPaginationComponent>;
  let component: SlickPaginationComponent;
  let mockServicePagination: ServicePagination;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SlickPaginationComponent
      ],
      providers: [
        { provide: PaginationService, useValue: paginationServiceStub },
      ],
    }).compileComponents();

    // create the component
    fixture = TestBed.createComponent(SlickPaginationComponent);
    component = fixture.debugElement.componentInstance;

    mockServicePagination = {
      dataFrom: 5,
      dataTo: 10,
      pageSize: 5,
      pageCount: 1,
      pageNumber: 2,
      pageSizes: [5, 10, 15, 20],
      totalItems: 100,
    };
    component.enableTranslate = false;
    component.locales = {
      TEXT_ITEMS_PER_PAGE: 'items per page',
      TEXT_ITEMS: 'items',
      TEXT_OF: 'of',
      TEXT_PAGE: 'page'
    } as Locale;

    paginationServiceStub.onPaginationChanged.next(mockServicePagination);
    fixture.detectChanges();
  }));

  afterEach(() => {
    // clear all the spyOn mocks to not influence next test
    jest.clearAllMocks();
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should create the Slick-Pagination component', () => {
    expect(component).toBeTruthy();
  });

  it('should throw an error when "enableTranslate" is set and Translate Service is not provided', (done) => {
    try {
      component.enableTranslate = true;
      component.constructor();
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
      done();
    }
  });

  it('should have defined locale and expect new text in the UI', (done) => {
    component.enableTranslate = false;
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const elm = document.querySelector('.slick-pagination');
      const pageInfoFromTo = fixture.debugElement.query(By.css('.page-info-from-to')).nativeElement;
      const pageInfoTotalItems = fixture.debugElement.query(By.css('.page-info-total-items')).nativeElement;

      expect(elm.innerHTML).toContain('slick-pagination-nav');
      expect(pageInfoFromTo.innerHTML).toBe('<span data-test="item-from">5</span>-<span data-test="item-to">10</span> of ');
      expect(pageInfoTotalItems.innerHTML).toBe('<span data-test="total-items">100</span> items ');
      done();
    }, 10);
  });
});
