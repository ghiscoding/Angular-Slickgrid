
import { Column, Formatter } from './../models/index';

/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 */
export const maskFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const params = columnDef.params || {};
  const mask = params.mask;

  if (!mask) {
    throw new Error(`You must provide a "mask" via the generic "params" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}`);
  }

  if (value) {
    let i = 0;
    const v = value.toString();
    return mask.replace(/[09A]/gi, () => v[i++] || '');
  }
  return value;
};
