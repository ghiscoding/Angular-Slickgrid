import { Aggregator } from './../models/aggregator.interface';

export class SumAggregator implements Aggregator {
  private _sum: number;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init() {
    this._sum = null;
  }

  accumulate(item) {
    const val = item[this._field];
    if (val != null && val !== '' && !isNaN(val)) {
      this._sum += parseFloat(val);
    }
  }

  storeResult(groupTotals) {
    if (!groupTotals.sum) {
      groupTotals.sum = {};
    }
    groupTotals.sum[this._field] = this._sum;
  }
}
