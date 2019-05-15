import { Column, GroupTotalsFormatter } from './../models/index';
import { formatNumber } from './../services/utilities';

export const avgTotalsDollarFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.avg && totals.avg[field];
  const params = columnDef && columnDef.params;
  const prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const minDecimal = params && params.minDecimal !== undefined ? params.minDecimal : 2;
  const maxDecimal = params && params.maxDecimal !== undefined ? params.maxDecimal : 4;
  const displayNegativeWithParentheses = params && params.displayNegativeWithParentheses;

  if (val != null && !isNaN(+val)) {
    const formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeWithParentheses, '$');
    return `${prefix}${formattedNumber}${suffix}`;
  }
  return '';
};
