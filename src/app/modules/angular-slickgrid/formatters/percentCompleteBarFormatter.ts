import { Column, Formatter } from './../models/index';

export const percentCompleteBarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  if (!isNumber) {
    return '';
  }

  let color = '';
  let inputNumber = parseFloat(value);
  if (inputNumber > 100) {
    inputNumber = 100;
  }

  if (inputNumber < 30) {
    color = 'red';
  } else if (inputNumber < 70) {
    color = 'silver';
  } else {
    color = 'green';
  }

  return `<span class="percent-complete-bar" style="background:${color}; width:${inputNumber}%"></span>`;
};
