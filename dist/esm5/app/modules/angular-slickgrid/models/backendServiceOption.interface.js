/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function BackendServiceOption() { }
if (false) {
    /**
     * Array of column ids that are included in the column definitions
     * @type {?|undefined}
     */
    BackendServiceOption.prototype.datasetName;
    /**
     * What are the pagination options? ex.: (first, last, offset)
     * @type {?|undefined}
     */
    BackendServiceOption.prototype.paginationOptions;
    /**
     * array of Filtering Options, ex.: { field: name, operator: EQ, value: "John" }
     * @type {?|undefined}
     */
    BackendServiceOption.prototype.filteringOptions;
    /**
     * array of Filtering Options, ex.: { field: name, direction: DESC }
     * @type {?|undefined}
     */
    BackendServiceOption.prototype.sortingOptions;
    /**
     * Execute the process callback command on component init (page load)
     * @type {?|undefined}
     */
    BackendServiceOption.prototype.executeProcessCommandOnInit;
    /**
     * Extra query arguments that be passed in addition to the default query arguments
     * For example in GraphQL, if we want to pass "userId" and we want the query to look like
     * users (first: 20, offset: 10, userId: 123) { ... }
     * @type {?|undefined}
     */
    BackendServiceOption.prototype.extraQueryArguments;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvYmFja2VuZFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSwwQ0FzQkM7Ozs7OztJQXBCQywyQ0FBcUI7Ozs7O0lBR3JCLGlEQUF3Qjs7Ozs7SUFHeEIsZ0RBQXlCOzs7OztJQUd6Qiw4Q0FBdUI7Ozs7O0lBR3ZCLDJEQUFzQzs7Ozs7OztJQU90QyxtREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWVyeUFyZ3VtZW50IH0gZnJvbSAnLi9xdWVyeUFyZ3VtZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEJhY2tlbmRFdmVudENoYW5nZWQgfSBmcm9tICcuL2JhY2tlbmRFdmVudENoYW5nZWQuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFja2VuZFNlcnZpY2VPcHRpb24ge1xyXG4gIC8qKiBBcnJheSBvZiBjb2x1bW4gaWRzIHRoYXQgYXJlIGluY2x1ZGVkIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgKi9cclxuICBkYXRhc2V0TmFtZT86IHN0cmluZztcclxuXHJcbiAgLyoqIFdoYXQgYXJlIHRoZSBwYWdpbmF0aW9uIG9wdGlvbnM/IGV4LjogKGZpcnN0LCBsYXN0LCBvZmZzZXQpICovXHJcbiAgcGFnaW5hdGlvbk9wdGlvbnM/OiBhbnk7XHJcblxyXG4gIC8qKiBhcnJheSBvZiBGaWx0ZXJpbmcgT3B0aW9ucywgZXguOiB7IGZpZWxkOiBuYW1lLCBvcGVyYXRvcjogRVEsIHZhbHVlOiBcIkpvaG5cIiB9ICAqL1xyXG4gIGZpbHRlcmluZ09wdGlvbnM/OiBhbnlbXTtcclxuXHJcbiAgLyoqIGFycmF5IG9mIEZpbHRlcmluZyBPcHRpb25zLCBleC46IHsgZmllbGQ6IG5hbWUsIGRpcmVjdGlvbjogREVTQyB9ICAqL1xyXG4gIHNvcnRpbmdPcHRpb25zPzogYW55W107XHJcblxyXG4gIC8qKiBFeGVjdXRlIHRoZSBwcm9jZXNzIGNhbGxiYWNrIGNvbW1hbmQgb24gY29tcG9uZW50IGluaXQgKHBhZ2UgbG9hZCkgKi9cclxuICBleGVjdXRlUHJvY2Vzc0NvbW1hbmRPbkluaXQ/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBFeHRyYSBxdWVyeSBhcmd1bWVudHMgdGhhdCBiZSBwYXNzZWQgaW4gYWRkaXRpb24gdG8gdGhlIGRlZmF1bHQgcXVlcnkgYXJndW1lbnRzXHJcbiAgICogRm9yIGV4YW1wbGUgaW4gR3JhcGhRTCwgaWYgd2Ugd2FudCB0byBwYXNzIFwidXNlcklkXCIgYW5kIHdlIHdhbnQgdGhlIHF1ZXJ5IHRvIGxvb2sgbGlrZVxyXG4gICAqIHVzZXJzIChmaXJzdDogMjAsIG9mZnNldDogMTAsIHVzZXJJZDogMTIzKSB7IC4uLiB9XHJcbiAgICovXHJcbiAgZXh0cmFRdWVyeUFyZ3VtZW50cz86IFF1ZXJ5QXJndW1lbnRbXTtcclxufVxyXG4iXX0=