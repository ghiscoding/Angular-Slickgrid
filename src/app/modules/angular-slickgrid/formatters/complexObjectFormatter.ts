import { Formatter } from './../models/formatter.interface';

export const complexObjectFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  if (!columnDef) {
    return '';
  }
  const complexField = columnDef.field || '';
  return complexField.split('.').reduce((obj, i) => obj[i], dataContext);
};
