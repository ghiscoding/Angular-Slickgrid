/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function DraggableGrouping() { }
if (false) {
    /**
     * an extra CSS class to add to the delete button (default undefined), if deleteIconCssClass && deleteIconImage undefined then slick-groupby-remove-image class will be added
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.deleteIconCssClass;
    /**
     * a url to the delete button image (default undefined)
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.deleteIconImage;
    /**
     * option to specify set own placeholder note text
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.dropPlaceHolderText;
    /**
     * an extra CSS class to add to the grouping field hint  (default undefined)
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.groupIconCssClass;
    /**
     * a url to the grouping field hint image (default undefined)
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.groupIconImage;
    /**
     * Fired when grouped columns changed
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.onGroupChanged;
    /**
     * Fired after extension (plugin) is registered by SlickGrid
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.onExtensionRegistered;
    /**
     * provide option to set default grouping on loading
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.setDroppedGroups;
    /**
     * provide option to clear grouping
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.clearDroppedGroups;
    /**
     * its function to setup draggable feature agains Header Column, should be passed on grid option. Also possible to pass custom function
     * @type {?|undefined}
     */
    DraggableGrouping.prototype.getSetupColumnReorder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlR3JvdXBpbmcuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvZHJhZ2dhYmxlR3JvdXBpbmcuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSx1Q0FvQ0M7Ozs7OztJQWxDQywrQ0FBNEI7Ozs7O0lBRzVCLDRDQUF5Qjs7Ozs7SUFHekIsZ0RBQTZCOzs7OztJQUc3Qiw4Q0FBMkI7Ozs7O0lBRzNCLDJDQUF3Qjs7Ozs7SUFNeEIsMkNBQXlGOzs7OztJQUd6RixrREFBOEM7Ozs7O0lBTTlDLDZDQUFpRDs7Ozs7SUFHakQsK0NBQWdDOzs7OztJQUdoQyxrREFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcm91cGluZyB9IGZyb20gJy4vZ3JvdXBpbmcuaW50ZXJmYWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBEcmFnZ2FibGVHcm91cGluZyB7XG4gIC8qKiBhbiBleHRyYSBDU1MgY2xhc3MgdG8gYWRkIHRvIHRoZSBkZWxldGUgYnV0dG9uIChkZWZhdWx0IHVuZGVmaW5lZCksIGlmIGRlbGV0ZUljb25Dc3NDbGFzcyAmJiBkZWxldGVJY29uSW1hZ2UgdW5kZWZpbmVkIHRoZW4gc2xpY2stZ3JvdXBieS1yZW1vdmUtaW1hZ2UgY2xhc3Mgd2lsbCBiZSBhZGRlZCAqL1xuICBkZWxldGVJY29uQ3NzQ2xhc3M/OiBzdHJpbmc7XG5cbiAgLyoqIGEgdXJsIHRvIHRoZSBkZWxldGUgYnV0dG9uIGltYWdlIChkZWZhdWx0IHVuZGVmaW5lZCkgKi9cbiAgZGVsZXRlSWNvbkltYWdlPzogc3RyaW5nO1xuXG4gIC8qKiBvcHRpb24gdG8gc3BlY2lmeSBzZXQgb3duIHBsYWNlaG9sZGVyIG5vdGUgdGV4dCAqL1xuICBkcm9wUGxhY2VIb2xkZXJUZXh0Pzogc3RyaW5nO1xuXG4gIC8qKiBhbiBleHRyYSBDU1MgY2xhc3MgdG8gYWRkIHRvIHRoZSBncm91cGluZyBmaWVsZCBoaW50ICAoZGVmYXVsdCB1bmRlZmluZWQpICovXG4gIGdyb3VwSWNvbkNzc0NsYXNzPzogc3RyaW5nO1xuXG4gIC8qKiBhIHVybCB0byB0aGUgZ3JvdXBpbmcgZmllbGQgaGludCBpbWFnZSAoZGVmYXVsdCB1bmRlZmluZWQpICovXG4gIGdyb3VwSWNvbkltYWdlPzogc3RyaW5nO1xuXG4gIC8vXG4gIC8vIEV2ZW50c1xuICAvLyAtLS0tLS0tLS1cbiAgLyoqIEZpcmVkIHdoZW4gZ3JvdXBlZCBjb2x1bW5zIGNoYW5nZWQgKi9cbiAgb25Hcm91cENoYW5nZWQ/OiAoZTogRXZlbnQsIGFyZ3M6IHsgY2FsbGVyPzogc3RyaW5nOyBncm91cENvbHVtbnM6IEdyb3VwaW5nW10gfSkgPT4gdm9pZDtcblxuICAvKiogRmlyZWQgYWZ0ZXIgZXh0ZW5zaW9uIChwbHVnaW4pIGlzIHJlZ2lzdGVyZWQgYnkgU2xpY2tHcmlkICovXG4gIG9uRXh0ZW5zaW9uUmVnaXN0ZXJlZD86IChwbHVnaW46IGFueSkgPT4gdm9pZDtcblxuICAvL1xuICAvLyBNZXRob2RzXG4gIC8vIC0tLS0tLS0tLVxuICAvKiogcHJvdmlkZSBvcHRpb24gdG8gc2V0IGRlZmF1bHQgZ3JvdXBpbmcgb24gbG9hZGluZyAqL1xuICBzZXREcm9wcGVkR3JvdXBzPzogKGdyb3VwaW5nSW5mbzogYW55W10pID0+IHZvaWQ7XG5cbiAgLyoqIHByb3ZpZGUgb3B0aW9uIHRvIGNsZWFyIGdyb3VwaW5nICovXG4gIGNsZWFyRHJvcHBlZEdyb3Vwcz86ICgpID0+IHZvaWQ7XG5cbiAgLyoqIGl0cyBmdW5jdGlvbiB0byBzZXR1cCBkcmFnZ2FibGUgZmVhdHVyZSBhZ2FpbnMgSGVhZGVyIENvbHVtbiwgc2hvdWxkIGJlIHBhc3NlZCBvbiBncmlkIG9wdGlvbi4gQWxzbyBwb3NzaWJsZSB0byBwYXNzIGN1c3RvbSBmdW5jdGlvbiAqL1xuICBnZXRTZXR1cENvbHVtblJlb3JkZXI/OiAoKSA9PiB2b2lkO1xufVxuIl19