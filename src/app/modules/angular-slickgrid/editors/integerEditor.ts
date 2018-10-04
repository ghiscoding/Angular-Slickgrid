import { Constants } from './../constants';
import { Column, Editor, EditorValidator, EditorValidatorOutput, KeyCode } from './../models/index';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class IntegerEditor implements Editor {
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
  get columnEditor(): any {
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
    this.$input = $(`<input type="number" class='editor-text' />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (e) => {
        if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
          e.stopImmediatePropagation();
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
    this.$input.remove();
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
    return parseInt(this.$input.val() as string, 10) || 0;
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    const elmValue = this.$input.val();
    const value = isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
    return (!(value === '' && this.defaultValue === null)) && (value !== this.defaultValue);
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  validate(): EditorValidatorOutput {
    const elmValue = this.$input.val();
    const errorMsg = this.columnEditor.params && this.columnEditor.errorMessage;

    if (this.validator) {
      const validationResults = this.validator(elmValue, this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    } else if (isNaN(elmValue as number) || !/^[+-]?\d+$/.test(elmValue)) {
      return {
        valid: false,
        msg: errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER
      };
    }

    return {
      valid: true,
      msg: null
    };
  }
}
