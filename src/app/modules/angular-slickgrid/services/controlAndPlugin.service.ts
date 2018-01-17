import { Injectable } from '@angular/core';
import { FilterService } from './filter.service';
import { GridExtraUtils } from './gridExtraUtils';
import { GridExtraService } from './gridExtra.service';
import {
  CellArgs,
  CheckboxSelector,
  CustomGridMenu,
  Column,
  Formatter,
  GridOption,
  HeaderButtonOnCommandArgs,
  HeaderMenuOnCommandArgs,
  HeaderMenuOnBeforeMenuShowArgs
} from './../models';
import $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';

// using external js modules in Angular
declare var Slick: any;

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

  constructor(private filterService: FilterService, private gridExtraService: GridExtraService, private translate: TranslateService) { }

  /**
   * Attach/Create different Controls or Plugins after the Grid is created
   * @param {any} grid
   * @param {Column[]} columnDefinitions
   * @param {GridOptions} options
   * @param {any} dataView
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
      this.headerMenuPlugin = new Slick.Plugins.HeaderMenu(options.headerMenu || {});
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
  }

  createGridMenu(grid: any, columnDefinitions: Column[], options: GridOption) {
    this.prepareGridMenu(grid, options);

    const gridMenuControl = new Slick.Controls.GridMenu(columnDefinitions, grid, options);
    if (options.gridMenu) {
      gridMenuControl.onBeforeMenuShow.subscribe((e: Event, args: CellArgs) => {
        if (options.gridMenu && typeof options.gridMenu.onBeforeMenuShow === 'function') {
          options.gridMenu.onBeforeMenuShow(e, args);
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
        this._grid.autosizeColumns();
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

  destroy() {
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

  private addGridMenuCustomCommands(grid: any, options: GridOption) {
    if (options.enableFiltering) {
      if (options && options.gridMenu && options.gridMenu.showClearAllFiltersCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'clear-filter').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: 'fa fa-filter text-danger',
            title: options.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : 'Clear All Filters',
            disabled: false,
            command: 'clear-filter'
          }
        );
      }
      if (options && options.gridMenu && options.gridMenu.showToggleFilterCommand && options.gridMenu.customItems && options.gridMenu.customItems.filter((item: CustomGridMenu) => item.command === 'toggle-filter').length === 0) {
        options.gridMenu.customItems.push(
          {
            iconCssClass: 'fa fa-random',
            title: options.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : 'Toggle Filter Row',
            disabled: false,
            command: 'toggle-filter'
          }
        );
      }
      if (options.gridMenu) {
        options.gridMenu.onCommand = (e, args) => {
          if (args.command === 'toggle-filter') {
            grid.setHeaderRowVisibility(!grid.getOptions().showHeaderRow);
          } else if (args.command === 'toggle-toppanel') {
            grid.setTopPanelVisibility(!grid.getOptions().showTopPanel);
          } else if (args.command === 'clear-filter') {
            this.filterService.clearFilters();
            this._dataView.refresh();
          } else {
            alert('Command: ' + args.command);
          }
        };
      }
    }

    // add the custom command title if there are commands
    if (options && options.gridMenu && options.gridMenu.customItems && options.gridMenu.customItems.length > 0) {
      const customTitle = options.enableTranslate ? this.translate.instant('COMMANDS') : 'Commands';
      options.gridMenu.customTitle = options.gridMenu.customTitle || customTitle;
    }
  }

  private prepareGridMenu(grid: any, options: GridOption) {
    const columnTitle = options.enableTranslate ? this.translate.instant('COLUMNS') : 'Columns';
    const forceFitTitle = options.enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : 'Force fit columns';
    const syncResizeTitle = options.enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : 'Synchronous resize';

    options.gridMenu = options.gridMenu || {};
    options.gridMenu.columnTitle = options.gridMenu.columnTitle || columnTitle;
    options.gridMenu.forceFitTitle = options.gridMenu.forceFitTitle || forceFitTitle;
    options.gridMenu.syncResizeTitle = options.gridMenu.syncResizeTitle || syncResizeTitle;
    options.gridMenu.iconCssClass = options.gridMenu.iconCssClass || 'fa fa-bars';
    options.gridMenu.menuWidth = options.gridMenu.menuWidth || 18;
    options.gridMenu.customTitle = options.gridMenu.customTitle || undefined;
    options.gridMenu.customItems = options.gridMenu.customItems || [];
    this.addGridMenuCustomCommands(grid, options);
    // options.gridMenu.resizeOnShowHeaderRow = options.showHeaderRow;
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
    this._gridOptions.gridMenu = undefined;
    this.createGridMenu(this._grid, this.visibleColumns, this._gridOptions);
  }

  /**
   * Translate manually the header titles.
   * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
   * @param {string} locale locale to use
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
   * @param {Column[]} columnDefinitions
   * @param {GridOptions} options
   */
  createPluginBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      this.checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(options.checkboxSelector || {});
      columnDefinitions.unshift(this.checkboxSelectorPlugin.getColumnDefinition());
    }
  }
}
