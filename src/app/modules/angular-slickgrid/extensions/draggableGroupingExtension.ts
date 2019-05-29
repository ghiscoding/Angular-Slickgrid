
import { SharedService } from '../services/shared.service';
import { Extension, ExtensionName, GridOption, Grouping } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { Injectable } from '@angular/core';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class DraggableGroupingExtension implements Extension {
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

  /**
   * Attach/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   */
  create(gridOptions: GridOption) {
    // dynamically import the SlickGrid plugin (addon) with RequireJS
    this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);

    if (!this._extension && gridOptions) {
      this._extension = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
    }
    return this._extension;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      this.sharedService.grid.registerPlugin(this._extension);

      // Events
      if (this.sharedService.grid && this.sharedService.gridOptions.draggableGrouping) {
        if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
          this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._extension);
        }
        this._eventHandler.subscribe(this._extension.onGroupChanged, (e: any, args: { caller?: string; groupColumns: Grouping[] }) => {
          if (this.sharedService.gridOptions.draggableGrouping && typeof this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
            this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
          }
        });
      }

      return this._extension;
    }
    return null;
  }
}
