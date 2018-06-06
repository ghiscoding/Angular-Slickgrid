import { Column, Editor, KeyCode } from './../models/index';

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

  init(): void {
    this.$input = $(`<input type="number" class='editor-text' />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (e) => {
        if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

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

  validate() {
    const column = (this.args && this.args.column) as Column;
    const columnEditor = this.getColumnEditor();
    const errorMsg = columnEditor.params && columnEditor.params.validatorErrorMessage;
    const elmValue = this.$input.val();

    if (column.validator) {
      const validationResults = column.validator(elmValue);
      if (!validationResults.valid) {
        return validationResults;
      }
    } else if (isNaN(elmValue as number) || !/^[+-]?\d+$/.test(elmValue)) {
      return {
        valid: false,
        msg: errorMsg || 'Please enter a valid integer number'
      };
    }

    return {
      valid: true,
      msg: null
    };
  }
}
