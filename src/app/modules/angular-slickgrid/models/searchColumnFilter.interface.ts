import { Column, } from './index';
import { FieldType, OperatorString, OperatorType, SearchTerm } from '../models/index';

export interface SearchColumnFilter {
  /** Column definition Id */
  columnId: string;

  /** Column definition */
  columnDef: Column;

  /**
   * Parsed Search Terms is similar to SearchTerms but is already parsed in the correct format,
   * for example on a date field the searchTerms might be in string format but their respective parsedSearchTerms will be of type Date
   */
  parsedSearchTerms?: SearchTerm | SearchTerm[];

  /** Search Terms to preload (collection), please note it is better to use the "presets" grid option which is more powerful. */
  searchTerms: SearchTerm[];

  /** Operator to use when filtering (>, >=, EQ, IN, ...) */
  operator?: OperatorType | OperatorString;

  /**
   * Useful when you want to display a certain field to the UI, but you want to use another field to query when Filtering/Sorting.
   * Please note that it has higher precendence over the "field" property.
   */
  queryField?: string;

  /** Last search input character when it is identified as "*" representing startsWith */
  searchInputLastChar?: string;

  /** What is the Field Type that can be used by the Filter (as precedence over the "type" set the column definition) */
  type: typeof FieldType[keyof typeof FieldType];
}
