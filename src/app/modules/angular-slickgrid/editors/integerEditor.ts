// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import $ from 'jquery';
import { Editor, KeyCode } from './../models';

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class IntegerEditor implements Editor {
  $input;
  $wrapper;
  defaultValue;

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

  loadValue(item) {
    this.defaultValue = item[this.args.column.field];
    this.$input.val(this.defaultValue);
    this.$input[0].defaultValue = this.defaultValue;
    this.$input.select();
  }

  serializeValue() {
    return parseInt(this.$input.val(), 10) || 0;
  }

  applyValue(item, state) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
  }

  validate() {
    if (isNaN(this.$input.val())) {
      return {
        valid: false,
        msg: 'Please enter a valid integer'
      };
    }

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
