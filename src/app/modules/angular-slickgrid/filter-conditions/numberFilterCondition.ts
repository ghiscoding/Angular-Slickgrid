import { FilterCondition, FilterConditionOption } from '../models/index';
import { testFilterCondition } from './filterUtilities';

export const numberFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const cellValue = parseFloat(options.cellValue);
  let searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
  if (typeof searchTerm === 'string') {
    searchTerm = parseFloat(searchTerm);
  }

  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
