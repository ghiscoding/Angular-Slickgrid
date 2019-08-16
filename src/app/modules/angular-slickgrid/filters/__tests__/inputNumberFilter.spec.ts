import { InputNumberFilter } from '../inputNumberFilter';
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

describe('InputNumberFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: InputNumberFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = { id: 'number', field: 'number', filterable: true, filter: { model: Filters.inputNumber } };
    filterArguments = {
      grid: gridStub,
      columnDef: mockColumn,
      callback: jest.fn()
    };

    filter = new InputNumberFilter();
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should initialize the filter and expect an input of type number', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.filter-number').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
    expect(filter.inputType).toBe('number');
  });
});
