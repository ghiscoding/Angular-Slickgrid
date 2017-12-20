import { Column } from './column.interface';
import { BackendServiceOption } from './backendServiceOption.interface';
import { GraphqlFilteringOption } from './graphqlFilteringOption.interface';
import { GraphqlSortingOption } from './graphqlSortingOption.interface';
import { GraphqlCursorPaginationOption } from './graphqlCursorPaginationOption.interface';
import { GraphqlPaginationOption } from './graphqlPaginationOption.interface';
export interface GraphqlServiceOption extends BackendServiceOption {
    columnIds?: string[];
    dataFilters?: string[];
    datasetName?: string;
    columnDefinitions?: Column[];
    isWithCursor?: boolean;
    paginationOptions?: GraphqlPaginationOption | GraphqlCursorPaginationOption;
    filteringOptions?: GraphqlFilteringOption[];
    sortingOptions?: GraphqlSortingOption[];
    keepArgumentFieldDoubleQuotes?: boolean;
}
