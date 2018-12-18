/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a cell value and translates it with the "ngx-translate" service
 * @type {?}
 */
export const translateFormatter = (row, cell, value, columnDef, dataContext, grid) => {
    /** @type {?} */
    const gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
    /** @type {?} */
    const options = gridOptions || columnDef.params || {};
    /** @type {?} */
    const translate = options.i18n;
    if (!translate || typeof translate.instant !== 'function') {
        throw new Error(`The translate formatter requires the "ngx-translate" Service to be provided as a Grid Options or Column Definition "i18n".
    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }`);
    }
    // make sure the value is a string (for example a boolean value would throw an error)
    if (value !== undefined && typeof value !== 'string') {
        value = value + '';
    }
    return value ? translate.instant(value) : '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlRm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9mb3JtYXR0ZXJzL3RyYW5zbGF0ZUZvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUdBLE1BQU0sT0FBTyxrQkFBa0IsR0FBYyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0IsRUFBRSxJQUFTLEVBQUUsRUFBRTs7VUFDL0gsV0FBVyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFOztVQUN0RixPQUFPLEdBQUcsV0FBVyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRTs7VUFDL0MsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJO0lBRTlCLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtRQUN6RCxNQUFNLElBQUksS0FBSyxDQUFDO29GQUNnRSxDQUFDLENBQUM7S0FDbkY7SUFFRCxxRkFBcUY7SUFDckYsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwRCxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUNwQjtJQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRm9ybWF0dGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBhbmQgdHJhbnNsYXRlcyBpdCB3aXRoIHRoZSBcIm5neC10cmFuc2xhdGVcIiBzZXJ2aWNlICovXHJcbmV4cG9ydCBjb25zdCB0cmFuc2xhdGVGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSwgZ3JpZDogYW55KSA9PiB7XHJcbiAgY29uc3QgZ3JpZE9wdGlvbnMgPSAoZ3JpZCAmJiB0eXBlb2YgZ3JpZC5nZXRPcHRpb25zID09PSAnZnVuY3Rpb24nKSA/IGdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgY29uc3Qgb3B0aW9ucyA9IGdyaWRPcHRpb25zIHx8IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gb3B0aW9ucy5pMThuO1xyXG5cclxuICBpZiAoIXRyYW5zbGF0ZSB8fCB0eXBlb2YgdHJhbnNsYXRlLmluc3RhbnQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHRyYW5zbGF0ZSBmb3JtYXR0ZXIgcmVxdWlyZXMgdGhlIFwibmd4LXRyYW5zbGF0ZVwiIFNlcnZpY2UgdG8gYmUgcHJvdmlkZWQgYXMgYSBHcmlkIE9wdGlvbnMgb3IgQ29sdW1uIERlZmluaXRpb24gXCJpMThuXCIuXHJcbiAgICBGb3IgZXhhbXBsZTogdGhpcy5ncmlkT3B0aW9ucyA9IHsgZW5hYmxlVHJhbnNsYXRlOiB0cnVlLCBpMThuOiB0aGlzLnRyYW5zbGF0ZSB9YCk7XHJcbiAgfVxyXG5cclxuICAvLyBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIChmb3IgZXhhbXBsZSBhIGJvb2xlYW4gdmFsdWUgd291bGQgdGhyb3cgYW4gZXJyb3IpXHJcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgdmFsdWUgPSB2YWx1ZSArICcnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbHVlID8gdHJhbnNsYXRlLmluc3RhbnQodmFsdWUpIDogJyc7XHJcbn07XHJcbiJdfQ==