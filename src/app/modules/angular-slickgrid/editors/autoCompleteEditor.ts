import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

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
  GridOption,
  KeyCode,
} from './../models/index';
import { findOrDefault, getDescendantProperty, setDeepValue, toKebabCase } from '../services/utilities';
import { textValidator } from '../editorValidators/textValidator';

// using external non-typed js libraries
declare const $: any;

// minimum length of chars to type before starting to start querying
const MIN_LENGTH = 3;

/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
export class AutoCompleteEditor implements Editor {
  private _autoCompleteOptions: AutocompleteOption;
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

  /** The property name for a prefix that can be added to the labels in the collection */
  labelPrefixName: string;

  /** The property name for a suffix that can be added to the labels in the collection */
  labelSuffixName: string;

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

  /** Getter for the Autocomplete Option */
  get autoCompleteOptions(): Partial<AutocompleteOption> {
    return this._autoCompleteOptions || {};
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
    let customStructure = this.columnEditor && this.columnEditor.customStructure;
    const columnType = this.columnEditor && this.columnEditor.type || this.columnDef && this.columnDef.type;
    if (!customStructure && (columnType === FieldType.object && this.columnDef && this.columnDef.dataKey && this.columnDef.labelKey)) {
      customStructure = {
        label: this.columnDef.labelKey,
        value: this.columnDef.dataKey,
      };
    }
    return customStructure;
  }

  get hasAutoCommitEdit() {
    return this.gridOptions.autoCommitEdit;
  }

  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  get editorOptions() {
    return this.columnEditor && this.columnEditor.editorOptions || {};
  }

  /** jQuery UI AutoComplete instance */
  get instance(): any {
    return this._$editorElm.autocomplete('instance');
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Get the Editor DOM Element */
  get editorDomElement(): any {
    return this._$editorElm;
  }

  init() {
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.valueName = this.customStructure && this.customStructure.value || 'value';
    this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
    this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';

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
    const isComplexObject = fieldName && fieldName.indexOf('.') > 0;

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
    const elmValue = this._$editorElm.val();
    const lastKeyEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
    if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastKeyEvent === KeyCode.ENTER) {
      return true;
    }
    return (!(elmValue === '' && (this._defaultTextValue === null || this._defaultTextValue === undefined))) && (elmValue !== this._defaultTextValue);
  }

