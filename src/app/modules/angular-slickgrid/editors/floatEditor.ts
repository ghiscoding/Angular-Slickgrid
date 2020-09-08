import { Column, ColumnEditor, Editor, EditorArguments, EditorValidator, EditorValidatorOutput, KeyCode } from './../models/index';
import { setDeepValue, getDescendantProperty } from '../services/utilities';
import { floatValidator } from '../editorValidators/floatValidator';

// using external non-typed js libraries
declare const $: any;

const defaultDecimalPlaces = 0;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class FloatEditor implements Editor {
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
    return this.grid && this.grid.getOptions && this.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init() {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';

    this._$input = $(`<input type="number" role="presentation" autocomplete="off" class="editor-text editor-${columnId}" placeholder="${placeholder}" title="${title}" step="${this.getInputDecimalSteps()}" />`)
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
    if (this._$input) {
      this._$input.off('keydown.nav').remove();
    }
  }

  focus() {
    this._$input.focus();
  }

  getDecimalPlaces(): number {
    // returns the number of fixed decimal places or null
    let rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;

    if (rtn === undefined) {
      rtn = defaultDecimalPlaces;
    }
    return (!rtn && rtn !== 0 ? null : rtn);
  }

  getInputDecimalSteps(): string {
    const decimals = this.getDecimalPlaces();
    let zeroString = '';
    for (let i = 1; i < decimals; i++) {
      zeroString += '0';
    }

    if (decimals > 0) {
      return `0.${zeroString}1`;
    }
    return '1';
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

  isValueChanged(): boolean {
    const elmValue = this._$input.val();
    const lastKeyEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastKeyEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(elmValue === '' && (this.originalValue === null || this.originalValue === undefined))) && (elmValue !== this.originalValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;


    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName && fieldName.indexOf('.') > 0;
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];

      this.originalValue = value;
      const decPlaces = this.getDecimalPlaces();
      if (decPlaces !== null && (this.originalValue || this.originalValue === 0) && (+this.originalValue).toFixed) {
        this.originalValue = (+this.originalValue).toFixed(decPlaces);
      }
      this._$input.val(this.originalValue);
      this._$input.select();
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
    const elmValue = this._$input.val();
    if (elmValue === '' || isNaN(elmValue)) {
      return elmValue;
    }

    let rtn = parseFloat(elmValue);
    const decPlaces = this.getDecimalPlaces();
    if (decPlaces !== null && (rtn || rtn === 0) && rtn.toFixed) {
      rtn = parseFloat(rtn.toFixed(decPlaces));
    }

    return rtn;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : (this._$input && this._$input.val && this._$input.val());
    return floatValidator(elmValue, {
      editorArgs: this.args,
      errorMessage: this.columnEditor.errorMessage,
      decimal: this.getDecimalPlaces(),
      minValue: this.columnEditor.minValue,
      maxValue: this.columnEditor.maxValue,
      operatorConditionalType: this.columnEditor.operatorConditionalType,
      required: this.columnEditor.required,
      validator: this.validator,
    });
  }
}
