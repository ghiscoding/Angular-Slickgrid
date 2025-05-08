import type { ApplicationRef, ComponentRef, Type, ViewContainerRef } from '@angular/core';
import type {
  EventSubscription,
  OnBeforeRowDetailToggleArgs,
  OnRowBackToViewportRangeArgs,
  RxJsFacade,
  SlickGrid,
} from '@slickgrid-universal/common';
import {
  addToArrayWhenNotExists,
  castObservableToPromise,
  createDomElement,
  SlickEventData,
  SlickRowSelectionModel,
  unsubscribeAll,
} from '@slickgrid-universal/common';
import type { EventPubSubService } from '@slickgrid-universal/event-pub-sub';
import { SlickRowDetailView as UniversalSlickRowDetailView } from '@slickgrid-universal/row-detail-view-plugin';
import { Observable, type Subject } from 'rxjs';

import type { GridOption, RowDetailView } from '../models/index';
import type { AngularUtilService } from '../services/angularUtil.service';

const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';

export interface CreatedView {
  id: string | number;
  dataContext: any;
  componentRef?: ComponentRef<any>;
  rendered?: boolean;
}

export class SlickRowDetailView extends UniversalSlickRowDetailView {
  rowDetailContainer!: ViewContainerRef;
  protected _preloadComponent: Type<object> | undefined;
  protected _preloadCompRef?: ComponentRef<any>;
  protected _views: CreatedView[] = [];
  protected _viewComponent!: Type<object>;
  protected _subscriptions: EventSubscription[] = [];
  protected _userProcessFn!: (item: any) => Promise<any> | Observable<any> | Subject<any>;

  constructor(
    protected readonly angularUtilService: AngularUtilService,
    protected readonly appRef: ApplicationRef,
    protected readonly eventPubSubService: EventPubSubService,
    protected readonly gridContainerElement: HTMLDivElement,
    protected rxjs?: RxJsFacade
  ) {
    super(eventPubSubService);
  }

  get addonOptions() {
    return this.getOptions();
  }

  protected get datasetIdPropName(): string {
    return this.gridOptions.datasetIdPropertyName || 'id';
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
    this._subscriptions = unsubscribeAll(this._subscriptions); // also unsubscribe all RxJS subscriptions
    super.dispose();
  }

  /** Dispose of all the opened Row Detail Panels Angular View Components */
  disposeAllViewComponents() {
    do {
      const view = this._views.pop();
      if (view) {
        this.disposeView(view);
      }
    } while (this._views.length > 0);
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance(): SlickRowDetailView | null {
    return this;
  }

  init(grid: SlickGrid) {
    this._grid = grid;
    super.init(this._grid);
    this.register(grid?.getSelectionModel() as SlickRowSelectionModel);
  }

  /**
   * Create the plugin before the Grid creation, else it will behave oddly.
   * Mostly because the column definitions might change after the grid creation
   */
  register(rowSelectionPlugin?: SlickRowSelectionModel) {
    if (typeof this.gridOptions.rowDetailView?.process === 'function') {
      // we need to keep the user "process" method and replace it with our own execution method
      // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
      this._userProcessFn = this.gridOptions.rowDetailView.process as (item: any) => Promise<any>; // keep user's process method
      this.addonOptions.process = (item) => this.onProcessing(item); // replace process method & run our internal one
    } else {
      throw new Error(
        '[Angular-Slickgrid] You need to provide a "process" function for the Row Detail Extension to work properly'
      );
    }

    if (this._grid && this.gridOptions?.rowDetailView) {
      // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
      // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
      if (!this.gridOptions.rowDetailView.preTemplate) {
        this._preloadComponent = this.gridOptions?.rowDetailView?.preloadComponent;
        this.addonOptions.preTemplate = () => createDomElement('div', { className: `${PRELOAD_CONTAINER_PREFIX}` });
      }
      if (!this.gridOptions.rowDetailView.postTemplate) {
        this._viewComponent = this.gridOptions?.rowDetailView?.viewComponent;
        this.addonOptions.postTemplate = (itemDetail: any) =>
          createDomElement('div', { className: `${ROW_DETAIL_CONTAINER_PREFIX}${itemDetail[this.datasetIdPropName]}` });
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

        this.eventHandler.subscribe(this.onAsyncResponse, (event, args) => {
          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAsyncResponse === 'function') {
            this.rowDetailViewOptions.onAsyncResponse(event, args);
          }
        });

        this.eventHandler.subscribe(this.onAsyncEndUpdate, (e, args) => {
          // destroy preload if exists
          this._preloadCompRef?.destroy();

          // triggers after backend called "onAsyncResponse.notify()"
          // because of the preload destroy above, we need a small delay to make sure the DOM element is ready to render the Row Detail
          queueMicrotask(() => {
            this.renderViewModel(args?.item);

            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAsyncEndUpdate === 'function') {
              this.rowDetailViewOptions.onAsyncEndUpdate(e, args);
            }
          });
        });

        this.eventHandler.subscribe(
          this.onAfterRowDetailToggle,
          (e: any, args: { grid: SlickGrid; item: any; expandedRows: Array<number | string> }) => {
            // display preload template & re-render all the other Detail Views after toggling
            // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
            this.renderPreloadView();

            if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onAfterRowDetailToggle === 'function') {
              this.rowDetailViewOptions.onAfterRowDetailToggle(e, args);
            }
          }
        );

        this.eventHandler.subscribe(this.onBeforeRowDetailToggle, (e, args) => {
          // before toggling row detail, we need to create View Component if it doesn't exist
          this.handleOnBeforeRowDetailToggle(e, args);

          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onBeforeRowDetailToggle === 'function') {
            return this.rowDetailViewOptions.onBeforeRowDetailToggle(e, args);
          }
          return true;
        });

