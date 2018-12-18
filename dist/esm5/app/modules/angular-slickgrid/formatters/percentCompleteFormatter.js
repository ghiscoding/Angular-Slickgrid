/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var percentCompleteFormatter = function (row, cell, value, columnDef, dataContext) {
    if (value === null || value === '') {
        return '-';
    }
    else if (value < 50) {
        return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    }
    else {
        return "<span style='color:green'>" + value + "%</span>";
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyY2VudENvbXBsZXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3BlcmNlbnRDb21wbGV0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE1BQU0sS0FBTyx3QkFBd0IsR0FBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7SUFDNUgsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtRQUNyQixPQUFPLCtDQUE2QyxLQUFLLGFBQVUsQ0FBQztLQUNyRTtTQUFNO1FBQ0wsT0FBTywrQkFBNkIsS0FBSyxhQUFVLENBQUM7S0FDckQ7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sdW1uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBlcmNlbnRDb21wbGV0ZUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XHJcbiAgICByZXR1cm4gJy0nO1xyXG4gIH0gZWxzZSBpZiAodmFsdWUgPCA1MCkge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT0nY29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7Jz4ke3ZhbHVlfSU8L3NwYW4+YDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGA8c3BhbiBzdHlsZT0nY29sb3I6Z3JlZW4nPiR7dmFsdWV9JTwvc3Bhbj5gO1xyXG4gIH1cclxufTtcclxuIl19