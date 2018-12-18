/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GraphqlServiceOption() { }
if (false) {
    /**
     * When using Translation, we probably want to add locale in the query for the filterBy/orderBy to work
     * ex.: users(first: 10, offset: 0, locale: "en-CA", filterBy: [{field: name, operator: EQ, value:"John"}]) {
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.addLocaleIntoQuery;
    /**
     * Array of column ids that are included in the column definitions
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.columnIds;
    /**
     * What is the dataset, this is required for the GraphQL query to be built
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.datasetName;
    /**
     * Column definitions, you can pass this instead of "columnIds"
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.columnDefinitions;
    /**
     * (NOT FULLY IMPLEMENTED) Is the GraphQL Server using cursors?
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.isWithCursor;
    /**
     * What are the pagination options? ex.: (first, last, offset)
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.paginationOptions;
    /**
     * array of Filtering Options, ex.: { field: name, operator: EQ, value: "John" }
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.filteringOptions;
    /**
     * array of Filtering Options, ex.: { field: name, direction: DESC }
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.sortingOptions;
    /**
     * Do we want to keep double quotes on field arguments of filterBy/sortBy (field: "name" instead of field: name)
     * ex.: { field: "name", operator: EQ, value: "John" }
     * @type {?|undefined}
     */
    GraphqlServiceOption.prototype.keepArgumentFieldDoubleQuotes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvZ3JhcGhxbFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFPQSwwQ0FpQ0M7Ozs7Ozs7SUE1QkMsa0RBQTZCOzs7OztJQUc3Qix5Q0FBcUI7Ozs7O0lBR3JCLDJDQUFxQjs7Ozs7SUFHckIsaURBQTZCOzs7OztJQUc3Qiw0Q0FBdUI7Ozs7O0lBR3ZCLGlEQUE0RTs7Ozs7SUFHNUUsZ0RBQTRDOzs7OztJQUc1Qyw4Q0FBd0M7Ozs7OztJQU14Qyw2REFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuL2NvbHVtbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBCYWNrZW5kU2VydmljZU9wdGlvbiB9IGZyb20gJy4vYmFja2VuZFNlcnZpY2VPcHRpb24uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgR3JhcGhxbEZpbHRlcmluZ09wdGlvbiB9IGZyb20gJy4vZ3JhcGhxbEZpbHRlcmluZ09wdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHcmFwaHFsU29ydGluZ09wdGlvbiB9IGZyb20gJy4vZ3JhcGhxbFNvcnRpbmdPcHRpb24uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgR3JhcGhxbEN1cnNvclBhZ2luYXRpb25PcHRpb24gfSBmcm9tICcuL2dyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uIH0gZnJvbSAnLi9ncmFwaHFsUGFnaW5hdGlvbk9wdGlvbi5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmFwaHFsU2VydmljZU9wdGlvbiBleHRlbmRzIEJhY2tlbmRTZXJ2aWNlT3B0aW9uIHtcclxuICAvKipcclxuICAgKiBXaGVuIHVzaW5nIFRyYW5zbGF0aW9uLCB3ZSBwcm9iYWJseSB3YW50IHRvIGFkZCBsb2NhbGUgaW4gdGhlIHF1ZXJ5IGZvciB0aGUgZmlsdGVyQnkvb3JkZXJCeSB0byB3b3JrXHJcbiAgICogZXguOiB1c2VycyhmaXJzdDogMTAsIG9mZnNldDogMCwgbG9jYWxlOiBcImVuLUNBXCIsIGZpbHRlckJ5OiBbe2ZpZWxkOiBuYW1lLCBvcGVyYXRvcjogRVEsIHZhbHVlOlwiSm9oblwifV0pIHtcclxuICAgKi9cclxuICBhZGRMb2NhbGVJbnRvUXVlcnk/OiBib29sZWFuO1xyXG5cclxuICAvKiogQXJyYXkgb2YgY29sdW1uIGlkcyB0aGF0IGFyZSBpbmNsdWRlZCBpbiB0aGUgY29sdW1uIGRlZmluaXRpb25zICovXHJcbiAgY29sdW1uSWRzPzogc3RyaW5nW107XHJcblxyXG4gIC8qKiBXaGF0IGlzIHRoZSBkYXRhc2V0LCB0aGlzIGlzIHJlcXVpcmVkIGZvciB0aGUgR3JhcGhRTCBxdWVyeSB0byBiZSBidWlsdCAqL1xyXG4gIGRhdGFzZXROYW1lPzogc3RyaW5nO1xyXG5cclxuICAvKiogQ29sdW1uIGRlZmluaXRpb25zLCB5b3UgY2FuIHBhc3MgdGhpcyBpbnN0ZWFkIG9mIFwiY29sdW1uSWRzXCIgKi9cclxuICBjb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdO1xyXG5cclxuICAvKiogKE5PVCBGVUxMWSBJTVBMRU1FTlRFRCkgSXMgdGhlIEdyYXBoUUwgU2VydmVyIHVzaW5nIGN1cnNvcnM/ICovXHJcbiAgaXNXaXRoQ3Vyc29yPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFdoYXQgYXJlIHRoZSBwYWdpbmF0aW9uIG9wdGlvbnM/IGV4LjogKGZpcnN0LCBsYXN0LCBvZmZzZXQpICovXHJcbiAgcGFnaW5hdGlvbk9wdGlvbnM/OiBHcmFwaHFsUGFnaW5hdGlvbk9wdGlvbiB8IEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uO1xyXG5cclxuICAvKiogYXJyYXkgb2YgRmlsdGVyaW5nIE9wdGlvbnMsIGV4LjogeyBmaWVsZDogbmFtZSwgb3BlcmF0b3I6IEVRLCB2YWx1ZTogXCJKb2huXCIgfSAgKi9cclxuICBmaWx0ZXJpbmdPcHRpb25zPzogR3JhcGhxbEZpbHRlcmluZ09wdGlvbltdO1xyXG5cclxuICAvKiogYXJyYXkgb2YgRmlsdGVyaW5nIE9wdGlvbnMsIGV4LjogeyBmaWVsZDogbmFtZSwgZGlyZWN0aW9uOiBERVNDIH0gICovXHJcbiAgc29ydGluZ09wdGlvbnM/OiBHcmFwaHFsU29ydGluZ09wdGlvbltdO1xyXG5cclxuICAvKipcclxuICAgKiBEbyB3ZSB3YW50IHRvIGtlZXAgZG91YmxlIHF1b3RlcyBvbiBmaWVsZCBhcmd1bWVudHMgb2YgZmlsdGVyQnkvc29ydEJ5IChmaWVsZDogXCJuYW1lXCIgaW5zdGVhZCBvZiBmaWVsZDogbmFtZSlcclxuICAgKiBleC46IHsgZmllbGQ6IFwibmFtZVwiLCBvcGVyYXRvcjogRVEsIHZhbHVlOiBcIkpvaG5cIiB9XHJcbiAgICovXHJcbiAga2VlcEFyZ3VtZW50RmllbGREb3VibGVRdW90ZXM/OiBib29sZWFuO1xyXG59XHJcbiJdfQ==