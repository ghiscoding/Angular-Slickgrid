import { of, throwError } from 'rxjs';

import {
  BackendService,
  BackendServiceApi,
  Column,
  ColumnSort,
  CurrentSorter,
  EmitterType,
  FieldType,
  GridMenuItem,
  GridOption,
  MenuCommandItem,
  SlickEventHandler,
} from '../../models';
import { Sorters } from '../../sorters';
import { SortService } from '../sort.service';
import * as utilities from '../backend-utilities';
import { SharedService } from '../shared.service';

declare const Slick: any;

const mockRefreshBackendDataset = jest.fn();
// @ts-ignore
utilities.refreshBackendDataset = mockRefreshBackendDataset;

const gridOptionMock = {
  enablePagination: true,
  backendServiceApi: {
    service: undefined,
    preProcess: jest.fn(),
    process: jest.fn(),
    postProcess: jest.fn(),
  },
  gridMenu: {
    customItems: [{
      command: 'clear-sorting',
      disabled: false,
      hidden: true,
      iconCssClass: 'fa fa-unsorted mdi mdi-swap-vertical',
      positionOrder: 51,
      title: 'Clear all Sorting'
    }]
  }
} as unknown as GridOption;

const dataViewStub = {
  refresh: jest.fn(),
  sort: jest.fn(),
  reSort: jest.fn(),
  setItems: jest.fn(),
};

const backendServiceStub = {
  buildQuery: jest.fn(),
  clearSorters: jest.fn(),
  getCurrentFilters: jest.fn(),
  getCurrentPagination: jest.fn(),
  getCurrentSorters: jest.fn(),
  updateSorters: jest.fn(),
  processOnSortChanged: () => 'backend query',
} as unknown as BackendService;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getData: () => dataViewStub,
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onLocalSortChanged: jest.fn(),
  onSort: new Slick.Event(),
  render: jest.fn(),
  setColumns: jest.fn(),
  setOptions: jest.fn(),
  setSortColumns: jest.fn(),
};

