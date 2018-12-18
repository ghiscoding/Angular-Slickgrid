/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { decimalFormatted } from './../services/utilities';
/** @type {?} */
export const boldFormatter = (row, cell, value, columnDef, dataContext) => {
    /** @type {?} */
    const isNumber = (value === null || value === undefined) ? false : !isNaN(+value);
    if (!isNumber) {
        return '';
    }
    else if (value >= 0) {
        return `<span style="font-weight: bold">${decimalFormatted(value, 2, 2)}$</span>`;
    }
    else {
        return `<span style="font-weight: bold">${decimalFormatted(value, 2, 2)}$</span>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9sZEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9ib2xkRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFFM0QsTUFBTSxPQUFPLGFBQWEsR0FBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxFQUFFOztVQUMvRyxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRixJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxFQUFFLENBQUM7S0FDWDtTQUFNLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtRQUNyQixPQUFPLG1DQUFtQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7S0FDbkY7U0FBTTtRQUNMLE9BQU8sbUNBQW1DLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztLQUNuRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlZCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBib2xkRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBjb25zdCBpc051bWJlciA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XHJcbiAgaWYgKCFpc051bWJlcikge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPj0gMCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkXCI+JHtkZWNpbWFsRm9ybWF0dGVkKHZhbHVlLCAyLCAyKX0kPC9zcGFuPmA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPiR7ZGVjaW1hbEZvcm1hdHRlZCh2YWx1ZSwgMiwgMil9JDwvc3Bhbj5gO1xyXG4gIH1cclxufTtcclxuIl19