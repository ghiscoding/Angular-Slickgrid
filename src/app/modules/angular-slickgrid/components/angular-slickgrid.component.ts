// import 3rd party vendor libs
// only import the necessary core lib, each will be imported on demand when enabled (via require)
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';

// ...then everything else...
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, Output, OnDestroy, OnInit, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import { GlobalGridOptions } from './../global-grid-options';
import { titleCase, unsubscribeAllObservables } from './../services/utilities';
import { executeBackendProcessesCallback, onBackendError } from '../services/backend-utilities';
import {
  AngularGridInstance,
  BackendServiceApi,
  BackendServiceOption,
  Column,
  ExtensionName,
  GraphqlResult,
  GridOption,
  GridStateChange,
  GridStateType,
  Locale,
  Pagination,
  SlickEventHandler,
} from './../models/index';
import { FilterFactory } from '../filters/filterFactory';
import { SlickgridConfig } from '../slickgrid-config';
import { isObservable, Observable, Subscription, Subject } from 'rxjs';

// Services
import { AngularUtilService } from '../services/angularUtil.service';
import { ExcelExportService } from '../services/excelExport.service';
import { ExportService } from './../services/export.service';
import { ExtensionService } from '../services/extension.service';
import { ExtensionUtility } from '../extensions/extensionUtility';
import { FilterService } from './../services/filter.service';
import { GraphqlService } from './../services/graphql.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { PaginationService } from '../services/pagination.service';
import { ResizerService } from './../services/resizer.service';
import { SharedService } from '../services/shared.service';
import { SortService } from './../services/sort.service';

// Extensions (SlickGrid Controls & Plugins)
import { AutoTooltipExtension } from '../extensions/autoTooltipExtension';
import { CellExternalCopyManagerExtension } from '../extensions/cellExternalCopyManagerExtension';
import { CheckboxSelectorExtension } from '../extensions/checkboxSelectorExtension';
import { ColumnPickerExtension } from '../extensions/columnPickerExtension';
import { DraggableGroupingExtension } from '../extensions/draggableGroupingExtension';
import { GridMenuExtension } from '../extensions/gridMenuExtension';
import { GroupItemMetaProviderExtension } from '../extensions/groupItemMetaProviderExtension';
import { HeaderButtonExtension } from '../extensions/headerButtonExtension';
import { HeaderMenuExtension } from '../extensions/headerMenuExtension';
import { RowDetailViewExtension } from '../extensions/rowDetailViewExtension';
import { RowMoveManagerExtension } from '../extensions/rowMoveManagerExtension';
import { RowSelectionExtension } from '../extensions/rowSelectionExtension';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

const slickgridEventPrefix = 'sg';

