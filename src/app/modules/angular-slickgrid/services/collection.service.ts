import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CollectionFilterBy,
  CollectionSortBy,
  FieldType,
  OperatorType,
} from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';

@Injectable()
export class CollectionService {
  constructor(private translate: TranslateService) { }

  /**
   * Filter items from a collection
   * @param collection
   * @param filterBy
   */
  filterCollection(collection: any[], filterBy: CollectionFilterBy): any[] {
    let filteredCollection: any[] = [];

    if (filterBy) {
      const property = filterBy.property || '';
      const operator = filterBy.operator || OperatorType.equal;
      // just check for undefined since the filter value could be null, 0, '', false etc
      const value = typeof filterBy.value === 'undefined' ? '' : filterBy.value;

      switch (operator) {
        case OperatorType.equal:
          filteredCollection = collection.filter((item) => item[property] === value);
          break;
        case OperatorType.in:
          filteredCollection = collection.filter((item) => item[property].indexOf(value) !== -1);
          break;
        case OperatorType.notIn:
          filteredCollection = collection.filter((item) => item[property].indexOf(value) === -1);
          break;
        case OperatorType.contains:
          filteredCollection = collection.filter((item) => value.indexOf(item[property]) !== -1);
          break;
        default:
          filteredCollection = collection.filter((item) => item[property] !== value);
      }
    }

    return filteredCollection;
  }

  /**
   * Sort items in a collection
   * @param collection
   * @param sortBy
   * @param enableTranslateLabel
   */
  sortCollection(collection: any[], sortBy: CollectionSortBy, enableTranslateLabel?: boolean): any[] {
    let sortedCollection: any[] = [];

    if (sortBy) {
      const property = sortBy.property || '';
      const sortDirection = sortBy.hasOwnProperty('sortDesc') ? (sortBy.sortDesc ? -1 : 1) : 1;
      const fieldType = sortBy.fieldType || FieldType.string;

      sortedCollection = collection.sort((dataRow1: any, dataRow2: any) => {
        const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[property] || ' ') : dataRow1[property];
        const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[property] || ' ') : dataRow2[property];
        const result = sortByFieldType(value1, value2, fieldType, sortDirection);
        return result;
      });
    }

    return sortedCollection;
  }
}
