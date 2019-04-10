import { Column, Formatter } from './../models/index';

export const boldFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  return value ? `<span style="font-weight: bold">${value}</span>` : '';
};
