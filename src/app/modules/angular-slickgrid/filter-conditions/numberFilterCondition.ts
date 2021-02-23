import { FilterCondition, FilterConditionOption, OperatorType, SearchTerm } from '../models/index';
import { isNumber } from '../services/utilities';
import { testFilterCondition } from './filterUtilities';

/** Execute filter condition check on each cell */
export const executeNumberFilterCondition: FilterCondition = ((options: FilterConditionOption, parsedSearchValues: number[]) => {
  const cellValue = parseFloat(options.cellValue);
  const [searchValue1, searchValue2] = parsedSearchValues;

  if (searchValue1 === undefined && !options.operator) {
    return true;
  }

  if (searchValue1 !== undefined && searchValue2 !== undefined) {
    const isInclusive = (options && options.operator) === OperatorType.rangeInclusive;
    const resultCondition1 = testFilterCondition((isInclusive ? '>=' : '>'), cellValue, +searchValue1);
    const resultCondition2 = testFilterCondition((isInclusive ? '<=' : '<'), cellValue, +searchValue2);
    return (resultCondition1 && resultCondition2);
  }
  return testFilterCondition(options.operator || '==', cellValue, +searchValue1);
}) as FilterCondition;

/**
 * From our search filter value(s), get the parsed value(s).
 * This is called only once per filter before running the actual filter condition check on each cell
 */
export function getFilterParsedNumbers(inputSearchTerms: SearchTerm[] | undefined): number[] {
  const defaultSearchTerm = 0; // when nothing is provided, we'll default to 0
  const searchTerms = Array.isArray(inputSearchTerms) && inputSearchTerms || [defaultSearchTerm];
  const parsedSearchValues: number[] = [];
  let searchValue1;
  let searchValue2;

  if (searchTerms.length === 2 || (typeof searchTerms[0] === 'string' && (searchTerms[0] as string).indexOf('..') > 0)) {
    const searchValues = (searchTerms.length === 2) ? searchTerms : (searchTerms[0] as string).split('..');
    searchValue1 = parseFloat(Array.isArray(searchValues) ? searchValues[0] as string : '');
    searchValue2 = parseFloat(Array.isArray(searchValues) ? searchValues[1] as string : '');
  } else {
    searchValue1 = parseFloat(searchTerms[0] as string);
  }

  if (isNumber(searchValue1, true) && isNumber(searchValue2, true)) {
    parsedSearchValues.push(searchValue1 as number, searchValue2 as number);
  } else if (isNumber(searchValue1, true)) {
    parsedSearchValues.push(searchValue1 as number);
  }
  return parsedSearchValues;
}
