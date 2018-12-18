/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ExportOption() { }
if (false) {
    /**
     * export delimiter, can be (comma, tab, ... or even custom string).
     * @type {?|undefined}
     */
    ExportOption.prototype.delimiter;
    /**
     * Defaults to false, which leads to all Formatters of the grid being evaluated on export. You can also override a column by changing the propery on the column itself
     * @type {?|undefined}
     */
    ExportOption.prototype.exportWithFormatter;
    /**
     * filename (without extension)
     * @type {?|undefined}
     */
    ExportOption.prototype.filename;
    /**
     * file type format, typically csv or txt (this will provide the extension)
     * @type {?|undefined}
     */
    ExportOption.prototype.format;
    /**
     * The column header title (at A0 in Excel) of the Group by. If nothing is provided it will use "Group By" (which is a translated value of GROUP_BY i18n)
     * @type {?|undefined}
     */
    ExportOption.prototype.groupingColumnHeaderTitle;
    /**
     * The default text to display in 1st column of the File Export, which will identify that the current row is a Grouping Aggregator
     * @type {?|undefined}
     */
    ExportOption.prototype.groupingAggregatorRowText;
    /**
     * Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export.
     * @type {?|undefined}
     */
    ExportOption.prototype.sanitizeDataExport;
    /**
     * If you want to use UTF-8 and unicode, in most case it's better to use it with BOM.
     * This will basically add a special string  at the beginning of the file "ï»¿" which will tell the application that it is UTF-8 format.
     * @type {?|undefined}
     */
    ExportOption.prototype.useUtf8WithBom;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0T3B0aW9uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2V4cG9ydE9wdGlvbi5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLGtDQTJCQzs7Ozs7O0lBekJDLGlDQUFtQzs7Ozs7SUFHbkMsMkNBQThCOzs7OztJQUc5QixnQ0FBa0I7Ozs7O0lBR2xCLDhCQUFrQjs7Ozs7SUFHbEIsaURBQW1DOzs7OztJQUduQyxpREFBbUM7Ozs7O0lBR25DLDBDQUE2Qjs7Ozs7O0lBTTdCLHNDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlbGltaXRlclR5cGUsIEZpbGVUeXBlIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFeHBvcnRPcHRpb24ge1xyXG4gIC8qKiBleHBvcnQgZGVsaW1pdGVyLCBjYW4gYmUgKGNvbW1hLCB0YWIsIC4uLiBvciBldmVuIGN1c3RvbSBzdHJpbmcpLiAqL1xyXG4gIGRlbGltaXRlcj86IERlbGltaXRlclR5cGUgfCBzdHJpbmc7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gYWxsIEZvcm1hdHRlcnMgb2YgdGhlIGdyaWQgYmVpbmcgZXZhbHVhdGVkIG9uIGV4cG9ydC4gWW91IGNhbiBhbHNvIG92ZXJyaWRlIGEgY29sdW1uIGJ5IGNoYW5naW5nIHRoZSBwcm9wZXJ5IG9uIHRoZSBjb2x1bW4gaXRzZWxmICovXHJcbiAgZXhwb3J0V2l0aEZvcm1hdHRlcj86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBmaWxlbmFtZSAod2l0aG91dCBleHRlbnNpb24pICovXHJcbiAgZmlsZW5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBmaWxlIHR5cGUgZm9ybWF0LCB0eXBpY2FsbHkgY3N2IG9yIHR4dCAodGhpcyB3aWxsIHByb3ZpZGUgdGhlIGV4dGVuc2lvbikgKi9cclxuICBmb3JtYXQ/OiBGaWxlVHlwZTtcclxuXHJcbiAgLyoqIFRoZSBjb2x1bW4gaGVhZGVyIHRpdGxlIChhdCBBMCBpbiBFeGNlbCkgb2YgdGhlIEdyb3VwIGJ5LiBJZiBub3RoaW5nIGlzIHByb3ZpZGVkIGl0IHdpbGwgdXNlIFwiR3JvdXAgQnlcIiAod2hpY2ggaXMgYSB0cmFuc2xhdGVkIHZhbHVlIG9mIEdST1VQX0JZIGkxOG4pICovXHJcbiAgZ3JvdXBpbmdDb2x1bW5IZWFkZXJUaXRsZT86IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBkZWZhdWx0IHRleHQgdG8gZGlzcGxheSBpbiAxc3QgY29sdW1uIG9mIHRoZSBGaWxlIEV4cG9ydCwgd2hpY2ggd2lsbCBpZGVudGlmeSB0aGF0IHRoZSBjdXJyZW50IHJvdyBpcyBhIEdyb3VwaW5nIEFnZ3JlZ2F0b3IgKi9cclxuICBncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0Pzogc3RyaW5nO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIGxlYWRzIHRvIFNhbml0aXppbmcgYWxsIGRhdGEgKHN0cmlwaW5nIG91dCBhbnkgSFRNTCB0YWdzKSB3aGVuIGJlaW5nIGV2YWx1YXRlZCBvbiBleHBvcnQuICovXHJcbiAgc2FuaXRpemVEYXRhRXhwb3J0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgeW91IHdhbnQgdG8gdXNlIFVURi04IGFuZCB1bmljb2RlLCBpbiBtb3N0IGNhc2UgaXQncyBiZXR0ZXIgdG8gdXNlIGl0IHdpdGggQk9NLlxyXG4gICAqIFRoaXMgd2lsbCBiYXNpY2FsbHkgYWRkIGEgc3BlY2lhbCBzdHJpbmcgIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGZpbGUgXCLDr8K7wr9cIiB3aGljaCB3aWxsIHRlbGwgdGhlIGFwcGxpY2F0aW9uIHRoYXQgaXQgaXMgVVRGLTggZm9ybWF0LlxyXG4gICAqL1xyXG4gIHVzZVV0ZjhXaXRoQm9tPzogYm9vbGVhbjtcclxufVxyXG4iXX0=