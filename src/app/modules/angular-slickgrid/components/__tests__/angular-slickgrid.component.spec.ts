import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { AngularSlickgridComponent } from '../angular-slickgrid.component';
import { SlickPaginationComponent } from '../slick-pagination.component';
import { SlickgridConfig } from '../../slickgrid-config';
import { FilterFactory } from '../../filters/filterFactory';
import { CurrentFilter, CurrentSorter } from '../../models';
import {
  AngularUtilService,
  CollectionService,
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
// Object.defineProperty(sharedServiceStub, 'dataView', {
//   get: jest.fn(() => 'bar'),
//   set: jest.fn()
// });

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

const extensionUtilityStub = {
  loadExtensionDynamically: jest.fn()
} as unknown as ExtensionUtility;

const groupingAndColspanServiceStub = {
  init: jest.fn(),
  dispose: jest.fn(),
} as unknown as GroupingAndColspanService;

const mockGraphqlService = {
  getDatasetName: jest.fn(),
  updateFilters: jest.fn(),
  updateSorters: jest.fn(),
  updatePagination: jest.fn(),
} as unknown as GraphqlService;

const filterServiceStub = {
  dispose: jest.fn(),
  init: jest.fn(),
  bindBackendOnFilter: jest.fn(),
  bindLocalOnFilter: jest.fn(),
  populateColumnFilterSearchTermPresets: jest.fn(),
  getColumnFilters: jest.fn(),
  onFilterCleared: new Subject<CurrentFilter[]>(),
  onFilterChanged: new Subject<CurrentFilter[]>(),
} as unknown as FilterService;

const sortServiceStub = {
  bindBackendOnSort: jest.fn(),
  bindLocalOnSort: jest.fn(),
  dispose: jest.fn(),
  loadLocalGridPresets: jest.fn(),
  onSortChanged: new Subject<CurrentSorter[]>(),
  onSortCleared: new Subject<boolean>()
} as unknown as SortService;

describe('App Component', () => {
  let fixture: ComponentFixture<AngularSlickgridComponent>;
  let component: AngularSlickgridComponent;
  let graphqlService: GraphqlService;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AngularSlickgridComponent,
        SlickPaginationComponent
      ],
      providers: [
        AngularUtilService,
        CollectionService,
        FilterFactory,
        GridService,
        GridEventService,
        GridStateService,
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
        { provide: FilterService, useValue: filterServiceStub },
        { provide: GraphqlService, useValue: mockGraphqlService },
        { provide: ExcelExportService, useValue: excelExportServiceStub },
        { provide: ExportService, useValue: exportServiceStub },
        { provide: ExtensionService, useValue: extensionServiceStub },
        { provide: ExtensionUtility, useValue: extensionUtilityStub },
        { provide: GroupingAndColspanService, useValue: groupingAndColspanServiceStub },
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
    graphqlService = TestBed.get(GraphqlService);
    translate = TestBed.get(TranslateService);

    // setup bindable properties
    component.gridId = 'grid1';
    component.gridOptions = { enableFiltering: true };
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

  it('should trigger a SlickGrid (sgOnRendered) event & DataView (sgOnRowsChanged) event when dataset changed', async (done) => {
    const mockDataset = [{ id: 1, firstName: 'John' }, { id: 2, firstName: 'Jane' }];
    const onBeforeGridCreateSpy = jest.spyOn(component.onBeforeGridCreate, 'emit');
    const onDataviewCreatedSpy = jest.spyOn(component.onDataviewCreated, 'emit');
    const onGridCreatedSpy = jest.spyOn(component.onGridCreated, 'emit');

    fixture.detectChanges();
    const gridSpy = jest.spyOn(component.grid, 'render');
    const dispatchSpy = jest.spyOn(component.elementRef.nativeElement, 'dispatchEvent');
    const dispatchCustomSpy = jest.spyOn(component, 'dispatchCustomEvent');
    component.dataset = mockDataset;

    expect(component.grid).toBeTruthy();
    expect(onBeforeGridCreateSpy).toHaveBeenCalledWith(true);
    expect(onDataviewCreatedSpy).toHaveBeenCalledWith(expect.any(Object));
    expect(onGridCreatedSpy).toHaveBeenCalledWith(expect.any(Object));
    setTimeout(() => {
      expect(gridSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(new CustomEvent('sgOnRendered', expect.any(Object)));
      expect(dispatchSpy).toHaveBeenCalledWith(new CustomEvent('sgOnRowsChanged', expect.any(Object)));
      expect(dispatchCustomSpy).toHaveBeenCalledWith('sgOnRendered', expect.any(Object));
      expect(dispatchCustomSpy).toHaveBeenCalledWith('sgOnRowsChanged', expect.any(Object));
      done();
    }, 10);
  });
});
