/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SumAggregator {
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
        this._sum = null;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    accumulate(item) {
        /** @type {?} */
        const val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            this._sum += parseFloat(val);
        }
    }
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    storeResult(groupTotals) {
        if (!groupTotals.sum) {
            groupTotals.sum = {};
        }
        groupTotals.sum[this._field] = this._sum;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    SumAggregator.prototype._sum;
    /**
     * @type {?}
     * @private
     */
    SumAggregator.prototype._field;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvc3VtQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxPQUFPLGFBQWE7Ozs7SUFJeEIsWUFBWSxLQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQUk7O2NBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsV0FBVztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNwQixXQUFXLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUNELFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztDQUNGOzs7Ozs7SUF4QkMsNkJBQXFCOzs7OztJQUNyQiwrQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ2dyZWdhdG9yIH0gZnJvbSAnLi8uLi9tb2RlbHMvYWdncmVnYXRvci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1bUFnZ3JlZ2F0b3IgaW1wbGVtZW50cyBBZ2dyZWdhdG9yIHtcclxuICBwcml2YXRlIF9zdW06IG51bWJlcjtcclxuICBwcml2YXRlIF9maWVsZDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihmaWVsZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuX3N1bSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBhY2N1bXVsYXRlKGl0ZW0pIHtcclxuICAgIGNvbnN0IHZhbCA9IGl0ZW1bdGhpcy5fZmllbGRdO1xyXG4gICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJycgJiYgIWlzTmFOKHZhbCkpIHtcclxuICAgICAgdGhpcy5fc3VtICs9IHBhcnNlRmxvYXQodmFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3JlUmVzdWx0KGdyb3VwVG90YWxzKSB7XHJcbiAgICBpZiAoIWdyb3VwVG90YWxzLnN1bSkge1xyXG4gICAgICBncm91cFRvdGFscy5zdW0gPSB7fTtcclxuICAgIH1cclxuICAgIGdyb3VwVG90YWxzLnN1bVt0aGlzLl9maWVsZF0gPSB0aGlzLl9zdW07XHJcbiAgfVxyXG59XHJcbiJdfQ==