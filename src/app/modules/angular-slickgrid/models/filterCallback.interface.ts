import { Column, OperatorString, SearchTerm } from './../models/index';

export interface FilterCallbackArg {
  clearFilterTriggered?: boolean;
  columnDef: Column;
  operator?: OperatorString;
  searchTerms?: SearchTerm[];
}

export type FilterCallback = (e: Event | undefined, args: FilterCallbackArg) => void;
