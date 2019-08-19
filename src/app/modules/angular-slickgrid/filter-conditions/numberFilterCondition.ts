import { FilterCondition, FilterConditionOption, OperatorType } from '../models/index';
import { testFilterCondition } from './filterUtilities';

export const numberFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const cellValue = parseFloat(options.cellValue);
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms || [0];

  let isRangeSearch = false;
  let searchValue1;
  let searchValue2;

  if (searchTerms.length === 2 || (typeof searchTerms[0] === 'string' && (searchTerms[0] as string).indexOf('..') > 0)) {
    isRangeSearch = true;
    const searchValues = (searchTerms.length === 2) ? searchTerms : (searchTerms[0] as string).split('..');
    searchValue1 = parseFloat(Array.isArray(searchValues) && searchValues[0] + '');
    searchValue2 = parseFloat(Array.isArray(searchValues) && searchValues[1] + '');
  } else {
    searchValue1 = searchTerms[0];
  }

  if (!searchValue1 && !options.operator) {
    return true;
  }

  if (isRangeSearch) {
    const isInclusive = options.operator && options.operator === OperatorType.rangeInclusive;
    const resultCondition1 = testFilterCondition((isInclusive ? '>=' : '>'), cellValue, searchValue1);
    const resultCondition2 = testFilterCondition((isInclusive ? '<=' : '<'), cellValue, searchValue2);
    return (resultCondition1 && resultCondition2);
  }
  return testFilterCondition(options.operator || '==', cellValue, searchValue1);
};
