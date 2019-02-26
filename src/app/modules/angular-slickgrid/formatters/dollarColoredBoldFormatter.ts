import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const dollarColoredBoldFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const params = columnDef && columnDef.params || {};
  const minDecimal = params.minDecimal || 2;
  const maxDecimal = params.minDecimal || 4;
  const outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;

  if (!isNumber) {
    return '';
  } else if (value >= 0) {
    return `<span style="color:green; font-weight: bold;">$${outputValue}</span>`;
  } else {
    return `<span style="color:red; font-weight: bold;">$${outputValue}</span>`;
  }
};
