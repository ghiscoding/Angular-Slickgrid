import { Injectable } from '@angular/core';
import { Column, GridOption } from '../models';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class CheckboxSelectorExtension {
  private _checkboxSelectorPlugin: any;

  constructor(private sharedService: SharedService) {}

  /**
   * Attach/Create different plugins before the Grid creation.
   * For example the multi-select have to be added to the column definition before the grid is created to work properly
   */
  create(columnDefinitions: Column[], gridOptions: GridOption) {
    if (!this._checkboxSelectorPlugin) {
      this._checkboxSelectorPlugin = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
    }
    const selectionColumn: Column = this._checkboxSelectorPlugin.getColumnDefinition();
    selectionColumn.excludeFromExport = true;
    selectionColumn.excludeFromQuery = true;
    selectionColumn.excludeFromHeaderMenu = true;
    columnDefinitions.unshift(selectionColumn);

    return this._checkboxSelectorPlugin;
  }

  register(rowSelectionPlugin?: any) {
    // when enabling the Checkbox Selector Plugin, we need to also watch onClick events to perform certain actions
    // the selector column has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
    this.sharedService.grid.registerPlugin(this._checkboxSelectorPlugin);

    // this also requires the Row Selection Model to be registered as well
    if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
      rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
      this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
    }

    // user might want to pre-select some rows
    // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
    if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
      setTimeout(() => this._checkboxSelectorPlugin.selectRows(this.sharedService.gridOptions.preselectedRows), 0);
    }

    return rowSelectionPlugin;
  }
}
