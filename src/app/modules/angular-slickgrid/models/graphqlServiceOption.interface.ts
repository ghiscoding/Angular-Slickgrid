import { Column } from './column.interface';
import { BackendServiceOption } from './backendServiceOption.interface';
import { GraphqlFilteringOption } from './graphqlFilteringOption.interface';
import { GraphqlSortingOption } from './graphqlSortingOption.interface';
import { GraphqlCursorPaginationOption } from './graphqlCursorPaginationOption.interface';
import { GraphqlPaginationOption } from './graphqlPaginationOption.interface';
import { QueryArgument } from './queryArgument.interface';

export interface GraphqlServiceOption extends BackendServiceOption {
  /**
   * When using Translation, we probably want to add locale as a query parameter for the filterBy/orderBy to work
   * ex.: users(first: 10, offset: 0, locale: "en-CA", filterBy: [{field: name, operator: EQ, value:"John"}]) { }
   */
  addLocaleIntoQuery?: boolean;

  /** What is the dataset, this is required for the GraphQL query to be built */
  datasetName: string;

  /**
   * Extra query arguments that be passed in addition to the default query arguments
   * For example in GraphQL, if we want to pass "userId" and we want the query to look like
   * users (first: 20, offset: 10, userId: 123) { ... }
   */
  extraQueryArguments?: QueryArgument[];

  /** (NOT FULLY IMPLEMENTED) Is the GraphQL Server using cursors? */
  isWithCursor?: boolean;

  /** What are the pagination options? ex.: (first, last, offset) */
  paginationOptions?: GraphqlPaginationOption | GraphqlCursorPaginationOption;

  /** array of Filtering Options, ex.: { field: name, operator: EQ, value: "John" }  */
  filteringOptions?: GraphqlFilteringOption[];

  /** array of Filtering Options, ex.: { field: name, direction: DESC }  */
  sortingOptions?: GraphqlSortingOption[];

  /**
   * Do we want to keep double quotes on field arguments of filterBy/sortBy (field: "name" instead of field: name)
   * ex.: { field: "name", operator: EQ, value: "John" }
   */
  keepArgumentFieldDoubleQuotes?: boolean;
}
