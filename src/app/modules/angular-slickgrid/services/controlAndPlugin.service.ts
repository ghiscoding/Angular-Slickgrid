import { DelimiterType } from './../models/delimiterType.enum';
import { ExportService } from './export.service';
import { Injectable } from '@angular/core';
import { FilterService } from './filter.service';
import {
  CellArgs,
  CustomGridMenu,
  Column,
  GraphqlResult,
  GridMenu,
  GridOption,
  HeaderButtonOnCommandArgs,
  HeaderMenuOnCommandArgs,
  HeaderMenuOnBeforeMenuShowArgs,
  FileType
} from './../models/index';
import $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { castToPromise } from './../services/utilities';

// using external non-typed js libraries in Angular
declare var Slick: any;
declare var $: any;

@Injectable()
export class ControlAndPluginService {
  private _dataView: any;
  private _grid: any;
  private _gridOptions: GridOption;
  private _columnDefinitions: Column[];
  visibleColumns: Column[];

  // controls & plugins
  autoTooltipPlugin: any;
  checkboxSelectorPlugin: any;
  columnPickerControl: any;
  headerButtonsPlugin: any;
  headerMenuPlugin: any;
  gridMenuControl: any;
  rowSelectionPlugin: any;

  constructor(private exportService: ExportService, private filterService: FilterService, private translate: TranslateService) { }

  /**
   * Attach/Create different Controls or Plugins after the Grid is created
   * @param grid
   * @param columnDefinitions
   * @param options
   * @param dataView
   */
  attachDifferentControlOrPlugins(grid: any, columnDefinitions: Column[], options: GridOption, dataView: any) {
    this._grid = grid;
    this._gridOptions = options;
    this._dataView = dataView;
    this._columnDefinitions = columnDefinitions;
    this.visibleColumns = columnDefinitions;

    if (options.enableColumnPicker) {
      this.columnPickerControl = this.createColumnPicker(grid, columnDefinitions, options);
    }
    if (options.enableGridMenu) {
      this.gridMenuControl = this.createGridMenu(grid, columnDefinitions, options);
    }
    if (options.enableAutoTooltip) {
      this.autoTooltipPlugin = new Slick.AutoTooltips(options.autoTooltipOptions || {});
      grid.registerPlugin(this.autoTooltipPlugin);
    }

    if (options.enableCheckboxSelector) {
      // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
      // the selector column has to be create BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      grid.registerPlugin(this.checkboxSelectorPlugin);

      // this also requires the Row Selection Model to be registered as well
      if (!this.rowSelectionPlugin) {
        this.rowSelectionPlugin = new Slick.RowSelectionModel(options.rowSelectionOptions || {});
        grid.setSelectionModel(this.rowSelectionPlugin);
      }
    }
    if (options.enableRowSelection) {
      this.rowSelectionPlugin = new Slick.RowSelectionModel(options.rowSelectionOptions || {});
      grid.setSelectionModel(this.rowSelectionPlugin);
    }
    if (options.enableHeaderButton) {
      this.headerButtonsPlugin = new Slick.Plugins.HeaderButtons(options.headerButton || {});
      grid.registerPlugin(this.headerButtonsPlugin);
      this.headerButtonsPlugin.onCommand.subscribe((e: Event, args: HeaderButtonOnCommandArgs) => {
        if (options.headerButton && typeof options.headerButton.onCommand === 'function') {
          options.headerButton.onCommand(e, args);
        }
      });
    }
    if (options.enableHeaderMenu) {
      const headerMenuOptions = options.headerMenu || {};
      headerMenuOptions.minWidth = headerMenuOptions.minWidth || 140;
      headerMenuOptions.autoAlignOffset = headerMenuOptions.autoAlignOffset || 12;
      this.headerMenuPlugin = new Slick.Plugins.HeaderMenu(headerMenuOptions);
      grid.registerPlugin(this.headerMenuPlugin);
      this.headerMenuPlugin.onCommand.subscribe((e: Event, args: HeaderMenuOnCommandArgs) => {
        if (options.headerMenu && typeof options.headerMenu.onCommand === 'function') {
          options.headerMenu.onCommand(e, args);
        }
      });
      this.headerMenuPlugin.onCommand.subscribe((e: Event, args: HeaderMenuOnBeforeMenuShowArgs) => {
        if (options.headerMenu && typeof options.headerMenu.onBeforeMenuShow === 'function') {
          options.headerMenu.onBeforeMenuShow(e, args);
        }
      });
    }
    if (options.registerPlugins !== undefined) {
      if (Array.isArray(options.registerPlugins)) {
        options.registerPlugins.forEach((plugin) => {
          grid.registerPlugin(plugin);
        });
      } else {
        grid.registerPlugin(options.registerPlugins);
      }
    }
  }

