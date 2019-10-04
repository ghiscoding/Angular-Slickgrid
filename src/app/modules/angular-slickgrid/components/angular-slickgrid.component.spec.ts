import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { SlickgridConfig } from './../slickgrid-config';
import { FilterFactory } from './../filters/filterFactory';

import { AngularSlickgridComponent } from './angular-slickgrid.component';
import { SlickPaginationComponent } from './slick-pagination.component';
import { CollectionService } from '../services/collection.service';
import {
  AngularUtilService,
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
} from '../services';
import {
  ExtensionUtility,
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  CurrentSorter,
  DraggableGroupingExtension,
  GridMenuExtension,
  GridOption,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension,
} from '..';
import { Subject } from 'rxjs';

const sharedServiceStub = {} as SharedService;
Object.defineProperty(sharedServiceStub, 'dataView', {
  get: jest.fn(() => 'bar'),
  set: jest.fn()
});

const sortServiceStub = {
  bindLocalOnSort: jest.fn(),
  dispose: jest.fn(),
  loadLocalGridPresets: jest.fn(),
  onSortChanged: new Subject<CurrentSorter[]>(),
  onSortCleared: new Subject<boolean>()
};

// jest.mock('slickgrid/slick.dataview', () => ({
//   Slick: {
//     Data: mockDataView
//   }
// }));

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
        ExportService,
        ExtensionService,
        ExtensionUtility,
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
    fixture.detectChanges();
    const gridElement = document.querySelector('.gridPane');
    expect(gridElement.innerHTML).toContain('grid1');
  });

  it('should throw an error when the "enableAutoResize" is disabled and no "grid-height" is provided', () => {
    component.gridHeight = null;
    component.gridOptions = { enableAutoResize: false };

    expect(() => fixture.detectChanges()).toThrowError('[Angular-Slickgrid] requires a "grid-height" or the "enableAutoResize"');
  });

  describe('dataView options', () => {
    let dataView;
    let dataViewSpy;

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
