import { castToPromise } from './utilities';
import { FilterConditions } from '../filter-conditions';
import {
  BackendServiceOption,
  Column,
  ColumnFilters,
  FieldType,
  FilterChangedArgs,
  FormElementType,
  GridOption,
  SlickEvent
} from '../models';
import { FilterTemplates } from './../filter-templates';
import $ from 'jquery';

// using external js modules in Angular
declare var Slick: any;
export class FilterService {
  _columnDefinitions: Column[];
  _columnFilters: ColumnFilters;
  _dataView: any;
  _grid: any;
  _gridOptions: GridOption;
  _onFilterChangedOptions: any;
  subscriber: SlickEvent;

  init(grid: any, gridOptions: GridOption, columnDefinitions: Column[], columnFilters: any) {
    this._columnDefinitions = columnDefinitions;
    this._columnFilters = columnFilters;
    this._gridOptions = gridOptions;
    this._grid = grid;
  }

  /**
   * Attach a backend filter hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   */
  attachBackendOnFilter(grid, options) {
    this.subscriber = new Slick.Event();
    this.subscriber.subscribe(this.attachBackendOnFilterSubscribe);
    this.addFilterTemplateToHeaderRow();
  }

  async attachBackendOnFilterSubscribe(event, args) {
    if (!args || !args.grid) {
      throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
    }
    const serviceOptions: BackendServiceOption = args.grid.getOptions();

    if (!serviceOptions || !serviceOptions.onBackendEventApi.process || !serviceOptions.onBackendEventApi.service) {
      throw new Error(`onBackendEventApi requires at least a "process" function and a "service" defined`);
    }
    const backendApi = serviceOptions.onBackendEventApi;

    // run a preProcess callback if defined
    if (backendApi.preProcess) {
      backendApi.preProcess();
    }

    // call the service to get a query back
    const query = await backendApi.service.onFilterChanged(event, args);

    // the process could be an Observable (like HttpClient) or a Promise
    // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
    const observableOrPromise = backendApi.process(query);
    const responseProcess = await castToPromise(observableOrPromise);

    // send the response process to the postProcess callback
    if (backendApi.postProcess) {
      backendApi.postProcess(responseProcess);
    }
  }

  testFilterCondition(operator: string, value1: any, value2: any): boolean {
    switch (operator) {
      case '<': return (value1 < value2) ? true : false;
      case '<=': return (value1 <= value2) ? true : false;
      case '>': return (value1 > value2) ? true : false;
      case '>=': return (value1 >= value2) ? true : false;
      case '!=':
      case '<>': return (value1 !== value2) ? true : false;
      case '=':
      case '==': return (value1 === value2) ? true : false;
    }
    return true;
  }
  /**
   * Attach a local filter hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   * @param dataView
   */
  attachLocalOnFilter(dataView: any) {
    this._dataView = dataView;
    this.subscriber = new Slick.Event();

    dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
    dataView.setFilter(this.customFilter);

    this.subscriber.subscribe((e: any, args: any) => {
      const columnId = args.columnId;
      if (columnId != null) {
        dataView.refresh();
      }
    });
    this.addFilterTemplateToHeaderRow();
  }

