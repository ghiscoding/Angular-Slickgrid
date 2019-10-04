import { Subject, of, throwError } from 'rxjs';

import { PaginationService } from './../pagination.service';
import { FilterService, GridService } from '../index';
import { Column, GridOption, CurrentFilter } from '../../models';
import * as utilities from '../backend-utilities';

const mockExecuteBackendProcess = jest.fn();
// @ts-ignore
utilities.executeBackendProcessesCallback = mockExecuteBackendProcess;

const mockBackendError = jest.fn();
// @ts-ignore
utilities.onBackendError = mockBackendError;

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

const filterServiceStub = {
  clearFilters: jest.fn(),
  onFilterChanged: new Subject<CurrentFilter[]>(),
  onFilterCleared: new Subject<boolean>(),
} as unknown as FilterService;

const gridServiceStub = {
  resetColumns: jest.fn(),
  onItemAdded: new Subject<any[]>(),
  onItemDeleted: new Subject<any[]>(),
} as unknown as GridService;

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    service = new PaginationService(filterServiceStub, gridServiceStub);
  });

  afterEach(() => {
    mockGridOption.pagination.pageSize = 25;
    mockGridOption.pagination.pageNumber = 2;
    mockGridOption.pagination.totalItems = 85;
    service.dispose();
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the service and call "refreshPagination" and trigger "onPaginationChanged" event', () => {
    const refreshSpy = jest.spyOn(service, 'refreshPagination');
    const paginationSpy = jest.spyOn(service.onPaginationChanged, 'next');
    service.init(gridStub, dataviewStub, mockGridOption);

    expect(service.gridPaginationOptions).toEqual(mockGridOption);
    expect(service.pager).toBeTruthy();
    expect(refreshSpy).toHaveBeenCalled();
    expect(service.getCurrentPageNumber()).toBe(2);
    expect(paginationSpy).toHaveBeenCalledWith({
      from: 26, to: 50, itemsPerPage: 25, pageCount: 4, pageNumber: 2, totalItems: 85, availablePageSizes: mockGridOption.pagination.pageSizes
    });
  });

  it('should initialize the service and be able to change the grid options by the SETTER and expect the GETTER to have updated options', () => {
    const mockGridOptionCopy = { ...mockGridOption, options: null };
    service.init(gridStub, dataviewStub, mockGridOptionCopy);
    service.gridPaginationOptions = mockGridOption;

    expect(service.gridPaginationOptions).toEqual(mockGridOption);
    expect(service.pager).toBeTruthy();
    expect(service.getCurrentPageNumber()).toBe(2);
  });

  describe('changeItemPerPage method', () => {
    it('should be on page 0 when total items is 0', () => {
      mockGridOption.pagination.totalItems = 0;
      service.init(gridStub, dataviewStub, mockGridOption);
      service.changeItemPerPage(30);

      expect(service.getCurrentPageNumber()).toBe(0);
      expect(service.getCurrentItemPerPageCount()).toBe(30);
    });

    it('should be on page 1 with 2 pages when total items is 51 and we set 50 per page', () => {
      mockGridOption.pagination.pageSize = 25;
      mockGridOption.pagination.pageNumber = 2;
      mockGridOption.pagination.totalItems = 51;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.changeItemPerPage(50);

      expect(service.getCurrentPageNumber()).toBe(1);
      expect(service.getCurrentItemPerPageCount()).toBe(50);
    });

    it('should be on page 1 with 2 pages when total items is 100 and we set 50 per page', () => {
      mockGridOption.pagination.pageSize = 25;
      mockGridOption.pagination.pageNumber = 2;
      mockGridOption.pagination.totalItems = 100;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.changeItemPerPage(50);

      expect(service.getCurrentPageNumber()).toBe(1);
      expect(service.getCurrentItemPerPageCount()).toBe(50);
    });
  });

  describe('goToFirstPage method', () => {
    it('should expect current page to be 1 and "processOnPageChanged" method to be called', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');
      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToFirstPage();

      expect(service.pager.from).toBe(1);
      expect(service.pager.to).toBe(25);
      expect(service.getCurrentPageNumber()).toBe(1);
      expect(spy).toHaveBeenCalledWith(1, undefined);
    });
  });

  describe('goToLastPage method', () => {
    it('should call "goToLastPage" method and expect current page to be last page and "processOnPageChanged" method to be called', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToLastPage();

      expect(service.pager.from).toBe(76);
      expect(service.pager.to).toBe(85);
      expect(service.getCurrentPageNumber()).toBe(4);
      expect(spy).toHaveBeenCalledWith(4, undefined);
    });
  });

  describe('goToNextPage method', () => {
    it('should expect page to increment by 1 and "processOnPageChanged" method to be called', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToNextPage();

      expect(service.pager.from).toBe(51);
      expect(service.pager.to).toBe(75);
      expect(service.getCurrentPageNumber()).toBe(3);
      expect(spy).toHaveBeenCalledWith(3, undefined);
    });

    it('should expect page to increment by 1 and "processOnPageChanged" method to be called', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToNextPage();

      expect(service.pager.from).toBe(51);
      expect(service.pager.to).toBe(75);
      expect(service.getCurrentPageNumber()).toBe(3);
      expect(spy).toHaveBeenCalledWith(3, undefined);
    });

    it('should not expect "processOnPageChanged" method to be called when we are already on last page', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');
      mockGridOption.pagination.pageNumber = 4;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToNextPage();

      expect(service.pager.from).toBe(76);
      expect(service.pager.to).toBe(85);
      expect(service.getCurrentPageNumber()).toBe(4);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('goToPreviousPage method', () => {
    it('should expect page to decrement by 1 and "processOnPageChanged" method to be called', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToPreviousPage();

      expect(service.pager.from).toBe(1);
      expect(service.pager.to).toBe(25);
      expect(service.getCurrentPageNumber()).toBe(1);
      expect(spy).toHaveBeenCalledWith(1, undefined);
    });

    it('should not expect "processOnPageChanged" method to be called when we are already on first page', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');
      mockGridOption.pagination.pageNumber = 1;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToPreviousPage();

      expect(service.pager.from).toBe(1);
      expect(service.pager.to).toBe(25);
      expect(service.getCurrentPageNumber()).toBe(1);
      expect(spy).not.toHaveBeenCalled();
    });
  });


  describe('goToPageNumber', () => {
    it('should expect page to decrement by 1 and "processOnPageChanged" method to be called', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToPageNumber(4);

      expect(service.pager.from).toBe(76);
      expect(service.pager.to).toBe(85);
      expect(service.getCurrentPageNumber()).toBe(4);
      expect(spy).toHaveBeenCalledWith(4, undefined);
    });

    it('should expect to go to page 1 when input number is below 1', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToPageNumber(0);

      expect(service.pager.from).toBe(1);
      expect(service.pager.to).toBe(25);
      expect(service.getCurrentPageNumber()).toBe(1);
      expect(spy).toHaveBeenCalledWith(1, undefined);
    });

    it('should expect to go to last page (4) when input number is bigger than the last page number', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToPageNumber(10);

      expect(service.pager.from).toBe(76);
      expect(service.pager.to).toBe(85);
      expect(service.getCurrentPageNumber()).toBe(4);
      expect(spy).toHaveBeenCalledWith(4, undefined);
    });

    it('should not expect "processOnPageChanged" method to be called when we are already on same page', () => {
      const spy = jest.spyOn(service, 'processOnPageChanged');
      mockGridOption.pagination.pageNumber = 2;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.goToPageNumber(2);

      expect(service.pager.from).toBe(26);
      expect(service.pager.to).toBe(50);
      expect(service.getCurrentPageNumber()).toBe(2);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('processOnPageChanged method', () => {
    beforeEach(() => {
      mockGridOption.backendServiceApi = {
        service: mockBackendService,
        process: jest.fn(),
        options: {
          columnDefinitions: [{ id: 'name', field: 'name' }] as Column[],
          datasetName: 'user',
        }
      };
    });

    it('should throw an error when no backendServiceApi is provided', async () => {
      service.init(gridStub, dataviewStub, mockGridOption);
      mockGridOption.backendServiceApi = null;

      await expect(service.processOnPageChanged(1)).rejects.toThrowError(`BackendServiceApi requires the following 2 properties "process" and "service" to be defined.`);
    });

    it('should execute "preProcess" method when defined', () => {
      const spy = jest.fn();
      mockGridOption.backendServiceApi.preProcess = spy;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.processOnPageChanged(1);

      expect(spy).toHaveBeenCalled();
    });

    it('should execute "process" method and catch error when process Promise rejects', async () => {
      const mockError = { error: '404' };
      const postSpy = jest.fn();
      mockGridOption.backendServiceApi.process = postSpy;
      jest.spyOn(mockBackendService, 'processOnPaginationChanged').mockReturnValue('backend query');
      const promise = new Promise((resolve, reject) => setTimeout(() => reject(mockError), 1));
      jest.spyOn(mockGridOption.backendServiceApi, 'process').mockReturnValue(promise);

      try {
        service.init(gridStub, dataviewStub, mockGridOption);
        await service.processOnPageChanged(1);
      } catch (e) {
        expect(mockBackendError).toHaveBeenCalledWith(mockError, mockGridOption.backendServiceApi);
      }
    });

    it('should execute "process" method and catch error when process Observable fails', async () => {
      const mockError = { error: '404' };
      const postSpy = jest.fn();
      mockGridOption.backendServiceApi.process = postSpy;
      jest.spyOn(mockBackendService, 'processOnPaginationChanged').mockReturnValue('backend query');
      jest.spyOn(mockGridOption.backendServiceApi, 'process').mockReturnValue(throwError(mockError));

      try {
        service.init(gridStub, dataviewStub, mockGridOption);
        await service.processOnPageChanged(1);
      } catch (e) {
        expect(mockBackendError).toHaveBeenCalledWith(mockError, mockGridOption.backendServiceApi);
      }
    });

    it('should execute "process" method when defined', (done) => {
      const postSpy = jest.fn();
      mockGridOption.backendServiceApi.process = postSpy;
      jest.spyOn(mockBackendService, 'processOnPaginationChanged').mockReturnValue('backend query');
      const now = new Date();
      const processResult = { users: [{ name: 'John' }], metrics: { startTime: now, endTime: now, executionTime: 0, totalItemCount: 0 } };
      const promise = new Promise((resolve) => setTimeout(() => resolve(processResult), 1));
      jest.spyOn(mockGridOption.backendServiceApi, 'process').mockReturnValue(promise);

      service.init(gridStub, dataviewStub, mockGridOption);
      service.processOnPageChanged(1);

      setTimeout(() => {
        expect(postSpy).toHaveBeenCalled();
        expect(mockExecuteBackendProcess).toHaveBeenCalledWith(expect.toBeDate(), processResult, mockGridOption.backendServiceApi, mockGridOption);
        done();
      });
    });

    it('should execute "process" method when defined', (done) => {
      const postSpy = jest.fn();
      mockGridOption.backendServiceApi.process = postSpy;
      jest.spyOn(mockBackendService, 'processOnPaginationChanged').mockReturnValue('backend query');
      const now = new Date();
      const processResult = { users: [{ name: 'John' }], metrics: { startTime: now, endTime: now, executionTime: 0, totalItemCount: 0 } };
      jest.spyOn(mockGridOption.backendServiceApi, 'process').mockReturnValue(of(processResult));

      service.init(gridStub, dataviewStub, mockGridOption);
      service.processOnPageChanged(1);

      setTimeout(() => {
        expect(postSpy).toHaveBeenCalled();
        expect(mockExecuteBackendProcess).toHaveBeenCalledWith(expect.toBeDate(), processResult, mockGridOption.backendServiceApi, mockGridOption);
        done();
      });
    });
  });

  describe('recalculateFromToIndexes method', () => {
    it('should recalculate the From/To as 0 when total items is 0', () => {
      mockGridOption.pagination.pageSize = 25;
      mockGridOption.pagination.pageNumber = 2;
      mockGridOption.pagination.totalItems = 0;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.recalculateFromToIndexes();

      expect(service.pager.from).toBe(0);
      expect(service.pager.to).toBe(0);
    });

    it('should recalculate the From/To within range', () => {
      mockGridOption.pagination.pageSize = 25;
      mockGridOption.pagination.pageNumber = 2;
      mockGridOption.pagination.totalItems = 85;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.recalculateFromToIndexes();

      expect(service.pager.from).toBe(26);
      expect(service.pager.to).toBe(50);
    });

    it('should recalculate the From/To within range and have the To equal the total items when total items is not a modulo of 1', () => {
      mockGridOption.pagination.pageSize = 25;
      mockGridOption.pagination.pageNumber = 4;
      mockGridOption.pagination.totalItems = 85;

      service.init(gridStub, dataviewStub, mockGridOption);
      service.recalculateFromToIndexes();

      expect(service.pager.from).toBe(76);
      expect(service.pager.to).toBe(85);
    });
  });

  describe('refreshPagination method', () => {
    beforeEach(() => {
      mockGridOption.backendServiceApi = {
        service: mockBackendService,
        process: jest.fn(),
        options: {
          columnDefinitions: [{ id: 'name', field: 'name' }] as Column[],
          datasetName: 'user',
        }
      };
    });

    it('should throw an error when no backendServiceApi is provided', (done) => {
      try {
        mockGridOption.backendServiceApi = null;
        service.init(gridStub, dataviewStub, mockGridOption);
        service.refreshPagination();
      } catch (e) {
        expect(e.toString()).toContain(`BackendServiceApi requires the following 2 properties "process" and "service" to be defined.`);
        done();
      }
    });

    it('should call refreshPagination when "onFilterCleared" is triggered', () => {
      const spy = jest.spyOn(service, 'refreshPagination');

      service.init(gridStub, dataviewStub, mockGridOption);
      filterServiceStub.onFilterCleared.next(true);

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should call refreshPagination when "onFilterChanged" is triggered', () => {
      const spy = jest.spyOn(service, 'refreshPagination');

      service.init(gridStub, dataviewStub, mockGridOption);
      filterServiceStub.onFilterChanged.next([{ columnId: 'field1', operator: '=', searchTerms: [] }]);

      expect(spy).toHaveBeenCalledWith(true);
    });
  });

  // processOnItemAddedOrRemoved is private but we can spy on recalculateFromToIndexes
  describe('processOnItemAddedOrRemoved private method', () => {
    afterEach(() => {
      mockGridOption.pagination.pageSize = 25;
      mockGridOption.pagination.pageNumber = 2;
      mockGridOption.pagination.totalItems = 85;
      jest.clearAllMocks();
    });

    it('should call "processOnItemAddedOrRemoved" and expect the (To) to be incremented by 1 when "onItemAdded" is triggered with a single item', (done) => {
      const mockItems = { name: 'John' };
      const spy = jest.spyOn(service, 'recalculateFromToIndexes');

      service.init(gridStub, dataviewStub, mockGridOption);
      gridServiceStub.onItemAdded.next(mockItems);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(service.pager.from).toBe(26);
        expect(service.pager.to).toBe(50 + 1);
        done();
      });
    });

    it('should call "processOnItemAddedOrRemoved" and expect the (To) to be incremented by 2 when "onItemAdded" is triggered with an array of 2 new items', (done) => {
      const mockItems = [{ name: 'John' }, { name: 'Jane' }];
      const spy = jest.spyOn(service, 'recalculateFromToIndexes');

      service.init(gridStub, dataviewStub, mockGridOption);
      gridServiceStub.onItemAdded.next(mockItems);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(service.pager.from).toBe(26);
        expect(service.pager.to).toBe(50 + mockItems.length);
        done();
      });
    });

    it('should call "processOnItemAddedOrRemoved" and expect the (To) to remain the same when "onItemAdded" is triggered without any items', (done) => {
      service.init(gridStub, dataviewStub, mockGridOption);
      gridServiceStub.onItemAdded.next(null);

      setTimeout(() => {
        expect(service.pager.from).toBe(26);
        expect(service.pager.to).toBe(50);
        done();
      });
    });

    it('should call "processOnItemAddedOrRemoved" and expect the (To) to be decremented by 2 when "onItemDeleted" is triggered with a single item', (done) => {
      const mockItems = { name: 'John' };
      const spy = jest.spyOn(service, 'recalculateFromToIndexes');

      service.init(gridStub, dataviewStub, mockGridOption);
      gridServiceStub.onItemDeleted.next(mockItems);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(service.pager.from).toBe(26);
        expect(service.pager.to).toBe(50 - 1);
        done();
      });
    });

    it('should call "processOnItemAddedOrRemoved" and expect the (To) to be decremented by 2 when "onItemDeleted" is triggered with an array of 2 new items', (done) => {
      const mockItems = [{ name: 'John' }, { name: 'Jane' }];
      const spy = jest.spyOn(service, 'recalculateFromToIndexes');

      service.init(gridStub, dataviewStub, mockGridOption);
      gridServiceStub.onItemDeleted.next(mockItems);

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(service.pager.from).toBe(26);
        expect(service.pager.to).toBe(50 - mockItems.length);
        done();
      });
    });

    it('should call "processOnItemAddedOrRemoved" and expect the (To) to remain the same when "onItemDeleted" is triggered without any items', (done) => {
      service.init(gridStub, dataviewStub, mockGridOption);
      gridServiceStub.onItemDeleted.next(null);

      setTimeout(() => {
        expect(service.pager.from).toBe(26);
        expect(service.pager.to).toBe(50);
        done();
      });
    });
  });
});
