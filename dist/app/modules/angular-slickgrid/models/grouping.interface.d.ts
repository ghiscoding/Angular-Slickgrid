import { Aggregator } from './aggregator.interface';
export interface Grouping {
    getter?: string;
    comparer?: (a: any, b: any) => number;
    formatter?: (g: any) => string;
    aggregators?: Aggregator[];
    aggregateCollapsed?: boolean;
    collapsed?: boolean;
    lazyTotalsCalculation?: boolean;
}
