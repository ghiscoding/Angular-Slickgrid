import { Column, Formatter } from './../models/index';
import { decimalFormatted } from './../services/utilities';

export const decimalFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const params = columnDef.params || {};
  const minDecimalPlaces = params.minDecimalPlaces || params.decimalPlaces || 2;
  const maxDecimalPlaces = params.maxDecimalPlaces || 2;
  const isNumber = (value === null || value === undefined) ? false : !isNaN(+value);

  return !isNumber ? value : `${decimalFormatted(value, minDecimalPlaces, maxDecimalPlaces)}`;
};

