import { CaseType } from './../../models/caseType';
import { GridOdataService } from '../grid-odata.service';
import {
  Column,
  ColumnFilter,
  ColumnSort,
  CurrentFilter,
  FilterChangedArgs,
  GridOption,
  MultiColumnSort,
  Pagination,
  ColumnFilters,
  OperatorType,
  FieldType,
  CurrentSorter,
  OdataOption,
} from '../../models';

const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;

const gridOptionMock = {
  defaultFilterRangeOperator: 'RangeExclusive',
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

describe('GridOdataService', () => {
  let mockColumns: Column[];
  let service: GridOdataService;
  let paginationOptions: Pagination;
  let serviceOptions: OdataOption;

  beforeEach(() => {
    mockColumns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];
    service = new GridOdataService();
    serviceOptions = {
      columnDefinitions: mockColumns,
      orderBy: '',
      top: 10,
      caseType: CaseType.pascalCase
    };
    paginationOptions = {
      pageNumber: 1,
      pageSizes: [5, 10, 25, 50, 100],
      pageSize: 10,
      totalItems: 100
    };
    gridOptionMock.enablePagination = true;
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

      service.init({ columnDefinitions: undefined }, paginationOptions, gridStub);

      expect(spy).toHaveBeenCalled();
      expect(service.columnDefinitions).toEqual(columns);
    });
  });

  describe('buildQuery method', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return a simple query with default $top paginations', () => {
      const expectation = `$top=10`;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should use default pagination "$top" option when "paginationOptions" is not provided', () => {
      const expectation = `$top=${DEFAULT_ITEMS_PER_PAGE}`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100, excludeFromQuery: true }];

      service.init({ columnDefinitions: columns }, undefined, gridStub);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a simple query with pagination $top and $skip when using "updatePagination" method', () => {
      const expectation = `$top=20&$skip=40`;
      const columns = [];

      service.init({ columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "orderBy" through the "init" and see the query string include the sorting', () => {
      const expectation = `$top=20&$skip=40&$orderby=Name desc`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ columnDefinitions: columns, orderBy: 'Name desc' }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "orderBy" through the "updateOptions" and see the query string include the sorting', () => {
      const expectation = `$top=20&$skip=40&$orderby=Name desc`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      service.updateOptions({ orderBy: 'Name desc' });
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "filter" through the "init" and see the query string include the filter', () => {
      const expectation = `$top=20&$skip=40&$filter=(IsActive eq true)`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ columnDefinitions: columns, filterBy: `IsActive eq true` }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "filter" through the "updateOptions" and see the query string include the filter', () => {
      const expectation = `$top=20&$skip=40&$filter=(IsActive eq true)`;
      const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

      service.init({ columnDefinitions: columns }, paginationOptions, gridStub);
      service.updatePagination(3, 20);
      service.updateOptions({ filterBy: `IsActive eq true` });
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should not add a "$top" option when "enablePagination" is set to False', () => {
        const expectation = '';
        const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100, excludeFromQuery: true }];

        service.init({ columnDefinitions: columns }, undefined, gridStub);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });

      it('should not do anything when calling "updatePagination" method with "enablePagination" set to False', () => {
        const expectation = '';
        const columns = [];

        service.init({ columnDefinitions: columns }, paginationOptions, gridStub);
        service.updatePagination(3, 20);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });

      it('should be able to provide "filter" through the "init" and see the query string include the filter but without pagination querying when "enablePagination" is set to False', () => {
        const expectation = `$filter=(IsActive eq true)`;
        const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

        service.init({ columnDefinitions: columns, filterBy: `IsActive eq true` }, paginationOptions, gridStub);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });

      it('should be able to provide "filter" through the "updateOptions" and see the query string include the filter but without pagination querying when "enablePagination" is set to False', () => {
        const expectation = `$filter=(IsActive eq true)`;
        const columns = [{ id: 'field1', field: 'field1', width: 100 }, { id: 'field2', field: 'field2', width: 100 }];

        service.init({ columnDefinitions: columns }, paginationOptions, gridStub);
        service.updatePagination(3, 20);
        service.updateOptions({ filterBy: `IsActive eq true` });
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });
    });
  });

  describe('clearFilters method', () => {
    it('should call "updateOptions" to clear all filters', () => {
      const spy = jest.spyOn(service, 'updateFilters');
      service.clearFilters();
      expect(spy).toHaveBeenCalledWith([]);
    });
  });

  describe('clearSorters method', () => {
    it('should call "updateOptions" to clear all sorting', () => {
      const spy = jest.spyOn(service, 'updateSorters');
      service.clearSorters();
      expect(spy).toHaveBeenCalledWith([]);
    });
  });

  describe('resetPaginationOptions method', () => {
    beforeEach(() => {
      paginationOptions.pageSize = 20;
    });

    it('should reset the pagination options with default pagination', () => {
      const spy = jest.spyOn(service.odataService, 'updateOptions');

      service.init({ columnDefinitions: [] }, paginationOptions);
      service.resetPaginationOptions();

      expect(spy).toHaveBeenCalledWith({ skip: 0 });
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
        .toThrowError('Something went wrong when trying create the GridOdataService');
    });

    it('should return a query with the new filter', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female')`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');
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

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalled();
      expect(currentFilters).toEqual([{ columnId: 'gender', operator: 'EQ', searchTerms: ['female'] }]);
    });

    it('should return a query with a new filter when previous filters exists', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female' and FirstName eq 'John')`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');
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

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
      expect(resetSpy).toHaveBeenCalled();
      expect(currentFilters).toEqual([
        { columnId: 'gender', operator: 'EQ', searchTerms: ['female'] },
        { columnId: 'firstName', operator: 'StartsWith', searchTerms: ['John'] }
      ]);
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should return a query with the new filter but without pagination when "enablePagination" is set to False', () => {
        const expectation = `$filter=(Gender eq 'female')`;
        const querySpy = jest.spyOn(service.odataService, 'buildQuery');
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

        expect(query).toBe(expectation);
        expect(querySpy).toHaveBeenCalled();
        expect(resetSpy).toHaveBeenCalled();
        expect(currentFilters).toEqual([{ columnId: 'gender', operator: 'EQ', searchTerms: ['female'] }]);
      });

      it('should return a query with a new filter when previous filters exists when "enablePagination" is set to False', () => {
        const expectation = `$filter=(Gender eq 'female' and FirstName eq 'John')`;
        const querySpy = jest.spyOn(service.odataService, 'buildQuery');
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

        expect(query).toBe(expectation);
        expect(querySpy).toHaveBeenCalled();
        expect(resetSpy).toHaveBeenCalled();
        expect(currentFilters).toEqual([
          { columnId: 'gender', operator: 'EQ', searchTerms: ['female'] },
          { columnId: 'firstName', operator: 'StartsWith', searchTerms: ['John'] }
        ]);
      });
    });
  });

  describe('processOnPaginationChanged method', () => {
    it('should return a query with the new pagination', () => {
      const expectation = `$top=20&$skip=40`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnPaginationChanged(null, { newPage: 3, pageSize: 20 });
      const currentPagination = service.getCurrentPagination();

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 20 });
    });

    it('should return a query with the new pagination and use pagination size options that was passed to service options when it is not provided as argument to "processOnPaginationChanged"', () => {
      const expectation = `$top=10&$skip=20`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');

      service.init(serviceOptions, paginationOptions, gridStub);
      // @ts-ignore
      const query = service.processOnPaginationChanged(null, { newPage: 3 });
      const currentPagination = service.getCurrentPagination();

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 10 });
    });

    it('should return a query with the new pagination and use default pagination size when not provided as argument', () => {
      const expectation = `$top=20&$skip=${DEFAULT_PAGE_SIZE * 2}`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');

      service.init(serviceOptions, undefined, gridStub);
      // @ts-ignore
      const query = service.processOnPaginationChanged(null, { newPage: 3 });
      const currentPagination = service.getCurrentPagination();

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 20 });
    });

    it('should return a query without pagination when "enablePagination" is set to False', () => {
      gridOptionMock.enablePagination = false;
      const expectation = '';
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnPaginationChanged(null, { newPage: 3, pageSize: 20 });
      const currentPagination = service.getCurrentPagination();

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
      expect(currentPagination).toEqual({ pageNumber: 3, pageSize: 20 });
    });
  });

  describe('processOnSortChanged method', () => {
    it('should return a query with the new sorting when using single sort', () => {
      const expectation = `$top=10&$orderby=Gender desc`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockSortChangedArgs = { columnId: 'gender', sortCol: mockColumn, sortAsc: false, multiColumnSort: false } as ColumnSort;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnSortChanged(null, mockSortChangedArgs);

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
    });

    it('should return a query with the multiple new sorting when using multiColumnSort', () => {
      const expectation = `$top=10&$orderby=Gender desc,FirstName asc`;
      const querySpy = jest.spyOn(service.odataService, 'buildQuery');
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnName = { id: 'firstName', field: 'firstName' } as Column;
      const mockColumnSort = { columnId: 'gender', sortCol: mockColumn, sortAsc: false } as ColumnSort;
      const mockColumnSortName = { columnId: 'firstName', sortCol: mockColumnName, sortAsc: true } as ColumnSort;
      const mockSortChangedArgs = { sortCols: [mockColumnSort, mockColumnSortName], multiColumnSort: true, grid: gridStub } as MultiColumnSort;

      service.init(serviceOptions, paginationOptions, gridStub);
      const query = service.processOnSortChanged(null, mockSortChangedArgs);

      expect(query).toBe(expectation);
      expect(querySpy).toHaveBeenCalled();
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should return a query with the new sorting when using single sort and without pagintion when "enablePagination" is set to False', () => {
        const expectation = `$orderby=Gender desc`;
        const querySpy = jest.spyOn(service.odataService, 'buildQuery');
        const mockColumn = { id: 'gender', field: 'gender' } as Column;
        const mockSortChangedArgs = { columnId: 'gender', sortCol: mockColumn, sortAsc: false, multiColumnSort: false } as ColumnSort;

        service.init(serviceOptions, paginationOptions, gridStub);
        const query = service.processOnSortChanged(null, mockSortChangedArgs);

        expect(query).toBe(expectation);
        expect(querySpy).toHaveBeenCalled();
      });

      it('should return a query with the multiple new sorting when using multiColumnSort and without pagintion when "enablePagination" is set to False', () => {
        const expectation = `$orderby=Gender desc,FirstName asc`;
        const querySpy = jest.spyOn(service.odataService, 'buildQuery');
        const mockColumn = { id: 'gender', field: 'gender' } as Column;
        const mockColumnName = { id: 'firstName', field: 'firstName' } as Column;
        const mockColumnSort = { columnId: 'gender', sortCol: mockColumn, sortAsc: false } as ColumnSort;
        const mockColumnSortName = { columnId: 'firstName', sortCol: mockColumnName, sortAsc: true } as ColumnSort;
        const mockSortChangedArgs = { sortCols: [mockColumnSort, mockColumnSortName], multiColumnSort: true, grid: gridStub } as MultiColumnSort;

        service.init(serviceOptions, paginationOptions, gridStub);
        const query = service.processOnSortChanged(null, mockSortChangedArgs);

        expect(query).toBe(expectation);
        expect(querySpy).toHaveBeenCalled();
      });
    });
  });

  describe('updateFilters method', () => {
    beforeEach(() => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'name', field: 'name' }];
    });

    it('should throw an error when filter columnId is not found to be part of the column definitions', () => {
      const mockCurrentFilter = { columnDef: { id: 'city', field: 'city' }, columnId: 'city', operator: 'EQ', searchTerms: ['Boston'] } as CurrentFilter;
      service.init(serviceOptions, paginationOptions, gridStub);
      expect(() => service.updateFilters([mockCurrentFilter], true)).toThrowError('[GridOData Service]: Something went wrong in trying to get the column definition');
    });

    it('should throw an error when neither "field" nor "name" are being part of the column definition', () => {
      // @ts-ignore
      const mockColumnFilters = { gender: { columnId: 'gender', columnDef: { id: 'gender' }, searchTerms: ['female'], operator: 'EQ' }, } as ColumnFilters;
      service.init(serviceOptions, paginationOptions, gridStub);
      expect(() => service.updateFilters(mockColumnFilters, false)).toThrowError('GridOData filter could not find the field name to query the search');
    });

    it('should return a query with the new filter when filters are passed as a filter trigger by a filter event and is of type ColumnFilters', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female')`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without filtering when the filter "searchTerms" property is missing from the search', () => {
      const expectation = `$top=10`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with multiple filters when the filters object has multiple search and they are passed as a filter trigger by a filter event and is of type ColumnFilters', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female' and not substringof('abc', Company))`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['female'], operator: 'EQ' },
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: OperatorType.notContains },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should escape single quote by doubling the quote when filter includes a single quote', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female' and not substringof('abc''s', Company))`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['female'], operator: 'EQ' },
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: [`abc's`], operator: OperatorType.notContains },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with multiple filters and expect same query string result as previous test even with "isUpdatedByPreset" enabled', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female' and substringof('abc', Company))`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['female'], operator: 'EQ' },
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, true);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with the new filter when filters are passed as a Grid Preset of type CurrentFilter', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female')`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockCurrentFilter = { columnDef: mockColumn, columnId: 'gender', operator: 'EQ', searchTerms: ['female'] } as CurrentFilter;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters([mockCurrentFilter], true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual([{ columnId: 'gender', operator: 'EQ', searchTerms: ['female'] }]);
    });

    it('should return a query with search having the operator StartsWith when search value has the * symbol as the last character', () => {
      const expectation = `$top=10&$filter=(startswith(Gender, 'fem'))`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['fem*'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with search having the operator EndsWith when search value has the * symbol as the first character', () => {
      const expectation = `$top=10&$filter=(endswith(Gender, 'le'))`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['*le'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with search having the operator EndsWith when the operator was provided as *z', () => {
      const expectation = `$top=10&$filter=(endswith(Gender, 'le'))`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le*'], operator: '*z' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with search having the operator StartsWith even when search value last char is * symbol but the operator provided is *z', () => {
      const expectation = `$top=10&$filter=(startswith(Gender, 'le'))`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le*'], operator: 'a*' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with search having the operator EndsWith when the Column Filter was provided as *z', () => {
      const expectation = `$top=10&$filter=(endswith(Gender, 'le'))`;
      const mockColumn = { id: 'gender', field: 'gender', filter: { operator: '*z' } } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with search having the operator StartsWith when the operator was provided as a*', () => {
      const expectation = `$top=10&$filter=(startswith(Gender, 'le'))`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['le'], operator: 'a*' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with a CSV string when the filter operator is IN ', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female' or Gender eq 'male')`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female', 'male'], operator: 'IN' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with a CSV string when the filter operator is IN for numeric column type', () => {
      const expectation = `$top=10&$filter=(Id eq 100 or Id eq 101)`;
      const mockColumn = { id: 'id', field: 'id', type: FieldType.number } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'id', columnDef: mockColumn, searchTerms: [100, 101], operator: 'IN' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with a CSV string when the filter operator is NOT_IN', () => {
      const expectation = `$top=10&$filter=(Gender ne 'female' and Gender ne 'male')`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female', 'male'], operator: OperatorType.notIn },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with a CSV string and use the operator from the Column Definition Operator when provided', () => {
      const expectation = `$top=10&$filter=(Gender ne 'female' and Gender ne 'male')`;
      const mockColumn = { id: 'gender', field: 'gender', filter: { operator: OperatorType.notIn } } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female', 'male'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with mapped operator when no operator was provided but we have a column "type" property', () => {
      const expectation = `$top=10&$filter=(substringof('le', Gender) and Age eq 28)`;
      const mockColumnGender = { id: 'gender', field: 'gender', type: FieldType.string } as Column;
      const mockColumnAge = { id: 'age', field: 'age', type: FieldType.number } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['le'] },
        age: { columnId: 'age', columnDef: mockColumnAge, searchTerms: [28] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with mapped operator when neither operator nor column "type" property exists', () => {
      const expectation = `$top=10&$filter=(substringof('le', Gender) and substringof('Bali', City))`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCity = { id: 'city', field: 'city' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['le'] },
        city: { columnId: 'city', columnDef: mockColumnCity, searchTerms: ['Bali'] },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without any filters when the "searchTerms" has an undefined value', () => {
      const expectation = `$top=10`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: [undefined], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without any filters when the "searchTerms" has an empty string', () => {
      const expectation = `$top=10`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: [''], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query using a different field to query when the column has a "queryField" defined in its definition', () => {
      const expectation = `$top=10&$filter=(IsMale eq true)`;
      const mockColumn = { id: 'gender', field: 'gender', type: FieldType.boolean, queryField: 'isMale' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: [true], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query using a different field to query when the column has a "queryFieldFilter" defined in its definition', () => {
      const expectation = `$top=10&$filter=(HasPriority eq 'female')`;
      const mockColumn = { id: 'gender', field: 'gender', queryField: 'isAfter', queryFieldFilter: 'hasPriority' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query using the column "name" property when "field" is not defined in its definition', () => {
      const expectation = `$top=10&$filter=(Gender eq 'female')`;
      const mockColumn = { id: 'gender', name: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without filters when we set the "bypassBackendQuery" flag', () => {
      const expectation = `$top=10&$filter=(substringof('abc', Company))`;
      const mockColumnGender = { id: 'gender', field: 'gender' } as Column;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumnGender, searchTerms: ['female'], operator: 'EQ', bypassBackendQuery: true },
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with a date showing as DateTime as per OData requirement', () => {
      const expectation = `$top=10&$filter=(substringof('abc', Company) and UpdatedDate eq DateTime'2001-02-28T00:00:00Z')`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-02-28'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without any sorting after clearFilters was called', () => {
      const expectation = `$top=10`;
      const mockColumn = { id: 'gender', field: 'gender' } as Column;
      const mockColumnFilters = {
        gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      service.clearFilters();
      const currentFilters = service.getCurrentFilters();
      const query = service.buildQuery();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual([]);
    });

    it('should return a query to filter a search value between an inclusive range of numbers using the 2 dots (..) separator and the "RangeInclusive" operator', () => {
      const expectation = `$top=10&$filter=(substringof('abc', Company) and (Duration ge 5 and Duration le 22))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: ['5..22'], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an exclusive range of numbers using 2 search terms and the "RangeExclusive" operator', () => {
      const expectation = `$top=10&$filter=(substringof('abc', Company) and (Duration gt 5 and Duration lt 22))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: [5, 22], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an inclusive range of dates using the 2 dots (..) separator and the "RangeInclusive" operator', () => {
      const expectation = `$top=10&$filter=(substringof('abc', Company) and (UpdatedDate ge DateTime'2001-01-20T00:00:00Z' and UpdatedDate le DateTime'2001-02-28T00:00:00Z'))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-01-20..2001-02-28'], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an exclusive range of dates using 2 search terms and the "RangeExclusive" operator', () => {
      const expectation = `$top=10&$filter=(substringof('abc', Company) and (UpdatedDate gt DateTime'2001-01-20T00:00:00Z' and UpdatedDate lt DateTime'2001-02-28T00:00:00Z'))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-01-20', '2001-02-28'], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should return a query with the new filter when filters are passed as a filter trigger by a filter event and is of type ColumnFilters but without pagintion when "enablePagination" is set to False', () => {
        const expectation = `$filter=(Gender eq 'female')`;
        const mockColumn = { id: 'gender', field: 'gender' } as Column;
        const mockColumnFilters = {
          gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
        } as ColumnFilters;

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateFilters(mockColumnFilters, false);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });

      it('should return a query without any sorting neither pagination after clearFilters was called when "enablePagination" is set to False', () => {
        const expectation = '';
        const mockColumn = { id: 'gender', field: 'gender' } as Column;
        const mockColumnFilters = {
          gender: { columnId: 'gender', columnDef: mockColumn, searchTerms: ['female'], operator: 'EQ' },
        } as ColumnFilters;

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateFilters(mockColumnFilters, false);
        service.clearFilters();
        const currentFilters = service.getCurrentFilters();
        const query = service.buildQuery();

        expect(query).toBe(expectation);
        expect(currentFilters).toEqual([]);
      });

      it('should return a query to filter a search value between an inclusive range of numbers using the 2 dots (..) separator and the "RangeInclusive" operator without pagination hen "enablePagination" is set to False', () => {
        const expectation = `$filter=(substringof('abc', Company) and (Duration ge 5 and Duration le 22))`;
        const mockColumnCompany = { id: 'company', field: 'company' } as Column;
        const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
        const mockColumnFilters = {
          company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
          duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: ['5..22'], operator: 'RangeInclusive' },
        } as ColumnFilters;

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateFilters(mockColumnFilters, false);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });
    });
  });

  describe('updateFilters method with OData version 4', () => {
    beforeEach(() => {
      serviceOptions.version = 4;
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'name', field: 'name' }];
    });

    it('should return a query with a date showing as Date as per OData 4 requirement', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and UpdatedDate eq 2001-02-28T00:00:00Z)`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-02-28'], operator: 'EQ' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an inclusive range of numbers using the 2 dots (..) separator and the "RangeInclusive" operator', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and (Duration ge 5 and Duration le 22))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: ['5..22'], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an exclusive range of numbers using 2 search terms and the "RangeExclusive" operator', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and (Duration gt 5 and Duration lt 22))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: [5, 22], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an exclusive range of numbers using 2 search terms and the "RangeExclusive" operator and type is default (string)', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and (Duration gt 5 and Duration lt 22))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnDuration = { id: 'duration', field: 'duration' } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: [5, 22], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an inclusive range of dates using the 2 dots (..) separator and the "RangeInclusive" operator', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and (UpdatedDate ge 2001-01-20T00:00:00Z and UpdatedDate le 2001-02-28T00:00:00Z))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-01-20..2001-02-28'], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query to filter a search value between an exclusive range of dates using 2 search terms and the "RangeExclusive" operator', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and (UpdatedDate gt 2001-01-20T00:00:00Z and UpdatedDate lt 2001-02-28T00:00:00Z))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-01-20', '2001-02-28'], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with a date equal when only 1 searchTerms is provided and even if the operator is set to a range', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc') and UpdatedDate eq 2001-01-20T00:00:00Z)`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-01-20'], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without any date filtering when searchTerms is an empty array', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc'))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: [], operator: 'RangeExclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query without any number filtering when searchTerms is an empty array', () => {
      const expectation = `$top=10&$filter=(contains(Company, 'abc'))`;
      const mockColumnCompany = { id: 'company', field: 'company' } as Column;
      const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
      const mockColumnFilters = {
        company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
        duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: [], operator: 'RangeInclusive' },
      } as ColumnFilters;

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(mockColumnFilters, false);
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should return a query with a date showing as Date as per OData 4 requirement but without pagination when "enablePagination" is set to False', () => {
        const expectation = `$filter=(contains(Company, 'abc') and UpdatedDate eq 2001-02-28T00:00:00Z)`;
        const mockColumnCompany = { id: 'company', field: 'company' } as Column;
        const mockColumnUpdated = { id: 'updatedDate', field: 'updatedDate', type: FieldType.date } as Column;
        const mockColumnFilters = {
          company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
          updatedDate: { columnId: 'updatedDate', columnDef: mockColumnUpdated, searchTerms: ['2001-02-28'], operator: 'EQ' },
        } as ColumnFilters;

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateFilters(mockColumnFilters, false);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });

      it('should return a query to filter a search value between an inclusive range of numbers using the 2 dots (..) separator and the "RangeInclusive" operator but without pagination when "enablePagination" is set to False', () => {
        const expectation = `$filter=(contains(Company, 'abc') and (Duration ge 5 and Duration le 22))`;
        const mockColumnCompany = { id: 'company', field: 'company' } as Column;
        const mockColumnDuration = { id: 'duration', field: 'duration', type: FieldType.number } as Column;
        const mockColumnFilters = {
          company: { columnId: 'company', columnDef: mockColumnCompany, searchTerms: ['abc'], operator: 'Contains' },
          duration: { columnId: 'duration', columnDef: mockColumnDuration, searchTerms: ['5..22'], operator: 'RangeInclusive' },
        } as ColumnFilters;

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateFilters(mockColumnFilters, false);
        const query = service.buildQuery();

        expect(query).toBe(expectation);
      });
    });
  });

  describe('updateSorters method', () => {
    beforeEach(() => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'name', field: 'name' }];
    });

    it('should return a query with the multiple new sorting when using multiColumnSort', () => {
      const expectation = `$top=10&$orderby=Gender desc,FirstName asc`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'firstName', sortCol: { id: 'firstName', field: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual([{ columnId: 'Gender', direction: 'desc' }, { columnId: 'FirstName', direction: 'asc' }]);
    });

    it('should return a query string using a different field to query when the column has a "queryField" defined in its definition', () => {
      const expectation = `$top=10&$orderby=Gender desc,FirstName asc`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'name', sortCol: { id: 'name', field: 'name', queryField: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual([{ columnId: 'Gender', direction: 'desc' }, { columnId: 'Name', direction: 'asc' }]);
    });

    it('should return a query string using a different field to query when the column has a "queryFieldSorter" defined in its definition', () => {
      const expectation = `$top=10&$orderby=Gender desc,LastName asc`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'name', sortCol: { id: 'name', field: 'name', queryField: 'isAfter', queryFieldSorter: 'lastName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual([{ columnId: 'Gender', direction: 'desc' }, { columnId: 'Name', direction: 'asc' }]);
    });

    it('should return a query without the field sorter when its field property is missing', () => {
      const expectation = `$top=10&$orderby=Gender desc`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'firstName', sortCol: { id: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual([{ columnId: 'Gender', direction: 'desc' }, { columnId: 'FirstName', direction: 'asc' }]);
    });

    it('should return a query without any sorting after clearSorters was called', () => {
      const expectation = `$top=10`;
      const mockColumnSort = [
        { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
        { columnId: 'firstName', sortCol: { id: 'firstName', field: 'firstName' }, sortAsc: true }
      ] as ColumnSort[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(mockColumnSort);
      service.clearSorters();
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual([]);
    });

    it('should return a query with the multiple new sorting when "updateSorters" with currentSorter defined as preset on 2nd argument', () => {
      const expectation = `$top=10&$orderby=Gender asc,FirstName desc`;
      const mockCurrentSorter = [
        { columnId: 'gender', direction: 'asc' },
        { columnId: 'firstName', direction: 'DESC' }
      ] as CurrentSorter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(null, mockCurrentSorter);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual([{ columnId: 'gender', direction: 'asc' }, { columnId: 'firstName', direction: 'desc' }]);
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should return a query without the field sorter when its field property is missing but without pagination when "enablePagination" is set to False', () => {
        const expectation = `$orderby=Gender desc`;
        const mockColumnSort = [
          { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
          { columnId: 'firstName', sortCol: { id: 'firstName' }, sortAsc: true }
        ] as ColumnSort[];

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateSorters(mockColumnSort);
        const query = service.buildQuery();
        const currentSorters = service.getCurrentSorters();

        expect(query).toBe(expectation);
        expect(currentSorters).toEqual([{ columnId: 'Gender', direction: 'desc' }, { columnId: 'FirstName', direction: 'asc' }]);
      });

      it('should return a query without any sorting after clearSorters was called but without pagination when "enablePagination" is set to False', () => {
        const expectation = '';
        const mockColumnSort = [
          { columnId: 'gender', sortCol: { id: 'gender', field: 'gender' }, sortAsc: false },
          { columnId: 'firstName', sortCol: { id: 'firstName', field: 'firstName' }, sortAsc: true }
        ] as ColumnSort[];

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateSorters(mockColumnSort);
        service.clearSorters();
        const query = service.buildQuery();
        const currentSorters = service.getCurrentSorters();

        expect(query).toBe(expectation);
        expect(currentSorters).toEqual([]);
      });
    });
  });

  describe('presets', () => {
    it('should return a query when using presets sorters array', () => {
      const expectation = `$top=10&$orderby=Company desc,FirstName asc`;
      const presets = [
        { columnId: 'company', direction: 'DESC' },
        { columnId: 'firstName', direction: 'ASC' },
      ] as CurrentSorter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateSorters(undefined, presets);
      const query = service.buildQuery();
      const currentSorters = service.getCurrentSorters();

      expect(query).toBe(expectation);
      expect(currentSorters).toEqual(presets);
    });

    it('should return a query with a filter with range of numbers when the preset is a filter range with 2 dots (..) separator', () => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'duration', field: 'duration', type: FieldType.number }];
      const expectation = `$top=10&$filter=(Duration gt 4 and Duration lt 88)`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: ['4..88'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with a filter with range of numbers with decimals when the preset is a filter range with 3 dots (...) separator', () => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'duration', field: 'duration', type: FieldType.number }];
      const expectation = `$top=10&$filter=(Duration gt 0.5 and Duration lt .88)`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: ['0.5...88'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with a filter with range of numbers when the preset is a filter range with 2 searchTerms', () => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'duration', field: 'duration', type: FieldType.number }];
      const expectation = `$top=10&$filter=(Duration ge 4 and Duration le 88)`;
      const presetFilters = [
        { columnId: 'duration', searchTerms: [4, 88], operator: 'RangeInclusive' },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with a filter with range of dates when the preset is a filter range with 2 dots (..) separator', () => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'finish', field: 'finish', type: FieldType.date }];
      const expectation = `$top=10&$filter=(Finish gt DateTime'2001-01-01T00:00:00Z' and Finish lt DateTime'2001-01-31T00:00:00Z')`;
      const presetFilters = [
        { columnId: 'finish', searchTerms: ['2001-01-01..2001-01-31'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with a filter with range of dates when the preset is a filter range with 2 searchTerms', () => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'finish', field: 'finish', type: FieldType.date }];
      const expectation = `$top=10&$filter=(Finish ge DateTime'2001-01-01T00:00:00Z' and Finish le DateTime'2001-01-31T00:00:00Z')`;
      const presetFilters = [
        { columnId: 'finish', searchTerms: ['2001-01-01', '2001-01-31'], operator: 'RangeInclusive' },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual(presetFilters);
    });

    it('should return a query with a filter with range of dates inclusive when the preset is a filter range with 2 searchTerms without an operator', () => {
      serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'finish', field: 'finish', type: FieldType.date }];
      const expectation = `$top=10&$filter=(Finish gt DateTime'2001-01-01T00:00:00Z' and Finish lt DateTime'2001-01-31T00:00:00Z')`;
      const presetFilters = [
        { columnId: 'finish', searchTerms: ['2001-01-01', '2001-01-31'] },
      ] as CurrentFilter[];

      service.init(serviceOptions, paginationOptions, gridStub);
      service.updateFilters(presetFilters, true);
      const query = service.buildQuery();
      const currentFilters = service.getCurrentFilters();

      expect(query).toBe(expectation);
      expect(currentFilters).toEqual(presetFilters);
    });

    describe('set "enablePagination" to False', () => {
      beforeEach(() => {
        gridOptionMock.enablePagination = false;
      });

      it('should return a query when using presets sorters array but without pagination when "enablePagination" is set to False', () => {
        const expectation = `$orderby=Company desc,FirstName asc`;
        const presets = [
          { columnId: 'company', direction: 'DESC' },
          { columnId: 'firstName', direction: 'ASC' },
        ] as CurrentSorter[];

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateSorters(undefined, presets);
        const query = service.buildQuery();
        const currentSorters = service.getCurrentSorters();

        expect(query).toBe(expectation);
        expect(currentSorters).toEqual(presets);
      });

      it('should return a query with a filter with range of numbers when the preset is a filter range with 2 dots (..) separator but without pagination when "enablePagination" is set to False', () => {
        serviceOptions.columnDefinitions = [{ id: 'company', field: 'company' }, { id: 'gender', field: 'gender' }, { id: 'duration', field: 'duration', type: FieldType.number }];
        const expectation = `$filter=(Duration gt 4 and Duration lt 88)`;
        const presetFilters = [
          { columnId: 'duration', searchTerms: ['4..88'] },
        ] as CurrentFilter[];

        service.init(serviceOptions, paginationOptions, gridStub);
        service.updateFilters(presetFilters, true);
        const query = service.buildQuery();
        const currentFilters = service.getCurrentFilters();

        expect(query).toBe(expectation);
        expect(currentFilters).toEqual(presetFilters);
      });
    });
  });

  describe('mapOdataOperator method', () => {
    it('should return lower than OData operator', () => {
      const output = service.mapOdataOperator('<');
      expect(output).toBe('lt');
    });

    it('should return lower than OData operator', () => {
      const output = service.mapOdataOperator('<=');
      expect(output).toBe('le');
    });

    it('should return lower than OData operator', () => {
      const output = service.mapOdataOperator('>');
      expect(output).toBe('gt');
    });

    it('should return lower than OData operator', () => {
      const output = service.mapOdataOperator('>=');
      expect(output).toBe('ge');
    });

    it('should return lower than OData operator', () => {
      const output1 = service.mapOdataOperator('<>');
      const output2 = service.mapOdataOperator('!=');

      expect(output1).toBe('ne');
      expect(output2).toBe('ne');
    });

    it('should return lower than OData operator', () => {
      const output1 = service.mapOdataOperator('=');
      const output2 = service.mapOdataOperator('==');
      const output3 = service.mapOdataOperator('');

      expect(output1).toBe('eq');
      expect(output2).toBe('eq');
      expect(output3).toBe('eq');
    });
  });
});
