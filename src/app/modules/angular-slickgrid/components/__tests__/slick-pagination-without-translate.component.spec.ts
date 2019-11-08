import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { SlickPaginationComponent } from '../slick-pagination.component';
import { Column, GridOption, Locale, Pager } from '../../models';
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

describe('without ngx-translate', () => {
  let fixture: ComponentFixture<SlickPaginationComponent>;
  let component: SlickPaginationComponent;
  let mockPager: Pager;

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

    mockPager = {
      from: 5,
      to: 10,
      itemsPerPage: 5,
      pageCount: 1,
      pageNumber: 2,
      availablePageSizes: [5, 10, 15, 20],
      totalItems: 100,
    };
    component.enableTranslate = false;
    component.grid = gridStub;
    component.options = {
      pageNumber: mockPager.pageNumber,
      pageSizes: mockPager.availablePageSizes,
      pageSize: mockPager.itemsPerPage,
      totalItems: mockPager.totalItems,
    };
    component.backendServiceApi = mockGridOption.backendServiceApi;
    component.totalItems = mockPager.totalItems;
    component.locales = {
      TEXT_ITEMS_PER_PAGE: 'items per page',
      TEXT_ITEMS: 'items',
      TEXT_OF: 'of',
      TEXT_PAGE: 'page'
    } as Locale;

    paginationServiceStub.init(gridStub, dataviewStub, component.options, component.backendServiceApi);
    paginationServiceStub.onPaginationChanged.next(mockPager);
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
      component.ngAfterViewInit();
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
      done();
    }
  });

  it('should have defined locale and expect new text in the UI', (done) => {
    component.enableTranslate = false;
    fixture.detectChanges();
    paginationServiceStub.onPaginationRefreshed.next(true);

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
