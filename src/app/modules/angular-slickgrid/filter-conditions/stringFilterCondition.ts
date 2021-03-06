import { FilterCondition, FilterConditionOption, OperatorString, OperatorType, SearchTerm } from '../models/index';
import { testFilterCondition } from './filterUtilities';


/** Execute filter condition check on each cell */
export const executeStringFilterCondition: FilterCondition = ((options: FilterConditionOption, parsedSearchValues: string[]) => {
  let [searchValue1, searchValue2] = parsedSearchValues;

  if (searchValue1 === undefined && !options.operator) {
    return true;
  }

  // make sure the cell value is a string by casting it when possible
  options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();

  // make both the cell value and search value lower for case insensitive comparison
  const cellValue = options.cellValue.toLowerCase();
  if (typeof searchValue1 === 'string') {
    searchValue1 = searchValue1.toLowerCase();
  }
  if (typeof searchValue2 === 'string') {
    searchValue2 = searchValue2.toLowerCase();
  }

  if (searchValue1 !== undefined && searchValue2 !== undefined) {
    let operator = options && options.operator || options.defaultFilterRangeOperator;
    if (operator !== OperatorType.rangeInclusive && operator !== OperatorType.rangeExclusive) {
      operator = options.defaultFilterRangeOperator;
    }
    const isInclusive = operator === OperatorType.rangeInclusive;
    const searchResult1 = testStringCondition((isInclusive ? '>=' : '>'), cellValue, searchValue1, options.searchInputLastChar);
    const searchResult2 = testStringCondition((isInclusive ? '<=' : '<'), cellValue, searchValue2, options.searchInputLastChar);
    return searchResult1 && searchResult2;
  }
  const searchResult1 = testStringCondition(options.operator, cellValue, searchValue1, options.searchInputLastChar);
  return searchResult1;
}) as FilterCondition;

/**
 * From our search filter value(s), get the parsed value(s).
 * This is called only once per filter before running the actual filter condition check on each cell
 */
export function getFilterParsedText(inputSearchTerms: SearchTerm[] | undefined): SearchTerm[] {
  const defaultSearchTerm = ''; // when nothing is provided, we'll default to 0
  const searchTerms = Array.isArray(inputSearchTerms) && inputSearchTerms || [defaultSearchTerm];
  const parsedSearchValues: string[] = [];
  let searchValue1;
  let searchValue2;
  if (searchTerms.length === 2 || (typeof searchTerms[0] === 'string' && (searchTerms[0] as string).indexOf('..') > 0)) {
    const searchValues = (searchTerms.length === 2) ? searchTerms : (searchTerms[0] as string).split('..');
    searchValue1 = `${Array.isArray(searchValues) ? searchValues[0] : ''}`;
    searchValue2 = `${Array.isArray(searchValues) ? searchValues[1] : ''}`;
  } else {
    const parsedSearchValue = (Array.isArray(inputSearchTerms) && inputSearchTerms.length > 0) ? inputSearchTerms[0] : '';
    searchValue1 = parsedSearchValue === undefined || parsedSearchValue === null ? '' : `${parsedSearchValue}`; // make sure it's a string
  }

  if (searchValue1 !== undefined && searchValue2 !== undefined) {
    parsedSearchValues.push(searchValue1 as string, searchValue2 as string);
  } else if (searchValue1 !== undefined) {
    parsedSearchValues.push(searchValue1 as string);
  }
  return parsedSearchValues;
}

/** Execute the filter string test condition, returns a boolean */
function testStringCondition(operator: OperatorType | OperatorString, cellValue: string, searchValue: string, searchInputLastChar?: string): boolean {
  if (operator === '*' || operator === OperatorType.endsWith) {
    return cellValue.endsWith(searchValue);
  } else if ((operator === '' && searchInputLastChar === '*') || operator === OperatorType.startsWith) {
    return cellValue.startsWith(searchValue);
  } else if (operator === '' || operator === OperatorType.contains) {
    return (cellValue.indexOf(searchValue) > -1);
  } else if (operator === '<>' || operator === OperatorType.notContains) {
    return (cellValue.indexOf(searchValue) === -1);
  }
  return testFilterCondition(operator || '==', cellValue, searchValue);
}
