import { Column, GroupTotalsFormatter } from './../models/index';
import { formatNumber } from '../services/utilities';
import { getValueFromParamsOrFormatterOptions } from '../formatters/formatterUtilities';

export const minTotalsFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.min && totals.min[field];
  const params = columnDef && columnDef.params;
  const prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const minDecimal = getValueFromParamsOrFormatterOptions('minDecimal', columnDef, grid);
  const maxDecimal = getValueFromParamsOrFormatterOptions('maxDecimal', columnDef, grid);
  const decimalSeparator = getValueFromParamsOrFormatterOptions('decimalSeparator', columnDef, grid, '.');
  const thousandSeparator = getValueFromParamsOrFormatterOptions('thousandSeparator', columnDef, grid, '');
  const displayNegativeNumberWithParentheses = getValueFromParamsOrFormatterOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (val != null && !isNaN(+val)) {
    const formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '', decimalSeparator, thousandSeparator);
    return `${prefix}${formattedNumber}${suffix}`;
  }
  return '';
};
