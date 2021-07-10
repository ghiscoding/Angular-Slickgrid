import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { SlickPaginationComponent } from '../slick-pagination.component';
import { GridOption } from '../../models';
import { PaginationService, ServicePagination } from '@slickgrid-universal/common';

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
  onShowPaginationChanged: new Subject<boolean>(),
  onPaginationChanged: new Subject<ServicePagination>(),
} as unknown as PaginationService;

describe('without ngx-translate', () => {
  let fixture: ComponentFixture<SlickPaginationComponent>;
  let component: SlickPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SlickPaginationComponent
      ],
      providers: [],
    }).compileComponents();

    // create the component
    fixture = TestBed.createComponent(SlickPaginationComponent);
    component = fixture.debugElement.componentInstance;
    component.paginationService = paginationServiceStub;

    component.gridOptions = { enableTranslate: false } as GridOption;

    fixture.detectChanges();
  });

  afterEach(() => {
    // clear all the spyOn mocks to not influence next test
    jest.clearAllMocks();
    fixture.destroy();
  });

  it('should create the Slick-Pagination component', () => {
    expect(component).toBeTruthy();
  });

  it('should throw an error when "enableTranslate" is set and Translate Service is not provided', (done) => {
    try {
      component.gridOptions.enableTranslate = true;
      component.ngOnInit();
    } catch (e) {
      expect(e.toString()).toContain('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
      done();
    }
  });

  it('should have defined locale and expect new text in the UI', (done) => {
    component.gridOptions.enableTranslate = false;
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const elm = document.querySelector('.slick-pagination') as HTMLDivElement;
      const pageInfoFromTo = fixture.debugElement.query(By.css('.page-info-from-to')).nativeElement;
      const pageInfoTotalItems = fixture.debugElement.query(By.css('.page-info-total-items')).nativeElement;

      expect(elm.innerHTML).toContain('slick-pagination-nav');
      expect(pageInfoFromTo.innerHTML).toBe('<span data-test="item-from">5</span>-<span data-test="item-to">10</span> of ');
      expect(pageInfoTotalItems.innerHTML).toBe('<span data-test="total-items">100</span> items ');
      done();
    }, 10);
  });
});
