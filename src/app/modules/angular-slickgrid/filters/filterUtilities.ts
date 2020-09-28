import { OperatorString } from '../models/operatorString';
import { htmlEncodedStringWithPadding } from '../services/utilities';

export function buildSelectOperatorHtmlString(optionValues: Array<{ operator: OperatorString, description: string }>) {
  let optionValueString = '';
  optionValues.forEach(option => {
    optionValueString += `<option value="${option.operator}">${htmlEncodedStringWithPadding(option.operator, 3)}${option.description}</option>`;
  });

  return `<select class="form-control">${optionValueString}</select>`;
}
