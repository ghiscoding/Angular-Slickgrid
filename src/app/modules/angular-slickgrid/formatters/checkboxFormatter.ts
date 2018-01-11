import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const checkboxFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  value ? '&#x2611;' : '';
