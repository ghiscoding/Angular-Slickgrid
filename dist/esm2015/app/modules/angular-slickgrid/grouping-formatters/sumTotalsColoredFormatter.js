/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const sumTotalsColoredFormatter = (totals, columnDef, grid) => {
    /** @type {?} */
    const field = columnDef.field || '';
    /** @type {?} */
    const val = totals.sum && totals.sum[field];
    /** @type {?} */
    const prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    const suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return `<span style="color:green;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}</span>`;
    }
    else {
        return `<span style="color:red;">${prefix + ((Math.round(parseFloat(val) * 1000000) / 1000000)) + suffix}</span>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzQ29sb3JlZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ3JvdXBpbmctZm9ybWF0dGVycy9zdW1Ub3RhbHNDb2xvcmVkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxPQUFPLHlCQUF5QixHQUF5QixDQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLElBQVUsRUFBRSxFQUFFOztVQUN0RyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxFQUFFOztVQUM3QixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzs7VUFDckMsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1VBQ2pILE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRXZILElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO1FBQ25CLE9BQU8sOEJBQThCLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxNQUFNLFNBQVMsQ0FBQztLQUNySDtTQUFNO1FBQ0wsT0FBTyw0QkFBNEIsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUFHLE1BQU0sU0FBUyxDQUFDO0tBQ25IO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgR3JvdXBUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3Qgc3VtVG90YWxzQ29sb3JlZEZvcm1hdHRlcjogR3JvdXBUb3RhbHNGb3JtYXR0ZXIgPSAodG90YWxzOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBncmlkPzogYW55KSA9PiB7XHJcbiAgY29uc3QgZmllbGQgPSBjb2x1bW5EZWYuZmllbGQgfHwgJyc7XHJcbiAgY29uc3QgdmFsID0gdG90YWxzLnN1bSAmJiB0b3RhbHMuc3VtW2ZpZWxkXTtcclxuICBjb25zdCBwcmVmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXggOiAnJztcclxuICBjb25zdCBzdWZmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXggOiAnJztcclxuXHJcbiAgaWYgKGlzTmFOKCt2YWwpKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSBlbHNlIGlmICh2YWwgPj0gMCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOmdyZWVuO1wiPiR7cHJlZml4ICsgKChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsKSAqIDEwMDAwMDApIC8gMTAwMDAwMCkpICsgc3VmZml4fTwvc3Bhbj5gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6cmVkO1wiPiR7cHJlZml4ICsgKChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsKSAqIDEwMDAwMDApIC8gMTAwMDAwMCkpICsgc3VmZml4fTwvc3Bhbj5gO1xyXG4gIH1cclxufTtcclxuIl19