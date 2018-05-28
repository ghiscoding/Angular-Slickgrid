import { FilterCondition, FilterConditionOption } from './../models/index';

function parseBoolean(str: number | string) {
  return /(true|1)/i.test(str + '');
}

export const booleanFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
  return parseBoolean(options.cellValue) === parseBoolean(searchTerm);
};
