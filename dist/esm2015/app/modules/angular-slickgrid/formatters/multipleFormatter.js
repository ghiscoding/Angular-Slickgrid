/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const multipleFormatter = (row, cell, value, columnDef, dataContext, grid) => {
    /** @type {?} */
    const params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error(`The multiple formatter requires the "formatters" to be provided as a column params.
    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }`);
    }
    /** @type {?} */
    const formatters = params.formatters;
    // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
    // they are piped and executed in sequences
    /** @type {?} */
    let currentValue = value;
    for (const formatter of formatters) {
        currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
    }
    return currentValue;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvbXVsdGlwbGVGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxNQUFNLE9BQU8saUJBQWlCLEdBQWMsQ0FBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCLEVBQUUsSUFBUyxFQUFFLEVBQUU7O1VBQzlILE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUU7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDOzJLQUN1SixDQUFDLENBQUM7S0FDMUs7O1VBQ0ssVUFBVSxHQUFnQixNQUFNLENBQUMsVUFBVTs7OztRQUk3QyxZQUFZLEdBQUcsS0FBSztJQUN4QixLQUFLLE1BQU0sU0FBUyxJQUFJLFVBQVUsRUFBRTtRQUNsQyxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakY7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3QgbXVsdGlwbGVGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSwgZ3JpZDogYW55KSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBpZiAoIXBhcmFtcy5mb3JtYXR0ZXJzIHx8ICFBcnJheS5pc0FycmF5KHBhcmFtcy5mb3JtYXR0ZXJzKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgbXVsdGlwbGUgZm9ybWF0dGVyIHJlcXVpcmVzIHRoZSBcImZvcm1hdHRlcnNcIiB0byBiZSBwcm92aWRlZCBhcyBhIGNvbHVtbiBwYXJhbXMuXHJcbiAgICBGb3IgZXhhbXBsZTogdGhpcy5jb2x1bW5EZWZpbml0aW9ucyA9IFt7IGlkOiB0aXRsZSwgZmllbGQ6IHRpdGxlLCBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMubXVsdGlwbGUsIHBhcmFtczogeyBmb3JtYXR0ZXJzOiBbRm9ybWF0dGVycy5sb3dlcmNhc2UsIEZvcm1hdHRlcnMudXBwZXJjYXNlXSB9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IGZvcm1hdHRlcnM6IEZvcm1hdHRlcltdID0gcGFyYW1zLmZvcm1hdHRlcnM7XHJcblxyXG4gIC8vIGxvb3AgdGhyb3VnaCBhbGwgRm9ybWF0dGVycywgdGhlIHZhbHVlIG9mIDFzdCBmb3JtYXR0ZXIgd2lsbCBiZSB1c2VkIGJ5IDJuZCBmb3JtYXR0ZXIgYW5kIHNvIG9uLlxyXG4gIC8vIHRoZXkgYXJlIHBpcGVkIGFuZCBleGVjdXRlZCBpbiBzZXF1ZW5jZXNcclxuICBsZXQgY3VycmVudFZhbHVlID0gdmFsdWU7XHJcbiAgZm9yIChjb25zdCBmb3JtYXR0ZXIgb2YgZm9ybWF0dGVycykge1xyXG4gICAgY3VycmVudFZhbHVlID0gZm9ybWF0dGVyKHJvdywgY2VsbCwgY3VycmVudFZhbHVlLCBjb2x1bW5EZWYsIGRhdGFDb250ZXh0LCBncmlkKTtcclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcclxufTtcclxuIl19