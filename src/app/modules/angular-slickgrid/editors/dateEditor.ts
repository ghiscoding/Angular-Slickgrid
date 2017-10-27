import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import $ from 'jquery';
import { Editor, KeyCode } from './../models';

if (!flatpickr) {
  throw new Error('The DateEditor requires Flatpickr installed. Or you can also create your custom editor');
}

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class DateEditor implements Editor {
  $input;
  $wrapper;
  flatInstance;
  defaultDate;
  options;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    this.options = this.args.column.options && this.args.column.options.date ? this.args.column.options.date : {};

    this.defaultDate = this.options.defaultDate = this.args.item[this.args.column.field];

    this.$input = $(`<input type="text" data-default-date="${this.defaultDate}" class="editor-text" />`);
    this.$input.appendTo(this.args.container);
    this.$input.focus().val(this.defaultDate).select();
    this.flatInstance = flatpickr(this.$input[0], this.options);
  }

  destroy() {
    this.flatInstance.destroy();
    this.$input.remove();
  }

  show() {
    this.flatInstance.open();
    // this.flatInstance.positionCalendar();
  }

  hide() {
    this.flatInstance.close();
  }

  position(pos) {
    // todo: fix how scrolling is affected
    // this.flatInstance.positionCalendar();
  }

  focus() {
    this.$input.focus();
  }

  loadValue(item) {
    this.defaultDate = item[this.args.column.field];
    this.$input.val(this.defaultDate);
    this.$input.select();
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item, state) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
  }

  validate() {
    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.$input.val(), this.args);
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
