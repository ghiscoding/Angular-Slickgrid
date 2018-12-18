/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const percentCompleteBarFormatter = (row, cell, value, columnDef, dataContext) => {
    if (value === null || value === '') {
        return '';
    }
    /** @type {?} */
    let color;
    if (value < 30) {
        color = 'red';
    }
    else if (value < 70) {
        color = 'silver';
    }
    else {
        color = 'green';
    }
    return `<span class="percent-complete-bar" style="background:${color}; width:${value}%"></span>`;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sT0FBTywyQkFBMkIsR0FBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBVSxFQUFFO0lBQzNJLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ2xDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1FBRUcsS0FBSztJQUVULElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtRQUNkLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDZjtTQUFNLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtRQUNyQixLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQ2xCO1NBQU07UUFDTCxLQUFLLEdBQUcsT0FBTyxDQUFDO0tBQ2pCO0lBRUQsT0FBTyx3REFBd0QsS0FBSyxXQUFXLEtBQUssWUFBWSxDQUFDO0FBQ25HLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9jb2x1bW4uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvZm9ybWF0dGVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY29uc3QgcGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyOiBGb3JtYXR0ZXIgPSAocm93OiBudW1iZXIsIGNlbGw6IG51bWJlciwgdmFsdWU6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIGRhdGFDb250ZXh0OiBhbnkpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGxldCBjb2xvcjtcclxuXHJcbiAgaWYgKHZhbHVlIDwgMzApIHtcclxuICAgIGNvbG9yID0gJ3JlZCc7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZSA8IDcwKSB7XHJcbiAgICBjb2xvciA9ICdzaWx2ZXInO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb2xvciA9ICdncmVlbic7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYDxzcGFuIGNsYXNzPVwicGVyY2VudC1jb21wbGV0ZS1iYXJcIiBzdHlsZT1cImJhY2tncm91bmQ6JHtjb2xvcn07IHdpZHRoOiR7dmFsdWV9JVwiPjwvc3Bhbj5gO1xyXG59O1xyXG4iXX0=