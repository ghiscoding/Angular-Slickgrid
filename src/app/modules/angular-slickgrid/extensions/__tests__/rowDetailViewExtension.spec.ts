import { ApplicationRef, Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { RowDetailViewExtension } from '../rowDetailViewExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { FilterService, SortService, AngularUtilService } from '../../services';
import { Column, CurrentFilter } from '../../models';
import { of, Subject } from 'rxjs';

declare var Slick: any;
const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

const applicationRefStub = {
  detachView: jest.fn(),
} as unknown as ApplicationRef;

const angularUtilServiceStub = {
  createAngularComponent: jest.fn(),
  createAngularComponentAppendToDom: jest.fn(),
} as unknown as AngularUtilService;

const filterServiceStub = {
  clearFilters: jest.fn(),
  onFilterChanged: new Subject<CurrentFilter[]>(),
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

@Component({
  template: `<h4>Loading...</h4>`
})
export class TestPreloadComponent { }

describe('rowDetailViewExtension', () => {
  let fixture: ComponentFixture<TestPreloadComponent>;
  let component: TestPreloadComponent;
  let translate: TranslateService;
  let extension: RowDetailViewExtension;
  const div = document.createElement('div');
  div.innerHTML = `<div class="container_loading"></div><div class="container_field1"></div>`;
  document.body.appendChild(div);

  const gridOptionsMock = {
    enableRowDetailView: true,
    rowDetailView: {
      cssClass: 'detail-view-toggle',
      panelRows: 1,
      keyPrefix: '__',
      useRowClick: true,
      useSimpleViewportCalc: true,
      saveDetailViewOnScroll: false,
      process: () => new Promise((resolve) => resolve('process resolved')),
      viewComponent: null,
      onExtensionRegistered: jest.fn(),
      onAsyncResponse: (e: Event, args: { item: any; detailView?: any }) => { },
      onAsyncEndUpdate: (e: Event, args: { item: any; grid: any; }) => { },
      onAfterRowDetailToggle: (e: Event, args: { item: any; expandedRows: any[]; grid: any; }) => { },
      onBeforeRowDetailToggle: (e: Event, args: { item: any; grid: any; }) => { },
      onRowOutOfViewportRange: (e: Event, args: { item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; grid: any; }) => { },
      onRowBackToViewportRange: (e: Event, args: { item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; grid: any; }) => { },
    }
  } as GridOption;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestPreloadComponent],
      providers: [
        RowDetailViewExtension,
        ExtensionUtility,
        SharedService,
        { provide: ApplicationRef, useValue: applicationRefStub },
        { provide: AngularUtilService, useValue: angularUtilServiceStub },
        { provide: FilterService, useValue: filterServiceStub },
        { provide: SortService, useValue: sortServiceStub },
      ],
      imports: [TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(TestPreloadComponent);
    component = fixture.componentInstance;
    extension = TestBed.get(RowDetailViewExtension);
    translate = TestBed.get(TranslateService);
  }));

  it('should return null after calling "create" method when either the column definitions or the grid options is missing', () => {
    const output = extension.create([] as Column[], null);
    expect(output).toBeNull();
  });

  it('should return null after calling "register" method when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('create method', () => {
    let columnsMock: Column[];

    beforeEach(() => {
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      jest.clearAllMocks();
    });

    it('should create the addon', () => {
      extension.create(columnsMock, gridOptionsMock);

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
        onAsyncResponse: expect.anything(),
        onAsyncEndUpdate: expect.anything(),
        onAfterRowDetailToggle: expect.anything(),
        onBeforeRowDetailToggle: expect.anything(),
        onRowOutOfViewportRange: expect.anything(),
        onRowBackToViewportRange: expect.anything(),
      });
    });

    it('should run the "process" method when defined', async () => {
      gridOptionsMock.rowDetailView.process = () => new Promise((resolve) => resolve('process resolved'));
      const output = await gridOptionsMock.rowDetailView.process({ id: 'field1', field: 'field1' });
      expect(output).toBe('process resolved');
    });

    it('should provide a sanitized "preTemplate" when only a "preloadComponent" is provided (meaning no "preTemplate" is originally provided)', async () => {
      gridOptionsMock.rowDetailView.preloadComponent = TestPreloadComponent;
      const output = await gridOptionsMock.rowDetailView.preTemplate();
      expect(output).toEqual(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
    });

    it('should provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      gridOptionsMock.rowDetailView.viewComponent = TestPreloadComponent;
      const output = await gridOptionsMock.rowDetailView.postTemplate({ id: 'field1', field: 'field1' });
      expect(output).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
    });

    it('should add a reserved column for icons in 1st column index', () => {
      const instance = extension.create(columnsMock, gridOptionsMock);
      const spy = jest.spyOn(instance, 'getColumnDefinition').mockReturnValue({ id: '_detail_selector', field: 'sel' });
      extension.create(columnsMock, gridOptionsMock);

      expect(spy).toHaveBeenCalled();
      expect(columnsMock).toEqual([
        {
          excludeFromColumnPicker: true,
          excludeFromExport: true,
          excludeFromGridMenu: true,
          excludeFromHeaderMenu: true,
          excludeFromQuery: true,
          field: 'sel',
          id: '_detail_selector'
        },
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' }
      ]);
    });
  });

  describe('registered addon', () => {
    let columnsMock: Column[];

    beforeEach(() => {
      gridOptionsMock.rowDetailView.preloadComponent = TestPreloadComponent;
      gridOptionsMock.rowDetailView.viewComponent = TestPreloadComponent;
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      jest.clearAllMocks();
    });

    it('should register the addon', () => {
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onExtensionRegistered');
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.create(columnsMock, gridOptionsMock);
      const addonInstance = extension.getAddonInstance();
      extension.register();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
      expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
      expect(mockSelectionModel).toHaveBeenCalledWith({ selectActiveRow: true });
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should call internal event handler subscribe and expect the "onAsyncResponse" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onAsyncResponse.notify({ item: columnsMock[0], detailView: {} }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], detailView: {} });
      expect(onAsyncEndSpy).not.toHaveBeenCalled();
      expect(onAfterRowSpy).not.toHaveBeenCalled();
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onAsyncEndUpdate" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onAsyncEndUpdate.notify({ item: columnsMock[0], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], grid: gridStub });
      expect(onAfterRowSpy).not.toHaveBeenCalled();
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onAfterRowDetailToggle" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onAfterRowDetailToggle.notify({ item: columnsMock[0], expandedRows: [columnsMock[0]], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).not.toHaveBeenCalled();
      expect(onAfterRowSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], expandedRows: [columnsMock[0]], grid: gridStub });
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onBeforeRowDetailToggle" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onBeforeRowDetailToggle.notify({ item: columnsMock[0], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).not.toHaveBeenCalled();
      expect(onAfterRowSpy).not.toHaveBeenCalled();
      expect(onBeforeRowSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], grid: gridStub });
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onRowOutOfViewportRange" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onRowOutOfViewportRange.notify(
        { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [columnsMock[0]], rowIdsOutOfViewport: [], grid: gridStub },
        new Slick.EventData(),
        gridStub
      );

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).not.toHaveBeenCalled();
      expect(onAfterRowSpy).not.toHaveBeenCalled();
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).toHaveBeenCalledWith(
        expect.anything(), {
          item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [columnsMock[0]], rowIdsOutOfViewport: [], grid: gridStub
        });
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onRowBackToViewportRange" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onRowBackToViewportRange.notify(
        { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [columnsMock[0]], rowIdsOutOfViewport: [], grid: gridStub },
        new Slick.EventData(),
        gridStub
      );

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).not.toHaveBeenCalled();
      expect(onAfterRowSpy).not.toHaveBeenCalled();
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).toHaveBeenCalledWith(
        expect.anything(), {
          item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [columnsMock[0]], rowIdsOutOfViewport: [], grid: gridStub
        });
    });

    it('should call Angular Util "createAngularComponentAppendToDom" when grid "onColumnsReordered" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onBeforeRowDetailToggle.subscribe(() => {
        gridStub.onColumnsReordered.notify({ impactedColumns: mockColumn }, new Slick.EventData(), gridStub);
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
        done();
      });
      instance.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should call "redrawAllViewComponents" when event "filterChanged" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock);

      extension.register();
      instance.onBeforeRowDetailToggle.subscribe(() => {
        filterServiceStub.onFilterChanged.next([{ columnId: 'field1', operator: '=', searchTerms: [] }]);
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
        done();
      });
      instance.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should call "renderAllViewComponents" when grid event "onAfterRowDetailToggle" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const getElementSpy = jest.spyOn(document, 'getElementsByClassName');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock);

      extension.register();
      instance.onAfterRowDetailToggle.subscribe(() => {
        expect(getElementSpy).toHaveBeenCalledWith('container_field1');
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
        done();
      });
      instance.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onAfterRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should call "redrawViewComponent" when grid event "onRowBackToViewportRange" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const getElementSpy = jest.spyOn(document, 'getElementsByClassName');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock);

      extension.register();
      instance.onRowBackToViewportRange.subscribe(() => {
        expect(getElementSpy).toHaveBeenCalledWith('container_field1');
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
        done();
      });
      instance.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onRowBackToViewportRange.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should run the internal "onProcessing" and call "notifyTemplate" with a Promise when "process" method is defined and executed', (done) => {
      const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
      gridOptionsMock.rowDetailView.process = (item) => new Promise((resolve) => resolve(item));
      const instance = extension.create(columnsMock, gridOptionsMock);

      instance.onAsyncResponse.subscribe((e, response) => {
        expect(response).toEqual(expect.objectContaining({ item: mockItem }));
        done();
      });

      gridOptionsMock.rowDetailView.process(mockItem);
    });

    it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', (done) => {
      const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
      gridOptionsMock.rowDetailView.process = (item) => of(mockItem);
      const instance = extension.create(columnsMock, gridOptionsMock);

      instance.onAsyncResponse.subscribe((e, response) => {
        expect(response).toEqual(expect.objectContaining({ item: mockItem }));
        done();
      });

      gridOptionsMock.rowDetailView.process({ id: 'field1', field: 'field1' });
    });

    it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', async () => {
      const mockItem = { firstName: 'John', lastName: 'Doe' };
      gridOptionsMock.rowDetailView.process = (item) => new Promise((resolve) => resolve(item));
      extension.create(columnsMock, gridOptionsMock);

      try {
        await gridOptionsMock.rowDetailView.process(mockItem);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback`);
      }
    });

    it('should call Angular Util "disposeAllViewComponents" when grid "onSort" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const disposeSpy = jest.spyOn(extension, 'disposeAllViewComponents');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onBeforeRowDetailToggle.subscribe(() => {
        gridStub.onSort.notify({ impactedColumns: mockColumn }, new Slick.EventData(), gridStub);
        expect(disposeSpy).toHaveBeenCalled();
        done();
      });
      instance.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should dispose of the addon', () => {
      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });
  });

  describe('possible error thrown', () => {
    it('should throw an error when calling "create" method without "rowDetailView" options defined', () => {
      const copyGridOptionsMock = { ...gridOptionsMock };
      copyGridOptionsMock.rowDetailView = undefined;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

      expect(() => extension.create([], copyGridOptionsMock)).toThrowError(`The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options`);
    });

    it('should throw an error when calling "create" method without "rowDetailView" options defined', () => {
      const copyGridOptionsMock = { ...gridOptionsMock };
      copyGridOptionsMock.rowDetailView.process = undefined;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

      expect(() => extension.create([], copyGridOptionsMock)).toThrowError(`You need to provide a "process" function for the Row Detail Extension to work properly`);
    });
  });
});
