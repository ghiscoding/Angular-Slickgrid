import { ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs';
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

// using external non-typed js libraries
declare var $: any;

export class CustomAngularComponentFilter implements Filter {
  private _shouldTriggerQuery = true;
  changeSubscriber: Subscription;

  /** Angular Component Reference */
  componentRef: ComponentRef<any>;

  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;
  operator: OperatorType | OperatorString = OperatorType.equal;

  constructor() { }

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

  /** Getter for the Column Filter */
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
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    if (!this.columnFilter || !this.columnFilter.params.component || !(this.angularUtilService instanceof AngularUtilService)) {
      throw new Error(`[Angular-Slickgrid] For Filter with Angular Component to work properly, you need to provide your component to the "component" property and make sure to add it to your "entryComponents" array.
      You also need to provide the "AngularUtilService" via the Filter Params OR the Grid Options Params
      Example: this.columnDefs = [{ id: 'title', field: 'title', filter: { model: CustomAngularComponentFilter, collection: [...], params: { component: MyComponent, angularUtilService: this.angularUtilService }}];
      OR this.columnDefs = [{ id: 'title', field: 'title', filter: { model: CustomAngularComponentFilter, collection: [...] }]; this.gridOptions = { params: { angularUtilService: this.angularUtilService }}`);
    }

    if (this.columnFilter && this.columnFilter.params.component) {
      // use a delay to make sure Angular ran at least a full cycle and it finished rendering the Component before hooking onto it
      // else we get the infamous error "ExpressionChangedAfterItHasBeenCheckedError"
      setTimeout(() => {
        const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        const componentOuput = this.angularUtilService.createAngularComponentAppendToDom(this.columnFilter.params.component, $headerElm);
        this.componentRef = componentOuput.componentRef;

        // here we override the collection object of the Angular Component
        // but technically you can pass any values you wish to your Component
        Object.assign(componentOuput.componentRef.instance, { collection: this.collection });

        this.changeSubscriber = componentOuput.componentRef.instance.onItemChanged.subscribe((item) => {
          this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: [item.id], shouldTriggerQuery: this._shouldTriggerQuery });
          // reset flag for next use
          this._shouldTriggerQuery = true;
        });
      });
    }
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    this._shouldTriggerQuery = shouldTriggerQuery;
    if (this.componentRef && this.componentRef.instance && this.componentRef.instance.hasOwnProperty('selectedId')) {
      this.componentRef.instance.selectedId = 0;
    }
  }

  /** destroy the Angular Component & Subscription */
  destroy() {
    if (this.componentRef && this.componentRef.destroy) {
      this.componentRef.destroy();
      this.changeSubscriber.unsubscribe();
    }
  }

  /** Set value(s) on the DOM element */
  setValues(values) {
    if (this.componentRef && this.componentRef.instance && this.componentRef.instance.hasOwnProperty('selectedId')) {
      this.componentRef.instance.selectedId = values;
    }
  }
}
