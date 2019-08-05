// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';

import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  Column,
  ExtensionModel,
  ExtensionName,
  GridOption,
} from '../models/index';
import {
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  DraggableGroupingExtension,
  GridMenuExtension,
  GroupItemMetaProviderExtension,
  HeaderButtonExtension,
  HeaderMenuExtension,
  RowDetailViewExtension,
  RowMoveManagerExtension,
  RowSelectionExtension,
} from '../extensions/index';
import { SharedService } from './shared.service';

@Injectable()
export class ExtensionService {
  private _extensionCreatedList: any[] = [];
  private _extensionList: ExtensionModel[] = [];

  constructor(
    private autoTooltipExtension: AutoTooltipExtension,
    private cellExternalCopyExtension: CellExternalCopyManagerExtension,
    private checkboxSelectorExtension: CheckboxSelectorExtension,
    private columnPickerExtension: ColumnPickerExtension,
    private draggableGroupingExtension: DraggableGroupingExtension,
    private gridMenuExtension: GridMenuExtension,
    private groupItemMetaExtension: GroupItemMetaProviderExtension,
    private headerButtonExtension: HeaderButtonExtension,
    private headerMenuExtension: HeaderMenuExtension,
    private rowDetailViewExtension: RowDetailViewExtension,
    private rowMoveManagerExtension: RowMoveManagerExtension,
    private rowSelectionExtension: RowSelectionExtension,
    private sharedService: SharedService,
    @Optional() private translate: TranslateService,
  ) { }

  /** Dispose of all the controls & plugins */
  dispose() {
    this.sharedService.grid = null;
    this.sharedService.visibleColumns = [];

    // dispose of each control/plugin & reset the list
    this._extensionList.forEach((item) => {
      if (item && item.class && item.class.dispose) {
        item.class.dispose();
      }
    });
    this._extensionList = [];
  }

  /** Get all columns (includes visible and non-visible) */
  getAllColumns(): Column[] {
    return this.sharedService.allColumns || [];
  }

  /** Get only visible columns */
  getVisibleColumns(): Column[] {
    return this.sharedService.visibleColumns || [];
  }

  /** Get all Extensions */
  getAllExtensions(): ExtensionModel[] {
    return this._extensionList;
  }

  /**
   * Get an Extension by it's name
   *  @param name
   */
  getExtensionByName(name: ExtensionName): ExtensionModel | undefined {
    return Array.isArray(this._extensionList) && this._extensionList.find((p) => p.name === name);
  }

  /**
   * Get the instance of the SlickGrid addon (control or plugin).
   * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
   *  @param name
   */
  getSlickgridAddonInstance(name: ExtensionName): any {
    const extension = this.getExtensionByName(name);
    if (extension && extension.class && (extension.instance || extension.addon)) {
      if (extension.class && extension.class.getAddonInstance) {
        return extension.class.getAddonInstance();
      }
      return extension.instance;
    }
    return null;
  }

  /** Auto-resize all the column in the grid to fit the grid width */
  autoResizeColumns() {
    this.sharedService.grid.autosizeColumns();
  }

