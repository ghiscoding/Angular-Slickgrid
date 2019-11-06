import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import {
  CollectionCustomStructure,
  CollectionOption,
  Column,
  ColumnEditor,
  Editor,
  EditorArguments,
  EditorValidator,
  EditorValidatorOutput,
  FieldType,
  GridOption,
  MultipleSelectOption,
  SelectOption,
} from './../models/index';
import { CollectionService } from '../services/index';
import { charArraysEqual, findOrDefault, getDescendantProperty, htmlEncode, setDeepValue, unsubscribeAllObservables } from '../services/utilities';
import { Subscription } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

// using external non-typed js libraries
declare var $: any;

/**
 * Slickgrid editor class for multiple/single select lists
 */
export class SelectEditor implements Editor {
  /** The JQuery DOM element */
  $editorElm: any;

  /** Editor Multiple-Select options */
  editorElmOptions: MultipleSelectOption;

  /** DOM Element Name, useful for auto-detecting positioning (dropup / dropdown) */
  elementName: string;

  /** The multiple-select options for a multiple select list */
  defaultOptions: MultipleSelectOption;

  /** The original item values that are set at the beginning */
  originalValue: any[];

  /** The property name for values in the collection */
  valueName: string;

  /** The property name for labels in the collection */
  labelName: string;

  /** The property name for a prefix that can be added to the labels in the collection */
  labelPrefixName: string;

  /** The property name for a suffix that can be added to the labels in the collection */
  labelSuffixName: string;

  /** A label that can be added to each option and can be used as an alternative to display selected options */
  optionLabel: string;

  /** Grid options */
  gridOptions: GridOption;

  /** Do we translate the label? */
  enableTranslateLabel: boolean;

  /** Observable Subscriptions */
  _subscriptions: Subscription[] = [];

  // flag to signal that the editor is destroying itself, helps prevent
  // commit changes from being called twice and erroring
  protected _destroying = false;

  /** Collection Service */
  protected _collectionService: CollectionService;

  /** The translate library */
  protected _translate: TranslateService;

  /** SlickGrid Grid object */
  grid: any;

