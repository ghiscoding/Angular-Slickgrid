import { GraphqlCursorPaginationOption } from './graphqlCursorPaginationOption.interface';
import { GraphqlPaginationOption } from './graphqlPaginationOption.interface';
export interface GraphqlServiceOption {
    datasetName?: string;
    isWithCursor?: boolean;
    paginationOptions?: GraphqlPaginationOption | GraphqlCursorPaginationOption;
    dataFilters?: string[];
}
