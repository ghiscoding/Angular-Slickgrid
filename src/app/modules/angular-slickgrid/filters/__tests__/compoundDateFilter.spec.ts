
import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Column, FilterArguments, GridOption, FieldType, OperatorType } from '../../models';
import { Filters } from '..';
import { CompoundDateFilter } from '../compoundDateFilter';

const containerId = 'demo-container';

// define a <div> container to simulate the grid container
const template = `<div id="${containerId}"></div>`;

const gridOptionMock = {
  enableFiltering: true,
  enableFilterTrimWhiteSpace: true,
} as GridOption;

const gridStub = {
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getHeaderRowColumn: jest.fn(),
  render: jest.fn(),
};

describe('CompoundDateFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: CompoundDateFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;
  let translate: TranslateService;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = { id: 'finish', field: 'finish', filterable: true, outputType: FieldType.dateIso, filter: { model: Filters.compoundDate, operator: '>' } };
    filterArguments = {
      grid: gridStub,
      columnDef: mockColumn,
      callback: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [],
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);

    translate.setTranslation('en', {
      CONTAINS: 'Contains',
      EQUALS: 'Equals',
      ENDS_WITH: 'Ends With',
      STARTS_WITH: 'Starts With',
    });
    translate.setTranslation('fr', {
      CONTAINS: 'Contient',
      EQUALS: 'Égale',
      ENDS_WITH: 'Se termine par',
      STARTS_WITH: 'Commence par',
    });
    translate.setDefaultLang('en');

    filter = new CompoundDateFilter(translate);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should initialize the filter', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('.form-group.search-filter.filter-finish').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should have a placeholder when defined in its column definition', () => {
    const testValue = 'test placeholder';
    mockColumn.filter.placeholder = testValue;

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');

    expect(filterElm.placeholder).toBe(testValue);
  });

  it('should hide the DOM element when the "hide" method is called', () => {
    filter.init(filterArguments);
    const spy = jest.spyOn(filter.flatInstance, 'close');
    const calendarElm = document.body.querySelector<HTMLDivElement>('.flatpickr-calendar');
    filter.hide();

    expect(calendarElm).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should show the DOM element when the "show" method is called', () => {
    filter.init(filterArguments);
    const spy = jest.spyOn(filter.flatInstance, 'open');
    const calendarElm = document.body.querySelector<HTMLDivElement>('.flatpickr-calendar');
    filter.show();

    expect(calendarElm).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to retrieve default flatpickr options through the Getter', () => {
    filter.init(filterArguments);

    expect(filter.flatInstance).toBeTruthy();
    expect(filter.flatpickrOptions).toEqual({
      altFormat: 'Y-m-d',
      altInput: true,
      closeOnSelect: true,
      dateFormat: 'Y-m-d',
      defaultDate: '',
      locale: 'en',
      onChange: expect.anything(),
      wrap: true,
    });
  });

  it('should be able to call "setValues" and have that value set in the picker', () => {
    const mockDate = '2001-01-02T16:02:02.239Z';
    filter.init(filterArguments);
    filter.setValues(mockDate);
    expect(filter.currentDate).toEqual(mockDate);
  });

  it('should be able to call "setValues" as an array and have that value set in the picker', () => {
    const mockDate = '2001-01-02T16:02:02.239Z';
    filter.init(filterArguments);
    filter.setValues([mockDate]);
    expect(filter.currentDate).toEqual(mockDate);
  });

  it('should be able to call "setValues" with a value and an extra operator and expect it to be set as new operator', () => {
    const mockDate = '2001-01-02T16:02:02.239Z';
    filter.init(filterArguments);
    filter.setValues([mockDate], OperatorType.greaterThanOrEqual);

    const filterOperatorElm = divContainer.querySelector<HTMLInputElement>('.input-group-prepend.operator select');

    expect(filter.currentDate).toEqual(mockDate);
    expect(filterOperatorElm.value).toBe('>=');
  });

  it('should trigger input change event and expect the callback to be called with the date provided in the input', () => {
    mockColumn.filter.filterOptions = { allowInput: true }; // change to allow input value only for testing purposes
    mockColumn.filter.operator = '>';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');
    filterInputElm.value = '2001-01-02T16:02:02.239Z';
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(undefined, {
      columnDef: mockColumn, operator: '>', searchTerms: ['2001-01-02'], shouldTriggerQuery: true
    });
  });

  it('should pass a different operator then trigger an input change event and expect the callback to be called with the date provided in the input', () => {
    mockColumn.filter.filterOptions = { allowInput: true }; // change to allow input value only for testing purposes
    mockColumn.filter.operator = '>';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');
    filterInputElm.value = '2001-01-02T16:02:02.239Z';
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(undefined, { columnDef: mockColumn, operator: '>', searchTerms: ['2001-01-02'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z'];
    mockColumn.filter.operator = '<=';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filter.currentDate).toBe('2000-01-01T05:00:00.000Z');
    expect(filterInputElm.value).toBe('2000-01-01');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['2000-01-01T05:00:00.000Z'], shouldTriggerQuery: true });
  });

  it('should trigger an operator change event and expect the callback to be called with the searchTerms and operator defined', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z'];
    mockColumn.filter.operator = '>';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish select');

    filterSelectElm.value = '<=';
    filterSelectElm.dispatchEvent(new Event('change'));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['2000-01-01T05:00:00.000Z'], shouldTriggerQuery: true });
  });

  it('should work with different locale when locale is changed', () => {
    translate.use('fr-CA'); // will be trimmed to "fr"
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z'];
    mockColumn.filter.operator = '<=';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');
    const calendarElm = document.body.querySelector<HTMLDivElement>('.flatpickr-calendar');
    const selectonOptionElms = calendarElm.querySelectorAll<HTMLSelectElement>(' .flatpickr-monthDropdown-months option');

    filter.show();

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filter.currentDate).toBe('2000-01-01T05:00:00.000Z');
    expect(filterInputElm.value).toBe('2000-01-01');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['2000-01-01T05:00:00.000Z'], shouldTriggerQuery: true });
    expect(calendarElm).toBeTruthy();
    expect(selectonOptionElms.length).toBe(12);
    expect(selectonOptionElms[0].textContent).toBe('janvier');
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z'];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear();
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(undefined, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z'];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear(false);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(undefined, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should have a value with date & time in the picker when "enableTime" option is set and we trigger a change', () => {
    mockColumn.filter.filterOptions = { enableTime: true, allowInput: true }; // change to allow input value only for testing purposes
    mockColumn.outputType = FieldType.dateTimeIsoAmPm;
    mockColumn.filter.operator = '>';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');
    filterInputElm.value = '2001-01-02T16:02:02.000+05:00';
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    // expect(filter.currentDate.toISOString()).toBe('2001-01-02T21:02:02.000Z');
    expect(filterInputElm.value).toBe('2001-01-02 4:02:02 PM');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), {
      columnDef: mockColumn, operator: '>', searchTerms: ['2001-01-02'], shouldTriggerQuery: true
    });
  });

  it('should have a value with date & time in the picker when using no "outputType" which will default to UTC date', () => {
    mockColumn.outputType = null;
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z'];
    mockColumn.filter.operator = '<=';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-finish .flatpickr input.flatpickr');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.form-group.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filter.currentDate).toBe('2000-01-01T05:00:00.000Z');
    expect(filterInputElm.value).toBe('2000-01-01T05:00:00.000Z');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['2000-01-01T05:00:00.000Z'], shouldTriggerQuery: true });
  });
});
