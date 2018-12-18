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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZFNlcnZpY2VBcGkuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvYmFja2VuZFNlcnZpY2VBcGkuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQSx1Q0E4QkM7Ozs7OztJQTVCQyxvQ0FBNkM7Ozs7O0lBRzdDLG9DQUF3Qjs7Ozs7SUFHeEIsb0NBQXNCOzs7OztJQUd0QixtQ0FBMkY7Ozs7O0lBRzNGLHVDQUF3Qjs7Ozs7SUFHeEIsb0NBQTJGOzs7OztJQUczRix3Q0FBc0Q7Ozs7O0lBR3RELGlEQUE4Qjs7Ozs7O0lBTTlCLGdEQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9kYXRhT3B0aW9uIH0gZnJvbSAnLi9vZGF0YU9wdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgR3JhcGhxbFJlc3VsdCB9IGZyb20gJy4vZ3JhcGhxbFJlc3VsdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2JhY2tlbmRTZXJ2aWNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBHcmFwaHFsU2VydmljZU9wdGlvbiB9IGZyb20gJy4vZ3JhcGhxbFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kU2VydmljZUFwaSB7XG4gIC8qKiBCYWNrZW5kIFNlcnZpY2UgT3B0aW9ucyAqL1xuICBvcHRpb25zPzogT2RhdGFPcHRpb24gfCBHcmFwaHFsU2VydmljZU9wdGlvbjtcblxuICAvKiogQmFja2VuZCBTZXJ2aWNlIGluc3RhbmNlIChjb3VsZCBiZSBPRGF0YSBvciBHcmFwaFFMIFNlcnZpY2UpICovXG4gIHNlcnZpY2U6IEJhY2tlbmRTZXJ2aWNlO1xuXG4gIC8qKiBPbiBlcnJvciBjYWxsYmFjaywgd2hlbiBhbiBlcnJvciBpcyB0aHJvd24gYnkgdGhlIHByb2Nlc3MgZXhlY3V0aW9uICovXG4gIG9uRXJyb3I/OiAoZSkgPT4gdm9pZDtcblxuICAvKiogT24gaW5pdCAob3Igb24gcGFnZSBsb2FkKSwgd2hhdCBhY3Rpb24gdG8gcGVyZm9ybT8gKi9cbiAgb25Jbml0PzogKHF1ZXJ5OiBzdHJpbmcpID0+IFByb21pc2U8R3JhcGhxbFJlc3VsdCB8IGFueT4gfCBPYnNlcnZhYmxlPEdyYXBocWxSZXN1bHQgfCBhbnk+O1xuXG4gIC8qKiBCZWZvcmUgZXhlY3V0aW5nIHRoZSBxdWVyeSwgd2hhdCBhY3Rpb24gdG8gcGVyZm9ybT8gRm9yIGV4YW1wbGUsIHN0YXJ0IGEgc3Bpbm5lciAqL1xuICBwcmVQcm9jZXNzPzogKCkgPT4gdm9pZDtcblxuICAvKiogT24gUHJvY2Vzc2luZywgd2UgZ2V0IHRoZSBxdWVyeSBiYWNrIGZyb20gdGhlIHNlcnZpY2UsIGFuZCB3ZSBuZWVkIHRvIHByb3ZpZGUgYSBQcm9taXNlL09ic2VydmFibGUuIEZvciBleGFtcGxlOiB0aGlzLmh0dHAuZ2V0KG15R3JhcGhxbFVybCkgKi9cbiAgcHJvY2VzczogKHF1ZXJ5OiBzdHJpbmcpID0+IFByb21pc2U8R3JhcGhxbFJlc3VsdCB8IGFueT4gfCBPYnNlcnZhYmxlPEdyYXBocWxSZXN1bHQgfCBhbnk+O1xuXG4gIC8qKiBBZnRlciBleGVjdXRpbmcgdGhlIHF1ZXJ5LCB3aGF0IGFjdGlvbiB0byBwZXJmb3JtPyBGb3IgZXhhbXBsZSwgc3RvcCB0aGUgc3Bpbm5lciAqL1xuICBwb3N0UHJvY2Vzcz86IChyZXNwb25zZTogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4gdm9pZDtcblxuICAvKiogSG93IGxvbmcgdG8gd2FpdCB1bnRpbCB3ZSBzdGFydCBxdWVyeWluZyBiYWNrZW5kIHRvIGF2b2lkIHNlbmRpbmcgdG9vIG1hbnkgcmVxdWVzdHMgdG8gYmFja2VuZCBzZXJ2ZXIuIERlZmF1bHQgdG8gNzUwbXMgKi9cbiAgZmlsdGVyVHlwaW5nRGVib3VuY2U/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElOVEVSTkFMIFVTQUdFIE9OTFkgYnkgQW5ndWxhci1TbGlja2dyaWRcbiAgICogVGhpcyBpbnRlcm5hbCBwcm9jZXNzIHdpbGwgYmUgcnVuIGp1c3QgYmVmb3JlIHBvc3RQcm9jZXNzIGFuZCBpcyBtZWFudCB0byByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiBhZnRlciBhIEdyYXBoUUwgY2FsbFxuICAgKi9cbiAgaW50ZXJuYWxQb3N0UHJvY2Vzcz86IChyZXN1bHQ6IEdyYXBocWxSZXN1bHQpID0+IHZvaWQ7XG59XG4iXX0=