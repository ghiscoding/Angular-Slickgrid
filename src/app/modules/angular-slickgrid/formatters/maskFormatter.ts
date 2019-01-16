
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

  if (value && mask) {
    let i = 0;
    const v = value.toString();
    return mask.replace(/[09A]/gi, (match) => {
      // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
      if (
        ((match === '0' || match === '9') && /\d*/g.test(v[i]))    // mask is 0 or 9 and value is a digit
        || (match.toUpperCase() === 'A' && /[^\d]*/gi.test(v[i]))  // OR mask is an "A" and value is non-digit
      ) {
        return v[i++] || '';
      }
      return '';
    });
  }
  return '';
};
