import { Metrics } from './metrics.interface';
import { Statistic } from './statistic.interface';

export interface GraphqlPaginatedResult {
  data: {
    [datasetName: string]: {
      nodes: any[];
      pageInfo: {
        hasNextPage: boolean;
      };
      totalCount: number;
    }
  };

  /** Some metrics of the last executed query (startTime, endTime, executionTime, itemCount, totalItemCount) */
  metrics?: Metrics;

  /** @deprecated please use "metrics" instead */
  statistics?: Statistic;
}
