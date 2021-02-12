import { executeBooleanFilterCondition } from './booleanFilterCondition';
import { executeFilterConditionTest } from './filterConditionProcesses';
import { executeCollectionSearchFilterCondition } from './collectionSearchFilterCondition';
import { executeNumberFilterCondition } from './numberFilterCondition';
import { executeStringFilterCondition } from './stringFilterCondition';
import { testFilterCondition } from './filterUtilities';

export const FilterConditions = {
  executeFilterConditionTest,
  booleanFilter: executeBooleanFilterCondition,
  collectionSearchFilter: executeCollectionSearchFilterCondition,
  numberFilter: executeNumberFilterCondition,
  stringFilter: executeStringFilterCondition,
  testFilter: testFilterCondition
};