  loadValue(item: any) {
    const fieldName = this.columnDef && this.columnDef.field;

    if (item && fieldName !== undefined) {
      // is the field a complex object, "address.streetNumber"
      const isComplexObject = fieldName && fieldName.indexOf('.') > 0;
      const data = (isComplexObject) ? getDescendantProperty(item, fieldName) : item[fieldName];

      this._currentValue = data;
      this._defaultTextValue = typeof data === 'string' ? data : (data && data.hasOwnProperty(this.labelName) && data[this.labelName] || '');
      this._$editorElm.val(this._defaultTextValue);
      this._$editorElm.select();
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

  serializeValue(): any {
    // if you want to add the autocomplete functionality but want the user to be able to input a new option
    if (this.editorOptions.forceUserInput) {
      const minLength = this.editorOptions && this.editorOptions.hasOwnProperty('minLength') ? this.editorOptions.minLength : MIN_LENGTH;
      this._currentValue = this._$editorElm.val().length > minLength ? this._$editorElm.val() : this._currentValue;
    }
    // if user provided a custom structure, we will serialize the value returned from the object with custom structure
    if (this.customStructure && this._currentValue && this._currentValue.hasOwnProperty(this.valueName) && (this.columnDef && this.columnDef.type !== FieldType.object && this.columnEditor && this.columnEditor.type !== FieldType.object)) {
      return this._currentValue[this.valueName];
    } else if (this._currentValue && this._currentValue.value !== undefined) {
      // when object has a "value" property and its column is set as an Object type, we'll return an object with optional custom structure
      if (this.columnDef && this.columnDef.type === FieldType.object || ((this.columnEditor && this.columnEditor.type) === FieldType.object)) {
        return {
          [this.labelName]: this._currentValue.label,
          [this.valueName]: this._currentValue.value
        };
      }
      return this._currentValue.value;
    }
    // if it falls here it might be that the user provided its own custom item with something else than the regular label/value pair
    // at this point it's only available when user provide a custom template for the autocomplete renderItem callback
    return this._currentValue;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const val = (inputValue !== undefined) ? inputValue : this._$editorElm && this._$editorElm.val && this._$editorElm.val();
    return textValidator(val, {
      editorArgs: this.args,
      errorMessage: this.columnEditor.errorMessage,
      minLength: this.columnEditor.minLength,
      maxLength: this.columnEditor.maxLength,
      operatorConditionalType: this.columnEditor.operatorConditionalType,
      required: this.columnEditor.required,
      validator: this.validator,
    });
  }

  //
  // private functions
  // ------------------

  // this function should be PRIVATE but for unit tests purposes we'll make it public until a better solution is found
  // a better solution would be to get the autocomplete DOM element to work with selection but I couldn't find how to do that in Jest
  onSelect(_event: Event, ui: { item: any; }) {
    if (ui && ui.item) {
      const item = ui && ui.item;
      this._currentValue = item;
      // when the user defines a "renderItem" (or "_renderItem") template, then we assume the user defines his own custom structure of label/value pair
      // otherwise we know that jQueryUI always require a label/value pair, we can pull them directly
      const hasCustomRenderItemCallback = this.columnEditor && this.columnEditor.callbacks && this.columnEditor.callbacks.hasOwnProperty('_renderItem') || (this.columnEditor && this.columnEditor.editorOptions && this.columnEditor.editorOptions.renderItem) || false;

      const itemLabel = typeof item === 'string' ? item : (hasCustomRenderItemCallback ? item[this.labelName] : item.label);
      this.setValue(itemLabel);
      this.save();
    }
    return false;
  }

  private renderCustomItem(ul: HTMLElement, item: any) {
    const templateString = this._autoCompleteOptions && this._autoCompleteOptions.renderItem && this._autoCompleteOptions.renderItem.templateCallback(item) || '';

    // sanitize any unauthorized html tags like script and others
    // for the remaining allowed tags we'll permit all attributes
    const sanitizedTemplateText = (DOMPurify.sanitize(templateString, {}) || '').toString();

    return $('<li></li>')
      .data('item.autocomplete', item)
      .append(sanitizedTemplateText)
      .appendTo(ul);
  }

  private renderCollectionItem(ul: HTMLElement, item: any) {
    const isRenderHtmlEnabled = this.columnEditor && this.columnEditor.enableRenderHtml || false;
    const prefixText = item.labelPrefix || '';
    const labelText = item.label || '';
    const suffixText = item.labelSuffix || '';
    const finalText = prefixText + labelText + suffixText;

    // sanitize any unauthorized html tags like script and others
    // for the remaining allowed tags we'll permit all attributes
    const sanitizedText = (DOMPurify.sanitize(finalText, {}) || '').toString();

    const $liDiv = $('<div></div>')[isRenderHtmlEnabled ? 'html' : 'text'](sanitizedText);
    return $('<li></li>')
      .data('item.autocomplete', item)
      .append($liDiv)
      .appendTo(ul);
  }

  private renderDomElement(collection: any[]) {
    if (!Array.isArray(collection)) {
      throw new Error('The "collection" passed to the Autocomplete Editor is not a valid array.');
    }
    const columnId = this.columnDef && this.columnDef.id || '';
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

    // add a <span> in order to add spinner styling
    $(`<span></span>`).appendTo(this.args.container);

    // user might pass his own autocomplete options
    const autoCompleteOptions: AutocompleteOption = this.columnEditor.editorOptions;

    // assign the collection to a temp variable before filtering/sorting the collection
    let finalCollection = collection;

    // user might provide his own custom structure
    // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
    if (Array.isArray(finalCollection)) {
      finalCollection = finalCollection.map((item) => {
        return { label: item[this.labelName], value: item[this.valueName], labelPrefix: item[this.labelPrefixName] || '', labelSuffix: item[this.labelSuffixName] || '' };
      });
    }

    // keep the final source collection used in the AutoComplete as reference
    this._elementCollection = finalCollection;

    // when user passes it's own autocomplete options
    // we still need to provide our own "select" callback implementation
    if (autoCompleteOptions && autoCompleteOptions.source) {
      autoCompleteOptions.select = (event: Event, ui: { item: any; }) => this.onSelect(event, ui);
      this._autoCompleteOptions = { ...autoCompleteOptions };

      // when "renderItem" is defined, we need to add our custom style CSS class
      if (this._autoCompleteOptions.renderItem) {
        this._autoCompleteOptions.classes = {
          'ui-autocomplete': `autocomplete-custom-${toKebabCase(this._autoCompleteOptions.renderItem.layout)}`
        };
      }
      // create the jQueryUI AutoComplete
      this._$editorElm.autocomplete(this._autoCompleteOptions);

      // when "renderItem" is defined, we need to call the user's custom renderItem template callback
      if (this._autoCompleteOptions.renderItem) {
        this._$editorElm.autocomplete('instance')._renderItem = this.renderCustomItem.bind(this);
      }
    } else {
      const definedOptions: AutocompleteOption = {
        source: finalCollection,
        minLength: 0,
        select: (event: Event, ui: { item: any; }) => this.onSelect(event, ui),
      };
      this._autoCompleteOptions = { ...definedOptions, ...(this.columnEditor.editorOptions as AutocompleteOption) };
      this._$editorElm.autocomplete(this._autoCompleteOptions);

      // we'll use our own renderer so that it works with label prefix/suffix and also with html rendering when enabled
      this._$editorElm.autocomplete('instance')._renderItem = this.renderCollectionItem.bind(this);
    }

    // in case the user wants to save even an empty value,
    // we need to subscribe to the onKeyDown event for that use case and clear the current value
    if (this.columnEditor.alwaysSaveOnEnterKey) {
      this._$editorElm.keydown((event: KeyboardEvent) => {
        if (event.keyCode === KeyCode.ENTER) {
          this._currentValue = null;
        }
      });
    }

    // we could optionally trigger a search when clicking on the AutoComplete
    if (this.editorOptions.openSearchListOnFocus) {
      this._$editorElm.click(() => this._$editorElm.autocomplete('search', this._$editorElm.val()));
    }

    // user might override any of the jQueryUI callback methods
    if (this.columnEditor.callbacks) {
      for (const callback of Object.keys(this.columnEditor.callbacks)) {
        if (typeof this.columnEditor.callbacks[callback] === 'function') {
          this.instance[callback] = this.columnEditor.callbacks[callback];
        }
      }
    }

    this._$editorElm.on('focus', () => this._$editorElm.select());
    setTimeout(() => this.focus(), 50);
  }
}
