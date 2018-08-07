import { TranslateService } from '@ngx-translate/core';
import {
  Column,
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
import { CollectionService } from './../services/collection.service';
import { castToPromise, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

// using external non-typed js libraries
declare var $: any;

export class SelectFilter implements Filter {
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
  valueName: string;
  enableTranslateLabel = false;
  subscriptions: Subscription[] = [];

  /**
   * Initialize the Filter
   */
  constructor(protected translate: TranslateService, protected collectionService: CollectionService, protected isMultipleSelect = true) {
    // default options used by this Filter, user can overwrite any of these by passing "otions"
    const options: MultipleSelectOption = {
      container: 'body',
      filter: false,  // input search term on top of the select option list
      maxHeight: 200,
      single: true,

      textTemplate: ($elm) => {
        // render HTML code or not, by default it is sanitized and won't be rendered
        const isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;
        return isRenderHtmlEnabled ? $elm.text() : $elm.html();
      },
      onClose: () => {
        // we will subscribe to the onClose event for triggering our callback
        // also add/remove "filled" class for styling purposes
        const selectedItems = this.$filterElm.multipleSelect('getSelects');
        if (Array.isArray(selectedItems) && selectedItems.length > 0) {
          this.isFilled = true;
          this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
        } else {
          this.isFilled = false;
          this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
        }

        this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: selectedItems });
      }
    };

    if (this.isMultipleSelect) {
      options.single = false;
      options.okButton = true;
      options.addTitle = true; // show tooltip of all selected items while hovering the filter
      options.countSelected = this.translate.instant('X_OF_Y_SELECTED');
      options.allSelected = this.translate.instant('ALL_SELECTED');
      options.selectAllText = this.translate.instant('SELECT_ALL');
      options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
    }

    this.defaultOptions = options;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  protected get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  get operator(): OperatorType | OperatorString {
    return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.in;
  }

  /**
   * Initialize the filter template
   */
  async init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = args.searchTerms || [];

    if (!this.grid || !this.columnDef || !this.columnDef.filter || (!this.columnDef.filter.collection && !this.columnDef.filter.collectionAsync)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
    }

    this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
    this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
    this.labelPrefixName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.labelPrefix : 'labelPrefix';
    this.labelSuffixName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.labelSuffix : 'labelSuffix';
    this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

    // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
    // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
    let newCollection = this.columnDef.filter.collection || [];
    this.renderDomElement(newCollection);

    const collectionAsync = this.columnDef.filter.collectionAsync;
    if (collectionAsync) {
      newCollection = await this.renderOptionsAsync(collectionAsync);
    }
  }

  /**
   * Clear the filter values
   */
  clear() {
    if (this.$filterElm && this.$filterElm.multipleSelect) {
      // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
      this.$filterElm.multipleSelect('setSelects', []);
      this.$filterElm.removeClass('filled');
      this.searchTerms = [];
      this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off().remove();
    }
    this.subscriptions = unsubscribeAllObservables(this.subscriptions);
  }

  /**
   * Set value(s) on the DOM element
   */
  setValues(values: SearchTerm | SearchTerm[]) {
    if (values) {
      values = Array.isArray(values) ? values : [values];
      this.$filterElm.multipleSelect('setSelects', values);
    }
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
    if (this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionFilterBy) {
      const filterBy = this.columnDef.filter.collectionFilterBy;
      outputCollection = this.collectionService.filterCollection(outputCollection, filterBy);
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
    if (this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionSortBy) {
      const sortBy = this.columnDef.filter.collectionSortBy;
      outputCollection = this.collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
    }

    return outputCollection;
  }

  protected async renderOptionsAsync(collectionAsync: Promise<any> | Observable<any> | Subject<any>): Promise<any[]> {
    let awaitedCollection: any = [];

    if (collectionAsync) {
      awaitedCollection = await castToPromise(collectionAsync);
      this.renderDomElementFromCollectionAsync(awaitedCollection);

      // because we accept Promises & HttpClient Observable only execute once
      // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
      // doing this provide the user a way to call a "collectionAsync.next()"
      this.createNewCollectionAsyncObservable();
    }

    return awaitedCollection;
  }

  /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
  protected createNewCollectionAsyncObservable() {
    const newCollectionAsync = new Subject<any>();
    this.columnDef.filter.collectionAsync = newCollectionAsync;
    this.subscriptions.push(
      newCollectionAsync.subscribe(collection => this.renderDomElementFromCollectionAsync(collection))
    );
  }

  /**
   * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
   * and reinitialize filter collection with this new collection
   */
  protected renderDomElementFromCollectionAsync(collection) {
    if (!Array.isArray(collection)) {
      throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call');
    }

    // copy over the array received from the async call to the "collection" as the new collection to use
    // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
    this.columnDef.filter.collection = collection;

    // recreate Multiple Select after getting async collection
    this.renderDomElement(collection);
  }

  protected renderDomElement(collection) {
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

  /**
   * Create the HTML template as a string
   */
  protected buildTemplateHtmlString(optionCollection: any[], searchTerms: SearchTerm[]) {
    let options = '';
    const isAddingSpaceBetweenLabels = this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure && this.columnDef.filter.customStructure.addSpaceBetweenLabels || false;
    const isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;
    const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};

    optionCollection.forEach((option: SelectOption) => {
      if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
      }
      const labelKey = (option.labelKey || option[this.labelName]) as string;
      const selected = (searchTerms.findIndex((term) => term === option[this.valueName]) >= 0) ? 'selected' : '';
      const labelText = ((option.labelKey || this.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
      const prefixText = option[this.labelPrefixName] || '';
      const suffixText = option[this.labelSuffixName] || '';
      let optionText = isAddingSpaceBetweenLabels ? `${prefixText} ${labelText} ${suffixText}` : (prefixText + labelText + suffixText);

      // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
      // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
      if (isRenderHtmlEnabled) {
        // sanitize any unauthorized html tags like script and others
        // for the remaining allowed tags we'll permit all attributes
        const sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
        optionText = htmlEncode(sanitizedText);
      }

      // html text of each select option
      options += `<option value="${option[this.valueName]}" ${selected}>${optionText}</option>`;

      // if there's a search term, we will add the "filled" class for styling purposes
      if (selected) {
        this.isFilled = true;
      }
    });

    return `<select class="ms-filter search-filter" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
  }

  /**
   * From the html template string, create a DOM element
   * Subscribe to the onClose event and run the callback when that happens
   * @param filterTemplate
   */
  protected createDomElement(filterTemplate: string) {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    this.$filterElm = $(filterTemplate);
    if (typeof this.$filterElm.multipleSelect !== 'function') {
      throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
    }
    this.$filterElm.attr('id', `filter-${this.columnDef.id}`);
    this.$filterElm.data('columnId', this.columnDef.id);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (this.isFilled) {
      this.$filterElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
      this.$filterElm.appendTo($headerElm);
    }

    // merge options & attach multiSelect
    const options: MultipleSelectOption = { ...this.defaultOptions, ...this.columnDef.filter.filterOptions };
    this.$filterElm = this.$filterElm.multipleSelect(options);
  }
}
