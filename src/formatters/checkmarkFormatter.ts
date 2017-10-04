import { Formatter } from './../models/formatter.interface';

export const checkmarkFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any) =>
  value ? `<i class="fa fa-check" aria-hidden="true"></i>` : '';
