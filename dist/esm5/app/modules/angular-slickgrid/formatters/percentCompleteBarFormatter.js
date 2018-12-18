/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var percentCompleteBarFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '';
    }
    /** @type {?} */
    var color;
    if (value < 30) {
        color = 'red';
    }
    else if (value < 70) {
        color = 'silver';
    }
    else {
        color = 'green';
    }
    return "<span class=\"percent-complete-bar\" style=\"background:" + color + "; width:" + value + "%\"></span>";
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sS0FBTywyQkFBMkIsR0FBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7SUFDL0gsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxFQUFFLENBQUM7S0FDWDs7UUFFRyxLQUFLO0lBRVQsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1FBQ2QsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUNmO1NBQU0sSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1FBQ3JCLEtBQUssR0FBRyxRQUFRLENBQUM7S0FDbEI7U0FBTTtRQUNMLEtBQUssR0FBRyxPQUFPLENBQUM7S0FDakI7SUFFRCxPQUFPLDZEQUF3RCxLQUFLLGdCQUFXLEtBQUssZ0JBQVksQ0FBQztBQUNuRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBsZXQgY29sb3I7XHJcblxyXG4gIGlmICh2YWx1ZSA8IDMwKSB7XHJcbiAgICBjb2xvciA9ICdyZWQnO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPCA3MCkge1xyXG4gICAgY29sb3IgPSAnc2lsdmVyJztcclxuICB9IGVsc2Uge1xyXG4gICAgY29sb3IgPSAnZ3JlZW4nO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInBlcmNlbnQtY29tcGxldGUtYmFyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiR7Y29sb3J9OyB3aWR0aDoke3ZhbHVlfSVcIj48L3NwYW4+YDtcclxufTtcclxuIl19