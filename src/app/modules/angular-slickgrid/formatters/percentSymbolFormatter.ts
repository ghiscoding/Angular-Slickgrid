import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrGridOptions } from './formatterUtilities';

export const percentSymbolFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
  const maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
  const displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber) {
    return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%');
  }
  return value;
};
