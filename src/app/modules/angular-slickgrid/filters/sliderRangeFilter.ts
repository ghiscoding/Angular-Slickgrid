import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  OperatorType,
  OperatorString,
  SearchTerm,
} from '../models/index';

// using external non-typed js libraries
declare var $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

/** A Slider Range Filter which uses jQuery UI, this is only meant to be used as a range filter (with 2 handles lowest & highest values) */
export class SliderRangeFilter implements Filter {
  private _clearFilterTriggered = false;
  private _shouldTriggerQuery = true;
  private _elementRangeInputId: string;
  private _elementRangeOutputId: string;
  private $filterElm: any;
  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;

  /** Getter for the Filter Generic Params */
  private get filterParams(): any {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
  }

  /** Getter for the `filter` properties */
  private get filterProperties(): ColumnFilter {
    return this.columnDef && this.columnDef.filter;
  }

  get operator(): OperatorType | OperatorString {
    return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.rangeExclusive;
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    if (!args) {
      throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
    }
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = args.searchTerms || [];

    // define the input & slider number IDs
    this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
    this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';

    // step 1, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.$filterElm = this.createDomElement(searchTerm);

    // step 3, subscribe to the change event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this.$filterElm.change((e: any) => {
      const value = e && e.target && e.target.value || '';
      if (this._clearFilterTriggered) {
        this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
        this.$filterElm.removeClass('filled');
      } else {
        value === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
        this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
      }
      // reset both flags for next use
      this._clearFilterTriggered = false;
      this._shouldTriggerQuery = true;
    });

    // if user chose to display the slider number on the right side, then update it every time it changes
    // we need to use both "input" and "change" event to be all cross-browser
    if (!this.filterParams.hideSliderNumber) {
      this.$filterElm.on('input change', (e: { target: HTMLInputElement }) => {
        const value = e && e.target && e.target.value || '';
        if (value) {
          document.getElementById(this._elementRangeOutputId).innerHTML = value;
        }
      });
    }
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.$filterElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      const lowestValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
      const highestValue = this.filterParams.hasOwnProperty('sliderEndValue') ? this.filterParams.sliderEndValue : DEFAULT_MAX_VALUE;
      this.$filterElm.slider('values', [lowestValue, highestValue]);
      // this.$filterElm.children('input').val(clearedValue);
      // this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
      // this.$filterElm.trigger('change');
      this.callback(null, { columnDef: this.columnDef, clearFilterTriggered: true, shouldTriggerQuery });
      this.$filterElm.removeClass('filled');
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off('change').remove();
    }
  }

  /**
   * Set value(s) on the DOM element
   */
  setValues(values: SearchTerm) {
    if (values) {
      const searchTerm = (Array.isArray(values) && typeof values[0] === 'string') ? values[0] : '';
      const sliderValues = ((searchTerm as string).indexOf('..') >= 0) ? (searchTerm as string).split('..') : searchTerm;
      if (Array.isArray(sliderValues) && sliderValues.length === 2) {
        this.$filterElm.slider('values', [sliderValues[0], sliderValues[1]]);
      } else {
        this.clear(true);
      }
    }
  }

  //
  // private functions
  // ------------------

  /**
   * From the html template string, create a DOM element
   * @param searchTerm optional preset search terms
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const fieldId = this.columnDef && this.columnDef.id;
    const $headerElm = this.grid.getHeaderRowColumn(fieldId);
    $($headerElm).empty();

    // create the DOM element & add an ID and filter class
    const $filterElm = $(`<div class="search-filter filter-${fieldId}"></div>`);
    const $filterContainerElm = $(`<div class="slider-range-container form-control">`);
    $filterElm.appendTo($filterContainerElm);
    const searchTermInput = (searchTerm || '0') as string;

    const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
    const maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
    const defaultStartValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
    const defaultEndValue = this.filterParams.hasOwnProperty('sliderEndValue') ? this.filterParams.sliderEndValue : maxValue;
    const step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;

    $filterElm.slider({
      range: true,
      min: minValue,
      max: maxValue,
      step,
      values: [defaultStartValue, defaultEndValue],
      slide: (e: any, ui: { handle: HTMLElement; handleIndex: number; value: number; values: number[]; }) => {
        const value = ui.values.join('..');

        if (this._clearFilterTriggered) {
          this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
          this.$filterElm.removeClass('filled');
        } else {
          value === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
          this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
      }
    });

    // $filterElm.children('input').val(searchTermInput);
    // $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
    // $filterElm.attr('id', `filter-${fieldId}`);
    // $filterElm.data('columnId', fieldId);

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      $filterContainerElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterElm;
  }
}
