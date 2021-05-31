import { TranslateService } from '@ngx-translate/core';

import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  GridOption,
  Locale,
  OperatorDetail,
  OperatorString,
  OperatorType,
  SearchTerm,
  SlickGrid,
} from './../models/index';
import { Constants } from '../constants';
import { buildSelectOperator } from './filterUtilities';
import { emptyElement, getTranslationPrefix, mapOperatorToShorthandDesignation } from '../services/utilities';
import { BindingEventService } from '../services/bindingEvent.service';

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class CompoundSliderFilter implements Filter {
  protected _bindEventService: BindingEventService;
  protected _clearFilterTriggered = false;
  protected _currentValue?: number;
  protected _shouldTriggerQuery = true;
  protected _elementRangeInputId = '';
  protected _elementRangeOutputId = '';
  protected _operator?: OperatorType | OperatorString;
  protected containerInputGroupElm?: HTMLDivElement;
  protected filterElm!: HTMLDivElement;
  protected filterInputElm!: HTMLInputElement;
  protected filterNumberElm?: HTMLSpanElement;
  protected selectOperatorElm!: HTMLSelectElement;
  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;

  constructor(protected readonly translate: TranslateService) {
    this._bindEventService = new BindingEventService();
  }

  /** Getter for the Filter Operator */
  get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.empty;
  }

  /** Getter for the Filter Generic Params */
  protected get filterParams(): any {
    return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
  }

  /** Getter for the `filter` properties */
  protected get filterProperties(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  protected get gridOptions(): GridOption {
    return this.grid?.getOptions?.() ?? {};
  }

  /** Getter for the single Locale texts provided by the user in main file or else use default English locales via the Constants */
  get locales(): Locale {
    return this.gridOptions.locales || Constants.locales;
  }

  /** Getter for the Filter Operator */
  get operator(): OperatorType | OperatorString {
    return this._operator || this.columnFilter.operator || this.defaultOperator;
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
    this.searchTerms = args?.searchTerms ?? [];

    // define the input & slider number IDs
    this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
    this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    // and initialize it if searchTerm is filled
    this.filterElm = this.createDomElement(searchTerm);

    // step 2, subscribe to the input change event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this._bindEventService.bind(this.filterInputElm, 'change', this.onTriggerEvent.bind(this));
    this._bindEventService.bind(this.selectOperatorElm, 'change', this.onTriggerEvent.bind(this));

    // if user chose to display the slider number on the right side, then update it every time it changes
    // we need to use both "input" and "change" event to be all cross-browser
    if (!this.filterParams.hideSliderNumber) {
      this._bindEventService.bind(this.filterInputElm, ['input', 'change'], this.handleInputChange.bind(this));
    }
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.filterElm && this.selectOperatorElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      const clearedValue = this.filterParams?.sliderStartValue ?? DEFAULT_MIN_VALUE;
      this._currentValue = +clearedValue;
      this.selectOperatorElm.selectedIndex = 0;
      this.filterInputElm.value = clearedValue;
      if (this.filterNumberElm) {
        this.filterNumberElm.textContent = clearedValue;
      }
      this.onTriggerEvent(undefined);
      this.filterElm.classList.remove('filled');
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    this._bindEventService.unbindAll();
    this.selectOperatorElm?.remove?.();
    emptyElement(this.filterElm);
    this.filterElm?.remove?.();
  }

  /**
   * Get selected value retrieved from the slider element
   * @params selected items
   */
  getValues(): number | undefined {
    return this._currentValue;
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm | SearchTerm[], operator?: OperatorType | OperatorString) {
    const newValue = Array.isArray(values) ? values[0] : values;
    this._currentValue = +newValue;
    this.filterInputElm.value = `${newValue ?? ''}`;
    if (this.filterNumberElm) {
      this.filterNumberElm.textContent = `${newValue ?? ''}`;
    }

    // set the operator, in the DOM as well, when defined
    this.operator = operator || this.defaultOperator;
    if (operator && this.selectOperatorElm) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this.selectOperatorElm.value = operatorShorthand;
    }
  }

  //
  // protected functions
  // ------------------

  /** Get the available operator option values to populate the operator select dropdown list */
  protected getOperatorOptionValues(): OperatorDetail[] {
    if (this.columnFilter?.compoundOperatorList) {
      return this.columnFilter.compoundOperatorList;
    } else {
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
  }

  /** Get Locale, Translated or a Default Text if first two aren't detected */
  protected getOutputText(translationKey: string, localeText: string, defaultText: string): string {
    if (this.gridOptions?.enableTranslate && this.translate?.instant) {
      const translationPrefix = getTranslationPrefix(this.gridOptions);
      return this.translate.instant(`${translationPrefix}${translationKey}`);
    }
    return this.locales && this.locales[localeText as keyof Locale] || defaultText;
  }

  /**
   * Create the DOM element
   */
  protected createDomElement(searchTerm?: SearchTerm): HTMLDivElement {
    const columnId = this.columnDef?.id ?? '';
    const minValue = this.filterProperties?.minValue ?? DEFAULT_MIN_VALUE;
    const maxValue = this.filterProperties?.maxValue ?? DEFAULT_MAX_VALUE;
    const defaultValue = this.filterParams?.sliderStartValue ?? minValue;
    const step = this.filterProperties?.valueStep ?? DEFAULT_STEP;
    const startValue = +(this.filterParams?.sliderStartValue ?? minValue);
    const headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
    emptyElement(headerElm);

    let searchTermInput = (searchTerm || '0') as string;
    if (+searchTermInput < minValue) {
      searchTermInput = `${minValue}`;
    }
    if (+searchTermInput < startValue) {
      searchTermInput = `${startValue}`;
    }
    this._currentValue = +searchTermInput;

    /*
      Full DOM Element Template::
      <div class="form-group search-filter slider-container filter-${columnId}" data-columnid="${columnId}">
        <div class="input-group search-filter filter-${columnId}">
          <span class="input-group-addon input-group-prepend operator">
            <select class="form-control"><option value="">...</select>
          </span>
          <input type="range" class="form-control slider-filter-input range compound-slider ${this._elementRangeInputId}" value="0" min="0" max="100" step="1" name="${this._elementRangeInputId}"/>
          <div class="input-group-addon input-group-append slider-value">
            <span class="input-group-text rangeOutput_${columnId}">0</span>
          </div>
        </div>
      </div>
    */

    // create the DOM Select dropdown for the Operator
    this.selectOperatorElm = buildSelectOperator(this.getOperatorOptionValues());

    const spanPrependElm = document.createElement('span');
    spanPrependElm.className = 'input-group-addon input-group-prepend operator';
    spanPrependElm.appendChild(this.selectOperatorElm);

    // create the DOM element
    this.filterInputElm = document.createElement('input');
    this.filterInputElm.type = 'range';
    this.filterInputElm.className = `form-control slider-filter-input range compound-slider ${this._elementRangeInputId}`;
    this.filterInputElm.defaultValue = defaultValue;
    this.filterInputElm.value = searchTermInput;
    this.filterInputElm.min = `${minValue}`;
    this.filterInputElm.max = `${maxValue}`;
    this.filterInputElm.step = `${step}`;
    this.filterInputElm.name = this._elementRangeInputId;

    const divContainerFilterElm = document.createElement('div');
    divContainerFilterElm.className = `form-group search-filter slider-container filter-${columnId}`;

    // this.containerInputGroupElm = $(`<div class="input-group search-filter filter-${columnId}"></div>`);
    this.containerInputGroupElm = document.createElement('div');
    this.containerInputGroupElm.className = `input-group search-filter filter-${columnId}`;
    this.containerInputGroupElm.appendChild(spanPrependElm);
    this.containerInputGroupElm.appendChild(this.filterInputElm);
    divContainerFilterElm.appendChild(this.containerInputGroupElm);

    if (!this.filterParams.hideSliderNumber) {
      this.containerInputGroupElm.classList.add('input-group');
      this.filterInputElm.value = searchTermInput;

      const divGroupAppendElm = document.createElement('div');
      divGroupAppendElm.className = 'input-group-addon input-group-append slider-value';

      this.filterNumberElm = document.createElement('span');
      this.filterNumberElm.className = `input-group-text ${this._elementRangeOutputId}`;
      this.filterNumberElm.textContent = searchTermInput;
      divGroupAppendElm.appendChild(this.filterNumberElm);
      this.containerInputGroupElm.appendChild(divGroupAppendElm);
    }

    // this.filterNumberElm.html(searchTermInput);
    divContainerFilterElm.dataset.columnid = `${columnId}`;

    if (this.operator) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this.selectOperatorElm.value = operatorShorthand;
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      divContainerFilterElm.classList.add('filled');
    }

    // append the new DOM element to the header row
    headerElm.appendChild(divContainerFilterElm);

    return divContainerFilterElm;
  }

  protected handleInputChange(event: Event) {
    const value = (event?.target as HTMLInputElement).value;
    if (value !== undefined && value !== null) {
      const element = document.querySelector(`.${this._elementRangeOutputId || ''}`);
      if (element?.textContent) {
        element.textContent = value;
      }
    }
  }

  protected onTriggerEvent(e: Event | undefined) {
    const value = this.filterInputElm.value;
    this._currentValue = +value;

    if (this._clearFilterTriggered) {
      this.filterElm.classList.remove('filled');
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
    } else {
      this.filterElm.classList.add('filled');
      const selectedOperator = this.selectOperatorElm.value as OperatorString;
      this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value || '0'] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
    }

    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
