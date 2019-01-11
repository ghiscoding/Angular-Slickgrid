import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { dateUsShortSorter } from './dateUsShortSorter';
import { dateSorter } from './dateSorter';
import { dateIsoSorter } from './dateIsoSorter';
import { dateUsSorter } from './dateUsSorter';
import { numericSorter } from './numericSorter';
import { objectStringSorter } from './objectStringSorter';
import { stringSorter } from './stringSorter';

export const Sorters = {
  /** Sorter method to sort values by Date object type */
  date: dateSorter,

  /** Sorter method to sort values by Date formatted as ISO date */
  dateIso: dateIsoSorter,

  /** Sorter method to sort values by Date formatted as US date */
  dateUs: dateUsSorter,

  /** Sorter method to sort values by Date formatted as US short date */
  dateUsShort: dateUsShortSorter,

  /** Sorter method to sort values as numeric fields */
  numeric: numericSorter,

  /** Sorter method to sort object values with a "dataKey" provided which it's output will be of string (e.g. obj1[dataKey] = 'John') */
  objectString: objectStringSorter,

  /** Sorter method to sort values as regular strings */
  string: stringSorter
};
