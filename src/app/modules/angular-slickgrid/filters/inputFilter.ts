import {
  Column,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  OperatorType,
  OperatorString,
  SearchTerm
} from './../models/index';

// using external non-typed js libraries
declare var $: any;

export class InputFilter implements Filter {
  private _clearFilterTriggered = false;
  private _inputType = 'text';
  private $filterElm: any;
  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;

  constructor() {}

  /** Getter of input type (text, number, password) */
  get inputType() {
    return this._inputType;
  }

  /** Setter of input type (text, number, password) */
  set inputType(type: string) {
    this._inputType = type;
  }

  /** Getter of the Operator to use when doing the filter comparing */
  get operator(): OperatorType | OperatorString {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get gridOptions(): GridOption {
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

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';

    // step 1, create HTML string template
    const filterTemplate = this.buildTemplateHtmlString();

    // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement(filterTemplate, searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterElm.on('keyup input change', (e: any) => {
      const value = e && e.target && e.target.value || '';
      if (this._clearFilterTriggered) {
        this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
        this._clearFilterTriggered = false; // reset flag for next use
        this.$filterElm.removeClass('filled');
      } else {
        this.$filterElm.addClass('filled');
        this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value] });
      }
    });
  }

  /**
   * Clear the filter value
   */
  clear() {
    if (this.$filterElm) {
      this._clearFilterTriggered = true;
      this.searchTerms = [];
      this.$filterElm.val('');
      this.$filterElm.trigger('keyup');
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off('keyup input change').remove();
    }
  }

  /**
   * Set value(s) on the DOM element
   */
  setValues(values: SearchTerm) {
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
    const fieldId = this.columnDef && this.columnDef.id;
    const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    return `<input type="${this._inputType || 'text'}" class="form-control search-filter filter-${fieldId}" placeholder="${placeholder}">`;
  }

  /**
   * From the html template string, create a DOM element
   * @param filterTemplate
   */
  private createDomElement(filterTemplate: string, searchTerm?: SearchTerm) {
    const fieldId = this.columnDef && this.columnDef.id;
    const $headerElm = this.grid.getHeaderRowColumn(fieldId);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    const $filterElm = $(filterTemplate);

    $filterElm.val(searchTerm);
    $filterElm.attr('id', `filter-${fieldId}`);
    $filterElm.data('columnId', fieldId);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      $filterElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterElm && typeof $filterElm.appendTo === 'function') {
      $filterElm.appendTo($headerElm);
    }

    return $filterElm;
  }
}
