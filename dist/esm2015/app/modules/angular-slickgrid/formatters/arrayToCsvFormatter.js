/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const arrayToCsvFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value && Array.isArray(value)) {
        /** @type {?} */
        const values = value.join(', ');
        return `<span title="${values}">${values}</span>`;
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlUb0NzdkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9hcnJheVRvQ3N2Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsTUFBTSxPQUFPLG1CQUFtQixHQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLEVBQUU7SUFDM0gsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTs7Y0FDM0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLE9BQU8sZ0JBQWdCLE1BQU0sS0FBSyxNQUFNLFNBQVMsQ0FBQztLQUNuRDtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBhcnJheVRvQ3N2Rm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpID0+IHtcclxuICBpZiAodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlLmpvaW4oJywgJyk7XHJcbiAgICByZXR1cm4gYDxzcGFuIHRpdGxlPVwiJHt2YWx1ZXN9XCI+JHt2YWx1ZXN9PC9zcGFuPmA7XHJcbiAgfVxyXG4gIHJldHVybiAnJztcclxufTtcclxuIl19