import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { BackendServiceApi, Column, FilterArguments, FieldType, GridOption, OperatorType, } from '../../models';
import { Filters } from '..';
import { CompoundInputFilter } from '../compoundInputFilter';

const containerId = 'demo-container';

// define a <div> container to simulate the grid container
const template = `<div id="${containerId}"></div>`;

function removeExtraSpaces(textS: string) {
  return `${textS}`.replace(/\s+/g, ' ');
}

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
  let spyGetHeaderRow: jest.SpyInstance;
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
    translate = TestBed.inject(TranslateService);

    translate.setTranslation('en', {
      CONTAINS: 'Contains',
      EQUALS: 'Equals',
      ENDS_WITH: 'Ends With',
      STARTS_WITH: 'Starts With',
      EQUAL_TO: 'Equal to',
      LESS_THAN: 'Less than',
      LESS_THAN_OR_EQUAL_TO: 'Less than or equal to',
      GREATER_THAN: 'Greater than',
      GREATER_THAN_OR_EQUAL_TO: 'Greater than or equal to',
      NOT_CONTAINS: 'Not contains',
      NOT_EQUAL_TO: 'Not equal to',
    });
    translate.setTranslation('fr', {
      CONTAINS: 'Contient',
      EQUALS: 'Égale',
      ENDS_WITH: 'Se termine par',
      STARTS_WITH: 'Commence par',
      EQUAL_TO: 'Égal à',
      LESS_THAN: 'Plus petit que',
      LESS_THAN_OR_EQUAL_TO: 'Plus petit ou égal à',
      GREATER_THAN: 'Plus grand que',
      GREATER_THAN_OR_EQUAL_TO: 'Plus grand ou égal à',
      NOT_CONTAINS: 'Ne contient pas',
      NOT_EQUAL_TO: 'Non égal à',
    });
    translate.setDefaultLang('en');
    translate.use('en');

    filter = new CompoundInputFilter(translate);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null as any)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
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
    mockColumn.filter!.placeholder = testValue;

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    expect(filterInputElm.placeholder).toBe(testValue);
  });

  it('should call "setValues" and expect that value to be in the callback when triggered', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['abc']);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['abc'], shouldTriggerQuery: true });
  });

  it('should call "setValues" and expect that value to be in the callback when triggered by ENTER key', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['abc']);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    const event = new (window.window as any).Event('keyup', { bubbles: true, cancelable: true });
    event.key = 'Enter';
    filterInputElm.dispatchEvent(event);
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
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>', searchTerms: ['9'], shouldTriggerQuery: true });
  });

  it('should be able to call "setValues" with a value and an extra operator and expect it to be set as new operator', () => {
    mockColumn.type = FieldType.number;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['9'], OperatorType.greaterThanOrEqual);

    const filterOperatorElm = divContainer.querySelector('.search-filter.filter-duration select') as HTMLInputElement;

    filterOperatorElm.dispatchEvent(new Event('change'));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>=', searchTerms: ['9'], shouldTriggerQuery: true });
    expect(filterOperatorElm.value).toBe('>=');
  });

  it('should trigger an operator change event and expect the callback to be called with the searchTerms and operator defined', () => {
    mockColumn.type = FieldType.number;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['9']);
    const filterOperatorElm = divContainer.querySelector('.search-filter.filter-duration select') as HTMLInputElement;

    filterOperatorElm.value = '<=';
    filterOperatorElm.dispatchEvent(new Event('change'));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '<=', searchTerms: ['9'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableFilterTrimWhiteSpace" is enabled in grid options', () => {
    gridOptionMock.enableFilterTrimWhiteSpace = true;
    mockColumn.type = FieldType.number;
    const filterArgs = { ...filterArguments, operator: '>' } as FilterArguments;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArgs);
    filter.setValues(['   987 ']);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>', searchTerms: ['987'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableTrimWhiteSpace" is enabled in the column filter', () => {
    gridOptionMock.enableFilterTrimWhiteSpace = false;
    mockColumn.filter!.enableTrimWhiteSpace = true;
    mockColumn.type = FieldType.number;
    const filterArgs = { ...filterArguments, operator: '>' } as FilterArguments;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArgs);
    filter.setValues(['   987 ']);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '>', searchTerms: ['987'], shouldTriggerQuery: true });
  });

  it('should trigger the callback method when user types something in the input', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.value = 'a';
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['a'], shouldTriggerQuery: true });
  });

  it('should trigger the callback method with a delay when "filterTypingDebounce" is set in grid options and user types something in the input', (done) => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    gridOptionMock.filterTypingDebounce = 2;

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.value = 'a';
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { key: 'a', keyCode: 97, bubbles: true, cancelable: true }));

    setTimeout(() => {
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['a'], shouldTriggerQuery: true });
      done();
    }, 2);
  });

  it('should trigger the callback method with a delay when BackendService is used with a "filterTypingDebounce" is set in grid options and user types something in the input', (done) => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    gridOptionMock.defaultBackendServiceFilterTypingDebounce = 2;
    gridOptionMock.backendServiceApi = {
      filterTypingDebounce: 2,
      service: {}
    } as unknown as BackendServiceApi;

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    filterInputElm.focus();
    filterInputElm.value = 'a';
    filterInputElm.dispatchEvent(new (window.window as any).Event('keyup', { key: 'a', keyCode: 97, bubbles: true, cancelable: true }));

    setTimeout(() => {
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['a'], shouldTriggerQuery: true });
      done();
    }, 2);
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;

    expect(filterInputElm.value).toBe('xyz');
  });

  it('should expect the input not to have the "filled" css class when the search term provided is an empty string', () => {
    filterArguments.searchTerms = [''];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');

    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
  });

  it('should create the input filter with operator dropdown options related to numbers when column definition type is FieldType.number', () => {
    mockColumn.type = FieldType.number;
    filterArguments.searchTerms = ['9'];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
    const filterOperatorElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

    expect(filterInputElm.value).toBe('9');
    expect(removeExtraSpaces(filterOperatorElm[0][1].textContent!)).toBe('= Equal to');
    expect(removeExtraSpaces(filterOperatorElm[0][2].textContent!)).toBe('< Less than');
    expect(removeExtraSpaces(filterOperatorElm[0][3].textContent!)).toBe('<= Less than or equal to');
    expect(removeExtraSpaces(filterOperatorElm[0][4].textContent!)).toBe('> Greater than');
    expect(removeExtraSpaces(filterOperatorElm[0][5].textContent!)).toBe('>= Greater than or equal to');
    expect(removeExtraSpaces(filterOperatorElm[0][6].textContent!)).toBe('<> Not equal to');
  });

  it('should create the input filter with operator dropdown options related to strings when column definition type is FieldType.string', () => {
    mockColumn.type = FieldType.string;
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
    const filterOperatorElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

    expect(filterInputElm.value).toBe('xyz');
    expect(removeExtraSpaces(filterOperatorElm[0][0].textContent!)).toBe(' Contains');
    expect(removeExtraSpaces(filterOperatorElm[0][1].textContent!)).toBe('<> Not contains');
    expect(removeExtraSpaces(filterOperatorElm[0][2].textContent!)).toBe('= Equals');
    expect(removeExtraSpaces(filterOperatorElm[0][3].textContent!)).toBe('!= Not equal to');
    expect(removeExtraSpaces(filterOperatorElm[0][4].textContent!)).toBe('a* Starts With');
    expect(removeExtraSpaces(filterOperatorElm[0][5].textContent!)).toBe('*z Ends With');
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear();
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');


    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(undefined, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear(false);
    const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('.search-filter.filter-duration.filled');


    expect(filterInputElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(undefined, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should have custom compound operator list showing up in the operator select dropdown options list', () => {
    mockColumn.outputType = null as any;
    filterArguments.searchTerms = ['xyz'];
    mockColumn.filter!.compoundOperatorList = [
      { operator: '', description: '' },
      { operator: '=', description: 'Equal to' },
      { operator: '<', description: 'Less than' },
      { operator: '>', description: 'Greater than' },
    ];

    filter.init(filterArguments);
    const filterOperatorElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

    expect(filterOperatorElm[0][0].title).toBe('');
    expect(removeExtraSpaces(filterOperatorElm[0][1].textContent!)).toBe('= Equal to');
    expect(removeExtraSpaces(filterOperatorElm[0][2].textContent!)).toBe('< Less than');
    expect(removeExtraSpaces(filterOperatorElm[0][3].textContent!)).toBe('> Greater than');
  });

  describe('with French I18N translations', () => {
    beforeEach(() => {
      gridOptionMock.enableTranslate = true;
      translate.use('fr');
    });

    it('should have French text translated with operator dropdown options related to numbers when column definition type is FieldType.number', () => {
      mockColumn.type = FieldType.number;
      filterArguments.searchTerms = ['9'];

      filter.init(filterArguments);
      const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
      const filterOperatorElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

      expect(filterInputElm.value).toBe('9');
      expect(removeExtraSpaces(filterOperatorElm[0][1].textContent!)).toBe('= Égal à');
      expect(removeExtraSpaces(filterOperatorElm[0][2].textContent!)).toBe('< Plus petit que');
      expect(removeExtraSpaces(filterOperatorElm[0][3].textContent!)).toBe('<= Plus petit ou égal à');
      expect(removeExtraSpaces(filterOperatorElm[0][4].textContent!)).toBe('> Plus grand que');
      expect(removeExtraSpaces(filterOperatorElm[0][5].textContent!)).toBe('>= Plus grand ou égal à');
      expect(removeExtraSpaces(filterOperatorElm[0][6].textContent!)).toBe('<> Non égal à');
    });

    it('should have French text translated with operator dropdown options related to strings when column definition type is FieldType.string', () => {
      mockColumn.type = FieldType.string;
      filterArguments.searchTerms = ['xyz'];

      filter.init(filterArguments);
      const filterInputElm = divContainer.querySelector('.search-filter.filter-duration input') as HTMLInputElement;
      const filterOperatorElm = divContainer.querySelectorAll<HTMLSelectElement>('.search-filter.filter-duration select');

      expect(filterInputElm.value).toBe('xyz');
      expect(removeExtraSpaces(filterOperatorElm[0][0].textContent!)).toBe(' Contient');
      expect(removeExtraSpaces(filterOperatorElm[0][1].textContent!)).toBe('<> Ne contient pas');
      expect(removeExtraSpaces(filterOperatorElm[0][2].textContent!)).toBe('= Égale');
      expect(removeExtraSpaces(filterOperatorElm[0][3].textContent!)).toBe('!= Non égal à');
      expect(removeExtraSpaces(filterOperatorElm[0][4].textContent!)).toBe('a* Commence par');
      expect(removeExtraSpaces(filterOperatorElm[0][5].textContent!)).toBe('*z Se termine par');
    });
  });
});
