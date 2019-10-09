import { Injectable } from '@angular/core';
import { Extension, ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class AutoTooltipExtension implements Extension {
  private _addon: any;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) { }

  dispose() {
    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.autoTooltip);
      this._addon = new Slick.AutoTooltips(this.sharedService.gridOptions.autoTooltipOptions || {});
      this.sharedService.grid.registerPlugin(this._addon);
      return this._addon;
    }
    return null;
  }
}
