import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  CellMenu,
  Column,
  Extension,
  ExtensionName,
  MenuCommandItem,
  MenuCommandItemCallbackArgs,
  MenuOptionItemCallbackArgs,
  MenuOptionItem,
  Locale,
  SlickEventHandler,
} from '../models/index';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';

// using external non-typed js libraries
declare const Slick: any;

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
      this._addon = null;
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

      // translate the item keys when necessary
      if (this.sharedService.gridOptions.enableTranslate) {
        this.translateCellMenu();
      }

      // sort all menu items by their position order when defined
      this.sortMenuItems(this.sharedService.allColumns);

      this._addon = new Slick.Plugins.CellMenu(this.sharedService.gridOptions.cellMenu);
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.cellMenu) {
        if (this.sharedService.gridOptions.cellMenu.onExtensionRegistered) {
          this.sharedService.gridOptions.cellMenu.onExtensionRegistered(this._addon);
        }
        if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onCommand === 'function') {
          this._eventHandler.subscribe(this._addon.onCommand, (event: Event, args: MenuCommandItemCallbackArgs) => {
            this.sharedService.gridOptions.cellMenu.onCommand(event, args);
          });
        }
        if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onOptionSelected === 'function') {
          this._eventHandler.subscribe(this._addon.onOptionSelected, (event: Event, args: MenuOptionItemCallbackArgs) => {
            this.sharedService.gridOptions.cellMenu.onOptionSelected(event, args);
          });
        }
        if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onAfterMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onAfterMenuShow, (event: Event, args: { cell: number; row: number; grid: any; }) => {
            this.sharedService.gridOptions.cellMenu.onAfterMenuShow(event, args);
          });
        }
        if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onBeforeMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (event: Event, args: { cell: number; row: number; grid: any; }) => {
            this.sharedService.gridOptions.cellMenu.onBeforeMenuShow(event, args);
          });
        }
        if (this.sharedService.gridOptions.cellMenu && typeof this.sharedService.gridOptions.cellMenu.onBeforeMenuClose === 'function') {
          this._eventHandler.subscribe(this._addon.onBeforeMenuClose, (event: Event, args: { cell: number; row: number; grid: any; menu: any; }) => {
            this.sharedService.gridOptions.cellMenu.onBeforeMenuClose(event, args);
          });
        }
      }
      return this._addon;
    }
    return null;
  }

  /** Translate the Cell Menu titles, we need to loop through all column definition to re-translate them */
  translateCellMenu() {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.cellMenu) {
      this.resetMenuTranslations(this.sharedService.allColumns);
    }
  }

  /**
   * @return default Action Cell Menu options
   */
  private getDefaultCellMenuOptions(): CellMenu {
    return {
      width: 180,
    };
  }

  /**
   * Reset all the internal Menu options which have text to translate
   * @param grid menu object
   */
  private resetMenuTranslations(columnDefinitions: Column[]) {
    const gridOptions = this.sharedService && this.sharedService.gridOptions;

    if (gridOptions && gridOptions.enableTranslate) {
      columnDefinitions.forEach((columnDef: Column) => {
        if (columnDef && columnDef.cellMenu && (Array.isArray(columnDef.cellMenu.commandItems) || Array.isArray(columnDef.cellMenu.optionItems))) {
          // get both items list
          const columnCellMenuCommandItems: Array<MenuCommandItem | 'divider'> = columnDef.cellMenu.commandItems || [];
          const columnCellMenuOptionItems: Array<MenuOptionItem | 'divider'> = columnDef.cellMenu.optionItems || [];

          // translate their titles only if they have a titleKey defined
          if (columnDef.cellMenu.commandTitleKey) {
            columnDef.cellMenu.commandTitle = this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(columnDef.cellMenu.commandTitleKey) || this._locales && this._locales.TEXT_COMMANDS || columnDef.cellMenu.commandTitle;
          }
          if (columnDef.cellMenu.optionTitleKey) {
            columnDef.cellMenu.optionTitle = this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(columnDef.cellMenu.optionTitleKey) || columnDef.cellMenu.optionTitle;
          }

          // translate both command/option items (whichever is provided)
          this.extensionUtility.translateItems(columnCellMenuCommandItems, 'titleKey', 'title');
          this.extensionUtility.translateItems(columnCellMenuOptionItems, 'titleKey', 'title');
        }
      });
    }
  }

  sortMenuItems(columnDefinitions: Column[]) {
    columnDefinitions.forEach((columnDef: Column) => {
      if (columnDef && columnDef.cellMenu && columnDef.cellMenu.commandItems) {
        // get both items list
        const columnCellMenuCommandItems: Array<MenuCommandItem | 'divider'> = columnDef.cellMenu.commandItems || [];
        const columnCellMenuOptionItems: Array<MenuOptionItem | 'divider'> = columnDef.cellMenu.optionItems || [];

        this.extensionUtility.sortItems(columnCellMenuCommandItems, 'positionOrder');
        this.extensionUtility.sortItems(columnCellMenuOptionItems, 'positionOrder');
      }
    });
  }
}
