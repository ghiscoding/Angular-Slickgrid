import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { AngularSlickgridComponent } from '../angular-slickgrid.component';
import { SlickPaginationComponent } from '../slick-pagination.component';
import { SlickgridConfig } from '../../slickgrid-config';
import { FilterFactory } from '../../filters/filterFactory';
import { CurrentSorter, GridOption } from '../../models';
import {
  AngularUtilService,
  CollectionService,
  ExcelExportService,
  ExportService,
  ExtensionService,
  FilterService,
  GridService,
  GridEventService,
  GridStateService,
  GroupingAndColspanService,
  PaginationService,
  ResizerService,
  SharedService,
  SortService
} from '../../services';
import {
  ExtensionUtility,
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  DraggableGroupingExtension,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension,
} from '../../extensions';

declare var Slick: any;

const sharedServiceStub = {} as SharedService;
Object.defineProperty(sharedServiceStub, 'dataView', {
  get: jest.fn(() => 'bar'),
  set: jest.fn()
});

const extensionUtilityStub = {
  loadExtensionDynamically: jest.fn()
} as unknown as ExtensionUtility;

const sortServiceStub = {
  bindLocalOnSort: jest.fn(),
  dispose: jest.fn(),
  loadLocalGridPresets: jest.fn(),
  onSortChanged: new Subject<CurrentSorter[]>(),
  onSortCleared: new Subject<boolean>()
};

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
const mockGroupItemMetaProviderImplementation = jest.fn().mockImplementation(() => (mockGroupItemMetaProvider));
const mockDataView = jest.fn().mockImplementation(() => ({
  constructor: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn(),
  beginUpdate: jest.fn(),
  endUpdate: jest.fn(),
  setItems: jest.fn(),
  syncGridSelection: jest.fn(),
}));
const mockSlickCore = jest.fn().mockImplementation(() => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  unsubscribeAll: jest.fn(),
}));
const mockGrid = jest.fn().mockImplementation(() => ({
  autosizeColumns: jest.fn(),
  destroy: jest.fn(),
  init: jest.fn(),
  getScrollbarDimensions: jest.fn(),
  resizeCanvas: jest.fn(),
  onDataviewCreated: new Slick.Event(),
}));

jest.mock('slickgrid/slick.core', () => mockSlickCore);
jest.mock('slickgrid/slick.grid', () => mockGrid);
Slick.Data = {
  DataView: mockDataView,
  GroupItemMetadataProvider: mockGroupItemMetaProviderImplementation
};
Slick.EventHandler = mockSlickCore;
Slick.Grid = mockGrid;

