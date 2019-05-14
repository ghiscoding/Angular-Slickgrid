import { Column, GroupTotalsFormatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const avgTotalsDollarFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const params = columnDef && columnDef.params;
  let val = totals && totals.avg && totals.avg[field];
  let prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const minDecimal = params && params.minDecimal !== undefined ? params.minDecimal : 2;
  const maxDecimal = params && params.maxDecimal !== undefined ? params.maxDecimal : 4;
  const displayNegativeWithParentheses = params && params.displayNegativeWithParentheses;

  if (val != null) {
    if (val < 0) {
      val = Math.abs(val);
      if (!displayNegativeWithParentheses) {
        prefix += '-';
      } else {
        return `${prefix}($${decimalFormatted(val, minDecimal, maxDecimal)})${suffix}`;
      }
    }
    return `${prefix}$${decimalFormatted(val, minDecimal, maxDecimal)}${suffix}`;
  }
  return '';
};
