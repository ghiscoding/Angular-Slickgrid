import { getDescendantProperty, setDeepValue } from '../services/utilities';
import { floatValidator, integerValidator, textValidator } from '../editorValidators';
import {
  Column,
  ColumnEditor,
  ColumnEditorDualInput,
  Editor,
  EditorArguments,
  EditorValidator,
  EditorValidatorOutput,
  KeyCode,
  SlickEventHandler,
} from '../models/index';

// using external non-typed js libraries
declare const Slick: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class DualInputEditor implements Editor {
  private _eventHandler: SlickEventHandler;
  private _isValueSaveCalled = false;
  private _lastEventType: string | undefined;
  private _lastInputKeyEvent: KeyboardEvent;
  private _leftInput: HTMLInputElement;
  private _rightInput: HTMLInputElement;
  private _leftFieldName: string;
  private _rightFieldName: string;
  originalLeftValue: string | number;
  originalRightValue: string | number;

  /** SlickGrid Grid object */
  grid: any;

  constructor(private args: EditorArguments) {
    if (!args) {
      throw new Error('[Slickgrid-Universal] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.init();
    this._eventHandler = new Slick.EventHandler();
    this._eventHandler.subscribe(this.grid.onValidationError, () => this._isValueSaveCalled = true);
  }

  /** Get Column Definition object */
  get columnDef(): Column | undefined {
    return this.args && this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Get the Editor DOM Element */
  get editorDomElement(): { leftInput: HTMLInputElement, rightInput: HTMLInputElement } {
    return { leftInput: this._leftInput, rightInput: this._rightInput };
  }

  get editorParams(): ColumnEditorDualInput {
    return this.columnEditor.params || {};
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  get hasAutoCommitEdit() {
    return this.grid.getOptions().autoCommitEdit;
  }

  get isValueSaveCalled(): boolean {
    return this._isValueSaveCalled;
  }

  /** Get the Shared Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return (this.columnEditor && this.columnEditor.validator) || (this.columnDef && this.columnDef.validator);
  }

  init() {
    if (!this.editorParams || !this.editorParams.leftInput || !this.editorParams.leftInput.field || !this.editorParams.rightInput || !this.editorParams.rightInput.field) {
      throw new Error(`[Slickgrid-Universal] Please make sure that your Combo Input Editor has params defined with "leftInput" and "rightInput" (example: { editor: { model: Editors.comboInput, params: { leftInput: { field: 'firstName' }, { rightSide: { field: 'lastName' } }}}`);
    }
    this._leftFieldName = this.editorParams && this.editorParams.leftInput && this.editorParams.leftInput.field;
    this._rightFieldName = this.editorParams && this.editorParams.rightInput && this.editorParams.rightInput.field;
    this._leftInput = this.createInput('leftInput');
    this._rightInput = this.createInput('rightInput');

    const containerElm = this.args.container;
    if (containerElm && typeof containerElm.appendChild === 'function') {
      containerElm.appendChild(this._leftInput);
      containerElm.appendChild(this._rightInput);
    }

    this._leftInput.onkeydown = this.handleKeyDown.bind(this);
    this._rightInput.onkeydown = this.handleKeyDown.bind(this);

    // the lib does not get the focus out event for some reason, so register it here
    if (this.hasAutoCommitEdit) {
      this._leftInput.addEventListener('focusout', (event: any) => this.handleFocusOut(event, 'leftInput'));
      this._rightInput.addEventListener('focusout', (event: any) => this.handleFocusOut(event, 'rightInput'));
    }

    setTimeout(() => this._leftInput.select(), 50);
  }

  handleFocusOut(event: any, position: 'leftInput' | 'rightInput') {
    // when clicking outside the editable cell OR when focusing out of it
    const targetClassNames = event.relatedTarget && event.relatedTarget.className || '';
    if (targetClassNames.indexOf('dual-editor') === -1 && this._lastEventType !== 'focusout-right') {
      if (position === 'rightInput' || (position === 'leftInput' && this._lastEventType !== 'focusout-left')) {
        this.save();
      }
    }
    const side = (position === 'leftInput') ? 'left' : 'right';
    this._lastEventType = `${event && event.type}-${side}`;
  }

  handleKeyDown(event: KeyboardEvent) {
    this._lastInputKeyEvent = event;
    if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT || event.keyCode === KeyCode.TAB) {
      event.stopImmediatePropagation();
    }
  }

  destroy() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    const columnId = this.columnDef && this.columnDef.id;
    const elements = document.querySelectorAll(`.dual-editor-text.editor-${columnId}`);
    if (elements.length > 0) {
      elements.forEach((elm) => elm.removeEventListener('focusout', () => { }));
    }
  }

  createInput(position: 'leftInput' | 'rightInput'): HTMLInputElement {
    const editorSideParams = this.editorParams[position];
    const columnId = this.columnDef && this.columnDef.id;
    const itemId = this.args && this.args.item && this.args.item.id || 0;

    let fieldType = editorSideParams.type || 'text';
    if (fieldType === 'float' || fieldType === 'integer') {
      fieldType = 'number';
    }

    const input = document.createElement('input') as HTMLInputElement;
    input.id = `item-${itemId}`;
    input.className = `dual-editor-text editor-${columnId} ${position.replace(/input/gi, '')}`;
    if (fieldType === 'readonly') {
      // when the custom type is defined as readonly, we'll make a readonly text input
      input.readOnly = true;
      fieldType = 'text';
    }
    input.type = fieldType || 'text';
    input.setAttribute('role', 'presentation');
    input.autocomplete = 'off';
    input.placeholder = editorSideParams.placeholder || '';
    input.title = editorSideParams.title || '';
    if (fieldType === 'number') {
      input.step = this.getInputDecimalSteps(position);
    }
    return input;
  }

  focus() {
    // do nothing since we have 2 inputs and we might focus on left/right depending on which is invalid and/or new
  }

  getValues(): { [fieldName: string]: string | number } {
    const obj = {};
    const leftInputValue = this._leftInput.value;
    const rightInputValue = this._rightInput.value;
    const isLeftInputTypeNumber = (this.editorParams.leftInput && (this.editorParams.leftInput.type === 'float' || this.editorParams.leftInput.type === 'integer'));
    const isRightInputTypeNumber = (this.editorParams.rightInput && (this.editorParams.rightInput.type === 'float' || this.editorParams.rightInput.type === 'integer'));
    const resultLeftValue = (leftInputValue !== '' && isLeftInputTypeNumber) ? +this._leftInput.value : (leftInputValue || '');
    const resultRightValue = (rightInputValue !== '' && isRightInputTypeNumber) ? +this._rightInput.value : (rightInputValue || '');
    setDeepValue(obj, this._leftFieldName, resultLeftValue);
    setDeepValue(obj, this._rightFieldName, resultRightValue);

    return obj;
  }

  setValues(values: Array<number | string>) {
    if (Array.isArray(values) && values.length === 2) {
      this._leftInput.value = `${values[0]}`;
      this._rightInput.value = `${values[1]}`;
    }
  }

  applyValue(item: any, state: any) {
    this.applyValueByPosition(item, state, 'leftInput');
    this.applyValueByPosition(item, state, 'rightInput');
  }

  applyValueByPosition(item: any, state: any, position: 'leftInput' | 'rightInput') {
    const fieldName = position === 'leftInput' ? this._leftFieldName : this._rightFieldName;
    if (fieldName !== undefined) {
      const isComplexObject = fieldName && fieldName.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

      let fieldNameToUse = fieldName;
      if (isComplexObject) {
        const complexFieldNames = fieldName.split(/\.(.*)/);
        fieldNameToUse = (complexFieldNames.length > 1 ? complexFieldNames[1] : complexFieldNames) as string;
      }

      // validate the value before applying it (if not valid we'll set an empty string)
      const stateValue = isComplexObject ? getDescendantProperty(state, fieldNameToUse) : state[fieldName];
      const validation = this.validate({ position, inputValue: stateValue });

      // set the new value to the item datacontext
      if (isComplexObject) {
        const newValueFromComplex = getDescendantProperty(state, fieldNameToUse);
        const newValue = (validation && validation.valid) ? newValueFromComplex : '';
        setDeepValue(item, fieldName, newValue);
      } else if (fieldName) {
        item[fieldName] = (validation && validation.valid) ? state[fieldName] : '';
      }
    }
  }

  isValueChanged(): boolean {
    const leftElmValue = this._leftInput.value;
    const rightElmValue = this._rightInput.value;
    const leftEditorParams = this.editorParams && this.editorParams.leftInput;
    const rightEditorParams = this.editorParams && this.editorParams.rightInput;
    const lastKeyEvent = this._lastInputKeyEvent && this._lastInputKeyEvent.keyCode;
    if ((leftEditorParams && leftEditorParams.alwaysSaveOnEnterKey || rightEditorParams && rightEditorParams.alwaysSaveOnEnterKey) && lastKeyEvent === KeyCode.ENTER) {
      return true;
    }
    const leftResult = (!(leftElmValue === '' && this.originalLeftValue === null)) && (leftElmValue !== this.originalLeftValue);
    const rightResult = (!(rightElmValue === '' && this.originalRightValue === null)) && (rightElmValue !== this.originalRightValue);
    return leftResult || rightResult;
  }

  loadValue(item: any) {
    this.loadValueByPosition(item, 'leftInput');
    this.loadValueByPosition(item, 'rightInput');
    this._leftInput.select();
  }

  loadValueByPosition(item: any, position: 'leftInput' | 'rightInput') {
    // is the field a complex object, "address.streetNumber"
    const fieldName = (position === 'leftInput') ? this._leftFieldName : this._rightFieldName;
    const originalValuePosition = (position === 'leftInput') ? 'originalLeftValue' : 'originalRightValue';
    const inputVarPosition = (position === 'leftInput') ? '_leftInput' : '_rightInput';
    const isComplexObject = fieldName && fieldName.indexOf('.') > 0;

    if (item && fieldName !== undefined && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      const itemValue = (isComplexObject) ? getDescendantProperty(item, fieldName) : (item.hasOwnProperty(fieldName) ? item[fieldName] : '');
      this[originalValuePosition] = itemValue;
      if (this.editorParams[position].type === 'float') {
        const decimalPlaces = this.getDecimalPlaces(position);
        if (decimalPlaces !== null && (this[originalValuePosition] || this[originalValuePosition] === 0) && (+this[originalValuePosition]).toFixed) {
          this[originalValuePosition] = (+this[originalValuePosition]).toFixed(decimalPlaces);
        }
      }
      if (this[inputVarPosition]) {
        const originalValue = this[originalValuePosition];
        this[inputVarPosition].value = `${originalValue}`;
      }
    }
  }

  save() {
    const validation = this.validate();
    const isValid = (validation && validation.valid) || false;

    if (!this._isValueSaveCalled) {
      if (this.hasAutoCommitEdit && isValid) {
        this.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
      this._isValueSaveCalled = true;
    }
  }

  serializeValue() {
    const obj = {};
    const leftValue = this.serializeValueByPosition('leftInput');
    const rightValue = this.serializeValueByPosition('rightInput');

    setDeepValue(obj, this._leftFieldName, leftValue);
    setDeepValue(obj, this._rightFieldName, rightValue);

    return obj;
  }

  serializeValueByPosition(position: 'leftInput' | 'rightInput') {
    const elmValue = position === 'leftInput' ? this._leftInput.value : this._rightInput.value;
    if (elmValue === '' || isNaN(+elmValue)) {
      return elmValue;
    }

    let rtn = parseFloat(elmValue);
    const decPlaces = this.getDecimalPlaces(position);
    if (decPlaces !== null && (rtn || rtn === 0) && rtn.toFixed) {
      rtn = parseFloat(rtn.toFixed(decPlaces));
    }

    return rtn;
  }

  getDecimalPlaces(position: 'leftInput' | 'rightInput'): number {
    const defaultDecimalPlaces = 0; // TODO move into a constant

    // returns the number of fixed decimal places or null
    const positionSide = position === 'leftInput' ? 'leftInput' : 'rightInput';
    const sideParams = this.editorParams[positionSide];
    const rtn: number | undefined = sideParams && sideParams.decimal;

    if (rtn === undefined) {
      return defaultDecimalPlaces;
    }
    return rtn;
  }

  getInputDecimalSteps(position: 'leftInput' | 'rightInput'): string {
    const decimals = this.getDecimalPlaces(position);
    let zeroString = '';
    for (let i = 1; i < decimals; i++) {
      zeroString += '0';
    }

    if (decimals > 0) {
      return `0.${zeroString}1`;
    }
    return '1';
  }

  validate(inputValidation?: { position: 'leftInput' | 'rightInput', inputValue: any }): EditorValidatorOutput {
    if (inputValidation) {
      const posValidation = this.validateByPosition(inputValidation.position, inputValidation.inputValue);
      if (!posValidation.valid) {
        inputValidation.position === 'leftInput' ? this._leftInput.select() : this._rightInput.select();
        return posValidation;
      }
    } else {
      const leftValidation = this.validateByPosition('leftInput');
      const rightValidation = this.validateByPosition('rightInput');

      if (!leftValidation.valid) {
        this._leftInput.select();
        return leftValidation;
      }
      if (!rightValidation.valid) {
        this._rightInput.select();
        return rightValidation;
      }
    }
    return { valid: true, msg: '' };
  }

  validateByPosition(position: 'leftInput' | 'rightInput', inputValue?: any): EditorValidatorOutput {
    const positionEditorParams = this.editorParams[position];
    let currentVal: any = '';
    if (inputValue) {
      currentVal = inputValue;
    } else {
      const input = position === 'leftInput' ? this._leftInput : this._rightInput;
      currentVal = input && input.value;
    }

    // there are 2 ways of passing a Validator, 1-independent validator on each side, 2-shared validator
    const commonValidator = this.validator;
    currentVal = typeof commonValidator === 'function' ? this.getValues() : currentVal;
    const baseValidatorOptions = {
      editorArgs: this.args,
      errorMessage: positionEditorParams.errorMessage,
      required: positionEditorParams.required,
      validator: typeof commonValidator === 'function' ? commonValidator : positionEditorParams.validator,
    };

    switch (positionEditorParams.type) {
      case 'float':
        return floatValidator(currentVal, {
          ...baseValidatorOptions,
          decimal: this.getDecimalPlaces(position),
          minValue: positionEditorParams.minValue,
          maxValue: positionEditorParams.maxValue,
          operatorConditionalType: positionEditorParams.operatorConditionalType,
        });
      case 'integer':
        return integerValidator(currentVal, {
          ...baseValidatorOptions,
          minValue: positionEditorParams.minValue,
          maxValue: positionEditorParams.maxValue,
          operatorConditionalType: positionEditorParams.operatorConditionalType,
        });
      case 'text':
      case 'password':
      default:
        return textValidator(currentVal, baseValidatorOptions);
    }
  }
}
