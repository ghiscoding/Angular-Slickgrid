import { Column, Editor, EditorArguments, EditorValidator, EditorValidatorOutput, ColumnEditor } from './../models/index';
import { getDescendantProperty, setDeepValue } from '../services/utilities';
import { sliderValidator } from '../editorValidators/sliderValidator';

// using external non-typed js libraries
declare const $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class SliderEditor implements Editor {
  private _defaultValue = 0;
  private _elementRangeInputId: string;
  private _elementRangeOutputId: string;
  private _$editorElm: any;
  private _$input: any;
  $sliderNumber: any;
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
  get columnDef(): Column {
    return this.args.column;
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
    this._elementRangeInputId = `rangeInput_${this.columnDef.id}_${itemId}`;
    this._elementRangeOutputId = `rangeOutput_${this.columnDef.id}_${itemId}`;

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
      this._$editorElm.on('input change', (event: JQuery.Event & { target: HTMLInputElement }) => {
        const value = event && event.target && event.target.value || '';
        if (value) {
          const elements = document.getElementsByClassName(this._elementRangeOutputId);
          if (elements.length) {
            elements[0].innerHTML = event.target.value;
          }
        }
      });
    }
  }

  cancel() {
    this._$input.val(this.originalValue);
    this.args.cancelChanges();
  }

  destroy() {
    if (this._$editorElm) {
      this._$editorElm.off('input change mouseup touchend').remove();
      this._$editorElm = null;
    }
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
    const isComplexObject = fieldName && fieldName.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

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

    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName && fieldName.indexOf('.') > 0;
      let value = (isComplexObject) ? getDescendantProperty(item, fieldName) : (item.hasOwnProperty(fieldName) ? item[fieldName] : this._defaultValue);

      if (value === '' || value === null || value === undefined) {
        value = this._defaultValue; // load default value when item doesn't have any value
      }
      this.originalValue = +value;
      this._$input.val(value);
      this.$sliderNumber.html(value);
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
    const elmValue: string = this._$input.val();
    return elmValue !== '' ? parseInt(elmValue, 10) : this.originalValue;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this._$input && this._$input.val();
    return sliderValidator(elmValue, {
      editorArgs: this.args,
      errorMessage: this.columnEditor.errorMessage,
      minValue: this.columnEditor.minValue,
      maxValue: this.columnEditor.maxValue,
      required: this.columnEditor.required,
      validator: this.validator,
    });
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
    this._defaultValue = defaultValue;

    if (this.editorParams.hideSliderNumber) {
      return `
      <div class="slider-container slider-editor">
        <input type="range" name="${this._elementRangeInputId}" title="${title}"
          defaultValue="${defaultValue}" value="${defaultValue}"
          min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range ${this._elementRangeInputId}" />
      </div>`;
    }

    return `
      <div class="input-group slider-container slider-editor">
        <input type="range" name="${this._elementRangeInputId}" title="${title}"
          defaultValue="${defaultValue}" value="${defaultValue}"
          min="${minValue}" max="${maxValue}" step="${step}"
          class="form-control slider-editor-input editor-${fieldId} range ${this._elementRangeInputId}" />
        <div class="input-group-addon input-group-append slider-value"><span class="input-group-text ${this._elementRangeOutputId}">${defaultValue}</span></div>
      </div>`;
  }
}
