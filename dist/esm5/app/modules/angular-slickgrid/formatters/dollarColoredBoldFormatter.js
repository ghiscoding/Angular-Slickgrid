/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var dollarColoredBoldFormatter = function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    /** @type {?} */
    var params = columnDef && columnDef.params || {};
    /** @type {?} */
    var minDecimal = params.minDecimal || 2;
    /** @type {?} */
    var maxDecimal = params.minDecimal || 4;
    /** @type {?} */
    var outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    if (!isNumber) {
        return '';
    }
    else if (value >= 0) {
        return "<span style=\"color:green; font-weight: bold;\">$" + outputValue + "</span>";
    }
    else {
        return "<span style=\"color:red; font-weight: bold;\">$" + outputValue + "</span>";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUUzRCxNQUFNLEtBQU8sMEJBQTBCLEdBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCOztRQUN4SCxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQzs7UUFDM0UsTUFBTSxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1FBQzVDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUM7O1FBQ25DLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUM7O1FBQ25DLFdBQVcsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFFcEksSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE9BQU8sRUFBRSxDQUFDO0tBQ1g7U0FBTSxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDckIsT0FBTyxzREFBa0QsV0FBVyxZQUFTLENBQUM7S0FDL0U7U0FBTTtRQUNMLE9BQU8sb0RBQWdELFdBQVcsWUFBUyxDQUFDO0tBQzdFO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBkZWNpbWFsRm9ybWF0dGVkIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgY29uc3QgbWluRGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDI7XHJcbiAgY29uc3QgbWF4RGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDQ7XHJcbiAgY29uc3Qgb3V0cHV0VmFsdWUgPSAoaXNOdW1iZXIgJiYgKHBhcmFtcy5taW5EZWNpbWFsIHx8IHBhcmFtcy5tYXhEZWNpbWFsKSkgPyBkZWNpbWFsRm9ybWF0dGVkKHZhbHVlLCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKSA6IHZhbHVlO1xyXG5cclxuICBpZiAoIWlzTnVtYmVyKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZSA+PSAwKSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6Z3JlZW47IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiQke291dHB1dFZhbHVlfTwvc3Bhbj5gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6cmVkOyBmb250LXdlaWdodDogYm9sZDtcIj4kJHtvdXRwdXRWYWx1ZX08L3NwYW4+YDtcclxuICB9XHJcbn07XHJcbiJdfQ==