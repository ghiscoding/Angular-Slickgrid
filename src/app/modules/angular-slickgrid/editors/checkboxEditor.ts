import { Constants } from './../constants';
import { Column, ColumnEditor, Editor, EditorArguments, EditorValidator, EditorValidatorOutput, GridOption, SlickGrid } from './../models/index';
import { getDescendantProperty, setDeepValue } from '../services/utilities';
import { BindingEventService } from '../services/bindingEvent.service';

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class CheckboxEditor implements Editor {
  protected _bindEventService: BindingEventService;
  protected _checkboxContainerElm!: HTMLDivElement;
  protected _input!: HTMLInputElement;
  protected _originalValue?: boolean | string;

  /** SlickGrid Grid object */
  grid: SlickGrid;

  /** Grid options */
  gridOptions: GridOption;

  constructor(protected readonly args: EditorArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.gridOptions = (this.grid.getOptions() || {}) as GridOption;
    this._bindEventService = new BindingEventService();
    this.init();
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Getter for the Editor DOM Element */
  get editorDomElement(): any {
    return this._input;
  }

  get hasAutoCommitEdit() {
    return this.args.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor?.validator ?? this.columnDef?.validator;
  }

  init(): void {
    const columnId = this.columnDef?.id ?? '';
    const title = this.columnEditor?.title ?? '';

    this._checkboxContainerElm = document.createElement('div');
    this._checkboxContainerElm.className = `checkbox-editor-container editor-${columnId}`;

    this._input = document.createElement('input');
    this._input.className = `editor-checkbox editor-${columnId}`;
    this._input.title = title;
    this._input.type = 'checkbox';
    this._input.value = 'true';

    const cellContainer = this.args?.container;
    if (cellContainer && typeof cellContainer.appendChild === 'function') {
      cellContainer.appendChild(this._input);
    }

    // make the checkbox editor act like a regular checkbox that commit the value on click
    if (this.hasAutoCommitEdit) {
      this._bindEventService.bind(this._input, 'click', () => this.save());
    }

    this.focus();
  }

  destroy() {
    this._bindEventService.unbindAll();
    this._input?.remove?.();
  }

  focus(): void {
    if (this._input) {
      this._input.focus();
    }
  }

  /** pre-click, when enabled, will simply toggle the checkbox without requiring to double-click */
  preClick() {
    if (this._input) {
      this._input.checked = !this._input.checked;
    }
  }

  getValue() {
    return this._input?.checked ?? false;
  }

  setValue(val: boolean | string) {
    const isChecked = val ? true : false;
    if (this._input) {
      this._input.checked = isChecked;
    }
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef && this.columnDef.field;
    if (fieldName !== undefined) {
      const isComplexObject = fieldName?.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

      // validate the value before applying it (if not valid we'll set an empty string)
      const validation = this.validate(state);
      const newValue = (validation && validation.valid) ? state : '';

      // set the new value to the item datacontext
      if (isComplexObject) {// when it's a complex object, user could override the object path (where the editable object is located)
        // else we use the path provided in the Field Column Definition
        const objectPath = this.columnEditor?.complexObjectPath ?? fieldName ?? '';
        setDeepValue(item, objectPath, newValue);
      } else {
        item[fieldName] = newValue;
      }
    }
  }

  isValueChanged(): boolean {
    return (this.serializeValue() !== this._originalValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    if (item && fieldName !== undefined && this._input) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName?.indexOf('.') > 0;
      const value = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];

      this._originalValue = value;
      this._input.checked = !!this._originalValue;
    }
  }

  save() {
    const validation = this.validate();
    const isValid = (validation && validation.valid) || false;

    if (this.hasAutoCommitEdit && isValid) {
      // do not use args.commitChanges() as this sets the focus to the next row.
      // also the select list will stay shown when clicking off the grid
      this.grid.getEditorLock().commitCurrentEdit();
    } else {
      this.args.commitChanges();
    }
  }

  serializeValue(): boolean {
    return this._input?.checked ?? false;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const isChecked = (inputValue !== undefined) ? inputValue : this._input?.checked;
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
