import { GridOption } from '../../models';
import main, { executeBackendProcessesCallback, onBackendError, refreshBackendDataset } from '../../services/backend-utilities';
// import * as BackendUtilities from '../../services/backend-utilities';
import { GraphqlService } from '../../services/graphql.service';

const graphqlServiceMock = {
  buildQuery: jest.fn(),
  updateFilters: jest.fn(),
  updatePagination: jest.fn(),
  updateSorters: jest.fn(),
} as unknown as GraphqlService;

describe('backend-utilities', () => {
  let gridOptionMock: GridOption;

  beforeEach(() => {
    gridOptionMock = {
      enablePagination: true,
      backendServiceApi: {
        service: graphqlServiceMock,
        preProcess: jest.fn(),
        process: jest.fn(),
        postProcess: jest.fn(),
      },
      pagination: {
        pageSize: 10,
        pageSizes: [10, 25, 50],
        pageNumber: 1,
        totalItems: 0
      }
    } as GridOption;
  });

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

  describe('refreshBackendDataset method', () => {
    let executeSpy;

    beforeAll(() => {
      executeSpy = jest.spyOn(main, 'executeBackendCallback');
    });

    it('should call "executeBackendCallback" after calling the "refreshBackendDataset" method', () => {
      const query = `query { users (first:20,offset:0) { totalCount, nodes { id,name,gender,company } } }`;
      const querySpy = jest.spyOn(gridOptionMock.backendServiceApi.service, 'buildQuery').mockReturnValue(query);

      refreshBackendDataset(gridOptionMock);

      expect(querySpy).toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalledWith(gridOptionMock.backendServiceApi, query, null, expect.toBeDate(), gridOptionMock.pagination.totalItems);
    });

    it('should throw an error when backendServiceApi is undefined', (done) => {
      try {
        gridOptionMock.backendServiceApi = undefined;
        refreshBackendDataset(undefined);
      } catch (e) {
        expect(e.toString()).toContain('BackendServiceApi requires at least a "process" function and a "service" defined');
        done();
      }
    });
  });
});

