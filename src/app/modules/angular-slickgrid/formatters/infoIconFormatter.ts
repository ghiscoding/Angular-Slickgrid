import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const infoIconFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  `<i class="fa fa-info-circle pointer info-icon" aria-hidden="true"></i>`;
