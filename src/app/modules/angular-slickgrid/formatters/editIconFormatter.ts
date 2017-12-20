import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const editIconFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  `<i class="fa fa-pencil pointer edit-icon" aria-hidden="true"></i>`;
