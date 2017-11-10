import { Formatter } from './../models/formatter.interface';

export const arrayToCsvFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
  if (value && Array.isArray(value)) {
    return value.join(', ');
  }
  return '';
};
