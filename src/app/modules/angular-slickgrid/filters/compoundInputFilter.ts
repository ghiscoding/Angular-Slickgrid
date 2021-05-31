import { TranslateService } from '@ngx-translate/core';

import { Constants } from '../constants';
import {
  Column,
  ColumnFilter,
  FieldType,
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
} from '../models/index';
import { buildSelectOperator } from './filterUtilities';
import { emptyElement, getTranslationPrefix, mapOperatorToShorthandDesignation } from '../services/utilities';
import { BindingEventService } from '../services/bindingEvent.service';

export class CompoundInputFilter implements Filter {
  protected _bindEventService: BindingEventService;
  protected _clearFilterTriggered = false;
  protected _debounceTypingDelay = 0;
  protected _shouldTriggerQuery = true;
  protected _inputType = 'text';
  protected _filterElm!: HTMLDivElement;
  protected _filterInputElm!: HTMLInputElement;
  protected _selectOperatorElm!: HTMLSelectElement;
  protected _operator?: OperatorType | OperatorString;
  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;
  timer?: any;

  constructor(protected readonly translate: TranslateService) {
    this._bindEventService = new BindingEventService();
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  protected get gridOptions(): GridOption {
    return this.grid?.getOptions?.() ?? {};
  }

  /** Getter for the Column Filter */
  get columnFilter(): ColumnFilter {
    return this.columnDef?.filter ?? {};
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.empty;
  }

  /** Getter of input type (text, number, password) */
  get inputType() {
    return this._inputType;
  }

  /** Setter of input type (text, number, password) */
  set inputType(type: string) {
    this._inputType = type;
  }

  /** Getter for the single Locale texts provided by the user in main file or else use default English locales via the Constants */
  get locales(): Locale {
    return this.gridOptions.locales || Constants.locales;
  }

  /** Getter of the Operator to use when doing the filter comparing */
  get operator(): OperatorType | OperatorString {
    return this._operator || this.defaultOperator;
  }

  /** Setter of the Operator to use when doing the filter comparing */
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
    this.operator = args.operator as OperatorString;
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // analyze if we have any keyboard debounce delay (do we wait for user to finish typing before querying)
    // it is used by default for a backend service but is optional when using local dataset
    const backendApi = this.gridOptions?.backendServiceApi;
    this._debounceTypingDelay = (backendApi ? (backendApi?.filterTypingDebounce ?? this.gridOptions?.defaultBackendServiceFilterTypingDebounce) : this.gridOptions?.filterTypingDebounce) ?? 0;

    // filter input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    // and initialize it if searchTerm is filled
    this._filterElm = this.createDomElement(searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    // we'll use all necessary events to cover the following (keyup, change, mousewheel & spinner)
    this._bindEventService.bind(this._filterInputElm, ['keyup', 'blur', 'change', 'wheel'], this.onTriggerEvent.bind(this));
    this._bindEventService.bind(this._selectOperatorElm, 'change', this.onTriggerEvent.bind(this));
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this._filterElm && this._selectOperatorElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      this._selectOperatorElm.selectedIndex = 0;
      this._filterInputElm.value = '';
      this.onTriggerEvent(undefined);
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    this._bindEventService.unbindAll();
    this._selectOperatorElm?.remove?.();
    this._filterElm?.remove?.();
  }

  /** Set value(s) on the DOM element */
  setValues(values: SearchTerm[] | SearchTerm, operator?: OperatorType | OperatorString) {
    if (values) {
      const newValue = Array.isArray(values) ? values[0] : values;
      this._filterInputElm.value = `${newValue ?? ''}`;
    }

    // set the operator, in the DOM as well, when defined
    this.operator = operator || this.defaultOperator;
    if (operator && this._selectOperatorElm) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this._selectOperatorElm.value = operatorShorthand;
    }
  }

  //
  // protected functions
  // ------------------

  protected buildInputElement(): HTMLInputElement {
    const columnId = this.columnDef?.id ?? '';

    // create the DOM element & add an ID and filter class
    let placeholder = this.gridOptions?.defaultFilterPlaceholder ?? '';
    if (this.columnFilter?.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }

    const inputElm = document.createElement('input');
    inputElm.type = this._inputType || 'text';
    inputElm.className = `form-control compound-input filter-${columnId}`;
    inputElm.autocomplete = 'off';
    inputElm.placeholder = placeholder;
    inputElm.setAttribute('role', 'presentation');

    return inputElm;
  }

