import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const dollarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const isNumber = !isNaN(+value);
  const params = columnDef && columnDef.params || {};
  const minDecimal = params.minDecimal || 2;
  const maxDecimal = params.minDecimal || 4;
  const outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;

  return !isNumber ? '' : `$${outputValue}`;
};
