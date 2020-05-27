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
  CurrentRowSelection,
  CurrentSorter,
  Column,
  CurrentColumn,
  ExtensionName,
  GridOption,
  GridState,
  GridStateChange,
  GridStateType,
} from '../../models';

declare const Slick: any;

const gridOptionMock = {
  enableAutoResize: true
} as GridOption;

const backendServiceStub = {
  getCurrentFilters: () => { },
  getCurrentPagination: () => { },
  getCurrentSorters: () => { },
} as BackendService;

const dataViewStub = {
  getFilteredItems: jest.fn(),
  mapIdsToRows: jest.fn(),
  mapRowsToIds: jest.fn(),
  onBeforePagingInfoChanged: new Slick.Event(),
  onPagingInfoChanged: new Slick.Event(),
};

const gridStub = {
  autosizeColumns: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getSelectionModel: jest.fn(),
  getSelectedRows: jest.fn(),
  setSelectedRows: jest.fn(),
  onColumnsReordered: new Slick.Event(),
  onColumnsResized: new Slick.Event(),
  onSelectedRowsChanged: new Slick.Event(),
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
    service.init(gridStub, dataViewStub);
    jest.spyOn(gridStub, 'getSelectionModel').mockReturnValue(true);
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

      service.init(gridStub, dataViewStub);

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

        service.init(gridStub, dataViewStub);
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

        service.init(gridStub, dataViewStub);
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

    it('should call "getCurrentPagination" and return Pagination when using a Local Grid', () => {
      const gridOptionsMock = { enablePagination: true } as GridOption;
      const paginationMock = { pageNumber: 2, pageSize: 50 } as CurrentPagination;
      const gridSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const sharedSpy = jest.spyOn(SharedService.prototype, 'currentPagination', 'get').mockReturnValue(paginationMock);

      const output = service.getCurrentPagination();

      expect(gridSpy).toHaveBeenCalled();
      expect(sharedSpy).toHaveBeenCalled();
      expect(output).toBe(paginationMock);
    });

    it('should call "getCurrentPagination" and return Pagination when a BackendService is used', () => {
      const gridOptionsMock = { backendServiceApi: { service: backendServiceStub }, enablePagination: true } as GridOption;
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

  describe('getCurrentRowSelections method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when "enableCheckboxSelector" flag is disabled', () => {
      const gridOptionsMock = { enableCheckboxSelector: false, enableRowSelection: false } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.getCurrentRowSelections();

      expect(output).toBeNull();
    });

    it('should call "getCurrentGridState" method and return the Row Selection when either "enableCheckboxSelector" or "enableRowSelection" flag is enabled', () => {
      const selectedGridRows = [2];
      const selectedRowIds = [99];
      const gridOptionsMock = { enableCheckboxSelector: true } as GridOption;
      jest.spyOn(gridStub, 'getSelectedRows').mockReturnValue(selectedGridRows);
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
      const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }] as CurrentFilter[];
      const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];
      const selectionMock = { gridRowIndexes: selectedGridRows, dataContextIds: selectedRowIds } as CurrentRowSelection;

      const columnSpy = jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
      const filterSpy = jest.spyOn(service, 'getCurrentFilters').mockReturnValue(filterMock);
      const sorterSpy = jest.spyOn(service, 'getCurrentSorters').mockReturnValue(sorterMock);
      const selectionSpy = jest.spyOn(service, 'getCurrentRowSelections').mockReturnValue(selectionMock);

      const output = service.getCurrentGridState();

      expect(columnSpy).toHaveBeenCalled();
      expect(filterSpy).toHaveBeenCalled();
      expect(sorterSpy).toHaveBeenCalled();
      expect(selectionSpy).toHaveBeenCalled();
      expect(output).toEqual({ columns: columnMock, filters: filterMock, sorters: sorterMock, rowSelection: selectionMock } as GridState);
    });

    it('should call the "mapIdsToRows" from the DataView and get the data IDs from the "selectedRowDataContextIds" array', () => {
      const mockRowIndexes = [3, 44];
      const mockRowIds = [333, 444];
      const mockRowItems = [{ id: 333 }, { id: 444 }];
      const gridOptionsMock = { enablePagination: true, enableRowSelection: true } as GridOption;
      jest.spyOn(dataViewStub, 'getFilteredItems').mockReturnValue(mockRowItems);
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const mapIdSpy = jest.spyOn(dataViewStub, 'mapIdsToRows').mockReturnValue(mockRowIndexes);

      service.selectedRowDataContextIds = mockRowIds;
      const output = service.getCurrentRowSelections();

      expect(mapIdSpy).toHaveBeenCalled();
      expect(output).toEqual({ gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds });
    });
  });

  describe('Row Selection - bindSlickGridRowSelectionToGridStateChange method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('without Pagination', () => {
      beforeEach(() => {
        const gridOptionsMock = { enablePagination: false, enableRowSelection: true } as GridOption;
        jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      });

      it('should call the "onGridStateChanged" event with the row selection when Pagination is disabled and "onSelectedRowsChanged" is triggered', (done) => {
        const mockRowIndexes = [3, 44];
        const mockRowIds = [333, 444];
        const mockRowItems = [{ id: 333 }, { id: 444 }];
        const onGridChangedSpy = jest.spyOn(service.onGridStateChanged, 'next');
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }] as CurrentFilter[];
        const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];

        jest.spyOn(dataViewStub, 'getFilteredItems').mockReturnValue(mockRowItems);
        jest.spyOn(gridStub, 'getSelectedRows').mockReturnValue(mockRowIndexes);
        const mapRowsSpy = jest.spyOn(dataViewStub, 'mapRowsToIds').mockReturnValue(mockRowIds);
        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentFilters').mockReturnValue(filterMock);
        jest.spyOn(service, 'getCurrentSorters').mockReturnValue(sorterMock);

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockRowIds;
        gridStub.onSelectedRowsChanged.notify({ rows: mockRowIndexes, previousSelectedRows: [] });

        setTimeout(() => {
          expect(mapRowsSpy).toHaveBeenCalled();
          expect(onGridChangedSpy).toHaveBeenCalledWith({
            change: { newValues: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds }, type: 'rowSelection', },
            gridState: {
              columns: columnMock,
              filters: filterMock,
              sorters: sorterMock,
              rowSelection: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds },
            },
          });
          done();
        });
      });
    });

    describe('with Pagination (bindSlickGridRowSelectionWithPaginationToGridStateChange)', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        service.dispose();
        const gridOptionsMock = { enablePagination: true, enableRowSelection: true } as GridOption;
        jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      });

      it('should call the "onGridStateChanged" event with the row selection when Pagination is disabled and "onSelectedRowsChanged" is triggered', (done) => {
        const mockPreviousRowIndexes = [3, 33];
        const mockRowIndexes = [3, 44];
        const mockRowIds = [333, 444];
        const mockRowItems = [{ id: 333 }, { id: 444 }];
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }] as CurrentFilter[];
        const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];
        const paginationMock = { pageNumber: 3, pageSize: 25 } as CurrentPagination;

        jest.spyOn(dataViewStub, 'getFilteredItems').mockReturnValue(mockRowItems);
        jest.spyOn(gridStub, 'getSelectedRows').mockReturnValue(mockRowIndexes);
        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentFilters').mockReturnValue(filterMock);
        jest.spyOn(service, 'getCurrentSorters').mockReturnValue(sorterMock);
        jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);
        const onGridChangedSpy = jest.spyOn(service.onGridStateChanged, 'next');
        const mapRowsSpy = jest.spyOn(dataViewStub, 'mapRowsToIds').mockReturnValue(mockRowIds);

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockRowIds;

        // the regular event flow is 1.onBeforePagingInfoChanged, 2.onPagingInfoChanged then 3.onSelectedRowsChanged
        dataViewStub.onBeforePagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: 0 });
        dataViewStub.onPagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: (paginationMock.pageNumber - 1) });
        gridStub.onSelectedRowsChanged.notify({ rows: mockRowIndexes, previousSelectedRows: mockPreviousRowIndexes });

        setTimeout(() => {
          expect(mapRowsSpy).toHaveBeenCalled();
          expect(onGridChangedSpy).toHaveBeenCalledWith({
            change: { newValues: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds }, type: 'rowSelection' },
            gridState: {
              columns: columnMock,
              filters: filterMock,
              sorters: sorterMock,
              pagination: paginationMock,
              rowSelection: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds },
            },
          });
          done();
        });
      });

      it('should call the "setSelectedRows" grid method inside the "onPagingInfoChanged" event when the rows are not yet selected in the grid', (done) => {
        const currentSelectedRowIndexes = [4, 44];
        const shouldBeSelectedRowIndexes = [3, 44];
        const mockRowIds = [333, 444];
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const paginationMock = { pageNumber: 3, pageSize: 25 } as CurrentPagination;

        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);
        const setSelectSpy = jest.spyOn(gridStub, 'setSelectedRows');

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockRowIds;

        // this comparison which has different arrays, will trigger the expectation we're looking for
        jest.spyOn(dataViewStub, 'mapIdsToRows').mockReturnValue(shouldBeSelectedRowIndexes);
        jest.spyOn(gridStub, 'getSelectedRows').mockReturnValueOnce(currentSelectedRowIndexes);

        // the regular event flow is 1.onBeforePagingInfoChanged, 2.onPagingInfoChanged then 3.onSelectedRowsChanged
        dataViewStub.onBeforePagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: 0 });
        dataViewStub.onPagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: (paginationMock.pageNumber - 1) });

        setTimeout(() => {
          expect(setSelectSpy).toHaveBeenCalledWith(shouldBeSelectedRowIndexes);
          done();
        });
      });

      it('should call the "setSelectedRows" grid method inside the "onSelectedRowsChanged" when the rows are not yet selected in the grid before calling "onGridStateChanged" event', (done) => {
        const mockPreviousRowIndexes = [3, 33];
        const mockRowIndexes = [3, 44];
        const currentSelectedRowIndexes = [4, 44];
        const shouldBeSelectedRowIndexes = [3, 44];
        const mockRowIds = [333, 444];
        const mockRowItems = [{ id: 333 }, { id: 444 }];
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const paginationMock = { pageNumber: 3, pageSize: 25 } as CurrentPagination;

        jest.spyOn(dataViewStub, 'getFilteredItems').mockReturnValue(mockRowItems);
        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);
        const onGridChangedSpy = jest.spyOn(service.onGridStateChanged, 'next');
        const mapRowsSpy = jest.spyOn(dataViewStub, 'mapRowsToIds').mockReturnValue(mockRowIds);
        const setSelectSpy = jest.spyOn(gridStub, 'setSelectedRows');

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockRowIds;

        // this comparison which has different arrays, will trigger the expectation we're looking for
        jest.spyOn(dataViewStub, 'mapIdsToRows').mockReturnValue(shouldBeSelectedRowIndexes);
        const getSelectSpy = jest.spyOn(gridStub, 'getSelectedRows').mockReturnValueOnce(currentSelectedRowIndexes).mockReturnValue(shouldBeSelectedRowIndexes);

        // the regular event flow is 1.onBeforePagingInfoChanged, 2.onPagingInfoChanged then 3.onSelectedRowsChanged
        dataViewStub.onBeforePagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: 0 });
        // dataViewStub.onPagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: (paginationMock.pageNumber - 1) });
        gridStub.onSelectedRowsChanged.notify({ rows: mockRowIndexes, previousSelectedRows: mockPreviousRowIndexes });

        setTimeout(() => {
          expect(mapRowsSpy).toHaveBeenCalled();
          expect(getSelectSpy).toHaveBeenCalledTimes(2);
          expect(setSelectSpy).toHaveBeenCalledWith(shouldBeSelectedRowIndexes);
          expect(onGridChangedSpy).toHaveBeenCalledWith({
            change: { newValues: { gridRowIndexes: shouldBeSelectedRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds }, type: 'rowSelection' },
            gridState: {
              columns: columnMock,
              filters: null,
              sorters: null,
              pagination: paginationMock,
              rowSelection: { gridRowIndexes: shouldBeSelectedRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds },
            },
          });
          done();
        });
      });

      it('should set new rows in the "selectedRowDataContextIds" setter when "onSelectedRowsChanged" is triggered with new selected row additions', (done) => {
        const mockPreviousRowIndexes = [3, 77];
        const mockPreviousDataIds = [333, 777];
        const mockNewRowIndexes = [3, 77, 55];
        const mockNewDataIds = [333, 777, 555];
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const paginationMock = { pageNumber: 3, pageSize: 25 } as CurrentPagination;

        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);
        const mapRowsSpy = jest.spyOn(dataViewStub, 'mapRowsToIds').mockReturnValue(mockNewDataIds);

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockPreviousDataIds;

        // the regular event flow is 1.onBeforePagingInfoChanged, 2.onPagingInfoChanged then 3.onSelectedRowsChanged
        dataViewStub.onBeforePagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: 0 });
        dataViewStub.onPagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: (paginationMock.pageNumber - 1) });
        gridStub.onSelectedRowsChanged.notify({ rows: mockNewRowIndexes, previousSelectedRows: mockPreviousRowIndexes });

        setTimeout(() => {
          expect(mapRowsSpy).toHaveBeenCalled();
          expect(service.selectedRowDataContextIds).toEqual(mockNewDataIds);
          done();
        });
      });

      it('should set remove some rows (deletions/uncheck) in the "selectedRowDataContextIds" setter when "onSelectedRowsChanged" is triggered with new selected row delitions', (done) => {
        const mockPreviousRowIndexes = [3, 77, 55];
        const mockPreviousDataIds = [333, 777, 555];
        const mockNewRowIndexes = [3, 77];
        const mockNewDataIds = [333, 777];
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const paginationMock = { pageNumber: 3, pageSize: 25 } as CurrentPagination;

        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);
        const mapRowsSpy = jest.spyOn(dataViewStub, 'mapRowsToIds').mockReturnValue([555]); // remove [555], will remain [333, 777]

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockPreviousDataIds;

        // the regular event flow is 1.onBeforePagingInfoChanged, 2.onPagingInfoChanged then 3.onSelectedRowsChanged
        dataViewStub.onBeforePagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: 0 });
        dataViewStub.onPagingInfoChanged.notify({ pageSize: paginationMock.pageSize, pageNum: (paginationMock.pageNumber - 1) });
        gridStub.onSelectedRowsChanged.notify({ rows: mockNewRowIndexes, previousSelectedRows: mockPreviousRowIndexes });
        gridStub.onSelectedRowsChanged.notify({ rows: mockNewRowIndexes, previousSelectedRows: mockPreviousRowIndexes });

        setTimeout(() => {
          expect(mapRowsSpy).toHaveBeenCalled();
          expect(service.selectedRowDataContextIds).toEqual(mockNewDataIds);
          done();
        });
      });

      it('should trigger a "onGridStateChanged" event and expect different filtered "filteredDataContextIds" when "onFilterChanged" is triggered with a some data filtered out by the DataView', (done) => {
        const mockFullDatasetRowItems = [{ id: 333 }, { id: 444 }, { id: 555 }];
        const mockRowIds = mockFullDatasetRowItems.map((item) => item.id);

        const mockFilteredRowItems = [{ id: 333 }, { id: 555 }];
        const mockFilterSearchTerms = [333, 555];
        const mockPreviousRowIndexes = [3, 33];
        const mockRowIndexes = [3, 44];
        const columnMock = [{ columnId: 'field1', cssClass: 'red', headerCssClass: '', width: 100 }] as CurrentColumn[];
        const filterMock = [{ columnId: 'field1', operator: 'EQ', searchTerms: [] }] as CurrentFilter[];
        const sorterMock = [{ columnId: 'field1', direction: 'ASC' }, { columnId: 'field2', direction: 'DESC' }] as CurrentSorter[];
        const paginationMock = { pageNumber: 3, pageSize: 25 } as CurrentPagination;

        jest.spyOn(dataViewStub, 'getFilteredItems').mockReturnValue(mockFilteredRowItems);
        jest.spyOn(gridStub, 'getSelectedRows').mockReturnValue(mockRowIndexes);
        jest.spyOn(service, 'getCurrentColumns').mockReturnValue(columnMock);
        jest.spyOn(service, 'getCurrentFilters').mockReturnValue(filterMock);
        jest.spyOn(service, 'getCurrentSorters').mockReturnValue(sorterMock);
        jest.spyOn(service, 'getCurrentPagination').mockReturnValue(paginationMock);
        const onGridChangedSpy = jest.spyOn(service.onGridStateChanged, 'next');

        service.init(gridStub, dataViewStub);
        service.selectedRowDataContextIds = mockRowIds;

        filterServiceStub.onFilterChanged.next(filterMock);

        setTimeout(() => {
          expect(onGridChangedSpy).toBeCalledTimes(2);

          // expect filteredDataContextIds to not be changed before the next Grid State change with Row Selection type
          expect(onGridChangedSpy).toHaveBeenCalledWith({
            change: { newValues: filterMock, type: 'filter' },
            gridState: {
              columns: columnMock,
              filters: filterMock,
              sorters: sorterMock,
              pagination: paginationMock,
              rowSelection: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockRowIds },
            }
          });
          // expect filteredDataContextIds to be updated with a Grid State change with Row Selection type
          expect(onGridChangedSpy).toHaveBeenCalledWith({
            change: { newValues: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockFilterSearchTerms }, type: 'rowSelection' },
            gridState: {
              columns: columnMock,
              filters: filterMock,
              sorters: sorterMock,
              pagination: paginationMock,
              rowSelection: { gridRowIndexes: mockRowIndexes, dataContextIds: mockRowIds, filteredDataContextIds: mockFilterSearchTerms },
            },
          });
          done();
        });
      });
    });
  });

  describe('getCurrentSorters method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

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

  describe('needToPreserveRowSelection method', () => {
    it('should return false when there are no "dataView" property defined in the grid options', () => {
      const gridOptionsMock = { dataView: null } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.needToPreserveRowSelection();

      expect(output).toBeFalse();
    });

    it('should return false when "dataView" property is defined in the grid options with "syncGridSelection" property', () => {
      const gridOptionsMock = { dataView: null } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.needToPreserveRowSelection();

      expect(output).toBeFalse();
    });

    it('should return true when the "dataView" grid option is a boolean and is set to True', () => {
      const gridOptionsMock = { dataView: { syncGridSelection: true }, enableRowSelection: true } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.needToPreserveRowSelection();

      expect(output).toBeTrue();
    });

    it('should return false when using BackendServiceApi and the "dataView" grid option is a boolean and is set to True but "syncGridSelectionWithBackendService" is disabled', () => {
      const gridOptionsMock = {
        dataView: { syncGridSelection: true, syncGridSelectionWithBackendService: false },
        backendServiceApi: {
          service: backendServiceStub,
          process: jest.fn(),
        },
        enableRowSelection: true
      } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.needToPreserveRowSelection();

      expect(output).toBeFalse();
    });

    it('should return true when using BackendServiceApi and the "dataView" grid option is a boolean and is set to True but "syncGridSelectionWithBackendService" is enabled', () => {
      const gridOptionsMock = {
        dataView: { syncGridSelection: true, syncGridSelectionWithBackendService: true },
        backendServiceApi: {
          service: backendServiceStub,
          process: jest.fn(),
        },
        enableRowSelection: true
      } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.needToPreserveRowSelection();

      expect(output).toBeTrue();
    });

    it('should return true when the "dataView" grid option is provided as an object', () => {
      const gridOptionsMock = {
        dataView: { syncGridSelection: { preserveHidden: true, preserveHiddenOnSelectionChange: false } },
        enableRowSelection: true
      } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = service.needToPreserveRowSelection();

      expect(output).toBeTrue();
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
      const setSelectSpy = jest.spyOn(gridStub, 'setSelectedRows');
      service.resetRowSelectionWhenRequired();
      expect(setSelectSpy).not.toHaveBeenCalled();
    });

    it('should call the method and call the grid selection reset when the selection extension is used', () => {
      const extensionMock = { name: ExtensionName.rowSelection, addon: {}, instance: {}, class: null };
      const gridOptionsMock = { enableRowSelection: true } as GridOption;
      const gridOptionSpy = jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
      const setSelectionSpy = jest.spyOn(gridStub, 'setSelectedRows');
      const extensionSpy = jest.spyOn(extensionServiceStub, 'getExtensionByName').mockReturnValue(extensionMock);

      service.resetRowSelectionWhenRequired();

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
      const gridOptionsMock = { enablePagination: false, enableCheckboxSelector: false } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

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

    it('should trigger a "onGridStateChanged" event when "onSortCleared" is triggered', (done) => {
      const gridStateMock = { columns: currentColumnsMock, filters: filterMock, sorters: sorterMock } as GridState;
      const stateChangeMock = { change: { newValues: [], type: GridStateType.sorter }, gridState: gridStateMock } as GridStateChange;
      const rxOnChangeSpy = jest.spyOn(service.onGridStateChanged, 'next');

      sortServiceStub.onSortCleared.next(true);
      setTimeout(() => {
        expect(rxOnChangeSpy).toHaveBeenCalledWith(stateChangeMock);
        done();
      });
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
