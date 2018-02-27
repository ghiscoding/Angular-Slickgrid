import { FilterCondition, FilterConditionOption } from '../models/index';
import { testFilterCondition } from './filterUtilities';

export const collectionSearchFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  // multiple-select will always return text, so we should make our cell values text as well
  const cellValue = options.cellValue + '';

  return testFilterCondition(options.operator || 'IN', cellValue, options.searchTerms || []);
};
