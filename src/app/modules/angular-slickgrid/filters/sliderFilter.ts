import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  OperatorType,
  OperatorString,
  SearchTerm,
  SlickGrid,
} from './../models/index';
import { emptyElement } from '../services/utilities';
import { BindingEventService } from '../services/bindingEvent.service';

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;

export class SliderFilter implements Filter {
  protected _bindEventService: BindingEventService;
  protected _clearFilterTriggered = false;
  protected _currentValue?: number;
  protected _shouldTriggerQuery = true;
  protected _elementRangeInputId = '';
  protected _elementRangeOutputId = '';
  protected filterElm!: HTMLDivElement;
  protected filterInputElm!: HTMLInputElement;
  protected filterNumberElm?: HTMLSpanElement;
  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;

  constructor() {
    this._bindEventService = new BindingEventService();
  }

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return this.columnDef?.filter ?? {};
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.equal;
  }

  /** Getter for the Filter Generic Params */
  protected get filterParams(): any {
    return this.columnDef?.filter?.params ?? {};
  }

  /** Getter for the `filter` properties */
  protected get filterProperties(): ColumnFilter {
    return this.columnDef?.filter ?? {};
  }

  /** Getter for the current Operator */
  get operator(): OperatorType | OperatorString {
    return this.columnFilter?.operator ?? this.defaultOperator;
  }

  /** Setter for the filter operator */
  set operator(operator: OperatorType | OperatorString) {
    if (this.columnFilter) {
      this.columnFilter.operator = operator;
    }
  }

  /**
   * Initialize the Filter
   */
  init(args: FilterArguments) {
    if (!args) {
      throw new Error('[Angular-Slickgrid] A filter must always have an "init()" with valid arguments.');
    }
    this.grid = args.grid;
    this.callback = args.callback;
    this.columnDef = args.columnDef;
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // define the input & slider number IDs
    this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
    this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create the DOM Element of the filter & initialize it if searchTerm is filled
    this.filterElm = this.createDomElement(searchTerm);

    // step 2, subscribe to the change event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this._bindEventService.bind(this.filterInputElm, 'change', this.handleOnChange.bind(this));

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
    if (this.filterElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      const clearedValue = this.filterParams?.sliderStartValue ?? DEFAULT_MIN_VALUE;
      this._currentValue = +clearedValue;
      this.filterInputElm.value = clearedValue;
      if (this.filterNumberElm) {
        this.filterNumberElm.textContent = clearedValue;
      }
      this.filterInputElm.dispatchEvent(new Event('change'));
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    this._bindEventService.unbindAll();
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
    if (Array.isArray(values)) {
      this.filterInputElm.value = `${values[0]}`;
      if (this.filterNumberElm) {
        this.filterNumberElm.textContent = `${values[0]}`;
      }
      this._currentValue = +values[0];
    } else if (values) {
      this.filterInputElm.value = `${values ?? ''}`;
      this._currentValue = +values;
    }

    // set the operator when defined
    this.operator = operator || this.defaultOperator;
  }

  //
  // protected functions
  // ------------------

  /**
   * Create the Filter DOM element
   * @param searchTerm optional preset search terms
   */
  protected createDomElement(searchTerm?: SearchTerm) {
    const columnId = this.columnDef?.id ?? '';
    const minValue = this.filterProperties?.minValue ?? DEFAULT_MIN_VALUE;
    const maxValue = this.filterProperties?.maxValue ?? DEFAULT_MAX_VALUE;
    const defaultValue = this.filterParams?.sliderStartValue ?? minValue;
    const step = this.filterProperties?.valueStep ?? DEFAULT_STEP;
    const startValue = +(this.filterParams?.sliderStartValue ?? minValue);
    const headerElm = this.grid.getHeaderRowColumn(columnId);
    emptyElement(headerElm);

    // create the DOM element & add an ID and filter class
    let searchTermInput = (searchTerm || '0') as string;
    if (+searchTermInput < minValue) {
      searchTermInput = `${minValue}`;
    }
    if (+searchTermInput < startValue) {
      searchTermInput = `${startValue}`;
    }
    this._currentValue = +searchTermInput;

    // create the DOM element
    this.filterInputElm = document.createElement('input');
    this.filterInputElm.type = 'range';
    this.filterInputElm.className = `form-control slider-filter-input range ${this._elementRangeInputId}`;
    this.filterInputElm.defaultValue = defaultValue;
    this.filterInputElm.value = searchTermInput;
    this.filterInputElm.min = `${minValue}`;
    this.filterInputElm.max = `${maxValue}`;
    this.filterInputElm.step = `${step}`;
    this.filterInputElm.name = this._elementRangeInputId;

    const divContainerFilterElm = document.createElement('div');
    divContainerFilterElm.className = `search-filter slider-container filter-${columnId}`;
    divContainerFilterElm.appendChild(this.filterInputElm);

    if (!this.filterParams.hideSliderNumber) {
      divContainerFilterElm.classList.add('input-group');
      this.filterInputElm.value = searchTermInput;

      const divGroupAppendElm = document.createElement('div');
      divGroupAppendElm.className = 'input-group-addon input-group-append slider-value';

      this.filterNumberElm = document.createElement('span');
      this.filterNumberElm.className = `input-group-text ${this._elementRangeOutputId}`;
      this.filterNumberElm.textContent = searchTermInput;
      divGroupAppendElm.appendChild(this.filterNumberElm);
      divContainerFilterElm.appendChild(divGroupAppendElm);
    }

    // this.filterNumberElm.html(searchTermInput);
    divContainerFilterElm.dataset.columnid = `${columnId}`;

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

  protected handleOnChange(e: any) {
    const value = e && e.target && e.target.value;
    this._currentValue = +value;

    if (this._clearFilterTriggered) {
      this.filterElm.classList.remove('filled');
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, searchTerms: [], shouldTriggerQuery: this._shouldTriggerQuery });
    } else {
      this.filterElm.classList.add('filled');
      this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value || '0'], shouldTriggerQuery: this._shouldTriggerQuery });
    }
    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
