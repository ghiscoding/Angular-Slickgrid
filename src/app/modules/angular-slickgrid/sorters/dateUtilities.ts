import { mapMomentDateFormatWithFieldType } from '../services/utilities';
import { Column, FieldType, GridOption, Sorter } from '../models/index';
import * as moment_ from 'moment-mini';
const moment = (moment_ as any)['default'] || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export function compareDates(value1: any, value2: any, sortDirection: number, sortColumn: Column, gridOptions: GridOption, format: string | moment_.MomentBuiltinFormat, strict?: boolean) {
  let diff = 0;
  const checkForUndefinedValues = sortColumn && sortColumn.valueCouldBeUndefined || gridOptions && gridOptions.cellValueCouldBeUndefined || false;
  const date1 = moment(value1, format, strict);
  const date2 = moment(value2, format, strict);

  if (value1 === null || value1 === '' || (checkForUndefinedValues && value1 === undefined) || !date1.isValid()) {
    diff = -1;
  } else if (value2 === null || value2 === '' || (checkForUndefinedValues && value2 === undefined) || !date2.isValid()) {
    diff = 1;
  } else {
    diff = date1.valueOf() < date2.valueOf() ? -1 : 1;
  }

  return sortDirection * diff;
}

/** From a FieldType, return the associated date Sorter */
export function getAssociatedDateSorter(fieldType: FieldType): any {
  const FORMAT = (fieldType === FieldType.date) ? moment.ISO_8601 : mapMomentDateFormatWithFieldType(fieldType);

  return (value1: any, value2: any, sortDirection: number, sortColumn: Column, gridOptions: GridOption) => {
    if (FORMAT === moment.ISO_8601) {
      return compareDates(value1, value2, sortDirection, sortColumn, gridOptions, FORMAT, false) as number;
    }
    return compareDates(value1, value2, sortDirection, sortColumn, gridOptions, FORMAT, true) as number;
  };
}
