import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const lowercaseFormatter: Formatter = (row: number, cell: number, value: string | any, columnDef: Column, dataContext: any): string => {
  // make sure the value is a string
  if (value !== undefined && typeof value !== 'string') {
    value = value + '';
  }
  return value ? value.toLowerCase() : '';
};
