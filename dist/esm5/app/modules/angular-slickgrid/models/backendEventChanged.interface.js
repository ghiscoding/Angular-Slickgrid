/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function BackendEventChanged() { }
if (false) {
    /** @type {?|undefined} */
    BackendEventChanged.prototype.options;
    /**
     * On init (or on page load), what action to perform?
     * @type {?|undefined}
     */
    BackendEventChanged.prototype.onInit;
    /**
     * Before executing the query, what action to perform? For example, start a spinner
     * @type {?|undefined}
     */
    BackendEventChanged.prototype.preProcess;
    /**
     * On Processing, we get the query back from the service, and we need to provide a Promise/Observable. For example: this.http.get(myGraphqlUrl)
     * @type {?}
     */
    BackendEventChanged.prototype.process;
    /**
     * After executing the query, what action to perform? For example, stop the spinner
     * @type {?|undefined}
     */
    BackendEventChanged.prototype.postProcess;
    /**
     * Backend Service instance (could be OData or GraphQL Service)
     * @type {?|undefined}
     */
    BackendEventChanged.prototype.service;
    /**
     * How long to wait until we start querying backend to avoid sending too many requests to backend server. Default to 750ms
     * @type {?|undefined}
     */
    BackendEventChanged.prototype.filterTypingDebounce;
    /**
     * INTERNAL USAGE ONLY by Angular-Slickgrid
     * This internal process will be run just before postProcess and is meant to refresh the Dataset & Pagination after a GraphQL call
     * @type {?|undefined}
     */
    BackendEventChanged.prototype.internalPostProcess;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZEV2ZW50Q2hhbmdlZC5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9iYWNrZW5kRXZlbnRDaGFuZ2VkLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EseUNBMkJDOzs7SUExQkMsc0NBQStCOzs7OztJQUcvQixxQ0FBMkY7Ozs7O0lBRzNGLHlDQUF3Qjs7Ozs7SUFHeEIsc0NBQTJGOzs7OztJQUkzRiwwQ0FBc0M7Ozs7O0lBR3RDLHNDQUF5Qjs7Ozs7SUFHekIsbURBQThCOzs7Ozs7SUFNOUIsa0RBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2luZGV4JztcclxuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2VPcHRpb24gfSBmcm9tICcuL2JhY2tlbmRTZXJ2aWNlT3B0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgR3JhcGhxbFJlc3VsdCB9IGZyb20gJy4vZ3JhcGhxbFJlc3VsdC5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kRXZlbnRDaGFuZ2VkIHtcclxuICBvcHRpb25zPzogQmFja2VuZFNlcnZpY2VPcHRpb247XHJcblxyXG4gIC8qKiBPbiBpbml0IChvciBvbiBwYWdlIGxvYWQpLCB3aGF0IGFjdGlvbiB0byBwZXJmb3JtPyAqL1xyXG4gIG9uSW5pdD86IChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPEdyYXBocWxSZXN1bHQgfCBhbnk+IHwgT2JzZXJ2YWJsZTxHcmFwaHFsUmVzdWx0IHwgYW55PjtcclxuXHJcbiAgLyoqIEJlZm9yZSBleGVjdXRpbmcgdGhlIHF1ZXJ5LCB3aGF0IGFjdGlvbiB0byBwZXJmb3JtPyBGb3IgZXhhbXBsZSwgc3RhcnQgYSBzcGlubmVyICovXHJcbiAgcHJlUHJvY2Vzcz86ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBPbiBQcm9jZXNzaW5nLCB3ZSBnZXQgdGhlIHF1ZXJ5IGJhY2sgZnJvbSB0aGUgc2VydmljZSwgYW5kIHdlIG5lZWQgdG8gcHJvdmlkZSBhIFByb21pc2UvT2JzZXJ2YWJsZS4gRm9yIGV4YW1wbGU6IHRoaXMuaHR0cC5nZXQobXlHcmFwaHFsVXJsKSAqL1xyXG4gIHByb2Nlc3M6IChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPEdyYXBocWxSZXN1bHQgfCBhbnk+IHwgT2JzZXJ2YWJsZTxHcmFwaHFsUmVzdWx0IHwgYW55PjtcclxuXHJcblxyXG4gIC8qKiBBZnRlciBleGVjdXRpbmcgdGhlIHF1ZXJ5LCB3aGF0IGFjdGlvbiB0byBwZXJmb3JtPyBGb3IgZXhhbXBsZSwgc3RvcCB0aGUgc3Bpbm5lciAqL1xyXG4gIHBvc3RQcm9jZXNzPzogKHJlc3BvbnNlOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBCYWNrZW5kIFNlcnZpY2UgaW5zdGFuY2UgKGNvdWxkIGJlIE9EYXRhIG9yIEdyYXBoUUwgU2VydmljZSkgKi9cclxuICBzZXJ2aWNlPzogQmFja2VuZFNlcnZpY2U7XHJcblxyXG4gIC8qKiBIb3cgbG9uZyB0byB3YWl0IHVudGlsIHdlIHN0YXJ0IHF1ZXJ5aW5nIGJhY2tlbmQgdG8gYXZvaWQgc2VuZGluZyB0b28gbWFueSByZXF1ZXN0cyB0byBiYWNrZW5kIHNlcnZlci4gRGVmYXVsdCB0byA3NTBtcyAqL1xyXG4gIGZpbHRlclR5cGluZ0RlYm91bmNlPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJTlRFUk5BTCBVU0FHRSBPTkxZIGJ5IEFuZ3VsYXItU2xpY2tncmlkXHJcbiAgICogVGhpcyBpbnRlcm5hbCBwcm9jZXNzIHdpbGwgYmUgcnVuIGp1c3QgYmVmb3JlIHBvc3RQcm9jZXNzIGFuZCBpcyBtZWFudCB0byByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiBhZnRlciBhIEdyYXBoUUwgY2FsbFxyXG4gICAqL1xyXG4gIGludGVybmFsUG9zdFByb2Nlc3M/OiAocmVzdWx0OiBHcmFwaHFsUmVzdWx0KSA9PiB2b2lkO1xyXG59XHJcbiJdfQ==