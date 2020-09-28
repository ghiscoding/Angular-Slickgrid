// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import {
  BackendService,
  Column,
  CurrentFilter,
  GridOption,
  FieldType,
  SlickEventHandler,
} from '../../models';
import { Filters } from '../../filters';
import { FilterService } from '../filter.service';
import { FilterFactory } from '../../filters/filterFactory';
import { SharedService } from '../shared.service';
import { SlickgridConfig, CollectionService } from '../..';
import * as utilities from '../../services/backend-utilities';

const mockRefreshBackendDataset = jest.fn();
// @ts-ignore
utilities.refreshBackendDataset = mockRefreshBackendDataset;

declare const Slick: any;
const DOM_ELEMENT_ID = 'row-detail123';

const gridOptionMock = {
  enablePagination: true,
  enableFiltering: true,
  backendServiceApi: {
    service: undefined,
    preProcess: jest.fn(),
    process: jest.fn(),
    postProcess: jest.fn(),
  }
} as GridOption;

const dataViewStub = {
  getIdxById: jest.fn(),
  getItemById: jest.fn(),
  getItems: jest.fn(),
  refresh: jest.fn(),
  reSort: jest.fn(),
  setFilter: jest.fn(),
  setFilterArgs: jest.fn(),
  sort: jest.fn(),
};

const backendServiceStub = {
  buildQuery: jest.fn(),
  clearFilters: jest.fn(),
  getCurrentFilters: jest.fn(),
  getCurrentPagination: jest.fn(),
  updateFilters: jest.fn(),
  processOnFilterChanged: () => 'backend query',
} as unknown as BackendService;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getData: () => dataViewStub,
  getHeaderRowColumn: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onLocalSortChanged: jest.fn(),
  onSort: new Slick.Event(),
  onHeaderRowCellRendered: new Slick.Event(),
  render: jest.fn(),
  setColumns: jest.fn(),
  setOptions: jest.fn(),
  setHeaderRowVisibility: jest.fn(),
  setSortColumns: jest.fn(),
};

