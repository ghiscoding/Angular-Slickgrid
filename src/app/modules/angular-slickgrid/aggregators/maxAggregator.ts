import { Aggregator } from './../models/aggregator.interface';

export class MaxAggregator implements Aggregator {
  private _max: number | null;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init(): void {
    this._max = null;
  }

  accumulate(item: any) {
    const val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
    if (val != null && val !== '' && !isNaN(val)) {
      if (this._max == null || val > this._max) {
        this._max = parseFloat(val);
      }
    }
  }

  storeResult(groupTotals: any) {
    if (!groupTotals || groupTotals.max === undefined) {
      groupTotals.max = {};
    }
    groupTotals.max[this._field] = this._max;
  }
}
