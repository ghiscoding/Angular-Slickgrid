import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const checkmarkFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  value ? `<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>` : '';
