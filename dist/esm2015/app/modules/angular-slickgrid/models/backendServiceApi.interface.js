/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function BackendServiceApi() { }
if (false) {
    /**
     * Backend Service Options
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.options;
    /**
     * Backend Service instance (could be OData or GraphQL Service)
     * @type {?}
     */
    BackendServiceApi.prototype.service;
    /**
     * On error callback, when an error is thrown by the process execution
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.onError;
    /**
     * On init (or on page load), what action to perform?
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.onInit;
    /**
     * Before executing the query, what action to perform? For example, start a spinner
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.preProcess;
    /**
     * On Processing, we get the query back from the service, and we need to provide a Promise/Observable. For example: this.http.get(myGraphqlUrl)
     * @type {?}
     */
    BackendServiceApi.prototype.process;
    /**
     * After executing the query, what action to perform? For example, stop the spinner
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.postProcess;
    /**
     * How long to wait until we start querying backend to avoid sending too many requests to backend server. Default to 750ms
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.filterTypingDebounce;
    /**
     * INTERNAL USAGE ONLY by Angular-Slickgrid
     * This internal process will be run just before postProcess and is meant to refresh the Dataset & Pagination after a GraphQL call
     * @type {?|undefined}
     */
    BackendServiceApi.prototype.internalPostProcess;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZFNlcnZpY2VBcGkuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvYmFja2VuZFNlcnZpY2VBcGkuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQSx1Q0E4QkM7Ozs7OztJQTVCQyxvQ0FBNkM7Ozs7O0lBRzdDLG9DQUF3Qjs7Ozs7SUFHeEIsb0NBQXNCOzs7OztJQUd0QixtQ0FBMkY7Ozs7O0lBRzNGLHVDQUF3Qjs7Ozs7SUFHeEIsb0NBQTJGOzs7OztJQUczRix3Q0FBc0Q7Ozs7O0lBR3RELGlEQUE4Qjs7Ozs7O0lBTTlCLGdEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9kYXRhT3B0aW9uIH0gZnJvbSAnLi9vZGF0YU9wdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHcmFwaHFsUmVzdWx0IH0gZnJvbSAnLi9ncmFwaHFsUmVzdWx0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEJhY2tlbmRTZXJ2aWNlIH0gZnJvbSAnLi9iYWNrZW5kU2VydmljZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHcmFwaHFsU2VydmljZU9wdGlvbiB9IGZyb20gJy4vZ3JhcGhxbFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kU2VydmljZUFwaSB7XHJcbiAgLyoqIEJhY2tlbmQgU2VydmljZSBPcHRpb25zICovXHJcbiAgb3B0aW9ucz86IE9kYXRhT3B0aW9uIHwgR3JhcGhxbFNlcnZpY2VPcHRpb247XHJcblxyXG4gIC8qKiBCYWNrZW5kIFNlcnZpY2UgaW5zdGFuY2UgKGNvdWxkIGJlIE9EYXRhIG9yIEdyYXBoUUwgU2VydmljZSkgKi9cclxuICBzZXJ2aWNlOiBCYWNrZW5kU2VydmljZTtcclxuXHJcbiAgLyoqIE9uIGVycm9yIGNhbGxiYWNrLCB3aGVuIGFuIGVycm9yIGlzIHRocm93biBieSB0aGUgcHJvY2VzcyBleGVjdXRpb24gKi9cclxuICBvbkVycm9yPzogKGUpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBPbiBpbml0IChvciBvbiBwYWdlIGxvYWQpLCB3aGF0IGFjdGlvbiB0byBwZXJmb3JtPyAqL1xyXG4gIG9uSW5pdD86IChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPEdyYXBocWxSZXN1bHQgfCBhbnk+IHwgT2JzZXJ2YWJsZTxHcmFwaHFsUmVzdWx0IHwgYW55PjtcclxuXHJcbiAgLyoqIEJlZm9yZSBleGVjdXRpbmcgdGhlIHF1ZXJ5LCB3aGF0IGFjdGlvbiB0byBwZXJmb3JtPyBGb3IgZXhhbXBsZSwgc3RhcnQgYSBzcGlubmVyICovXHJcbiAgcHJlUHJvY2Vzcz86ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBPbiBQcm9jZXNzaW5nLCB3ZSBnZXQgdGhlIHF1ZXJ5IGJhY2sgZnJvbSB0aGUgc2VydmljZSwgYW5kIHdlIG5lZWQgdG8gcHJvdmlkZSBhIFByb21pc2UvT2JzZXJ2YWJsZS4gRm9yIGV4YW1wbGU6IHRoaXMuaHR0cC5nZXQobXlHcmFwaHFsVXJsKSAqL1xyXG4gIHByb2Nlc3M6IChxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPEdyYXBocWxSZXN1bHQgfCBhbnk+IHwgT2JzZXJ2YWJsZTxHcmFwaHFsUmVzdWx0IHwgYW55PjtcclxuXHJcbiAgLyoqIEFmdGVyIGV4ZWN1dGluZyB0aGUgcXVlcnksIHdoYXQgYWN0aW9uIHRvIHBlcmZvcm0/IEZvciBleGFtcGxlLCBzdG9wIHRoZSBzcGlubmVyICovXHJcbiAgcG9zdFByb2Nlc3M/OiAocmVzcG9uc2U6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBIb3cgbG9uZyB0byB3YWl0IHVudGlsIHdlIHN0YXJ0IHF1ZXJ5aW5nIGJhY2tlbmQgdG8gYXZvaWQgc2VuZGluZyB0b28gbWFueSByZXF1ZXN0cyB0byBiYWNrZW5kIHNlcnZlci4gRGVmYXVsdCB0byA3NTBtcyAqL1xyXG4gIGZpbHRlclR5cGluZ0RlYm91bmNlPzogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBJTlRFUk5BTCBVU0FHRSBPTkxZIGJ5IEFuZ3VsYXItU2xpY2tncmlkXHJcbiAgICogVGhpcyBpbnRlcm5hbCBwcm9jZXNzIHdpbGwgYmUgcnVuIGp1c3QgYmVmb3JlIHBvc3RQcm9jZXNzIGFuZCBpcyBtZWFudCB0byByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiBhZnRlciBhIEdyYXBoUUwgY2FsbFxyXG4gICAqL1xyXG4gIGludGVybmFsUG9zdFByb2Nlc3M/OiAocmVzdWx0OiBHcmFwaHFsUmVzdWx0KSA9PiB2b2lkO1xyXG59XHJcbiJdfQ==