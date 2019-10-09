import { onBackendError, GridOption, executeBackendProcessesCallback } from '../..';

const gridOptionMock = {
  enablePagination: true,
  backendServiceApi: {
    service: undefined,
    preProcess: jest.fn(),
    process: jest.fn(),
    postProcess: jest.fn(),
  }
} as GridOption;

describe('backend-utilities', () => {
  describe('executeBackendProcessesCallback method', () => {
    it('should execute the "internalPostProcess" when it is defined', () => {
      const now = new Date();
      gridOptionMock.backendServiceApi.internalPostProcess = jest.fn();
      const spy = jest.spyOn(gridOptionMock.backendServiceApi, 'internalPostProcess');
      executeBackendProcessesCallback(now, { data: {} }, gridOptionMock.backendServiceApi, 0);

      expect(spy).toHaveBeenCalled();
    });

    it('should execute the "postProcess" when it is defined and add some metrics to the object', () => {
      const now = new Date();
      const mockResult = { data: { users: [{ firstName: 'John', lastName: 'Doe' }] } };
      const expectaction = {
        data: { users: [{ firstName: 'John', lastName: 'Doe' }], },
        metrics: {
          startTime: now,
          endTime: expect.any(Date),
          executionTime: expect.any(Number),
          itemCount: 1,
          totalItemCount: 1
        },
        // @deprecated, should be removed when Statistic is removed from the lib
        statistics: {
          startTime: now,
          endTime: expect.any(Date),
          executionTime: expect.any(Number),
          itemCount: 1,
          totalItemCount: 1
        }
      };
      gridOptionMock.backendServiceApi.postProcess = jest.fn();
      gridOptionMock.pagination = { totalItems: 1, pageSizes: [10, 25], pageSize: 10 };

      const spy = jest.spyOn(gridOptionMock.backendServiceApi, 'postProcess');
      executeBackendProcessesCallback(now, mockResult, gridOptionMock.backendServiceApi, 1);

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

