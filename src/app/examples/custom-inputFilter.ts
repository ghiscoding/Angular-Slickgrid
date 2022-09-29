import {
  BindingEventService,
  Column,
  ColumnFilter,
  emptyElement,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  OperatorType,
  OperatorString,
  SearchTerm,
  SlickGrid,
} from './../modules/angular-slickgrid';

export class CustomInputFilter implements Filter {
  protected _bindEventService: BindingEventService;
  private _clearFilterTriggered = false;
  private _shouldTriggerQuery = true;
  private filterElm!: HTMLInputElement;
  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;
  filterContainerElm!: HTMLDivElement;
  operator: OperatorType | OperatorString = OperatorType.equal;

  constructor() {
    this._bindEventService = new BindingEventService();
  }

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  get gridOptions(): GridOption {
    return this.grid?.getOptions?.() as GridOption;
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    this.grid = args.grid as SlickGrid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.filterContainerElm = args.filterContainerElm;
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // create the DOM Element of the filter & initialize it if searchTerm is filled
    this.filterElm = this.createDomElement(searchTerm);

    // step 3, subscribe to the keyup/change event and run the callback when that happens
    this._bindEventService.bind(this.filterElm, ['keyup', 'change'], (e: any) => {
      let value = e?.target?.value ?? '';
      const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
      if (typeof value === 'string' && enableWhiteSpaceTrim) {
        value = value.trim();
      }

      if (this._clearFilterTriggered) {
        this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
        this.filterElm.classList.remove('filled');
      } else {
        value === '' ? this.filterElm.classList.remove('filled') : this.filterElm.classList.add('filled');
        this.callback(e, { columnDef: this.columnDef, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
      }
      // reset both flags for next use
      this._clearFilterTriggered = false;
      this._shouldTriggerQuery = true;
    });
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.filterElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      this.filterElm.value = '';
      this.filterElm.classList.remove('filled');
      this.filterElm.dispatchEvent(new Event('change'));
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    this._bindEventService.unbindAll();
    this.filterElm?.remove();
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm | SearchTerm[]) {
    if (values) {
      this.filterElm.value = (values || '') as string;
    }
  }

  //
  // private functions
  // ------------------

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const columnId = this.columnDef?.id ?? '';
    emptyElement(this.filterContainerElm);

    let placeholder = this.gridOptions?.defaultFilterPlaceholder ?? '';
    if (this.columnFilter?.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }

    // create the DOM element & add an ID and filter class
    const filterElm = document.createElement('input');
    filterElm.type = 'text';
    filterElm.className = `form-control search-filter filter-${columnId}`;
    filterElm.value = (searchTerm || '') as string;
    filterElm.placeholder = placeholder || '';
    filterElm.dataset.columnid = (this.columnDef.id || '') as string;

    // append the new DOM element to the header row
    this.filterContainerElm.appendChild(filterElm);

    return filterElm;
  }
}
