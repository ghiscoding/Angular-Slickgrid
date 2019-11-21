import { Injectable } from '@angular/core';
import { CellArgs, Extension, ExtensionName, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class ColumnPickerExtension implements Extension {
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

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);

      // localization support for the picker
      const columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
      const forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
      const syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');

      this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
      this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
      this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
      this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
      this._addon = new Slick.Controls.ColumnPicker(this.sharedService.allColumns, this.sharedService.grid, this.sharedService.gridOptions);

      if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
        if (this.sharedService.gridOptions.columnPicker.onExtensionRegistered) {
          this.sharedService.gridOptions.columnPicker.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onColumnsChanged, (e: any, args: { columns: any, grid: any }) => {
          if (this.sharedService.gridOptions.columnPicker && typeof this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
            this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
          }
          if (args && Array.isArray(args.columns) && args.columns.length > this.sharedService.visibleColumns.length) {
            this.sharedService.visibleColumns = args.columns;
          }
        });
      }
      return this._addon;
    }
    return null;
  }

  /** Translate the Column Picker headers and also the last 2 checkboxes */
  translateColumnPicker() {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // update the properties by pointers, that is the only way to get Column Picker Control to see the new values
      if (this.sharedService.gridOptions.columnPicker) {
        this.emptyColumnPickerTitles();
        this.sharedService.gridOptions.columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
        this.sharedService.gridOptions.columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
        this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
      }

      // translate all columns (including hidden columns)
      this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');

      // update the Titles of each sections (command, customTitle, ...)
      if (this._addon && this._addon.updateAllTitles) {
        this._addon.updateAllTitles(this.sharedService.gridOptions.columnPicker);
      }
    }
  }

  private emptyColumnPickerTitles() {
    if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
      this.sharedService.gridOptions.columnPicker.columnTitle = '';
      this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
      this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
    }
  }
}
