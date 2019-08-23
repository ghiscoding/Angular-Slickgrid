// import 3rd party lib multiple-select for the tests
// import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Column, FilterArguments, GridOption } from '../../models';
import { CollectionService } from '../../services/collection.service';
import { Filters } from '..';
import { SelectFilter } from '../selectFilter';

const containerId = 'demo-container';

// define a <div> container to simulate the grid container
const template = `<div id="${containerId}"></div>`;

const gridOptionMock = {
  enableFiltering: true,
  enableFilterTrimWhiteSpace: true,
} as GridOption;

const collectionServiceStub = {

} as CollectionService;

const gridStub = {
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getHeaderRowColumn: jest.fn(),
  render: jest.fn(),
};

describe('SelectFilter', () => {
  let divContainer: HTMLDivElement;
  let filter: SelectFilter;
  let filterArguments: FilterArguments;
  let spyGetHeaderRow;
  let mockColumn: Column;
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
        collection: [{ value: '', label: '' }, { value: 'male', label: 'male' }, { value: 'female', label: 'female' }]
      }
    };
    filterArguments = {
      grid: gridStub,
      columnDef: mockColumn,
      callback: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [{ provide: CollectionService, useValue: collectionServiceStub }],
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');

    filter = new SelectFilter(translate, collectionServiceStub);
  });

  afterEach(() => {
    filter.destroy();
  });

  it('should throw an error when multiple-select.js is not provided or imported', () => {
    expect(() => filter.init(filterArguments, true)).toThrowError(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file`);
  });
});
