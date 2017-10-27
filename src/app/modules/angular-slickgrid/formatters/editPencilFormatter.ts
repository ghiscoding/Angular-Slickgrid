import { Formatter } from './../models/formatter.interface';

export const editPencilFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any) =>
  `<i class="fa fa-pencil pointer" aria-hidden="true"></i>`;
