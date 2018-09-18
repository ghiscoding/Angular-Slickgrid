import { Column, Editor, EditorValidator, EditorValidatorOutput } from './../models/index';

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

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
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
    this.defaultValue = !!item[this.columnDef.field];
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
    item[this.columnDef.field] = state;
  }

  isValueChanged() {
    return (this.serializeValue() !== this.defaultValue);
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const value = this.$input && this.$input.val && this.$input.val();
      const validationResults = this.validator(value, this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    // by default the editor is always valid
    // if user want it to be a required checkbox, he would have to provide his own validator
    return {
      valid: true,
      msg: null
    };
  }
}
