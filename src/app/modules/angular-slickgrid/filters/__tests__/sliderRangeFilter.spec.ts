import { JQueryUiSliderOption } from './../../models/jQueryUiSliderOption.interface';
import { GridOption, FilterArguments, Column } from '../../models';
import { Filters } from '..';
import { SliderRangeFilter } from '../sliderRangeFilter';

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

describe('SliderRangeFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: SliderRangeFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = { id: 'duration', field: 'duration', filterable: true, filter: { model: Filters.sliderRange } };
    filterArguments = {
      grid: gridStub,
      columnDef: mockColumn,
      callback: jest.fn()
    };

    filter = new SliderRangeFilter();
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should throw an error when trying to override the slider "change" method', (done) => {
    try {
      mockColumn.filter.filterOptions = { change: () => { } } as JQueryUiSliderOption;
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`[Angular-Slickgrid] You cannot override the "change" and/or the "slide" callback methods`);
      done();
    }
  });

  it('should throw an error when trying to override the slider "slide" method', (done) => {
    try {
      mockColumn.filter.filterOptions = { slide: () => { } } as JQueryUiSliderOption;
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`[Angular-Slickgrid] You cannot override the "change" and/or the "slide" callback methods`);
      done();
    }
  });

  it('should initialize the filter', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('.search-filter.slider-range-container.filter-duration').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should be able to retrieve default slider options through the Getter', () => {
    filter.init(filterArguments);

    expect(filter.sliderOptions).toEqual({
      change: expect.anything(),
      max: 100,
      min: 0,
      range: true,
      slide: expect.anything(),
      step: 1,
      values: [0, 100],
    });
  });

  it('should be able to retrieve slider options defined through the Getter when passing different filterOptions', () => {
    mockColumn.filter = {
      minValue: 4,
      maxValue: 69,
      valueStep: 5,
    };
    filter.init(filterArguments);

    expect(filter.sliderOptions).toEqual({
      change: expect.anything(),
      max: 69,
      min: 4,
      range: true,
      slide: expect.anything(),
      step: 5,
      values: [4, 69],
    });
  });

  it('should call "setValues" and expect that value to be in the callback when triggered', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues(['2..80']);

    expect(spyCallback).toHaveBeenLastCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeExclusive', searchTerms: [2, 80], shouldTriggerQuery: true });
  });

  it('should call "setValues" and expect that value to be in the callback when triggered', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues([3, 84]);

    expect(spyCallback).toHaveBeenLastCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'RangeExclusive', searchTerms: [3, 84], shouldTriggerQuery: true });
  });

  it('should create the input filter with default search terms range when passed as a filter argument', () => {
    filterArguments.searchTerms = [3, 80];

    filter.init(filterArguments);

    const filterLowestElm = divContainer.querySelector<HTMLInputElement>('.lowest-range-duration');
    const filterHighestElm = divContainer.querySelector<HTMLInputElement>('.highest-range-duration');

    expect(filterLowestElm.textContent).toBe('3');
    expect(filterHighestElm.textContent).toBe('80');
    expect(filter.currentValues).toEqual([3, 80]);
  });

  it('should create the input filter with min/max slider values being set by filter "minValue" and "maxValue"', () => {
    mockColumn.filter = {
      minValue: 4,
      maxValue: 69,
    };

    filter.init(filterArguments);

    const filterLowestElm = divContainer.querySelector<HTMLInputElement>('.lowest-range-duration');
    const filterHighestElm = divContainer.querySelector<HTMLInputElement>('.highest-range-duration');

    expect(filterLowestElm.textContent).toBe('4');
    expect(filterHighestElm.textContent).toBe('69');
    expect(filter.currentValues).toEqual([4, 69]);
  });

  it('should create the input filter with min/max slider values being set by filter "sliderStartValue" and "sliderEndValue" through the filter params', () => {
    mockColumn.filter = {
      params: {
        sliderStartValue: 4,
        sliderEndValue: 69,
      }
    };

    filter.init(filterArguments);

    const filterLowestElm = divContainer.querySelector<HTMLInputElement>('.lowest-range-duration');
    const filterHighestElm = divContainer.querySelector<HTMLInputElement>('.highest-range-duration');

    expect(filterLowestElm.textContent).toBe('4');
    expect(filterHighestElm.textContent).toBe('69');
    expect(filter.currentValues).toEqual([4, 69]);
  });

  it('should create the input filter with default search terms range but without showing side numbers when "hideSliderNumbers" is set in params', () => {
    filterArguments.searchTerms = [3, 80];
    mockColumn.filter.params = { hideSliderNumbers: true };

    filter.init(filterArguments);

    const filterLowestElms = divContainer.querySelectorAll<HTMLInputElement>('.lowest-range-duration');
    const filterHighestElms = divContainer.querySelectorAll<HTMLInputElement>('.highest-range-duration');

    expect(filterLowestElms.length).toBe(0);
    expect(filterHighestElms.length).toBe(0);
    expect(filter.currentValues).toEqual([3, 80]);
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    filterArguments.searchTerms = [3, 80];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear();

    expect(filter.currentValues).toEqual([0, 100]);
    expect(spyCallback).toHaveBeenLastCalledWith(null, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    filterArguments.searchTerms = [3, 80];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear(false);

    expect(filter.currentValues).toEqual([0, 100]);
    expect(spyCallback).toHaveBeenLastCalledWith(null, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method and expect min/max slider values being with values of "sliderStartValue" and "sliderEndValue" when defined through the filter params', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter = {
      params: {
        sliderStartValue: 4,
        sliderEndValue: 69,
      }
    };

    filter.init(filterArguments);
    filter.clear(false);

    expect(filter.currentValues).toEqual([4, 69]);
    expect(spyCallback).toHaveBeenLastCalledWith(null, { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });
});
