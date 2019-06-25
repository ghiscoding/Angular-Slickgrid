import { FilterCondition, FilterConditionOption } from '../models/index';
import { compareObjects } from './filterUtilities';

export const objectFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0] || '');

  if (!searchTerm && !options.operator) {
    return true;
  }

  switch (options.operator) {
    case '!=':
    case '<>':
    case 'NE':
      return !compareObjects(options.cellValue, searchTerm, options.dataKey);
    case '=':
    case '==':
    case 'EQ':
    default:
      return compareObjects(options.cellValue, searchTerm, options.dataKey);
  }
};
