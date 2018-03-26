import { AvgAggregator } from './avgAggregator';
import { MinAggregator } from './minAggregator';
import { MaxAggregator } from './maxAggregator';
import { SumAggregator } from './sumAggregator';

/** Provides a list of different Aggregators for the Group Formatter */
export const Aggregators = {
  avg: AvgAggregator,
  min: MinAggregator,
  max: MaxAggregator,
  sum: SumAggregator
};
