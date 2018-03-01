import { OperatorString, OperatorType, SearchTerm } from './../models/index';

export interface CurrentFilter {
  columnId: string;
  operator?: OperatorType | OperatorString;
  searchTerm?: SearchTerm;
  searchTerms?: SearchTerm[];
}
