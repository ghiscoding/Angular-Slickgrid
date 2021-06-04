import * as flatpickr_ from 'flatpickr';
import * as moment_ from 'moment-mini';
import { BaseOptions as FlatpickrBaseOptions } from 'flatpickr/dist/types/options';
import { Instance as FlatpickrInstance, FlatpickrFn } from 'flatpickr/dist/types/instance';
const flatpickr: FlatpickrFn = (flatpickr_ && flatpickr_['default'] || flatpickr_) as any; // patch for rollup
const moment = (moment_ as any)['default'] || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
import { TranslateService } from '@ngx-translate/core';

import { Constants } from './../constants';
import {
  Column,
  ColumnEditor,
  Editor,
  EditorArguments,
  EditorValidator,
  EditorValidatorOutput,
  FieldType,
  FlatpickrOption,
  GridOption,
  SlickGrid,
} from './../models/index';
import {
  destroyObjectDomElementProps,
  emptyElement,
  getDescendantProperty,
  mapFlatpickrDateFormatWithFieldType,
  mapMomentDateFormatWithFieldType,
  setDeepValue,
} from './../services/utilities';
import { BindingEventService } from '../services/bindingEvent.service';

/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export class DateEditor implements Editor {
  protected _bindEventService: BindingEventService;
  protected _closeButtonElm!: HTMLButtonElement;
  protected _editorInputGroupElm!: HTMLDivElement;
  protected _inputElm!: HTMLInputElement;
  protected _inputWithDataElm!: HTMLInputElement | null;
  protected _isValueTouched = false;
  protected _lastTriggeredByClearDate = false;
  protected _originalDate?: string;
  protected _pickerMergedOptions!: FlatpickrOption;

  flatInstance!: FlatpickrInstance;
  defaultDate?: string;

  /** SlickGrid Grid object */
  grid: SlickGrid;

  /** Grid options */
  gridOptions: GridOption;

  /** The translate library */
  protected _translate?: TranslateService;

  constructor(protected readonly args: EditorArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.gridOptions = (this.grid.getOptions() || {}) as GridOption;
    const options = this.gridOptions || this.args.column.params || {};
    if (options?.i18n instanceof TranslateService) {
      this._translate = options.i18n;
    }
    this._bindEventService = new BindingEventService();
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Getter for the Editor DOM Element */
  get editorDomElement(): HTMLInputElement {
    return this._inputElm;
  }

  /** Get Flatpickr options passed to the editor by the user */
  get editorOptions(): FlatpickrOption {
    return this.columnEditor.editorOptions || {};
  }

  get hasAutoCommitEdit(): boolean {
    return this.gridOptions.autoCommitEdit ?? false;
  }

  get pickerOptions(): FlatpickrOption {
    return this._pickerMergedOptions;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor?.validator ?? this.columnDef?.validator;
  }

  init(): void {
    if (this.args && this.columnDef) {
      const columnId = this.columnDef?.id ?? '';
      const placeholder = this.columnEditor?.placeholder ?? '';
      const title = this.columnEditor && this.columnEditor.title || '';
      this.defaultDate = (this.args.item) ? this.args.item[this.columnDef.field] : null;
      const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnEditor.type || this.columnDef.type || FieldType.dateUtc);
      const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnEditor.type || this.columnDef.type || FieldType.dateUtc);
      let currentLocale = this._translate && this._translate.currentLang || this.gridOptions.locale || 'en';
      if (currentLocale && currentLocale.length > 2) {
        currentLocale = currentLocale.substring(0, 2);
      }

      const pickerOptions: FlatpickrOption = {
        defaultDate: this.defaultDate as string,
        altInput: true,
        altFormat: outputFormat,
        dateFormat: inputFormat,
        closeOnSelect: true,
        wrap: true,
        locale: currentLocale,
        onChange: () => this.handleOnDateChange(),
        errorHandler: (error: Error) => {
          if (error.toString().includes('invalid locale')) {
            console.warn(`[Angular-Slickgrid] Flatpickr missing locale imports (${currentLocale}), will revert to English as the default locale.
          See Flatpickr Localization for more info, for example if we want to use French, then we can import it with:  import 'flatpickr/dist/l10n/fr';`);
          }
          // for any other error do nothing
          // Flatpickr is a little too sensitive and will throw an error when provided date is lower than minDate so just disregard the error completely
        }
      };

      // merge options with optional user's custom options
      this._pickerMergedOptions = { ...pickerOptions, ...(this.editorOptions as FlatpickrOption) };
      const inputCssClasses = `.editor-text.editor-${columnId}.form-control`;
      if (this._pickerMergedOptions.altInput) {
        this._pickerMergedOptions.altInputClass = 'flatpickr-alt-input form-control';
      }

      this._editorInputGroupElm = document.createElement('div');
      this._editorInputGroupElm.className = 'flatpickr input-group';

      const closeButtonGroupElm = document.createElement('span');
      closeButtonGroupElm.className = 'input-group-btn input-group-append';
      closeButtonGroupElm.dataset.clear = '';

      this._closeButtonElm = document.createElement('button');
      this._closeButtonElm.type = 'button';
      this._closeButtonElm.className = 'btn btn-default icon-clear';

      this._inputElm = document.createElement('input');
      this._inputElm.dataset.input = '';
      this._inputElm.dataset.defaultdate = this.defaultDate;
      this._inputElm.className = inputCssClasses.replace(/\./g, ' ');
      this._inputElm.placeholder = placeholder;
      this._inputElm.title = title;

      this._editorInputGroupElm.appendChild(this._inputElm);

      // show clear date button (unless user specifically doesn't want it)
      if (!this.columnEditor?.params?.hideClearButton) {
        closeButtonGroupElm.appendChild(this._closeButtonElm);
        this._editorInputGroupElm.appendChild(closeButtonGroupElm);
        this._bindEventService.bind(this._closeButtonElm, 'click', () => this._lastTriggeredByClearDate = true);
      }

      this.args.container.appendChild(this._editorInputGroupElm);
      this.flatInstance = flatpickr(this._editorInputGroupElm, this._pickerMergedOptions as unknown as Partial<FlatpickrBaseOptions>);

      // when we're using an alternate input to display data, we'll consider this input as the one to do the focus later on
      // else just use the top one
      this._inputWithDataElm = (this._pickerMergedOptions?.altInput) ? document.querySelector<HTMLInputElement>(`${inputCssClasses}.flatpickr-alt-input`) : this._inputElm;

      setTimeout(() => {
        this.show();
        this.focus();
      }, 50);
    }
  }

  destroy() {
    this.hide();
    this._bindEventService.unbindAll();

    if (this.flatInstance?.destroy) {
      this.flatInstance.destroy();
      if (this.flatInstance?.element) {
        setTimeout(() => destroyObjectDomElementProps(this.flatInstance));
      }
    }
    emptyElement(this._editorInputGroupElm);
    emptyElement(this._inputWithDataElm);
    emptyElement(this._inputElm);
    this._editorInputGroupElm?.remove?.();
    this._inputWithDataElm?.remove?.();
    this._inputElm?.remove?.();
  }

  focus() {
    if (this._inputElm?.focus) {
      this._inputElm.focus();
    }
    if (this._inputWithDataElm?.focus) {
      this._inputWithDataElm.focus();
      this._inputWithDataElm.select();
    }
  }

  hide() {
    if (this.flatInstance && typeof this.flatInstance.close === 'function') {
      this.flatInstance.close();
    }
  }

  show() {
    if (this.flatInstance && typeof this.flatInstance.open === 'function' && this.flatInstance._input) {
      this.flatInstance.open();
    }
  }

  getValue(): string {
    return this._inputElm.value;
  }

  setValue(val: string) {
    this.flatInstance.setDate(val);
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    if (fieldName !== undefined) {
      const outputTypeFormat = mapMomentDateFormatWithFieldType((this.columnDef && (this.columnDef.outputType || this.columnEditor.type || this.columnDef.type)) || FieldType.dateUtc);
      const saveTypeFormat = mapMomentDateFormatWithFieldType((this.columnDef && (this.columnDef.saveOutputType || this.columnDef.outputType || this.columnEditor.type || this.columnDef.type)) || FieldType.dateUtc);
      const isComplexObject = fieldName?.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

      // validate the value before applying it (if not valid we'll set an empty string)
      const validation = this.validate(state);
      const newValue = (state && validation && validation.valid) ? moment(state, outputTypeFormat).format(saveTypeFormat) : '';

      // set the new value to the item datacontext
      if (isComplexObject) {
        // when it's a complex object, user could override the object path (where the editable object is located)
        // else we use the path provided in the Field Column Definition
        const objectPath = this.columnEditor?.complexObjectPath ?? fieldName ?? '';
        setDeepValue(item, objectPath, newValue);
      } else {
        item[fieldName] = newValue;
      }
    }
  }

  isValueChanged(): boolean {
    const elmValue = this._inputElm.value;
    const inputFormat = mapMomentDateFormatWithFieldType(this.columnEditor.type || this.columnDef?.type || FieldType.dateIso);
    const outputTypeFormat = mapMomentDateFormatWithFieldType((this.columnDef && (this.columnDef.outputType || this.columnEditor.type || this.columnDef.type)) || FieldType.dateUtc);
    const elmDateStr = elmValue ? moment(elmValue, inputFormat, false).format(outputTypeFormat) : '';
    const orgDateStr = this._originalDate ? moment(this._originalDate, inputFormat, false).format(outputTypeFormat) : '';
    if (elmDateStr === 'Invalid date' || orgDateStr === 'Invalid date') {
      return false;
    }
    const isChanged = this._lastTriggeredByClearDate || (!(elmDateStr === '' && orgDateStr === '')) && (elmDateStr !== orgDateStr);

    return isChanged;
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName?.indexOf('.') > 0;
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];

      this._originalDate = value;
      this.flatInstance.setDate(value);
    }
  }

  save() {
    const validation = this.validate();
    const isValid = (validation && validation.valid) || false;

    if (this.hasAutoCommitEdit && isValid) {
      // do not use args.commitChanges() as this sets the focus to the next row.
      // also the select list will stay shown when clicking off the grid
      this.grid.getEditorLock().commitCurrentEdit();
    } else {
      this.args.commitChanges();
    }
  }

  serializeValue() {
    const domValue: string = this._inputElm.value;

    if (!domValue) {
      return '';
    }

    const inputFormat = mapMomentDateFormatWithFieldType(this.columnEditor.type || this.columnDef?.type || FieldType.dateIso);
    const outputTypeFormat = mapMomentDateFormatWithFieldType((this.columnDef && (this.columnDef.outputType || this.columnEditor.type || this.columnDef.type)) || FieldType.dateIso);
    const value = moment(domValue, inputFormat, false).format(outputTypeFormat);

    return value;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this._inputElm?.value;
    const errorMsg = this.columnEditor.errorMessage;

    if (this.validator) {
      return this.validator(elmValue, this.args);
    }

    // by default the editor is almost always valid (except when it's required but not provided)
    if (isRequired && elmValue === '') {
      return { valid: false, msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD };
    }

    return { valid: true, msg: null };
  }

  //
  // protected functions
  // ------------------

  protected handleOnDateChange() {
    this._isValueTouched = true;

    if (this.args) {
      this.save();
    }
    setTimeout(() => this._lastTriggeredByClearDate = false); // reset flag after a cycle
  }
}