  constructor(protected args: EditorArguments, protected isMultipleSelect) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] Something is wrong with this grid, an Editor must always have valid arguments.');
    }
    this.grid = args.grid;
    this.gridOptions = this.grid.getOptions() as GridOption;
    const options = this.gridOptions || this.args.column.params || {};
    if (options && options.i18n instanceof TranslateService) {
      this._translate = options.i18n;
    }

    // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
    const fieldId = this.columnDef && this.columnDef.id;
    this.elementName = `editor-${fieldId}`;

    const libOptions: MultipleSelectOption = {
      autoAdjustDropHeight: true,
      autoAdjustDropPosition: true,
      autoAdjustDropWidthByTextSize: true,
      container: 'body',
      filter: false,
      maxHeight: 275,
      name: this.elementName,
      single: true,
      textTemplate: ($elm) => {
        // render HTML code or not, by default it is sanitized and won't be rendered
        const isRenderHtmlEnabled = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.enableRenderHtml || false;
        return isRenderHtmlEnabled ? $elm.text() : $elm.html();
      },
      onClose: () => this.save(),
    };

    if (isMultipleSelect) {
      libOptions.single = false;
      libOptions.addTitle = true;
      libOptions.okButton = true;
      libOptions.selectAllDelimiter = ['', ''];

      if (this._translate) {
        libOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
        libOptions.allSelected = this._translate.instant('ALL_SELECTED');
        libOptions.selectAllText = this._translate.instant('SELECT_ALL');
      }
    }

    // assign the multiple select lib options
    this.defaultOptions = libOptions;

    this.init();
  }

  /** Get the Collection */
  get collection(): SelectOption[] {
    return this.columnDef && this.columnDef.internalColumnEditor.collection || [];
  }


  /** Getter for the Collection Options */
  get collectionOptions(): CollectionOption {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
  }

  /** Get Column Definition object */
  get columnDef(): Column | undefined {
    return this.args && this.args.column;
  }

  /** Get Column Editor object */
  get columnEditor(): ColumnEditor | undefined {
    return this.columnDef && this.columnDef.internalColumnEditor;
  }

  /** Get the Editor DOM Element */
  get editorDomElement(): any {
    return this.$editorElm;
  }

  /** Getter for the Custom Structure if exist */
  protected get customStructure(): CollectionCustomStructure {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
  }

  get hasAutoCommitEdit() {
    return this.grid.getOptions().autoCommitEdit;
  }

  /**
   * The current selected values (multiple select) from the collection
   */
  get currentValues() {
    const elmValue = this.$editorElm.val();

    // collection of strings, just return the filtered string that are equals
    if (this.collection.every(x => typeof x === 'string')) {
      return this.collection.filter(c => elmValue.indexOf(c.toString()) !== -1);
    }

    // collection of label/value pair
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;

    return this.collection
      .filter(c => elmValue.indexOf(c.hasOwnProperty(this.valueName) && c[this.valueName].toString()) !== -1)
      .map(c => {
        const labelText = c[this.valueName];
        let prefixText = c[this.labelPrefixName] || '';
        let suffixText = c[this.labelSuffixName] || '';

        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        const fieldName = this.columnDef && this.columnDef.field;

        // is the field a complex object, "address.streetNumber"
        const isComplexObject = fieldName.indexOf('.') > 0;
        if (isComplexObject && typeof c === 'object') {
          return c;
        }

        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
        prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
        suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;

        if (isIncludingPrefixSuffix) {
          const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text); // add to a temp array for joining purpose and filter out empty text
          return tmpOptionArray.join(separatorBetweenLabels);
        }
        return labelText;
      });
  }

  /**
   * The current selected values (single select) from the collection
   */
  get currentValue() {
    const elmValue = this.$editorElm.val();

    // collection of strings, just return the filtered string that are equals
    if (this.collection.every(x => typeof x === 'string')) {
      return findOrDefault(this.collection, (c: any) => c.toString() === elmValue);
    }

    // collection of label/value pair
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
    const itemFound = findOrDefault(this.collection, (c: any) => c.hasOwnProperty(this.valueName) && c[this.valueName].toString() === elmValue);

    // is the field a complex object, "address.streetNumber"
    const fieldName = this.columnDef && this.columnDef.field;
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (isComplexObject && typeof itemFound === 'object') {
      return itemFound;
    } else if (itemFound) {
      const labelText = itemFound[this.valueName];

      if (isIncludingPrefixSuffix) {
        let prefixText = itemFound[this.labelPrefixName] || '';
        let suffixText = itemFound[this.labelSuffixName] || '';

        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
        prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
        suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;

        // add to a temp array for joining purpose and filter out empty text
        const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
        return tmpOptionArray.join(separatorBetweenLabels);
      }

      return labelText;
    }

    return '';
  }


  /** Get the Validator function, can be passed in Editor property or Column Definition */
  get validator(): EditorValidator {
    return this.columnEditor.validator || this.columnDef.validator;
  }

  init() {
    if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }`);
    }

    this._collectionService = new CollectionService(this._translate);
    this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
    this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
    this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
    this.valueName = this.customStructure && this.customStructure.value || 'value';

    if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
    // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
    this.renderDomElement(this.collection);
  }

  getValue(): any | any[] {
    return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
  }

  setValue(value: any | any[]) {
    if (this.isMultipleSelect && Array.isArray(value)) {
      this.loadMultipleValues(value);
    } else {
      this.loadSingleValue(value);
    }
  }

  hide() {
    if (this.$editorElm && typeof this.$editorElm.multipleSelect === 'function') {
      this.$editorElm.multipleSelect('close');
    }
  }

  show() {
    if (this.$editorElm && typeof this.$editorElm.multipleSelect === 'function') {
      this.$editorElm.multipleSelect('open');
    }
  }

  applyValue(item: any, state: any): void {
    const fieldName = this.columnDef && this.columnDef.field;
    const fieldType = this.columnDef && this.columnDef.type;
    let newValue = state;

    // when the provided user defined the column field type as a possible number then try parsing the state value as that
    if (fieldType === FieldType.number || fieldType === FieldType.integer || fieldType === FieldType.boolean) {
      newValue = parseFloat(state);
    }

    // when set as a multiple selection, we can assume that the 3rd party lib multiple-select will return a CSV string
    // we need to re-split that into an array to be the same as the original column
    if (this.isMultipleSelect && typeof state === 'string' && state.indexOf(',') >= 0) {
      newValue = state.split(',');
    }

    // is the field a complex object, "user.address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    // validate the value before applying it (if not valid we'll set an empty string)
    const validation = this.validate(newValue);
    newValue = (validation && validation.valid) ? newValue : '';

    // set the new value to the item datacontext
    if (isComplexObject) {
      // when it's a complex object, user could override the object path (where the editable object is located)
      // else we use the path provided in the Field Column Definition
      const objectPath = this.columnEditor && this.columnEditor.complexObjectPath || fieldName;
      setDeepValue(item, objectPath, newValue);
    } else {
      item[fieldName] = newValue;
    }
  }

  destroy() {
    this._destroying = true;
    if (this.$editorElm && typeof this.$editorElm.multipleSelect === 'function') {
      this.$editorElm.multipleSelect('destroy');
      const elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
      $(`[name=${elementClassName}].ms-drop`).remove();
    }
    if (this.$editorElm && typeof this.$editorElm.remove === 'function') {
      this.$editorElm.remove();
    }
    this._subscriptions = unsubscribeAllObservables(this._subscriptions);
  }

  loadValue(item: any): void {
    const fieldName = this.columnDef && this.columnDef.field;

    // is the field a complex object, "address.streetNumber"
    const isComplexObject = fieldName.indexOf('.') > 0;

    if (item && this.columnDef && (item.hasOwnProperty(fieldName) || isComplexObject)) {
      // when it's a complex object, user could override the object path (where the editable object is located)
      // else we use the path provided in the Field Column Definition
      const objectPath = this.columnEditor && this.columnEditor.complexObjectPath || fieldName;
      const currentValue = (isComplexObject) ? getDescendantProperty(item, objectPath) : item[fieldName];
      const value = (isComplexObject && currentValue.hasOwnProperty(this.valueName)) ? currentValue[this.valueName] : currentValue;

      if (this.isMultipleSelect && Array.isArray(value)) {
        this.loadMultipleValues(value);
      } else {
        this.loadSingleValue(value);
      }
      this.refresh();
    }
  }

  loadMultipleValues(currentValues: any[]) {
    // convert to string because that is how the DOM will return these values
    if (Array.isArray(currentValues)) {
      // keep the default values in memory for references
      this.originalValue = currentValues.map((i: any) => i);

      // compare all the array values but as string type since multiple-select always return string
      const currentStringValues = currentValues.map((i: any) => i.toString());
      this.$editorElm.find('option').each((i: number, $e: any) => {
        $e.selected = (currentStringValues.indexOf($e.value) !== -1);
      });
    }
  }

  loadSingleValue(currentValue: any) {
    // keep the default value in memory for references
    this.originalValue = typeof currentValue === 'number' ? `${currentValue}` : currentValue;
    this.$editorElm.val(currentValue);

    // make sure the prop exists first
    this.$editorElm.find('option').each((i: number, $e: any) => {
      // check equality after converting originalValue to string since the DOM value will always be of type string
      const strValue = currentValue && currentValue.toString && currentValue.toString();
      $e.selected = (strValue === $e.value);
    });
  }

  save() {
    // autocommit will not focus the next editor
    const validation = this.validate();
    if (validation && validation.valid && this.isValueChanged()) {
      if (!this._destroying && this.hasAutoCommitEdit) {
        // do not use args.commitChanges() as this sets the focus to the next
        // row. Also the select list will stay shown when clicking off the grid
        this.grid.getEditorLock().commitCurrentEdit();
      }
    }
  }

  serializeValue(): any | any[] {
    return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
  }

  focus() {
    if (this.$editorElm && this.$editorElm.multipleSelect) {
      this.$editorElm.multipleSelect('focus');
    }
  }

  isValueChanged(): boolean {
    if (this.isMultipleSelect) {
      return !charArraysEqual(this.$editorElm.val(), this.originalValue);
    }
    return this.$editorElm.val() !== this.originalValue;
  }

  validate(inputValue?: any): EditorValidatorOutput {
    const isRequired = this.columnEditor.required;
    const elmValue = (inputValue !== undefined) ? inputValue : this.$editorElm && this.$editorElm.val && this.$editorElm.val();
    const errorMsg = this.columnEditor.errorMessage;

    if (this.validator) {
      const value = (inputValue !== undefined) ? inputValue : (this.isMultipleSelect ? this.currentValues : this.currentValue);
      return this.validator(value, this.args);
    }

    // by default the editor is almost always valid (except when it's required but not provided)
    if (isRequired && (elmValue === '' || (Array.isArray(elmValue) && elmValue.length === 0))) {
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
  // protected functions
  // ------------------

  /**
   * user might want to filter certain items of the collection
   * @param inputCollection
   * @return outputCollection filtered and/or sorted collection
   */
  protected filterCollection(inputCollection) {
    let outputCollection = inputCollection;

    // user might want to filter certain items of the collection
    if (this.columnEditor && this.columnEditor.collectionFilterBy) {
      const filterBy = this.columnEditor.collectionFilterBy;
      const filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterResultAfterEachPass || null;
      outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
    }

    return outputCollection;
  }

  /**
   * user might want to sort the collection in a certain way
   * @param inputCollection
   * @return outputCollection sorted collection
   */
  protected sortCollection(inputCollection) {
    let outputCollection = inputCollection;

    // user might want to sort the collection
    if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
      const sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
      outputCollection = this._collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
    }

    return outputCollection;
  }

  protected renderDomElement(collection: any[]) {
    if (!Array.isArray(collection) && this.collectionOptions && (this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty)) {
      const collectionInsideObjectProperty = this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty;
      collection = getDescendantProperty(collection, collectionInsideObjectProperty);
    }
    if (!Array.isArray(collection)) {
      throw new Error('The "collection" passed to the Select Editor is not a valid array.');
    }

    // user can optionally add a blank entry at the beginning of the collection
    if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
      collection.unshift(this.createBlankEntry());
    }

    let newCollection = collection || [];

    // user might want to filter and/or sort certain items of the collection
    newCollection = this.filterCollection(newCollection);
    newCollection = this.sortCollection(newCollection);

    // step 1, create HTML string template
    const editorTemplate = this.buildTemplateHtmlString(newCollection);

    // step 2, create the DOM Element of the editor
    // also subscribe to the onClose event
    this.createDomElement(editorTemplate);
  }

  protected buildTemplateHtmlString(collection: any[]) {
    let options = '';
    const fieldId = this.columnDef && this.columnDef.id;
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
    const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};

    // collection could be an Array of Strings OR Objects
    if (collection.every(x => typeof x === 'string')) {
      collection.forEach((option: string) => {
        options += `<option value="${option}" label="${option}">${option}</option>`;
      });
    } else {
      // array of objects will require a label/value pair unless a customStructure is passed
      collection.forEach((option: SelectOption) => {
        if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
          throw new Error(`[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])`);
        }
        const labelKey = (option.labelKey || option[this.labelName]) as string;
        const labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey) ? this._translate.instant(labelKey || ' ') : labelKey;
        let prefixText = option[this.labelPrefixName] || '';
        let suffixText = option[this.labelSuffixName] || '';
        let optionLabel = option[this.optionLabel] || '';
        optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html

        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
        prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
        suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
        optionLabel = (this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? this._translate.instant(optionLabel || ' ') : optionLabel;

        // add to a temp array for joining purpose and filter out empty text
        const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
        let optionText = tmpOptionArray.join(separatorBetweenLabels);

        // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
        // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
        if (isRenderHtmlEnabled) {
          // sanitize any unauthorized html tags like script and others
          // for the remaining allowed tags we'll permit all attributes
          const sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
          optionText = htmlEncode(sanitizedText);
        }

        options += `<option value="${option[this.valueName]}" label="${optionLabel}">${optionText}</option>`;
      });
    }

    return `<select id="${this.elementName}" class="ms-filter search-filter editor-${fieldId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
  }

  /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
  protected createBlankEntry() {
    const blankEntry = {
      [this.labelName]: '',
      [this.valueName]: ''
    };
    if (this.labelPrefixName) {
      blankEntry[this.labelPrefixName] = '';
    }
    if (this.labelSuffixName) {
      blankEntry[this.labelSuffixName] = '';
    }
    return blankEntry;
  }

  /** Build the template HTML string */
  protected createDomElement(editorTemplate: string) {
    this.$editorElm = $(editorTemplate);

    if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
      this.$editorElm.appendTo(this.args.container);
    }

    // add placeholder when found
    const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
    this.defaultOptions.placeholder = placeholder || '';

    if (typeof this.$editorElm.multipleSelect !== 'function') {
      // fallback to bootstrap
      this.$editorElm.addClass('form-control');
    } else {
      const elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
      const editorOptions = (this.columnDef && this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.editorOptions : {};
      this.editorElmOptions = { ...this.defaultOptions, ...elementOptions, ...editorOptions };
      this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
      setTimeout(() => this.show());
    }
  }

  // refresh the jquery object because the selected checkboxes were already set
  // prior to this method being called
  protected refresh() {
    if (typeof this.$editorElm.multipleSelect === 'function') {
      this.$editorElm.multipleSelect('refresh');
    }
  }
}
