import { AngularUtilService } from './../services/angularUtilService';
import { SlickgridConfig } from './../slickgrid-config';
import { FilterFactory } from './../filters/filterFactory';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AngularSlickgridComponent } from './angular-slickgrid.component';
import { SlickPaginationComponent } from './slick-pagination.component';
import { CollectionService } from '../services/collection.service';
import {
  ExportService,
  ExtensionService,
  FilterService,
  GridService,
  GridEventService,
  GridStateService,
  GroupingAndColspanService,
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
  DraggableGroupingExtension,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension
} from '..';

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
        ResizerService,
        SharedService,
        SortService,
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
});
