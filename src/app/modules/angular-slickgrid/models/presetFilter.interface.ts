import { OperatorString, OperatorType, SearchTerm } from './../models/index';

export interface PresetFilter {
  columnId: string;
  operator?: OperatorType | OperatorString;
  searchTerm?: SearchTerm;
  searchTerms?: SearchTerm[];
}