        this.eventHandler.subscribe(this.onRowBackToViewportRange, (e, args) => {
          // when row is back to viewport range, we will re-render the View Component(s)
          this.handleOnRowBackToViewportRange(e, args);

          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onRowBackToViewportRange === 'function') {
            this.rowDetailViewOptions.onRowBackToViewportRange(e, args);
          }
        });

        this._eventHandler.subscribe(this.onBeforeRowOutOfViewportRange, (event, args) => {
          if (typeof this.rowDetailViewOptions?.onBeforeRowOutOfViewportRange === 'function') {
            this.rowDetailViewOptions.onBeforeRowOutOfViewportRange(event, args);
          }
          this.disposeViewByItem(args.item);
        });

        this.eventHandler.subscribe(this.onRowOutOfViewportRange, (e, args) => {
          if (this.rowDetailViewOptions && typeof this.rowDetailViewOptions.onRowOutOfViewportRange === 'function') {
            this.rowDetailViewOptions.onRowOutOfViewportRange(e, args);
          }
        });

        // --
        // hook some events needed by the Plugin itself

        // we need to redraw the open detail views if we change column position (column reorder)
        this.eventHandler.subscribe(this._grid.onColumnsReordered, this.redrawAllViewComponents.bind(this, false));

        // on row selection changed, we also need to redraw
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
          this.eventHandler.subscribe(this._grid.onSelectedRowsChanged, this.redrawAllViewComponents.bind(this, false));
        }

        // on sort, all row detail are collapsed so we can dispose of all the Views as well
        this.eventHandler.subscribe(this._grid.onSort, this.disposeAllViewComponents.bind(this));

        // redraw all Views whenever certain events are triggered
        this._subscriptions.push(
          this.eventPubSubService?.subscribe(
            ['onFilterChanged', 'onGridMenuColumnsChanged', 'onColumnPickerColumnsChanged'],
            this.redrawAllViewComponents.bind(this, false)
          ),
          this.eventPubSubService?.subscribe(['onGridMenuClearAllFilters', 'onGridMenuClearAllSorting'], () =>
            window.setTimeout(() => this.redrawAllViewComponents())
          )
        );
      }
    }
    return this;
  }

  /** Redraw (re-render) all the expanded row detail View Components */
  redrawAllViewComponents(forceRedraw = false) {
    this.resetRenderedRows();
    this._views.forEach((view) => {
      if (!view.rendered || forceRedraw) {
        forceRedraw && view.componentRef?.destroy();
        this.redrawViewComponent(view);
      }
    });
  }

  /** Redraw the necessary View Component */
  redrawViewComponent(createdView: CreatedView) {
    const containerElement = this.gridContainerElement.querySelector(`.${ROW_DETAIL_CONTAINER_PREFIX}${createdView.id}`);
    if (containerElement) {
      this.renderViewModel(createdView.dataContext);
    }
  }

  /** Render (or re-render) the View Component (Row Detail) */
  renderPreloadView() {
    const containerElement = this.gridContainerElement.querySelector(`.${PRELOAD_CONTAINER_PREFIX}`);
    if (this._preloadComponent && containerElement) {
      const preloadComp = this.angularUtilService.createAngularComponentAppendToDom(
        this._preloadComponent,
        containerElement,
        {},
        { sanitizer: this._grid.sanitizeHtmlString }
      );
      this._preloadCompRef = preloadComp.componentRef;
    }
  }

  /** Render (or re-render) the View Component (Row Detail) */
  renderViewModel(item: any): CreatedView | undefined {
    const containerElement = this.gridContainerElement.querySelector(
      `.${ROW_DETAIL_CONTAINER_PREFIX}${item[this.datasetIdPropName]}`
    );
    if (this._viewComponent && containerElement) {
      // render row detail
      const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(
        this._viewComponent,
        containerElement,
        {
          model: item,
          addon: this,
          grid: this._grid,
          dataView: this.dataView,
          parent: this.rowDetailViewOptions?.parent,
        },
        {
          sanitizer: this._grid.sanitizeHtmlString,
        }
      );

      if (componentOutput?.componentRef) {
        const viewObj = this._views.find((obj) => obj.id === item[this.datasetIdPropName]);
        if (viewObj) {
          viewObj.componentRef = componentOutput.componentRef;
          viewObj.rendered = true;
        }
        return viewObj;
      }
    }
    return undefined;
  }

  // --
  // protected functions
  // ------------------

  protected disposeViewByItem(item: any, removeFromArray = false): void {
    const foundViewIndex = this._views.findIndex((view: CreatedView) => view.id === item[this.datasetIdPropName]);
    if (foundViewIndex >= 0) {
      this.disposeView(this._views[foundViewIndex]);
      if (removeFromArray) {
        this._views.splice(foundViewIndex, 1);
      }
    }
  }

  protected disposeView(expandedView: CreatedView): CreatedView | void {
    expandedView.rendered = false;
    const compRef = expandedView?.componentRef;
    if (compRef) {
      this.appRef.detachView(compRef.hostView);
      if (typeof compRef?.destroy === 'function') {
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
    this.onAsyncResponse.notify({ item, itemDetail: item }, new SlickEventData(), this);
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

      if (this.datasetIdPropName in response) {
        awaitedItemDetail = response; // from Promise
      } else if ((response && response instanceof Observable) || response instanceof Promise) {
        awaitedItemDetail = await castObservableToPromise(this.rxjs as RxJsFacade, response); // from Angular-http-client
      }

      if (!awaitedItemDetail || !(this.datasetIdPropName in awaitedItemDetail)) {
        throw new Error(
          '[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback ' +
            `returns an item object that has an "${this.datasetIdPropName}" property`
        );
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
  protected handleOnBeforeRowDetailToggle(_e: SlickEventData<OnBeforeRowDetailToggleArgs>, args: { grid: SlickGrid; item: any }) {
    // expanding
    if (args?.item?.__collapsed) {
      // expanding row detail
      const viewInfo: CreatedView = {
        id: args.item[this.datasetIdPropName],
        dataContext: args.item,
        rendered: false,
      };
      addToArrayWhenNotExists(this._views, viewInfo, this.datasetIdPropName);
    } else {
      // collapsing, so dispose of the View/Component
      this.disposeViewByItem(args.item, true);
    }
  }

  /** When Row comes back to Viewport Range, we need to redraw the View */
  protected handleOnRowBackToViewportRange(_e: SlickEventData<OnRowBackToViewportRangeArgs>, args: OnRowBackToViewportRangeArgs) {
    const viewModel = this._views.find((x) => x.id === args.rowId);
    if (viewModel && !viewModel.rendered) {
      this.redrawViewComponent(viewModel);
    }
  }
}
