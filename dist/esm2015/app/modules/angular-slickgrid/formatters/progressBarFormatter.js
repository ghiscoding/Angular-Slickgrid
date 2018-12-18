/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const progressBarFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '';
    }
    /** @type {?} */
    let color;
    if (value < 30) {
        color = 'danger';
    }
    else if (value < 70) {
        color = 'warning';
    }
    else {
        color = 'success';
    }
    return `<div class="progress">
    <div class="progress-bar progress-bar-${color} bg-${color}" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width: ${value}%;">
    ${value}%
    </div>
  </div>`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NCYXJGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvcHJvZ3Jlc3NCYXJGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLE9BQU8sb0JBQW9CLEdBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQVUsRUFBRTtJQUNwSSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtRQUNsQyxPQUFPLEVBQUUsQ0FBQztLQUNYOztRQUVHLEtBQUs7SUFFVCxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7UUFDZCxLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1FBQ3JCLEtBQUssR0FBRyxTQUFTLENBQUM7S0FDbkI7U0FBTTtRQUNMLEtBQUssR0FBRyxTQUFTLENBQUM7S0FDbkI7SUFFRCxPQUFPOzRDQUNtQyxLQUFLLE9BQU8sS0FBSyx1Q0FBdUMsS0FBSyx5RUFBeUUsS0FBSztNQUNqTCxLQUFLOztTQUVGLENBQUM7QUFDVixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByb2dyZXNzQmFyRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGxldCBjb2xvcjtcclxuXHJcbiAgaWYgKHZhbHVlIDwgMzApIHtcclxuICAgIGNvbG9yID0gJ2Rhbmdlcic7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZSA8IDcwKSB7XHJcbiAgICBjb2xvciA9ICd3YXJuaW5nJztcclxuICB9IGVsc2Uge1xyXG4gICAgY29sb3IgPSAnc3VjY2Vzcyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItJHtjb2xvcn0gYmctJHtjb2xvcn1cIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbm93PVwiJHt2YWx1ZX1cIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIm1pbi13aWR0aDogMmVtOyB3aWR0aDogJHt2YWx1ZX0lO1wiPlxyXG4gICAgJHt2YWx1ZX0lXHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5gO1xyXG59O1xyXG4iXX0=