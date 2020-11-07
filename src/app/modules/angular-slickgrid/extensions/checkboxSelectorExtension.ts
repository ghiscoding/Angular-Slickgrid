import { Injectable } from '@angular/core';
import { Column, Extension, ExtensionName, GridOption } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare const Slick: any;

@Injectable()
export class CheckboxSelectorExtension implements Extension {
  private _addon: any;
  private _rowSelectionPlugin: any;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) { }

  dispose() {
    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
      this._addon = null;
    }
    if (this._rowSelectionPlugin && this._rowSelectionPlugin.destroy) {
      this._rowSelectionPlugin.destroy();
    }
  }

  /**
   * Create the plugin before the Grid creation, else it will behave oddly.
   * Mostly because the column definitions might change after the grid creation
   */
  create(columnDefinitions: Column[], gridOptions: GridOption) {
    if (Array.isArray(columnDefinitions) && gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
      if (!this._addon) {
        this._addon = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
      }
      const iconColumn: Column = this._addon.getColumnDefinition();
      if (typeof iconColumn === 'object') {
        iconColumn.excludeFromExport = true;
        iconColumn.excludeFromColumnPicker = true;
        iconColumn.excludeFromGridMenu = true;
        iconColumn.excludeFromQuery = true;
        iconColumn.excludeFromHeaderMenu = true;

        // column index position in the grid
        const columnPosition = gridOptions && gridOptions.checkboxSelector && gridOptions.checkboxSelector.columnIndexPosition || 0;
        if (columnPosition > 0) {
          columnDefinitions.splice(columnPosition, 0, iconColumn);
        } else {
          columnDefinitions.unshift(iconColumn);
        }
      }
      return this._addon;
    }
    return null;
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(rowSelectionPlugin?: any) {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      this.sharedService.grid.registerPlugin(this._addon);

      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
        this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
        this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
      }

      // user might want to pre-select some rows
      // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
      if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
        setTimeout(() => this._addon.selectRows(this.sharedService.gridOptions.preselectedRows));
      }

      this._rowSelectionPlugin = rowSelectionPlugin;
      return rowSelectionPlugin;
    }
    return null;
  }
}
