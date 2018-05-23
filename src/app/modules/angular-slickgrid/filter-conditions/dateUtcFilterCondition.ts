import { FilterCondition, FilterConditionOption } from '../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export const dateUtcFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms[0] || [];
  const searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType || options.fieldType);
  if (!moment(options.cellValue, moment.ISO_8601).isValid() || !moment(searchTerms[0], searchDateFormat, true).isValid()) {
    return true;
  }
  const dateCell = moment(options.cellValue, moment.ISO_8601, true);
  const dateSearch = moment(searchTerms[0], searchDateFormat, true);

  // run the filter condition with date in Unix Timestamp format
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
