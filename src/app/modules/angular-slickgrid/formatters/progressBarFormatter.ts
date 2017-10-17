import { Formatter } from './../models/formatter.interface';

export const progressBarFormatter: Formatter = (row: number, cell: number, value: any, columnDef: any, dataContext: any): string => {
  if (value === null || value === '') {
    return '';
  }

  let color;

  if (value < 30) {
    color = 'danger';
  } else if (value < 70) {
    color = 'warning';
  } else {
    color = 'success';
  }

  return `<div class="progress">
    <div class="progress-bar progress-bar-${color}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${value}%;">
    ${value}%
    </div>
  </div>`;
};
