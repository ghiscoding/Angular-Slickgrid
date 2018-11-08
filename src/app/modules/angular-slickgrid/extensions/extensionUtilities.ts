import { Constants } from '../constants';
import { TranslateService } from '@ngx-translate/core';

/**
 * Remove a column from the grid by it's index in the grid
 * @param array input
 * @param index
 */
export function arrayRemoveItemByIndex(array: any[], index: number) {
  return array.filter((el: any, i: number) => {
    return index !== i;
  });
}

/**
 * From a Grid Menu object property name, we will return the correct title output string following this order
 * 1- if user provided a title, use it as the output title
 * 2- else if user provided a title key, use it to translate the output title
 * 3- else if nothing is provided use
 */
export function getPickerTitleOutputString(translate: TranslateService, propName: string, pickerName: 'gridMenu' | 'columnPicker') {
  if (!translate || !translate.instant) {
    throw new Error('getPickerTitleOutputString() requires the Translate Service for it to work properly');
  }

  let output = '';
  const picker = this._gridOptions && this._gridOptions[pickerName] || {};
  const enableTranslate = this._gridOptions && this._gridOptions.enableTranslate || false;

  const title = picker && picker[propName];
  const titleKey = picker && picker[`${propName}Key`];

  if (titleKey) {
    output = translate.instant(titleKey || ' ');
  } else {
    switch (propName) {
      case 'customTitle':
        output = title || (enableTranslate ? translate.instant('COMMANDS') : Constants.TEXT_COMMANDS);
        break;
      case 'columnTitle':
        output = title || (enableTranslate ? translate.instant('COLUMNS') : Constants.TEXT_COLUMNS);
        break;
      case 'forceFitTitle':
        output = title || (enableTranslate ? translate.instant('FORCE_FIT_COLUMNS') : Constants.TEXT_FORCE_FIT_COLUMNS);
        break;
      case 'syncResizeTitle':
        output = title || (enableTranslate ? translate.instant('SYNCHRONOUS_RESIZE') : Constants.TEXT_SYNCHRONOUS_RESIZE);
        break;
      default:
        output = title;
        break;
    }
  }
  return output;
}

/**
 * Sort items in an array by a property name
 * @params items array
 * @param property name to sort with
 * @return sorted array
 */
export function sortItems(items: any[], propertyName: string) {
  // sort the custom items by their position in the list
  items.sort((itemA, itemB) => {
    if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
      return itemA[propertyName] - itemB[propertyName];
    }
    return 0;
  });
}

/** Translate the an array of items from an input key and assign to the output key */
export function translateItems(translate: TranslateService, items: any[], inputKey: string, outputKey: string) {
  for (const item of items) {
    if (item[inputKey]) {
      item[outputKey] = translate.instant(item[inputKey]);
    }
  }
}
