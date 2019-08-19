import { Sorter } from './../models/sorter.interface';

export const numericSorter: Sorter = (value1: any, value2: any, sortDirection: number) => {
  const x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
  const y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
  return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};
