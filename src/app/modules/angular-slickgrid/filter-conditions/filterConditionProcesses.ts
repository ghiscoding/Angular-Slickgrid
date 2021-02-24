import { FieldType, FilterCondition, FilterConditionOption, SearchTerm } from '../models/index';
import { executeBooleanFilterCondition, getFilterParsedBoolean } from './booleanFilterCondition';
import { executeCollectionSearchFilterCondition } from './collectionSearchFilterCondition';
import { getFilterParsedNumbers, executeNumberFilterCondition } from './numberFilterCondition';
import { executeDateFilterCondition, getFilterParsedDates } from './dateFilterCondition';
import { executeObjectFilterCondition, getFilterParsedObjectResult } from './objectFilterCondition';
import { executeStringFilterCondition, getFilterParsedText } from './stringFilterCondition';
import { isCollectionOperator } from './filterUtilities';

/**
 * General variable types, just 5x types instead of the multiple FieldType.
 * For example all DateIso, DateUs are all "date", this makes it easier to know which filter condition to call
 */
export type GeneralizedVariableType = 'boolean' | 'date' | 'number' | 'object' | 'text';

/** Execute mapped condition (per field type) for each cell in the grid */
export const executeFilterConditionTest: FilterCondition = (options: FilterConditionOption, parsedSearchTerms?: SearchTerm | SearchTerm[]) => {
  // when using a multi-select ('IN' operator) we will not use the field type but instead go directly with a collection search
  if (isCollectionOperator(options.operator)) {
    return executeCollectionSearchFilterCondition(options);
  }

  // From a more specific field type (dateIso, dateEuro, text, readonly, ...), get the more generalized type (boolean, date, number, object, text)
  const generalizedType = getGeneralizedVarTypeByFieldType(options.filterSearchType || options.fieldType);

  // execute the mapped type, or default to String condition check
  switch (generalizedType) {
    case 'boolean':
      // the parsedSearchTerms should be single value (result came from getFilterParsedBoolean() method)
      return executeBooleanFilterCondition(options, parsedSearchTerms as SearchTerm);
    case 'date':
      return executeDateFilterCondition(options, (parsedSearchTerms || []) as any[]);
    case 'number':
      return executeNumberFilterCondition(options, (parsedSearchTerms || []) as number[]);
    case 'object':
      // the parsedSearchTerms should be single value (result came from getFilterParsedObjectResult() method)
      return executeObjectFilterCondition(options, parsedSearchTerms as SearchTerm);
    case 'text':
    default:
      // the parsedSearchTerms should be single value (result came from getFilterParsedText() method)
      return executeStringFilterCondition(options, parsedSearchTerms as SearchTerm);
  }
};

/**
 * From our search filter value(s), get their parsed value(s), for example a "dateIso" filter will be parsed as Moment object.
 * Then later when we execute the filtering checks, we won't need to re-parse all search value(s) again and again.
 * So this is called only once, for each search filter that is, prior to running the actual filter condition checks on each cell afterward.
 */
export function getParsedSearchTermsByFieldType(inputSearchTerms: SearchTerm[] | undefined, inputFilterSearchType: typeof FieldType[keyof typeof FieldType]): SearchTerm | SearchTerm[] | undefined {
  const generalizedType = getGeneralizedVarTypeByFieldType(inputFilterSearchType);
  let parsedSearchValues: SearchTerm | SearchTerm[] | undefined;

  // parse the search value(s), the Date & Numbers could be in a range and so we will return an array for them
  // any other type will return a single search value
  switch (generalizedType) {
    case 'boolean':
      parsedSearchValues = getFilterParsedBoolean(inputSearchTerms) as boolean;
      break;
    case 'date':
      parsedSearchValues = getFilterParsedDates(inputSearchTerms, inputFilterSearchType) as SearchTerm[];
      break;
    case 'number':
      parsedSearchValues = getFilterParsedNumbers(inputSearchTerms) as SearchTerm[];
      break;
    case 'object':
      parsedSearchValues = getFilterParsedObjectResult(inputSearchTerms);
      break;
    case 'text':
      parsedSearchValues = getFilterParsedText(inputSearchTerms);
      break;
  }
  return parsedSearchValues;
}


/**
 * From a more specific field type, let's return a simple and more general type (boolean, date, number, object, text)
 * @param fieldType - specific field type
 * @returns generalType - general field type
 */
function getGeneralizedVarTypeByFieldType(fieldType: typeof FieldType[keyof typeof FieldType]): GeneralizedVariableType {
  // return general field type
  switch (fieldType) {
    case FieldType.boolean:
      return 'boolean';
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
      return 'date';
    case FieldType.integer:
    case FieldType.float:
    case FieldType.number:
      return 'number';
    case FieldType.object:
      return 'object';
    case FieldType.string:
    case FieldType.text:
    case FieldType.password:
    case FieldType.readonly:
    default:
      return 'text';
  }
}
