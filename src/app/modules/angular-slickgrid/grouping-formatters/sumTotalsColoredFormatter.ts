import { Column, GroupTotalsFormatter } from './../models/index';

export const sumTotalsColoredFormatter: GroupTotalsFormatter = (totals: any, columnDef: Column, grid?: any) => {
  const field = columnDef.field || '';
  const val = totals.sum && totals.sum[field];
  const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
  const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';

  if (isNaN(+val)) {
    return '';
  } else if (val >= 0) {
    return `<span style="color:green;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}</span>`;
  } else {
    return `<span style="color:red;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}</span>`;
  }
};
