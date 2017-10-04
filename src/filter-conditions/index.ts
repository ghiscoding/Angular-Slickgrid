import { FilterConditionOption } from './../models/filterConditionOption.interface';
import { booleanFilterCondition } from './booleanFilterCondition';
import { dateUtcFilterCondition } from './dateUtcFilterCondition';
import { dateIsoFilterCondition } from './dateIsoFilterCondition';
import { dateUsShortFilterCondition } from './dateUsShortFilterCondition';
import { dateUsFilterCondition } from './dateUsFilterCondition';
import { dateFilterCondition } from './dateFilterCondition';
import { executeMappedCondition } from './executeMappedCondition';
import { numberFilterCondition } from './numberFilterCondition';
import { stringFilterCondition } from './stringFilterCondition';
import { testFilterCondition } from './filterUtilities';

export const FilterConditions = {
  executeMappedCondition: executeMappedCondition,
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
