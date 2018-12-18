/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const percentCompleteFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '-';
    }
    else if (value < 50) {
        return `<span style='color:red;font-weight:bold;'>${value}%</span>`;
    }
    else {
        return `<span style='color:green'>${value}%</span>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sT0FBTyx3QkFBd0IsR0FBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBVSxFQUFFO0lBQ3hJLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ2xDLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTSxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7UUFDckIsT0FBTyw2Q0FBNkMsS0FBSyxVQUFVLENBQUM7S0FDckU7U0FBTTtRQUNMLE9BQU8sNkJBQTZCLEtBQUssVUFBVSxDQUFDO0tBQ3JEO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9mb3JtYXR0ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBwZXJjZW50Q29tcGxldGVGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xyXG4gICAgcmV0dXJuICctJztcclxuICB9IGVsc2UgaWYgKHZhbHVlIDwgNTApIHtcclxuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9J2NvbG9yOnJlZDtmb250LXdlaWdodDpib2xkOyc+JHt2YWx1ZX0lPC9zcGFuPmA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBgPHNwYW4gc3R5bGU9J2NvbG9yOmdyZWVuJz4ke3ZhbHVlfSU8L3NwYW4+YDtcclxuICB9XHJcbn07XHJcbiJdfQ==