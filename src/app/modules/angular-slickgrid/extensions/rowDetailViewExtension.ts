import 'slickgrid/plugins/slick.rowdetailview';
import 'slickgrid/plugins/slick.rowselectionmodel';

import { ApplicationRef, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import {
  addToArrayWhenNotExists,
  castObservableToPromise,
  Column,
  RowDetailViewExtension as UniversalRowDetailViewExtension,
  RxJsFacade,
  SharedService,
  SlickEventHandler,
  SlickGrid,
  SlickNamespace,
  SlickRowDetailView,
} from '@slickgrid-universal/common';
import { EventPubSubService } from '@slickgrid-universal/event-pub-sub';
import { Observable, Subject, Subscription } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

import { GridOption, RowDetailView } from '../models/index';
import { AngularUtilService } from '../services/angularUtil.service';
import { unsubscribeAllObservables } from '../services/utilities';

// using external non-typed js libraries
declare const Slick: SlickNamespace;

const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

export interface CreatedView {
  id: string | number;
  dataContext: any;
  componentRef?: ComponentRef<any>;
}

@Injectable()
export class RowDetailViewExtension implements UniversalRowDetailViewExtension {
  rowDetailContainer!: ViewContainerRef;
  private _addon: any;
  private _addonOptions!: RowDetailView | null;
  private _eventHandler: SlickEventHandler;
  private _preloadComponent: Type<object> | undefined;
  private _views: CreatedView[] = [];
  private _viewComponent!: Type<object>;
  private _subscriptions: Subscription[] = [];
  private _userProcessFn!: (item: any) => Promise<any> | Observable<any> | Subject<any>;

  constructor(
    private readonly angularUtilService: AngularUtilService,
    private readonly appRef: ApplicationRef,
    private readonly eventPubSubService: EventPubSubService,
    private readonly sharedService: SharedService,
    private rxjs?: RxJsFacade,
  ) {
    this._eventHandler = new Slick.EventHandler();
  }

  private get datasetIdPropName(): string {
    return this.gridOptions.datasetIdPropertyName || 'id';
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  get gridOptions(): GridOption {
    return (this.sharedService?.gridOptions ?? {}) as GridOption;
  }

  get rowDetailViewOptions(): RowDetailView | undefined {
    return this.gridOptions.rowDetailView;
  }

  addRxJsResource(rxjs: RxJsFacade) {
    this.rxjs = rxjs;
  }

  /** Dispose of the RowDetailView Extension */
  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
    this._addonOptions = null;

    // also unsubscribe all RxJS subscriptions
    this._subscriptions = unsubscribeAllObservables(this._subscriptions);
    this.disposeAllViewComponents();
  }

  /** Dispose of all the opened Row Detail Panels Angular View Components */
  disposeAllViewComponents() {
    this._views.forEach((compRef) => this.disposeViewComponent(compRef));
    this._views = [];
  }

  /**
   * Create the plugin before the Grid creation, else it will behave oddly.
   * Mostly because the column definitions might change after the grid creation
   */
  create(columnDefinitions: Column[], gridOptions: GridOption): SlickRowDetailView | null {
    if (columnDefinitions && gridOptions) {
      if (!gridOptions.rowDetailView) {
        throw new Error('The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options');
      }

      if (gridOptions?.rowDetailView) {
        if (!this._addon) {
          if (typeof gridOptions.rowDetailView.process === 'function') {
            // we need to keep the user "process" method and replace it with our own execution method
            // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
            this._userProcessFn = gridOptions.rowDetailView.process as (item: any) => Observable<any>;                // keep user's process method
            gridOptions.rowDetailView.process = (item) => this.onProcessing(item);  // replace process method & run our internal one
          } else {
            throw new Error('You need to provide a "process" function for the Row Detail Extension to work properly');
          }

          // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
          // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
          if (!gridOptions.rowDetailView.preTemplate) {
            this._preloadComponent = gridOptions?.rowDetailView?.preloadComponent;
            gridOptions.rowDetailView.preTemplate = () => DOMPurify.sanitize(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
          }
          if (!gridOptions.rowDetailView.postTemplate) {
            this._viewComponent = gridOptions?.rowDetailView?.viewComponent;
            gridOptions.rowDetailView.postTemplate = (itemDetail: any) => DOMPurify.sanitize(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}${itemDetail[this.datasetIdPropName]}"></div>`);
          }

          // finally register the Row Detail View Plugin
          this._addonOptions = gridOptions.rowDetailView;
          this._addon = new Slick.Plugins.RowDetailView(this._addonOptions);
        }
        const iconColumn: Column = this._addon.getColumnDefinition();
        if (typeof iconColumn === 'object') {
          iconColumn.excludeFromExport = true;
          iconColumn.excludeFromColumnPicker = true;
          iconColumn.excludeFromGridMenu = true;
          iconColumn.excludeFromQuery = true;
          iconColumn.excludeFromHeaderMenu = true;

          // column index position in the grid
          const columnPosition = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.columnIndexPosition || 0;
          if (columnPosition > 0) {
            columnDefinitions.splice(columnPosition, 0, iconColumn);
          } else {
            columnDefinitions.unshift(iconColumn);
          }
        }
      }
      return this._addon;
    }
    return null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(rowSelectionPlugin?: any) {
    if (this.sharedService?.slickGrid && this.sharedService.gridOptions) {
      // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      this.sharedService.slickGrid.registerPlugin(this._addon);

      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.slickGrid.getSelectionModel()) {
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || { selectActiveRow: true });
        this.sharedService.slickGrid.setSelectionModel(rowSelectionPlugin);
      }

      // hook all events
      if (this.sharedService.slickGrid && this.rowDetailViewOptions) {
        if (this.rowDetailViewOptions.onExtensionRegistered) {
          this.rowDetailViewOptions.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onAsyncResponse, (e: any, args: { item: any; detailView: RowDetailView }) => {
          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAsyncResponse === 'function') {
            this.rowDetailViewOptions.onAsyncResponse(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onAsyncEndUpdate, (e: any, args: { grid: SlickGrid; item: any; }) => {
          // triggers after backend called "onAsyncResponse.notify()"
          this.renderViewModel(args && args.item);

          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAsyncEndUpdate === 'function') {
            this.rowDetailViewOptions.onAsyncEndUpdate(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onAfterRowDetailToggle, (e: any, args: { grid: SlickGrid; item: any; expandedRows: number[]; }) => {
          // display preload template & re-render all the other Detail Views after toggling
          // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
          this.renderPreloadView();
          this.renderAllViewComponents();

          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAfterRowDetailToggle === 'function') {
            this.rowDetailViewOptions.onAfterRowDetailToggle(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onBeforeRowDetailToggle, (e: any, args: { grid: SlickGrid; item: any; }) => {
          // before toggling row detail, we need to create View Component if it doesn't exist
          this.onBeforeRowDetailToggle(e, args);

          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onBeforeRowDetailToggle === 'function') {
            this.rowDetailViewOptions.onBeforeRowDetailToggle(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onRowBackToViewportRange, (e: any, args: { grid: SlickGrid; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
          // when row is back to viewport range, we will re-render the View Component(s)
          this.onRowBackToViewportRange(e, args);

          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onRowBackToViewportRange === 'function') {
            this.rowDetailViewOptions.onRowBackToViewportRange(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onRowOutOfViewportRange, (e: any, args: { grid: SlickGrid; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onRowOutOfViewportRange === 'function') {
            this.rowDetailViewOptions.onRowOutOfViewportRange(e, args);
          }
        });

        // --
        // hook some events needed by the Plugin itself

        // we need to redraw the open detail views if we change column position (column reorder)
        this._eventHandler.subscribe(this.sharedService.slickGrid.onColumnsReordered, this.redrawAllViewComponents.bind(this));

        // on row selection changed, we also need to redraw
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
          this._eventHandler.subscribe(this.sharedService.slickGrid.onSelectedRowsChanged, this.redrawAllViewComponents.bind(this));
        }

        // on sort, all row detail are collapsed so we can dispose of all the Views as well
        this._eventHandler.subscribe(this.sharedService.slickGrid.onSort, this.disposeAllViewComponents.bind(this));

        // on filter changed, we need to re-render all Views
        this._subscriptions.push(
          this.eventPubSubService.subscribe('onFilterChanged', this.redrawAllViewComponents.bind(this))
        );
      }
      return this._addon;
    }
    return null;
  }

  /** Redraw (re-render) all the expanded row detail View Components */
  redrawAllViewComponents() {
    this._views.forEach((compRef) => {
      this.redrawViewComponent(compRef);
    });
  }

  /** Render all the expanded row detail View Components */
  renderAllViewComponents() {
    this._views.forEach((view) => {
      if (view && view.dataContext) {
        this.renderViewModel(view.dataContext);
      }
    });
  }

  /** Redraw the necessary View Component */
  redrawViewComponent(createdView: CreatedView) {
    const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${createdView.id}`);
    if (containerElements && containerElements.length >= 0) {
      this.renderViewModel(createdView.dataContext);
    }
  }

  /** Render (or re-render) the View Component (Row Detail) */
  renderPreloadView() {
    const containerElements = document.getElementsByClassName(`${PRELOAD_CONTAINER_PREFIX}`);
    if (containerElements && containerElements.length >= 0) {
      this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[containerElements.length - 1], true);
    }
  }

  /** Render (or re-render) the View Component (Row Detail) */
  renderViewModel(item: any): CreatedView | undefined {
    const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${item[this.datasetIdPropName]}`);
    if (containerElements && containerElements.length > 0) {
      const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[containerElements.length - 1], true);
      if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
        // pass a few properties to the Row Detail template component
        Object.assign(componentOutput.componentRef.instance, {
          model: item,
          addon: this._addon,
          grid: this.sharedService.slickGrid,
          dataView: this.sharedService.dataView,
          parent: this.rowDetailViewOptions && this.rowDetailViewOptions.parent,
        });

        const viewObj = this._views.find(obj => obj.id === item[this.datasetIdPropName]);
        if (viewObj) {
          viewObj.componentRef = componentOutput.componentRef;
        }
        return viewObj;
      }
    }
    return undefined;
  }

  // --
  // private functions
  // ------------------

  private disposeViewComponent(expandedView: CreatedView) {
    const compRef = expandedView?.componentRef;
    if (compRef) {
      this.appRef.detachView(compRef.hostView);
      if (compRef?.destroy) {
        compRef.destroy();
      }
      return expandedView;
    }
    return null;
  }

  /**
   * notify the onAsyncResponse with the "args.item" (required property)
   * the plugin will then use item to populate the row detail panel with the "postTemplate"
   * @param item
   */
  private notifyTemplate(item: any) {
    if (this._addon) {
      this._addon.onAsyncResponse.notify({ item }, undefined, this);
    }
  }

  /**
   * On Processing, we will notify the plugin with the new item detail once backend server call completes
   * @param item
   */
  private async onProcessing(item: any) {
    if (item && typeof this._userProcessFn === 'function') {
      let awaitedItemDetail: any;
      const userProcessFn = this._userProcessFn(item);

      // wait for the "userProcessFn", once resolved we will save it into the "collection"
      const response: any | any[] = await userProcessFn;

      if (response.hasOwnProperty(this.datasetIdPropName)) {
        awaitedItemDetail = response; // from Promise
      } else if (response && response instanceof Observable || response instanceof Promise) {
        awaitedItemDetail = await castObservableToPromise(this.rxjs as RxJsFacade, response); // from Angular-http-client
      }

      if (!awaitedItemDetail || !awaitedItemDetail.hasOwnProperty(this.datasetIdPropName)) {
        throw new Error(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback
          (a Promise or an HttpClient call returning an Observable) returns an item object that has an "${this.datasetIdPropName}" property`);
      }

      // notify the plugin with the new item details
      this.notifyTemplate(awaitedItemDetail || {});
    }
  }

  /**
   * Just before the row get expanded or collapsed we will do the following
   * First determine if the row is expanding or collapsing,
   * if it's expanding we will add it to our View Components reference array if we don't already have it
   * or if it's collapsing we will remove it from our View Components reference array
   */
  private onBeforeRowDetailToggle(e: Event, args: { grid: SlickGrid; item: any; }) {
    // expanding
    if (args && args.item && args.item.__collapsed) {
      // expanding row detail
      const viewInfo: CreatedView = {
        id: args.item[this.datasetIdPropName],
        dataContext: args.item
      };
      const idPropName = this.gridOptions.datasetIdPropertyName || 'id';
      addToArrayWhenNotExists(this._views, viewInfo, idPropName);
    } else {
      // collapsing, so dispose of the View/Component
      const foundViewIndex = this._views.findIndex((view: CreatedView) => view.id === args.item[this.datasetIdPropName]);
      if (foundViewIndex >= 0 && this._views.hasOwnProperty(foundViewIndex)) {
        const compRef = this._views[foundViewIndex].componentRef;
        if (compRef) {
          this.appRef.detachView(compRef.hostView);
          compRef.destroy();
        }
        this._views.splice(foundViewIndex, 1);
      }
    }
  }

  /** When Row comes back to Viewport Range, we need to redraw the View */
  private onRowBackToViewportRange(e: Event, args: { grid: SlickGrid; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) {
    if (args && args.item) {
      this._views.forEach((view) => {
        if (view.id === args.item[this.datasetIdPropName]) {
          this.redrawViewComponent(view);
        }
      });
    }
  }
}
