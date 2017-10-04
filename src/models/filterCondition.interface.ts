import { FilterConditionOption } from './filterConditionOption.interface';


export type FilterCondition = (options: FilterConditionOption) => boolean;
