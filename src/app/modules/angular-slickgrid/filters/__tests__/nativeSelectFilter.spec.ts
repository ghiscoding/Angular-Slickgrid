import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Column, FilterArguments, GridOption, FieldType, OperatorType } from '../../models';
import { CollectionService } from './../../services/collection.service';
import { Filters } from '..';
import { NativeSelectFilter } from '../nativeSelectFilter';
import { of, Subject } from 'rxjs';

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

describe('NativeSelectFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: NativeSelectFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;
  let collectionService: CollectionService;
  let translate: TranslateService;

  beforeEach(() => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = {
      id: 'gender', field: 'gender', filterable: true,
      filter: {
        model: Filters.select,
      }
    };
    filterArguments = {
      grid: gridStub,
      columnDef: mockColumn,
      callback: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [CollectionService],
      imports: [TranslateModule.forRoot()]
    });
    collectionService = TestBed.get(CollectionService);
    translate = TestBed.get(TranslateService);

    translate.setTranslation('en', {
      ALL_SELECTED: 'All Selected',
      FEMALE: 'Female',
      MALE: 'Male',
      OK: 'OK',
      OTHER: 'Other',
      SELECT_ALL: 'Select All',
      X_OF_Y_SELECTED: '# of % selected',
    });
    translate.setTranslation('fr', {
      ALL_SELECTED: 'Tout sélectionnés',
      FEMALE: 'Femme',
      MALE: 'Mâle',
      OK: 'Terminé',
      OTHER: 'Autre',
      SELECT_ALL: 'Sélectionner tout',
      X_OF_Y_SELECTED: '# de % sélectionnés',
    });
    translate.setDefaultLang('en');

    filter = new NativeSelectFilter(translate);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should throw an error when there is no collection provided in the filter property', (done) => {
    try {
      mockColumn.filter.collection = undefined;
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`[Angular-SlickGrid] You need to pass a "collection" for the Native Select Filter to work correctly.`);
      done();
    }
  });

  it('should throw an error when collection is not a valid array', (done) => {
    try {
      // @ts-ignore
      mockColumn.filter.collection = { hello: 'world' };
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`The "collection" passed to the Native Select Filter is not a valid array.`);
      done();
    }
  });

  it('should throw an error when collection is not a valid value/label pair array', (done) => {
    try {
      mockColumn.filter.collection = [{ hello: 'world' }];
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Native Select Filter list`);
      done();
    }
  });

  it('should throw an error when "enableTranslateLabel" is set without a valid TranslateService', (done) => {
    try {
      translate = undefined;
      mockColumn.filter.enableTranslateLabel = true;
      mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      filter = new NativeSelectFilter(translate);

      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`The ngx-translate TranslateService is required for the Native Select Filter to work correctly when "enableTranslateLabel" is set.`);
      done();
    }
  });

  it('should initialize the filter', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('select.form-control.search-filter.filter-gender').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should trigger select change event and expect the callback to be called with the search terms we select from dropdown list', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.value = 'female';
    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
  });

  it('should trigger select change event and expect this to work with a regular array of strings', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    mockColumn.filter.collection = ['male', 'female'];
    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.value = 'female';
    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
  });

  it('should trigger select change event and expect the callback to be called with numbers converted as string in the option values', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter.collection = [{ value: 1, label: 'male' }, { value: 2, label: 'female' }];

    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.value = '2';
    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['2'], shouldTriggerQuery: true });
  });

  it('should trigger select change event and expect the callback to be called with booleans converted as string in the option values', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter.collection = [{ value: true, label: 'True' }, { value: false, label: 'False' }];

    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.value = 'false';
    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['false'], shouldTriggerQuery: true });
  });

  it('should pass a different operator then trigger an input change event and expect the callback to be called with the search terms we select from dropdown list', () => {
    mockColumn.filter.operator = 'NE';
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.value = 'female';
    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'NE', searchTerms: ['female'], shouldTriggerQuery: true });
  });

  it('should have same value in "getValues" after being set in "setValues" with a single value', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter.init(filterArguments);
    filter.setValues('female');
    const values = filter.getValues();

    expect(values).toEqual(['female']);
    expect(values.length).toBe(1);
  });

  it('should have same value in "getValues" after being set in "setValues" with an array having a single value', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter.init(filterArguments);
    filter.setValues(['female']);
    const values = filter.getValues();

    expect(values).toEqual(['female']);
    expect(values.length).toBe(1);
  });

  it('should have empty array returned from "getValues" when nothing is set', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter.init(filterArguments);
    const values = filter.getValues();

    expect(values).toEqual([]);
    expect(values.length).toBe(0);
  });

  it('should have empty array returned from "getValues" even when filter is not yet created', () => {
    const values = filter.getValues();

    expect(values).toEqual([]);
    expect(values.length).toBe(0);
  });

  it('should create the select filter with "customStructure" with a default search term when passed as a filter argument', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter = {
      collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
      customStructure: {
        value: 'value',
        label: 'description',
      },
    };

    filterArguments.searchTerms = ['female'];
    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(3);
    expect(filterListElm[0].textContent).toBe('other');
    expect(filterListElm[1].textContent).toBe('male');
    expect(filterListElm[2].textContent).toBe('female');
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
  });

  it('should create the select filter with a default search term when passed as a filter argument', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filterArguments.searchTerms = ['female'];
    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
  });

  it('should create the select filter with empty search term when passed an empty string as a filter argument and not expect "filled" css class either', () => {
    mockColumn.filter.collection = [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filterArguments.searchTerms = [''];
    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(3);
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: [''], shouldTriggerQuery: true });
  });

  it('should create the select filter with a default boolean search term that is converted to strings as option values and pre-selected as option', () => {
    mockColumn.filter.collection = [{ value: true, label: 'True' }, { value: false, label: 'False' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filterArguments.searchTerms = [false];
    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['false'], shouldTriggerQuery: true });
  });

  it('should create the select filter with a default number search term that is converted to strings as option values and pre-selected as option', () => {
    mockColumn.filter.collection = [{ value: 1, label: 'male' }, { value: 2, label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filterArguments.searchTerms = [2];
    filter.init(filterArguments);
    const filterSelectElm = divContainer.querySelector<HTMLInputElement>(`select.search-filter.filter-gender`);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`select.search-filter.filter-gender option`);

    filterSelectElm.dispatchEvent(new CustomEvent('change'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['2'], shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    filterArguments.searchTerms = ['female'];
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.clear();
    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');

    expect(filter.searchTerms.length).toBe(0);
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filterArguments.searchTerms = ['female'];
    filter.init(filterArguments);
    filter.clear(false);
    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('select.search-filter.filter-gender.filled');

    expect(filter.searchTerms.length).toBe(0);
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should work with English locale when locale is changed', (done) => {
    translate.use('en');
    gridOptionMock.enableTranslate = true;
    mockColumn.filter = {
      enableTranslateLabel: true,
      collection: [
        { value: 'other', labelKey: 'OTHER' },
        { value: 'male', labelKey: 'MALE' },
        { value: 'female', labelKey: 'FEMALE' }
      ],
      filterOptions: { minimumCountSelected: 1 }
    };

    filterArguments.searchTerms = ['male', 'female'];
    filter.init(filterArguments);

    setTimeout(() => {
      const filterListElm = divContainer.querySelectorAll<HTMLSpanElement>(`select.search-filter.filter-gender option`);

      expect(filterListElm.length).toBe(3);
      expect(filterListElm[0].textContent).toBe('Other');
      expect(filterListElm[1].textContent).toBe('Male');
      expect(filterListElm[2].textContent).toBe('Female');
      done();
    });
  });

  it('should work with French locale when locale is changed', (done) => {
    translate.use('fr');
    gridOptionMock.enableTranslate = true;
    mockColumn.filter = {
      enableTranslateLabel: true,
      collection: [
        { value: 'other', labelKey: 'OTHER' },
        { value: 'male', labelKey: 'MALE' },
        { value: 'female', labelKey: 'FEMALE' }
      ],
      filterOptions: { minimumCountSelected: 1 }
    };

    filterArguments.searchTerms = ['male', 'female'];
    filter.init(filterArguments);
    setTimeout(() => {
      const filterListElm = divContainer.querySelectorAll<HTMLSpanElement>(`select.search-filter.filter-gender option`);

      expect(filterListElm.length).toBe(3);
      expect(filterListElm[0].textContent).toBe('Autre');
      expect(filterListElm[1].textContent).toBe('Mâle');
      expect(filterListElm[2].textContent).toBe('Femme');
      done();
    });
  });
});
