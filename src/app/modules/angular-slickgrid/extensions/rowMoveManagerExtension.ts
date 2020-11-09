import { Injectable } from '@angular/core';
import { CellArgs, Column, Extension, ExtensionName, GridOption, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class RowMoveManagerExtension implements Extension {
  private _addon: any;
  private _eventHandler: SlickEventHandler;
  private _rowSelectionPlugin: any;

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
      this._addon = null;
    }
    if (this._rowSelectionPlugin && this._rowSelectionPlugin.destroy) {
      this._rowSelectionPlugin.destroy();
    }
  }

  /**
   * Create the plugin before the Grid creation to avoid having odd behaviors.
   * Mostly because the column definitions might change after the grid creation, so we want to make sure to add it before then
   */
  create(columnDefinitions: Column[], gridOptions: GridOption) {
    if (Array.isArray(columnDefinitions) && gridOptions) {
      this._addon = this.loadAddonWhenNotExists(columnDefinitions, gridOptions);
      const newRowMoveColumn: Column = this._addon.getColumnDefinition();
      const rowMoveColDef = Array.isArray(columnDefinitions) && columnDefinitions.find((col: Column) => col && col.behavior === 'selectAndMove');
      const finalRowMoveColumn = rowMoveColDef ? rowMoveColDef : newRowMoveColumn;

      // set some exclusion properties since we don't want this column to be part of the export neither the list of column in the pickers
      if (typeof finalRowMoveColumn === 'object') {
        finalRowMoveColumn.excludeFromExport = true;
        finalRowMoveColumn.excludeFromColumnPicker = true;
        finalRowMoveColumn.excludeFromGridMenu = true;
        finalRowMoveColumn.excludeFromQuery = true;
        finalRowMoveColumn.excludeFromHeaderMenu = true;
      }

      // only add the new column if it doesn't already exist
      if (!rowMoveColDef) {
        // column index position in the grid
        const columnPosition = gridOptions && gridOptions.rowMoveManager && gridOptions.rowMoveManager.columnIndexPosition || 0;
        if (columnPosition > 0) {
          columnDefinitions.splice(columnPosition, 0, finalRowMoveColumn);
        } else {
          columnDefinitions.unshift(finalRowMoveColumn);
        }
      }
      return this._addon;
    }
    return null;
  }

  loadAddonWhenNotExists(columnDefinitions: Column[], gridOptions: GridOption): any {
    if (Array.isArray(columnDefinitions) && gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.rowMoveManager);
      if (!this._addon) {
        this._addon = new Slick.RowMoveManager(gridOptions && gridOptions.rowMoveManager || { cancelEditOnDrag: true });
      }
      return this._addon;
    }
    return null;
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
      this._rowSelectionPlugin = rowSelectionPlugin;
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
