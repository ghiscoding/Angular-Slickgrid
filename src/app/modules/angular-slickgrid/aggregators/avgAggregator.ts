import { Aggregator } from './../models/aggregator.interface';

export class AvgAggregator implements Aggregator {
  private _count = 0;
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

  accumulate(item: any) {
    const val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
    this._count++;
    if (val != null && val !== '' && !isNaN(val)) {
      this._nonNullCount++;
      this._sum += parseFloat(val);
    }
  }

  storeResult(groupTotals: any) {
    if (!groupTotals || groupTotals.avg === undefined) {
      groupTotals.avg = {};
    }
    if (this._nonNullCount !== 0) {
      groupTotals.avg[this._field] = this._sum / this._nonNullCount;
    }
  }
}
