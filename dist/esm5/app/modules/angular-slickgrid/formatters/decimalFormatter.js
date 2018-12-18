/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export var decimalFormatter = function (row, cell, value, columnDef, dataContext) {
    /** @type {?} */
    var params = columnDef.params || {};
    /** @type {?} */
    var minDecimalPlaces = params.minDecimalPlaces || params.decimalPlaces || 2;
    /** @type {?} */
    var maxDecimalPlaces = params.maxDecimalPlaces || 2;
    /** @type {?} */
    var isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    return !isNumber ? value : "" + decimalFormatted(value, minDecimalPlaces, maxDecimalPlaces);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9kZWNpbWFsRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxLQUFPLGdCQUFnQixHQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQjs7UUFDOUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7UUFDL0IsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxhQUFhLElBQUksQ0FBQzs7UUFDdkUsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUM7O1FBQy9DLFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRWpGLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUcsQ0FBQztBQUM5RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZWQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3QgZGVjaW1hbEZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBjb25zdCBtaW5EZWNpbWFsUGxhY2VzID0gcGFyYW1zLm1pbkRlY2ltYWxQbGFjZXMgfHwgcGFyYW1zLmRlY2ltYWxQbGFjZXMgfHwgMjtcclxuICBjb25zdCBtYXhEZWNpbWFsUGxhY2VzID0gcGFyYW1zLm1heERlY2ltYWxQbGFjZXMgfHwgMjtcclxuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XHJcblxyXG4gIHJldHVybiAhaXNOdW1iZXIgPyB2YWx1ZSA6IGAke2RlY2ltYWxGb3JtYXR0ZWQodmFsdWUsIG1pbkRlY2ltYWxQbGFjZXMsIG1heERlY2ltYWxQbGFjZXMpfWA7XHJcbn07XHJcblxyXG4iXX0=