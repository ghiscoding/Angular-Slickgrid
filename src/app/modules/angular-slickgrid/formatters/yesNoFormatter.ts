import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const yesNoFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string =>
  value ? 'Yes' : 'No';
