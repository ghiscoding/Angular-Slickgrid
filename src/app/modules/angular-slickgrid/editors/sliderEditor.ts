import { Column, Editor, EditorArguments, EditorValidator, EditorValidatorOutput, ColumnEditor, SlickGrid, GridOption } from './../models/index';
import { getDescendantProperty, setDeepValue } from '../services/utilities';
import { sliderValidator } from '../editorValidators/sliderValidator';
import { BindingEventService } from '../services/bindingEvent.service';

// using external non-typed js libraries
declare const $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class SliderEditor implements Editor {
  protected _bindEventService: BindingEventService;
  protected _defaultValue = 0;
  protected _elementRangeInputId = '';
  protected _elementRangeOutputId = '';
  protected _editorElm!: HTMLDivElement;
  protected _inputElm!: HTMLInputElement;
  originalValue?: number | string;
  sliderNumberElm: HTMLSpanElement | null = null;

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
  get editorDomElement(): HTMLDivElement {
    return this._editorElm;
  }

  /** Getter for the Editor Input DOM Element */
  get editorInputDomElement(): HTMLInputElement {
    return this._inputElm;
  }

  get hasAutoCommitEdit(): boolean {
    return this.gridOptions.autoCommitEdit ?? false;
  }

  /** Getter for the Editor Generic Params */
  protected get editorParams(): any {
    return this.columnEditor.params || {};
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator | undefined {
    return this.columnEditor?.validator ?? this.columnDef?.validator;
  }

  init(): void {
    const container = this.args && this.args.container;

    if (container && this.columnDef) {
      // define the input & slider number IDs
      const itemId = this.args?.item?.id ?? '';
      this._elementRangeInputId = `rangeInput_${this.columnDef.id}_${itemId}`;
      this._elementRangeOutputId = `rangeOutput_${this.columnDef.id}_${itemId}`;

      // create HTML string template
      this._editorElm = this.buildDomElement();
      this._inputElm = this._editorElm.querySelector('input') as HTMLInputElement;
      this.sliderNumberElm = this._editorElm.querySelector<HTMLSpanElement>(`span.input-group-text.${this._elementRangeOutputId}`);

      this.focus();

      // watch on change event
      container.appendChild(this._editorElm);
      this._bindEventService.bind(this._editorElm, ['change', 'mouseup', 'touchend'], () => this.save());

      // if user chose to display the slider number on the right side, then update it every time it changes
      // we need to use both "input" and "change" event to be all cross-browser
      if (!this.editorParams.hideSliderNumber) {
        this._bindEventService.bind(this._editorElm, ['input', 'change'], this.handleChangeSliderNumber.bind(this));
      }
    }
  }

  cancel() {
    if (this._inputElm) {
      this._inputElm.value = `${this.originalValue}`;
    }
    this.args.cancelChanges();
  }

  destroy() {
    this._bindEventService.unbindAll();
    this._inputElm?.remove?.();
  }

  focus() {
    if (this._inputElm) {
      this._inputElm.focus();
    }
  }

  getValue(): string {
    return this._inputElm?.value ?? '';
  }

  setValue(value: number | string) {
    if (this._inputElm) {
      this._inputElm.value = `${value}`;
    }
    if (this.sliderNumberElm) {
      this.sliderNumberElm.textContent = `${value}`;
    }
  }

  applyValue(item: any, state: any) {
    const fieldName = this.columnDef?.field ?? '';
    if (fieldName !== undefined) {
      const isComplexObject = fieldName?.indexOf('.') > 0; // is the field a complex object, "address.streetNumber"

      const validation = this.validate(state);
      const newValue = (validation && validation.valid) ? state : '';

      // set the new value to the item datacontext
      if (isComplexObject) {
        // when it's a complex object, user could override the object path (where the editable object is located)
        // else we use the path provided in the Field Column Definition
        const objectPath = this.columnEditor?.complexObjectPath ?? fieldName ?? '';
        setDeepValue(item, objectPath, newValue);
      } else if (item) {
        item[fieldName] = newValue;
      }
    }
  }

  isValueChanged(): boolean {
    const elmValue = this._inputElm?.value ?? '';
    return (!(elmValue === '' && this.originalValue === undefined)) && (+elmValue !== this.originalValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef?.field ?? '';


    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName?.indexOf('.') > 0;
      let value = (isComplexObject) ? getDescendantProperty(item, fieldName) : (item.hasOwnProperty(fieldName) ? item[fieldName] : this._defaultValue);

      if (value === '' || value === null || value === undefined) {
        value = this._defaultValue; // load default value when item doesn't have any value
      }
      this.originalValue = +value;
      if (this._inputElm) {
        this._inputElm.value = `${value}`;
      }
      if (this.sliderNumberElm) {
        this.sliderNumberElm.textContent = `${value}`;
      }
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

  serializeValue() {
    const elmValue: string = this._inputElm?.value ?? '';
    return elmValue !== '' ? parseInt(elmValue, 10) : this.originalValue;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const elmValue = (inputValue !== undefined) ? inputValue : this._inputElm?.value;
    return sliderValidator(elmValue, {
      editorArgs: this.args,
      errorMessage: this.columnEditor.errorMessage,
      minValue: this.columnEditor.minValue,
      maxValue: this.columnEditor.maxValue,
      required: this.columnEditor.required,
      validator: this.validator,
    });
  }

  //
  // protected functions
  // ------------------

  /**
   * Create the HTML template as a string
   */
  protected buildDomElement(): HTMLDivElement {
    const columnId = this.columnDef?.id ?? '';
    const title = this.columnEditor && this.columnEditor.title || '';
    const minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE;
    const maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE;
    const defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
    const step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP;
    this._defaultValue = defaultValue;

    const inputElm = document.createElement('input');
    inputElm.name = this._elementRangeInputId;
    inputElm.title = title;
    inputElm.type = 'range';
    inputElm.defaultValue = defaultValue;
    inputElm.value = defaultValue;
    inputElm.min = `${minValue}`;
    inputElm.max = `${maxValue}`;
    inputElm.step = `${step}`;
    inputElm.className = `form-control slider-editor-input editor-${columnId} range ${this._elementRangeInputId}`;

    const divContainerElm = document.createElement('div');
    divContainerElm.className = 'slider-container slider-editor';
    divContainerElm.appendChild(inputElm);

    if (!this.editorParams.hideSliderNumber) {
      divContainerElm.classList.add('input-group');

      // <div class="input-group-addon input-group-append slider-value"><span class="input-group-text ${this._elementRangeOutputId}">${defaultValue}</span></div>
      const spanGroupElm = document.createElement('span');
      spanGroupElm.className = `input-group-text ${this._elementRangeOutputId}`;
      spanGroupElm.textContent = `${defaultValue}`;

      const divGroupAddonElm = document.createElement('div');
      divGroupAddonElm.className = 'input-group-addon input-group-append slider-value';
      divGroupAddonElm.appendChild(spanGroupElm);
      divContainerElm.appendChild(divGroupAddonElm);
    }

    return divContainerElm;
  }

  protected handleChangeSliderNumber(event: Event) {
    const value = (<HTMLInputElement>event.target)?.value ?? '';
    if (value !== '' && this.sliderNumberElm) {
      this.sliderNumberElm.textContent = value;
    }
  }
}
