import { FilterCondition, FilterConditionOption, OperatorType } from '../models/index';
import { testFilterCondition } from './filterUtilities';

export const stringFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  // make sure the cell value is a string by casting it when possible
  options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();

  // make both the cell value and search value lower for case insensitive comparison
  const cellValue = options.cellValue.toLowerCase();
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms[0] || [];
  const searchTerm = typeof searchTerms[0] === 'string' ? searchTerms[0].toLowerCase() : searchTerms[0];

  if (options.operator === '*' || options.operator === OperatorType.endsWith) {
    return cellValue.endsWith(searchTerm);
  } else if ((options.operator === '' && options.cellValueLastChar === '*') || options.operator === OperatorType.startsWith) {
    return cellValue.startsWith(searchTerm);
  } else if (options.operator === '') {
    return cellValue.includes(searchTerm);
  }
  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
