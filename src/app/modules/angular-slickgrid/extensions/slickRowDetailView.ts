import 'slickgrid/plugins/slick.rowdetailview';
import 'slickgrid/plugins/slick.rowselectionmodel';

import { ApplicationRef, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import {
  addToArrayWhenNotExists,
  castObservableToPromise,
  RxJsFacade,
  SlickEventHandler,
  SlickGrid,
  SlickRowSelectionModel,
} from '@slickgrid-universal/common';
import { EventPubSubService } from '@slickgrid-universal/event-pub-sub';
import { SlickRowDetailView as UniversalSlickRowDetailView } from '@slickgrid-universal/row-detail-view-plugin';
import { Observable, Subject, Subscription } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

import { GridOption, RowDetailView } from '../models/index';
import { AngularUtilService } from '../services/angularUtil.service';
import { unsubscribeAllObservables } from '../services/utilities';

const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

export interface CreatedView {
  id: string | number;
  dataContext: any;
  componentRef?: ComponentRef<any>;
}

@Injectable()
export class SlickRowDetailView extends UniversalSlickRowDetailView {
  rowDetailContainer!: ViewContainerRef;
  protected _eventHandler!: SlickEventHandler;
  protected _preloadComponent: Type<object> | undefined;
  protected _views: CreatedView[] = [];
  protected _viewComponent!: Type<object>;
  protected _subscriptions: Subscription[] = [];
  protected _userProcessFn!: (item: any) => Promise<any> | Observable<any> | Subject<any>;

  constructor(
    protected readonly angularUtilService: AngularUtilService,
    protected readonly appRef: ApplicationRef,
    protected readonly eventPubSubService: EventPubSubService,
    protected readonly gridContainerElement: HTMLDivElement,
    protected rxjs?: RxJsFacade,
  ) {
    super();
  }

  get addonOptions() {
    return this.getOptions();
  }

  protected get datasetIdPropName(): string {
    return this.gridOptions.datasetIdPropertyName || 'id';
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }
  set eventHandler(eventHandler: SlickEventHandler) {
    this._eventHandler = eventHandler;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this._grid?.getOptions() || {}) as GridOption;
  }

  get rowDetailViewOptions(): RowDetailView | undefined {
    return this.gridOptions.rowDetailView;
  }

  addRxJsResource(rxjs: RxJsFacade) {
    this.rxjs = rxjs;
  }

  /** Dispose of the RowDetailView Extension */
  dispose() {
    this.disposeAllViewComponents();
    this._subscriptions = unsubscribeAllObservables(this._subscriptions); // also unsubscribe all RxJS subscriptions
    super.dispose();
  }

  /** Dispose of all the opened Row Detail Panels Angular View Components */
  disposeAllViewComponents() {
    this._views.forEach((compRef) => this.disposeViewComponent(compRef));
    this._views = [];
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance(): SlickRowDetailView | null {
    return this;
  }

  init(grid: SlickGrid) {
    this._grid = grid;
    super.init(this._grid);
    this.register(grid?.getSelectionModel());
  }

  /**
   * Create the plugin before the Grid creation, else it will behave oddly.
   * Mostly because the column definitions might change after the grid creation
   */
  register(rowSelectionPlugin?: SlickRowSelectionModel) {
    if (typeof this.gridOptions.rowDetailView?.process === 'function') {
      // we need to keep the user "process" method and replace it with our own execution method
      // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
      this._userProcessFn = this.gridOptions.rowDetailView.process as (item: any) => Promise<any>;                // keep user's process method
      this.gridOptions.rowDetailView.process = (item) => this.onProcessing(item);  // replace process method & run our internal one
    } else {
      throw new Error('[Angular-Slickgrid] You need to provide a "process" function for the Row Detail Extension to work properly');
    }

    if (this._grid && this.gridOptions?.rowDetailView) {
      // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
      // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
      if (!this.gridOptions.rowDetailView.preTemplate) {
        this._preloadComponent = this.gridOptions?.rowDetailView?.preloadComponent;
        this.gridOptions.rowDetailView.preTemplate = () => DOMPurify.sanitize(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
      }
      if (!this.gridOptions.rowDetailView.postTemplate) {
        this._viewComponent = this.gridOptions?.rowDetailView?.viewComponent;
        this.gridOptions.rowDetailView.postTemplate = (itemDetail: any) => DOMPurify.sanitize(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}${itemDetail[this.datasetIdPropName]}"></div>`);
      }

      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this._grid.getSelectionModel()) {
        rowSelectionPlugin = new SlickRowSelectionModel(this.gridOptions.rowSelectionOptions || { selectActiveRow: true });
        this._grid.setSelectionModel(rowSelectionPlugin);
      }

      // hook all events
      if (this._grid && this.rowDetailViewOptions) {
        if (this.rowDetailViewOptions.onExtensionRegistered) {
          this.rowDetailViewOptions.onExtensionRegistered(this);
        }

        if (this.onAsyncResponse) {
          this._eventHandler.subscribe(this.onAsyncResponse, (event, args) => {
            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAsyncResponse === 'function') {
              this.rowDetailViewOptions.onAsyncResponse(event, args);
            }
          });
        }

        if (this.onAsyncEndUpdate) {
          this._eventHandler.subscribe(this.onAsyncEndUpdate, (e: any, args: { grid: SlickGrid; item: any; }) => {
            // triggers after backend called "onAsyncResponse.notify()"
            this.renderViewModel(args?.item);

            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAsyncEndUpdate === 'function') {
              this.rowDetailViewOptions.onAsyncEndUpdate(e, args);
            }
          });
        }

        if (this.onAfterRowDetailToggle) {
          this._eventHandler.subscribe(this.onAfterRowDetailToggle, (e: any, args: { grid: SlickGrid; item: any; expandedRows: number[]; }) => {
            // display preload template & re-render all the other Detail Views after toggling
            // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
            this.renderPreloadView();
            this.renderAllViewComponents();

            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAfterRowDetailToggle === 'function') {
              this.rowDetailViewOptions.onAfterRowDetailToggle(e, args);
            }
          });
        }

        if (this.onBeforeRowDetailToggle) {
          this._eventHandler.subscribe(this.onBeforeRowDetailToggle, (e, args) => {
            // before toggling row detail, we need to create View Component if it doesn't exist
            this.handleOnBeforeRowDetailToggle(e, args);

            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onBeforeRowDetailToggle === 'function') {
              this.rowDetailViewOptions.onBeforeRowDetailToggle(e, args);
            }
          });
        }

        if (this.onRowBackToViewportRange) {
          this._eventHandler.subscribe(this.onRowBackToViewportRange, (e: any, args: { grid: SlickGrid; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
            // when row is back to viewport range, we will re-render the View Component(s)
            this.handleOnRowBackToViewportRange(e, args);

            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onRowBackToViewportRange === 'function') {
              this.rowDetailViewOptions.onRowBackToViewportRange(e, args);
            }
          });
        }

        if (this.onRowOutOfViewportRange) {
          this._eventHandler.subscribe(this.onRowOutOfViewportRange, (e: any, args: { grid: SlickGrid; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onRowOutOfViewportRange === 'function') {
              this.rowDetailViewOptions.onRowOutOfViewportRange(e, args);
            }
          });
        }

        // --
        // hook some events needed by the Plugin itself

        // we need to redraw the open detail views if we change column position (column reorder)
        this._eventHandler.subscribe(this._grid.onColumnsReordered, this.redrawAllViewComponents.bind(this));

        // on row selection changed, we also need to redraw
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
          this._eventHandler.subscribe(this._grid.onSelectedRowsChanged, this.redrawAllViewComponents.bind(this));
        }

        // on sort, all row detail are collapsed so we can dispose of all the Views as well
        this._eventHandler.subscribe(this._grid.onSort, this.disposeAllViewComponents.bind(this));

        // on filter changed, we need to re-render all Views
        this._subscriptions.push(
          this.eventPubSubService?.subscribe('onFilterChanged', this.redrawAllViewComponents.bind(this)),
          this.eventPubSubService?.subscribe('onGridMenuClearAllFilters', () => setTimeout(() => this.redrawAllViewComponents())),
          this.eventPubSubService?.subscribe('onGridMenuClearAllSorting', () => setTimeout(() => this.redrawAllViewComponents())),
        );
      }
    }
    return this;
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
    const containerElements = this.gridContainerElement.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${createdView.id}`);
    if (containerElements && containerElements.length >= 0) {
      this.renderViewModel(createdView.dataContext);
    }
  }

  /** Render (or re-render) the View Component (Row Detail) */
  renderPreloadView() {
    const containerElements = this.gridContainerElement.getElementsByClassName(`${PRELOAD_CONTAINER_PREFIX}`);
    if (containerElements && containerElements.length >= 0) {
      this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[containerElements.length - 1], true);
    }
  }

  /** Render (or re-render) the View Component (Row Detail) */
  renderViewModel(item: any): CreatedView | undefined {
    const containerElements = this.gridContainerElement.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${item[this.datasetIdPropName]}`);
    if (containerElements && containerElements.length > 0) {
      const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[containerElements.length - 1], true);
      if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
        // pass a few properties to the Row Detail template component
        Object.assign(componentOutput.componentRef.instance, {
          model: item,
          addon: this,
          grid: this._grid,
          dataView: this.dataView,
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
  // protected functions
  // ------------------

  protected disposeViewComponent(expandedView: CreatedView): CreatedView | void {
    const compRef = expandedView?.componentRef;
    if (compRef) {
      this.appRef.detachView(compRef.hostView);
      if (compRef?.destroy) {
        compRef.destroy();
      }
      return expandedView;
    }
  }

  /**
   * notify the onAsyncResponse with the "args.item" (required property)
   * the plugin will then use item to populate the row detail panel with the "postTemplate"
   * @param item
   */
  protected notifyTemplate(item: any) {
    if (this.onAsyncResponse) {
      this.onAsyncResponse.notify({ item }, undefined, this);
    }
  }

  /**
   * On Processing, we will notify the plugin with the new item detail once backend server call completes
   * @param item
   */
  protected async onProcessing(item: any) {
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
  protected handleOnBeforeRowDetailToggle(e: Event, args: { grid: SlickGrid; item: any; }) {
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
  protected handleOnRowBackToViewportRange(e: Event, args: { grid: SlickGrid; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) {
    if (args?.item) {
      this.redrawAllViewComponents();
    }
  }
}
