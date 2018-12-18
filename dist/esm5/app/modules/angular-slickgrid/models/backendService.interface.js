/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function BackendService() { }
if (false) {
    /**
     * Backend Service options
     * @type {?|undefined}
     */
    BackendService.prototype.options;
    /**
     * Build and the return the backend service query string
     * @type {?}
     */
    BackendService.prototype.buildQuery;
    /**
     * initialize the backend service with certain options
     * @type {?|undefined}
     */
    BackendService.prototype.init;
    /**
     * Get the dataset name
     * @type {?|undefined}
     */
    BackendService.prototype.getDatasetName;
    /**
     * Get the Filters that are currently used by the grid
     * @type {?|undefined}
     */
    BackendService.prototype.getCurrentFilters;
    /**
     * Get the Pagination that is currently used by the grid
     * @type {?|undefined}
     */
    BackendService.prototype.getCurrentPagination;
    /**
     * Get the Sorters that are currently used by the grid
     * @type {?|undefined}
     */
    BackendService.prototype.getCurrentSorters;
    /**
     * Reset the pagination options
     * @type {?}
     */
    BackendService.prototype.resetPaginationOptions;
    /**
     * Update the Filters options with a set of new options
     * @type {?|undefined}
     */
    BackendService.prototype.updateFilters;
    /**
     * Update the Pagination component with it's new page number and size
     * @type {?|undefined}
     */
    BackendService.prototype.updatePagination;
    /**
     * Update the Sorters options with a set of new options
     * @type {?|undefined}
     */
    BackendService.prototype.updateSorters;
    /**
     * Update the backend service options
     * @type {?}
     */
    BackendService.prototype.updateOptions;
    /**
     * Execute when any of the filters changed
     * @type {?}
     */
    BackendService.prototype.processOnFilterChanged;
    /**
     * Execute when the pagination changed
     * @type {?}
     */
    BackendService.prototype.processOnPaginationChanged;
    /**
     * Execute when any of the sorters changed
     * @type {?}
     */
    BackendService.prototype.processOnSortChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZFNlcnZpY2UuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvYmFja2VuZFNlcnZpY2UuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFlQSxvQ0FpREM7Ozs7OztJQS9DQyxpQ0FBK0I7Ozs7O0lBRy9CLG9DQUE4RDs7Ozs7SUFHOUQsOEJBQTRGOzs7OztJQUc1Rix3Q0FBOEI7Ozs7O0lBRzlCLDJDQUEwRDs7Ozs7SUFHMUQsOENBQStDOzs7OztJQUcvQywyQ0FBMEM7Ozs7O0lBRzFDLGdEQUFtQzs7Ozs7SUFHbkMsdUNBQXFHOzs7OztJQUdyRywwQ0FBK0Q7Ozs7O0lBRy9ELHVDQUFzRjs7Ozs7SUFHdEYsdUNBQStEOzs7OztJQU8vRCxnREFBbUY7Ozs7O0lBR25GLG9EQUE4Rjs7Ozs7SUFHOUYsOENBQXNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBCYWNrZW5kU2VydmljZU9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVycyxcclxuICBDb2x1bW5Tb3J0LFxyXG4gIEN1cnJlbnRGaWx0ZXIsXHJcbiAgQ3VycmVudFBhZ2luYXRpb24sXHJcbiAgQ3VycmVudFNvcnRlcixcclxuICBGaWx0ZXJDaGFuZ2VkQXJncyxcclxuICBHcmlkT3B0aW9uLFxyXG4gIFBhZ2luYXRpb24sXHJcbiAgUGFnaW5hdGlvbkNoYW5nZWRBcmdzLFxyXG4gIFNvcnRDaGFuZ2VkQXJncyxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tlbmRTZXJ2aWNlIHtcclxuICAvKiogQmFja2VuZCBTZXJ2aWNlIG9wdGlvbnMgKi9cclxuICBvcHRpb25zPzogQmFja2VuZFNlcnZpY2VPcHRpb247XHJcblxyXG4gIC8qKiBCdWlsZCBhbmQgdGhlIHJldHVybiB0aGUgYmFja2VuZCBzZXJ2aWNlIHF1ZXJ5IHN0cmluZyAqL1xyXG4gIGJ1aWxkUXVlcnk6IChzZXJ2aWNlT3B0aW9ucz86IEJhY2tlbmRTZXJ2aWNlT3B0aW9uKSA9PiBzdHJpbmc7XHJcblxyXG4gIC8qKiBpbml0aWFsaXplIHRoZSBiYWNrZW5kIHNlcnZpY2Ugd2l0aCBjZXJ0YWluIG9wdGlvbnMgKi9cclxuICBpbml0PzogKHNlcnZpY2VPcHRpb25zPzogQmFja2VuZFNlcnZpY2VPcHRpb24sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uLCBncmlkPzogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogR2V0IHRoZSBkYXRhc2V0IG5hbWUgKi9cclxuICBnZXREYXRhc2V0TmFtZT86ICgpID0+IHN0cmluZztcclxuXHJcbiAgLyoqIEdldCB0aGUgRmlsdGVycyB0aGF0IGFyZSBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRGaWx0ZXJzPzogKCkgPT4gQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXTtcclxuXHJcbiAgLyoqIEdldCB0aGUgUGFnaW5hdGlvbiB0aGF0IGlzIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudFBhZ2luYXRpb24/OiAoKSA9PiBDdXJyZW50UGFnaW5hdGlvbjtcclxuXHJcbiAgLyoqIEdldCB0aGUgU29ydGVycyB0aGF0IGFyZSBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRTb3J0ZXJzPzogKCkgPT4gQ3VycmVudFNvcnRlcltdO1xyXG5cclxuICAvKiogUmVzZXQgdGhlIHBhZ2luYXRpb24gb3B0aW9ucyAqL1xyXG4gIHJlc2V0UGFnaW5hdGlvbk9wdGlvbnM6ICgpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBVcGRhdGUgdGhlIEZpbHRlcnMgb3B0aW9ucyB3aXRoIGEgc2V0IG9mIG5ldyBvcHRpb25zICovXHJcbiAgdXBkYXRlRmlsdGVycz86IChjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdLCBpc1VwZGF0ZWRCeVByZXNldDogYm9vbGVhbikgPT4gdm9pZDtcclxuXHJcbiAgLyoqIFVwZGF0ZSB0aGUgUGFnaW5hdGlvbiBjb21wb25lbnQgd2l0aCBpdCdzIG5ldyBwYWdlIG51bWJlciBhbmQgc2l6ZSAqL1xyXG4gIHVwZGF0ZVBhZ2luYXRpb24/OiAobmV3UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAvKiogVXBkYXRlIHRoZSBTb3J0ZXJzIG9wdGlvbnMgd2l0aCBhIHNldCBvZiBuZXcgb3B0aW9ucyAqL1xyXG4gIHVwZGF0ZVNvcnRlcnM/OiAoc29ydENvbHVtbnM/OiBDb2x1bW5Tb3J0W10sIHByZXNldFNvcnRlcnM/OiBDdXJyZW50U29ydGVyW10pID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBVcGRhdGUgdGhlIGJhY2tlbmQgc2VydmljZSBvcHRpb25zICovXHJcbiAgdXBkYXRlT3B0aW9uczogKHNlcnZpY2VPcHRpb25zPzogQmFja2VuZFNlcnZpY2VPcHRpb24pID0+IHZvaWQ7XHJcblxyXG4gIC8vIC0tXHJcbiAgLy8gRXZlbnRzIC8gTWV0aG9kc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBFeGVjdXRlIHdoZW4gYW55IG9mIHRoZSBmaWx0ZXJzIGNoYW5nZWQgKi9cclxuICBwcm9jZXNzT25GaWx0ZXJDaGFuZ2VkOiAoZXZlbnQ6IEV2ZW50LCBhcmdzOiBGaWx0ZXJDaGFuZ2VkQXJncykgPT4gUHJvbWlzZTxzdHJpbmc+O1xyXG5cclxuICAvKiogRXhlY3V0ZSB3aGVuIHRoZSBwYWdpbmF0aW9uIGNoYW5nZWQgKi9cclxuICBwcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZDogKGV2ZW50OiBFdmVudCB8IHVuZGVmaW5lZCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSA9PiBzdHJpbmc7XHJcblxyXG4gIC8qKiBFeGVjdXRlIHdoZW4gYW55IG9mIHRoZSBzb3J0ZXJzIGNoYW5nZWQgKi9cclxuICBwcm9jZXNzT25Tb3J0Q2hhbmdlZDogKGV2ZW50OiBFdmVudCwgYXJnczogU29ydENoYW5nZWRBcmdzKSA9PiBzdHJpbmc7XHJcbn1cclxuIl19