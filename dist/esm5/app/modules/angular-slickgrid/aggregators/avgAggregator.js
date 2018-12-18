/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AvgAggregator = /** @class */ (function () {
    function AvgAggregator(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    AvgAggregator.prototype.init = /**
     * @return {?}
     */
    function () {
        this._count = 0;
        this._nonNullCount = 0;
        this._sum = 0;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AvgAggregator.prototype.accumulate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var val = item[this._field];
        this._count++;
        if (val != null && val !== '' && !isNaN(val)) {
            this._nonNullCount++;
            this._sum += parseFloat(val);
        }
    };
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    AvgAggregator.prototype.storeResult = /**
     * @param {?} groupTotals
     * @return {?}
     */
    function (groupTotals) {
        if (!groupTotals.avg) {
            groupTotals.avg = {};
        }
        if (this._nonNullCount !== 0) {
            groupTotals.avg[this._field] = this._sum / this._nonNullCount;
        }
    };
    return AvgAggregator;
}());
export { AvgAggregator };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvYXZnQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFNRSx1QkFBWSxLQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsNEJBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsSUFBSTs7WUFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxtQ0FBVzs7OztJQUFYLFVBQVksV0FBVztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNwQixXQUFXLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLEVBQUU7WUFDNUIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7Ozs7OztJQWhDQywrQkFBdUI7Ozs7O0lBQ3ZCLHNDQUE4Qjs7Ozs7SUFDOUIsNkJBQXFCOzs7OztJQUNyQiwrQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ2dyZWdhdG9yIH0gZnJvbSAnLi8uLi9tb2RlbHMvYWdncmVnYXRvci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF2Z0FnZ3JlZ2F0b3IgaW1wbGVtZW50cyBBZ2dyZWdhdG9yIHtcclxuICBwcml2YXRlIF9jb3VudDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX25vbk51bGxDb3VudDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX3N1bTogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2ZpZWxkOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZpZWxkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fY291bnQgPSAwO1xyXG4gICAgdGhpcy5fbm9uTnVsbENvdW50ID0gMDtcclxuICAgIHRoaXMuX3N1bSA9IDA7XHJcbiAgfVxyXG5cclxuICBhY2N1bXVsYXRlKGl0ZW0pIHtcclxuICAgIGNvbnN0IHZhbCA9IGl0ZW1bdGhpcy5fZmllbGRdO1xyXG4gICAgdGhpcy5fY291bnQrKztcclxuICAgIGlmICh2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnICYmICFpc05hTih2YWwpKSB7XHJcbiAgICAgIHRoaXMuX25vbk51bGxDb3VudCsrO1xyXG4gICAgICB0aGlzLl9zdW0gKz0gcGFyc2VGbG9hdCh2YWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcmVSZXN1bHQoZ3JvdXBUb3RhbHMpIHtcclxuICAgIGlmICghZ3JvdXBUb3RhbHMuYXZnKSB7XHJcbiAgICAgIGdyb3VwVG90YWxzLmF2ZyA9IHt9O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX25vbk51bGxDb3VudCAhPT0gMCkge1xyXG4gICAgICBncm91cFRvdGFscy5hdmdbdGhpcy5fZmllbGRdID0gdGhpcy5fc3VtIC8gdGhpcy5fbm9uTnVsbENvdW50O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=