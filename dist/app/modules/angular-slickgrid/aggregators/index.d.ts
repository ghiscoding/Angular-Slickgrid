import { AvgAggregator } from './avgAggregator';
import { MinAggregator } from './minAggregator';
import { MaxAggregator } from './maxAggregator';
import { SumAggregator } from './sumAggregator';
/** Provides a list of different Aggregators for the Group Formatter */
export declare const Aggregators: {
    avg: typeof AvgAggregator;
    min: typeof MinAggregator;
    max: typeof MaxAggregator;
    sum: typeof SumAggregator;
};
