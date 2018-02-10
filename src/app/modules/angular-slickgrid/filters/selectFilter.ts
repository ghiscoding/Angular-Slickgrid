import { FilterArguments } from './../models/filterArguments.interface';
import { FilterCallback } from './../models/filterCallback.interface';
import { Column, Filter } from './../models';
import { TranslateService } from '@ngx-translate/core';
import $ from 'jquery';

export class SelectFilter implements Filter {
  $filterElm: any;
  grid: any;
  searchTerm: string | number;
  columnDef: Column;
  callback: FilterCallback;
  i18n?: TranslateService;

  constructor() {}

  /**
   * Initialize the filter template
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerm = args.searchTerm;
    this.i18n = args.i18n;

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement(filterTemplate);

    // step 3, subscribe to the change event and run the callback when that happens
    this.$filterElm.change((e: any) => this.callback(e, { columnDef: this.columnDef, operator: 'EQ' }));
  }

  /**
   * Clear the filter values
   */
  clear(triggerFilterChange = true) {
    if (this.$filterElm) {
      this.$filterElm.val('');
      if (triggerFilterChange) {
        this.$filterElm.trigger('change');
      }
    }
  }

  //
  // private functions
  // ------------------

  private buildTemplateHtmlString() {
    if (!this.columnDef || !this.columnDef.filter || (!this.columnDef.filter.collection && !this.columnDef.filter.selectOptions)) {
      throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: type: FormElementType.select, collection: [{ value: true, label: 'True' }, { value: true, label: 'True'}] }`);
    }
    if (!this.columnDef.filter.collection && this.columnDef.filter.selectOptions) {
      console.warn(`[Angular-SlickGrid] The Select Filter "selectOptions" property will de deprecated in future version, please use the new property "collection" instead, which is more generic and not only inteded for Select.`);
    }

    const optionCollection = this.columnDef.filter.collection || this.columnDef.filter.selectOptions || [];
    const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
    const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';

    let options = '';
    optionCollection.forEach((option: any) => {
      if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
        throw new Error(`SelectOptions with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: type: FormElementType.select, selectOptions: [ { value: '1', label: 'One' } ]')`);
      }
      const labelKey = option.labelKey || option[labelName];
      const textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.i18n && typeof this.i18n.instant === 'function') ? this.i18n.instant(labelKey || ' ') : labelKey;
      options += `<option value="${option[valueName]}">${textLabel}</option>`;
    });
    return `<select class="form-control search-filter">${options}</select>`;
  }

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createDomElement(filterTemplate: string) {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    const $filterElm = $(filterTemplate);
    $filterElm.val(this.searchTerm);
    $filterElm.attr('id', `filter-${this.columnDef.id}`);
    $filterElm.data('columnId', this.columnDef.id);

    // append the new DOM element to the header row
    if ($filterElm && typeof $filterElm.appendTo === 'function') {
      $filterElm.appendTo($headerElm);
    }

    return $filterElm;
  }
}
