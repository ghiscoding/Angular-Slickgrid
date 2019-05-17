import { Column, Formatter } from './../models/index';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrGridOptions } from './formatterUtilities';

export const percentCompleteFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
  const maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
  const displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber) {
    const colorStyle = (value < 50) ? 'red' : 'green';
    const formattedNumber = formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%');
    const outputFormattedValue = value > 100 ? '100%' : formattedNumber;
    return `<span style='color:${colorStyle}'>${outputFormattedValue}</span>`;
  }
  return value;
};
