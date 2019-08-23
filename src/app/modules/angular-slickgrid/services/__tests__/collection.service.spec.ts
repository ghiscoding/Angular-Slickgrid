import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CollectionService } from '../collection.service';
import {
  CollectionFilterBy,
  CollectionSortBy,
  FilterMultiplePassType,
  OperatorType,
  Column,
  FieldType,
} from '../../models/index';

describe('CollectionService', () => {
  let collection = [];
  let stringCollection = [];
  let translate: TranslateService;
  let service: CollectionService;

  describe('with ngx-translate', () => {
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
        { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
        { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
        { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
        { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
        { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
        { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
        { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
        { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
        { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
      ];

      stringCollection = ['John', 'Jane', 'Ava Luna', '', 'Bob', 'John', null, 'John Foo'];
    });

    afterEach(() => {
      collection = undefined;
    });

    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    describe('Collection of Objects', () => {
      describe('filterCollection method', () => {
        it('should return on the columns that have firstName filled when the filtered value is actually undefined but will be checked as an empty string', () => {
          const filterBy = { property: 'firstName', operator: 'EQ', value: undefined } as CollectionFilterBy;

          const result = service.filterCollection(collection, filterBy);

          expect(result).toEqual([
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 }
          ]);
        });

        it('should return an array without certain filtered values', () => {
          const filterBy = { property: 'firstName', operator: 'NE', value: 'John' } as CollectionFilterBy;

          const result = service.filterCollection(collection, filterBy);

          expect(result).toEqual([
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
          ]);
        });

        it('should return an array without certain values filtered in a "chain" way', () => {
          const filterBy = [
            { property: 'firstName', operator: 'NE', value: 'John' },
            { property: 'lastName', operator: 'NE', value: 'Doe' }
          ] as CollectionFilterBy[];

          const result1 = service.filterCollection(collection, filterBy);
          const result2 = service.filterCollection(collection, filterBy, 'chain'); // chain is default

          expect(result1).toEqual([
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
          ]);
          expect(result1).toEqual(result2);
        });

        it('should return an array with merged output of filtered values', () => {
          const filterBy = [
            { property: 'firstName', operator: OperatorType.equal, value: 'John' },
            { property: 'lastName', value: 'Doe' } // ommitted Operator are Equal by default
          ] as CollectionFilterBy[];

          const result = service.filterCollection(collection, filterBy, FilterMultiplePassType.merge);

          expect(result).toEqual([
            // the array will have all "John" 1st, then all "Doe"
            { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
            { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
            { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
            { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
          ]);
        });
      });

      describe('singleFilterCollection method', () => {
        it('should return an array by using the "contains" filter type', () => {
          const filterBy = { property: 'firstName', operator: OperatorType.contains, value: 'Foo' } as CollectionFilterBy;

          const result = service.singleFilterCollection(collection, filterBy);

          expect(result).toEqual([{ firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 }]);
        });

        it('should return an array by using the "notContains" filter type', () => {
          const filterBy = { property: 'firstName', operator: OperatorType.notContains, value: 'John' } as CollectionFilterBy;

          const result = service.singleFilterCollection(collection, filterBy);

          expect(result).toEqual([
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
          ]);
        });
      });

      describe('sortCollection method', () => {
        it('should return a collection sorted by a "dataKey"', () => {
          const columnDef = { id: 'users', field: 'users', dataKey: 'lastName' } as Column;

          const result = service.sortCollection(columnDef, collection, { property: 'lastName', sortDesc: true, fieldType: FieldType.string });

          expect(result).toEqual([
            { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
            { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
            { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
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
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
            { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
            { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
            { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
          ]);
        });

        it('should return a collection sorted by a sortyBy entity being a number', () => {
          const columnDef = { id: 'users', field: 'users', dataKey: 'lastName' } as Column;
          const sortBy = [
            { property: 'order', sortDesc: true, fieldType: FieldType.number },
          ] as CollectionSortBy[];

          const result = service.sortCollection(columnDef, collection, sortBy);

          expect(result).toEqual([
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
            { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
            { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
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
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
            { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
            { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
            { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
          ]);
        });

        it('should return a collection sorted by a single sortBy entity and their translated value', () => {
          translate.use('en');
          const columnDef = { id: 'users', field: 'users' } as Column;
          const sortBy = { property: 'position', sortDesc: false } as CollectionSortBy; // fieldType is string by default

          const result = service.sortCollection(columnDef, collection, sortBy, true);

          expect(result).toEqual([
            { firstName: 'John', lastName: 'Doe', position: null, order: 5 },
            { firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
            { firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
            { firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
            { firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
            { firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
            { firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: 0 },
            { firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
            { firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
          ]);
        });
      });
    });

    describe('Collection of Strings/Numbers', () => {
      describe('filterCollection method', () => {
        it('should return on the columns that have firstName filled when the filtered value is actually undefined but will be checked as an empty string', () => {
          const filterBy = { operator: 'EQ', value: undefined } as CollectionFilterBy;

          const result = service.filterCollection(stringCollection, filterBy);

          expect(result).toEqual(['']);
        });

        it('should return an array without certain values filtered in a "chain" way', () => {
          const filterBy = [
            { operator: 'NE', value: 'John' },
            { operator: 'NE', value: 'Bob' }
          ] as CollectionFilterBy[];

          const result1 = service.filterCollection(stringCollection, filterBy);
          const result2 = service.filterCollection(stringCollection, filterBy, 'chain'); // chain is default

          expect(result1).toEqual(['Jane', 'Ava Luna', '', null, 'John Foo']);
          expect(result1).toEqual(result2);
        });

        it('should return an array with merged (unique values no duplicate) output of filtered values', () => {
          const filterBy = [
            { operator: OperatorType.equal, value: 'John' },
            { value: 'Bob' } // ommitted Operator are Equal by default
          ] as CollectionFilterBy[];

          const result = service.filterCollection(stringCollection, filterBy, FilterMultiplePassType.merge);

          expect(result).toEqual(['John', 'Bob']);
        });
      });

      describe('singleFilterCollection method', () => {
        // stringCollection = ['John', 'Jane', 'Ava Luna', '', 'Bob', 'John', null, 'John Foo'];

        it('should return an array by using the "contains" filter type', () => {
          const filterBy = { operator: OperatorType.contains, value: 'Foo' } as CollectionFilterBy;

          const result = service.singleFilterCollection(stringCollection, filterBy);

          expect(result).toEqual(['John Foo']);
        });

        it('should return an array by using the "notContains" filter type', () => {
          const filterBy = { operator: OperatorType.notContains, value: 'John' } as CollectionFilterBy;

          const result = service.singleFilterCollection(stringCollection, filterBy);

          expect(result).toEqual(['Jane', 'Ava Luna', '', 'Bob']);
        });
      });

      describe('sortCollection method', () => {
        it('should return a collection of numbers sorted', () => {
          translate.use('en');
          const columnDef = { id: 'count', field: 'count', fieldType: FieldType.number } as Column;

          const result1 = service.sortCollection(columnDef, [0, -11, 3, 99999, -200], { sortDesc: false } as CollectionSortBy);
          const result2 = service.sortCollection(columnDef, [0, -11, 3, 99999, -200], { sortDesc: true } as CollectionSortBy);

          expect(result1).toEqual([-200, -11, 0, 3, 99999]);
          expect(result2).toEqual([99999, 3, 0, -11, -200]);
        });

        it('should return a collection of translation values sorted', () => {
          translate.use('en');
          const roleCollection = ['SALES_REP', 'DEVELOPER', 'SALES_REP', null, 'HUMAN_RESOURCES', 'FINANCE_MANAGER', 'UNKNOWN'];
          const columnDef = { id: 'count', field: 'count', fieldType: FieldType.string } as Column;

          const result1 = service.sortCollection(columnDef, [...roleCollection], { sortDesc: false } as CollectionSortBy, true);
          const result2 = service.sortCollection(columnDef, [...roleCollection], { sortDesc: true } as CollectionSortBy, true);

          expect(result1).toEqual([null, 'DEVELOPER', 'FINANCE_MANAGER', 'HUMAN_RESOURCES', 'SALES_REP', 'SALES_REP', 'UNKNOWN']);
          expect(result2).toEqual(['UNKNOWN', 'SALES_REP', 'SALES_REP', 'HUMAN_RESOURCES', 'FINANCE_MANAGER', 'DEVELOPER', null]);
        });
      });
    }); // Collection of strings/numbers
  }); // with ngx-translate

  describe('without ngx-translate', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CollectionService],
        imports: []
      });
      service = TestBed.get(CollectionService);
    });

    it('should throw an error if "enableTranslate" is set but the Translate Service is null', () => {
      const columnDef = { id: 'users', field: 'users', dataKey: 'lastName' } as Column;

      expect(() => service.sortCollection(columnDef, collection, { property: 'lastName', sortDesc: true, fieldType: FieldType.string }, true))
        .toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });
  });
});
