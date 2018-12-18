/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/** @type {?} */
export var multipleFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    var e_1, _a;
    /** @type {?} */
    var params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error("The multiple formatter requires the \"formatters\" to be provided as a column params.\n    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }");
    }
    /** @type {?} */
    var formatters = params.formatters;
    // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
    // they are piped and executed in sequences
    /** @type {?} */
    var currentValue = value;
    try {
        for (var formatters_1 = tslib_1.__values(formatters), formatters_1_1 = formatters_1.next(); !formatters_1_1.done; formatters_1_1 = formatters_1.next()) {
            var formatter = formatters_1_1.value;
            currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (formatters_1_1 && !formatters_1_1.done && (_a = formatters_1.return)) _a.call(formatters_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return currentValue;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvbXVsdGlwbGVGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsTUFBTSxLQUFPLGlCQUFpQixHQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLElBQVM7OztRQUMxSCxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFO0lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtUUFDdUosQ0FBQyxDQUFDO0tBQzFLOztRQUNLLFVBQVUsR0FBZ0IsTUFBTSxDQUFDLFVBQVU7Ozs7UUFJN0MsWUFBWSxHQUFHLEtBQUs7O1FBQ3hCLEtBQXdCLElBQUEsZUFBQSxpQkFBQSxVQUFVLENBQUEsc0NBQUEsOERBQUU7WUFBL0IsSUFBTSxTQUFTLHVCQUFBO1lBQ2xCLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IG11bHRpcGxlRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnksIGdyaWQ6IGFueSkgPT4ge1xyXG4gIGNvbnN0IHBhcmFtcyA9IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgaWYgKCFwYXJhbXMuZm9ybWF0dGVycyB8fCAhQXJyYXkuaXNBcnJheShwYXJhbXMuZm9ybWF0dGVycykpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIG11bHRpcGxlIGZvcm1hdHRlciByZXF1aXJlcyB0aGUgXCJmb3JtYXR0ZXJzXCIgdG8gYmUgcHJvdmlkZWQgYXMgYSBjb2x1bW4gcGFyYW1zLlxyXG4gICAgRm9yIGV4YW1wbGU6IHRoaXMuY29sdW1uRGVmaW5pdGlvbnMgPSBbeyBpZDogdGl0bGUsIGZpZWxkOiB0aXRsZSwgZm9ybWF0dGVyOiBGb3JtYXR0ZXJzLm11bHRpcGxlLCBwYXJhbXM6IHsgZm9ybWF0dGVyczogW0Zvcm1hdHRlcnMubG93ZXJjYXNlLCBGb3JtYXR0ZXJzLnVwcGVyY2FzZV0gfWApO1xyXG4gIH1cclxuICBjb25zdCBmb3JtYXR0ZXJzOiBGb3JtYXR0ZXJbXSA9IHBhcmFtcy5mb3JtYXR0ZXJzO1xyXG5cclxuICAvLyBsb29wIHRocm91Z2ggYWxsIEZvcm1hdHRlcnMsIHRoZSB2YWx1ZSBvZiAxc3QgZm9ybWF0dGVyIHdpbGwgYmUgdXNlZCBieSAybmQgZm9ybWF0dGVyIGFuZCBzbyBvbi5cclxuICAvLyB0aGV5IGFyZSBwaXBlZCBhbmQgZXhlY3V0ZWQgaW4gc2VxdWVuY2VzXHJcbiAgbGV0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xyXG4gIGZvciAoY29uc3QgZm9ybWF0dGVyIG9mIGZvcm1hdHRlcnMpIHtcclxuICAgIGN1cnJlbnRWYWx1ZSA9IGZvcm1hdHRlcihyb3csIGNlbGwsIGN1cnJlbnRWYWx1ZSwgY29sdW1uRGVmLCBkYXRhQ29udGV4dCwgZ3JpZCk7XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50VmFsdWU7XHJcbn07XHJcbiJdfQ==