import { Aggregator } from './../models/aggregator.interface';

export class MinAggregator implements Aggregator {
  private _min: number | null;
  private _field: number | string;

  constructor(field: number | string) {
    this._field = field;
  }

  init() {
    this._min = null;
  }

  accumulate(item: any) {
    const val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
    if (val !== null && val !== undefined && val !== '' && !isNaN(val)) {
      if (this._min === null || this._min === undefined || val < this._min) {
        this._min = parseFloat(val);
      }
    }
  }

  storeResult(groupTotals: any) {
    if (!groupTotals || groupTotals.min === undefined) {
      groupTotals.min = {};
    }
    groupTotals.min[this._field] = this._min;
  }
}
