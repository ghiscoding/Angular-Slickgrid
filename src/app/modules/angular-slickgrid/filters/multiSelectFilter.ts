import { Injectable } from '@angular/core';
import { Column, Filter } from './../models';
import { FilterArguments } from '../models/filterArguments.interface';
import { FilterCallback } from './../models/filterCallback.interface';
import { HtmlElementPosition } from './../models/htmlElementPosition.interface';
import { TranslateService } from '@ngx-translate/core';
import $ from 'jquery';

// using external js modules in Angular
declare var $: any;

@Injectable()
export class MultiSelectFilter implements Filter {
  $filterElm: any;
  grid: any;
  searchTerms: string[] | number[];
  columnDef: Column;
  callback: FilterCallback;

  constructor(private translate: TranslateService) {}

  /**
   * Initialize the filter template
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = args.searchTerms || [];

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & subscribe to the onClose event
    this.createDomElement(filterTemplate);

    // step 3, subscribe to the select close event and run the callback when that happens
    /*
    this.$filterElm.on('sumo:closed', (sumo) => {
      console.log('Drop down closed', sumo);
      // const selectedItems = this.$filterElm.SumoSelect('getSelects');
      //  this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerms: selectedItems });
    });
    */
  }

  /**
   * Clear the filter values
   */
  clear(triggerFilterChange = true) {
    if (this.$filterElm && this.$filterElm.SumoSelect) {
      // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
      // this.$filterElm = $(`#${this.$filterElm[0].id}`);
      this.$filterElm.SumoSelect('setSelects', []);

      if (triggerFilterChange) {
        this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerms: [] });
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
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Multi-Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FormElementType.multiSelect, collection: [{ value: true, label: 'True' }, { value: true, label: 'True'}] }`);
    }
    const optionCollection = this.columnDef.filter.collection || [];
    const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
    const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

    let options = '';
    optionCollection.forEach((option: any) => {
      if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`SelectOptions with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
      }
      const labelKey = option.labelKey || option[labelName];
      const textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
      options += `<option value="${option[valueName]}">${textLabel}</option>`;
    });

    return `<select class="sumo-filter search-filter" multiple="multiple">${options}</select>`;
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
    // this.$filterElm.val(this.searchTerms);
    this.$filterElm.attr('id', `filter-${this.columnDef.id}`);
    this.$filterElm.data('columnId', this.columnDef.id);

    // append the new DOM element to the header row
    if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
      this.$filterElm.appendTo($headerElm);
    }

    this.$filterElm.SumoSelect({
      placeholder: 'This is a placeholder',
      okCancelInMulti: false,
      triggerChangeCombined: true,
      forceCustomRendering: true,
      selectAll: true,
      container: 'body'});
    /*
    this.$filterElm = this.$filterElm.SumoSelect({
      container: 'body',
      minimumCountSelected: 2,
      countSelected: '# de % sélectionné',
      allSelected: `Tout sélectionnés`,
      selectAllText: `Sélectionner tout`,
      onClose: () => {
        const selectedItems = this.$filterElm.SumoSelect('getSelects');
        this.callback(undefined, { columnDef: this.columnDef, operator: 'IN', searchTerms: selectedItems });
      }
    });
    */
  }

  private findSelectedItems(item) {
    // return this.searchTerms.findIndex((searchItem: any) => searchItem === item);
  }

  private preLoadSearchTerms() {
    // run a query if user has some default search terms
    if (this.searchTerms && Array.isArray(this.searchTerms)) {
      for (let k = 0, ln = this.searchTerms.length; k < ln; k++) {
        this.searchTerms[k] = (this.searchTerms[k] || '') + ''; // make sure all search terms are strings
      }
      this.$filterElm.SumoSelect('setSelects', this.searchTerms);
    }
  }
}
