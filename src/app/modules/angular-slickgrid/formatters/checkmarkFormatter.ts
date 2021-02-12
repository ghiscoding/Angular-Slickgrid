import { Formatter } from './../models/formatter.interface';
import { isNumber } from '../services/utilities';

export const checkmarkFormatter: Formatter = (row: number, cell: number, value: any) => {
  let isChecked = false;

  if (isNumber(value)) {
    value = +value; // convert to number before doing next condition
  }

  if (value === true || (isNumber && +value > 0) || (typeof value === 'string' && value.length > 0 && value.toLowerCase() !== 'false' && value !== '0')) {
    isChecked = true;
  }

  return isChecked ? `<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>` : '';
};
