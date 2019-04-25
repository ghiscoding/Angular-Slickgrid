import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const percentSymbolFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  return (isNumber) ? `${value}%` : value;
};