  /** Bind/Create different Controls or Plugins after the Grid is created */
  bindDifferentExtensions() {
    if (this.sharedService && this.sharedService.gridOptions) {
      // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
      // this is to avoid having hidden columns not being translated on first load
      if (this.sharedService.gridOptions.enableTranslate) {
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
      }

      // Auto Tooltip Plugin
      if (this.sharedService.gridOptions.enableAutoTooltip) {
        if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
          const instance = this.autoTooltipExtension.register();
          this._extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: instance, instance });
        }
      }

      // Cell External Copy Manager Plugin (Excel Like)
      if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
        if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
          const instance = this.cellExternalCopyExtension.register();
          this._extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: instance, instance });
        }
      }

      // Row Selection Plugin
      // this extension should be registered BEFORE the Checkbox Selector & Row Detail since it can be use by these 2 plugins
      if (!this.getExtensionByName(ExtensionName.rowSelection) && (this.sharedService.gridOptions.enableRowSelection || this.sharedService.gridOptions.enableCheckboxSelector || this.sharedService.gridOptions.enableRowDetailView)) {
        if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
          const instance = this.rowSelectionExtension.register();
          this._extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: instance, instance });
        }
      }

      // Checkbox Selector Plugin
      if (this.sharedService.gridOptions.enableCheckboxSelector) {
        if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
          const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
          this.checkboxSelectorExtension.register(rowSelectionExtension);
          const createdExtension = this.getCreatedExtensionByName(ExtensionName.checkboxSelector); // get the instance from when it was really created earlier
          const instance = createdExtension && createdExtension.instance;
          this._extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: instance, instance });
        }
      }

      // Column Picker Control
      if (this.sharedService.gridOptions.enableColumnPicker) {
        if (this.columnPickerExtension && this.columnPickerExtension.register) {
          const instance = this.columnPickerExtension.register();
          this._extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, addon: instance, instance });
        }
      }

      // Draggable Grouping Plugin
      if (this.sharedService.gridOptions.enableDraggableGrouping) {
        if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
          const instance = this.draggableGroupingExtension.register();
          this._extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: instance, instance });
        }
      }

      // Grid Menu Control
      if (this.sharedService.gridOptions.enableGridMenu) {
        if (this.gridMenuExtension && this.gridMenuExtension.register) {
          const instance = this.gridMenuExtension.register();
          this._extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, addon: instance, instance });
        }
      }

      // Grouping Plugin
      // register the group item metadata provider to add expand/collapse group handlers
      if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
        if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
          const instance = this.groupItemMetaExtension.register();
          this._extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: instance, instance });
        }
      }

      // Header Button Plugin
      if (this.sharedService.gridOptions.enableHeaderButton) {
        if (this.headerButtonExtension && this.headerButtonExtension.register) {
          const instance = this.headerButtonExtension.register();
          this._extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, addon: instance, instance });
        }
      }

      // Header Menu Plugin
      if (this.sharedService.gridOptions.enableHeaderMenu) {
        if (this.headerMenuExtension && this.headerMenuExtension.register) {
          const instance = this.headerMenuExtension.register();
          this._extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, addon: instance, instance });
        }
      }

      // Row Detail View Plugin
      if (this.sharedService.gridOptions.enableRowDetailView) {
        if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
          const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
          this.rowDetailViewExtension.register(rowSelectionExtension);
          const createdExtension = this.getCreatedExtensionByName(ExtensionName.rowDetailView); // get the plugin from when it was really created earlier
          const instance = createdExtension && createdExtension.instance;
          this._extensionList.push({ name: ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: instance, instance });
        }
      }

      // Row Move Manager Plugin
      if (this.sharedService.gridOptions.enableRowMoveManager) {
        if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
          const instance = this.rowMoveManagerExtension.register();
          this._extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: instance, instance });
        }
      }

      // manually register other plugins
      if (this.sharedService.gridOptions.registerPlugins !== undefined) {
        if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
          this.sharedService.gridOptions.registerPlugins.forEach((plugin) => {
            const instance = this.sharedService.grid.registerPlugin(plugin);
            this._extensionList.push({ name: ExtensionName.noname, class: null, addon: instance, instance });
          });
        } else {
          this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
          const plugin = this.sharedService.gridOptions.registerPlugins;
          const instance = this.sharedService.grid.registerPlugin(plugin);
          this._extensionList.push({ name: ExtensionName.noname, class: null, addon: instance, instance });
        }
      }
    }
  }

  /**
   * Bind/Create certain plugins before the Grid creation, else they might behave oddly.
   * Mostly because the column definitions might change after the grid creation
   * @param columnDefinitions
   * @param options
   */
  createExtensionsBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      if (!this.getCreatedExtensionByName(ExtensionName.checkboxSelector)) {
        const checkboxInstance = this.checkboxSelectorExtension.create(columnDefinitions, options);
        this._extensionCreatedList.push({ name: ExtensionName.checkboxSelector, instance: checkboxInstance });
      }
    }
    if (options.enableRowDetailView) {
      if (!this.getCreatedExtensionByName(ExtensionName.rowDetailView)) {
        const rowDetailInstance = this.rowDetailViewExtension.create(columnDefinitions, options);
        this._extensionCreatedList.push({ name: ExtensionName.rowDetailView, instance: rowDetailInstance });
      }
    }
    if (options.enableDraggableGrouping) {
      if (!this.getCreatedExtensionByName(ExtensionName.rowDetailView)) {
        const draggableInstance = this.draggableGroupingExtension.create(options);
        options.enableColumnReorder = draggableInstance.getSetupColumnReorder;
        this._extensionCreatedList.push({ name: ExtensionName.draggableGrouping, instance: draggableInstance });
      }
    }
  }

  /** Hide a column from the grid */
  hideColumn(column: Column) {
    if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
      const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
      this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
      this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
    }
  }

  /** Refresh the dataset through the Backend Service */
  refreshBackendDataset(gridOptions?: GridOption) {
    this.gridMenuExtension.refreshBackendDataset(gridOptions);
  }

  /**
   * Remove a column from the grid by it's index in the grid
   * @param columns input
   * @param index
   */
  removeColumnByIndex(columns: Column[], index: number): Column[] {
    if (Array.isArray(columns)) {
      return columns.filter((el: Column, i: number) => index !== i);
    }
    return columns;
  }

  /** Translate the Column Picker and it's last 2 checkboxes */
  translateColumnPicker() {
    if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
      this.columnPickerExtension.translateColumnPicker();
    }
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateGridMenu() {
    if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
      this.gridMenuExtension.translateGridMenu();
    }
  }

  /**
   * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
   */
  translateHeaderMenu() {
    if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
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
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (locale) {
      this.translate.use(locale as string);
    }

    let columnDefinitions = newColumnDefinitions;
    if (!columnDefinitions) {
      columnDefinitions = this.sharedService.columnDefinitions;
    }

    this.translateItems(columnDefinitions, 'headerKey', 'name');
    this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');

    // re-render the column headers
    this.renderColumnHeaders(columnDefinitions);
    this.gridMenuExtension.translateGridMenu();
  }

  /**
   * Render (or re-render) the column headers from column definitions.
   * calling setColumns() will trigger a grid re-render
   */
  renderColumnHeaders(newColumnDefinitions?: Column[]) {
    let collection = newColumnDefinitions;
    if (!collection) {
      collection = this.sharedService.columnDefinitions;
    }
    if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
      if (collection.length > this.sharedService.allColumns.length) {
        this.sharedService.allColumns = collection;
      }
      this.sharedService.grid.setColumns(collection);
    }

    // dispose of previous Column Picker instance, then re-register it and don't forget to overwrite previous instance ref
    if (this.sharedService.gridOptions.enableColumnPicker) {
      this.columnPickerExtension.dispose();
      const instance = this.columnPickerExtension.register();
      const extension = this.getExtensionByName(ExtensionName.columnPicker);
      if (extension) {
        extension.addon = instance;
        extension.instance = instance;
      }
    }

    // dispose of previous Grid Menu instance, then re-register it and don't forget to overwrite previous instance ref
    if (this.sharedService.gridOptions.enableGridMenu) {
      this.gridMenuExtension.dispose();
      const instance = this.gridMenuExtension.register();
      const extension = this.getExtensionByName(ExtensionName.gridMenu);
      if (extension) {
        extension.addon = instance;
        extension.instance = instance;
      }
    }
  }

  //
  // private functions
  // -------------------

  /**
   * Get an Extension that was created by calling its "create" method (there are only 3 extensions which uses this method)
   *  @param name
   */
  private getCreatedExtensionByName(name: ExtensionName): ExtensionModel | undefined {
    return Array.isArray(this._extensionCreatedList) && this._extensionCreatedList.find((p) => p.name === name);
  }

  /** Translate an array of items from an input key and assign translated value to the output key */
  private translateItems(items: any[], inputKey: string, outputKey: string) {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (Array.isArray(items)) {
      for (const item of items) {
        if (item[inputKey]) {
          item[outputKey] = this.translate.instant(item[inputKey]);
        }
      }
    }
  }
}
