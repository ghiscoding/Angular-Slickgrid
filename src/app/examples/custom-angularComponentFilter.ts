import type { ComponentRef } from '@angular/core';
import type { Subscription } from 'rxjs';
import {
  AngularUtilService,
  type Column,
  type ColumnFilter,
  type Filter,
  type FilterArguments,
  type FilterCallback,
  type GridOption,
  OperatorType,
  type OperatorString,
  type SearchTerm,
  type SlickGrid,
  unsubscribeAllObservables,
} from './../modules/angular-slickgrid';

export class CustomAngularComponentFilter implements Filter {
  private _shouldTriggerQuery = true;
  private _subscriptions: Subscription[] = [];

  /** Angular Component Reference */
  componentRef!: ComponentRef<any>;

  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;
  operator: OperatorType | OperatorString = OperatorType.equal;

  /** Angular Util Service (could be inside the Grid Options Params or the Filter Params ) */
  get angularUtilService(): AngularUtilService {
    let angularUtilService = this.gridOptions?.params?.angularUtilService;
    if (!angularUtilService || !(angularUtilService instanceof AngularUtilService)) {
      angularUtilService = this.columnFilter?.params?.angularUtilService;
    }
    return angularUtilService;
  }

  /** Get the Collection */
  get collection(): any[] {
    return this.columnFilter?.collection || [];
  }

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return (this.columnDef && this.columnDef.filter) || {};
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return (this.grid?.getOptions() ?? {}) as GridOption;
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    this.grid = args.grid as SlickGrid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = ('searchTerms' in args ? args.searchTerms : []) || [];

    if (!this.columnFilter || !this.columnFilter.params.component || !(this.angularUtilService instanceof AngularUtilService)) {
      throw new Error(`[Angular-Slickgrid] For Filter with Angular Component to work properly, you need to provide the "AngularUtilService" via the Filter "params" OR the Grid Options "params"
      Example: this.columnDefs = [{ id: 'title', field: 'title', filter: { model: CustomFilter, collection: [...], params: { component: MyComponent, angularUtilService: this.angularUtilService }}];
      OR this.columnDefs = [{ id: 'title', field: 'title', filter: { model: CustomFilter, collection: [...] }]; this.gridOptions = { params: { angularUtilService: this.angularUtilService }}`);
    }

    if (this.columnFilter?.params.component) {
      // use a delay to make sure Angular ran at least a full cycle and it finished rendering the Component before hooking onto it
      // else we get the infamous error "ExpressionChangedAfterItHasBeenCheckedError"
      const headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
      if (headerElm) {
        headerElm.innerHTML = '';
        const componentOuput = this.angularUtilService.createAngularComponentAppendToDom(
          this.columnFilter.params.component,
          headerElm,
          { collection: this.collection }
        );
        this.componentRef = componentOuput.componentRef;

        this._subscriptions.push(
          componentOuput.componentRef.instance.onItemChanged.subscribe((item: any) => {
            this.callback(undefined, {
              columnDef: this.columnDef,
              operator: this.operator,
              searchTerms: [item.id],
              shouldTriggerQuery: this._shouldTriggerQuery,
            });
            // reset flag for next use
            this._shouldTriggerQuery = true;
          })
        );
      }
    }
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    this._shouldTriggerQuery = shouldTriggerQuery;
    if (this.componentRef?.instance && 'selectedId' in this.componentRef.instance) {
      this.componentRef.instance.selectedId = 0;
    }
  }

  /** destroy the Angular Component & Subscription */
  destroy() {
    if (this.componentRef?.destroy) {
      this.componentRef.destroy();
    }

    // also unsubscribe all Angular Subscriptions
    unsubscribeAllObservables(this._subscriptions);
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm[] | SearchTerm) {
    if (this.componentRef?.instance && 'selectedId' in this.componentRef.instance) {
      this.componentRef.instance.selectedId = values;
    }
  }
}
