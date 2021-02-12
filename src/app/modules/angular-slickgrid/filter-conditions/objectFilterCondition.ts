import { FilterCondition, FilterConditionOption, SearchTerm } from '../models/index';
import { compareObjects } from './filterUtilities';

/** Execute filter condition check on each cell */
export const executeObjectFilterCondition: FilterCondition = (options: FilterConditionOption, parsedSearchValue: SearchTerm | undefined) => {
  if (parsedSearchValue === undefined && !options.operator) {
    return true;
  }

  const operator = (options.operator || '').toUpperCase();

  switch (operator) {
    case '!=':
    case '<>':
    case 'NE':
      return !compareObjects(options.cellValue, parsedSearchValue, options.dataKey);
    case '=':
    case '==':
    case 'EQ':
    default:
      return compareObjects(options.cellValue, parsedSearchValue, options.dataKey);
  }
};

/**
 * From our search filter value(s), get the parsed value(s).
 * This is called only once per filter before running the actual filter condition check on each cell
 */
export function getFilterParsedObjectResult(inputSearchTerms: SearchTerm[] | undefined): SearchTerm {
  const parsedSearchValue = (Array.isArray(inputSearchTerms) && inputSearchTerms.length > 0) ? inputSearchTerms[0] : '';
  return parsedSearchValue || '';
}
