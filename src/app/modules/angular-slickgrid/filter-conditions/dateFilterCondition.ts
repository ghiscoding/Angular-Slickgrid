import { FieldType, FilterCondition, FilterConditionOption } from '../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export const dateFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
  const filterSearchType = options.filterSearchType || FieldType.dateIso;
  const searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
  if (searchTerm === null || searchTerm === '' || !moment(options.cellValue, moment.ISO_8601).isValid() || !moment(searchTerm, searchDateFormat, true).isValid()) {
    return true;
  }
  const dateCell = moment(options.cellValue);
  const dateSearch = moment(searchTerm);

  // run the filter condition with date in Unix Timestamp format
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
