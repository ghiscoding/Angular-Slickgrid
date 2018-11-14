import { Injectable } from '@angular/core';
import { Extension } from '../models/index';
import { SharedService } from '../services/shared.service';

@Injectable()
export class GroupItemMetaProviderExtension implements Extension {
  private _extension: any;

  constructor(private sharedService: SharedService) { }

  dispose() {
    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  /** register the group item metadata provider to add expand/collapse group handlers */
  register(): any {
    if (this.sharedService && this.sharedService.grid) {
      this._extension = this.sharedService.groupItemMetadataProvider || {};
      this.sharedService.grid.registerPlugin(this._extension);
      return this._extension;
    }
    return null;
  }
}
