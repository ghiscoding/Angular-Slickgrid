import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import {
  CellArgs,
  DelimiterType,
  Extension,
  ExtensionName,
  FileType,
  GridOption,
  GridMenu,
  GridMenuItem,
  Locale,
  SlickEventHandler,
} from '../models';
import { ExcelExportService } from '../services/excelExport.service';
import { ExportService } from '../services/export.service';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { refreshBackendDataset } from '../services/backend-utilities';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

@Injectable()
export class GridMenuExtension implements Extension {
  private _addon: any;
  private _areVisibleColumnDifferent = false;
  private _eventHandler: SlickEventHandler;
  private _locales: Locale;
  private _userOriginalGridMenu: GridMenu;

  constructor(
    private excelExportService: ExcelExportService,
    private exportService: ExportService,
    private extensionUtility: ExtensionUtility,
    private filterService: FilterService,
    private sharedService: SharedService,
    private sortService: SortService,
    @Optional() private translate: TranslateService,
  ) {
    this._eventHandler = new Slick.EventHandler();
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && this.sharedService.gridOptions.gridMenu.customItems) {
      this.sharedService.gridOptions.gridMenu = this._userOriginalGridMenu;
    }
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
  register(): any {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
      // keep original user grid menu, useful when switching locale to translate
      this._userOriginalGridMenu = { ...this.sharedService.gridOptions.gridMenu };

      // get locales provided by user in forRoot or else use default English locales via the Constants
      this._locales = this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
      this.sharedService.gridOptions.gridMenu = { ...this.getDefaultGridMenuOptions(), ...this.sharedService.gridOptions.gridMenu };

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      const originalCustomItems = this._userOriginalGridMenu && Array.isArray(this._userOriginalGridMenu.customItems) ? this._userOriginalGridMenu.customItems : [];
      this.sharedService.gridOptions.gridMenu.customItems = [...originalCustomItems, ...this.addGridMenuCustomCommands(originalCustomItems)];
      this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
      this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');

      this._addon = new Slick.Controls.GridMenu(this.sharedService.allColumns, this.sharedService.grid, this.sharedService.gridOptions);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
        if (this.sharedService.gridOptions.gridMenu.onExtensionRegistered) {
          this.sharedService.gridOptions.gridMenu.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (e: any, args: CellArgs) => {
          if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
            this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onColumnsChanged, (e: any, args: { columns: any, grid: any }) => {
          this._areVisibleColumnDifferent = true;
          if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
            this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
          }
          if (args && Array.isArray(args.columns) && args.columns.length > this.sharedService.visibleColumns.length) {
            this.sharedService.visibleColumns = args.columns;
          }
        });
        this._eventHandler.subscribe(this._addon.onCommand, (e: any, args: any) => {
          this.executeGridMenuInternalCustomCommands(e, args);
          if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
            this.sharedService.gridOptions.gridMenu.onCommand(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onMenuClose, (e: any, args: CellArgs) => {
          if (this.sharedService.gridOptions.gridMenu && typeof this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
            this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
          }

          // we also want to resize the columns if the user decided to hide certain column(s)
          if (this.sharedService.grid && typeof this.sharedService.grid.autosizeColumns === 'function') {
            // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
            const gridUid = this.sharedService.grid.getUID();
            if (this._areVisibleColumnDifferent && gridUid && $(`.${gridUid}`).length > 0) {
              if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                this.sharedService.grid.autosizeColumns();
              }
              this._areVisibleColumnDifferent = false;
            }
          }
        });
      }
      return this._addon;
    }
    return null;
  }

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset(gridOptions?: GridOption) {
    // user can pass new set of grid options which will override current ones
    if (gridOptions) {
      this.sharedService.gridOptions = { ...this.sharedService.gridOptions, ...gridOptions };
    }
    refreshBackendDataset(this.sharedService.gridOptions);
  }

  showGridMenu(e) {
    this._addon.showGridMenu(e);
  }

  /** Translate the Grid Menu titles and column picker */
  translateGridMenu() {
    // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
    // we also need to call the control init so that it takes the new Grid object with latest values
    if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
      this.sharedService.gridOptions.gridMenu.customItems = [];
      this.emptyGridMenuTitles();

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      const originalCustomItems = this._userOriginalGridMenu && Array.isArray(this._userOriginalGridMenu.customItems) ? this._userOriginalGridMenu.customItems : [];
      this.sharedService.gridOptions.gridMenu.customItems = [...originalCustomItems, ...this.addGridMenuCustomCommands(originalCustomItems)];
      this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
      this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');

      this.sharedService.gridOptions.gridMenu.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu');
      this.sharedService.gridOptions.gridMenu.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
      this.sharedService.gridOptions.gridMenu.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');

      // translate all columns (including non-visible)
      this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');

      // update the Titles of each sections (command, customTitle, ...)
      if (this._addon && this._addon.updateAllTitles) {
        this._addon.updateAllTitles(this.sharedService.gridOptions.gridMenu);
      }
    }
  }

  // --
  // private functions
  // ------------------

  /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
  private addGridMenuCustomCommands(originalCustomItems: GridMenuItem[]) {
    const backendApi = this.sharedService.gridOptions.backendServiceApi || null;
    const gridMenuCustomItems: GridMenuItem[] = [];

    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableFiltering) {
      // show grid menu: clear all filters
      if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllFiltersCommand) {
        const commandName = 'clear-filter';
        if (!originalCustomItems.find((item) => item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : this._locales && this._locales.TEXT_CLEAR_ALL_FILTERS,
              disabled: false,
              command: commandName,
              positionOrder: 50
            }
          );
        }
      }

      // show grid menu: toggle filter row
      if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideToggleFilterCommand) {
        const commandName = 'toggle-filter';
        if (!originalCustomItems.find((item) => item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this.sharedService.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : this._locales && this._locales.TEXT_TOGGLE_FILTER_ROW,
              disabled: false,
              command: commandName,
              positionOrder: 52
            }
          );
        }
      }

      // show grid menu: refresh dataset
      if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
        const commandName = 'refresh-dataset';
        if (!originalCustomItems.find((item) => item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this.sharedService.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : this._locales && this._locales.TEXT_REFRESH_DATASET,
              disabled: false,
              command: commandName,
              positionOrder: 56
            }
          );
        }
      }
    }

    if (this.sharedService.gridOptions.showPreHeaderPanel) {
      // show grid menu: toggle pre-header row
      if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideTogglePreHeaderCommand) {
        const commandName = 'toggle-preheader';
        if (!originalCustomItems.find((item) => item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this.sharedService.gridOptions.gridMenu.iconTogglePreHeaderCommand || 'fa fa-random',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_PRE_HEADER_ROW') : this._locales && this._locales.TEXT_TOGGLE_PRE_HEADER_ROW,
              disabled: false,
              command: commandName,
              positionOrder: 52
            }
          );
        }
      }
    }

    if (this.sharedService.gridOptions.enableSorting) {
      // show grid menu: clear all sorting
      if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllSortingCommand) {
        const commandName = 'clear-sorting';
        if (!originalCustomItems.find((item) => item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : this._locales && this._locales.TEXT_CLEAR_ALL_SORTING,
              disabled: false,
              command: commandName,
              positionOrder: 51
            }
          );
        }
      }
    }

    // show grid menu: Export to file
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportCsvCommand) {
      const commandName = 'export-csv';
      if (!originalCustomItems.find((item) => item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : this._locales && this._locales.TEXT_EXPORT_IN_CSV_FORMAT,
            disabled: false,
            command: commandName,
            positionOrder: 53
          }
        );
      }
    }

    // show grid menu: Export to Excel
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExcelExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportExcelCommand) {
      const commandName = 'export-excel';
      if (!originalCustomItems.find((item) => item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportExcelCommand || 'fa fa-file-excel-o text-success',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_EXCEL') : this._locales && this._locales.TEXT_EXPORT_TO_EXCEL,
            disabled: false,
            command: commandName,
            positionOrder: 54
          }
        );
      }
    }

    // show grid menu: export to text file as tab delimited
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
      const commandName = 'export-text-delimited';
      if (!originalCustomItems.find((item) => item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : this._locales && this._locales.TEXT_EXPORT_IN_TEXT_FORMAT,
            disabled: false,
            command: commandName,
            positionOrder: 55
          }
        );
      }
    }

    // add the custom "Commands" title if there are any commands
    if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && (Array.isArray(gridMenuCustomItems) && gridMenuCustomItems.length > 0 || (Array.isArray(this.sharedService.gridOptions.gridMenu.customItems) && this.sharedService.gridOptions.gridMenu.customItems.length > 0))) {
      this.sharedService.gridOptions.gridMenu.customTitle = this.sharedService.gridOptions.gridMenu.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
    }

    return gridMenuCustomItems;
  }

  /**
   * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
   * These are the default internal custom commands
   * @param event
   * @param GridMenuItem args
   */
  private executeGridMenuInternalCustomCommands(e: Event, args: GridMenuItem) {
    if (args && args.command) {
      switch (args.command) {
        case 'clear-filter':
          this.filterService.clearFilters();
          this.sharedService.dataView.refresh();
          break;
        case 'clear-sorting':
          this.sortService.clearSorting();
          this.sharedService.dataView.refresh();
          break;
        case 'export-csv':
          this.exportService.exportToFile({
            delimiter: DelimiterType.comma,
            filename: 'export',
            format: FileType.csv,
            useUtf8WithBom: true,
          });
          break;
        case 'export-excel':
          this.excelExportService.exportToExcel({
            filename: 'export',
            format: FileType.xlsx,
          });
          break;
        case 'export-text-delimited':
          this.exportService.exportToFile({
            delimiter: DelimiterType.tab,
            filename: 'export',
            format: FileType.txt,
            useUtf8WithBom: true,
          });
          break;
        case 'toggle-filter':
          const showHeaderRow = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showHeaderRow || false;
          this.sharedService.grid.setHeaderRowVisibility(!showHeaderRow);
          break;
        case 'toggle-toppanel':
          const showTopPanel = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showTopPanel || false;
          this.sharedService.grid.setTopPanelVisibility(!showTopPanel);
          break;
        case 'toggle-preheader':
          const showPreHeaderPanel = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showPreHeaderPanel || false;
          this.sharedService.grid.setPreHeaderPanelVisibility(!showPreHeaderPanel);
          break;
        case 'refresh-dataset':
          this.refreshBackendDataset();
          break;
        default:
          break;
      }
    }
  }

  private emptyGridMenuTitles() {
    if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
      this.sharedService.gridOptions.gridMenu.customTitle = '';
      this.sharedService.gridOptions.gridMenu.columnTitle = '';
      this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
      this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
    }
  }

  /** @return default Grid Menu options */
  private getDefaultGridMenuOptions(): GridMenu {
    return {
      customTitle: undefined,
      columnTitle: this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu'),
      forceFitTitle: this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
      syncResizeTitle: this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
      iconCssClass: 'fa fa-bars',
      menuWidth: 18,
      customItems: [],
      hideClearAllFiltersCommand: false,
      hideRefreshDatasetCommand: false,
      hideToggleFilterCommand: false,
    };
  }
}
