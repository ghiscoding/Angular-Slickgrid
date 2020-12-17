import { mapMomentDateFormatWithFieldType } from '../services/utilities';
import { Column, FieldType, GridOption, Sorter } from '../models/index';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export function compareDates(value1: any, value2: any, sortDirection: number, sortColumn: Column, gridOptions: GridOption, format: string | moment_.MomentBuiltinFormat, strict?: boolean) {
  let diff = 0;
  const checkForUndefinedValues = sortColumn && sortColumn.valueCouldBeUndefined || gridOptions && gridOptions.cellValueCouldBeUndefined || false;

  if (value1 === null || value1 === '' || (checkForUndefinedValues && value1 === undefined) || !moment(value1, format, strict).isValid()) {
    diff = -1;
  } else if (value2 === null || value2 === '' || (checkForUndefinedValues && value2 === undefined) || !moment(value2, format, strict).isValid()) {
    diff = 1;
  } else {
    const date1 = moment(value1, format, strict);
    const date2 = moment(value2, format, strict);
    diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
  }

  return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
}

/** From a FieldType, return the associated date Sorter */
export function getAssociatedDateSorter(fieldType: FieldType): Sorter {
  const FORMAT = (fieldType === FieldType.date) ? moment.ISO_8601 : mapMomentDateFormatWithFieldType(fieldType);

  return (value1: any, value2: any, sortDirection: number, sortColumn: Column, gridOptions: GridOption) => {
    if (FORMAT === moment.ISO_8601) {
      return compareDates(value1, value2, sortDirection, sortColumn, gridOptions, FORMAT, false);
    }
    return compareDates(value1, value2, sortDirection, sortColumn, gridOptions, FORMAT, true);
  };
}
