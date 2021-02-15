import { Column, Formatter } from './../models/index';
import { formatNumber, isNumber } from './../services/utilities';
import { getValueFromParamsOrFormatterOptions } from './formatterUtilities';

export const decimalFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const params = columnDef.params || {};
  let minDecimal = getValueFromParamsOrFormatterOptions('minDecimal', columnDef, grid, 2);
  let maxDecimal = getValueFromParamsOrFormatterOptions('maxDecimal', columnDef, grid, 2);
  const decimalSeparator = getValueFromParamsOrFormatterOptions('decimalSeparator', columnDef, grid, '.');
  const thousandSeparator = getValueFromParamsOrFormatterOptions('thousandSeparator', columnDef, grid, '');
  const displayNegativeNumberWithParentheses = getValueFromParamsOrFormatterOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  // @deprecated: decimalPlaces, minDecimalPlaces, maxDecimalPlaces
  // add these extra checks to support previous way of passing the decimal count
  if ((params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces)) {
    console.warn('[Angular-Slickgrid] please consider using "minDecimal" (instead of "minDecimalPlaces" or "decimalPlaces").');
    minDecimal = (params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces);
  }
  if (params.maxDecimalPlaces !== null && params.maxDecimalPlaces) {
    console.warn('[Angular-Slickgrid] please consider using "maxDecimal" (instead of "maxDecimalPlaces").');
    maxDecimal = (params.maxDecimalPlaces !== null && params.maxDecimalPlaces);
  }

  if (isNumber(value)) {
    return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '', decimalSeparator, thousandSeparator);
  }
  return value;
};
