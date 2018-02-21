import { FilterCondition, FilterConditionOption } from './../models';

function parseBoolean(str: number | string) {
  return /(true|1)/i.test(str + '');
}

export const booleanFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  return parseBoolean(options.cellValue) === parseBoolean(options.searchTerm);
};
