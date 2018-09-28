// import 3rd party vendor libs
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.groupitemmetadataprovider';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { AfterViewInit, Component, EventEmitter, Inject, Injectable, Input, Output, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { castToPromise, titleCase, unsubscribeAllObservables } from './../services/utilities';
import { GlobalGridOptions } from './../global-grid-options';
import {
  AngularGridInstance,
  BackendServiceOption,
  Column,
  GraphqlResult,
  GridOption,
  GridStateChange,
  GridStateType,
  Pagination,
} from './../models/index';
import { ControlAndPluginService } from './../services/controlAndPlugin.service';
import { ExportService } from './../services/export.service';
import { FilterService } from './../services/filter.service';
import { GraphqlService } from './../services/graphql.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { ResizerService } from './../services/resizer.service';
import { SortService } from './../services/sort.service';
import { FilterFactory } from '../filters/filterFactory';
import { SlickgridConfig } from '../slickgrid-config';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

const slickgridEventPrefix = 'sg';

@Injectable()
@Component({
  selector: 'angular-slickgrid',
  templateUrl: './angular-slickgrid.component.html',
  providers: [
    ControlAndPluginService,
    ExportService,
    FilterFactory,
    FilterService,
    GraphqlService,
    GridEventService,
    GridService,
    GridStateService,
    GroupingAndColspanService,
    ResizerService,
    SortService,
    SlickgridConfig
  ]
})
export class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
  private _dataset: any[];
  private _columnDefinitions: Column[];
  private _dataView: any;
  private _eventHandler: any = new Slick.EventHandler();
  private _hideHeaderRowAfterPageLoad = false;
  grid: any;
  gridPaginationOptions: GridOption;
  gridHeightString: string;
  gridWidthString: string;
  groupingDefinition: any = {};
  groupItemMetadataProvider: any;
  showPagination = false;
  isGridInitialized = false;
  subscriptions: Subscription[] = [];

  @Output() onAngularGridCreated = new EventEmitter<AngularGridInstance>();
  @Output() onDataviewCreated = new EventEmitter<any>();
  @Output() onGridCreated = new EventEmitter<any>();
  @Output() onGridInitialized = new EventEmitter<any>();
  @Output() onBeforeGridCreate = new EventEmitter<boolean>();
  @Output() onBeforeGridDestroy = new EventEmitter<any>();
  @Output() onAfterGridDestroyed = new EventEmitter<boolean>();
  @Output() onGridStateChanged = new EventEmitter<GridStateChange>();
  @Input() gridId: string;
  @Input() gridOptions: GridOption;
  @Input() gridHeight = 0;
  @Input() gridWidth = 0;

  @Input()
  set columnDefinitions(columnDefinitions: Column[]) {
    this._columnDefinitions = columnDefinitions;
    if (this.isGridInitialized) {
      this.updateColumnDefinitionsList(columnDefinitions);
    }
  }
  get columnDefinitions(): Column[] {
    return this._columnDefinitions;
  }
  @Input()
  set dataset(dataset: any[]) {
    this._dataset = dataset;
    this.refreshGridData(dataset);
  }
  get dataset(): any[] {
    return this._dataView.getItems();
  }


  constructor(
    private controlAndPluginService: ControlAndPluginService,
    private elm: ElementRef,
    private exportService: ExportService,
    private filterService: FilterService,
    private gridService: GridService,
    private gridEventService: GridEventService,
    private gridStateService: GridStateService,
    private groupingAndColspanService: GroupingAndColspanService,
    private resizer: ResizerService,
    private sortService: SortService,
    private translate: TranslateService,
    @Inject('config') private forRootConfig: GridOption
  ) {}

  ngOnInit(): void {
    this.onBeforeGridCreate.emit(true);
    if (!this.gridOptions.enableAutoResize && !this.gridOptions.autoResize) {
      this.gridHeightString = `${this.gridHeight}px`;
      this.gridWidthString = `${this.gridWidth}px`;
    }
  }

  ngOnDestroy(): void {
    this.onBeforeGridDestroy.emit(this.grid);
    this.destroy();
    this.onAfterGridDestroyed.emit(true);
  }

  destroy(emptyDomElementContainer = false) {
    this._dataView = [];
    this.gridOptions = {};
    this._eventHandler.unsubscribeAll();
    this.controlAndPluginService.dispose();
    this.filterService.dispose();
    this.gridEventService.dispose();
    this.gridStateService.dispose();
    this.groupingAndColspanService.dispose();
    this.resizer.dispose();
    this.sortService.dispose();
    this.grid.destroy();

    if (emptyDomElementContainer) {
      $(this.gridOptions.gridContainerId).empty();
    }

    // also unsubscribe all RxJS subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  ngAfterViewInit() {
    this.initialization();
    this.isGridInitialized = true;
  }

  initialization() {
    // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
    this._dataset = this._dataset || [];
    this.gridOptions = this.mergeGridOptions(this.gridOptions);
    this.createBackendApiInternalPostProcessCallback(this.gridOptions);

    if (this.gridOptions.enableGrouping) {
      this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
      this._dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
    } else {
      this._dataView = new Slick.Data.DataView();
    }

    // for convenience, we provide the property "editor" as an Angular-Slickgrid editor complex object
    // however "editor" is used internally by SlickGrid for it's own Editor Factory
    // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
    // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
    this._columnDefinitions = this._columnDefinitions.map((column: Column | any) => {
      // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
      if (column.editor && column.editor.collectionAsync) {
        this.loadEditorCollectionAsync(column);
      }
      return { ...column, editor: column.editor && column.editor.model, internalColumnEditor: { ...column.editor  }};
    });

    this.controlAndPluginService.createCheckboxPluginBeforeGridCreation(this._columnDefinitions, this.gridOptions);
    this.grid = new Slick.Grid(`#${this.gridId}`, this._dataView, this._columnDefinitions, this.gridOptions);

    this.controlAndPluginService.attachDifferentControlOrPlugins(this.grid, this._dataView, this.groupItemMetadataProvider);
    this.attachDifferentHooks(this.grid, this.gridOptions, this._dataView);

    // emit the Grid & DataView object to make them available in parent component
    this.onGridCreated.emit(this.grid);
    this.onDataviewCreated.emit(this._dataView);

    this.grid.init();
    this._dataView.beginUpdate();
    this._dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
    this._dataView.endUpdate();

    // user might want to hide the header row on page load but still have `enableFiltering: true`
    // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
    if (this._hideHeaderRowAfterPageLoad) {
      this.showHeaderRow(false);
    }

    // after the DataView is created & updated execute some processes
    this.executeAfterDataviewCreated(this.grid, this.gridOptions, this._dataView);

    // attach resize ONLY after the dataView is ready
    this.attachResizeHook(this.grid, this.gridOptions);

    // attach grouping and header grouping colspan service
    if (this.gridOptions.createPreHeaderPanel) {
      this.groupingAndColspanService.init(this.grid, this._dataView);
    }

    // attach grid  service
    this.gridService.init(this.grid, this._dataView);

    // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
    if (this.gridOptions.enableTranslate) {
      this.controlAndPluginService.translateColumnHeaders();
    }

    // if Export is enabled, initialize the service with the necessary grid and other objects
    if (this.gridOptions.enableExport) {
      this.exportService.init(this.grid, this._dataView);
    }

    // once all hooks are in placed and the grid is initialized, we can emit an event
    this.onGridInitialized.emit(this.grid);

    // attach the Backend Service API callback functions only after the grid is initialized
    // because the preProcess() and onInit() might get triggered
    if (this.gridOptions && this.gridOptions.backendServiceApi) {
      this.attachBackendCallbackFunctions(this.gridOptions);
    }

    this.gridStateService.init(this.grid, this.controlAndPluginService, this.filterService, this.sortService);

    this.onAngularGridCreated.emit({
      // Slick Grid & DataView objects
      dataView: this._dataView,
      slickGrid: this.grid,

      // public methods
      destroy: this.destroy.bind(this),

      // return all available Services (non-singleton)
      backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
      exportService: this.exportService,
      filterService: this.filterService,
      gridEventService: this.gridEventService,
      gridStateService: this.gridStateService,
      gridService: this.gridService,
      groupingService: this.groupingAndColspanService,
      pluginService: this.controlAndPluginService,
      resizerService: this.resizer,
      sortService: this.sortService,
    });
  }

  /**
   * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
   * For now, this is GraphQL Service only feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
   */
  createBackendApiInternalPostProcessCallback(gridOptions: GridOption) {
    if (gridOptions && gridOptions.backendServiceApi) {
      const backendApi = gridOptions.backendServiceApi;

      // internalPostProcess only works with a GraphQL Service, so make sure it is that type
      if (backendApi && backendApi.service && backendApi.service instanceof GraphqlService) {
        backendApi.internalPostProcess = (processResult: any) => {
          const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
          if (processResult && processResult.data && processResult.data[datasetName]) {
            this._dataset = processResult.data[datasetName].nodes;
            this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
          } else {
            this._dataset = [];
          }
        };
      }
    }
  }

  attachDifferentHooks(grid: any, gridOptions: GridOption, dataView: any) {
    // on locale change, we have to manually translate the Headers, GridMenu
    this.subscriptions.push(
      this.translate.onLangChange.subscribe((event) => {
        if (gridOptions.enableTranslate) {
          this.controlAndPluginService.translateColumnHeaders();
          this.controlAndPluginService.translateColumnPicker();
          this.controlAndPluginService.translateGridMenu();
          this.controlAndPluginService.translateHeaderMenu();
        }
      })
    );

    // if user entered some Columns "presets", we need to reflect them all in the grid
    if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
      const gridColumns: Column[] = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
      if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
        // make sure that the checkbox selector is also visible if it is enabled
        if (gridOptions.enableCheckboxSelector) {
          const checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
          if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
            gridColumns.unshift(checkboxColumn);
          }
        }

        // finally set the new presets columns (including checkbox selector if need be)
        grid.setColumns(gridColumns);
      }
    }

    // attach external sorting (backend) when available or default onSort (dataView)
    if (gridOptions.enableSorting) {
      gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
    }

    // attach external filter (backend) when available or default onFilter (dataView)
    if (gridOptions.enableFiltering) {
      this.filterService.init(grid);

      // if user entered some "presets", we need to reflect them all in the DOM
      if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
        this.filterService.populateColumnFilterSearchTerms();
      }
      gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid) : this.filterService.attachLocalOnFilter(grid, this._dataView);
    }

    // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
    if (gridOptions.backendServiceApi) {
      const backendApi = gridOptions.backendServiceApi;

      if (backendApi && backendApi.service && backendApi.service.init) {
        backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
      }
    }

    // expose all Slick Grid Events through dispatch
    for (const prop in grid) {
      if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
        this._eventHandler.subscribe(grid[prop], (e: any, args: any) => {
          return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
        });
      }
    }

    // expose all Slick DataView Events through dispatch
    for (const prop in dataView) {
      if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
        this._eventHandler.subscribe(dataView[prop], (e: any, args: any) => {
          return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
        });
      }
    }

    // expose GridState Service changes event through dispatch
    this.subscriptions.push(
      this.gridStateService.onGridStateChanged.subscribe((gridStateChange: GridStateChange) => {
        this.onGridStateChanged.emit(gridStateChange);
      })
    );


    // on cell click, mainly used with the columnDef.action callback
    this.gridEventService.attachOnCellChange(grid, dataView);
    this.gridEventService.attachOnClick(grid, dataView);

    this._eventHandler.subscribe(dataView.onRowCountChanged, (e: any, args: any) => {
      grid.updateRowCount();
      grid.render();
    });
    this._eventHandler.subscribe(dataView.onRowsChanged, (e: any, args: any) => {
      grid.invalidateRows(args.rows);
      grid.render();
    });

    // does the user have a colspan callback?
    if (gridOptions.colspanCallback) {
      this._dataView.getItemMetadata = (rowNumber: number) => {
        const item = this._dataView.getItem(rowNumber);
        return gridOptions.colspanCallback(item);
      };
    }
  }

  attachBackendCallbackFunctions(gridOptions: GridOption) {
    const backendApi = gridOptions.backendServiceApi;
    const serviceOptions: BackendServiceOption = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
    const isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);

    // update backend filters (if need be) before the query runs
    if (backendApi) {
      const backendService = backendApi.service;

      // if user entered some any "presets", we need to reflect them all in the grid
      if (gridOptions && gridOptions.presets) {
         // Filters "presets"
         if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
          backendService.updateFilters(gridOptions.presets.filters, true);
        }
        // Sorters "presets"
        if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
          backendService.updateSorters(undefined, gridOptions.presets.sorters);
        }
        // Pagination "presets"
        if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
          backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
        }
      } else {
        const columnFilters = this.filterService.getColumnFilters();
        if (columnFilters && backendService && backendService.updateFilters) {
          backendService.updateFilters(columnFilters, false);
        }
      }
    }

    if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
      const query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
      const observableOrPromise = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);

      // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
      setTimeout(async () => {
        // keep start time & end timestamps & return it after process execution
        const startTime = new Date();

        if (backendApi.preProcess) {
          backendApi.preProcess();
        }

        // the process could be an Observable (like HttpClient) or a Promise
        // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
        const processResult: GraphqlResult | any = await castToPromise(observableOrPromise);
        const endTime = new Date();

        // define what our internal Post Process callback, only available for GraphQL Service for now
        // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
        if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
          backendApi.internalPostProcess(processResult);
        }

        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
          const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
          if (processResult instanceof Object) {
            processResult.statistics = {
              startTime,
              endTime,
              executionTime: endTime.valueOf() - startTime.valueOf(),
              totalItemCount: this.gridOptions && this.gridOptions.pagination && this.gridOptions.pagination.totalItems
            };
          }
          backendApi.postProcess(processResult);
        }
      });
    }
  }

  attachResizeHook(grid: any, options: GridOption) {
    // expand/autofit columns on first page load
    if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
      grid.autosizeColumns();

      // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
      this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
    }

    // auto-resize grid on browser resize
    this.resizer.init(grid);
    if (options.enableAutoResize) {
      this.resizer.attachAutoResizeDataGrid({ height: this.gridHeight, width: this.gridWidth });
      if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
        grid.autosizeColumns();
      }
    }
  }

  executeAfterDataviewCreated(grid: any, gridOptions: GridOption, dataView: any) {
    // if user entered some Sort "presets", we need to reflect them all in the DOM
    if (gridOptions.enableSorting) {
      if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
        this.sortService.loadLocalPresets(grid, dataView);
      }
    }
  }

  mergeGridOptions(gridOptions): GridOption {
    gridOptions.gridId = this.gridId;
    gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;

    // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
    const options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);

    // also make sure to show the header row if user have enabled filtering
    this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
    if (options.enableFiltering && !options.showHeaderRow) {
      options.showHeaderRow = options.enableFiltering;
    }
    return options;
  }

  /**
   * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
   * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
   */
  paginationChanged(pagination: Pagination) {
    if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
      this.gridService.setSelectedRows([]);
    }

    this.gridStateService.onGridStateChanged.next({
      change: { newValues: pagination, type: GridStateType.pagination },
      gridState: this.gridStateService.getCurrentGridState()
    });
  }

  /**
   * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
   * @param dataset
   */
  refreshGridData(dataset: any[], totalCount?: number) {
    if (dataset && this.grid && this._dataView && typeof this._dataView.setItems === 'function') {
      this._dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
      if (!this.gridOptions.backendServiceApi) {
        this._dataView.reSort();
      }

      // this.grid.setData(dataset);
      this.grid.invalidate();
      this.grid.render();

      if (this.gridOptions.backendServiceApi) {
        // do we want to show pagination?
        // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
        this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;

        // before merging the grid options, make sure that it has the totalItems count
        // once we have that, we can merge and pass all these options to the pagination component
        if (!this.gridOptions.pagination) {
          this.gridOptions.pagination = (this.gridOptions.pagination) ? this.gridOptions.pagination : undefined;
        }
        if (this.gridOptions.pagination && totalCount) {
          this.gridOptions.pagination.totalItems = totalCount;
        }
        if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
          this.gridOptions.pagination.pageSize = this.gridOptions.presets.pagination.pageSize;
          this.gridOptions.pagination.pageNumber = this.gridOptions.presets.pagination.pageNumber;
        }
        this.gridPaginationOptions = this.mergeGridOptions(this.gridOptions);
      }

      // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
      if (this.grid && this.gridOptions.enableAutoResize) {
        const delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
        this.resizer.resizeGrid(delay || 10, { height: this.gridHeight, width: this.gridWidth });
      }
    }
  }

  /**
   * Dynamically change or update the column definitions list.
   * We will re-render the grid so that the new header and data shows up correctly.
   * If using i18n, we also need to trigger a re-translate of the column headers
   */
  updateColumnDefinitionsList(newColumnDefinitions) {
    if (this.gridOptions.enableTranslate) {
      this.controlAndPluginService.translateColumnHeaders(false, newColumnDefinitions);
    } else {
      this.controlAndPluginService.renderColumnHeaders(newColumnDefinitions);
    }

    if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
      this.grid.autosizeColumns();
    }
  }

  /** Toggle the filter row displayed on first row
   * @param isShowing
   */
  showHeaderRow(isShowing: boolean) {
    this.grid.setHeaderRowVisibility(isShowing);
    return isShowing;
  }

  /** Toggle the filter row displayed on first row */
  toggleHeaderRow() {
    const isShowing = !this.grid.getOptions().showHeaderRow;
    this.grid.setHeaderRowVisibility(isShowing);
    return isShowing;
  }

  //
  // private functions
  // ------------------

  /** Dispatch of Custom Event, which by default will bubble & is cancelable */
  private dispatchCustomEvent(eventName: string, data?: any, isBubbling: boolean = true, isCancelable: boolean = true) {
    const eventInit: CustomEventInit = { bubbles: isBubbling, cancelable: isCancelable };
    if (data) {
      eventInit.detail = data;
    }
    return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
  }

  /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
  private loadEditorCollectionAsync(column: Column) {
    const collectionAsync = column && column.editor && column.editor.collectionAsync;
    if (collectionAsync instanceof Observable) {
      this.subscriptions.push(
        collectionAsync.subscribe((resolvedCollection) => this.updateEditorCollection(column, resolvedCollection))
      );
    }
  }

  /**
   * Update the Editor "collection" property from an async call resolved
   * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
   * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
   */
  private updateEditorCollection(column: Column, newCollection: any[]) {
    column.editor.collection = newCollection;

    // find the new column reference pointer
    const columns = this.grid.getColumns();
    if (Array.isArray(columns)) {
      const columnRef: Column = columns.find((col: Column) => col.id === column.id);
      columnRef.internalColumnEditor = column.editor;
    }
  }
}
