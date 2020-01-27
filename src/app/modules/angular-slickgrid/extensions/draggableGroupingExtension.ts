
import { SharedService } from '../services/shared.service';
import { Extension, ExtensionName, GridOption, Grouping, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { Injectable } from '@angular/core';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class DraggableGroupingExtension implements Extension {
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

  /**
   * Bind/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   */
  create(gridOptions: GridOption) {
    if (gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);

      if (!this._addon) {
        this._addon = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
      }
      return this._addon;
    }
    return null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      const grid = this.sharedService.grid;
      grid.registerPlugin(this._addon);

      if (grid && this.sharedService.gridOptions.draggableGrouping) {
        // Expose some of the Events
        if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
          this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onGroupChanged, (e: any, args: { caller?: string; groupColumns: Grouping[] }) => {
          if (this.sharedService.gridOptions.draggableGrouping && typeof this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
            this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
          }
        });

        // if a column was added dynamically, we need to re-initialize the draggable grouping after the render
        this._eventHandler.subscribe(grid.onRendered, () => {
          if (this._addon && this.sharedService.dataView.getGroups && this.sharedService.dataView.getGroups().length === 0) {
            this._addon.init(grid);
          }
        });
      }

      return this._addon;
    }
    return null;
  }
}