describe('SortService', () => {
  let service: SortService;
  let slickgridEventHandler: SlickEventHandler;
  const sharedService = new SharedService();

  beforeEach(() => {
    service = new SortService(sharedService);
    slickgridEventHandler = service.eventHandler;
  });

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

  describe('clearSortByColumnId method', () => {
    let mockSortedCols: ColumnSort[];
    const mockColumns = [{ id: 'firstName', field: 'firstName' }, { id: 'lastName', field: 'lastName' }] as Column[];

    beforeEach(() => {
      mockSortedCols = [
        { sortCol: { id: 'firstName', field: 'firstName', width: 100 }, sortAsc: false, grid: gridStub },
        { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true, grid: gridStub },
      ];
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn()))
      };
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
    });

    it('should expect Sort Service to call "onBackendSortChanged" being called without the sorted column', () => {
      const previousSortSpy = jest.spyOn(service, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[1]]).mockReturnValueOnce(mockSortedCols);
      const backendSortSpy = jest.spyOn(service, 'onBackendSortChanged');
      const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');

      const mockMouseEvent = new Event('mouseup');
      service.bindBackendOnSort(gridStub);
      service.clearSortByColumnId(mockMouseEvent, 'firstName');

      expect(previousSortSpy).toHaveBeenCalled();
      expect(backendSortSpy).toHaveBeenCalledWith(mockMouseEvent, { multiColumnSort: true, sortCols: [mockSortedCols[1]], grid: gridStub });
      expect(setSortSpy).toHaveBeenCalled();
    });

    it('should expect Sort Service to call "onLocalSortChanged" being called without the sorted column (firstName DESC)', () => {
      gridOptionMock.backendServiceApi = undefined;
      const previousSortSpy = jest.spyOn(service, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[0]]).mockReturnValueOnce(mockSortedCols);
      const localSortSpy = jest.spyOn(service, 'onLocalSortChanged');
      const emitSortChangedSpy = jest.spyOn(service, 'emitSortChanged');
      const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');

      const mockMouseEvent = new Event('mouseup');
      service.bindLocalOnSort(gridStub);
      service.clearSortByColumnId(mockMouseEvent, 'firstName');

      expect(previousSortSpy).toHaveBeenCalled();
      expect(localSortSpy).toHaveBeenCalledWith(gridStub, [mockSortedCols[0]], true, true);
      expect(emitSortChangedSpy).toHaveBeenCalledWith('local', [{ columnId: 'firstName', direction: 'DESC' }]);
      expect(setSortSpy).toHaveBeenCalled();
    });

    it('should expect Sort Service to call "onLocalSortChanged" being called without the sorted column (lastName ASC)', () => {
      gridOptionMock.backendServiceApi = undefined;
      const previousSortSpy = jest.spyOn(service, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[1]]).mockReturnValueOnce(mockSortedCols);
      const localSortSpy = jest.spyOn(service, 'onLocalSortChanged');
      const emitSortChangedSpy = jest.spyOn(service, 'emitSortChanged');
      const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');

      const mockMouseEvent = new Event('mouseup');
      service.bindLocalOnSort(gridStub);
      service.clearSortByColumnId(mockMouseEvent, 'lastName');

      expect(previousSortSpy).toHaveBeenCalled();
      expect(localSortSpy).toHaveBeenCalledWith(gridStub, [mockSortedCols[1]], true, true);
      expect(emitSortChangedSpy).toHaveBeenCalledWith('local', [{ columnId: 'lastName', direction: 'ASC' }]);
      expect(setSortSpy).toHaveBeenCalled();
    });

    it('should expect "onSort" event triggered when no DataView is provided', () => {
      gridOptionMock.backendServiceApi = undefined;
      const previousSortSpy = jest.spyOn(service, 'getCurrentColumnSorts').mockReturnValue([mockSortedCols[1]]).mockReturnValueOnce(mockSortedCols);
      const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');
      const gridSortSpy = jest.spyOn(gridStub.onSort, 'notify');

      gridStub.getData = () => null as any; // fake a custom dataview by removing the dataView in shared
      const mockMouseEvent = new Event('mouseup');
      service.bindLocalOnSort(gridStub);
      service.clearSortByColumnId(mockMouseEvent, 'firstName');

      expect(previousSortSpy).toHaveBeenCalled();
      expect(setSortSpy).toHaveBeenCalled();
      expect(gridSortSpy).toHaveBeenCalledWith(mockSortedCols[1]);
      gridStub.getData = () => dataViewStub; // put back regular dataview mock
    });

    it('should expect Sort Service to call "onLocalSortChanged" with empty array then also "sortLocalGridByDefaultSortFieldId" when there is no more columns left to sort', () => {
      gridOptionMock.backendServiceApi = undefined;
      const previousSortSpy = jest.spyOn(service, 'getCurrentColumnSorts').mockReturnValue([]).mockReturnValueOnce([mockSortedCols[0]]);
      const localSortSpy = jest.spyOn(service, 'onLocalSortChanged');
      const emitSortChangedSpy = jest.spyOn(service, 'emitSortChanged');
      const sortDefaultSpy = jest.spyOn(service, 'sortLocalGridByDefaultSortFieldId');
      const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');

      const mockMouseEvent = new Event('mouseup');
      service.bindLocalOnSort(gridStub);
      service.clearSortByColumnId(mockMouseEvent, 'firstName');

      expect(previousSortSpy).toHaveBeenCalled();
      expect(localSortSpy).toHaveBeenNthCalledWith(1, gridStub, [], true, true);
      expect(localSortSpy).toHaveBeenNthCalledWith(2, gridStub, [{ clearSortTriggered: true, sortAsc: true, sortCol: { field: 'id', id: 'id' } }]);
      expect(emitSortChangedSpy).toHaveBeenCalledWith('local', []);
      expect(setSortSpy).toHaveBeenCalled();
      expect(sortDefaultSpy).toHaveBeenCalled();
    });

    it('should expect Sort Service to call "onLocalSortChanged" with empty array then also "sortLocalGridByDefaultSortFieldId" with custom Id when there is no more columns left to sort', () => {
      gridOptionMock.backendServiceApi = undefined;
      gridOptionMock.defaultColumnSortFieldId = 'customId';
      const mockSortedCol = { sortCol: { id: 'firstName', field: 'firstName', width: 100 }, sortAsc: false, grid: gridStub };
      const previousSortSpy = jest.spyOn(service, 'getCurrentColumnSorts').mockReturnValue([]).mockReturnValueOnce([mockSortedCol]);
      const localSortSpy = jest.spyOn(service, 'onLocalSortChanged');
      const emitSortChangedSpy = jest.spyOn(service, 'emitSortChanged');
      const sortDefaultSpy = jest.spyOn(service, 'sortLocalGridByDefaultSortFieldId');
      const setSortSpy = jest.spyOn(gridStub, 'setSortColumns');

      const mockMouseEvent = new Event('mouseup');
      service.bindLocalOnSort(gridStub);
      service.clearSortByColumnId(mockMouseEvent, 'firstName');

      expect(previousSortSpy).toHaveBeenCalled();
      expect(localSortSpy).toHaveBeenNthCalledWith(1, gridStub, [], true, true);
      expect(emitSortChangedSpy).toHaveBeenCalledWith('local', []);
      expect(localSortSpy).toHaveBeenNthCalledWith(2, gridStub, [{ clearSortTriggered: true, sortAsc: true, sortCol: { field: 'customId', id: 'customId' } }]);
      expect(setSortSpy).toHaveBeenCalled();
      expect(sortDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('clearSorting method', () => {
    let mockSortedCol: ColumnSort;
    const mockColumns = [{ id: 'lastName', field: 'lastName' }, { id: 'firstName', field: 'firstName' }] as Column[];

    beforeEach(() => {
      mockSortedCol = { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true, grid: gridStub };
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn()))
      };
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
    });

    it('should clear the backend sorting by triggering a query event when method argument is undefined (default to true)', () => {
      const spySortCleared = jest.spyOn(service.onSortCleared, 'next');
      const spySetColumns = jest.spyOn(gridStub, 'setSortColumns');
      const spySortChanged = jest.spyOn(service, 'onBackendSortChanged');

      service.bindBackendOnSort(gridStub);
      gridStub.onSort.notify(mockSortedCol, new Slick.EventData(), gridStub);
      service.clearSorting();

      expect(spySortCleared).toHaveBeenCalledWith(true);
      expect(spySetColumns).toHaveBeenCalledWith([]);
      expect(spySortChanged).toHaveBeenCalled();
    });

    it('should clear the local sorting by triggering a query event when method argument is undefined (default to true)', () => {
      const spySortCleared = jest.spyOn(service.onSortCleared, 'next');
      const spySetColumns = jest.spyOn(gridStub, 'setSortColumns');
      const spySortChanged = jest.spyOn(service, 'onLocalSortChanged');

      service.bindLocalOnSort(gridStub);
      gridStub.onSort.notify(mockSortedCol, new Slick.EventData(), gridStub);
      service.clearSorting();

      expect(spySortCleared).toHaveBeenCalledWith(true);
      expect(spySortChanged).toHaveBeenCalled();
      expect(spySetColumns).toHaveBeenCalledWith([]);
      expect(service.getCurrentLocalSorters()).toEqual([]);
    });

    it('should clear the backend sorting without triggering a query event when method argument is set to false', () => {
      const spySortCleared = jest.spyOn(service.onSortCleared, 'next');
      const spySetColumns = jest.spyOn(gridStub, 'setSortColumns');
      const spyClearSorters = jest.spyOn(backendServiceStub, 'clearSorters');

      service.bindBackendOnSort(gridStub);
      gridStub.onSort.notify(mockSortedCol, new Slick.EventData(), gridStub);
      service.clearSorting(false);

      expect(spySortCleared).toHaveBeenCalledWith(true);
      expect(spyClearSorters).toHaveBeenCalled();
      expect(spySetColumns).toHaveBeenCalledWith([]);
    });

    it('should clear the local sorting without triggering a query event when method argument is set to false', () => {
      const spySortCleared = jest.spyOn(service.onSortCleared, 'next');
      const spySetColumns = jest.spyOn(gridStub, 'setSortColumns');

      service.bindLocalOnSort(gridStub);
      gridStub.onSort.notify(mockSortedCol, new Slick.EventData(), gridStub);
      service.clearSorting(false);

      expect(spySortCleared).toHaveBeenCalledWith(true);
      expect(spySetColumns).toHaveBeenCalledWith([]);
      expect(service.getCurrentLocalSorters()).toEqual([]);
    });
  });

  describe('bindBackendOnSort method', () => {
    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn()))
      };
    });

    it('should call "onBackendSortChanged" when "onSort" event triggered', () => {
      const spy = jest.spyOn(service, 'onBackendSortChanged');

      service.bindBackendOnSort(gridStub);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: [], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(spy).toHaveBeenCalledWith(expect.anything(), { grid: gridStub, multiColumnSort: true, sortCols: [] });
    });
  });

  describe('bindLocalOnSort method', () => {
    it('should bind to "onLocalSortChanged" and expect some events being triggered when a single sort is called', () => {
      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyCurrentSort = jest.spyOn(service, 'getCurrentLocalSorters');
      const spyOnLocalSort = jest.spyOn(service, 'onLocalSortChanged');
      const mockSortedCol = { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true } as ColumnSort;

      service.bindLocalOnSort(gridStub);
      gridStub.onSort.notify(mockSortedCol, new Slick.EventData(), gridStub);

      expect(spyCurrentSort).toHaveBeenCalled();
      expect(spyEmitSort).toHaveBeenCalledWith([{ columnId: 'lastName', direction: 'ASC' }]);
      expect(spyOnLocalSort).toHaveBeenCalledWith(gridStub, [mockSortedCol]);
    });

    it('should bind to "onLocalSortChanged" and expect some events being triggered when "multiColumnSort" is enabled and multiple sorts are called', () => {
      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyCurrentSort = jest.spyOn(service, 'getCurrentLocalSorters');
      const spyOnLocalSort = jest.spyOn(service, 'onLocalSortChanged');
      const mockSortedCols: ColumnSort[] = [
        { sortAsc: true, sortCol: { id: 'lastName', field: 'lastName', width: 100 } },
        { sortAsc: false, sortCol: { id: 'firstName', field: 'firstName', width: 75 } }
      ];

      service.bindLocalOnSort(gridStub);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: mockSortedCols, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(spyCurrentSort).toHaveBeenCalled();
      expect(spyEmitSort).toHaveBeenCalledWith([{ columnId: 'lastName', direction: 'ASC' }, { columnId: 'firstName', direction: 'DESC' }]);
      expect(spyOnLocalSort).toHaveBeenCalledWith(gridStub, mockSortedCols);
    });
  });

  describe('bindBackendOnSort & onBackendSortChanged methods', () => {
    const spyProcess = jest.fn();
    const spyPreProcess = jest.fn();
    const spyPostProcess = jest.fn();

    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        preProcess: spyPreProcess,
        postProcess: spyPostProcess,
        process: () => new Promise((resolve) => resolve(spyProcess))
      };
    });

    it('should expect some events being triggered when a single sort is called', () => {
      const mockColumn = { id: 'lastName', field: 'lastName', width: 100 } as Column;
      const expectedSortCol = { columnId: 'lastName', direction: 'ASC' } as CurrentSorter;
      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyBackendCurrentSort = jest.spyOn(gridOptionMock.backendServiceApi!.service, 'getCurrentSorters').mockReturnValue([expectedSortCol]);
      const spyBackendProcessSort = jest.spyOn(gridOptionMock.backendServiceApi!.service, 'processOnSortChanged').mockReturnValue('backend query');
      const mockSortedCol = { sortCol: mockColumn, sortAsc: true, grid: gridStub } as ColumnSort;

      service.bindBackendOnSort(gridStub);
      gridStub.onSort.notify(mockSortedCol, new Slick.EventData(), gridStub);

      expect(spyBackendCurrentSort).toHaveBeenCalled();
      expect(spyBackendProcessSort).toHaveBeenCalled();
      expect(spyPreProcess).toHaveBeenCalled();
      expect(spyEmitSort).toHaveBeenCalledWith([expectedSortCol]);
    });

    it('should expect some events being triggered when "multiColumnSort" is enabled and multiple sorts are called', () => {
      const expectedSortCols = [{ columnId: 'lastName', direction: 'ASC' }, { columnId: 'firstName', direction: 'DESC' }] as CurrentSorter[];
      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyBackendCurrentSort = jest.spyOn(gridOptionMock.backendServiceApi!.service, 'getCurrentSorters').mockReturnValue(expectedSortCols);
      const spyBackendProcessSort = jest.spyOn(gridOptionMock.backendServiceApi!.service, 'processOnSortChanged').mockReturnValue('backend query');
      const mockSortedCols: ColumnSort[] = [
        { sortAsc: true, sortCol: { id: 'lastName', field: 'lastName', width: 100 } },
        { sortAsc: false, sortCol: { id: 'firstName', field: 'firstName', width: 75 } }
      ];

      service.bindBackendOnSort(gridStub);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: mockSortedCols, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(spyBackendCurrentSort).toHaveBeenCalled();
      expect(spyBackendProcessSort).toHaveBeenCalled();
      expect(spyPreProcess).toHaveBeenCalled();
      expect(spyEmitSort).toHaveBeenCalledWith(expectedSortCols);
    });

    it('should expect some events being triggered when "multiColumnSort" is enabled and multiple sorts are called & "process" method is an Observable', () => {
      const processSubject = of(spyProcess);
      gridOptionMock.backendServiceApi!.process = () => processSubject;
      const expectedSortCols = [{ columnId: 'lastName', direction: 'ASC' }, { columnId: 'firstName', direction: 'DESC' }] as CurrentSorter[];
      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyBackendCurrentSort = jest.spyOn(gridOptionMock.backendServiceApi!.service, 'getCurrentSorters').mockReturnValue(expectedSortCols);
      const spyBackendProcessSort = jest.spyOn(gridOptionMock.backendServiceApi!.service, 'processOnSortChanged').mockReturnValue('backend query');
      const mockSortedCols: ColumnSort[] = [
        { sortAsc: true, sortCol: { id: 'lastName', field: 'lastName', width: 100 } },
        { sortAsc: false, sortCol: { id: 'firstName', field: 'firstName', width: 75 } }
      ];

      service.bindBackendOnSort(gridStub);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: mockSortedCols, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(spyBackendCurrentSort).toHaveBeenCalled();
      expect(spyBackendProcessSort).toHaveBeenCalled();
      expect(spyPreProcess).toHaveBeenCalled();
      expect(spyPostProcess).toHaveBeenCalled();
      expect(spyEmitSort).toHaveBeenCalledWith(expectedSortCols);
    });
  });

  describe('emitSortChanged method', () => {
    it('should have same current sort changed when it is passed as argument to the emitSortChanged method', () => {
      const localSorterMock = { columnId: 'field1', direction: 'DESC' } as CurrentSorter;
      const rxOnSortSpy = jest.spyOn(service.onSortChanged, 'next');

      service.emitSortChanged(EmitterType.local, [localSorterMock]);
      const currentLocalSorters = service.getCurrentLocalSorters();

      expect(currentLocalSorters).toEqual([localSorterMock]);
      expect(rxOnSortSpy).toHaveBeenCalledWith(currentLocalSorters);
    });
  });

  describe('onBackendSortChanged method', () => {
    const spyProcess = jest.fn();
    const spyPreProcess = jest.fn();
    const spyPostProcess = jest.fn();

    beforeEach(() => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        preProcess: spyPreProcess,
        postProcess: spyPostProcess,
        process: undefined as any
      };
      gridStub.getOptions = () => gridOptionMock;
    });

    it('should throw an error when not passing a grid in the args', () => {
      expect(() => service.onBackendSortChanged(undefined, undefined as any)).toThrowError('Something went wrong when trying to bind the "onBackendSortChanged(event, args)" function');
    });

    it('should throw an error when backend service is missing', () => {
      gridOptionMock.backendServiceApi!.service = undefined as any;
      service.bindBackendOnSort(gridStub);
      expect(() => service.onBackendSortChanged(undefined, { grid: gridStub, sortCols: [] })).toThrowError('BackendServiceApi requires at least a "process" function and a "service" defined');
    });

    it('should throw an error when backend "process" method is missing', () => {
      gridOptionMock.backendServiceApi!.process = undefined as any;
      service.bindBackendOnSort(gridStub);
      expect(() => service.onBackendSortChanged(undefined, { grid: gridStub, sortCols: [] })).toThrowError('BackendServiceApi requires at least a "process" function and a "service" defined');
    });

    it('should use an empty grid option object when grid "getOptions" method is not available', () => {
      gridStub.getOptions = undefined as any;

      service.bindBackendOnSort(gridStub);
      expect(() => service.onBackendSortChanged(undefined, { grid: gridStub, sortCols: [] })).toThrowError('BackendServiceApi requires at least a "process" function and a "service" defined');
    });

    it('should execute the "onError" method when the Promise throws an error', (done) => {
      const errorExpected = 'promise error';
      gridOptionMock.backendServiceApi!.process = () => Promise.reject(errorExpected);
      gridOptionMock.backendServiceApi!.onError = (e) => jest.fn();
      const spyOnError = jest.spyOn(gridOptionMock.backendServiceApi as BackendServiceApi, 'onError');
      jest.spyOn(gridOptionMock.backendServiceApi as BackendServiceApi, 'process');

      service.bindBackendOnSort(gridStub);
      service.onBackendSortChanged(undefined, { multiColumnSort: true, sortCols: [], grid: gridStub });

      setTimeout(() => {
        expect(spyOnError).toHaveBeenCalledWith(errorExpected);
        done();
      });
    });

    it('should execute the "onError" method when the Observable throws an error', (done) => {
      const errorExpected = 'observable error';
      gridOptionMock.backendServiceApi!.process = () => of(spyProcess);
      gridOptionMock.backendServiceApi!.onError = (e) => jest.fn();
      const spyOnError = jest.spyOn(gridOptionMock.backendServiceApi as BackendServiceApi, 'onError');
      jest.spyOn(gridOptionMock.backendServiceApi as BackendServiceApi, 'process').mockReturnValue(throwError(errorExpected));

      service.bindBackendOnSort(gridStub);
      service.onBackendSortChanged(undefined, { multiColumnSort: true, sortCols: [], grid: gridStub });

      setTimeout(() => {
        expect(spyOnError).toHaveBeenCalledWith(errorExpected);
        done();
      });
    });
  });

  describe('getCurrentColumnSorts method', () => {
    let mockSortedCol: ColumnSort;
    const mockColumns = [{ id: 'firstName', field: 'firstName' }, { id: 'lastName', field: 'lastName' }] as Column[];

    beforeEach(() => {
      mockSortedCol = { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true, grid: gridStub };
      gridStub.getColumns = jest.fn();
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
    });

    it('should return an empty array when there is no grid object', () => {
      jest.spyOn(gridStub, 'getSortColumns').mockReturnValue([]);

      const columnSorts = service.getCurrentColumnSorts();

      expect(columnSorts).toEqual([]);
    });

    it('should return an empty array when there is not current sorting', () => {
      jest.spyOn(gridStub, 'getSortColumns').mockReturnValue([]);

      service.bindLocalOnSort(gridStub);
      const columnSorts = service.getCurrentColumnSorts();

      expect(columnSorts).toEqual([]);
    });

    it('should return all current column sorts with their "sortCol" property', () => {
      const mockSortCols = [{ columnId: 'firstName', sortAsc: true }];
      jest.spyOn(gridStub, 'getSortColumns').mockReturnValue(mockSortCols);
      jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(0);

      service.bindLocalOnSort(gridStub);
      const columnSorts = service.getCurrentColumnSorts();

      expect(columnSorts).toEqual([{ columnId: 'firstName', sortCol: { id: 'firstName', field: 'firstName' }, sortAsc: true }]);
    });

    it('should return the second sorted column without the first column since it was an exclusion', () => {
      const mockSortCols = [{ columnId: 'firstName', sortAsc: true }, { columnId: 'lastName', sortAsc: false }];
      jest.spyOn(gridStub, 'getSortColumns').mockReturnValue(mockSortCols);
      jest.spyOn(gridStub, 'getColumnIndex').mockReturnValue(1);

      service.bindLocalOnSort(gridStub);
      const columnSorts = service.getCurrentColumnSorts('firstName');

      expect(columnSorts).toEqual([{ columnId: 'lastName', sortCol: { id: 'lastName', field: 'lastName' }, sortAsc: false }]);
    });
  });

  describe('disableSortFunctionality method', () => {
    let mockColumns: Column[];
    beforeEach(() => {
      mockColumns = [
        { id: 'field1', field: 'field1', sortable: true, header: { menu: { items: [{ command: 'sort-asc' }, { command: 'sort-desc' }, { command: 'clear-sort' }] } } },
        { id: 'field2', field: 'field2', sortable: true, header: { menu: { items: [{ command: 'sort-asc' }, { command: 'sort-desc' }, { command: 'clear-sort' }] } } },
      ] as Column[];
    });

    it('should disable Sort functionality when passing True as 1st argument and trigger an event by default', () => {
      const clearSpy = jest.spyOn(service, 'clearSorting');
      const unsubscribeSpy = jest.spyOn(service.eventHandler, 'unsubscribeAll');
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);

      service.bindLocalOnSort(gridStub);
      service.disableSortFunctionality(true);

      expect(clearSpy).toHaveBeenCalled();
      expect(unsubscribeSpy).toHaveBeenCalled();
      mockColumns.forEach(col => {
        expect(col.sortable).toBeFalsy();
      });
      mockColumns.forEach(col => col.header!.menu!.items.forEach(item => {
        expect((item as MenuCommandItem).hidden).toBeTruthy();
      }));
      gridOptionMock.gridMenu!.customItems!.forEach(item => {
        expect((item as GridMenuItem).hidden).toBeTruthy();
      });
    });

    it('should disable Sort functionality when passing True as 1st argument and False as 2nd argument SHOULD NOT trigger an event', () => {
      const clearSpy = jest.spyOn(service, 'clearSorting');
      const unsubscribeSpy = jest.spyOn(service.eventHandler, 'unsubscribeAll');
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);

      service.bindLocalOnSort(gridStub);
      service.disableSortFunctionality(true, false);

      expect(clearSpy).not.toHaveBeenCalled();
      expect(unsubscribeSpy).toHaveBeenCalled();
      mockColumns.forEach(col => {
        expect(col.sortable).toBeFalsy();
      });
      mockColumns.forEach(col => col.header!.menu!.items.forEach(item => {
        expect((item as MenuCommandItem).hidden).toBeTruthy();
      }));
      gridOptionMock.gridMenu!.customItems!.forEach(item => {
        expect((item as GridMenuItem).hidden).toBeTruthy();
      });
    });

    it('should enable Sort functionality when passing False as 1st argument', (done) => {
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      const handleSpy = jest.spyOn(service, 'handleLocalOnSort');

      service.bindLocalOnSort(gridStub);
      service.disableSortFunctionality(false);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: [], grid: gridStub }, new Slick.EventData(), gridStub);

      mockColumns.forEach(col => {
        expect(col.sortable).toBeTruthy();
      });
      mockColumns.forEach(col => col.header!.menu!.items.forEach(item => {
        expect((item as MenuCommandItem).hidden).toBeFalsy();
      }));
      gridOptionMock.gridMenu!.customItems!.forEach(item => {
        expect((item as GridMenuItem).hidden).toBeFalsy();
      });

      setTimeout(() => {
        expect(handleSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('toggleSortFunctionality method', () => {
    beforeEach(() => {
      gridOptionMock.enableSorting = true;
      gridOptionMock.multiColumnSort = true;
    });

    it('should toggle the Sorting', () => {
      const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
      const disableSpy = jest.spyOn(service, 'disableSortFunctionality');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');

      service.bindLocalOnSort(gridStub);
      service.toggleSortFunctionality();

      expect(setOptionSpy).toHaveBeenCalledWith({ enableSorting: false }, false, true);
      expect(disableSpy).toHaveBeenCalledWith(true, true);
      expect(setColsSpy).toHaveBeenCalled();
    });

    it('should toggle the Sorting BUT NOT trigger an event when defined as such', () => {
      const setOptionSpy = jest.spyOn(gridStub, 'setOptions');
      const disableSpy = jest.spyOn(service, 'disableSortFunctionality');
      const setColsSpy = jest.spyOn(gridStub, 'setColumns');

      service.bindLocalOnSort(gridStub);
      service.toggleSortFunctionality(false);

      expect(setOptionSpy).toHaveBeenCalledWith({ enableSorting: false }, false, true);
      expect(disableSpy).toHaveBeenCalledWith(true, false);
      expect(setColsSpy).toHaveBeenCalled();
    });
  });

  describe('loadGridSorters method', () => {
    const mockColumns = [{ id: 'firstName', field: 'firstName' }, { id: 'lastName', field: 'lastName' }] as Column[];

    beforeEach(() => {
      gridOptionMock.presets = {
        sorters: [{ columnId: 'firstName', direction: 'ASC' }, { columnId: 'lastName', direction: 'DESC' }],
      };
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
    });

    it('should load local grid multiple presets sorting when multiColumnSort is enabled', () => {
      const spySetCols = jest.spyOn(gridStub, 'setSortColumns');
      const spySortChanged = jest.spyOn(service, 'onLocalSortChanged');
      const expectation = [
        { columnId: 'firstName', sortAsc: true, sortCol: { id: 'firstName', field: 'firstName' } },
        { columnId: 'lastName', sortAsc: false, sortCol: { id: 'lastName', field: 'lastName' } },
      ];

      service.bindLocalOnSort(gridStub);
      service.loadGridSorters(gridOptionMock.presets!.sorters as CurrentSorter[]);

      expect(spySetCols).toHaveBeenCalledWith([
        { columnId: 'firstName', sortAsc: true, },
        { columnId: 'lastName', sortAsc: false },
      ]);
      expect(spySortChanged).toHaveBeenCalledWith(gridStub, expectation);
    });

    it('should load local grid with only a single sort when multiColumnSort is disabled even when passing multiple column sorters', () => {
      const spySetCols = jest.spyOn(gridStub, 'setSortColumns');
      const spySortChanged = jest.spyOn(service, 'onLocalSortChanged');
      const expectation = [
        { columnId: 'firstName', sortAsc: true, sortCol: { id: 'firstName', field: 'firstName' } },
        { columnId: 'lastName', sortAsc: false, sortCol: { id: 'lastName', field: 'lastName' } },
      ];

      gridOptionMock.multiColumnSort = false;
      service.bindLocalOnSort(gridStub);
      service.loadGridSorters(gridOptionMock.presets!.sorters as CurrentSorter[]);

      expect(spySetCols).toHaveBeenCalledWith([{ columnId: 'firstName', sortAsc: true }]);
      expect(spySortChanged).toHaveBeenCalledWith(gridStub, [expectation[0]]);
    });
  });

  describe('undefined getColumns & getOptions', () => {
    it('should use an empty column definition when grid "getColumns" method is not available', () => {
      gridOptionMock.presets = {
        sorters: [{ columnId: 'firstName', direction: 'ASC' }, { columnId: 'lastName', direction: 'DESC' }],
      };
      const spySetCols = jest.spyOn(gridStub, 'setSortColumns');
      gridStub.getColumns = undefined as any;

      service.bindLocalOnSort(gridStub);
      service.loadGridSorters(gridOptionMock.presets.sorters as CurrentSorter[]);

      expect(spySetCols).toHaveBeenCalledWith([]);
    });

    it('should use an empty grid option object when grid "getOptions" method is not available', () => {
      const spySetCols = jest.spyOn(gridStub, 'setSortColumns');
      gridStub.getOptions = undefined as any;

      service.bindLocalOnSort(gridStub);
      service.loadGridSorters(gridOptionMock.presets!.sorters as CurrentSorter[]);

      expect(spySetCols).toHaveBeenCalledWith([]);
    });
  });

  describe('onLocalSortChanged method', () => {
    it('should call a dataview "reSort" when the flag requires it', () => {
      const spyResort = jest.spyOn(dataViewStub, 'reSort');

      service.bindLocalOnSort(gridStub);
      service.onLocalSortChanged(gridStub, [], true);

      expect(spyResort).toHaveBeenCalled();
    });

    it('should call a dataview sort then a grid invalidate & render', () => {
      const mockSortedCols = [
        { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true },
        { sortCol: { id: 'firstName', field: 'firstName', width: 100 }, sortAsc: false },
      ] as ColumnSort[];
      const spyResort = jest.spyOn(dataViewStub, 'reSort');
      const spySort = jest.spyOn(dataViewStub, 'sort');
      const spyInvalidate = jest.spyOn(gridStub, 'invalidate');
      const spyRender = jest.spyOn(gridStub, 'render');

      service.bindLocalOnSort(gridStub);
      service.onLocalSortChanged(gridStub, mockSortedCols);

      expect(spySort).toHaveBeenCalled();
      expect(spyInvalidate).toHaveBeenCalled();
      expect(spyRender).toHaveBeenCalled();
      expect(spyResort).not.toHaveBeenCalled();
    });
  });

  describe('sortComparer method', () => {
    let dataset: any[] = [];

    beforeEach(() => {
      dataset = [
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
      ];
    });

    it('should sort the data with a sorter that is a number type', () => {
      const mockSortedCols = [
        { sortCol: { id: 'age', field: 'age', type: FieldType.number }, sortAsc: true },
      ] as ColumnSort[];

      dataset.sort((row1, row2) => service.sortComparers(mockSortedCols, row1, row2));

      expect(dataset).toEqual([
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
      ]);
    });

    it('should sort the data with 2 sorters that are string type', () => {
      const mockSortedCols = [
        { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true },
        { sortCol: { id: 'firstName', field: 'firstName', width: 100 }, sortAsc: false },
      ] as ColumnSort[];

      dataset.sort((row1, row2) => service.sortComparers(mockSortedCols, row1, row2));

      expect(dataset).toEqual([
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
      ]);
    });

    it('should sort the data with 2 sorters which one of them uses "queryField" and the other uses "queryFieldSorter"', () => {
      const mockSortedCols = [
        { sortCol: { id: 'address', field: 'address', queryField: 'lastName' }, sortAsc: true },
        { sortCol: { id: 'random', field: 'random', queryFieldSorter: 'firstName' }, sortAsc: false },
      ] as ColumnSort[];

      dataset.sort((row1, row2) => service.sortComparers(mockSortedCols, row1, row2));

      expect(dataset).toEqual([
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
      ]);
    });

    it('should sort the data with 2 sorters which the second is by executing the "queryFieldNameGetterFn()" callback and sort by the field returned by it', () => {
      const mockSortedCols = [
        { sortCol: { id: 'address', field: 'address', queryField: 'lastName' }, sortAsc: true },
        { sortCol: { id: 'random', field: 'random', queryFieldNameGetterFn: (dataContext) => 'zip' }, sortAsc: false },
      ] as ColumnSort[];

      dataset.sort((row1, row2) => service.sortComparers(mockSortedCols, row1, row2));

      expect(dataset).toEqual([
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
      ]);
    });

    it('should sort the data with a sorter that is a complex object (following the dot notation in its field name)', () => {
      const mockSortedCols = [
        { sortCol: { id: 'address', field: 'address.zip' }, sortAsc: true },
      ] as ColumnSort[];

      dataset.sort((row1, row2) => service.sortComparers(mockSortedCols, row1, row2));

      expect(dataset).toEqual([
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
      ]);
    });

    it('should sort the data with a sorter that is a complex object (following the dot notation in its field name)', () => {
      const mockSortedCols = [
        { sortCol: { id: 'address', field: 'address', dataKey: 'zip', sorter: Sorters.objectString, }, sortAsc: true },
        { sortCol: { id: 'firstName', field: 'firstName', width: 100 }, sortAsc: true },
      ] as ColumnSort[];

      dataset.sort((row1, row2) => service.sortComparers(mockSortedCols, row1, row2));

      expect(dataset).toEqual([
        { firstName: 'Jane', lastName: 'Doe', age: 27, address: { zip: 123456 } },
        { firstName: 'John', lastName: 'Doe', age: 22, address: { zip: 123456 } },
        { firstName: 'Barbara', lastName: 'Smith', age: 1, address: { zip: 222222 } },
        { firstName: 'Jane', lastName: 'Smith', age: 40, address: { zip: 333333 } },
        { firstName: 'Erla', lastName: 'Richard', age: 101, address: { zip: 444444 } },
        { firstName: 'Christopher', lastName: 'McDonald', age: 40, address: { zip: 555555 } },
      ]);
    });
  });

  describe('updateSorting method', () => {
    let mockColumn1: Column;
    let mockColumn2: Column;
    let mockNewSorters: CurrentSorter[];

    beforeEach(() => {
      gridStub.getOptions = () => gridOptionMock;
      gridOptionMock.enableSorting = true;
      gridOptionMock.backendServiceApi = undefined;
      gridOptionMock.multiColumnSort = true;

      mockNewSorters = [
        { columnId: 'firstName', direction: 'ASC' },
        { columnId: 'isActive', direction: 'desc' }
      ];
      mockColumn1 = { id: 'firstName', name: 'firstName', field: 'firstName', sortable: true };
      mockColumn2 = { id: 'isActive', name: 'isActive', field: 'isActive', sortable: true };
      gridStub.getColumns = jest.fn();
      jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn1, mockColumn2]);
    });

    it('should throw an error when there are no sorters defined in the column definitions', (done) => {
      try {
        gridOptionMock.enableSorting = false;
        service.bindLocalOnSort(gridStub);
        service.updateSorting([{ columnId: 'firstName', direction: 'ASC' }]);
      } catch (e) {
        expect(e.toString()).toContain('[Angular-Slickgrid] in order to use "updateSorting" method, you need to have Sortable Columns defined in your grid');
        done();
      }
    });

    it('should trigger an "emitSortChanged" local when using "bindLocalOnSort" and also expect sorters to be set in CurrentLocalSorter', () => {
      const emitSpy = jest.spyOn(service, 'emitSortChanged');

      service.bindLocalOnSort(gridStub);
      service.updateSorting(mockNewSorters);

      expect(emitSpy).toHaveBeenCalledWith('local');
      expect(service.getCurrentLocalSorters()).toEqual([
        { columnId: 'firstName', direction: 'ASC' },
        { columnId: 'isActive', direction: 'DESC' }
      ]);
    });

    it('should expect sorters to be set in CurrentLocalSorter when using "bindLocalOnSort" without triggering a sort changed event when 2nd flag argument is set to false', () => {
      const emitSpy = jest.spyOn(service, 'emitSortChanged');

      service.bindLocalOnSort(gridStub);
      service.updateSorting(mockNewSorters, false);

      expect(emitSpy).not.toHaveBeenCalled();
      expect(service.getCurrentLocalSorters()).toEqual([
        { columnId: 'firstName', direction: 'ASC' },
        { columnId: 'isActive', direction: 'DESC' }
      ]);
    });

    it('should trigger an "emitSortChanged" remote when using "bindBackendOnSort" and also expect sorters to be sent to the backend when using "bindBackendOnSort"', () => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn())),
      };
      const emitSpy = jest.spyOn(service, 'emitSortChanged');
      const backendUpdateSpy = jest.spyOn(backendServiceStub, 'updateSorters');

      service.bindBackendOnSort(gridStub);
      service.updateSorting(mockNewSorters);

      expect(emitSpy).toHaveBeenCalledWith('remote');
      expect(service.getCurrentLocalSorters()).toEqual([]);
      expect(backendUpdateSpy).toHaveBeenCalledWith(undefined, mockNewSorters);
      expect(mockRefreshBackendDataset).toHaveBeenCalledWith(gridOptionMock);
    });

    it('should expect sorters to be sent to the backend when using "bindBackendOnSort" without triggering a sort changed event neither a backend query when both flag arguments are set to false', () => {
      gridOptionMock.backendServiceApi = {
        service: backendServiceStub,
        process: () => new Promise((resolve) => resolve(jest.fn())),
      };
      const emitSpy = jest.spyOn(service, 'emitSortChanged');
      const backendUpdateSpy = jest.spyOn(backendServiceStub, 'updateSorters');

      service.bindBackendOnSort(gridStub);
      service.updateSorting(mockNewSorters, false, false);

      expect(emitSpy).not.toHaveBeenCalled();
      expect(backendUpdateSpy).toHaveBeenCalledWith(undefined, mockNewSorters);
      expect(mockRefreshBackendDataset).not.toHaveBeenCalled();
    });
  });

  describe('Tree Data View', () => {
    let mockSortedCol: ColumnSort;
    const mockColumns = [
      { id: 'firstName', field: 'firstName' },
      { id: 'lastName', field: 'lastName' },
      { id: 'file', field: 'file', name: 'Files' }
    ] as Column[];

    beforeEach(() => {
      gridOptionMock.enableSorting = true;
      mockSortedCol = { sortCol: { id: 'lastName', field: 'lastName', width: 100 }, sortAsc: true, grid: gridStub };
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
    });

    afterEach(() => {
      gridOptionMock.enableTreeData = false;
    });

    it('should execute "processTreeDataInitialSort" and expect "updateSorting" to be called', () => {
      gridOptionMock.enableTreeData = true;
      gridOptionMock.treeDataOptions = { columnId: 'file', childrenPropName: 'files' };

      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyCurrentSort = jest.spyOn(service, 'getCurrentLocalSorters');
      const spyOnLocalSort = jest.spyOn(service, 'onLocalSortChanged');
      const spyUpdateSorting = jest.spyOn(service, 'updateSorting');
      const mockSortedCols: ColumnSort[] = [
        { sortAsc: true, sortCol: { id: 'lastName', field: 'lastName', width: 100 } },
        { sortAsc: false, sortCol: { id: 'file', field: 'file', width: 75 } }
      ];

      sharedService.hierarchicalDataset = [];
      service.bindLocalOnSort(gridStub);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: mockSortedCols, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(spyCurrentSort).toHaveBeenCalled();
      expect(spyUpdateSorting).toHaveBeenCalledWith([{ columnId: 'file', direction: 'ASC' }]);
      expect(spyEmitSort).toHaveBeenCalledWith([
        { columnId: 'lastName', direction: 'ASC' },
        { columnId: 'file', direction: 'DESC' },
      ]);
      expect(spyOnLocalSort).toHaveBeenCalledWith(gridStub, mockSortedCols);
    });

    it('should set an "initialSort" and expect "updateSorting" to be called with different sort tree column', () => {
      gridOptionMock.enableTreeData = true;
      gridOptionMock.treeDataOptions = { columnId: 'file', childrenPropName: 'files', initialSort: { columnId: 'firstName', direction: 'DESC' } };

      const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
      const spyCurrentSort = jest.spyOn(service, 'getCurrentLocalSorters');
      const spyOnLocalSort = jest.spyOn(service, 'onLocalSortChanged');
      const spyUpdateSorting = jest.spyOn(service, 'updateSorting');
      const mockSortedCols: ColumnSort[] = [
        { sortAsc: true, sortCol: { id: 'lastName', field: 'lastName', width: 100 } },
        { sortAsc: false, sortCol: { id: 'file', field: 'file', width: 75 } }
      ];

      sharedService.hierarchicalDataset = [];
      service.bindLocalOnSort(gridStub);
      gridStub.onSort.notify({ multiColumnSort: true, sortCols: mockSortedCols, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(spyCurrentSort).toHaveBeenCalled();
      expect(spyUpdateSorting).toHaveBeenCalledWith([{ columnId: 'firstName', direction: 'DESC' }]);
      expect(spyEmitSort).toHaveBeenCalledWith([
        { columnId: 'lastName', direction: 'ASC' },
        { columnId: 'file', direction: 'DESC' },
      ]);
      expect(spyOnLocalSort).toHaveBeenCalledWith(gridStub, mockSortedCols);
    });

    describe('Hierarchical Dataset', () => {
      let dataset: any[] = [];
      const expectedSortedAscDataset = [
        { __parentId: null, __hasChildren: false, __treeLevel: 0, dateModified: '2012-03-05T12:44:00.123Z', file: 'bucket-list.txt', id: 24, size: 0.5 },
        { __parentId: null, __hasChildren: true, __treeLevel: 0, file: 'documents', id: 21 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'misc', id: 9 },
        { __parentId: 9, __hasChildren: false, __treeLevel: 2, dateModified: '2015-02-26T16:50:00.123Z', file: 'todo.txt', id: 10, size: 0.4 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'pdf', id: 4 },
        { __parentId: 4, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-12T14:50:00.123Z', file: 'internet-bill.pdf', id: 6, size: 1.4 },
        { __parentId: 4, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-21T10:22:00.123Z', file: 'map.pdf', id: 5, size: 3.1 },
        { __parentId: 4, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-01T07:50:00.123Z', file: 'phone-bill.pdf', id: 23, size: 1.4 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'txt', id: 2 },
        { __parentId: 2, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-12T14:50:00.123Z', file: 'todo.txt', id: 3, size: 0.7 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'xls', id: 7 },
        { __parentId: 7, __hasChildren: false, __treeLevel: 2, dateModified: '2014-10-02T14:50:00.123Z', file: 'compilation.xls', id: 8, size: 2.3 },
        { __parentId: null, __hasChildren: false, __treeLevel: 0, dateModified: '2015-03-03T03:50:00.123Z', file: 'something.txt', id: 18, size: 90 },
      ];
      const expectedSortedDescDataset = [
        { __parentId: null, __hasChildren: false, __treeLevel: 0, dateModified: '2015-03-03T03:50:00.123Z', file: 'something.txt', id: 18, size: 90 },
        { __parentId: null, __hasChildren: true, __treeLevel: 0, file: 'documents', id: 21 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'xls', id: 7 },
        { __parentId: 7, __hasChildren: false, __treeLevel: 2, dateModified: '2014-10-02T14:50:00.123Z', file: 'compilation.xls', id: 8, size: 2.3 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'txt', id: 2 },
        { __parentId: 2, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-12T14:50:00.123Z', file: 'todo.txt', id: 3, size: 0.7 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'pdf', id: 4 },
        { __parentId: 4, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-01T07:50:00.123Z', file: 'phone-bill.pdf', id: 23, size: 1.4 },
        { __parentId: 4, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-21T10:22:00.123Z', file: 'map.pdf', id: 5, size: 3.1 },
        { __parentId: 4, __hasChildren: false, __treeLevel: 2, dateModified: '2015-05-12T14:50:00.123Z', file: 'internet-bill.pdf', id: 6, size: 1.4 },
        { __parentId: 21, __hasChildren: true, __treeLevel: 1, file: 'misc', id: 9 },
        { __parentId: 9, __hasChildren: false, __treeLevel: 2, dateModified: '2015-02-26T16:50:00.123Z', file: 'todo.txt', id: 10, size: 0.4 },
        { __parentId: null, __hasChildren: false, __treeLevel: 0, dateModified: '2012-03-05T12:44:00.123Z', file: 'bucket-list.txt', id: 24, size: 0.5 },
      ];

      beforeEach(() => {
        dataset = [
          { id: 24, file: 'bucket-list.txt', dateModified: '2012-03-05T12:44:00.123Z', size: 0.5 },
          { id: 18, file: 'something.txt', dateModified: '2015-03-03T03:50:00.123Z', size: 90 },
          {
            id: 21, file: 'documents', files: [
              { id: 2, file: 'txt', files: [{ id: 3, file: 'todo.txt', dateModified: '2015-05-12T14:50:00.123Z', size: 0.7, }] },
              {
                id: 4, file: 'pdf', files: [
                  { id: 5, file: 'map.pdf', dateModified: '2015-05-21T10:22:00.123Z', size: 3.1, },
                  { id: 6, file: 'internet-bill.pdf', dateModified: '2015-05-12T14:50:00.123Z', size: 1.4, },
                  { id: 23, file: 'phone-bill.pdf', dateModified: '2015-05-01T07:50:00.123Z', size: 1.4, },
                ]
              },
              { id: 9, file: 'misc', files: [{ id: 10, file: 'todo.txt', dateModified: '2015-02-26T16:50:00.123Z', size: 0.4, }] },
              { id: 7, file: 'xls', files: [{ id: 8, file: 'compilation.xls', dateModified: '2014-10-02T14:50:00.123Z', size: 2.3, }] },
            ]
          },
        ];
        sharedService.hierarchicalDataset = dataset;
      });

      it('should call onLocalSortChanged with a hierarchical dataset and expect DataView "setItems" method be called once with sorted ASC dataset', () => {
        gridOptionMock.enableTreeData = true;
        gridOptionMock.treeDataOptions = { columnId: 'file', childrenPropName: 'files', };
        jest.spyOn(SharedService.prototype, 'hierarchicalDataset', 'get').mockReturnValue(dataset);

        const spySetItems = jest.spyOn(dataViewStub, 'setItems');
        const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
        const spyCurrentSort = jest.spyOn(service, 'getCurrentLocalSorters');
        const spyUpdateSorting = jest.spyOn(service, 'updateSorting');

        service.bindLocalOnSort(gridStub);

        expect(spyCurrentSort).toHaveBeenCalled();
        expect(spyUpdateSorting).toHaveBeenCalledWith([{ columnId: 'file', direction: 'ASC' }]);
        expect(spyEmitSort).toHaveBeenCalledWith([{ columnId: 'file', direction: 'ASC' }]);
        expect(spySetItems).toHaveBeenCalledTimes(1);
        expect(spySetItems).toHaveBeenCalledWith(expectedSortedAscDataset, 'id');
      });

      it('should call onLocalSortChanged with a hierarchical dataset and expect DataView "setItems" method be called twice (1st is always ASC, then 2nd by our defined sort of DSEC)', () => {
        gridOptionMock.enableTreeData = true;
        gridOptionMock.treeDataOptions = { columnId: 'file', childrenPropName: 'files', };
        jest.spyOn(SharedService.prototype, 'hierarchicalDataset', 'get').mockReturnValue(dataset);

        const spySetItems = jest.spyOn(dataViewStub, 'setItems');
        const spyEmitSort = jest.spyOn(service.onSortChanged, 'next');
        const spyCurrentSort = jest.spyOn(service, 'getCurrentLocalSorters');
        const spyOnLocalSort = jest.spyOn(service, 'onLocalSortChanged');
        const spyUpdateSorting = jest.spyOn(service, 'updateSorting');
        const mockSortedCols: ColumnSort[] = [{ sortAsc: false, sortCol: { id: 'file', field: 'file' } }];

        service.bindLocalOnSort(gridStub);
        gridStub.onSort.notify({ multiColumnSort: true, sortCols: mockSortedCols, grid: gridStub }, new Slick.EventData(), gridStub);

        expect(spyCurrentSort).toHaveBeenCalled();
        expect(spyUpdateSorting).toHaveBeenCalledWith([{ columnId: 'file', direction: 'ASC' }]);
        expect(spyEmitSort).toHaveBeenCalledWith([{ columnId: 'file', direction: 'ASC' }]);
        expect(spyOnLocalSort).toHaveBeenCalledWith(gridStub, mockSortedCols);
        expect(spySetItems).toHaveBeenCalledTimes(2);
        expect(spySetItems).toHaveBeenNthCalledWith(1, expectedSortedAscDataset, 'id');
        expect(spySetItems).toHaveBeenNthCalledWith(2, expectedSortedDescDataset, 'id');
      });

    });
  });
});
