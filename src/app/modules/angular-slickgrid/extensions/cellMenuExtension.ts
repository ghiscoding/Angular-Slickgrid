import { Constants } from '../constants';
import {
  CellMenu,
  Column,
  Extension,
  ExtensionName,
  MenuCommandItem,
  MenuItemCallbackArgs,
  MenuOptionItem,
  Locale,
  SlickEventHandler,
} from '../models/index';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class CellMenuExtension implements Extension {
  private _addon: any;
  private _eventHandler: SlickEventHandler;
  private _locales: Locale;

  constructor(
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
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // get locales provided by user in main file or else use default English locales via the Constants
      this._locales = this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.cellMenu);

      this.sharedService.gridOptions.cellMenu = { ...this.getDefaultCellMenuOptions(), ...this.sharedService.gridOptions.cellMenu };
      // if (this.sharedService.gridOptions.enableCellMenu) {
      //   this.sharedService.gridOptions.cellMenu = this.addcellMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
      // }

      // translate the item keys when necessary
      if (this.sharedService.gridOptions.enableTranslate) {
        this.translateCellMenu();
      }

      this._addon = new Slick.Plugins.CellMenu(this.sharedService.gridOptions.cellMenu);
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.cellMenu) {
        if (this.sharedService.gridOptions.cellMenu.onExtensionRegistered) {
          this.sharedService.gridOptions.cellMenu.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onCommand, (event: Event, args: MenuItemCallbackArgs<MenuCommandItem>) => {
          if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onCommand === 'function') {
            this.sharedService.gridOptions.cellMenu.onCommand(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onOptionSelected, (event: Event, args: MenuItemCallbackArgs<MenuOptionItem>) => {
          if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onOptionSelected === 'function') {
            this.sharedService.gridOptions.cellMenu.onOptionSelected(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (event: Event, args: { cell: number; row: number; grid: any; }) => {
          if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onBeforeMenuShow === 'function') {
            this.sharedService.gridOptions.cellMenu.onBeforeMenuShow(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onBeforeMenuClose, (event: Event, args: { cell: number; row: number; grid: any; menu: any; }) => {
          if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onBeforeMenuClose === 'function') {
            this.sharedService.gridOptions.cellMenu.onBeforeMenuClose(event, args);
          }
        });
      }
      return this._addon;
    }
    return null;
  }

  /** Translate the Cell Menu titles, we need to loop through all column definition to re-translate them */
  translateCellMenu() {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.cellMenu) {
      this.resetMenuTranslations(this.sharedService.visibleColumns);
    }
  }

  /**
   * @return default Action Cell Menu options
   */
  private getDefaultCellMenuOptions(): CellMenu {
    return {
      minWidth: 140,
    };
  }

  /**
   * Reset all the internal Menu options which have text to translate
   * @param grid menu object
   */
  private resetMenuTranslations(columnDefinitions: Column[]) {
    columnDefinitions.forEach((columnDef: Column) => {
      if (columnDef && columnDef.cellMenu && columnDef.cellMenu.commandItems) {
        const columnCellMenuCommandItems: Array<MenuCommandItem> | Array<'divider'> = columnDef.cellMenu.commandItems || [];
        const columnCellMenuOptionItems: Array<MenuOptionItem> | Array<'divider'> = columnDef.cellMenu.optionItems || [];
        if (columnDef.cellMenu.commandTitleKey) {
          columnDef.cellMenu.commandTitle = this.translate && this.translate.instant && this.translate.instant(columnDef.cellMenu.commandTitleKey) || this._locales && this._locales.TEXT_COMMANDS || columnDef.cellMenu.commandTitle;
        }
        if (columnDef.cellMenu.optionTitleKey) {
          columnDef.cellMenu.optionTitle = this.translate && this.translate.instant && this.translate.instant(columnDef.cellMenu.optionTitleKey) || columnDef.cellMenu.optionTitle;
        }

        columnCellMenuCommandItems.forEach((item) => {
          switch (item.command) {
            case 'export-csv':
              item.title = this.translate.instant('EXPORT_TO_CSV') || this._locales && this._locales.TEXT_EXPORT_IN_CSV_FORMAT;
              break;
            case 'export-excel':
              item.title = this.translate.instant('EXPORT_TO_EXCEL') || this._locales && this._locales.TEXT_EXPORT_TO_EXCEL;
              break;
            case 'export-text-delimited':
              item.title = this.translate.instant('EXPORT_TO_TAB_DELIMITED') || this._locales && this._locales.TEXT_EXPORT_IN_TEXT_FORMAT;
              break;
            default:
              if (item && item.titleKey) {
                item.title = this.translate && this.translate.instant && this.translate.instant(item.titleKey || ' ');
              }
              break;
          }

          // re-translate if there's a "titleKey"
          if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate) {
            this.extensionUtility.translateItems(columnCellMenuCommandItems, 'titleKey', 'title');
          }
        });

        columnCellMenuOptionItems.forEach(item => {
          if (item && item.titleKey) {
            item.title = this.translate && this.translate.instant && this.translate.instant(item.titleKey || ' ');
          }
        });
      }
    });
  }
}
