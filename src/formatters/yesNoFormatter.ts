import { Formatter } from './../models/formatter.interface';

export const yesNoFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any): string =>
  value ? 'Yes' : 'No';
