import { FilterConditionOption } from './../models/filterConditionOption.interface';
import { booleanFilterCondition } from './booleanFilterCondition';
import { executeMappedCondition } from './executeMappedCondition';
import { collectionSearchFilterCondition } from './collectionSearchFilterCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';
import { testFilterCondition } from './filterUtilities';

export const FilterConditions = {
  executeMappedCondition,
  booleanFilter: booleanFilterCondition,
  collectionSearchFilter: collectionSearchFilterCondition,
  numberFilter: numberFilterCondition,
  stringFilter: stringFilterCondition,
  testFilter: testFilterCondition
};
