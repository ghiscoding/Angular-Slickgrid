/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a cell value and translates it with the "ngx-translate" service
 * @type {?}
 */
export var translateFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    /** @type {?} */
    var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    /** @type {?} */
    var options = gridOptions || columnDef.params || {};
    /** @type {?} */
    var translate = options.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
    }
    // make sure the value is a string (for example a boolean value would throw an error)
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3RyYW5zbGF0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sS0FBTyxrQkFBa0IsR0FBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxJQUFTOztRQUMzSCxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1FBQ3RGLE9BQU8sR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztRQUMvQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUk7SUFFOUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMscU5BQ2dFLENBQUMsQ0FBQztLQUNuRjtJQUVELHFGQUFxRjtJQUNyRixJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BELEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vKiogVGFrZXMgYSBjZWxsIHZhbHVlIGFuZCB0cmFuc2xhdGVzIGl0IHdpdGggdGhlIFwibmd4LXRyYW5zbGF0ZVwiIHNlcnZpY2UgKi9cclxuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55LCBncmlkOiBhbnkpID0+IHtcclxuICBjb25zdCBncmlkT3B0aW9ucyA9IChncmlkICYmIHR5cGVvZiBncmlkLmdldE9wdGlvbnMgPT09ICdmdW5jdGlvbicpID8gZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICBjb25zdCBvcHRpb25zID0gZ3JpZE9wdGlvbnMgfHwgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBvcHRpb25zLmkxOG47XHJcblxyXG4gIGlmICghdHJhbnNsYXRlIHx8IHR5cGVvZiB0cmFuc2xhdGUuaW5zdGFudCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgdHJhbnNsYXRlIGZvcm1hdHRlciByZXF1aXJlcyB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgU2VydmljZSB0byBiZSBwcm92aWRlZCBhcyBhIEdyaWQgT3B0aW9ucyBvciBDb2x1bW4gRGVmaW5pdGlvbiBcImkxOG5cIi5cclxuICAgIEZvciBleGFtcGxlOiB0aGlzLmdyaWRPcHRpb25zID0geyBlbmFibGVUcmFuc2xhdGU6IHRydWUsIGkxOG46IHRoaXMudHJhbnNsYXRlIH1gKTtcclxuICB9XHJcblxyXG4gIC8vIG1ha2Ugc3VyZSB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgKGZvciBleGFtcGxlIGEgYm9vbGVhbiB2YWx1ZSB3b3VsZCB0aHJvdyBhbiBlcnJvcilcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICB2YWx1ZSA9IHZhbHVlICsgJyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsdWUgPyB0cmFuc2xhdGUuaW5zdGFudCh2YWx1ZSkgOiAnJztcclxufTtcclxuIl19