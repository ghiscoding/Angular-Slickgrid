import 'slickgrid/controls/slick.gridmenu';
import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  Column,
  DelimiterType,
  Extension,
  FileType,
  GridOption,
  GridMenu,
  GridMenuItem,
  Locale,
  MenuCommandItemCallbackArgs,
  SlickEventHandler,
} from '../models';
import { ExcelExportService } from '../services/excelExport.service';
import { ExportService } from '../services/export.service';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { refreshBackendDataset } from '../services/backend-utilities';
import { getTranslationPrefix } from '../services/utilities';

// using external non-typed js libraries
declare const Slick: any;
declare const $: any;

@Injectable()
export class GridMenuExtension implements Extension {
  private _addon: any;
  private _gridMenuOptions: GridMenu | null;
  private _areVisibleColumnDifferent = false;
  private _eventHandler: SlickEventHandler;
  private _locales: Locale;
  private _userOriginalGridMenu: GridMenu;

  constructor(
    private readonly excelExportService: ExcelExportService,
    private readonly exportService: ExportService,
    private readonly extensionUtility: ExtensionUtility,
    private readonly filterService: FilterService,
    private readonly sharedService: SharedService,
    private readonly sortService: SortService,
    @Optional() private readonly translate: TranslateService,
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
    this.extensionUtility.nullifyFunctionNameStartingWithOn(this._gridMenuOptions);
    this._addon = null;
    this._gridMenuOptions = null;
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

      this._gridMenuOptions = { ...this.getDefaultGridMenuOptions(), ...this.sharedService.gridOptions.gridMenu };
      this.sharedService.gridOptions.gridMenu = this._gridMenuOptions;

      // merge original user grid menu items with internal items
      // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
      const originalCustomItems = this._userOriginalGridMenu && Array.isArray(this._userOriginalGridMenu.customItems) ? this._userOriginalGridMenu.customItems : [];
      this._gridMenuOptions.customItems = [...originalCustomItems, ...this.addGridMenuCustomCommands(originalCustomItems)];
      this.extensionUtility.translateItems(this._gridMenuOptions.customItems, 'titleKey', 'title');
      this.extensionUtility.sortItems(this._gridMenuOptions.customItems, 'positionOrder');

      this._addon = new Slick.Controls.GridMenu(this.sharedService.allColumns, this.sharedService.grid, this.sharedService.gridOptions);

      // hook all events
      if (this._gridMenuOptions) {
        if (this._gridMenuOptions.onExtensionRegistered) {
          this._gridMenuOptions.onExtensionRegistered(this._addon);
        }
        if (this._gridMenuOptions && typeof this._gridMenuOptions.onBeforeMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (e: any, args: { grid: any; menu: any; columns: Column[] }) => {
            this._gridMenuOptions.onBeforeMenuShow(e, args);
          });
        }
        if (this._gridMenuOptions && typeof this._gridMenuOptions.onAfterMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onAfterMenuShow, (e: any, args: { grid: any; menu: any; columns: Column[] }) => {
            this._gridMenuOptions.onAfterMenuShow(e, args);
          });
        }
        this._eventHandler.subscribe(this._addon.onColumnsChanged, (e: any, args: { columnId: string; showing: boolean; columns: Column[]; allColumns: Column[]; grid: any; }) => {
          this._areVisibleColumnDifferent = true;
          if (this._gridMenuOptions && typeof this._gridMenuOptions.onColumnsChanged === 'function') {
            this._gridMenuOptions.onColumnsChanged(e, args);
          }
          if (args && Array.isArray(args.columns) && args.columns.length > this.sharedService.visibleColumns.length) {
            this.sharedService.visibleColumns = args.columns;
          }
          // if we're using frozen columns, we need to readjust pinning when the new hidden column becomes visible again on the left pinning container
          // we need to readjust frozenColumn index because SlickGrid freezes by index and has no knowledge of the columns themselves
          const frozenColumnIndex = this.sharedService.gridOptions.frozenColumn !== undefined ? this.sharedService.gridOptions.frozenColumn : -1;
          if (frozenColumnIndex >= 0) {
            const { allColumns, columns: visibleColumns } = args;
            this.extensionUtility.readjustFrozenColumnIndexWhenNeeded(frozenColumnIndex, allColumns, visibleColumns);
          }
        });
        this._eventHandler.subscribe(this._addon.onCommand, (e: any, args: MenuCommandItemCallbackArgs) => {
          this.executeGridMenuInternalCustomCommands(e, args);
          if (this._gridMenuOptions && typeof this._gridMenuOptions.onCommand === 'function') {
            this._gridMenuOptions.onCommand(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onMenuClose, (e: any, args: { grid: any; menu: any; allColumns: Column[], visibleColumns: Column[] }) => {
          if (this._gridMenuOptions && typeof this._gridMenuOptions.onMenuClose === 'function') {
            this._gridMenuOptions.onMenuClose(e, args);
          }

          // we also want to resize the columns if the user decided to hide certain column(s)
          if (this.sharedService.grid && typeof this.sharedService.grid.autosizeColumns === 'function') {
            // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
            const gridUid = this.sharedService.grid.getUID();
            if (this._areVisibleColumnDifferent && gridUid && document.querySelector(`.${gridUid}`) !== null) {
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
      // eventually deprecate the "headerKey" and use only the "nameKey"
      this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
      this.extensionUtility.translateItems(this.sharedService.allColumns, 'nameKey', 'name');

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
  private addGridMenuCustomCommands(originalCustomItems: Array<GridMenuItem | 'divider'>) {
    const backendApi = this.sharedService.gridOptions.backendServiceApi || null;
    const gridMenuCustomItems: Array<GridMenuItem | 'divider'> = [];
    const gridOptions = this.sharedService.gridOptions;
    const translationPrefix = getTranslationPrefix(gridOptions);

    // show grid menu: Clear Frozen Columns
    if (this.sharedService.gridOptions && this._gridMenuOptions && !this._gridMenuOptions.hideClearFrozenColumnsCommand) {
      const commandName = 'clear-frozen-columns';
      if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridMenuOptions.iconClearFrozenColumnsCommand || 'fa fa-times',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}CLEAR_FROZEN_COLUMNS`) : this._locales && this._locales.TEXT_CLEAR_FROZEN_COLUMNS,
            disabled: false,
            command: commandName,
            positionOrder: 49
          }
        );
      }
    }

    if (this.sharedService.gridOptions && (this.sharedService.gridOptions.enableFiltering && !this.sharedService.hideHeaderRowAfterPageLoad)) {
      // show grid menu: Clear all Filters
      if (this.sharedService.gridOptions && this._gridMenuOptions && !this._gridMenuOptions.hideClearAllFiltersCommand) {
        const commandName = 'clear-filter';
        if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this._gridMenuOptions.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}CLEAR_ALL_FILTERS`) : this._locales && this._locales.TEXT_CLEAR_ALL_FILTERS,
              disabled: false,
              command: commandName,
              positionOrder: 50
            }
          );
        }
      }

      // show grid menu: toggle filter row
      if (this.sharedService.gridOptions && this._gridMenuOptions && !this._gridMenuOptions.hideToggleFilterCommand) {
        const commandName = 'toggle-filter';
        if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this._gridMenuOptions.iconToggleFilterCommand || 'fa fa-random',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}TOGGLE_FILTER_ROW`) : this._locales && this._locales.TEXT_TOGGLE_FILTER_ROW,
              disabled: false,
              command: commandName,
              positionOrder: 52
            }
          );
        }
      }

      // show grid menu: refresh dataset
      if (this.sharedService.gridOptions && this._gridMenuOptions && !this._gridMenuOptions.hideRefreshDatasetCommand && backendApi) {
        const commandName = 'refresh-dataset';
        if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this._gridMenuOptions.iconRefreshDatasetCommand || 'fa fa-refresh',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}REFRESH_DATASET`) : this._locales && this._locales.TEXT_REFRESH_DATASET,
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
      if (this.sharedService.gridOptions && this._gridMenuOptions && !this._gridMenuOptions.hideTogglePreHeaderCommand) {
        const commandName = 'toggle-preheader';
        if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this._gridMenuOptions.iconTogglePreHeaderCommand || 'fa fa-random',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}TOGGLE_PRE_HEADER_ROW`) : this._locales && this._locales.TEXT_TOGGLE_PRE_HEADER_ROW,
              disabled: false,
              command: commandName,
              positionOrder: 52
            }
          );
        }
      }
    }

    if (this.sharedService.gridOptions.enableSorting) {
      // show grid menu: Clear all Sorting
      if (this.sharedService.gridOptions && this._gridMenuOptions && !this._gridMenuOptions.hideClearAllSortingCommand) {
        const commandName = 'clear-sorting';
        if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          gridMenuCustomItems.push(
            {
              iconCssClass: this._gridMenuOptions.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
              title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}CLEAR_ALL_SORTING`) : this._locales && this._locales.TEXT_CLEAR_ALL_SORTING,
              disabled: false,
              command: commandName,
              positionOrder: 51
            }
          );
        }
      }
    }

    // show grid menu: Export to file
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this._gridMenuOptions && !this._gridMenuOptions.hideExportCsvCommand) {
      const commandName = 'export-csv';
      if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridMenuOptions.iconExportCsvCommand || 'fa fa-download',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}EXPORT_TO_CSV`) : this._locales && this._locales.TEXT_EXPORT_TO_CSV,
            disabled: false,
            command: commandName,
            positionOrder: 53
          }
        );
      }
    }

    // show grid menu: Export to Excel
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExcelExport && this._gridMenuOptions && !this._gridMenuOptions.hideExportExcelCommand) {
      const commandName = 'export-excel';
      if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridMenuOptions.iconExportExcelCommand || 'fa fa-file-excel-o text-success',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}EXPORT_TO_EXCEL`) : this._locales && this._locales.TEXT_EXPORT_TO_EXCEL,
            disabled: false,
            command: commandName,
            positionOrder: 54
          }
        );
      }
    }

    // show grid menu: export to text file as tab delimited
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this._gridMenuOptions && !this._gridMenuOptions.hideExportTextDelimitedCommand) {
      const commandName = 'export-text-delimited';
      if (!originalCustomItems.find((item: GridMenuItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        gridMenuCustomItems.push(
          {
            iconCssClass: this._gridMenuOptions.iconExportTextDelimitedCommand || 'fa fa-download',
            title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant(`${translationPrefix}EXPORT_TO_TAB_DELIMITED`) : this._locales && this._locales.TEXT_EXPORT_TO_TAB_DELIMITED,
            disabled: false,
            command: commandName,
            positionOrder: 55
          }
        );
      }
    }

    // add the custom "Commands" title if there are any commands
    if (this.sharedService && this.sharedService.gridOptions && this._gridMenuOptions && (Array.isArray(gridMenuCustomItems) && gridMenuCustomItems.length > 0 || (Array.isArray(this._gridMenuOptions.customItems) && this._gridMenuOptions.customItems.length > 0))) {
      this._gridMenuOptions.customTitle = this._gridMenuOptions.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
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
        case 'clear-frozen-columns':
          const visibleColumns = [...this.sharedService.visibleColumns];
          this.sharedService.grid.setOptions({ frozenColumn: -1, enableMouseWheelScrollHandler: false });
          if (Array.isArray(visibleColumns) && Array.isArray(this.sharedService.allColumns) && visibleColumns.length !== this.sharedService.allColumns.length) {
            this.sharedService.grid.setColumns(visibleColumns);
          }
          break;
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
            format: FileType.csv,
          });
          break;
        case 'export-excel':
          this.excelExportService.exportToExcel();
          break;
        case 'export-text-delimited':
          this.exportService.exportToFile({
            delimiter: DelimiterType.tab,
            format: FileType.txt,
          });
          break;
        case 'toggle-filter':
          let showHeaderRow = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showHeaderRow || false;
          showHeaderRow = !showHeaderRow; // inverse show header flag
          this.sharedService.grid.setHeaderRowVisibility(showHeaderRow);

          // when displaying header row, we'll call "setColumns" which in terms will recreate the header row filters
          if (showHeaderRow === true) {
            this.sharedService.grid.setColumns(this.sharedService.columnDefinitions);
          }
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
    if (this.sharedService && this.sharedService.gridOptions && this._gridMenuOptions) {
      this._gridMenuOptions.customTitle = '';
      this._gridMenuOptions.columnTitle = '';
      this._gridMenuOptions.forceFitTitle = '';
      this._gridMenuOptions.syncResizeTitle = '';
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
