import { Constants } from './../constants';
import { Column, ColumnEditor, Editor, EditorArguments, EditorValidator, EditorValidatorOutput, KeyCode } from './../models/index';
import { getDescendantProperty, setDeepValue } from '../services/utilities';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class IntegerEditor implements Editor {
  private _lastInputEvent: KeyboardEvent;
  private _$input: any;
  originalValue: number | string;

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
    return this.args && this.grid && this.grid.getOptions && this.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init() {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';

    this._$input = $(`<input type="number" role="presentation" autocomplete="off" class="editor-text editor-${columnId}" placeholder="${placeholder}" title="${title}" />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (event: KeyboardEvent) => {
        this._lastInputEvent = event;
        if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
          event.stopImmediatePropagation();
        }
      });

    // the lib does not get the focus out event for some reason
    // so register it here
    if (this.hasAutoCommitEdit) {
      this._$input.on('focusout', () => this.save());
    }

    setTimeout(() => this.focus(), 50);
  }

  destroy() {
    this._$input.off('keydown.nav focusout').remove();
  }

  focus() {
    this._$input.focus();
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

    // validate the value before applying it (if not valid we'll set an empty string)
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
    const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(elmValue === '' && this.originalValue === null)) && (elmValue !== this.originalValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];
      this.originalValue = (isNaN(value) || value === null || value === undefined) ? value : `${value}`;
      this._$input.val(this.originalValue);
      this._$input.select();
    }
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid && this.isValueChanged()) {
      if (this.hasAutoCommitEdit) {
        this.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  serializeValue() {
    const elmValue = this._$input.val();
    if (elmValue === '' || isNaN(elmValue)) {
      return elmValue;
    }
    const output = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
    return isNaN(output) ? elmValue : output;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this.getValue();
    let intNumber = !isNaN(elmValue as number) ? parseInt(elmValue, 10) : null;
    if (isNaN(intNumber)) {
      intNumber = null;
    }
    const errorMsg = this.columnEditor.errorMessage;
    const isRequired = this.columnEditor.required;
    const minValue = this.columnEditor.minValue;
    const maxValue = this.columnEditor.maxValue;
    const mapValidation = {
      '{{minValue}}': minValue,
      '{{maxValue}}': maxValue
    };
    let isValid = true;
    let outputMsg = '';

    if (this.validator) {
      return this.validator(elmValue, this.args);
    } else if (isRequired && elmValue === '') {
      isValid = false;
      outputMsg = errorMsg || Constants.VALIDATION_REQUIRED_FIELD;
    } else if (elmValue && (isNaN(elmValue as number) || !/^[+-]?\d+$/.test(elmValue))) {
      isValid = false;
      outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER;
    } else if (minValue !== undefined && maxValue !== undefined && intNumber !== null && (intNumber < minValue || intNumber > maxValue)) {
      // MIN & MAX Values provided
      // when decimal value is bigger than 0, we only accept the decimal values as that value set
      // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
      isValid = false;
      outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, (matched) => mapValidation[matched]);
    } else if (minValue !== undefined && intNumber !== null && intNumber <= minValue) {
      // MIN VALUE ONLY
      // when decimal value is bigger than 0, we only accept the decimal values as that value set
      // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
      isValid = false;
      outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_MIN.replace(/{{minValue}}/gi, (matched) => mapValidation[matched]);
    } else if (maxValue !== undefined && intNumber !== null && intNumber >= maxValue) {
      // MAX VALUE ONLY
      // when decimal value is bigger than 0, we only accept the decimal values as that value set
      // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
      isValid = false;
      outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_MAX.replace(/{{maxValue}}/gi, (matched) => mapValidation[matched]);
    }

    return {
      valid: isValid,
      msg: outputMsg
    };
  }
}
