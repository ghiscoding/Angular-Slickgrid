import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { Column, Editor, EditorValidator, EditorValidatorOutput, FieldType, GridOption } from './../models/index';
import { TranslateService } from '@ngx-translate/core';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

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

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    if (this.args && this.args.column) {
      const columnId = this.columnDef && this.columnDef.id;
      const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
      const gridOptions = this.args.grid.getOptions() as GridOption;
      this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
      const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
      const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
      let currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
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
        onChange: (selectedDates: any[] | any, dateStr: string, instance: any) => {
          this.save();
        },
      };

      this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="editor-text editor-${columnId} flatpickr" placeholder="${placeholder}" />`);
      this.$input.appendTo(this.args.container);
      this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerOptions) : null;
      this.show();
    }
  }

  getCurrentLocale(columnDef: Column, gridOptions: GridOption) {
    const options = gridOptions || columnDef.params || {};
    if (options.i18n && options.i18n instanceof TranslateService) {
      return options.i18n.currentLang;
    }

    return 'en';
  }

  loadFlatpickrLocale(locale: string) {
    // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
    const gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
    if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
      return gridOptions.params.flapickrLocale;
    } else if (locale !== 'en') {
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
    // autocommit will not focus the next editor
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.args.grid.getOptions().autoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  getColumnEditor() {
    return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
  }

  loadValue(item: any) {
    this.defaultDate = item[this.args.column.field];
    this.flatInstance.setDate(item[this.args.column.field]);
  }

  serializeValue() {
    const domValue: string = this.$input.val();

    if (!domValue) {
      return '';
    }

    const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
    const value = moment(domValue).format(outputFormat);

    return value;
  }

  applyValue(item: any, state: any) {
    if (!state) {
      return;
    }

    const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
    item[this.args.column.field] = moment(state, outputFormat).toDate();
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const value = this.$input && this.$input.val && this.$input.val();
      const validationResults = this.validator(value, this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    // by default the editor is always valid
    // if user want it to be a required checkbox, he would have to provide his own validator
    return {
      valid: true,
      msg: null
    };
  }
}
