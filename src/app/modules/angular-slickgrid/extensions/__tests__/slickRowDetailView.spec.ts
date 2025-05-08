import { ApplicationRef, Component } from '@angular/core';
import {
  Column,
  OnSelectedRowsChangedEventArgs,
  SlickEvent,
  SlickEventData,
  SlickEventHandler,
  SlickGrid,
  SlickRowSelectionModel,
} from '@slickgrid-universal/common';
import { EventPubSubService } from '@slickgrid-universal/event-pub-sub';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';

import { GridOption } from '../../models/gridOption.interface';
import { AngularUtilService } from '../../services';
import { RowDetailView } from '../../models/rowDetailView.interface';
import { RxJsResourceStub } from '../../../../../../test/rxjsResourceStub';
import { SlickRowDetailView } from '../slickRowDetailView';

vi.mock('@slickgrid-universal/common', async () => ({
  ...((await vi.importActual('@slickgrid-universal/common')) as any),
  SlickRowSelectionModel: vi.fn().mockImplementation(() => ({
    constructor: vi.fn(),
    init: vi.fn(),
    destroy: vi.fn(),
    dispose: vi.fn(),
    getSelectedRows: vi.fn(),
    setSelectedRows: vi.fn(),
    getSelectedRanges: vi.fn(),
    setSelectedRanges: vi.fn(),
    onSelectedRangesChanged: new SlickEvent(),
  })),
}));

vi.mock('@slickgrid-universal/row-detail-view-plugin', async () => ({
  ...((await vi.importActual('@slickgrid-universal/row-detail-view-plugin')) as any),
  onAsyncResponse: new SlickEvent(),
  onAsyncEndUpdate: new SlickEvent(),
  onAfterRowDetailToggle: new SlickEvent(),
  onBeforeRowDetailToggle: new SlickEvent(),
  onRowOutOfViewportRange: new SlickEvent(),
  onRowBackToViewportRange: new SlickEvent(),
}));

const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

const applicationRefStub = {
  detachView: vi.fn(),
} as unknown as ApplicationRef;

const angularUtilServiceStub = {
  createAngularComponent: vi.fn(),
  createAngularComponentAppendToDom: vi.fn(),
} as unknown as AngularUtilService;

const gridOptionsMock = {
  enableRowDetailView: true,
  rowDetailView: {
    cssClass: 'detail-view-toggle',
    panelRows: 1,
    keyPrefix: '__',
    useRowClick: true,
    saveDetailViewOnScroll: false,
    process: () => new Promise((resolve) => resolve('process resolved')),
    viewComponent: null as any,
    onExtensionRegistered: vi.fn(),
    onAsyncResponse: () => {},
    onAsyncEndUpdate: () => {},
    onAfterRowDetailToggle: () => {},
    onBeforeRowDetailToggle: () => {},
    onRowOutOfViewportRange: () => {},
    onRowBackToViewportRange: () => {},
  },
} as unknown as GridOption;

const dataViewStub = {
  constructor: vi.fn(),
  init: vi.fn(),
  destroy: vi.fn(),
  beginUpdate: vi.fn(),
  endUpdate: vi.fn(),
  getItem: vi.fn(),
  getItems: vi.fn(),
  getItemCount: vi.fn(),
  onRowCountChanged: new SlickEvent(),
  onRowsChanged: new SlickEvent(),
  onSetItemsCalled: new SlickEvent(),
};

const gridStub = {
  getData: () => dataViewStub,
  getUID: vi.fn(),
  getOptions: () => gridOptionsMock,
  getSelectionModel: vi.fn(),
  setSelectionModel: vi.fn(),
  sanitizeHtmlString: (s: string) => s,
  onColumnsReordered: new SlickEvent(),
  onSelectedRowsChanged: new SlickEvent(),
  onBeforeEditCell: new SlickEvent(),
  onBeforeRemoveCachedRow: new SlickEvent(),
  onClick: new SlickEvent(),
  onScroll: new SlickEvent(),
  onSort: new SlickEvent(),
} as unknown as SlickGrid;

@Component({ template: `<h4>Loading...</h4>` })
class TestPreloadComponent {}

