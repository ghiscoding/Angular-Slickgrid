import { Aggregator } from './../models/aggregator.interface';
export declare class SumAggregator implements Aggregator {
    private _sum;
    private _field;
    constructor(field: number | string);
    init(): void;
    accumulate(item: any): void;
    storeResult(groupTotals: any): void;
}
