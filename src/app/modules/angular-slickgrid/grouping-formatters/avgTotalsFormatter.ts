import { Column, GroupTotalsFormatter } from './../models/index';
import { decimalFormatted } from '../services/utilities';
import { getValueFromParamsOrGridOptions } from '../formatters/formatterUtility';

export const avgTotalsFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  let val = totals.avg && totals.avg[field];
  const params = columnDef && columnDef.params;
  let prefix = params && params.groupFormatterPrefix || '';
  const suffix = params && params.groupFormatterSuffix || '';
  const minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
  const maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
  const displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (val != null && !isNaN(+val)) {
    if (val < 0) {
      val = Math.abs(val);
      if (!displayNegativeNumberWithParentheses) {
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
