
import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Column, FilterArguments, GridOption, FieldType } from '../../models';
import { Filters } from '..';
import { DateRangeFilter } from '../dateRangeFilter';

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

describe('DateRangeFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: DateRangeFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;
  let translate: TranslateService;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = { id: 'finish', field: 'finish', filterable: true, filter: { model: Filters.dateRange, operator: 'RangeInclusive' } };
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

    filter = new DateRangeFilter(translate);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should initialize the filter', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.flatpickr.search-filter.filter-finish').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should have a placeholder when defined in its column definition', () => {
    const testValue = 'test placeholder';
    mockColumn.filter.placeholder = testValue;

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector<HTMLInputElement>('.flatpickr.search-filter.filter-finish input');

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
      altFormat: 'Z',
      altInput: true,
      closeOnSelect: true,
      dateFormat: 'Y-m-d',
      defaultDate: [],
      enableTime: true,
      locale: 'en',
      mode: 'range',
      onChange: expect.anything(),
      wrap: true,
    });
  });

  it('should be able to call "setValues" and have them set in the picker', () => {
    const mockDates = ['2001-01-02T16:02:02.239Z', '2001-01-31T16:02:02.239Z'];
    filter.init(filterArguments);
    filter.setValues(mockDates);
    expect(filter.currentDates).toEqual(mockDates);
  });

  it('should be able to call "setValues" with 2 dots (..) notation and have them set in the picker', () => {
    const mockDate = '2001-01-02T16:02:02.239Z..2001-01-31T16:02:02.239Z';
    filter.init(filterArguments);
    filter.setValues([mockDate]);
    expect(filter.currentDates).toEqual(mockDate.split('..'));
  });

  it('should trigger input change event and expect the callback to be called with the date provided in the input', () => {
    mockColumn.filter.filterOptions = { allowInput: true }; // change to allow input value only for testing purposes
    mockColumn.filter.operator = 'RangeInclusive';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');
    filterInputElm.value = '2001-01-02T16:02:02.239Z to 2001-01-31T16:02:02.239Z';
    filterInputElm.dispatchEvent(new CustomEvent('change'));
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeInclusive', searchTerms: ['2001-01-02', '2001-01-31'], shouldTriggerQuery: true });
  });

  it('should pass a different operator then trigger an input change event and expect the callback to be called with the date provided in the input', () => {
    mockColumn.filter.filterOptions = { allowInput: true, enableTime: false }; // change to allow input value only for testing purposes
    mockColumn.filter.operator = 'RangeExclusive';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');
    filterInputElm.value = '2001-01-02T16:02:02.239Z to 2001-01-31T16:02:02.239Z';
    filterInputElm.dispatchEvent(new CustomEvent('change'));
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeExclusive', searchTerms: ['2001-01-02', '2001-01-31'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z'];
    mockColumn.filter.operator = 'RangeInclusive';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filterInputElm.value).toBe('2000-01-01T05:00:00.000Z to 2000-01-31T05:00:00.000Z');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeInclusive', searchTerms: ['2000-01-01', '2000-01-31'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument with 2 dots (..) notation', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z..2000-01-31T05:00:00.000Z'];
    mockColumn.filter.operator = 'RangeInclusive';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filterInputElm.value).toBe('2000-01-01T05:00:00.000Z to 2000-01-31T05:00:00.000Z');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeInclusive', searchTerms: ['2000-01-01', '2000-01-31'], shouldTriggerQuery: true });
  });

  it('should work with different locale when locale is changed', () => {
    translate.use('fr-CA'); // will be trimmed to "fr"
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z'];
    mockColumn.filter.operator = 'RangeInclusive';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');
    const calendarElm = document.body.querySelector<HTMLDivElement>('.flatpickr-calendar');
    const selectonOptionElms = calendarElm.querySelectorAll<HTMLSelectElement>(' .flatpickr-monthDropdown-months option');

    filter.show();

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filterInputElm.value).toBe('2000-01-01T05:00:00.000Z au 2000-01-31T05:00:00.000Z');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeInclusive', searchTerms: ['2000-01-01', '2000-01-31'], shouldTriggerQuery: true });
    expect(calendarElm).toBeTruthy();
    expect(selectonOptionElms.length).toBe(12);
    expect(selectonOptionElms[0].textContent).toBe('janvier');
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z'];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear();
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z'];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear(false);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should have a value with date & time in the picker when "enableTime" option is set and we trigger a change', () => {
    mockColumn.filter.filterOptions = { enableTime: true, allowInput: true }; // change to allow input value only for testing purposes
    mockColumn.outputType = FieldType.dateTimeIsoAmPm;
    mockColumn.filter.operator = '>';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');
    filterInputElm.value = '2000-01-01T05:00:00.000+05:00 to 2000-01-31T05:00:00.000+05:00';
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 13, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    // expect(filter.currentDates.map((date) => date.toISOString())).toEqual(['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z']);
    expect(filterInputElm.value).toBe('2000-01-01 5:00:00 AM to 2000-01-31 5:00:00 AM');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), {
      columnDef: mockColumn, operator: '>', searchTerms: ['2000-01-01 05:00:00 am', '2000-01-31 05:00:00 am'], shouldTriggerQuery: true
    });
  });

  it('should have a value with date & time in the picker when using no "outputType" which will default to UTC date', () => {
    mockColumn.outputType = null;
    filterArguments.searchTerms = ['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z'];
    mockColumn.filter.operator = '<=';
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('input.flatpickr.search-filter.filter-finish');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.flatpickr.search-filter.filter-finish.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(filter.currentDates).toEqual(['2000-01-01T05:00:00.000Z', '2000-01-31T05:00:00.000Z']);
    expect(filterInputElm.value).toBe('2000-01-01T05:00:00.000Z to 2000-01-31T05:00:00.000Z');
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['2000-01-01', '2000-01-31'], shouldTriggerQuery: true });
  });
});
