import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewChild, ViewContainerRef, ElementRef, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { Column, CurrentFilter, Extension, ExtensionName, GridOption } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SharedService } from '../services/shared.service';
import { unsubscribeAllObservables } from '../services/utilities';
import { Subscription } from 'rxjs';
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
  private _eventHandler: any = new Slick.EventHandler();
  private _extension: any;
  private _preloadComponent: Type<object>;
  private _views: CreatedView[] = [];
  private _viewComponent: Type<object>;
  private _subscriptions: Subscription[] = [];
  private _userProcessFn: (item: any) => Promise<any>;

  constructor(
    private compFactoryResolver: ComponentFactoryResolver,
    private extensionUtility: ExtensionUtility,
    private filterService: FilterService,
    private sharedService: SharedService,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) { }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }

    // also unsubscribe all RxJS subscriptions
    this._subscriptions = unsubscribeAllObservables(this._subscriptions);
  }

  /**
   * Create the plugin before the Grid creation, else it will behave oddly.
   * Mostly because the column definitions might change after the grid creation
   */
  create(columnDefinitions: Column[], gridOptions: GridOption) {
    if (columnDefinitions && gridOptions) {
      // dynamically import the SlickGrid plugin with requireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.rowDetailView);

      if (!gridOptions.rowDetailView) {
        throw new Error('The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options');
      }

      if (gridOptions && gridOptions.rowDetailView) {
        if (!this._extension) {
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
          this._extension = new Slick.Plugins.RowDetailView(gridOptions.rowDetailView);
        }
        const selectionColumn: Column = this._extension.getColumnDefinition();
        selectionColumn.excludeFromExport = true;
        selectionColumn.excludeFromQuery = true;
        selectionColumn.excludeFromHeaderMenu = true;
        columnDefinitions.unshift(selectionColumn);
      }
      return this._extension;
    }
    return null;
  }

  register(rowSelectionPlugin?: any) {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      this.sharedService.grid.registerPlugin(this._extension);

      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
        this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || { selectActiveRow: true });
        this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
      }

      // this._extension = this.create(this.sharedService.allColumns, this.sharedService.gridOptions);
      this.sharedService.grid.registerPlugin(this._extension);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.rowDetailView) {
        if (this.sharedService.gridOptions.rowDetailView.onExtensionRegistered) {
          this.sharedService.gridOptions.rowDetailView.onExtensionRegistered(this._extension);
        }
        this._eventHandler.subscribe(this._extension.onAsyncResponse, (e: any, args: { item: any; detailView: any }) => {
          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncResponse === 'function') {
            this.sharedService.gridOptions.rowDetailView.onAsyncResponse(e, args);
          }
        });
        this._eventHandler.subscribe(this._extension.onAsyncEndUpdate, (e: any, args: { grid: any; item: any; }) => {
          // triggers after backend called "onAsyncResponse.notify()"
          this.renderViewModel(args && args.item);

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate === 'function') {
            this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate(e, args);
          }
        });
        this._eventHandler.subscribe(this._extension.onAfterRowDetailToggle, (e: any, args: { grid: any; item: any; expandedRows: any[]; }) => {
          // display preload template & re-render all the other Detail Views after toggling
          // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
          this.renderPreloadView(args);
          this.renderAllViewComponents();

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle === 'function') {
            this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle(e, args);
          }
        });
        this._eventHandler.subscribe(this._extension.onBeforeRowDetailToggle, (e: any, args: { grid: any; item: any; }) => {
          // before toggling row detail, we need to create View Component if it doesn't exist
          this.onBeforeRowDetailToggle(e, args);

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle === 'function') {
            this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle(e, args);
          }
        });
        this._eventHandler.subscribe(this._extension.onRowBackToViewportRange, (e: any, args: { grid: any; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
          // when row is back to viewport range, we will re-render the View Component(s)
          this.onRowBackToViewportRange(e, args);

          if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange === 'function') {
            this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange(e, args);
          }
        });
        this._eventHandler.subscribe(this._extension.onRowOutOfViewportRange, (e: any, args: { grid: any; item: any; rowId: number; rowIndex: number; expandedRows: any[]; rowIdsOutOfViewport: number[]; }) => {
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
          this.filterService.onFilterChanged.subscribe((currentFilters: CurrentFilter[]) => this.redrawAllViewComponents())
        );
      }
      return this._extension;
    }
    return null;
  }

  // --
  // private functions
  // ------------------

  private addToArrayWhenNotFound(inputArray: any[], inputObj: any) {
    const arrayRowIndex = inputArray.findIndex((obj) => obj.id === inputObj.id);
    if (arrayRowIndex < 0) {
      inputArray.push(inputObj);
    }
  }

  private disposeAllViewComponents() {
    this._views.forEach((compRef) => this.disposeViewComponent(compRef));
    this._views = [];
  }

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
    if (this._extension) {
      this._extension.onAsyncResponse.notify({ item }, undefined, this);
    }
  }

  /**
   * On Processing, we will notify the plugin with the new item detail once backend server call completes
   * @param item
   */
  private async onProcessing(item: any) {
    if (item && typeof this._userProcessFn === 'function') {
      const userProcessFn = this._userProcessFn(item);

      // wait for the "userProcessFn", once resolved we will save it into the "collection"
      const response: any | any[] = await userProcessFn;
      let awaitedItemDetail: any;

      if (response.hasOwnProperty('id')) {
        awaitedItemDetail = response; // from Promise
      } else if (response instanceof Response && typeof response['json'] === 'function') {
        awaitedItemDetail = await response['json'](); // from Fetch
      } else if (response && response['content']) {
        awaitedItemDetail = response['content']; // from Angular-http-client
      }

      // notify the plugin with the new item details
      this.notifyTemplate(awaitedItemDetail || {});
    }
  }

  /** Redraw (re-render) all the expanded row detail View Components */
  private redrawAllViewComponents() {
    this._views.forEach((compRef) => {
      this.redrawViewComponent(compRef);
    });
  }

  /** Render all the expanded row detail View Components */
  private renderAllViewComponents() {
    this._views.forEach((view) => {
      if (view && view.dataContext) {
        this.renderViewModel(view.dataContext);
      }
    });
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
      if (args && args.item) {
        const viewInfo: CreatedView = {
          id: args.item.id,
          dataContext: args.item
        };
        this.addToArrayWhenNotFound(this._views, viewInfo);
      }
    } else {
      // collapsing, so dispose of the View/Component
      const foundViewIndex = this._views.findIndex((view: CreatedView) => view.id === args.item.id);
      if (foundViewIndex >= 0) {
        if (this._views.hasOwnProperty(foundViewIndex)) {
          const compRef = this._views[foundViewIndex].componentRef;
          this.appRef.detachView(compRef.hostView);
          compRef.destroy();
          this._views.splice(foundViewIndex, 1);
        }
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

  /** Redraw the necessary View Component */
  private redrawViewComponent(createdView: CreatedView) {
    const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${createdView.id}`);
    if (containerElements && containerElements.length) {
      this.renderViewModel(createdView.dataContext);
    }
  }

  /** Render (or rerender) the View Component (Row Detail) */
  private renderPreloadView(args: any) {
    const containerElements = document.getElementsByClassName(`${PRELOAD_CONTAINER_PREFIX}`);
    if (containerElements && containerElements.length) {
      this.appendComponentToHtmlElement(this._preloadComponent, containerElements[0]);
    }
  }

  /** Render (or rerender) the View Component (Row Detail) */
  private renderViewModel(item: any) {
    const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${item.id}`);
    if (containerElements && containerElements.length) {
      const compRef = this.appendComponentToHtmlElement(this._viewComponent, containerElements[0]);
      Object.assign(compRef.instance, { model: item });

      const viewObj = this._views.find((obj) => obj.id === item.id);
      if (viewObj) {
        viewObj.componentRef = compRef;
      }
    }
  }

  // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  private appendComponentToHtmlElement(component: any, appendToElement: HTMLElement | Element) {
    // Create a component reference from the component
    const componentRef = this.compFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the HTML element specified
    if (appendToElement) {
      appendToElement.appendChild(domElem);
    }

    return componentRef;
  }
}
