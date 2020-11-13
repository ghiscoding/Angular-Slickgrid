import { Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Flatpickr from 'flatpickr';
import { BaseOptions as FlatpickrBaseOptions } from 'flatpickr/dist/types/options';

import { Constants } from '../constants';
import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  FieldType,
  FlatpickrOption,
  GridOption,
  Locale,
  OperatorString,
  OperatorType,
  SearchTerm,
} from './../models/index';
import { buildSelectOperatorHtmlString } from './filterUtilities';
import { destroyObjectDomElementProps, getTranslationPrefix, mapFlatpickrDateFormatWithFieldType, mapOperatorToShorthandDesignation } from '../services/utilities';

// use Flatpickr from import or 'require', whichever works first
declare function require(name: string): any;
require('flatpickr');

// using external non-typed js libraries
declare const $: any;

export class CompoundDateFilter implements Filter {
  private _clearFilterTriggered = false;
  private _currentDate: Date;
  private _flatpickrOptions: FlatpickrOption;
  private _shouldTriggerQuery = true;
  private $filterElm: any;
  private $filterInputElm: any;
  private $selectOperatorElm: any;
  private _currentValue: string;
  private _operator: OperatorType | OperatorString;
  flatInstance: any;
  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;

  constructor(@Optional() private translate: TranslateService) { }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter for the Current Dates selected */
  get currentDate(): Date {
    return this._currentDate;
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.empty;
  }

  /** Getter for the Flatpickr Options */
  get flatpickrOptions(): FlatpickrOption {
    return this._flatpickrOptions || {};
  }

  /** Getter for the single Locale texts provided by the user in main file or else use default English locales via the Constants */
  get locales(): Locale {
    return this.gridOptions.locales || Constants.locales;
  }

  /** Getter for the Filter Operator */
  get operator(): OperatorType | OperatorString {
    return this._operator || this.columnFilter.operator || this.defaultOperator;
  }

