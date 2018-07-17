import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from './../services/collection.service';
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
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// using external non-typed js libraries
declare var $: any;

@Injectable()
export class MultipleSelectFilter implements Filter {
  $filterElm: any;
  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;
  defaultOptions: MultipleSelectOption;
  isFilled = false;
  labelName: string;
  valueName: string;
  enableTranslateLabel = false;

  /**
   * Initialize the Filter
   */
  constructor(private translate: TranslateService, private collectionService: CollectionService) {
    // default options used by this Filter, user can overwrite any of these by passing "otions"
    this.defaultOptions = {
      container: 'body',
      filter: false,  // input search term on top of the select option list
      maxHeight: 200,
      okButton: true,
      addTitle: true, // show tooltip of all selected items while hovering the filter
      countSelected: this.translate.instant('X_OF_Y_SELECTED'),
      allSelected: this.translate.instant('ALL_SELECTED'),
      selectAllText: this.translate.instant('SELECT_ALL'),
      selectAllDelimiter: ['', ''], // remove default square brackets of default text "[Select All]" => "Select All"

      // we will subscribe to the onClose event for triggering our callback
      // also add/remove "filled" class for styling purposes
      onClose: () => {
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
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  get operator(): OperatorType | OperatorString {
    return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.in;
  }

  /**
   * Initialize the filter template
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = args.searchTerms || [];

    if (!this.grid || !this.columnDef || !this.columnDef.filter || (!this.columnDef.filter.collection && !this.columnDef.filter.asyncCollection)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "asyncCollection") for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
    }

    this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
    this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
    this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

    let newCollection = this.columnDef.filter.collection || [];
    const asyncCollection = this.columnDef.filter.asyncCollection;

    if (asyncCollection) {
      this.renderOptionsAsync(asyncCollection);
    }

    // user might want to filter or sort certain items of the collection
    newCollection = this.filterAndSortCollection(newCollection);

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);

    // step 2, create the DOM Element of the filter & pre-load search terms
    // also subscribe to the onClose event
    this.createDomElement(filterTemplate);
  }

  /**
   * Clear the filter values
   */
  clear() {
    if (this.$filterElm && this.$filterElm.multipleSelect) {
      // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
      this.$filterElm.multipleSelect('setSelects', []);
      this.$filterElm.removeClass('filled');
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
  }

  /**
   * Set value(s) on the DOM element
   */
  setValues(values: SearchTerm[]) {
    if (values) {
      this.$filterElm.multipleSelect('setSelects', values);
    }
  }

  //
  // private functions
  // ------------------

  /**
   * user might want to filter and/or sort certain items of the collection
   * @param inputCollection
   * @return outputCollection filtered and/or sorted collection
   */
  private filterAndSortCollection(inputCollection) {
    let outputCollection = [];

    // user might want to filter certain items of the collection
    if (this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionFilterBy) {
      const filterBy = this.columnDef.filter.collectionFilterBy;
      outputCollection = this.collectionService.filterCollection(inputCollection, filterBy);
    }

    // user might want to sort the collection
    if (this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionSortBy) {
      const sortBy = this.columnDef.filter.collectionSortBy;
      outputCollection = this.collectionService.sortCollection(inputCollection, sortBy, this.enableTranslateLabel);
    }

    return outputCollection;
  }

  private async renderOptionsAsync(asyncCollection: Promise<any> | Observable<any> | Subject<any>) {
    if (asyncCollection && asyncCollection instanceof Observable) {
      asyncCollection.subscribe((collection) => {
        console.log(collection);
        if (Array.isArray(collection)) {
          this.columnDef.filter.collection = collection;

          // recreate Multiple Select after getting async collection
          this.renderDomElement(collection);
        }
      });

/*
      // wait for the "asyncCollection", once resolved we will save it into the "collection" for later reference
      const awaitedCollection: any[] = await castToPromise(asyncCollection);
      this.columnDef.filter.collection = awaitedCollection;

      // recreate Multiple Select after getting async collection
      this.renderDomElement(awaitedCollection);

      const observer = Observable.of(this.columnDef.filter.collection);
      observer.subscribe((col) => console.log(col));

      const arr = new Proxy(awaitedCollection, {
        get: (target, name) => {
          console.log(target, name);
          return target[name];
        },
        set: (obj, prop, value) => {
          console.log(obj, prop, value);
          return true;
        }
      });
      setTimeout(() => {
        console.log(this.columnDef.filter.collection);
      }, 4000);
      // subscribe to the "collection" property changes
*/
    }
  }

  private renderDomElement(collection) {
    let newCollection = collection;

    // user might want to filter and/or sort certain items of the collection
    newCollection = this.filterAndSortCollection(newCollection);

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);

    // step 2, create the DOM Element of the filter & pre-load search terms
    // also subscribe to the onClose event
    this.createDomElement(filterTemplate);
  }

  /**
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString(optionCollection: any[], searchTerms: SearchTerm[]) {
    let options = '';
    optionCollection.forEach((option: SelectOption) => {
      if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
      }
      const labelKey = (option.labelKey || option[this.labelName]) as string;
      const selected = (searchTerms.findIndex((term) => term === option[this.valueName]) >= 0) ? 'selected' : '';
      const textLabel = ((option.labelKey || this.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;

      // html text of each select option
      options += `<option value="${option[this.valueName]}" ${selected}>${textLabel}</option>`;

      // if there's a search term, we will add the "filled" class for styling purposes
      if (selected) {
        this.isFilled = true;
      }
    });

    return `<select class="ms-filter search-filter" multiple="multiple">${options}</select>`;
  }

  /**
   * From the html template string, create a DOM element
   * Subscribe to the onClose event and run the callback when that happens
   * @param filterTemplate
   */
  private createDomElement(filterTemplate: string) {
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
