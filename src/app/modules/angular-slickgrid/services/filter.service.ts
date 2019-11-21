import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as isequal_ from 'lodash.isequal';
const isequal = isequal_; // patch to fix rollup to work

import {
  Column,
  ColumnFilter,
  ColumnFilters,
  CurrentFilter,
  EmitterType,
  FieldType,
  Filter,
  FilterArguments,
  FilterCallbackArg,
  FilterChangedArgs,
  GridOption,
  KeyCode,
  OperatorString,
  OperatorType,
  SearchTerm,
  SlickEvent,
  SlickEventHandler,
} from './../models/index';
import { executeBackendCallback, refreshBackendDataset } from './backend-utilities';
import { getDescendantProperty } from './utilities';
import { FilterConditions } from './../filter-conditions';
import { FilterFactory } from '../filters/filterFactory';
import { SharedService } from './shared.service';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

// timer for keeping track of user typing waits
let timer: any;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 500;

@Injectable()
export class FilterService {
  private _eventHandler: SlickEventHandler;
  private _isFilterFirstRender = true;
  private _firstColumnIdRendered = '';
  private _filtersMetadata: any[] = [];
  private _columnFilters: ColumnFilters = {};
  private _dataView: any;
  private _grid: any;
  private _onSearchChange: SlickEvent;
  onFilterChanged = new Subject<CurrentFilter[]>();
  onFilterCleared = new Subject<boolean>();

  constructor(private filterFactory: FilterFactory, private sharedService: SharedService) {
    this._eventHandler = new Slick.EventHandler();
    this._onSearchChange = new Slick.Event();
  }

  /** Getter of the SlickGrid Event Handler */
  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  /** Getter to know if the filter was already rendered or if it was its first time render */
  get isFilterFirstRender(): boolean {
    return this._isFilterFirstRender;
  }

  /** Getter of the SlickGrid Event Handler */
  get onSearchChange(): SlickEvent {
    return this._onSearchChange;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  private get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  private get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  init(grid: any): void {
    this._grid = grid;
  }

  dispose() {
    this.disposeColumnFilters();

    // unsubscribe all SlickGrid events
    if (this._eventHandler && this._eventHandler.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
  }

  /**
   * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
   */
  disposeColumnFilters() {
    // we need to loop through all columnFilters and delete them 1 by 1
    // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
    if (typeof this._columnFilters === 'object') {
      for (const columnId in this._columnFilters) {
        if (columnId && this._columnFilters[columnId]) {
          delete this._columnFilters[columnId];
        }
      }
    }

    // also destroy each Filter instances
    if (Array.isArray(this._filtersMetadata)) {
      this._filtersMetadata.forEach((filter) => {
        if (filter && filter.destroy) {
          filter.destroy(true);
        }
      });
    }
  }

  /**
   * Bind a backend filter hook to the grid
   * @param grid SlickGrid Grid object
   */
  bindBackendOnFilter(grid: any, dataView: any) {
    this._dataView = dataView;
    this._filtersMetadata = [];

    // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
    this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e: KeyboardEvent, args: any) => {
      // firstColumnIdRendered is null at first, so if it changes to being filled and equal, then we would know that it was already rendered
      // this is to avoid rendering the filter twice (only the Select Filter for now), rendering it again also clears the filter which has unwanted side effect
      if (args.column.id === this._firstColumnIdRendered) {
        this._isFilterFirstRender = false;
      }
      this.addFilterTemplateToHeaderRow(args, this._isFilterFirstRender);
      if (this._firstColumnIdRendered === '') {
        this._firstColumnIdRendered = args.column.id;
      }
    });

    // subscribe to the SlickGrid event and call the backend execution
    this._eventHandler.subscribe(this._onSearchChange, this.onBackendFilterChange.bind(this));
  }

