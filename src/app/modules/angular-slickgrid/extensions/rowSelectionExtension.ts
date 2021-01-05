import 'slickgrid/plugins/slick.rowselectionmodel';
import { Injectable } from '@angular/core';

import { Extension } from './../models/index';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class RowSelectionExtension implements Extension {
  private _addon: any;

  constructor(private sharedService: SharedService) { }

  dispose() {
    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
    this._addon = null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      this._addon = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
      this.sharedService.grid.setSelectionModel(this._addon);
      return this._addon;
    }
    return null;
  }
}
