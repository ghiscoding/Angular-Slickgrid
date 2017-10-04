import { FilterCondition } from './../models/filterCondition.interface';
import { FilterConditionOption } from './../models/filterConditionOption.interface';
import { testFilterCondition } from './filterUtilities';

export const numberFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  return testFilterCondition(options.operator || '==', parseFloat(options.cellValue), parseFloat(options.searchTerm));
};
