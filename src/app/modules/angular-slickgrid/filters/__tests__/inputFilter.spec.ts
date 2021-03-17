import { InputFilter } from '../inputFilter';
import { GridOption, FilterArguments, Column } from '../../models';
import { Filters } from '..';

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

describe('InputFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: InputFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow: any;
  let mockColumn: Column;

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

    filter = new InputFilter();
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null as any)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should initialize the filter', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.filter-duration').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
    expect(filter.inputType).toBe('text');
  });

  it('should have a placeholder when defined in its column definition', () => {
    const testValue = 'test placeholder';
    mockColumn.filter!.placeholder = testValue;

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

    expect(filterElm.placeholder).toBe(testValue);
  });

  describe('setValues method', () => {
    it('should call "setValues" and expect that value to be in the callback when triggered', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');

      filter.init(filterArguments);
      filter.setValues('abc');
      const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

      expect(filterFilledElms.length).toBe(1);
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['abc'], shouldTriggerQuery: true });
    });

    it('should call "setValues" and expect that value to be in the callback when triggered by ENTER key', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');

      filter.init(filterArguments);
      filter.setValues('abc');
      const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

      filterElm.focus();
      const event = new (window.window as any).Event('keyup', { bubbles: true, cancelable: true });
      event.key = 'Enter';
      filterElm.dispatchEvent(event);
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

      expect(filterFilledElms.length).toBe(1);
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['abc'], shouldTriggerQuery: true });
    });

    it('should call "setValues" and expect that value NOT to be in the callback when triggered by a keyup event that is NOT the ENTER key', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');

      filter.init(filterArguments);
      filter.setValues('abc');
      const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

      filterElm.focus();
      const event = new (window.window as any).Event('keyup', { bubbles: true, cancelable: true });
      event.key = 'a';
      filterElm.dispatchEvent(event);
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

      expect(filterFilledElms.length).toBe(0);
      expect(spyCallback).not.toHaveBeenCalled();
    });

    it('should call "setValues" an operator and with extra spaces at the beginning of the searchTerms and trim value when "enableFilterTrimWhiteSpace" is enabled in grid options', () => {
      gridOptionMock.enableFilterTrimWhiteSpace = true;
      const spyCallback = jest.spyOn(filterArguments, 'callback');

      filter.init(filterArguments);
      filter.setValues('    abc ', 'EQ');
      const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

      expect(filterFilledElms.length).toBe(1);
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['abc'], shouldTriggerQuery: true });
    });

    it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableTrimWhiteSpace" is enabled in the column filter', () => {
      gridOptionMock.enableFilterTrimWhiteSpace = false;
      mockColumn.filter!.enableTrimWhiteSpace = true;
      const spyCallback = jest.spyOn(filterArguments, 'callback');

      filter.init(filterArguments);
      filter.setValues('    abc ');
      const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

      expect(filterFilledElms.length).toBe(1);
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: '', searchTerms: ['abc'], shouldTriggerQuery: true });
    });

    it('should call "setValues" and include an operator and expect the operator to show up in the output search string shown in the filter input text value', () => {
      filter.init(filterArguments);

      filter.setValues('abc', '<>');
      expect(filter.getValue()).toBe('<>abc');

      filter.setValues('abc', '!=');
      expect(filter.getValue()).toBe('!=abc');

      filter.setValues('abc', '=');
      expect(filter.getValue()).toBe('=abc');

      filter.setValues('abc', '==');
      expect(filter.getValue()).toBe('==abc');

      filter.setValues(123, '<');
      expect(filter.getValue()).toBe('<123');

      filter.setValues(123, '<=');
      expect(filter.getValue()).toBe('<=123');

      filter.setValues(123, '>');
      expect(filter.getValue()).toBe('>123');

      filter.setValues(123, '>=');
      expect(filter.getValue()).toBe('>=123');

      filter.setValues('abc', 'EndsWith');
      expect(filter.getValue()).toBe('*abc');

      filter.setValues('abc', '*z');
      expect(filter.getValue()).toBe('*abc');

      filter.setValues('abc', 'StartsWith');
      expect(filter.getValue()).toBe('abc*');

      filter.setValues('abc', 'a*');
      expect(filter.getValue()).toBe('abc*');
    });
  });

  it('should trigger the callback method when user types something in the input', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

    filterElm.focus();
    filterElm.value = 'a';
    filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));

    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['a'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;

    expect(filterElm.value).toBe('xyz');
  });

  it('should expect the input not to have the "filled" css class when the search term provided is an empty string', () => {
    filterArguments.searchTerms = [''];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear();
    const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');

    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear(false);
    const filterElm = divContainer.querySelector('input.filter-duration') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-duration.filled');


    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });
});
