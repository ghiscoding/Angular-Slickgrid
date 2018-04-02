import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const dollarColoredFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  if (isNaN(+value)) {
    return '';
  } else if (value >= 0) {
    return `<span style="color:green;">$${decimalFormatted(value, 2, 2)}</span>`;
  } else {
    return `<span style="color:red;">$${decimalFormatted(value, 2, 2)}</span>`;
  }
};
