import { Column, Formatter } from './../models/index';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrGridOptions } from './formatterUtilities';

export const dollarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
  const maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
  const displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber) {
    return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
  }
  return value;
};
