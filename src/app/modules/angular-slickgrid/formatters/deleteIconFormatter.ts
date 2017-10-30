import { Formatter } from './../models/formatter.interface';

export const deleteIconFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any) =>
  `<i class="fa fa-times pointer" aria-hidden="true"></i>`;
