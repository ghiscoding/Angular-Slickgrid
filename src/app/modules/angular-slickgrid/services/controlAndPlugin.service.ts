import { Injectable } from '@angular/core';
import {
  CellArgs,
  Column,
  DelimiterType,
  Extension,
  ExtensionName,
  FileType,
  GraphqlResult,
  GridMenu,
  GridMenuItem,
  GridOption,
} from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import { castToPromise } from './../services/utilities';
import { FilterService } from './filter.service';
import { ExportService } from './export.service';
import { SortService } from './sort.service';
import { Constants } from '../constants';
import {
  AutoTooltipPlugin,
  CellExternalCopyManagerPlugin,
  CheckboxSelectorPlugin,
  ColumnPickerControl,
  GroupItemMetaProviderPlugin,
  HeaderButtonPlugin,
  HeaderMenuPlugin,
} from '../extensions';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

@Injectable()
export class ControlAndPluginService {
  private _dataView: any;
  private _grid: any;
  allColumns: Column[];
  visibleColumns: Column[];
  areVisibleColumnDifferent = false;
  extensionList: Extension[] = [];
  undoRedoBuffer: any;
  userOriginalGridMenu: GridMenu;

  // controls & plugins
  checkboxSelectorPlugin: CheckboxSelectorPlugin;
  columnPickerControl: ColumnPickerControl;
  gridMenuControl: any;
  headerMenuPlugin: HeaderMenuPlugin;
  rowSelectionPlugin: any;

