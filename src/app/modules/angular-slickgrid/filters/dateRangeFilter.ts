import { Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from '../services/utilities';
import {
  Column,
  ColumnFilter,
  FieldType,
  Filter,
  FilterArguments,
  FilterCallback,
  FlatpickrOption,
  GridOption,
  OperatorString,
  OperatorType,
  SearchTerm,
} from '../models/index';
import Flatpickr from 'flatpickr';
import { BaseOptions as FlatpickrBaseOptions } from 'flatpickr/dist/types/options';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

// use Flatpickr from import or 'require', whichever works first
declare function require(name: string): any;
require('flatpickr');

// using external non-typed js libraries
declare var $: any;

export class DateRangeFilter implements Filter {
  private _clearFilterTriggered = false;
  private _currentValue: string;
  private _currentDates: Date[];
  private _currentDateStrings: string[];
  private _flatpickrOptions: FlatpickrOption;
  private _shouldTriggerQuery = true;
  private $filterElm: any;
  private $filterInputElm: any;
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
  get currentDates(): Date[] {
    return this._currentDates;
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return this.gridOptions.defaultFilterRangeOperator || OperatorType.rangeExclusive;
  }

  /** Getter for the Flatpickr Options */
  get flatpickrOptions(): FlatpickrOption {
    return this._flatpickrOptions || {};
  }

  /** Getter of the Operator to use when doing the filter comparing */
  get operator(): OperatorType | OperatorString {
    return this.columnFilter && this.columnFilter.operator || this.defaultOperator;
  }

  /** Setter for the filter operator */
  set operator(operator: OperatorType | OperatorString) {
    if (this.columnFilter) {
      this.columnFilter.operator = operator;
    }
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
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    this.$filterElm = this.createDomElement(this.searchTerms);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterInputElm.keyup((e: any) => {
      this.onTriggerEvent(e);
    });
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.flatInstance) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      this.flatInstance.clear();
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off('keyup').remove();
    }
    if (this.flatInstance && typeof this.flatInstance.destroy === 'function') {
      this.flatInstance.destroy();
    }
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

  /**
   * Set value(s) on the DOM element
   * @params searchTerms
   */
  setValues(searchTerms: SearchTerm[], operator?: OperatorType | OperatorString) {
    let pickerValues = [];

    // get the picker values, if it's a string with the "..", we'll do the split else we'll use the array of search terms
    if (typeof searchTerms === 'string' || (Array.isArray(searchTerms) && typeof searchTerms[0] === 'string') && (searchTerms[0] as string).indexOf('..') > 0) {
      pickerValues = (typeof searchTerms === 'string') ? [(searchTerms as string)] : (searchTerms[0] as string).split('..');
    } else if (Array.isArray(searchTerms)) {
      pickerValues = searchTerms;
    }

    if (this.flatInstance && searchTerms) {
      this._currentDates = pickerValues;
      this.flatInstance.setDate(pickerValues);
    }

    // set the operator when defined
    this.operator = operator || this.defaultOperator;
  }

  //
  // private functions
  // ------------------
  private buildDatePickerInput(searchTerms?: SearchTerm | SearchTerm[]) {
    const columnId = this.columnDef && this.columnDef.id;
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
    let currentLocale = this.translate && this.translate.currentLang || 'en';
    if (currentLocale.length > 2) {
      currentLocale = currentLocale.substring(0, 2);
    }

    let pickerValues = [];

    // get the picker values, if it's a string with the "..", we'll do the split else we'll use the array of search terms
    if (typeof searchTerms === 'string' || (Array.isArray(searchTerms) && typeof searchTerms[0] === 'string') && (searchTerms[0] as string).indexOf('..') > 0) {
      pickerValues = (typeof searchTerms === 'string') ? [(searchTerms as string)] : (searchTerms[0] as string).split('..');
    } else if (Array.isArray(searchTerms)) {
      pickerValues = searchTerms;
    }

    // if we are preloading searchTerms, we'll keep them for reference
    if (pickerValues) {
      this._currentDates = pickerValues;
      const outFormat = mapMomentDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
      this._currentDateStrings = pickerValues.map(date => moment(date).format(outFormat));
    }

    const pickerOptions: FlatpickrOption = {
      defaultDate: pickerValues || '',
      altInput: true,
      altFormat: outputFormat,
      dateFormat: inputFormat,
      mode: 'range',
      wrap: true,
      closeOnSelect: true,
      locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
      onChange: (selectedDates: Date[] | Date, dateStr: string, instance: any) => {
        if (Array.isArray(selectedDates)) {
          this._currentDates = selectedDates;
          const outFormat = mapMomentDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateIso);
          this._currentDateStrings = selectedDates.map(date => moment(date).format(outFormat));
          this._currentValue = this._currentDateStrings.join('..');
        }

        // when using the time picker, we can simulate a keyup event to avoid multiple backend request
        // since backend request are only executed after user start typing, changing the time should be treated the same way
        const newEvent = pickerOptions.enableTime ? new CustomEvent('keyup') : undefined;
        this.onTriggerEvent(newEvent);
      }
    };

    // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
    if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
      pickerOptions.enableTime = true;
    }

    // merge options with optional user's custom options
    this._flatpickrOptions = { ...pickerOptions, ...(this.columnFilter.filterOptions as FlatpickrOption) };

    let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }
    const $filterInputElm: any = $(`<div class="flatpickr search-filter filter-${columnId}"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
    this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(this._flatpickrOptions) : Flatpickr($filterInputElm, this._flatpickrOptions as unknown as Partial<FlatpickrBaseOptions>);
    return $filterInputElm;
  }

  /**
   * Create the DOM element
   * @params searchTerms
   */
  private createDomElement(searchTerms?: SearchTerm[]) {
    const fieldId = this.columnDef && this.columnDef.id;
    const $headerElm = this.grid.getHeaderRowColumn(fieldId);
    $($headerElm).empty();

    // create the DOM Select dropdown for the Operator
    this.$filterInputElm = this.buildDatePickerInput(searchTerms);

    /* the DOM element final structure will be
      <div class=flatpickr>
        <input type="text" class="form-control" data-input>
      </div>
    */

    // create the DOM element & add an ID and filter class
    this.$filterInputElm.attr('id', `filter-${fieldId}`);
    this.$filterInputElm.data('columnId', fieldId);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (Array.isArray(searchTerms) && searchTerms.length > 0 && searchTerms[0] !== '') {
      this.$filterInputElm.addClass('filled');
      this._currentDates = searchTerms as Date[];
      this._currentValue = searchTerms[0] as string;
    }

    // append the new DOM element to the header row
    if (this.$filterInputElm && typeof this.$filterInputElm.appendTo === 'function') {
      this.$filterInputElm.appendTo($headerElm);
    }

    return this.$filterInputElm;
  }

  /** Load a different set of locales for Flatpickr to be localized */
  private loadFlatpickrLocale(language: string) {
    let locales = 'en';

    if (language !== 'en') {
      // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
      const localeDefault: any = require(`flatpickr/dist/l10n/${language}.js`).default;
      locales = (localeDefault && localeDefault[language]) ? localeDefault[language] : 'en';
    }
    return locales;
  }

  private onTriggerEvent(e: Event | undefined) {
    if (this._clearFilterTriggered) {
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
      this.$filterElm.removeClass('filled');
    } else {
      (this._currentDateStrings) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentDateStrings ? this._currentDateStrings : [this._currentValue]), operator: this.operator || '', shouldTriggerQuery: this._shouldTriggerQuery });
    }
    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
