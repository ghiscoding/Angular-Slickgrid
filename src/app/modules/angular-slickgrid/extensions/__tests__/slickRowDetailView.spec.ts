import { ApplicationRef, Component } from '@angular/core';
import { Column, OnSelectedRowsChangedEventArgs, SharedService, SlickEvent, SlickEventData, SlickEventHandler, SlickGrid, SlickRowSelectionModel, } from '@slickgrid-universal/common';
import { EventPubSubService } from '@slickgrid-universal/event-pub-sub';
import { of } from 'rxjs';

import { GridOption } from '../../models/gridOption.interface';
import { AngularUtilService } from '../../services';
import { RowDetailView } from '../../models/rowDetailView.interface';
import { RxJsResourceStub } from '../../../../../../test/rxjsResourceStub';
import { SlickRowDetailView } from '../slickRowDetailView';
jest.mock('@slickgrid-universal/row-detail-view-plugin');

jest.mock('@slickgrid-universal/common', () => ({
  ...(jest.requireActual('@slickgrid-universal/common') as any),
  SlickRowSelectionModel: jest.fn().mockImplementation(() => ({
    constructor: jest.fn(),
    init: jest.fn(),
    destroy: jest.fn(),
    dispose: jest.fn(),
    getSelectedRows: jest.fn(),
    setSelectedRows: jest.fn(),
    getSelectedRanges: jest.fn(),
    setSelectedRanges: jest.fn(),
    onSelectedRangesChanged: new SlickEvent(),
  })),
}));

const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

const applicationRefStub = {
  detachView: jest.fn(),
} as unknown as ApplicationRef;

const angularUtilServiceStub = {
  createAngularComponent: jest.fn(),
  createAngularComponentAppendToDom: jest.fn(),
} as unknown as AngularUtilService;

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
    viewComponent: null as any,
    onExtensionRegistered: jest.fn(),
    onAsyncResponse: () => { },
    onAsyncEndUpdate: () => { },
    onAfterRowDetailToggle: () => { },
    onBeforeRowDetailToggle: () => { },
    onRowOutOfViewportRange: () => { },
    onRowBackToViewportRange: () => { },
  }
} as unknown as GridOption;

const dataViewStub = {
  constructor: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn(),
  beginUpdate: jest.fn(),
  endUpdate: jest.fn(),
  getItem: jest.fn(),
  getItems: jest.fn(),
  getItemCount: jest.fn(),
};

const gridStub = {
  getData: () => dataViewStub,
  getUID: jest.fn(),
  getOptions: () => gridOptionsMock,
  getSelectionModel: jest.fn(),
  setSelectionModel: jest.fn(),
  sanitizeHtmlString: (s: string) => s,
  onColumnsReordered: new SlickEvent(),
  onSelectedRowsChanged: new SlickEvent(),
  onSort: new SlickEvent(),
} as unknown as SlickGrid;

@Component({ template: `<h4>Loading...</h4>` })
class TestPreloadComponent { }

@Component({ template: `<h1>Some Title</h1>` })
class TestComponent { }

