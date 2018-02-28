import $ from 'jquery';
import { Editor } from './../models/index';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CheckboxEditor implements Editor {
  $input: any;
  defaultValue: boolean;

  constructor(private args: any) {
    this.init();
  }

  init(): void {
    this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox" />`);
    this.$input.appendTo(this.args.container);
    this.$input.focus();
  }

  destroy(): void {
    this.$input.remove();
  }

  focus(): void {
    this.$input.focus();
  }

  hide() {
    this.$input.hide();
  }

  show() {
    this.$input.show();
  }

  loadValue(item: any) {
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

  serializeValue(): boolean {
    return this.$input.prop('checked');
  }

  applyValue(item: any, state: any) {
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
