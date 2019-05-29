import { Injectable } from '@angular/core';
import { Extension, ExtensionName, HeaderButtonOnCommandArgs } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class HeaderButtonExtension implements Extension {
  private _eventHandler: any = new Slick.EventHandler();
  private _extension: any;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) { }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  // Header Button Plugin
  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.headerButton);
      this._extension = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
      this.sharedService.grid.registerPlugin(this._extension);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.headerButton) {
        if (this.sharedService.gridOptions.headerButton.onExtensionRegistered) {
          this.sharedService.gridOptions.headerButton.onExtensionRegistered(this._extension);
        }
        this._eventHandler.subscribe(this._extension.onCommand, (e: any, args: HeaderButtonOnCommandArgs) => {
          if (this.sharedService.gridOptions.headerButton && typeof this.sharedService.gridOptions.headerButton.onCommand === 'function') {
            this.sharedService.gridOptions.headerButton.onCommand(e, args);
          }
        });
      }
      return this._extension;
    }
    return null;
  }
}