  /**
   * Bind a local filter hook to the grid
   * @param grid SlickGrid Grid object
   * @param dataView
   */
  bindLocalOnFilter(grid: any, dataView: any) {
    this._filtersMetadata = [];
    this._dataView = dataView;

    dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid, dataView });
    dataView.setFilter(this.customLocalFilter.bind(this));

    this._eventHandler.subscribe(this._onSearchChange, (e: KeyboardEvent, args: any) => {
      const columnId = args.columnId;
      if (columnId != null) {
        dataView.refresh();
      }
      // emit an onFilterChanged event when it's not called by a clear filter
      if (args && !args.clearFilterTriggered) {
        this.emitFilterChanged(EmitterType.local);
      }
    });

    // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
    this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e: KeyboardEvent, args: any) => {
      this.addFilterTemplateToHeaderRow(args);
    });
  }

  clearFilterByColumnId(event: Event, columnId: number | string) {
    // get current column filter before clearing, this allow us to know if the filter was empty prior to calling the clear filter
    const currentColumnFilters = Object.keys(this._columnFilters) as ColumnFilter[];
    let currentColFilter: ColumnFilter;
    if (Array.isArray(currentColumnFilters)) {
      currentColFilter = currentColumnFilters.find((name) => name === columnId);
    }

    // find the filter object and call its clear method with true (the argument tells the method it was called by a clear filter)
    const colFilter: Filter = this._filtersMetadata.find((filter: Filter) => filter.columnDef.id === columnId);
    if (colFilter && colFilter.clear) {
      colFilter.clear(true);
    }

    let emitter: EmitterType = EmitterType.local;
    const isBackendApi = this._gridOptions && this._gridOptions.backendServiceApi || false;

    // when using a backend service, we need to manually trigger a filter change but only if the filter was previously filled
    if (isBackendApi) {
      emitter = EmitterType.remote;
      if (currentColFilter) {
        this.onBackendFilterChange(event as KeyboardEvent, { grid: this._grid, columnFilters: this._columnFilters });
      }
    }

    // emit an event when filter is cleared
    this.emitFilterChanged(emitter);
  }

  /** Clear the search filters (below the column titles) */
  clearFilters(triggerChange = true) {
    this._filtersMetadata.forEach((filter: Filter) => {
      if (filter && filter.clear) {
        // clear element but don't trigger individual clear change,
        // we'll do 1 trigger for all filters at once afterward
        filter.clear(false);
      }
    });

    // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
    if (this._dataView && this._grid) {
      this._dataView.refresh();
      this._grid.invalidate();
    }

    // when using backend service, we need to query only once so it's better to do it here
    const backendApi = this._gridOptions && this._gridOptions.backendServiceApi;
    if (backendApi) {
      const callbackArgs = { clearFilterTriggered: true, shouldTriggerQuery: true, grid: this._grid, columnFilters: this._columnFilters };
      const queryResponse = backendApi.service.processOnFilterChanged(undefined, callbackArgs as FilterChangedArgs);
      // @deprecated, processOnFilterChanged in the future should be return as a query string NOT a Promise
      if (queryResponse instanceof Promise && queryResponse.then) {
        queryResponse.then((query: string) => {
          const totalItems = this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems;
          executeBackendCallback(backendApi, query, callbackArgs, new Date(), totalItems, this.emitFilterChanged.bind(this));
        });
      } else {
        const query = queryResponse as string;
        const totalItems = this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems;
        executeBackendCallback(backendApi, query, callbackArgs, new Date(), totalItems, this.emitFilterChanged.bind(this));
      }
    }

    // emit an event when filters are all cleared
    if (triggerChange) {
      this.onFilterCleared.next(true);
    }
  }

  customLocalFilter(item: any, args: any) {
    const dataView = args && args.dataView;
    for (const columnId of Object.keys(args.columnFilters)) {
      const columnFilter = args.columnFilters[columnId];
      let columnIndex = args.grid.getColumnIndex(columnId);
      let columnDef = args.grid.getColumns()[columnIndex];

      // it might be a hidden column, if so it won't be part of the getColumns (because it we hide a column via setColumns)
      // when that happens we can try to get the column definition from all defined columns
      if (!columnDef && this.sharedService && Array.isArray(this.sharedService.allColumns)) {
        columnIndex = this.sharedService.allColumns.findIndex((col) => col.field === columnId);
        columnDef = this.sharedService.allColumns[columnIndex];
      }

      // if we still don't have a column definition then we should return then row anyway (true)
      if (!columnDef) {
        return true;
      }

      // Row Detail View plugin, if the row is padding we just get the value we're filtering on from it's parent
      if (this._gridOptions.enableRowDetailView) {
        const metadataPrefix = this._gridOptions.rowDetailView && this._gridOptions.rowDetailView.keyPrefix || '__';
        if (item[`${metadataPrefix}isPadding`] && item[`${metadataPrefix}parent`]) {
          item = item[`${metadataPrefix}parent`];
        }
      }

      const dataKey = columnDef.dataKey;
      const fieldName = columnDef.queryFieldFilter || columnDef.queryField || columnDef.field;
      const fieldType = columnDef.type || FieldType.string;
      const filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
      let cellValue = item[fieldName];

      // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
      if (fieldName.indexOf('.') >= 0) {
        cellValue = getDescendantProperty(item, fieldName);
      }

      // if we find searchTerms use them but make a deep copy so that we don't affect original array
      // we might have to overwrite the value(s) locally that are returned
      // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
      const searchValues = (columnFilter && columnFilter.searchTerms) ? $.extend(true, [], columnFilter.searchTerms) : null;

      let fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';

      let matches = null;
      if (fieldType !== FieldType.object) {
        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
        matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
      }

      let operator = columnFilter.operator || ((matches) ? matches[1] : '');
      const searchTerm = (!!matches) ? matches[2] : '';
      const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');

      if (searchValues && searchValues.length > 1) {
        fieldSearchValue = searchValues.join(',');
      } else if (typeof fieldSearchValue === 'string') {
        // escaping the search value
        fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape single quotes by doubling them
        if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
          operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
        }
      }

      // no need to query if search value is empty
      if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
        return true;
      }

      // if search value has a regex match we will only keep the value without the operator
      // in this case we need to overwrite the returned search values to truncate operator from the string search
      if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
        searchValues[0] = searchTerm;
      }

      // filter search terms should always be string type (even though we permit the end user to input numbers)
      // so make sure each term are strings, if user has some default search terms, we will cast them to string
      if (searchValues && Array.isArray(searchValues) && fieldType !== FieldType.object) {
        for (let k = 0, ln = searchValues.length; k < ln; k++) {
          // make sure all search terms are strings
          searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
        }
      }

      // when using localization (i18n), we should use the formatter output to search as the new cell value
      if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
        const rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
        cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
      }

      // make sure cell value is always a string
      if (typeof cellValue === 'number') {
        cellValue = cellValue.toString();
      }

      const conditionOptions = {
        dataKey,
        fieldType,
        searchTerms: searchValues,
        cellValue,
        operator: operator as OperatorString,
        cellValueLastChar: lastValueChar,
        filterSearchType
      };

      if (!FilterConditions.executeMappedCondition(conditionOptions)) {
        return false;
      }
    }

    return true;
  }

  getColumnFilters() {
    return this._columnFilters;
  }

  getFiltersMetadata() {
    return this._filtersMetadata;
  }

  getCurrentLocalFilters(): CurrentFilter[] {
    const currentFilters: CurrentFilter[] = [];
    if (this._columnFilters) {
      for (const colId of Object.keys(this._columnFilters)) {
        const columnFilter = this._columnFilters[colId];
        const filter = { columnId: colId || '' } as CurrentFilter;

        if (columnFilter && columnFilter.searchTerms) {
          filter.searchTerms = columnFilter.searchTerms;
        }
        if (columnFilter.operator) {
          filter.operator = columnFilter.operator;
        }
        if (Array.isArray(filter.searchTerms) && filter.searchTerms.length > 0 && filter.searchTerms[0] !== '') {
          currentFilters.push(filter);
        }
      }
    }
    return currentFilters;
  }

  /**
   * A simple function that is binded to the subscriber and emit a change when the filter is called.
   * Other services, like Pagination, can then subscribe to it.
   * @param caller
   */
  emitFilterChanged(caller: EmitterType) {
    if (caller === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
      let currentFilters: CurrentFilter[] = [];
      const backendService = this._gridOptions.backendServiceApi.service;
      if (backendService && backendService.getCurrentFilters) {
        currentFilters = backendService.getCurrentFilters() as CurrentFilter[];
      }
      this.onFilterChanged.next(currentFilters);
    } else if (caller === EmitterType.local) {
      this.onFilterChanged.next(this.getCurrentLocalFilters());
    }
  }

  async onBackendFilterChange(event: KeyboardEvent, args: any) {
    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying to bind the "onBackendFilterChange(event, args)" function, it seems that "args" is not populated correctly');
    }

    // const gridOptions: GridOption = (args.grid && args.grid.getOptions) ? args.grid.getOptions() : {};
    const backendApi = this._gridOptions.backendServiceApi;

    if (!backendApi || !backendApi.process || !backendApi.service) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    // keep start time & end timestamps & return it after process execution
    const startTime = new Date();

    // run a preProcess callback if defined
    if (backendApi.preProcess) {
      backendApi.preProcess();
    }

    // only add a delay when user is typing, on select dropdown filter (or "Clear Filter") it will execute right away
    let debounceTypingDelay = 0;
    const isTriggeredByClearFilter = args && args.clearFilterTriggered; // was it trigger by a "Clear Filter" command?

    if (!isTriggeredByClearFilter && event && event.keyCode !== KeyCode.ENTER && (event.type === 'input' || event.type === 'keyup' || event.type === 'keydown')) {
      debounceTypingDelay = backendApi.hasOwnProperty('filterTypingDebounce') ? backendApi.filterTypingDebounce as number : DEFAULT_FILTER_TYPING_DEBOUNCE;
    }

    // query backend, except when it's called by a ClearFilters then we won't
    if (args && args.shouldTriggerQuery) {
      // call the service to get a query back
      // TODO: remove async/await on next major change, refer to processOnFilterChanged in BackendService interface (with @deprecated)
      if (debounceTypingDelay > 0) {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          const query = await backendApi.service.processOnFilterChanged(event, args);
          const totalItems = this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems;
          executeBackendCallback(backendApi, query, args, startTime, totalItems, this.emitFilterChanged.bind(this));
        }, debounceTypingDelay);
      } else {
        const query = await backendApi.service.processOnFilterChanged(event, args);
        const totalItems = this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems;
        executeBackendCallback(backendApi, query, args, startTime, totalItems, this.emitFilterChanged.bind(this));
      }
    }
  }

  /**
   * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
   * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
   * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
   * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
   */
  populateColumnFilterSearchTermPresets(filters: CurrentFilter[]) {
    if (Array.isArray(filters) && filters.length > 0) {
      this._columnDefinitions.forEach((columnDef: Column) => {
        // clear any columnDef searchTerms before applying Presets
        if (columnDef.filter && columnDef.filter.searchTerms) {
          delete columnDef.filter.searchTerms;
        }

        // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
        const columnPreset = filters.find((presetFilter: CurrentFilter) => {
          return presetFilter.columnId === columnDef.id;
        });
        if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
          columnDef.filter = columnDef.filter || {};
          columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
          columnDef.filter.searchTerms = columnPreset.searchTerms;
        }
      });
    }
    return this._columnDefinitions;
  }

  /**
   * Update Filters dynamically just by providing an array of filter(s).
   * You can also choose emit (default) a Filter Changed event that will be picked by the Grid State Service.
   *
   * Also for backend service only, you can choose to trigger a backend query (default) or not if you wish to do it later,
   * this could be useful when using updateFilters & updateSorting and you wish to only send the backend query once.
   * @param filters array
   * @param triggerEvent defaults to True, do we want to emit a filter changed event?
   * @param triggerBackendQuery defaults to True, which will query the backend.
   */
  updateFilters(filters: CurrentFilter[], emitChangedEvent = true, triggerBackendQuery = true) {
    if (!this._filtersMetadata || this._filtersMetadata.length === 0 || !this._gridOptions || !this._gridOptions.enableFiltering) {
      throw new Error('[Angular-Slickgrid] in order to use "updateFilters" method, you need to have Filterable Columns defined in your grid and "enableFiltering" set in your Grid Options');
    }

    if (Array.isArray(filters)) {
      // start by clearing all filters (without triggering an event) before applying any new filters
      this.clearFilters(false);

      // pre-fill (value + operator) and render all filters in the DOM
      // loop through each Filters provided (which has a columnId property)
      // then find their associated Filter instances that were originally created in the grid
      filters.forEach((newFilter) => {
        const uiFilter = this._filtersMetadata.find((filter) => newFilter.columnId === filter.columnDef.id);
        if (newFilter && uiFilter) {
          const newOperator = newFilter.operator || uiFilter.defaultOperator;
          this.updateColumnFilters(newFilter.searchTerms, uiFilter.columnDef, newOperator);
          uiFilter.setValues(newFilter.searchTerms, newOperator);
        }
      });

      const backendApi = this._gridOptions && this._gridOptions.backendServiceApi;

      // refresh the DataView and trigger an event after all filters were updated and rendered
      this._dataView.refresh();

      if (backendApi) {
        const backendApiService = backendApi && backendApi.service;
        if (backendApiService) {
          backendApiService.updateFilters(filters, true);
          if (triggerBackendQuery) {
            refreshBackendDataset(this._gridOptions);
          }
        }
      }

      if (emitChangedEvent) {
        const emitterType = backendApi ? EmitterType.remote : EmitterType.local;
        this.emitFilterChanged(emitterType);
      }
    }
  }

  // --
  // private functions
  // -------------------

  /** Add all created filters (from their template) to the header row section area */
  private addFilterTemplateToHeaderRow(args: { column: Column; grid: any; node: HTMLElement }, isFilterFirstRender = true) {
    const columnDef = args.column;
    const columnId = columnDef && columnDef.id || '';

    if (columnDef && columnId !== 'selector' && columnDef.filterable) {
      let searchTerms: SearchTerm[] | undefined;
      let operator: OperatorType | OperatorString;
      const newFilter: Filter | undefined = this.filterFactory.createFilter(args.column.filter);
      operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (newFilter && newFilter.operator) || undefined;

      if (this._columnFilters[columnDef.id]) {
        searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
        operator = this._columnFilters[columnDef.id].operator || undefined;
      } else if (columnDef.filter) {
        // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
        // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last typed in a filter search input)
        searchTerms = columnDef.filter.searchTerms || undefined;
        this.updateColumnFilters(searchTerms, columnDef, operator);
      }

      const filterArguments: FilterArguments = {
        grid: this._grid,
        operator,
        searchTerms,
        columnDef,
        callback: this.callbackSearchEvent.bind(this)
      };

      if (newFilter) {
        newFilter.init(filterArguments, isFilterFirstRender);
        const filterExistIndex = this._filtersMetadata.findIndex((filter) => newFilter.columnDef.id === filter.columnDef.id);

        // add to the filters arrays or replace it when found
        if (filterExistIndex === -1) {
          this._filtersMetadata.push(newFilter);
        } else {
          this._filtersMetadata[filterExistIndex] = newFilter;
        }

        // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
        // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
        if (searchTerms && newFilter.setValues) {
          newFilter.setValues(searchTerms);
        }
      }
    }
  }

  /**
   * Callback method that is called and executed by the individual Filter (DOM element),
   * for example when user type in a word to search (which uses InputFilter), this Filter will execute the callback from a keyup event.
   */
  private callbackSearchEvent(event: any, args: FilterCallbackArg) {
    if (args) {
      const searchTerm = ((event && event.target) ? (event.target as HTMLInputElement).value : undefined);
      const searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
      const columnDef = args.columnDef || null;
      const columnId = columnDef && columnDef.id || '';
      const operator = args.operator || undefined;
      const hasSearchTerms = searchTerms && Array.isArray(searchTerms);
      const termsCount = hasSearchTerms && searchTerms && searchTerms.length;
      const oldColumnFilters = { ...this._columnFilters };

      if (columnDef && columnId) {
        if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && Array.isArray(searchTerms) && searchTerms[0] === '')) {
          // delete the property from the columnFilters when it becomes empty
          // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
          delete this._columnFilters[columnId];
        } else {
          const colId = '' + columnId as string;
          const colFilter: ColumnFilter = {
            columnId: colId,
            columnDef,
            searchTerms,
          };
          if (operator) {
            colFilter.operator = operator;
          }
          this._columnFilters[colId] = colFilter;
        }
      }

      // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData,
      // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
      const eventData = (event && typeof event.isPropagationStopped !== 'function') ? $.extend({}, new Slick.EventData(), event) : event;

      // trigger an event only if Filters changed or if ENTER key was pressed
      const eventKeyCode = event && event.keyCode;
      if (eventKeyCode === KeyCode.ENTER || !isequal(oldColumnFilters, this._columnFilters)) {
        this._onSearchChange.notify({
          clearFilterTriggered: args.clearFilterTriggered,
          shouldTriggerQuery: args.shouldTriggerQuery,
          columnId,
          columnDef,
          columnFilters: this._columnFilters,
          operator,
          searchTerms,
          grid: this._grid
        }, eventData);
      }
    }
  }

  private updateColumnFilters(searchTerms: SearchTerm[] | undefined, columnDef: any, operator?: OperatorType | OperatorString) {
    if (searchTerms && columnDef) {
      this._columnFilters[columnDef.id] = {
        columnId: columnDef.id,
        columnDef,
        searchTerms,
        operator
      };
    }
  }
}
