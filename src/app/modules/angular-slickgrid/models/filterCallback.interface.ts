import { Column, OperatorString, OperatorType, SearchTerm } from './index';

export interface FilterCallbackArg {
  /** Was the last event a Clear Filter that was triggered? */
  clearFilterTriggered?: boolean;

  /** Column Definition */
  columnDef: Column;

  /** Operator to use with the Filter (Equals, NotEquals, Greater, ...) */
  operator?: OperatorType | OperatorString;

  /** Search Terms to preset or use as query */
  searchTerms?: SearchTerm[] | undefined | null;

  /**
   * Defaults to true, should we trigger a query?
   * Change to false when calling a clearFilters to avoid multiple backend queries.
   */
  shouldTriggerQuery?: boolean;
}

export type FilterCallback = (e: Event | undefined, args: FilterCallbackArg) => void;
