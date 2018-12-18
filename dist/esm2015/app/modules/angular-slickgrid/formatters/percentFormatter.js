/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const percentFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '';
    }
    /** @type {?} */
    const outputValue = value > 0 ? value / 100 : 0;
    return `<span>${outputValue}%</span>`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudEZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9wZXJjZW50Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxPQUFPLGdCQUFnQixHQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFVLEVBQUU7SUFDaEksSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxFQUFFLENBQUM7S0FDWDs7VUFFSyxXQUFXLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxPQUFPLFNBQVMsV0FBVyxVQUFVLENBQUM7QUFDeEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBwZXJjZW50Rm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGNvbnN0IG91dHB1dFZhbHVlID0gdmFsdWUgPiAwID8gdmFsdWUgLyAxMDAgOiAwO1xyXG4gIHJldHVybiBgPHNwYW4+JHtvdXRwdXRWYWx1ZX0lPC9zcGFuPmA7XHJcbn07XHJcbiJdfQ==