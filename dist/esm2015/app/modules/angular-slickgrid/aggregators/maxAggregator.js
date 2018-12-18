/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class MaxAggregator {
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
        this._max = null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        /** @type {?} */
        const val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._max == null || val > this._max) {
                this._max = val;
            }
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.max) {
            groupTotals.max = {};
        }
        groupTotals.max[this._field] = this._max;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    MaxAggregator.prototype._max;
    /**
     * @type {?}
     * @private
     */
    MaxAggregator.prototype._field;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4QWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvbWF4QWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxPQUFPLGFBQWE7Ozs7SUFJeEIsWUFBWSxLQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQUk7O2NBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2pCO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxXQUFXO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7Ozs7OztJQTFCQyw2QkFBcUI7Ozs7O0lBQ3JCLCtCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnZ3JlZ2F0b3IgfSBmcm9tICcuLy4uL21vZGVscy9hZ2dyZWdhdG9yLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF4QWdncmVnYXRvciBpbXBsZW1lbnRzIEFnZ3JlZ2F0b3Ige1xyXG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2ZpZWxkOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZpZWxkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbWF4ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGFjY3VtdWxhdGUoaXRlbSkge1xyXG4gICAgY29uc3QgdmFsID0gaXRlbVt0aGlzLl9maWVsZF07XHJcbiAgICBpZiAodmFsICE9IG51bGwgJiYgdmFsICE9PSAnJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICBpZiAodGhpcy5fbWF4ID09IG51bGwgfHwgdmFsID4gdGhpcy5fbWF4KSB7XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9yZVJlc3VsdChncm91cFRvdGFscykge1xyXG4gICAgaWYgKCFncm91cFRvdGFscy5tYXgpIHtcclxuICAgICAgZ3JvdXBUb3RhbHMubWF4ID0ge307XHJcbiAgICB9XHJcbiAgICBncm91cFRvdGFscy5tYXhbdGhpcy5fZmllbGRdID0gdGhpcy5fbWF4O1xyXG4gIH1cclxufVxyXG4iXX0=