import { Constants } from '../constants';
import { Column, Editor, EditorValidator, EditorValidatorOutput } from './../models/index';

// using external non-typed js libraries
declare var $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class SliderEditor implements Editor {
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
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
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
    const container = this.args.container;

    // create HTML string template
    const editorTemplate = this.buildTemplateHtmlString();
    this.$editorElm = $(editorTemplate);
    this.$input = this.$editorElm.children('input');
    this.$sliderNumber = this.$editorElm.children('span.input-group-addon');

    // watch on change event
    this.$editorElm
      .appendTo(this.args.container)
      .on('change', (event: Event) => this.save());
  }

  destroy() {
    this.$editorElm.remove();
  }

  focus() {
    this.$editorElm.focus();
  }

  save() {
    this.args.commitChanges();
  }

  cancel() {
    this.$input.val(this.defaultValue);
    this.args.cancelChanges();
  }

  loadValue(item: any) {
    // this.$input.val(this.defaultValue = item[this.columnDef.field]);
    this.defaultValue = item[this.columnDef.field];
    this.$input.val(this.defaultValue);
    this.$input[0].defaultValue = this.defaultValue;
    this.$sliderNumber.html(this.defaultValue);
  }

  serializeValue() {
    return parseInt(this.$input.val() as string, 10) || 0;
  }

  applyValue(item: any, state: any) {
    item[this.columnDef.field] = state;
  }

  isValueChanged() {
    const elmValue = this.$input.val();
    console.log(elmValue);
    return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
  }

  validate(): EditorValidatorOutput {
    const elmValue = this.$input.val();
    const minValue = this.columnEditor.minValue;
    const maxValue = this.columnEditor.maxValue;
    const errorMsg = this.columnEditor.errorMessage;
    const mapValidation = {
      '{{minValue}}': minValue,
      '{{maxValue}}': maxValue
    };

    if (this.validator) {
      const validationResults = this.validator(elmValue);
      if (!validationResults.valid) {
        return validationResults;
      }
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
    const minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
    const maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
    const defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
    const step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
    const itemId = this.args && this.args.item && this.args.item.id;

    if (this.editorParams.hideSliderNumber) {
      return `
      <div class="slider-editor">
        <input type="range" id="rangeInput_${this.columnDef.field}_${itemId}"
          name="rangeInput_${this.columnDef.field}_${itemId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input range" />
      </div>`;
    }

    return `
      <div class="input-group slider-editor">
        <input type="range" id="rangeInput_${this.columnDef.field}_${itemId}"
          name="rangeInput_${this.columnDef.field}_${itemId}"
          defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input range"
          onmousemove="$('#rangeOuput_${this.columnDef.field}_${itemId}').html(rangeInput_${this.columnDef.field}_${itemId}.value)" />
        <span class="input-group-addon slider-value" id="rangeOuput_${this.columnDef.field}_${itemId}">${defaultValue}</span>
      </div>`;
  }
}
