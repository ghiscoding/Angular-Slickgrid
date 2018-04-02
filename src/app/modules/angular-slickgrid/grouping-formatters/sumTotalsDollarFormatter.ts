import { Column, GroupTotalsFormatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const sumTotalsDollarFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.sum && totals.sum[field];
  const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
  const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';

  if (val != null) {
    return prefix + '$' + decimalFormatted(val, 2, 2) + suffix;
  }
  return '';
};
