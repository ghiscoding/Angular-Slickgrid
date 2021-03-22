import { Injectable } from '@angular/core';
import { dequal } from 'dequal';
import { isObservable, Subject } from 'rxjs';

import {
  Column,
  ColumnFilters,
  CurrentFilter,
  EmitterType,
  FieldType,
  Filter,
  FilterArguments,
  FilterCallbackArg,
  FilterChangedArgs,
  FilterConditionOption,
  GridOption,
  KeyCode,
  OperatorString,
  OperatorType,
  SearchColumnFilter,
  SearchTerm,
  SlickEvent,
  SlickEventHandler,
} from './../models/index';
import { executeBackendCallback, refreshBackendDataset } from './backend-utilities';
import { deepCopy, getDescendantProperty, mapOperatorByFieldType, sanitizeHtmlToText } from './utilities';
import { FilterConditions, getParsedSearchTermsByFieldType } from './../filter-conditions';
import { FilterFactory } from '../filters/filterFactory';
import { SharedService } from './shared.service';

// using external non-typed js libraries
declare const Slick: any;
declare const $: any;

@Injectable()
export class FilterService {
  protected _eventHandler: SlickEventHandler;
  protected _isFilterFirstRender = true;
  protected _firstColumnIdRendered = '';
  protected _filtersMetadata: Array<Filter> = [];
  protected _columnFilters: ColumnFilters = {};
  protected _grid: any;
  protected _onSearchChange: SlickEvent | null;
  protected _tmpPreFilteredData?: number[];
  protected httpCancelRequests$: Subject<void> = new Subject<void>(); // this will be used to cancel any pending http request
  onFilterChanged = new Subject<CurrentFilter[]>();
  onFilterCleared = new Subject<boolean>();

