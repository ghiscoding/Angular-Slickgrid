// import 3rd party vendor libs
// only import the necessary core lib, each will be imported on demand when enabled (via require)
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/lib/jquery.mousewheel';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
import 'slickgrid/slick.groupitemmetadataprovider';

// ...then everything else...
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output, OnDestroy, OnInit, Optional, ApplicationRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isObservable, Observable, Subscription } from 'rxjs';

import {
  // interfaces/types
  AutoCompleteEditor,
  BackendServiceApi,
  BackendServiceOption,
  Column,
  ColumnEditor,
  CustomFooterOption,
  DataViewOption,
  EventSubscription,
  ExtensionList,
  ExternalResource,
  GetSlickEventType,
  GridStateType,
  Locale,
  Metrics,
  Pagination,
  SelectEditor,
  ServicePagination,
  SlickDataView,
  SlickEventHandler,
  SlickGrid,
  SlickNamespace,

  // services
  BackendUtilityService,
  CollectionService,
  EventNamingStyle,
  ExtensionService,
  FilterFactory,
  FilterService,
  GridEventService,
  GridService,
  GridStateService,
  GroupingAndColspanService,
  // Observable,
  PaginationService,
  RxJsFacade,
  SharedService,
  SlickgridConfig,
  SortService,
  TreeDataService,

  // extensions
  AutoTooltipExtension,
  CheckboxSelectorExtension,
  CellExternalCopyManagerExtension,
  CellMenuExtension,
  ColumnPickerExtension,
  ContextMenuExtension,
  DraggableGroupingExtension,
  ExtensionUtility,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  HeaderMenuExtension,
  HeaderButtonExtension,
  RowSelectionExtension,
  RowMoveManagerExtension,

  // utilities
  emptyElement,
  titleCase,
} from '@slickgrid-universal/common';
import { SlickEmptyWarningComponent } from '@slickgrid-universal/empty-warning-component';

import { Constants } from '../constants';
import { EventPubSubService } from '../services/eventPubSub.service';
import { GlobalGridOptions } from './../global-grid-options';
import { TranslaterService } from '../services/translater.service';
import { unsubscribeAllObservables } from './../services/utilities';
import {
  AngularGridInstance,
  // BackendServiceApi,
  // BackendServiceOption,
  // Column,
  // ColumnEditor,
  // CustomFooterOption,
  // DataViewOption,
  // GraphqlPaginatedResult,
  // GraphqlResult,
  GridOption,
  // GridStateChange,
  // GridStateType,
  // Locale,
  // Metrics,
  // Pagination,
  // ServicePagination,
  // SlickEventHandler,
} from './../models/index';
// import { FilterFactory } from '../filters/filterFactory';
import { autoAddEditorFormatterToColumnsWithEditor } from './slick-vanilla-utilities';
// import { SlickgridConfig } from '../slickgrid-config';
// import { SlickEmptyWarningComponent } from './slick-empty-warning.component';

// Services
import { AngularUtilService } from '../services/angularUtil.service';
// import { ExcelExportService } from '../services/excelExport.service';
// import { ExportService } from './../services/export.service';
// import { ExtensionService } from '../services/extension.service';
// import { ExtensionUtility } from '../extensions/extensionUtility';
// import { FilterService } from './../services/filter.service';
// import { GraphqlService } from './../services/graphql.service';
// import { GridEventService } from './../services/gridEvent.service';
// import { GridService } from './../services/grid.service';
// import { GridStateService } from './../services/gridState.service';
// import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
// import { PaginationService } from '../services/pagination.service';
import { ResizerService } from './../services/resizer.service';
// import { SharedService } from '../services/shared.service';
// import { SortService } from './../services/sort.service';
// import { TreeDataService } from './../services/treeData.service';

// Extensions (SlickGrid Controls & Plugins)
// import { AutoTooltipExtension } from '../extensions/autoTooltipExtension';
// import { CellExternalCopyManagerExtension } from '../extensions/cellExternalCopyManagerExtension';
// import { CellMenuExtension } from '../extensions/cellMenuExtension';
// import { CheckboxSelectorExtension } from '../extensions/checkboxSelectorExtension';
// import { ColumnPickerExtension } from '../extensions/columnPickerExtension';
// import { ContextMenuExtension } from '../extensions/contextMenuExtension';
// import { DraggableGroupingExtension } from '../extensions/draggableGroupingExtension';
// import { GridMenuExtension } from '../extensions/gridMenuExtension';
// import { GroupItemMetaProviderExtension } from '../extensions/groupItemMetaProviderExtension';
// import { HeaderButtonExtension } from '../extensions/headerButtonExtension';
// import { HeaderMenuExtension } from '../extensions/headerMenuExtension';
import { RowDetailViewExtension } from '../extensions/rowDetailViewExtension';
import { ContainerService } from '../services/container.service';
// import { RowMoveManagerExtension } from '../extensions/rowMoveManagerExtension';
// import { RowSelectionExtension } from '../extensions/rowSelectionExtension';

// using external non-typed js libraries
declare const Slick: any;
declare const $: any;

const slickgridEventPrefix = 'sg';

@Component({
  selector: 'angular-slickgrid',
  templateUrl: './angular-slickgrid.component.html',
  providers: [
    // make everything transient (non-singleton)
    AngularUtilService,
    ApplicationRef,
    // ContainerService,
    // AutoTooltipExtension,
    // CellExternalCopyManagerExtension,
    // CellMenuExtension,
    // CheckboxSelectorExtension,
    // ColumnPickerExtension,
    // ContextMenuExtension,
    // DraggableGroupingExtension,
    // ExcelExportService,
    // ExtensionService,
    // ExportService,
    // ExtensionUtility,
    // FilterFactory,
    // FilterService,
    // GraphqlService,
    // GridEventService,
    // GridMenuExtension,
    // GridService,
    // GridStateService,
    // GroupingAndColspanService,
    // GroupItemMetaProviderExtension,
    // HeaderButtonExtension,
    // HeaderMenuExtension,
    // PaginationService,
    ResizerService,
    RowDetailViewExtension,
    // RowMoveManagerExtension,
    // RowSelectionExtension,
    // SharedService,
    // SortService,
    // SlickgridConfig,
    TranslaterService,
    // TreeDataService,
  ]
})
export class AngularSlickgridComponent implements AfterViewInit, OnDestroy, OnInit {
  private _dataset?: any[] | null;
  private _columnDefinitions!: Column[];
  private _currentDatasetLength = 0;
  private _eventHandler: SlickEventHandler = new Slick.EventHandler();
  private _eventPubSubService!: EventPubSubService;
  private _angularGridInstances: AngularGridInstance | undefined;
  private _fixedHeight?: number | null;
  private _fixedWidth?: number | null;
  private _hideHeaderRowAfterPageLoad = false;
  private _isGridInitialized = false;
  private _isDatasetInitialized = false;
  private _isDatasetHierarchicalInitialized = false;
  private _isLeftFooterOriginallyEmpty = false;
  private _isLeftFooterDisplayingSelectionRowCount = false;
  private _isPaginationInitialized = false;
  private _isLocalGrid = true;
  private _paginationOptions: Pagination | undefined;
  private _selectedRowCount = 0;
  private slickEmptyWarning?: SlickEmptyWarningComponent;
  dataView: any | null;
  grid: any | null;
  gridHeightString?: string;
  gridWidthString?: string;
  groupingDefinition: any = {};
  groupItemMetadataProvider: any;
  backendServiceApi?: BackendServiceApi;
  customFooterOptions?: CustomFooterOption;
  locales!: Locale;
  metrics?: Metrics;
  showCustomFooter = false;
  showPagination = false;
  serviceList: any[] = [];
  totalItems = 0;
  paginationData?: {
    gridOptions: GridOption;
    paginationService: PaginationService;
  };
  subscriptions: Subscription[] = [];

