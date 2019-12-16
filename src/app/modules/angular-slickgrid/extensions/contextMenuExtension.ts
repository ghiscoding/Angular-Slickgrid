import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  Column,
  ContextMenu,
  DelimiterType,
  Extension,
  ExtensionName,
  FileType,
  Locale,
  MenuCallbackArgs,
  MenuCommandItem,
  MenuCommandItemCallbackArgs,
  MenuOptionItemCallbackArgs,
  SlickEventHandler,
} from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
import { ExportService } from '../services/export.service';
import { ExcelExportService } from '../services/excelExport.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class ContextMenuExtension implements Extension {
  private _addon: any;
  private _eventHandler: SlickEventHandler;
  private _locales: Locale;
  private _userOriginalContextMenu: ContextMenu;

  constructor(
    private excelExportService: ExcelExportService,
    private exportService: ExportService,
    private extensionUtility: ExtensionUtility,
    private sharedService: SharedService,
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
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.contextMenu && this.sharedService.gridOptions.contextMenu.commandItems) {
      this.sharedService.gridOptions.contextMenu = this._userOriginalContextMenu;
    }
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  /**
   * Create the Action Cell Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
   * @param grid
   * @param dataView
   * @param columnDefinitions
   */
  register(): any {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Aurelia-Slickgrid] requires "I18N" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions && this.sharedService.gridOptions.contextMenu) {
      // keep original user context menu, useful when switching locale to translate
      this._userOriginalContextMenu = { ...this.sharedService.gridOptions.contextMenu };

      // get locales provided by user in main file or else use default English locales via the Constants
      this._locales = this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.contextMenu);
      this.sharedService.gridOptions.contextMenu = { ...this.sharedService.gridOptions.contextMenu };

      // sort all menu items by their position order when defined
      const originalCommandItems = this._userOriginalContextMenu && Array.isArray(this._userOriginalContextMenu.commandItems) ? this._userOriginalContextMenu.commandItems : [];
      this.sharedService.gridOptions.contextMenu.commandItems = [...originalCommandItems, ...this.addMenuCustomCommands(originalCommandItems)];
      this.extensionUtility.sortItems(this.sharedService.gridOptions.contextMenu.commandItems, 'positionOrder');
      this.extensionUtility.sortItems(this.sharedService.gridOptions.contextMenu.optionItems, 'positionOrder');

      this._addon = new Slick.Plugins.ContextMenu(this.sharedService.gridOptions.contextMenu);
      this.sharedService.grid.registerPlugin(this._addon);

      // translate the item keys when necessary
      if (this.sharedService.gridOptions.enableTranslate) {
        this.translateContextMenu();
      }

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.contextMenu) {
        if (this.sharedService.gridOptions.contextMenu.onExtensionRegistered) {
          this.sharedService.gridOptions.contextMenu.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onCommand, (event: Event, args: MenuCommandItemCallbackArgs) => {
          if (this.sharedService.gridOptions.contextMenu && typeof this.sharedService.gridOptions.contextMenu.onCommand === 'function') {
            this.sharedService.gridOptions.contextMenu.onCommand(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onOptionSelected, (event: Event, args: MenuOptionItemCallbackArgs) => {
          if (this.sharedService.gridOptions.contextMenu && typeof this.sharedService.gridOptions.contextMenu.onOptionSelected === 'function') {
            this.sharedService.gridOptions.contextMenu.onOptionSelected(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (event: Event, args: { cell: number; row: number; grid: any; }) => {
          if (this.sharedService.gridOptions.contextMenu && typeof this.sharedService.gridOptions.contextMenu.onBeforeMenuShow === 'function') {
            this.sharedService.gridOptions.contextMenu.onBeforeMenuShow(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onBeforeMenuClose, (event: Event, args: { cell: number; row: number; grid: any; menu: any; }) => {
          if (this.sharedService.gridOptions.contextMenu && typeof this.sharedService.gridOptions.contextMenu.onBeforeMenuClose === 'function') {
            this.sharedService.gridOptions.contextMenu.onBeforeMenuClose(event, args);
          }
        });
      }
      return this._addon;
    }
    return null;
  }

  /** Translate the Cell Menu titles, we need to loop through all column definition to re-translate them */
  translateContextMenu() {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.contextMenu) {
      const contextMenu = this.sharedService.gridOptions.contextMenu;
      const menuOptions: Partial<ContextMenu> = {};

      if (contextMenu.commandTitleKey) {
        menuOptions.commandTitle = this.translate && this.translate.instant && this.translate.instant(contextMenu.commandTitleKey) || this._locales && this._locales.TEXT_COMMANDS || contextMenu.commandTitle;
      }
      if (contextMenu.optionTitleKey) {
        menuOptions.optionTitle = this.translate && this.translate.instant && this.translate.instant(contextMenu.optionTitleKey) || contextMenu.optionTitle;
      }
      const originalCommandItems = this._userOriginalContextMenu && Array.isArray(this._userOriginalContextMenu.commandItems) ? this._userOriginalContextMenu.commandItems : [];
      contextMenu.commandItems = [...originalCommandItems, ...this.addMenuCustomCommands(originalCommandItems)];
      menuOptions.commandItems = contextMenu.commandItems; // copy it also to the menuOptions else they won't be translated when locale changes

      // translate all command/options and resort them afterward
      this.extensionUtility.translateItems(contextMenu.commandItems, 'titleKey', 'title');
      this.extensionUtility.translateItems(contextMenu.optionItems, 'titleKey', 'title');
      this.extensionUtility.sortItems(this.sharedService.gridOptions.contextMenu.commandItems, 'positionOrder');
      this.extensionUtility.sortItems(this.sharedService.gridOptions.contextMenu.optionItems, 'positionOrder');

      // update the title options so that it has latest translated values
      if (this._addon && this._addon.setOptions) {
        this._addon.setOptions(menuOptions);
      }
    }
  }

  // --
  // private functions
  // ------------------

  /** Create Context Menu with Custom Commands (copy cell value, export) */
  private addMenuCustomCommands(originalCustomItems: Array<MenuCommandItem | 'divider'>) {
    const menuCustomItems: Array<MenuCommandItem | 'divider'> = [];
    const gridOptions = this.sharedService && this.sharedService.gridOptions || {};
    const contextMenu = gridOptions && gridOptions.contextMenu;
    const dataView = this.sharedService && this.sharedService.dataView;

    // show context menu: Copy (cell value)
    if (contextMenu && !contextMenu.hideCopyCellValueCommand) {
      const commandName = 'copy';
      if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        menuCustomItems.push(
          {
            iconCssClass: contextMenu.iconCopyCellValueCommand || 'fa fa-clone',
            title: this.extensionUtility.translateWhenEnabledAndServiceExist('COPY', 'TEXT_COPY'),
            disabled: false,
            command: commandName,
            positionOrder: 50,
            action: (e, args) => {
              if (args && args.hasOwnProperty('cell') && args.hasOwnProperty('row')) {
                this.sharedService.grid.setActiveCell(args.row, args.cell, false); // select the cell that the click originated
                this.copyToClipboard(args);
              }
            },
            itemUsabilityOverride: (args: MenuCallbackArgs) => {
              // make sure there's an item to copy before enabling this command
              const columnDef = args && args.column as Column;
              const dataContext = args && args.dataContext;
              if (columnDef && dataContext.hasOwnProperty(columnDef.field)) {
                return dataContext[columnDef.field] !== null && dataContext[columnDef.field] !== undefined;
              }
              return false;
            }
          }
        );
      }
    }

    // show context menu: Export to file
    if (gridOptions && gridOptions.enableExport && contextMenu && !contextMenu.hideExportCsvCommand) {
      const commandName = 'export-csv';
      if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        menuCustomItems.push(
          {
            iconCssClass: contextMenu.iconExportCsvCommand || 'fa fa-download',
            title: this.extensionUtility.translateWhenEnabledAndServiceExist('EXPORT_TO_CSV', 'TEXT_EXPORT_IN_CSV_FORMAT'),
            disabled: false,
            command: commandName,
            positionOrder: 51,
            action: (e, args) => this.exportService.exportToFile({
              delimiter: DelimiterType.comma,
              filename: 'export',
              format: FileType.csv,
              useUtf8WithBom: true,
            }),
          }
        );
      }
    }

    // show context menu: Export to Excel
    if (gridOptions && gridOptions.enableExcelExport && contextMenu && !contextMenu.hideExportExcelCommand) {
      const commandName = 'export-excel';
      if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        menuCustomItems.push(
          {
            iconCssClass: contextMenu.iconExportExcelCommand || 'fa fa-file-excel-o text-success',
            title: this.extensionUtility.translateWhenEnabledAndServiceExist('EXPORT_TO_EXCEL', 'TEXT_EXPORT_TO_EXCEL'),
            disabled: false,
            command: commandName,
            positionOrder: 52,
            action: (e, args) => this.excelExportService.exportToExcel({
              filename: 'export',
              format: FileType.xlsx,
            }),
          }
        );
      }
    }

    // show context menu: export to text file as tab delimited
    if (gridOptions && gridOptions.enableExport && contextMenu && !contextMenu.hideExportTextDelimitedCommand) {
      const commandName = 'export-text-delimited';
      if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
        menuCustomItems.push(
          {
            iconCssClass: contextMenu.iconExportTextDelimitedCommand || 'fa fa-download',
            title: this.extensionUtility.translateWhenEnabledAndServiceExist('EXPORT_TO_TAB_DELIMITED', 'TEXT_EXPORT_IN_TEXT_FORMAT'),
            disabled: false,
            command: commandName,
            positionOrder: 53,
            action: (e, args) => this.exportService.exportToFile({
              delimiter: DelimiterType.tab,
              filename: 'export',
              format: FileType.txt,
              useUtf8WithBom: true,
            }),
          }
        );
      }
    }

    // -- Grouping Commands
    if (gridOptions && (gridOptions.enableGrouping || gridOptions.enableDraggableGrouping)) {
      // add a divider (separator) between the top sort commands and the other clear commands
      menuCustomItems.push({ divider: true, command: '', positionOrder: 54 });

      // show context menu: Clear Grouping
      if (gridOptions && contextMenu && !contextMenu.hideClearGrouping) {
        const commandName = 'clear-grouping';
        if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          menuCustomItems.push(
            {
              iconCssClass: contextMenu.iconClearGroupingCommand || 'fa fa-times',
              title: this.extensionUtility.translateWhenEnabledAndServiceExist('CLEAR_GROUPING', 'TEXT_CLEAR_ALL_GROUPING'),
              disabled: false,
              command: commandName,
              positionOrder: 55,
              action: (e, args) => dataView.setGrouping([]),
              itemUsabilityOverride: () => {
                // only enable the command when there's an actually grouping in play
                const groupingArray = dataView && dataView.getGrouping && dataView.getGrouping();
                return Array.isArray(groupingArray) && groupingArray.length > 0;
              }
            }
          );
        }
      }

      // show context menu: Collapse all Groups
      if (gridOptions && contextMenu && !contextMenu.hideCollapseAllGroups) {
        const commandName = 'collapse-all-groups';
        if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          menuCustomItems.push(
            {
              iconCssClass: contextMenu.iconCollapseAllGroupsCommand || 'fa fa-compress',
              title: this.extensionUtility.translateWhenEnabledAndServiceExist('COLLAPSE_ALL_GROUPS', 'TEXT_COLLAPSE_ALL_GROUPS'),
              disabled: false,
              command: commandName,
              positionOrder: 56,
              action: (e, args) => dataView.collapseAllGroups(),
              itemUsabilityOverride: () => {
                // only enable the command when there's an actually grouping in play
                const groupingArray = dataView && dataView.getGrouping && dataView.getGrouping();
                return Array.isArray(groupingArray) && groupingArray.length > 0;
              }
            }
          );
        }
      }

      // show context menu: Expand all Groups
      if (gridOptions && contextMenu && !contextMenu.hideExpandAllGroups) {
        const commandName = 'expand-all-groups';
        if (!originalCustomItems.find((item: MenuCommandItem) => item.hasOwnProperty('command') && item.command === commandName)) {
          menuCustomItems.push(
            {
              iconCssClass: contextMenu.iconExpandAllGroupsCommand || 'fa fa-expand',
              title: this.extensionUtility.translateWhenEnabledAndServiceExist('EXPAND_ALL_GROUPS', 'TEXT_EXPAND_ALL_GROUPS'),
              disabled: false,
              command: commandName,
              positionOrder: 57,
              action: (e, args) => dataView.expandAllGroups(),
              itemUsabilityOverride: () => {
                // only enable the command when there's an actually grouping in play
                const groupingArray = dataView && dataView.getGrouping && dataView.getGrouping();
                return Array.isArray(groupingArray) && groupingArray.length > 0;
              }
            }
          );
        }
      }
    }

    // add the "Commands" title if there are any commands
    if (this.sharedService && this.sharedService.gridOptions && contextMenu && (Array.isArray(menuCustomItems) && menuCustomItems.length > 0 || (Array.isArray(contextMenu.commandItems) && contextMenu.commandItems.length > 0))) {
      let commandTitle = contextMenu.commandTitle || '';
      if (contextMenu.commandTitleKey) {
        commandTitle = this.extensionUtility.translateWhenEnabledAndServiceExist(contextMenu.commandTitleKey, 'TEXT_COMMANDS') || contextMenu.commandTitle;
      } else if (!commandTitle) {
        commandTitle = this._locales && this._locales.TEXT_COMMANDS;
      }
      contextMenu.commandTitle = commandTitle;
    }

    return menuCustomItems;
  }

  /**
   * First get the value, if "exportWithFormatter" is set then we'll use the formatter output
   * Then we create the DOM trick to copy a text value by creating a fake <div> that is not shown to the user
   * and from there we can call the execCommand 'copy' command and expect the value to be in clipboard
   * @param args
   */
  private copyToClipboard(args: MenuCommandItemCallbackArgs) {
    try {
      if (args && args.grid && args.command) {
        // get the value, if "exportWithFormatter" is set then we'll use the formatter output
        const columnDef = (args && args.column || {}) as Column;
        const dataContext = args && args.dataContext;
        const gridOptions = this.sharedService && this.sharedService.gridOptions || {};
        const exportWithFormatter = gridOptions.exportOptions.exportWithFormatter || gridOptions.excelExportOptions.exportWithFormatter;
        const isEvaluatingFormatter = exportWithFormatter || columnDef.exportWithFormatter;
        let textToCopy = args.value;

        if (isEvaluatingFormatter && dataContext.hasOwnProperty(columnDef.field) && (columnDef.formatter || columnDef.exportCustomFormatter)) {
          if (typeof columnDef.exportCustomFormatter === 'function') {
            const formattedData = columnDef.exportCustomFormatter(args.row, args.cell, dataContext[columnDef.field], columnDef, dataContext, args.grid);
            textToCopy = formattedData as string;
            if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
              textToCopy = formattedData.text;
            }
          } else {
            const formattedData = columnDef.formatter(args.row, args.cell, dataContext[columnDef.field], columnDef, dataContext, args.grid);
            textToCopy = formattedData as string;
            if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
              textToCopy = formattedData.text;
            }
          }
          if (textToCopy === null || textToCopy === undefined) {
            textToCopy = '';
          }
        }

        // create fake <div> to copy into clipboard & delete it from the DOM once we're done
        const range = document.createRange();
        const tmpElem = $('<div>')
          .css({ position: 'absolute', left: '-1000px', top: '-1000px' })
          .text(textToCopy);
        $('body').append(tmpElem);
        range.selectNodeContents(tmpElem.get(0));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        const success = document.execCommand('copy', false, null);
        if (success) {
          tmpElem.remove();
        }
      }
    } catch (e) { }
  }
}
