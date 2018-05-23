import { FieldType, FilterCondition, FilterConditionOption } from '../models/index';
import { testFilterCondition } from './filterUtilities';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
const FORMAT = mapMomentDateFormatWithFieldType(FieldType.dateUs);

export const dateUsFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms[0] || [];
  if (!moment(options.cellValue, FORMAT, true).isValid() || !moment(searchTerms[0], FORMAT, true).isValid()) {
    return true;
  }
  const dateCell = moment(options.cellValue, FORMAT, true);
  const dateSearch = moment(searchTerms[0], FORMAT, true);

  // run the filter condition with date in Unix Timestamp format
  return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
};
