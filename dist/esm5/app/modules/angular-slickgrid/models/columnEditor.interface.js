/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ColumnEditor() { }
if (false) {
    /**
     * A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Editor)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionAsync;
    /**
     * A collection of items/options (commonly used with a Select/Multi-Select Editor)
     * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collection;
    /**
     * We could filter some 1 or more items from the collection
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionFilterBy;
    /**
     * Options to change the behavior of the "collection"
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionOptions;
    /**
     * We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True
     * @type {?|undefined}
     */
    ColumnEditor.prototype.collectionSortBy;
    /**
     * A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Editor
     * @type {?|undefined}
     */
    ColumnEditor.prototype.customStructure;
    /**
     * Options that could be provided to the Editor, example: { container: 'body', maxHeight: 250}
     * @type {?|undefined}
     */
    ColumnEditor.prototype.editorOptions;
    /**
     * Defaults to false, when set it will render any HTML code instead of removing it (sanitized)
     * Only used so far in the MultipleSelect & SingleSelect Filters will support it
     * @type {?|undefined}
     */
    ColumnEditor.prototype.enableRenderHtml;
    /**
     * Do we want the Editor to handle translation (localization)?
     * @type {?|undefined}
     */
    ColumnEditor.prototype.enableTranslateLabel;
    /**
     * Error message to display when validation fails
     * @type {?|undefined}
     */
    ColumnEditor.prototype.errorMessage;
    /**
     * Maximum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.maxValue;
    /**
     * Minimum value of the filter, works only with Filters supporting it (text, number, float, slider)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.minValue;
    /**
     * Any inline editor function that implements Editor for the cell
     * @type {?|undefined}
     */
    ColumnEditor.prototype.model;
    /**
     * Editor Validator
     * @type {?|undefined}
     */
    ColumnEditor.prototype.validator;
    /**
     * Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider)
     * @type {?|undefined}
     */
    ColumnEditor.prototype.valueStep;
    /**
     * DOM element extra options
     * @type {?|undefined}
     */
    ColumnEditor.prototype.elementOptions;
    /**
     * Use "params" to pass any type of arguments to your Custom Editor
     * or regular Editor like the Editors.float
     * for example, to pass the option collection to a select Filter we can type this:
     * params: { decimalPlaces: 2 }
     * @type {?|undefined}
     */
    ColumnEditor.prototype.params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uRWRpdG9yLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbkVkaXRvci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVVBLGtDQThEQzs7Ozs7O0lBNURDLHVDQUFpRDs7Ozs7O0lBTWpELGtDQUFtQjs7Ozs7SUFHbkIsMENBQStEOzs7OztJQUcvRCx5Q0FBcUM7Ozs7O0lBR3JDLHdDQUF5RDs7Ozs7SUFHekQsdUNBQTRDOzs7OztJQUc1QyxxQ0FBMkM7Ozs7OztJQU0zQyx3Q0FBMkI7Ozs7O0lBRzNCLDRDQUErQjs7Ozs7SUFHL0Isb0NBQXNCOzs7OztJQUd0QixnQ0FBMkI7Ozs7O0lBRzNCLGdDQUEyQjs7Ozs7SUFHM0IsNkJBQVk7Ozs7O0lBR1osaUNBQTRCOzs7OztJQUc1QixpQ0FBNEI7Ozs7O0lBRzVCLHNDQUFxQjs7Ozs7Ozs7SUFRckIsOEJBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgQ29sbGVjdGlvbkZpbHRlckJ5LFxyXG4gIENvbGxlY3Rpb25PcHRpb24sXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBFZGl0b3JWYWxpZGF0b3IsXHJcbiAgTXVsdGlwbGVTZWxlY3RPcHRpb24sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbkVkaXRvciB7XHJcbiAgLyoqIEEgY29sbGVjdGlvbiBvZiBpdGVtcy9vcHRpb25zIHRoYXQgd2lsbCBiZSBsb2FkZWQgYXN5bmNocm9ub3VzbHkgKGNvbW1vbmx5IHVzZWQgd2l0aCBhIFNlbGVjdC9NdWx0aS1TZWxlY3QgRWRpdG9yKSAqL1xyXG4gIGNvbGxlY3Rpb25Bc3luYz86IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBjb2xsZWN0aW9uIG9mIGl0ZW1zL29wdGlvbnMgKGNvbW1vbmx5IHVzZWQgd2l0aCBhIFNlbGVjdC9NdWx0aS1TZWxlY3QgRWRpdG9yKVxyXG4gICAqIEl0IGNhbiBiZSBhIGNvbGxlY3Rpb24gb2Ygc3RyaW5nIG9yIGxhYmVsL3ZhbHVlIHBhaXIgKHRoZSBwYWlyIGNhbiBiZSBjdXN0b21pemVkIHZpYSB0aGUgXCJjdXN0b21TdHJ1Y3R1cmVcIiBvcHRpb24pXHJcbiAgICovXHJcbiAgY29sbGVjdGlvbj86IGFueVtdO1xyXG5cclxuICAvKiogV2UgY291bGQgZmlsdGVyIHNvbWUgMSBvciBtb3JlIGl0ZW1zIGZyb20gdGhlIGNvbGxlY3Rpb24gKi9cclxuICBjb2xsZWN0aW9uRmlsdGVyQnk/OiBDb2xsZWN0aW9uRmlsdGVyQnkgfCBDb2xsZWN0aW9uRmlsdGVyQnlbXTtcclxuXHJcbiAgLyoqIE9wdGlvbnMgdG8gY2hhbmdlIHRoZSBiZWhhdmlvciBvZiB0aGUgXCJjb2xsZWN0aW9uXCIgKi9cclxuICBjb2xsZWN0aW9uT3B0aW9ucz86IENvbGxlY3Rpb25PcHRpb247XHJcblxyXG4gIC8qKiBXZSBjb3VsZCBzb3J0IHRoZSBjb2xsZWN0aW9uIGJ5IDEgb3IgbW9yZSBwcm9wZXJ0aWVzLCBvciBieSB0cmFuc2xhdGVkIHZhbHVlKHMpIHdoZW4gZW5hYmxlVHJhbnNsYXRlTGFiZWwgaXMgVHJ1ZSAqL1xyXG4gIGNvbGxlY3Rpb25Tb3J0Qnk/OiBDb2xsZWN0aW9uU29ydEJ5IHwgQ29sbGVjdGlvblNvcnRCeVtdO1xyXG5cclxuICAvKiogQSBjdXN0b20gc3RydWN0dXJlIGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgbGFiZWwvdmFsdWUgcGFpci4gQ29tbW9ubHkgdXNlZCB3aXRoIFNlbGVjdC9NdWx0aS1TZWxlY3QgRWRpdG9yICovXHJcbiAgY3VzdG9tU3RydWN0dXJlPzogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZTtcclxuXHJcbiAgLyoqIE9wdGlvbnMgdGhhdCBjb3VsZCBiZSBwcm92aWRlZCB0byB0aGUgRWRpdG9yLCBleGFtcGxlOiB7IGNvbnRhaW5lcjogJ2JvZHknLCBtYXhIZWlnaHQ6IDI1MH0gKi9cclxuICBlZGl0b3JPcHRpb25zPzogTXVsdGlwbGVTZWxlY3RPcHRpb24gfCBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIHNldCBpdCB3aWxsIHJlbmRlciBhbnkgSFRNTCBjb2RlIGluc3RlYWQgb2YgcmVtb3ZpbmcgaXQgKHNhbml0aXplZClcclxuICAgKiBPbmx5IHVzZWQgc28gZmFyIGluIHRoZSBNdWx0aXBsZVNlbGVjdCAmIFNpbmdsZVNlbGVjdCBGaWx0ZXJzIHdpbGwgc3VwcG9ydCBpdFxyXG4gICAqL1xyXG4gIGVuYWJsZVJlbmRlckh0bWw/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0aGUgRWRpdG9yIHRvIGhhbmRsZSB0cmFuc2xhdGlvbiAobG9jYWxpemF0aW9uKT8gKi9cclxuICBlbmFibGVUcmFuc2xhdGVMYWJlbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB2YWxpZGF0aW9uIGZhaWxzICovXHJcbiAgZXJyb3JNZXNzYWdlPzogc3RyaW5nO1xyXG5cclxuICAvKiogTWF4aW11bSB2YWx1ZSBvZiB0aGUgZmlsdGVyLCB3b3JrcyBvbmx5IHdpdGggRmlsdGVycyBzdXBwb3J0aW5nIGl0ICh0ZXh0LCBudW1iZXIsIGZsb2F0LCBzbGlkZXIpICovXHJcbiAgbWF4VmFsdWU/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKiBNaW5pbXVtIHZhbHVlIG9mIHRoZSBmaWx0ZXIsIHdvcmtzIG9ubHkgd2l0aCBGaWx0ZXJzIHN1cHBvcnRpbmcgaXQgKHRleHQsIG51bWJlciwgZmxvYXQsIHNsaWRlcikgKi9cclxuICBtaW5WYWx1ZT86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqIEFueSBpbmxpbmUgZWRpdG9yIGZ1bmN0aW9uIHRoYXQgaW1wbGVtZW50cyBFZGl0b3IgZm9yIHRoZSBjZWxsICovXHJcbiAgbW9kZWw/OiBhbnk7XHJcblxyXG4gIC8qKiBFZGl0b3IgVmFsaWRhdG9yICovXHJcbiAgdmFsaWRhdG9yPzogRWRpdG9yVmFsaWRhdG9yO1xyXG5cclxuICAvKiogU3RlcCB2YWx1ZSBvZiB0aGUgZmlsdGVyLCB3b3JrcyBvbmx5IHdpdGggRmlsdGVycyBzdXBwb3J0aW5nIGl0IChpbnB1dCB0ZXh0LCBudW1iZXIsIGZsb2F0LCByYW5nZSwgc2xpZGVyKSAqL1xyXG4gIHZhbHVlU3RlcD86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgLyoqIERPTSBlbGVtZW50IGV4dHJhIG9wdGlvbnMgKi9cclxuICBlbGVtZW50T3B0aW9ucz86IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIFwicGFyYW1zXCIgdG8gcGFzcyBhbnkgdHlwZSBvZiBhcmd1bWVudHMgdG8geW91ciBDdXN0b20gRWRpdG9yXHJcbiAgICogb3IgcmVndWxhciBFZGl0b3IgbGlrZSB0aGUgRWRpdG9ycy5mbG9hdFxyXG4gICAqIGZvciBleGFtcGxlLCB0byBwYXNzIHRoZSBvcHRpb24gY29sbGVjdGlvbiB0byBhIHNlbGVjdCBGaWx0ZXIgd2UgY2FuIHR5cGUgdGhpczpcclxuICAgKiBwYXJhbXM6IHsgZGVjaW1hbFBsYWNlczogMiB9XHJcbiAgICovXHJcbiAgcGFyYW1zPzogYW55O1xyXG59XHJcbiJdfQ==