import { Injectable } from '@angular/core';
import { CellArgs, Extension, ExtensionName, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class RowMoveManagerExtension implements Extension {
  private _addon: any;
  private _eventHandler: SlickEventHandler;

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

  register(rowSelectionPlugin?: any): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.rowMoveManager);

      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
        this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
        this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
      }

      this._addon = new Slick.RowMoveManager(this.sharedService.gridOptions.rowMoveManager || { cancelEditOnDrag: true });
      this.sharedService.grid.registerPlugin(this._addon);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.rowMoveManager) {
        if (this.sharedService.gridOptions.rowMoveManager.onExtensionRegistered) {
          this.sharedService.gridOptions.rowMoveManager.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onBeforeMoveRows, (e: any, args: CellArgs) => {
          if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
            this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onMoveRows, (e: any, args: CellArgs) => {
          if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
            this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
          }
        });
      }
      return this._addon;
    }
    return null;
  }
}
