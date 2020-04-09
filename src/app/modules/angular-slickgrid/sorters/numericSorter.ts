import { Column, Sorter } from './../models/index';

export const numericSorter: Sorter = (value1: any, value2: any, sortDirection: number, sortColumn?: Column) => {
  const checkForUndefinedValues = sortColumn && sortColumn.valueCouldBeUndefined || false;
  const x = (isNaN(value1) || value1 === '' || value1 === null || (checkForUndefinedValues && value1 === undefined)) ? -99e+10 : parseFloat(value1);
  const y = (isNaN(value2) || value2 === '' || value2 === null || (checkForUndefinedValues && value2 === undefined)) ? -99e+10 : parseFloat(value2);
  return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
};
