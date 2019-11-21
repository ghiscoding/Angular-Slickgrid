import { ElementRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { AngularSlickgridComponent } from '../angular-slickgrid.component';
import { ExtensionUtility } from '../../extensions';
import {
  ExcelExportService,
  ExportService,
  ExtensionService,
  FilterService,
  GraphqlService,
  GridService,
  GridEventService,
  GridStateService,
  GroupingAndColspanService,
  PaginationService,
  ResizerService,
  SharedService,
  SortService,
} from '../../services';
import { GridOption, CurrentFilter, CurrentSorter, GridStateType, Pagination, GridState, Column } from '../../models';
import { Filters } from '../../filters';
import { Editors } from '../../editors';
import * as utilities from '../../services/backend-utilities';
import { of, Subject, throwError } from 'rxjs';
import { GridStateChange } from 'dist/public_api';
import { TestBed } from '@angular/core/testing';


const mockExecuteBackendProcess = jest.fn();
// @ts-ignore
utilities.executeBackendProcessesCallback = mockExecuteBackendProcess;

const mockBackendError = jest.fn();
// @ts-ignore
utilities.onBackendError = mockBackendError;

declare var Slick: any;
jest.mock('flatpickr', () => { });
const sharedService = new SharedService();

const excelExportServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
} as unknown as ExcelExportService;

const exportServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
} as unknown as ExportService;

const extensionServiceStub = {
  bindDifferentExtensions: jest.fn(),
  createExtensionsBeforeGridCreation: jest.fn(),
  dispose: jest.fn(),
  renderColumnHeaders: jest.fn(),
  translateColumnHeaders: jest.fn(),
  translateColumnPicker: jest.fn(),
  translateGridMenu: jest.fn(),
  translateHeaderMenu: jest.fn(),
} as unknown as ExtensionService;

const mockExtensionUtility = {
  loadExtensionDynamically: jest.fn()
} as unknown as ExtensionUtility;
export class ExtensionUtilityStub {
  loadExtensionDynamically() { }
}

const groupingAndColspanServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
} as unknown as GroupingAndColspanService;

const mockGraphqlService = {
  getDatasetName: jest.fn(),
  buildQuery: jest.fn(),
  init: jest.fn(),
  updateFilters: jest.fn(),
  updateSorters: jest.fn(),
  updatePagination: jest.fn(),
} as unknown as GraphqlService;

const filterServiceStub = {
  dispose: jest.fn(),
  init: jest.fn(),
  bindBackendOnFilter: jest.fn(),
  bindLocalOnFilter: jest.fn(),
  bindLocalOnSort: jest.fn(),
  bindBackendOnSort: jest.fn(),
  populateColumnFilterSearchTermPresets: jest.fn(),
  getColumnFilters: jest.fn(),
} as unknown as FilterService;

const gridEventServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
  bindOnCellChange: jest.fn(),
  bindOnClick: jest.fn(),
} as unknown as GridEventService;

const gridServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
  setSelectedRows: jest.fn(),
} as unknown as GridService;

const gridStateServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
  getAssociatedGridColumns: jest.fn(),
  getCurrentGridState: jest.fn(),
  onGridStateChanged: new Subject<GridStateChange>(),
} as unknown as GridStateService;

const paginationServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
} as unknown as PaginationService;

const resizerServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
  bindAutoResizeDataGrid: jest.fn(),
  compensateHorizontalScroll: jest.fn(),
  resizeGrid: jest.fn(),
} as unknown as ResizerService;

const sortServiceStub = {
  bindBackendOnSort: jest.fn(),
  bindLocalOnSort: jest.fn(),
  dispose: jest.fn(),
  loadGridSorters: jest.fn(),
} as unknown as SortService;

const mockGroupItemMetaProvider = {
  init: jest.fn(),
  destroy: jest.fn(),
  defaultGroupCellFormatter: jest.fn(),
  defaultTotalsCellFormatter: jest.fn(),
  handleGridClick: jest.fn(),
  handleGridKeyDown: jest.fn(),
  getGroupRowMetadata: jest.fn(),
  getTotalsRowMetadata: jest.fn(),
};

const mockDataView = {
  constructor: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn(),
  beginUpdate: jest.fn(),
  endUpdate: jest.fn(),
  getItem: jest.fn(),
  getItems: jest.fn(),
  getItemMetadata: jest.fn(),
  onRowsChanged: jest.fn(),
  onRowCountChanged: jest.fn(),
  onSetItemsCalled: jest.fn(),
  reSort: jest.fn(),
  setItems: jest.fn(),
  syncGridSelection: jest.fn(),
};

const mockDraggableGrouping = {
  constructor: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn(),
};

const mockSlickCore = {
  handlers: [],
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  unsubscribeAll: jest.fn(),
};

const mockGetEditorLock = {
  isActive: () => true,
  commitCurrentEdit: jest.fn(),
};

const mockGrid = {
  autosizeColumns: jest.fn(),
  destroy: jest.fn(),
  init: jest.fn(),
  invalidate: jest.fn(),
  getActiveCellNode: jest.fn(),
  getColumns: jest.fn(),
  getEditorLock: () => mockGetEditorLock,
  getOptions: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  render: jest.fn(),
  resizeCanvas: jest.fn(),
  setColumns: jest.fn(),
  setHeaderRowVisibility: jest.fn(),
  setSelectedRows: jest.fn(),
  onRendered: jest.fn(),
  onScroll: jest.fn(),
  onDataviewCreated: new Slick.Event(),
};

const mockSlickCoreImplementation = jest.fn().mockImplementation(() => (mockSlickCore));
const mockDataViewImplementation = jest.fn().mockImplementation(() => (mockDataView));
const mockGroupItemMetaProviderImplementation = jest.fn().mockImplementation(() => (mockGroupItemMetaProvider));
const mockGridImplementation = jest.fn().mockImplementation(() => (mockGrid));
const mockDraggableGroupingImplementation = jest.fn().mockImplementation(() => (mockDraggableGrouping));

jest.mock('slickgrid/slick.core', () => mockSlickCoreImplementation);
jest.mock('slickgrid/slick.grid', () => mockGridImplementation);
jest.mock('slickgrid/plugins/slick.draggablegrouping', () => mockDraggableGroupingImplementation);
Slick.Grid = mockGridImplementation;
Slick.EventHandler = mockSlickCoreImplementation;
Slick.Data = { DataView: mockDataViewImplementation, GroupItemMetadataProvider: mockGroupItemMetaProviderImplementation };
Slick.DraggableGrouping = mockDraggableGroupingImplementation;

