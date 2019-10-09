import { Subject } from 'rxjs';

import { ExtensionService } from '../extension.service';
import { FilterService } from '../filter.service';
import { GridStateService } from '../gridState.service';
import { SharedService } from '../shared.service';
import { SortService } from '../sort.service';
import {
  BackendService,
  CurrentFilter,
  CurrentPagination,
  CurrentSorter,
  Column,
  CurrentColumn,
  ExtensionName,
  GridOption,
  GridState,
  GridStateChange,
  GridStateType,
} from '../../models';

declare var Slick: any;

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
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  onColumnsReordered: new Slick.Event(),
  onColumnsResized: new Slick.Event(),
  setSelectedRows: jest.fn(),
};

const extensionServiceStub = {
  getExtensionByName: (name: string) => { }
} as ExtensionService;

const filterServiceStub = {
  onFilterChanged: new Subject<CurrentFilter[]>(),
  onFilterCleared: new Subject<boolean>()
} as FilterService;

const sortServiceStub = {
  onSortChanged: new Subject<CurrentSorter[]>(),
  onSortCleared: new Subject<boolean>()
} as SortService;

describe('GridStateService', () => {
  let service: GridStateService;
  let sharedService: SharedService;

  beforeEach(() => {
    sharedService = new SharedService();
    service = new GridStateService(extensionServiceStub, filterServiceStub, sharedService, sortServiceStub);
    service.init(gridStub);
  });

  afterEach(() => {
    service.dispose();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('init method', () => {
    let slickgridEvent;

    beforeEach(() => {
      slickgridEvent = new Slick.Event();
    });
    afterEach(() => {
      slickgridEvent.unsubscribe();
    });

    it('should have called the "subscribeToAllGridChanges" method while initializing', () => {
      const gridStateSpy = jest.spyOn(service, 'subscribeToAllGridChanges');
      const filterSpy = jest.spyOn(filterServiceStub.onFilterChanged, 'subscribe');
      const sortSpy = jest.spyOn(sortServiceStub.onSortChanged, 'subscribe');

      service.init(gridStub);

      expect(gridStateSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalled();
      expect(sortSpy).toHaveBeenCalled();
    });

    describe('getCurrentColumns method', () => {
      it('should call "getCurrentColumns" and return empty array when no columns is defined', () => {
        const output = service.getCurrentColumns();
        expect(output).toEqual([]);
      });

      it('should call "getCurrentColumns" and return Columns when the method is called', () => {
        const columnsMock = [
          { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
          { id: 'field2', field: 'field2', width: 150, headerCssClass: 'blue' },
          { id: 'field3', field: 'field3' },
        ] as Column[];
        const gridSpy = jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);

        const output = service.getCurrentColumns();

        expect(gridSpy).toHaveBeenCalled();
        expect(output).toEqual([
          { columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 },
          { columnId: 'field2', cssClass: '', headerCssClass: 'blue', width: 150 },
          { columnId: 'field3', cssClass: '', headerCssClass: '', width: 0 },
        ] as CurrentColumn[]);
      });
    });

    describe('bindExtensionAddonEventToGridStateChange tests', () => {
      it('should subscribe to some Extension Addon SlickGrid events and expect the event to be triggered when a notify is triggered after service was initialized', () => {
        const instanceMock = { onColumnsChanged: slickgridEvent };
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const associatedColumnsMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const extensionMock = { name: ExtensionName.columnPicker, addon: instanceMock, instance: instanceMock, class: null };
        const gridStateMock = { columns: associatedColumnsMock, filters: [], sorters: [] } as GridState;
        const stateChangeMock = { change: { newValues: associatedColumnsMock, type: GridStateType.columns }, gridState: gridStateMock } as GridStateChange;

        const gridStateSpy = jest.spyOn(service, 'getCurrentGridState').mockReturnValue(gridStateMock);
        const extensionSpy = jest.spyOn(extensionServiceStub, 'getExtensionByName').mockReturnValue(extensionMock);
        const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

        service.init(gridStub);
        slickgridEvent.notify({ columns: columnsMock }, new Slick.EventData(), gridStub);

        expect(gridStateSpy).toHaveBeenCalled();
        expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
        expect(extensionSpy).toHaveBeenCalledWith(ExtensionName.columnPicker);
        expect(extensionSpy).toHaveBeenLastCalledWith(ExtensionName.gridMenu);
      });
    });

    describe('bindSlickGridEventToGridStateChange tests', () => {
      it('should subscribe to some SlickGrid events and expect the event to be triggered when a notify is triggered after service was initialized', () => {
        const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
        const associatedColumnsMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const gridStateMock = { columns: associatedColumnsMock, filters: [], sorters: [] } as GridState;
        const stateChangeMock = { change: { newValues: associatedColumnsMock, type: GridStateType.columns }, gridState: gridStateMock } as GridStateChange;

        const gridColumnSpy = jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);
        const gridColumnReorderSpy = jest.spyOn(gridStub.onColumnsReordered, 'subscribe');
        const gridColumnResizeSpy = jest.spyOn(gridStub.onColumnsResized, 'subscribe');
        const gridStateSpy = jest.spyOn(service, 'getCurrentGridState').mockReturnValue(gridStateMock);
        const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

        service.init(gridStub);
        gridStub.onColumnsReordered.notify({ impactedColumns: columnsMock }, new Slick.EventData(), gridStub);
        service.resetColumns();

        expect(gridColumnSpy).toHaveBeenCalled();
        expect(gridColumnReorderSpy).toHaveBeenCalled();
        expect(gridColumnResizeSpy).toHaveBeenCalled();
        expect(gridStateSpy).toHaveBeenCalled();
        expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
      });
    });
  });

  describe('getAssociatedCurrentColumns method', () => {
    it('should call "getAssociatedCurrentColumns" and expect "getCurrentColumns" to return current cached Columns', () => {
      const columnsMock = [
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 150, headerCssClass: 'blue' },
        { id: 'field3', field: 'field3' },
      ] as Column[];
      const associatedColumnsMock = [
        { columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 },
        { columnId: 'field2', cssClass: '', headerCssClass: 'blue', width: 150 },
        { columnId: 'field3', cssClass: '', headerCssClass: '', width: 0 },
      ] as CurrentColumn[];

      const associatedColumns = service.getAssociatedCurrentColumns(columnsMock);
      const currentColumns = service.getCurrentColumns();

      expect(associatedColumns).toEqual(associatedColumnsMock);
      expect(currentColumns).toEqual(associatedColumnsMock);
    });
  });

  describe('getAssociatedGridColumns method', () => {
    it('should call "getAssociatedGridColumns" and return empty array when empty array is provided as current columns', () => {
      const associatedGridColumns = service.getAssociatedGridColumns(gridStub, []);
      const columns = service.getColumns();

      expect(associatedGridColumns).toEqual([]);
      expect(columns).toEqual([]);
    });

    it('should call "getAssociatedGridColumns" and return empty array when empty array is provided as current columns', () => {
      const columnsMock = [
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 150, headerCssClass: 'blue' },
        { id: 'field3', field: 'field3' },
      ] as Column[];
      const columnsWithClassesMock = [
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red', headerCssClass: '' },
        { id: 'field2', field: 'field2', width: 150, cssClass: '', headerCssClass: 'blue' },
        { id: 'field3', field: 'field3', width: 0, cssClass: '', headerCssClass: '' },
      ] as Column[];
      const currentColumnsMock = [
        { columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 },
        { columnId: 'field2', cssClass: '', headerCssClass: 'blue', width: 150 },
        { columnId: 'field3', cssClass: '', headerCssClass: '', width: 0 },
      ] as CurrentColumn[];
      const gridSpy = jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);

      const associatedGridColumns = service.getAssociatedGridColumns(gridStub, currentColumnsMock);
      const columns = service.getColumns();

      expect(gridSpy).toHaveBeenCalled();
      expect(associatedGridColumns).toEqual(columnsWithClassesMock);
      expect(columns).toEqual(columnsWithClassesMock);
    });
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

    it('should call "getCurrentGridState" method and return Pagination', () => {
      const paginationMock = { pageNumber: 2, pageSize: 50 } as CurrentPagination;
      const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
      const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }] as CurrentFilter[];
      const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];

      const columnSpy = jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
      const filterSpy = jest.spyOn(service, 'getCurrentFilters').mockReturnValue(filterMock);
      const sorterSpy = jest.spyOn(service, 'getCurrentSorters').mockReturnValue(sorterMock);
      const paginationSpy = jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);

      const output = service.getCurrentGridState();

      expect(columnSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalled();
      expect(sorterSpy).toHaveBeenCalled();
      expect(paginationSpy).toHaveBeenCalled();
      expect(output).toEqual({ columns: columnMock, filters: filterMock, sorters: sorterMock, pagination: paginationMock } as GridState);
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
    afterEach(() => {
      gridStub.getOptions = () => gridOptionMock;
    });

    it('should return null when no BackendService is used and FilterService is missing the "getCurrentLocalFilters" method', () => {
      gridStub.getOptions = undefined;
      const output = service.getCurrentFilters();
      expect(output).toBeNull();
    });

    it('should return null when no BackendService is used and FilterService is missing the "getCurrentLocalFilters" method', () => {
      const gridSpy = jest.spyOn(gridStub, 'getOptions');

      const output = service.getCurrentFilters();

      expect(gridSpy).toHaveBeenCalled();
      expect(output).toBeNull();
    });

    it('should return null when no BackendService is used and FilterService is missing the "getCurrentLocalFilters" method', () => {
      const gridSpy = jest.spyOn(gridStub, 'getOptions');

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

  describe('resetColumns method', () => {
    it('should call the method without any column definitions and expect "onGridStateChanged" to be triggered with empty changes', () => {
      const gridStateMock = { columns: [], filters: [], sorters: [] } as GridState;
      const stateChangeMock = { change: { newValues: [], type: GridStateType.columns }, gridState: gridStateMock } as GridStateChange;
      const onChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');
      const serviceSpy = jest.spyOn(service, 'getCurrentGridState').mockReturnValue(gridStateMock);

      service.resetColumns();

      expect(serviceSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });

    it(`should call the method with column definitions and expect "onGridStateChanged" to be triggered
      with "newValues" property being the columns and still empty "gridState" property`, () => {
      const columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
      const currentColumnsMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
      const gridStateMock = { columns: [], filters: [], sorters: [] } as GridState;
      const stateChangeMock = { change: { newValues: currentColumnsMock, type: GridStateType.columns }, gridState: gridStateMock } as GridStateChange;
      const onChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');
      const serviceSpy = jest.spyOn(service, 'getCurrentGridState').mockReturnValue(gridStateMock);

      service.resetColumns(columnsMock);

      expect(serviceSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });
  });

  describe('resetRowSelection method', () => {
    it('should call the method and do nothing when row selection is not in use', () => {
      const gridSpy = jest.spyOn(gridStub, 'setSelectedRows');
      service.resetRowSelection();
      expect(gridSpy).not.toHaveBeenCalled();
    });

    it('should call the method and call the grid selection reset when the selection extension is used', () => {
      const extensionMock = { name: ExtensionName.rowSelection, addon: {}, instance: {}, class: null };
      const gridOptionsMock = { enableRowSelection: true } as GridOption;
      const gridOptionSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const setSelectionSpy = jest.spyOn(gridStub, 'setSelectedRows');
      const extensionSpy = jest.spyOn(extensionServiceStub, 'getExtensionByName').mockReturnValue(extensionMock);

      service.resetRowSelection();

      expect(gridOptionSpy).toHaveBeenCalled();
      expect(extensionSpy).toHaveBeenCalledWith(ExtensionName.rowSelection);
      expect(setSelectionSpy).toHaveBeenCalled();
    });
  });

  describe('subscribeToAllGridChanges events', () => {
    let columnsMock: Column[];
    let currentColumnsMock: CurrentColumn[];
    let filterMock: CurrentFilter[];
    let sorterMock: CurrentSorter[];

    beforeEach(() => {
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
      filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }, { columnId: 'field2', operator: '>=', searchTerms: [2] }] as CurrentFilter[];
      sorterMock = [{ columnId: 'field1', direction: 'ASC' }] as CurrentSorter[];
      currentColumnsMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
      jest.spyOn(filterServiceStub, 'getCurrentLocalFilters').mockReturnValue(filterMock);
      jest.spyOn(sortServiceStub, 'getCurrentLocalSorters').mockReturnValue(sorterMock);
      jest.spyOn(gridStub, 'getColumns').mockReturnValue(columnsMock);
    });

    it('should trigger a "onGridStateChanged" event when "onFilterChanged" is triggered', () => {
      const gridStateMock = { columns: currentColumnsMock, filters: filterMock, sorters: sorterMock } as GridState;
      const stateChangeMock = { change: { newValues: filterMock, type: GridStateType.filter }, gridState: gridStateMock } as GridStateChange;
      const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

      filterServiceStub.onFilterChanged.next(filterMock);
      expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });

    it('should trigger a "onGridStateChanged" event when "onFilterCleared" is triggered', () => {
      const gridStateMock = { columns: currentColumnsMock, filters: filterMock, sorters: sorterMock } as GridState;
      const stateChangeMock = { change: { newValues: [], type: GridStateType.filter }, gridState: gridStateMock } as GridStateChange;
      const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

      filterServiceStub.onFilterCleared.next(true);
      expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });

    it('should trigger a "onGridStateChanged" event when "onSortChanged" is triggered', () => {
      const gridStateMock = { columns: currentColumnsMock, filters: filterMock, sorters: sorterMock } as GridState;
      const stateChangeMock = { change: { newValues: sorterMock, type: GridStateType.sorter }, gridState: gridStateMock } as GridStateChange;
      const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

      sortServiceStub.onSortChanged.next(sorterMock);
      expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });

    it('should trigger a "onGridStateChanged" event when "onSortCleared" is triggered', () => {
      const gridStateMock = { columns: currentColumnsMock, filters: filterMock, sorters: sorterMock } as GridState;
      const stateChangeMock = { change: { newValues: [], type: GridStateType.sorter }, gridState: gridStateMock } as GridStateChange;
      const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

      sortServiceStub.onSortCleared.next(true);
      expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });

    it('should trigger a "gridStateService:changed" event when ShareService "onColumnsChanged" is triggered', () => {
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }] as Column[];
      currentColumnsMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
      const gridStateMock = { columns: currentColumnsMock, filters: [], sorters: [] } as GridState;
      const stateChangeMock = { change: { newValues: currentColumnsMock, type: GridStateType.columns }, gridState: gridStateMock } as GridStateChange;
      const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');
      const getCurGridStateSpy = jest.spyOn(service, 'getCurrentGridState').mockReturnValue(gridStateMock);
      const getAssocCurColSpy = jest.spyOn(service, 'getAssociatedCurrentColumns').mockReturnValue(currentColumnsMock);

      sharedService.onColumnsChanged.next(columnsMock);

      expect(getCurGridStateSpy).toHaveBeenCalled();
      expect(getAssocCurColSpy).toHaveBeenCalled();
      expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
    });
  });
});
