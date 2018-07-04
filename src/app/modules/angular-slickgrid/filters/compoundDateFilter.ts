import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { Column, Filter, FilterArguments, FilterCallback, FieldType, GridOption, OperatorString, OperatorType, SearchTerm } from './../models/index';

// importing Flatpickr works better with a 'require'
declare function require(name: string);
require('flatpickr');

// using external non-typed js libraries
declare var $: any;

@Injectable()
export class CompoundDateFilter implements Filter {
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

  constructor(private translate: TranslateService) { }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  set operator(op: OperatorType | OperatorString) {
    this._operator = op;
  }
  get operator(): OperatorType | OperatorString {
    return this._operator || OperatorType.empty;
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
      this.$selectOperatorElm.change((e: any) => {
        this.onTriggerEvent(e);
      });
    }
  }

  /**
   * Clear the filter value
   */
  clear() {
    if (this.flatInstance && this.$selectOperatorElm) {
      this.$selectOperatorElm.val(0);
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
    if (values && Array.isArray(values)) {
      this.flatInstance.setDate(values[0]);
    }
  }

  //
  // private functions
  // ------------------
  private buildDatePickerInput(searchTerm?: SearchTerm) {
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
    let currentLocale = this.translate.currentLang || 'en';
    if (currentLocale.length > 2) {
      currentLocale = currentLocale.substring(0, 2);
    }

    const pickerOptions: any = {
      defaultDate: searchTerm || '',
      altInput: true,
      altFormat: outputFormat,
      dateFormat: inputFormat,
      wrap: true,
      closeOnSelect: true,
      locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
      onChange: (selectedDates: any[] | any, dateStr: string, instance: any) => {
        this._currentValue = dateStr;

        // when using the time picker, we can simulate a keyup event to avoid multiple backend request
        // since backend request are only executed after user start typing, changing the time should be treated the same way
        if (pickerOptions.enableTime) {
          this.onTriggerEvent(new CustomEvent('keyup'), dateStr === '');
        } else {
          this.onTriggerEvent(undefined, dateStr === '');
        }
      }
    };

    // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
    if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
      pickerOptions.enableTime = true;
    }

    const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    const $filterInputElm: any = $(`<div class="flatpickr"><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
    this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerOptions) : null;
    return $filterInputElm;
  }

  private buildSelectOperatorHtmlString() {
    const optionValues = this.getOptionValues();
    let optionValueString = '';
    optionValues.forEach((option) => {
      optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
    });

    return `<select class="form-control">${optionValueString}</select>`;
  }

  private getOptionValues(): {operator: OperatorString, description: string }[] {
    return [
      { operator: '' as OperatorString, description: '' },
      { operator: '=' as OperatorString, description: '' },
      { operator: '<' as OperatorString, description: '' },
      { operator: '<=' as OperatorString, description: '' },
      { operator: '>' as OperatorString, description: '' },
      { operator: '>=' as OperatorString, description: '' },
      { operator: '<>' as OperatorString, description: '' }
    ];
  }

  /**
   * Create the DOM element
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM Select dropdown for the Operator
    this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
    this.$filterInputElm = this.buildDatePickerInput(searchTerm);
    const $filterContainerElm = $(`<div class="form-group search-filter"></div>`);
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
    $filterContainerElm.attr('id', `filter-${this.columnDef.id}`);
    this.$filterInputElm.data('columnId', this.columnDef.id);

    if (this.operator) {
      this.$selectOperatorElm.val(this.operator);
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      $filterContainerElm.addClass('filled');
      this._currentValue = searchTerm as string;
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterContainerElm;
  }

  private loadFlatpickrLocale(locale: string) {
    // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
    if (locale !== 'en') {
      const localeDefault: any = require(`flatpickr/dist/l10n/${locale}.js`).default;
      return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
    }
    return 'en';
  }

  private onTriggerEvent(e: Event | undefined, clearFilterTriggered?: boolean) {
    if (clearFilterTriggered) {
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: true });
    } else {
      const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
      (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '' });
    }
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
