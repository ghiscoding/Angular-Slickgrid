import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  ContextMenu,
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

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class ContextMenuExtension implements Extension {
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
      throw new Error('[Aurelia-Slickgrid] requires "I18N" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // get locales provided by user in main file or else use default English locales via the Constants
      this._locales = this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.contextMenu);
      this.sharedService.gridOptions.contextMenu = { ...this.getDefaultContextMenuOptions(), ...this.sharedService.gridOptions.contextMenu };

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
        this._eventHandler.subscribe(this._addon.onCommand, (event: Event, args: MenuItemCallbackArgs<MenuCommandItem>) => {
          if (this.sharedService.gridOptions.contextMenu && typeof this.sharedService.gridOptions.contextMenu.onCommand === 'function') {
            this.sharedService.gridOptions.contextMenu.onCommand(event, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onOptionSelected, (event: Event, args: MenuItemCallbackArgs<MenuOptionItem>) => {
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
      this.extensionUtility.translateItems(contextMenu.commandItems, 'titleKey', 'title');
      this.extensionUtility.translateItems(contextMenu.optionItems, 'titleKey', 'title');

      // update the title options so that it has latest translated values
      if (this._addon && this._addon.setOptions) {
        this._addon.setOptions(menuOptions);
      }
    }
  }

  /**
   * @return default Action Cell Menu options
   */
  private getDefaultContextMenuOptions(): ContextMenu {
    return {
      width: 180,
      hideCloseButton: false,
      hideCopyCellValueCommand: false,
      hideCommandSection: false,
      hideOptionSection: false,
    };
  }
}
