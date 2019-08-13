import {
  AutocompleteOption,
  Column,
  ColumnEditor,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
  KeyCode,
  CollectionCustomStructure,
  FieldType
} from './../models/index';
import { Constants } from './../constants';
import { findOrDefault } from '../services/utilities';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class AutoCompleteEditor implements Editor {
  private _currentValue: any;
  private _defaultTextValue: string;
  private _lastInputEvent: KeyboardEvent;
  $input: any;

  /** The property name for labels in the collection */
  labelName: string;

  /** The property name for values in the collection */
  valueName: string;

  forceUserInput: boolean;

  constructor(private args: any) {
    this.init();
  }

  /** Get the Collection */
  get collection(): any[] {
    return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
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
    return this.args.grid.getOptions().autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  get editorOptions() {
    return this.columnEditor && this.columnEditor.editorOptions || {};
  }

  init(): void {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    const title = this.columnEditor && this.columnEditor.title || '';
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.valueName = this.customStructure && this.customStructure.value || 'value';
    this.$input = $(`<input type="text" role="presentation" autocomplete="off" class="autocomplete editor-text editor-${columnId}" placeholder="${placeholder}" title="${title}" />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (event: KeyboardEvent) => {
        this._lastInputEvent = event;
        if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
          event.stopImmediatePropagation();
        }
      });

    // user might pass his own autocomplete options
    const autoCompleteOptions: AutocompleteOption = this.columnEditor.editorOptions;

    // user might provide his own custom structure
    // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
    let collection = this.collection;
    if (Array.isArray(collection) && this.customStructure) {
      collection = collection.map((item) => {
        return { label: item[this.labelName], value: item[this.valueName] };
      });
    }

    // when user passes it's own autocomplete options
    // we still need to provide our own "select" callback implementation
    if (autoCompleteOptions) {
      autoCompleteOptions.select = (event: Event, ui: any) => this.onClose(event, ui);
      this.$input.autocomplete(autoCompleteOptions);
    } else {
      this.$input.autocomplete({
        source: collection,
        minLength: 0,
        select: (event: Event, ui: any) => this.onClose(event, ui),
      });
    }

    setTimeout(() => {
      this.$input.focus().select();
    }, 50);
  }

  destroy() {
    this.$input.off('keydown.nav').remove();
  }

  focus() {
    this.$input.focus();
  }

  getValue() {
    return this.$input.val();
  }

  setValue(val: string) {
    this.$input.val(val);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
      const data = item[fieldNameFromComplexObject || fieldName];
      this._currentValue = data;
      this._defaultTextValue = typeof data === 'string' ? data : data[this.labelName];
      this.$input.val(this._defaultTextValue);
      this.$input[0].defaultValue = this._defaultTextValue;
      this.$input.select();
    }

  }

  save() {
    const validation = this.validate();
    if (validation && validation.valid) {
      if (this.hasAutoCommitEdit) {
        this.args.grid.getEditorLock().commitCurrentEdit();
      } else {
        this.args.commitChanges();
      }
    }
  }

  serializeValue() {
    // if user provided a custom structure, we will serialize the value returned from the object with custom structure
    const minLength = typeof this.editorOptions.minLength !== 'undefined' ? this.editorOptions.minLength : 3;
    if (this.editorOptions.forceUserInput) {
      this._currentValue = this.$input.val().length >= minLength ? this.$input.val() : this._currentValue;
    }
    if (this.customStructure && this._currentValue.hasOwnProperty(this.labelName)) {
      return this._currentValue[this.labelName];
    } else if (this._currentValue.label) {
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

  applyValue(item: any, state: any) {
    let newValue = state;
    const fieldName = this.columnDef && this.columnDef.field;

    // if we have a collection defined, we will try to find the string within the collection and return it
    if (Array.isArray(this.collection) && this.collection.length > 0) {
      newValue = findOrDefault(this.collection, (collectionItem: any) => {
        if (collectionItem && collectionItem.hasOwnProperty(this.labelName)) {
          return collectionItem[this.labelName].toString() === state;
        }
        return collectionItem.toString() === state;
      });
    }

    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
    const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
    const validation = this.validate(newValue);
    item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
  }

  isValueChanged() {
    const lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(this.$input.val() === '' && this._defaultTextValue === null)) && (this.$input.val() !== this._defaultTextValue);
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
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

  private onClose(event: Event, ui: any) {
    if (ui && ui.item) {
      this._currentValue = ui && ui.item;
      const itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
      this.setValue(itemLabel);

      if (this.args.grid.getOptions().autoCommitEdit) {
        // do not use args.commitChanges() as this sets the focus to the next row.
        const validation = this.validate();
        if (validation && validation.valid) {
          this.args.grid.getEditorLock().commitCurrentEdit();
        }
      }
    }
    return false;
  }
}
