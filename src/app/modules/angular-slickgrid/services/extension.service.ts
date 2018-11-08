import { Injectable } from '@angular/core';
import {
  Column,
  Extension,
  ExtensionName,
  GridOption,
} from '../models/index';
import { TranslateService } from '@ngx-translate/core';
import { FilterService } from './filter.service';
import { ExportService } from './export.service';
import { SortService } from './sort.service';
import {
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
} from '../extensions';
import { GridMenuExtension } from '../extensions/gridMenuExtension';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

@Injectable()
export class ExtensionService {
  private _dataView: any;
  private _grid: any;
  allColumns: Column[];
  visibleColumns: Column[];
  extensionList: Extension[] = [];
  undoRedoBuffer: any;

  // controls & plugins
  checkboxSelectorExtension: CheckboxSelectorExtension;
  columnPickerExtension: ColumnPickerExtension;
  gridMenuExtension: GridMenuExtension;
  headerMenuExtension: HeaderMenuExtension;
  rowSelectionExtension: any;

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
      this.columnPickerExtension = new ColumnPickerExtension(this._grid, this._gridOptions, this.allColumns, this._columnDefinitions, this.translate);
      if (this.columnPickerExtension && this.columnPickerExtension.register) {
        this.extensionList.push({ name: ExtensionName.columnPicker, service: this.columnPickerExtension.register() });
      }
    }

    // Grid Menu Control
    if (this._gridOptions.enableGridMenu) {
      this.gridMenuExtension = new GridMenuExtension(this._grid, this._gridOptions, this.allColumns, this._columnDefinitions, this._dataView, this.exportService, this.filterService, this.sortService, this.translate, this.visibleColumns);
      if (this.gridMenuExtension && this.gridMenuExtension.register) {
        this.extensionList.push({ name: ExtensionName.gridMenu, service: this.gridMenuExtension.register() });
      }
    }

    // Auto Tooltip Plugin
    if (this._gridOptions.enableAutoTooltip) {
      const autoTooltipPlugin = new AutoTooltipExtension(this._grid, this._gridOptions);
      if (autoTooltipPlugin && autoTooltipPlugin.register) {
        this.extensionList.push({ name: ExtensionName.autoTooltip, service: autoTooltipPlugin.register() });
      }
    }

    // Grouping Plugin
    // register the group item metadata provider to add expand/collapse group handlers
    if (this._gridOptions.enableGrouping) {
      const extension = new GroupItemMetaProviderExtension(this._grid, groupItemMetadataProvider);
      if (extension && extension.register) {
        this.extensionList.push({ name: ExtensionName.groupItemMetaProvider, service: extension.register() });
      }
    }

    // Checkbox Selector Plugin
    if (this._gridOptions.enableCheckboxSelector) {
      if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
        this.extensionList.push({ name: ExtensionName.checkboxSelector, service: this.checkboxSelectorExtension.register(this._grid, this.rowSelectionExtension) });
      }
    }

    // Row Selection Plugin
    if (!this._gridOptions.enableCheckboxSelector && this._gridOptions.enableRowSelection) {
      this.rowSelectionExtension = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
      this._grid.setSelectionModel(this.rowSelectionExtension);
    }

    // Header Button Plugin
    if (this._gridOptions.enableHeaderButton) {
      const headerButtonPlugin = new HeaderButtonExtension(this._grid, this._gridOptions);
      if (headerButtonPlugin && headerButtonPlugin.register) {
        this.extensionList.push({ name: ExtensionName.headerButtons, service: headerButtonPlugin.register() });
      }
    }

    // Header Menu Plugin
    if (this._gridOptions.enableHeaderMenu) {
      this.headerMenuExtension = new HeaderMenuExtension(this._grid, this._gridOptions, this._columnDefinitions, this._dataView, this.sortService, this.translate, this.visibleColumns);
      if (this.headerMenuExtension && this.headerMenuExtension.register) {
        this.extensionList.push({ name: ExtensionName.headerMenu, service: this.headerMenuExtension.register() });
      }
    }

    // Cell External Copy Manager Plugin (Excel Like)
    if (this._gridOptions.enableExcelCopyBuffer) {
      const extension = new CellExternalCopyManagerExtension(this._grid, this._gridOptions);
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
      this.checkboxSelectorExtension = new CheckboxSelectorExtension(columnDefinitions, options);
      this.checkboxSelectorExtension.create();
    }
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

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset(gridOptions?: GridOption) {
    this.gridMenuExtension.refreshBackendDataset(gridOptions);
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
    this.columnPickerExtension.translateColumnPicker();
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateGridMenu() {
    if (this._gridOptions && this._gridOptions.gridMenu) {
      this.gridMenuExtension.translateGridMenu();
    }
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateHeaderMenu() {
    if (this._gridOptions && this._gridOptions.headerMenu) {
      this.headerMenuExtension.translateHeaderMenu();
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

  /** Translate the an array of items from an input key and assign to the output key */
  private translateItems(items: any[], inputKey: string, outputKey: string) {
    for (const item of items) {
      if (item[inputKey]) {
        item[outputKey] = this.translate.instant(item[inputKey]);
      }
    }
  }
}
