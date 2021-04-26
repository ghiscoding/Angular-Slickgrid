import 'slickgrid/controls/slick.columnpicker';
import { Injectable } from '@angular/core';

import { Column, ColumnPicker, Extension, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class ColumnPickerExtension implements Extension {
  private _eventHandler: SlickEventHandler;
  private _addon: any;
  private _columnPicker!: ColumnPicker | null;

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
    this.extensionUtility.nullifyFunctionNameStartingWithOn(this._columnPicker);
    this._addon = null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // localization support for the picker
      const columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
      const forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
      const syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');

      this._columnPicker = this.sharedService.gridOptions.columnPicker || {};
      this.sharedService.gridOptions.columnPicker = this._columnPicker;
      this._columnPicker.columnTitle = this._columnPicker.columnTitle || columnTitle;
      this._columnPicker.forceFitTitle = this._columnPicker.forceFitTitle || forceFitTitle;
      this._columnPicker.syncResizeTitle = this._columnPicker.syncResizeTitle || syncResizeTitle;
      this._addon = new Slick.Controls.ColumnPicker(this.sharedService.allColumns, this.sharedService.grid, this.sharedService.gridOptions);

      if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
        if (this._columnPicker.onExtensionRegistered) {
          this._columnPicker.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onColumnsChanged, (e: any, args: { columnId: string; showing: boolean; columns: Column[]; allColumns: Column[]; grid: any; }) => {
          if (this._columnPicker && typeof this._columnPicker.onColumnsChanged === 'function') {
            this._columnPicker.onColumnsChanged(e, args);
          }

          // keep reference to the updated visible columns list
          if (args && Array.isArray(args.columns) && args.columns.length !== this.sharedService.visibleColumns.length) {
            this.sharedService.visibleColumns = args.columns;
          }

          // when using row selection, SlickGrid will only apply the "selected" CSS class on the visible columns only
          // and if the row selection was done prior to the column being shown then that column that was previously hidden (at the time of the row selection)
          // will not have the "selected" CSS class because it wasn't visible at the time.
          // To bypass this problem we can simply recall the row selection with the same selection and that will trigger a re-apply of the CSS class
          // on all columns including the column we just made visible
          if (this.sharedService.gridOptions.enableRowSelection && args.showing) {
            const rowSelection = args.grid.getSelectedRows();
            args.grid.setSelectedRows(rowSelection);
          }

          // if we're using frozen columns, we need to readjust pinning when the new hidden column becomes visible again on the left pinning container
          // we need to readjust frozenColumn index because SlickGrid freezes by index and has no knowledge of the columns themselves
          const frozenColumnIndex = this.sharedService.gridOptions.frozenColumn !== undefined ? this.sharedService.gridOptions.frozenColumn : -1;
          if (frozenColumnIndex >= 0) {
            const { allColumns, columns: visibleColumns } = args;
            this.extensionUtility.readjustFrozenColumnIndexWhenNeeded(frozenColumnIndex, allColumns, visibleColumns);
          }
        });
      }
      return this._addon;
    }
    return null;
  }

  /** Translate the Column Picker headers and also the last 2 checkboxes */
  translateColumnPicker() {
    // update the properties by pointers, that is the only way to get Column Picker Control to see the new values
    if (this._columnPicker) {
      this.emptyColumnPickerTitles();
      this._columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
      this._columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
      this._columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
    }

    // translate all columns (including hidden columns)
    // eventually deprecate the "headerKey" and use only the "nameKey"
    this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
    this.extensionUtility.translateItems(this.sharedService.allColumns, 'nameKey', 'name');

    // update the Titles of each sections (command, customTitle, ...)
    if (this._addon && this._addon.updateAllTitles && this._columnPicker) {
      this._addon.updateAllTitles(this._columnPicker);
    }
  }

  private emptyColumnPickerTitles() {
    if (this._columnPicker) {
      this._columnPicker.columnTitle = '';
      this._columnPicker.forceFitTitle = '';
      this._columnPicker.syncResizeTitle = '';
    }
  }
}
