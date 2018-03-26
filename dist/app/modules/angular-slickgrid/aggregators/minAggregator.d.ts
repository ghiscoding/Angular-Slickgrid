import { Aggregator } from './../models/aggregator.interface';
export declare class MinAggregator implements Aggregator {
    private _min;
    private _field;
    constructor(field: number | string);
    init(): void;
    accumulate(item: any): void;
    storeResult(groupTotals: any): void;
}
