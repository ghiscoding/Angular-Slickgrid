import { Column, Formatter } from './../models/index';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrGridOptions } from './formatterUtility';

export const decimalFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const params = columnDef.params || {};
  let minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
  let maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 2);
  const displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  // @deprecated: decimalPlaces, minDecimalPlaces, maxDecimalPlaces
  // add these extra checks to support previous way of passing the decimal count
  if ((params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces)) {
    minDecimal = (params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces);
  }
  if (params.maxDecimalPlaces !== null && params.maxDecimalPlaces) {
    maxDecimal = (params.maxDecimalPlaces !== null && params.maxDecimalPlaces);
  }

  if (isNumber) {
    return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
  }
  return value;
};

