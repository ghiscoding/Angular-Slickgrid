import { TranslateService } from '@ngx-translate/core';
import {
  Editor,
  Column,
  GridOption,
  MultipleSelectOption,
  SelectOption
} from './../models/index';
import { findOrDefault, CollectionService } from '../services/index';

// using external non-typed js libraries
declare var $: any;

/**
 * Slickgrid editor class for single select lists
 */
export class SingleSelectEditor implements Editor {
  /** The JQuery DOM element */
  $editorElm: any;

  /** The slick grid column being edited */
  columnDef: Column;

  /** The multiple-select options for a single select */
  defaultOptions: any;

  /** The default item value that is set */
  defaultValue: any;

  /** The options label/value object to use in the select list */
  collection: SelectOption[] = [];

  /** The property name for values in the collection */
  valueName: string;

  /** The property name for labels in the collection */
  labelName: string;

  /** Grid options */
  gridOptions: GridOption;

  /** Do we translate the label? */
  enableTranslateLabel: boolean;

  /** The i18n aurelia library */
  private _translate: TranslateService;

  constructor(private args: any) {
    this.gridOptions = this.args.grid.getOptions() as GridOption;
    const params = this.gridOptions.params || this.args.column.params || {};
    this._translate = params.i18n;

    this.defaultOptions = {
      container: 'body',
      filter: false,
      maxHeight: 200,
      width: 150,
      offsetLeft: 20,
      single: true
    };

    this.init();
  }

  /**
   * The current selected value from the collection
   */
  get currentValue() {
    return findOrDefault(this.collection, (c: any) =>
      c[this.valueName].toString() === this.$editorElm.val())[this.valueName];
  }

  init() {
    if (!this.args) {
      throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
    }

    this.columnDef = this.args.column;

    if (!this.columnDef || !this.columnDef.params || !this.columnDef.params.collection) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" on the params property in the column definition for the MultipleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { params: { { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } } }`);
    }

    const collectionService = new CollectionService(this._translate);
    this.enableTranslateLabel = (this.columnDef.params.enableTranslateLabel) ? this.columnDef.params.enableTranslateLabel : false;
    let newCollection =  this.columnDef.params.collection || [];
    this.labelName = (this.columnDef.params.customStructure) ? this.columnDef.params.customStructure.label : 'label';
    this.valueName = (this.columnDef.params.customStructure) ? this.columnDef.params.customStructure.value : 'value';

    // user might want to filter certain items of the collection
    if (this.gridOptions.params && this.columnDef.params.collectionFilterBy) {
      const filterBy = this.columnDef.params.collectionFilterBy;
      newCollection = collectionService.filterCollection(newCollection, filterBy);
    }

    // user might want to sort the collection
    if (this.gridOptions.params && this.columnDef.params.collectionSortBy) {
      const sortBy = this.columnDef.params.collectionSortBy;
      newCollection = collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
    }

    const editorTemplate = this.buildTemplateHtmlString(newCollection);

    this.createDomElement(editorTemplate);
  }

  applyValue(item: any, state: any): void {
    item[this.args.column.field] = state;
  }

  destroy() {
    this.$editorElm.remove();
  }

  loadValue(item: any): void {
    // convert to string because that is how the DOM will return these values
    this.defaultValue = item[this.columnDef.field].toString();

    this.$editorElm.find('option').each((i: number, $e: any) => {
      if (this.defaultValue.indexOf($e.value) !== -1) {
        $e.selected = true;
      } else {
        $e.selected = false;
      }
    });

    this.refresh();
  }

  serializeValue(): any {
    return this.currentValue;
  }

  focus() {
    this.$editorElm.focus();
  }

  isValueChanged(): boolean {
    return this.$editorElm.val() !== this.defaultValue;
  }

  validate() {
    if (this.args.column.validator) {
      const validationResults = this.args.column.validator(this.currentValue, this.args);
      if (!validationResults.valid) {
        return validationResults;
      }
    }

    return {
      valid: true,
      msg: null
    };
  }

  private buildTemplateHtmlString(collection: any[]) {
    let options = '';
    collection.forEach((option: SelectOption) => {
      if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
        throw new Error('A collection with value/label (or value/labelKey when using ' +
          'Locale) is required to populate the Select list, for example: { params: { ' +
          '{ collection: [ { value: \'1\', label: \'One\' } ] } } }');
      }
      const labelKey = (option.labelKey || option[this.labelName]) as string;
      const textLabel = ((option.labelKey || this.enableTranslateLabel) && this._translate && typeof this._translate.instant === 'function') ? this._translate.instant(labelKey || ' ') : labelKey;

      options += `<option value="${option[this.valueName]}">${textLabel}</option>`;
    });

    return `<select class="ms-filter search-filter">${options}</select>`;
  }

  private createDomElement(editorTemplate: string) {
    this.$editorElm = $(editorTemplate);

    if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
      this.$editorElm.appendTo(this.args.container);
    }

    if (typeof this.$editorElm.multipleSelect !== 'function') {
      // fallback to bootstrap
      this.$editorElm.addClass('form-control');
    } else {
      const elementOptions = (this.columnDef.params) ? this.columnDef.params.elementOptions : {};
      const options: MultipleSelectOption = { ...this.defaultOptions, ...elementOptions };
      this.$editorElm = this.$editorElm.multipleSelect(options);
      setTimeout(() => this.$editorElm.multipleSelect('open'));
    }
  }

  // refresh the jquery object because the selected checkboxes were already set
  // prior to this method being called
  private refresh() {
    if (typeof this.$editorElm.multipleSelect === 'function') {
      this.$editorElm.multipleSelect('refresh');
    }
  }
}
