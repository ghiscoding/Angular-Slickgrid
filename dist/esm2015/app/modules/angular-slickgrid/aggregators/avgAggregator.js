/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class AvgAggregator {
    /**
     * @param {?} field
     */
    constructor(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    init() {
        this._count = 0;
        this._nonNullCount = 0;
        this._sum = 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        /** @type {?} */
        const val = item[this._field];
        this._count++;
        if (val != null && val !== '' && !isNaN(val)) {
            this._nonNullCount++;
            this._sum += parseFloat(val);
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.avg) {
            groupTotals.avg = {};
        }
        if (this._nonNullCount !== 0) {
            groupTotals.avg[this._field] = this._sum / this._nonNullCount;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AvgAggregator.prototype._count;
    /**
     * @type {?}
     * @private
     */
    AvgAggregator.prototype._nonNullCount;
    /**
     * @type {?}
     * @private
     */
    AvgAggregator.prototype._sum;
    /**
     * @type {?}
     * @private
     */
    AvgAggregator.prototype._field;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvYXZnQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxPQUFPLGFBQWE7Ozs7SUFNeEIsWUFBWSxLQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQUk7O2NBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLFdBQVc7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDcEIsV0FBVyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDdEI7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxFQUFFO1lBQzVCLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMvRDtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBaENDLCtCQUF1Qjs7Ozs7SUFDdkIsc0NBQThCOzs7OztJQUM5Qiw2QkFBcUI7Ozs7O0lBQ3JCLCtCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnZ3JlZ2F0b3IgfSBmcm9tICcuLy4uL21vZGVscy9hZ2dyZWdhdG9yLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXZnQWdncmVnYXRvciBpbXBsZW1lbnRzIEFnZ3JlZ2F0b3Ige1xyXG4gIHByaXZhdGUgX2NvdW50OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfbm9uTnVsbENvdW50OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfc3VtOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfZmllbGQ6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoZmllbGQ6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgdGhpcy5fZmllbGQgPSBmaWVsZDtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jb3VudCA9IDA7XHJcbiAgICB0aGlzLl9ub25OdWxsQ291bnQgPSAwO1xyXG4gICAgdGhpcy5fc3VtID0gMDtcclxuICB9XHJcblxyXG4gIGFjY3VtdWxhdGUoaXRlbSkge1xyXG4gICAgY29uc3QgdmFsID0gaXRlbVt0aGlzLl9maWVsZF07XHJcbiAgICB0aGlzLl9jb3VudCsrO1xyXG4gICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJycgJiYgIWlzTmFOKHZhbCkpIHtcclxuICAgICAgdGhpcy5fbm9uTnVsbENvdW50Kys7XHJcbiAgICAgIHRoaXMuX3N1bSArPSBwYXJzZUZsb2F0KHZhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9yZVJlc3VsdChncm91cFRvdGFscykge1xyXG4gICAgaWYgKCFncm91cFRvdGFscy5hdmcpIHtcclxuICAgICAgZ3JvdXBUb3RhbHMuYXZnID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fbm9uTnVsbENvdW50ICE9PSAwKSB7XHJcbiAgICAgIGdyb3VwVG90YWxzLmF2Z1t0aGlzLl9maWVsZF0gPSB0aGlzLl9zdW0gLyB0aGlzLl9ub25OdWxsQ291bnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==