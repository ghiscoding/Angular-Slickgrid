import { FilterCondition, FilterConditionOption } from '../models';
import { testFilterCondition } from './filterUtilities';

export const stringFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  // make sure the cell value is a string by casting it when possible
  options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();

  // make both the cell value and search value lower for case insensitive comparison
  const cellValue = options.cellValue.toLowerCase();
  const searchTerm = (typeof options.searchTerm === 'string') ? options.searchTerm.toLowerCase() : options.searchTerm;

  if (options.operator === '*') {
    return cellValue.endsWith(searchTerm);
  } else if (options.operator === '' && options.cellValueLastChar === '*') {
    return cellValue.startsWith(searchTerm);
  } else if (options.operator === '') {
    return cellValue.includes(searchTerm);
  }
  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