@Component({
  selector: 'angular-slickgrid',
  templateUrl: './angular-slickgrid.component.html',
  providers: [
    // make everything transient (non-singleton)
    AngularUtilService,
    AutoTooltipExtension,
    CellExternalCopyManagerExtension,
    CheckboxSelectorExtension,
    ColumnPickerExtension,
    DraggableGroupingExtension,
    ExcelExportService,
    ExtensionService,
    ExportService,
    ExtensionUtility,
    FilterFactory,
    FilterService,
    GraphqlService,
    GridEventService,
    GridMenuExtension,
    GridService,
    GridStateService,
    GroupingAndColspanService,
    GroupItemMetaProviderExtension,
    HeaderButtonExtension,
    HeaderMenuExtension,
    PaginationService,
    ResizerService,
    RowDetailViewExtension,
    RowMoveManagerExtension,
    RowSelectionExtension,
    SharedService,
    SortService,
    SlickgridConfig
  ]
})
export class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
  private _dataset: any[];
  private _columnDefinitions: Column[];
  private _eventHandler: SlickEventHandler = new Slick.EventHandler();
  private _fixedHeight: number | null;
  private _fixedWidth: number | null;
  private _hideHeaderRowAfterPageLoad = false;
  dataView: any;
  grid: any;
  gridHeightString: string;
  gridWidthString: string;
  groupingDefinition: any = {};
  groupItemMetadataProvider: any;
  backendServiceApi: BackendServiceApi;
  locales: Locale;
  paginationOptions: Pagination;
  showPagination = false;
  totalItems = 0;
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
  @Output() onGridBeforeExportToFile = this.exportService.onGridBeforeExportToFile;
  @Output() onGridAfterExportToFile = this.exportService.onGridAfterExportToFile;
  @Output() onGridBeforeExportToExcel = this.excelExportService.onGridBeforeExportToExcel;
  @Output() onGridAfterExportToExcel = this.excelExportService.onGridAfterExportToExcel;
  @Input() customDataView: any;
  @Input() gridId: string;
  @Input() gridOptions: GridOption;

  @Input()
  set gridHeight(height: number) {
    this._fixedHeight = height;
  }
  @Input()
  set gridWidth(width: number) {
    this._fixedWidth = width;
  }

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
    return this.dataView.getItems();
  }

  get elementRef(): ElementRef {
    return this.elm;
  }

  constructor(
    private elm: ElementRef,
    private excelExportService: ExcelExportService,
    private exportService: ExportService,
    private extensionService: ExtensionService,
    private extensionUtility: ExtensionUtility,
    private filterService: FilterService,
    private gridEventService: GridEventService,
    private gridService: GridService,
    private gridStateService: GridStateService,
    private groupingAndColspanService: GroupingAndColspanService,
    private paginationService: PaginationService,
    private resizer: ResizerService,
    private sharedService: SharedService,
    private sortService: SortService,
    @Optional() private translate: TranslateService,
    @Inject('config') private forRootConfig: GridOption
  ) { }

  ngAfterViewInit() {
    this.initialization();
    this.isGridInitialized = true;

    // user must provide a "gridHeight" or use "autoResize: true" in the grid options
    if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
      throw new Error(
        `[Angular-Slickgrid] requires a "grid-height" or the "enableAutoResize" grid option to be enabled.
        Without that the grid will seem empty while in fact it just does not have any height define.`
      );
    }
  }

  ngOnInit(): void {
    this.onBeforeGridCreate.emit(true);

    if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
      this.gridHeightString = `${this._fixedHeight}px`;
      this.gridWidthString = `${this._fixedWidth}px`;
    }
  }

  ngOnDestroy(): void {
    this.onBeforeGridDestroy.emit(this.grid);
    this.destroy();
    this.onAfterGridDestroyed.emit(true);
  }

  destroy(shouldEmptyDomElementContainer = false) {
    this.dataView = undefined;
    this.gridOptions = {};
    this.extensionService.dispose();
    this.filterService.dispose();
    this.gridEventService.dispose();
    this.gridStateService.dispose();
    this.groupingAndColspanService.dispose();
    this.paginationService.dispose();
    this.resizer.dispose();
    this.sortService.dispose();
    if (this._eventHandler && this._eventHandler.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
    if (this.grid && this.grid.destroy) {
      this.grid.destroy();
    }

    // we could optionally also empty the content of the grid container DOM element
    if (shouldEmptyDomElementContainer) {
      this.destroyGridContainerElm();
    }

    // also unsubscribe all RxJS subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  destroyGridContainerElm() {
    const gridContainerId = this.gridOptions && this.gridOptions.gridContainerId || 'grid1';
    $(gridContainerId).empty();
  }

  /** Dispatch of Custom Event, which by default will bubble & is cancelable */
  dispatchCustomEvent(eventName: string, data?: any, isBubbling: boolean = true, isCancelable: boolean = true) {
    const eventInit: CustomEventInit = { bubbles: isBubbling, cancelable: isCancelable };
    if (data) {
      eventInit.detail = data;
    }
    return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
  }

  /**
   * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
   * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
   */
  createBackendApiInternalPostProcessCallback(gridOptions: GridOption) {
    const backendApi = gridOptions && gridOptions.backendServiceApi;
    if (backendApi && backendApi.service) {
      // internalPostProcess only works (for now) with a GraphQL Service, so make sure it is of that type
      if (backendApi.service instanceof GraphqlService || typeof backendApi.service.getDatasetName === 'function') {
        backendApi.internalPostProcess = (processResult: GraphqlResult) => {
          const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
          this._dataset = [];
          if (processResult && processResult.data && processResult.data[datasetName]) {
            this._dataset = processResult.data[datasetName].nodes;
            this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
          }
        };
      }
    }
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
    if (Array.isArray(dataset) && this.grid && this.dataView && typeof this.dataView.setItems === 'function') {
      this.dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
      if (!this.gridOptions.backendServiceApi) {
        this.dataView.reSort();
      }

      if (dataset) {
        this.grid.invalidate();
        this.grid.render();
      }

      if (this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.pagination) {
        // do we want to show pagination?
        // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
        this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;

        if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
          this.paginationOptions.pageSize = this.gridOptions.presets.pagination.pageSize;
          this.paginationOptions.pageNumber = this.gridOptions.presets.pagination.pageNumber;
        }

        // when we have a totalCount use it, else we'll take it from the pagination object
        // only update the total items if it's different to avoid refreshing the UI
        const totalRecords = totalCount !== undefined ? totalCount : this.gridOptions.pagination.totalItems;
        if (totalRecords !== this.totalItems) {
          this.totalItems = totalRecords;
        }
      } else {
        // without backend service, we'll assume the total of items is the dataset size
        this.totalItems = dataset.length;
      }

      // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
      if (this.grid && this.gridOptions.enableAutoResize) {
        const delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
        this.resizer.resizeGrid(delay || 10);
      }
    }
  }

  /**
   * Dynamically change or update the column definitions list.
   * We will re-render the grid so that the new header and data shows up correctly.
   * If using i18n, we also need to trigger a re-translate of the column headers
   */
  updateColumnDefinitionsList(newColumnDefinitions) {
    // map/swap the internal library Editor to the SlickGrid Editor factory
    newColumnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(newColumnDefinitions);

    if (this.gridOptions.enableTranslate) {
      this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
    } else {
      this.extensionService.renderColumnHeaders(newColumnDefinitions);
    }

    if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
      this.grid.autosizeColumns();
    }
  }

  /**
   * Show the filter row displayed on first row, we can optionally pass false to hide it.
   * @param showing
   */
  showHeaderRow(showing = true) {
    this.grid.setHeaderRowVisibility(showing);
    return showing;
  }

  //
  // private functions
  // ------------------

  private bindDifferentHooks(grid: any, gridOptions: GridOption, dataView: any) {
    // on locale change, we have to manually translate the Headers, GridMenu
    if (this.translate && this.translate.onLangChange) {
      this.subscriptions.push(
        this.translate.onLangChange.subscribe((event) => {
          if (gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders();
            this.extensionService.translateColumnPicker();
            this.extensionService.translateGridMenu();
            this.extensionService.translateHeaderMenu();
          }
        })
      );
    }

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

    // bind external sorting (backend) when available or default onSort (dataView)
    if (gridOptions.enableSorting && !this.customDataView) {
      gridOptions.backendServiceApi ? this.sortService.bindBackendOnSort(grid, dataView) : this.sortService.bindLocalOnSort(grid, dataView);
    }

    // bind external filter (backend) when available or default onFilter (dataView)
    if (gridOptions.enableFiltering && !this.customDataView) {
      this.filterService.init(grid);

      // if user entered some Filter "presets", we need to reflect them all in the DOM
      if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
        this.filterService.populateColumnFilterSearchTermPresets(gridOptions.presets.filters);
      }
      gridOptions.backendServiceApi ? this.filterService.bindBackendOnFilter(grid, this.dataView) : this.filterService.bindLocalOnFilter(grid, this.dataView);
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
        this._eventHandler.subscribe(grid[prop], (event: Event, args: any) => {
          return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: event, args });
        });
      }
    }

    // expose all Slick DataView Events through dispatch
    for (const prop in dataView) {
      if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
        this._eventHandler.subscribe(dataView[prop], (event: Event, args: any) => {
          return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: event, args });
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
    this.gridEventService.bindOnCellChange(grid, dataView);
    this.gridEventService.bindOnClick(grid, dataView);

    if (dataView && grid) {
      this._eventHandler.subscribe(dataView.onRowCountChanged, () => grid.invalidate());

      // without this, filtering data with local dataset will not always show correctly
      // also don't use "invalidateRows" since it destroys the entire row and as bad user experience when updating a row
      // see commit: https://github.com/ghiscoding/Angular-Slickgrid/commit/bb62c0aa2314a5d61188ff005ccb564577f08805
      if (gridOptions && gridOptions.enableFiltering && !gridOptions.enableRowDetailView) {
        this._eventHandler.subscribe(dataView.onRowsChanged, (e: any, args: any) => {
          if (args && args.rows && Array.isArray(args.rows)) {
            args.rows.forEach((row) => grid.updateRow(row));
            grid.render();
          }
        });
      }
    }

    // does the user have a colspan callback?
    if (gridOptions && gridOptions.colspanCallback && dataView && dataView.getItem && dataView.getItemMetadata) {
      dataView.getItemMetadata = (rowNumber: number) => {
        let callbackResult = null;
        if (gridOptions.colspanCallback && gridOptions.colspanCallback) {
          callbackResult = gridOptions.colspanCallback(dataView.getItem(rowNumber));
        }
        return callbackResult;
      };
    }
  }

  private bindBackendCallbackFunctions(gridOptions: GridOption) {
    const backendApi = gridOptions.backendServiceApi;
    const backendApiService = backendApi && backendApi.service;
    const serviceOptions: BackendServiceOption = backendApiService && backendApiService.options || {};
    const isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);

    if (backendApiService) {
      // update backend filters (if need be) BEFORE the query runs (via the onInit command a few lines below)
      // if user entered some any "presets", we need to reflect them all in the grid
      if (gridOptions && gridOptions.presets) {
        // Filters "presets"
        if (backendApiService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
          backendApiService.updateFilters(gridOptions.presets.filters, true);
        }
        // Sorters "presets"
        if (backendApiService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
          backendApiService.updateSorters(undefined, gridOptions.presets.sorters);
        }
        // Pagination "presets"
        if (backendApiService.updatePagination && gridOptions.presets.pagination) {
          const { pageNumber, pageSize } = gridOptions.presets.pagination;
          backendApiService.updatePagination(pageNumber, pageSize);
        }
      } else {
        const columnFilters = this.filterService.getColumnFilters();
        if (columnFilters && backendApiService.updateFilters) {
          backendApiService.updateFilters(columnFilters, false);
        }
      }

      // execute onInit command when necessary
      if (backendApi && backendApiService && (backendApi.onInit || isExecuteCommandOnInit)) {
        const query = (typeof backendApiService.buildQuery === 'function') ? backendApiService.buildQuery() : '';
        const process = (isExecuteCommandOnInit) ? (backendApi.process && backendApi.process(query) || null) : (backendApi.onInit && backendApi.onInit(query) || null);

        // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
        setTimeout(() => {
          // keep start time & end timestamps then return these metrics after the process execution
          const startTime = new Date();

          // run any pre-process, if defined, for example a spinner
          if (backendApi.preProcess) {
            backendApi.preProcess();
          }

          // the processes can be Promises or Observables (like Angular HttpClient)
          if (process instanceof Promise && process.then) {
            process.then((processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, this.gridOptions.pagination.totalItems))
              .catch((error: any) => onBackendError(error, backendApi));
          } else if (isObservable(process)) {
            process.subscribe(
              (processResult: GraphqlResult | any) => executeBackendProcessesCallback(startTime, processResult, backendApi, this.gridOptions.pagination.totalItems),
              (error: any) => onBackendError(error, backendApi)
            );
          }
        });
      }
    }
  }

  private bindResizeHook(grid: any, options: GridOption) {
    // expand/autofit columns on first page load
    if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
      grid.autosizeColumns();

      // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
      this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
    }

    // auto-resize grid on browser resize
    if (this._fixedHeight || this._fixedWidth) {
      this.resizer.init(grid, { height: this._fixedHeight, width: this._fixedWidth });
    } else {
      this.resizer.init(grid);
    }
    if (options.enableAutoResize) {
      this.resizer.bindAutoResizeDataGrid();
      if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
        grid.autosizeColumns();
      }
    }
  }

  private executeAfterDataviewCreated(grid: any, gridOptions: GridOption, dataView: any) {
    // if user entered some Sort "presets", we need to reflect them all in the DOM
    if (gridOptions.enableSorting) {
      if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
        this.sortService.loadGridSorters(gridOptions.presets.sorters);
      }
    }
  }

  private initialization() {
    // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
    this._dataset = this._dataset || [];
    this.gridOptions = this.mergeGridOptions(this.gridOptions);
    this.paginationOptions = this.gridOptions.pagination;
    this.locales = this.gridOptions && this.gridOptions.locales || Constants.locales;
    this.backendServiceApi = this.gridOptions && this.gridOptions.backendServiceApi;
    this.createBackendApiInternalPostProcessCallback(this.gridOptions);

    if (!this.customDataView) {
      if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
        this.extensionUtility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
        this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
        this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
        this.dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
      } else {
        this.dataView = new Slick.Data.DataView();
      }
    }

    // for convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
    // however "editor" is used internally by SlickGrid for it's own Editor Factory
    // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
    // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
    this._columnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(this._columnDefinitions);

    // save reference for all columns before they optionally become hidden/visible
    this.sharedService.allColumns = this._columnDefinitions;
    this.sharedService.visibleColumns = this._columnDefinitions;
    this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);

    // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
    this.grid = new Slick.Grid(`#${this.gridId}`, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);

    this.sharedService.dataView = this.dataView;
    this.sharedService.grid = this.grid;

    this.extensionService.bindDifferentExtensions();
    this.bindDifferentHooks(this.grid, this.gridOptions, this.dataView);

    // emit the Grid & DataView object to make them available in parent component
    this.onGridCreated.emit(this.grid);

    // initialize the SlickGrid grid
    this.grid.init();

    if (!this.customDataView && (this.dataView && this.dataView.beginUpdate && this.dataView.setItems && this.dataView.endUpdate)) {
      this.onDataviewCreated.emit(this.dataView);
      this.dataView.beginUpdate();
      this.dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
      this.dataView.endUpdate();

      // if you don't want the items that are not visible (due to being filtered out or being on a different page)
      // to stay selected, pass 'false' to the second arg
      if (this.gridOptions && this.gridOptions.dataView && this.gridOptions.dataView.hasOwnProperty('syncGridSelection')) {
        const syncGridSelection = this.gridOptions.dataView.syncGridSelection;
        if (typeof syncGridSelection === 'boolean') {
          this.dataView.syncGridSelection(this.grid, this.gridOptions.dataView.syncGridSelection);
        } else {
          this.dataView.syncGridSelection(this.grid, syncGridSelection.preserveHidden, syncGridSelection.preserveHiddenOnSelectionChange);
        }
      }
    }

    // user might want to hide the header row on page load but still have `enableFiltering: true`
    // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
    if (this._hideHeaderRowAfterPageLoad) {
      this.showHeaderRow(false);
    }

    // after the DataView is created & updated execute some processes
    this.executeAfterDataviewCreated(this.grid, this.gridOptions, this.dataView);

    // bind resize ONLY after the dataView is ready
    this.bindResizeHook(this.grid, this.gridOptions);

    // bind & initialize grouping and header grouping colspan service
    if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
      this.groupingAndColspanService.init(this.grid, this.dataView);
    }

    // bind & initialize the grid service
    this.gridService.init(this.grid, this.dataView);

    // when user enables translation, we need to translate Headers on first pass & subsequently in the bindDifferentHooks
    if (this.gridOptions.enableTranslate) {
      this.extensionService.translateColumnHeaders();
    }

    // if Export is enabled, initialize the service with the necessary grid and other objects
    if (this.gridOptions.enableExport) {
      this.exportService.init(this.grid, this.dataView);
    }

    // if Excel Export is enabled, initialize the service with the necessary grid and other objects
    if (this.gridOptions.enableExcelExport && this.sharedService) {
      this.excelExportService.init(this.grid, this.dataView);
    }

    // once all hooks are in placed and the grid is initialized, we can emit an event
    this.onGridInitialized.emit(this.grid);

    // bind the Backend Service API callback functions only after the grid is initialized
    // because the preProcess() and onInit() might get triggered
    if (this.gridOptions && this.gridOptions.backendServiceApi) {
      this.bindBackendCallbackFunctions(this.gridOptions);
    }

    this.gridStateService.init(this.grid);

    this.onAngularGridCreated.emit({
      // Slick Grid & DataView objects
      dataView: this.dataView,
      slickGrid: this.grid,

      // public methods
      destroy: this.destroy.bind(this),

      // return all available Services (non-singleton)
      backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
      excelExportService: this.excelExportService,
      exportService: this.exportService,
      extensionService: this.extensionService,
      filterService: this.filterService,
      gridEventService: this.gridEventService,
      gridStateService: this.gridStateService,
      gridService: this.gridService,
      groupingService: this.groupingAndColspanService,
      paginationService: this.paginationService,
      resizerService: this.resizer,
      sortService: this.sortService,

      /** @deprecated please use "extensionService" instead */
      pluginService: this.extensionService,
    });
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

  private mergeGridOptions(gridOptions): GridOption {
    gridOptions.gridId = this.gridId;
    gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;

    // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
    const options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);

    // using jQuery extend to do a deep clone has an unwanted side on objects and pageSizes but ES6 spread has other worst side effects
    // so we will just overwrite the pageSizes when needed, this is the only one causing issues so far.
    // jQuery wrote this on their docs:: On a deep extend, Object and Array are extended, but object wrappers on primitive types such as String, Boolean, and Number are not.
    if (gridOptions && gridOptions.backendServiceApi) {
      if (gridOptions.pagination && Array.isArray(gridOptions.pagination.pageSizes) && gridOptions.pagination.pageSizes.length > 0) {
        options.pagination.pageSizes = gridOptions.pagination.pageSizes;
      }
    }

    // also make sure to show the header row if user have enabled filtering
    this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
    if (options.enableFiltering && !options.showHeaderRow) {
      options.showHeaderRow = options.enableFiltering;
    }
    return options;
  }

  /**
   * For convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
   * however "editor" is used internally by SlickGrid for it's own Editor Factory
   * so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
   * then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
   */
  private swapInternalEditorToSlickGridFactoryEditor(columnDefinitions: Column[]) {
    return columnDefinitions.map((column: Column | any) => {
      // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
      if (column.editor && column.editor.collectionAsync) {
        this.loadEditorCollectionAsync(column);
      }
      return { ...column, editor: column.editor && column.editor.model, internalColumnEditor: { ...column.editor } };
    });
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
