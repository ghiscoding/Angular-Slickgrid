import { FilterCondition, FilterConditionOption, OperatorType, SearchTerm } from '../models/index';
import { testFilterCondition } from './filterUtilities';

/** Execute filter condition check on each cell */
export const executeStringFilterCondition: FilterCondition = (options: FilterConditionOption, parsedSearchValue: string | undefined) => {
  if (parsedSearchValue === undefined && !options.operator) {
    return true;
  }

  // make sure the cell value is a string by casting it when possible
  options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();

  // make both the cell value and search value lower for case insensitive comparison
  const cellValue = options.cellValue.toLowerCase();
  if (typeof parsedSearchValue === 'string') {
    parsedSearchValue = parsedSearchValue.toLowerCase();
  }

  if (options.operator === '*' || options.operator === OperatorType.endsWith) {
    return cellValue.endsWith(parsedSearchValue);
  } else if ((options.operator === '' && options.searchInputLastChar === '*') || options.operator === OperatorType.startsWith) {
    return cellValue.startsWith(parsedSearchValue);
  } else if (options.operator === '' || options.operator === OperatorType.contains) {
    return (cellValue.indexOf(parsedSearchValue) > -1);
  }
  return testFilterCondition(options.operator || '==', cellValue, parsedSearchValue);
};

/**
 * From our search filter value(s), get the parsed value(s).
 * This is called only once per filter before running the actual filter condition check on each cell
 */
export function getFilterParsedText(inputSearchTerms: SearchTerm[] | undefined): SearchTerm {
  let parsedSearchValue = (Array.isArray(inputSearchTerms) && inputSearchTerms.length > 0) ? inputSearchTerms[0] : '';
  parsedSearchValue = parsedSearchValue === undefined || parsedSearchValue === null ? '' : `${parsedSearchValue}`; // make sure it's a string
  return parsedSearchValue;
}
