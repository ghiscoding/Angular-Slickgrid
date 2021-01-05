import 'slickgrid/plugins/slick.headerbuttons';
import { Injectable } from '@angular/core';

import { Extension, HeaderButton, HeaderButtonOnCommandArgs, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class HeaderButtonExtension implements Extension {
  private _eventHandler: SlickEventHandler;
  private _addon: any;
  private _headerButtonOptions: HeaderButton | null;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) {
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
    this.extensionUtility.nullifyFunctionNameStartingWithOn(this._headerButtonOptions);
    this._addon = null;
    this._headerButtonOptions = null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  // Header Button Plugin
  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      this._headerButtonOptions = this.sharedService.gridOptions.headerButton || {};
      this._addon = new Slick.Plugins.HeaderButtons(this._headerButtonOptions);
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this._headerButtonOptions) {
        if (this._headerButtonOptions.onExtensionRegistered) {
          this._headerButtonOptions.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onCommand, (e: any, args: HeaderButtonOnCommandArgs) => {
          if (this._headerButtonOptions && typeof this._headerButtonOptions.onCommand === 'function') {
            this._headerButtonOptions.onCommand(e, args);
          }
        });
      }
      return this._addon;
    }
    return null;
  }
}
