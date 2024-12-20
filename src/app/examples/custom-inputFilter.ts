import {
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
} from './../modules/angular-slickgrid';

export class CustomInputFilter implements Filter {
  private _clearFilterTriggered = false;
  private _shouldTriggerQuery = true;
  private filterElm!: HTMLInputElement;
  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;
  operator: OperatorType | OperatorString = OperatorType.equal;

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return this.columnDef?.filter ?? {};
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

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = Array.isArray(this.searchTerms) && this.searchTerms.length >= 0 ? this.searchTerms[0] : '';

    // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.filterElm = this.createFilterElement(searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    this.filterElm?.addEventListener('keyup', this.onKeyup.bind(this));
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.filterElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.filterElm.value = '';
      this.filterElm.dispatchEvent(new Event('keyup'));
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    this.filterElm?.removeEventListener('keyup', this.onKeyup.bind(this));
    this.filterElm?.remove();
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm | SearchTerm[]) {
    if (values && this.filterElm) {
      this.filterElm.value = values as string;
    }
  }

  //
  // private functions
  // ------------------

  private onKeyup(e: KeyboardEvent) {
    let value = (e as KeyboardEvent & { target: HTMLInputElement })?.target?.value ?? '';
    const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
    if (typeof value === 'string' && enableWhiteSpaceTrim) {
      value = value.trim();
    }

    if (this._clearFilterTriggered) {
      this.callback(e, {
        columnDef: this.columnDef,
        clearFilterTriggered: this._clearFilterTriggered,
        shouldTriggerQuery: this._shouldTriggerQuery,
      });
      this.filterElm?.classList.remove('filled');
    } else {
      value === '' ? this.filterElm?.classList.remove('filled') : this.filterElm?.classList.add('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
    }
    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createFilterElement(searchTerm?: SearchTerm) {
    const headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    if (headerElm) {
      headerElm.innerHTML = '';

      let placeholder = this.gridOptions?.defaultFilterPlaceholder ?? '';
      if (this.columnFilter?.placeholder) {
        placeholder = this.columnFilter.placeholder;
      }

      // create the DOM element & add an ID and filter class
      this.filterElm = document.createElement('input');
      this.filterElm.type = 'text';
      this.filterElm.className = 'form-control search-filter';
      this.filterElm.placeholder = placeholder;
      this.filterElm.value = `${searchTerm || ''}`;
      this.filterElm.dataset.columnid = `${this.columnDef.id}`;

      // append the new DOM element to the header row
      headerElm.appendChild(this.filterElm);
    }
    return this.filterElm;
  }
}
