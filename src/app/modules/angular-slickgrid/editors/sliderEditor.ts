import { Constants } from '../constants';
import { Column, Editor, EditorArguments, EditorValidator, EditorValidatorOutput, ColumnEditor } from './../models/index';
import { getDescendantProperty, setDeepValue } from '../services/utilities';

// using external non-typed js libraries
declare var $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class SliderEditor implements Editor {
  private _elementRangeInputId: string;
  private _elementRangeOutputId: string;
  private _$editorElm: any;
  private _$input: any;
  $sliderNumber: any;
  defaultValue: any;
  originalValue: any;

  /** SlickGrid Grid object */
  grid: any;

  constructor(private args: EditorArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column | undefined {
    return this.args && this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Editor DOM Element */
  get editorDomElement(): any {
    return this._$input;
  }

  get hasAutoCommitEdit() {
    return this.grid && this.grid.getOptions && this.grid.getOptions().autoCommitEdit;
  }

  /** Getter for the Editor Generic Params */
  private get editorParams(): any {
    return this.columnEditor.params || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const container = this.args && this.args.container;

    // define the input & slider number IDs
    const itemId = this.args && this.args.item && this.args.item.id;
    this._elementRangeInputId = `rangeInput_${this.columnDef.field}_${itemId}`;
    this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}_${itemId}`;

    // create HTML string template
    const editorTemplate = this.buildTemplateHtmlString();
    this._$editorElm = $(editorTemplate);
    this._$input = this._$editorElm.children('input');
    this.$sliderNumber = this._$editorElm.children('div.input-group-addon.input-group-append').children();
    this.focus();

    // watch on change event
    this._$editorElm
      .appendTo(container)
      .on('mouseup', () => this.save());

    // if user chose to display the slider number on the right side, then update it every time it changes
    // we need to use both "input" and "change" event to be all cross-browser
    if (!this.editorParams.hideSliderNumber) {
      this._$editorElm.on('input change', (event: KeyboardEvent & { target: HTMLInputElement }) => {
        const value = event && event.target && event.target.value || '';
        if (value) {
          document.getElementById(this._elementRangeOutputId).innerHTML = event.target.value;
        }
      });
    }
  }

  cancel() {
    this._$input.val(this.originalValue);
    this.args.cancelChanges();
  }

  destroy() {
    this._$editorElm.off('input change mouseup').remove();
  }

  focus() {
    this._$editorElm.focus();
  }

  getValue(): string {
    return this._$input.val() || '';
  }

  setValue(value: number | string) {
    this._$input.val(value);
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    const isComplexObject = fieldName.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

    const validation = this.validate(state);
    const newValue = (validation && validation.valid) ? state : '';

    // set the new value to the item datacontext
    if (isComplexObject) {
      setDeepValue(item, fieldName, newValue);
    } else {
      item[fieldName] = newValue;
    }
  }

  isValueChanged() {
    const elmValue = this._$input.val();
    return (!(elmValue === '' && this.originalValue === undefined)) && (+elmValue !== this.originalValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      let value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];
      if (value === '' || value === null || value === undefined) {
        value = this.defaultValue; // load default value when item doesn't have any value
      }
      this.originalValue = +value;
      this._$input.val(value);
      this.$sliderNumber.html(value);
    }
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid && this.isValueChanged()) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  serializeValue() {
    const elmValue: string = this._$input.val();
    return elmValue !== '' ? parseInt(elmValue, 10) : this.originalValue;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this._$input && this._$input.val && this._$input.val();
    const isRequired = this.columnEditor.required;
    const minValue = this.columnEditor.minValue;
    const maxValue = this.columnEditor.maxValue;
    const errorMsg = this.columnEditor.errorMessage;
    const mapValidation = {
      '{{minValue}}': minValue,
      '{{maxValue}}': maxValue
    };

    if (this.validator) {
      return this.validator(elmValue, this.args);
    } else if (isRequired && elmValue === '') {
      return {
        valid: false,
        msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
      };
    } else if (minValue !== undefined && maxValue !== undefined && elmValue !== null && (elmValue < minValue || elmValue > maxValue)) {
      // when decimal value is bigger than 0, we only accept the decimal values as that value set
      // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
      return {
        valid: false,
        msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => {
          return mapValidation[matched];
        })
      };
    }

    return {
      valid: true,
      msg: null
    };
  }

  //
  // private functions
  // ------------------

  /**
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString() {
    const fieldId = this.columnDef && this.columnDef.id;
    const title = this.columnEditor && this.columnEditor.title || '';
    const minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
    const maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
    const defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
    const step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
    this.defaultValue = defaultValue;

    if (this.editorParams.hideSliderNumber) {
      return `
      <div class="slider-container slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}" title="${title}"
          defaultValue="${defaultValue}" value="${defaultValue}"
          min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
      </div>`;
    }

    return `
      <div class="input-group slider-container slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}" title="${title}"
          defaultValue="${defaultValue}" value="${defaultValue}"
          min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
  }
}
