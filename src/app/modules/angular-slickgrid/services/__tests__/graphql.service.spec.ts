import { TranslateService } from '@ngx-translate/core';
import { GraphqlService } from './../graphql.service';
import {
  Column,
  ColumnFilter,
  ColumnSort,
  CurrentFilter,
  FilterChangedArgs,
  GraphqlServiceOption,
  GridOption,
  MultiColumnSort,
  Pagination,
  ColumnFilters,
  OperatorType,
  FieldType,
  CurrentSorter,
} from '../../models';

const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;

function removeSpaces(textS) {
  return `${textS}`.replace(/\s+/g, '');
}

const gridOptionMock = {
  enablePagination: true,
  backendServiceApi: {
    service: undefined,
    preProcess: jest.fn(),
    process: jest.fn(),
    postProcess: jest.fn(),
  }
} as GridOption;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  setColumns: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectedRows: jest.fn(),
  setSortColumns: jest.fn(),
};

describe('GraphqlService', () => {
  let mockColumns: Column[];
  let service: GraphqlService;
  let paginationOptions: Pagination;
  let serviceOptions: GraphqlServiceOption;

  beforeEach(() => {
    mockColumns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
    service = new GraphqlService();
    serviceOptions = {
      columnDefinitions: mockColumns,
      datasetName: 'users'
    };
    paginationOptions = {
      pageNumber: 1,
      pageSizes: [5, 10, 25, 50, 100],
      pageSize: 10,
      totalItems: 100
    };
    gridOptionMock.backendServiceApi.service = service;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('init method', () => {
    it('should initialize the service and expect the service options and pagination to be set', () => {
      service.init(serviceOptions, paginationOptions, gridStub);
      expect(service.options).toEqual(serviceOptions);
      expect(service.pagination).toEqual(paginationOptions);
    });

    it('should get the column definitions from "getColumns" when not provided in the service options', () => {
      const columns = [{ id: 'field4', field: 'field4', width: 50 }, { id: 'field2', field: 'field2', width: 50 }];
      const spy = jest.spyOn(gridStub, 'getColumns').mockReturnValue(columns);

      service.init({ datasetName: 'users', columnDefinitions: undefined }, paginationOptions, gridStub);

      expect(spy).toHaveBeenCalled();
      expect(service.columnDefinitions).toEqual(columns);
    });
  });

  describe('buildQuery method', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should throw an error when no service options exists after service init', () => {
      service.init(undefined);
      expect(() => service.buildQuery()).toThrow();
    });

    it('should throw an error when no dataset is provided in the service options after service init', () => {
      service.init({ datasetName: undefined });
      expect(() => service.buildQuery()).toThrow();
    });

    it('should throw an error when no column definitions is provided in the service options after service init', () => {
      service.init({ datasetName: 'users' });
      expect(() => service.buildQuery()).toThrow();
    });

    it('should return a simple query with pagination set and nodes that includes "id" and the other 2 fields properties', () => {
      const expectation = `query{ users(first:10, offset:0){ totalCount, nodes{ id, field1, field2 }}}`;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should use "columnDefinitions" from the "serviceOptions" when private member is undefined and then return a simple query as usual', () => {
      const expectation = `query{ users(first:10, offset:0){ totalCount, nodes{ id, field1 }}}`;

      service.init({ datasetName: 'users', columnDefinitions: undefined }, paginationOptions, gridStub);
      service.options.columnDefinitions = [{ id: 'field1', field: 'field1', width: 100 }];
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a simple query with pagination set and nodes that includes at least "id" when the column definitions is an empty array', () => {
      const expectation = `query{ users(first:10, offset:0){ totalCount, nodes{ id }}}`;
      const columns = [];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should add extra column extra "fields" and expect them to be part of the query string', () => {
      const expectation = `query{ users(first:10, offset:0){ totalCount, nodes{ id, field1, field2, field3, field4 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100, fields: ['field3', 'field4'] }];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should exclude a column and expect a query string without it', () => {
      const expectation = `query{ users(first:10, offset:0){ totalCount, nodes{ id, field1 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100, excludeFromQuery: true }];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should use default pagination "first" option when "paginationOptions" is not provided', () => {
      const expectation = `query{ users(first:${DEFAULT_ITEMS_PER_PAGE}, offset:0){ totalCount, nodes{ id, field1 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100, excludeFromQuery: true }];

      service.init({ datasetName: 'users', columnDefinitions: columns }, undefined, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a simple query with pagination set and nodes that includes at least "id" when the column definitions is an empty array', () => {
      const expectation = `query{users(first:20) { totalCount, pageInfo{ hasNextPage,endCursor }, edges{ cursor,node:id }}}`;
      const columns = [];

      service.init({ datasetName: 'users', columnDefinitions: columns, isWithCursor: true }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return complex objects with dot notation and expect the query to be split and wrapped with curly braces', () => {
      const expectation = `query{ users(first:10, offset:0){ totalCount, nodes{ id, field1, billing{address{street,zip}} }}}`;
      const columns = [
        { id: 'field1', field: 'field1' },
        { id: 'billing.address.street', field: 'billing.address.street' },
        { id: 'billing.address.zip', field: 'billing.address.zip' }
      ];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should exclude pagination from the query string when the option is disabled', () => {
      const expectation = `query{ users{ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
      gridOptionMock.enablePagination = false;

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      gridOptionMock.enablePagination = true; // reset it for the next test
    });

    it('should have a different pagination offset when it is updated before calling the buildQuery query (presets does that)', () => {
      const expectation = `query{ users(first:20, offset:40){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should make sure the offset pagination is never below zero, even when new page is 0', () => {
      const expectation = `query{ users(first:20, offset:0){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(0, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should make sure the offset pagination is never below zero, even when new is 1 the offset should remain 0', () => {
      const expectation = `query{ users(first:20, offset:0){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ datasetName: 'users', columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(1, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should be able to provide "sortingOptions" and see the query string include the sorting', () => {
      const expectation = `query{ users(first:20, offset:40,orderBy:[{field:field1, direction:DESC}]){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ datasetName: 'users', columnDefinitions: columns, sortingOptions: [{ field: 'field1', direction: 'DESC' }] }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should be able to provide "filteringOptions" and see the query string include the sorting', () => {
      const expectation = `query{ users(first:20, offset:40,filterBy:[{field:field1, operator: >, value:"2000-10-10"}]){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ datasetName: 'users', columnDefinitions: columns, filteringOptions: [{ field: 'field1', operator: '>', value: '2000-10-10' }] }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should include default locale "en" in the query string when option "addLocaleIntoQuery" is enabled and i18n is not defined', () => {
      const expectation = `query{ users(first:10, offset:0, locale: "en"){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ datasetName: 'users', columnDefinitions: columns, addLocaleIntoQuery: true }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should include the locale in the query string when option "addLocaleIntoQuery" is enabled', () => {
      const expectation = `query{ users(first:10, offset:0, locale: "fr-CA"){ totalCount, nodes{ id, field1, field2 }}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      gridOptionMock.i18n = { currentLang: 'fr-CA' } as unknown as TranslateService;
      service.init({ datasetName: 'users', columnDefinitions: columns, addLocaleIntoQuery: true }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should include extra query arguments in the query string when option "extraQueryArguments" is used', () => {
      const expectation = `query{users(first:10, offset:0, userId:123, firstName:"John"){ totalCount, nodes{id,field1,field2}}}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({
        datasetName: 'users',
        columnDefinitions: columns,
        extraQueryArguments: [{ field: 'userId', value: 123 }, { field: 'firstName', value: 'John' }],
      }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should keep the double quotes in the field name when "keepArgumentFieldDoubleQuotes" is enabled', () => {
      const expectation = `query { users
                          ( first:10, offset:0,
                            orderBy:[{ field:"field1", direction:DESC},{ field:"field2", direction:ASC }],
                            filterBy:[{ field:"field1", operator:>, value:"2000-10-10" },{ field:"field2", operator:EQ, value:"John" }]
                          ) {
                            totalCount, nodes { id,field1,field2 }}
                          }`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({
        datasetName: 'users',
        columnDefinitions: columns,
        filteringOptions: [{ field: 'field1', operator: '>', value: '2000-10-10' }, { field: 'field2', operator: 'EQ', value: 'John' }],
        sortingOptions: [{ field: 'field1', direction: 'DESC' }, { field: 'field2', direction: 'ASC' }],
        keepArgumentFieldDoubleQuotes: true
      }, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });
  });

  describe('buildFilterQuery method', () => {
    it('should return a simple query from an column array', () => {
      const expectation = `firstName, lastName`;
      const columns = ['firstName', 'lastName'];

      const query = service.buildFilterQuery(columns);

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query string including complex object', () => {
      const expectation = `firstName, lastName, billing{address{street, zip}}`;
      const columns = ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip'];

      const query = service.buildFilterQuery(columns);

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });
  });

  describe('clearFilters method', () => {
    it('should call "updateOptions" to clear all filters', () => {
      const spy = jest.spyOn(service, 'updateOptions');
      service.clearFilters();
      expect(spy).toHaveBeenCalledWith({ filteringOptions: [] });
    });
  });

  describe('clearSorters method', () => {
    it('should call "updateOptions" to clear all sorting', () => {
      const spy = jest.spyOn(service, 'updateOptions');
      service.clearSorters();
      expect(spy).toHaveBeenCalledWith({ sortingOptions: [] });
    });
  });

  describe('getInitPaginationOptions method', () => {
    beforeEach(() => {
      paginationOptions.pageSize = 20;
    });

    it('should return the pagination options without cursor by default', () => {
      service.init({ datasetName: 'users', columnDefinitions: [] }, paginationOptions);
      const output = service.getInitPaginationOptions();
      expect(output).toEqual({ first: 20, offset: 0 });
    });

    it('should return the pagination options with cursor info when "isWithCursor" is enabled', () => {
      service.init({ datasetName: 'users', columnDefinitions: [], isWithCursor: true }, paginationOptions);
      const output = service.getInitPaginationOptions();
      expect(output).toEqual({ first: 20 });
    });

    it('should return the pagination options with default page size of 25 when "paginationOptions" is undefined', () => {
      service.init({ datasetName: 'users', columnDefinitions: [] }, undefined);
      const output = service.getInitPaginationOptions();
      expect(output).toEqual({ first: DEFAULT_ITEMS_PER_PAGE, offset: 0 });
    });
  });

  describe('getDatasetName method', () => {
    it('should return the dataset name when defined', () => {
      service.init({ datasetName: 'users', columnDefinitions: [] });
      const output = service.getDatasetName();
      expect(output).toBe('users');
    });

    it('should return empty string when dataset name is undefined', () => {
      service.init({ datasetName: undefined, columnDefinitions: [] });
      const output = service.getDatasetName();
      expect(output).toBe('');
    });
  });

  describe('resetPaginationOptions method', () => {
    beforeEach(() => {
      paginationOptions.pageSize = 20;
    });

    it('should reset the pagination options with default pagination', () => {
      const spy = jest.spyOn(service, 'updateOptions');

      service.init({ datasetName: 'users', columnDefinitions: [] }, paginationOptions);
      service.resetPaginationOptions();

      expect(spy).toHaveBeenCalledWith({ paginationOptions: { first: 20, offset: 0 } });
    });

    it('should reset the pagination options when using cursor', () => {
      const spy = jest.spyOn(service, 'updateOptions');

      service.init({ datasetName: 'users', columnDefinitions: [], isWithCursor: true }, paginationOptions);
      service.resetPaginationOptions();

      expect(spy).toHaveBeenCalledWith({ paginationOptions: { after: '', before: undefined, last: undefined } });
    });
  });

  describe('processOnFilterChanged method', () => {
    it('should throw an error when backendService is undefined', () => {
      service.init(serviceOptions, paginationOptions, undefined);
      // @ts-ignore
      expect(() => service.processOnFilterChanged(null, { grid: gridStub })).toThrow();
    });

    it('should throw an error when grid is undefined', () => {
      service.init(serviceOptions, paginationOptions, gridStub);

      // @ts-ignore
      expect(() => service.processOnFilterChanged(null, { grid: undefined }))
        .toThrowError('Something went wrong when trying create the GraphQL Backend Service');
    });

    it('should return a query with the new filter', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:"female"}]) { totalCount,nodes{ id,field1,field2 } }}`;
      const querySpy = jest.spyOn(service, 'buildQuery');
      const resetSpy = jest.spyOn(service, 'resetPaginationOptions');
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilter = { columnDef: mockColumn, columnId: 'gender', operator: 'EQ', searchTerms: ['female'] } as ColumnFilter;
      const mockFilterChangedArgs = {
        columnDef: mockColumn,
        columnId: 'gender',
        columnFilters: { gender: mockColumnFilter },
        grid: gridStub,
        operator: 'EQ',
        searchTerms: ['female'],
        shouldTriggerQuery: true
      } as FilterChangedArgs;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnFilterChanged(null, mockFilterChangedArgs);
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalled();
      expect(currentFilters).toEqual([{ columnId: 'gender', operator: 'EQ', searchTerms: ['female'] }]);
    });

    it('should return a query with a new filter when previous filters exists', () => {
      const expectation = `query{users(first:10, offset:0,
                          filterBy:[{field:gender, operator:EQ, value:"female"}, {field:firstName, operator:StartsWith, value:"John"}])
                          { totalCount,nodes{ id,field1,field2 } }}`;
      const querySpy = jest.spyOn(service, 'buildQuery');
      const resetSpy = jest.spyOn(service, 'resetPaginationOptions');
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnName = { id: 'firstName', field: 'firstName' } as Column;
      const mockColumnFilter = { columnDef: mockColumn, columnId: 'gender', operator: 'EQ', searchTerms: ['female'] } as ColumnFilter;
      const mockColumnFilterName = { columnDef: mockColumnName, columnId: 'firstName', operator: 'StartsWith', searchTerms: ['John'] } as ColumnFilter;
      const mockFilterChangedArgs = {
        columnDef: mockColumn,
        columnId: 'gender',
        columnFilters: { gender: mockColumnFilter, name: mockColumnFilterName },
        grid: gridStub,
        operator: 'EQ',
        searchTerms: ['female'],
        shouldTriggerQuery: true
      } as FilterChangedArgs;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnFilterChanged(null, mockFilterChangedArgs);
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalled();
      expect(currentFilters).toEqual([
        { columnId: 'gender', operator: 'EQ', searchTerms: ['female'] },
        { columnId: 'firstName', operator: 'StartsWith', searchTerms: ['John'] }
      ]);
    });
  });

  describe('processOnPaginationChanged method', () => {
    it('should return a query with the new pagination', () => {
      const expectation = `query{users(first:20, offset:40) { totalCount,nodes { id, field1, field2 }}}`;
      const querySpy = jest.spyOn(service, 'buildQuery');

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnPaginationChanged(null, { newPage: 3, pageSize: 20 });
      const currentPagination = service.getCurrentPagination();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 20 });
    });

    it('should return a query with the new pagination and use pagination size options that was passed to service options when it is not provided as argument to "processOnPaginationChanged"', () => {
      const expectation = `query{users(first:10, offset:20) { totalCount,nodes { id, field1, field2 }}}`;
      const querySpy = jest.spyOn(service, 'buildQuery');

      service.init(serviceOptions, paginationOptions, gridStub);
      // @ts-ignore
      const query = service.processOnPaginationChanged(null, { newPage: 3 });
      const currentPagination = service.getCurrentPagination();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 10 });
    });

    it('should return a query with the new pagination and use default pagination size when not provided as argument', () => {
      const expectation = `query{users(first:${DEFAULT_PAGE_SIZE}, offset:${DEFAULT_PAGE_SIZE * 2}) { totalCount,nodes { id, field1, field2 }}}`;
      const querySpy = jest.spyOn(service, 'buildQuery');

      service.init(serviceOptions, undefined, gridStub);
      // @ts-ignore
      const query = service.processOnPaginationChanged(null, { newPage: 3 });
      const currentPagination = service.getCurrentPagination();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 20 });
    });
  });

  describe('processOnSortChanged method', () => {
    it('should return a query with the new sorting when using single sort', () => {
      const expectation = `query{ users(first:10, offset:0, orderBy:[{field:gender, direction: DESC}]) { totalCount,nodes{ id,field1,field2 } }}`;
      const querySpy = jest.spyOn(service, 'buildQuery');
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockSortChangedArgs = { columnId: 'gender', sortCol: mockColumn, sortAsc: false, multiColumnSort: false } as ColumnSort;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnSortChanged(null, mockSortChangedArgs);

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
    });

    it('should return a query with the multiple new sorting when using multiColumnSort', () => {
      const expectation = `query{ users(first:10, offset:0,
                            orderBy:[{field:gender, direction: DESC}, {field:firstName, direction: ASC}]) {
                            totalCount,nodes{ id,field1,field2 } }}`;
      const querySpy = jest.spyOn(service, 'buildQuery');
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnName = { id: 'firstName', field: 'firstName' } as Column;
      const mockColumnSort = { columnId: 'gender', sortCol: mockColumn, sortAsc: false } as ColumnSort;
      const mockColumnSortName = { columnId: 'firstName', sortCol: mockColumnName, sortAsc: true } as ColumnSort;
      const mockSortChangedArgs = { sortCols: [mockColumnSort, mockColumnSortName], multiColumnSort: true, grid: gridStub } as MultiColumnSort;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnSortChanged(null, mockSortChangedArgs);

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(querySpy).toHaveBeenCalled();
    });
  });

  describe('updateFilters method', () => {
    beforeEach(() => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'name', field: 'name' }];
    });

    it('should throw an error when filter columnId is not found to be part of the column definitions', () => {
      const mockCurrentFilter = { columnDef: { id: 'city', field: 'city' }, columnId: 'city', operator: 'EQ', searchTerms: ['Boston'] } as CurrentFilter;
      service.init(serviceOptions, paginationOptions, gridStub);
      expect(() => service.updateFilters([mockCurrentFilter], true)).toThrowError('[GraphQL Service]: Something went wrong in trying to get the column definition');
    });

    it('should throw an error when neither "field" nor "name" are being part of the column definition', () => {
      // @ts-ignore
      const mockColumnFilters = { gender: { columnId: 'gender', columnDef: { id: 'gender' }, searchTerms: ['female'], operator: 'EQ' }, } as ColumnFilters;
      service.init(serviceOptions, paginationOptions, gridStub);
      expect(() => service.updateFilters(mockColumnFilters, false)).toThrowError('GraphQL filter could not find the field name to query the search');
    });

    it('should return a query with the new filter when filters are passed as a filter trigger by a filter event and is of type ColumnFilters', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:"female"}])
        { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query without filtering when the filter "searchTerms" property is missing from the search', () => {
      const expectation = `query{users(first:10, offset:0) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with multiple filters when the filters object has multiple search and they are passed as a filter trigger by a filter event and is of type ColumnFilters', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:"female"}, {field:company, operator:Not_Contains, value:"abc"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['female'], operator: 'EQ' },
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: OperatorType.notContains },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with multiple filters and expect same query string result as previous test even with "isUpdatedByPreset" enabled', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:"female"}, {field:company, operator:Contains, value:"abc"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['female'], operator: 'EQ' },
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, true);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with the new filter when filters are passed as a Grid Preset of type CurrentFilter', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:"female"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockCurrentFilter = { columnDef: mockColumn, columnId: 'gender', operator: 'EQ', searchTerms: ['female'] } as CurrentFilter;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters([mockCurrentFilter], true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual([{ columnId: 'gender', operator: 'EQ', searchTerms: ['female'] }]);
    });

    it('should return a query with search having the operator StartsWith when search value has the * symbol as the last character', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:StartsWith, value:"fem"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['fem*'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having the operator EndsWith when search value has the * symbol as the first character', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EndsWith, value:"le"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['*le'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having the operator EndsWith when the operator was provided as *z', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EndsWith, value:"le"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le*'], operator: '*z' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having the operator StartsWith even when search value last char is * symbol but the operator provided is *z', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:StartsWith, value:"le"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le*'], operator: 'a*' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having the operator EndsWith when the Column Filter was provided as *z', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EndsWith, value:"le"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender', filter: { operator: '*z' } } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having the operator StartsWith when the operator was provided as a*', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:StartsWith, value:"le"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le'], operator: 'a*' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having a range of exclusive numbers when the search value contains 2 (..) to represent a range of numbers', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:duration, operator:GT, value:"2"}, {field:duration, operator:LT, value:"33"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'duration', field: 'duration' } as Column;
      const mockColumnFilters = {
        duration: { columnId: 'duration', columnDef: mockColumn, searchTerms: ['2..33'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having a range of inclusive numbers when 2 searchTerms numbers are provided and the operator is "RangeInclusive"', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:duration, operator:GE, value:2}, {field:duration, operator:LE, value:33}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'duration', field: 'duration' } as Column;
      const mockColumnFilters = {
        duration: { columnId: 'duration', columnDef: mockColumn, searchTerms: [2, 33], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having a range of exclusive dates when the search value contains 2 (..) to represent a range of dates', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:startDate, operator:GT, value:"2001-01-01"}, {field:startDate, operator:LT, value:"2001-01-31"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'startDate', field: 'startDate' } as Column;
      const mockColumnFilters = {
        startDate: { columnId: 'startDate', columnDef: mockColumn, searchTerms: ['2001-01-01..2001-01-31'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with search having a range of inclusive dates when 2 searchTerms dates are provided and the operator is "RangeInclusive"', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:startDate, operator:GE, value:"2001-01-01"}, {field:startDate, operator:LE, value:"2001-01-31"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'startDate', field: 'startDate' } as Column;
      const mockColumnFilters = {
        startDate: { columnId: 'startDate', columnDef: mockColumn, searchTerms: ['2001-01-01', '2001-01-31'], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with a CSV string when the filter operator is IN ', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:IN, value:"female,male"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female', 'male'], operator: 'IN' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with a CSV string when the filter operator is NOT_IN', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:NOT_IN, value:"female,male"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female', 'male'], operator: OperatorType.notIn },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with a CSV string and use the operator from the Column Definition Operator when provided', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:NOT_IN, value:"female,male"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender', filter: { operator: OperatorType.notIn } } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female', 'male'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with mapped operator when no operator was provided but we have a column "type" property', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:Contains, value:"le"}, {field:age, operator:EQ, value:"28"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumnGender = { id: 'gender', field: 'gender', type: FieldType.string } as Column;
      const mockColumnAge = { id: 'age', field: 'age', type: FieldType.number } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['le'] },
        age: { columnId: 'age', columnDef: mockColumnAge, searchTerms: [28] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with mapped operator when neither operator nor column "type" property exists', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:Contains, value:"le"}, {field:city, operator:Contains, value:"Bali"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCity = { id: 'city', field: 'city' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['le'] },
        city: { columnId: 'city', columnDef: mockColumnCity, searchTerms: ['Bali'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query with the new filter search value of empty string when searchTerms has an undefined value', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:""}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: [undefined], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query using a different field to query when the column has a "queryField" defined in its definition', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:isMale, operator:EQ, value:"true"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender', queryField: 'isMale' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: [true], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query using a different field to query when the column has a "queryFieldFilter" defined in its definition', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:hasPriority, operator:EQ, value:"female"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', field: 'gender', queryField: 'isAfter', queryFieldFilter: 'hasPriority' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query using the column "name" property when "field" is not defined in its definition', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:gender, operator:EQ, value:"female"}]) { totalCount,nodes{ id,company,gender,name } }}`;
      const mockColumn = { id: 'gender', name: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
    });

    it('should return a query without any sorting after clearFilters was called', () => {
      const expectation = `query{ users(first:10,offset:0) { totalCount, nodes {id, company, gender,name} }}`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      service.clearFilters();
      const currentFilters = service.getCurrentFilters();
      const query = service.buildQuery();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual([]);
    });
  });

  describe('presets', () => {
    beforeEach(() => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'duration', field: 'duration' }, { id: 'startDate', field: 'startDate' }];
    });

    it('should return a query with search having a range of exclusive numbers when the search value contains 2 (..) to represent a range of numbers', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:duration, operator:GT, value:"2"}, {field:duration, operator:LT, value:"33"}]) {
        totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: ['2..33'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with a filter with range of numbers with decimals when the preset is a filter range with 3 dots (..) separator', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:duration, operator:GT, value:"0.5"}, {field:duration, operator:LT, value:".88"}]) { totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: ['0.5...88'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with search having a range of inclusive numbers when 2 searchTerms numbers are provided and the operator is "RangeInclusive"', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:duration, operator:GE, value:2}, {field:duration, operator:LE, value:33}]) { totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: [2, 33], operator: 'RangeInclusive' },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with search having a range of exclusive numbers when 2 searchTerms numbers are provided without any operator', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:duration, operator:GT, value:2}, {field:duration, operator:LT, value:33}]) { totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: [2, 33] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with search having a range of exclusive dates when the search value contains 2 (..) to represent a range of dates', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:startDate, operator:GT, value:"2001-01-01"}, {field:startDate, operator:LT, value:"2001-01-31"}]) { totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'startDate', searchTerms: ['2001-01-01..2001-01-31'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with search having a range of inclusive dates when 2 searchTerms dates are provided and the operator is "RangeInclusive"', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:startDate, operator:GE, value:"2001-01-01"}, {field:startDate, operator:LE, value:"2001-01-31"}]) { totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'startDate', searchTerms: ['2001-01-01', '2001-01-31'], operator: 'RangeInclusive' },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with search having a range of exclusive dates when 2 searchTerms dates are provided without any operator', () => {
      const expectation = `query{users(first:10, offset:0, filterBy:[{field:startDate, operator:GT, value:"2001-01-01"}, {field:startDate, operator:LT, value:"2001-01-31"}]) { totalCount,nodes{ id,company,gender,duration,startDate } }}`;
      const presetFilters = [
        { columnId: 'startDate', searchTerms: ['2001-01-01', '2001-01-31'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentFilters).toEqual(presetFilters);
    });
  });

  describe('updateSorters method', () => {
    beforeEach(() => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'name', field: 'name' }];
    });

    it('should return a query with the multiple new sorting when using multiColumnSort', () => {
      const expectation = `query{ users(first:10, offset:0,
                            orderBy:[{field:gender, direction: DESC}, {field:firstName, direction: ASC}]) {
                            totalCount,nodes{ id, company, gender, name } }}`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'firstName', sortCol: { id: 'firstName', field: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentSorters).toEqual([{ columnId: 'gender', direction: 'DESC' }, { columnId: 'firstName', direction: 'ASC' }]);
    });

    it('should return a query when using presets array', () => {
      const expectation = `query{ users(first:10, offset:0,
                            orderBy:[{field:company, direction: DESC}, {field:firstName, direction: ASC}]) {
                              totalCount, nodes{ id, company, gender, name } }}`;
      const presets = [
        { columnId: 'company', direction: 'DESC' },
        { columnId: 'firstName', direction: 'ASC' },
      ] as CurrentSorter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(undefined, presets);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentSorters).toEqual(presets);
    });

    it('should return a query string using a different field to query when the column has a "queryField" defined in its definition', () => {
      const expectation = `query{ users(first:10, offset:0,
                            orderBy:[{field:gender, direction: DESC}, {field:firstName, direction: ASC}]) {
                            totalCount,nodes{ id, company, gender, name } }}`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'name', sortCol: { id: 'name', field: 'name', queryField: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentSorters).toEqual([{ columnId: 'gender', direction: 'DESC' }, { columnId: 'name', direction: 'ASC' }]);
    });

    it('should return a query string using a different field to query when the column has a "queryFieldSorter" defined in its definition', () => {
      const expectation = `query{ users(first:10, offset:0,
                            orderBy:[{field:gender, direction: DESC}, {field:lastName, direction: ASC}]) {
                            totalCount,nodes{ id, company, gender, name } }}`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'name', sortCol: { id: 'name', field: 'name', queryField: 'isAfter', queryFieldSorter: 'lastName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentSorters).toEqual([{ columnId: 'gender', direction: 'DESC' }, { columnId: 'name', direction: 'ASC' }]);
    });

    it('should return a query without the field sorter when its field property is missing', () => {
      const expectation = `query { users(first:10, offset:0, orderBy:[{field:gender, direction:DESC}]) {
                          totalCount, nodes { id,company,gender,name }}}`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'firstName', sortCol: { id: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentSorters).toEqual([{ columnId: 'gender', direction: 'DESC' }, { columnId: 'firstName', direction: 'ASC' }]);
    });

    it('should return a query without any sorting after clearSorters was called', () => {
      const expectation = `query { users(first:10, offset:0) {
        totalCount, nodes { id,company,gender,name }}}`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'firstName', sortCol: { id: 'firstName', field: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      service.clearSorters();
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(removeSpaces(query)).toBe(removeSpaces(expectation));
      expect(currentSorters).toEqual([]);
    });
  });
});
