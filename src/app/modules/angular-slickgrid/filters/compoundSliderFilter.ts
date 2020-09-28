import { TranslateService } from '@ngx-translate/core';

import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  Locale,
  OperatorString,
  OperatorType,
  SearchTerm,
} from './../models/index';
import { Constants } from '../constants';
import { buildSelectOperatorHtmlString } from './filterUtilities';
import { getTranslationPrefix, mapOperatorToShorthandDesignation } from '../services/utilities';

// using external non-typed js libraries
declare const $: any;

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class CompoundSliderFilter implements Filter {
  private _clearFilterTriggered = false;
  private _currentValue: number;
  private _shouldTriggerQuery = true;
  private _elementRangeInputId: string;
  private _elementRangeOutputId: string;
  private _operator: OperatorType | OperatorString;
  private $containerInputGroupElm: any;
  private $filterElm: any;
  private $filterInputElm: any;
  private $selectOperatorElm: any;
  grid: any;
  searchTerms: SearchTerm[];
  columnDef: Column;
  callback: FilterCallback;

  constructor(protected translate: TranslateService) { }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.empty;
  }

  /** Getter for the Filter Generic Params */
  private get filterParams(): any {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
  }

  /** Getter for the `filter` properties */
  private get filterProperties(): ColumnFilter {
    return this.columnDef && this.columnDef.filter;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Getter for the single Locale texts provided by the user in main file or else use default English locales via the Constants */
  get locales(): Locale {
    return this.gridOptions.locales || Constants.locales;
  }

  /** Getter for the Filter Operator */
  get operator(): OperatorType | OperatorString {
    return this._operator || this.defaultOperator;
  }

  /** Setter for the Filter Operator */
  set operator(op: OperatorType | OperatorString) {
    this._operator = op;
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
    this.operator = args.operator || '';
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // define the input & slider number IDs
    this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
    this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

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

    // if user chose to display the slider number on the right side, then update it every time it changes
    // we need to use both "input" and "change" event to be all cross-browser
    if (!this.filterParams.hideSliderNumber) {
      this.$filterInputElm.on('input change', (e: { target: HTMLInputElement }) => {
        const value = e && e.target && e.target.value || '';
        if (value) {
          const elements = document.getElementsByClassName(this._elementRangeOutputId);
          if (elements.length) {
            elements[0].innerHTML = value;
          }
        }
      });
    }

  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.$filterElm && this.$selectOperatorElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      const clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
      this._currentValue = +clearedValue;
      this.$selectOperatorElm.val(0);
      this.$filterInputElm.val(clearedValue);
      if (!this.filterParams.hideSliderNumber) {
        this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
      }
      this.onTriggerEvent(undefined);
      this.$filterElm.removeClass('filled');
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    if (this.$filterElm) {
      this.$filterElm.off('input change').remove();
    }
  }

  /**
   * Get selected value retrieved from the slider element
   * @params selected items
   */
  getValues(): number {
    return this._currentValue;
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm | SearchTerm[], operator?: OperatorType | OperatorString) {
    const newValue = Array.isArray(values) ? values[0] : values;
    this._currentValue = +newValue;
    this.$filterInputElm.val(newValue);
    this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(newValue);

    // set the operator, in the DOM as well, when defined
    this.operator = operator || this.defaultOperator;
    if (operator && this.$selectOperatorElm) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this.$selectOperatorElm.val(operatorShorthand);
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

    return `<input type="range" name="${this._elementRangeInputId}"
              defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
              class="form-control slider-filter-input range compound-slider ${this._elementRangeInputId}" />`;
  }

  /** Build HTML Template for the text (number) that is shown appended to the slider */
  private buildTemplateSliderTextHtmlString() {
    const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
    const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;

    return `<div class="input-group-addon input-group-append slider-value"><span class="input-group-text ${this._elementRangeOutputId}">${defaultValue}</span></div>`;
  }

  /** Get the available operator option values */
  private getOptionValues(): { operator: OperatorString, description: string }[] {
    return [
      { operator: '', description: '' },
      { operator: '=', description: this.getOutputText('EQUAL_TO', 'TEXT_EQUAL_TO', 'Equal to') },
      { operator: '<', description: this.getOutputText('LESS_THAN', 'TEXT_LESS_THAN', 'Less than') },
      { operator: '<=', description: this.getOutputText('LESS_THAN_OR_EQUAL_TO', 'TEXT_LESS_THAN_OR_EQUAL_TO', 'Less than or equal to') },
      { operator: '>', description: this.getOutputText('GREATER_THAN', 'TEXT_GREATER_THAN', 'Greater than') },
      { operator: '>=', description: this.getOutputText('GREATER_THAN_OR_EQUAL_TO', 'TEXT_GREATER_THAN_OR_EQUAL_TO', 'Greater than or equal to') },
      { operator: '<>', description: this.getOutputText('NOT_EQUAL_TO', 'TEXT_NOT_EQUAL_TO', 'Not equal to') }
    ];
  }

  /** Get Locale, Translated or a Default Text if first two aren't detected */
  private getOutputText(translationKey: string, localeText: string, defaultText: string): string {
    if (this.gridOptions && this.gridOptions.enableTranslate && this.translate && this.translate.instant) {
      const translationPrefix = getTranslationPrefix(this.gridOptions);
      return this.translate.instant(`${translationPrefix}${translationKey}`);
    }
    return this.locales && this.locales[localeText] || defaultText;
  }

  /**
   * Create the DOM element
   */
  private createDomElement(searchTerm?: SearchTerm) {
    const fieldId = this.columnDef && this.columnDef.id;
    const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
    const startValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
    const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    $($headerElm).empty();

    let searchTermInput = (searchTerm || '0') as string;
    if (+searchTermInput < minValue) {
      searchTermInput = `${minValue}`;
    }
    if (+searchTermInput < startValue) {
      searchTermInput = `${startValue}`;
    }
    this._currentValue = +searchTermInput;

    // create the DOM Select dropdown for the Operator
    const selectOperatorHtmlString = buildSelectOperatorHtmlString(this.getOptionValues());
    this.$selectOperatorElm = $(selectOperatorHtmlString);
    this.$filterInputElm = $(this.buildTemplateHtmlString());
    const $filterContainerElm = $(`<div class="form-group slider-container search-filter filter-${fieldId}"></div>`);
    this.$containerInputGroupElm = $(`<div class="input-group search-filter filter-${fieldId}"></div>`);
    const $operatorInputGroupAddon = $(`<span class="input-group-addon input-group-prepend operator"></span>`);

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon input-group-prepend operator">
          <select class="form-control"></select>
        </div>
        <input class="form-control" type="text" />
        <div class="input-group-addon input-group-prepend rangeOuput_percentComplete"><span class="input-group-text">0</span></div>
      </div>
    */
    $operatorInputGroupAddon.append(this.$selectOperatorElm);
    this.$containerInputGroupElm.append($operatorInputGroupAddon);
    this.$containerInputGroupElm.append(this.$filterInputElm);
    if (!this.filterParams.hideSliderNumber) {
      const $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
      $sliderTextInputAppendAddon.children().html(searchTermInput);
      this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
    }

    // create the DOM element & add an ID and filter class
    $filterContainerElm.append(this.$containerInputGroupElm);

    this.$filterInputElm.val(searchTermInput);
    this.$filterInputElm.data('columnId', fieldId);

    if (this.operator) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this.$selectOperatorElm.val(operatorShorthand);
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm !== '') {
      $filterContainerElm.addClass('filled');
    }

    // append the new DOM element to the header row
    if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
      $filterContainerElm.appendTo($headerElm);
    }

    return $filterContainerElm;
  }

  private onTriggerEvent(e: Event | undefined) {
    const value = this.$filterInputElm.val();
    this._currentValue = +value;

    if (this._clearFilterTriggered) {
      this.$filterElm.removeClass('filled');
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
    } else {
      this.$filterElm.addClass('filled');
      const selectedOperator = this.$selectOperatorElm.find('option:selected').val();
      this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value || '0'] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
    }
    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
