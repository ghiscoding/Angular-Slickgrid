import { FilterCondition, FilterConditionOption } from '../models/index';
import { testFilterCondition } from './filterUtilities';

export const stringFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  // make sure the cell value is a string by casting it when possible
  options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();

  // make both the cell value and search value lower for case insensitive comparison
  const cellValue = options.cellValue.toLowerCase();
  let searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || '';
  if (typeof searchTerm === 'string') {
    searchTerm = searchTerm.toLowerCase();
  }

  if (options.operator === '*' || options.operator === 'EndsWith') {
    return cellValue.endsWith(searchTerm);
  } else if ((options.operator === '' && options.cellValueLastChar === '*') || options.operator === 'StartsWith') {
    return cellValue.startsWith(searchTerm);
  } else if (options.operator === '') {
    return (cellValue.indexOf(searchTerm) > -1);
  }
  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
