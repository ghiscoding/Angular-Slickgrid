import { FilterCondition, FilterConditionOption } from '../models';
import { testFilterCondition } from './filterUtilities';

export const numberFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const cellValue = parseFloat(options.cellValue);
  const searchTerm = (typeof options.searchTerm === 'string') ? parseFloat(options.searchTerm) : options.searchTerm;

  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