  constructor(protected filterFactory: FilterFactory, protected sharedService: SharedService) {
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
  get onSearchChange(): SlickEvent | null {
    return this._onSearchChange;
  }

  /** Getter for the Grid Options pulled through the Grid Object */
  protected get _gridOptions(): GridOption {
    return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
  }

  /** Getter for the Column Definitions pulled through the Grid Object */
  protected get _columnDefinitions(): Column[] {
    return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
  }

  /** Getter of SlickGrid DataView object */
  protected get _dataView(): any {
    return (this._grid && this._grid.getData) ? this._grid.getData() : {};
  }

  /**
   * Initialize the Service
   * @param grid
   */
  init(grid: any): void {
    this._grid = grid;

    if (this._gridOptions && this._gridOptions.enableTreeData && this._gridOptions.treeDataOptions) {
      this._grid.setSortColumns([{ columnId: this._gridOptions.treeDataOptions.columnId, sortAsc: true }]);
    }
  }

  dispose() {
    // unsubscribe all SlickGrid events
    if (this._eventHandler && this._eventHandler.unsubscribeAll) {
      this._eventHandler.unsubscribeAll();
    }
    if (isObservable(this.httpCancelRequests$)) {
      this.httpCancelRequests$.next(); // this cancels any pending http requests
    }
    this.disposeColumnFilters();
    this._onSearchChange = null;
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
          filter.destroy();
        }
      });
    }
    this._filtersMetadata = [];
  }

  /**
   * When clearing or disposing of all filters, we need to loop through all columnFilters and delete them 1 by 1
   * only trying to make columnFilter an empty (without looping) would not trigger a dataset change
   */
  resetColumnFilters() {
    if (typeof this._columnFilters === 'object') {
      for (const columnId in this._columnFilters) {
        if (columnId && this._columnFilters[columnId]) {
          delete this._columnFilters[columnId];
        }
      }
    }
  }

  /**
   * Bind a backend filter hook to the grid
   * @param grid SlickGrid Grid object
   */
  bindBackendOnFilter(grid: any) {
    this._filtersMetadata = [];

    // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
    this._eventHandler.subscribe(grid.onHeaderRowCellRendered, this.handleBackendOnSearchChange.bind(this));

    // subscribe to the SlickGrid event and call the backend execution
    if (this._onSearchChange) {
      this._eventHandler.subscribe(this._onSearchChange, this.onBackendFilterChange.bind(this));
    }
  }

  handleBackendOnSearchChange(_e: KeyboardEvent, args: any) {
    // firstColumnIdRendered is null at first, so if it changes to being filled and equal, then we would know that it was already rendered
    // this is to avoid rendering the filter twice (only the Select Filter for now), rendering it again also clears the filter which has unwanted side effect
    if (args.column.id === this._firstColumnIdRendered) {
      this._isFilterFirstRender = false;
    }
    this.addFilterTemplateToHeaderRow(undefined, args, this._isFilterFirstRender);
    if (this._firstColumnIdRendered === '') {
      this._firstColumnIdRendered = args.column.id;
    }
  }

  /**
   * Bind a local filter hook to the grid
   * @param grid SlickGrid Grid object
   * @param dataView
   */
  bindLocalOnFilter(grid: any) {
    this._filtersMetadata = [];

    this._dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid, dataView: this._dataView });
    this._dataView.setFilter(this.customLocalFilter.bind(this));

    // bind any search filter change (e.g. input filter input change event)
    if (this._onSearchChange) {
      this._eventHandler.subscribe(this._onSearchChange, this.handleLocalOnSearchChange.bind(this));

      // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
      this._eventHandler.subscribe(grid.onHeaderRowCellRendered, this.addFilterTemplateToHeaderRow.bind(this));
    }
  }

  handleLocalOnSearchChange(_e: KeyboardEvent, args: any) {
    const isGridWithTreeData = this._gridOptions && this._gridOptions.enableTreeData || false;

    // When using Tree Data, we need to do it in 2 steps
    // step 1. we need to prefilter (search) the data prior, the result will be an array of IDs which are the node(s) and their parent nodes when necessary.
    // step 2. calling the DataView.refresh() is what triggers the final filtering, with "customLocalFilter()" which will decide which rows should persist
    if (isGridWithTreeData) {
      this._tmpPreFilteredData = this.preFilterTreeData(this._dataView.getItems(), this._columnFilters);
    }

    const columnId = args.columnId;
    if (columnId !== null) {
      this._dataView.refresh();
    }
    // emit an onFilterChanged event when it's not called by a clear filter
    if (args && !args.clearFilterTriggered) {
      this.emitFilterChanged(EmitterType.local);
    }
  }

  clearFilterByColumnId(event: Event, columnId: number | string) {
    // get current column filter before clearing, this allow us to know if the filter was empty prior to calling the clear filter
    const currentFilterColumnIds = Object.keys(this._columnFilters);
    let currentColFilter: string | undefined;
    if (Array.isArray(currentFilterColumnIds)) {
      currentColFilter = currentFilterColumnIds.find(name => name === `${columnId}`);
    }

    // find the filter object and call its clear method with true (the argument tells the method it was called by a clear filter)
    const colFilter: Filter | undefined = this._filtersMetadata.find((filter: Filter) => filter.columnDef.id === columnId);
    if (colFilter && colFilter.clear) {
      colFilter.clear(true);
    }

    let emitter: EmitterType = EmitterType.local;
    const isBackendApi = this._gridOptions && this._gridOptions.backendServiceApi || false;

    // when using a backend service, we need to manually trigger a filter change but only if the filter was previously filled
    if (isBackendApi) {
      emitter = EmitterType.remote;
      if (currentColFilter !== undefined) {
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

    // also reset the columnFilters object and remove any filters from the object
    this.resetColumnFilters();

    // also remove any search terms directly on each column definitions
    this._columnDefinitions.forEach((columnDef: Column) => {
      if (columnDef.filter?.searchTerms) {
        columnDef.filter.searchTerms = [];
      }
    });

    // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
    if (this._dataView && this._grid) {
      this._dataView.refresh();
      this._grid.invalidate();
    }

    // when using backend service, we need to query only once so it's better to do it here
    const backendApi = this._gridOptions && this._gridOptions.backendServiceApi;
    if (backendApi && triggerChange) {
      const callbackArgs = { clearFilterTriggered: true, shouldTriggerQuery: triggerChange, grid: this._grid, columnFilters: this._columnFilters };
      const queryResponse = backendApi.service.processOnFilterChanged(undefined, callbackArgs as FilterChangedArgs);
      if (queryResponse instanceof Promise && queryResponse.then) {
        // @deprecated, processOnFilterChanged in the future should be returned as a query string NOT as a Promise
        console.warn(`[Angular-Slickgrid] please note that the "processOnFilterChanged" from your Backend Service, should now return a string instead of a Promise.
          Returning a Promise will be deprecated in the future.`);
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

  /** Local Grid Filter search */
  customLocalFilter(item: any, args: any): boolean {
    const dataView = args && args.dataView;
    const grid = args && args.grid;
    const isGridWithTreeData = this._gridOptions && this._gridOptions.enableTreeData || false;
    const columnFilters = args && args.columnFilters || {};
    let treeDataOptions;

    // when the column is a Tree Data structure and the parent is collapsed, we won't go further and just continue with next row
    // so we always run this check even when there are no filter search, the reason is because the user might click on the expand/collapse
    if (isGridWithTreeData && this._gridOptions && this._gridOptions.treeDataOptions) {
      treeDataOptions = this._gridOptions.treeDataOptions;
      const collapsedPropName = treeDataOptions.collapsedPropName || '__collapsed';
      const parentPropName = treeDataOptions.parentPropName || '__parentId';
      const dataViewIdIdentifier = this._gridOptions.datasetIdPropertyName || 'id';

      if (item[parentPropName] !== null) {
        let parent = this._dataView.getItemById(item[parentPropName]);
        while (parent) {
          if (parent[collapsedPropName]) {
            return false; // don't display any row that have their parent collapsed
          }
          parent = this._dataView.getItemById(parent[parentPropName]);
        }
      }

      // filter out any row items that aren't part of our pre-processed "preFilterTreeData()" result
      if (Array.isArray(this._tmpPreFilteredData)) {
        return this._tmpPreFilteredData.includes(item[dataViewIdIdentifier]); // return true when found, false otherwise
      }
    } else {
      if (typeof columnFilters === 'object') {
        for (const columnId of Object.keys(columnFilters)) {
          const columnFilter = columnFilters[columnId] as SearchColumnFilter;
          const conditionOptions = this.preProcessFilterConditionOnDataContext(item, columnFilter, grid);

          if (typeof conditionOptions === 'boolean') {
            return conditionOptions;
          }

          let parsedSearchTerms = columnFilter && columnFilter.parsedSearchTerms; // parsed term could a single value or an array of values

          // in the rare case that it's empty (it can happen when creating an external grid global search)
          // then get the parsed terms, once it's filled it typically won't ask for it anymore
          if (parsedSearchTerms === undefined) {
            parsedSearchTerms = getParsedSearchTermsByFieldType(columnFilter.searchTerms, columnFilter.columnDef.type || FieldType.string); // parsed term could a single value or an array of values
            if (parsedSearchTerms !== undefined) {
              columnFilter.parsedSearchTerms = parsedSearchTerms;
            }
          }

          // execute the filtering conditions check (all cell values vs search term(s))
          if (!FilterConditions.executeFilterConditionTest(conditionOptions as FilterConditionOption, parsedSearchTerms)) {
            return false;
          }
        }
      }
    }

    // if it reaches here, that means the row is valid and passed all filter
    return true;
  }

  /**
   * Loop through each form input search filter and parse their searchTerms,
   * for example a CompoundDate Filter will be parsed as a Moment object.
   * Also if we are dealing with a text filter input,
   * an operator can optionally be part of the filter itself and we need to extract it from there,
   * for example a filter of "John*" will be analyzed as { operator: StartsWith, searchTerms: ['John'] }
   * @param inputSearchTerms - filter search terms
   * @param columnFilter - column filter object (the object properties represent each column id and the value is the filter metadata)
   * @returns FilterConditionOption
   */
  parseFormInputFilterConditions(inputSearchTerms: SearchTerm[] | undefined, columnFilter: Omit<SearchColumnFilter, 'searchTerms'>): Omit<FilterConditionOption, 'cellValue'> {
    const searchValues: SearchTerm[] = deepCopy(inputSearchTerms) || [];
    let fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
    const columnDef = columnFilter.columnDef;
    const fieldType = columnDef && columnDef.filter && columnDef.filter.type || columnDef && columnDef.type || FieldType.string;

    let matches = null;
    if (fieldType !== FieldType.object) {
      fieldSearchValue = (fieldSearchValue === undefined || fieldSearchValue === null) ? '' : `${fieldSearchValue}`; // make sure it's a string
      matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])?([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
    }

    let operator = (!!(matches) ? matches[1] : columnFilter.operator);
    const searchTerm = (!!matches) ? matches[2] : '';
    const inputLastChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');

    if (typeof fieldSearchValue === 'string') {
      fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape any single quotes by doubling them
      if (operator === '*' || operator === '*z') {
        operator = OperatorType.endsWith;
      } else if (operator === 'a*' || inputLastChar === '*') {
        operator = OperatorType.startsWith;
      }
    }

    // if search value has a regex match we will only keep the value without the operator
    // in this case we need to overwrite the returned search values to truncate operator from the string search
    if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
      searchValues[0] = searchTerm;
    }

    return {
      dataKey: columnDef.dataKey,
      fieldType,
      searchTerms: searchValues || [],
      operator: operator as OperatorString,
      searchInputLastChar: inputLastChar,
      filterSearchType: columnDef.filterSearchType,
      defaultFilterRangeOperator: this._gridOptions.defaultFilterRangeOperator,
    } as FilterConditionOption;
  }

  /**
   * PreProcess the filter(s) condition(s) on each item data context, the result might be a boolean or FilterConditionOption object.
   * It will be a boolean when the searchTerms are invalid or the column is not found (it so it will return True and the item won't be filtered out from the grid)
   * or else a FilterConditionOption object with the necessary info for the test condition needs to be processed in a further stage.
   * @param item - item data context
   * @param columnFilter - column filter object (the object properties represent each column id and the value is the filter metadata)
   * @param grid - SlickGrid object
   * @returns FilterConditionOption or boolean
   */
  preProcessFilterConditionOnDataContext(item: any, columnFilter: SearchColumnFilter, grid: any): FilterConditionOption | boolean {
    const columnDef = columnFilter.columnDef;
    const columnId = columnFilter.columnId;
    let columnIndex = grid.getColumnIndex(columnId) as number;

    // it might be a hidden column, if so it won't be part of the getColumns (because it could be hidden via setColumns())
    // when that happens we can try to get the column definition from all defined columns
    if (!columnDef && this.sharedService && Array.isArray(this.sharedService.allColumns)) {
      columnIndex = this.sharedService.allColumns.findIndex(col => col.field === columnId);
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

    let queryFieldName = (columnDef.filter && columnDef.filter.queryField) || columnDef.queryFieldFilter || columnDef.queryField || columnDef.field || '';
    if (typeof columnDef.queryFieldNameGetterFn === 'function') {
      queryFieldName = columnDef.queryFieldNameGetterFn(item);
    }
    const fieldType = (columnDef.filter && columnDef.filter.type) || columnDef.type || FieldType.string;
    let cellValue = item[queryFieldName];

    // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
    if (queryFieldName && queryFieldName.indexOf('.') >= 0) {
      cellValue = getDescendantProperty(item, queryFieldName);
    }

    const operator = columnFilter.operator;
    const searchValues = columnFilter.searchTerms || [];

    // no need to query if search value is empty or if the search value is in fact equal to the operator
    if (!searchValues || (Array.isArray(searchValues) && (searchValues.length === 0 || searchValues.length === 1 && operator === searchValues[0]))) {
      return true;
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
    // we will also sanitize/remove HTML tags out of the text (which might be added by multiple-select)
    if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
      const dataView = grid.getData();
      const idPropName = this._gridOptions.datasetIdPropertyName || 'id';
      const rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item[idPropName]) : 0;
      cellValue = (columnDef && typeof columnDef.formatter === 'function') ? columnDef.formatter(rowIndex || 0, columnIndex, cellValue, columnDef, item, this._grid) : '';
      cellValue = sanitizeHtmlToText(cellValue); // also remove any html tag
    }

    // make sure cell value is always a string
    if (typeof cellValue === 'number') {
      cellValue = cellValue.toString();
    }

    return {
      dataKey: columnDef.dataKey,
      fieldType,
      searchTerms: searchValues,
      cellValue,
      operator: operator as OperatorString,
      searchInputLastChar: columnFilter.searchInputLastChar,
      filterSearchType: columnDef.filterSearchType,
      defaultFilterRangeOperator: this._gridOptions.defaultFilterRangeOperator,
    } as FilterConditionOption;
  }

  /**
   * When using Tree Data, we need to prefilter (search) the data prior, the result will be an array of IDs which are the node(s) and their parent nodes when necessary.
   * This will then be passed to the DataView setFilter(customLocalFilter), which will itself loop through the list of IDs and display/hide the row if found that array of IDs
   * We do this in 2 steps so that we can still use the DataSet setFilter()
   */
  preFilterTreeData(inputArray: any[], columnFilters: ColumnFilters) {
    const treeDataOptions = this._gridOptions && this._gridOptions.treeDataOptions;
    const parentPropName = treeDataOptions && treeDataOptions.parentPropName || '__parentId';
    const dataViewIdIdentifier = this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';

    const treeObj = {};
    const filteredChildrenAndParents: any[] = [];

    if (Array.isArray(inputArray)) {
      for (let i = 0; i < inputArray.length; i++) {
        (treeObj as any)[inputArray[i][dataViewIdIdentifier]] = inputArray[i];
        // as the filtered data is then used again as each subsequent letter
        // we need to delete the .__used property, otherwise the logic below
        // in the while loop (which checks for parents) doesn't work:
        delete (treeObj as any)[inputArray[i][dataViewIdIdentifier]].__used;
      }

      // Step 1. prepare search filter by getting their parsed value(s), for example if it's a date filter then parse it to a Moment object
      // loop through all column filters once and get parsed filter search value then save a reference in the columnFilter itself
      // it is much more effective to do it outside and prior to Step 2 so that we don't re-parse search filter for no reason while checking every row
      for (const columnId of Object.keys(columnFilters)) {
        const columnFilter = columnFilters[columnId] as SearchColumnFilter;
        const searchValues: SearchTerm[] = (columnFilter && columnFilter.searchTerms) ? deepCopy(columnFilter.searchTerms) : [];

        const inputSearchConditions = this.parseFormInputFilterConditions(searchValues, columnFilter);

        const columnDef = columnFilter.columnDef;
        const fieldType = columnDef && columnDef.filter && columnDef.filter.type || columnDef && columnDef.type || FieldType.string;
        const parsedSearchTerms = getParsedSearchTermsByFieldType(inputSearchConditions.searchTerms, fieldType); // parsed term could a single value or an array of values
        if (parsedSearchTerms !== undefined) {
          columnFilter.parsedSearchTerms = parsedSearchTerms;
        }
      }

      // Step 2. loop through every item data context to execute filter condition check
      for (let i = 0; i < inputArray.length; i++) {
        const item = inputArray[i];
        let matchFilter = true; // valid until proven otherwise

        // loop through all column filters and execute filter condition(s)
        for (const columnId of Object.keys(columnFilters)) {
          const columnFilter = columnFilters[columnId] as SearchColumnFilter;
          const conditionOptionResult = this.preProcessFilterConditionOnDataContext(item, columnFilter, this._grid);

          if (conditionOptionResult) {
            const parsedSearchTerms = columnFilter && columnFilter.parsedSearchTerms; // parsed term could a single value or an array of values
            const conditionResult = (typeof conditionOptionResult === 'boolean') ? conditionOptionResult : FilterConditions.executeFilterConditionTest(conditionOptionResult as FilterConditionOption, parsedSearchTerms);
            if (conditionResult) {
              // don't return true since we still need to check other keys in columnFilters
              continue;
            }
          }
          matchFilter = false;
          continue;
        }

        // build an array from the matched filters, anything valid from filter condition
        // will be pushed to the filteredChildrenAndParents array
        if (matchFilter) {
          const len = filteredChildrenAndParents.length;
          // add child (id):
          filteredChildrenAndParents.splice(len, 0, item[dataViewIdIdentifier]);
          let parent = (treeObj as any)[item[parentPropName]] || false;
          while (parent) {
            // only add parent (id) if not already added:
            parent.__used || filteredChildrenAndParents.splice(len, 0, parent[dataViewIdIdentifier]);
            // mark each parent as used to not use them again later:
            (treeObj as any)[parent[dataViewIdIdentifier]].__used = true;
            // try to find parent of the current parent, if exists:
            parent = (treeObj as any)[parent[parentPropName]] || false;
          }
        }
      }
    }
    return filteredChildrenAndParents;
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
   * A simple function that will be called to emit a change when a filter changes.
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

    // query backend, except when it's called by a ClearFilters then we won't
    if (args?.shouldTriggerQuery) {
      const query = await backendApi.service.processOnFilterChanged(event, args);
      const totalItems = this._gridOptions && this._gridOptions.pagination && this._gridOptions.pagination.totalItems || 0;
      executeBackendCallback(backendApi, query, args, startTime, totalItems, this.emitFilterChanged.bind(this));
    }
  }

  /**
   * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
   * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
   * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
   * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
   */
  populateColumnFilterSearchTermPresets(filters: CurrentFilter[]) {
    if (Array.isArray(filters)) {
      this._columnDefinitions.forEach((columnDef: Column) => {
        // clear any columnDef searchTerms before applying Presets
        if (columnDef.filter && columnDef.filter.searchTerms) {
          delete columnDef.filter.searchTerms;
        }

        // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
        const columnPreset = filters.find((presetFilter: CurrentFilter) => presetFilter.columnId === columnDef.id);
        if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
          columnDef.filter = columnDef.filter || {};
          columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
          columnDef.filter.searchTerms = columnPreset.searchTerms;
        }
      });

      // when we have a Filter Presets on a Tree Data View grid, we need to call the pre-filtering of tree data
      this.refreshTreeDataFilters();
    }
    return this._columnDefinitions;
  }

  /**
   * when we have a Filter Presets on a Tree Data View grid, we need to call the pre-filtering of tree data
   * we need to do this because Tree Data is the only type of grid that requires a pre-filter (preFilterTreeData) to be executed before the final filtering
   * @param filters
   */
  refreshTreeDataFilters() {
    if (this._dataView && this._dataView.getItems && this._gridOptions && this._gridOptions.enableTreeData) {
      this._tmpPreFilteredData = this.preFilterTreeData(this._dataView.getItems(), this._columnFilters);
      this._dataView.refresh(); // and finally this refresh() is what triggers a DataView filtering check
    }
  }

  /**
   * Toggle the Filter Functionality
   * @param {boolean} isFilterDisabled - optionally force a disable/enable of the Sort Functionality? Defaults to True
   * @param {boolean} clearFiltersWhenDisabled - when disabling the Filter, do we also want to clear all the filters as well? Defaults to True
   */
  disableFilterFunctionality(isFilterDisabled = true, clearFiltersWhenDisabled = true) {
    const prevShowFilterFlag = this._gridOptions.enableFiltering;
    const newShowFilterFlag = !prevShowFilterFlag;

    if (newShowFilterFlag !== isFilterDisabled) {
      if (clearFiltersWhenDisabled && isFilterDisabled) {
        this.clearFilters();
      }
      this.disableAllFilteringCommands(isFilterDisabled);
      this._grid.setOptions({ enableFiltering: newShowFilterFlag }, false, true);
      this._grid.setHeaderRowVisibility(newShowFilterFlag);
      this._gridOptions.enableFiltering = !isFilterDisabled;
      this.sharedService.gridOptions = this._gridOptions;

      // when displaying header row, we'll call "setColumns" which in terms will recreate the header row filters
      this._grid.setColumns(this.sharedService.columnDefinitions);
    }
  }

  /**
   * Toggle the Filter Functionality (show/hide the header row filter bar as well)
   * @param {boolean} clearFiltersWhenDisabled - when disabling the filters, do we want to clear the filters before hiding the filters? Defaults to True
   */
  toggleFilterFunctionality(clearFiltersWhenDisabled = true) {
    const prevShowFilterFlag = this._gridOptions.enableFiltering;
    this.disableFilterFunctionality(prevShowFilterFlag, clearFiltersWhenDisabled);
  }

  /**
   * Toggle the Header Row filter bar (this does not disable the Filtering itself, you can use "toggleFilterFunctionality()" instead, however this will reset any column positions)
   */
  toggleHeaderFilterRow() {
    let showHeaderRow = this._gridOptions && this._gridOptions.showHeaderRow || false;
    showHeaderRow = !showHeaderRow; // inverse show header flag
    this._grid.setHeaderRowVisibility(showHeaderRow);

    // when displaying header row, we'll call "setColumns" which in terms will recreate the header row filters
    if (showHeaderRow === true) {
      this._grid.setColumns(this.sharedService.columnDefinitions);
    }
  }

  /**
   * Set the sort icons in the UI (ONLY the icons, it does not do any sorting)
   * The column sort icons are not necessarily inter-connected to the sorting functionality itself,
   * you can change the sorting icons separately by passing an array of columnId/sortAsc and that will change ONLY the icons
   * @param sortColumns
   */
  setSortColumnIcons(sortColumns: { columnId: string, sortAsc: boolean }[]) {
    if (this._grid && Array.isArray(sortColumns)) {
      this._grid.setSortColumns(sortColumns);
    }
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
   * @param triggerOnSearchChangeEvent defaults to False, can be useful with Tree Data structure where the onSearchEvent has to run to execute a prefiltering step
   */
  updateFilters(filters: CurrentFilter[], emitChangedEvent = true, triggerBackendQuery = true, triggerOnSearchChangeEvent = false) {
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
          uiFilter.setValues(newFilter.searchTerms || [], newOperator);

          if (triggerOnSearchChangeEvent) {
            this.callbackSearchEvent(null, { columnDef: uiFilter.columnDef, operator: newOperator, searchTerms: newFilter.searchTerms, shouldTriggerQuery: true });
          }
        }
      });

      const backendApi = this._gridOptions && this._gridOptions.backendServiceApi;

      // refresh the DataView and trigger an event after all filters were updated and rendered
      this._dataView.refresh();

      if (backendApi) {
        const backendApiService = backendApi && backendApi.service;
        if (backendApiService && backendApiService.updateFilters) {
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

  /**
   * Update a Single Filter dynamically just by providing (columnId, operator and searchTerms)
   * You can also choose emit (default) a Filter Changed event that will be picked by the Grid State Service.
   *
   * Also for backend service only, you can choose to trigger a backend query (default) or not if you wish to do it later,
   * this could be useful when using updateFilters & updateSorting and you wish to only send the backend query once.
   * @param filters array
   * @param triggerEvent defaults to True, do we want to emit a filter changed event?
   */
  updateSingleFilter(filter: CurrentFilter, emitChangedEvent = true, triggerBackendQuery = true) {
    const columnDef = this.sharedService.allColumns.find(col => col.id === filter.columnId);
    if (columnDef && filter.columnId) {
      this._columnFilters = {};
      if (Array.isArray(filter.searchTerms) && (filter.searchTerms.length > 1 || (filter.searchTerms.length === 1 && filter.searchTerms[0] !== ''))) {
        // pass a columnFilter object as an object which it's property name must be a column field name (e.g.: 'duration': {...} )
        this._columnFilters[filter.columnId] = {
          columnId: filter.columnId,
          operator: filter.operator,
          searchTerms: filter.searchTerms,
          columnDef,
          type: columnDef.type || FieldType.string,
        };
      }

      const backendApi = this._gridOptions && this._gridOptions.backendServiceApi;

      if (backendApi) {
        const backendApiService = backendApi && backendApi.service;
        if (backendApiService && backendApiService.updateFilters) {
          backendApiService.updateFilters(this._columnFilters, true);
          if (triggerBackendQuery) {
            refreshBackendDataset(this._gridOptions);
          }
        }
      } else {
        this._dataView.setFilterArgs({
          columnFilters: this._columnFilters,
          grid: this._grid
        });
        this._dataView.refresh();
      }

      if (emitChangedEvent) {
        const emitterType = backendApi ? EmitterType.remote : EmitterType.local;
        this.emitFilterChanged(emitterType);
      }
    }
  }

  // --
  // protected functions
  // -------------------

  /** Add all created filters (from their template) to the header row section area */
  protected addFilterTemplateToHeaderRow(_event: Event | undefined, args: { column: Column; grid: any; node: HTMLElement }, isFilterFirstRender = true) {
    const columnDef = args.column;
    const columnId = columnDef && columnDef.id || '';

    if (columnDef && columnId !== 'selector' && columnDef.filterable) {
      let searchTerms: SearchTerm[] | undefined;
      let operator: OperatorString | OperatorType | undefined;
      const newFilter: Filter | undefined = this.filterFactory.createFilter(columnDef.filter);
      operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (newFilter && newFilter.operator);

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
          newFilter.setValues(searchTerms, operator);
        }
      }
    }
  }

  /**
   * Callback method that is called and executed by the individual Filter (DOM element),
   * for example when user starts typing chars on a search input (which uses InputFilter), this Filter will execute the callback from an input change event.
   */
  protected callbackSearchEvent(event: any | undefined, args: FilterCallbackArg) {
    if (args) {
      const searchTerm = ((event && event.target) ? (event.target as HTMLInputElement).value : undefined);
      const searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
      const columnDef = args.columnDef || null;
      const columnId = columnDef && columnDef.id || '';
      const fieldType = columnDef && columnDef.filter && columnDef.filter.type || columnDef && columnDef.type || FieldType.string;
      const operator = args.operator || undefined;
      const hasSearchTerms = searchTerms && Array.isArray(searchTerms);
      const termsCount = hasSearchTerms && searchTerms && searchTerms.length;
      const oldColumnFilters = { ...this._columnFilters };
      let parsedSearchTerms: SearchTerm | SearchTerm[] | undefined;

      if (columnDef && columnId) {
        if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && Array.isArray(searchTerms) && searchTerms[0] === '')) {
          // delete the property from the columnFilters when it becomes empty
          // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
          delete this._columnFilters[columnId];
        } else {
          const colId = `${columnId}`;
          const colFilter: Omit<SearchColumnFilter, 'searchTerms'> = {
            columnId: colId,
            columnDef,
            parsedSearchTerms: [],
            type: fieldType
          };
          const inputSearchConditions = this.parseFormInputFilterConditions(searchTerms, colFilter);
          colFilter.operator = operator || inputSearchConditions.operator || mapOperatorByFieldType(fieldType);
          parsedSearchTerms = getParsedSearchTermsByFieldType(inputSearchConditions.searchTerms, fieldType);
          if (parsedSearchTerms !== undefined) {
            colFilter.parsedSearchTerms = parsedSearchTerms;
          }

          // use searchTerms only coming from the input search result because original terms might include extra operator symbols within their string
          // and the input search result would be correctly stripped them from input result and assigned to the appropriate operator
          // for example we might have: { searchTerms: ['*doe'] } and that should be reassigned to: { operator: EndsWith, searchTerms: 'doe' }
          (colFilter as SearchColumnFilter).searchTerms = inputSearchConditions.searchTerms || [];
          this._columnFilters[colId] = colFilter as SearchColumnFilter;
        }
      }

      // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData,
      // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
      const eventData = (event && typeof event.isPropagationStopped !== 'function') ? $.extend({}, new Slick.EventData(), event) : event;

      // trigger an event only if Filters changed or if ENTER key was pressed
      const eventKey = event && event.key;
      const eventKeyCode = event && event.keyCode;
      if (this._onSearchChange && (eventKey === 'Enter' || eventKeyCode === KeyCode.ENTER || !dequal(oldColumnFilters, this._columnFilters))) {
        this._onSearchChange.notify({
          clearFilterTriggered: args.clearFilterTriggered,
          shouldTriggerQuery: args.shouldTriggerQuery,
          columnId,
          columnDef,
          columnFilters: this._columnFilters,
          operator: operator || mapOperatorByFieldType(fieldType),
          searchTerms,
          parsedSearchTerms,
          grid: this._grid
        }, eventData);
      }
    }
  }

  /**
   * Loop through all column definitions and do the following thing
   * 1. loop through each Header Menu commands and change the "hidden" commands to show/hide depending if it's enabled/disabled
   * Also note that we aren't deleting any properties, we just toggle their flags so that we can reloop through at later point in time.
   * (if we previously deleted these properties we wouldn't be able to change them back since these properties wouldn't exist anymore, hence why we just hide the commands)
   * @param {boolean} isDisabling - are we disabling the filter functionality? Defaults to true
   */
  protected disableAllFilteringCommands(isDisabling = true): Column[] {
    const columnDefinitions = this._grid.getColumns();

    // loop through column definition to hide/show header menu commands
    columnDefinitions.forEach((col: Column) => {
      if (col && col.header && col.header.menu) {
        col.header.menu.items.forEach(menuItem => {
          if (menuItem && typeof menuItem !== 'string') {
            const menuCommand = menuItem.command;
            if (menuCommand === 'clear-filter') {
              menuItem.hidden = isDisabling;
            }
          }
        });
      }
    });

    // loop through column definition to hide/show grid menu commands
    if (this._gridOptions && this._gridOptions.gridMenu && this._gridOptions.gridMenu.customItems) {
      this._gridOptions.gridMenu.customItems.forEach((menuItem) => {
        if (menuItem && typeof menuItem !== 'string') {
          const menuCommand = menuItem.command;
          if (menuCommand === 'clear-filter' || menuCommand === 'toggle-filter') {
            menuItem.hidden = isDisabling;
          }
        }
      });
    }

    return columnDefinitions;
  }

  protected updateColumnFilters(searchTerms: SearchTerm[] | undefined, columnDef: any, operator?: OperatorType | OperatorString) {
    const fieldType = columnDef && columnDef.filter && columnDef.filter.type || columnDef && columnDef.type || FieldType.string;
    const parsedSearchTerms = getParsedSearchTermsByFieldType(searchTerms, fieldType); // parsed term could a single value or an array of values

    if (searchTerms && columnDef) {
      this._columnFilters[columnDef.id] = {
        columnId: columnDef.id,
        columnDef,
        searchTerms,
        operator,
        parsedSearchTerms,
        type: fieldType,
      };
    }
  }
}
