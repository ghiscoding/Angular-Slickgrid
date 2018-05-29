import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType, Sorter } from './../models/index';
import { compareDates } from './compareDateUtility';
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUsShort);

export const dateUsShortSorter: Sorter = (value1, value2, sortDirection) => {
  return compareDates(value1, value2, FORMAT, sortDirection, true);
};
