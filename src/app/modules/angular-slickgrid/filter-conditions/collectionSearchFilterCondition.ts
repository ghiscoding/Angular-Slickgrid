import { FieldType, FilterCondition, FilterConditionOption } from '../models';
import { testFilterCondition } from './filterUtilities';

export const collectionSearchFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const cellValue = options.cellValue + ''; // multi-select will always return text, so we should make our cell values text as well

  return testFilterCondition(options.operator || 'IN', cellValue, options.listTerm || []);
};
