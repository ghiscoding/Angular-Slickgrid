import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Filters } from '..';
import { AutoCompleteFilter } from '../autoCompleteFilter';
import { AutocompleteOption, Column, FieldType, FilterArguments, GridOption, OperatorType } from '../../models';
import { CollectionService } from './../../services/collection.service';
import { of } from 'rxjs';

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
        model: Filters.autoComplete,
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

    filter = new AutoCompleteFilter(translate, collectionService);
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
      expect(e.toString()).toContain(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the AutoComplete Filter to work correctly.`);
      done();
    }
  });

  it('should throw an error when collection is not a valid array', (done) => {
    try {
      // @ts-ignore
      mockColumn.filter.collection = { hello: 'world' };
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`The "collection" passed to the Autocomplete Filter is not a valid array.`);
      done();
    }
  });

  xit('should throw an error when "collectionAsync" Observable does not return a valid array', (done) => {
    try {
      mockColumn.filter.collectionAsync = of({ hello: 'world' });
      filter.init(filterArguments);
    } catch (e) {
      expect(e.toString()).toContain(`Something went wrong while trying to pull the collection from the "collectionAsync" call in the AutoComplete Filter, the collection is not a valid array.`);
      done();
    }
  });

  it('should initialize the filter', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.search-filter.filter-gender').length;
    const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');

    expect(autocompleteUlElms.length).toBe(1);
    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should initialize the filter even when user define his own filter options', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    mockColumn.filter.filterOptions = { minLength: 3 } as AutocompleteOption;
    filter.init(filterArguments);
    const filterCount = divContainer.querySelectorAll('input.search-filter.filter-gender').length;
    const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');

    expect(autocompleteUlElms.length).toBe(1);
    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
  });

  it('should have a placeholder when defined in its column definition', () => {
    const testValue = 'test placeholder';
    mockColumn.filter.placeholder = testValue;
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.search-filter.filter-gender');

    expect(filterElm.placeholder).toBe(testValue);
  });

  it('should call "setValues" and expect that value to be in the callback when triggered', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filter.init(filterArguments);
    filter.setValues('male');
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');

    filterElm.focus();
    filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', { keyCode: 109, bubbles: true, cancelable: true }));
    filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 109, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');
    const autocompleteListElms = document.body.querySelectorAll<HTMLLIElement>('ul.ui-autocomplete li');

    expect(filterFilledElms.length).toBe(1);
    // expect(autocompleteListElms.length).toBe(2);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['male'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableFilterTrimWhiteSpace" is enabled in grid options', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    gridOptionMock.enableFilterTrimWhiteSpace = true;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues('    abc ');
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');

    filterElm.focus();
    filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['abc'], shouldTriggerQuery: true });
  });

  it('should call "setValues" with extra spaces at the beginning of the searchTerms and trim value when "enableTrimWhiteSpace" is enabled in the column filter', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    gridOptionMock.enableFilterTrimWhiteSpace = false;
    mockColumn.filter.enableTrimWhiteSpace = true;
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    filter.setValues('    abc ');
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');

    filterElm.focus();
    filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['abc'], shouldTriggerQuery: true });
  });

  it('should trigger the callback method when user types something in the input', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');

    filterElm.focus();
    filterElm.value = 'a';
    filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
    const autocompleteListElms = document.body.querySelectorAll<HTMLLIElement>('ul.ui-autocomplete li');

    // expect(autocompleteListElms.length).toBe(2);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['a'], shouldTriggerQuery: true });
  });

  it('should create the input filter with a default search term when passed as a filter argument', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');

    expect(filterElm.value).toBe('xyz');
  });

  it('should expect the input not to have the "filled" css class when the search term provided is an empty string', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filterArguments.searchTerms = [''];

    filter.init(filterArguments);
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
  });

  it('should trigger a callback with the clear filter set when calling the "clear" method', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear();
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: true });
  });

  it('should trigger a callback with the clear filter but without querying when when calling the "clear" method with False as argument', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    filterArguments.searchTerms = ['xyz'];

    filter.init(filterArguments);
    filter.clear(false);
    const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');
    const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');


    expect(filterElm.value).toBe('');
    expect(filterFilledElms.length).toBe(0);
    expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, clearFilterTriggered: true, shouldTriggerQuery: false });
  });

  it('should create the filter with a default search term when using "collectionAsync" as an Observable', (done) => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter.collectionAsync = of(['male', 'female']);

    filterArguments.searchTerms = ['female'];
    filter.init(filterArguments);

    setTimeout(() => {
      const filterElm = divContainer.querySelector<HTMLInputElement>('input.filter-gender');
      const autocompleteUlElms = document.body.querySelectorAll<HTMLUListElement>('ul.ui-autocomplete');
      filter.setValues('male');

      filterElm.focus();
      filterElm.dispatchEvent(new (window.window as any).KeyboardEvent('keyup', { keyCode: 97, bubbles: true, cancelable: true }));
      const filterFilledElms = divContainer.querySelectorAll<HTMLInputElement>('input.filter-gender.filled');

      expect(autocompleteUlElms.length).toBe(1);
      expect(filterFilledElms.length).toBe(1);
      expect(spyCallback).toHaveBeenCalledWith(expect.anything(), { columnDef: mockColumn, operator: 'EQ', searchTerms: ['male'], shouldTriggerQuery: true });
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
    const filterCollection = filter.collection;

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
    const filterCollection = filter.collection;

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
    const filterCollection = filter.collection;

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
    const filterCollection = filter.collection;

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
      const filterCollection = filter.collection;

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
    const filterCollection = filter.collection;

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
    const filterCollection = filter.collection;

    expect(filterCollection.length).toBe(3);
    expect(filterCollection[0]).toEqual({ value: 'female', description: 'female' });
    expect(filterCollection[1]).toEqual({ value: 'male', description: 'male' });
    expect(filterCollection[2]).toEqual({ value: 'other', description: 'other' });
  });

  describe('onSelect method', () => {
    it('should expect "setValue" and "autoCommitEdit" to have been called with a string when item provided is a string', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');
      mockColumn.filter.collection = ['male', 'female'];

      filter.init(filterArguments);
      const spySetValue = jest.spyOn(filter, 'setValues');
      const output = filter.onSelect(null, { item: 'female' });

      expect(output).toBe(false);
      expect(spySetValue).toHaveBeenCalledWith('female');
      expect(spyCallback).toHaveBeenCalledWith(null, { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
    });

    it('should expect "setValue" and "autoCommitEdit" to have been called with the string label when item provided is an object', () => {
      const spyCallback = jest.spyOn(filterArguments, 'callback');
      mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

      filter.init(filterArguments);
      const spySetValue = jest.spyOn(filter, 'setValues');
      const output = filter.onSelect(null, { item: { value: 'f', label: 'Female' } });

      expect(output).toBe(false);
      expect(spySetValue).toHaveBeenCalledWith('Female');
      expect(spyCallback).toHaveBeenCalledWith(null, { columnDef: mockColumn, operator: 'EQ', searchTerms: ['f'], shouldTriggerQuery: true });
    });
  });
});