  // extensions
  extensionUtility: ExtensionUtility;

  // services
  backendUtilityService!: BackendUtilityService;
  collectionService: CollectionService;
  extensionService: ExtensionService;
  filterFactory!: FilterFactory;
  filterService: FilterService;
  gridEventService: GridEventService;
  gridService: GridService;
  gridStateService: GridStateService;
  groupingService: GroupingAndColspanService;
  paginationService: PaginationService;
  rxjs?: RxJsFacade;
  sharedService: SharedService;
  sortService: SortService;
  treeDataService: TreeDataService;

  @Output() onAngularGridCreated = new EventEmitter<AngularGridInstance>();
  // @Output() onDataviewCreated = new EventEmitter<any>();
  // @Output() onGridCreated = new EventEmitter<any>();
  // @Output() onGridInitialized = new EventEmitter<any>();
  // @Output() onBeforeGridCreate = new EventEmitter<boolean>();
  // @Output() onBeforeGridDestroy = new EventEmitter<any>();
  // @Output() onAfterGridDestroyed = new EventEmitter<boolean>();
  // @Output() onGridStateChanged = new EventEmitter<GridStateChange>();
  // @Output() onGridBeforeExportToFile = this.exportService.onGridBeforeExportToFile;
  // @Output() onGridAfterExportToFile = this.exportService.onGridAfterExportToFile;
  // @Output() onGridBeforeExportToExcel = this.excelExportService.onGridBeforeExportToExcel;
  // @Output() onGridAfterExportToExcel = this.excelExportService.onGridAfterExportToExcel;
  @Input() customDataView: any;
  @Input() gridId: string = '';
  @Input() gridOptions!: GridOption;

