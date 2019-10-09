import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CollectionFilterBy,
  CollectionSortBy,
  Column,
  FilterMultiplePassType,
  FilterMultiplePassTypeString,
  FieldType,
  OperatorType,
  SortDirectionNumber,
} from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { uniqueArray } from './utilities';

@Injectable()
export class CollectionService {
  constructor(@Optional() private translate: TranslateService) { }

  /**
   * Filter 1 or more items from a collection
   * @param collection
   * @param filterByOptions
   */
  filterCollection(collection: any[], filterByOptions: CollectionFilterBy | CollectionFilterBy[], filterResultBy: FilterMultiplePassType | FilterMultiplePassTypeString | null = FilterMultiplePassType.chain): any[] {
    let filteredCollection: any[] = [];

    // when it's array, we will use the new filtered collection after every pass
    // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
    if (Array.isArray(filterByOptions)) {
      filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;

      for (const filter of filterByOptions) {
        if (filterResultBy === FilterMultiplePassType.merge) {
          const filteredPass = this.singleFilterCollection(collection, filter);
          filteredCollection = uniqueArray([...filteredCollection, ...filteredPass]);
        } else {
          filteredCollection = this.singleFilterCollection(filteredCollection, filter);
        }
      }
    } else {
      filteredCollection = this.singleFilterCollection(collection, filterByOptions);
    }

    return filteredCollection;
  }

  /**
   * Filter an item from a collection
   * @param collection
   * @param filterBy
   */
  singleFilterCollection(collection: any[], filterBy: CollectionFilterBy): any[] {
    let filteredCollection: any[] = [];

    if (filterBy) {
      const objectProperty = filterBy.property;
      const operator = filterBy.operator || OperatorType.equal;
      // just check for undefined since the filter value could be null, 0, '', false etc
      const value = typeof filterBy.value === 'undefined' ? '' : filterBy.value;

      switch (operator) {
        case OperatorType.equal:
          if (objectProperty) {
            filteredCollection = collection.filter((item) => item[objectProperty] === value);
          } else {
            filteredCollection = collection.filter((item) => item === value);
          }
          break;
        case OperatorType.contains:
          if (objectProperty) {
            filteredCollection = collection.filter((item) => item[objectProperty].toString().indexOf(value.toString()) !== -1);
          } else {
            filteredCollection = collection.filter((item) => (item !== null && item !== undefined) && item.toString().indexOf(value.toString()) !== -1);
          }
          break;
        case OperatorType.notContains:
          if (objectProperty) {
            filteredCollection = collection.filter((item) => item[objectProperty].toString().indexOf(value.toString()) === -1);
          } else {
            filteredCollection = collection.filter((item) => (item !== null && item !== undefined) && item.toString().indexOf(value.toString()) === -1);
          }
          break;
        case OperatorType.notEqual:
        default:
          if (objectProperty) {
            filteredCollection = collection.filter((item) => item[objectProperty] !== value);
          } else {
            filteredCollection = collection.filter((item) => item !== value);
          }
      }
    }

    return filteredCollection;
  }

  /**
   * Sort 1 or more items in a collection
   * @param column definition
   * @param collection
   * @param sortByOptions
   * @param enableTranslateLabel
   */
  sortCollection(columnDef: Column, collection: any[], sortByOptions: CollectionSortBy | CollectionSortBy[], enableTranslateLabel?: boolean): any[] {
    if (enableTranslateLabel && (!this.translate || !this.translate.instant)) {
      throw new Error('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    let sortedCollection: any[] = [];

    if (sortByOptions) {
      if (Array.isArray(sortByOptions)) {
        // multi-sort
        sortedCollection = collection.sort((dataRow1: any, dataRow2: any) => {
          for (let i = 0, l = sortByOptions.length; i < l; i++) {
            const sortBy = sortByOptions[i];

            if (sortBy && sortBy.property) {
              // collection of objects with a property name provided
              const sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
              const objectProperty = sortBy.property;
              const fieldType = sortBy.fieldType || FieldType.string;
              const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[objectProperty] || ' ') : dataRow1[objectProperty];
              const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[objectProperty] || ' ') : dataRow2[objectProperty];

              const sortResult = sortByFieldType(fieldType, value1, value2, sortDirection, columnDef);
              if (sortResult !== SortDirectionNumber.neutral) {
                return sortResult;
              }
            }
          }
          return SortDirectionNumber.neutral;
        });
      } else if (sortByOptions && sortByOptions.property) {
        // single sort
        // collection of objects with a property name provided
        const objectProperty = sortByOptions.property;
        const sortDirection = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
        const fieldType = sortByOptions.fieldType || FieldType.string;

        if (objectProperty) {
          sortedCollection = collection.sort((dataRow1: any, dataRow2: any) => {
            const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[objectProperty] || ' ') : dataRow1[objectProperty];
            const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[objectProperty] || ' ') : dataRow2[objectProperty];
            const sortResult = sortByFieldType(fieldType, value1, value2, sortDirection, columnDef);
            if (sortResult !== SortDirectionNumber.neutral) {
              return sortResult;
            }
            return SortDirectionNumber.neutral;
          });
        }
      } else if (sortByOptions && !sortByOptions.property) {
        const sortDirection = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
        const fieldType = sortByOptions.fieldType || FieldType.string;

        sortedCollection = collection.sort((dataRow1: any, dataRow2: any) => {
          const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1 || ' ') : dataRow1;
          const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2 || ' ') : dataRow2;
          const sortResult = sortByFieldType(fieldType, value1, value2, sortDirection, columnDef);
          if (sortResult !== SortDirectionNumber.neutral) {
            return sortResult;
          }
          return SortDirectionNumber.neutral;
        });
      }
    }

    return sortedCollection;
  }
}
