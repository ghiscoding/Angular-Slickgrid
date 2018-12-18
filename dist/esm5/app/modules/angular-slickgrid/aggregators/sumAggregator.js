/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SumAggregator = /** @class */ (function () {
    function SumAggregator(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    SumAggregator.prototype.init = /**
     * @return {?}
     */
    function () {
        this._sum = null;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SumAggregator.prototype.accumulate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            this._sum += parseFloat(val);
        }
    };
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    SumAggregator.prototype.storeResult = /**
     * @param {?} groupTotals
     * @return {?}
     */
    function (groupTotals) {
        if (!groupTotals.sum) {
            groupTotals.sum = {};
        }
        groupTotals.sum[this._field] = this._sum;
    };
    return SumAggregator;
}());
export { SumAggregator };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvc3VtQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFJRSx1QkFBWSxLQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsNEJBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsSUFBSTs7WUFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7OztJQUVELG1DQUFXOzs7O0lBQVgsVUFBWSxXQUFXO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDOzs7Ozs7O0lBeEJDLDZCQUFxQjs7Ozs7SUFDckIsK0JBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdncmVnYXRvciB9IGZyb20gJy4vLi4vbW9kZWxzL2FnZ3JlZ2F0b3IuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdW1BZ2dyZWdhdG9yIGltcGxlbWVudHMgQWdncmVnYXRvciB7XHJcbiAgcHJpdmF0ZSBfc3VtOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfZmllbGQ6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoZmllbGQ6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgdGhpcy5fZmllbGQgPSBmaWVsZDtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLl9zdW0gPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgYWNjdW11bGF0ZShpdGVtKSB7XHJcbiAgICBjb25zdCB2YWwgPSBpdGVtW3RoaXMuX2ZpZWxkXTtcclxuICAgIGlmICh2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnICYmICFpc05hTih2YWwpKSB7XHJcbiAgICAgIHRoaXMuX3N1bSArPSBwYXJzZUZsb2F0KHZhbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9yZVJlc3VsdChncm91cFRvdGFscykge1xyXG4gICAgaWYgKCFncm91cFRvdGFscy5zdW0pIHtcclxuICAgICAgZ3JvdXBUb3RhbHMuc3VtID0ge307XHJcbiAgICB9XHJcbiAgICBncm91cFRvdGFscy5zdW1bdGhpcy5fZmllbGRdID0gdGhpcy5fc3VtO1xyXG4gIH1cclxufVxyXG4iXX0=