describe('SlickRowDetailView', () => {
  let eventHandler: SlickEventHandler;
  let plugin: SlickRowDetailView;
  let eventPubSubService: EventPubSubService;
  let rxjsResourceStub: RxJsResourceStub;
  const div = document.createElement('div');
  div.innerHTML = `<div class="container_loading"></div><div class="container_field1"></div>`;
  document.body.appendChild(div);

  beforeEach(async () => {
    eventHandler = new SlickEventHandler();
    eventPubSubService = new EventPubSubService(div);
    rxjsResourceStub = new RxJsResourceStub();

    plugin = new SlickRowDetailView(angularUtilServiceStub, applicationRefStub, eventPubSubService, document.body as HTMLDivElement, rxjsResourceStub);
    plugin.eventHandler = new SlickEventHandler();
    jest.spyOn(plugin, 'getOptions').mockReturnValue(gridOptionsMock.rowDetailView as RowDetailView);
  });

  afterEach(() => {
    eventHandler.unsubscribeAll();
    jest.clearAllMocks();
  });

  it('should create the RowDetailView plugin', () => {
    expect(plugin).toBeTruthy();
  });

  it('should expect "getOptions" to be called when calling addonOptions GETTER', () => {
    const getOptionSpy = jest.spyOn(plugin, 'getOptions').mockReturnValue({ cssClass: 'some-class' } as any);

    const options = plugin.addonOptions;

    expect(options).toEqual({ cssClass: 'some-class' });
    expect(getOptionSpy).toHaveBeenCalled();
  });

  describe('registered plugin', () => {
    beforeEach(() => {
      gridOptionsMock.datasetIdPropertyName = 'id';
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should run the "process" method when defined', async () => {
      gridOptionsMock.rowDetailView!.process = () => new Promise((resolve) => resolve('process resolved'));
      const output = await gridOptionsMock.rowDetailView!.process({ id: 'field1', field: 'field1' });
      expect(output).toBe('process resolved');
    });

    it('should use "addRxJsResource" method and run the "process" method when defined', async () => {
      plugin.addRxJsResource(rxjsResourceStub);
      (gridOptionsMock.rowDetailView as RowDetailView).process = () => new Promise((resolve) => resolve('process resolved'));
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).process({ id: 'field1', field: 'field1' });
      expect(output).toBe('process resolved');
    });

    it('should provide a sanitized "preTemplate" when only a "preloadComponent" is provided (meaning no "preTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).preloadComponent = TestPreloadComponent;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      plugin.init(gridStub);
      const output = await (gridOptionsMock.rowDetailView as RowDetailView).preTemplate!();

      expect(output).toEqual(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
    });

    it('should provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestComponent;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = await gridOptionsMock.rowDetailView!.postTemplate!({ id: 'field1', field: 'field1' });
      expect(output).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
    });

    it('should define "datasetIdPropertyName" with different "id" and provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestComponent;
      gridOptionsMock.datasetIdPropertyName = 'rowId';
      const output = await gridOptionsMock.rowDetailView!.postTemplate!({ rowId: 'field1', field: 'field1' });
      expect(output).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
    });

    describe('registered addon', () => {
      let columnsMock: Column[];

      beforeEach(() => {
        gridOptionsMock.datasetIdPropertyName = 'id';
        gridOptionsMock.rowDetailView!.preTemplate = null as any;
        gridOptionsMock.rowDetailView!.postTemplate = null as any;
        gridOptionsMock.rowDetailView!.preloadComponent = TestPreloadComponent;
        gridOptionsMock.rowDetailView!.viewComponent = TestComponent;
        columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
        jest.spyOn(SharedService.prototype, 'slickGrid', 'get').mockReturnValue(gridStub);
        jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
        jest.clearAllMocks();
        gridStub.onColumnsReordered = new SlickEvent();
        gridStub.onSort = new SlickEvent();
      });

      afterEach(() => {
        plugin?.eventHandler?.unsubscribeAll();
        plugin?.dispose();
        jest.clearAllMocks();
        (plugin.onAsyncResponse as any) = null;
        (plugin.onAsyncEndUpdate as any) = null;
        (plugin.onAfterRowDetailToggle as any) = null;
        (plugin.onBeforeRowDetailToggle as any) = null;
        (plugin.onRowBackToViewportRange as any) = null;
        (plugin.onRowOutOfViewportRange as any) = null;
      });

      it('should register the addon', () => {
        const copyGridOptionsMock = { ...gridOptionsMock };
        gridOptionsMock.rowDetailView!.onExtensionRegistered = jest.fn();
        jest.spyOn(gridStub, 'getOptions').mockReturnValue(copyGridOptionsMock);
        const onRegisteredSpy = jest.spyOn(copyGridOptionsMock.rowDetailView!, 'onExtensionRegistered');

        plugin.init(gridStub);
        const instance = plugin.register();
        const addonInstance = plugin.getAddonInstance();

        expect(instance).toBeTruthy();
        expect(instance).toEqual(addonInstance);
        expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
        expect(SlickRowSelectionModel).toHaveBeenCalledWith({ selectActiveRow: true });
      });

      it('should call internal event handler subscribe and expect the "onAsyncResponse" option to be called when addon notify is called', () => {
        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onAsyncResponse = new SlickEvent();
        plugin.register();

        plugin.onAsyncResponse.notify({ item: columnsMock[0], itemDetail: columnsMock[0], detailView: {} }, new SlickEventData(), gridStub);

        expect(onAsyncRespSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], itemDetail: columnsMock[0], detailView: {} });
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).not.toHaveBeenCalled();
        expect(onBeforeRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onAsyncEndUpdate" option to be called when addon notify is called', () => {
        // const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const renderSpy = jest.spyOn(plugin, 'renderViewModel');

        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onAsyncEndUpdate = new SlickEvent();
        plugin.register();
        plugin.onAsyncEndUpdate.notify({ item: columnsMock[0], itemDetail: columnsMock[0], grid: gridStub }, new SlickEventData(), gridStub);

        // expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
        // expect(handlerSpy).toHaveBeenCalledWith(
        //   { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        //   expect.anything()
        // );
        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], itemDetail: columnsMock[0], grid: gridStub });
        expect(renderSpy).toHaveBeenCalledWith({ cssClass: 'red', field: 'field1', id: 'field1', width: 100, });
        expect(onAfterRowSpy).not.toHaveBeenCalled();
        expect(onBeforeRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onAfterRowDetailToggle" option to be called when addon notify is called', () => {
        // const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onAfterRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.onAfterRowDetailToggle.notify({ item: columnsMock[0], expandedRows: [0], grid: gridStub }, new SlickEventData(), gridStub);

        // expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
        // expect(handlerSpy).toHaveBeenCalledWith(
        //   { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        //   expect.anything()
        // );
        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], expandedRows: [0], grid: gridStub });
        expect(onBeforeRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onBeforeRowDetailToggle" option to be called when addon notify is called', () => {
        // const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.onBeforeRowDetailToggle.notify({ item: columnsMock[0], grid: gridStub }, new SlickEventData(), gridStub);

        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).not.toHaveBeenCalled();
        expect(onBeforeRowSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], grid: gridStub });
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onRowOutOfViewportRange" option to be called when addon notify is called', () => {
        // const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onRowOutOfViewportRange = new SlickEvent();
        plugin.register();
        plugin.onRowOutOfViewportRange.notify(
          { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [0], rowIdsOutOfViewport: [], grid: gridStub },
          new SlickEventData(),
          gridStub
        );

        // expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
        // expect(handlerSpy).toHaveBeenCalledWith(
        //   { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        //   expect.anything()
        // );
        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).not.toHaveBeenCalled();
        expect(onBeforeRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [0], rowIdsOutOfViewport: [], grid: gridStub });
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onRowBackToViewportRange" option to be called when addon notify is called', () => {
        // const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onRowBackToViewportRange = new SlickEvent();
        plugin.register();
        plugin.onRowBackToViewportRange.notify(
          { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [columnsMock[0] as any], rowIdsOutOfViewport: [], grid: gridStub },
          new SlickEventData(),
          gridStub
        );

        // expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
        // expect(handlerSpy).toHaveBeenCalledWith(
        //   { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        //   expect.anything()
        // );
        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).not.toHaveBeenCalled();
        expect(onBeforeRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], rowId: 0, rowIndex: 0, expandedRows: [columnsMock[0] as any], rowIdsOutOfViewport: [], grid: gridStub });
      });

      it('should call Angular Util "createAngularComponentAppendToDom" when grid "onColumnsReordered" is triggered', (done) => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn() } } as any);

        plugin.init(gridStub);
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          gridStub.onColumnsReordered.notify({ impactedColumns: [mockColumn] } as any, new SlickEventData(), gridStub);
          expect(appendSpy).toHaveBeenCalledWith(TestComponent, expect.objectContaining({ className: 'container_field1' }), {
            model: mockColumn,
            addon: expect.anything(),
            grid: gridStub,
            dataView: undefined,
            parent: undefined,
          });
          done();
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
      });

      it('should call "redrawAllViewComponents" when using Row Selection and the event "onSelectedRowsChanged" is triggered', () => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        gridOptionsMock.enableCheckboxSelector = true;
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

        plugin.init(gridStub);
        const redrawSpy = jest.spyOn(plugin, 'redrawAllViewComponents');
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          gridStub.onSelectedRowsChanged.notify({ rows: [0], previousSelectedRows: [], grid: gridStub } as unknown as OnSelectedRowsChangedEventArgs, new SlickEventData(), gridStub);
          expect(appendSpy).toHaveBeenCalledWith(TestComponent, expect.objectContaining({ className: 'container_field1' }), {
            model: mockColumn,
            addon: expect.anything(),
            grid: gridStub,
            dataView: undefined,
            parent: undefined,
          });
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
        expect(redrawSpy).toHaveBeenCalledTimes(2);
      });

      it('should call "redrawAllViewComponents" when event "filterChanged" is triggered', () => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

        plugin.init(gridStub);
        const redrawSpy = jest.spyOn(plugin, 'redrawAllViewComponents');
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();

        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          eventPubSubService.publish('onFilterChanged', { columnId: 'field1', operator: '=', searchTerms: [] });
          expect(appendSpy).toHaveBeenCalledWith(TestComponent, expect.objectContaining({ className: 'container_field1' }), {
            model: mockColumn,
            addon: expect.anything(),
            grid: gridStub,
            dataView: undefined,
            parent: undefined,
          });
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
        expect(redrawSpy).toHaveBeenCalledTimes(2);
      });

      it('should call "redrawAllViewComponents" when event "onGridMenuClearAllFilters" is triggered', (done) => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');

        plugin.init(gridStub);
        const redrawSpy = jest.spyOn(plugin, 'redrawAllViewComponents');
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();

        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          eventPubSubService.publish('onGridMenuClearAllFilters', { columnId: 'field1', operator: '=', searchTerms: [] });
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
        setTimeout(() => {
          expect(redrawSpy).toHaveBeenCalledTimes(4);
          done();
        });
      });

      it('should call "redrawAllViewComponents" when event "onGridMenuClearAllSorting" is triggered', (done) => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');

        plugin.init(gridStub);
        const redrawSpy = jest.spyOn(plugin, 'redrawAllViewComponents');
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();

        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          eventPubSubService.publish('onGridMenuClearAllSorting', { columnId: 'field1', operator: '=', searchTerms: [] });
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
        setTimeout(() => {
          expect(redrawSpy).toHaveBeenCalledTimes(4);
          done();
        });
      });

      it('should call "renderAllViewModels" when grid event "onAfterRowDetailToggle" is triggered', () => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const getElementSpy = jest.spyOn(document.body, 'getElementsByClassName');
        const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);

        plugin.init(gridStub);
        plugin.onAfterRowDetailToggle = new SlickEvent();
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.onAfterRowDetailToggle.subscribe(() => {
          expect(getElementSpy).toHaveBeenCalledWith('container_field1');
          expect(appendSpy).toHaveBeenCalledWith(TestComponent, expect.objectContaining({ className: 'container_field1' }), {
            model: mockColumn,
            addon: expect.anything(),
            grid: gridStub,
            dataView: undefined,
            parent: undefined,
          });
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub } as any, new SlickEventData(), gridStub);
        plugin.onAfterRowDetailToggle.notify({ item: mockColumn, grid: gridStub } as any, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
      });

      it('should call "redrawViewSlot" when grid event "onRowBackToViewportRange" is triggered', () => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const getElementSpy = jest.spyOn(document.body, 'getElementsByClassName');
        const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);
        const redrawSpy = jest.spyOn(plugin, 'redrawAllViewComponents');

        plugin.init(gridStub);
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.onRowBackToViewportRange = new SlickEvent();
        plugin.register();
        plugin.onRowBackToViewportRange.subscribe(() => {
          expect(getElementSpy).toHaveBeenCalledWith('container_field1');
          expect(appendSpy).toHaveBeenCalledWith(TestComponent, expect.objectContaining({ className: 'container_field1' }), {
            model: mockColumn,
            addon: expect.anything(),
            grid: gridStub,
            dataView: undefined,
            parent: undefined,
          });
          expect(redrawSpy).toHaveBeenCalled();
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub } as any, new SlickEventData(), gridStub);
        plugin.onRowBackToViewportRange.notify({ item: mockColumn, grid: gridStub } as any, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
      });

      it('should run the internal "onProcessing" and call "notifyTemplate" with a Promise when "process" method is defined and executed', (done) => {
        const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
        gridOptionsMock.rowDetailView!.process = () => new Promise((resolve) => resolve(mockItem));

        plugin.init(gridStub);
        plugin.onAsyncResponse = new SlickEvent();
        plugin.onAsyncResponse.subscribe((_e, response) => {
          expect(response).toEqual(expect.objectContaining({ item: mockItem }));
          done();
        });

        gridOptionsMock.rowDetailView!.process(mockItem);
      });

      it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', (done) => {
        const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
        (gridOptionsMock.rowDetailView as RowDetailView).process = () => of(mockItem);

        plugin.init(gridStub);
        plugin.onAsyncResponse = new SlickEvent();
        plugin.onAsyncResponse.subscribe((_e: any, response: any) => {
          expect(response).toEqual(expect.objectContaining({ item: mockItem }));
          done();
        });

        (gridOptionsMock.rowDetailView as RowDetailView).process({ id: 'field1', field: 'field1' });
      });

      it('should define "datasetIdPropertyName" with different "id" and run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', (done) => {
        const mockItem = { rowId: 2, firstName: 'John', lastName: 'Doe' };
        (gridOptionsMock.rowDetailView as RowDetailView).process = () => of(mockItem);
        gridOptionsMock.datasetIdPropertyName = 'rowId';

        plugin.init(gridStub);
        plugin.onAsyncResponse = new SlickEvent();
        plugin.onAsyncResponse.subscribe((_e: any, response: any) => {
          expect(response).toEqual(expect.objectContaining({ item: mockItem }));
          done();
        });

        (gridOptionsMock.rowDetailView as RowDetailView).process({ rowId: 'field1', field: 'field1' });
      });

      it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', async () => {
        const mockItem = { firstName: 'John', lastName: 'Doe' };
        (gridOptionsMock.rowDetailView as RowDetailView).process = (item) => new Promise((resolve) => resolve(item));
        plugin.init(gridStub);

        try {
          await (gridOptionsMock.rowDetailView as RowDetailView).process(mockItem);
        } catch (e: any) {
          expect(e.toString()).toContain(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback`);
        }
      });

      it('should throw an error when running the "process" that does not return an object with an "id" property', async () => {
        const mockItem = { firstName: 'John', lastName: 'Doe' };
        gridOptionsMock.rowDetailView!.process = (item) => new Promise((resolve) => resolve(item));
        plugin.init(gridStub);

        try {
          await gridOptionsMock.rowDetailView!.process(mockItem);
        } catch (e: any) {
          expect(e.toString()).toContain(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback`);
        }
      });

      it('should call Angular Util "disposeAllViewComponents" when grid "onSort" is triggered', (done) => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        // const appendSpy = jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: jest.fn(), destroy: jest.fn() } } as any);
        jest.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { plugin: {} } } as any);
        const handlerSpy = jest.spyOn(plugin.eventHandler, 'subscribe');
        const disposeSpy = jest.spyOn(plugin, 'disposeAllViewComponents');

        plugin.init(gridStub);
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          gridStub.onSort.notify({ impactedColumns: [mockColumn] } as any, new SlickEventData(), gridStub);
          expect(disposeSpy).toHaveBeenCalled();
          done();
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
      });

      it('should dispose of the addon', () => {
        plugin.init(gridStub);
        const disposeSpy = jest.spyOn(plugin, 'dispose');
        const disposeAllSpy = jest.spyOn(plugin, 'disposeAllViewComponents');

        plugin.dispose();

        expect(disposeSpy).toHaveBeenCalled();
        expect(disposeAllSpy).toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onBeforeRowDetailToggle" option to be called and return true when addon notify is called', () => {
        gridOptionsMock.rowDetailView!.onBeforeRowDetailToggle = undefined;
        const onAsyncRespSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        // const onBeforeRowSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = jest.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

        plugin.init(gridStub);
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();
        const result = plugin.onBeforeRowDetailToggle.notify({ item: columnsMock[0], grid: gridStub }, new SlickEventData(), gridStub);

        expect(result.getReturnValue()).toEqual(true);
        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });
    });

    describe('possible error thrown', () => {
      it('should throw an error when creating with "init" and the row detail is without a "process" method defined', () => {
        const copyGridOptionsMock = { ...gridOptionsMock };
        copyGridOptionsMock.rowDetailView!.process = undefined as any;
        jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

        expect(() => plugin.init(gridStub)).toThrowError(`[Angular-Slickgrid] You need to provide a "process" function for the Row Detail Extension to work properly`);
      });

      it('should throw an error when creating with "register" and the row detail is without a "process" method defined', () => {
        const copyGridOptionsMock = { ...gridOptionsMock };
        copyGridOptionsMock.rowDetailView!.process = undefined as any;
        jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

        expect(() => plugin.register()).toThrowError(`[Angular-Slickgrid] You need to provide a "process" function for the Row Detail Extension to work properly`);
      });
    });
  });
});