/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var sumTotalsDollarColoredFormatter = function (totals, columnDef, grid) {
    /** @type {?} */
    var field = columnDef.field || '';
    /** @type {?} */
    var val = totals.sum && totals.sum[field];
    /** @type {?} */
    var prefix = (columnDef.params && columnDef.params.groupFormatterPrefix) ? columnDef.params.groupFormatterPrefix : '';
    /** @type {?} */
    var suffix = (columnDef.params && columnDef.params.groupFormatterSuffix) ? columnDef.params.groupFormatterSuffix : '';
    if (isNaN(+val)) {
        return '';
    }
    else if (val >= 0) {
        return "<span style=\"color:green;\">" + (prefix + '$' + decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
    else {
        return "<span style=\"color:red;\">" + (prefix + '$' + decimalFormatted(val, 2, 2) + suffix) + "</span>";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtVG90YWxzRG9sbGFyQ29sb3JlZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ3JvdXBpbmctZm9ybWF0dGVycy9zdW1Ub3RhbHNEb2xsYXJDb2xvcmVkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxLQUFPLCtCQUErQixHQUF5QixVQUFDLE1BQVcsRUFBRSxTQUFpQixFQUFFLElBQVU7O1FBQ3hHLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7O1FBQzdCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDOztRQUNyQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRTs7UUFDakgsTUFBTSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFFdkgsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNmLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7UUFDbkIsT0FBTyxtQ0FBOEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sYUFBUyxDQUFDO0tBQ25HO1NBQU07UUFDTCxPQUFPLGlDQUE0QixNQUFNLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxhQUFTLENBQUM7S0FDakc7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcm91cFRvdGFsc0Zvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlZCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBzdW1Ub3RhbHNEb2xsYXJDb2xvcmVkRm9ybWF0dGVyOiBHcm91cFRvdGFsc0Zvcm1hdHRlciA9ICh0b3RhbHM6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGdyaWQ/OiBhbnkpID0+IHtcclxuICBjb25zdCBmaWVsZCA9IGNvbHVtbkRlZi5maWVsZCB8fCAnJztcclxuICBjb25zdCB2YWwgPSB0b3RhbHMuc3VtICYmIHRvdGFscy5zdW1bZmllbGRdO1xyXG4gIGNvbnN0IHByZWZpeCA9IChjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJQcmVmaXgpID8gY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclByZWZpeCA6ICcnO1xyXG4gIGNvbnN0IHN1ZmZpeCA9IChjb2x1bW5EZWYucGFyYW1zICYmIGNvbHVtbkRlZi5wYXJhbXMuZ3JvdXBGb3JtYXR0ZXJTdWZmaXgpID8gY29sdW1uRGVmLnBhcmFtcy5ncm91cEZvcm1hdHRlclN1ZmZpeCA6ICcnO1xyXG5cclxuICBpZiAoaXNOYU4oK3ZhbCkpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9IGVsc2UgaWYgKHZhbCA+PSAwKSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6Z3JlZW47XCI+JHtwcmVmaXggKyAnJCcgKyBkZWNpbWFsRm9ybWF0dGVkKHZhbCwgMiwgMikgKyBzdWZmaXh9PC9zcGFuPmA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+JHtwcmVmaXggKyAnJCcgKyBkZWNpbWFsRm9ybWF0dGVkKHZhbCwgMiwgMikgKyBzdWZmaXh9PC9zcGFuPmA7XHJcbiAgfVxyXG59O1xyXG4iXX0=