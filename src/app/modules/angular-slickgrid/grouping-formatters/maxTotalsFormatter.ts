import { Column, GroupTotalsFormatter } from './../models/index';

export const maxTotalsFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.max && totals.max[field];
  const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
  const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';

  if (val != null) {
    return prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix;
  }
  return '';
};
