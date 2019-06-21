import { onBackendError, BackendService, GridOption, executeBackendProcessesCallback } from '../..';

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
} as unknown as BackendService;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onLocalSortChanged: jest.fn(),
  render: jest.fn(),
  setSortColumns: jest.fn(),
};

describe('backend-utilities', () => {
  describe('executeBackendProcessesCallback method', () => {
    it('should execute the "internalPostProcess" when it is defined', () => {
      const now = new Date();
      gridOptionMock.backendServiceApi.internalPostProcess = jest.fn();
      const spy = jest.spyOn(gridOptionMock.backendServiceApi, 'internalPostProcess');
      executeBackendProcessesCallback(now, { data: {} }, gridOptionMock.backendServiceApi, gridOptionMock);

      expect(spy).toHaveBeenCalled();
    });

    it('should execute the "postProcess" when it is defined and add some statistics to the object', () => {
      const now = new Date();
      const mockResult = { data: { users: [{ firstName: 'John', lastName: 'Doe' }] } };
      const expectaction = {
        data: { users: [{ firstName: 'John', lastName: 'Doe' }], },
        statistics: {
          startTime: now,
          endTime: now,
          executionTime: 0,
          itemCount: 1,
          totalItemCount: 1
        }
      };
      gridOptionMock.backendServiceApi.postProcess = jest.fn();
      gridOptionMock.pagination = { totalItems: 1, pageSizes: [10, 25], pageSize: 10 };

      const spy = jest.spyOn(gridOptionMock.backendServiceApi, 'postProcess');
      executeBackendProcessesCallback(now, mockResult, gridOptionMock.backendServiceApi, gridOptionMock);

      expect(spy).toHaveBeenCalledWith(expectaction);
    });
  });

  describe('onBackendError method', () => {
    it('should run the "onError" callback method when provided', () => {
      gridOptionMock.backendServiceApi.onError = jest.fn();
      const spy = jest.spyOn(gridOptionMock.backendServiceApi, 'onError');

      onBackendError('some error', gridOptionMock.backendServiceApi);

      expect(spy).toHaveBeenCalled();
    });

    it('should throw back the error when callback was provided', () => {
      gridOptionMock.backendServiceApi.onError = undefined;
      expect(() => onBackendError('some error', gridOptionMock.backendServiceApi)).toThrow();
    });
  });
});

