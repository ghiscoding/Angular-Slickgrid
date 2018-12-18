/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const sumTotalsDollarColoredBoldFormatter = (totals, columnDef, grid) => {
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
        return `<span style="color:green; font-weight: bold;">${prefix + '$' + decimalFormatted(val, 2, 2) + suffix}</span>`;
    }
    else {
        return `<span style="color:red; font-weight: bold;">${prefix + '$' + decimalFormatted(val, 2, 2) + suffix}</span>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzRG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2dyb3VwaW5nLWZvcm1hdHRlcnMvc3VtVG90YWxzRG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUUzRCxNQUFNLE9BQU8sbUNBQW1DLEdBQXlCLENBQUMsTUFBVyxFQUFFLFNBQWlCLEVBQUUsSUFBVSxFQUFFLEVBQUU7O1VBQ2hILEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7O1VBQzdCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOztVQUNyQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTs7VUFDakgsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFFdkgsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNmLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7UUFDbkIsT0FBTyxpREFBaUQsTUFBTSxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sU0FBUyxDQUFDO0tBQ3RIO1NBQU07UUFDTCxPQUFPLCtDQUErQyxNQUFNLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxTQUFTLENBQUM7S0FDcEg7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcm91cFRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlZCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBzdW1Ub3RhbHNEb2xsYXJDb2xvcmVkQm9sZEZvcm1hdHRlcjogR3JvdXBUb3RhbHNGb3JtYXR0ZXIgPSAodG90YWxzOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBncmlkPzogYW55KSA9PiB7XHJcbiAgY29uc3QgZmllbGQgPSBjb2x1bW5EZWYuZmllbGQgfHwgJyc7XHJcbiAgY29uc3QgdmFsID0gdG90YWxzLnN1bSAmJiB0b3RhbHMuc3VtW2ZpZWxkXTtcclxuICBjb25zdCBwcmVmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyUHJlZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXggOiAnJztcclxuICBjb25zdCBzdWZmaXggPSAoY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLmdyb3VwRm9ybWF0dGVyU3VmZml4KSA/IGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXggOiAnJztcclxuXHJcbiAgaWYgKGlzTmFOKCt2YWwpKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSBlbHNlIGlmICh2YWwgPj0gMCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOmdyZWVuOyBmb250LXdlaWdodDogYm9sZDtcIj4ke3ByZWZpeCArICckJyArIGRlY2ltYWxGb3JtYXR0ZWQodmFsLCAyLCAyKSArIHN1ZmZpeH08L3NwYW4+YDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOnJlZDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JHtwcmVmaXggKyAnJCcgKyBkZWNpbWFsRm9ybWF0dGVkKHZhbCwgMiwgMikgKyBzdWZmaXh9PC9zcGFuPmA7XHJcbiAgfVxyXG59O1xyXG4iXX0=