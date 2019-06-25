import { TestBed, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  BackendService,
  Column,
  ColumnSort,
  CurrentSorter,
  GridOption,
  SlickEventHandler,
  SortChangedArgs,
  FieldType,
} from '../../models';
import { Filters } from '../../filters';
import { FilterService } from '../filter.service';
import { FilterFactory } from '../../filters/filterFactory';
import { SlickgridConfig, CollectionService } from '../..';
import { of, throwError } from 'rxjs';

declare var Slick: any;

const gridOptionMock = {
  enablePagination: true,
  backendServiceApi: {
    service: undefined,
    preProcess: jest.fn(),
    process: jest.fn(),
    postProcess: jest.fn(),
  }
} as GridOption;

const dataViewStub = {
  refresh: jest.fn(),
  sort: jest.fn(),
  reSort: jest.fn(),
};

const backendServiceStub = {
  clearSorters: jest.fn(),
  getCurrentFilters: jest.fn(),
  getCurrentPagination: jest.fn(),
  getCurrentSorters: jest.fn(),
  processOnSortChanged: (event: Event, args: SortChangedArgs) => 'backend query',
} as unknown as BackendService;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onLocalSortChanged: jest.fn(),
  onSort: new Slick.Event(),
  render: jest.fn(),
  setSortColumns: jest.fn(),
};

describe('FilterService', () => {
  let service: FilterService;
  let slickgridEventHandler: SlickEventHandler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterService,
        CollectionService,
        FilterFactory,
        SlickgridConfig,
      ],
      imports: [
        TranslateModule.forRoot()
      ]
    });
    service = TestBed.get(FilterService);
    slickgridEventHandler = service.eventHandler;
  }));

  afterEach(() => {
    delete gridOptionMock.backendServiceApi;
    jest.clearAllMocks();
    // service.dispose();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('bindBackendOnFilter method', () => {
    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn()))
      };
    });

    it('should call "onBackendFilterChange" when "onSearchChange" event triggered', () => {
      const spy = jest.spyOn(service, 'onBackendFilterChange');

      service.bindBackendOnFilter(gridStub, dataViewStub);
      service.onSearchChange.notify(
        {
          clearFilterTriggered: false,
          shouldTriggerQuery: false,
          columnId: 'firstName',
          columnDef: { id: 'firstName', field: 'firstName' },
          columnFilters: {},
          operator: 'EQ',
          searchTerms: [],
          grid: gridStub
        },
        new Slick.EventData(), gridStub);

      expect(spy).toHaveBeenCalledWith(expect.anything(), { grid: expect.anything(), multiColumnSort: true, sortCols: [] });
    });
  });

  it('should dispose of the event handler', () => {
    const spy = jest.spyOn(slickgridEventHandler, 'unsubscribeAll');
    service.dispose();
    expect(spy).toHaveBeenCalled();
  });
});
