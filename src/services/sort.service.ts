import { GridOption } from './../models/gridOption.interface';
import { FieldType } from './../models/fieldType';
import { Sorter } from './../models/sorter.interface';
import { Sorters } from './../sorters';
import { Injectable, Input, OnInit } from '@angular/core';

@Injectable()
export class SortService {
  subscriber: any;

  constructor() { }

  /**
   * Attach a backend sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   */
  attachBackendOnSort(grid: any, gridOptions: GridOption) {
    this.subscriber = grid.onSort;
    this.subscriber.subscribe(gridOptions.onSortChanged);
  }

  /**
   * Attach a local sort (single/multi) hook to the grid
   * @param grid SlickGrid Grid object
   * @param gridOptions Grid Options object
   * @param dataView
   */
  attachLocalOnSort(grid: any, gridOptions: GridOption, dataView: any) {
    this.subscriber = grid.onSort;
    this.subscriber.subscribe((e: any, args: any) => {
      // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
      // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
      const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({sortAsc: args.sortAsc, sortCol: args.sortCol});

      dataView.sort(function (dataRow1: any, dataRow2: any) {
        for (let i = 0, l = sortColumns.length; i < l; i++) {
          const sortDirection = sortColumns[i].sortAsc ? 1 : -1;
          const sortField = sortColumns[i].sortCol.field;
          const fieldType = sortColumns[i].sortCol.type || 'string';
          const value1 = dataRow1[sortField];
          const value2 = dataRow2[sortField];
          let result = 0;

          switch (fieldType) {
            case FieldType.number:
              result = Sorters.numeric(value1, value2, sortDirection);
              break;
            case FieldType.date:
              result = Sorters.date(value1, value2, sortDirection);
              break;
            case FieldType.dateIso:
              result = Sorters.dateIso(value1, value2, sortDirection);
              break;
            case FieldType.dateUs:
              result = Sorters.dateUs(value1, value2, sortDirection);
              break;
            case FieldType.dateUsShort:
              result = Sorters.dateUsShort(value1, value2, sortDirection);
              break;
            default:
              result = Sorters.string(value1, value2, sortDirection);
              break;
          }

          if (result !== 0) {
            return result;
          }
        }
        return 0;
      });
      grid.invalidate();
      grid.render();
    });
  }

  destroy() {
    this.subscriber.unsubscribe();
  }
}