@Component({ template: `<h1>Some Title</h1>` })
class TestComponent {}

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
    vi.spyOn(plugin, 'eventHandler', 'get').mockReturnValue(eventHandler);
    vi.spyOn(plugin, 'getOptions').mockReturnValue(gridOptionsMock.rowDetailView as RowDetailView);
  });

  afterEach(() => {
    eventHandler.unsubscribeAll();
    vi.clearAllMocks();
  });

  it('should create the RowDetailView plugin', () => {
    expect(plugin).toBeTruthy();
  });

  it('should expect "getOptions" to be called when calling addonOptions GETTER', () => {
    const getOptionSpy = vi.spyOn(plugin, 'getOptions').mockReturnValue({ cssClass: 'some-class' } as any);

    const options = plugin.addonOptions;

    expect(options).toEqual({ cssClass: 'some-class' });
    expect(getOptionSpy).toHaveBeenCalled();
  });

  describe('registered plugin', () => {
    beforeEach(() => {
      gridOptionsMock.datasetIdPropertyName = 'id';
      vi.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
    });

    afterEach(() => {
      vi.clearAllMocks();
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
      vi.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      plugin.init(gridStub);
      const output = (await (gridOptionsMock.rowDetailView as RowDetailView).preTemplate!()) as HTMLElement;

      expect(output.outerHTML).toEqual(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
    });

    it('should provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestComponent;
      vi.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      const output = (await gridOptionsMock.rowDetailView!.postTemplate!({ id: 'field1', field: 'field1' })) as HTMLElement;
      expect(output.outerHTML).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
    });

    it('should define "datasetIdPropertyName" with different "id" and provide a sanitized "postTemplate" when only a "viewComponent" is provided (meaning no "postTemplate" is originally provided)', async () => {
      (gridOptionsMock.rowDetailView as RowDetailView).viewComponent = TestComponent;
      gridOptionsMock.datasetIdPropertyName = 'rowId';
      const output = (await gridOptionsMock.rowDetailView!.postTemplate!({ rowId: 'field1', field: 'field1' })) as HTMLElement;
      expect(output.outerHTML).toEqual(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}field1"></div>`);
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
        vi.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);
        vi.clearAllMocks();
        gridStub.onColumnsReordered = new SlickEvent();
        gridStub.onSort = new SlickEvent();
      });

      afterEach(() => {
        plugin?.eventHandler?.unsubscribeAll();
        plugin?.dispose();
        vi.clearAllMocks();
        (plugin.onAsyncResponse as any) = null;
        (plugin.onAsyncEndUpdate as any) = null;
        (plugin.onAfterRowDetailToggle as any) = null;
        (plugin.onBeforeRowDetailToggle as any) = null;
        (plugin.onRowBackToViewportRange as any) = null;
        (plugin.onRowOutOfViewportRange as any) = null;
      });

      it('should register the addon', () => {
        const copyGridOptionsMock = { ...gridOptionsMock };
        gridOptionsMock.rowDetailView!.onExtensionRegistered = vi.fn();
        vi.spyOn(gridStub, 'getOptions').mockReturnValue(copyGridOptionsMock);
        const onRegisteredSpy = vi.spyOn(copyGridOptionsMock.rowDetailView!, 'onExtensionRegistered');

        plugin.init(gridStub);
        const instance = plugin.register();
        const addonInstance = plugin.getAddonInstance();

        expect(instance).toBeTruthy();
        expect(instance).toEqual(addonInstance);
        expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
        expect(SlickRowSelectionModel).toHaveBeenCalledWith({ selectActiveRow: true });
      });

      it('should call internal event handler subscribe and expect the "onAsyncResponse" option to be called when addon notify is called', () => {
        const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

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

      it('should call internal event handler subscribe and expect the "onAsyncEndUpdate" option to be called when addon notify is called', () =>
        new Promise((done: any) => {
          // const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
          const renderSpy = vi.spyOn(plugin, 'renderViewModel');

          const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
          const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
          const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
          const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
          const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
          const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

          plugin.init(gridStub);
          plugin.onAsyncEndUpdate = new SlickEvent();
          plugin.register();
          plugin.onAsyncEndUpdate.notify({ item: columnsMock[0], itemDetail: columnsMock[0], grid: gridStub }, new SlickEventData(), gridStub);

          // expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
          // expect(handlerSpy).toHaveBeenCalledWith(
          //   { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
          //   expect.anything()
          // );
          setTimeout(() => {
            expect(onAsyncRespSpy).not.toHaveBeenCalled();
            expect(onAsyncEndSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], itemDetail: columnsMock[0], grid: gridStub });
            expect(renderSpy).toHaveBeenCalledWith({ cssClass: 'red', field: 'field1', id: 'field1', width: 100 });
            expect(onAfterRowSpy).not.toHaveBeenCalled();
            expect(onBeforeRowSpy).not.toHaveBeenCalled();
            expect(onRowOutViewSpy).not.toHaveBeenCalled();
            expect(onRowBackViewSpy).not.toHaveBeenCalled();
            done();
          });
        }));

      it('should call internal event handler subscribe and expect the "onAfterRowDetailToggle" option to be called when addon notify is called', () => {
        // const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');
        const appendSpy = vi.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: vi.fn() } } as any);

        plugin.init(gridStub);
        plugin.onAfterRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.onAfterRowDetailToggle.notify({ item: columnsMock[0], expandedRows: [0], grid: gridStub }, new SlickEventData(), gridStub);

        // expect(handlerSpy).toHaveBeenCalledTimes(8); // there are an extra 2x on the grid itself
        // expect(handlerSpy).toHaveBeenCalledWith(
        //   { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        //   expect.anything()
        // );
        expect(appendSpy).toHaveBeenCalled();
        expect(onAsyncRespSpy).not.toHaveBeenCalled();
        expect(onAsyncEndSpy).not.toHaveBeenCalled();
        expect(onAfterRowSpy).toHaveBeenCalledWith(expect.anything(), { item: columnsMock[0], expandedRows: [0], grid: gridStub });
        expect(onBeforeRowSpy).not.toHaveBeenCalled();
        expect(onRowOutViewSpy).not.toHaveBeenCalled();
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onBeforeRowDetailToggle" option to be called when addon notify is called', () => {
        // const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

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
        // const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

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
        expect(onRowOutViewSpy).toHaveBeenCalledWith(expect.anything(), {
          item: columnsMock[0],
          rowId: 0,
          rowIndex: 0,
          expandedRows: [0],
          rowIdsOutOfViewport: [],
          grid: gridStub,
        });
        expect(onRowBackViewSpy).not.toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onRowBackToViewportRange" option to be called when addon notify is called', () => {
        // const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
        const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

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
        expect(onRowBackViewSpy).toHaveBeenCalledWith(expect.anything(), {
          item: columnsMock[0],
          rowId: 0,
          rowIndex: 0,
          expandedRows: [columnsMock[0] as any],
          rowIdsOutOfViewport: [],
          grid: gridStub,
        });
      });

      it('should call Angular Util "createAngularComponentAppendToDom" when grid "onColumnsReordered" is triggered', () =>
        new Promise((done: any) => {
          const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
          const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
          const appendSpy = vi
            .spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom')
            .mockReturnValue({ componentRef: { instance: vi.fn(), destroy: vi.fn() } } as any);

          plugin.init(gridStub);
          plugin.onBeforeRowDetailToggle = new SlickEvent();
          plugin.register();
          plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
            gridStub.onColumnsReordered.notify({ impactedColumns: [mockColumn] } as any, new SlickEventData(), gridStub);
            expect(appendSpy).toHaveBeenCalledWith(
              TestComponent,
              expect.objectContaining({ className: 'container_field1' }),
              {
                model: mockColumn,
                addon: expect.anything(),
                grid: gridStub,
                dataView: dataViewStub,
                parent: undefined,
              },
              { sanitizer: expect.any(Function) }
            );
            done();
          });
          plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);

          expect(handlerSpy).toHaveBeenCalled();
        }));

      it('should call "redrawAllViewComponents" when using Row Selection and the event "onSelectedRowsChanged" is triggered', () => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        gridOptionsMock.enableCheckboxSelector = true;
        const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
        const appendSpy = vi
          .spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom')
          .mockReturnValue({ componentRef: { instance: vi.fn(), destroy: vi.fn() } } as any);

        plugin.init(gridStub);
        const redrawSpy = vi.spyOn(plugin, 'redrawAllViewComponents');
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.register();
        plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
          gridStub.onSelectedRowsChanged.notify(
            { rows: [0], previousSelectedRows: [], grid: gridStub } as unknown as OnSelectedRowsChangedEventArgs,
            new SlickEventData(),
            gridStub
          );
          expect(appendSpy).toHaveBeenCalledWith(
            TestComponent,
            expect.objectContaining({ className: 'container_field1' }),
            {
              model: mockColumn,
              addon: expect.anything(),
              grid: gridStub,
              dataView: dataViewStub,
              parent: undefined,
            },
            { sanitizer: expect.any(Function) }
          );
        });
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);

        expect(handlerSpy).toHaveBeenCalled();
        expect(redrawSpy).toHaveBeenCalledTimes(2);
      });

      for (const eventName of ['onFilterChanged', 'onGridMenuColumnsChanged', 'onColumnPickerColumnsChanged']) {
        it(`should call "redrawAllViewComponents" when event ${eventName} is triggered`, () => {
          const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
          const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
          const appendSpy = vi
            .spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom')
            .mockReturnValue({ componentRef: { instance: vi.fn(), destroy: vi.fn() } } as any);

          plugin.init(gridStub);
          const redrawSpy = vi.spyOn(plugin, 'redrawAllViewComponents');
          plugin.onBeforeRowDetailToggle = new SlickEvent();
          plugin.register();

          plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
            eventPubSubService.publish(eventName, { columnId: 'field1', operator: '=', searchTerms: [] });
            expect(appendSpy).toHaveBeenCalledWith(
              TestComponent,
              expect.objectContaining({ className: 'container_field1' }),
              {
                model: mockColumn,
                addon: expect.anything(),
                grid: gridStub,
                dataView: dataViewStub,
                parent: undefined,
              },
              { sanitizer: expect.any(Function) }
            );
          });
          plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
          plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);

          expect(handlerSpy).toHaveBeenCalled();
          expect(redrawSpy).toHaveBeenCalledTimes(2);
        });
      }

      it('should call "redrawAllViewComponents" when event "onGridMenuClearAllFilters" is triggered', () =>
        new Promise((done: any) => {
          const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
          const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');

          plugin.init(gridStub);
          const redrawSpy = vi.spyOn(plugin, 'redrawAllViewComponents');
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
        }));

      it('should call "redrawAllViewComponents" when event "onGridMenuClearAllSorting" is triggered', () =>
        new Promise((done: any) => {
          const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
          const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');

          plugin.init(gridStub);
          const redrawSpy = vi.spyOn(plugin, 'redrawAllViewComponents');
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
        }));

      it('should call "redrawViewComponent" when grid event "onRowBackToViewportRange" is triggered', () => {
        const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
        const redrawSpy = vi.spyOn(plugin, 'redrawViewComponent');

        plugin.init(gridStub);
        plugin.onBeforeRowDetailToggle = new SlickEvent();
        plugin.onRowBackToViewportRange = new SlickEvent();
        plugin.register();
        plugin.onBeforeRowDetailToggle.notify({ item: { ...mockColumn, __collapsed: false }, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);
        plugin.onRowBackToViewportRange.notify({ item: mockColumn, grid: gridStub, rowId: 'field1' } as any, new SlickEventData(), gridStub);

        expect(redrawSpy).toHaveBeenCalled();
      });

      it('should run the internal "onProcessing" and call "notifyTemplate" with a Promise when "process" method is defined and executed', () =>
        new Promise((done: any) => {
          const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
          gridOptionsMock.rowDetailView!.process = () => new Promise((resolve) => resolve(mockItem));

          plugin.init(gridStub);
          plugin.onAsyncResponse = new SlickEvent();
          plugin.onAsyncResponse.subscribe((_e, response) => {
            expect(response).toEqual(expect.objectContaining({ item: mockItem }));
            done();
          });

          gridOptionsMock.rowDetailView!.process(mockItem);
        }));

      it('should run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', () =>
        new Promise((done: any) => {
          const mockItem = { id: 2, firstName: 'John', lastName: 'Doe' };
          (gridOptionsMock.rowDetailView as RowDetailView).process = () => of(mockItem);

          plugin.init(gridStub);
          plugin.onAsyncResponse = new SlickEvent();
          plugin.onAsyncResponse.subscribe((_e: any, response: any) => {
            expect(response).toEqual(expect.objectContaining({ item: mockItem }));
            done();
          });

          (gridOptionsMock.rowDetailView as RowDetailView).process({ id: 'field1', field: 'field1' });
        }));

      it('should define "datasetIdPropertyName" with different "id" and run the internal "onProcessing" and call "notifyTemplate" with an Object to simular HttpClient call when "process" method is defined and executed', () =>
        new Promise((done: any) => {
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
        }));

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

      it('should call Angular Util "disposeAllViewComponents" when grid "onSort" is triggered', () =>
        new Promise((done: any) => {
          const mockColumn = { id: 'field1', field: 'field1', width: 100, cssClass: 'red', __collapsed: true };
          // const appendSpy = vi.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { instance: vi.fn(), destroy: vi.fn() } } as any);
          vi.spyOn(angularUtilServiceStub, 'createAngularComponentAppendToDom').mockReturnValue({ componentRef: { plugin: {} } } as any);
          const handlerSpy = vi.spyOn(plugin.eventHandler, 'subscribe');
          const disposeSpy = vi.spyOn(plugin, 'disposeAllViewComponents');

          plugin.init(gridStub);
          plugin.onBeforeRowDetailToggle = new SlickEvent();
          plugin.eventHandler.subscribe(plugin.onBeforeRowDetailToggle, () => {
            gridStub.onSort.notify({ impactedColumns: [mockColumn] } as any, new SlickEventData(), gridStub);
            expect(disposeSpy).toHaveBeenCalled();
            done();
          });
          plugin.onBeforeRowDetailToggle.notify({ item: mockColumn, grid: gridStub }, new SlickEventData(), gridStub);

          expect(handlerSpy).toHaveBeenCalled();
        }));

      it('should dispose of the addon', () => {
        plugin.init(gridStub);
        const disposeSpy = vi.spyOn(plugin, 'dispose');
        const disposeAllSpy = vi.spyOn(plugin, 'disposeAllViewComponents');

        plugin.dispose();

        expect(disposeSpy).toHaveBeenCalled();
        expect(disposeAllSpy).toHaveBeenCalled();
      });

      it('should call internal event handler subscribe and expect the "onBeforeRowDetailToggle" option to be called and return true when addon notify is called', () => {
        gridOptionsMock.rowDetailView!.onBeforeRowDetailToggle = undefined;
        const onAsyncRespSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncResponse');
        const onAsyncEndSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAsyncEndUpdate');
        const onAfterRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onAfterRowDetailToggle');
        // const onBeforeRowSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onBeforeRowDetailToggle');
        const onRowOutViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowOutOfViewportRange');
        const onRowBackViewSpy = vi.spyOn(gridOptionsMock.rowDetailView as RowDetailView, 'onRowBackToViewportRange');

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

      it('should call internal event handler subscribe and expect the "onBeforeRowOutOfViewportRange" callback to be called', () => {
        const onBeforeSpy = vi.fn();
        gridOptionsMock.rowDetailView!.onBeforeRowOutOfViewportRange = onBeforeSpy;

        plugin.init(gridStub);
        plugin.onBeforeRowOutOfViewportRange = new SlickEvent();
        plugin.register();
        plugin.onBeforeRowOutOfViewportRange.notify({ item: columnsMock[0], rowId: columnsMock[0].id, grid: gridStub } as any, new SlickEventData(), gridStub);

        expect(onBeforeSpy).toHaveBeenCalled();
      });
    });

    describe('possible error thrown', () => {
      it('should throw an error when creating with "init" and the row detail is without a "process" method defined', () => {
        const copyGridOptionsMock = { ...gridOptionsMock };
        copyGridOptionsMock.rowDetailView!.process = undefined as any;
        vi.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

        expect(() => plugin.init(gridStub)).toThrowError(
          `[Angular-Slickgrid] You need to provide a "process" function for the Row Detail Extension to work properly`
        );
      });

      it('should throw an error when creating with "register" and the row detail is without a "process" method defined', () => {
        const copyGridOptionsMock = { ...gridOptionsMock };
        copyGridOptionsMock.rowDetailView!.process = undefined as any;
        vi.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

        expect(() => plugin.register()).toThrowError(
          `[Angular-Slickgrid] You need to provide a "process" function for the Row Detail Extension to work properly`
        );
      });
    });
  });
});
