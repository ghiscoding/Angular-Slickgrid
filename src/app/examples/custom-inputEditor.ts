import { BindingEventService, Column, ColumnEditor, Editor, EditorValidator, EditorValidationResult, emptyElement, KeyCode } from './../modules/angular-slickgrid';

// using external non-typed js libraries
declare const $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CustomInputEditor implements Editor {
  protected _bindEventService: BindingEventService;
  protected _lastInputEvent?: any;
  inputElm!: HTMLInputElement;
  defaultValue: any;

  constructor(private args: any) {
    this._bindEventService = new BindingEventService();
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  get hasAutoCommitEdit(): boolean {
    return this.args.grid.getOptions().autoCommitEdit ?? false;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';

    this.inputElm = document.createElement('input');
    this.inputElm.type = 'text';
    this.inputElm.className = 'editor-text';
    this.inputElm.placeholder = placeholder;
    this.inputElm.title = title;

    const cellContainer = this.args.container;
    if (cellContainer && typeof cellContainer.appendChild === 'function') {
      cellContainer.appendChild(this.inputElm);
    }

    this._bindEventService.bind(this.inputElm, 'focus', () => this.inputElm?.select());
    this._bindEventService.bind(this.inputElm, 'keydown', (event: any) => {
      this._lastInputEvent = event;
      if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
        event.stopImmediatePropagation();
      }
    });

    // the lib does not get the focus out event for some reason
    // so register it here
    if (this.hasAutoCommitEdit) {
      this._bindEventService.bind(this.inputElm, 'focusout', () => {
        this.save();
      });
    }

    setTimeout(() => {
      this.inputElm.focus();
      this.inputElm.select();
    }, 50);
  }

  destroy() {
    this._bindEventService.unbindAll();
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
    item[this.args.column.field] = (validation && validation.valid) ? state : '';
  }

  isValueChanged() {
    const lastEvent = this._lastInputEvent?.keyCode;
    if (this.columnEditor?.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(this.inputElm.value === '' && this.defaultValue === null)) && (this.inputElm.value !== this.defaultValue);
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
      const value = (inputValue !== undefined) ? inputValue : this.inputElm?.value;
      return this.validator(value, this.args);
    }

    return {
      valid: true,
      msg: null
    };
  }
}
