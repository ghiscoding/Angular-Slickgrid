/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ColumnFilter() { }
if (false) {
    /**
     * Do we want to bypass the Backend Query? Commonly used with an OData Backend Service, if we want to filter without calling the regular OData query.
     * @type {?|undefined}
     */
    ColumnFilter.prototype.bypassBackendQuery;
    /**
     * Column ID
     * @type {?|undefined}
     */
    ColumnFilter.prototype.columnId;
    /**
     * Column Definition
     * @type {?|undefined}
     */
    ColumnFilter.prototype.columnDef;
    /**
     * Custom Filter
     * @type {?|undefined}
     */
    ColumnFilter.prototype.customFilter;
    /**
     * Search terms (collection)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.searchTerms;
    /**
     * Operator to use when filtering (>, >=, EQ, IN, ...)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.operator;
    /**
     * Maximum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.maxValue;
    /**
     * Minimum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.minValue;
    /**
     * Filter to use (input, multipleSelect, singleSelect, select, custom)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.model;
    /**
     * A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Filter)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionAsync;
    /**
     * A collection of items/options (commonly used with a Select/Multi-Select Filter)
     * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collection;
    /**
     * Options to change the behavior of the "collection"
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionOptions;
    /**
     * We could filter some 1 or more items from the collection
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionFilterBy;
    /**
     * We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True
     * @type {?|undefined}
     */
    ColumnFilter.prototype.collectionSortBy;
    /**
     * A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Filter
     * @type {?|undefined}
     */
    ColumnFilter.prototype.customStructure;
    /**
     * Options that could be provided to the Filter, example: { container: 'body', maxHeight: 250}
     * @type {?|undefined}
     */
    ColumnFilter.prototype.filterOptions;
    /**
     * Defaults to false, when set it will render any HTML code instead of removing it
     * So far only used in the MultipleSelect & SingleSelect Filters will support it
     * @type {?|undefined}
     */
    ColumnFilter.prototype.enableRenderHtml;
    /**
     * Do we want the Filter to handle translation (localization)?
     * @type {?|undefined}
     */
    ColumnFilter.prototype.enableTranslateLabel;
    /**
     * Use "params" to pass any type of arguments to your Custom Filter
     * for example, to pass a second collection to a select Filter we can type this:
     * params: { options: [{ value: true, label: 'True' }, { value: true, label: 'True'} ]}
     * @type {?|undefined}
     */
    ColumnFilter.prototype.params;
    /**
     * Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider)
     * @type {?|undefined}
     */
    ColumnFilter.prototype.valueStep;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uRmlsdGVyLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbkZpbHRlci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWNBLGtDQXNFQzs7Ozs7O0lBcEVDLDBDQUE2Qjs7Ozs7SUFHN0IsZ0NBQWtCOzs7OztJQUdsQixpQ0FBbUI7Ozs7O0lBR25CLG9DQUFzQjs7Ozs7SUFHdEIsbUNBQTJCOzs7OztJQUczQixnQ0FBeUM7Ozs7O0lBR3pDLGdDQUEyQjs7Ozs7SUFHM0IsZ0NBQTJCOzs7OztJQUczQiw2QkFBWTs7Ozs7SUFHWix1Q0FBZ0U7Ozs7OztJQU1oRSxrQ0FBbUI7Ozs7O0lBR25CLHlDQUFxQzs7Ozs7SUFHckMsMENBQStEOzs7OztJQUcvRCx3Q0FBeUQ7Ozs7O0lBR3pELHVDQUE0Qzs7Ozs7SUFHNUMscUNBQTJDOzs7Ozs7SUFNM0Msd0NBQTRCOzs7OztJQUc1Qiw0Q0FBK0I7Ozs7Ozs7SUFPL0IsOEJBQWE7Ozs7O0lBR2IsaUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlLFxyXG4gIENvbGxlY3Rpb25GaWx0ZXJCeSxcclxuICBDb2xsZWN0aW9uT3B0aW9uLFxyXG4gIENvbGxlY3Rpb25Tb3J0QnksXHJcbiAgQ29sdW1uLFxyXG4gIEZpbHRlcixcclxuICBNdWx0aXBsZVNlbGVjdE9wdGlvbixcclxuICBPcGVyYXRvclN0cmluZyxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgU2VhcmNoVGVybVxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5GaWx0ZXIge1xyXG4gIC8qKiBEbyB3ZSB3YW50IHRvIGJ5cGFzcyB0aGUgQmFja2VuZCBRdWVyeT8gQ29tbW9ubHkgdXNlZCB3aXRoIGFuIE9EYXRhIEJhY2tlbmQgU2VydmljZSwgaWYgd2Ugd2FudCB0byBmaWx0ZXIgd2l0aG91dCBjYWxsaW5nIHRoZSByZWd1bGFyIE9EYXRhIHF1ZXJ5LiAqL1xyXG4gIGJ5cGFzc0JhY2tlbmRRdWVyeT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDb2x1bW4gSUQgKi9cclxuICBjb2x1bW5JZD86IHN0cmluZztcclxuXHJcbiAgLyoqIENvbHVtbiBEZWZpbml0aW9uICovXHJcbiAgY29sdW1uRGVmPzogQ29sdW1uO1xyXG5cclxuICAvKiogQ3VzdG9tIEZpbHRlciAqL1xyXG4gIGN1c3RvbUZpbHRlcj86IEZpbHRlcjtcclxuXHJcbiAgLyoqIFNlYXJjaCB0ZXJtcyAoY29sbGVjdGlvbikgKi9cclxuICBzZWFyY2hUZXJtcz86IFNlYXJjaFRlcm1bXTtcclxuXHJcbiAgLyoqIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGZpbHRlcmluZyAoPiwgPj0sIEVRLCBJTiwgLi4uKSAqL1xyXG4gIG9wZXJhdG9yPzogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmc7XHJcblxyXG4gIC8qKiBNYXhpbXVtIHZhbHVlIG9mIHRoZSBmaWx0ZXIsIHdvcmtzIG9ubHkgd2l0aCBGaWx0ZXJzIHN1cHBvcnRpbmcgaXQgKHRleHQsIG51bWJlciwgZmxvYXQsIHNsaWRlcikgKi9cclxuICBtYXhWYWx1ZT86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqIE1pbmltdW0gdmFsdWUgb2YgdGhlIGZpbHRlciwgd29ya3Mgb25seSB3aXRoIEZpbHRlcnMgc3VwcG9ydGluZyBpdCAodGV4dCwgbnVtYmVyLCBmbG9hdCwgc2xpZGVyKSAqL1xyXG4gIG1pblZhbHVlPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKiogRmlsdGVyIHRvIHVzZSAoaW5wdXQsIG11bHRpcGxlU2VsZWN0LCBzaW5nbGVTZWxlY3QsIHNlbGVjdCwgY3VzdG9tKSAqL1xyXG4gIG1vZGVsPzogYW55O1xyXG5cclxuICAvKiogQSBjb2xsZWN0aW9uIG9mIGl0ZW1zL29wdGlvbnMgdGhhdCB3aWxsIGJlIGxvYWRlZCBhc3luY2hyb25vdXNseSAoY29tbW9ubHkgdXNlZCB3aXRoIGEgU2VsZWN0L011bHRpLVNlbGVjdCBGaWx0ZXIpICovXHJcbiAgY29sbGVjdGlvbkFzeW5jPzogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgU3ViamVjdDxhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBBIGNvbGxlY3Rpb24gb2YgaXRlbXMvb3B0aW9ucyAoY29tbW9ubHkgdXNlZCB3aXRoIGEgU2VsZWN0L011bHRpLVNlbGVjdCBGaWx0ZXIpXHJcbiAgICogSXQgY2FuIGJlIGEgY29sbGVjdGlvbiBvZiBzdHJpbmcgb3IgbGFiZWwvdmFsdWUgcGFpciAodGhlIHBhaXIgY2FuIGJlIGN1c3RvbWl6ZWQgdmlhIHRoZSBcImN1c3RvbVN0cnVjdHVyZVwiIG9wdGlvbilcclxuICAgKi9cclxuICBjb2xsZWN0aW9uPzogYW55W107XHJcblxyXG4gIC8qKiBPcHRpb25zIHRvIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgdGhlIFwiY29sbGVjdGlvblwiICovXHJcbiAgY29sbGVjdGlvbk9wdGlvbnM/OiBDb2xsZWN0aW9uT3B0aW9uO1xyXG5cclxuICAvKiogV2UgY291bGQgZmlsdGVyIHNvbWUgMSBvciBtb3JlIGl0ZW1zIGZyb20gdGhlIGNvbGxlY3Rpb24gKi9cclxuICBjb2xsZWN0aW9uRmlsdGVyQnk/OiBDb2xsZWN0aW9uRmlsdGVyQnkgfCBDb2xsZWN0aW9uRmlsdGVyQnlbXTtcclxuXHJcbiAgLyoqIFdlIGNvdWxkIHNvcnQgdGhlIGNvbGxlY3Rpb24gYnkgMSBvciBtb3JlIHByb3BlcnRpZXMsIG9yIGJ5IHRyYW5zbGF0ZWQgdmFsdWUocykgd2hlbiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyBUcnVlICovXHJcbiAgY29sbGVjdGlvblNvcnRCeT86IENvbGxlY3Rpb25Tb3J0QnkgfCBDb2xsZWN0aW9uU29ydEJ5W107XHJcblxyXG4gIC8qKiBBIGN1c3RvbSBzdHJ1Y3R1cmUgY2FuIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBsYWJlbC92YWx1ZSBwYWlyLiBDb21tb25seSB1c2VkIHdpdGggU2VsZWN0L011bHRpLVNlbGVjdCBGaWx0ZXIgKi9cclxuICBjdXN0b21TdHJ1Y3R1cmU/OiBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlO1xyXG5cclxuICAvKiogT3B0aW9ucyB0aGF0IGNvdWxkIGJlIHByb3ZpZGVkIHRvIHRoZSBGaWx0ZXIsIGV4YW1wbGU6IHsgY29udGFpbmVyOiAnYm9keScsIG1heEhlaWdodDogMjUwfSAqL1xyXG4gIGZpbHRlck9wdGlvbnM/OiBNdWx0aXBsZVNlbGVjdE9wdGlvbiB8IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gc2V0IGl0IHdpbGwgcmVuZGVyIGFueSBIVE1MIGNvZGUgaW5zdGVhZCBvZiByZW1vdmluZyBpdFxyXG4gICAqIFNvIGZhciBvbmx5IHVzZWQgaW4gdGhlIE11bHRpcGxlU2VsZWN0ICYgU2luZ2xlU2VsZWN0IEZpbHRlcnMgd2lsbCBzdXBwb3J0IGl0XHJcbiAgICovXHJcbiAgZW5hYmxlUmVuZGVySHRtbCA/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0aGUgRmlsdGVyIHRvIGhhbmRsZSB0cmFuc2xhdGlvbiAobG9jYWxpemF0aW9uKT8gKi9cclxuICBlbmFibGVUcmFuc2xhdGVMYWJlbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSBcInBhcmFtc1wiIHRvIHBhc3MgYW55IHR5cGUgb2YgYXJndW1lbnRzIHRvIHlvdXIgQ3VzdG9tIEZpbHRlclxyXG4gICAqIGZvciBleGFtcGxlLCB0byBwYXNzIGEgc2Vjb25kIGNvbGxlY3Rpb24gdG8gYSBzZWxlY3QgRmlsdGVyIHdlIGNhbiB0eXBlIHRoaXM6XHJcbiAgICogcGFyYW1zOiB7IG9wdGlvbnM6IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0sIHsgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZSd9IF19XHJcbiAgICovXHJcbiAgcGFyYW1zPzogYW55O1xyXG5cclxuICAvKiogU3RlcCB2YWx1ZSBvZiB0aGUgZmlsdGVyLCB3b3JrcyBvbmx5IHdpdGggRmlsdGVycyBzdXBwb3J0aW5nIGl0IChpbnB1dCB0ZXh0LCBudW1iZXIsIGZsb2F0LCByYW5nZSwgc2xpZGVyKSAqL1xyXG4gIHZhbHVlU3RlcD86IG51bWJlciB8IHN0cmluZztcclxufVxyXG4iXX0=