import { OperatorString, OperatorType, SearchTerm } from './../models/index';
export interface CurrentFilter {
    /** Column id (in the column definitions) */
    columnId: string;
    /** Fitler operator or use default operator when not provided */
    operator?: OperatorType | OperatorString;
    /** Filter search terms  */
    searchTerms?: SearchTerm[];
}
