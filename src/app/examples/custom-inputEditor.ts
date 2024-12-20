import type { Column, ColumnEditor, Editor, EditorValidator, EditorValidationResult } from './../modules/angular-slickgrid';

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CustomInputEditor implements Editor {
  private _lastInputEvent?: KeyboardEvent;
  inputElm!: HTMLInputElement;
  defaultValue: any;

  constructor(private args: any) {
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args?.column ?? {};
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef?.editor ?? {};
  }

  get hasAutoCommitEdit(): boolean {
    return this.args.grid.getOptions().autoCommitEdit ?? false;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const placeholder = this.columnEditor?.placeholder || '';
    const title = this.columnEditor?.title || '';

    this.inputElm = document.createElement('input');
    this.inputElm.type = 'text';
    this.inputElm.className = 'editor-text';
    this.inputElm.placeholder = placeholder;
    this.inputElm.title = title;

    this.args.container.appendChild(this.inputElm);

    this.inputElm.addEventListener('keydown', this.onKeydown.bind(this));

    // the lib does not get the focus out event for some reason
    // so register it here
    if (this.hasAutoCommitEdit) {
      this.inputElm.addEventListener('focusout', this.save.bind(this));
    }

    window.setTimeout(() => {
      this.inputElm.focus();
      this.inputElm.select();
    }, 50);
  }

  onKeydown(event: KeyboardEvent) {
    this._lastInputEvent = event;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopImmediatePropagation();
    }
  }

  destroy() {
    this.inputElm.removeEventListener('keydown', this.onKeydown.bind(this));
    this.inputElm.removeEventListener('focusout', this.save.bind(this));
    this.inputElm.remove();
  }

  focus() {
    this.inputElm.focus();
  }

  getValue() {
    return this.inputElm.value;
  }

  setValue(val: string) {
    this.inputElm.value = val;
  }

  loadValue(item: any) {
    this.defaultValue = item[this.args.column.field] || '';
    this.inputElm.value = this.defaultValue;
    this.inputElm.defaultValue = this.defaultValue;
    this.inputElm.select();
  }

  serializeValue() {
    return this.inputElm.value;
  }

  applyValue(item: any, state: any) {
    const validation = this.validate(state);
    item[this.args.column.field] = validation && validation.valid ? state : '';
  }

  isValueChanged() {
    const lastKeyEvent = this._lastInputEvent?.key;
    if (this.columnEditor?.alwaysSaveOnEnterKey && lastKeyEvent === 'Enter') {
      return true;
    }
    return !(this.inputElm.value === '' && this.defaultValue === null) && this.inputElm.value !== this.defaultValue;
  }

  save() {
    const validation = this.validate();
    if (validation?.valid) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  validate(inputValue?: any): EditorValidationResult {
    if (this.validator) {
      const value = inputValue !== undefined ? inputValue : this.inputElm?.value;
      return this.validator(value, this.args);
    }

    return {
      valid: true,
      msg: null,
    };
  }
}
