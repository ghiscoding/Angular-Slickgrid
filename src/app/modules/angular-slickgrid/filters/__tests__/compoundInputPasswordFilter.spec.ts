import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Column, FilterArguments, GridOption } from '../../models';
import { Filters } from '..';
import { CompoundInputPasswordFilter } from '../compoundInputPasswordFilter';

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

describe('CompoundInputPasswordFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: CompoundInputPasswordFilter;
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

    filter = new CompoundInputPasswordFilter(translate);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should initialize the filter and expect an input of type password', () => {
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('.search-filter.filter-duration').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
    expect(filter.inputType).toBe('password');
  });
});
