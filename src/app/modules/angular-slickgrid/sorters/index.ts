import { SortDirectionNumber } from './../models/sortDirectionNumber.enum';
import { dateUsShortSorter } from './dateUsShortSorter';
import { dateSorter } from './dateSorter';
import { dateIsoSorter } from './dateIsoSorter';
import { dateUsSorter } from './dateUsSorter';
import { numericSorter } from './numericSorter';
import { stringSorter } from './stringSorter';

export const Sorters = {
  date: dateSorter,
  dateIso: dateIsoSorter,
  dateUs: dateUsSorter,
  dateUsShort: dateUsShortSorter,
  numeric: numericSorter,
  string: stringSorter
};