  /** Setter for the Filter Operator */
  set operator(op: OperatorType | OperatorString) {
    this._operator = op;
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
    }
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.operator = args.operator || '';
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // date input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    // and initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement(searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterInputElm.keyup((e: any) => {
      this.onTriggerEvent(e);
    });
    this.$selectOperatorElm.change((e: any) => {
      this.onTriggerEvent(e);
    });
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.flatInstance && this.$selectOperatorElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      this.$selectOperatorElm.val(0);
      this.flatInstance.clear();
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.flatInstance && typeof this.flatInstance.destroy === 'function') {
      this.flatInstance.destroy();
      if (this.flatInstance.element) {
        destroyObjectDomElementProps(this.flatInstance);
      }
      this.flatInstance = null;
    }
    if (this.$filterElm) {
      this.$filterElm.off('keyup').remove();
    }
    if (this.$selectOperatorElm) {
      this.$selectOperatorElm.off('change').remove();
    }
    this.$filterElm = null;
    this.callback = null;
    this.onTriggerEvent = null;
  }

  hide() {
    if (this.flatInstance && typeof this.flatInstance.close === 'function') {
      this.flatInstance.close();
    }
  }

  show() {
    if (this.flatInstance && typeof this.flatInstance.open === 'function') {
      this.flatInstance.open();
    }
  }

  /** Set value(s) in the DOM element, we can optionally pass an operator and/or trigger a change event */
  setValues(values: SearchTerm | SearchTerm[], operator?: OperatorType | OperatorString) {
    if (this.flatInstance && values) {
      const newValue = Array.isArray(values) ? values[0] : values;
      this._currentDate = newValue as Date;
      this.flatInstance.setDate(newValue);
    }

    // set the operator, in the DOM as well, when defined
    this.operator = operator || this.defaultOperator;
    if (operator && this.$selectOperatorElm) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this.$selectOperatorElm.val(operatorShorthand);
    }
  }

  //
  // private functions
  // ------------------
  private buildDatePickerInput(searchTerm?: SearchTerm) {
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnFilter.type || this.columnDef.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnFilter.type || this.columnDef.type || FieldType.dateUtc);
    const userFilterOptions = (this.columnFilter && this.columnFilter.filterOptions || {}) as FlatpickrOption;

    // get current locale, if user defined a custom locale just use or get it the Translate Service if it exist else just use English
    let currentLocale = (userFilterOptions && userFilterOptions.locale) || (this.translate && this.translate.currentLang) || this.gridOptions.locale || 'en';
    if (currentLocale && currentLocale.length > 2) {
      currentLocale = currentLocale.substring(0, 2);
    }

    // if we are preloading searchTerms, we'll keep them for reference
    if (searchTerm) {
      this._currentDate = searchTerm as Date;
    }

    const pickerOptions: FlatpickrOption = {
      defaultDate: (searchTerm as string) || '',
      altInput: true,
      altFormat: outputFormat,
      dateFormat: inputFormat,
      wrap: true,
      closeOnSelect: true,
      locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
      onChange: (selectedDates: Date[] | Date, dateStr: string) => {
        this._currentValue = dateStr;
        this._currentDate = Array.isArray(selectedDates) && selectedDates[0];

        // when using the time picker, we can simulate a keyup event to avoid multiple backend request
        // since backend request are only executed after user start typing, changing the time should be treated the same way
        let customEvent: CustomEvent | undefined;
        if (pickerOptions.enableTime) {
          customEvent = new CustomEvent('keyup');
        }
        this.onTriggerEvent(customEvent);
      }
    };

    // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
    if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
      pickerOptions.enableTime = true;
    }

    // merge options with optional user's custom options
    this._flatpickrOptions = { ...pickerOptions, ...userFilterOptions };

    let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }
    const $filterInputElm: any = $(`<div class="flatpickr"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
    this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(this._flatpickrOptions) : Flatpickr($filterInputElm, this._flatpickrOptions as unknown as Partial<FlatpickrBaseOptions>);
    return $filterInputElm;
  }

  private getOptionValues(): { operator: OperatorString, description: string }[] {
    return [
      { operator: '', description: '' },
      { operator: '=', description: this.getOutputText('EQUAL_TO', 'TEXT_EQUAL_TO', 'Equal to') },
      { operator: '<', description: this.getOutputText('LESS_THAN', 'TEXT_LESS_THAN', 'Less than') },
      { operator: '<=', description: this.getOutputText('LESS_THAN_OR_EQUAL_TO', 'TEXT_LESS_THAN_OR_EQUAL_TO', 'Less than or equal to') },
      { operator: '>', description: this.getOutputText('GREATER_THAN', 'TEXT_GREATER_THAN', 'Greater than') },
      { operator: '>=', description: this.getOutputText('GREATER_THAN_OR_EQUAL_TO', 'TEXT_GREATER_THAN_OR_EQUAL_TO', 'Greater than or equal to') },
      { operator: '<>', description: this.getOutputText('NOT_EQUAL_TO', 'TEXT_NOT_EQUAL_TO', 'Not equal to') }
    ];
  }

  /** Get Locale, Translated or a Default Text if first two aren't detected */
  private getOutputText(translationKey: string, localeText: string, defaultText: string): string {
    if (this.gridOptions && this.gridOptions.enableTranslate && this.translate && this.translate.instant) {
      const translationPrefix = getTranslationPrefix(this.gridOptions);
      return this.translate.instant(`${translationPrefix}${translationKey}`);
    }
    return this.locales && this.locales[localeText] || defaultText;
  }

  /**
   * Create the DOM element
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const fieldId = this.columnDef && this.columnDef.id;
    const $headerElm = this.grid.getHeaderRowColumn(fieldId);
    $($headerElm).empty();

    // create the DOM Select dropdown for the Operator
    const selectOperatorHtmlString = buildSelectOperatorHtmlString(this.getOptionValues());
    this.$selectOperatorElm = $(selectOperatorHtmlString);
    this.$filterInputElm = this.buildDatePickerInput(searchTerm);
    const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
    const $containerInputGroup = $(`<div class="input-group flatpickr"></div>`);
    const $operatorInputGroupAddon = $(`<div class="input-group-addon input-group-prepend operator"></div>`);

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon input-group-prepend operator">
          <select class="form-control"></select>
        </div>
        <div class=flatpickr>
          <input type="text" class="form-control" data-input>
        </div>
      </div>
    */
    $operatorInputGroupAddon.append(this.$selectOperatorElm);
    $containerInputGroup.append($operatorInputGroupAddon);
    $containerInputGroup.append(this.$filterInputElm);

    // create the DOM element & add an ID and filter class
    $filterContainerElm.append($containerInputGroup);
    this.$filterInputElm.data('columnId', fieldId);

    if (this.operator) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this.$selectOperatorElm.val(operatorShorthand);
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm && searchTerm !== '') {
      this.$filterInputElm.addClass('filled');
      this._currentDate = searchTerm as Date;
      this._currentValue = searchTerm as string;
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterContainerElm;
  }

  /** Load a different set of locales for Flatpickr to be localized */
  private loadFlatpickrLocale(language: string) {
    let locales = 'en';

    try {
      if (language !== 'en') {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        const localeDefault: any = require(`flatpickr/dist/l10n/${language}.js`).default;
        locales = (localeDefault && localeDefault[language]) ? localeDefault[language] : 'en';
      }
    } catch (e) {
      console.warn(`[Angular-Slickgrid - CompoundDate Filter] It seems that "${language}" is not a locale supported by Flatpickr, we will use "en" instead. `
        + `To avoid seeing this message, you can specifically set "filter: { filterOptions: { locale: 'en' } }" in your column definition.`);
      return 'en';
    }
    return locales;
  }

  private onTriggerEvent(e: Event | undefined) {
    if (this._clearFilterTriggered) {
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
      this.$filterElm.removeClass('filled');
    } else {
      const selectedOperator = this.$selectOperatorElm.find('option:selected').val();
      (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
    }
    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
