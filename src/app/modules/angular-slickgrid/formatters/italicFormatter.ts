import { Column, Formatter } from './../models/index';

export const italicFormatter: Formatter = (row: number, cell: number, value: any) => {
  return value ? `<i>${value}</i>` : '';
};
