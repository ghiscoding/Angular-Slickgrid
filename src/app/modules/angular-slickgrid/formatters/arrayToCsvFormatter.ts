import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const arrayToCsvFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  if (value && Array.isArray(value) && value.length > 0) {
    const values = value.join(', ');
    return `<span title="${values}">${values}</span>`;
  }
  return value;
};
