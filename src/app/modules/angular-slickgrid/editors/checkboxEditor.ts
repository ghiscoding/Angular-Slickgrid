import { Constants } from './../constants';
import { Column, ColumnEditor, Editor, EditorArguments, EditorValidator, EditorValidatorOutput } from './../models/index';
import { getDescendantProperty, parseBoolean, setDeepValue } from '../services/utilities';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CheckboxEditor implements Editor {
  private _$input: any;
  originalValue: boolean;

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
    return this.args.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const fieldId = this.columnDef && this.columnDef.id;
    const title = this.columnEditor && this.columnEditor.title || '';

    this._$input = $(`<input type="checkbox" value="true" class="editor-checkbox editor-${fieldId}" title="${title}" />`);
    this._$input.appendTo(this.args.container);
    this.focus();

    // make the checkbox editor act like a regular checkbox that commit the value on click
    if (this.hasAutoCommitEdit) {
      this._$input.click(() => this.save());
    }
  }

  destroy(): void {
    this._$input.remove();
  }

  focus(): void {
    this._$input.focus();
  }

  getValue() {
    return this._$input.prop('checked');
  }

  setValue(val: boolean | string) {
    const isChecked = val ? true : false;
    this._$input.prop('checked', isChecked);
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
    return (this.serializeValue() !== this.originalValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];
      this.originalValue = value;
      if (this.originalValue) {
        this._$input.prop('checked', true);
      } else {
        this._$input.prop('checked', false);
      }
    }
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid && this.isValueChanged() && this.hasAutoCommitEdit) {
      this.grid.getEditorLock().commitCurrentEdit();
    }
  }

  serializeValue(): boolean {
    return this._$input.prop('checked');
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const isChecked = (inputValue !== undefined) ? inputValue : this._$input && this._$input.prop && this._$input.prop('checked');
    const errorMsg = this.columnEditor.errorMessage;

    if (this.validator) {
      return this.validator(isChecked, this.args);
    }

    // by default the editor is almost always valid (except when it's required but not provided)
    if (isRequired && !isChecked) {
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
