// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Column, FilterArguments, GridOption } from '../../models';
import { CollectionService } from '../../services/collection.service';
import { Filters } from '..';
import { SingleSelectFilter } from '../singleSelectFilter';
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

describe('SingleSelectFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: SingleSelectFilter;
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
        model: Filters.singleSelect,
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
      FEMALE: 'Female',
      MALE: 'Male',
      OTHER: 'Other',
    });
    translate.setTranslation('fr', {
      FEMALE: 'Femme',
      MALE: 'Mâle',
      OTHER: 'Autre',
    });
    translate.setDefaultLang('en');

    filter = new SingleSelectFilter(translate, collectionService);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should be a single-select filter', () => {
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];
    filter = new SingleSelectFilter(translate, collectionService);
    filter.init(filterArguments, true);
    const filterCount = divContainer.querySelectorAll('select.ms-filter.search-filter.filter-gender').length;

    expect(spyGetHeaderRow).toHaveBeenCalled();
    expect(filterCount).toBe(1);
    expect(filter.isMultipleSelect).toBe(false);
  });

  it('should create the select filter with empty search term when passed an empty string as a filter argument and not expect "filled" css class either', () => {
    mockColumn.filter.collection = [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filterArguments.searchTerms = [''];
    filter.init(filterArguments, true);
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=filter-gender].ms-drop ul>li input[type=radio]`);

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('.ms-parent.ms-filter.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(3);
    expect(filterFilledElms.length).toBe(0);
  });

  it('should trigger single select change event and expect the callback to be called when we select a single search term from dropdown list', () => {
    const spyCallback = jest.spyOn(filterArguments, 'callback');
    mockColumn.filter.collection = [{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }];

    filter.init(filterArguments, true);
    const filterBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.search-filter.filter-gender button.ms-choice');
    const filterListElm = divContainer.querySelectorAll<HTMLInputElement>(`[name=filter-gender].ms-drop ul>li input[type=radio]`);
    filterBtnElm.click();

    filterListElm[1].dispatchEvent(new CustomEvent('click'));

    const filterFilledElms = divContainer.querySelectorAll<HTMLDivElement>('.ms-parent.ms-filter.search-filter.filter-gender.filled');
    expect(filterListElm.length).toBe(2);
    expect(filterFilledElms.length).toBe(1);
    expect(spyCallback).toHaveBeenCalledWith(undefined, { columnDef: mockColumn, operator: 'EQ', searchTerms: ['female'], shouldTriggerQuery: true });
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
    filter.init(filterArguments, true);

    setTimeout(() => {
      const filterBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.search-filter.filter-gender button.ms-choice');
      const filterListElm = divContainer.querySelectorAll<HTMLSpanElement>(`[name=filter-gender].ms-drop ul>li span`);
      const filterOkElm = divContainer.querySelectorAll<HTMLButtonElement>(`[name=filter-gender].ms-drop .ms-ok-button`);
      const filterSelectAllElm = divContainer.querySelectorAll<HTMLSpanElement>('.filter-gender .ms-select-all label span');
      filterBtnElm.click();

      expect(filterOkElm.length).toBe(0);
      expect(filterSelectAllElm.length).toBe(0);
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
    filter.init(filterArguments, true);
    setTimeout(() => {
      const filterBtnElm = divContainer.querySelector<HTMLButtonElement>('.ms-parent.ms-filter.search-filter.filter-gender button.ms-choice');
      const filterListElm = divContainer.querySelectorAll<HTMLSpanElement>(`[name=filter-gender].ms-drop ul>li span`);
      filterBtnElm.click();

      expect(filterListElm.length).toBe(3);
      expect(filterListElm[0].textContent).toBe('Autre');
      expect(filterListElm[1].textContent).toBe('Mâle');
      expect(filterListElm[2].textContent).toBe('Femme');
      done();
    });
  });
});
