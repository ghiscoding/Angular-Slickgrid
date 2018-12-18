/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var dollarFormatter = function (row, cell, value, columnDef, dataContext) {
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
    return !isNumber ? '' : "$" + outputValue;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL2RvbGxhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRTNELE1BQU0sS0FBTyxlQUFlLEdBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCOztRQUM3RyxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQzs7UUFDM0UsTUFBTSxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1FBQzVDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUM7O1FBQ25DLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUM7O1FBQ25DLFdBQVcsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7SUFFcEksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFJLFdBQWEsQ0FBQztBQUM1QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZWQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3QgZG9sbGFyRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgY29uc3QgbWluRGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDI7XHJcbiAgY29uc3QgbWF4RGVjaW1hbCA9IHBhcmFtcy5taW5EZWNpbWFsIHx8IDQ7XHJcbiAgY29uc3Qgb3V0cHV0VmFsdWUgPSAoaXNOdW1iZXIgJiYgKHBhcmFtcy5taW5EZWNpbWFsIHx8IHBhcmFtcy5tYXhEZWNpbWFsKSkgPyBkZWNpbWFsRm9ybWF0dGVkKHZhbHVlLCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKSA6IHZhbHVlO1xyXG5cclxuICByZXR1cm4gIWlzTnVtYmVyID8gJycgOiBgJCR7b3V0cHV0VmFsdWV9YDtcclxufTtcclxuIl19