import { TranslateService } from '@ngx-translate/core';
import {
  CollectionCustomStructure,
  CollectionOption,
  Column,
  Editor,
  EditorValidator,
  EditorValidatorOutput,
  GridOption,
  MultipleSelectOption,
  SelectOption,
} from './../models/index';
import { CollectionService } from '../services/index';
import { arraysEqual, findOrDefault, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Subscription } from 'rxjs/Subscription';
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

  /** The default item values that are set */
  defaultValue: any[];

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

  /** The i18n aurelia library */
  protected _translate: TranslateService;

  constructor(protected args: any, protected isMultipleSelect) {
    this.gridOptions = this.args.grid.getOptions() as GridOption;
    const gridOptions = this.gridOptions || this.args.column.params || {};
    this._translate = gridOptions.i18n;

    // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
    const fieldId = this.columnDef && this.columnDef.field || this.columnDef && this.columnDef.id;
    this.elementName = `editor_${fieldId}`;

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
      onBlur: () => this.destroy(),
      onClose: () => {
        if (!this._destroying && args.grid.getOptions().autoCommitEdit) {
          // do not use args.commitChanges() as this sets the focus to the next
          // row. Also the select list will stay shown when clicking off the grid
          args.grid.getEditorLock().commitCurrentEdit();
        }
      }
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
  get collection(): any[] {
    return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
  }

  /** Getter for the Collection Options */
  get collectionOptions(): CollectionOption {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
  }

  /** Get Column Definition object */
  get columnDef(): Column {
    return this.args && this.args.column || {};
  }

  /** Get Column Editor object */
  get columnEditor(): any {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
  }

  /** Getter for the Custom Structure if exist */
  protected get customStructure(): CollectionCustomStructure {
    return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
  }

  /**
   * The current selected values (multiple select) from the collection
   */
  get currentValues() {
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;

    return this.collection
      .filter(c => this.$editorElm.val().indexOf(c[this.valueName].toString()) !== -1)
      .map(c => {
        const labelText = c[this.valueName];
        const prefixText = c[this.labelPrefixName] || '';
        const suffixText = c[this.labelSuffixName] || '';

        if (isIncludingPrefixSuffix) {
          return (prefixText + separatorBetweenLabels + labelText + separatorBetweenLabels + suffixText);
        }
        return labelText;
      });
  }


  /**
   * The current selected values (single select) from the collection
   */
  get currentValue() {
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
    const itemFound = findOrDefault(this.collection, (c: any) => c[this.valueName].toString() === this.$editorElm.val());

    if (itemFound) {
      const labelText = itemFound[this.valueName];

      if (isIncludingPrefixSuffix) {
        const prefixText = itemFound[this.labelPrefixName] || '';
        const suffixText = itemFound[this.labelSuffixName] || '';
        return (prefixText + separatorBetweenLabels + labelText + separatorBetweenLabels + suffixText);
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
    if (!this.args) {
      throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
    }

    if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }`);
    }

    this._collectionService = new CollectionService(this._translate);
    this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
    this.labelName = (this.customStructure) ? this.customStructure.label : 'label';
    this.labelPrefixName = (this.customStructure) ? this.customStructure.labelPrefix : 'labelPrefix';
    this.labelSuffixName = (this.customStructure) ? this.customStructure.labelSuffix : 'labelSuffix';
    this.optionLabel = (this.customStructure) ? this.customStructure.optionLabel : 'value';
    this.valueName = (this.customStructure) ? this.customStructure.value : 'value';

    // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
    // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
    this.renderDomElement(this.collection);
  }

  applyValue(item: any, state: any): void {
    item[this.columnDef.field] = state;
  }

  destroy() {
    this._destroying = true;
    if (this.$editorElm && this.$editorElm.multipleSelect) {
      this.$editorElm.multipleSelect('close');
      this.$editorElm.remove();
    }
    this._subscriptions = unsubscribeAllObservables(this._subscriptions);
  }

  loadValue(item: any): void {
    if (this.isMultipleSelect) {
      this.loadMultipleValues(item);
    } else {
      this.loadSingleValue(item);
    }

    this.refresh();
  }

  loadMultipleValues(items: any[]) {
    // convert to string because that is how the DOM will return these values
    this.defaultValue = items[this.columnDef.field].map((i: any) => i.toString());
    this.$editorElm.find('option').each((i: number, $e: any) => {
      $e.selected = (this.defaultValue.indexOf($e.value) !== -1);
    });
  }

  loadSingleValue(item: any) {
    // convert to string because that is how the DOM will return these values
    // make sure the prop exists first
    this.defaultValue = item[this.columnDef.field] && item[this.columnDef.field].toString();

    this.$editorElm.find('option').each((i: number, $e: any) => {
      $e.selected = (this.defaultValue === $e.value);
    });
  }

  serializeValue(): any {
    return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
  }

  focus() {
    if (this.$editorElm && this.$editorElm.multipleSelect) {
      this.$editorElm.multipleSelect('focus');
    }
  }

  isValueChanged(): boolean {
    if (this.isMultipleSelect) {
      return !arraysEqual(this.$editorElm.val(), this.defaultValue);
    }
    return this.$editorElm.val() !== this.defaultValue;
  }

  validate(): EditorValidatorOutput {
    if (this.validator) {
      const value = this.isMultipleSelect ? this.currentValues : this.currentValue;
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
      const filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterAfterEachPass || null;
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
      outputCollection = this._collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
    }

    return outputCollection;
  }

  protected renderDomElement(collection: any[]) {
    if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
      collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
    }
    if (!Array.isArray(collection)) {
      throw new Error('The "collection" passed to the Select Editor is not a valid array');
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
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
    const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};

    collection.forEach((option: SelectOption) => {
      if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])`);
      }
      const labelKey = (option.labelKey || option[this.labelName]) as string;
      const labelText = ((option.labelKey || this.enableTranslateLabel) && this._translate && typeof this._translate.instant === 'function') ? this._translate.instant(labelKey || ' ') : labelKey;
      const prefixText = option[this.labelPrefixName] || '';
      const suffixText = option[this.labelSuffixName] || '';
      let optionLabel = option[this.optionLabel] || '';
      optionLabel = optionLabel.toString().replace(/""/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
      let optionText = (prefixText + separatorBetweenLabels + labelText + separatorBetweenLabels + suffixText);

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

    return `<select id="${this.elementName}" class="ms-filter search-filter" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
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

    if (typeof this.$editorElm.multipleSelect !== 'function') {
      // fallback to bootstrap
      this.$editorElm.addClass('form-control');
    } else {
      const elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
      this.editorElmOptions = { ...this.defaultOptions, ...elementOptions };
      this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
      setTimeout(() => this.$editorElm.multipleSelect('open'));
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
