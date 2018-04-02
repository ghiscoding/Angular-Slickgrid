import { Column, GroupTotalsFormatter } from './../models/index';

export const avgTotalsPercentageFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.avg && totals.avg[field];
  const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
  const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';

  if (val != null) {
    return prefix + Math.round(val) + '%' + suffix;
  }
  return '';
};
