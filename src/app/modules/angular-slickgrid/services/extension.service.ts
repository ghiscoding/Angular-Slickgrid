// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';

import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  Column,
  Extension,
  ExtensionList,
  ExtensionModel,
  ExtensionName,
  GridOption,
} from '../models/index';
import {
  AutoTooltipExtension,
  CellExternalCopyManagerExtension,
  CellMenuExtension,
  CheckboxSelectorExtension,
  ColumnPickerExtension,
  ContextMenuExtension,
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
  private _extensionCreatedList: ExtensionList = {} as ExtensionList;
  private _extensionList: ExtensionList = {} as ExtensionList;

  get extensionList(): ExtensionList {
    return this._extensionList;
  }

  constructor(
    private readonly autoTooltipExtension: AutoTooltipExtension,
    private readonly cellExternalCopyExtension: CellExternalCopyManagerExtension,
    private readonly cellMenuExtension: CellMenuExtension,
    private readonly checkboxSelectorExtension: CheckboxSelectorExtension,
    private readonly columnPickerExtension: ColumnPickerExtension,
    private readonly contextMenuExtension: ContextMenuExtension,
    private readonly draggableGroupingExtension: DraggableGroupingExtension,
    private readonly gridMenuExtension: GridMenuExtension,
    private readonly groupItemMetaExtension: GroupItemMetaProviderExtension,
    private readonly headerButtonExtension: HeaderButtonExtension,
    private readonly headerMenuExtension: HeaderMenuExtension,
    private readonly rowDetailViewExtension: RowDetailViewExtension,
    private readonly rowMoveManagerExtension: RowMoveManagerExtension,
    private readonly rowSelectionExtension: RowSelectionExtension,
    private readonly sharedService: SharedService,
    @Optional() private readonly translate: TranslateService,
  ) { }

  /** Dispose of all the controls & plugins */
  dispose() {
    this.sharedService.grid = null;
    this.sharedService.visibleColumns = [];

    // dispose of each control/plugin & reset the list
    for (const extensionName of Object.keys(this._extensionList)) {
      if (this._extensionList.hasOwnProperty(extensionName)) {
        const extension = this._extensionList[extensionName as keyof Record<ExtensionName, ExtensionModel>] as ExtensionModel;
        if (extension && extension.class && extension.class.dispose) {
          extension.class.dispose();
        }
      }
    }
    for (const key of Object.keys(this._extensionList)) {
      delete this._extensionList[key as keyof Record<ExtensionName, ExtensionModel>];
    }
  }

  /** Get all columns (includes visible and non-visible) */
  getAllColumns(): Column[] {
    return this.sharedService.allColumns || [];
  }

  /** Get only visible columns */
  getVisibleColumns(): Column[] {
    return this.sharedService.visibleColumns || [];
  }

  /**
   * Get an Extension by it's name
   *  @param name
   */
  getExtensionByName(name: ExtensionName): ExtensionModel | undefined {
    if (this._extensionList && this._extensionList[name]) {
      return this._extensionList[name];
    }
    return undefined;
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
        // eventually deprecate the "headerKey" and use only the "nameKey"
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'nameKey', 'name');
      }

      // Auto Tooltip Plugin
      if (this.sharedService.gridOptions.enableAutoTooltip) {
        if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
          const instance = this.autoTooltipExtension.register();
          this._extensionList[ExtensionName.autoTooltip] = { name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: instance, instance };
        }
      }

      // Cell External Copy Manager Plugin (Excel Like)
      if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
        if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
          const instance = this.cellExternalCopyExtension.register();
          this._extensionList[ExtensionName.cellExternalCopyManager] = { name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: instance, instance };
        }
      }

      // (Action) Cell Menu Plugin
      if (this.sharedService.gridOptions.enableCellMenu) {
        if (this.cellMenuExtension && this.cellMenuExtension.register) {
          const instance = this.cellMenuExtension.register();
          this._extensionList[ExtensionName.cellMenu] = { name: ExtensionName.cellMenu, class: this.cellMenuExtension, addon: instance, instance };
        }
      }

      // Row Selection Plugin
      // this extension should be registered BEFORE the CheckboxSelector, RowDetail or RowMoveManager since it can be use by these 2 plugins
      if (!this.getExtensionByName(ExtensionName.rowSelection) && (this.sharedService.gridOptions.enableRowSelection || this.sharedService.gridOptions.enableCheckboxSelector || this.sharedService.gridOptions.enableRowDetailView || this.sharedService.gridOptions.enableRowMoveManager)) {
        if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
          const instance = this.rowSelectionExtension.register();
          this._extensionList[ExtensionName.rowSelection] = { name: ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: instance, instance };
        }
      }

      // Checkbox Selector Plugin
      if (this.sharedService.gridOptions.enableCheckboxSelector) {
        if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
          const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
          this.checkboxSelectorExtension.register(rowSelectionExtension);
          const createdExtension = this.getCreatedExtensionByName(ExtensionName.checkboxSelector); // get the instance from when it was really created earlier
          const instance = createdExtension && createdExtension.instance;
          this._extensionList[ExtensionName.checkboxSelector] = { name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: instance, instance };
        }
      }

      // Column Picker Control
      if (this.sharedService.gridOptions.enableColumnPicker) {
        if (this.columnPickerExtension && this.columnPickerExtension.register) {
          const instance = this.columnPickerExtension.register();
          this._extensionList[ExtensionName.columnPicker] = { name: ExtensionName.columnPicker, class: this.columnPickerExtension, addon: instance, instance };
        }
      }

      // Context Menu Control
      if (this.sharedService.gridOptions.enableContextMenu) {
        if (this.contextMenuExtension && this.contextMenuExtension.register) {
          const instance = this.contextMenuExtension.register();
          this._extensionList[ExtensionName.contextMenu] = { name: ExtensionName.contextMenu, class: this.contextMenuExtension, addon: instance, instance };
        }
      }

      // Draggable Grouping Plugin
      if (this.sharedService.gridOptions.enableDraggableGrouping) {
        if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
          const instance = this.draggableGroupingExtension.register();
          this._extensionList[ExtensionName.draggableGrouping] = { name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: instance, instance };
        }
      }

      // Grid Menu Control
      if (this.sharedService.gridOptions.enableGridMenu) {
        if (this.gridMenuExtension && this.gridMenuExtension.register) {
          const instance = this.gridMenuExtension.register();
          this._extensionList[ExtensionName.gridMenu] = { name: ExtensionName.gridMenu, class: this.gridMenuExtension, addon: instance, instance };
        }
      }

      // Grouping Plugin
      // register the group item metadata provider to add expand/collapse group handlers
      if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
        if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
          const instance = this.groupItemMetaExtension.register();
          this._extensionList[ExtensionName.groupItemMetaProvider] = { name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: instance, instance };
        }
      }

      // Header Button Plugin
      if (this.sharedService.gridOptions.enableHeaderButton) {
        if (this.headerButtonExtension && this.headerButtonExtension.register) {
          const instance = this.headerButtonExtension.register();
          this._extensionList[ExtensionName.headerButton] = { name: ExtensionName.headerButton, class: this.headerButtonExtension, addon: instance, instance };
        }
      }

      // Header Menu Plugin
      if (this.sharedService.gridOptions.enableHeaderMenu) {
        if (this.headerMenuExtension && this.headerMenuExtension.register) {
          const instance = this.headerMenuExtension.register();
          this._extensionList[ExtensionName.headerMenu] = { name: ExtensionName.headerMenu, class: this.headerMenuExtension, addon: instance, instance };
        }
      }

      // Row Detail View Plugin
      if (this.sharedService.gridOptions.enableRowDetailView) {
        if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
          const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
          this.rowDetailViewExtension.register(rowSelectionExtension);
          const createdExtension = this.getCreatedExtensionByName(ExtensionName.rowDetailView); // get the plugin from when it was really created earlier
          const instance = createdExtension && createdExtension.instance;
          this._extensionList[ExtensionName.rowDetailView] = { name: ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: instance, instance };
        }
      }

      // Row Move Manager Plugin
      if (this.sharedService.gridOptions.enableRowMoveManager && this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
        const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
        this.rowMoveManagerExtension.register(rowSelectionExtension);
        const createdExtension = this.getCreatedExtensionByName(ExtensionName.rowMoveManager); // get the instance from when it was really created earlier
        const instance = createdExtension && createdExtension.instance;
        this._extensionList[ExtensionName.rowMoveManager] = { name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: instance, instance };
      }

      // manually register other plugins
      if (this.sharedService.gridOptions.registerPlugins !== undefined) {
        const grid = this.sharedService.grid;
        const gridOptions = this.sharedService.gridOptions;

        if (Array.isArray(gridOptions.registerPlugins)) {
          gridOptions.registerPlugins.forEach((plugin: any) => {
            grid.registerPlugin(plugin);
            const instance = grid.getPluginByName(plugin && plugin.name || '');
            this._extensionList[ExtensionName.noname] = { name: ExtensionName.noname, class: null, addon: instance, instance };
          });
        } else {
          const plugin = gridOptions.registerPlugins;
          grid.registerPlugin(plugin);
          const instance = grid.getPluginByName(plugin && plugin.name || '');
          this._extensionList[ExtensionName.noname] = { name: ExtensionName.noname, class: null, addon: instance, instance };
        }
      }
    }
  }

  /**
   * Bind/Create certain plugins before the Grid creation to avoid having odd behaviors.
   * Mostly because the column definitions might change after the grid creation, so we want to make sure to add it before then
   * @param columnDefinitions
   * @param options
   */
  createExtensionsBeforeGridCreation(columnDefinitions: Column[], options: GridOption) {
    if (options.enableCheckboxSelector) {
      if (!this.getCreatedExtensionByName(ExtensionName.checkboxSelector)) {
        const checkboxInstance = this.checkboxSelectorExtension.create(columnDefinitions, options);
        this._extensionCreatedList[ExtensionName.checkboxSelector] = { name: ExtensionName.checkboxSelector, addon: checkboxInstance, instance: checkboxInstance, class: this.checkboxSelectorExtension };
      }
    }
    if (options.enableRowMoveManager) {
      if (!this.getCreatedExtensionByName(ExtensionName.rowMoveManager)) {
        const rowMoveInstance = this.rowMoveManagerExtension.create(columnDefinitions, options);
        this._extensionCreatedList[ExtensionName.rowMoveManager] = { name: ExtensionName.rowMoveManager, addon: rowMoveInstance, instance: rowMoveInstance, class: this.rowMoveManagerExtension };
      }
    }
    if (options.enableRowDetailView) {
      if (!this.getCreatedExtensionByName(ExtensionName.rowDetailView)) {
        const rowDetailInstance = this.rowDetailViewExtension.create(columnDefinitions, options);
        this._extensionCreatedList[ExtensionName.rowDetailView] = { name: ExtensionName.rowDetailView, addon: rowDetailInstance, instance: rowDetailInstance, class: this.rowDetailViewExtension };
      }
    }
    if (options.enableDraggableGrouping) {
      if (!this.getCreatedExtensionByName(ExtensionName.draggableGrouping)) {
        const draggableInstance = this.draggableGroupingExtension.create(options);
        options.enableColumnReorder = draggableInstance.getSetupColumnReorder;
        this._extensionCreatedList[ExtensionName.draggableGrouping] = { name: ExtensionName.draggableGrouping, addon: draggableInstance, instance: draggableInstance, class: draggableInstance.getSetupColumnReorder };
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

  /** Translate the Cell Menu titles, we need to loop through all column definition to re-translate them */
  translateCellMenu() {
    if (this.cellMenuExtension && this.cellMenuExtension.translateCellMenu) {
      this.cellMenuExtension.translateCellMenu();
    }
  }

  /** Translate the Column Picker and it's last 2 checkboxes */
  translateColumnPicker() {
    if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
      this.columnPickerExtension.translateColumnPicker();
    }
  }

  /** Translate the Context Menu titles, we need to loop through all column definition to re-translate them */
  translateContextMenu() {
    if (this.contextMenuExtension && this.contextMenuExtension.translateContextMenu) {
      this.contextMenuExtension.translateContextMenu();
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
    if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (locale) {
      this.translate.use(locale as string);
    }

    let columnDefinitions = newColumnDefinitions;
    if (!columnDefinitions) {
      columnDefinitions = this.sharedService.columnDefinitions;
    }

    // eventually deprecate the "headerKey" and use only the "nameKey"
    this.translateItems(columnDefinitions, 'headerKey', 'name');
    this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
    this.translateItems(columnDefinitions, 'nameKey', 'name');
    this.translateItems(this.sharedService.allColumns, 'nameKey', 'name');

    // re-render the column headers
    this.renderColumnHeaders(columnDefinitions, Array.isArray(newColumnDefinitions));
    this.gridMenuExtension.translateGridMenu();
  }

  /**
   * Render (or re-render) the column headers from column definitions.
   * calling setColumns() will trigger a grid re-render
   */
  renderColumnHeaders(newColumnDefinitions?: Column[], forceColumnDefinitionsOverwrite = false) {
    let collection = newColumnDefinitions;
    if (!collection) {
      collection = this.sharedService.columnDefinitions;
    }
    if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
      if (collection.length > this.sharedService.allColumns.length || forceColumnDefinitionsOverwrite) {
        this.sharedService.allColumns = collection;
      }
      this.sharedService.grid.setColumns(collection);
    }

    // recreate the Column Picker when enabled
    if (this.sharedService.gridOptions.enableColumnPicker) {
      this.recreateExternalAddon(this.columnPickerExtension, ExtensionName.columnPicker);
    }

    // recreate the Grid Menu when enabled
    if (this.sharedService.gridOptions.enableGridMenu) {
      this.recreateExternalAddon(this.gridMenuExtension, ExtensionName.gridMenu);
    }

    // recreate the Header Button when enabled
    if (this.sharedService.gridOptions.enableHeaderButton) {
      this.recreateExternalAddon(this.headerButtonExtension, ExtensionName.headerButton);
    }

    // recreate the Header Menu when enabled
    if (this.sharedService.gridOptions.enableHeaderMenu) {
      this.recreateExternalAddon(this.headerMenuExtension, ExtensionName.headerMenu);
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
    if (this._extensionCreatedList && this._extensionCreatedList.hasOwnProperty(name)) {
      return this._extensionCreatedList[name];
    }
    return undefined;
  }

  /**
   * Dispose of previous extension/addon instance, then re-register it and don't forget to overwrite previous instance ref
   * @param extensionName
   */
  private recreateExternalAddon(externalExtension: Extension, extensionName: ExtensionName) {
    externalExtension.dispose();
    const instance = externalExtension.register();
    const extension = this.getExtensionByName(extensionName);
    if (extension) {
      extension.addon = instance;
      extension.instance = instance;
    }
  }

  /** Translate an array of items from an input key and assign translated value to the output key */
  private translateItems(items: any[], inputKey: string, outputKey: string) {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (Array.isArray(items)) {
      for (const item of items) {
        if (item[inputKey]) {
          item[outputKey] = this.translate && this.translate.currentLang && this.translate.instant(item[inputKey]);
        }
      }
    }
  }
}
