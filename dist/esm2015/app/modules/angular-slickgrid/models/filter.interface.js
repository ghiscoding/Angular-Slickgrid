/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Filter() { }
if (false) {
    /**
     * Column definition
     * @type {?}
     */
    Filter.prototype.columnDef;
    /**
     * Callback that will be run after the filter triggers
     * @type {?}
     */
    Filter.prototype.callback;
    /**
     * SlickGrid grid object
     * @type {?}
     */
    Filter.prototype.grid;
    /**
     * Array of defined search terms to pre-load
     * @type {?|undefined}
     */
    Filter.prototype.searchTerms;
    /**
     * The search operator for the filter
     * @type {?}
     */
    Filter.prototype.operator;
    /**
     * You can use "params" to pass any types of arguments to your Filter
     * @type {?|undefined}
     */
    Filter.prototype.params;
    /**
     * Funtion to initialize the Filter class
     * @type {?}
     */
    Filter.prototype.init;
    /**
     * Clear filter function
     * @type {?}
     */
    Filter.prototype.clear;
    /**
     * Destroy filter function
     * @type {?}
     */
    Filter.prototype.destroy;
    /**
     * Set value(s) on the DOM element
     * @type {?}
     */
    Filter.prototype.setValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2ZpbHRlci5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVVBLDRCQWdDQzs7Ozs7O0lBNUJDLDJCQUFrQjs7Ozs7SUFHbEIsMEJBQXlCOzs7OztJQUd6QixzQkFBVTs7Ozs7SUFHViw2QkFBMkI7Ozs7O0lBRzNCLDBCQUF3Qzs7Ozs7SUFHeEMsd0JBQXFCOzs7OztJQUdyQixzQkFBc0M7Ozs7O0lBR3RDLHVCQUFrQjs7Ozs7SUFHbEIseUJBQW9COzs7OztJQUdwQiwyQkFBbUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIE9wZXJhdG9yU3RyaW5nLFxyXG4gIFNlYXJjaFRlcm1cclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyBleHBvcnQgdHlwZSBGaWx0ZXIgPSAoc2VhcmNoVGVybXM6IHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgbnVtYmVyW10sIGNvbHVtbkRlZjogQ29sdW1uLCBwYXJhbXM/OiBhbnkpID0+IHN0cmluZztcclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xyXG4gIC8vIFByb3BlcnRpZXMgd2hpY2ggbXVzdCBiZSBQdWJsaWNcclxuXHJcbiAgLyoqIENvbHVtbiBkZWZpbml0aW9uICovXHJcbiAgY29sdW1uRGVmOiBDb2x1bW47XHJcblxyXG4gIC8qKiBDYWxsYmFjayB0aGF0IHdpbGwgYmUgcnVuIGFmdGVyIHRoZSBmaWx0ZXIgdHJpZ2dlcnMgKi9cclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIC8qKiBTbGlja0dyaWQgZ3JpZCBvYmplY3QgKi9cclxuICBncmlkOiBhbnk7XHJcblxyXG4gIC8qKiBBcnJheSBvZiBkZWZpbmVkIHNlYXJjaCB0ZXJtcyB0byBwcmUtbG9hZCAqL1xyXG4gIHNlYXJjaFRlcm1zPzogU2VhcmNoVGVybVtdO1xyXG5cclxuICAvKiogVGhlIHNlYXJjaCBvcGVyYXRvciBmb3IgdGhlIGZpbHRlciAqL1xyXG4gIG9wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcclxuXHJcbiAgLyoqIFlvdSBjYW4gdXNlIFwicGFyYW1zXCIgdG8gcGFzcyBhbnkgdHlwZXMgb2YgYXJndW1lbnRzIHRvIHlvdXIgRmlsdGVyICovXHJcbiAgcGFyYW1zPzogYW55IHwgYW55W107XHJcblxyXG4gIC8qKiBGdW50aW9uIHRvIGluaXRpYWxpemUgdGhlIEZpbHRlciBjbGFzcyAqL1xyXG4gIGluaXQ6IChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBDbGVhciBmaWx0ZXIgZnVuY3Rpb24gKi9cclxuICBjbGVhcjogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqIERlc3Ryb3kgZmlsdGVyIGZ1bmN0aW9uICovXHJcbiAgZGVzdHJveTogKCkgPT4gdm9pZDtcclxuXHJcbiAgLyoqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnQgKi9cclxuICBzZXRWYWx1ZXM6ICh2YWx1ZXM6IFNlYXJjaFRlcm0gfCBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQpID0+IHZvaWQ7XHJcbn1cclxuIl19