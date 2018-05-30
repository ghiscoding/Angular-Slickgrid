import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const percentFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string => {
  if (value === null || value === '') {
    return '';
  }

  const outputValue = value > 0 ? value / 100 : 0;
  return `<span>${outputValue}%</span>`;
};
