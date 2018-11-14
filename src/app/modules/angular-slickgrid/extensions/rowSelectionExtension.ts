import { Injectable } from '@angular/core';
import { Extension, ExtensionName } from './../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class RowSelectionExtension implements Extension {
  private _extension: any;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) { }

  dispose() {
    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin with requireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);

      this._extension = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
      this.sharedService.grid.setSelectionModel(this._extension);
      return this._extension;
    }
    return null;
  }
}
