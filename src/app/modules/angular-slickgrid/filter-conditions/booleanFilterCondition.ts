import { FilterCondition, FilterConditionOption } from './../models/index';
import { parseBoolean } from '../services/utilities';

export const booleanFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
  return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
};
