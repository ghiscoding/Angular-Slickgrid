import { Aggregator } from './../models/aggregator.interface';

export class AvgAggregator implements Aggregator {
  private _count: number;
  private _nonNullCount: number;
  private _sum: number;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init(): void {
    this._count = 0;
    this._nonNullCount = 0;
    this._sum = 0;
  }

  accumulate(item) {
    const val = item[this._field];
    this._count++;
    if (val != null && val !== '' && !isNaN(val)) {
      this._nonNullCount++;
      this._sum += parseFloat(val);
    }
  }

  storeResult(groupTotals) {
    if (!groupTotals.avg) {
      groupTotals.avg = {};
    }
    if (this._nonNullCount !== 0) {
      groupTotals.avg[this._field] = this._sum / this._nonNullCount;
    }
  }
}
