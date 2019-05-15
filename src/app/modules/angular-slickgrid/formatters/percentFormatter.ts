import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrGridOptions } from './formatterUtility';

export const percentFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
  const maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
  const displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber) {
    const percentValue = value * 100;
    return formatNumber(percentValue, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%');
  }
  return value;
};
