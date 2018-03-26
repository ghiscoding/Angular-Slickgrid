import { Aggregator } from './../models/aggregator.interface';
export declare class MaxAggregator implements Aggregator {
    private _max;
    private _field;
    constructor(field: number | string);
    init(): void;
    accumulate(item: any): void;
    storeResult(groupTotals: any): void;
}
