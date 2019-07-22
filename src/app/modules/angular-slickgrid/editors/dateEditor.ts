import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput, FieldType, GridOption, KeyCode } from './../models/index';
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
  private _$inputWithData: any;
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
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Get Flatpickr options passed to the editor by the user */
  get editorOptions(): any {
    return this.columnEditor.editorOptions || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    if (this.args && this.args.column) {
      const columnId = this.columnDef && this.columnDef.id;
      const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
      const title = this.columnEditor && this.columnEditor.title || '';
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
        altInputClass: 'flatpickr-alt-input',
        altFormat: inputFormat,
        dateFormat: outputFormat,
        closeOnSelect: false,
        locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
        onChange: (selectedDates: any[] | any, dateStr: string, instance: any) => {
          this.save();
        },
      };

      // merge options with optional user's custom options
      const pickerMergedOptions = { ...pickerOptions, ...this.editorOptions };
      const inputCssClasses = `.editor-text.editor-${columnId}.flatpickr`;

      this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="${inputCssClasses.replace(/\./g, ' ')}" placeholder="${placeholder}" title="${title}" />`);
      this.$input.appendTo(this.args.container);
      this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerMergedOptions) : null;

      // when we're using an alternate input to display data, we'll consider this input as the one to do the focus later on
      // else just use the top one
      this._$inputWithData = (pickerMergedOptions && pickerMergedOptions.altInput) ? $(`${inputCssClasses}.flatpickr-alt-input`) : this.$input;
    }
  }

  getCurrentLocale(columnDef: Column, gridOptions: GridOption) {
    const options = gridOptions || columnDef.params || {};
    if (options && options.i18n instanceof TranslateService) {
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
    this.$input.remove();
    if (this._$inputWithData && typeof this._$inputWithData.remove === 'function') {
      this._$inputWithData.remove();
    }
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
    if (this._$inputWithData && this._$inputWithData.focus) {
      this._$inputWithData.focus().select();
    } else if (this.$input && this.$input.focus) {
      this.$input.focus().select();
    }
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
    const fieldName = this.columnDef && this.columnDef.field;

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
      this.defaultDate = item[fieldNameFromComplexObject || fieldName];
      this.flatInstance.setDate(item[this.args.column.field]);
      this.focus();
    }
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
    const fieldName = this.columnDef && this.columnDef.field;
    const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
    const newValue = state ? moment(state, outputFormat).toDate() : '';
    const validation = this.validate(newValue);
    item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
    const errorMsg = this.columnEditor.errorMessage;

    if (this.validator) {
      return this.validator(elmValue, this.args);
    }

    // by default the editor is almost always valid (except when it's required but not provided)
    if (isRequired && elmValue === '') {
      return {
        valid: false,
        msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
      };
    }

    return {
      valid: true,
      msg: null
    };
  }
}
