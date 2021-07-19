import { ApplicationRef, Component } from '@angular/core';
import { TestBed, } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Column, CurrentFilter, FilterService, SharedService, SlickEventHandler, SlickDataView, SlickGrid, SlickNamespace, SortService, SlickRowDetailView, RxJsFacade, } from '@slickgrid-universal/common';
import { EventPubSubService } from '@slickgrid-universal/event-pub-sub';
import { of, Subject } from 'rxjs';

import { GridOption } from '../../models/gridOption.interface';
import { RowDetailViewExtension } from '../rowDetailViewExtension';
import { AngularUtilService } from '../../services';
import { RowDetailView } from '../../models/rowDetailView.interface';
import { RxJsResourceStub } from '../../../../../../test/rxjsResourceStub';

declare const Slick: SlickNamespace;
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

const dataViewStub = {
  refresh: jest.fn(),
} as unknown as SlickDataView;

const gridStub = {
  getOptions: jest.fn(),
  getSelectionModel: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
  onColumnsReordered: new Slick.Event(),
  onSelectedRowsChanged: new Slick.Event(),
  onSort: new Slick.Event(),
} as unknown as SlickGrid;

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

@Component({
  template: `<h4>Loading...</h4>`
})
export class TestPreloadComponent { }

describe('rowDetailViewExtension', () => {
  jest.mock('slickgrid/plugins/slick.rowdetailview', () => mockAddon);
  Slick.Plugins = {
    RowDetailView: mockAddon
  } as any;

  jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockSelectionModel);
  Slick.RowSelectionModel = mockSelectionModel;

  let eventHandler: SlickEventHandler;
  let extension: RowDetailViewExtension;
  let eventPubSubService: EventPubSubService;
  let rxjsResourceStub: RxJsResourceStub;
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
      onAsyncEndUpdate: (e: Event, args: { item: any; grid: SlickGrid; }) => { },
      onAfterRowDetailToggle: (e: Event, args: { item: any; expandedRows: any[]; grid: SlickGrid; }) => { },
      onBeforeRowDetailToggle: (e: Event, args: { item: any; grid: SlickGrid; }) => { },
      onRowOutOfViewportRange: (e: Event, args: { item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; grid: SlickGrid; }) => { },
      onRowBackToViewportRange: (e: Event, args: { item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; grid: SlickGrid; }) => { },
    }
  } as unknown as GridOption;

  beforeEach(async () => {
    eventHandler = new Slick.EventHandler();
    eventPubSubService = new EventPubSubService(div);
    rxjsResourceStub = new RxJsResourceStub();

    await TestBed.configureTestingModule({
      declarations: [TestPreloadComponent],
      providers: [
        RowDetailViewExtension,
        SharedService,
        { provide: ApplicationRef, useValue: applicationRefStub },
        { provide: AngularUtilService, useValue: angularUtilServiceStub },
        { provide: EventPubSubService, useValue: eventPubSubService },
        { provide: FilterService, useValue: filterServiceStub },
        { provide: RxJsFacade, useValue: rxjsResourceStub },
        { provide: SortService, useValue: sortServiceStub },
      ],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.inject(RowDetailViewExtension);
  });

  afterEach(() => {
    eventHandler.unsubscribeAll();
    jest.clearAllMocks();
  });

  it('should return null after calling "create" method when either the column definitions or the grid options is missing', () => {
    const output = extension.create([] as Column[], null as any);
    expect(output).toBeNull();
  });

  it('should return null after calling "register" method when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('create method', () => {
    let columnsMock: Column[];

    beforeEach(() => {
      gridOptionsMock.datasetIdPropertyName = 'id';
      columnsMock = [
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 }
      ];
      jest.spyOn(SharedService.prototype, 'slickGrid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'dataView', 'get').mockReturnValue(dataViewStub);
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
      (gridOptionsMock.rowDetailView as RowDetailView).process = () => new Promise((resolve) => resolve('process resolved'));
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).process({ id: 'field1', field: 'field1' });
      expect(output).toBe('process resolved');
    });

    it('should use "addRxJsResource" method and run the "process" method when defined', async () => {
      extension.addRxJsResource(rxjsResourceStub);
      (gridOptionsMock.rowDetailView as RowDetailView).process = () => new Promise((resolve) => resolve('process resolved'));
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).process({ id: 'field1', field: 'field1' });
      expect(output).toBe('process resolved');
    });

    it('should provide a sanitized "preTemplate" when only a "preloadComponent" is provided (meaning no "preTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).preloadComponent = TestPreloadComponent;
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).preTemplate!();
      expect(output).toEqual(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
    });

    it('should provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestPreloadComponent;
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).postTemplate!({ id: 'field1', field: 'field1' });
      expect(output).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
    });

    it('should define "datasetIdPropertyName" with different "id" and provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestPreloadComponent;
      gridOptionsMock.datasetIdPropertyName = 'rowId';
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).postTemplate!({ rowId: 'field1', field: 'field1' });
      expect(output).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
    });

    it('should add a reserved column for icons in 1st column index', () => {
      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
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
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 },
      ]);
    });

    it('should expect the column to be at a different column index position when "columnIndexPosition" is defined', () => {
      (gridOptionsMock.rowDetailView as RowDetailView).columnIndexPosition = 2;
      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      const spy = jest.spyOn(instance, 'getColumnDefinition').mockReturnValue({ id: '_detail_selector', field: 'sel' });
      extension.create(columnsMock, gridOptionsMock);

      expect(spy).toHaveBeenCalled();
      expect(columnsMock).toEqual([
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 },
        {
          excludeFromColumnPicker: true,
          excludeFromExport: true,
          excludeFromGridMenu: true,
          excludeFromHeaderMenu: true,
          excludeFromQuery: true,
          field: 'sel',
          id: '_detail_selector'
        },
      ]);
    });
  });

  describe('registered addon', () => {
    let columnsMock: Column[];

    beforeEach(() => {
      (gridOptionsMock.rowDetailView as RowDetailView).preloadComponent = TestPreloadComponent;
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestPreloadComponent;
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
      jest.spyOn(SharedService.prototype, 'slickGrid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      jest.clearAllMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should register the addon', () => {
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onExtensionRegistered');
      const pluginSpy = jest.spyOn(SharedService.prototype.slickGrid, 'registerPlugin');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
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

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      instance.onAsyncResponse!.notify({ item: columnsMock[0], detailView: {} }, new Slick.EventData(), gridStub);

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
      const renderSpy = jest.spyOn(extension, 'renderViewModel');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      instance.onAsyncEndUpdate!.notify({ item: columnsMock[0], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], grid: gridStub });
      expect(renderSpy).toHaveBeenCalledWith({ cssClass: 'red', field: 'field1', id: 'field1', width: 100, });
      expect(onAfterRowSpy).not.toHaveBeenCalled();
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onAfterRowDetailToggle" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      instance.onAfterRowDetailToggle!.notify({ item: columnsMock[0], expandedRows: [0], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onAsyncRespSpy).not.toHaveBeenCalled();
      expect(onAsyncEndSpy).not.toHaveBeenCalled();
      expect(onAfterRowSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], expandedRows: [0], grid: gridStub });
      expect(onBeforeRowSpy).not.toHaveBeenCalled();
      expect(onRowOutViewSpy).not.toHaveBeenCalled();
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onBeforeRowDetailToggle" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      instance.onBeforeRowDetailToggle!.notify({ item: columnsMock[0], grid: gridStub }, new Slick.EventData(), gridStub);

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

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      instance.onRowOutOfViewportRange!.notify(
        { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [0], rowIdsOutOfViewport: [], grid: gridStub },
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
        item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [0], rowIdsOutOfViewport: [], grid: gridStub
      });
      expect(onRowBackViewSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onRowBackToViewportRange" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');

      const onAsyncRespSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncResponse');
      const onAsyncEndSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
      const onAfterRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
      const onBeforeRowSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
      const onRowOutViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
      const onRowBackViewSpy = jest.spyOn(SharedService.prototype.gridOptions.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      instance.onRowBackToViewportRange!.notify(
        { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [0], rowIdsOutOfViewport: [], grid: gridStub },
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
        item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [0], rowIdsOutOfViewport: [], grid: gridStub
      });
    });

    it('should call Angular Util "createAngularComponentAppendToDom" when grid "onColumnsReordered" is triggered', () => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      eventHandler.subscribe(instance.onBeforeRowDetailToggle!, () => {
        gridStub.onColumnsReordered.notify({ impactedColumns: [mockColumn], grid: gridStub }, new Slick.EventData(), gridStub);
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
      });
      instance.onBeforeRowDetailToggle!.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should call "redrawAllViewComponents" when using Row Selection and the event "onSelectedRowsChanged" is triggered', () => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      gridOptionsMock.enableCheckboxSelector = true;
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const redrawSpy = jest.spyOn(extension, 'redrawAllViewComponents');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      extension.register();
      eventHandler.subscribe(instance.onBeforeRowDetailToggle!, () => {
        gridStub.onSelectedRowsChanged.notify({ rows: [0], previousSelectedRows: [], grid: gridStub }, new Slick.EventData(), gridStub);
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
      });
      instance.onBeforeRowDetailToggle!.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onBeforeRowDetailToggle!.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
      expect(redrawSpy).toHaveBeenCalledTimes(2);
    });

    it('should call "redrawAllViewComponents" when event "filterChanged" is triggered', () => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const redrawSpy = jest.spyOn(extension, 'redrawAllViewComponents');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      extension.register();
      eventHandler.subscribe(instance.onBeforeRowDetailToggle!, () => {
        eventPubSubService.publish('onFilterChanged', { columnId: 'field1', operator: '=', searchTerms: [] });
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
      });
      instance.onBeforeRowDetailToggle!.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onBeforeRowDetailToggle!.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
      expect(redrawSpy).toHaveBeenCalledTimes(2);
    });

    it('should call "renderAllViewComponents" when grid event "onAfterRowDetailToggle" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const getElementSpy = jest.spyOn(document, 'getElementsByClassName');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      extension.register();
      instance.onAfterRowDetailToggle!.subscribe(() => {
        expect(getElementSpy).toHaveBeenCalledWith('container_field1');
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
        done();
      });
      instance.onBeforeRowDetailToggle!.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onAfterRowDetailToggle!.notify({ item: mockColumn, expandedRows: [], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should call "redrawViewComponent" when grid event "onRowBackToViewportRange" is triggered', (done) => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const getElementSpy = jest.spyOn(document, 'getElementsByClassName');
      const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);
      const renderSpy = jest.spyOn(extension, 'renderViewModel');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      extension.register();
      instance.onRowBackToViewportRange!.subscribe(() => {
        expect(getElementSpy).toHaveBeenCalledWith('container_field1');
        expect(appendSpy).toHaveBeenCalledWith(undefined, expect.objectContaining({ className: 'container_field1' }), true);
        expect(renderSpy).toReturnWith(
          expect.objectContaining({
            componentRef: {
              destroy: expect.anything(),
              instance: expect.objectContaining({ model: mockColumn, addon: expect.anything(), grid: gridStub, dataView: dataViewStub })
            }
          })
        );
        done();
      });
      instance.onBeforeRowDetailToggle!.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);
      instance.onRowBackToViewportRange!.notify({ item: mockColumn, rowId: 0, rowIndex: 0, expandedRows: [], rowIdsOutOfViewport: [], grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should run the internal "onProcessing" and call "notifyTemplate" with a Promise when "process" method is defined and executed', (done) => {
      const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
      (gridOptionsMock.rowDetailView as RowDetailView).process = (item) => new Promise((resolve) => resolve(item));
      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      instance.onAsyncResponse!.subscribe((_e: Event, response: any) => {
        expect(response).toEqual(expect.objectContaining({ item: mockItem }));
        done();
      });

      (gridOptionsMock.rowDetailView as RowDetailView).process(mockItem);
    });

    it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', (done) => {
      const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
      (gridOptionsMock.rowDetailView as RowDetailView).process = (item) => of(mockItem);
      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      instance.onAsyncResponse!.subscribe((_e: Event, response: any) => {
        expect(response).toEqual(expect.objectContaining({ item: mockItem }));
        done();
      });

      (gridOptionsMock.rowDetailView as RowDetailView).process({ id: 'field1', field: 'field1' });
    });

    it('should define "datasetIdPropertyName" with different "id" and run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', (done) => {
      const mockItem = { rowId: 2, firstName: 'John', lastName: 'Doe' };
      (gridOptionsMock.rowDetailView as RowDetailView).process = (item) => of(mockItem);
      gridOptionsMock.datasetIdPropertyName = 'rowId';
      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;

      instance.onAsyncResponse!.subscribe((_e: Event, response: any) => {
        expect(response).toEqual(expect.objectContaining({ item: mockItem }));
        done();
      });

      (gridOptionsMock.rowDetailView as RowDetailView).process({ rowId: 'field1', field: 'field1' });
    });

    it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', async () => {
      const mockItem = { firstName: 'John', lastName: 'Doe' };
      (gridOptionsMock.rowDetailView as RowDetailView).process = (item) => new Promise((resolve) => resolve(item));
      extension.create(columnsMock, gridOptionsMock);

      try {
        await (gridOptionsMock.rowDetailView as RowDetailView).process(mockItem);
      } catch (e) {
        expect(e.toString()).toContain(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback`);
      }
    });

    it('should call Angular Util "disposeAllViewComponents" when grid "onSort" is triggered', () => {
      const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
      jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const disposeSpy = jest.spyOn(extension, 'disposeAllViewComponents');

      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
      extension.register();
      eventHandler.subscribe(instance.onBeforeRowDetailToggle!, () => {
        gridStub.onSort.notify({ columnId: 'field1', sortCol: mockColumn, sortAsc: true }, new Slick.EventData(), gridStub);
        expect(disposeSpy).toHaveBeenCalled();
      });
      instance.onBeforeRowDetailToggle!.notify({ item: mockColumn, grid: gridStub }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('should dispose of the addon', () => {
      const instance = extension.create(columnsMock, gridOptionsMock) as SlickRowDetailView;
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
      (copyGridOptionsMock.rowDetailView as RowDetailView).process = undefined as any;
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);

      expect(() => extension.create([], copyGridOptionsMock)).toThrowError(`You need to provide a "process" function for the Row Detail Extension to work properly`);
    });
  });
});
