import { Injectable } from '@angular/core';
import { Column, Extension, ExtensionName, GridOption } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class CheckboxSelectorExtension implements Extension {
  private _extension: any;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) { }

  dispose() {
    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  /**
   * Attach/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   */
  create(columnDefinitions: Column[], gridOptions: GridOption) {
    if (columnDefinitions && gridOptions) {
      // dynamically import the SlickGrid plugin with requireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
       if (!this._extension) {
        this._extension = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
      }
      const selectionColumn: Column = this._extension.getColumnDefinition();
      selectionColumn.excludeFromExport = true;
      selectionColumn.excludeFromQuery = true;
      selectionColumn.excludeFromHeaderMenu = true;
      columnDefinitions.unshift(selectionColumn);
      return this._extension;
    }
    return null;
  }

  register(rowSelectionPlugin?: any) {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
      // the selector column has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
      this.sharedService.grid.registerPlugin(this._extension);
       // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
        this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
        this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
      }
       // user might want to pre-select some rows
      // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
      if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
        setTimeout(() => this._extension.selectRows(this.sharedService.gridOptions.preselectedRows), 0);
      }
       return rowSelectionPlugin;
    }
    return null;
  }
}
