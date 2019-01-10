import { FilterCondition, FilterConditionOption } from '../models/index';
import { compareObjects } from './filterUtilities';

export const objectFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0] || '');

  if (!searchTerm && (!options.operator || options.operator === '')) {
    return true;
  }
  return compareObjects(options.cellValue, searchTerm, options.dataKey);
};
