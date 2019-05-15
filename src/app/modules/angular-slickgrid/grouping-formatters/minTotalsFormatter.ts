import { Column, GroupTotalsFormatter } from './../models/index';
import { formatNumber } from '../services/utilities';

export const minTotalsFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  let minDecimal;
  let maxDecimal;
  const field = columnDef.field || '';
  const val = totals.min && totals.min[field];
  const params = columnDef && columnDef.params;
  const prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const displayNegativeWithParentheses = params && params.displayNegativeWithParentheses;

  if (params && params.minDecimal !== undefined) {
    minDecimal = params.minDecimal;
  }
  if (params && params.maxDecimal !== undefined) {
    maxDecimal = params.maxDecimal;
  }

  if (val != null && !isNaN(+val)) {
    const formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeWithParentheses);
    return `${prefix}${formattedNumber}${suffix}`;
  }
  return '';
};
