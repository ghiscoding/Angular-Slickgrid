// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import $ from 'jquery';
import { Editor, KeyCode } from './../models';

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CheckboxEditor implements Editor {
  $input;
  $wrapper;
  defaultValue;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox" hideFocus />`);
    this.$input.appendTo(this.args.container);
    this.$input.focus();
  }

  destroy() {
    this.$input.remove();
  }

  focus() {
    this.$input.focus();
  }

  loadValue(item) {
    this.defaultValue = !!item[this.args.column.field];
    if (this.defaultValue) {
      this.$input.prop('checked', true);
    } else {
      this.$input.prop('checked', false);
    }
  }

  preClick() {
    this.$input.prop('checked', !this.$input.prop('checked'));
  }

  serializeValue() {
    return this.$input.prop('checked');
  }

  applyValue(item, state) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (this.serializeValue() !== this.defaultValue);
  }

  validate() {
    return {
      valid: true,
      msg: null
    };
  }
}
