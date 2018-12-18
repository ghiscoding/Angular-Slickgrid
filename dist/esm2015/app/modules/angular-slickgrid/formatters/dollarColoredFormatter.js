/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const dollarColoredFormatter = (row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    /** @type {?} */
    const params = columnDef && columnDef.params || {};
    /** @type {?} */
    const minDecimal = params.minDecimal || 2;
    /** @type {?} */
    const maxDecimal = params.minDecimal || 4;
    /** @type {?} */
    const outputValue = (isNumber && (params.minDecimal || params.maxDecimal)) ? decimalFormatted(value, minDecimal, maxDecimal) : value;
    if (!isNumber) {
        return '';
    }
    else if (value >= 0) {
        return `<span style="color:green;">$${outputValue}</span>`;
    }
    else {
        return `<span style="color:red;">$${outputValue}</span>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9kb2xsYXJDb2xvcmVkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxPQUFPLHNCQUFzQixHQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLEVBQUU7O1VBQ3hILFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDOztVQUMzRSxNQUFNLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7VUFDNUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQzs7VUFDbkMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQzs7VUFDbkMsV0FBVyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztJQUVwSSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxFQUFFLENBQUM7S0FDWDtTQUFNLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtRQUNyQixPQUFPLCtCQUErQixXQUFXLFNBQVMsQ0FBQztLQUM1RDtTQUFNO1FBQ0wsT0FBTyw2QkFBNkIsV0FBVyxTQUFTLENBQUM7S0FDMUQ7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZWQgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcblxyXG5leHBvcnQgY29uc3QgZG9sbGFyQ29sb3JlZEZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBmYWxzZSA6ICFpc05hTigrdmFsdWUpO1xyXG4gIGNvbnN0IHBhcmFtcyA9IGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zIHx8IHt9O1xyXG4gIGNvbnN0IG1pbkRlY2ltYWwgPSBwYXJhbXMubWluRGVjaW1hbCB8fCAyO1xyXG4gIGNvbnN0IG1heERlY2ltYWwgPSBwYXJhbXMubWluRGVjaW1hbCB8fCA0O1xyXG4gIGNvbnN0IG91dHB1dFZhbHVlID0gKGlzTnVtYmVyICYmIChwYXJhbXMubWluRGVjaW1hbCB8fCBwYXJhbXMubWF4RGVjaW1hbCkpID8gZGVjaW1hbEZvcm1hdHRlZCh2YWx1ZSwgbWluRGVjaW1hbCwgbWF4RGVjaW1hbCkgOiB2YWx1ZTtcclxuXHJcbiAgaWYgKCFpc051bWJlcikge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPj0gMCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOmdyZWVuO1wiPiQke291dHB1dFZhbHVlfTwvc3Bhbj5gO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gYDxzcGFuIHN0eWxlPVwiY29sb3I6cmVkO1wiPiQke291dHB1dFZhbHVlfTwvc3Bhbj5gO1xyXG4gIH1cclxufTtcclxuIl19