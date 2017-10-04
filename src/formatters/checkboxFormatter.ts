import { Formatter } from './../models/formatter.interface';

export const checkboxFormatter: Formatter = (row, cell, value, columnDef, dataContext) =>
  value ? '&#x2611;' : '';
