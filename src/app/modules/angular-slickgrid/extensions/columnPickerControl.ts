import { CellArgs, Column, GridOption } from '../models';
import { getPickerTitleOutputString, translateItems } from './extensionUtilities';
import { TranslateService } from '@ngx-translate/core';

// using external non-typed js libraries
declare var Slick: any;

export class ColumnPickerControl {
  extension: any;

  constructor(
    private grid: any,
    private gridOptions: GridOption,
    private allColumns: Column[],
    private columnDefinitions: Column[],
    private translate: TranslateService,
  ) {}

  register() {
    // localization support for the picker
    const columnTitle = getPickerTitleOutputString(this.translate, 'columnTitle', 'columnPicker');
    const forceFitTitle = getPickerTitleOutputString(this.translate, 'forceFitTitle', 'columnPicker');
    const syncResizeTitle = getPickerTitleOutputString(this.translate, 'syncResizeTitle', 'columnPicker');

    this.gridOptions.columnPicker = this.gridOptions.columnPicker || {};
    this.gridOptions.columnPicker.columnTitle = this.gridOptions.columnPicker.columnTitle || columnTitle;
    this.gridOptions.columnPicker.forceFitTitle = this.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
    this.gridOptions.columnPicker.syncResizeTitle = this.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;

    this.extension = new Slick.Controls.ColumnPicker(this.columnDefinitions, this.grid, this.gridOptions);
    if (this.grid && this.gridOptions.enableColumnPicker) {
      this.extension.onColumnsChanged.subscribe((e: Event, args: CellArgs) => {
        if (this.gridOptions.columnPicker && typeof this.gridOptions.columnPicker.onColumnsChanged === 'function') {
          this.gridOptions.columnPicker.onColumnsChanged(e, args);
        }
      });
    }

    return this.extension;
  }

  /** Translate the Column Picker and it's last 2 checkboxes */
  translateColumnPicker() {
    // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
    if (this.gridOptions && this.gridOptions.columnPicker) {
      this.emptyColumnPickerTitles();

      this.gridOptions.columnPicker.columnTitle = getPickerTitleOutputString(this.translate, 'columnTitle', 'columnPicker');
      this.gridOptions.columnPicker.forceFitTitle = getPickerTitleOutputString(this.translate, 'forceFitTitle', 'columnPicker');
      this.gridOptions.columnPicker.syncResizeTitle = getPickerTitleOutputString(this.translate, 'syncResizeTitle', 'columnPicker');
    }

    // translate all columns (including non-visible)
    translateItems(this.translate, this.allColumns, 'headerKey', 'name');

    // re-initialize the Column Picker, that will recreate all the list
    // doing an "init()" won't drop any existing command attached
    if (this.extension.init) {
      this.extension.init(this.grid);
    }
  }

  private emptyColumnPickerTitles() {
    this.gridOptions.columnPicker.columnTitle = '';
    this.gridOptions.columnPicker.forceFitTitle = '';
    this.gridOptions.columnPicker.syncResizeTitle = '';
  }
}
