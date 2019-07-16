import { Injectable } from '@angular/core';
import { Extension } from '../models/index';
import { SharedService } from '../services/shared.service';

@Injectable()
export class GroupItemMetaProviderExtension implements Extension {
  private _addon: any;

  constructor(private sharedService: SharedService) { }

  dispose() {
    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  /** register the group item metadata provider to add expand/collapse group handlers */
  register(): any {
    if (this.sharedService && this.sharedService.grid) {
      this._addon = this.sharedService.groupItemMetadataProvider || {};
      this.sharedService.grid.registerPlugin(this._addon);
      return this._addon;
    }
    return null;
  }
}
