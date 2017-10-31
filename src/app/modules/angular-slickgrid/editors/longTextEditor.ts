import $ from 'jquery';
import { Editor, HtmlElementPosition, KeyCode } from './../models/index';

/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class LongTextEditor implements Editor {
  $input: any;
  $wrapper: any;
  defaultValue: any;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    const $container = $('body');

    this.$wrapper = $(`<div class="slick-large-editor-text" />`).appendTo($container);
    this.$input = $(`<textarea hidefocus rows="5">`).appendTo(this.$wrapper);

    $(`<div class="editor-footer">
        <button class="btn btn-primary btn-xs">Save</button>
        <button class="btn btn-default btn-xs">Cancel</button>
      </div>`).appendTo(this.$wrapper);

    this.$wrapper.find('button:first').on('click', (event: Event) => this.save());
    this.$wrapper.find('button:last').on('click', (event: Event) => this.cancel());
    this.$input.on('keydown', this.handleKeyDown);

    this.position(this.args.position);
    this.$input.focus().select();
  }

  handleKeyDown(e: any) {
    if (e.which === KeyCode.ENTER && e.ctrlKey) {
      this.save();
    } else if (e.which === KeyCode.ESCAPE) {
      e.preventDefault();
      this.cancel();
    } else if (e.which === KeyCode.TAB && e.shiftKey) {
      e.preventDefault();
      this.args.grid.navigatePrev();
    } else if (e.which === KeyCode.TAB) {
      e.preventDefault();
      this.args.grid.navigateNext();
    }
  }

  save() {
    this.args.commitChanges();
  }

  cancel() {
    this.$input.val(this.defaultValue);
    this.args.cancelChanges();
  }

  hide() {
    this.$wrapper.hide();
  }

  show() {
    this.$wrapper.show();
  }

  position(position: HtmlElementPosition) {
    this.$wrapper
      .css('top', (position.top || 0) - 5)
      .css('left', (position.left || 0) - 5);
  }

  destroy() {
    this.$wrapper.remove();
  }

  focus() {
    this.$input.focus();
  }

  loadValue(item: any) {
    this.$input.val(this.defaultValue = item[this.args.column.field]);
    this.$input.select();
  }

  serializeValue() {
    return this.$input.val();
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this.defaultValue == null)) && (this.$input.val() !== this.defaultValue);
  }

  validate() {
    let valid = true;
    let msg = null;
    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.$input.val(), this.args);
      valid = validationResults.valid;
      msg = validationResults.msg;
    }

    return {
      valid: true,
      msg: null
    };
  }
}
