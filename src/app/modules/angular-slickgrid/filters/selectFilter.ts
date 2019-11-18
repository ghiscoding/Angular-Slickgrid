import { Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CollectionCustomStructure,
  CollectionOption,
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  MultipleSelectOption,
  OperatorType,
  OperatorString,
  SearchTerm,
  SelectOption,
} from './../models/index';
import { Constants } from './../constants';
import { Locale } from './../models/locale.interface';
import { CollectionService } from './../services/collection.service';
import { castToPromise, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Observable, Subject, Subscription } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

// using external non-typed js libraries
declare var $: any;

export class SelectFilter implements Filter {
  private _isFilterFirstRender = true;
  private _isMultipleSelect = true;
  private _locales: Locale;
  private _shouldTriggerQuery = true;

  /** DOM Element Name, useful for auto-detecting positioning (dropup / dropdown) */
  elementName: string;

  /** Filter Multiple-Select options */
  filterElmOptions: MultipleSelectOption;

  /** The JQuery DOM element */
  $filterElm: any;

  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;
  defaultOptions: MultipleSelectOption;
  isFilled = false;
  labelName: string;
  labelPrefixName: string;
  labelSuffixName: string;
  optionLabel: string;
  valueName: string;
  enableTranslateLabel = false;
  subscriptions: Subscription[] = [];

  /**
   * Initialize the Filter
   */
  constructor(@Optional() protected translate: TranslateService, protected collectionService: CollectionService, isMultipleSelect = true) {
    this._isMultipleSelect = isMultipleSelect;
  }

