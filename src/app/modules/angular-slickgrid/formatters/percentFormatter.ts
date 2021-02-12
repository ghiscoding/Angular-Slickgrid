import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';
import { formatNumber, isNumber } from './../services/utilities';
import { getValueFromParamsOrFormatterOptions } from './formatterUtilities';

export const percentFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any): string => {
  const minDecimal = getValueFromParamsOrFormatterOptions('minDecimal', columnDef, grid);
  const maxDecimal = getValueFromParamsOrFormatterOptions('maxDecimal', columnDef, grid);
  const decimalSeparator = getValueFromParamsOrFormatterOptions('decimalSeparator', columnDef, grid, '.');
  const thousandSeparator = getValueFromParamsOrFormatterOptions('thousandSeparator', columnDef, grid, '');
  const displayNegativeNumberWithParentheses = getValueFromParamsOrFormatterOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber(value)) {
    const percentValue = value * 100;
    return formatNumber(percentValue, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%', decimalSeparator, thousandSeparator);
  }
  return value;
};
