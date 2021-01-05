import 'slickgrid/plugins/slick.cellmenu';
import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  CellMenu,
  Column,
  Extension,
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
  private _cellMenuOptions: CellMenu | null;
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
    this.extensionUtility.nullifyFunctionNameStartingWithOn(this._cellMenuOptions);
    this._addon = null;
    this._cellMenuOptions = null;
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

      this._cellMenuOptions = { ...this.getDefaultCellMenuOptions(), ...this.sharedService.gridOptions.cellMenu };
      this.sharedService.gridOptions.cellMenu = this._cellMenuOptions;

      // translate the item keys when necessary
      if (this.sharedService.gridOptions.enableTranslate) {
        this.translateCellMenu();
      }

      // sort all menu items by their position order when defined
      this.sortMenuItems(this.sharedService.allColumns);

      this._addon = new Slick.Plugins.CellMenu(this._cellMenuOptions);
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this._cellMenuOptions) {
        if (this._cellMenuOptions.onExtensionRegistered) {
          this._cellMenuOptions.onExtensionRegistered(this._addon);
        }
        if (this._cellMenuOptions && typeof this._cellMenuOptions.onCommand === 'function') {
          this._eventHandler.subscribe(this._addon.onCommand, (event: Event, args: MenuCommandItemCallbackArgs) => {
            this._cellMenuOptions.onCommand(event, args);
          });
        }
        if (this._cellMenuOptions && typeof this._cellMenuOptions.onOptionSelected === 'function') {
          this._eventHandler.subscribe(this._addon.onOptionSelected, (event: Event, args: MenuOptionItemCallbackArgs) => {
            this._cellMenuOptions.onOptionSelected(event, args);
          });
        }
        if (this._cellMenuOptions && typeof this._cellMenuOptions.onAfterMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onAfterMenuShow, (event: Event, args: { cell: number; row: number; grid: any; }) => {
            this._cellMenuOptions.onAfterMenuShow(event, args);
          });
        }
        if (this._cellMenuOptions && typeof this._cellMenuOptions.onBeforeMenuShow === 'function') {
          this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (event: Event, args: { cell: number; row: number; grid: any; }) => {
            this._cellMenuOptions.onBeforeMenuShow(event, args);
          });
        }
        if (this._cellMenuOptions && typeof this._cellMenuOptions.onBeforeMenuClose === 'function') {
          this._eventHandler.subscribe(this._addon.onBeforeMenuClose, (event: Event, args: { cell: number; row: number; grid: any; menu: any; }) => {
            this._cellMenuOptions.onBeforeMenuClose(event, args);
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
