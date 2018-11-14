import { Injectable } from '@angular/core';
import { CellArgs, Extension, ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class ColumnPickerExtension implements Extension {
  private _eventHandler: any = new Slick.EventHandler();
  private _extension: any;

  constructor(
    private extensionUtility: ExtensionUtility,
    private sharedService: SharedService,
  ) {}

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
     if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin with requireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.columnPicker);
       // localization support for the picker
      const columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
      const forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
      const syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
       this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
      this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
      this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
      this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
       this._extension = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
      if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
        this._eventHandler.subscribe(this._extension.onColumnsChanged, (e: any, args: CellArgs) => {
          if (this.sharedService.gridOptions.columnPicker && typeof this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
            this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
          }
        });
      }
       return this._extension;
    }
  }

  /** Translate the Column Picker and it's last 2 checkboxes */
  translateColumnPicker() {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
      if (this.sharedService.gridOptions.columnPicker) {
        this.emptyColumnPickerTitles();
         this.sharedService.gridOptions.columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
        this.sharedService.gridOptions.columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
        this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
      }
       // translate all columns (including non-visible)
      this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
       // re-initialize the Column Picker, that will recreate all the list
      // doing an "init()" won't drop any existing command attached
      if (this._extension.init) {
        this._extension.init(this.sharedService.grid);
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
