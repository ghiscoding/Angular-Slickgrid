import {
  AutocompleteOption,
  CollectionCustomStructure,
  Column,
  ColumnEditor,
  Editor,
  EditorArguments,
  EditorValidator,
  EditorValidatorOutput,
  FieldType,
  KeyCode,
} from './../models/index';
import { Constants } from './../constants';
import { findOrDefault, getDescendantProperty, setDeepValue } from '../services/utilities';

// using external non-typed js libraries
declare var $: any;

// minimum length of chars to type before starting to start querying
const MIN_LENGTH = 3;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class AutoCompleteEditor implements Editor {
  private _currentValue: any;
  private _defaultTextValue: string;
  private _elementCollection: any[];
  private _lastInputEvent: KeyboardEvent;

  /** The JQuery DOM element */
  private _$editorElm: any;

  /** SlickGrid Grid object */
  grid: any;

  /** The property name for labels in the collection */
  labelName: string;

  /** The property name for values in the collection */
  valueName: string;

  forceUserInput: boolean;

  constructor(private args: EditorArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.init();
  }

  /** Get the Collection */
  get editorCollection(): any[] {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collection || [];
  }

  /** Get the Final Collection used in the AutoCompleted Source (this may vary from the "collection" especially when providing a customStructure) */
  get elementCollection(): any[] {
    return this._elementCollection;
  }

  /** Get Column Definition object */
  get columnDef(): Column | undefined {
    return this.args && this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Getter for the Custom Structure if exist */
  get customStructure(): CollectionCustomStructure {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
  }

  get hasAutoCommitEdit() {
    return this.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  get editorOptions() {
    return this.columnEditor && this.columnEditor.editorOptions || {};
  }

  /** Get the Editor DOM Element */
  get editorDomElement(): any {
    return this._$editorElm;
  }

  init() {
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.valueName = this.customStructure && this.customStructure.value || 'value';

    // always render the DOM element, even if user passed a "collectionAsync",
    const newCollection = this.columnEditor.collection || [];
    this.renderDomElement(newCollection);
  }

  destroy() {
    this._$editorElm.off('keydown.nav').remove();
  }

  focus() {
    this._$editorElm.focus().select();
  }

  getValue() {
    return this._$editorElm.val();
  }

  setValue(value: string) {
    this._$editorElm.val(value);
  }

  applyValue(item: any, state: any) {
    let newValue = state;
    const fieldName = this.columnDef && this.columnDef.field;

    // if we have a collection defined, we will try to find the string within the collection and return it
    if (Array.isArray(this.editorCollection) && this.editorCollection.length > 0) {
      newValue = findOrDefault(this.editorCollection, (collectionItem: any) => {
        if (collectionItem && typeof state === 'object' && collectionItem.hasOwnProperty(this.labelName)) {
          return (collectionItem.hasOwnProperty(this.labelName) && collectionItem[this.labelName].toString()) === (state.hasOwnProperty(this.labelName) && state[this.labelName].toString());
        } else if (collectionItem && typeof state === 'string' && collectionItem.hasOwnProperty(this.labelName)) {
          return (collectionItem.hasOwnProperty(this.labelName) && collectionItem[this.labelName].toString()) === state;
        }
        return collectionItem && collectionItem.toString() === state;
      });
    }

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    // validate the value before applying it (if not valid we'll set an empty string)
    const validation = this.validate(newValue);
    newValue = (validation && validation.valid) ? newValue : '';

    // set the new value to the item datacontext
    if (isComplexObject) {
      setDeepValue(item, fieldName, newValue);
    } else {
      item[fieldName] = newValue;
    }
  }

  isValueChanged(): boolean {
    const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(this._$editorElm.val() === '' && this._defaultTextValue === null)) && (this._$editorElm.val() !== this._defaultTextValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      const data = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];
      this._currentValue = data;
      this._defaultTextValue = typeof data === 'string' ? data : data[this.labelName];
      this._$editorElm.val(this._defaultTextValue);
      this._$editorElm.select();
    }
  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid && this.isValueChanged()) {
      if (this.hasAutoCommitEdit) {
        this.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  serializeValue(): any {
    // if you want to add the autocomplete functionality but want the user to be able to input a new option
    if (this.editorOptions.forceUserInput) {
      const minLength = this.editorOptions && this.editorOptions.hasOwnProperty('minLength') ? this.editorOptions.minLength : MIN_LENGTH;
      this._currentValue = this._$editorElm.val().length > minLength ? this._$editorElm.val() : this._currentValue;
    }
    // if user provided a custom structure, we will serialize the value returned from the object with custom structure
    if (this.customStructure && this._currentValue && this._currentValue.hasOwnProperty(this.labelName)) {
      return this._currentValue[this.labelName];
    } else if (this._currentValue && this._currentValue.label) {
      if (this.columnDef.type === FieldType.object) {
        return {
          [this.labelName]: this._currentValue.label,
          [this.valueName]: this._currentValue.value
        };
      }
      return this._currentValue.label;
    }
    return this._currentValue;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this._$editorElm && this._$editorElm.val && this._$editorElm.val();
    const errorMsg = this.columnEditor.errorMessage;

    if (this.validator) {
      return this.validator(elmValue, this.args);
    }

    // by default the editor is almost always valid (except when it's required but not provided)
    if (isRequired && elmValue === '') {
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

  //
  // private functions
  // ------------------

  // this function should be PRIVATE but for unit tests purposes we'll make it public until a better solution is found
  // a better solution would be to get the autocomplete DOM element to work with selection but I couldn't find how to do that in Jest
  onSelect(event: Event, ui: any): boolean {
    if (ui && ui.item) {
      this._currentValue = ui && ui.item;
      const itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
      this.setValue(itemLabel);

      if (this.hasAutoCommitEdit) {
        // do not use args.commitChanges() as this sets the focus to the next row.
        const validation = this.validate();
        if (validation && validation.valid) {
          this.grid.getEditorLock().commitCurrentEdit();
        }
      }
    }
    return false;
  }

  private renderDomElement(collection: any[]) {
    if (!Array.isArray(collection)) {
      throw new Error('The "collection" passed to the Autocomplete Editor is not a valid array.');
    }
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';

    this._$editorElm = $(`<input type="text" role="presentation" autocomplete="off" class="autocomplete editor-text editor-${columnId}" placeholder="${placeholder}" title="${title}" />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (event: KeyboardEvent) => {
        this._lastInputEvent = event;
        if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
          event.stopImmediatePropagation();
        }
      });

    // user might pass his own autocomplete options
    const autoCompleteOptions: AutocompleteOption = this.columnEditor.editorOptions;

    // assign the collection to a temp variable before filtering/sorting the collection
    let finalCollection = collection;

    // user might provide his own custom structure
    // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
    if (Array.isArray(finalCollection) && this.customStructure) {
      finalCollection = finalCollection.map((item) => {
        return { label: item[this.labelName], value: item[this.valueName] };
      });
    }

    // keep the final source collection used in the AutoComplete as reference
    this._elementCollection = finalCollection;

    // when user passes it's own autocomplete options
    // we still need to provide our own "select" callback implementation
    if (autoCompleteOptions) {
      autoCompleteOptions.select = (event: Event, ui: any) => this.onSelect(event, ui);
      this._$editorElm.autocomplete(autoCompleteOptions);
    } else {
      this._$editorElm.autocomplete({
        source: finalCollection,
        minLength: 0,
        select: (event: Event, ui: any) => this.onSelect(event, ui),
      });
    }

    setTimeout(() => this.focus(), 50);
  }
}
