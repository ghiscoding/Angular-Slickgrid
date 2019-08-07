import { Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from '../services/utilities';
import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  FieldType,
  GridOption,
  OperatorString,
  OperatorType,
  SearchTerm,
} from '../models/index';
import Flatpickr from 'flatpickr';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

// use Flatpickr from import or 'require', whichever works first
declare function require(name: string): any;
require('flatpickr');

// using external non-typed js libraries
declare var $: any;

export class DateRangeFilter implements Filter {
  private _clearFilterTriggered = false;
  private _flatpickrOptions: any;
  private _shouldTriggerQuery = true;
  private $filterElm: any;
  private $filterInputElm: any;
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

  /** Getter for the Flatpickr Options */
  get flatpickrOptions(): any {
    return this._flatpickrOptions || {};
  }

  /** Setter for the Filter Operator */
  set operator(op: OperatorType | OperatorString) {
    this._operator = op;
  }

  /** Getter for the Filter Operator */
  get operator(): OperatorType | OperatorString {
    return this._operator || OperatorType.rangeExclusive;
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    if (args) {
      this.grid = args.grid;
      this.callback = args.callback;
      this.columnDef = args.columnDef;
      this.operator = args.operator || '';
      this.searchTerms = args.searchTerms || [];

      // date input can only have 1 search term, so we will use the 1st array index if it exist
      const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';

      // step 1, create the DOM Element of the filter which contain the compound Operator+Input
      // and initialize it if searchTerm is filled
      this.$filterElm = this.createDomElement(searchTerm);

      // step 3, subscribe to the keyup event and run the callback when that happens
      // also add/remove "filled" class for styling purposes
      this.$filterInputElm.keyup((e: any) => {
        this.onTriggerEvent(e);
      });
    }
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
  }

  /**
   * Set value(s) on the DOM element
   */
  setValues(values: SearchTerm[]) {
    const searchTerm = (Array.isArray(values) && typeof values[0] === 'string') ? values[0] : '';
    const dateValues = ((searchTerm as string).indexOf('..') >= 0) ? (searchTerm as string).split('..') : searchTerm;
    if (this.flatInstance && searchTerm) {
      this.flatInstance.setDate(dateValues);
    }
  }

  //
  // private functions
  // ------------------
  private buildDatePickerInput(searchTerms?: SearchTerm) {
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
    let currentLocale = this.translate && this.translate.currentLang || 'en';
    if (currentLocale.length > 2) {
      currentLocale = currentLocale.substring(0, 2);
    }

    const searchTerm = ((searchTerms as string).indexOf('..') >= 0) ? (searchTerms as string).split('..') : searchTerms;

    const pickerOptions: any = {
      defaultDate: searchTerm || '',
      altInput: true,
      altFormat: outputFormat,
      dateFormat: inputFormat,
      mode: 'range',
      wrap: true,
      closeOnSelect: true,
      locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
      onChange: (selectedDates: any[] | any, dateStr: string, instance: any) => {
        if (Array.isArray(selectedDates)) {
          const outFormat = mapMomentDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
          const selectedDateRanges = selectedDates.map(date => moment(date).format(outFormat));
          this._currentValue = selectedDateRanges.join('..');
        } else {
          this._currentValue = dateStr;
        }

        // when using the time picker, we can simulate a keyup event to avoid multiple backend request
        // since backend request are only executed after user start typing, changing the time should be treated the same way
        if (pickerOptions.enableTime) {
          this.onTriggerEvent(new CustomEvent('keyup'));
        } else {
          this.onTriggerEvent(undefined);
        }
      }
    };

    // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
    if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
      pickerOptions.enableTime = true;
    }

    // merge options with optional user's custom options
    this._flatpickrOptions = { ...pickerOptions, ...this.columnFilter.filterOptions };

    let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }
    const $filterInputElm: any = $(`<div class="flatpickr"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
    this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(this._flatpickrOptions) : Flatpickr($filterInputElm, this._flatpickrOptions);
    return $filterInputElm;
  }

  /**
   * Create the DOM element
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const fieldId = this.columnDef && this.columnDef.id;
    const $headerElm = this.grid.getHeaderRowColumn(fieldId);
    $($headerElm).empty();

    // create the DOM Select dropdown for the Operator
    this.$filterInputElm = this.buildDatePickerInput(searchTerm);

    /* the DOM element final structure will be
      <div class=flatpickr>
        <input type="text" class="form-control" data-input>
      </div>
    */

    // create the DOM element & add an ID and filter class
    this.$filterInputElm.attr('id', `filter-${fieldId}`);
    this.$filterInputElm.data('columnId', fieldId);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      this.$filterInputElm.addClass('filled');
      this._currentValue = searchTerm as string;
    }

    // append the new DOM element to the header row
    if (this.$filterInputElm && typeof this.$filterInputElm.appendTo === 'function') {
      this.$filterInputElm.appendTo($headerElm);
    }

    return this.$filterInputElm;
  }

  private loadFlatpickrLocale(locale: string) {
    // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
    if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
      return this.gridOptions.params.flapickrLocale;
    } else if (locale !== 'en') {
      const localeDefault: any = require(`flatpickr/dist/l10n/${locale}.js`).default;
      return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
    }
    return 'en';
  }

  private onTriggerEvent(e: Event | undefined) {
    if (this._clearFilterTriggered) {
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
      this.$filterElm.removeClass('filled');
    } else {
      (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: this._operator || '', shouldTriggerQuery: this._shouldTriggerQuery });
    }
    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }

  private hide() {
    if (this.flatInstance && typeof this.flatInstance.close === 'function') {
      this.flatInstance.close();
    }
  }

  private show() {
    if (this.flatInstance && typeof this.flatInstance.open === 'function') {
      this.flatInstance.open();
    }
  }
}
