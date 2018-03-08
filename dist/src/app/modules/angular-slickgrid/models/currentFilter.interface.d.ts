import { OperatorString, OperatorType, SearchTerm } from './../models/index';
export interface CurrentFilter {
    columnId: string;
    headerName?: string;
    operator?: OperatorType | OperatorString;
    searchTerm?: SearchTerm;
    searchTerms?: SearchTerm[];
}
