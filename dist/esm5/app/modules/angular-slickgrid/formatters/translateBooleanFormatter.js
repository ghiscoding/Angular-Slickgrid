/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service
 * @type {?}
 */
export var translateBooleanFormatter = function (row, cell, value, columnDef, dataContext, grid) {
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
    return value ? translate.instant((/** @type {?} */ (value.toUpperCase()))) : '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy90cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsTUFBTSxLQUFPLHlCQUF5QixHQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLElBQVM7O1FBQ2xJLFdBQVcsR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7UUFDdEYsT0FBTyxHQUFHLFdBQVcsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7O1FBQy9DLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSTtJQUU5QixJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sU0FBUyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7UUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxTkFDZ0UsQ0FBQyxDQUFDO0tBQ25GO0lBRUQscUZBQXFGO0lBQ3JGLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEQsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDcEI7SUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBQSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLyoqIFRha2VzIGEgYm9vbGVhbiB2YWx1ZSwgY2FzdCBpdCB0byB1cHBlckNhc2Ugc3RyaW5nIGFuZCBmaW5hbGx5IHRyYW5zbGF0ZXMgaXQgd2l0aCB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgc2VydmljZSAqL1xyXG5leHBvcnQgY29uc3QgdHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55LCBncmlkOiBhbnkpID0+IHtcclxuICBjb25zdCBncmlkT3B0aW9ucyA9IChncmlkICYmIHR5cGVvZiBncmlkLmdldE9wdGlvbnMgPT09ICdmdW5jdGlvbicpID8gZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICBjb25zdCBvcHRpb25zID0gZ3JpZE9wdGlvbnMgfHwgY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBjb25zdCB0cmFuc2xhdGUgPSBvcHRpb25zLmkxOG47XHJcblxyXG4gIGlmICghdHJhbnNsYXRlIHx8IHR5cGVvZiB0cmFuc2xhdGUuaW5zdGFudCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgdHJhbnNsYXRlIGZvcm1hdHRlciByZXF1aXJlcyB0aGUgXCJuZ3gtdHJhbnNsYXRlXCIgU2VydmljZSB0byBiZSBwcm92aWRlZCBhcyBhIEdyaWQgT3B0aW9ucyBvciBDb2x1bW4gRGVmaW5pdGlvbiBcImkxOG5cIi5cclxuICAgIEZvciBleGFtcGxlOiB0aGlzLmdyaWRPcHRpb25zID0geyBlbmFibGVUcmFuc2xhdGU6IHRydWUsIGkxOG46IHRoaXMudHJhbnNsYXRlIH1gKTtcclxuICB9XHJcblxyXG4gIC8vIG1ha2Ugc3VyZSB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgKGZvciBleGFtcGxlIGEgYm9vbGVhbiB2YWx1ZSB3b3VsZCB0aHJvdyBhbiBlcnJvcilcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICB2YWx1ZSA9IHZhbHVlICsgJyc7XHJcbiAgfVxyXG4gIHJldHVybiB2YWx1ZSA/IHRyYW5zbGF0ZS5pbnN0YW50KHZhbHVlLnRvVXBwZXJDYXNlKCkgYXMgc3RyaW5nKSA6ICcnO1xyXG59O1xyXG4iXX0=