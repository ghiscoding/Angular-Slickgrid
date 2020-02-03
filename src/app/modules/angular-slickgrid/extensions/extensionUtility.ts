import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';

declare function require(name: string);

@Injectable()
export class ExtensionUtility {
  constructor(private sharedService: SharedService, @Optional() private translate: TranslateService) { }

  /**
   * Remove a column from the grid by it's index in the grid
   * @param array input
   * @param index
   */
  arrayRemoveItemByIndex<T>(array: T[], index: number): T[] {
    return array.filter((el: T, i: number) => index !== i);
  }

  /**
   * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
   * This will basically only load the extension when user enables the feature
   * @param extensionName
   */
  loadExtensionDynamically(extensionName: ExtensionName): any {
    try {
      switch (extensionName) {
        case ExtensionName.autoTooltip:
          require('slickgrid/plugins/slick.autotooltips');
          break;
        case ExtensionName.cellExternalCopyManager:
          require('slickgrid/plugins/slick.cellexternalcopymanager');
          break;
        case ExtensionName.checkboxSelector:
          require('slickgrid/plugins/slick.checkboxselectcolumn');
          break;
        case ExtensionName.cellMenu:
          require('slickgrid/plugins/slick.cellmenu');
          break;
        case ExtensionName.columnPicker:
          require('slickgrid/controls/slick.columnpicker');
          break;
        case ExtensionName.contextMenu:
          require('slickgrid/plugins/slick.contextmenu');
          break;
        case ExtensionName.draggableGrouping:
          require('slickgrid/plugins/slick.draggablegrouping');
          break;
        case ExtensionName.gridMenu:
          require('slickgrid/controls/slick.gridmenu');
          break;
        case ExtensionName.groupItemMetaProvider:
          require('slickgrid/slick.groupitemmetadataprovider');
          break;
        case ExtensionName.headerButton:
          require('slickgrid/plugins/slick.headerbuttons');
          break;
        case ExtensionName.headerMenu:
          require('slickgrid/plugins/slick.headermenu');
          break;
        case ExtensionName.rowSelection:
          require('slickgrid/plugins/slick.rowselectionmodel');
          break;
        case ExtensionName.rowDetailView:
          require('slickgrid/plugins/slick.rowdetailview');
          break;
        case ExtensionName.rowMoveManager:
          require('slickgrid/plugins/slick.rowmovemanager');
          break;
      }
    } catch (e) {
      // do nothing, we fall here when using Angular and RequireJS
    }
  }

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

    if (titleKey && this.translate && this.translate.currentLang && this.translate.instant) {
      output = this.translate.instant(titleKey || ' ');
    } else {
      switch (propName) {
        case 'customTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant('COMMANDS' || ' ') || locales && locales.TEXT_COMMANDS;
          break;
        case 'columnTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant('COLUMNS' || ' ') || locales && locales.TEXT_COLUMNS;
          break;
        case 'forceFitTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant('FORCE_FIT_COLUMNS' || ' ') || locales && locales.TEXT_FORCE_FIT_COLUMNS;
          break;
        case 'syncResizeTitle':
          output = title || enableTranslate && this.translate && this.translate.currentLang && this.translate.instant && this.translate.instant('SYNCHRONOUS_RESIZE' || ' ') || locales && locales.TEXT_SYNCHRONOUS_RESIZE;
          break;
        default:
          output = title;
          break;
      }
    }
    return output;
  }

  /**
   * Sort items (by pointers) in an array by a property name
   * @params items array
   * @param property name to sort with
   */
  sortItems(items: any[], propertyName: string) {
    // sort the custom items by their position in the list
    if (Array.isArray(items)) {
      items.sort((itemA: any, itemB: any) => {
        if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
          return itemA[propertyName] - itemB[propertyName];
        }
        return 0;
      });
    }
  }

  /** Translate the an array of items from an input key and assign to the output key */
  translateItems(items: any[], inputKey: string, outputKey: string) {
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
