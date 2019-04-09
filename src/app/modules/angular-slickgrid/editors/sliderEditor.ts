import { Constants } from '../constants';
import { Column, Editor, EditorValidator, EditorValidatorOutput, KeyCode, ColumnEditor } from './../models/index';

// using external non-typed js libraries
declare var $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class SliderEditor implements Editor {
  private _lastInputEvent: KeyboardEvent;
  private _elementRangeInputId: string;
  private _elementRangeOutputId: string;
  $editorElm: any;
  $input: any;
  $sliderNumber: any;
  defaultValue: any;

  constructor(private args: any) {
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
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
    this.$editorElm = $(editorTemplate);
    this.$input = this.$editorElm.children('input');
    this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();

    // watch on change event
    this.$editorElm
      .appendTo(container)
      .on('mouseup', () => this.save());

    // if user chose to display the slider number on the right side, then update it every time it changes
    // we need to use both "input" and "change" event to be all cross-browser
    if (!this.editorParams.hideSliderNumber) {
      this.$editorElm.on('input change', (event: KeyboardEvent & { target: HTMLInputElement }) => {
        this._lastInputEvent = event;
        const value = event && event.target && event.target.value || '';
        if (value) {
          document.getElementById(this._elementRangeOutputId).innerHTML = event.target.value;
        }
      });
    }
  }

  destroy() {
    this.$editorElm.off('input change mouseup').remove();
  }

  focus() {
    this.$editorElm.focus();
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.args.grid.getOptions().autoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  cancel() {
    this.$input.val(this.defaultValue);
    this.args.cancelChanges();
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
      this.defaultValue = item[fieldNameFromComplexObject || fieldName];
      this.$input.val(this.defaultValue);
      this.$input[0].defaultValue = this.defaultValue;
      this.$sliderNumber.html(this.defaultValue);
    }
  }

  serializeValue() {
    return parseInt(this.$input.val() as string, 10) || 0;
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
    item[fieldNameFromComplexObject || fieldName] = state;
  }

  isValueChanged() {
    const elmValue = this.$input.val();
    const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
  }

  validate(): EditorValidatorOutput {
    const elmValue = this.$input.val();
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
    } else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
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

    if (this.editorParams.hideSliderNumber) {
      return `
      <div class="slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          title="${title}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
      </div>`;
    }

    return `
      <div class="input-group slider-editor">
        <input type="range" id="${this._elementRangeInputId}"
          name="${this._elementRangeInputId}"
          title="${title}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
  }
}
