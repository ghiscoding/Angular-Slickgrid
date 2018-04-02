import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const dollarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) =>
  isNaN(+value) ? '' : `$${decimalFormatted(value, 2, 4)}`;
