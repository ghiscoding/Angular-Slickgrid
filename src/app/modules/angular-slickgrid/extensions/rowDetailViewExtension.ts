import { ApplicationRef, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Column, Extension, ExtensionName, GridOption, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { AngularUtilService } from '../services/angularUtil.service';
import { FilterService } from '../services/filter.service';
import { SharedService } from '../services/shared.service';
import { addToArrayWhenNotExists, castToPromise, unsubscribeAllObservables } from '../services/utilities';
import { Observable, Subject, Subscription } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

// using external non-typed js libraries
declare var Slick: any;

const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

export interface CreatedView {
  id: string | number;
  dataContext: any;
  componentRef?: ComponentRef<any>;
}

@Injectable()
export class RowDetailViewExtension implements Extension {
  rowDetailContainer: ViewContainerRef;
  private _addon: any;
  private _eventHandler: SlickEventHandler;
  private _preloadComponent: Type<object>;
  private _views: CreatedView[] = [];
  private _viewComponent: Type<object>;
  private _subscriptions: Subscription[] = [];
  private _userProcessFn: (item: any) => Promise<any> | Observable<any> | Subject<any>;

  constructor(
    private angularUtilService: AngularUtilService,
    private appRef: ApplicationRef,
    private extensionUtility: ExtensionUtility,
    private filterService: FilterService,
    private sharedService: SharedService,
  ) {
    this._eventHandler = new Slick.EventHandler();
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  /** Dispose of the RowDetailView Extension */
  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }

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
  create(columnDefinitions: Column[], gridOptions: GridOption) {
    if (columnDefinitions && gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.rowDetailView);

      if (!gridOptions.rowDetailView) {
        throw new Error('The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options');
      }

      if (gridOptions && gridOptions.rowDetailView) {
        if (!this._addon) {
          if (typeof gridOptions.rowDetailView.process === 'function') {
            // we need to keep the user "process" method and replace it with our own execution method
            // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
            this._userProcessFn = gridOptions.rowDetailView.process;                // keep user's process method
            gridOptions.rowDetailView.process = (item) => this.onProcessing(item);  // replace process method & run our internal one
          } else {
            throw new Error('You need to provide a "process" function for the Row Detail Extension to work properly');
          }

          // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
          // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
          if (!gridOptions.rowDetailView.preTemplate) {
            this._preloadComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.preloadComponent;
            gridOptions.rowDetailView.preTemplate = () => DOMPurify.sanitize(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
          }
          if (!gridOptions.rowDetailView.postTemplate) {
            this._viewComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.viewComponent;
            gridOptions.rowDetailView.postTemplate = (itemDetail: any) => DOMPurify.sanitize(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}${itemDetail.id}"></div>`);
          }

          // finally register the Row Detail View Plugin
          this._addon = new Slick.Plugins.RowDetailView(gridOptions.rowDetailView);
        }
        const selectionColumn: Column = this._addon.getColumnDefinition();
        if (typeof selectionColumn === 'object') {
          selectionColumn.excludeFromExport = true;
          selectionColumn.excludeFromColumnPicker = true;
          selectionColumn.excludeFromGridMenu = true;
          selectionColumn.excludeFromQuery = true;
          selectionColumn.excludeFromHeaderMenu = true;
          columnDefinitions.unshift(selectionColumn);
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
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      this.sharedService.grid.registerPlugin(this._addon);

      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
        this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || { selectActiveRow: true });
        this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
      }

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.rowDetailView) {
        if (this.sharedService.gridOptions.rowDetailView.onExtensionRegistered) {
          this.sharedService.gridOptions.rowDetailView.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onAsyncResponse, (e: any, args: { item: any; detailView: any }) => {
          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncResponse === 'function') {
            this.sharedService.gridOptions.rowDetailView.onAsyncResponse(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onAsyncEndUpdate, (e: any, args: { grid: any; item: any; }) => {
          // triggers after backend called "onAsyncResponse.notify()"
          this.renderViewModel(args && args.item);

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate === 'function') {
            this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onAfterRowDetailToggle, (e: any, args: { grid: any; item: any; expandedRows: any[]; }) => {
          // display preload template & re-render all the other Detail Views after toggling
          // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
          this.renderPreloadView();
          this.renderAllViewComponents();

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle === 'function') {
            this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onBeforeRowDetailToggle, (e: any, args: { grid: any; item: any; }) => {
          // before toggling row detail, we need to create View Component if it doesn't exist
          this.onBeforeRowDetailToggle(e, args);

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle === 'function') {
            this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onRowBackToViewportRange, (e: any, args: { grid: any; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
          // when row is back to viewport range, we will re-render the View Component(s)
          this.onRowBackToViewportRange(e, args);

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange === 'function') {
            this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onRowOutOfViewportRange, (e: any, args: { grid: any; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange === 'function') {
            this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange(e, args);
          }
        });

        // --
        // hook some events needed by the Plugin itself

        this._eventHandler.subscribe(this.sharedService.grid.onColumnsReordered, () => this.redrawAllViewComponents());

        // on sort, all row detail are collapsed so we can dispose of all the Views as well
        this._eventHandler.subscribe(this.sharedService.grid.onSort, () => this.disposeAllViewComponents());

        // on filter changed, we need to re-render all Views
        this._subscriptions.push(
          this.filterService.onFilterChanged.subscribe(() => this.redrawAllViewComponents())
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
    if (containerElements && containerElements.length) {
      this.renderViewModel(createdView.dataContext);
    }
  }

  /** Render (or rerender) the View Component (Row Detail) */
  renderPreloadView() {
    const containerElements = document.getElementsByClassName(`${PRELOAD_CONTAINER_PREFIX}`);
    if (containerElements && containerElements.length) {
      this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[0], true);
    }
  }

  /** Render (or rerender) the View Component (Row Detail) */
  renderViewModel(item: any) {
    const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${item.id}`);
    if (containerElements && containerElements.length) {
      const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[0], true);
      if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
        Object.assign(componentOutput.componentRef.instance, { model: item });

        const viewObj = this._views.find((obj) => obj.id === item.id);
        if (viewObj) {
          viewObj.componentRef = componentOutput.componentRef;
        }
      }
    }
  }

  // --
  // private functions
  // ------------------

  private disposeViewComponent(expandedView: CreatedView) {
    const compRef = expandedView && expandedView.componentRef;
    if (compRef) {
      this.appRef.detachView(compRef.hostView);
      compRef.destroy();
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

      if (response.hasOwnProperty('id')) {
        awaitedItemDetail = response; // from Promise
      } else if (response && response instanceof Observable || response instanceof Promise) {
        awaitedItemDetail = await castToPromise(response); // from Angular-http-client
      }

      if (!awaitedItemDetail || !awaitedItemDetail.hasOwnProperty('id')) {
        throw new Error(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback
          (a Promise or an HttpClient call returning an Observable) returns an item object that has an "id" property`);
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
  private onBeforeRowDetailToggle(e: Event, args: { grid: any; item: any; }) {
    // expanding
    if (args && args.item && args.item.__collapsed) {
      // expanding row detail
      const viewInfo: CreatedView = {
        id: args.item.id,
        dataContext: args.item
      };
      addToArrayWhenNotExists(this._views, viewInfo);
    } else {
      // collapsing, so dispose of the View/Component
      const foundViewIndex = this._views.findIndex((view: CreatedView) => view.id === args.item.id);
      if (foundViewIndex >= 0 && this._views.hasOwnProperty(foundViewIndex)) {
        const compRef = this._views[foundViewIndex].componentRef;
        this.appRef.detachView(compRef.hostView);
        compRef.destroy();
        this._views.splice(foundViewIndex, 1);
      }
    }
  }

  /** When Row comes back to Viewport Range, we need to redraw the View */
  private onRowBackToViewportRange(e: Event, args: { grid: any; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) {
    if (args && args.item) {
      this._views.forEach((view) => {
        if (view.id === args.item.id) {
          this.redrawViewComponent(view);
        }
      });
    }
  }
}
