import { Injectable } from '@angular/core';
import { Extension, ExtensionName, HeaderButtonOnCommandArgs, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class HeaderButtonExtension implements Extension {
  private _eventHandler: SlickEventHandler;
  private _addon: any;

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
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  // Header Button Plugin
  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.headerButton);
      this._addon = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.headerButton) {
        if (this.sharedService.gridOptions.headerButton.onExtensionRegistered) {
          this.sharedService.gridOptions.headerButton.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onCommand, (e: any, args: HeaderButtonOnCommandArgs) => {
          if (this.sharedService.gridOptions.headerButton && typeof this.sharedService.gridOptions.headerButton.onCommand === 'function') {
            this.sharedService.gridOptions.headerButton.onCommand(e, args);
          }
        });
      }
      return this._addon;
    }
    return null;
  }
}