describe('FilterService', () => {
  let service: FilterService;
  let sharedService: SharedService;
  let slickgridEventHandler: SlickEventHandler;
  const consoleSpy = jest.spyOn(global.console, 'warn').mockReturnValue();

  beforeEach(async(() => {
    // define a <div> container to simulate a row detail DOM element
    const div = document.createElement('div');
    div.innerHTML = `<div id="${DOM_ELEMENT_ID}">some text</div>`;
    document.body.appendChild(div);

    TestBed.configureTestingModule({
      providers: [
        FilterService,
        CollectionService,
        FilterFactory,
        SharedService,
        SlickgridConfig,
      ],
      imports: [
        TranslateModule.forRoot()
      ]
    });
    service = TestBed.get(FilterService);
    sharedService = TestBed.get(SharedService);
    slickgridEventHandler = service.eventHandler;
  }));

  afterEach(() => {
    delete gridOptionMock.backendServiceApi;
    jest.clearAllMocks();
    service.dispose();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should dispose of the event handler', () => {
    const spy = jest.spyOn(slickgridEventHandler, 'unsubscribeAll');
    service.dispose();
    expect(spy).toHaveBeenCalled();
  });

  describe('bindBackendOnFilter method', () => {
    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        filterTypingDebounce: 0,
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn())),
      };
    });

    it('should create a filter and its metadata when "onHeaderRowCellRendered" event is triggered', () => {
      const mockArgs = {
        grid: gridStub,
        column: { id: 'firstName', field: 'firstName', filterable: true } as Column,
        node: document.getElementById(DOM_ELEMENT_ID),
      };

      service.init(gridStub);
      service.bindBackendOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      const columnFilters = service.getColumnFilters();
      const filterMetadataArray = service.getFiltersMetadata();

      expect(columnFilters).toEqual({});
      expect(filterMetadataArray.length).toBe(1);
      expect(filterMetadataArray[0]).toContainEntry(['$filterElm', expect.anything()]);
      expect(filterMetadataArray[0]).toContainEntry(['searchTerms', []]);
    });

    it('should call the same filter twice but expect the filter to be rendered only once', () => {
      const mockColumn = {
        id: 'isActive', field: 'isActive', filterable: true,
        filter: {
          model: Filters.singleSelect, searchTerms: [true], collection: [{ value: true, label: 'True' }, { value: false, label: 'False' }],
        }
      } as Column;
      const mockArgs = { grid: gridStub, column: mockColumn, node: document.getElementById(DOM_ELEMENT_ID), };

      service.init(gridStub);
      service.bindBackendOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      const columnFilters = service.getColumnFilters();
      const filterMetadataArray = service.getFiltersMetadata();

      expect(service.isFilterFirstRender).toBe(false);
      expect(columnFilters).toEqual({
        isActive: { columnDef: mockColumn, columnId: 'isActive', operator: 'EQ', searchTerms: [true], },
      });
      expect(filterMetadataArray.length).toBe(1);
      expect(filterMetadataArray[0]).toContainEntry(['$filterElm', expect.anything()]);
      expect(filterMetadataArray[0]).toContainEntry(['searchTerms', [true]]);
    });

    it('should call "onBackendFilterChange" when "onSearchChange" event is triggered', (done) => {
      const expectationCurrentFilters = [{ columnId: 'isActive', operator: 'EQ', searchTerms: ['John'] }] as CurrentFilter[];
      const mockColumn = {
        id: 'isActive', field: 'isActive', filterable: true,
        filter: {
          model: Filters.singleSelect, searchTerms: [true], collection: [{ value: true, label: 'True' }, { value: false, label: 'False' }],
        }
      } as Column;
      const mockSearchArgs = {
        clearFilterTriggered: false,
        shouldTriggerQuery: true,
        columnId: 'isActive',
        columnDef: mockColumn,
        operator: 'EQ',
        searchTerms: ['John'],
        grid: gridStub
      };
      const mockHeaderArgs = { grid: gridStub, column: mockColumn, node: document.getElementById(DOM_ELEMENT_ID), };
      const spyCurrentFilters = jest.spyOn(gridOptionMock.backendServiceApi.service, 'getCurrentFilters').mockReturnValue(expectationCurrentFilters);
      const spyBackendChange = jest.spyOn(service, 'onBackendFilterChange');
      const spyRxjs = jest.spyOn(service.onFilterChanged, 'next');

      service.init(gridStub);
      service.bindBackendOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockHeaderArgs, new Slick.EventData(), gridStub);
      service.onSearchChange.notify(mockSearchArgs, new Slick.EventData(), gridStub);

      expect(spyBackendChange).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, ...mockSearchArgs });
      setTimeout(() => {
        expect(spyCurrentFilters).toHaveBeenCalled();
        expect(spyRxjs).toHaveBeenCalledWith(expectationCurrentFilters);
        done();
      });
    });
  });

  describe('bindLocalOnFilter method', () => {
    beforeEach(() => {
      gridOptionMock.backendServiceApi = undefined;
    });

    it('should create a filter and its metadata when "onHeaderRowCellRendered" event is triggered', () => {
      const mockArgs = {
        grid: gridStub,
        column: { id: 'firstName', field: 'firstName', filterable: true } as Column,
        node: document.getElementById(DOM_ELEMENT_ID),
      };

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      const columnFilters = service.getColumnFilters();
      const filterMetadataArray = service.getFiltersMetadata();

      expect(columnFilters).toEqual({});
      expect(filterMetadataArray.length).toBe(1);
      expect(filterMetadataArray[0]).toContainEntry(['$filterElm', expect.anything()]);
      expect(filterMetadataArray[0]).toContainEntry(['searchTerms', []]);
    });

    it('should call "onFilterChanged" when "onSearchChange" event is triggered', () => {
      const spy = jest.spyOn(service.onFilterChanged, 'next');
      const mockArgs = {
        clearFilterTriggered: false,
        shouldTriggerQuery: true,
        columnId: 'firstName',
        columnDef: { id: 'firstName', field: 'firstName', filterable: true } as Column,
        operator: 'EQ',
        searchTerms: ['John'],
        grid: gridStub
      };

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      service.onSearchChange.notify(mockArgs, new Slick.EventData(), gridStub);

      expect(spy).toHaveBeenCalledWith([]);
    });

    it('should call "onFilterChanged" with column filter when both onHeaderRowCellRendered" and "onSearchChange" events are triggered', () => {
      const spy = jest.spyOn(service.onFilterChanged, 'next');
      const mockColumn = {
        id: 'firstName', field: 'firstName', filterable: true,
        filter: {
          model: Filters.singleSelect, searchTerms: [true], collection: [{ value: true, label: 'True' }, { value: false, label: 'False' }],
        }
      } as Column;
      const mockHeaderArgs = { grid: gridStub, column: mockColumn, node: document.getElementById(DOM_ELEMENT_ID), };
      const mockSearchArgs = {
        clearFilterTriggered: false,
        shouldTriggerQuery: true,
        columnId: 'firstName',
        columnDef: { id: 'firstName', field: 'firstName', filterable: true } as Column,
        operator: 'EQ',
        searchTerms: ['John'],
        grid: gridStub
      };

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockHeaderArgs, new Slick.EventData(), gridStub);
      service.onSearchChange.notify(mockSearchArgs, new Slick.EventData(), gridStub);

      expect(spy).toHaveBeenCalledWith([{ columnId: 'firstName', operator: 'EQ', searchTerms: [true] }]);
    });
  });

  // this is a private method test, but we can access it by triggering a Filter Search event or through the Filter metadata
  describe('callbackSearchEvent (private) method', () => {
    let mockColumn: Column;
    let mockArgs;

    beforeEach(() => {
      gridOptionMock.backendServiceApi = undefined;
      mockColumn = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      mockArgs = { grid: gridStub, column: mockColumn, node: document.getElementById(DOM_ELEMENT_ID) };
    });

    it('should execute the callback normally when a keyup event is triggered and searchTerms are defined', () => {
      const expectationColumnFilter = { columnDef: mockColumn, columnId: 'firstName', operator: 'EQ', searchTerms: ['John'] };
      const spySearchChange = jest.spyOn(service.onSearchChange, 'notify');

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(new Event('keyup'), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['John'], shouldTriggerQuery: true });

      expect(service.getColumnFilters()).toContainEntry(['firstName', expectationColumnFilter]);
      expect(spySearchChange).toHaveBeenCalledWith({
        clearFilterTriggered: undefined,
        shouldTriggerQuery: true,
        columnId: 'firstName',
        columnDef: mockColumn,
        columnFilters: { firstName: expectationColumnFilter },
        operator: 'EQ',
        searchTerms: ['John'],
        grid: gridStub
      }, expect.anything());
    });

    it('should execute the callback normally when a keyup event is triggered and the searchTerm comes from this event.target', () => {
      const expectationColumnFilter = { columnDef: mockColumn, columnId: 'firstName', operator: 'EQ', searchTerms: ['John'] };
      const spySearchChange = jest.spyOn(service.onSearchChange, 'notify');

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);

      const mockEvent = new Event('keyup');
      Object.defineProperty(mockEvent, 'target', { writable: true, configurable: true, value: { value: 'John' } });
      service.getFiltersMetadata()[0].callback(mockEvent, { columnDef: mockColumn, operator: 'EQ', shouldTriggerQuery: true });

      expect(service.getColumnFilters()).toContainEntry(['firstName', expectationColumnFilter]);
      expect(spySearchChange).toHaveBeenCalledWith({
        clearFilterTriggered: undefined,
        shouldTriggerQuery: true,
        columnId: 'firstName',
        columnDef: mockColumn,
        columnFilters: { firstName: expectationColumnFilter },
        operator: 'EQ',
        searchTerms: ['John'],
        grid: gridStub
      }, expect.anything());
    });

    it('should delete the column filters entry (from column filter object) when searchTerms is empty', () => {
      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(new Event('keyup'), { columnDef: mockColumn, operator: 'EQ', searchTerms: [''], shouldTriggerQuery: true });

      expect(service.getColumnFilters()).toEqual({});
    });

    it('should delete the column filters entry (from column filter object) when searchTerms is empty array and even when triggered event is undefined', () => {
      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(undefined, { columnDef: mockColumn, operator: 'EQ', searchTerms: [], shouldTriggerQuery: true });

      expect(service.getColumnFilters()).toEqual({});
    });

    it('should delete the column filters entry (from column filter object) when searchTerms & operator are undefined or not provided', () => {
      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(undefined, { columnDef: mockColumn, shouldTriggerQuery: true });

      expect(service.getColumnFilters()).toEqual({});
    });

    it('should have an column filters object when callback is called with an undefined column definition', () => {
      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(undefined, { columnDef: undefined, operator: 'EQ', searchTerms: ['John'], shouldTriggerQuery: true });

      expect(service.getColumnFilters()).toEqual({});
    });
  });

  describe('clearFilter methods on backend grid', () => {
    let mockColumn1: Column;
    let mockColumn2: Column;
    let mockColumn3: Column;

    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        filterTypingDebounce: 0,
        service: backendServiceStub,
        process: () => of([]),
      };
      mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      mockColumn2 = { id: 'lastName', field: 'lastName', filterable: true } as Column;
      mockColumn3 = { id: 'age', field: 'age', filterable: true } as Column;
      const mockArgs1 = { grid: gridStub, column: mockColumn1, node: document.getElementById(DOM_ELEMENT_ID) };
      const mockArgs2 = { grid: gridStub, column: mockColumn2, node: document.getElementById(DOM_ELEMENT_ID) };
      const mockArgs3 = { grid: gridStub, column: mockColumn3, node: document.getElementById(DOM_ELEMENT_ID) };

      service.init(gridStub);
      service.bindBackendOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs3, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(new Event('keyup'), { columnDef: mockColumn1, operator: 'EQ', searchTerms: ['John'], shouldTriggerQuery: true });
      service.getFiltersMetadata()[1].callback(new Event('keyup'), { columnDef: mockColumn2, operator: 'NE', searchTerms: ['Doe'], shouldTriggerQuery: true });
    });

    describe('clearFilterByColumnId method', () => {
      it('should clear the filter by passing a column id as argument on a backend grid', () => {
        const filterExpectation = { columnDef: mockColumn2, columnId: 'lastName', operator: 'NE', searchTerms: ['Doe'] };
        const newEvent = new Event('mouseup');
        const spyClear = jest.spyOn(service.getFiltersMetadata()[0], 'clear');
        const spyFilterChange = jest.spyOn(service, 'onBackendFilterChange');
        const spyEmitter = jest.spyOn(service, 'emitFilterChanged');

        const filterCountBefore = Object.keys(service.getColumnFilters()).length;
        service.clearFilterByColumnId(newEvent, 'firstName');
        const filterCountAfter = Object.keys(service.getColumnFilters()).length;

        expect(spyClear).toHaveBeenCalled();
        expect(spyFilterChange).toHaveBeenCalledWith(newEvent, { grid: gridStub, columnFilters: { lastName: filterExpectation } });
        expect(filterCountBefore).toBe(2);
        expect(filterCountAfter).toBe(1);
        expect(service.getColumnFilters()).toEqual({ lastName: filterExpectation });
        expect(spyEmitter).toHaveBeenCalledWith('remote');
      });

      it('should not call "onBackendFilterChange" method when the filter is previously empty', () => {
        const filterFirstExpectation = { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: ['John'] };
        const filterLastExpectation = { columnDef: mockColumn2, columnId: 'lastName', operator: 'NE', searchTerms: ['Doe'] };
        const newEvent = new Event('mouseup');
        const spyClear = jest.spyOn(service.getFiltersMetadata()[2], 'clear');
        const spyFilterChange = jest.spyOn(service, 'onBackendFilterChange');
        const spyEmitter = jest.spyOn(service, 'emitFilterChanged');

        const filterCountBefore = Object.keys(service.getColumnFilters()).length;
        service.clearFilterByColumnId(newEvent, 'age');
        const filterCountAfter = Object.keys(service.getColumnFilters()).length;

        expect(spyClear).toHaveBeenCalled();
        expect(spyFilterChange).not.toHaveBeenCalled();
        expect(filterCountBefore).toBe(2);
        expect(filterCountAfter).toBe(2);
        expect(service.getColumnFilters()).toEqual({ firstName: filterFirstExpectation, lastName: filterLastExpectation });
        expect(spyEmitter).toHaveBeenCalledWith('remote');
      });
    });

    describe('clearFilters method', () => {
      it('should clear all the Filters when the query response is a string', () => {
        gridOptionMock.backendServiceApi.service.processOnFilterChanged = () => 'filter query string';
        const spyClear = jest.spyOn(service.getFiltersMetadata()[0], 'clear');
        const spyFilterChange = jest.spyOn(service, 'onBackendFilterChange');
        const spyEmitter = jest.spyOn(service, 'emitFilterChanged');
        const spyProcess = jest.spyOn(gridOptionMock.backendServiceApi, 'process');

        const filterCountBefore = Object.keys(service.getColumnFilters()).length;
        service.clearFilters();

        expect(spyClear).toHaveBeenCalled();
        expect(filterCountBefore).toBe(2);
        expect(spyProcess).toHaveBeenCalledWith('filter query string');
        expect(service.getColumnFilters()).toEqual({});
        expect(spyFilterChange).not.toHaveBeenCalled();
        expect(spyEmitter).not.toHaveBeenCalled();
      });

      it('should clear all the Filters when the query response is a Promise (will be deprecated in future)', (done) => {
        gridOptionMock.backendServiceApi.service.processOnFilterChanged = () => Promise.resolve('filter query from Promise');
        const spyClear = jest.spyOn(service.getFiltersMetadata()[0], 'clear');
        const spyFilterChange = jest.spyOn(service, 'onBackendFilterChange');
        const spyEmitter = jest.spyOn(service, 'emitFilterChanged');
        const spyProcess = jest.spyOn(gridOptionMock.backendServiceApi, 'process');

        const filterCountBefore = Object.keys(service.getColumnFilters()).length;
        service.clearFilters();

        setTimeout(() => {
          expect(spyClear).toHaveBeenCalled();
          expect(filterCountBefore).toBe(2);
          expect(spyProcess).toHaveBeenCalledWith('filter query from Promise');
          expect(service.getColumnFilters()).toEqual({});
          expect(spyFilterChange).not.toHaveBeenCalled();
          expect(spyEmitter).not.toHaveBeenCalled();
          expect(consoleSpy).toHaveBeenCalledWith(expect.toInclude('[Angular-Slickgrid] please note that the "processOnFilterChanged" from your Backend Service, should now return a string instead of a Promise.'));
          done();
        });
      });

      it('should execute the "onError" method when the Promise throws an error', (done) => {
        const errorExpected = 'promise error';
        gridOptionMock.backendServiceApi.process = () => Promise.reject(errorExpected);
        gridOptionMock.backendServiceApi.onError = (e) => jest.fn();
        const spyOnCleared = jest.spyOn(service.onFilterCleared, 'next');
        const spyOnError = jest.spyOn(gridOptionMock.backendServiceApi, 'onError');
        jest.spyOn(gridOptionMock.backendServiceApi, 'process');

        service.clearFilters();

        setTimeout(() => {
          expect(spyOnCleared).toHaveBeenCalledWith(true);
          expect(spyOnError).toHaveBeenCalledWith(errorExpected);
          done();
        });
      });

      it('should execute the "onError" method when the Observable throws an error', (done) => {
        const errorExpected = 'observable error';
        const spyProcess = jest.fn();
        gridOptionMock.backendServiceApi.process = () => of(spyProcess);
        gridOptionMock.backendServiceApi.onError = (e) => jest.fn();
        const spyOnCleared = jest.spyOn(service.onFilterCleared, 'next');
        const spyOnError = jest.spyOn(gridOptionMock.backendServiceApi, 'onError');
        jest.spyOn(gridOptionMock.backendServiceApi, 'process').mockReturnValue(throwError(errorExpected));

        service.clearFilters();

        setTimeout(() => {
          expect(spyOnCleared).toHaveBeenCalledWith(true);
          expect(spyOnError).toHaveBeenCalledWith(errorExpected);
          done();
        });
      });
    });
  });

  describe('clearFilter methods on local grid', () => {
    let mockColumn1: Column;
    let mockColumn2: Column;

    beforeEach(() => {
      gridOptionMock.backendServiceApi = undefined;
      mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      mockColumn2 = { id: 'lastName', field: 'lastName', filterable: true } as Column;
      const mockArgs1 = { grid: gridStub, column: mockColumn1, node: document.getElementById(DOM_ELEMENT_ID) };
      const mockArgs2 = { grid: gridStub, column: mockColumn2, node: document.getElementById(DOM_ELEMENT_ID) };

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);
      service.getFiltersMetadata()[0].callback(new Event('keyup'), { columnDef: mockColumn1, operator: 'EQ', searchTerms: ['John'], shouldTriggerQuery: true });
      service.getFiltersMetadata()[1].callback(new Event('keyup'), { columnDef: mockColumn2, operator: 'NE', searchTerms: ['Doe'], shouldTriggerQuery: true });
    });

    describe('clearFilterByColumnId method', () => {
      it('should clear the filter by passing a column id as argument on a local grid', () => {
        const spyClear = jest.spyOn(service.getFiltersMetadata()[0], 'clear');
        const spyEmitter = jest.spyOn(service, 'emitFilterChanged');

        const filterCountBefore = Object.keys(service.getColumnFilters()).length;
        service.clearFilterByColumnId(new Event('mouseup'), 'firstName');
        const filterCountAfter = Object.keys(service.getColumnFilters()).length;

        expect(spyClear).toHaveBeenCalled();
        expect(filterCountBefore).toBe(2);
        expect(filterCountAfter).toBe(1);
        expect(service.getColumnFilters()).toEqual({ lastName: { columnDef: mockColumn2, columnId: 'lastName', operator: 'NE', searchTerms: ['Doe'] } });
        expect(spyEmitter).toHaveBeenCalledWith('local');
      });
    });
  });

  describe('customLocalFilter method', () => {
    let mockItem1;

    beforeEach(() => {
      jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(0);
      mockItem1 = { firstName: 'John', lastName: 'Doe', fullName: 'John Doe', age: 26, address: { zip: 123456 } };
    });

    it('should return True (nothing to filter, all rows will be returned) when there are no column definition found', () => {
      const searchValue = 'John';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is the same as the searchTerms', () => {
      const searchValue = 'John';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should work on a hidden column by using the sharedService "allColumns" and return True when input value the same as the searchTerms', () => {
      const searchValue = 'John';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      sharedService.allColumns = [mockColumn1];
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when the searchTerms is an empty array', () => {
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when the searchTerms is equal to the operator', () => {
      const mockColumn1 = { id: 'age', field: 'age', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { age: { columnDef: mockColumn1, columnId: 'age', operator: '<=', searchTerms: ['<='] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return False when input value from datacontext is not equal to the searchTerms', () => {
      const searchValue = 'Johnny';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(false);
    });

    it('should work on a hidden column by using the sharedService "allColumns" and return return False when input value is not equal to the searchTerms', () => {
      const searchValue = 'Johnny';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      sharedService.allColumns = [mockColumn1];
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(false);
    });

    it('should return True when input value from datacontext is a number and searchTerms is also a number', () => {
      const searchValue = 26;
      const mockColumn1 = { id: 'age', field: 'age', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { age: { columnDef: mockColumn1, columnId: 'age', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is a number, "filterSearchType" is a FieldType number and finally searchTerms is also a number', () => {
      const searchValue = 26;
      const mockColumn1 = { id: 'age', field: 'age', filterable: true, filterSearchType: FieldType.number } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { age: { columnDef: mockColumn1, columnId: 'age', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is equal to startsWith substring', () => {
      const searchValue = 'Jo*';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'EQ', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is equal to startsWith substring when using Operator startsWith', () => {
      const searchValue = 'Jo';
      const operator = 'a*';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator, searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is equal to startsWith substring when having (*) as the last character in the searchTerms', () => {
      const searchValue = 'Jo*';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is equal to endsWith substring', () => {
      const searchValue = '*hn';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is equal to endsWith substring when using Operator endsWith', () => {
      const searchValue = '*hn';
      const operator = '*z';
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator, searchTerms: [searchValue] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value from datacontext is IN searchTerms', () => {
      const customFirstNameFormatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any) => dataContext.fullName.split(' ')[0];
      const mockColumn1 = { id: 'firstName', field: 'firstName', filterable: true, formatter: customFirstNameFormatter, params: { useFormatterOuputToFilter: true } } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { firstName: { columnDef: mockColumn1, columnId: 'firstName', operator: 'IN', searchTerms: ['Jane', 'John'] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when input value is a complex object searchTerms value is found following the dot notation', () => {
      const mockColumn1 = { id: 'zip', field: 'zip', filterable: true, queryFieldFilter: 'address.zip' } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { zip: { columnDef: mockColumn1, columnId: 'zip', operator: 'EQ', searchTerms: [123456] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when using row detail and the item is found in its parent', () => {
      gridOptionMock.enableRowDetailView = true;
      const mockColumn1 = { id: 'zip', field: 'zip', filterable: true, queryFieldFilter: 'address.zip' } as Column;
      const mockItem2 = { __isPadding: true, __parent: mockItem1 };
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { zip: { columnDef: mockColumn1, columnId: 'zip', operator: 'EQ', searchTerms: [123456] } };
      const output = service.customLocalFilter(mockItem2, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should return True when using row detail custom "keyPrefix" and the item is found in its parent', () => {
      // @ts-ignore
      gridOptionMock.rowDetailView = { keyPrefix: 'prefix_' };
      gridOptionMock.enableRowDetailView = true;
      const mockColumn1 = { id: 'zip', field: 'zip', filterable: true, queryFieldFilter: 'address.zip' } as Column;
      const mockItem2 = { prefix_isPadding: true, prefix_parent: mockItem1 };
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { zip: { columnDef: mockColumn1, columnId: 'zip', operator: 'EQ', searchTerms: [123456] } };
      const output = service.customLocalFilter(mockItem2, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should execute "queryFieldNameGetterFn()" callback and return True when input value matches the full name', () => {
      const mockColumn1 = { id: 'name', field: 'name', filterable: true, queryFieldNameGetterFn: (dataContext) => 'fullName' } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { name: { columnDef: mockColumn1, columnId: 'name', operator: 'EQ', searchTerms: ['John Doe'] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(true);
    });

    it('should execute "queryFieldNameGetterFn()" callback and return False when input value is not fullName but just the firstName', () => {
      const mockColumn1 = { id: 'name', field: 'name', filterable: true, queryFieldNameGetterFn: (dataContext) => 'fullName' } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { name: { columnDef: mockColumn1, columnId: 'name', operator: 'EQ', searchTerms: ['John'] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(false);
    });

    it('should execute "queryFieldNameGetterFn()" callback and return False when input value is not fullName but just the lastName', () => {
      const mockColumn1 = { id: 'name', field: 'name', filterable: true, queryFieldNameGetterFn: (dataContext) => 'fullName' } as Column;
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1]);
      jest.spyOn(dataViewStub, 'getIdxById').mockReturnValue(0);

      service.init(gridStub);
      const columnFilters = { name: { columnDef: mockColumn1, columnId: 'name', operator: 'EQ', searchTerms: ['Doe'] } };
      const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

      expect(output).toBe(false);
    });
  });

  describe('onBackendFilterChange method', () => {
    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        preProcess: jest.fn(),
        process: jest.fn(),
        postProcess: jest.fn(),
      };
    });

    it('should throw an error when grid argument is undefined', (done) => {
      service.onBackendFilterChange(undefined, undefined).catch((error) => {
        expect(error.message).toContain(`Something went wrong when trying to bind the "onBackendFilterChange(event, args)" function`);
        done();
      });
    });

    it('should throw an error when grid argument is an empty object', (done) => {
      service.onBackendFilterChange(undefined, {}).catch((error) => {
        expect(error.message).toContain(`Something went wrong when trying to bind the "onBackendFilterChange(event, args)" function`);
        done();
      });
    });

    it('should throw an error when backendServiceApi is undefined', (done) => {
      gridOptionMock.backendServiceApi = undefined;

      service.onBackendFilterChange(undefined, { grid: gridStub }).catch((error) => {
        expect(error.message).toContain(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        done();
      });
    });

    it('should execute "preProcess" method when it is defined', () => {
      const spy = jest.spyOn(gridOptionMock.backendServiceApi, 'preProcess');

      service.init(gridStub);
      service.onBackendFilterChange(undefined, { grid: gridStub });

      expect(spy).toHaveBeenCalled();
    });

    it('should execute "processOnFilterChanged" method when "shouldTriggerQuery" is set to True and "debounceTypingDelay" is bigger than 0', (done) => {
      gridOptionMock.backendServiceApi.filterTypingDebounce = 1;
      const spy = jest.spyOn(gridOptionMock.backendServiceApi.service, 'processOnFilterChanged').mockReturnValue('backend query');

      service.init(gridStub);
      const mockEvent = new Event('keyup');
      Object.defineProperty(new Event('keyup'), 'target', { writable: true, configurable: true, value: { value: 'John' } });

      // @ts-ignore
      service.onBackendFilterChange(mockEvent, { grid: gridStub, shouldTriggerQuery: true });

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        done();
      }, 1);
    });
  });

  describe('populateColumnFilterSearchTermPresets method', () => {
    beforeEach(() => {
      gridStub.getColumns = jest.fn();
      gridOptionMock.presets = {
        filters: [{ columnId: 'gender', searchTerms: ['male'], operator: 'EQ' }],
        sorters: [{ columnId: 'name', direction: 'asc' }],
        pagination: { pageNumber: 2, pageSize: 20 }
      };
    });

    it('should return an empty array when column definitions returns nothing as well', () => {
      gridStub.getColumns = undefined;

      service.init(gridStub);
      const output = service.populateColumnFilterSearchTermPresets(undefined);

      expect(output).toEqual([]);
    });

    it('should populate presets and remove column definitions searchTerms to be replaced by the presets values', () => {
      const spy = jest.spyOn(gridStub, 'getColumns').mockReturnValue([
        { id: 'name', field: 'name', filter: { model: Filters.input, operator: 'EQ', searchTerms: ['John'] } },
        { id: 'gender', field: 'gender' }
      ]);

      service.init(gridStub);
      const output = service.populateColumnFilterSearchTermPresets(gridOptionMock.presets.filters);

      expect(spy).toHaveBeenCalled();
      expect(output).toEqual([
        { id: 'name', field: 'name', filter: { model: Filters.input, operator: 'EQ' } },
        { id: 'gender', field: 'gender', filter: { operator: 'EQ', searchTerms: ['male'] } },
      ]);
    });

    it('should use the column definition operator when not provided in the presets filter', () => {
      gridOptionMock.presets = {
        filters: [{ columnId: 'gender', searchTerms: ['male'] }],
        sorters: [{ columnId: 'name', direction: 'asc' }],
        pagination: { pageNumber: 2, pageSize: 20 }
      };
      const spy = jest.spyOn(gridStub, 'getColumns').mockReturnValue([
        { id: 'name', field: 'name' },
        { id: 'gender', field: 'gender', filter: { model: Filters.input, operator: 'EQ', searchTerms: ['male'] } }
      ]);

      service.init(gridStub);
      const output = service.populateColumnFilterSearchTermPresets(gridOptionMock.presets.filters);

      expect(spy).toHaveBeenCalled();
      expect(output).toEqual([
        { id: 'name', field: 'name' },
        { id: 'gender', field: 'gender', filter: { model: Filters.input, operator: 'EQ', searchTerms: ['male'] } },
      ]);
    });

    it('should have an operator with empty string when it is not provided in the presets filter neither in its column definition', () => {
      gridOptionMock.presets = {
        filters: [{ columnId: 'gender', searchTerms: ['male'] }],
        sorters: [{ columnId: 'name', direction: 'asc' }],
        pagination: { pageNumber: 2, pageSize: 20 }
      };
      const spy = jest.spyOn(gridStub, 'getColumns').mockReturnValue([
        { id: 'name', field: 'name' },
        { id: 'gender', field: 'gender' }
      ]);

      service.init(gridStub);
      const output = service.populateColumnFilterSearchTermPresets(gridOptionMock.presets.filters);

      expect(spy).toHaveBeenCalled();
      expect(output).toEqual([
        { id: 'name', field: 'name' },
        { id: 'gender', field: 'gender', filter: { operator: '', searchTerms: ['male'] } },
      ]);
    });

    it('should pre-filter the tree dataset when the grid is a Tree Data View', () => {
      const spyRefresh = jest.spyOn(dataViewStub, 'refresh');
      const spyPreFilter = jest.spyOn(service, 'preFilterTreeData');
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([
        { id: 'name', field: 'name', filter: { model: Filters.input, operator: 'EQ' } },
        { id: 'gender', field: 'gender' },
        { id: 'size', field: 'size', filter: { model: Filters.input, operator: '>=' } }
      ]);
      gridOptionMock.enableTreeData = true;
      gridOptionMock.treeDataOptions = { columnId: 'file', childrenPropName: 'files' };
      gridOptionMock.presets = {
        filters: [{ columnId: 'size', searchTerms: [20], operator: '>=' }]
      };
      service.init(gridStub);
      const output = service.populateColumnFilterSearchTermPresets(gridOptionMock.presets.filters);

      expect(spyGetCols).toHaveBeenCalled();
      expect(spyRefresh).toHaveBeenCalled();
      expect(spyPreFilter).toHaveBeenCalled();
      expect(output).toEqual([
        { id: 'name', field: 'name', filter: { model: Filters.input, operator: 'EQ' } },
        { id: 'gender', field: 'gender', },
        { id: 'size', field: 'size', filter: { model: Filters.input, operator: '>=', searchTerms: [20] } },
      ]);
    });
  });

  describe('updateFilters method', () => {
    let mockColumn1: Column;
    let mockColumn2: Column;
    let mockArgs1;
    let mockArgs2;
    let mockNewFilters: CurrentFilter[];

    beforeEach(() => {
      gridOptionMock.enableFiltering = true;
      gridOptionMock.backendServiceApi = undefined;
      mockColumn1 = { id: 'firstName', name: 'firstName', field: 'firstName', filterable: true, filter: { model: Filters.compoundInputText } };
      mockColumn2 = { id: 'isActive', name: 'isActive', field: 'isActive', filterable: true, filter: { model: Filters.singleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False' }], } };
      mockArgs1 = { grid: gridStub, column: mockColumn1, node: document.getElementById(DOM_ELEMENT_ID) };
      mockArgs2 = { grid: gridStub, column: mockColumn2, node: document.getElementById(DOM_ELEMENT_ID) };
      mockNewFilters = [
        { columnId: 'firstName', searchTerms: ['Jane'], operator: 'StartsWith' },
        { columnId: 'isActive', searchTerms: [false] }
      ];
    });

    it('should throw an error when there are no filters defined in the column definitions', (done) => {
      try {
        gridOptionMock.enableFiltering = false;
        service.init(gridStub);
        service.bindLocalOnFilter(gridStub);
        service.updateFilters([{ columnId: 'firstName', searchTerms: ['John'] }]);
      } catch (e) {
        expect(e.toString()).toContain('[Angular-Slickgrid] in order to use "updateFilters" method, you need to have Filterable Columns defined in your grid');
        done();
      }
    });

    it('should call "clearFilters" without triggering a clear event but trigger an "emitFilterChanged" local when using "bindLocalOnFilter" and also expect filters to be set in ColumnFilters', () => {
      const clearSpy = jest.spyOn(service, 'clearFilters');
      const emitSpy = jest.spyOn(service, 'emitFilterChanged');

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);
      service.updateFilters(mockNewFilters);

      expect(emitSpy).toHaveBeenCalledWith('local');
      expect(clearSpy).toHaveBeenCalledWith(false);
      expect(service.getColumnFilters()).toEqual({
        firstName: { columnId: 'firstName', columnDef: mockColumn1, searchTerms: ['Jane'], operator: 'StartsWith' },
        isActive: { columnId: 'isActive', columnDef: mockColumn2, searchTerms: [false], operator: 'EQ' }
      });
    });

    it('should expect filters to be set in ColumnFilters when using "bindLocalOnFilter" without triggering a filter changed event when 2nd flag argument is set to false', () => {
      const clearSpy = jest.spyOn(service, 'clearFilters');
      const emitSpy = jest.spyOn(service, 'emitFilterChanged');

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);
      service.updateFilters(mockNewFilters, false);

      expect(emitSpy).not.toHaveBeenCalled();
      expect(clearSpy).toHaveBeenCalledWith(false);
      expect(service.getColumnFilters()).toEqual({
        firstName: { columnId: 'firstName', columnDef: mockColumn1, searchTerms: ['Jane'], operator: 'StartsWith' },
        isActive: { columnId: 'isActive', columnDef: mockColumn2, searchTerms: [false], operator: 'EQ' }
      });
    });

    it('should call "clearFilters" without triggering a clear event but trigger an "emitFilterChanged" remote when using "bindBackendOnFilter" and also expect filters to be set in ColumnFilters', () => {
      gridOptionMock.backendServiceApi = {
        filterTypingDebounce: 0,
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn())),
      };
      const clearSpy = jest.spyOn(service, 'clearFilters');
      const emitSpy = jest.spyOn(service, 'emitFilterChanged');
      const backendUpdateSpy = jest.spyOn(backendServiceStub, 'updateFilters');
      const backendProcessSpy = jest.spyOn(backendServiceStub, 'processOnFilterChanged');

      service.init(gridStub);
      service.bindBackendOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);
      service.updateFilters(mockNewFilters);

      expect(emitSpy).toHaveBeenCalledWith('remote');
      expect(backendProcessSpy).not.toHaveBeenCalled();
      expect(backendUpdateSpy).toHaveBeenCalledWith(mockNewFilters, true);
      expect(service.getColumnFilters()).toEqual({
        firstName: { columnId: 'firstName', columnDef: mockColumn1, searchTerms: ['Jane'], operator: 'StartsWith' },
        isActive: { columnId: 'isActive', columnDef: mockColumn2, searchTerms: [false], operator: 'EQ' }
      });
      expect(clearSpy).toHaveBeenCalledWith(false);
      expect(mockRefreshBackendDataset).toHaveBeenCalledWith(gridOptionMock);
    });

    it('should expect filters to be sent to the backend when using "bindBackendOnFilter" without triggering a filter changed event neither a backend query when both flag arguments are set to false', () => {
      gridOptionMock.backendServiceApi = {
        filterTypingDebounce: 0,
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn())),
      };
      const clearSpy = jest.spyOn(service, 'clearFilters');
      const emitSpy = jest.spyOn(service, 'emitFilterChanged');
      const backendUpdateSpy = jest.spyOn(backendServiceStub, 'updateFilters');
      const backendProcessSpy = jest.spyOn(backendServiceStub, 'processOnFilterChanged');

      service.init(gridStub);
      service.bindBackendOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);
      service.updateFilters(mockNewFilters, false, false);

      expect(emitSpy).not.toHaveBeenCalled();
      expect(backendProcessSpy).not.toHaveBeenCalled();
      expect(mockRefreshBackendDataset).not.toHaveBeenCalled();
      expect(backendUpdateSpy).toHaveBeenCalledWith(mockNewFilters, true);
      expect(service.getColumnFilters()).toEqual({
        firstName: { columnId: 'firstName', columnDef: mockColumn1, searchTerms: ['Jane'], operator: 'StartsWith' },
        isActive: { columnId: 'isActive', columnDef: mockColumn2, searchTerms: [false], operator: 'EQ' }
      });
      expect(clearSpy).toHaveBeenCalledWith(false);
    });
  });
  describe('disableFilterFunctionality method', () => {
    beforeEach(() => {
      gridOptionMock.enableFiltering = true;
      gridOptionMock.showHeaderRow = true;
    });

    it('should disable the Filter Functionality from the Grid Options & toggle the Header Filter row', () => {
      const mockColumns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
      const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
      const setHeaderSpy = jest.spyOn(gridStub, 'setHeaderRowVisibility');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');
      jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(mockColumns)

      service.init(gridStub);
      service.disableFilterFunctionality();

      expect(setOptionSpy).toHaveBeenCalledWith({ enableFiltering: false }, false, true);
      expect(setHeaderSpy).toHaveBeenCalledWith(false);
      expect(setColsSpy).toHaveBeenCalledWith(mockColumns);
    });

    it('should enable the Filter Functionality when passing 1st argument as False', () => {
      gridOptionMock.enableFiltering = false;
      gridOptionMock.showHeaderRow = false;

      const mockColumns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
      const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
      const setHeaderSpy = jest.spyOn(gridStub, 'setHeaderRowVisibility');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');
      jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(mockColumns)

      service.init(gridStub);
      service.disableFilterFunctionality(false);

      expect(setOptionSpy).toHaveBeenCalledWith({ enableFiltering: true }, false, true);
      expect(setHeaderSpy).toHaveBeenCalledWith(true);
      expect(setColsSpy).toHaveBeenCalledWith(mockColumns);
    });

    it('should NOT change neither call anything if the end result of disabling is the same', () => {
      gridOptionMock.enableFiltering = true;
      gridOptionMock.showHeaderRow = true;

      const mockColumns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
      const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
      const setHeaderSpy = jest.spyOn(gridStub, 'setHeaderRowVisibility');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');
      jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(mockColumns)

      service.init(gridStub);
      service.disableFilterFunctionality(false);

      expect(setOptionSpy).not.toHaveBeenCalled();
      expect(setHeaderSpy).not.toHaveBeenCalled();
      expect(setColsSpy).not.toHaveBeenCalled();
    });
  });

  describe('toggleFilterFunctionality method', () => {
    beforeEach(() => {
      gridOptionMock.enableFiltering = true;
      gridOptionMock.showHeaderRow = true;
    });

    it('should toggle the Filter Functionality from the Grid Options & toggle the Header Filter row', () => {
      const mockColumns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
      const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
      const setHeaderSpy = jest.spyOn(gridStub, 'setHeaderRowVisibility');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');
      jest.spyOn(SharedService.prototype, 'columnDefinitions', 'get').mockReturnValue(mockColumns)

      service.init(gridStub);
      service.toggleFilterFunctionality();

      expect(setOptionSpy).toHaveBeenCalledWith({ enableFiltering: false }, false, true);
      expect(setHeaderSpy).toHaveBeenCalledWith(false);
      expect(setColsSpy).toHaveBeenCalledWith(mockColumns);
    });
  });

  describe('toggleHeaderFilterRow method', () => {
    beforeEach(() => {
      gridOptionMock.enableFiltering = true;
      gridOptionMock.showHeaderRow = true;
    });

    it('should toggle the Header Filter Row (to disabled when previously enabled)', () => {
      const setHeaderSpy = jest.spyOn(gridStub, 'setHeaderRowVisibility');

      service.init(gridStub);
      service.toggleHeaderFilterRow();

      expect(setHeaderSpy).toHaveBeenCalledWith(false);
    });

    it('should toggle the Header Filter Row and expect to call "setColumns" when changing to enabled when previously disabled', () => {
      gridOptionMock.showHeaderRow = false;
      const setHeaderSpy = jest.spyOn(gridStub, 'setHeaderRowVisibility');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');

      service.init(gridStub);
      service.toggleHeaderFilterRow();

      expect(setHeaderSpy).toHaveBeenCalledWith(true);
      expect(setColsSpy).toHaveBeenCalled();
    });
  });

  describe('setSortColumnIcons method', () => {
    it('should set the sorting icon by calling "setSortColumns" on the grid object', () => {
      const mockSortColumns = [{ columnId: 'duration', sortAsc: true }];
      const spy = jest.spyOn(gridStub, 'setSortColumns');

      service.init(gridStub);
      service.setSortColumnIcons(mockSortColumns);

      expect(spy).toHaveBeenCalledWith(mockSortColumns);
    });
  });

  describe('Tree Data View', () => {
    beforeEach(() => {
      gridOptionMock.enableTreeData = true;
      gridOptionMock.treeDataOptions = { columnId: 'file', childrenPropName: 'files' };
      jest.clearAllMocks();
    });

    it('should expect "setSortColumns" to have been called after init', () => {
      const spySetSortCols = jest.spyOn(gridStub, 'setSortColumns');
      service.init(gridStub);

      expect(spySetSortCols).toHaveBeenCalledWith([{ columnId: 'file', sortAsc: true }]);
    });

    it('should create a filter and its metadata when "onHeaderRowCellRendered" event is triggered', () => {
      const spySetSortCols = jest.spyOn(gridStub, 'setSortColumns');
      const mockArgs = {
        grid: gridStub,
        column: { id: 'firstName', field: 'firstName', filterable: true } as Column,
        node: document.getElementById(DOM_ELEMENT_ID),
      };

      service.init(gridStub);
      service.bindLocalOnFilter(gridStub);
      gridStub.onHeaderRowCellRendered.notify(mockArgs, new Slick.EventData(), gridStub);
      const columnFilters = service.getColumnFilters();
      const filterMetadataArray = service.getFiltersMetadata();

      expect(spySetSortCols).toHaveBeenCalledWith([{ columnId: 'file', sortAsc: true }]);
      expect(columnFilters).toEqual({});
      expect(filterMetadataArray.length).toBe(1);
      expect(filterMetadataArray[0]).toContainEntry(['$filterElm', expect.anything()]);
      expect(filterMetadataArray[0]).toContainEntry(['searchTerms', []]);
    });

    describe('bindLocalOnFilter method', () => {
      let dataset = [];
      let mockColumn1;
      let mockColumn2;
      let mockArgs1;
      let mockArgs2;

      beforeEach(() => {
        gridStub.getColumns = jest.fn();
        gridOptionMock.backendServiceApi = undefined;
        dataset = [
          { __parentId: null, __treeLevel: 0, dateModified: '2012-03-05T12:44:00.123Z', file: 'bucket-list.txt', id: 24, size: 0.5 },
          { __hasChildren: true, __parentId: null, __treeLevel: 0, file: 'documents', id: 21 },
          { __hasChildren: true, __parentId: 21, __treeLevel: 1, file: 'misc', id: 9 },
          { __parentId: 9, __treeLevel: 2, dateModified: '2015-02-26T16:50:00.123Z', file: 'todo.txt', id: 10, size: 0.4 },
          { __hasChildren: true, __parentId: 21, __treeLevel: 1, file: 'pdf', id: 4 },
          { __parentId: 4, __treeLevel: 2, dateModified: '2015-05-12T14:50:00.123Z', file: 'internet-bill.pdf', id: 6, size: 1.4 },
          { __parentId: 4, __treeLevel: 2, dateModified: '2015-05-21T10:22:00.123Z', file: 'map.pdf', id: 5, size: 3.1 },
          { __parentId: 4, __treeLevel: 2, dateModified: '2015-05-01T07:50:00.123Z', file: 'phone-bill.pdf', id: 23, size: 1.4 },
          { __hasChildren: true, __parentId: 21, __treeLevel: 1, file: 'txt', id: 2 },
          { __parentId: 2, __treeLevel: 2, dateModified: '2015-05-12T14:50:00.123Z', file: 'todo.txt', id: 3, size: 0.7 },
          { __hasChildren: true, __parentId: 21, __treeLevel: 1, file: 'xls', id: 7 },
          { __parentId: 7, __treeLevel: 2, dateModified: '2014-10-02T14:50:00.123Z', file: 'compilation.xls', id: 8, size: 2.3 },
          { __parentId: null, __treeLevel: 0, dateModified: '2015-03-03T03:50:00.123Z', file: 'something.txt', id: 18, size: 90 },
        ];

        gridOptionMock.enableFiltering = true;
        gridOptionMock.backendServiceApi = undefined;
        mockColumn1 = { id: 'file', name: 'file', field: 'file', filterable: true, filter: { model: Filters.inputText } };
        mockColumn2 = { id: 'dateModified', name: 'dateModified', field: 'dateModified', filterable: true, filter: { model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False' }], } };
        mockArgs1 = { grid: gridStub, column: mockColumn1, node: document.getElementById(DOM_ELEMENT_ID) };
        mockArgs2 = { grid: gridStub, column: mockColumn2, node: document.getElementById(DOM_ELEMENT_ID) };
        jest.spyOn(dataViewStub, 'getItems').mockReturnValue(dataset);
        jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1, mockColumn2]);
      });

      it('should return True when item is found and its parent is not collapsed', () => {
        const spyRxjs = jest.spyOn(service.onFilterChanged, 'next');
        const preFilterSpy = jest.spyOn(service, 'preFilterTreeData');
        jest.spyOn(dataViewStub, 'getItemById').mockReturnValueOnce({ ...dataset[4], __collapsed: false })
          .mockReturnValueOnce(dataset[5])
          .mockReturnValueOnce(dataset[6]);

        const mockItem1 = { __parentId: 4, id: 5, file: 'map.pdf', dateModified: '2015-05-21T10:22:00.123Z', size: 3.1 };

        service.init(gridStub);
        service.bindLocalOnFilter(gridStub);
        gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
        gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);

        const columnFilters = { file: { columnDef: mockColumn1, columnId: 'file', searchTerms: ['map'] } };
        service.updateFilters([{ columnId: 'file', operator: '', searchTerms: ['map'] }], true, true, true);
        const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

        expect(spyRxjs).toHaveBeenCalledWith([{ columnId: 'file', searchTerms: ['map',] }]);
        expect(output).toBe(true);
        expect(preFilterSpy).toHaveBeenCalledWith(dataset, columnFilters);
        expect(preFilterSpy).toHaveReturnedWith([21, 4, 5]);
      });

      it('should return False when item is found BUT its parent is collapsed', () => {
        const spyRxjs = jest.spyOn(service.onFilterChanged, 'next');
        const preFilterSpy = jest.spyOn(service, 'preFilterTreeData');
        jest.spyOn(dataViewStub, 'getItemById').mockReturnValueOnce({ ...dataset[4], __collapsed: true })
          .mockReturnValueOnce(dataset[5])
          .mockReturnValueOnce(dataset[6]);

        const mockItem1 = { __parentId: 4, id: 5, file: 'map.pdf', dateModified: '2015-05-21T10:22:00.123Z', size: 3.1 };

        service.init(gridStub);
        service.bindLocalOnFilter(gridStub);
        gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
        gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);

        const columnFilters = { file: { columnDef: mockColumn1, columnId: 'file', searchTerms: ['map'] } };
        service.updateFilters([{ columnId: 'file', operator: '', searchTerms: ['map'] }], true, true, true);
        const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

        expect(spyRxjs).toHaveBeenCalledWith([{ columnId: 'file', searchTerms: ['map',] }]);
        expect(output).toBe(false);
        expect(preFilterSpy).toHaveBeenCalledWith(dataset, columnFilters);
        expect(preFilterSpy).toHaveReturnedWith([21, 4, 5]);
      });

      it('should return False when item is not found in the dataset', () => {
        const spyRxjs = jest.spyOn(service.onFilterChanged, 'next');
        const preFilterSpy = jest.spyOn(service, 'preFilterTreeData');
        jest.spyOn(dataViewStub, 'getItemById').mockReturnValueOnce({ ...dataset[4] })
          .mockReturnValueOnce(dataset[5])
          .mockReturnValueOnce(dataset[6]);

        const mockItem1 = { __parentId: 4, id: 5, file: 'unknown.pdf', dateModified: '2015-05-21T10:22:00.123Z', size: 3.1 };

        service.init(gridStub);
        service.bindLocalOnFilter(gridStub);
        gridStub.onHeaderRowCellRendered.notify(mockArgs1, new Slick.EventData(), gridStub);
        gridStub.onHeaderRowCellRendered.notify(mockArgs2, new Slick.EventData(), gridStub);

        const columnFilters = { file: { columnDef: mockColumn1, columnId: 'file', searchTerms: ['unknown'] } };
        service.updateFilters([{ columnId: 'file', operator: '', searchTerms: ['unknown'] }], true, true, true);
        const output = service.customLocalFilter(mockItem1, { dataView: dataViewStub, grid: gridStub, columnFilters });

        expect(spyRxjs).toHaveBeenCalledWith([{ columnId: 'file', searchTerms: ['unknown',] }]);
        expect(output).toBe(false);
        expect(preFilterSpy).toHaveBeenCalledWith(dataset, columnFilters);
        expect(preFilterSpy).toHaveReturnedWith([]);
      });
    });
  });
});
