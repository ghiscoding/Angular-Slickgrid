import { Injectable } from '@angular/core';
import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  OperatorString,
  OperatorType,
  SearchTerm
} from './../models/index';
import * as $ from 'jquery';

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

@Injectable()
export class CompoundSliderFilter implements Filter {
  private _operator: OperatorType | OperatorString;
  private $containerInputGroupElm: any;
  private $filterElm: any;
  private $filterInputElm: any;
  private $selectOperatorElm: any;
  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;

  constructor() { }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Getter for the Filter Generic Params */
  private get filterParams(): any {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
  }

  /** Getter for the `filter` properties */
  private get filterProperties(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  set operator(op: OperatorType | OperatorString) {
    this._operator = op;
  }

  get operator(): OperatorType | OperatorString {
    return this._operator || OperatorType.empty;
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    if (args) {
      this.grid = args.grid;
      this.callback = args.callback;
      this.columnDef = args.columnDef;
      this.operator = args.operator || '';
      this.searchTerms = args.searchTerms || [];

      // filter input can only have 1 search term, so we will use the 1st array index if it exist
      const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';

      // step 1, create the DOM Element of the filter which contain the compound Operator+Input
      // and initialize it if searchTerm is filled
      this.$filterElm = this.createDomElement(searchTerm);

      // step 3, subscribe to the keyup event and run the callback when that happens
      // also add/remove "filled" class for styling purposes
      this.$filterInputElm.change((e: any) => {
        this.onTriggerEvent(e);
      });
      this.$selectOperatorElm.change((e: any) => {
        this.onTriggerEvent(e);
      });
    }
  }

  /**
   * Clear the filter value
   */
  clear() {
    if (this.$filterElm && this.$selectOperatorElm) {
      const clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
      this.$selectOperatorElm.val(0);
      this.$filterInputElm.val(clearedValue);
      if (!this.filterParams.hideSliderNumber) {
        this.$containerInputGroupElm.children('span.input-group-addon').last().html(clearedValue);
      }
      this.onTriggerEvent(undefined, true);
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
  setValues(values: SearchTerm[]) {
    if (values && Array.isArray(values)) {
      this.$filterInputElm.val(values[0]);
      this.$containerInputGroupElm.children('span.input-group-addon').last().html(values[0]);
    }
  }

  //
  // private functions
  // ------------------

  /** Build HTML Template for the input range (slider) */
  private buildTemplateHtmlString() {
    const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
    const maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
    const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
    const step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;

    return `<input type="range" id="rangeInput_${this.columnDef.field}"
              name="rangeInput_${this.columnDef.field}"
              defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
              class="form-control slider-filter-input range compound-slider"
              onmousemove="$('#rangeOuput_${this.columnDef.field}').html(rangeInput_${this.columnDef.field}.value)" />`;
  }

  /** Build HTML Template for the text (number) that is shown appended to the slider */
  private buildTemplateSliderTextHtmlString() {
    const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
    const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;

    return `<span class="input-group-addon slider-value" id="rangeOuput_${this.columnDef.field}">${defaultValue}</span>`;
  }

  /** Build HTML Template select dropdown (operator) */
  private buildSelectOperatorHtmlString() {
    const optionValues = this.getOptionValues();
    let optionValueString = '';
    optionValues.forEach((option) => {
      optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
    });

    return `<select class="form-control">${optionValueString}</select>`;
  }

  /** Get the available operator option values */
  private getOptionValues(): { operator: OperatorString, description: string }[] {
    return [
      { operator: '' as OperatorString, description: '' },
      { operator: '=' as OperatorString, description: '' },
      { operator: '<' as OperatorString, description: '' },
      { operator: '<=' as OperatorString, description: '' },
      { operator: '>' as OperatorString, description: '' },
      { operator: '>=' as OperatorString, description: '' },
      { operator: '<>' as OperatorString, description: '' }
    ];
  }

  /**
   * Create the DOM element
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const searchTermInput = (searchTerm || '0') as string;
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    // create the DOM Select dropdown for the Operator
    this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
    this.$filterInputElm = $(this.buildTemplateHtmlString());
    const $filterContainerElm = $(`<div class="form-group search-filter"></div>`);
    this.$containerInputGroupElm = $(`<div class="input-group search-filter"></div>`);
    const $operatorInputGroupAddon = $(`<span class="input-group-addon operator"></span>`);

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon operator">
          <select class="form-control"></select>
        </div>
        <input class="form-control" type="text" />
        <span class="input-group-addon" id="rangeOuput_percentComplete">0</span>
      </div>
    */
    $operatorInputGroupAddon.append(this.$selectOperatorElm);
    this.$containerInputGroupElm.append($operatorInputGroupAddon);
    this.$containerInputGroupElm.append(this.$filterInputElm);
    if (!this.filterParams.hideSliderNumber) {
      const $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
      $sliderTextInputAppendAddon.html(searchTermInput);
      this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
    }

    // create the DOM element & add an ID and filter class
    $filterContainerElm.append(this.$containerInputGroupElm);
    $filterContainerElm.attr('id', `filter-${this.columnDef.field}`);

    this.$filterInputElm.val(searchTermInput);
    this.$filterInputElm.data('columnId', this.columnDef.field);

    if (this.operator) {
      this.$selectOperatorElm.val(this.operator);
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      $filterContainerElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterContainerElm;
  }

  private onTriggerEvent(e: Event | undefined, clearFilterTriggered?: boolean) {
    if (clearFilterTriggered) {
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: true });
    } else {
      const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
      const value = this.$filterInputElm.val();
      (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '' });
    }
  }
}
