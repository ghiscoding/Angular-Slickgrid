// import 3rd party vendor libs
import 'slickgrid/lib/jquery-ui-1.11.3';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import 'slickgrid/controls/slick.columnpicker';
import 'slickgrid/controls/slick.gridmenu';
import 'slickgrid/controls/slick.pager';
import 'slickgrid/plugins/slick.autotooltips';
import 'slickgrid/plugins/slick.cellcopymanager';
import 'slickgrid/plugins/slick.cellexternalcopymanager';
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import 'slickgrid/plugins/slick.checkboxselectcolumn';
import 'slickgrid/plugins/slick.headerbuttons';
import 'slickgrid/plugins/slick.headermenu';
import 'slickgrid/plugins/slick.rowmovemanager';
import 'slickgrid/plugins/slick.rowselectionmodel';
import { AfterViewInit, Component, EventEmitter, Inject, Injectable, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { castToPromise } from './../services/utilities';
import { GlobalGridOptions } from './../global-grid-options';
import { BackendServiceOption, Column, GridOption } from './../models';
import { ControlAndPluginService } from './../services/controlAndPlugin.service';
import { ExportService } from './../services/export.service';
import { FilterService } from './../services/filter.service';
import { GraphqlService } from './../services/graphql.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridExtraService } from './../services/gridExtra.service';
import { ResizerService } from './../services/resizer.service';
import { SortService } from './../services/sort.service';
import { TranslateService } from '@ngx-translate/core';
import $ from 'jquery';
import { Subscription } from 'rxjs/Subscription';

// using external non-typed js libraries in Angular
declare var Slick: any;
declare var $: any;

@Injectable()
@Component({
  selector: 'angular-slickgrid',
  template: `
    <div id="slickGridContainer-{{gridId}}" class="gridPane">
    <div attr.id='{{gridId}}'
            class="slickgrid-container"
            [style.height]="gridHeightString"
            [style.width]="gridWidthString">
    </div>

    <slick-pagination id="slickPagingContainer-{{gridId}}" *ngIf="showPagination" [gridPaginationOptions]="gridPaginationOptions"></slick-pagination>
    </div>
  `
})
export class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
  private _dataset: any[];
  private _dataView: any;
  private _eventHandler: any = new Slick.EventHandler();
  private _gridOptions: GridOption;
  private _translateSubscription: Subscription;
  grid: any;
  gridPaginationOptions: GridOption;
  gridHeightString: string;
  gridWidthString: string;
  groupingDefinition: any = {};
  showPagination = false;

  @Output() dataviewChanged = new EventEmitter<any>();
  @Output() gridChanged = new EventEmitter<any>();
  @Output() onDataviewCreated = new EventEmitter<any>();
  @Output() onGridCreated = new EventEmitter<any>();
  @Output() onGridInitialized = new EventEmitter<any>();
  @Output() onBeforeGridCreate = new EventEmitter<boolean>();
  @Output() onBeforeGridDestroy = new EventEmitter<any>();
  @Output() onAfterGridDestroyed = new EventEmitter<boolean>();
  @Input() gridId: string;
  @Input() columnDefinitions: Column[];
  @Input() gridOptions: GridOption;
  @Input() gridHeight = 100;
  @Input() gridWidth = 600;
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
    private exportService: ExportService,
    private filterService: FilterService,
    private gridExtraService: GridExtraService,
    private gridEventService: GridEventService,
    private resizer: ResizerService,
    private sortService: SortService,
    private translate: TranslateService,
    @Inject('config') private forRootConfig: GridOption
  ) {}

  ngOnInit(): void {
    this.onBeforeGridCreate.emit(true);
    this.gridHeightString = `${this.gridHeight}px`;
    this.gridWidthString = `${this.gridWidth}px`;
  }

  ngOnDestroy(): void {
    this.onBeforeGridDestroy.emit(this.grid);
    this.destroy();
    this.onAfterGridDestroyed.emit(true);
  }

  destroy() {
    this._dataView = [];
    this._gridOptions = {};
    this._eventHandler.unsubscribeAll();
    this.controlAndPluginService.dispose();
    this.gridEventService.dispose();
    this.filterService.dispose();
    this.resizer.dispose();
    this.sortService.dispose();
    this.grid.destroy();
    if (this._translateSubscription) {
      this._translateSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
    this._dataset = this._dataset || [];
    this._gridOptions = this.mergeGridOptions();
    this.createBackendApiInternalPostProcessCallback(this._gridOptions);

    this._dataView = new Slick.Data.DataView();
    this.controlAndPluginService.createPluginBeforeGridCreation(this.columnDefinitions, this._gridOptions);
    this.grid = new Slick.Grid(`#${this.gridId}`, this._dataView, this.columnDefinitions, this._gridOptions);

    this.controlAndPluginService.attachDifferentControlOrPlugins(this.grid, this.columnDefinitions, this._gridOptions, this._dataView);
    this.attachDifferentHooks(this.grid, this._gridOptions, this._dataView);

    // emit the Grid & DataView object to make them available in parent component
    this.onGridCreated.emit(this.grid);
    this.onDataviewCreated.emit(this._dataView);

    // OBSOLETE in future releases, previous emitter functions (decided to rename them with onX prefix)
    this.gridChanged.emit('DEPRECATED and replaced by "onGridCreated" Event Emitter.');
    this.dataviewChanged.emit('DEPRECATED and replaced by "onDataviewCreated" Event Emitter.');

    this.grid.init();
    this._dataView.beginUpdate();
    this._dataView.setItems(this._dataset);
    this._dataView.endUpdate();

    // attach resize ONLY after the dataView is ready
    this.attachResizeHook(this.grid, this._gridOptions);

    // attach grid extra service
    this.gridExtraService.init(this.grid, this.columnDefinitions, this._gridOptions, this._dataView);

    // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
    if (this._gridOptions.enableTranslate) {
      this.controlAndPluginService.translateHeaders();
    }

    // if Export is enabled, initialize the service with the necessary grid and other objects
    if (this._gridOptions.enableExport) {
      this.exportService.init(this.grid, this._gridOptions, this._dataView);
    }

    // once all hooks are in placed and the grid is initialized, we can emit an event
    this.onGridInitialized.emit(this.grid);

    // attach the Backend Service API callback functions only after the grid is initialized
    // because the preProcess() and onInit() might get triggered
    if (this._gridOptions && (this._gridOptions.backendServiceApi || this._gridOptions.onBackendEventApi)) {
      this.attachBackendCallbackFunctions(this._gridOptions);
    }
  }

  /**
   * Define what our internal Post Process callback, it will execute internally after we get back result from the Process backend call
   * For now, this is GraphQL Service only feautre and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
   */
  createBackendApiInternalPostProcessCallback(gridOptions: GridOption) {
    if (gridOptions && (gridOptions.backendServiceApi || gridOptions.onBackendEventApi)) {
      const backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;

      // internalPostProcess only works with a GraphQL Service, so make sure it is that type
      if (backendApi && backendApi.service && backendApi.service instanceof GraphqlService) {
        backendApi.internalPostProcess = (processResult: any) => {
          const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
          if (!processResult || !processResult.data || !processResult.data[datasetName]) {
            throw new Error(`Your GraphQL result is invalid and/or does not follow the required result structure. Please check the result and/or review structure to use in Angular-Slickgrid Wiki in the GraphQL section.`);
          }
          this._dataset = processResult.data[datasetName].nodes;
          this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
        };
      }
    }
  }

  attachDifferentHooks(grid: any, gridOptions: GridOption, dataView: any) {
    // on locale change, we have to manually translate the Headers, GridMenu
    this._translateSubscription = this.translate.onLangChange.subscribe((event) => {
      if (gridOptions.enableTranslate) {
        this.controlAndPluginService.translateHeaders();
        this.controlAndPluginService.translateColumnPicker();
        this.controlAndPluginService.translateGridMenu();
      }
    });

    // attach external sorting (backend) when available or default onSort (dataView)
    if (gridOptions.enableSorting) {
      (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) ? this.sortService.attachBackendOnSort(grid, gridOptions) : this.sortService.attachLocalOnSort(grid, gridOptions, this._dataView);
    }

    // attach external filter (backend) when available or default onFilter (dataView)
    if (gridOptions.enableFiltering) {
      this.filterService.init(grid, gridOptions, this.columnDefinitions);

      // if user entered some "presets", we need to reflect them all in the DOM
      if (gridOptions.presets && gridOptions.presets.filters) {
        this.filterService.populateColumnFilterSearchTerms(gridOptions, this.columnDefinitions);
      }
      (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) ? this.filterService.attachBackendOnFilter(grid, gridOptions) : this.filterService.attachLocalOnFilter(grid, gridOptions, this._dataView);
    }

    // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
    if (gridOptions.backendServiceApi || gridOptions.onBackendEventApi) {
      if (gridOptions.onBackendEventApi) {
        console.warn(`"onBackendEventApi" has been DEPRECATED, please consider using "backendServiceApi" in the short term since "onBackendEventApi" will be removed in future versions. You can take look at the Angular-Slickgrid Wikis for OData/GraphQL Services implementation`);
      }

      if (gridOptions.backendServiceApi && gridOptions.backendServiceApi.service) {
        gridOptions.backendServiceApi.service.initOptions(gridOptions.backendServiceApi.options || {}, gridOptions.pagination, this.gridOptions, this.columnDefinitions);
      }
    }

    // on cell click, mainly used with the columnDef.action callback
    this.gridEventService.attachOnCellChange(grid, this._gridOptions, dataView);
    this.gridEventService.attachOnClick(grid, this._gridOptions, dataView);

    this._eventHandler.subscribe(dataView.onRowCountChanged, (e: any, args: any) => {
      grid.updateRowCount();
      grid.render();
    });
    this._eventHandler.subscribe(dataView.onRowsChanged, (e: any, args: any) => {
      grid.invalidateRows(args.rows);
      grid.render();
    });
  }

  attachBackendCallbackFunctions(gridOptions: GridOption) {
    const backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
    const serviceOptions: BackendServiceOption = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
    const isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);

    // update backend filters (if need be) before the query runs
    if (gridOptions && gridOptions.presets) {
      if (gridOptions.presets.filters) {
        backendApi.service.updateFilters(gridOptions.presets.filters, true);
      }
    } else {
      const columnFilters = this.filterService.getColumnFilters();
      if (columnFilters) {
        backendApi.service.updateFilters(columnFilters);
      }
    }

    if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
      const query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
      const observableOrPromise = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);

      // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
      setTimeout(async () => {
        if (backendApi.preProcess) {
          backendApi.preProcess();
        }

        // the process could be an Observable (like HttpClient) or a Promise
        // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
        const processResult = await castToPromise(observableOrPromise);

        // define what our internal Post Process callback, only available for GraphQL Service for now
        // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
        if (processResult && backendApi && backendApi.service instanceof GraphqlService && backendApi.internalPostProcess) {
          backendApi.internalPostProcess(processResult);
        }

        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
          backendApi.postProcess(processResult);
        }
      });
    }
  }

  attachResizeHook(grid: any, options: GridOption) {
    // expand/autofit columns on first page load
    if (grid && options.autoFitColumnsOnFirstLoad) {
      grid.autosizeColumns();
    }

    // auto-resize grid on browser resize
    this.resizer.init(grid, options);
    if (options.enableAutoResize) {
      this.resizer.attachAutoResizeDataGrid();
      if (grid && options.autoFitColumnsOnFirstLoad) {
        grid.autosizeColumns();
      }
    } else {
      this.resizer.resizeGrid(0, { height: this.gridHeight, width: this.gridWidth });
    }
  }

  mergeGridOptions(): GridOption {
    this.gridOptions.gridId = this.gridId;
    this.gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
    if (this.gridOptions.enableFiltering || this.forRootConfig.enableFiltering) {
      this.gridOptions.showHeaderRow = true;
    }
    // use jquery extend to deep merge and avoid immutable properties changed in GlobalGridOptions after route change
    return $.extend(true, {}, GlobalGridOptions, this.forRootConfig, this.gridOptions);
  }

  /**
   * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
   * @param dataset
   */
  refreshGridData(dataset: any[], totalCount?: number) {
    if (dataset && this.grid) {
      this._dataView.setItems(dataset);

      // this.grid.setData(dataset);
      this.grid.invalidate();
      this.grid.render();

      if (this._gridOptions.enablePagination || this._gridOptions.backendServiceApi) {
        // do we want to show pagination?
        // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
        this.showPagination = ((this._gridOptions.backendServiceApi && this._gridOptions.enablePagination === undefined) ? true : this._gridOptions.enablePagination) || false;

        // before merging the grid options, make sure that it has the totalItems count
        // once we have that, we can merge and pass all these options to the pagination component
        if (!this.gridOptions.pagination) {
          this.gridOptions.pagination = (this._gridOptions.pagination) ? this._gridOptions.pagination : undefined;
        }
        if (this.gridOptions.pagination && totalCount) {
          this.gridOptions.pagination.totalItems = totalCount;
        }
        this.gridPaginationOptions = this.mergeGridOptions();
      }
      if (this.grid &&  this._gridOptions.enableAutoResize) {
        // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
        this.resizer.resizeGrid(10);
        // this.grid.autosizeColumns();
      }
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
}
