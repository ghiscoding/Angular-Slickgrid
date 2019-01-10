import {
  Column,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
  KeyCode,
  CollectionCustomStructure,
  FieldType
} from './../models/index';

// using external non-typed js libraries
declare var $: any;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class AutoCompleteEditor implements Editor {
  private _currentValue: any;
  private _defaultTextValue: string;
  $input: any;

  /** The property name for labels in the collection */
  labelName: string;

  /** The property name for values in the collection */
  valueName: string;

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
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor || {};
  }

  /** Getter for the Custom Structure if exist */
  get customStructure(): CollectionCustomStructure {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init(): void {
    const columnId = this.columnDef && this.columnDef.id;
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.valueName = this.customStructure && this.customStructure.value || 'value';

    this.$input = $(`<input type="text" class="editor-text editor-${columnId}" placeholder="${placeholder}" />`)
      .appendTo(this.args.container)
      .on('keydown.nav', (e) => {
        if (e.keyCode === KeyCode.LEFT || e.keyCode === KeyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

    // user might pass his own autocomplete options
    const autoCompleteOptions = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.editorOptions;

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
    this.$input.remove();
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
    const data = item[this.args.column.field] || '';
    this._currentValue = data;
    this._defaultTextValue = typeof data === 'string' ? data : data[this.labelName];
    this.$input.val(this._defaultTextValue);
    this.$input[0].defaultValue = this._defaultTextValue;
    this.$input.select();
  }

  serializeValue() {
    // if user provided a custom structure, we need to reswap the properties
    // we do this because autocomplete needed label/value pair which might not be what the user provided
    if (this.customStructure && this._currentValue.label && this._currentValue.value) {
      return {
        [this.labelName]: this._currentValue.label,
        [this.valueName]: this._currentValue.value
      };
    }
    return this.columnDef.type === FieldType.object ? this._currentValue : this._currentValue.label;
  }

  applyValue(item: any, state: any) {
    item[this.args.column.field] = state;
  }

  isValueChanged() {
    return (!(this.$input.val() === '' && this._defaultTextValue === null)) && (this.$input.val() !== this._defaultTextValue);
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
