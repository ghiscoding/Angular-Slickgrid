import { FilterCondition, FilterConditionOption } from './../models';
import { testFilterCondition } from './filterUtilities';

function parseBoolean(str: number | string) {
  return /(true|1)/i.test(str + '');
}

export const booleanFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  return parseBoolean(options.cellValue) === parseBoolean(options.searchTerm);
};
