import { TestBed } from '@angular/core/testing';
import { BackendServiceApi, BackendService, GridOption, CurrentPagination, CurrentSorter, CurrentFilter } from '../../models';
import { FilterService } from '../filter.service';
import { GridStateService } from '../gridState.service';
import { ExtensionService } from '../extension.service';
import { SortService } from '../sort.service';
import { of } from 'rxjs';

const gridOptionMock = {
  enableAutoResize: true
} as GridOption;

const backendServiceStub = {
  getCurrentFilters: () => { },
  getCurrentPagination: () => { },
  getCurrentSorters: () => { },
} as BackendService;

const gridStub = {
  autosizeColumns: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  getOptions: () => gridOptionMock
};

const extensionServiceStub = {
  getExtensionByName: (name: string) => { }
} as ExtensionService;

const filterServiceStub = {
  onFilterChanged: of([]),
  onFilterCleared: of(false)
} as FilterService;

const sortServiceStub = {
  onSortChanged: of([]),
  onSortCleared: of(false)
} as SortService;

describe('GridStateService', () => {
  let service: GridStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridStateService]
    });
    service = TestBed.get(GridStateService);
    service.init(gridStub, extensionServiceStub, filterServiceStub, sortServiceStub);
  });

  afterEach(() => {
    service.dispose();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should have called the "subscribeToAllGridChanges" method while initializing', () => {
    const gridStateSpy = jest.spyOn(service, 'subscribeToAllGridChanges');
    const filterSpy = jest.spyOn(filterServiceStub.onFilterChanged, 'subscribe');
    const sortSpy = jest.spyOn(sortServiceStub.onSortChanged, 'subscribe');

    service.init(gridStub, extensionServiceStub, filterServiceStub, sortServiceStub);

    expect(gridStateSpy).toHaveBeenCalled();
    expect(filterSpy).toHaveBeenCalled();
    expect(sortSpy).toHaveBeenCalled();
  });

  describe('getCurrentPagination method', () => {
    it('should call "getCurrentPagination" and return null when no BackendService is used', () => {
      const output = service.getCurrentPagination();
      expect(output).toBeNull();
    });

    it('should call "getCurrentPagination" and return Pagination when a BackendService is used', () => {
      const gridOptionsMock = { backendServiceApi: { service: backendServiceStub } } as GridOption;
      const paginationMock = { pageNumber: 2, pageSize: 50 } as CurrentPagination;
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const backendSpy = jest.spyOn(backendServiceStub, 'getCurrentPagination').mockReturnValue(paginationMock);

      const output = service.getCurrentPagination();

      expect(gridSpy).toHaveBeenCalled();
      expect(backendSpy).toHaveBeenCalled();
      expect(output).toBe(paginationMock);
    });
  });

  describe('getCurrentSorters method', () => {
    it('should return null when no BackendService is used and SortService is missing the "getCurrentLocalSorters" method', () => {
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue({});

      const output = service.getCurrentSorters();

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBeNull();
    });

    it('should return Sorters when a BackendService is used', () => {
      const gridOptionsMock = { backendServiceApi: { service: backendServiceStub } } as GridOption;
      const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const backendSpy = jest.spyOn(backendServiceStub, 'getCurrentSorters').mockReturnValue(sorterMock);

      const output = service.getCurrentSorters();

      expect(gridSpy).toHaveBeenCalled();
      expect(backendSpy).toHaveBeenCalled();
      expect(output).toBe(sorterMock);
    });

    it('should return Sorters when Local grid is set and no BackendService is used', () => {
      const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];
      sortServiceStub.getCurrentLocalSorters = () => sorterMock;
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue({});
      const sortSpy = jest.spyOn(sortServiceStub, 'getCurrentLocalSorters').mockReturnValue(sorterMock);

      const output = service.getCurrentSorters();

      expect(gridSpy).toHaveBeenCalled();
      expect(sortSpy).toHaveBeenCalled();
      expect(output).toBe(sorterMock);
    });
  });

  describe('getCurrentFilters method', () => {
    it('should return null when no BackendService is used and FilterService is missing the "getCurrentLocalFilters" method', () => {
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue({});

      const output = service.getCurrentFilters();

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBeNull();
    });

    it('should return Sorters when a BackendService is used', () => {
      const gridOptionsMock = { backendServiceApi: { service: backendServiceStub } } as GridOption;
      const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }, { columnId: 'field2', operator: '>=', searchTerms: [2] }] as CurrentFilter[];
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const backendSpy = jest.spyOn(backendServiceStub, 'getCurrentFilters').mockReturnValue(filterMock);

      const output = service.getCurrentFilters();

      expect(gridSpy).toHaveBeenCalled();
      expect(backendSpy).toHaveBeenCalled();
      expect(output).toBe(filterMock);
    });

    it('should return Sorters when Local grid is set and no BackendService is used', () => {
      const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }, { columnId: 'field2', operator: '>=', searchTerms: [2] }] as CurrentFilter[];
      filterServiceStub.getCurrentLocalFilters = () => filterMock;
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue({});
      const filterSpy = jest.spyOn(filterServiceStub, 'getCurrentLocalFilters').mockReturnValue(filterMock);

      const output = service.getCurrentFilters();

      expect(gridSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalled();
      expect(output).toBe(filterMock);
    });
  });
});
