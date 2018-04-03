import { AvgAggregator } from './avgAggregator';
import { MinAggregator } from './minAggregator';
import { MaxAggregator } from './maxAggregator';
import { SumAggregator } from './sumAggregator';
/** Provides a list of different Aggregators for the Group Formatter */
export declare const Aggregators: {
    Avg: typeof AvgAggregator;
    Min: typeof MinAggregator;
    Max: typeof MaxAggregator;
    Sum: typeof SumAggregator;
};
