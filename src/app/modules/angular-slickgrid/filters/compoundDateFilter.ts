import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { mapFlatpickrDateFormatWithFieldType } from '../services/utilities';
import { Column, Filter, FilterArguments, FilterCallback, FieldType, GridOption, OperatorString, OperatorType, SearchTerm } from './../models/index';
import $ from 'jquery';

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
  flatInstance: any;
  grid: any;
  gridOptions: GridOption;
  operator: OperatorType | OperatorString;
  searchTerm: SearchTerm;
  columnDef: Column;
  callback: FilterCallback;

  constructor(private translate: TranslateService) {}

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.operator = args.operator;
    this.searchTerm = args.searchTerm;
    if (this.grid && typeof this.grid.getOptions === 'function') {
      this.gridOptions = this.grid.getOptions();
    }

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    // and initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement();

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
  clear(triggerFilterKeyup = true) {
    if (this.$filterElm) {
      this.$filterElm.val('');
      if (triggerFilterKeyup) {
        this.$filterElm.trigger('keyup');
      }
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
  setValues(values: SearchTerm) {
    if (values) {
      this.flatInstance.setDate(values);
    }
  }

  //
  // private functions
  // ------------------

  private buildDatePickerInput(searchTerm: SearchTerm) {
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || FieldType.dateUtc);
    let currentLocale = this.getCurrentLocale(this.columnDef, this.gridOptions) || '';
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
      onChange: (selectedDates, dateStr, instance) => {
        this._currentValue = dateStr;
        this.onTriggerEvent(undefined);
      },
    };

    // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
    if (outputFormat === 'Z' || outputFormat.includes('h')) {
      pickerOptions.enableTime = true;
    }

    const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    const $filterInputElm = $(`<div class=flatpickr><input type="text" class="form-control" data-input placeholder="${placeholder}"></div>`);
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
      { operator: '', description: '' },
      { operator: '=', description: '' },
      { operator: '<', description: '' },
      { operator: '<=', description: '' },
      { operator: '>', description: '' },
      { operator: '>=', description: '' },
      { operator: '<>', description: '' }
    ];
  }

  /**
   * Create the DOM element
   */
  private createDomElement() {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    const searchTerm = (this.searchTerm || '') as string;
    if (searchTerm) {
      this._currentValue = searchTerm;
    }

    // create the DOM Select dropdown for the Operator
    this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
    this.$filterInputElm = this.buildDatePickerInput(searchTerm);
    const $filterContainerElm = $(`<div class="form-group search-filter"></div>`);
    const $containerInputGroup = $(`<div class="input-group flatpickr"></div>`);
    const $operatorInputGroupAddon = $(`<div class="input-group-addon operator"></div>`);

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon operator">
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
    if (this.searchTerm) {
      $filterContainerElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterContainerElm;
  }

  private getCurrentLocale(columnDef: Column, gridOptions: GridOption) {
    const params = gridOptions.params || columnDef.params || {};
    if (params.i18n && params.i18n instanceof TranslateService) {
      return params.i18n.currentLang;
    }

    return 'en';
  }

  private loadFlatpickrLocale(locale: string) {
    // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
    if (locale !== 'en') {
      const localeDefault: any = require(`flatpickr/dist/l10n/${locale}.js`).default;
      return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
    }
    return 'en';
  }

  private onTriggerEvent(e: Event | undefined) {
    const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
    (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
    if (selectedOperator !== undefined) {
      this.callback(e, { columnDef: this.columnDef, searchTerm: this._currentValue, operator: selectedOperator });
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