  /** Get the available operator option values to populate the operator select dropdown list */
  protected getOperatorOptionValues(): OperatorDetail[] {
    const type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
    let optionValues = [];

    if (this.columnFilter?.compoundOperatorList) {
      return this.columnFilter.compoundOperatorList;
    } else {
      switch (type) {
        case FieldType.string:
        case FieldType.text:
        case FieldType.readonly:
        case FieldType.password:
          optionValues = [
            { operator: '' as OperatorString, description: this.getOutputText('CONTAINS', 'TEXT_CONTAINS', 'Contains') },
            { operator: '<>' as OperatorString, description: this.getOutputText('NOT_CONTAINS', 'TEXT_NOT_CONTAINS', 'Not Contains') },
            { operator: '=' as OperatorString, description: this.getOutputText('EQUALS', 'TEXT_EQUALS', 'Equals') },
            { operator: '!=' as OperatorString, description: this.getOutputText('NOT_EQUAL_TO', 'TEXT_NOT_EQUAL_TO', 'Not equal to') },
            { operator: 'a*' as OperatorString, description: this.getOutputText('STARTS_WITH', 'TEXT_STARTS_WITH', 'Starts with') },
            { operator: '*z' as OperatorString, description: this.getOutputText('ENDS_WITH', 'TEXT_ENDS_WITH', 'Ends with') },
          ];
          break;
        default:
          optionValues = [
            { operator: '' as OperatorString, description: '' },
            { operator: '=' as OperatorString, description: this.getOutputText('EQUAL_TO', 'TEXT_EQUAL_TO', 'Equal to') },
            { operator: '<' as OperatorString, description: this.getOutputText('LESS_THAN', 'TEXT_LESS_THAN', 'Less than') },
            { operator: '<=' as OperatorString, description: this.getOutputText('LESS_THAN_OR_EQUAL_TO', 'TEXT_LESS_THAN_OR_EQUAL_TO', 'Less than or equal to') },
            { operator: '>' as OperatorString, description: this.getOutputText('GREATER_THAN', 'TEXT_GREATER_THAN', 'Greater than') },
            { operator: '>=' as OperatorString, description: this.getOutputText('GREATER_THAN_OR_EQUAL_TO', 'TEXT_GREATER_THAN_OR_EQUAL_TO', 'Greater than or equal to') },
            { operator: '<>' as OperatorString, description: this.getOutputText('NOT_EQUAL_TO', 'TEXT_NOT_EQUAL_TO', 'Not equal to') }
          ];
          break;
      }
    }

    return optionValues;
  }

  /** Get Locale, Translated or a Default Text if first two aren't detected */
  protected getOutputText(translationKey: string, localeText: string, defaultText: string): string {
    if (this.gridOptions?.enableTranslate && this.translate?.instant) {
      const translationPrefix = getTranslationPrefix(this.gridOptions);
      return this.translate.instant(`${translationPrefix}${translationKey}`);
    }
    return this.locales?.[localeText as keyof Locale] ?? defaultText;
  }

  /**
   * Create the DOM element
   */
  protected createDomElement(searchTerm?: SearchTerm) {
    const columnId = this.columnDef?.id ?? '';
    const headerElm = this.grid.getHeaderRowColumn(columnId);
    emptyElement(headerElm);

    // create the DOM Select dropdown for the Operator
    this._selectOperatorElm = buildSelectOperator(this.getOperatorOptionValues());
    this._filterInputElm = this.buildInputElement();
    const emptySpanElm = document.createElement('span');

    const filterContainerElm = document.createElement('div');
    filterContainerElm.className = `form-group search-filter filter-${columnId}`;

    const containerInputGroupElm = document.createElement('div');
    containerInputGroupElm.className = 'input-group';

    const operatorInputGroupAddonElm = document.createElement('div');
    operatorInputGroupAddonElm.className = 'input-group-addon input-group-prepend operator';

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon input-group-prepend operator">
          <select class="form-control"></select>
        </div>
        <input class="form-control compound-input" type="text" />
      </div>
    */
    operatorInputGroupAddonElm.appendChild(this._selectOperatorElm);
    containerInputGroupElm.appendChild(operatorInputGroupAddonElm);
    containerInputGroupElm.appendChild(this._filterInputElm);
    containerInputGroupElm.appendChild(emptySpanElm);

    // create the DOM element & add an ID and filter class
    filterContainerElm.appendChild(containerInputGroupElm);

    this._filterInputElm.value = `${searchTerm ?? ''}`;
    this._filterInputElm.dataset.columnid = `${columnId}`;

    if (this.operator) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this._selectOperatorElm.value = operatorShorthand;
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm) {
      this._filterInputElm.classList.add('filled');
    }

    // append the new DOM element to the header row
    if (filterContainerElm) {
      headerElm.appendChild(filterContainerElm);
    }

    return filterContainerElm;
  }

  /**
   * Event trigger, could be called by the Operator dropdown or the input itself and we will cover the following (keyup, change, mousewheel & spinner)
   * We will trigger the Filter Service callback from this handler
   */
  protected onTriggerEvent(event: Event | undefined) {
    if (this._clearFilterTriggered) {
      this.callback(event, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
      this._filterElm.classList.remove('filled');
    } else {
      const eventType = event?.type ?? '';
      const selectedOperator = this._selectOperatorElm.value as OperatorString;
      let value = this._filterInputElm.value as string;
      const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
      if (typeof value === 'string' && enableWhiteSpaceTrim) {
        value = value.trim();
      }

      (value !== null && value !== undefined && value !== '') ? this._filterElm.classList.add('filled') : this._filterElm.classList.remove('filled');
      const callbackArgs = { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator, shouldTriggerQuery: this._shouldTriggerQuery };
      const typingDelay = (eventType === 'keyup' && (event as KeyboardEvent)?.key !== 'Enter') ? this._debounceTypingDelay : 0;

      if (typingDelay > 0) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.callback(event, callbackArgs), typingDelay);
      } else {
        this.callback(event, callbackArgs);
      }
    }

    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
