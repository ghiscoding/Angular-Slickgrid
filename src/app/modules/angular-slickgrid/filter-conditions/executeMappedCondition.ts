import { booleanFilterCondition } from './booleanFilterCondition';
import { collectionSearchFilterCondition } from './collectionSearchFilterCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { objectFilterCondition } from './objectFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';

import { FieldType, FilterCondition, FilterConditionOption, OperatorType } from '../models/index';
import { mapMomentDateFormatWithFieldType } from './../services/utilities';
import { testFilterCondition } from './filterUtilities';
import * as moment_ from 'moment-mini';

const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670

export const executeMappedCondition: FilterCondition = (options: FilterConditionOption) => {
  // when using a multi-select ('IN' operator) we will not use the field type but instead go directly with a collection search
  const operator = options && options.operator && options.operator.toUpperCase();
  if (operator === 'IN' || operator === 'NIN' || operator === 'IN_CONTAINS' || operator === 'NIN_CONTAINS') {
    return collectionSearchFilterCondition(options);
  }

  // execute the mapped type, or default to String condition check
  switch (options.fieldType) {
    case FieldType.boolean:
      return booleanFilterCondition(options);
    case FieldType.date:
    case FieldType.dateIso:
    case FieldType.dateUtc:
    case FieldType.dateTime:
    case FieldType.dateTimeIso:
    case FieldType.dateTimeIsoAmPm:
    case FieldType.dateTimeIsoAM_PM:
    case FieldType.dateTimeShortIso:
    case FieldType.dateEuro:
    case FieldType.dateEuroShort:
    case FieldType.dateTimeShortEuro:
    case FieldType.dateTimeEuro:
    case FieldType.dateTimeEuroAmPm:
    case FieldType.dateTimeEuroAM_PM:
    case FieldType.dateTimeEuroShort:
    case FieldType.dateTimeEuroShortAmPm:
    case FieldType.dateTimeEuroShortAM_PM:
    case FieldType.dateUs:
    case FieldType.dateUsShort:
    case FieldType.dateTimeShortUs:
    case FieldType.dateTimeUs:
    case FieldType.dateTimeUsAmPm:
    case FieldType.dateTimeUsAM_PM:
    case FieldType.dateTimeUsShort:
    case FieldType.dateTimeUsShortAmPm:
    case FieldType.dateTimeUsShortAM_PM:
      return executeAssociatedDateCondition(options);
    case FieldType.integer:
    case FieldType.float:
    case FieldType.number:
      return numberFilterCondition(options);
    case FieldType.object:
      return objectFilterCondition(options);
    case FieldType.string:
    default:
      return stringFilterCondition(options);
  }
};

/**
 * Execute Date filter condition and use correct date format depending on it's field type (or filterSearchType when that is provided)
 * @param options
 */
function executeAssociatedDateCondition(options: FilterConditionOption): boolean {
  const filterSearchType = options && (options.filterSearchType || options.fieldType) || FieldType.dateIso;
  const FORMAT = mapMomentDateFormatWithFieldType(filterSearchType);
  const searchTerms = Array.isArray(options.searchTerms) && options.searchTerms || [];

  let isRangeSearch = false;
  let dateSearch1: any;
  let dateSearch2: any;

  // return when cell value is not a valid date
  if (searchTerms.length === 0 || searchTerms[0] === '' || searchTerms[0] === null || !moment(options.cellValue, FORMAT, true).isValid()) {
    return false;
  }

  // cell value in moment format
  const dateCell = moment(options.cellValue, FORMAT, true);

  if (searchTerms.length === 2 || ((searchTerms[0] as string).indexOf('..') > 0)) {
    isRangeSearch = true;
    const searchValues = (searchTerms.length === 2) ? searchTerms : (searchTerms[0] as string).split('..');
    const searchValue1 = (Array.isArray(searchValues) && searchValues[0] || '') as Date | string;
    const searchValue2 = (Array.isArray(searchValues) && searchValues[1] || '') as Date | string;
    const searchTerm1 = moment(searchValue1, FORMAT, true);
    const searchTerm2 = moment(searchValue2, FORMAT, true);

    // return if any of the 2 values are invalid dates
    if (!moment(searchTerm1, FORMAT, true).isValid() || !moment(searchTerm2, FORMAT, true).isValid()) {
      return false;
    }
    dateSearch1 = moment(searchTerm1, FORMAT, true);
    dateSearch2 = moment(searchTerm2, FORMAT, true);
  } else {
    // return if the search term is an invalid date
    if (!moment(searchTerms[0] as Date | string, FORMAT, true).isValid()) {
      return false;
    }
    dateSearch1 = moment(searchTerms[0] as Date | string, FORMAT, true);
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
