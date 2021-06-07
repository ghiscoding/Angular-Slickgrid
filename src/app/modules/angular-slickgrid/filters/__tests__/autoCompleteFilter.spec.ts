import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Filters } from '..';
import { AutoCompleteFilter } from '../autoCompleteFilter';
import { AutocompleteOption, Column, FieldType, FilterArguments, GridOption, KeyCode, OperatorType } from '../../models';
import { CollectionService } from './../../services/collection.service';
import { of, Subject } from 'rxjs';
import { ColumnFilter } from '../../../../../../dist/public_api';

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

describe('AutoCompleteFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: AutoCompleteFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow: any;
  let mockColumn: Column;
  let collectionService: CollectionService;
  let translate: TranslateService;

  beforeEach(async () => {
    divContainer = document.createElement('div');
    divContainer.innerHTML = template;
    document.body.appendChild(divContainer);
    spyGetHeaderRow = jest.spyOn(gridStub, 'getHeaderRowColumn').mockReturnValue(divContainer);

    mockColumn = {
      id: 'gender', field: 'gender', filterable: true,
      filter: {
        model: Filters.autoComplete,
      }
    };
    filterArguments = {
      grid: gridStub,
      columnDef: mockColumn,
      callback: jest.fn()
    };

    await TestBed.configureTestingModule({
      providers: [CollectionService],
      imports: [TranslateModule.forRoot()]
    });
    collectionService = TestBed.inject(CollectionService);
    translate = TestBed.inject(TranslateService);

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
    translate.use('en');

    filter = new AutoCompleteFilter(translate, collectionService);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when trying to call init without any arguments', () => {
    expect(() => filter.init(null as any)).toThrowError('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
  });

  it('should throw an error when there is no collection provided in the filter property', (done) => {
    try {
      (mockColumn.filter as ColumnFilter).collection = undefined;
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the AutoComplete Filter to work correctly.`);
      done();
    }
  });

  it('should throw an error when collection is not a valid array', (done) => {
    try {
      // @ts-ignore
      (mockColumn.filter as ColumnFilter).collection = { hello: 'world' };
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`The "collection" passed to the Autocomplete Filter is not a valid array.`);
      done();
    }
  });

  it('should throw an error when "collectionAsync" Observable does not return a valid array', (done) => {
    (mockColumn.filter as ColumnFilter).collectionAsync = of({ hello: 'world' });
    filter.init(filterArguments).catch((e) => {
      expect(e.toString()).toContain(`Something went wrong while trying to pull the collection from the "collectionAsync" call in the AutoComplete Filter, the collection is not a valid array.`);
      done();
    });
  });

  it('should initialize the filter', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.search-filter.filter-gender').length;
    const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');

    expect(filter.instance).toBeTruthy();
    expect(autocompleteUlElms.length).toBe(1);
    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should initialize the filter even when user define his own filter options', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    (mockColumn.filter as ColumnFilter).filterOptions = { minLength: 3 } as AutocompleteOption;
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.search-filter.filter-gender').length;
    const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');

    expect(autocompleteUlElms.length).toBe(1);
    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should have a placeholder when defined in its column definition', () => {
    const testValue = 'test placeholder';
    (mockColumn.filter as ColumnFilter).placeholder = testValue;
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.search-filter.filter-gender') as HTMLInputElement;

    expect(filterElm.placeholder).toBe(testValue);
  });

  it('should call "setValues" and expect that value to be in the callback when triggered', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filter.init(filterArguments);
    filter.setValues('male');
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;

    filterElm.focus();
    filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 109, bubbles: true, cancelable: true }));
    filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 109, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');
    const autocompleteListElms = document.body.querySelectorAll<HTMLLIElement>('ul.ui-autocomplete li');

    expect(filterFilledElms.length).toBe(1);
    // expect(autocompleteListElms.length).toBe(2);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['male'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableFilterTrimWhiteSpace" is enabled in grid options', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    gridOptionMock.enableFilterTrimWhiteSpace = true;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues('    abc ');
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;

    filterElm.focus();
    filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['abc'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableTrimWhiteSpace" is enabled in the column filter', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    gridOptionMock.enableFilterTrimWhiteSpace = false;
    (mockColumn.filter as ColumnFilter).enableTrimWhiteSpace = true;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues('    abc ');
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;

    filterElm.focus();
    filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['abc'], shouldTriggerQuery: true });
  });

  it('should trigger the callback method when user types something in the input', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;

    filterElm.focus();
    filterElm.value = 'a';
    filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
    const autocompleteListElms = document.body.querySelectorAll<HTMLLIElement>('ul.ui-autocomplete li');

    // expect(autocompleteListElms.length).toBe(2);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['a'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;

    expect(filterElm.value).toBe('xyz');
  });

  it('should expect the input not to have the "filled" css class when the search term provided is an empty string', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filterArguments.searchTerms = [''];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear();
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear(false);
    const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');


    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should create the filter with a default search term when using "collectionAsync" as an Observable', (done) => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    (mockColumn.filter as ColumnFilter).collectionAsync = of(['male', 'female']);

    filterArguments.searchTerms = ['female'];
    filter.init(filterArguments);

    setTimeout(() => {
      const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
      const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');
      filter.setValues('male');

      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

      expect(autocompleteUlElms.length).toBe(1);
      expect(filterFilledElms.length).toBe(1);
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['male'], shouldTriggerQuery: true });
      done();
    });
  });

  it('should create the multi-select filter with a "collectionAsync" as an Observable and be able to call next on it', (done) => {
    const mockCollection = ['male', 'female'];
    (mockColumn.filter as ColumnFilter).collectionAsync = of(mockCollection);

    filterArguments.searchTerms = ['female'];
    filter.init(filterArguments);

    setTimeout(() => {
      const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
      filter.setValues('male');

      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).Event('input', { keyCode: 97, bubbles: true, cancelable: true }));

      // after await (or timeout delay) we'll get the Subject Observable
      mockCollection.push('other');
      ((mockColumn.filter as ColumnFilter).collectionAsync as Subject<any[]>).next(mockCollection);

      const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

      expect(autocompleteUlElms.length).toBe(1);
      expect(filterFilledElms.length).toBe(1);
      done();
    });
  });

  it('should create the filter and filter the string collection when "collectionFilterBy" is set', () => {
    mockColumn.filter = {
      collection: ['other', 'male', 'female'],
      collectionFilterBy: {
        operator: OperatorType.equal,
        value: 'other'
      }
    };

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(1);
    expect(filterCollection[0]).toBe('other');
  });

  it('should create the filter and filter the value/label pair collection when "collectionFilterBy" is set', () => {
    mockColumn.filter = {
      collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
      collectionFilterBy: [
        { property: 'value', operator: OperatorType.notEqual, value: 'other' },
        { property: 'value', operator: OperatorType.notEqual, value: 'male' }
      ],
      customStructure: {
        value: 'value',
        label: 'description',
      },
    };

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(1);
    expect(filterCollection[0]).toEqual({ value: 'female', description: 'female' });
  });

  it('should create the filter and filter the value/label pair collection when "collectionFilterBy" is set and "filterResultAfterEachPass" is set to "merge"', () => {
    mockColumn.filter = {
      collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
      collectionFilterBy: [
        { property: 'value', operator: OperatorType.equal, value: 'other' },
        { property: 'value', operator: OperatorType.equal, value: 'male' }
      ],
      collectionOptions: {
        filterResultAfterEachPass: 'merge'
      },
      customStructure: {
        value: 'value',
        label: 'description',
      },
    };

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(2);
    expect(filterCollection[0]).toEqual({ value: 'other', description: 'other' });
    expect(filterCollection[1]).toEqual({ value: 'male', description: 'male' });
  });

  it('should create the filter with a value/label pair collection that is inside an object when "collectionInsideObjectProperty" is defined with a dot notation', () => {
    mockColumn.filter = {
      // @ts-ignore
      collection: { deep: { myCollection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }] } },
      collectionOptions: {
        collectionInsideObjectProperty: 'deep.myCollection'
      },
      customStructure: {
        value: 'value',
        label: 'description',
      },
    };

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(3);
    expect(filterCollection[0]).toEqual({ value: 'other', description: 'other' });
    expect(filterCollection[1]).toEqual({ value: 'male', description: 'male' });
    expect(filterCollection[2]).toEqual({ value: 'female', description: 'female' });
  });

  it('should create the filter with a value/label pair collection that is inside an object when "collectionInsideObjectProperty" is defined with a dot notation', () => {
    mockColumn.filter = {
      // @ts-ignore
      collection: { deep: { myCollection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }] } },
      collectionOptions: { collectionInsideObjectProperty: 'deep.myCollection' },
    };
    mockColumn.type = FieldType.object;
    mockColumn.dataKey = 'value';
    mockColumn.labelKey = 'description';

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(3);
    expect(filterCollection[0]).toEqual({ value: 'other', description: 'other' });
    expect(filterCollection[1]).toEqual({ value: 'male', description: 'male' });
    expect(filterCollection[2]).toEqual({ value: 'female', description: 'female' });
  });

  it('should create the filter with a value/label pair collectionAsync that is inside an object when "collectionInsideObjectProperty" is defined with a dot notation', (done) => {
    mockColumn.filter = {
      collectionAsync: of({ deep: { myCollection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }] } }),
      collectionOptions: {
        collectionInsideObjectProperty: 'deep.myCollection'
      },
      customStructure: {
        value: 'value',
        label: 'description',
      },
    };

    filter.init(filterArguments);

    setTimeout(() => {
      const filterCollection = filter.collection as any[];

      expect(filterCollection.length).toBe(3);
      expect(filterCollection[0]).toEqual({ value: 'other', description: 'other' });
      expect(filterCollection[1]).toEqual({ value: 'male', description: 'male' });
      expect(filterCollection[2]).toEqual({ value: 'female', description: 'female' });
      done();
    });
  });

  it('should create the filter and sort the string collection when "collectionSortBy" is set', () => {
    mockColumn.filter = {
      collection: ['other', 'male', 'female'],
      collectionSortBy: {
        sortDesc: true,
        fieldType: FieldType.string
      }
    };

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(3);
    expect(filterCollection[0]).toEqual('other');
    expect(filterCollection[1]).toEqual('male');
    expect(filterCollection[2]).toEqual('female');
  });

  it('should create the filter and sort the value/label pair collection when "collectionSortBy" is set', () => {
    mockColumn.filter = {
      collection: [{ value: 'other', description: 'other' }, { value: 'male', description: 'male' }, { value: 'female', description: 'female' }],
      collectionSortBy: {
        property: 'value',
        sortDesc: false,
        fieldType: FieldType.string
      },
      customStructure: {
        value: 'value',
        label: 'description',
      },
    };

    filter.init(filterArguments);
    const filterCollection = filter.collection as any[];

    expect(filterCollection.length).toBe(3);
    expect(filterCollection[0]).toEqual({ value: 'female', description: 'female' });
    expect(filterCollection[1]).toEqual({ value: 'male', description: 'male' });
    expect(filterCollection[2]).toEqual({ value: 'other', description: 'other' });
  });

  describe('onSelect method', () => {
    it('should expect "setValue" and "autoCommitEdit" to have been called with a string when item provided is a string', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');
      (mockColumn.filter as ColumnFilter).collection = ['male', 'female'];
      (mockColumn.filter as ColumnFilter).filterOptions = { source: [] } as AutocompleteOption;

      filter.init(filterArguments);
      const spySetValue = jest.spyOn(filter, 'setValues');
      const output = filter.onSelect(null as any, { item: 'female' });

      expect(output).toBe(false);
      expect(spySetValue).toHaveBeenCalledWith('female');
      expect(spyCallback).toHaveBeenCalledWith(null, { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
    });

    it('should expect "setValue" and "autoCommitEdit" to have been called with the string label when item provided is an object', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');
      (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      filter.init(filterArguments);
      const spySetValue = jest.spyOn(filter, 'setValues');
      const output = filter.onSelect(null as any, { item: { value: 'f', label: 'Female' } });

      expect(output).toBe(false);
      expect(spySetValue).toHaveBeenCalledWith('Female');
      expect(spyCallback).toHaveBeenCalledWith(null, { columnDef: mockColumn, operator: 'EQ', searchTerms: ['f'], shouldTriggerQuery: true });
    });

    it('should expect the "onSelect" method to be called when the callback method is triggered when user provide his own filterOptions', () => {
      const spy = jest.spyOn(filter, 'onSelect');
      const event = new CustomEvent('change');

      (mockColumn.filter as ColumnFilter).filterOptions = { source: [], minLength: 3 } as AutocompleteOption;
      filter.init(filterArguments);
      filter.autoCompleteOptions.select!(event, { item: 'fem' });

      expect(spy).toHaveBeenCalledWith(event, { item: 'fem' });
    });

    it('should expect the "onSelect" method to be called when the callback method is triggered', () => {
      const spy = jest.spyOn(filter, 'onSelect');
      const event = new CustomEvent('change');

      (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      filter.init(filterArguments);
      filter.autoCompleteOptions.select!(event, { item: 'fem' });

      expect(spy).toHaveBeenCalledWith(event, { item: 'fem' });
    });

    it('should initialize the filter with filterOptions and expect the "onSelect" method to be called when the callback method is triggered', () => {
      const spy = jest.spyOn(filter, 'onSelect');
      const event = new CustomEvent('change');

      (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      (mockColumn.filter as ColumnFilter).filterOptions = { minLength: 3 } as AutocompleteOption;
      filter.init(filterArguments);
      filter.autoCompleteOptions.select!(event, { item: 'fem' });

      expect(spy).toHaveBeenCalledWith(event, { item: 'fem' });
    });
  });

  describe('openSearchListOnFocus flag', () => {
    it('should open the search list by calling the AutoComplete "search" event with an empty string when there are no search term provided', () => {
      (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      (mockColumn.filter as ColumnFilter).filterOptions = { openSearchListOnFocus: true } as AutocompleteOption;

      const event = new (window.window as any).KeyboardEvent('click', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });

      filter.init(filterArguments);
      const autoCompleteSpy = jest.spyOn(filter.filterDomElement, 'autocomplete');
      const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
      filterElm.focus();
      filterElm.dispatchEvent(event);

      expect(filter.filterDomElement).toBeTruthy();
      expect(autoCompleteSpy).toHaveBeenCalledWith('search', '');
    });

    it('should open the search list by calling the AutoComplete "search" event with the same search term string that was provided', () => {
      (mockColumn.filter as ColumnFilter).collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
      (mockColumn.filter as ColumnFilter).filterOptions = { openSearchListOnFocus: true } as AutocompleteOption;

      const event = new (window.window as any).KeyboardEvent('click', { keyCode: KeyCode.LEFT, bubbles: true, cancelable: true });

      filter.init(filterArguments);
      filter.setValues('female');
      const autoCompleteSpy = jest.spyOn(filter.filterDomElement, 'autocomplete');
      const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
      filterElm.focus();
      filterElm.dispatchEvent(event);

      expect(filter.filterDomElement).toBeTruthy();
      expect(autoCompleteSpy).toHaveBeenCalledWith('search', 'female');
    });
  });

  describe('renderItem callback method', () => {
    it('should be able to override any jQuery UI callback method', () => {
      const mockCallback = (ul: HTMLElement, item: any) => {
        return $('<li></li>')
          .data('item.autocomplete', item)
          .append(`<div>Hello World`)
          .appendTo(ul);
      };
      (mockColumn.filter as ColumnFilter).filterOptions = {
        source: [],
        classes: { 'ui-autocomplete': 'autocomplete-custom-four-corners' },
      } as AutocompleteOption;
      (mockColumn.filter as ColumnFilter).callbacks = { _renderItem: mockCallback };

      filter.init(filterArguments);
      const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
      filterElm.focus();

      expect(filter.filterDomElement).toBeTruthy();
      expect(filter.instance).toBeTruthy();
      expect(filter.instance._renderItem).toEqual(mockCallback);
    });

    it('should provide "renderItem" in the "filterOptions" and expect the jQueryUI "_renderItem" to be overriden', () => {
      const mockTemplateString = `<div>Hello World</div>`;
      const mockTemplateCallback = () => mockTemplateString;
      (mockColumn.filter as ColumnFilter).filterOptions = {
        source: [],
        renderItem: {
          layout: 'fourCorners',
          templateCallback: mockTemplateCallback
        },
      } as AutocompleteOption;

      filter.init(filterArguments);
      const autoCompleteSpy = jest.spyOn(filter.filterDomElement, 'autocomplete');
      const filterElm = divContainer.querySelector('input.filter-gender') as HTMLInputElement;
      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 109, bubbles: true, cancelable: true }));

      expect(filter.filterDomElement).toBeTruthy();
      expect(filter.instance).toBeTruthy();
      expect(filter.autoCompleteOptions).toEqual(expect.objectContaining({ classes: { 'ui-autocomplete': 'autocomplete-custom-four-corners' } }));
      expect(autoCompleteSpy).toHaveBeenCalledWith('instance');
      expect(filter.instance._renderItem).toEqual(expect.any(Function));

      const ulElm = document.createElement('ul');
      filter.instance._renderItem(ulElm, { name: 'John' });

      const liElm = ulElm.querySelector('li') as HTMLLIElement;
      expect(liElm.innerHTML).toBe(mockTemplateString);
    });
  });
});
