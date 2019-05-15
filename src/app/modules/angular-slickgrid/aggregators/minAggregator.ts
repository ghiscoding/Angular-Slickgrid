import { Aggregator } from './../models/aggregator.interface';

export class MinAggregator implements Aggregator {
  private _min: number;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init() {
    this._min = null;
  }

  accumulate(item) {
    const val = item[this._field];
    if (val != null && val !== '' && !isNaN(val)) {
      if (this._min == null || val < this._min) {
        this._min = parseFloat(val);
      }
    }
  }

  storeResult(groupTotals) {
    if (!groupTotals || groupTotals.min === undefined) {
      groupTotals.min = {};
    }
    groupTotals.min[this._field] = this._min;
  }
}
