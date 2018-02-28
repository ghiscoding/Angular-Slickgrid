import { TranslateService } from '@ngx-translate/core';
import { Column, Filter, FilterArguments, FilterCallback, MultipleSelectOption, SearchTerm, SelectOption } from './../models/index';
import $ from 'jquery';
import { Injectable } from '@angular/core';

// using external non-typed js libraries
declare var $: any;

@Injectable()
export class SingleSelectFilter implements Filter {
  $filterElm: any;
  grid: any;
  searchTerm: SearchTerm;
  columnDef: Column;
  callback: FilterCallback;
  defaultOptions: MultipleSelectOption;

  constructor(private translate: TranslateService) {
    // default options used by this Filter, user can overwrite any of these by passing "otions"
    this.defaultOptions = {
      container: 'body',
      filter: false,  // input search term on top of the select option list
      maxHeight: 200,
      single: true
    };
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerm = args.searchTerm;

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & pre-load search term
    this.createDomElement(filterTemplate);

    // step 3, subscribe to the change event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterElm.change((e: any) => {
      if (e && e.target && e.target.value) {
        this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled') ;
      } else {
        this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
      }
      this.callback(e, { columnDef: this.columnDef, operator: 'EQ' });
    });
  }

  /**
   * Clear the filter values
   */
  clear(triggerFilterChange = true) {
    if (this.$filterElm && this.$filterElm.multipleSelect) {
      // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
      // this.$filterElm = $(`#${this.$filterElm[0].id}`);
      this.$filterElm.multipleSelect('setSelects', []);

      if (triggerFilterChange) {
        this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerm: undefined });
      }
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

  //
  // private functions
  // ------------------

  /**
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString() {
    if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FilterType.singleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
    }
    const optionCollection = this.columnDef.filter.collection || [];
    const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
    const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

    let options = '';
    optionCollection.forEach((option: SelectOption) => {
      if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FilterType.singleSelect, collection: [ { value: '1', label: 'One' } ]')`);
      }

      const labelKey = (option.labelKey || option[labelName]) as string;
      const selected = (option[valueName] === this.searchTerm) ? 'selected' : '';
      const textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;

      // html text of each select option
      options += `<option value="${option[valueName]}" ${selected}>${textLabel}</option>`;
    });

    return `<select class="ms-filter search-filter">${options}</select>`;
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

    // append the new DOM element to the header row
    if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
      this.$filterElm.appendTo($headerElm);
    }

    // merge options & attach multiSelect
    const options: MultipleSelectOption = { ...this.defaultOptions, ...this.columnDef.filter.filterOptions };
    this.$filterElm = this.$filterElm.multipleSelect(options);
  }
}
