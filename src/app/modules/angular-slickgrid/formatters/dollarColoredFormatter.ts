import { Column, Formatter } from './../models/index';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrFormatterOptions } from './formatterUtilities';

export const dollarColoredFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const minDecimal = getValueFromParamsOrFormatterOptions('minDecimal', columnDef, grid, 2);
  const maxDecimal = getValueFromParamsOrFormatterOptions('maxDecimal', columnDef, grid, 4);
  const decimalSeparator = getValueFromParamsOrFormatterOptions('decimalSeparator', columnDef, grid, '.');
  const thousandSeparator = getValueFromParamsOrFormatterOptions('thousandSeparator', columnDef, grid, '');
  const displayNegativeNumberWithParentheses = getValueFromParamsOrFormatterOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber) {
    const colorStyle = (value >= 0) ? 'green' : 'red';
    const formattedNumber = formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$', '', decimalSeparator, thousandSeparator);
    return `<span style="color:${colorStyle}">${formattedNumber}</span>`;
  }
  return value;
};
