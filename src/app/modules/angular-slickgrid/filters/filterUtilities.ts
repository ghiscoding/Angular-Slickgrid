import { OperatorString } from '../models/operatorString';
import { htmlEncodedStringWithPadding } from '../services/utilities';

/**
 * Create and return a select dropdown HTML element with a list of Operators with descriptions
 * @param {Array<Object>} optionValues - list of operators and their descriptions
 * @returns {Object} selectElm - Select Dropdown HTML Element
 */
export function buildSelectOperator(optionValues: Array<{ operator: OperatorString, description: string }>): HTMLSelectElement {
  const selectElm = document.createElement('select');
  selectElm.className = 'form-control';

  for (const option of optionValues) {
    const selectOption = document.createElement('option');
    selectOption.value = option.operator;
    selectOption.innerHTML = `${htmlEncodedStringWithPadding(option.operator, 3)}${option.description}`;
    selectElm.appendChild(selectOption);
  }

  return selectElm;
}