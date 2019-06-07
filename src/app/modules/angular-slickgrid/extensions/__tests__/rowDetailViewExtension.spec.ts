import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { RowDetailViewExtension } from '../rowDetailViewExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { FilterService, SortService, AngularUtilService } from '../../services';
import { Column } from '../../models';
import { of } from 'rxjs';

declare var Slick: any;

const filterServiceStub = {
  clearFilters: jest.fn(),
  onFilterChanged: of([]),
} as unknown as FilterService;

const sortServiceStub = {
  clearSorting: jest.fn(),
} as unknown as SortService;

const gridStub = {
  getOptions: jest.fn(),
  getSelectionModel: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
  onColumnsReordered: new Slick.Event(),
  onSort: new Slick.Event(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  getColumnDefinition: jest.fn(),
  onAsyncResponse: new Slick.Event(),
  onAsyncEndUpdate: new Slick.Event(),
  onAfterRowDetailToggle: new Slick.Event(),
  onBeforeRowDetailToggle: new Slick.Event(),
  onRowOutOfViewportRange: new Slick.Event(),
  onRowBackToViewportRange: new Slick.Event()
}));

const mockSelectionModel = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.rowdetailview', () => mockAddon);
Slick.Plugins = {
  RowDetailView: mockAddon
};

jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockSelectionModel);
Slick.RowSelectionModel = mockSelectionModel;

describe('rowDetailViewExtension', () => {
  let translate: TranslateService;
  let extension: RowDetailViewExtension;
  const gridOptionsMock = {
    enableRowDetailView: true,
    rowDetailView: {
      cssClass: 'detail-view-toggle',
      panelRows: 1,
      keyPrefix: '__',
      useRowClick: true,
      useSimpleViewportCalc: true,
      saveDetailViewOnScroll: false,
      process: () => new Promise((resolve) => resolve('')),
      viewComponent: null,
      onExtensionRegistered: jest.fn(),
    }
  } as GridOption;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RowDetailViewExtension,
        AngularUtilService,
        ApplicationRef,
        ExtensionUtility,
        SharedService,
        { provide: FilterService, useValue: filterServiceStub },
        { provide: SortService, useValue: sortServiceStub },
      ],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.get(RowDetailViewExtension);
    translate = TestBed.get(TranslateService);
  });

  it('should return null after calling "create" method when either the column definitions or the grid options is missing', () => {
    const output = extension.create([] as Column[], null);
    expect(output).toBeNull();
  });

  it('should return null after calling "register" method when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('registered addon', () => {
    let columnSelectionMock: Column;
    let columnsMock: Column[];

    beforeEach(() => {
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
      columnSelectionMock = { id: '_checkbox_selector', field: 'sel' };
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    it('should register the addon', () => {
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onExtensionRegistered');
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();

      expect(mockAddon).toHaveBeenCalledWith({
        cssClass: 'detail-view-toggle',
        keyPrefix: '__',
        panelRows: 1,
        postTemplate: expect.anything(),
        preTemplate: expect.anything(),
        process: expect.anything(),
        saveDetailViewOnScroll: false,
        useRowClick: true,
        useSimpleViewportCalc: true,
        viewComponent: null,
        onExtensionRegistered: expect.anything(),
      });
      expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
      expect(mockSelectionModel).toHaveBeenCalledWith({ selectActiveRow: true });
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });
  });
});
