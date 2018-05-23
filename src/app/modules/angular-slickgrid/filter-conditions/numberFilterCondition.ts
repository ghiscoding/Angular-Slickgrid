import { FilterCondition, FilterConditionOption } from '../models/index';
import { testFilterCondition } from './filterUtilities';

export const numberFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const cellValue = parseFloat(options.cellValue);
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms[0] || [];
  const searchTerm = typeof searchTerms[0] === 'string' ? parseFloat(searchTerms[0]) : searchTerms[0];

  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
