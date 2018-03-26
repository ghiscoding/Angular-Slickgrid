import { Aggregator } from './../models/aggregator.interface';

export class MaxAggregator implements Aggregator {
  private _max: number;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init(): void {
    this._max = null;
  }

  accumulate(item) {
    const val = item[this._field];
    if (val != null && val !== '' && !isNaN(val)) {
      if (this._max == null || val > this._max) {
        this._max = val;
      }
    }
  }

  storeResult(groupTotals) {
    if (!groupTotals.max) {
      groupTotals.max = {};
    }
    groupTotals.max[this._field] = this._max;
  }
}
