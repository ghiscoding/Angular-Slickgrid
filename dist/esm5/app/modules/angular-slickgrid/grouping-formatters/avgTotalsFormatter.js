/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var avgTotalsFormatter = function (totals, columnDef, grid) {
    /** @type {?} */
    var field = columnDef.field || '';
    /** @type {?} */
    var val = totals.avg && totals.avg[field];
    /** @type {?} */
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (val != null) {
        return prefix + Math.round(val) + suffix;
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnVG90YWxzRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9ncm91cGluZy1mb3JtYXR0ZXJzL2F2Z1RvdGFsc0Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE1BQU0sS0FBTyxrQkFBa0IsR0FBeUIsVUFBQyxNQUFXLEVBQUUsU0FBaUIsRUFBRSxJQUFVOztRQUMzRixLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFOztRQUM3QixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7UUFDckMsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1FBQ2pILE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRXZILElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO0tBQzFDO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcm91cFRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmV4cG9ydCBjb25zdCBhdmdUb3RhbHNGb3JtYXR0ZXI6IEdyb3VwVG90YWxzRm9ybWF0dGVyID0gKHRvdGFsczogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZ3JpZD86IGFueSkgPT4ge1xyXG4gIGNvbnN0IGZpZWxkID0gY29sdW1uRGVmLmZpZWxkIHx8ICcnO1xyXG4gIGNvbnN0IHZhbCA9IHRvdGFscy5hdmcgJiYgdG90YWxzLmF2Z1tmaWVsZF07XHJcbiAgY29uc3QgcHJlZml4ID0gKGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclByZWZpeCkgPyBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4IDogJyc7XHJcbiAgY29uc3Qgc3VmZml4ID0gKGNvbHVtbkRlZi5wYXJhbXMgJiYgY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclN1ZmZpeCkgPyBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4IDogJyc7XHJcblxyXG4gIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHByZWZpeCArIE1hdGgucm91bmQodmFsKSArIHN1ZmZpeDtcclxuICB9XHJcbiAgcmV0dXJuICcnO1xyXG59O1xyXG4iXX0=