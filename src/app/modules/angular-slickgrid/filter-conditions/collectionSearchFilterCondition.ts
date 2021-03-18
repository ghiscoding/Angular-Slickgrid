import { FilterCondition, FilterConditionOption } from '../models/index';
import { testFilterCondition } from './filterUtilities';

/**
 * Execute filter condition check on each cell.
 * This is used only by the Select Single/Multiple Filter which uses the "multiple-select.js" 3rd party lib which always provide values as strings
 */
export const executeCollectionSearchFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  // multiple-select will always return text, so we should make our cell values text as well
  const filterOperator = options.operator;
  let cellValue: string | string[];
  if (Array.isArray(options.cellValue) && (filterOperator === 'IN_COLLECTION' || filterOperator === 'NOT_IN_COLLECTION')) {
    cellValue = (!!options.cellValue.length ? options.cellValue.map(value => `${value}`) : []);
  } else {
    cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : `${options.cellValue}`;
  }

  return testFilterCondition(filterOperator || 'IN', cellValue, options.searchTerms || []);
};
