import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const percentFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  if (!isNumber) {
    return value;
  }

  const outputValue = value * 100;
  return `${outputValue}%`;
};
