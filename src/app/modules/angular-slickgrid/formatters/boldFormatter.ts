import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const boldFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  if (!isNumber) {
    return '';
  } else if (value >= 0) {
    return `<span style="font-weight: bold">${decimalFormatted(value, 2, 2)}$</span>`;
  } else {
    return `<span style="font-weight: bold">${decimalFormatted(value, 2, 2)}$</span>`;
  }
};
