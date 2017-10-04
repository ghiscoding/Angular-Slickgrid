import { Formatter } from './../models/formatter.interface';

export const percentCompleteFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any): string => {
  if (value === null || value === '') {
    return '-';
  } else if (value < 50) {
    return `<span style='color:red;font-weight:bold;'>${value}%</span>`;
  } else {
    return `<span style='color:green'>${value}%</span>`;
  }
};
