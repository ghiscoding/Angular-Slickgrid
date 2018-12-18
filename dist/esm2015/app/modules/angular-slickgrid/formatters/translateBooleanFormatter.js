/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service
 * @type {?}
 */
export const translateBooleanFormatter = (row, cell, value, columnDef, dataContext, grid) => {
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
    return value ? translate.instant((/** @type {?} */ (value.toUpperCase()))) : '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlQm9vbGVhbkZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy90cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsTUFBTSxPQUFPLHlCQUF5QixHQUFjLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLElBQVMsRUFBRSxFQUFFOztVQUN0SSxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1VBQ3RGLE9BQU8sR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFOztVQUMvQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUk7SUFFOUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUM7b0ZBQ2dFLENBQUMsQ0FBQztLQUNuRjtJQUVELHFGQUFxRjtJQUNyRixJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BELEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8qKiBUYWtlcyBhIGJvb2xlYW4gdmFsdWUsIGNhc3QgaXQgdG8gdXBwZXJDYXNlIHN0cmluZyBhbmQgZmluYWxseSB0cmFuc2xhdGVzIGl0IHdpdGggdGhlIFwibmd4LXRyYW5zbGF0ZVwiIHNlcnZpY2UgKi9cclxuZXhwb3J0IGNvbnN0IHRyYW5zbGF0ZUJvb2xlYW5Gb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSwgZ3JpZDogYW55KSA9PiB7XHJcbiAgY29uc3QgZ3JpZE9wdGlvbnMgPSAoZ3JpZCAmJiB0eXBlb2YgZ3JpZC5nZXRPcHRpb25zID09PSAnZnVuY3Rpb24nKSA/IGdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgY29uc3Qgb3B0aW9ucyA9IGdyaWRPcHRpb25zIHx8IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgY29uc3QgdHJhbnNsYXRlID0gb3B0aW9ucy5pMThuO1xyXG5cclxuICBpZiAoIXRyYW5zbGF0ZSB8fCB0eXBlb2YgdHJhbnNsYXRlLmluc3RhbnQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHRyYW5zbGF0ZSBmb3JtYXR0ZXIgcmVxdWlyZXMgdGhlIFwibmd4LXRyYW5zbGF0ZVwiIFNlcnZpY2UgdG8gYmUgcHJvdmlkZWQgYXMgYSBHcmlkIE9wdGlvbnMgb3IgQ29sdW1uIERlZmluaXRpb24gXCJpMThuXCIuXHJcbiAgICBGb3IgZXhhbXBsZTogdGhpcy5ncmlkT3B0aW9ucyA9IHsgZW5hYmxlVHJhbnNsYXRlOiB0cnVlLCBpMThuOiB0aGlzLnRyYW5zbGF0ZSB9YCk7XHJcbiAgfVxyXG5cclxuICAvLyBtYWtlIHN1cmUgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIChmb3IgZXhhbXBsZSBhIGJvb2xlYW4gdmFsdWUgd291bGQgdGhyb3cgYW4gZXJyb3IpXHJcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xyXG4gICAgdmFsdWUgPSB2YWx1ZSArICcnO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWUgPyB0cmFuc2xhdGUuaW5zdGFudCh2YWx1ZS50b1VwcGVyQ2FzZSgpIGFzIHN0cmluZykgOiAnJztcclxufTtcclxuIl19