  createColumnPicker(grid: any, columnDefinitions: Column[], options: GridOption) {
    // localization support for the picker
    const forceFitTitle = options.enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : 'Force fit columns';
    const syncResizeTitle = options.enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : 'Synchronous resize';

    options.columnPicker = options.columnPicker || {};
    options.columnPicker.forceFitTitle = options.columnPicker.forceFitTitle || forceFitTitle;
    options.columnPicker.syncResizeTitle = options.columnPicker.syncResizeTitle || syncResizeTitle;

    this.columnPickerControl = new Slick.Controls.ColumnPicker(columnDefinitions, grid, options);
    if (grid && options.enableColumnPicker) {
      this.columnPickerControl.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
        if (options.columnPicker && typeof options.columnPicker.onColumnsChanged === 'function') {
          options.columnPicker.onColumnsChanged(e, args);
        }
      });
    }
  }

  /**
   * Create (or re-create) Grid Menu and expose all the available hooks that user can subscribe (onCommand, onMenuClose, ...)
   * @param grid
   * @param columnDefinitions
   * @param options
   */
  createGridMenu(grid: any, columnDefinitions: Column[], options: GridOption) {
    options.gridMenu = { ...this.getDefaultGridMenuOptions(), ...options.gridMenu };
    this.addGridMenuCustomCommands(grid, options);

    const gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, options);
    if (grid && options.gridMenu) {
      gridMenuControl.onBeforeMenuShow.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onBeforeMenuShow === 'function') {
          options.gridMenu.onBeforeMenuShow(e, args);
        }
      });
      gridMenuControl.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onColumnsChanged === 'function') {
          options.gridMenu.onColumnsChanged(e, args);
        }
      });
      gridMenuControl.onCommand.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onCommand === 'function') {
          options.gridMenu.onCommand(e, args);
        }
      });
      gridMenuControl.onMenuClose.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onMenuClose === 'function') {
          options.gridMenu.onMenuClose(e, args);
        }

        // we also want to resize the columns if the user decided to hide certain column(s)
        if (grid && typeof grid.autosizeColumns === 'function') {
          // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
          const gridUid = grid.getUID();
          if (gridUid && $(`.${gridUid}`).length > 0) {
            grid.autosizeColumns();
          }
        }
      });
    }
    return gridMenuControl;
  }

  hideColumn(column: Column) {
    if (this._grid && this.visibleColumns) {
      const columnIndex = this._grid.getColumnIndex(column.id);
      this.visibleColumns = this.removeColumnByIndex(this.visibleColumns, columnIndex);
      this._grid.setColumns(this.visibleColumns);
    }
  }

  removeColumnByIndex(array: any[], index: number) {
    return array.filter((el: any, i: number) => {
      return index !== i;
    });
  }

  autoResizeColumns() {
    this._grid.autosizeColumns();
  }

  dispose() {
    this._grid = null;
    this._dataView = null;
    this.visibleColumns = [];

    if (this.columnPickerControl) {
      this.columnPickerControl.destroy();
      this.columnPickerControl = null;
    }
    if (this.gridMenuControl) {
      this.gridMenuControl.destroy();
      this.gridMenuControl = null;
    }
    if (this.rowSelectionPlugin) {
      this.rowSelectionPlugin.destroy();
      this.rowSelectionPlugin = null;
    }
    if (this.checkboxSelectorPlugin) {
      this.checkboxSelectorPlugin.destroy();
      this.checkboxSelectorPlugin = null;
    }
    if (this.autoTooltipPlugin) {
      this.autoTooltipPlugin.destroy();
      this.autoTooltipPlugin = null;
    }
    if (this.headerButtonsPlugin) {
      this.headerButtonsPlugin.destroy();
      this.headerButtonsPlugin = null;
    }
    if (this.headerMenuPlugin) {
      this.headerMenuPlugin.destroy();
      this.headerMenuPlugin = null;
    }
  }

  /**
   * Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL)
   * @param grid
   * @param options
   */
  private addGridMenuCustomCommands(grid: any, options: GridOption) {
    const backendApi = options.backendServiceApi || options.onBackendEventApi || null;

    if (options.enableFiltering) {
      // show grid menu: clear all filters
      if (options && options.gridMenu && options.gridMenu.showClearAllFiltersCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'clear-filter').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: 'fa fa-filter text-danger',
            title: options.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : 'Clear All Filters',
            disabled: false,
            command: 'clear-filter',
            positionOrder: 50
          }
        );
      }
      // show grid menu: toggle filter row
      if (options && options.gridMenu && options.gridMenu.showToggleFilterCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'toggle-filter').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: 'fa fa-random',
            title: options.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : 'Toggle Filter Row',
            disabled: false,
            command: 'toggle-filter',
            positionOrder: 51
          }
        );
      }

      // show grid menu: refresh dataset
      if (options && options.gridMenu && options.gridMenu.showRefreshDatasetCommand && backendApi && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'refresh-dataset').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: 'fa fa-refresh',
            title: options.enableTranslate ? this.translate.instant('REFRESH_DATASET') : 'Refresh Dataset',
            disabled: false,
            command: 'refresh-dataset',
            positionOrder: 54
          }
        );
      }

    }

    // show grid menu: export to file
    if (options && options.enableExport && options.gridMenu && options.gridMenu.showExportCsvCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'export-csv').length === 0) {
      options.gridMenu.customItems.push(
        {
          iconCssClass: 'fa fa-download',
          title: options.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : 'Export in CSV format',
          disabled: false,
          command: 'export-csv',
          positionOrder: 52
        }
      );
    }
    // show grid menu: export to text file as tab delimited
    if (options && options.enableExport && options.gridMenu && options.gridMenu.showExportTextDelimitedCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'export-text-delimited').length === 0) {
      options.gridMenu.customItems.push(
        {
          iconCssClass: 'fa fa-download',
          title: options.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : 'Export in Text format (Tab delimited)',
          disabled: false,
          command: 'export-text-delimited',
          positionOrder: 53
        }
      );
    }

    // Command callback, what will be executed after command is clicked
    if (options.gridMenu && options.gridMenu.customItems.length > 0) {
      options.gridMenu.onCommand = (e, args) => {
        if (args && args.command) {
          switch (args.command) {
            case 'clear-filter':
              this.filterService.clearFilters();
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
              grid.setHeaderRowVisibility(!grid.getOptions().showHeaderRow);
              break;
            case 'toggle-toppanel':
              grid.setTopPanelVisibility(!grid.getOptions().showTopPanel);
              break;
            case 'clear-filter':
              this.filterService.clearFilters();
              this._dataView.refresh();
              break;
            case 'refresh-dataset':
              this.refreshBackendDataset(options);
              break;
            default:
              alert('Command: ' + args.command);
              break;
          }
        }
      };
    }



    // add the custom "Commands" title if there are any commands
    if (options && options.gridMenu && options.gridMenu.customItems && options.gridMenu.customItems.length > 0) {
      const customTitle = options.enableTranslate ? this.translate.instant('COMMANDS') : 'Commands';
      options.gridMenu.customTitle = options.gridMenu.customTitle || customTitle;

      // sort the custom items by their position in the list
      options.gridMenu.customItems.sort((itemA, itemB) => {
        if (itemA && itemB && itemA.hasOwnProperty('positionOrder') && itemB.hasOwnProperty('positionOrder')) {
          return itemA.positionOrder - itemB.positionOrder;
        }
        return 0;
      });
    }
  }

  /**
   * @return default Grid Menu options
   */
  private getDefaultGridMenuOptions(): GridMenu {
    return {
      columnTitle: this.translate.instant('COLUMNS') || 'Columns',
      forceFitTitle: this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns',
      syncResizeTitle: this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize',
      iconCssClass: 'fa fa-bars',
      menuWidth: 18,
      customTitle: undefined,
      customItems: [],
      showClearAllFiltersCommand: true,
      showRefreshDatasetCommand: true,
      showToggleFilterCommand: true
    };
  }

  private refreshBackendDataset(gridOptions) {
    let query;
    const backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
    if (!backendApi || !backendApi.service || !backendApi.process) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    if (backendApi.service) {
      query = backendApi.service.buildQuery();
    }

    if (query && query !== '') {
      if (backendApi.preProcess) {
        backendApi.preProcess();
      }

      // the process could be an Observable (like HttpClient) or a Promise
      // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
      const observableOrPromise = backendApi.process(query);

      castToPromise(observableOrPromise).then((processResult: GraphqlResult | any) => {
        // from the result, call our internal post process to update the Dataset and Pagination info
        if (processResult && backendApi.internalPostProcess) {
          backendApi.internalPostProcess(processResult);
        }

        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
          backendApi.postProcess(processResult);
        }
      });
    }
  }

  /**
   * Reset all the Grid Menu options which have text to translate
   * @param grid menu object
   */
  private resetGridMenuTranslations(gridMenu: GridMenu): GridMenu {
    // we will reset the custom items array since the commands title have to be translated too (no worries, we will re-create it later)
    gridMenu.customItems = [];
    delete gridMenu.customTitle;

    gridMenu.columnTitle = this.translate.instant('COLUMNS') || 'Columns';
    gridMenu.forceFitTitle = this.translate.instant('FORCE_FIT_COLUMNS') || 'Force fit columns';
    gridMenu.syncResizeTitle = this.translate.instant('SYNCHRONOUS_RESIZE') || 'Synchronous resize';

    return gridMenu;
  }

  /**
   * Translate the Column Picker and it's last 2 checkboxes
   * Note that the only way that seems to work is to destroy and re-create the Column Picker
   * Changing only the columnPicker.columnTitle with i18n translate was not enough.
   */
  translateColumnPicker() {
    // destroy and re-create the Column Picker which seems to be the only way to translate properly
    if (this.columnPickerControl) {
      this.columnPickerControl.destroy();
      this.columnPickerControl = null;
    }

    this._gridOptions.columnPicker = undefined;
    this.createColumnPicker(this._grid, this.visibleColumns, this._gridOptions);
  }

  /**
   * Translate the Grid Menu ColumnTitle and CustomTitle.
   * Note that the only way that seems to work is to destroy and re-create the Grid Menu
   * Changing only the gridMenu.columnTitle with i18n translate was not enough.
   */
  translateGridMenu() {
    // destroy and re-create the Grid Menu which seems to be the only way to translate properly
    this.gridMenuControl.destroy();

    // reset all Grid Menu options that have translation text & then re-create the Grid Menu and also the custom items array
    if (this._gridOptions && this._gridOptions.gridMenu) {
      this._gridOptions.gridMenu = this.resetGridMenuTranslations(this._gridOptions.gridMenu);
    }
    this.createGridMenu(this._grid, this.visibleColumns, this._gridOptions);
  }

  /**
   * Translate manually the header titles.
   * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
   * @param locale locale to use
   */
  translateHeaders(locale?: string) {
    if (locale) {
      this.translate.use(locale);
    }

    for (const column of this._columnDefinitions) {
      if (column.headerKey) {
        column.name = this.translate.instant(column.headerKey);
      }
    }

    // calling setColumns() will trigger a grid re-render
    this._grid.setColumns(this._columnDefinitions);
  }

  /**
   * Attach/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   * @param columnDefinitions
   * @param options
   */
  createPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      this.checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(options.checkboxSelector || {});
      const selectionColumn: Column = this.checkboxSelectorPlugin.getColumnDefinition();
      selectionColumn.excludeFromExport = true;
      columnDefinitions.unshift(selectionColumn);
    }
  }
}
