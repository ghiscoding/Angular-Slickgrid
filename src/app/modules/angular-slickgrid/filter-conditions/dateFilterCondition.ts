import { FieldType, FilterCondition, FilterConditionOption, OperatorType } from '../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export const dateFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms || [];
  const filterSearchType = options.filterSearchType || FieldType.dateIso;
  const searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);

  let isRangeSearch = false;
  let dateSearch1;
  let dateSearch2;

  // return when cell value is not a valid date
  if (searchTerms.length === 0 || searchTerms[0] === '' || searchTerms[0] === null || !moment(options.cellValue, moment.ISO_8601).isValid()) {
    return false;
  }

  // cell value in moment format
  const dateCell = moment(options.cellValue);

  if (searchTerms.length === 2 || ((searchTerms[0] as string).indexOf('..') > 0)) {
    isRangeSearch = true;
    const searchValues = (searchTerms.length === 2) ? searchTerms : (searchTerms[0] as string).split('..');
    const searchValue1 = (Array.isArray(searchValues) && searchValues[0] || '') as Date | string;
    const searchValue2 = (Array.isArray(searchValues) && searchValues[1] || '') as Date | string;
    const searchTerm1 = moment(searchValue1);
    const searchTerm2 = moment(searchValue2);

    // return if any of the 2 values are invalid dates
    if (!moment(searchTerm1, searchDateFormat, true).isValid() || !moment(searchTerm2, searchDateFormat, true).isValid()) {
      return false;
    }
    dateSearch1 = moment(searchTerm1);
    dateSearch2 = moment(searchTerm2);
  } else {
    // return if the search term is an invalid date
    if (!moment(searchTerms[0] as Date | string, searchDateFormat, true).isValid()) {
      return false;
    }
    dateSearch1 = moment(searchTerms[0] as Date | string);
  }

  // run the filter condition with date in Unix Timestamp format
  if (isRangeSearch) {
    const isInclusive = options.operator && options.operator === OperatorType.rangeInclusive;
    const resultCondition1 = testFilterCondition((isInclusive ? '>=' : '>'), parseInt(dateCell.format('X'), 10), parseInt(dateSearch1.format('X'), 10));
    const resultCondition2 = testFilterCondition((isInclusive ? '<=' : '<'), parseInt(dateCell.format('X'), 10), parseInt(dateSearch2.format('X'), 10));
    return (resultCondition1 && resultCondition2);
  }
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch1.format('X'), 10));
};
