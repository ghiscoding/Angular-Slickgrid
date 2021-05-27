import { Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as flatpickr_ from 'flatpickr';
import { BaseOptions as FlatpickrBaseOptions, DateOption } from 'flatpickr/dist/types/options';
import { Instance as FlatpickrInstance, FlatpickrFn } from 'flatpickr/dist/types/instance';
const flatpickr: FlatpickrFn = (flatpickr_ && flatpickr_['default'] || flatpickr_) as any; // patch for rollup

import {
  Column,
  ColumnFilter,
  Filter,
  FilterArguments,
  FilterCallback,
  FieldType,
  FlatpickrOption,
  GridOption,
  Locale,
  OperatorDetail,
  OperatorString,
  OperatorType,
  SearchTerm,
  SlickGrid,
} from '../models/index';
import { Constants } from '../constants';
import { buildSelectOperator } from './filterUtilities';
import {
  destroyObjectDomElementProps,
  emptyElement,
  getTranslationPrefix,
  mapFlatpickrDateFormatWithFieldType,
  mapOperatorToShorthandDesignation
} from '../services/utilities';
import { BindingEventService } from '../services/bindingEvent.service';

export class CompoundDateFilter implements Filter {
  protected _bindEventService: BindingEventService;
  protected _clearFilterTriggered = false;
  protected _currentDate: Date | undefined;
  protected _currentValue?: string;
  protected _flatpickrOptions!: FlatpickrOption;
  protected _filterElm!: HTMLDivElement;
  protected _filterDivInputElm!: HTMLDivElement;
  protected _operator!: OperatorType | OperatorString;
  protected _selectOperatorElm!: HTMLSelectElement;
  protected _shouldTriggerQuery = true;
  flatInstance!: FlatpickrInstance;
  grid!: SlickGrid;
  searchTerms: SearchTerm[] = [];
  columnDef!: Column;
  callback!: FilterCallback;

  constructor(@Optional() protected readonly translate: TranslateService) {
    this._bindEventService = new BindingEventService();
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  protected get gridOptions(): GridOption {
    return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
  }

  /** Getter for the Filter Operator */
  get columnFilter(): ColumnFilter {
    return this.columnDef && this.columnDef.filter || {};
  }

  /** Getter for the Current Dates selected */
  get currentDate(): Date | undefined {
    return this._currentDate;
  }

  /** Getter to know what would be the default operator when none is specified */
  get defaultOperator(): OperatorType | OperatorString {
    return OperatorType.empty;
  }

  /** Getter for the Flatpickr Options */
  get flatpickrOptions(): FlatpickrOption {
    return this._flatpickrOptions || {};
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
    this.searchTerms = (args.hasOwnProperty('searchTerms') ? args.searchTerms : []) || [];

    // date input can only have 1 search term, so we will use the 1st array index if it exist
    const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms.length >= 0) ? this.searchTerms[0] : '';

    // step 1, create the DOM Element of the filter which contain the compound Operator+Input
    // and initialize it if searchTerm is filled
    this._filterElm = this.createDomElement(searchTerm);

    // step 3, subscribe to the keyup event and run the callback when that happens
    // also add/remove "filled" class for styling purposes
    this._bindEventService.bind(this._filterDivInputElm, 'keyup', this.onTriggerEvent.bind(this));
    this._bindEventService.bind(this._selectOperatorElm, 'change', this.onTriggerEvent.bind(this));
  }

  /**
   * Clear the filter value
   */
  clear(shouldTriggerQuery = true) {
    if (this.flatInstance && this._selectOperatorElm) {
      this._clearFilterTriggered = true;
      this._shouldTriggerQuery = shouldTriggerQuery;
      this.searchTerms = [];
      this._selectOperatorElm.selectedIndex = 0;
      this.flatInstance.clear();
    }
  }

  /**
   * destroy the filter
   */
  destroy() {
    this._bindEventService.unbindAll();

    if (this.flatInstance && typeof this.flatInstance.destroy === 'function') {
      this.flatInstance.destroy();
      if (this.flatInstance.element) {
        destroyObjectDomElementProps(this.flatInstance);
      }
    }
    this._filterElm?.remove?.();
    this._selectOperatorElm?.remove?.();
  }

  hide() {
    if (this.flatInstance && typeof this.flatInstance.close === 'function') {
      this.flatInstance.close();
    }
  }

  show() {
    if (this.flatInstance && typeof this.flatInstance.open === 'function') {
      this.flatInstance.open();
    }
  }

  /** Set value(s) in the DOM element, we can optionally pass an operator and/or trigger a change event */
  setValues(values: SearchTerm | SearchTerm[], operator?: OperatorType | OperatorString) {
    if (this.flatInstance && values) {
      const newValue = Array.isArray(values) ? values[0] : values;
      this._currentDate = newValue as Date;
      this.flatInstance.setDate(newValue as DateOption);
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

  protected buildDatePickerInput(searchTerm?: SearchTerm): HTMLDivElement {
    const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnFilter.type || this.columnDef.type || FieldType.dateIso);
    const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnFilter.type || this.columnDef.type || FieldType.dateUtc);
    const userFilterOptions = (this.columnFilter && this.columnFilter.filterOptions || {}) as FlatpickrOption;

    // get current locale, if user defined a custom locale just use or get it the Translate Service if it exist else just use English
    let currentLocale = (userFilterOptions && userFilterOptions.locale) || (this.translate && this.translate.currentLang) || this.gridOptions.locale || 'en';
    if (currentLocale && currentLocale.length > 2) {
      currentLocale = currentLocale.substring(0, 2);
    }

    // if we are preloading searchTerms, we'll keep them for reference
    if (searchTerm) {
      this._currentDate = searchTerm as Date;
    }

    const pickerOptions: FlatpickrOption = {
      defaultDate: (searchTerm as string) || '',
      altInput: true,
      altFormat: outputFormat,
      dateFormat: inputFormat,
      wrap: true,
      closeOnSelect: true,
      locale: currentLocale,
      onChange: (selectedDates: Date[] | Date, dateStr: string) => {
        this._currentValue = dateStr;
        this._currentDate = Array.isArray(selectedDates) && selectedDates[0] || undefined;

        // when using the time picker, we can simulate a keyup event to avoid multiple backend request
        // since backend request are only executed after user start typing, changing the time should be treated the same way
        let customEvent: CustomEvent | undefined;
        if (pickerOptions.enableTime) {
          customEvent = new CustomEvent('keyup');
        }
        this.onTriggerEvent(customEvent);
      },
      errorHandler: (error) => {
        if (error.toString().includes('invalid locale')) {
          console.warn(`[Angular-Slickgrid] Flatpickr missing locale imports (${currentLocale}), will revert to English as the default locale.
          See Flatpickr Localization for more info, for example if we want to use French, then we can import it with:  import 'flatpickr/dist/l10n/fr';`);
        }
      }
    };

    // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
    if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
      pickerOptions.enableTime = true;
    }

    // merge options with optional user's custom options
    this._flatpickrOptions = { ...pickerOptions, ...userFilterOptions };
    let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
    if (this.columnFilter && this.columnFilter.placeholder) {
      placeholder = this.columnFilter.placeholder;
    }

    const filterDivInputElm = document.createElement('div');
    filterDivInputElm.className = 'flatpickr';

    const inputElm = document.createElement('input');
    inputElm.type = 'text';
    inputElm.className = 'form-control';
    inputElm.dataset.input = '';
    inputElm.placeholder = placeholder;

    filterDivInputElm.appendChild(inputElm);
    this.flatInstance = flatpickr(filterDivInputElm, this._flatpickrOptions as unknown as Partial<FlatpickrBaseOptions>);

    return filterDivInputElm;
  }

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
    return this.locales?.[localeText as keyof Locale] ?? defaultText;
  }

  /**
   * Create the DOM element
   */
  protected createDomElement(searchTerm?: SearchTerm): HTMLDivElement {
    const columnId = this.columnDef?.id ?? '';
    const headerElm = this.grid.getHeaderRowColumn(columnId);
    emptyElement(headerElm);


    // create the DOM Select dropdown for the Operator
    this._selectOperatorElm = buildSelectOperator(this.getOperatorOptionValues());
    this._filterDivInputElm = this.buildDatePickerInput(searchTerm);
    const filterContainerElm = document.createElement('div');
    filterContainerElm.className = `form-group search-filter filter-${columnId}`;

    const containerInputGroupElm = document.createElement('div');
    containerInputGroupElm.className = 'input-group flatpickr';

    const operatorInputGroupAddonElm = document.createElement('div');
    operatorInputGroupAddonElm.className = 'input-group-addon input-group-prepend operator';

    /* the DOM element final structure will be
      <div class="input-group">
        <div class="input-group-addon input-group-prepend operator">
          <select class="form-control"></select>
        </div>
        <div class="flatpickr">
          <input type="text" class="form-control" data-input>
        </div>
      </div>
    */
    operatorInputGroupAddonElm.appendChild(this._selectOperatorElm);
    containerInputGroupElm.appendChild(operatorInputGroupAddonElm);
    containerInputGroupElm.appendChild(this._filterDivInputElm);

    // create the DOM element & add an ID and filter class
    filterContainerElm.appendChild(containerInputGroupElm);
    this._filterDivInputElm.dataset.columnid = `${columnId}`;

    if (this.operator) {
      const operatorShorthand = mapOperatorToShorthandDesignation(this.operator);
      this._selectOperatorElm.value = operatorShorthand;
    }

    // if there's a search term, we will add the "filled" class for styling purposes
    if (searchTerm && searchTerm !== '') {
      this._filterDivInputElm.classList.add('filled');
      this._currentDate = searchTerm as Date;
      this._currentValue = searchTerm as string;
    }

    // append the new DOM element to the header row
    if (filterContainerElm) {
      headerElm.appendChild(filterContainerElm);
    }

    return filterContainerElm;
  }

  protected onTriggerEvent(e: Event | undefined) {
    if (this._clearFilterTriggered) {
      this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
      this._filterElm.classList.remove('filled');
    } else {
      const selectedOperator = this._selectOperatorElm.value as OperatorString;
      (this._currentValue) ? this._filterElm.classList.add('filled') : this._filterElm.classList.remove('filled');
      this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
    }

    // reset both flags for next use
    this._clearFilterTriggered = false;
    this._shouldTriggerQuery = true;
  }
}
