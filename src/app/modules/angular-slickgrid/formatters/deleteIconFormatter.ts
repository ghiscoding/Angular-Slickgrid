import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const deleteIconFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  `<i class="fa fa-trash pointer delete-icon" aria-hidden="true"></i>`;
