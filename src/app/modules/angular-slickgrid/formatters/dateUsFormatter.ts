import { Column, FieldType, Formatter } from './../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);

export const dateUsFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const isDateValid = moment(value, FORMAT, true).isValid();
  return (value && isDateValid) ? moment(value).format(FORMAT) : value;
};
