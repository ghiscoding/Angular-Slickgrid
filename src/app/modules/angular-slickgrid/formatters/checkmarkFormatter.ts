import { Formatter } from './../models/formatter.interface';
import { isNumber } from '../services/utilities';

export const checkmarkFormatter: Formatter = (row: number, cell: number, value: any) => {
  let isChecked = false;
  const isValidNumber = isNumber(value);

  if (isValidNumber) {
    value = +value; // convert to number before doing next condition
  }

  if (value === true || (isValidNumber && +value > 0) || (typeof value === 'string' && value.length > 0 && value.toLowerCase() !== 'false' && value !== '0')) {
    isChecked = true;
  }

  return isChecked ? `<i class="fa fa-check checkmark-icon" aria-hidden="true"></i>` : '';
};
