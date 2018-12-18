/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MinAggregator = /** @class */ (function () {
    function MinAggregator(field) {
        this._field = field;
    }
    /**
     * @return {?}
     */
    MinAggregator.prototype.init = /**
     * @return {?}
     */
    function () {
        this._min = null;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MinAggregator.prototype.accumulate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var val = item[this._field];
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._min == null || val < this._min) {
                this._min = val;
            }
        }
    };
    /**
     * @param {?} groupTotals
     * @return {?}
     */
    MinAggregator.prototype.storeResult = /**
     * @param {?} groupTotals
     * @return {?}
     */
    function (groupTotals) {
        if (!groupTotals.min) {
            groupTotals.min = {};
        }
        groupTotals.min[this._field] = this._min;
    };
    return MinAggregator;
}());
export { MinAggregator };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MinAggregator.prototype._min;
    /**
     * @type {?}
     * @private
     */
    MinAggregator.prototype._field;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvbWluQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFJRSx1QkFBWSxLQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsNEJBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsSUFBSTs7WUFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7YUFDakI7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLFdBQVc7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDcEIsV0FBVyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDdEI7UUFDRCxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7Ozs7Ozs7SUExQkMsNkJBQXFCOzs7OztJQUNyQiwrQkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZ2dyZWdhdG9yIH0gZnJvbSAnLi8uLi9tb2RlbHMvYWdncmVnYXRvci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pbkFnZ3JlZ2F0b3IgaW1wbGVtZW50cyBBZ2dyZWdhdG9yIHtcclxuICBwcml2YXRlIF9taW46IG51bWJlcjtcclxuICBwcml2YXRlIF9maWVsZDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihmaWVsZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMuX21pbiA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBhY2N1bXVsYXRlKGl0ZW0pIHtcclxuICAgIGNvbnN0IHZhbCA9IGl0ZW1bdGhpcy5fZmllbGRdO1xyXG4gICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJycgJiYgIWlzTmFOKHZhbCkpIHtcclxuICAgICAgaWYgKHRoaXMuX21pbiA9PSBudWxsIHx8IHZhbCA8IHRoaXMuX21pbikge1xyXG4gICAgICAgIHRoaXMuX21pbiA9IHZhbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcmVSZXN1bHQoZ3JvdXBUb3RhbHMpIHtcclxuICAgIGlmICghZ3JvdXBUb3RhbHMubWluKSB7XHJcbiAgICAgIGdyb3VwVG90YWxzLm1pbiA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ3JvdXBUb3RhbHMubWluW3RoaXMuX2ZpZWxkXSA9IHRoaXMuX21pbjtcclxuICB9XHJcbn1cclxuIl19