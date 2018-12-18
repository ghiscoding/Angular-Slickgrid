/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function CollectionOption() { }
if (false) {
    /**
     * Optionally add a blank entry to the beginning of the collection.
     * Useful when we want to return all data by setting an empty filter that might not exist in the original collection
     * @type {?|undefined}
     */
    CollectionOption.prototype.addBlankEntry;
    /**
     * When the collection is inside an object descendant property
     * we can optionally pass a dot (.) notation string to pull the collection from an object property.
     * For example if our output data is:
     * myData = { someProperty: { myCollection: [] }, otherProperty: 'something' }
     * We can pass the dot notation string
     * collectionInObjectProperty: 'someProperty.myCollection'
     * @type {?|undefined}
     */
    CollectionOption.prototype.collectionInObjectProperty;
    /**
     * Defaults to "chain", when using multiple "collectionFilterBy", do we want to "merge" or "chain" the result after each pass?
     * For example if we have 2 filters to pass by, and we start with pass 1 returning 7 items and last pass returning 5 items
     * "chain" is the default and will return 5 items, since the result of each pass is sent used by the next pass
     * "merge" would return the merge of the 7 items & 5 items (without duplicates), since some item might be the same the result is anywhere between 5 to 13 items
     * @type {?|undefined}
     */
    CollectionOption.prototype.filterResultAfterEachPass;
    /**
     * defaults to empty, when using label with prefix/suffix, do we want to add a separator between each text (like a white space)
     * @type {?|undefined}
     */
    CollectionOption.prototype.separatorBetweenTextLabels;
    /**
     * defaults to false, should the selected value include the prefix/suffix in the output format
     * @type {?|undefined}
     */
    CollectionOption.prototype.includePrefixSuffixToSelectedValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbk9wdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9jb2xsZWN0aW9uT3B0aW9uLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0Esc0NBOEJDOzs7Ozs7O0lBekJDLHlDQUF3Qjs7Ozs7Ozs7OztJQVV4QixzREFBb0M7Ozs7Ozs7O0lBUXBDLHFEQUFrRjs7Ozs7SUFHbEYsc0RBQW9DOzs7OztJQUdwQywrREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlIH0gZnJvbSAnLi9maWx0ZXJNdWx0aXBsZVBhc3NUeXBlLmVudW0nO1xyXG5pbXBvcnQgeyBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nIH0gZnJvbSAnLi9maWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGVjdGlvbk9wdGlvbiB7XHJcbiAgLyoqXHJcbiAgICogT3B0aW9uYWxseSBhZGQgYSBibGFuayBlbnRyeSB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uLlxyXG4gICAqIFVzZWZ1bCB3aGVuIHdlIHdhbnQgdG8gcmV0dXJuIGFsbCBkYXRhIGJ5IHNldHRpbmcgYW4gZW1wdHkgZmlsdGVyIHRoYXQgbWlnaHQgbm90IGV4aXN0IGluIHRoZSBvcmlnaW5hbCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgYWRkQmxhbmtFbnRyeT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNvbGxlY3Rpb24gaXMgaW5zaWRlIGFuIG9iamVjdCBkZXNjZW5kYW50IHByb3BlcnR5XHJcbiAgICogd2UgY2FuIG9wdGlvbmFsbHkgcGFzcyBhIGRvdCAoLikgbm90YXRpb24gc3RyaW5nIHRvIHB1bGwgdGhlIGNvbGxlY3Rpb24gZnJvbSBhbiBvYmplY3QgcHJvcGVydHkuXHJcbiAgICogRm9yIGV4YW1wbGUgaWYgb3VyIG91dHB1dCBkYXRhIGlzOlxyXG4gICAqIG15RGF0YSA9IHsgc29tZVByb3BlcnR5OiB7IG15Q29sbGVjdGlvbjogW10gfSwgb3RoZXJQcm9wZXJ0eTogJ3NvbWV0aGluZycgfVxyXG4gICAqIFdlIGNhbiBwYXNzIHRoZSBkb3Qgbm90YXRpb24gc3RyaW5nXHJcbiAgICogY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHk6ICdzb21lUHJvcGVydHkubXlDb2xsZWN0aW9uJ1xyXG4gICAqL1xyXG4gIGNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZhdWx0cyB0byBcImNoYWluXCIsIHdoZW4gdXNpbmcgbXVsdGlwbGUgXCJjb2xsZWN0aW9uRmlsdGVyQnlcIiwgZG8gd2Ugd2FudCB0byBcIm1lcmdlXCIgb3IgXCJjaGFpblwiIHRoZSByZXN1bHQgYWZ0ZXIgZWFjaCBwYXNzP1xyXG4gICAqIEZvciBleGFtcGxlIGlmIHdlIGhhdmUgMiBmaWx0ZXJzIHRvIHBhc3MgYnksIGFuZCB3ZSBzdGFydCB3aXRoIHBhc3MgMSByZXR1cm5pbmcgNyBpdGVtcyBhbmQgbGFzdCBwYXNzIHJldHVybmluZyA1IGl0ZW1zXHJcbiAgICogXCJjaGFpblwiIGlzIHRoZSBkZWZhdWx0IGFuZCB3aWxsIHJldHVybiA1IGl0ZW1zLCBzaW5jZSB0aGUgcmVzdWx0IG9mIGVhY2ggcGFzcyBpcyBzZW50IHVzZWQgYnkgdGhlIG5leHQgcGFzc1xyXG4gICAqIFwibWVyZ2VcIiB3b3VsZCByZXR1cm4gdGhlIG1lcmdlIG9mIHRoZSA3IGl0ZW1zICYgNSBpdGVtcyAod2l0aG91dCBkdXBsaWNhdGVzKSwgc2luY2Ugc29tZSBpdGVtIG1pZ2h0IGJlIHRoZSBzYW1lIHRoZSByZXN1bHQgaXMgYW55d2hlcmUgYmV0d2VlbiA1IHRvIDEzIGl0ZW1zXHJcbiAgICovXHJcbiAgZmlsdGVyUmVzdWx0QWZ0ZXJFYWNoUGFzcz86IEZpbHRlck11bHRpcGxlUGFzc1R5cGUgfCBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nO1xyXG5cclxuICAvKiogZGVmYXVsdHMgdG8gZW1wdHksIHdoZW4gdXNpbmcgbGFiZWwgd2l0aCBwcmVmaXgvc3VmZml4LCBkbyB3ZSB3YW50IHRvIGFkZCBhIHNlcGFyYXRvciBiZXR3ZWVuIGVhY2ggdGV4dCAobGlrZSBhIHdoaXRlIHNwYWNlKSAqL1xyXG4gIHNlcGFyYXRvckJldHdlZW5UZXh0TGFiZWxzPzogc3RyaW5nO1xyXG5cclxuICAvKiogZGVmYXVsdHMgdG8gZmFsc2UsIHNob3VsZCB0aGUgc2VsZWN0ZWQgdmFsdWUgaW5jbHVkZSB0aGUgcHJlZml4L3N1ZmZpeCBpbiB0aGUgb3V0cHV0IGZvcm1hdCAqL1xyXG4gIGluY2x1ZGVQcmVmaXhTdWZmaXhUb1NlbGVjdGVkVmFsdWVzPzogYm9vbGVhbjtcclxufVxyXG4iXX0=