import { Formatter } from './../models/index';

export const centerFormatter: Formatter = (_row: number, _cell: number, value: string | any): string => {
  let outputValue = value;

  if (value === null || value === undefined) {
    outputValue = '';
  }
  return `<center>${outputValue}</center>`;
};
