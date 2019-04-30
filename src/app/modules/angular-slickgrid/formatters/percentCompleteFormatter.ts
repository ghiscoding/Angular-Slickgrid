import { Column, Formatter } from './../models/index';

export const percentCompleteFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);

  if (!isNumber) {
    return value;
  } else if (value < 50) {
    return `<span style='color:red;font-weight:bold;'>${value}%</span>`;
  } else {
    const outputValue = value > 100 ? 100 : value;
    return `<span style='color:green'>${outputValue}%</span>`;
  }
};
