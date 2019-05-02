import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const dollarColoredFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const params = columnDef && columnDef.params || {};
  const minDecimal = params.minDecimal || 2;
  const maxDecimal = params.maxDecimal || 4;
  const outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;

  if (!isNumber) {
    return value;
  } else if (value >= 0) {
    return `<span style="color:green;">$${outputValue}</span>`;
  } else {
    return `<span style="color:red;">$${outputValue}</span>`;
  }
};
