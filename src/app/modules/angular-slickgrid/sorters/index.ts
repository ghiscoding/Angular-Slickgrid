import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { dateEuroShortSorter } from './dateEuroShortSorter';
import { dateEuroSorter } from './dateEuroSorter';
import { dateIsoSorter } from './dateIsoSorter';
import { dateSorter } from './dateSorter';
import { dateUsShortSorter } from './dateUsShortSorter';
import { dateUsSorter } from './dateUsSorter';
import { numericSorter } from './numericSorter';
import { objectStringSorter } from './objectStringSorter';
import { stringSorter } from './stringSorter';

export const Sorters = {
  /** Sorter method to sort values by Date object type (uses Moment.js ISO_8601 standard format, optionally include time) */
  date: dateSorter,

  /**
   * Sorter method to sort values by Date formatted as ISO date (excluding time),
   * If you wish to optionally include time simply use the "Sorters.date" which work with/without time
   */
  dateIso: dateIsoSorter,

  /** Sorter method to sort values by Date formatted as Euro date (dd/mm/yyyy) */
  dateEuro: dateEuroSorter,

  /** Sorter method to sort values by Date formatted as Euro short date (d/m/yy) */
  dateEuroShort: dateEuroShortSorter,

  /** Sorter method to sort values by Date formatted as US date (mm/dd/yyyy) */
  dateUs: dateUsSorter,

  /** Sorter method to sort values by Date formatted as US short date (m/d/yy) */
  dateUsShort: dateUsShortSorter,

  /** Sorter method to sort values as numeric fields */
  numeric: numericSorter,

  /**
   * Sorter method to sort object values with a "dataKey" provided in your column definition, it's data content must be of type string
   * Example:
   * columnDef = { id='user', field: 'user', ..., dataKey: 'firstName', sorter: Sorters.objectString }
   * collection = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Bob', lastName: 'Cash' }]
   */
  objectString: objectStringSorter,

  /** Sorter method to sort values as regular strings */
  string: stringSorter
};