  customFilter(item: any, args: any) {
    for (const columnId of Object.keys(args.columnFilters)) {
      const columnFilter = args.columnFilters[columnId];
      const columnIndex = args.grid.getColumnIndex(columnId);
      const columnDef = args.grid.getColumns()[columnIndex];
      const fieldType = columnDef.type || FieldType.string;
      const conditionalFilterFn = (columnDef.filter && columnDef.filter.conditionalFilter) ? columnDef.filter.conditionalFilter : null;
      const filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;

      let cellValue = item[columnDef.field];
      let fieldSearchValue = columnFilter.searchTerm;
      if (typeof fieldSearchValue === 'undefined') {
        fieldSearchValue = '';
      }
      fieldSearchValue = '' + fieldSearchValue; // make sure it's a string

      const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
      const operator = columnFilter.operator || ((matches) ? matches[1] : '');
      const searchTerm = (!!matches) ? matches[2] : '';
      const lastValueChar = (!!matches) ? matches[3] : '';

      // no need to query if search value is empty
      if (searchTerm === '') {
        return true;
      }

      if (typeof cellValue === 'number') {
        cellValue = cellValue.toString();
      }

      const conditionOptions = {
        fieldType: fieldType,
        searchTerm: searchTerm,
        cellValue: cellValue,
        operator: operator,
        cellValueLastChar: lastValueChar,
        filterSearchType: filterSearchType
      };
      if (conditionalFilterFn && typeof conditionalFilterFn === 'function') {
        conditionalFilterFn(conditionOptions);
      }
      if (!FilterConditions.executeMappedCondition(conditionOptions)) {
        return false;
      }
    }
    return true;
  }

  destroy() {
    this.subscriber.unsubscribe();
  }

  callbackSearchEvent(e: any, args: any) {
    this._columnFilters[args.columnDef.id] = {
      columnId: args.columnDef.id,
      columnDef: args.columnDef,
      searchTerm: e.target.value
    };

    this.triggerEvent(this.subscriber, {
      columnId: args.columnDef.id,
      columnDef: args.columnDef,
      columnFilters: this._columnFilters,
      searchTerm: e.target.value,
      serviceOptions: this._onFilterChangedOptions,
      grid: this._grid
    }, e);
  }

  addFilterTemplateToHeaderRow() {
    for (let i = 0; i < this._columnDefinitions.length; i++) {
      if (this._columnDefinitions[i].id !== 'selector' && this._columnDefinitions[i].filterable) {
        let filterTemplate = '';
        let elm = null;
        let header;
        const columnDef = this._columnDefinitions[i];
        const columnId = columnDef.id;
        const listTerm = (columnDef.filter && columnDef.filter.listTerm) ? columnDef.filter.listTerm : null;
        let searchTerm = (columnDef.filter && columnDef.filter.searchTerm) ? columnDef.filter.searchTerm : '';

        // keep the filter in a columnFilters for later reference
        this.keepColumnFilters(searchTerm, listTerm, columnDef);

        if (!columnDef.filter) {
          searchTerm = (columnDef.filter && columnDef.filter.searchTerm) ? columnDef.filter.searchTerm : null;
          filterTemplate = FilterTemplates.input(searchTerm, columnDef);
        } else {
          // custom Select template
          if (columnDef.filter.type === FormElementType.select) {
            filterTemplate = FilterTemplates.select(searchTerm, columnDef);
          }
        }

        // create the DOM Element
        header = this._grid.getHeaderRowColumn(columnDef.id);
        $(header).empty();
        elm = $(filterTemplate);
        elm.val(searchTerm);
        elm.data('columnId', columnDef.id);
        if (elm && typeof elm.appendTo === 'function') {
          elm.appendTo(header);
        }

        // depending on the DOM Element type, we will watch the correct event
        const filterType = (columnDef.filter && columnDef.filter.type) ? columnDef.filter.type : FormElementType.input;
        switch (filterType) {
          case FormElementType.select:
          case FormElementType.multiSelect:
            elm.change((e: any) => this.callbackSearchEvent(e, { columnDef: columnDef }));
            break;
          case FormElementType.input:
          default:
            elm.keyup((e: any) => this.callbackSearchEvent(e, { columnDef: columnDef }));
            break;
        }
      }
    }
  }

  private keepColumnFilters(searchTerm: string, listTerm: any, columnDef: any) {
    if (searchTerm) {
      this._columnFilters[columnDef.id] = {
        columnId: columnDef.id,
        columnDef: columnDef,
        searchTerm: searchTerm
      };
      if (listTerm) {
        this._columnFilters.listTerm = listTerm;
      }
    }
  }

  private triggerEvent(evt: any, args: any, e: any) {
    e = e || new Slick.EventData();
    return evt.notify(args, e, args.grid);
  }
}
