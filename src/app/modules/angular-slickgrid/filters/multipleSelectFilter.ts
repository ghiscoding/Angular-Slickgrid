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
import { arraysEqual, htmlEncode } from '../services/utilities';
import * as sanitizeHtml_ from 'sanitize-html';
const sanitizeHtml = sanitizeHtml_; // patch to fix rollup to work

// using external non-typed js libraries
declare var $: any;

export class MultipleSelectFilter implements Filter {
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

        if (!arraysEqual(selectedItems, this.searchTerms)) {
          this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: selectedItems });
        }
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

    if (!this.grid || !this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the MultipleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
    }

    this.enableTranslateLabel = this.columnDef.filter.enableTranslateLabel;
    this.labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
    this.labelPrefixName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.labelPrefix : 'labelPrefix';
    this.labelSuffixName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.labelSuffix : 'labelSuffix';
    this.valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

    let newCollection = this.columnDef.filter.collection || [];

    // user might want to filter certain items of the collection
    if (this.gridOptions.params && this.columnDef.filter.collectionFilterBy) {
      const filterBy = this.columnDef.filter.collectionFilterBy;
      newCollection = this.collectionService.filterCollection(newCollection, filterBy);
    }

    // user might want to sort the collection
    if (this.columnDef.filter && this.columnDef.filter.collectionSortBy) {
      const sortBy = this.columnDef.filter.collectionSortBy;
      newCollection = this.collectionService.sortCollection(newCollection, sortBy, this.enableTranslateLabel);
    }

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString(newCollection);

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
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString(optionCollection: any[]) {
    let options = '';
    const isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;

    optionCollection.forEach((option: SelectOption) => {
      if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
      }
      const labelKey = (option.labelKey || option[this.labelName]) as string;
      const selected = (this.findValueInSearchTerms(option[this.valueName]) >= 0) ? 'selected' : '';
      const labelText = ((option.labelKey || this.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
      const prefixText = option[this.labelPrefixName] || '';
      const suffixText = option[this.labelSuffixName] || '';
      let optionText = prefixText + labelText + suffixText;

      // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
      // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
      if (isRenderHtmlEnabled) {
        // sanitize any unauthorized html tags like script and others
        // for the remaining allowed tags we'll permit all attributes
        const sanitizedOption = sanitizeHtml(optionText, { allowedAttributes: { '*': ['*'] } });
        optionText = htmlEncode(sanitizedOption);
      }

      // html text of each select option
      options += `<option value="${option[this.valueName]}" ${selected}>${optionText}</option>`;

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

  private findValueInSearchTerms(value: number | string): number {
    if (this.searchTerms && Array.isArray(this.searchTerms)) {
      for (let i = 0; i < this.searchTerms.length; i++) {
        if (this.searchTerms[i] && this.searchTerms[i] === value) {
          return i;
        }
      }
    }
    return -1;
  }
}
