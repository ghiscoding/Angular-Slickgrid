import { DelimiterType } from './delimiterType.enum';
import { Metrics } from './metrics.interface';
import { Statistic } from './statistic.interface';

export interface GraphqlResult {
  data: {
    [datasetName: string]: {
      nodes: any[];
      pageInfo: {
        hasNextPage: boolean;
      };
      totalCount: number;
    }
  };

  metrics?: Metrics;

  /** @deprecated please use "metrics" instead */
  statistics?: Statistic;
}