  constructor(
    private exportService: ExportService,
    private filterService: FilterService,
    private sortService: SortService,
    private translate: TranslateService,
  ) { }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /** Setter for the Grid Options pulled through the Grid Object */
  private set _gridOptions(gridOptions: GridOption) {
    this._gridOptions = gridOptions;
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  private get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  /** Get all columns (includes visible and non-visible) */
  getAllColumns(): Column[] {
    return this.allColumns || [];
  }

  /** Get only visible columns */
  getVisibleColumns(): Column[] {
    return this.visibleColumns || [];
  }

  /** Get all Extensions */
  getAllExtensions(): Extension[] {
    return this.extensionList;
  }

  /**
   * Get an Extension by it's name
   *  @param name
   */
  getExtensionByName(name: string): Extension | undefined {
    return this.extensionList.find((p) => p.name === name);
  }

  /** Auto-resize all the column in the grid to fit the grid width */
  autoResizeColumns() {
    this._grid.autosizeColumns();
  }

  /**
   * Attach/Create different Controls or Plugins after the Grid is created
   * @param grid
   * @param dataView
   * @param groupItemMetadataProvider
   */
  attachDifferentControlOrPlugins(grid: any, dataView: any, groupItemMetadataProvider: any) {
    this._grid = grid;
    this._dataView = dataView;
    this.allColumns = this._columnDefinitions;
    this.visibleColumns = this._columnDefinitions;

    // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
    // this is to avoid having hidden columns not being translated on first load
    if (this._gridOptions.enableTranslate) {
      this.translateItems(this.allColumns, 'headerKey', 'name');
    }

    // Column Picker Control
    if (this._gridOptions.enableColumnPicker) {
      this.columnPickerControl = new ColumnPickerControl(this._grid, this._gridOptions, this.allColumns, this._columnDefinitions, this.translate);
      if (this.columnPickerControl && this.columnPickerControl.register) {
        this.extensionList.push({ name: ExtensionName.columnPicker, service: this.columnPickerControl.register() });
      }
    }

    // Grid Menu Control
    if (this._gridOptions.enableGridMenu) {
      // keep original user grid menu, useful when switching locale to translate
      this.userOriginalGridMenu = { ...this._gridOptions.gridMenu };

      this.gridMenuControl = this.createGridMenu(this._grid, this._columnDefinitions);
      this.extensionList.push({ name: ExtensionName.gridMenu, service: this.gridMenuControl });
    }

    // Auto Tooltip Plugin
    if (this._gridOptions.enableAutoTooltip) {
      const autoTooltipPlugin = new AutoTooltipPlugin(this._grid, this._gridOptions);
      if (autoTooltipPlugin && autoTooltipPlugin.register) {
        this.extensionList.push({ name: ExtensionName.autoTooltip, service: autoTooltipPlugin.register() });
      }
    }

    // Grouping Plugin
    // register the group item metadata provider to add expand/collapse group handlers
    if (this._gridOptions.enableGrouping) {
      const extension = new GroupItemMetaProviderPlugin(this._grid, groupItemMetadataProvider);
      if (extension && extension.register) {
        this.extensionList.push({ name: ExtensionName.groupItemMetaProvider, service: extension.register() });
      }
    }

    // Checkbox Selector Plugin
    if (this._gridOptions.enableCheckboxSelector) {
      if (this.checkboxSelectorPlugin && this.checkboxSelectorPlugin.register) {
        this.extensionList.push({ name: ExtensionName.checkboxSelector, service: this.checkboxSelectorPlugin.register(this._grid, this.rowSelectionPlugin) });
      }
    }

    // Row Selection Plugin
    if (!this._gridOptions.enableCheckboxSelector && this._gridOptions.enableRowSelection) {
      this.rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
      this._grid.setSelectionModel(this.rowSelectionPlugin);
    }

    // Header Button Plugin
    if (this._gridOptions.enableHeaderButton) {
      const headerButtonPlugin = new HeaderButtonPlugin(this._grid, this._gridOptions);
      if (headerButtonPlugin && headerButtonPlugin.register) {
        this.extensionList.push({ name: ExtensionName.headerButtons, service: headerButtonPlugin.register() });
      }
    }

    // Header Menu Plugin
    if (this._gridOptions.enableHeaderMenu) {
      this.headerMenuPlugin = new HeaderMenuPlugin(this._grid, this._gridOptions, this._columnDefinitions, this._dataView, this.sortService, this.translate, this.visibleColumns);
      if (this.headerMenuPlugin && this.headerMenuPlugin.register) {
        this.extensionList.push({ name: ExtensionName.headerMenu, service: this.headerMenuPlugin.register() });
      }
    }

    // Cell External Copy Manager Plugin (Excel Like)
    if (this._gridOptions.enableExcelCopyBuffer) {
      const extension = new CellExternalCopyManagerPlugin(this._grid, this._gridOptions);
      if (extension && extension.register) {
        this.extensionList.push({ name: ExtensionName.cellExternalCopyManager, service: extension.register() });
      }
    }

    // manually register other plugins
    if (this._gridOptions.registerPlugins !== undefined) {
      if (Array.isArray(this._gridOptions.registerPlugins)) {
        this._gridOptions.registerPlugins.forEach((plugin) => {
          this._grid.registerPlugin(plugin);
          this.extensionList.push({ name: ExtensionName.noname, service: plugin });
        });
      } else {
        this._grid.registerPlugin(this._gridOptions.registerPlugins);
        this.extensionList.push({ name: ExtensionName.noname, service: this._gridOptions.registerPlugins });
      }
    }
  }

  /**
   * Attach/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   * @param columnDefinitions
   * @param options
   */
  createCheckboxPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      this.checkboxSelectorPlugin = new CheckboxSelectorPlugin(columnDefinitions, options);
      this.checkboxSelectorPlugin.create();
    }
  }

  /**
   * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
   * @param grid
   * @param columnDefinitions
   */
  createGridMenu(grid: any, columnDefinitions: Column[]) {
    if (this._gridOptions && this._gridOptions.gridMenu) {
      this._gridOptions.gridMenu = { ...this.getDefaultGridMenuOptions(), ...this._gridOptions.gridMenu };

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      this._gridOptions.gridMenu.customItems = [...this.userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
      this.translateItems(this._gridOptions.gridMenu.customItems, 'titleKey', 'title');
      this.sortItems(this._gridOptions.gridMenu.customItems, 'positionOrder');

      const gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, this._gridOptions);
      if (grid && this._gridOptions.gridMenu) {
        gridMenuControl.onBeforeMenuShow.subscribe((e: Event, args: CellArgs) => {
          if (this._gridOptions.gridMenu && typeof this._gridOptions.gridMenu.onBeforeMenuShow === 'function') {
            this._gridOptions.gridMenu.onBeforeMenuShow(e, args);
          }
        });
        gridMenuControl.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
          this.areVisibleColumnDifferent = true;
          if (this._gridOptions.gridMenu && typeof this._gridOptions.gridMenu.onColumnsChanged === 'function') {
            this._gridOptions.gridMenu.onColumnsChanged(e, args);
          }
        });
        gridMenuControl.onCommand.subscribe((e: Event, args: GridMenuItem) => {
          this.executeGridMenuInternalCustomCommands(e, args);
          if (this._gridOptions.gridMenu && typeof this._gridOptions.gridMenu.onCommand === 'function') {
            this._gridOptions.gridMenu.onCommand(e, args);
          }
        });
        gridMenuControl.onMenuClose.subscribe((e: Event, args: CellArgs) => {
          if (this._gridOptions.gridMenu && typeof this._gridOptions.gridMenu.onMenuClose === 'function') {
            this._gridOptions.gridMenu.onMenuClose(e, args);
          }

          // we also want to resize the columns if the user decided to hide certain column(s)
          if (grid && typeof grid.autosizeColumns === 'function') {
            // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
            const gridUid = grid.getUID();
            if (this.areVisibleColumnDifferent && gridUid && $(`.${gridUid}`).length > 0) {
              if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
                grid.autosizeColumns();
              }
              this.areVisibleColumnDifferent = false;
            }
          }
        });
      }
      return gridMenuControl;
    }
    return null;
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this._grid && this._grid.getColumns && this._grid.setColumns) {
      const columnIndex = this._grid.getColumnIndex(column.id);
      this.visibleColumns = this.removeColumnByIndex(this._grid.getColumns(), columnIndex);
      this._grid.setColumns(this.visibleColumns);
    }
  }

  /** Dispose of all the controls & plugins */
  dispose() {
    this._grid = null;
    this._dataView = null;
    this.visibleColumns = [];

    // dispose of each control/plugin if it has a destroy method
    this.extensionList.forEach((item) => {
      if (item && item.service && item.service.destroy) {
        item.service.destroy();
      }
    });
    this.extensionList = [];
  }

  /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
  private addGridMenuCustomCommands() {
    const backendApi = this._gridOptions.backendServiceApi || null;
    const gridMenuCustomItems: GridMenuItem[] = [];

    if (this._gridOptions && this._gridOptions.enableFiltering) {
      // show grid menu: clear all filters
      if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideClearAllFiltersCommand) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
            title: this._gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
            disabled: false,
            command: 'clear-filter',
            positionOrder: 50
          }
        );
      }

      // show grid menu: toggle filter row
      if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideToggleFilterCommand) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
            title: this._gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
            disabled: false,
            command: 'toggle-filter',
            positionOrder: 52
          }
        );
      }

      // show grid menu: refresh dataset
      if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
            title: this._gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
            disabled: false,
            command: 'refresh-dataset',
            positionOrder: 54
          }
        );
      }
    }

    if (this._gridOptions.enableSorting) {
      // show grid menu: clear all sorting
      if (this._gridOptions && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideClearAllSortingCommand) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
            title: this._gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
            disabled: false,
            command: 'clear-sorting',
            positionOrder: 51
          }
        );
      }
    }

    // show grid menu: export to file
    if (this._gridOptions && this._gridOptions.enableExport && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideExportCsvCommand) {
      gridMenuCustomItems.push(
        {
          iconCssClass: this._gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
          title: this._gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
          disabled: false,
          command: 'export-csv',
          positionOrder: 53
        }
      );
    }
    // show grid menu: export to text file as tab delimited
    if (this._gridOptions && this._gridOptions.enableExport && this._gridOptions.gridMenu && !this._gridOptions.gridMenu.hideExportTextDelimitedCommand) {
      gridMenuCustomItems.push(
        {
          iconCssClass: this._gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
          title: this._gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
          disabled: false,
          command: 'export-text-delimited',
          positionOrder: 54
        }
      );
    }

    // add the custom "Commands" title if there are any commands
    if (this._gridOptions && this._gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || this._gridOptions.gridMenu.customItems.length > 0)) {
      this._gridOptions.gridMenu.customTitle = this._gridOptions.gridMenu.customTitle || this.getPickerTitleOutputString('customTitle', 'gridMenu');
    }

    return gridMenuCustomItems;
  }

  /**
   * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
   * These are the default internal custom commands
   * @param event
   * @param GridMenuItem args
   */
  executeGridMenuInternalCustomCommands(e: Event, args: GridMenuItem) {
    if (args && args.command) {
      switch (args.command) {
        case 'clear-filter':
          this.filterService.clearFilters();
          this._dataView.refresh();
          break;
        case 'clear-sorting':
          this.sortService.clearSorting();
          this._dataView.refresh();
          break;
        case 'export-csv':
          this.exportService.exportToFile({
            delimiter: DelimiterType.comma,
            filename: 'export',
            format: FileType.csv,
            useUtf8WithBom: true
          });
          break;
        case 'export-text-delimited':
          this.exportService.exportToFile({
            delimiter: DelimiterType.tab,
            filename: 'export',
            format: FileType.txt,
            useUtf8WithBom: true
          });
          break;
        case 'toggle-filter':
          this._grid.setHeaderRowVisibility(!this._grid.getOptions().showHeaderRow);
          break;
        case 'toggle-toppanel':
          this._grid.setTopPanelVisibility(!this._grid.getOptions().showTopPanel);
          break;
        case 'refresh-dataset':
          this.refreshBackendDataset();
          break;
        default:
          break;
      }
    }
  }

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset(gridOptions?: GridOption) {
    let query = '';

    // user can pass new set of grid options which will override current ones
    if (gridOptions) {
      this._gridOptions = { ...this._gridOptions, ...gridOptions };
    }

    const backendApi = this._gridOptions.backendServiceApi;
    if (!backendApi || !backendApi.service || !backendApi.process) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    if (backendApi.service) {
      query = backendApi.service.buildQuery();
    }

    if (query && query !== '') {
      // keep start time & end timestamps & return it after process execution
      const startTime = new Date();

      if (backendApi.preProcess) {
        backendApi.preProcess();
      }

      // the process could be an Observable (like HttpClient) or a Promise
      // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
      const observableOrPromise = backendApi.process(query);

      castToPromise(observableOrPromise).then((processResult: GraphqlResult | any) => {
        const endTime = new Date();

        // from the result, call our internal post process to update the Dataset and Pagination info
        if (processResult && backendApi.internalPostProcess) {
          backendApi.internalPostProcess(processResult);
        }

        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
          if (processResult instanceof Object) {
            processResult.statistics = {
              startTime,
              endTime,
              executionTime: endTime.valueOf() - startTime.valueOf(),
              totalItemCount: this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems
            };
          }
          backendApi.postProcess(processResult);
        }
      });
    }
  }

  /**
   * Remove a column from the grid by it's index in the grid
   * @param array input
   * @param index
   */
  removeColumnByIndex(array: any[], index: number) {
    return array.filter((el: any, i: number) => {
      return index !== i;
    });
  }

  /** Translate the Column Picker and it's last 2 checkboxes */
  translateColumnPicker() {
    this.columnPickerControl.translateColumnPicker();
  }

  /** Translate the Grid Menu titles and column picker */
  translateGridMenu() {
    // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
    // we also need to call the control init so that it takes the new Grid object with latest values
    if (this._gridOptions && this._gridOptions.gridMenu) {
      this._gridOptions.gridMenu.customItems = [];
      this.emptyGridMenuTitles();

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      this._gridOptions.gridMenu.customItems = [...this.userOriginalGridMenu.customItems || [], ...this.addGridMenuCustomCommands()];
      this.translateItems(this._gridOptions.gridMenu.customItems, 'titleKey', 'title');
      this.sortItems(this._gridOptions.gridMenu.customItems, 'positionOrder');

      this._gridOptions.gridMenu.columnTitle = this.getPickerTitleOutputString('columnTitle', 'gridMenu');
      this._gridOptions.gridMenu.forceFitTitle = this.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
      this._gridOptions.gridMenu.syncResizeTitle = this.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');

      // translate all columns (including non-visible)
      this.translateItems(this.allColumns, 'headerKey', 'name');

      // re-initialize the Grid Menu, that will recreate all the menus & list
      // doing an "init()" won't drop any existing command attached
      if (this.gridMenuControl.init) {
        this.gridMenuControl.init(this._grid);
      }
    }
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateHeaderMenu() {
    if (this._gridOptions && this._gridOptions.headerMenu) {
      this.headerMenuPlugin.resetHeaderMenuTranslations(this.visibleColumns);
    }
  }

  /**
   * Translate manually the header titles.
   * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
   * @param locale to use
   * @param new column definitions (optional)
   */
  translateColumnHeaders(locale?: boolean | string, newColumnDefinitions?: Column[]) {
    if (locale) {
      this.translate.use(locale as string);
    }

    const columnDefinitions = newColumnDefinitions || this._columnDefinitions;

    this.translateItems(columnDefinitions, 'headerKey', 'name');
    this.translateItems(this.allColumns, 'headerKey', 'name');

    // re-render the column headers
    this.renderColumnHeaders(columnDefinitions);
  }

  /**
   * Render (or re-render) the column headers from column definitions.
   * calling setColumns() will trigger a grid re-render
   */
  renderColumnHeaders(newColumnDefinitions?: Column[]) {
    const collection = newColumnDefinitions || this._columnDefinitions;
    if (Array.isArray(collection) && this._grid && this._grid.setColumns) {
      this._grid.setColumns(collection);
    }
  }

  private emptyGridMenuTitles() {
    this._gridOptions.gridMenu.customTitle = '';
    this._gridOptions.gridMenu.columnTitle = '';
    this._gridOptions.gridMenu.forceFitTitle = '';
    this._gridOptions.gridMenu.syncResizeTitle = '';
  }

  /**
   * @return default Grid Menu options
   */
  private getDefaultGridMenuOptions(): GridMenu {
    return {
      customTitle: undefined,
      columnTitle: this.getPickerTitleOutputString('columnTitle', 'gridMenu'),
      forceFitTitle: this.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
      syncResizeTitle: this.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
      iconCssClass: 'fa fa-bars',
      menuWidth: 18,
      customItems: [],
      hideClearAllFiltersCommand: false,
      hideRefreshDatasetCommand: false,
      hideToggleFilterCommand: false,
    };
  }

  /**
   * From a Grid Menu object property name, we will return the correct title output string following this order
   * 1- if user provided a title, use it as the output title
   * 2- else if user provided a title key, use it to translate the output title
   * 3- else if nothing is provided use
   */
  private getPickerTitleOutputString(propName: string, pickerName: 'gridMenu' | 'columnPicker') {
    let output = '';
    const picker = this._gridOptions && this._gridOptions[pickerName] || {};
    const enableTranslate = this._gridOptions && this._gridOptions.enableTranslate || false;

    const title = picker && picker[propName];
    const titleKey = picker && picker[`${propName}Key`];

    if (titleKey) {
      output = this.translate.instant(titleKey || ' ');
    } else {
      switch (propName) {
        case 'customTitle':
          output = title || (enableTranslate ? this.translate.instant('COMMANDS') : Constants.TEXT_COMMANDS);
          break;
        case 'columnTitle':
          output = title || (enableTranslate ? this.translate.instant('COLUMNS') : Constants.TEXT_COLUMNS);
          break;
        case 'forceFitTitle':
          output = title || (enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : Constants.TEXT_FORCE_FIT_COLUMNS);
          break;
        case 'syncResizeTitle':
          output = title || (enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : Constants.TEXT_SYNCHRONOUS_RESIZE);
          break;
        default:
          output = title;
          break;
      }
    }
    return output;
  }

  /**
   * Sort items in an array by a property name
   * @params items array
   * @param property name to sort with
   * @return sorted array
   */
  private sortItems(items: any[], propertyName: string) {
    // sort the custom items by their position in the list
    items.sort((itemA, itemB) => {
      if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
        return itemA[propertyName] - itemB[propertyName];
      }
      return 0;
    });
  }

  /** Translate the an array of items from an input key and assign to the output key */
  private translateItems(items: any[], inputKey: string, outputKey: string) {
    for (const item of items) {
      if (item[inputKey]) {
        item[outputKey] = this.translate.instant(item[inputKey]);
      }
    }
  }
}
