import { mapFlatpickrDateFormatWithFieldType } from './../services/utilities';
import { Column, Editor, FieldType, GridOption } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import $ from 'jquery';

declare function require(name: string);
require('flatpickr');

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export class DateEditor implements Editor {
  $input: any;
  flatInstance: any;
  defaultDate: string;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    const gridOptions = this.args.grid.getOptions() as GridOption;
    this.defaultDate = this.args.item[this.args.column.field] || null;
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.args.column.outputType || FieldType.dateUtc);
    let currentLocale = this.getCurrentLocale(this.args.column, gridOptions);
    if (currentLocale.length > 2) {
      currentLocale = currentLocale.substring(0, 2);
    }

    const pickerOptions: any = {
      defaultDate: this.defaultDate,
      altInput: true,
      altFormat: inputFormat,
      dateFormat: outputFormat,
      closeOnSelect: false,
      locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
      onChange: (selectedDates, dateStr, instance) => {
        this.save();
      },
    };


    this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="editor-text flatpickr" />`);
    this.$input.appendTo(this.args.container);
    this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
    this.show();
  }

  getCurrentLocale(columnDef: Column, gridOptions: GridOption) {
    const params = gridOptions.params || columnDef.params || {};
    if (params.i18n && params.i18n instanceof TranslateService) {
      return params.i18n.currentLang;
    }

    return 'en';
  }

  loadFlatpickrLocale(locale: string) {
    // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
    if (locale !== 'en') {
      const localeDefault: any = require(`flatpickr/dist/l10n/${locale}.js`).default;
      return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
    }
    return 'en';
  }

  destroy() {
    this.hide();
    // this.flatInstance.destroy();
    this.$input.remove();
  }

  show() {
    if (this.flatInstance && typeof this.flatInstance.open === 'function') {
      this.flatInstance.open();
    }
  }

  hide() {
    if (this.flatInstance && typeof this.flatInstance.close === 'function') {
      this.flatInstance.close();
    }
  }

  focus() {
    this.$input.focus();
  }

  save() {
    this.args.commitChanges();
  }

  loadValue(item: any) {
    this.defaultDate = item[this.args.column.field];
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
  }

  validate() {
    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.$input.val(), this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  }
}
