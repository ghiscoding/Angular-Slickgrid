import $ from 'jquery';
import { Editor, KeyCode } from './../models/index';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class TextEditor implements Editor {
  $input: any;
  defaultValue: any;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    this.$input = $(`<input type="text" class='editor-text' />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (e) => {
        if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      })
      .focus()
      .select();
  }

  destroy() {
    this.$input.remove();
  }

  focus() {
    this.$input.focus();
  }

  getValue() {
    return this.$input.val();
  }

  setValue(val: string) {
    this.$input.val(val);
  }

  loadValue(item: any) {
    this.defaultValue = item[this.args.column.field] || '';
    this.$input.val(this.defaultValue);
    this.$input[0].defaultValue = this.defaultValue;
    this.$input.select();
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
  }

  validate() {
    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.$input.val());
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  }
}
