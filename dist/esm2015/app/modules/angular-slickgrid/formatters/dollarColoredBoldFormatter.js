/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const dollarColoredBoldFormatter = (row, cell, value, columnDef, dataContext) => {
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
        return `<span style="color:green; font-weight: bold;">$${outputValue}</span>`;
    }
    else {
        return `<span style="color:red; font-weight: bold;">$${outputValue}</span>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUUzRCxNQUFNLE9BQU8sMEJBQTBCLEdBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsRUFBRTs7VUFDNUgsUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7O1VBQzNFLE1BQU0sR0FBRyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztVQUM1QyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztVQUNuQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDOztVQUNuQyxXQUFXLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0lBRXBJLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQztLQUNYO1NBQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sa0RBQWtELFdBQVcsU0FBUyxDQUFDO0tBQy9FO1NBQU07UUFDTCxPQUFPLGdEQUFnRCxXQUFXLFNBQVMsQ0FBQztLQUM3RTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlZCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBkb2xsYXJDb2xvcmVkQm9sZEZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgaXNOdW1iZXIgPSAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBmYWxzZSA6ICFpc05hTigrdmFsdWUpO1xyXG4gIGNvbnN0IHBhcmFtcyA9IGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYucGFyYW1zIHx8IHt9O1xyXG4gIGNvbnN0IG1pbkRlY2ltYWwgPSBwYXJhbXMubWluRGVjaW1hbCB8fCAyO1xyXG4gIGNvbnN0IG1heERlY2ltYWwgPSBwYXJhbXMubWluRGVjaW1hbCB8fCA0O1xyXG4gIGNvbnN0IG91dHB1dFZhbHVlID0gKGlzTnVtYmVyICYmIChwYXJhbXMubWluRGVjaW1hbCB8fCBwYXJhbXMubWF4RGVjaW1hbCkpID8gZGVjaW1hbEZvcm1hdHRlZCh2YWx1ZSwgbWluRGVjaW1hbCwgbWF4RGVjaW1hbCkgOiB2YWx1ZTtcclxuXHJcbiAgaWYgKCFpc051bWJlcikge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPj0gMCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOmdyZWVuOyBmb250LXdlaWdodDogYm9sZDtcIj4kJHtvdXRwdXRWYWx1ZX08L3NwYW4+YDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImNvbG9yOnJlZDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JCR7b3V0cHV0VmFsdWV9PC9zcGFuPmA7XHJcbiAgfVxyXG59O1xyXG4iXX0=