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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uRmlsdGVyLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbkZpbHRlci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWNBLGtDQXNFQzs7Ozs7O0lBcEVDLDBDQUE2Qjs7Ozs7SUFHN0IsZ0NBQWtCOzs7OztJQUdsQixpQ0FBbUI7Ozs7O0lBR25CLG9DQUFzQjs7Ozs7SUFHdEIsbUNBQTJCOzs7OztJQUczQixnQ0FBeUM7Ozs7O0lBR3pDLGdDQUEyQjs7Ozs7SUFHM0IsZ0NBQTJCOzs7OztJQUczQiw2QkFBWTs7Ozs7SUFHWix1Q0FBZ0U7Ozs7OztJQU1oRSxrQ0FBbUI7Ozs7O0lBR25CLHlDQUFxQzs7Ozs7SUFHckMsMENBQStEOzs7OztJQUcvRCx3Q0FBeUQ7Ozs7O0lBR3pELHVDQUE0Qzs7Ozs7SUFHNUMscUNBQTJDOzs7Ozs7SUFNM0Msd0NBQTRCOzs7OztJQUc1Qiw0Q0FBK0I7Ozs7Ozs7SUFPL0IsOEJBQWE7Ozs7O0lBR2IsaUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSxcbiAgQ29sbGVjdGlvbkZpbHRlckJ5LFxuICBDb2xsZWN0aW9uT3B0aW9uLFxuICBDb2xsZWN0aW9uU29ydEJ5LFxuICBDb2x1bW4sXG4gIEZpbHRlcixcbiAgTXVsdGlwbGVTZWxlY3RPcHRpb24sXG4gIE9wZXJhdG9yU3RyaW5nLFxuICBPcGVyYXRvclR5cGUsXG4gIFNlYXJjaFRlcm1cbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkZpbHRlciB7XG4gIC8qKiBEbyB3ZSB3YW50IHRvIGJ5cGFzcyB0aGUgQmFja2VuZCBRdWVyeT8gQ29tbW9ubHkgdXNlZCB3aXRoIGFuIE9EYXRhIEJhY2tlbmQgU2VydmljZSwgaWYgd2Ugd2FudCB0byBmaWx0ZXIgd2l0aG91dCBjYWxsaW5nIHRoZSByZWd1bGFyIE9EYXRhIHF1ZXJ5LiAqL1xuICBieXBhc3NCYWNrZW5kUXVlcnk/OiBib29sZWFuO1xuXG4gIC8qKiBDb2x1bW4gSUQgKi9cbiAgY29sdW1uSWQ/OiBzdHJpbmc7XG5cbiAgLyoqIENvbHVtbiBEZWZpbml0aW9uICovXG4gIGNvbHVtbkRlZj86IENvbHVtbjtcblxuICAvKiogQ3VzdG9tIEZpbHRlciAqL1xuICBjdXN0b21GaWx0ZXI/OiBGaWx0ZXI7XG5cbiAgLyoqIFNlYXJjaCB0ZXJtcyAoY29sbGVjdGlvbikgKi9cbiAgc2VhcmNoVGVybXM/OiBTZWFyY2hUZXJtW107XG5cbiAgLyoqIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGZpbHRlcmluZyAoPiwgPj0sIEVRLCBJTiwgLi4uKSAqL1xuICBvcGVyYXRvcj86IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nO1xuXG4gIC8qKiBNYXhpbXVtIHZhbHVlIG9mIHRoZSBmaWx0ZXIsIHdvcmtzIG9ubHkgd2l0aCBGaWx0ZXJzIHN1cHBvcnRpbmcgaXQgKHRleHQsIG51bWJlciwgZmxvYXQsIHNsaWRlcikgKi9cbiAgbWF4VmFsdWU/OiBudW1iZXIgfCBzdHJpbmc7XG5cbiAgLyoqIE1pbmltdW0gdmFsdWUgb2YgdGhlIGZpbHRlciwgd29ya3Mgb25seSB3aXRoIEZpbHRlcnMgc3VwcG9ydGluZyBpdCAodGV4dCwgbnVtYmVyLCBmbG9hdCwgc2xpZGVyKSAqL1xuICBtaW5WYWx1ZT86IG51bWJlciB8IHN0cmluZztcblxuICAvKiogRmlsdGVyIHRvIHVzZSAoaW5wdXQsIG11bHRpcGxlU2VsZWN0LCBzaW5nbGVTZWxlY3QsIHNlbGVjdCwgY3VzdG9tKSAqL1xuICBtb2RlbD86IGFueTtcblxuICAvKiogQSBjb2xsZWN0aW9uIG9mIGl0ZW1zL29wdGlvbnMgdGhhdCB3aWxsIGJlIGxvYWRlZCBhc3luY2hyb25vdXNseSAoY29tbW9ubHkgdXNlZCB3aXRoIGEgU2VsZWN0L011bHRpLVNlbGVjdCBGaWx0ZXIpICovXG4gIGNvbGxlY3Rpb25Bc3luYz86IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB8IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIGl0ZW1zL29wdGlvbnMgKGNvbW1vbmx5IHVzZWQgd2l0aCBhIFNlbGVjdC9NdWx0aS1TZWxlY3QgRmlsdGVyKVxuICAgKiBJdCBjYW4gYmUgYSBjb2xsZWN0aW9uIG9mIHN0cmluZyBvciBsYWJlbC92YWx1ZSBwYWlyICh0aGUgcGFpciBjYW4gYmUgY3VzdG9taXplZCB2aWEgdGhlIFwiY3VzdG9tU3RydWN0dXJlXCIgb3B0aW9uKVxuICAgKi9cbiAgY29sbGVjdGlvbj86IGFueVtdO1xuXG4gIC8qKiBPcHRpb25zIHRvIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgdGhlIFwiY29sbGVjdGlvblwiICovXG4gIGNvbGxlY3Rpb25PcHRpb25zPzogQ29sbGVjdGlvbk9wdGlvbjtcblxuICAvKiogV2UgY291bGQgZmlsdGVyIHNvbWUgMSBvciBtb3JlIGl0ZW1zIGZyb20gdGhlIGNvbGxlY3Rpb24gKi9cbiAgY29sbGVjdGlvbkZpbHRlckJ5PzogQ29sbGVjdGlvbkZpbHRlckJ5IHwgQ29sbGVjdGlvbkZpbHRlckJ5W107XG5cbiAgLyoqIFdlIGNvdWxkIHNvcnQgdGhlIGNvbGxlY3Rpb24gYnkgMSBvciBtb3JlIHByb3BlcnRpZXMsIG9yIGJ5IHRyYW5zbGF0ZWQgdmFsdWUocykgd2hlbiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyBUcnVlICovXG4gIGNvbGxlY3Rpb25Tb3J0Qnk/OiBDb2xsZWN0aW9uU29ydEJ5IHwgQ29sbGVjdGlvblNvcnRCeVtdO1xuXG4gIC8qKiBBIGN1c3RvbSBzdHJ1Y3R1cmUgY2FuIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBsYWJlbC92YWx1ZSBwYWlyLiBDb21tb25seSB1c2VkIHdpdGggU2VsZWN0L011bHRpLVNlbGVjdCBGaWx0ZXIgKi9cbiAgY3VzdG9tU3RydWN0dXJlPzogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZTtcblxuICAvKiogT3B0aW9ucyB0aGF0IGNvdWxkIGJlIHByb3ZpZGVkIHRvIHRoZSBGaWx0ZXIsIGV4YW1wbGU6IHsgY29udGFpbmVyOiAnYm9keScsIG1heEhlaWdodDogMjUwfSAqL1xuICBmaWx0ZXJPcHRpb25zPzogTXVsdGlwbGVTZWxlY3RPcHRpb24gfCBhbnk7XG5cbiAgLyoqXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIHNldCBpdCB3aWxsIHJlbmRlciBhbnkgSFRNTCBjb2RlIGluc3RlYWQgb2YgcmVtb3ZpbmcgaXRcbiAgICogU28gZmFyIG9ubHkgdXNlZCBpbiB0aGUgTXVsdGlwbGVTZWxlY3QgJiBTaW5nbGVTZWxlY3QgRmlsdGVycyB3aWxsIHN1cHBvcnQgaXRcbiAgICovXG4gIGVuYWJsZVJlbmRlckh0bWwgPzogYm9vbGVhbjtcblxuICAvKiogRG8gd2Ugd2FudCB0aGUgRmlsdGVyIHRvIGhhbmRsZSB0cmFuc2xhdGlvbiAobG9jYWxpemF0aW9uKT8gKi9cbiAgZW5hYmxlVHJhbnNsYXRlTGFiZWw/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBVc2UgXCJwYXJhbXNcIiB0byBwYXNzIGFueSB0eXBlIG9mIGFyZ3VtZW50cyB0byB5b3VyIEN1c3RvbSBGaWx0ZXJcbiAgICogZm9yIGV4YW1wbGUsIHRvIHBhc3MgYSBzZWNvbmQgY29sbGVjdGlvbiB0byBhIHNlbGVjdCBGaWx0ZXIgd2UgY2FuIHR5cGUgdGhpczpcbiAgICogcGFyYW1zOiB7IG9wdGlvbnM6IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0sIHsgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZSd9IF19XG4gICAqL1xuICBwYXJhbXM/OiBhbnk7XG5cbiAgLyoqIFN0ZXAgdmFsdWUgb2YgdGhlIGZpbHRlciwgd29ya3Mgb25seSB3aXRoIEZpbHRlcnMgc3VwcG9ydGluZyBpdCAoaW5wdXQgdGV4dCwgbnVtYmVyLCBmbG9hdCwgcmFuZ2UsIHNsaWRlcikgKi9cbiAgdmFsdWVTdGVwPzogbnVtYmVyIHwgc3RyaW5nO1xufVxuIl19