describe('App Component', () => {
  let fixture: ComponentFixture<AngularSlickgridComponent>;
  let component: AngularSlickgridComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AngularSlickgridComponent,
        SlickPaginationComponent
      ],
      providers: [
        AngularUtilService,
        CollectionService,
        ExcelExportService,
        ExportService,
        ExtensionService,
        FilterFactory,
        FilterService,
        GridService,
        GridEventService,
        GridStateService,
        GroupingAndColspanService,
        PaginationService,
        ResizerService,
        SharedService,
        TranslateService,
        AutoTooltipExtension,
        CellExternalCopyManagerExtension,
        CheckboxSelectorExtension,
        ColumnPickerExtension,
        DraggableGroupingExtension,
        GridMenuExtension,
        GroupItemMetaProviderExtension,
        HeaderButtonExtension,
        HeaderMenuExtension,
        RowDetailViewExtension,
        RowMoveManagerExtension,
        RowSelectionExtension,
        SlickgridConfig,
        { provide: ExtensionUtility, useValue: extensionUtilityStub },
        { provide: SortService, useValue: sortServiceStub },
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    })
      .overrideComponent(AngularSlickgridComponent, {
        set: { providers: [{ provide: 'config', useValue: {} }] },
      })
      .compileComponents();

    // create the component
    fixture = TestBed.createComponent(AngularSlickgridComponent);
    component = fixture.debugElement.componentInstance;

    // setup bindable properties
    component.gridId = 'grid1';
    component.gridOptions = {};
    component.columnDefinitions = [];
    component.dataset = [];
  }));

  it('should make sure Angular-Slickgrid is defined', () => {
    expect(component).toBeTruthy();
    expect(component.constructor).toBeDefined();
  });

  it('should create a grid and a slickgrid container in the DOM', () => {
    component.gridId = 'grid1';

    fixture.detectChanges();
    const gridPaneElm = document.querySelector<HTMLDivElement>('.gridPane');
    const gridContainerElm = document.querySelector<HTMLDivElement>('.slickgrid-container');

    expect(gridPaneElm.id).toBe('slickGridContainer-grid1');
    expect(gridContainerElm.id).toBe('grid1');
  });

  it('should define grid height & width and expect them to be used in the view', () => {
    component.gridHeight = 600;
    component.gridWidth = 800;

    fixture.detectChanges();
    const gridPaneElm = document.querySelector<HTMLDivElement>('.gridPane');
    const gridContainerElm = document.querySelector<HTMLDivElement>('.slickgrid-container');

    expect(component.gridHeightString).toBe('600px');
    expect(component.gridWidthString).toBe('800px');
    expect(gridContainerElm.style.height).toBe('600px');
    expect(gridPaneElm.style.width).toBe('800px');
  });

  it('should throw an error when the "enableAutoResize" is disabled and no "grid-height" is provided', () => {
    component.gridHeight = null;
    component.gridOptions = { enableAutoResize: false };

    expect(() => fixture.detectChanges()).toThrowError('[Angular-Slickgrid] requires a "grid-height" or the "enableAutoResize"');
  });

  describe('initialization method', () => {
    beforeEach(() => {
      component.destroy();
      // component.ngAfterViewInit();
    });

    afterEach(() => {
    });

    describe('use grouping', () => {
      it('should load groupItemMetaProvider to the DataView when using "draggableGrouping" feature', () => {
        const extensionSpy = jest.spyOn(extensionUtilityStub, 'loadExtensionDynamically');
        const dataviewSpy = jest.spyOn(mockDataView.prototype, 'constructor');
        const groupMetaSpy = jest.spyOn(mockGroupItemMetaProviderImplementation.prototype, 'constructor');
        const sharedMetaSpy = jest.spyOn(SharedService.prototype, 'groupItemMetadataProvider', 'set');

        component.gridOptions = { draggableGrouping: true } as GridOption;
        component.ngAfterViewInit();

        expect(extensionSpy).toHaveBeenCalledWith('groupItemMetaProvider');
        expect(dataviewSpy).toHaveBeenCalledWith({ groupItemMetadataProvider: expect.anything() });
        expect(groupMetaSpy).toHaveBeenCalledWith();
        expect(sharedMetaSpy).toHaveBeenCalledWith(mockGroupItemMetaProvider);
      });
    });

    describe('dataView options', () => {
      let dataView;
      let dataViewSpy;
      beforeEach(() => {
        component.ngAfterViewInit();
      });

      it('should call the onDataviewCreated emitter', () => {
        const spy = jest.spyOn(component.onDataviewCreated, 'emit');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });

      it('should call the "executeAfterDataviewCreated" and "loadLocalGridPresets" methods and Sorter Presets are provided in the Grid Options', () => {
        const compSpy = jest.spyOn(component, 'executeAfterDataviewCreated');
        const sortSpy = jest.spyOn(sortServiceStub, 'loadLocalGridPresets');

        component.gridOptions = { presets: { sorters: [{ columnId: 'field1', direction: 'DESC' }] } } as GridOption;
        fixture.detectChanges();

        expect(compSpy).toHaveBeenCalled();
        expect(sortSpy).toHaveBeenCalled();
      });

      it('should call the DataView syncGridSelection method with 2nd argument as True when the "dataView" grid option is a boolean and is set to True', () => {
        component.onDataviewCreated.subscribe((internalDataView) => {
          dataView = internalDataView;
          dataViewSpy = jest.spyOn(internalDataView, 'syncGridSelection');
        });
        component.gridOptions = { dataView: { syncGridSelection: true }, enableRowSelection: true } as GridOption;
        fixture.detectChanges();

        expect(dataView).toBeTruthy();
        expect(dataViewSpy).toHaveBeenCalledWith(component.grid, true);
      });

      it('should call the DataView syncGridSelection method with 3 arguments when the "dataView" grid option is provided as an object', () => {
        component.onDataviewCreated.subscribe((internalDataView) => {
          dataView = internalDataView;
          dataViewSpy = jest.spyOn(internalDataView, 'syncGridSelection');
        });
        component.gridOptions = {
          dataView: { syncGridSelection: { preserveHidden: true, preserveHiddenOnSelectionChange: false } },
          enableRowSelection: true
        } as GridOption;
        fixture.detectChanges();

        expect(dataView).toBeTruthy();
        expect(dataViewSpy).toHaveBeenCalledWith(component.grid, true, false);
      });
    });
  });
});
