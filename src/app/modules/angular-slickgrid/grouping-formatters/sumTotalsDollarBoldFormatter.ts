import { Column, GroupTotalsFormatter } from './../models/index';
import { formatNumber } from './../services/utilities';

export const sumTotalsDollarBoldFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.sum && totals.sum[field];
  const params = columnDef && columnDef.params;
  const prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const minDecimal = params && params.minDecimal !== undefined ? params.minDecimal : 2;
  const maxDecimal = params && params.maxDecimal !== undefined ? params.maxDecimal : 4;
  const displayNegativeWithParentheses = params && params.displayNegativeWithParentheses;

  if (val != null && !isNaN(+val)) {
    const formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeWithParentheses, '$');
    return `<b>${prefix}${formattedNumber}${suffix}</b>`;
  }
  return '';
};
