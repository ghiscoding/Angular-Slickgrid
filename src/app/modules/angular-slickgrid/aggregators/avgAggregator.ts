import { Aggregator } from './../models/aggregator.interface';

export class AvgAggregator implements Aggregator {
  private _nonNullCount: number = 0;
  private _sum: number = 0;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init(): void {
    this._nonNullCount = 0;
    this._sum = 0;
  }

  accumulate(item: any) {
    const val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
    if (val !== null && val !== undefined && val !== '' && !isNaN(val)) {
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
