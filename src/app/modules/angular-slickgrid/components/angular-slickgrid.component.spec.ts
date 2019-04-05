import { AngularUtilService } from './../services/angularUtilService';
import { SlickgridConfig } from './../slickgrid-config';
import { FilterFactory } from './../filters/filterFactory';
import { async, TestBed } from '@angular/core/testing';
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
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AngularSlickgridComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
