import { FilterCondition } from './../models/filterCondition.interface';
import { FilterConditionOption } from './../models/filterConditionOption.interface';
import { testFilterCondition } from './filterUtilities';

export const stringFilterCondition: FilterCondition = (options: FilterConditionOption) => {
  // make sure the both search & cell value are string
  // and make them lower case for case insensitive filtering
  const cellValue = options.cellValue.toString().toLowerCase();
  const searchTerm = options.searchTerm.toString().toLowerCase();

  if (options.operator === '*') {
    return cellValue.endsWith(searchTerm);
  } else if (options.operator === '' && options.cellValueLastChar === '*') {
    return cellValue.startsWith(searchTerm);
  } else if (options.operator === '') {
    return cellValue.includes(searchTerm);
  }
  return testFilterCondition(options.operator || '==', cellValue, searchTerm);
};
