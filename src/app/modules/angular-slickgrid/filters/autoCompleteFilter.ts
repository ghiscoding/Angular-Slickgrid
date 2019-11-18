import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AutocompleteOption,
  CollectionCustomStructure,
  CollectionOption,
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  OperatorType,
  OperatorString,
  SearchTerm,
} from './../models/index';
import { CollectionService } from '../services/collection.service';
import { getDescendantProperty, castToPromise } from '../services/utilities';
import { Subscription, Subject, Observable } from 'rxjs';

// using external non-typed js libraries
declare var $: any;

@Injectable()
export class AutoCompleteFilter implements Filter {
  private _clearFilterTriggered = false;
  private _collection: any[];
  private _shouldTriggerQuery = true;

  /** DOM Element Name, useful for auto-detecting positioning (dropup / dropdown) */
  elementName: string;

  /** The JQuery DOM element */
  $filterElm: any;

  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;
  isFilled = false;

  /** The property name for labels in the collection */
  labelName: string;

  /** The property name for values in the collection */
  optionLabel: string;

  /** The property name for values in the collection */
  valueName = 'label';

  enableTranslateLabel = false;
  subscriptions: Subscription[] = [];

  /**
   * Initialize the Filter
   */
  constructor(protected translate: TranslateService, protected collectionService: CollectionService) { }

  /** Getter for the Collection Options */
  protected get collectionOptions(): CollectionOption {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions || {};
  }

  /** Getter for the Collection Used by the Filter */
  get collection(): any[] {
    return this._collection;
  }

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter for the Custom Structure if exist */
  get customStructure(): CollectionCustomStructure | undefined {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.equal;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Getter of the Operator to use when doing the filter comparing */
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
  init(args: FilterArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
    }
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync && !this.columnFilter.filterOptions)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the AutoComplete Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.autoComplete, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
    }

    this.enableTranslateLabel = this.columnFilter && this.columnFilter.enableTranslateLabel || false;
    this.labelName = this.customStructure && this.customStructure.label || 'label';
    this.valueName = this.customStructure && this.customStructure.value || 'value';

    // always render the DOM element, even if user passed a "collectionAsync",
    const newCollection = this.columnFilter.collection || [];
    this._collection = newCollection;
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
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.$filterElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      this.$filterElm.val('');
      this.$filterElm.trigger('keyup');
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off('keyup').remove();
    }
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm | SearchTerm[], operator?: OperatorType | OperatorString) {
    if (values) {
      this.$filterElm.val(values);
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
  protected filterCollection(inputCollection: any[]): any[] {
    let outputCollection = inputCollection;

    // user might want to filter certain items of the collection
    if (this.columnFilter && this.columnFilter.collectionFilterBy) {
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
  protected sortCollection(inputCollection: any[]): any[] {
    let outputCollection = inputCollection;

    // user might want to sort the collection
    if (this.columnFilter && this.columnFilter.collectionSortBy) {
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
    this._collection = collection;
    if (this.collectionOptions && (this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty)) {
      const collectionInsideObjectProperty = this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty;
      collection = getDescendantProperty(collection, collectionInsideObjectProperty);
    }
    if (!Array.isArray(collection)) {
      throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the AutoComplete Filter, the collection is not a valid array.');
    }

    // copy over the array received from the async call to the "collection" as the new collection to use
    // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
    this.columnFilter.collection = collection;

    // recreate Filter DOM element after getting async collection
    this.renderDomElement(collection);
  }

  protected renderDomElement(collection: any[]) {
    if (!Array.isArray(collection) && this.collectionOptions && (this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty)) {
      const collectionInsideObjectProperty = this.collectionOptions.collectionInsideObjectProperty || this.collectionOptions.collectionInObjectProperty;
      collection = getDescendantProperty(collection, collectionInsideObjectProperty);
    }
    if (!Array.isArray(collection)) {
      throw new Error('The "collection" passed to the Autocomplete Filter is not a valid array.');
    }

    // assign the collection to a temp variable before filtering/sorting the collection
    let newCollection = collection;

    // user might want to filter and/or sort certain items of the collection
    newCollection = this.filterCollection(newCollection);
    newCollection = this.sortCollection(newCollection);

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & pre-load search term
    // also subscribe to the onSelect event
    this._collection = newCollection;
    this.$filterElm = this.createDomElement(filterTemplate, newCollection, searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterElm.on('keyup', (e: any) => {
      let value = e && e.target && e.target.value || '';
      const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
      if (typeof value === 'string' && enableWhiteSpaceTrim) {
        value = value.trim();
      }

      if (this._clearFilterTriggered) {
        this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
        this.$filterElm.removeClass('filled');
      } else {
        value === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
        this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
      }
      // reset both flags for next use
      this._clearFilterTriggered = false;
      this._shouldTriggerQuery = true;
    });
  }

  /**
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString() {
    const columnId = this.columnDef && this.columnDef.id;
    let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }
    return `<input type="text" role="presentation" autocomplete="off" class="form-control autocomplete search-filter filter-${columnId}" placeholder="${placeholder}">`;
  }

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createDomElement(filterTemplate: string, collection: any[], searchTerm?: SearchTerm) {
    const columnId = this.columnDef && this.columnDef.id;
    const $headerElm = this.grid.getHeaderRowColumn(columnId);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    const $filterElm = $(filterTemplate) as any;
    const searchTermInput = searchTerm as string;

    // user might provide his own custom structure
    // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
    if (Array.isArray(collection) && this.customStructure) {
      collection = collection.map((item) => {
        return { label: item[this.labelName], value: item[this.valueName] };
      });
    }

    // user might pass his own autocomplete options
    const autoCompleteOptions: AutocompleteOption = this.columnFilter.filterOptions;

    // when user passes it's own autocomplete options
    // we still need to provide our own "select" callback implementation
    if (autoCompleteOptions) {
      autoCompleteOptions.select = (event: Event, ui: any) => this.onSelect(event, ui);
      $filterElm.autocomplete(autoCompleteOptions);
    } else {
      $filterElm.autocomplete({
        minLength: 0,
        source: collection,
        select: (event: Event, ui: any) => this.onSelect(event, ui),
      });
    }

    $filterElm.val(searchTermInput);
    $filterElm.attr('id', `filter-${columnId}`);
    $filterElm.data('columnId', columnId);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      $filterElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterElm && typeof $filterElm.appendTo === 'function') {
      $filterElm.appendTo($headerElm);
    }

    return $filterElm;
  }

  //
  // private functions
  // ------------------

  // this function should be PRIVATE but for unit tests purposes we'll make it public until a better solution is found
  // a better solution would be to get the autocomplete DOM element to work with selection but I couldn't find how to do that in Jest
  onSelect(event: Event, ui: any): boolean {
    if (ui && ui.item) {
      const itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
      const itemValue = typeof ui.item === 'string' ? ui.item : ui.item.value;
      this.setValues(itemLabel);
      itemValue === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
      this.callback(event, { columnDef: this.columnDef, operator: this.operator, searchTerms: [itemValue], shouldTriggerQuery: this._shouldTriggerQuery });

      // reset both flags for next use
      this._clearFilterTriggered = false;
      this._shouldTriggerQuery = true;
    }
    return false;
  }
}
