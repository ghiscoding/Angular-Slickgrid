import { numericSorter } from './numericSorter';
import { objectStringSorter } from './objectStringSorter';
import { stringSorter } from './stringSorter';
import { getAssociatedDateSorter } from './dateUtilities';
import { FieldType } from '../models/index';

export const Sorters = {
  /** Sorter method to sort values by Date object type (uses Moment.js ISO_8601 standard format, optionally include time) */
  date: getAssociatedDateSorter(FieldType.date),

  /**
   * Sorter method to sort values by Date formatted as ISO date (excluding time),
   * If you wish to optionally include time simply use the "Sorters.date" which work with/without time
   */
  dateIso: getAssociatedDateSorter(FieldType.dateIso),

  /** Sorter method to sort values by Date formatted as (YYYY-MM-DDTHH:mm:ss.SSSZ) */
  dateUtc: getAssociatedDateSorter(FieldType.dateUtc),

  /** Sorter method to sort values by Date and Time (native Date object) */
  dateTime: getAssociatedDateSorter(FieldType.dateTime),

  /** Sorter method to sort values by Date formatted as (YYYY-MM-DD HH:mm:ss) */
  dateTimeIso: getAssociatedDateSorter(FieldType.dateTimeIso),

  /** Sorter method to sort values by Date formatted as (YYYY-MM-DD h:mm:ss a) */
  dateTimeIsoAmPm: getAssociatedDateSorter(FieldType.dateTimeIsoAmPm),

  /** Sorter method to sort values by Date formatted as (YYYY-MM-DD h:mm:ss A) */
  dateTimeIsoAM_PM: getAssociatedDateSorter(FieldType.dateTimeIsoAM_PM),

  /** Sorter method to sort values by Date formatted as (YYYY-MM-DD HH:mm) */
  dateTimeShortIso: getAssociatedDateSorter(FieldType.dateTimeShortIso),

  /** Sorter method to sort values by Date formatted as Euro date (DD/MM/YYYY) */
  dateEuro: getAssociatedDateSorter(FieldType.dateEuro),

  /** Sorter method to sort values by Date formatted as Euro short date (D/M/YY) */
  dateEuroShort: getAssociatedDateSorter(FieldType.dateEuroShort),

  /** Sorter method to sort values by Date formatted as (DD/MM/YYYY HH:mm) */
  dateTimeShortEuro: getAssociatedDateSorter(FieldType.dateTimeShortEuro),

  /** Sorter method to sort values by Date formatted as (DD/MM/YYYY HH:mm:ss) */
  dateTimeEuro: getAssociatedDateSorter(FieldType.dateTimeEuro),

  /** Sorter method to sort values by Date formatted as (DD/MM/YYYY hh:mm:ss a) */
  dateTimeEuroAmPm: getAssociatedDateSorter(FieldType.dateTimeEuroAmPm),

  /** Sorter method to sort values by Date formatted as (DD/MM/YYYY hh:mm:ss A) */
  dateTimeEuroAM_PM: getAssociatedDateSorter(FieldType.dateTimeEuroAM_PM),

  /** Sorter method to sort values by Date formatted as (D/M/YY H:m:s) */
  dateTimeEuroShort: getAssociatedDateSorter(FieldType.dateTimeEuroShort),

  /** Sorter method to sort values by Date formatted as (D/M/YY h:m:s a) */
  dateTimeEuroShortAmPm: getAssociatedDateSorter(FieldType.dateTimeEuroShortAmPm),

  /** Sorter method to sort values by Date formatted as (D/M/YY h:m:s A) */
  dateTimeEuroShortAM_PM: getAssociatedDateSorter(FieldType.dateTimeEuroShortAM_PM),

  /** Sorter method to sort values by Date formatted as US date (MM/DD/YYYY) */
  dateUs: getAssociatedDateSorter(FieldType.dateUs),

  /** Sorter method to sort values by Date formatted as US short date (M/D/YY) */
  dateUsShort: getAssociatedDateSorter(FieldType.dateUsShort),

  /** Sorter method to sort values by Date formatted as (MM/DD/YYYY HH:mm) */
  dateTimeShortUs: getAssociatedDateSorter(FieldType.dateTimeShortUs),

  /** Sorter method to sort values by Date formatted as (MM/DD/YYYY HH:mm:s) */
  dateTimeUs: getAssociatedDateSorter(FieldType.dateTimeUs),

  /** Sorter method to sort values by Date formatted as (MM/DD/YYYY hh:mm:ss a) */
  dateTimeUsAmPm: getAssociatedDateSorter(FieldType.dateTimeUsAmPm),

  /** Sorter method to sort values by Date formatted as (MM/DD/YYYY hh:mm:ss A) */
  dateTimeUsAM_PM: getAssociatedDateSorter(FieldType.dateTimeUsAM_PM),

  /** Sorter method to sort values by Date formatted as (M/D/YY H:m:s) */
  dateTimeUsShort: getAssociatedDateSorter(FieldType.dateTimeUsShort),

  /** Sorter method to sort values by Date formatted as (M/D/YY h:m:s a) */
  dateTimeUsShortAmPm: getAssociatedDateSorter(FieldType.dateTimeUsShortAmPm),

  /** Sorter method to sort values by Date formatted as (M/D/YY h:m:s A) */
  dateTimeUsShortAM_PM: getAssociatedDateSorter(FieldType.dateTimeUsShortAM_PM),

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