  /** Getter for the Column Filter itself */
  protected get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter;
  }

  /** Getter for the Collection Options */
  protected get collectionOptions(): CollectionOption {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
  }

  /** Getter for the Custom Structure if exist */
  protected get customStructure(): CollectionCustomStructure {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  protected get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
  }

  /** Getter to know if the current filter is a multiple-select (false means it's a single select) */
  get isMultipleSelect(): boolean {
    return this._isMultipleSelect;
  }

  /** Getter for the filter operator */
  get operator(): OperatorType | OperatorString {
    return this.columnFilter && this.columnFilter.operator || this.defaultOperator;
  }

  /** Setter for the filter operator */
  set operator(operator: OperatorType | OperatorString) {
    if (this.columnFilter) {
      this.columnFilter.operator = operator;
    }
  }

  /**
   * Initialize the filter template
   */
  init(args: FilterArguments, isFilterFirstRender: boolean) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
    }
    this._isFilterFirstRender = isFilterFirstRender;
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
    }

    this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
    this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
    this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
    this.valueName = this.customStructure && this.customStructure.value || 'value';

    if (this.enableTranslateLabel && !this.gridOptions.enableTranslate && (!this.translate || typeof this.translate.instant !== 'function')) {
      throw new Error(`[select-filter] The ngx-translate TranslateService is required for the Select Filter to work correctly when "enableTranslateLabel" is set.`);
    }

    // get locales provided by user in forRoot or else use default English locales via the Constants
    this._locales = this.gridOptions && this.gridOptions.locales || Constants.locales;

    // create the multiple select element
    this.initMultipleSelect();

    // add placeholder when found
    let placeholder = this.gridOptions && this.gridOptions.defaultFilterPlaceholder || '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }
    this.defaultOptions.placeholder = placeholder || '';

    // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
    // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
    const newCollection = this.columnFilter.collection || [];
    this.renderDomElement(newCollection);

    // on every Filter which have a "collection" or a "collectionAsync"
    // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
    // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
    const collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
    if (collectionAsync) {
      this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
    }
  }

  /**
   * Clear the filter values
   */
  clear(shouldTriggerQuery = true) {
    if (this.$filterElm && this.$filterElm.multipleSelect) {
      // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
      this.$filterElm.multipleSelect('setSelects', []);
      this.$filterElm.removeClass('filled');
      this.$filterElm.siblings('div .search-filter').removeClass('filled');
      this.searchTerms = [];
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true, shouldTriggerQuery: this._shouldTriggerQuery });
      // reset both flags for next use
      this._shouldTriggerQuery = true;
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      // remove event watcher
      this.$filterElm.off().remove();
      const elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
      $(`[name=${elementClassName}].ms-drop`).remove();
    }

    // also dispose of all Subscriptions
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  /**
   * Get selected values retrieved from the multiple-selected element
   * @params selected items
   */
  getValues(): any[] {
    if (this.$filterElm && typeof this.$filterElm.multipleSelect === 'function') {
      return this.$filterElm.multipleSelect('getSelects');
    }
    return [];
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm | SearchTerm[], operator?: OperatorType | OperatorString) {
    if (values && this.$filterElm && typeof this.$filterElm.multipleSelect === 'function') {
      values = Array.isArray(values) ? values : [values];
      this.$filterElm.multipleSelect('setSelects', values);
    }

    // set the operator when defined
    this.operator = operator || this.defaultOperator;
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
    if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
      const filterBy = this.columnFilter.collectionFilterBy;
      const filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
      outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
    }

    return outputCollection;
  }

  /**
   * user might want to sort the collection in a certain way
   * @param inputCollection
   * @return outputCollection filtered and/or sorted collection
   */
  protected sortCollection(inputCollection) {
    let outputCollection = inputCollection;

    // user might want to sort the collection
    if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
      const sortBy = this.columnFilter.collectionSortBy;
      outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
    }

    return outputCollection;
  }

  protected async renderOptionsAsync(collectionAsync: Promise<any> | Observable<any> | Subject<any>) {
    let awaitedCollection: any = [];

    if (collectionAsync) {
      awaitedCollection = await castToPromise(collectionAsync);
      this.renderDomElementFromCollectionAsync(awaitedCollection);

      // because we accept Promises & HttpClient Observable only execute once
      // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
      // doing this provide the user a way to call a "collectionAsync.next()"
      this.createCollectionAsyncSubject();
    }
  }

  /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
  protected createCollectionAsyncSubject() {
    const newCollectionAsync = new Subject<any>();
    this.columnFilter.collectionAsync = newCollectionAsync;
    this.subscriptions.push(
      newCollectionAsync.subscribe(collection => this.renderDomElementFromCollectionAsync(collection))
    );
  }

  /**
   * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
   * and reinitialize filter collection with this new collection
   */
  protected renderDomElementFromCollectionAsync(collection) {
    if (this.collectionOptions && (this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty)) {
      const collectionInsideObjectProperty = this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty;
      collection = getDescendantProperty(collection, collectionInsideObjectProperty);
    }
    if (!Array.isArray(collection)) {
      throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
    }

    // copy over the array received from the async call to the "collection" as the new collection to use
    // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
    this.columnFilter.collection = collection;

    // recreate Multiple Select after getting async collection
    this.renderDomElement(collection);
  }

  protected renderDomElement(collection) {
    if (!Array.isArray(collection) && this.collectionOptions && (this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty)) {
      const collectionInsideObjectProperty = this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty;
      collection = getDescendantProperty(collection, collectionInsideObjectProperty);
    }
    if (!Array.isArray(collection)) {
      throw new Error('The "collection" passed to the Select Filter is not a valid array.');
    }

    // user can optionally add a blank entry at the beginning of the collection
    if (this.collectionOptions && this.collectionOptions.addBlankEntry && this._isFilterFirstRender) {
      collection.unshift(this.createBlankEntry());
    }

    let newCollection = collection;

    // user might want to filter and/or sort certain items of the collection
    newCollection = this.filterCollection(newCollection);
    newCollection = this.sortCollection(newCollection);

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);

    // step 2, create the DOM Element of the filter & pre-load search terms
    // also subscribe to the onClose event
    this.createDomElement(filterTemplate);
  }

  /** Create the HTML template as a string */
  protected buildTemplateHtmlString(optionCollection: any[], searchTerms: SearchTerm[]) {
    let options = '';
    const columnId = this.columnDef && this.columnDef.id;
    const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
    const isEnableTranslate = this.gridOptions && this.gridOptions.enableTranslate;
    const isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
    const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};

    // collection could be an Array of Strings OR Objects
    if (Array.isArray(optionCollection)) {
      if (optionCollection.every(x => typeof x === 'string')) {
        optionCollection.forEach((option: string) => {
          const selected = (searchTerms.findIndex((term) => term === option) >= 0) ? 'selected' : '';
          options += `<option value="${option}" label="${option}" ${selected}>${option}</option>`;

          // if there's at least 1 search term found, we will add the "filled" class for styling purposes
          // on a single select, we'll also make sure the single value is not an empty string to consider this being filled
          if ((selected && this.isMultipleSelect) || (selected && !this.isMultipleSelect && option !== '')) {
            this.isFilled = true;
          }
        });
      } else {
        // array of objects will require a label/value pair unless a customStructure is passed
        optionCollection.forEach((option: SelectOption) => {
          if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
            throw new Error(`[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
          }
          const labelKey = (option.labelKey || option[this.labelName]) as string;
          const selected = (searchTerms.findIndex((term) => term === option[this.valueName]) >= 0) ? 'selected' : '';
          const labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey && isEnableTranslate) ? this.translate && this.translate.instant(labelKey || ' ') : labelKey;
          let prefixText = option[this.labelPrefixName] || '';
          let suffixText = option[this.labelSuffixName] || '';
          let optionLabel = option.hasOwnProperty(this.optionLabel) ? option[this.optionLabel] : '';
          optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html

          // also translate prefix/suffix if enableTranslateLabel is true and text is a string
          prefixText = (this.enableTranslateLabel && isEnableTranslate && prefixText && typeof prefixText === 'string') ? this.translate && this.translate.instant(prefixText || ' ') : prefixText;
          suffixText = (this.enableTranslateLabel && isEnableTranslate && suffixText && typeof suffixText === 'string') ? this.translate && this.translate.instant(suffixText || ' ') : suffixText;
          optionLabel = (this.enableTranslateLabel && isEnableTranslate && optionLabel && typeof optionLabel === 'string') ? this.translate && this.translate.instant(optionLabel || ' ') : optionLabel;

          // add to a temp array for joining purpose and filter out empty text
          const tmpOptionArray = [prefixText, labelText !== undefined ? labelText.toString() : labelText, suffixText].filter((text) => text);
          let optionText = tmpOptionArray.join(separatorBetweenLabels);

          // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
          // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
          if (isRenderHtmlEnabled) {
            // sanitize any unauthorized html tags like script and others
            // for the remaining allowed tags we'll permit all attributes
            const sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
            optionText = htmlEncode(sanitizedText);
          }

          // html text of each select option
          options += `<option value="${option[this.valueName]}" label="${optionLabel}" ${selected}>${optionText}</option>`;

          // if there's at least 1 search term found, we will add the "filled" class for styling purposes
          // on a single select, we'll also make sure the single value is not an empty string to consider this being filled
          if ((selected && this.isMultipleSelect) || (selected && !this.isMultipleSelect && option[this.valueName] !== '')) {
            this.isFilled = true;
          }
        });
      }
    }

    return `<select class="ms-filter search-filter filter-${columnId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
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

  /**
   * From the html template string, create a DOM element
   * Subscribe to the onClose event and run the callback when that happens
   * @param filterTemplate
   */
  protected createDomElement(filterTemplate: string) {
    const fieldId = this.columnDef && this.columnDef.id;

    // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
    this.elementName = `filter-${fieldId}`;
    this.defaultOptions.name = this.elementName;

    const $headerElm = this.grid.getHeaderRowColumn(fieldId);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    this.$filterElm = $(filterTemplate);
    if (typeof this.$filterElm.multipleSelect !== 'function') {
      throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
    }
    this.$filterElm.attr('id', this.elementName);
    this.$filterElm.attr('name', this.elementName);
    this.$filterElm.data('columnId', fieldId);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (this.isFilled) {
      this.$filterElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
      this.$filterElm.appendTo($headerElm);
    }

    // merge options & attach multiSelect
    const filterOptions: MultipleSelectOption = { ...this.defaultOptions, ...this.columnFilter.filterOptions };
    this.filterElmOptions = { ...this.defaultOptions, ...(filterOptions as MultipleSelectOption) };
    this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
  }

  /** Initialize the Multiple Select element and its options to use */
  protected initMultipleSelect() {
    // default options used by this Filter, user can overwrite any of these by passing "otions"
    const options: MultipleSelectOption = {
      autoAdjustDropHeight: true,
      autoAdjustDropPosition: true,
      autoAdjustDropWidthByTextSize: true,
      container: 'body',
      filter: false,  // input search term on top of the select option list
      maxHeight: 275,
      single: true,

      textTemplate: ($elm) => {
        // are we rendering HTML code? by default it is sanitized and won't be rendered
        const isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;
        return isRenderHtmlEnabled ? $elm.text() : $elm.html();
      },
      onClose: () => {
        // we will subscribe to the onClose event for triggering our callback
        // also add/remove "filled" class for styling purposes
        this.onTriggerEvent(undefined);
      }
    };

    if (this.isMultipleSelect) {
      options.single = false;
      options.okButton = true;
      options.addTitle = true; // show tooltip of all selected items while hovering the filter
      options.countSelected = this.translate && this.translate.instant && this.translate.instant('X_OF_Y_SELECTED') || this._locales && this._locales.TEXT_X_OF_Y_SELECTED;
      options.allSelected = this.translate && this.translate.instant && this.translate.instant('ALL_SELECTED') || this._locales && this._locales.TEXT_ALL_SELECTED;
      options.okButtonText = this.translate && this.translate.instant && this.translate.instant('OK') || this._locales && this._locales.TEXT_OK;
      options.selectAllText = this.translate && this.translate.instant && this.translate.instant('SELECT_ALL') || this._locales && this._locales.TEXT_SELECT_ALL;
      options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
    }

    this.defaultOptions = options;
  }

  private onTriggerEvent(e: Event | undefined) {
    const selectedItems = this.getValues();
    if (Array.isArray(selectedItems) && selectedItems.length > 1 || (selectedItems.length === 1 && selectedItems[0] !== '')) {
      this.isFilled = true;
      this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
    } else {
      this.isFilled = false;
      this.$filterElm.removeClass('filled');
      this.$filterElm.siblings('div .search-filter').removeClass('filled');
    }

    this.searchTerms = selectedItems;
    this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: selectedItems, shouldTriggerQuery: this._shouldTriggerQuery });
    // reset flag for next use
    this._shouldTriggerQuery = true;
  }
}
