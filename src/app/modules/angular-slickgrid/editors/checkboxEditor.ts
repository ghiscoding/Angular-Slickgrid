import { Constants } from './../constants';
import { Column, ColumnEditor, Editor, EditorValidator, EditorValidatorOutput } from './../models/index';

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
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const fieldId = this.columnDef && this.columnDef.id;
    this.$input = $(`<input type="checkbox" value="true" class="editor-checkbox editor-${fieldId}" />`);
    this.$input.appendTo(this.args.container);
    this.$input.focus();

    // make the checkbox editor act like a regular checkbox that commit the value on click
    if (this.args.grid.getOptions().autoCommitEdit) {
      this.$input.click(() => this.args.grid.getEditorLock().commitCurrentEdit());
    }
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
    const fieldName = this.columnDef && this.columnDef.field;

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
      this.defaultValue = !!item[fieldNameFromComplexObject || fieldName];
      if (this.defaultValue) {
        this.$input.prop('checked', true);
      } else {
        this.$input.prop('checked', false);
      }
    }
  }

  preClick() {
    this.$input.prop('checked', !this.$input.prop('checked'));
  }

  serializeValue(): boolean {
    return this.$input.prop('checked');
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
    item[fieldNameFromComplexObject || fieldName] = state;
  }

  isValueChanged() {
    return (this.serializeValue() !== this.defaultValue);
  }

  validate(): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const isChecked = this.$input && this.$input.prop && this.$input.prop('checked');
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
