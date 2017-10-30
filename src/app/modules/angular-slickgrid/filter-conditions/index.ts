import { FilterConditionOption } from './../models/filterConditionOption.interface';
import { booleanFilterCondition } from './booleanFilterCondition';
import { dateFilterCondition } from './dateFilterCondition';
import { dateIsoFilterCondition } from './dateIsoFilterCondition';
import { dateUsFilterCondition } from './dateUsFilterCondition';
import { dateUsShortFilterCondition } from './dateUsShortFilterCondition';
import { dateUtcFilterCondition } from './dateUtcFilterCondition';
import { executeMappedCondition } from './executeMappedCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';
import { testFilterCondition } from './filterUtilities';

export const FilterConditions = {
  executeMappedCondition,
  booleanFilter: booleanFilterCondition,
  dateFilter: dateFilterCondition,
  dateIsoFilter: dateIsoFilterCondition,
  dateUtcFilter: dateUtcFilterCondition,
  dateUsFilter: dateUsFilterCondition,
  dateUsShortFilter: dateUsShortFilterCondition,
  numberFilter: numberFilterCondition,
  stringFilter: stringFilterCondition,
  testFilter: testFilterCondition
};
