import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CollectionService } from './collection.service';
import {
  CollectionFilterBy,
  CollectionSortBy,
  FilterMultiplePassType,
  OperatorType,
  Column,
  FieldType,
} from './../models/index';

describe('CollectionService', () => {
  let collection = [];
  let translate: TranslateService;
  let service: CollectionService;

  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionService],
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.get(CollectionService);
    translate = TestBed.get(TranslateService);

    translate.setTranslation('en', {
      SALES_REP: 'Sales Rep.',
      FINANCE_MANAGER: 'Finance Manager',
      HUMAN_RESOURCES: 'Human Resources',
      IT_ADMIN: 'IT Admin',
      DEVELOPER: 'Developer',
    });
    translate.setTranslation('fr', {
      SALES_REP: 'Représentant des ventes',
      FINANCE_MANAGER: 'Responsable des finances',
      HUMAN_RESOURCES: 'Ressources humaines',
      IT_ADMIN: 'Administrateur IT',
      DEVELOPER: 'Développeur',
    });
    translate.setDefaultLang('en');

    collection = [
      { firstName: 'John', lastName: 'Z', position: 'SALES_REP' },
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Doe', position: null },
      { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER' },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
    ];
  });

  afterEach(() => {
    collection = undefined;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array without certain filtered values', () => {
    const filterBy = { property: 'firstName', operator: 'NE', value: 'John' } as CollectionFilterBy;

    const result = service.filterCollection(collection, filterBy);

    expect(result).toEqual([
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
    ]);
  });

  it('should return an array without certain filtered valuess in a "chain" way', () => {
    const filterBy = [
      { property: 'firstName', operator: 'NE', value: 'John' },
      { property: 'lastName', operator: 'NE', value: 'Doe' }
    ] as CollectionFilterBy[];

    const result1 = service.filterCollection(collection, filterBy);
    const result2 = service.filterCollection(collection, filterBy, 'chain'); // chain is default

    expect(result1).toEqual([
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
    ]);
    expect(result1).toEqual(result2);
  });

  it('should return an array with merged output of filtered values', () => {
    const filterBy = [
      { property: 'firstName', operator: OperatorType.equal, value: 'John' },
      { property: 'lastName', value: 'Doe' } // ommitted operator are Equal by default
    ] as CollectionFilterBy[];

    const result = service.filterCollection(collection, filterBy, FilterMultiplePassType.merge);

    expect(result).toEqual([
      // the array will have all "John" 1st, then all "Doe"
      { firstName: 'John', lastName: 'Z', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Doe', position: null },
      { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER' },
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
    ]);
  });

  it('should return an array by using the "contains" filter type', () => {
    const filterBy = { property: 'firstName', operator: OperatorType.contains, value: 'Foo' } as CollectionFilterBy;

    const result = service.singleFilterCollection(collection, filterBy);

    expect(result).toEqual([{ firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' }]);
  });

  it('should return an array by using the "notContains" filter type', () => {
    const filterBy = { property: 'firstName', operator: OperatorType.notContains, value: 'John' } as CollectionFilterBy;

    const result = service.singleFilterCollection(collection, filterBy);

    expect(result).toEqual([
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
    ]);
  });

  it('should return a collection sorted by a "dataKey"', () => {
    const columnDef = { id: 'users', field: 'users', dataKey: 'lastName' } as Column;

    const result = service.sortCollection(columnDef, collection, { property: 'lastName', sortDesc: true, fieldType: FieldType.string });

    expect(result).toEqual([
      { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Z', position: 'SALES_REP' },
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'John', lastName: 'Doe', position: null },
      { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER' },
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
    ]);
  });

  it('should return a collection sorted by multiple sortBy entities', () => {
    const columnDef = { id: 'users', field: 'users', dataKey: 'lastName' } as Column;
    const sortBy = [
      { property: 'firstName', sortDesc: false, fieldType: FieldType.string },
      { property: 'lastName', sortDesc: true, fieldType: FieldType.string },
    ] as CollectionSortBy[];

    const result = service.sortCollection(columnDef, collection, sortBy);

    expect(result).toEqual([
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Z', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Doe', position: null },
      { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER' },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
    ]);
  });

  it('should return a collection sorted by multiple sortBy entities and their translated value', () => {
    translate.use('fr');
    const columnDef = { id: 'users', field: 'users', dataKey: 'lastName' } as Column;
    const sortBy = [
      { property: 'firstName', sortDesc: false, fieldType: FieldType.string },
      { property: 'position', sortDesc: true }, // fieldType is string by default
    ] as CollectionSortBy[];

    const result = service.sortCollection(columnDef, collection, sortBy, true);

    expect(result).toEqual([
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'John', lastName: 'Z', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER' },
      { firstName: 'John', lastName: 'Doe', position: null },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
    ]);
  });

  it('should return a collection sorted by a single sortBy entity and their translated value', () => {
    translate.use('en');
    const columnDef = { id: 'users', field: 'users' } as Column;
    const sortBy = { property: 'position', sortDesc: false } as CollectionSortBy; // fieldType is string by default

    const result = service.sortCollection(columnDef, collection, sortBy, true);

    expect(result).toEqual([
      { firstName: 'John', lastName: 'Doe', position: null },
      { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER' },
      { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER' },
      { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES' },
      { firstName: 'John', lastName: 'Z', position: 'SALES_REP' },
      { firstName: '', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP' },
      { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP' },
      { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP' },
    ]);
  });
});
