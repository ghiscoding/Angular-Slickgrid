import { Formatter } from './../models/formatter.interface';

export const percentCompleteBarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any): string => {
  if (value === null || value === '') {
    return '';
  }

  let color;

  if (value < 30) {
    color = 'red';
  } else if (value < 70) {
    color = 'silver';
  } else {
    color = 'green';
  }

  return `<span class="percent-complete-bar" style="background:${color}; width:${value}%"></span>`;
};
