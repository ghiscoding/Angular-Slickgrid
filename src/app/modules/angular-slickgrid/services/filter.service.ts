import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { castToPromise } from './utilities';
import { FilterConditions } from './../filter-conditions';
import { Filters } from './../filters';
import {
  Column,
  ColumnFilters,
  Filter,
  FilterArguments,
  FieldType,
  FilterType,
  GridOption,
  OperatorType,
  PresetFilter,
  SearchTerm,
  SlickEvent
} from './../models/index';

// using external non-typed js libraries in Angular
declare var Slick: any;

@Injectable()
export class FilterService {
  private _eventHandler = new Slick.EventHandler();
  private _subscriber: SlickEvent = new Slick.Event();
  private _filters: any[] = [];
  private _columnFilters: ColumnFilters = {};
  private _dataView: any;
  private _grid: any;
  private _gridOptions: GridOption;
  private _onFilterChangedOptions: any;
  onFilterChanged = new EventEmitter<string>();

  constructor(private translate: TranslateService) { }

  init(grid: any, gridOptions: GridOption, columnDefinitions: Column[]): void {
    this._grid = grid;
    this._gridOptions = gridOptions;
  }

  /**
   * Attach a backend filter hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   */
  attachBackendOnFilter(grid: any, options: GridOption) {
    this._filters = [];
    this.emitFilterChangedBy('remote');
    this._subscriber.subscribe(this.attachBackendOnFilterSubscribe);

    // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
    this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e: Event, args: any) => {
      this.addFilterTemplateToHeaderRow(args);
    });
  }

  async attachBackendOnFilterSubscribe(event: Event, args: any) {
    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
    }
    const gridOptions: GridOption = args.grid.getOptions() || {};

    const backendApi = gridOptions.backendServiceApi || gridOptions.onBackendEventApi;
    if (!backendApi || !backendApi.process || !backendApi.service) {
      throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
    }

    // run a preProcess callback if defined
    if (backendApi.preProcess) {
      backendApi.preProcess();
    }

    // call the service to get a query back
    const query = await backendApi.service.onFilterChanged(event, args);

    // the process could be an Observable (like HttpClient) or a Promise
    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
    const observableOrPromise = backendApi.process(query);
    const processResult = await castToPromise(observableOrPromise);

    // from the result, call our internal post process to update the Dataset and Pagination info
    if (processResult && backendApi.internalPostProcess) {
      backendApi.internalPostProcess(processResult);
    }

    // send the response process to the postProcess callback
    if (backendApi.postProcess !== undefined) {
      backendApi.postProcess(processResult);
    }
  }

  /** Clear the search filters (below the column titles) */
  clearFilters() {
    this._filters.forEach((filter, index) => {
      if (filter && filter.clear) {
        // clear element and trigger a change
        filter.clear(true);
      }
    });

    // we need to loop through all columnFilters and delete them 1 by 1
    // only trying to clear columnFilter (without looping through) would not trigger a dataset change
    for (const columnId in this._columnFilters) {
      if (columnId && this._columnFilters[columnId]) {
        delete this._columnFilters[columnId];
      }
    }

    // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
    if (this._dataView) {
      this._dataView.refresh();
      this._grid.invalidate();
      this._grid.render();
    }
  }

  /**
   * Attach a local filter hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   * @param dataView
   */
  attachLocalOnFilter(grid: any, options: GridOption, dataView: any) {
    this._dataView = dataView;
    this._filters = [];
    this.emitFilterChangedBy('local');

    dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
    dataView.setFilter(this.customLocalFilter.bind(this, dataView));

    this._subscriber.subscribe((e: any, args: any) => {
      const columnId = args.columnId;
      if (columnId != null) {
        dataView.refresh();
      }
    });

    // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
    this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e: Event, args: any) => {
      this.addFilterTemplateToHeaderRow(args);
    });
  }

  customLocalFilter(dataView: any, item: any, args: any) {
    for (const columnId of Object.keys(args.columnFilters)) {
      const columnFilter = args.columnFilters[columnId];
      const columnIndex = args.grid.getColumnIndex(columnId);
      const columnDef = args.grid.getColumns()[columnIndex];
      if (!columnDef) {
        return false;
      }
      const fieldType = columnDef.type || FieldType.string;
      const filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;

      let cellValue = item[columnDef.queryField || columnDef.field];
      const searchTerms = (columnFilter && columnFilter.searchTerms) ? columnFilter.searchTerms : null;
      let fieldSearchValue = (columnFilter && (columnFilter.searchTerm !== undefined || columnFilter.searchTerm !== null)) ? columnFilter.searchTerm : undefined;

      if (typeof fieldSearchValue === 'undefined') {
        fieldSearchValue = '';
      }
      fieldSearchValue = '' + fieldSearchValue; // make sure it's a string

      const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
      let operator = columnFilter.operator || ((matches) ? matches[1] : '');
      const searchTerm = (!!matches) ? matches[2] : '';
      const lastValueChar = (!!matches) ? matches[3] : '';

      // when using a Filter that is not a custom type, we want to make sure that we have a default operator type
      // for example a multiple-select should always be using IN, while a single select will use an EQ
      const filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input;
      if (!operator && filterType !== FilterType.custom) {
        switch (filterType) {
          case FilterType.select:
          case FilterType.multipleSelect:
            operator = 'IN';
            break;
          case FilterType.singleSelect:
            operator = 'EQ';
            break;
          default:
            operator = operator;
            break;
        }
      }

      // no need to query if search value is empty
      if (searchTerm === '' && !searchTerms) {
        return true;
      }

      // filter search terms should always be string type (even though we permit the end user to input numbers)
      // so make sure each term are strings, if user has some default search terms, we will cast them to string
      if (searchTerms && Array.isArray(searchTerms)) {
        for (let k = 0, ln = searchTerms.length; k < ln; k++) {
          // make sure all search terms are strings
          searchTerms[k] = ((searchTerms[k] === undefined || searchTerms[k] === null) ? '' : searchTerms[k]) + '';
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
        fieldType,
        searchTerms,
        searchTerm,
        cellValue,
        operator,
        cellValueLastChar: lastValueChar,
        filterSearchType
      };

      if (!FilterConditions.executeMappedCondition(conditionOptions)) {
        return false;
      }
    }
    return true;
  }

  dispose() {
    this.disposeColumnFilters();

    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();

    // unsubscribe local event
    if (this._subscriber && typeof this._subscriber.unsubscribe === 'function') {
      this._subscriber.unsubscribe();
    }
  }

  /**
   * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
   */
  disposeColumnFilters() {
    // we need to loop through all columnFilters and delete them 1 by 1
    // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
    for (const columnId in this._columnFilters) {
      if (columnId && this._columnFilters[columnId]) {
        delete this._columnFilters[columnId];
      }
    }

    // also destroy each Filter instances
    this._filters.forEach((filter, index) => {
      if (filter && filter.destroy) {
        filter.destroy(true);
      }
    });
  }

  getColumnFilters() {
    return this._columnFilters;
  }

  callbackSearchEvent(e: Event | undefined, args: { columnDef: Column, operator?: string, searchTerms?: string[] | number[] }) {
    const targetValue = (e && e.target) ? (e.target as HTMLInputElement).value : undefined;
    const searchTerms = (args && args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : [];
    const columnId = (args && args.columnDef) ? args.columnDef.id || '' : '';

    if (!targetValue && searchTerms.length === 0) {
      // delete the property from the columnFilters when it becomes empty
      // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
      delete this._columnFilters[columnId];
    } else {
      const colId = '' + columnId as string;
      this._columnFilters[colId] = {
        columnId: colId,
        columnDef: args.columnDef || null,
        searchTerms: args.searchTerms || undefined,
        searchTerm: ((e && e.target) ? (e.target as HTMLInputElement).value : null),
        operator: args.operator || null
      };
    }

    this.triggerEvent(this._subscriber, {
      columnId,
      columnDef: args.columnDef || null,
      columnFilters: this._columnFilters,
      searchTerms: args.searchTerms || undefined,
      searchTerm: ((e && e.target) ? (e.target as HTMLInputElement).value : null),
      serviceOptions: this._onFilterChangedOptions,
      grid: this._grid
    }, e);
  }

  addFilterTemplateToHeaderRow(args: { column: Column; grid: any; node: any }) {
    const columnDef = args.column;
    const columnId = columnDef.id || '';

    if (columnDef && columnId !== 'selector' && columnDef.filterable) {
      let searchTerms: SearchTerm[] = (columnDef.filter && columnDef.filter.searchTerms) ? columnDef.filter.searchTerms : undefined;
      let searchTerm = (columnDef.filter && (columnDef.filter.searchTerm !== undefined || columnDef.filter.searchTerm !== null)) ? columnDef.filter.searchTerm : '';

      // keep the filter in a columnFilters for later reference
      this.keepColumnFilters(searchTerm, searchTerms, columnDef);

      // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
      // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
      // if nothing is found, we can then use the optional searchTerm(s) passed to the Grid Option (that is couple of lines earlier)
      searchTerm = (this._columnFilters[columnDef.id]) ? this._columnFilters[columnDef.id].searchTerm : searchTerm || null;
      searchTerms = (this._columnFilters[columnDef.id]) ? this._columnFilters[columnDef.id].searchTerms : searchTerms || undefined;

      const filterArguments: FilterArguments = {
        grid: this._grid,
        searchTerm,
        searchTerms,
        columnDef,
        callback: this.callbackSearchEvent.bind(this)
      };

      // depending on the Filter type, we will watch the correct event
      const filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input;

      let filter: Filter;
      switch (filterType) {
        case FilterType.custom:
          if (columnDef && columnDef.filter && columnDef.filter.customFilter) {
            filter = columnDef.filter.customFilter;
          }
          break;
        case FilterType.select:
          filter = new Filters.select(this.translate);
          break;
        case FilterType.multipleSelect:
          filter = new Filters.multipleSelect(this.translate);
          break;
        case FilterType.singleSelect:
          filter = new Filters.singleSelect(this.translate);
          break;
        case FilterType.input:
        default:
          filter = new Filters.input();
          break;
      }

      if (filter) {
        filter.init(filterArguments);
        const filterExistIndex = this._filters.findIndex((filt) => filter.columnDef.name === filt.columnDef.name);

        // add to the filters arrays or replace it when found
        if (filterExistIndex === -1) {
          this._filters.push(filter);
        } else {
          this._filters[filterExistIndex] = filter;
        }
      }
    }
  }

  /**
   * A simple function that is attached to the subscriber and emit a change when the sort is called.
   * Other services, like Pagination, can then subscribe to it.
   * @param sender
   */
  emitFilterChangedBy(sender: string) {
    this._subscriber.subscribe(() => this.onFilterChanged.emit(`onFilterChanged by ${sender}`));
  }

  /**
   * When user passes an array of preset filters, we need to pre-polulate each column filter searchTerm(s)
   * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
   * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
   * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
   * @param gridOptions
   * @param columnDefinitions
   */
  populateColumnFilterSearchTerms(gridOptions: GridOption, columnDefinitions: Column[]) {
    if (gridOptions.presets && gridOptions.presets.filters) {
      const filters = gridOptions.presets.filters;
      columnDefinitions.forEach((columnDef: Column) =>  {
        const columnPreset = filters.find((presetFilter: PresetFilter) => {
          return presetFilter.columnId === columnDef.id;
        });
        if (columnPreset && columnPreset.searchTerm) {
          columnDef.filter = columnDef.filter || {};
          columnDef.filter.searchTerm = columnPreset.searchTerm;
        }
        if (columnPreset && columnPreset.searchTerms) {
          columnDef.filter = columnDef.filter || {};
          columnDef.filter.operator = columnDef.filter.operator || OperatorType.in;
          columnDef.filter.searchTerms = columnPreset.searchTerms;
        }
      });
    }
    return columnDefinitions;
  }

  private keepColumnFilters(searchTerm: SearchTerm, searchTerms: any, columnDef: any) {
    if (searchTerm !== undefined && searchTerm !== null && searchTerm !== '') {
      this._columnFilters[columnDef.id] = {
        columnId: columnDef.id,
        columnDef,
        searchTerm,
        type: (columnDef && columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input
      };
    }
    if (searchTerms) {
      // this._columnFilters.searchTerms = searchTerms;
      this._columnFilters[columnDef.id] = {
        columnId: columnDef.id,
        columnDef,
        searchTerms,
        type: (columnDef && columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FilterType.input
      };
    }
  }

  private triggerEvent(evt: any, args: any, e: any) {
    e = e || new Slick.EventData();
    return evt.notify(args, e, args.grid);
  }
}
