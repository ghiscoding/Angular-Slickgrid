import { FilterConditionOption } from './filterConditionOption.interface';
import { SearchTerm } from './searchTerm.type';


export type FilterCondition = (options: FilterConditionOption, parsedSearchTerms?: SearchTerm | SearchTerm[]) => boolean;