  @Input()
  get paginationOptions(): Pagination | undefined {
    return this._paginationOptions;
  }
  set paginationOptions(newPaginationOptions: Pagination | undefined) {
    if (newPaginationOptions && this._paginationOptions) {
      this._paginationOptions = { ...this._paginationOptions, ...newPaginationOptions };
    } else {
      this._paginationOptions = newPaginationOptions;
    }
    this.gridOptions.pagination = this._paginationOptions;
    this.paginationService.updateTotalItems(newPaginationOptions?.totalItems ?? 0, true);
  }

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
    if (this._isGridInitialized) {
      this.updateColumnDefinitionsList(columnDefinitions);
    }
    if (columnDefinitions.length > 0) {
      this.copyColumnWidthsReference(columnDefinitions);
    }
  }
  get columnDefinitions(): Column[] {
    return this._columnDefinitions;
  }

  @Input()
  get dataset(): any[] {
    return this.dataView.getItems();
  }
  set dataset(newDataset: any[]) {
    const prevDatasetLn = this._currentDatasetLength;
    let data = newDataset;

    // when Tree Data is enabled and we don't yet have the hierarchical dataset filled, we can force a convert & sort of the array
    if (this.grid && this.gridOptions?.enableTreeData && Array.isArray(newDataset) && (newDataset.length > 0 || newDataset.length !== prevDatasetLn)) {
      this._isDatasetHierarchicalInitialized = false;
      data = this.sortTreeDataset(newDataset);
    }
    this._dataset = data;
    this.refreshGridData(data || []);
    this._currentDatasetLength = (newDataset || []).length;
  }

  @Input()
  get datasetHierarchical(): any[] | undefined {
    return this.sharedService.hierarchicalDataset;
  }
  set datasetHierarchical(newHierarchicalDataset: any[] | undefined) {
    const prevFlatDatasetLn = this._currentDatasetLength;
    this.sharedService.hierarchicalDataset = newHierarchicalDataset;

    if (newHierarchicalDataset && this.columnDefinitions && this.filterService?.clearFilters) {
      this.filterService.clearFilters();
    }

    // when a hierarchical dataset is set afterward, we can reset the flat dataset and call a tree data sort that will overwrite the flat dataset
    if (newHierarchicalDataset && this.grid && this.sortService?.processTreeDataInitialSort) {
      this.dataView.setItems([], this.gridOptions.datasetIdPropertyName);
      this.sortService.processTreeDataInitialSort();
      this.sortTreeDataset([]);
      // we also need to reset/refresh the Tree Data filters because if we inserted new item(s) then it might not show up without doing this refresh
      // however we need 1 cpu cycle before having the DataView refreshed, so we need to wrap this check in a setTimeout
      setTimeout(() => {
        const flatDatasetLn = this.dataView.getItemCount();
        if (flatDatasetLn !== prevFlatDatasetLn && flatDatasetLn > 0) {
          this.filterService.refreshTreeDataFilters();
        }
      });
    }

    this._isDatasetHierarchicalInitialized = true;
  }

  get elementRef(): ElementRef {
    return this.elm;
  }

  constructor(
    private readonly angularUtilService: AngularUtilService,
    private readonly appRef: ApplicationRef,
    private readonly cd: ChangeDetectorRef,
    private readonly containerService: ContainerService,
    private readonly elm: ElementRef,
    private readonly resizerService: ResizerService,
    @Optional() private readonly translate: TranslateService,
    @Optional() private readonly translaterService: TranslaterService,
    @Inject('config') private forRootConfig: GridOption,
    @Inject('externalService') externalServices: {
      backendUtilityService?: BackendUtilityService,
      collectionService?: CollectionService,
      eventPubSubService?: EventPubSubService,
      extensionService?: ExtensionService,
      extensionUtility?: ExtensionUtility,
      filterService?: FilterService,
      gridEventService?: GridEventService,
      gridService?: GridService,
      gridStateService?: GridStateService,
      groupingAndColspanService?: GroupingAndColspanService,
      paginationService?: PaginationService,
      rxjs?: RxJsFacade,
      sharedService?: SharedService,
      sortService?: SortService,
      treeDataService?: TreeDataService,
    }
  ) {
    const slickgridConfig = new SlickgridConfig();

    // initialize and assign all Service Dependencies
    this._eventPubSubService = externalServices?.eventPubSubService ?? new EventPubSubService(this.elm.nativeElement);
    this._eventPubSubService.eventNamingStyle = EventNamingStyle.kebabCase;

    this.backendUtilityService = externalServices?.backendUtilityService ?? new BackendUtilityService();
    this.gridEventService = externalServices?.gridEventService ?? new GridEventService();
    this.sharedService = externalServices?.sharedService ?? new SharedService();
    this.collectionService = externalServices?.collectionService ?? new CollectionService(this.translaterService);
    this.extensionUtility = externalServices?.extensionUtility ?? new ExtensionUtility(this.sharedService, this.translaterService);
    this.filterFactory = new FilterFactory(slickgridConfig, this.translaterService, this.collectionService);
    this.filterService = externalServices?.filterService ?? new FilterService(this.filterFactory as any, this._eventPubSubService, this.sharedService, this.backendUtilityService);
    this.sortService = externalServices?.sortService ?? new SortService(this.sharedService, this._eventPubSubService, this.backendUtilityService);
    this.treeDataService = externalServices?.treeDataService ?? new TreeDataService(this._eventPubSubService, this.sharedService, this.sortService);
    this.paginationService = externalServices?.paginationService ?? new PaginationService(this._eventPubSubService, this.sharedService, this.backendUtilityService);

    // extensions
    const autoTooltipExtension = new AutoTooltipExtension(this.sharedService);
    const cellExternalCopyManagerExtension = new CellExternalCopyManagerExtension(this.extensionUtility, this.sharedService);
    const cellMenuExtension = new CellMenuExtension(this.extensionUtility, this.sharedService, this.translaterService);
    const contextMenuExtension = new ContextMenuExtension(this.extensionUtility, this.sharedService, this.treeDataService, this.translaterService);
    const columnPickerExtension = new ColumnPickerExtension(this.extensionUtility, this.sharedService);
    const checkboxExtension = new CheckboxSelectorExtension(this.sharedService);
    const draggableGroupingExtension = new DraggableGroupingExtension(this.extensionUtility, this.sharedService);
    const gridMenuExtension = new GridMenuExtension(this.extensionUtility, this.filterService, this.sharedService, this.sortService, this.backendUtilityService, this.translaterService);
    const groupItemMetaProviderExtension = new GroupItemMetaProviderExtension(this.sharedService);
    const headerButtonExtension = new HeaderButtonExtension(this.extensionUtility, this.sharedService);
    const headerMenuExtension = new HeaderMenuExtension(this.extensionUtility, this.filterService, this._eventPubSubService, this.sharedService, this.sortService, this.translaterService);
    const rowDetailViewExtension = new RowDetailViewExtension(this.angularUtilService, this.appRef, this.extensionUtility, this.filterService, this.sharedService, this.rxjs);
    const rowMoveManagerExtension = new RowMoveManagerExtension(this.sharedService);
    const rowSelectionExtension = new RowSelectionExtension(this.sharedService);

    this.extensionService = externalServices?.extensionService ?? new ExtensionService(
      autoTooltipExtension,
      cellExternalCopyManagerExtension,
      cellMenuExtension,
      checkboxExtension,
      columnPickerExtension,
      contextMenuExtension,
      draggableGroupingExtension,
      gridMenuExtension,
      groupItemMetaProviderExtension,
      headerButtonExtension,
      headerMenuExtension,
      // @ts-ignore
      rowDetailViewExtension,
      rowMoveManagerExtension,
      rowSelectionExtension,
      this.sharedService,
      this.translaterService,
    );

    this.gridStateService = externalServices?.gridStateService ?? new GridStateService(this.extensionService, this.filterService, this._eventPubSubService, this.sharedService, this.sortService, this.treeDataService);
    this.gridService = externalServices?.gridService ?? new GridService(this.gridStateService, this.filterService, this._eventPubSubService, this.paginationService, this.sharedService, this.sortService, this.treeDataService);
    this.groupingService = externalServices?.groupingAndColspanService ?? new GroupingAndColspanService(this.extensionUtility, this.extensionService, this._eventPubSubService);

    this.serviceList = [
      this.extensionService,
      this.filterService,
      this.gridEventService,
      this.gridService,
      this.gridStateService,
      this.groupingService,
      this.paginationService,
      this.resizerService,
      this.sortService,
      this.treeDataService,
    ];

    // register all Service instances in the container
    this.containerService.registerInstance('ExtensionUtility', this.extensionUtility);
    this.containerService.registerInstance('FilterService', this.filterService);
    this.containerService.registerInstance('CollectionService', this.collectionService);
    this.containerService.registerInstance('ExtensionService', this.extensionService);
    this.containerService.registerInstance('GridEventService', this.gridEventService);
    this.containerService.registerInstance('GridService', this.gridService);
    this.containerService.registerInstance('GridStateService', this.gridStateService);
    this.containerService.registerInstance('GroupingAndColspanService', this.groupingService);
    this.containerService.registerInstance('PaginationService', this.paginationService);
    this.containerService.registerInstance('ResizerService', this.resizerService);
    this.containerService.registerInstance('SharedService', this.sharedService);
    this.containerService.registerInstance('SortService', this.sortService);
    this.containerService.registerInstance('EventPubSubService', this._eventPubSubService);
    this.containerService.registerInstance('PubSubService', this._eventPubSubService);
    this.containerService.registerInstance('TranslaterService', this.translaterService);
    this.containerService.registerInstance('TreeDataService', this.treeDataService);
  }

  ngAfterViewInit() {
    this.initialization();
    this._isGridInitialized = true;

    // user must provide a "gridHeight" or use "autoResize: true" in the grid options
    if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
      throw new Error(
        `[Angular-Slickgrid] requires a "grid-height" or the "enableAutoResize" grid option to be enabled.
        Without that the grid will seem empty while in fact it just does not have any height define.`
      );
    }

    // recheck the empty warning message after grid is shown so that it works in every use case
    if (this.gridOptions && this.gridOptions.enableEmptyDataWarningMessage && Array.isArray(this.dataset)) {
      const finalTotalCount = this.dataset.length;
      this.displayEmptyDataWarning(finalTotalCount < 1);
    }
  }

  ngOnInit(): void {
    // this.onBeforeGridCreate.emit(true);
    if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
      this.gridHeightString = `${this._fixedHeight}px`;
      this.gridWidthString = `${this._fixedWidth}px`;
    }
  }

  ngOnDestroy(): void {
    // this.onBeforeGridDestroy.emit(this.grid);
    this.destroy();
    // this.onAfterGridDestroyed.emit(true);
  }

  destroy(shouldEmptyDomElementContainer = false) {
    // dispose of all Services
    this.serviceList.forEach((service: any) => {
      if (service && service.dispose) {
        service.dispose();
      }
    });
    this.serviceList = [];

    if (this._eventHandler?.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
    if (this.dataView) {
      if (this.dataView?.setItems) {
        this.dataView.setItems([]);
      }
      if (this.dataView.destroy) {
        this.dataView.destroy();
      }
    }
    if (this.grid?.destroy) {
      this.grid.destroy(shouldEmptyDomElementContainer);
    }

    if (this.backendServiceApi) {
      for (const prop of Object.keys(this.backendServiceApi)) {
        delete this.backendServiceApi[prop as keyof BackendServiceApi];
      }
      this.backendServiceApi = undefined;
    }
    for (const prop of Object.keys(this.columnDefinitions)) {
      (this.columnDefinitions as any)[prop] = null;
    }
    for (const prop of Object.keys(this.sharedService)) {
      (this.sharedService as any)[prop] = null;
    }

    // we could optionally also empty the content of the grid container DOM element
    if (shouldEmptyDomElementContainer) {
      this.emptyGridContainerElm();
    }

    // also unsubscribe all RxJS subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);

    this._dataset = null;
    this.datasetHierarchical = undefined;
    this._columnDefinitions = [];
    this._angularGridInstances = undefined;
    this.grid = null;
    this.dataView = null;
  }

  emptyGridContainerElm() {
    const gridContainerId = this.gridOptions?.gridContainerId ?? 'grid1';
    const gridContainerElm = document.querySelector(gridContainerId);
    emptyElement(gridContainerElm);
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
      const backendApiService = backendApi.service;

      // internalPostProcess only works (for now) with a GraphQL Service, so make sure it is of that type
      if (typeof backendApiService.getDatasetName === 'function') {
        backendApi.internalPostProcess = (processResult: any) => {
          const datasetName = (backendApi && backendApiService && typeof backendApiService.getDatasetName === 'function') ? backendApiService.getDatasetName() : '';
          if (processResult?.data[datasetName]) {
            const data = processResult.data[datasetName].hasOwnProperty('nodes') ? (processResult as any).data[datasetName].nodes : (processResult as any).data[datasetName];
            const totalCount = processResult.data[datasetName].hasOwnProperty('totalCount') ? (processResult as any).data[datasetName].totalCount : (processResult as any).data[datasetName].length;
            this.refreshGridData(data, totalCount || 0);
          }
        };
      }
    }
  }

  /**
   * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
   * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
   */
  paginationChanged(pagination: ServicePagination) {
    const isSyncGridSelectionEnabled = this.gridStateService && this.gridStateService.needToPreserveRowSelection() || false;
    if (!isSyncGridSelectionEnabled && (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector)) {
      this.gridService.setSelectedRows([]);
    }

    const { pageNumber, pageSize } = pagination;
    if (this.sharedService) {
      if (pageSize) {
        this.sharedService.currentPagination = { pageNumber: pageNumber as number, pageSize: pageSize as number };
      }
    }
    // this.gridStateService.onGridStateChanged.next({
    //   change: { newValues: { pageNumber: pageNumber as number, pageSize: pageSize as number }, type: GridStateType.pagination },
    //   gridState: this.gridStateService.getCurrentGridState()
    // });
  }

  /**
   * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
   * @param dataset
   */
  refreshGridData(dataset: any[], totalCount?: number) {
    if (this.gridOptions && this.gridOptions.enableEmptyDataWarningMessage && Array.isArray(dataset)) {
      const finalTotalCount = totalCount || dataset.length;
      this.displayEmptyDataWarning(finalTotalCount < 1);
    }

    if (Array.isArray(dataset) && this.grid && this.dataView?.setItems) {
      this.dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
      if (!this.gridOptions.backendServiceApi && !this.gridOptions.enableTreeData) {
        this.dataView.reSort();
      }

      if (dataset.length > 0) {
        if (!this._isDatasetInitialized) {
          this.loadFilterPresetsWhenDatasetInitialized();

          if (this.gridOptions.enableCheckboxSelector) {
            this.loadRowSelectionPresetWhenExists();
          }
        }
        this._isDatasetInitialized = true;
      }

      if (dataset) {
        this.grid.invalidate();
      }

      // display the Pagination component only after calling this refresh data first, we call it here so that if we preset pagination page number it will be shown correctly
      this.showPagination = (this.gridOptions && (this.gridOptions.enablePagination || (this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined))) ? true : false;

      if (this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.pagination) {
        const paginationOptions = this.setPaginationOptionsWhenPresetDefined(this.gridOptions, this._paginationOptions as Pagination);
        // when we have a totalCount use it, else we'll take it from the pagination object
        // only update the total items if it's different to avoid refreshing the UI
        const totalRecords = totalCount !== undefined ? totalCount : (this.gridOptions && this.gridOptions.pagination && this.gridOptions.pagination.totalItems);
        if (totalRecords !== this.totalItems) {
          this.totalItems = totalRecords as number;
        }

        // initialize the Pagination Service with new pagination options (which might have presets)
        if (!this._isPaginationInitialized) {
          this.initializePaginationService(paginationOptions);
        } else {
          // update the pagination service with the new total
          this.paginationService.totalItems = this.totalItems;
        }
      }

      // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
      if (this.grid && this.gridOptions.enableAutoResize) {
        const delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
        this.resizerService.resizeGrid(delay || 10);
      }
    }
  }

  /**
   * Check if there's any Pagination Presets defined in the Grid Options,
   * if there are then load them in the paginationOptions object
   */
  setPaginationOptionsWhenPresetDefined(gridOptions: GridOption, paginationOptions: Pagination): Pagination {
    if (gridOptions.presets && gridOptions.presets.pagination && gridOptions.pagination) {
      paginationOptions.pageSize = gridOptions.presets.pagination.pageSize;
      paginationOptions.pageNumber = gridOptions.presets.pagination.pageNumber;
    }
    return paginationOptions;
  }

  /**
   * Dynamically change or update the column definitions list.
   * We will re-render the grid so that the new header and data shows up correctly.
   * If using i18n, we also need to trigger a re-translate of the column headers
   */
  updateColumnDefinitionsList(newColumnDefinitions: Column[]) {
    // map/swap the internal library Editor to the SlickGrid Editor factory
    newColumnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(newColumnDefinitions);

    if (this.gridOptions.enableTranslate) {
      this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
    } else {
      this.extensionService.renderColumnHeaders(newColumnDefinitions, true);
    }

    if (this.gridOptions?.enableAutoSizeColumns) {
      this.grid.autosizeColumns();
    } else if (this.gridOptions?.enableAutoResizeColumnsByCellContent && this.resizerService?.resizeColumnsByCellContent) {
      this.resizerService.resizeColumnsByCellContent();
    }
  }

  /**
   * Show the filter row displayed on first row, we can optionally pass false to hide it.
   * @param showing
   */
  showHeaderRow(showing = true) {
    this.grid.setHeaderRowVisibility(showing, false);
    if (showing === true && this._isGridInitialized) {
      this.grid.setColumns(this.columnDefinitions);
    }
    return showing;
  }

  //
  // private functions
  // ------------------

  /**
   * Loop through all column definitions and copy the original optional `width` properties optionally provided by the user.
   * We will use this when doing a resize by cell content, if user provided a `width` it won't override it.
   */
  private copyColumnWidthsReference(columnDefinitions: Column[]) {
    columnDefinitions.forEach(col => col.originalWidth = col.width);
  }

  private displayEmptyDataWarning(showWarning = true) {
    // this.slickEmptyWarning.grid = this.grid;
    this.slickEmptyWarning && this.slickEmptyWarning.showEmptyDataMessage(showWarning);
  }

  private bindDifferentHooks(grid: any, gridOptions: GridOption, dataView: any) {
    // on locale change, we have to manually translate the Headers, GridMenu
    if (this.translate?.onLangChange) {
      // translate some of them on first load, then on each language change
      if (gridOptions.enableTranslate) {
        this.translateColumnHeaderTitleKeys();
        this.translateColumnGroupKeys();
        this.translateCustomFooterTexts();
      }

      this.subscriptions.push(
        this.translate.onLangChange.subscribe(() => {
          if (gridOptions.enableTranslate) {
            this.extensionService.translateCellMenu();
            this.extensionService.translateColumnHeaders();
            this.extensionService.translateColumnPicker();
            this.extensionService.translateContextMenu();
            this.extensionService.translateGridMenu();
            this.extensionService.translateHeaderMenu();
            this.translateCustomFooterTexts();
            this.translateColumnHeaderTitleKeys();
            this.translateColumnGroupKeys();
            if (gridOptions.createPreHeaderPanel && !gridOptions.enableDraggableGrouping) {
              this.groupingService.translateGroupingAndColSpan();
            }
          }
        })
      );
    }
    if (!this.customDataView) {
      // bind external sorting (backend) when available or default onSort (dataView)
      if (gridOptions.enableSorting) {
        // bind external sorting (backend) unless specified to use the local one
        if (gridOptions.backendServiceApi && !gridOptions.backendServiceApi.useLocalSorting) {
          this.sortService.bindBackendOnSort(grid);
        } else {
          this.sortService.bindLocalOnSort(grid);
        }
      }

      // bind external filter (backend) when available or default onFilter (dataView)
      if (gridOptions.enableFiltering) {
        this.filterService.init(grid);

        // bind external filter (backend) unless specified to use the local one
        if (gridOptions.backendServiceApi && !gridOptions.backendServiceApi.useLocalFiltering) {
          this.filterService.bindBackendOnFilter(grid);
        } else {
          this.filterService.bindLocalOnFilter(grid);
        }
      }

      // load any presets if any (after dataset is initialized)
      this.loadColumnPresetsWhenDatasetInitialized();
      this.loadFilterPresetsWhenDatasetInitialized();
    }


    // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
    if (gridOptions.backendServiceApi) {
      const backendApi = gridOptions.backendServiceApi;

      if (backendApi && backendApi.service && backendApi.service.init) {
        // @ts-ignore
        backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid, this.sharedService);
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
    // this.subscriptions.push(
    //   this.gridStateService.onGridStateChanged.subscribe((gridStateChange: GridStateChange) => {
    //     this.onGridStateChanged.emit(gridStateChange);
    //   })
    // );

    // on cell click, mainly used with the columnDef.action callback
    this.gridEventService.bindOnCellChange(grid);
    this.gridEventService.bindOnClick(grid);

    if (dataView && grid) {
      // When data changes in the DataView, we need to refresh the metrics and/or display a warning if the dataset is empty
      this._eventHandler.subscribe(dataView.onRowCountChanged, (_e: Event, args: any) => {
        grid.invalidate();
        this.handleOnItemCountChanged(args.current || 0, this.dataView.getItemCount());
      });
      this._eventHandler.subscribe(dataView.onSetItemsCalled, (_e: Event, args: any) => {
        grid.invalidate();
        this.handleOnItemCountChanged(this.dataView.getLength(), args.itemCount);

        // when user has resize by content enabled, we'll force a full width calculation since we change our entire dataset
        if (args.itemCount > 0 && (this.gridOptions.autosizeColumnsByCellContentOnFirstLoad || this.gridOptions.enableAutoResizeColumnsByCellContent)) {
          this.resizerService.resizeColumnsByCellContent(!this.gridOptions?.resizeByContentOnlyOnFirstLoad);
        }
      });

      this._eventHandler.subscribe(dataView.onRowsChanged, (_e: Event, args: any) => {
        // filtering data with local dataset will not always show correctly unless we call this updateRow/render
        // also don't use "invalidateRows" since it destroys the entire row and as bad user experience when updating a row
        // see commit: https://github.com/ghiscoding/Angular-Slickgrid/commit/bb62c0aa2314a5d61188ff005ccb564577f08805
        if (gridOptions && gridOptions.enableFiltering && !gridOptions.enableRowDetailView) {
          if (args && args.rows && Array.isArray(args.rows)) {
            args.rows.forEach((row: any) => grid.updateRow(row));
            grid.render();
          }
        }
      });

      // when column are reordered, we need to update the visibleColumn array
      this._eventHandler.subscribe(grid.onColumnsReordered, (e: any, args: { impactedColumns: Column[]; grid: any; }) => {
        this.sharedService.hasColumnsReordered = true;
        this.sharedService.visibleColumns = args.impactedColumns;
      });
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
          // when using multi-column sort, we can have multiple but on single sort then only grab the first sort provided
          const sortColumns = this.gridOptions.multiColumnSort ? gridOptions.presets.sorters : gridOptions.presets.sorters.slice(0, 1);
          backendApiService.updateSorters(undefined, sortColumns);
        }
        // Pagination "presets"
        if (backendApiService.updatePagination && gridOptions.presets.pagination) {
          const { pageNumber, pageSize } = gridOptions.presets.pagination;
          backendApiService.updatePagination(pageNumber, pageSize);
        }
      } else {
        const columnFilters = this.filterService.getColumnFilters();
        if (columnFilters && backendApiService.updateFilters) {
          // @ts-ignore
          backendApiService.updateFilters(columnFilters, false);
        }
      }

      // execute onInit command when necessary
      if (backendApi && backendApiService && (backendApi.onInit || isExecuteCommandOnInit)) {
        const query = (typeof backendApiService.buildQuery === 'function') ? backendApiService.buildQuery() : '';
        const process = (isExecuteCommandOnInit) ? (backendApi.process && backendApi.process(query) || null) : (backendApi.onInit && backendApi.onInit(query) || null);

        // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
        setTimeout(() => {
          const backendUtilityService = this.backendUtilityService as BackendUtilityService;

          // keep start time & end timestamps & return it after process execution
          const startTime = new Date();

          // run any pre-process, if defined, for example a spinner
          if (backendApi.preProcess) {
            backendApi.preProcess();
          }

          // the processes can be a Promise (like Http)
          const totalItems = this.gridOptions?.pagination?.totalItems ?? 0;
          if (process instanceof Promise) {
            process
              .then((processResult: any) => backendUtilityService.executeBackendProcessesCallback(startTime, processResult, backendApi, totalItems))
              .catch((error) => backendUtilityService.onBackendError(error, backendApi));
          } else if (process && this.rxjs?.isObservable(process)) {
            this.subscriptions.push(
              (process as Observable<any>).subscribe(
                (processResult: any) => backendUtilityService.executeBackendProcessesCallback(startTime, processResult, backendApi, totalItems),
                (error: any) => backendUtilityService.onBackendError(error, backendApi)
              )
            );
          }
        });
      }
    }
  }

  private bindResizeHook(grid: any, options: GridOption) {
    if ((options.autoFitColumnsOnFirstLoad && options.autosizeColumnsByCellContentOnFirstLoad) || (options.enableAutoSizeColumns && options.enableAutoResizeColumnsByCellContent)) {
      throw new Error(`[Angular-Slickgrid] You cannot enable both autosize/fit viewport & resize by content, you must choose which resize technique to use. You can enable these 2 options ("autoFitColumnsOnFirstLoad" and "enableAutoSizeColumns") OR these other 2 options ("autosizeColumnsByCellContentOnFirstLoad" and "enableAutoResizeColumnsByCellContent").`);
    }

    // expand/autofit columns on first page load
    if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
      grid.autosizeColumns();
    }

    // auto-resize grid on browser resize
    if (this._fixedHeight || this._fixedWidth) {
      this.resizerService.init(grid, { height: this._fixedHeight as number, width: this._fixedWidth as number });
    } else {
      this.resizerService.init(grid);
    }
    if (options.enableAutoResize) {
      this.resizerService.bindAutoResizeDataGrid();
      if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
        grid.autosizeColumns();
      }
    }
  }

  private executeAfterDataviewCreated(grid: any, gridOptions: GridOption, dataView: any) {
    // if user entered some Sort "presets", we need to reflect them all in the DOM
    if (gridOptions.enableSorting) {
      if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters)) {
        // when using multi-column sort, we can have multiple but on single sort then only grab the first sort provided
        const sortColumns = this.gridOptions.multiColumnSort ? gridOptions.presets.sorters : gridOptions.presets.sorters.slice(0, 1);
        this.sortService.loadGridSorters(sortColumns);
      }
    }
  }

  /** When data changes in the DataView, we'll refresh the metrics and/or display a warning if the dataset is empty */
  private handleOnItemCountChanged(currentPageRowItemCount: number, totalItemCount: number) {
    this._currentDatasetLength = totalItemCount;
    this.metrics = {
      startTime: new Date(),
      endTime: new Date(),
      itemCount: currentPageRowItemCount,
      totalItemCount
    };

    // when using local (in-memory) dataset, we'll display a warning message when filtered data is empty
    if (this._isLocalGrid && this.gridOptions && this.gridOptions.enableEmptyDataWarningMessage) {
      this.displayEmptyDataWarning(currentPageRowItemCount === 0);
    }
  }

  private initializePaginationService(paginationOptions: Pagination) {
    if (this.gridOptions) {
      this.paginationData = {
        gridOptions: this.gridOptions,
        paginationService: this.paginationService,
      };
      this.paginationService.totalItems = this.totalItems;
      this.paginationService.init(this.grid, paginationOptions, this.backendServiceApi);
      // this.subscriptions.push(
      //   this.paginationService.onPaginationChanged.subscribe((changes: ServicePagination) => this.paginationChanged(changes)),
      //   this.paginationService.onPaginationVisibilityChanged.subscribe((visibility: { visible: boolean }) => {
      //     this.showPagination = visibility && visibility.visible || false;
      //     if (this.gridOptions && this.gridOptions.backendServiceApi) {
      //       refreshBackendDataset();
      //     }
      //   })
      // );
      this._isPaginationInitialized = true;
    }
    this.cd.detectChanges();
  }

  private initialization() {
    // @ts-ignore
    this.gridOptions.translater = this.translaterService;

    // when detecting a frozen grid, we'll automatically enable the mousewheel scroll handler so that we can scroll from both left/right frozen containers
    if (this.gridOptions && ((this.gridOptions.frozenRow !== undefined && this.gridOptions.frozenRow >= 0) || this.gridOptions.frozenColumn !== undefined && this.gridOptions.frozenColumn >= 0) && this.gridOptions.enableMouseWheelScrollHandler === undefined) {
      this.gridOptions.enableMouseWheelScrollHandler = true;
    }

    // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
    this._dataset = this._dataset || [];
    this.gridOptions = this.mergeGridOptions(this.gridOptions);
    this._paginationOptions = this.gridOptions.pagination;
    this.locales = this.gridOptions?.locales ?? Constants.locales;
    // @ts-ignore
    this.backendServiceApi = this.gridOptions?.backendServiceApi;
    this.createBackendApiInternalPostProcessCallback(this.gridOptions);
    this._isLocalGrid = !this.backendServiceApi; // considered a local grid if it doesn't have a backend service set
    this._isLeftFooterOriginallyEmpty = !(this.gridOptions.customFooterOptions?.leftFooterText);

    if (!this.customDataView) {
      const dataviewInlineFilters = this.gridOptions.dataView && this.gridOptions.dataView.inlineFilters || false;
      let dataViewOptions: DataViewOption = { inlineFilters: dataviewInlineFilters };

      if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
        this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
        this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
        dataViewOptions = { ...dataViewOptions, groupItemMetadataProvider: this.groupItemMetadataProvider };
      }
      this.dataView = new Slick.Data.DataView(dataViewOptions);
    }

    // for convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
    // however "editor" is used internally by SlickGrid for it's own Editor Factory
    // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
    // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
    this._columnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(this._columnDefinitions);

    // if the user wants to automatically add a Custom Editor Formatter, we need to call the auto add function again
    if (this.gridOptions.autoAddCustomEditorFormatter) {
      // @ts-ignore
      autoAddEditorFormatterToColumnsWithEditor(this._columnDefinitions, this.gridOptions.autoAddCustomEditorFormatter);
    }


    // save reference for all columns before they optionally become hidden/visible
    this.sharedService.allColumns = this._columnDefinitions;
    this.sharedService.visibleColumns = this._columnDefinitions;
    // @ts-ignore
    this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);

    // if user entered some Pinning/Frozen "presets", we need to apply them in the grid options
    if (this.gridOptions.presets?.pinning) {
      this.gridOptions = { ...this.gridOptions, ...this.gridOptions.presets.pinning };
    }

    // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
    this.grid = new Slick.Grid(`#${this.gridId}`, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);

    this.sharedService.dataView = this.dataView;
    this.sharedService.slickGrid = this.grid;

    this.extensionService.bindDifferentExtensions();
    this.bindDifferentHooks(this.grid, this.gridOptions, this.dataView);

    // emit the Grid & DataView object to make them available in parent component
    // this.onGridCreated.emit(this.grid);

    // when it's a frozen grid, we need to keep the frozen column id for reference if we ever show/hide column from ColumnPicker/GridMenu afterward
    const frozenColumnIndex = this.gridOptions.frozenColumn !== undefined ? this.gridOptions.frozenColumn : -1;
    if (frozenColumnIndex >= 0 && frozenColumnIndex <= this._columnDefinitions.length) {
      this.sharedService.frozenVisibleColumnId = this._columnDefinitions[frozenColumnIndex].id || '';
    }

    // initialize the SlickGrid grid
    this.grid.init();

    // initialized the resizer service only after SlickGrid is initialized
    // if we don't we end up binding our resize to a grid element that doesn't yet exist in the DOM and the resizer service will fail silently (because it has a try/catch that unbinds the resize without throwing back)
    this.resizerService.init(this.grid);

    // when using Tree Data View
    if (this.gridOptions.enableTreeData) {
      this.treeDataService.init(this.grid);
    }

    if (!this.customDataView && (this.dataView && this.dataView.beginUpdate && this.dataView.setItems && this.dataView.endUpdate)) {
      const initialDataset = this.gridOptions?.enableTreeData ? this.sortTreeDataset(this._dataset) : this._dataset;
      // this.onDataviewCreated.emit(this.dataView);
      this.dataView.beginUpdate();
      this.dataView.setItems(initialDataset || [], this.gridOptions.datasetIdPropertyName);
      this.dataView.endUpdate();

      // if you don't want the items that are not visible (due to being filtered out or being on a different page)
      // to stay selected, pass 'false' to the second arg
      const selectionModel = this.grid && this.grid.getSelectionModel();
      if (selectionModel && this.gridOptions && this.gridOptions.dataView && this.gridOptions.dataView.hasOwnProperty('syncGridSelection')) {
        // if we are using a Backend Service, we will do an extra flag check, the reason is because it might have some unintended behaviors
        // with the BackendServiceApi because technically the data in the page changes the DataView on every page change.
        let preservedRowSelectionWithBackend = false;
        if (this.gridOptions.backendServiceApi && this.gridOptions.dataView.hasOwnProperty('syncGridSelectionWithBackendService')) {
          preservedRowSelectionWithBackend = this.gridOptions.dataView.syncGridSelectionWithBackendService as boolean;
        }

        const syncGridSelection = this.gridOptions.dataView.syncGridSelection;
        if (typeof syncGridSelection === 'boolean') {
          let preservedRowSelection = syncGridSelection;
          if (!this._isLocalGrid) {
            // when using BackendServiceApi, we'll be using the "syncGridSelectionWithBackendService" flag BUT "syncGridSelection" must also be set to True
            preservedRowSelection = syncGridSelection && preservedRowSelectionWithBackend;
          }
          this.dataView.syncGridSelection(this.grid, preservedRowSelection);
        } else if (typeof syncGridSelection === 'object') {
          this.dataView.syncGridSelection(this.grid, syncGridSelection.preserveHidden, syncGridSelection.preserveHiddenOnSelectionChange);
        }
      }

      const datasetLn = this.dataView.getLength() || this._dataset && this._dataset.length || 0;
      if (datasetLn > 0) {
        if (!this._isDatasetInitialized && (this.gridOptions.enableCheckboxSelector || this.gridOptions.enableRowSelection)) {
          this.loadRowSelectionPresetWhenExists();
        }
        this.loadFilterPresetsWhenDatasetInitialized();
        this._isDatasetInitialized = true;
      }
    }

    // user might want to hide the header row on page load but still have `enableFiltering: true`
    // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
    if (this._hideHeaderRowAfterPageLoad) {
      this.showHeaderRow(false);
      this.sharedService.hideHeaderRowAfterPageLoad = this._hideHeaderRowAfterPageLoad;
    }

    // after the DataView is created & updated execute some processes
    this.executeAfterDataviewCreated(this.grid, this.gridOptions, this.dataView);

    // bind resize ONLY after the dataView is ready
    this.bindResizeHook(this.grid, this.gridOptions);

    // bind & initialize grouping and header grouping colspan service
    if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
      this.groupingService.init(this.grid);
    }

    // bind & initialize the grid service
    this.gridService.init(this.grid);

    // when user enables translation, we need to translate Headers on first pass & subsequently in the bindDifferentHooks
    if (this.gridOptions.enableTranslate) {
      this.extensionService.translateColumnHeaders();
    }

    // if Export is enabled, initialize the service with the necessary grid and other objects
    // if (this.gridOptions.enableExport) {
    //   this.textExportService.init(this.grid);
    // }

    // if Excel Export is enabled, initialize the service with the necessary grid and other objects
    // if (this.gridOptions.enableExcelExport && this.sharedService) {
    //   this.excelExportService.init(this.grid);
    // }

    // once all hooks are in placed and the grid is initialized, we can emit an event
    // this.onGridInitialized.emit(this.grid);

    // bind the Backend Service API callback functions only after the grid is initialized
    // because the preProcess() and onInit() might get triggered
    if (this.gridOptions && this.gridOptions.backendServiceApi) {
      this.bindBackendCallbackFunctions(this.gridOptions);
    }

    this.gridStateService.init(this.grid);

    // local grid, check if we need to show the Pagination
    // if so then also check if there's any presets and finally initialize the PaginationService
    // a local grid with Pagination presets will potentially have a different total of items, we'll need to get it from the DataView and update our total
    if (this.gridOptions && this.gridOptions.enablePagination && this._isLocalGrid) {
      this.showPagination = true;
      this.loadLocalGridPagination();
    }

    this._angularGridInstances = {
      // Slick Grid & DataView objects
      dataView: this.dataView,
      slickGrid: this.grid,

      // public methods
      destroy: this.destroy.bind(this),

      // return all available Services (non-singleton)
      // @ts-ignore
      backendService: this.gridOptions?.backendServiceApi?.service,
      filterService: this.filterService,
      gridEventService: this.gridEventService,
      gridStateService: this.gridStateService,
      gridService: this.gridService,
      groupingService: this.groupingService,
      extensionService: this.extensionService,
      paginationService: this.paginationService,
      resizerService: this.resizerService,
      sortService: this.sortService,
      treeDataService: this.treeDataService,
    }

    // all instances (SlickGrid, DataView & all Services)
    this.onAngularGridCreated.emit(this._angularGridInstances);

    // user could show a custom footer with the data metrics (dataset length and last updated timestamp)
    this.optionallyShowCustomFooterWithMetrics();
  }

  /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
  private loadEditorCollectionAsync(column: Column) {
    const collectionAsync = column && column.editor && (column.editor as ColumnEditor).collectionAsync;
    if (collectionAsync instanceof Observable) {
      this.subscriptions.push(
        collectionAsync.subscribe((resolvedCollection) => this.updateEditorCollection(column, resolvedCollection))
      );
    }
  }

  /** Load any possible Columns Grid Presets */
  private loadColumnPresetsWhenDatasetInitialized() {
    // if user entered some Columns "presets", we need to reflect them all in the grid
    if (this.gridOptions.presets && Array.isArray(this.gridOptions.presets.columns) && this.gridOptions.presets.columns.length > 0) {
      const gridColumns: Column[] = this.gridStateService.getAssociatedGridColumns(this.grid, this.gridOptions.presets.columns);
      if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
        // make sure that the checkbox selector is also visible if it is enabled
        if (this.gridOptions.enableCheckboxSelector) {
          const checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
          if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
            gridColumns.unshift(checkboxColumn);
          }
        }

        // keep copy the original optional `width` properties optionally provided by the user.
        // We will use this when doing a resize by cell content, if user provided a `width` it won't override it.
        gridColumns.forEach(col => col.originalWidth = col.width);

        // finally set the new presets columns (including checkbox selector if need be)
        this.grid.setColumns(gridColumns);
        this.sharedService.visibleColumns = gridColumns;
      }
    }
  }

  /** Load any possible Filters Grid Presets */
  private loadFilterPresetsWhenDatasetInitialized() {
    if (this.gridOptions && !this.customDataView) {
      // if user entered some Filter "presets", we need to reflect them all in the DOM
      // also note that a presets of Tree Data Toggling will also call this method because Tree Data toggling does work with data filtering
      // (collapsing a parent will basically use Filter for hidding (aka collapsing) away the child underneat it)
      if (this.gridOptions.presets && (Array.isArray(this.gridOptions.presets.filters) || Array.isArray(this.gridOptions.presets?.treeData?.toggledItems))) {
        this.filterService.populateColumnFilterSearchTermPresets(this.gridOptions.presets?.filters || []);
      }
    }
  }

  /**
   * local grid, check if we need to show the Pagination
   * if so then also check if there's any presets and finally initialize the PaginationService
   * a local grid with Pagination presets will potentially have a different total of items, we'll need to get it from the DataView and update our total
   */
  private loadLocalGridPagination() {
    if (this.gridOptions) {
      this.totalItems = Array.isArray(this.dataset) ? this.dataset.length : 0;
      if (this._paginationOptions && this.dataView && this.dataView.getPagingInfo) {
        const slickPagingInfo = this.dataView.getPagingInfo() || {};
        if (slickPagingInfo.hasOwnProperty('totalRows') && this._paginationOptions.totalItems !== slickPagingInfo.totalRows) {
          this.totalItems = slickPagingInfo.totalRows;
        }
      }
      if (this._paginationOptions) {
        this._paginationOptions.totalItems = this.totalItems;
        const paginationOptions = this.setPaginationOptionsWhenPresetDefined(this.gridOptions, this._paginationOptions);
        this.initializePaginationService(paginationOptions);
      }
    }
  }

  /** Load any Row Selections into the DataView that were presets by the user */
  private loadRowSelectionPresetWhenExists() {
    // if user entered some Row Selections "presets"
    const presets = this.gridOptions && this.gridOptions.presets;
    const selectionModel = this.grid && this.grid.getSelectionModel();
    const enableRowSelection = this.gridOptions && (this.gridOptions.enableCheckboxSelector || this.gridOptions.enableRowSelection);
    if (enableRowSelection && selectionModel && presets && presets.rowSelection && (Array.isArray(presets.rowSelection.gridRowIndexes) || Array.isArray(presets.rowSelection.dataContextIds))) {
      let dataContextIds = presets.rowSelection.dataContextIds;
      let gridRowIndexes = presets.rowSelection.gridRowIndexes;

      // maps the IDs to the Grid Rows and vice versa, the "dataContextIds" has precedence over the other
      if (Array.isArray(dataContextIds) && dataContextIds.length > 0) {
        gridRowIndexes = this.dataView.mapIdsToRows(dataContextIds) || [];
      } else if (Array.isArray(gridRowIndexes) && gridRowIndexes.length > 0) {
        dataContextIds = this.dataView.mapRowsToIds(gridRowIndexes) || [];
      }
      this.gridStateService.selectedRowDataContextIds = dataContextIds as string[];

      // change the selected rows except UNLESS it's a Local Grid with Pagination
      // local Pagination uses the DataView and that also trigger a change/refresh
      // and we don't want to trigger 2 Grid State changes just 1
      if ((this._isLocalGrid && !this.gridOptions.enablePagination) || !this._isLocalGrid) {
        setTimeout(() => this.grid.setSelectedRows(gridRowIndexes));
      }
    }
  }

  private mergeGridOptions(gridOptions: GridOption): GridOption {
    gridOptions.gridId = this.gridId;
    gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;

    // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
    // @deprecated TODO remove this check in the future, user should explicitely enable the Pagination since this feature is now optional (you can now call OData/GraphQL without Pagination which is a new feature)
    gridOptions.enablePagination = ((gridOptions.backendServiceApi && gridOptions.enablePagination === undefined) ? true : gridOptions.enablePagination) || false;

    // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
    const options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions) as GridOption;

    // using jQuery extend to do a deep clone has an unwanted side on objects and pageSizes but ES6 spread has other worst side effects
    // so we will just overwrite the pageSizes when needed, this is the only one causing issues so far.
    // jQuery wrote this on their docs:: On a deep extend, Object and Array are extended, but object wrappers on primitive types such as String, Boolean, and Number are not.
    if (options && options.pagination && (gridOptions.enablePagination || gridOptions.backendServiceApi) && gridOptions.pagination && Array.isArray(gridOptions.pagination.pageSizes)) {
      options.pagination.pageSizes = gridOptions.pagination.pageSizes;
    }

    // also make sure to show the header row if user have enabled filtering
    this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
    if (options.enableFiltering && !options.showHeaderRow) {
      options.showHeaderRow = options.enableFiltering;
    }

    // when we use Pagination on Local Grid, it doesn't seem to work without enableFiltering
    // so we'll enable the filtering but we'll keep the header row hidden
    if (!options.enableFiltering && options.enablePagination && this._isLocalGrid) {
      options.enableFiltering = true;
      options.showHeaderRow = false;
      this._hideHeaderRowAfterPageLoad = true;
      this.sharedService.hideHeaderRowAfterPageLoad = true;
    }
    return options;
  }

  /**
   * We could optionally display a custom footer below the grid to show some metrics (last update, item count with/without filters)
   * It's an opt-in, user has to enable "showCustomFooter" and it cannot be used when there's already a Pagination since they display the same kind of info
   */
  private optionallyShowCustomFooterWithMetrics() {
    if (this.gridOptions) {
      const customFooterOptions = this.gridOptions.customFooterOptions;
      this.registerOnSelectedRowsChangedWhenEnabled(customFooterOptions);

      if (this.gridOptions.enableTranslate) {
        this.translateCustomFooterTexts();
      } else if (customFooterOptions) {
        customFooterOptions.metricTexts = customFooterOptions.metricTexts || {};
        customFooterOptions.metricTexts.lastUpdate = customFooterOptions.metricTexts.lastUpdate || this.locales && this.locales.TEXT_LAST_UPDATE || 'TEXT_LAST_UPDATE';
        customFooterOptions.metricTexts.items = customFooterOptions.metricTexts.items || this.locales && this.locales.TEXT_ITEMS || 'TEXT_ITEMS';
        customFooterOptions.metricTexts.itemsSelected = customFooterOptions.metricTexts.itemsSelected || this.locales && this.locales.TEXT_ITEMS_SELECTED || 'TEXT_ITEMS_SELECTED';
        customFooterOptions.metricTexts.of = customFooterOptions.metricTexts.of || this.locales && this.locales.TEXT_OF || 'TEXT_OF';
      }
      this.registerOnSelectedRowsChangedWhenEnabled(this.gridOptions.customFooterOptions);

      // we will display the custom footer only when there's no Pagination
      if (!this.gridOptions.enablePagination && !this._isPaginationInitialized) {
        this.showCustomFooter = (this.gridOptions.hasOwnProperty('showCustomFooter') ? this.gridOptions.showCustomFooter : false) as boolean;
        this.customFooterOptions = this.gridOptions.customFooterOptions || {};
      }
      this.cd.detectChanges();
    }
  }

  /**
   * When user has row selections enabled and does not have any custom text shown on the left side footer,
   * we will show the row selection count on the bottom left side of the footer (by subscribing to the SlickGrid `onSelectedRowsChanged` event).
   * @param customFooterOptions
   */
  private registerOnSelectedRowsChangedWhenEnabled(customFooterOptions?: CustomFooterOption) {
    const isRowSelectionEnabled = this.gridOptions.enableCheckboxSelector || this.gridOptions.enableRowSelection;
    if (isRowSelectionEnabled && customFooterOptions && (!customFooterOptions.hideRowSelectionCount && this._isLeftFooterOriginallyEmpty)) {
      this._isLeftFooterDisplayingSelectionRowCount = true;
      const selectedCountText = customFooterOptions.metricTexts?.itemsSelected ?? this.locales?.TEXT_ITEMS_SELECTED ?? 'TEXT_ITEMS_SELECTED';
      customFooterOptions.leftFooterText = `0 ${selectedCountText}`;

      this._eventHandler.subscribe(this.grid.onSelectedRowsChanged, (_e: any, args: { rows: number[]; previousSelectedRows: number[]; }) => {
        this._selectedRowCount = args.rows.length;
        const selectedCountText2 = customFooterOptions.metricTexts?.itemsSelected ?? this.locales?.TEXT_ITEMS_SELECTED ?? 'TEXT_ITEMS_SELECTED';
        customFooterOptions.leftFooterText = `${this._selectedRowCount} ${selectedCountText2}`;
      });
    }
  }

  /**
   * Takes a flat dataset with parent/child relationship, sort it (via its tree structure) and return the sorted flat array
   * @returns {Array<Object>} sort flat parent/child dataset
   */
  private sortTreeDataset<T>(flatDatasetInput: T[]): T[] {
    const prevDatasetLn = this._currentDatasetLength;
    let sortedDatasetResult;
    let flatDatasetOutput: any[] = [];

    // if the hierarchical dataset was already initialized then no need to re-convert it, we can use it directly from the shared service ref
    if (this._isDatasetHierarchicalInitialized && this.datasetHierarchical) {
      sortedDatasetResult = this.treeDataService.sortHierarchicalDataset(this.datasetHierarchical);
      flatDatasetOutput = sortedDatasetResult.flat;
    } else if (Array.isArray(flatDatasetInput) && flatDatasetInput.length > 0) {
      if (this.gridOptions?.treeDataOptions?.initialSort) {
        // else we need to first convert the flat dataset to a hierarchical dataset and then sort
        // @ts-ignore
        sortedDatasetResult = this.treeDataService.convertFlatParentChildToTreeDatasetAndSort(flatDatasetInput, this._columnDefinitions, this.gridOptions);
        this.sharedService.hierarchicalDataset = sortedDatasetResult.hierarchical;
        flatDatasetOutput = sortedDatasetResult.flat;
      } else {
        // else we assume that the user provided an array that is already sorted (user's responsability)
        // and so we can simply convert the array to a tree structure and we're done, no need to sort
        // @ts-ignore
        this.sharedService.hierarchicalDataset = this.treeDataService.convertFlatParentChildToTreeDataset(flatDatasetInput, this.gridOptions);
        flatDatasetOutput = flatDatasetInput || [];
      }
    }

    // if we add/remove item(s) from the dataset, we need to also refresh our tree data filters
    if (flatDatasetInput.length > 0 && flatDatasetInput.length !== prevDatasetLn) {
      this.filterService.refreshTreeDataFilters(flatDatasetOutput);
    }

    return flatDatasetOutput;
  }

  /**
   * For convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
   * however "editor" is used internally by SlickGrid for it's own Editor Factory
   * so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
   * then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
   */
  private swapInternalEditorToSlickGridFactoryEditor(columnDefinitions: Column[]) {
    if (columnDefinitions.some(col => `${col.id}`.includes('.'))) {
      console.error('[Angular-Slickgrid] Make sure that none of your Column Definition "id" property includes a dot in its name because that will cause some problems with the Editors. For example if your column definition "field" property is "user.firstName" then use "firstName" as the column "id".');
    }

    return columnDefinitions.map((column: Column | any) => {
      // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
      if (column && column.editor && column.editor.collectionAsync) {
        this.loadEditorCollectionAsync(column);
      }
      return { ...column, editor: column.editor && column.editor.model, internalColumnEditor: { ...column.editor } };
    });
  }

  /** Translate all Custom Footer Texts (footer with metrics) */
  private translateCustomFooterTexts() {
    if (this.translate && this.translate.instant && this.translate.currentLang) {
      const customFooterOptions = this.gridOptions && this.gridOptions.customFooterOptions || {};
      customFooterOptions.metricTexts = customFooterOptions.metricTexts || {};
      for (const propName of Object.keys(customFooterOptions.metricTexts)) {
        if (propName.lastIndexOf('Key') > 0) {
          const propNameWithoutKey = propName.substring(0, propName.lastIndexOf('Key'));
          (customFooterOptions.metricTexts as any)[propNameWithoutKey] = this.translate.instant((customFooterOptions.metricTexts as any)[propName] || ' ');
        }
      }

      // when we're display row selection count on left footer, we also need to translate that text with its count
      if (this._isLeftFooterDisplayingSelectionRowCount) {
        customFooterOptions.leftFooterText = `${this._selectedRowCount} ${customFooterOptions.metricTexts!.itemsSelected}`;
      }
    }
  }

  private translateColumnHeaderTitleKeys() {
    // translate all columns (including hidden columns)
    // eventually deprecate the "headerKey" and use only the "nameKey"
    this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
    this.extensionUtility.translateItems(this.sharedService.allColumns, 'nameKey', 'name');
  }

  private translateColumnGroupKeys() {
    // translate all column groups (including hidden columns)
    this.extensionUtility.translateItems(this.sharedService.allColumns, 'columnGroupKey', 'columnGroup');
  }

  /**
   * Update the Editor "collection" property from an async call resolved
   * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
   * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
   */
  private updateEditorCollection<T = any>(column: Column<T>, newCollection: T[]) {
    (column.editor as ColumnEditor).collection = newCollection;

    // find the new column reference pointer
    const columns = this.grid.getColumns();
    if (Array.isArray(columns)) {
      const columnRef: Column = columns.find((col: Column) => col.id === column.id);
      columnRef.internalColumnEditor = column.editor as ColumnEditor;
    }
  }
}
