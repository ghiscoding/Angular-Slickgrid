import { Column, Formatter } from './../models/index';

export const multipleFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  const params = columnDef.params || {};
  if (!params.formatters || !Array.isArray(params.formatters)) {
    throw new Error(`The multiple formatter requires the "formatters" to be provided as a column params.
    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }`);
  }
  const formatters: Formatter[] = params.formatters;

  // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
  // they are piped and executed in sequences
  let currentValue = value;
  for (const formatter of formatters) {
    currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
  }
  return currentValue;
};
