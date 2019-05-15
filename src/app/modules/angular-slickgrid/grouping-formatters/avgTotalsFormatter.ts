import { Column, GroupTotalsFormatter } from './../models/index';
import { decimalFormatted } from '../services/utilities';

export const avgTotalsFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  let minDecimal;
  let maxDecimal;
  const field = columnDef.field || '';
  let val = totals.avg && totals.avg[field];
  const params = columnDef && columnDef.params;
  let prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const displayNegativeWithParentheses = params && params.displayNegativeWithParentheses;

  if (params && params.minDecimal !== undefined) {
    minDecimal = params.minDecimal;
  }
  if (params && params.maxDecimal !== undefined) {
    maxDecimal = params.maxDecimal;
  }

  if (val != null && !isNaN(+val)) {
    if (val < 0) {
      val = Math.abs(val);
      if (!displayNegativeWithParentheses) {
        prefix += '-';
      } else {
        if (isNaN(minDecimal) && isNaN(maxDecimal)) {
          return `${prefix}(${Math.round(val)})${suffix}`;
        }
        return `${prefix}(${decimalFormatted(val, minDecimal, maxDecimal)})${suffix}`;
      }
    }

    if (isNaN(minDecimal) && isNaN(maxDecimal)) {
      return `${prefix}${Math.round(val)}${suffix}`;
    }
    return `${prefix}${decimalFormatted(val, minDecimal, maxDecimal)}${suffix}`;
  }
  return '';
};
