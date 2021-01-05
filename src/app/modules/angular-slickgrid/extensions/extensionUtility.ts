import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import { Column } from '../models/index';
import { SharedService } from '../services/shared.service';
import { getTranslationPrefix } from '../services/utilities';

@Injectable()
export class ExtensionUtility {
  constructor(private sharedService: SharedService, @Optional() private translate: TranslateService) { }

  /**
   * From a Grid Menu object property name, we will return the correct title output string following this order
   * 1- if user provided a title, use it as the output title
   * 2- else if user provided a title key, use it to translate the output title
   * 3- else if nothing is provided use text defined as constants
   */
  getPickerTitleOutputString(propName: string, pickerName: 'gridMenu' | 'columnPicker') {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    let output = '';
    const picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
    const enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;

    // get locales provided by user in forRoot or else use default English locales via the Constants
    const locales = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

    const title = picker && picker[propName];
    const titleKey = picker && picker[`${propName}Key`];
    const gridOptions = this.sharedService.gridOptions;
    const translationPrefix = getTranslationPrefix(gridOptions);

    if (titleKey && this.translate && this.translate.currentLang && this.translate.instant) {
      output = this.translate.instant(titleKey || ' ');
    } else {
      switch (propName) {
        case 'customTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(`${translationPrefix}COMMANDS` || ' ') || locales && locales.TEXT_COMMANDS;
          break;
        case 'columnTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(`${translationPrefix}COLUMNS` || ' ') || locales && locales.TEXT_COLUMNS;
          break;
        case 'forceFitTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(`${translationPrefix}FORCE_FIT_COLUMNS` || ' ') || locales && locales.TEXT_FORCE_FIT_COLUMNS;
          break;
        case 'syncResizeTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(`${translationPrefix}SYNCHRONOUS_RESIZE` || ' ') || locales && locales.TEXT_SYNCHRONOUS_RESIZE;
          break;
        default:
          output = title;
          break;
      }
    }
    return output;
  }

  /**
   * Loop through object provided and set to null any property found starting with "onX"
   * @param {Object}: obj
   */
  nullifyFunctionNameStartingWithOn(obj?: any) {
    if (obj) {
      for (const prop of Object.keys(obj)) {
        if (prop.startsWith('on')) {
          obj[prop] = null;
        }
      }
    }
  }

  /**
   * When using ColumnPicker/GridMenu to show/hide a column, we potentially need to readjust the grid option "frozenColumn" index.
   * That is because SlickGrid freezes by column index and it has no knowledge of the columns themselves and won't change the index, we need to do that ourselves whenever necessary.
   * Note: we call this method right after the visibleColumns array got updated, it won't work properly if we call it before the setting the visibleColumns.
   * @param {String} pickerColumnId - what is the column id triggered by the picker
   * @param {Number} frozenColumnIndex - current frozenColumn index
   * @param {Boolean} showingColumn - is the column being shown or hidden?
   * @param {Array<Object>} allColumns - all columns (including hidden ones)
   * @param {Array<Object>} visibleColumns - only visible columns (excluding hidden ones)
   */
  readjustFrozenColumnIndexWhenNeeded(pickerColumnId: string | number, frozenColumnIndex: number, showingColumn: boolean, allColumns: Column[], visibleColumns: Column[]) {
    if (frozenColumnIndex >= 0 && pickerColumnId) {
      // calculate a possible frozenColumn index variance
      let frozenColIndexVariance = 0;
      if (showingColumn) {
        const definedFrozenColumnIndex = visibleColumns.findIndex(col => col.id === this.sharedService.frozenVisibleColumnId);
        const columnIndex = visibleColumns.findIndex(col => col.id === pickerColumnId);
        frozenColIndexVariance = (columnIndex >= 0 && (frozenColumnIndex >= columnIndex || definedFrozenColumnIndex === columnIndex)) ? 1 : 0;
      } else {
        const columnIndex = allColumns.findIndex(col => col.id === pickerColumnId);
        frozenColIndexVariance = (columnIndex >= 0 && frozenColumnIndex >= columnIndex) ? -1 : 0;
      }
      // if we have a variance different than 0 then apply it
      const newFrozenColIndex = frozenColumnIndex + frozenColIndexVariance;
      if (frozenColIndexVariance !== 0) {
        this.sharedService.grid.setOptions({ frozenColumn: newFrozenColIndex });
      }

      // to freeze columns, we need to take only the visible columns and we also need to use setColumns() when some of them are hidden
      // to make sure that we only use the visible columns, not doing this would show back some of the hidden columns
      if (Array.isArray(visibleColumns) && Array.isArray(allColumns) && visibleColumns.length !== allColumns.length) {
        this.sharedService.grid.setColumns(visibleColumns);
      }
    }
  }

  /**
   * Sort items (by pointers) in an array by a property name
   * @params items array
   * @param property name to sort with
   */
  sortItems<T = any>(items: T[], propertyName: string) {
    // sort the custom items by their position in the list
    if (Array.isArray(items)) {
      items.sort((itemA: T, itemB: T) => {
        if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
          return itemA[propertyName] - itemB[propertyName];
        }
        return 0;
      });
    }
  }

  /** Translate the an array of items from an input key and assign to the output key */
  translateItems<T = any>(items: T[], inputKey: string, outputKey: string) {
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item[inputKey]) {
          item[outputKey] = this.translate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant(item[inputKey]);
        }
      }
    }
  }

  /**
   * When "enabledTranslate" is set to True, we will try to translate if the Translate Service exist or use the Locales when not
   * @param translationKey
   * @param localeKey
   */
  translateWhenEnabledAndServiceExist(translationKey: string, localeKey: string): string {
    let text = '';
    const gridOptions = this.sharedService && this.sharedService.gridOptions;

    // get locales provided by user in main file or else use default English locales via the Constants
    const locales = gridOptions && gridOptions.locales || Constants.locales;

    if (gridOptions.enableTranslate && this.translate && this.translate.currentLang && this.translate.instant) {
      text = this.translate.instant(translationKey || ' ');
    } else if (locales && locales.hasOwnProperty(localeKey)) {
      text = locales[localeKey];
    } else {
      text = localeKey;
    }
    return text;
  }
}
