import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const progressBarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any): string => {
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
    color = 'danger';
  } else if (inputNumber < 70) {
    color = 'warning';
  } else {
    color = 'success';
  }

  const output = `<div class="progress">
    <div class="progress-bar progress-bar-${color} bg-${color}" role="progressbar" aria-valuenow="${inputNumber}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${inputNumber}%;">
    ${inputNumber}%
    </div>
  </div>`;

  return output.replace(/\s{2,}/g, ' ').trim();
};
