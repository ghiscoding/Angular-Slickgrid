import { Column, Formatter } from './../models/index';

export const multipleFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const params = columnDef.params || {};
  if (!params.formatters || !Array.isArray(params.formatters)) {
    throw new Error(`The multiple formatter requires the "formatters" to be provided as a column params.
    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }`);
  }
  const formatters: Formatter[] = params.formatters;
  let formattedValue = '';
  for (const formatter of formatters) {
    formattedValue = formatter(row, cell, value, columnDef, dataContext);
  }
  return formattedValue;
};
