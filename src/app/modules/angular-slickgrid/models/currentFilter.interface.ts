import { OperatorString, OperatorType, SearchTerm } from './../models/index';

export interface CurrentFilter {
  /**
   * Column Id that must be defined as a Column in the Columns Definition (using the "field" property).
   * However, please note that it will still check if there's a "queryField" and/or "queryFieldFilter" defined and use if exists
   */
  columnId: string;

  /** Filter operator or use default operator when not provided */
  operator?: OperatorType | OperatorString;

  /** Filter search terms  */
  searchTerms?: SearchTerm[];
}
