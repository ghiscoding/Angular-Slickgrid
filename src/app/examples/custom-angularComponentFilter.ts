import {
  AngularUtilService,
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  OperatorType,
  OperatorString,
  SearchTerm,
} from './../modules/angular-slickgrid';
import { ComponentRef } from '@angular/core';

// using external non-typed js libraries
declare var $: any;

export class CustomAngularComponentFilter implements Filter {
  private _clearFilterTriggered = false;
  private $filterElm: any;

  /** Angular Component Reference */
  componentRef: ComponentRef<any>;

  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;
  operator: OperatorType | OperatorString = OperatorType.equal;

  constructor() {}

  /** Angular Util Service (could be inside the Grid Options Params or the Filter Params ) */
  get angularUtilService(): AngularUtilService {
    let angularUtilService = this.gridOptions && this.gridOptions.params && this.gridOptions.params.angularUtilService;
    if (!angularUtilService || !(angularUtilService instanceof AngularUtilService)) {
      angularUtilService = this.columnFilter && this.columnFilter.params && this.columnFilter.params.angularUtilService;
    }
    return angularUtilService;
  }

  /** Get the Collection */
  get collection(): any[] {
    return this.columnFilter && this.columnFilter.collection || [];
  }

  /** Getter for the Filter Operator */
  get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = args.searchTerms || [];

    if (!this.columnFilter || !this.columnFilter.params.component || !(this.angularUtilService instanceof AngularUtilService)) {
      throw new Error(`[Angular-Slickgrid] For Filter with Angular Component to work properly, you need to provide your component to the "component" property and make sure to add it to your "entryComponents" array.
      You also need to provide the "AngularUtilService" via the Filter Params OR the Grid Options Params
      Example: this.columnDefs = [{ id: 'title', field: 'title', filter: { model: CustomAngularComponentFilter, collection: [...], params: { component: MyComponent, angularUtilService: this.angularUtilService }}];
      OR this.columnDefs = [{ id: 'title', field: 'title', filter: { model: CustomAngularComponentFilter, collection: [...] }]; this.gridOptions = { params: { angularUtilService: this.angularUtilService }}`);
    }

    if (this.columnFilter && this.columnFilter.params.component) {
      const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
      $($headerElm).empty();
      this.componentRef = this.columnFilter.params.angularUtilService.createAngularComponentAppendToDom(this.columnFilter.params.component, $headerElm);
      Object.assign(this.componentRef.instance, { collection: this.collection });

      this.componentRef.instance.onModelChanged.subscribe((item) => {
        console.warn('item changed', item);
      });
    }

    // // filter input can only have 1 search term, so we will use the 1st array index if it exist
    // const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';

    // // step 1, create HTML string template
    // const filterTemplate = this.buildTemplateHtmlString();

    // // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
    // this.$filterElm = this.createDomElement(filterTemplate, searchTerm);

    // // step 3, subscribe to the keyup event and run the callback when that happens
    // this.$filterElm.keyup((e: any) => {
    //   const value = e && e.target && e.target.value || '';
    //   if (this._clearFilterTriggered) {
    //     this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
    //     this._clearFilterTriggered = false; // reset flag for next use
    //     this.$filterElm.removeClass('filled');
    //   } else {
    //     value === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
    //     this.callback(e, { columnDef: this.columnDef, searchTerms: [value] });
    //   }
    // });
  }

  /**
   * Clear the filter value
   */
  clear() {
    if (this.$filterElm) {
      this._clearFilterTriggered = true;
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

  /**
   * Set value(s) on the DOM element
   */
  setValues(values) {
    if (values) {
      this.$filterElm.val(values);
    }
  }

  //
  // private functions
  // ------------------

  /**
   * Create the HTML template as a string
   */
  private buildTemplateHtmlString() {
    let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }
    return `<input type="text" class="form-control search-filter" placeholder="${placeholder}">`;
  }

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createDomElement(filterTemplate: string, searchTerm?: SearchTerm) {
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    const $filterElm = $(filterTemplate);

    $filterElm.val(searchTerm);
    $filterElm.attr('id', `filter-${this.columnDef.id}`);
    $filterElm.data('columnId', this.columnDef.id);

    // append the new DOM element to the header row
    if ($filterElm && typeof $filterElm.appendTo === 'function') {
      $filterElm.appendTo($headerElm);
    }

    return $filterElm;
  }
}