describe('Angular-Slickgrid Custom Component instantiated via Constructor', () => {
  let component: AngularSlickgridComponent;
  let divContainer: HTMLDivElement;
  let cellDiv: HTMLDivElement;
  let mockElementRef: ElementRef;
  let translate: TranslateService;

  const template = `
  <div id="grid1" style="height: 800px; width: 600px;">
      <div id="slickGridContainer-grid1" class="gridPane" style="width: 100%;">
      </div>
    </div>
  <angular-slickgrid
    grid-id="grid1"
    column-definitions.bind="columnDefinitions"
    grid-options.bind="gridOptions"
    dataset.bind="dataset">
  </angular-slickgrid>`;

  beforeEach(() => {
    divContainer = document.createElement('div');
    cellDiv = document.createElement('div');
    divContainer.innerHTML = template;
    divContainer.appendChild(cellDiv);
    document.body.appendChild(divContainer);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);

    mockElementRef = {
      nativeElement: divContainer
    } as ElementRef;

    component = new AngularSlickgridComponent(
      mockElementRef,
      excelExportServiceStub,
      exportServiceStub,
      extensionServiceStub,
      mockExtensionUtility,
      filterServiceStub,
      gridEventServiceStub,
      gridServiceStub,
      gridStateServiceStub,
      groupingAndColspanServiceStub,
      paginationServiceStub,
      resizerServiceStub,
      sharedService,
      sortServiceStub,
      translate,
      {} as GridOption
    );

    component.gridId = 'grid1';
    component.columnDefinitions = [{ id: 'name', field: 'name' }];
    component.dataset = [];
    component.gridOptions = { enableExcelExport: false } as GridOption;
    component.gridHeight = 600;
    component.gridWidth = 800;
  });

  it('should make sure Angular-Slickgrid is defined', () => {
    expect(component).toBeTruthy();
  });

  it('should create a grid and expect multiple Event Aggregator being called', () => {
    const onBeforeGridCreateSpy = jest.spyOn(component.onBeforeGridCreate, 'emit');
    const onDataViewCreatedSpy = jest.spyOn(component.onDataviewCreated, 'emit');
    const onGridCreatedSpy = jest.spyOn(component.onGridCreated, 'emit');
    const onBeforeGridDestroySpy = jest.spyOn(component.onBeforeGridDestroy, 'emit');
    const onAfterGridDestroyedSpy = jest.spyOn(component.onAfterGridDestroyed, 'emit');

    component.ngOnInit();
    component.ngAfterViewInit();
    expect(onBeforeGridCreateSpy).toHaveBeenCalled();
    expect(onDataViewCreatedSpy).toHaveBeenCalled();
    expect(onGridCreatedSpy).toHaveBeenCalled();

    component.ngOnDestroy();
    expect(onBeforeGridDestroySpy).toHaveBeenCalled();
    expect(onAfterGridDestroyedSpy).toHaveBeenCalled();
  });

  describe('initialization method', () => {
    describe('columns definitions changed', () => {
      it('should expect "translateColumnHeaders" being called when "enableTranslate" is set', () => {
        const translateSpy = jest.spyOn(extensionServiceStub, 'translateColumnHeaders');
        const autosizeSpy = jest.spyOn(mockGrid, 'autosizeColumns');
        const updateSpy = jest.spyOn(component, 'updateColumnDefinitionsList');
        const mockColDefs = [{ id: 'name', field: 'name', editor: undefined, internalColumnEditor: {} }];

        component.gridOptions.enableTranslate = true;
        component.ngOnInit();
        component.ngAfterViewInit();
        component.columnDefinitions = mockColDefs;

        expect(component.columnDefinitions).toEqual(mockColDefs);
        expect(translateSpy).toHaveBeenCalledWith(false, mockColDefs);
        expect(autosizeSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalledWith(mockColDefs);
      });

      it('should expect "renderColumnHeaders" being called when "enableTranslate" is disabled', () => {
        const translateSpy = jest.spyOn(extensionServiceStub, 'translateColumnHeaders');
        const autosizeSpy = jest.spyOn(mockGrid, 'autosizeColumns');
        const updateSpy = jest.spyOn(component, 'updateColumnDefinitionsList');
        const mockColDefs = [{ id: 'name', field: 'name', editor: undefined, internalColumnEditor: {} }];

        component.ngOnInit();
        component.ngAfterViewInit();
        component.columnDefinitions = mockColDefs;

        expect(translateSpy).toHaveBeenCalledWith(false, mockColDefs);
        expect(autosizeSpy).toHaveBeenCalled();
        expect(updateSpy).toHaveBeenCalledWith(mockColDefs);
      });
    });

    describe('dataset changed', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call "getItems" method from the DataView when user calls the "dataset" Getter', () => {
        const mockData = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Smith' }];
        component.gridOptions = { showHeaderRow: false } as GridOption;
        const gridSpy = jest.spyOn(mockDataView, 'getItems').mockReturnValue(mockData);

        component.dataset = mockData;
        component.ngAfterViewInit();

        expect(component.dataset).toEqual(mockData);
      });

      it('should expect "autosizeColumns" being called when "autoFitColumnsOnFirstLoad" is set and we are on first page load', () => {
        const autosizeSpy = jest.spyOn(mockGrid, 'autosizeColumns');
        const refreshSpy = jest.spyOn(component, 'refreshGridData');
        const mockData = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Smith' }];

        component.gridOptions.autoFitColumnsOnFirstLoad = true;
        component.ngAfterViewInit();
        component.dataset = mockData;

        expect(autosizeSpy).toHaveBeenCalledTimes(2); // 1x by datasetChanged and 2x by bindResizeHook
        expect(refreshSpy).toHaveBeenCalledWith(mockData);
      });

      // it('should expect "autosizeColumns" NOT being called when "autoFitColumnsOnFirstLoad" is set but we are not on first page load', () => {
      //   const autosizeSpy = jest.spyOn(mockGrid, 'autosizeColumns');
      //   const refreshSpy = jest.spyOn(component, 'refreshGridData');
      //   const mockData = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Smith' }];

      //   component.gridOptions.autoFitColumnsOnFirstLoad = true;
      //   component.ngAfterViewInit();
      //   component.dataset = mockData;
      //   // component.datasetChanged(mockData, [{ firstName: 'Jamie' }]);

      //   expect(autosizeSpy).toHaveBeenCalledTimes(2); // 0x by datasetChanged and 2x by bindResizeHook
      //   expect(refreshSpy).toHaveBeenCalledWith(mockData);
      // });

      it('should expect "autosizeColumns" NOT being called when "autoFitColumnsOnFirstLoad" is not set and we are on first page load', () => {
        const autosizeSpy = jest.spyOn(mockGrid, 'autosizeColumns');
        const refreshSpy = jest.spyOn(component, 'refreshGridData');
        const mockData = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Smith' }];

        component.gridOptions.autoFitColumnsOnFirstLoad = false;
        component.ngAfterViewInit();
        component.dataset = mockData;

        expect(autosizeSpy).not.toHaveBeenCalled();
        expect(refreshSpy).toHaveBeenCalledWith(mockData);
      });
    });

    describe('with editors', () => {
      it('should be able to load async editors with a regular Promise', (done) => {
        const mockCollection = ['male', 'female'];
        const mockColDefs = [{ id: 'gender', field: 'gender', editor: { model: Editors.text, collectionAsync: of(mockCollection) } }] as Column[];
        const getColSpy = jest.spyOn(mockGrid, 'getColumns').mockReturnValue(mockColDefs);

        component.ngAfterViewInit();
        component.columnDefinitions = mockColDefs;

        setTimeout(() => {
          expect(getColSpy).toHaveBeenCalled();
          expect(component.columnDefinitions[0].editor.collection).toEqual(mockCollection);
          expect(component.columnDefinitions[0].internalColumnEditor.collection).toEqual(mockCollection);
          expect(component.columnDefinitions[0].internalColumnEditor.model).toEqual(Editors.text);
          done();
        });
      });
    });

    describe('use grouping', () => {
      it('should load groupItemMetaProvider to the DataView when using "draggableGrouping" feature', () => {
        const extensionSpy = jest.spyOn(mockExtensionUtility, 'loadExtensionDynamically');
        const dataviewSpy = jest.spyOn(mockDataViewImplementation.prototype, 'constructor');
        const groupMetaSpy = jest.spyOn(mockGroupItemMetaProviderImplementation.prototype, 'constructor');
        const sharedMetaSpy = jest.spyOn(SharedService.prototype, 'groupItemMetadataProvider', 'set');

        component.gridOptions.draggableGrouping = {};
        component.ngAfterViewInit();

        expect(extensionSpy).toHaveBeenCalledWith('groupItemMetaProvider');
        expect(dataviewSpy).toHaveBeenCalledWith({ groupItemMetadataProvider: expect.anything() });
        expect(groupMetaSpy).toHaveBeenCalledWith();
        expect(sharedMetaSpy).toHaveBeenCalledWith(mockGroupItemMetaProvider);

        component.destroy();
      });

      it('should load groupItemMetaProvider to the DataView when using "enableGrouping" feature', () => {
        const extensionSpy = jest.spyOn(mockExtensionUtility, 'loadExtensionDynamically');
        const dataviewSpy = jest.spyOn(mockDataViewImplementation.prototype, 'constructor');
        const groupMetaSpy = jest.spyOn(mockGroupItemMetaProviderImplementation.prototype, 'constructor');
        const sharedMetaSpy = jest.spyOn(SharedService.prototype, 'groupItemMetadataProvider', 'set');

        component.gridOptions.enableGrouping = true;
        component.ngAfterViewInit();

        expect(extensionSpy).toHaveBeenCalledWith('groupItemMetaProvider');
        expect(dataviewSpy).toHaveBeenCalledWith({ groupItemMetadataProvider: expect.anything() });
        expect(groupMetaSpy).toHaveBeenCalledWith();
        expect(sharedMetaSpy).toHaveBeenCalledWith(mockGroupItemMetaProvider);

        component.destroy();
      });
    });

    describe('dataView options', () => {
      afterEach(() => {
        component.destroy();
        jest.clearAllMocks();
      });

      it('should call the onDataviewCreated emitter', () => {
        const spy = jest.spyOn(component.onDataviewCreated, 'emit');

        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(expect.any(Object));
      });

      it('should call the "executeAfterDataviewCreated" and "loadGridSorters" methods and Sorter Presets are provided in the Grid Options', () => {
        const spy = jest.spyOn(component.onDataviewCreated, 'emit');
        const sortSpy = jest.spyOn(sortServiceStub, 'loadGridSorters');

        component.gridOptions = { presets: { sorters: [{ columnId: 'field1', direction: 'DESC' }] } } as GridOption;
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(expect.any(Object));
        expect(sortSpy).toHaveBeenCalled();
      });

      it('should call the DataView syncGridSelection method with 2nd argument as True when the "dataView" grid option is a boolean and is set to True', () => {
        const syncSpy = jest.spyOn(mockDataView, 'syncGridSelection');

        component.gridOptions = { dataView: { syncGridSelection: true }, enableRowSelection: true } as GridOption;
        component.ngAfterViewInit();

        expect(syncSpy).toHaveBeenCalledWith(component.grid, true);
      });

      it('should call the DataView syncGridSelection method with 3 arguments when the "dataView" grid option is provided as an object', () => {
        const syncSpy = jest.spyOn(mockDataView, 'syncGridSelection');

        component.gridOptions = {
          dataView: { syncGridSelection: { preserveHidden: true, preserveHiddenOnSelectionChange: false } },
          enableRowSelection: true
        } as GridOption;
        component.ngAfterViewInit();

        expect(syncSpy).toHaveBeenCalledWith(component.grid, true, false);
      });
    });

    describe('flag checks', () => {
      afterEach(() => {
        jest.clearAllMocks();
        component.destroy();
      });

      it('should call "showHeaderRow" method with false when its flag is disabled', () => {
        const gridSpy = jest.spyOn(mockGrid, 'setHeaderRowVisibility');

        component.gridOptions = { showHeaderRow: false } as GridOption;
        component.ngAfterViewInit();

        expect(gridSpy).toHaveBeenCalledWith(false);
      });

      it('should initialize groupingAndColspanService when "createPreHeaderPanel" grid option is enabled and "enableDraggableGrouping" is disabled', () => {
        const spy = jest.spyOn(groupingAndColspanServiceStub, 'init');

        component.gridOptions = { createPreHeaderPanel: true, enableDraggableGrouping: false } as GridOption;
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(mockGrid, mockDataView);
      });

      it('should not initialize groupingAndColspanService when "createPreHeaderPanel" grid option is enabled and "enableDraggableGrouping" is also enabled', () => {
        const spy = jest.spyOn(groupingAndColspanServiceStub, 'init');

        component.gridOptions = { createPreHeaderPanel: true, enableDraggableGrouping: true } as GridOption;
        component.ngAfterViewInit();

        expect(spy).not.toHaveBeenCalled();
      });

      it('should call "translateColumnHeaders" from ExtensionService when "enableTranslate" is set', () => {
        const spy = jest.spyOn(extensionServiceStub, 'translateColumnHeaders');

        component.gridOptions = { enableTranslate: true } as GridOption;
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalled();
      });

      it('should initialize ExportService when "enableExport" is set', () => {
        const spy = jest.spyOn(exportServiceStub, 'init');

        component.gridOptions = { enableExport: true } as GridOption;
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalled();
      });

      it('should initialize excelExportService when "enableExcelExport" is set', () => {
        const spy = jest.spyOn(excelExportServiceStub, 'init');

        component.gridOptions = { enableExcelExport: true } as GridOption;
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalled();
      });

      it('should destroy customElement and its DOM element when requested', () => {
        const spy = jest.spyOn(component, 'destroyGridContainerElm');

        component.ngAfterViewInit();
        component.destroy(true);

        expect(spy).toHaveBeenCalledWith();
      });
    });

    describe('Backend Service API', () => {
      beforeEach(() => {
        component.gridOptions = {
          backendServiceApi: {
            onInit: jest.fn(),
            service: mockGraphqlService,
            preProcess: jest.fn(),
            postProcess: jest.fn(),
            process: jest.fn(),
          }
        };
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should call the "createBackendApiInternalPostProcessCallback" method when Backend Service API is defined with a Graphql Service', () => {
        const spy = jest.spyOn(component, 'createBackendApiInternalPostProcessCallback');

        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalled();
        expect(component.gridOptions.backendServiceApi.internalPostProcess).toEqual(expect.any(Function));
      });

      it('should execute the "internalPostProcess" callback method that was created by "createBackendApiInternalPostProcessCallback"', () => {
        jest.spyOn(component.gridOptions.backendServiceApi.service, 'getDatasetName').mockReturnValue('users');
        const spy = jest.spyOn(component, 'refreshGridData');

        component.ngAfterViewInit();
        component.gridOptions.backendServiceApi.internalPostProcess({ data: { users: { nodes: [{ firstName: 'John' }], pageInfo: { hasNextPage: false }, totalCount: 2 } } });

        expect(spy).toHaveBeenCalled();
        expect(component.gridOptions.backendServiceApi.internalPostProcess).toEqual(expect.any(Function));
      });

      xit('should execute the "internalPostProcess" callback method but return an empty dataset when dataset name does not match "getDatasetName"', () => {
        jest.spyOn(component.gridOptions.backendServiceApi.service, 'getDatasetName').mockReturnValue('users');
        const spy = jest.spyOn(component, 'refreshGridData');

        component.ngAfterViewInit();
        component.gridOptions.backendServiceApi.internalPostProcess({ data: { notUsers: { nodes: [{ firstName: 'John' }], pageInfo: { hasNextPage: false }, totalCount: 2 } } });

        expect(spy).not.toHaveBeenCalled();
        expect(component.dataset).toEqual([]);
      });

      it('should invoke "updateFilters" method with filters returned from "getColumnFilters" of the Filter Service when there is no Presets defined', () => {
        const mockColumnFilter = { name: { columnId: 'name', columnDef: { id: 'name', field: 'name', filter: { model: Filters.autoComplete } }, operator: 'EQ', searchTerms: ['john'] } };
        // @ts-ignore
        jest.spyOn(filterServiceStub, 'getColumnFilters').mockReturnValue(mockColumnFilter);
        const backendSpy = jest.spyOn(mockGraphqlService, 'updateFilters');

        component.ngAfterViewInit();
        component.gridOptions.presets = undefined;

        expect(backendSpy).toHaveBeenCalledWith(mockColumnFilter, false);
      });

      it('should call the "updateFilters" method when filters are defined in the "presets" property', () => {
        const spy = jest.spyOn(mockGraphqlService, 'updateFilters');
        const mockFilters = [{ columnId: 'company', searchTerms: ['xyz'], operator: 'IN' }] as CurrentFilter[];

        component.gridOptions.presets = { filters: mockFilters };
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(mockFilters, true);
      });

      it('should call the "updateSorters" method when filters are defined in the "presets" property', () => {
        const spy = jest.spyOn(mockGraphqlService, 'updateSorters');
        const mockSorters = [{ columnId: 'name', direction: 'asc' }] as CurrentSorter[];

        component.gridOptions.presets = { sorters: mockSorters };
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(undefined, mockSorters);
      });

      it('should call the "updatePagination" method when filters are defined in the "presets" property', () => {
        const spy = jest.spyOn(mockGraphqlService, 'updatePagination');

        component.gridOptions.presets = { pagination: { pageNumber: 2, pageSize: 20 } };
        component.ngAfterViewInit();

        expect(spy).toHaveBeenCalledWith(2, 20);
      });

      it('should refresh the grid and change pagination options pagination when a preset for it is defined in grid options', () => {
        const expectedPageNumber = 3;
        const refreshSpy = jest.spyOn(component, 'refreshGridData');

        const mockData = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Smith' }];
        component.gridOptions.enablePagination = true;
        component.gridOptions.presets = { pagination: { pageSize: 10, pageNumber: expectedPageNumber } };
        component.paginationOptions = { pageSize: 10, pageNumber: 1, pageSizes: [10, 25, 50], totalItems: 100 };

        component.ngAfterViewInit();
        component.dataset = mockData;

        expect(component.paginationOptions.pageSize).toBe(10);
        expect(component.paginationOptions.pageNumber).toBe(expectedPageNumber);
        expect(refreshSpy).toHaveBeenCalledWith(mockData);
      });

      it('should execute the process method on initialization when "executeProcessCommandOnInit" is set as a backend service options with a Promise', (done) => {
        const now = new Date();
        const query = `query { users (first:20,offset:0) { totalCount, nodes { id,name,gender,company } } }`;
        const processResult = {
          data: { users: { nodes: [] }, pageInfo: { hasNextPage: true }, totalCount: 0 },
          metrics: { startTime: now, endTime: now, executionTime: 0, totalItemCount: 0 }
        };
        const promise = new Promise((resolve) => setTimeout(() => resolve(processResult), 1));
        const processSpy = jest.spyOn(component.gridOptions.backendServiceApi, 'process').mockReturnValue(promise);
        jest.spyOn(component.gridOptions.backendServiceApi.service, 'buildQuery').mockReturnValue(query);

        component.gridOptions.backendServiceApi.service.options = { executeProcessCommandOnInit: true };
        component.ngAfterViewInit();

        expect(processSpy).toHaveBeenCalled();

        setTimeout(() => {
          expect(mockExecuteBackendProcess).toHaveBeenCalledWith(expect.toBeDate(), processResult, component.gridOptions.backendServiceApi, 0);
          done();
        }, 5);
      });

      it('should execute the process method on initialization when "executeProcessCommandOnInit" is set as a backend service options with an Observable', (done) => {
        const now = new Date();
        const query = `query { users (first:20,offset:0) { totalCount, nodes { id,name,gender,company } } }`;
        const processResult = {
          data: { users: { nodes: [] }, pageInfo: { hasNextPage: true }, totalCount: 0 },
          metrics: { startTime: now, endTime: now, executionTime: 0, totalItemCount: 0 }
        };
        const processSpy = jest.spyOn(component.gridOptions.backendServiceApi, 'process').mockReturnValue(of(processResult));
        jest.spyOn(component.gridOptions.backendServiceApi.service, 'buildQuery').mockReturnValue(query);

        component.gridOptions.backendServiceApi.service.options = { executeProcessCommandOnInit: true };
        component.ngAfterViewInit();

        expect(processSpy).toHaveBeenCalled();

        setTimeout(() => {
          expect(mockExecuteBackendProcess).toHaveBeenCalledWith(expect.toBeDate(), processResult, component.gridOptions.backendServiceApi, 0);
          done();
        }, 5);
      });

      it('should throw an error when the process method on initialization when "executeProcessCommandOnInit" is set as a backend service options from a Promise', (done) => {
        const mockError = { error: '404' };
        const query = `query { users (first:20,offset:0) { totalCount, nodes { id,name,gender,company } } }`;
        const promise = new Promise((resolve, reject) => setTimeout(() => reject(mockError), 1));
        const processSpy = jest.spyOn(component.gridOptions.backendServiceApi, 'process').mockReturnValue(promise);
        jest.spyOn(component.gridOptions.backendServiceApi.service, 'buildQuery').mockReturnValue(query);

        component.gridOptions.backendServiceApi.service.options = { executeProcessCommandOnInit: true };
        component.ngAfterViewInit();

        expect(processSpy).toHaveBeenCalled();

        promise.catch((e) => {
          expect(e).toBe(mockError);
          done();
        });
      });

      it('should throw an error when the process method on initialization when "executeProcessCommandOnInit" is set as a backend service options from an Observable', (done) => {
        const mockError = { error: '404' };
        const query = `query { users (first:20,offset:0) { totalCount, nodes { id,name,gender,company } } }`;
        const processSpy = jest.spyOn(component.gridOptions.backendServiceApi, 'process').mockReturnValue(throwError(mockError));
        jest.spyOn(component.gridOptions.backendServiceApi.service, 'buildQuery').mockReturnValue(query);

        component.gridOptions.backendServiceApi.service.options = { executeProcessCommandOnInit: true };
        component.ngAfterViewInit();

        expect(processSpy).toHaveBeenCalled();

        setTimeout(() => {
          expect(mockBackendError).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('bindDifferentHooks private method called by "ngAfterViewInit"', () => {
      beforeEach(() => {
        component.columnDefinitions = [{ id: 'firstName', field: 'firstName' }];
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should reflect columns in the grid', () => {
        const mockColsPresets = [{ columnId: 'firstName', width: 100 }];
        const mockCols = [{ id: 'firstName', field: 'firstName' }];
        const getAssocColSpy = jest.spyOn(gridStateServiceStub, 'getAssociatedGridColumns').mockReturnValue(mockCols);
        const setColSpy = jest.spyOn(mockGrid, 'setColumns');

        component.gridOptions = { presets: { columns: mockColsPresets } } as GridOption;
        component.ngAfterViewInit();

        expect(getAssocColSpy).toHaveBeenCalledWith(mockGrid, mockColsPresets);
        expect(setColSpy).toHaveBeenCalledWith(mockCols);
      });

      it('should reflect columns with an extra checkbox selection column in the grid when "enableCheckboxSelector" is set', () => {
        const mockColsPresets = [{ columnId: 'firstName', width: 100 }];
        const mockCol = { id: 'firstName', field: 'firstName' };
        const mockCols = [{ id: '_checkbox_selector', field: '_checkbox_selector', editor: undefined, internalColumnEditor: {} }, mockCol];
        const getAssocColSpy = jest.spyOn(gridStateServiceStub, 'getAssociatedGridColumns').mockReturnValue([mockCol]);
        const setColSpy = jest.spyOn(mockGrid, 'setColumns');

        component.columnDefinitions = mockCols;
        component.gridOptions = { enableCheckboxSelector: true, presets: { columns: mockColsPresets } } as GridOption;
        component.ngAfterViewInit();

        expect(getAssocColSpy).toHaveBeenCalledWith(mockGrid, mockColsPresets);
        expect(setColSpy).toHaveBeenCalledWith(mockCols);
      });

      it('should execute backend service "init" method when set', () => {
        const mockPagination = { pageNumber: 1, pageSizes: [10, 25, 50], pageSize: 10, totalItems: 100 };
        const mockGraphqlOptions = { extraQueryArguments: [{ field: 'userId', value: 123 }] };
        const bindBackendSpy = jest.spyOn(sortServiceStub, 'bindBackendOnSort');
        const mockGraphqlService2 = { ...mockGraphqlService, init: jest.fn() } as unknown as GraphqlService;
        const initSpy = jest.spyOn(mockGraphqlService2, 'init');

        component.gridOptions = {
          enableSorting: true,
          backendServiceApi: {
            service: mockGraphqlService2,
            options: mockGraphqlOptions,
            preProcess: () => jest.fn(),
            process: (query) => new Promise((resolve) => resolve('process resolved')),
          },
          pagination: mockPagination,
        } as GridOption;
        component.ngAfterViewInit();

        expect(bindBackendSpy).toHaveBeenCalledWith(mockGrid, mockDataView);
        expect(initSpy).toHaveBeenCalledWith(mockGraphqlOptions, mockPagination, mockGrid);
      });

      it('should bind local sort when "enableSorting" is set', () => {
        const bindLocalSpy = jest.spyOn(sortServiceStub, 'bindLocalOnSort');

        component.gridOptions = { enableSorting: true } as GridOption;
        component.ngAfterViewInit();

        expect(bindLocalSpy).toHaveBeenCalledWith(mockGrid, mockDataView);
      });

      it('should reflect column filters when "enableSorting" is set', () => {
        const bindBackendSpy = jest.spyOn(sortServiceStub, 'bindBackendOnSort');

        component.gridOptions = {
          enableSorting: true,
          backendServiceApi: {
            service: mockGraphqlService,
            preProcess: () => jest.fn(),
            process: (query) => new Promise((resolve) => resolve('process resolved')),
          }
        } as GridOption;
        component.ngAfterViewInit();

        expect(bindBackendSpy).toHaveBeenCalledWith(mockGrid, mockDataView);
      });

      it('should reflect column filters when "enableFiltering" is set', () => {
        const initSpy = jest.spyOn(filterServiceStub, 'init');
        const bindLocalSpy = jest.spyOn(filterServiceStub, 'bindLocalOnFilter');
        const populateSpy = jest.spyOn(filterServiceStub, 'populateColumnFilterSearchTermPresets');

        component.gridOptions = { enableFiltering: true } as GridOption;
        component.ngAfterViewInit();

        expect(initSpy).toHaveBeenCalledWith(mockGrid);
        expect(bindLocalSpy).toHaveBeenCalledWith(mockGrid, mockDataView);
        expect(populateSpy).not.toHaveBeenCalled();
      });

      it('should reflect column filters when "enableFiltering" is set', () => {
        const initSpy = jest.spyOn(filterServiceStub, 'init');
        const bindBackendSpy = jest.spyOn(filterServiceStub, 'bindBackendOnFilter');
        const populateSpy = jest.spyOn(filterServiceStub, 'populateColumnFilterSearchTermPresets');

        component.gridOptions = {
          enableFiltering: true,
          backendServiceApi: {
            service: mockGraphqlService,
            preProcess: () => jest.fn(),
            process: (query) => new Promise((resolve) => resolve('process resolved')),
          }
        } as GridOption;
        component.ngAfterViewInit();

        expect(initSpy).toHaveBeenCalledWith(mockGrid);
        expect(bindBackendSpy).toHaveBeenCalledWith(mockGrid, mockDataView);
        expect(populateSpy).not.toHaveBeenCalled();
      });

      it('should reflect column filters and populate filter search terms when "enableFiltering" is set and preset filters are defined', () => {
        const mockPresetFilters = [{ columnId: 'firstName', operator: 'IN', searchTerms: ['John', 'Jane'] }] as CurrentFilter[];
        const initSpy = jest.spyOn(filterServiceStub, 'init');
        const populateSpy = jest.spyOn(filterServiceStub, 'populateColumnFilterSearchTermPresets');

        component.gridOptions = { enableFiltering: true, presets: { filters: mockPresetFilters } } as GridOption;
        component.ngAfterViewInit();

        expect(initSpy).toHaveBeenCalledWith(mockGrid);
        expect(populateSpy).toHaveBeenCalledWith(mockPresetFilters);
      });

      it('should return null when "getItemMetadata" is called without a colspan callback defined', () => {
        const itemSpy = jest.spyOn(mockDataView, 'getItem');

        component.gridOptions = { colspanCallback: undefined } as GridOption;
        component.ngAfterViewInit();
        mockDataView.getItemMetadata(2);

        expect(itemSpy).not.toHaveBeenCalled();
      });

      it('should execute colspan callback when defined in the grid options and "getItemMetadata" is called', () => {
        const mockCallback = jest.fn();
        const mockItem = { firstName: 'John', lastName: 'Doe' };
        const itemSpy = jest.spyOn(mockDataView, 'getItem').mockReturnValue(mockItem);

        component.gridOptions = { colspanCallback: mockCallback } as GridOption;
        component.ngAfterViewInit();
        mockDataView.getItemMetadata(2);

        expect(itemSpy).toHaveBeenCalledWith(2);
        expect(mockCallback).toHaveBeenCalledWith(mockItem);
      });

      it('should call multiple translate methods when locale changes', (done) => {
        const transColHeaderSpy = jest.spyOn(extensionServiceStub, 'translateColumnHeaders');
        const transColPickerSpy = jest.spyOn(extensionServiceStub, 'translateColumnPicker');
        const transGridMenuSpy = jest.spyOn(extensionServiceStub, 'translateGridMenu');
        const transHeaderMenuSpy = jest.spyOn(extensionServiceStub, 'translateHeaderMenu');

        component.gridOptions = { enableTranslate: true } as GridOption;
        component.ngAfterViewInit();

        translate.use('fr');

        setTimeout(() => {
          expect(transColHeaderSpy).toHaveBeenCalled();
          expect(transColPickerSpy).toHaveBeenCalled();
          expect(transGridMenuSpy).toHaveBeenCalled();
          expect(transHeaderMenuSpy).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('setHeaderRowVisibility grid method', () => {
      it('should show the header row when "showHeaderRow" is called with argument True', () => {
        const spy = jest.spyOn(mockGrid, 'setHeaderRowVisibility');

        component.ngAfterViewInit();
        component.showHeaderRow(true);

        expect(spy).toHaveBeenCalledWith(true);
      });

      it('should show the header row when "showHeaderRow" is called with argument False', () => {
        const spy = jest.spyOn(mockGrid, 'setHeaderRowVisibility');

        component.ngAfterViewInit();
        component.showHeaderRow(false);

        expect(spy).toHaveBeenCalledWith(false);
      });
    });

    describe('paginationChanged method', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call trigger a gridStage change event when pagination change is triggered', () => {
        const mockPagination = { pageNumber: 2, pageSize: 20 } as Pagination;
        const spy = jest.spyOn(gridStateServiceStub.onGridStateChanged, 'next');
        jest.spyOn(gridStateServiceStub, 'getCurrentGridState').mockReturnValue({ columns: [], pagination: mockPagination } as GridState);

        component.ngAfterViewInit();
        component.paginationChanged(mockPagination);

        expect(spy).toHaveBeenCalledWith({
          change: { newValues: mockPagination, type: GridStateType.pagination },
          gridState: { columns: [], pagination: mockPagination }
        });
      });

      it('should call trigger a gridStage change and reset selected rows when pagination change is triggered and "enableRowSelection" is set', () => {
        const mockPagination = { pageNumber: 2, pageSize: 20 } as Pagination;
        const stateChangedSpy = jest.spyOn(gridStateServiceStub.onGridStateChanged, 'next');
        const setRowSpy = jest.spyOn(gridServiceStub, 'setSelectedRows');
        jest.spyOn(gridStateServiceStub, 'getCurrentGridState').mockReturnValue({ columns: [], pagination: mockPagination } as GridState);

        component.gridOptions = { enableRowSelection: true } as GridOption;
        component.ngAfterViewInit();
        component.paginationChanged(mockPagination);

        expect(setRowSpy).toHaveBeenCalledWith([]);
        expect(stateChangedSpy).toHaveBeenCalledWith({
          change: { newValues: mockPagination, type: GridStateType.pagination },
          gridState: { columns: [], pagination: mockPagination }
        });
      });

      it('should call trigger a gridStage change and reset selected rows when pagination change is triggered and "enableCheckboxSelector" is set', () => {
        const mockPagination = { pageNumber: 2, pageSize: 20 } as Pagination;
        const stateChangedSpy = jest.spyOn(gridStateServiceStub.onGridStateChanged, 'next');
        const setRowSpy = jest.spyOn(gridServiceStub, 'setSelectedRows');
        jest.spyOn(gridStateServiceStub, 'getCurrentGridState').mockReturnValue({ columns: [], pagination: mockPagination } as GridState);

        component.gridOptions = { enableCheckboxSelector: true } as GridOption;
        component.ngAfterViewInit();
        component.paginationChanged(mockPagination);

        expect(setRowSpy).toHaveBeenCalledWith([]);
        expect(stateChangedSpy).toHaveBeenCalledWith({
          change: { newValues: mockPagination, type: GridStateType.pagination },
          gridState: { columns: [], pagination: mockPagination }
        });
      });
    });
  });
});
