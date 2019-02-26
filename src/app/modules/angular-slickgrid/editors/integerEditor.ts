import { Constants } from './../constants';
import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput, KeyCode } from './../models/index';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class IntegerEditor implements Editor {
  private _lastInputEvent: KeyboardEvent;
  $input: any;
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
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  get hasAutoCommitEdit() {
    return this.args.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';

    this.$input = $(`<input type="number" class="editor-text editor-${columnId}" placeholder="${placeholder}" />`)
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
      this.$input.on('focusout', () => this.save());
    }

    setTimeout(() => {
      this.$input.focus().select();
    }, 50);
  }

  destroy() {
    this.$input.off('keydown.nav focusout').remove();
  }

  focus() {
    this.$input.focus();
  }

  getColumnEditor() {
    return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
  }

  loadValue(item: any) {
    this.defaultValue = parseInt(item[this.args.column.field], 10);
    this.$input.val(this.defaultValue);
    this.$input[0].defaultValue = this.defaultValue;
    this.$input.select();
  }

  serializeValue() {
    const elmValue = this.$input.val();
    if (elmValue === '' || isNaN(elmValue)) {
      return elmValue;
    }
    return parseInt(elmValue, 10) || 0;
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    const elmValue = this.$input.val();
    const value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
    const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;

    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(value === '' && this.defaultValue === null && lastEvent !== KeyCode.ENTER)) && (value !== this.defaultValue);
  }

  save() {
    if (this.hasAutoCommitEdit) {
      this.args.grid.getEditorLock().commitCurrentEdit();
    } else {
      this.args.commitChanges();
    }
  }

  validate(): EditorValidatorOutput {
    const elmValue = this.$input.val();
    const intNumber = !isNaN(elmValue as number) ? parseInt(elmValue, 10) : null;
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
    } else if (isNaN(elmValue as number) || !/^[+-]?\d+$/.test(elmValue)) {
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
