import { EditorArguments, EditorValidatorOutput, KeyCode } from './../models/index';
import { getDescendantProperty } from '../services/utilities';
import { integerValidator } from '../editorValidators/integerValidator';
import { InputEditor } from './inputEditor';

export class IntegerEditor extends InputEditor {
  constructor(protected readonly args: EditorArguments) {
    super(args, 'number');
  }

  /** Initialize the Editor */
  init() {
    if (this.columnDef && this.columnEditor && this.args) {
      const columnId = this.columnDef?.id ?? '';
      const placeholder = this.columnEditor?.placeholder ?? '';
      const title = this.columnEditor?.title ?? '';
      const inputStep = (this.columnEditor.valueStep !== undefined) ? this.columnEditor.valueStep : '1';

      this._input = document.createElement('input') as HTMLInputElement;
      this._input.className = `editor-text editor-${columnId}`;
      this._input.type = 'number';
      this._input.setAttribute('role', 'presentation');
      this._input.autocomplete = 'off';
      this._input.placeholder = placeholder;
      this._input.title = title;
      this._input.step = `${inputStep}`;
      const cellContainer = this.args.container;
      if (cellContainer && typeof cellContainer.appendChild === 'function') {
        cellContainer.appendChild(this._input);
      }

      this._bindEventService.bind(this._input, 'focus', () => this._input?.select());
      this._bindEventService.bind(this._input, 'keydown', ((event: KeyboardEvent) => {
        this._lastInputKeyEvent = event;
        if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
          event.stopImmediatePropagation();
        }
      }) as EventListener);

      // the lib does not get the focus out event for some reason
      // so register it here
      if (this.hasAutoCommitEdit) {
        this._bindEventService.bind(this._input, 'focusout', () => {
          this.save();
        });
      }
    }
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    if (fieldName !== undefined) {

      if (item && fieldName !== undefined && this._input) {
        // is the field a complex object, "address.streetNumber"
        const isComplexObject = fieldName?.indexOf('.') > 0;

        const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];
        this._originalValue = (isNaN(value) || value === null || value === undefined) ? value : `${value}`;
        this._input.value = `${this._originalValue}`;
        this._input.select();
      }
    }
  }

  serializeValue() {
    const elmValue = this._input?.value;
    if (elmValue === undefined || elmValue === '' || isNaN(+elmValue)) {
      return elmValue as string;
    }
    const output = isNaN(+elmValue) ? elmValue : parseInt(elmValue, 10);
    return isNaN(+output) ? elmValue : output;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this.getValue();
    return integerValidator(elmValue, {
      editorArgs: this.args,
      errorMessage: this.columnEditor.errorMessage,
      minValue: this.columnEditor.minValue,
      maxValue: this.columnEditor.maxValue,
      operatorConditionalType: this.columnEditor.operatorConditionalType,
      required: this.columnEditor.required,
      validator: this.validator,
    });
  }
}