import { Metrics } from './metrics.interface';
import { Statistic } from './statistic.interface';

export interface GraphqlPaginatedResult<T = any> {
  data: {
    [datasetName: string]: {
      /** result set of data objects (array of data) */
      nodes: T[];

      /** Total count of items in the table (needed for the Pagination to work) */
      totalCount: number;

      // ---
      // When using a Cursor, we'll also have Edges and PageInfo according to a cursor position
      /** Edges information of the current cursor */
      edges?: {
        /** Current cursor position */
        cursor: string;
      }

      /** Page information of the current cursor, do we have a next page and what is the end cursor? */
      pageInfo?: {
        /** Do we have a next page from current cursor position? */
        hasNextPage: boolean;

        /** Do we have a previous page from current cursor position? */
        hasPreviousPage: boolean;

        /** What is the last cursor? */
        endCursor: string;

        /** What is the first cursor? */
        startCursor: string;
      };
    }
  };

  /** Some metrics of the last executed query (startTime, endTime, executionTime, itemCount, totalItemCount) */
  metrics?: Metrics;

  /** @deprecated please use "metrics" instead */
  statistics?: Statistic;
}
