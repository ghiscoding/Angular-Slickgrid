import { Column, FieldType, Formatter } from './../models';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment_ from 'moment-mini';
const moment: any = (<any>moment_).default || moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateTimeUsAmPm);

export const dateTimeUsAmPmFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  value ? moment(value).format(FORMAT) : '';
