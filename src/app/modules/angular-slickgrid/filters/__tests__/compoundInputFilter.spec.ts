import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Column, FilterArguments, FieldType, GridOption, OperatorType } from '../../models';
import { Filters } from '..';
import { CompoundInputFilter } from '../compoundInputFilter';

const containerId = 'demo-container';

// define a <div> container to simulate the grid container
const template = `<div id="${containerId}"></div>`;

const gridOptionMock = {
  enableFiltering: true,
} as GridOption;

const gridStub = {
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getHeaderRowColumn: jest.fn(),
  render: jest.fn(),
};

describe('CompoundInputFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: CompoundInputFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;
  let translate: TranslateService;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = { id: 'duration', field: 'duration', filterable: true, filter: { model: Filters.input, operator: 'EQ' } };
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

    filter = new CompoundInputFilter(translate);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should initialize the filter', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('.search-filter.filter-duration').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
    expect(filter.inputType).toBe('text');
  });

  it('should have a placeholder when defined in its column definition', () => {
    const testValue = 'test placeholder';
    mockColumn.filter.placeholder = testValue;

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    expect(filterInputElm.placeholder).toBe(testValue);
  });

  it('should call "setValues" and expect that value to be in the callback when triggered', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['abc']);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['abc'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with "operator" set in the filter arguments and expect that value to be in the callback when triggered', () => {
    mockColumn.type = FieldType.number;
    const filterArgs = { ...filterArguments, operator: '>' } as FilterArguments;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArgs);
    filter.setValues(['9']);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>', searchTerms: ['9'], shouldTriggerQuery: true });
  });

  it('should be able to call "setValues" with a value and an extra operator and expect it to be set as new operator', () => {
    mockColumn.type = FieldType.number;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['9'], OperatorType.greaterThanOrEqual);

    const filterSelectElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration select');

    filterSelectElm.dispatchEvent(new Event('change'));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>=', searchTerms: ['9'], shouldTriggerQuery: true });
    expect(filterSelectElm.value).toBe('>=');
  });

  it('should trigger an operator change event and expect the callback to be called with the searchTerms and operator defined', () => {
    mockColumn.type = FieldType.number;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['9']);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration select');

    filterSelectElm.value = '<=';
    filterSelectElm.dispatchEvent(new Event('change'));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['9'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableFilterTrimWhiteSpace" is enabled in grid options', () => {
    gridOptionMock.enableFilterTrimWhiteSpace = true;
    mockColumn.type = FieldType.number;
    const filterArgs = { ...filterArguments, operator: '>' } as FilterArguments;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArgs);
    filter.setValues(['   987 ']);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>', searchTerms: ['987'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableTrimWhiteSpace" is enabled in the column filter', () => {
    gridOptionMock.enableFilterTrimWhiteSpace = false;
    mockColumn.filter.enableTrimWhiteSpace = true;
    mockColumn.type = FieldType.number;
    const filterArgs = { ...filterArguments, operator: '>' } as FilterArguments;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArgs);
    filter.setValues(['   987 ']);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>', searchTerms: ['987'], shouldTriggerQuery: true });
  });

  it('should trigger the callback method when user types something in the input', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    filterInputElm.focus();
    filterInputElm.value = 'a';
    filterInputElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['a'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');

    expect(filterInputElm.value).toBe('xyz');
  });

  it('should expect the input not to have the "filled" css class when the search term provided is an empty string', () => {
    filterArguments.searchTerms = [''];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');

    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
  });

  it('should create the input filter with operator dropdown options related to numbers when column definition type is FieldType.number', () => {
    mockColumn.type = FieldType.number;
    filterArguments.searchTerms = ['9'];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');
    const filterSelectElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

    expect(filterInputElm.value).toBe('9');
    expect(filterSelectElm[0][1].title).toBe('=');
    expect(filterSelectElm[0][1].textContent).toBe('=');
    expect(filterSelectElm[0][2].textContent).toBe('<');
    expect(filterSelectElm[0][3].textContent).toBe('<=');
    expect(filterSelectElm[0][4].textContent).toBe('>');
    expect(filterSelectElm[0][5].textContent).toBe('>=');
    expect(filterSelectElm[0][6].textContent).toBe('<>');
  });

  it('should create the input filter with operator dropdown options related to strings when column definition type is FieldType.string', () => {
    mockColumn.type = FieldType.string;
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');
    const filterSelectElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

    expect(filterInputElm.value).toBe('xyz');
    expect(filterSelectElm[0][0].title).toBe('Contains');
    expect(filterSelectElm[0][1].title).toBe('Equals');
    expect(filterSelectElm[0][2].title).toBe('Starts With');
    expect(filterSelectElm[0][3].title).toBe('Ends With');
    expect(filterSelectElm[0][1].textContent).toBe('=');
    expect(filterSelectElm[0][2].textContent).toBe('a*');
    expect(filterSelectElm[0][3].textContent).toBe('*z');
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear();
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');


    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(null, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear(false);
    const filterInputElm = divContainer.querySelector<HTMLInputElement>('.search-filter.filter-duration input');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');


    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(null, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });
});
