import { Formatter } from './../models/index';

export const alignRightFormatter: Formatter = (_row: number, _cell: number, value: string | any): string => {
  let outputValue = value;

  if (value === null || value === undefined) {
    outputValue = '';
  }
  return `<div style="float: right">${outputValue}</div>`;
};
