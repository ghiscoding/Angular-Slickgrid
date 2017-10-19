import { GraphqlFilteringOption } from './graphqlFilteringOption.interface';
import { GraphqlSortingOption } from './graphqlSortingOption.interface';
import { GraphqlCursorPaginationOption } from './graphqlCursorPaginationOption.interface';
import { GraphqlPaginationOption } from './graphqlPaginationOption.interface';

export interface GraphqlServiceOption {
  datasetName?: string;
  isWithCursor?: boolean;
  paginationOptions?: GraphqlPaginationOption | GraphqlCursorPaginationOption;
  filteringOptions?: GraphqlFilteringOption[];
  sortingOptions?: GraphqlSortingOption[];
  dataFilters?: string[];
}
