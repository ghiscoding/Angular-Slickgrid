/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var dollarColoredFormatter = function (row, cell, value, columnDef, dataContext) {
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
        return "<span style=\"color:green;\">$" + outputValue + "</span>";
    }
    else {
        return "<span style=\"color:red;\">$" + outputValue + "</span>";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9kb2xsYXJDb2xvcmVkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxLQUFPLHNCQUFzQixHQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQjs7UUFDcEgsUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7O1FBQzNFLE1BQU0sR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztRQUM1QyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztRQUNuQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztRQUNuQyxXQUFXLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0lBRXBJLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sbUNBQStCLFdBQVcsWUFBUyxDQUFDO0tBQzVEO1NBQU07UUFDTCxPQUFPLGlDQUE2QixXQUFXLFlBQVMsQ0FBQztLQUMxRDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlZCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBkb2xsYXJDb2xvcmVkRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgY29uc3QgbWluRGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDI7XHJcbiAgY29uc3QgbWF4RGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDQ7XHJcbiAgY29uc3Qgb3V0cHV0VmFsdWUgPSAoaXNOdW1iZXIgJiYgKHBhcmFtcy5taW5EZWNpbWFsIHx8IHBhcmFtcy5tYXhEZWNpbWFsKSkgPyBkZWNpbWFsRm9ybWF0dGVkKHZhbHVlLCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKSA6IHZhbHVlO1xyXG5cclxuICBpZiAoIWlzTnVtYmVyKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZSA+PSAwKSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6Z3JlZW47XCI+JCR7b3V0cHV0VmFsdWV9PC9zcGFuPmA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+JCR7b3V0cHV0VmFsdWV9PC9zcGFuPmA7XHJcbiAgfVxyXG59O1xyXG4iXX0=