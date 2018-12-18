/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GridMenu() { }
if (false) {
    /**
     * Array of Custom Items (title, command, disabled, ...)
     * @type {?|undefined}
     */
    GridMenu.prototype.customItems;
    /**
     * Defaults to "Commands" which is the title that shows up over the custom commands list
     * @type {?|undefined}
     */
    GridMenu.prototype.customTitle;
    /**
     * Same as "customTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.customTitleKey;
    /**
     * Defaults to "Columns" which is the title that shows up over the columns
     * @type {?|undefined}
     */
    GridMenu.prototype.columnTitle;
    /**
     * Same as "columnTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.columnTitleKey;
    /**
     * Defaults to "Force fit columns" which is 1 of the last 2 checkbox title shown at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.forceFitTitle;
    /**
     * Same as "forceFitTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.forceFitTitleKey;
    /**
     * Defaults to false, which will hide the "Clear All Filters" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideClearAllFiltersCommand;
    /**
     * Defaults to false, which will hide the "Clear All Sorting" command in the Grid Menu (Grid Option "enableSorting: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideClearAllSortingCommand;
    /**
     * Defaults to false, which will hide the "Export to CSV" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideExportCsvCommand;
    /**
     * Defaults to false, which will hide the "Export to Text Delimited" command in the Grid Menu (Grid Option "enableExport: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideExportTextDelimitedCommand;
    /**
     * Defaults to false, show/hide 1 of the last 2 checkbox at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.hideForceFitButton;
    /**
     * Defaults to false, which will hide the "Refresh Dataset" command in the Grid Menu (only works with a Backend Service API)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideRefreshDatasetCommand;
    /**
     * Defaults to false, show/hide 1 of the last 2 checkbox at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.hideSyncResizeButton;
    /**
     * Defaults to false, which will hide the "Toggle Filter Row" command in the Grid Menu (Grid Option "enableFiltering: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideToggleFilterCommand;
    /**
     * Defaults to true, which will hide the "Toggle Pre-Header Row" (used by draggable grouping) command in the Grid Menu (Grid Option "showPreHeaderPanel: true" has to be enabled)
     * @type {?|undefined}
     */
    GridMenu.prototype.hideTogglePreHeaderCommand;
    /**
     * CSS class for the displaying the Grid menu icon image (basically the hamburger menu)
     * @type {?|undefined}
     */
    GridMenu.prototype.iconCssClass;
    /**
     * icon for the "Clear All Filters" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconClearAllFiltersCommand;
    /**
     * icon for the "Clear All Sorting" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconClearAllSortingCommand;
    /**
     * icon for the "Export to CSV" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconExportCsvCommand;
    /**
     * icon for the "Export to Text Delimited" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconExportTextDelimitedCommand;
    /**
     * Link for the displaying the Grid menu icon image (basically the hamburger menu)
     * @type {?|undefined}
     */
    GridMenu.prototype.iconImage;
    /**
     * icon for the "Refresh Dataset" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconRefreshDatasetCommand;
    /**
     * icon for the "Toggle Filter Row" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconToggleFilterCommand;
    /**
     * icon for the "Toggle Pre-Header Row" command
     * @type {?|undefined}
     */
    GridMenu.prototype.iconTogglePreHeaderCommand;
    /**
     * Defaults to False, which leads to leaving the menu open after a click
     * @type {?|undefined}
     */
    GridMenu.prototype.leaveOpen;
    /**
     * Defaults to 16 pixels (only the number), which is the width in pixels of the Grid Menu icon
     * @type {?|undefined}
     */
    GridMenu.prototype.menuWidth;
    /**
     * Defaults to False, which will resize the Header Row and remove the width of the Grid Menu icon from it's total width.
     * @type {?|undefined}
     */
    GridMenu.prototype.resizeOnShowHeaderRow;
    /**
     * Defaults to "Synchronous resize" which is 1 of the last 2 checkbox title shown at the end of the picker list
     * @type {?|undefined}
     */
    GridMenu.prototype.syncResizeTitle;
    /**
     * Same as "syncResizeTitle", except that it's a translation key which can be used on page load and/or when switching locale
     * @type {?|undefined}
     */
    GridMenu.prototype.syncResizeTitleKey;
    /**
     * SlickGrid Event fired before the menu is shown.
     * @type {?|undefined}
     */
    GridMenu.prototype.onBeforeMenuShow;
    /**
     * SlickGrid Event fired when any of the columns checkbox selection changes.
     * @type {?|undefined}
     */
    GridMenu.prototype.onColumnsChanged;
    /**
     * SlickGrid Event fired when the menu is closing.
     * @type {?|undefined}
     */
    GridMenu.prototype.onMenuClose;
    /**
     * SlickGrid Event fired on menu item click for buttons with 'command' specified.
     * @type {?|undefined}
     */
    GridMenu.prototype.onCommand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnUuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvZ3JpZE1lbnUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSw4QkF5R0M7Ozs7OztJQXZHQywrQkFBNkI7Ozs7O0lBRzdCLCtCQUFxQjs7Ozs7SUFHckIsa0NBQXdCOzs7OztJQUd4QiwrQkFBcUI7Ozs7O0lBR3JCLGtDQUF3Qjs7Ozs7SUFHeEIsaUNBQXVCOzs7OztJQUd2QixvQ0FBMEI7Ozs7O0lBRzFCLDhDQUFxQzs7Ozs7SUFHckMsOENBQXFDOzs7OztJQUdyQyx3Q0FBK0I7Ozs7O0lBRy9CLGtEQUF5Qzs7Ozs7SUFHekMsc0NBQTZCOzs7OztJQUc3Qiw2Q0FBb0M7Ozs7O0lBR3BDLHdDQUErQjs7Ozs7SUFHL0IsMkNBQWtDOzs7OztJQUdsQyw4Q0FBcUM7Ozs7O0lBR3JDLGdDQUFzQjs7Ozs7SUFHdEIsOENBQW9DOzs7OztJQUdwQyw4Q0FBb0M7Ozs7O0lBR3BDLHdDQUE4Qjs7Ozs7SUFHOUIsa0RBQXdDOzs7OztJQUd4Qyw2QkFBbUI7Ozs7O0lBR25CLDZDQUFtQzs7Ozs7SUFHbkMsMkNBQWlDOzs7OztJQUdqQyw4Q0FBb0M7Ozs7O0lBR3BDLDZCQUFvQjs7Ozs7SUFHcEIsNkJBQW1COzs7OztJQUduQix5Q0FBZ0M7Ozs7O0lBR2hDLG1DQUF5Qjs7Ozs7SUFHekIsc0NBQTRCOzs7OztJQU01QixvQ0FBaUQ7Ozs7O0lBR2pELG9DQUFpRDs7Ozs7SUFHakQsK0JBQTRDOzs7OztJQUc1Qyw2QkFBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkTWVudUl0ZW0gfSBmcm9tICcuL2dyaWRNZW51SXRlbS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkTWVudSB7XHJcbiAgLyoqIEFycmF5IG9mIEN1c3RvbSBJdGVtcyAodGl0bGUsIGNvbW1hbmQsIGRpc2FibGVkLCAuLi4pICovXHJcbiAgY3VzdG9tSXRlbXM/OiBHcmlkTWVudUl0ZW1bXTtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIFwiQ29tbWFuZHNcIiB3aGljaCBpcyB0aGUgdGl0bGUgdGhhdCBzaG93cyB1cCBvdmVyIHRoZSBjdXN0b20gY29tbWFuZHMgbGlzdCAqL1xyXG4gIGN1c3RvbVRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2FtZSBhcyBcImN1c3RvbVRpdGxlXCIsIGV4Y2VwdCB0aGF0IGl0J3MgYSB0cmFuc2xhdGlvbiBrZXkgd2hpY2ggY2FuIGJlIHVzZWQgb24gcGFnZSBsb2FkIGFuZC9vciB3aGVuIHN3aXRjaGluZyBsb2NhbGUgKi9cclxuICBjdXN0b21UaXRsZUtleT86IHN0cmluZztcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIFwiQ29sdW1uc1wiIHdoaWNoIGlzIHRoZSB0aXRsZSB0aGF0IHNob3dzIHVwIG92ZXIgdGhlIGNvbHVtbnMgKi9cclxuICBjb2x1bW5UaXRsZT86IHN0cmluZztcclxuXHJcbiAgLyoqIFNhbWUgYXMgXCJjb2x1bW5UaXRsZVwiLCBleGNlcHQgdGhhdCBpdCdzIGEgdHJhbnNsYXRpb24ga2V5IHdoaWNoIGNhbiBiZSB1c2VkIG9uIHBhZ2UgbG9hZCBhbmQvb3Igd2hlbiBzd2l0Y2hpbmcgbG9jYWxlICovXHJcbiAgY29sdW1uVGl0bGVLZXk/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBcIkZvcmNlIGZpdCBjb2x1bW5zXCIgd2hpY2ggaXMgMSBvZiB0aGUgbGFzdCAyIGNoZWNrYm94IHRpdGxlIHNob3duIGF0IHRoZSBlbmQgb2YgdGhlIHBpY2tlciBsaXN0ICovXHJcbiAgZm9yY2VGaXRUaXRsZT86IHN0cmluZztcclxuXHJcbiAgLyoqIFNhbWUgYXMgXCJmb3JjZUZpdFRpdGxlXCIsIGV4Y2VwdCB0aGF0IGl0J3MgYSB0cmFuc2xhdGlvbiBrZXkgd2hpY2ggY2FuIGJlIHVzZWQgb24gcGFnZSBsb2FkIGFuZC9vciB3aGVuIHN3aXRjaGluZyBsb2NhbGUgKi9cclxuICBmb3JjZUZpdFRpdGxlS2V5Pzogc3RyaW5nO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIHdpbGwgaGlkZSB0aGUgXCJDbGVhciBBbGwgRmlsdGVyc1wiIGNvbW1hbmQgaW4gdGhlIEdyaWQgTWVudSAoR3JpZCBPcHRpb24gXCJlbmFibGVGaWx0ZXJpbmc6IHRydWVcIiBoYXMgdG8gYmUgZW5hYmxlZCkgKi9cclxuICBoaWRlQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIkNsZWFyIEFsbCBTb3J0aW5nXCIgY29tbWFuZCBpbiB0aGUgR3JpZCBNZW51IChHcmlkIE9wdGlvbiBcImVuYWJsZVNvcnRpbmc6IHRydWVcIiBoYXMgdG8gYmUgZW5hYmxlZCkgKi9cclxuICBoaWRlQ2xlYXJBbGxTb3J0aW5nQ29tbWFuZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIkV4cG9ydCB0byBDU1ZcIiBjb21tYW5kIGluIHRoZSBHcmlkIE1lbnUgKEdyaWQgT3B0aW9uIFwiZW5hYmxlRXhwb3J0OiB0cnVlXCIgaGFzIHRvIGJlIGVuYWJsZWQpICovXHJcbiAgaGlkZUV4cG9ydENzdkNvbW1hbmQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIHdpbGwgaGlkZSB0aGUgXCJFeHBvcnQgdG8gVGV4dCBEZWxpbWl0ZWRcIiBjb21tYW5kIGluIHRoZSBHcmlkIE1lbnUgKEdyaWQgT3B0aW9uIFwiZW5hYmxlRXhwb3J0OiB0cnVlXCIgaGFzIHRvIGJlIGVuYWJsZWQpICovXHJcbiAgaGlkZUV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCBzaG93L2hpZGUgMSBvZiB0aGUgbGFzdCAyIGNoZWNrYm94IGF0IHRoZSBlbmQgb2YgdGhlIHBpY2tlciBsaXN0ICovXHJcbiAgaGlkZUZvcmNlRml0QnV0dG9uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCB3aWxsIGhpZGUgdGhlIFwiUmVmcmVzaCBEYXRhc2V0XCIgY29tbWFuZCBpbiB0aGUgR3JpZCBNZW51IChvbmx5IHdvcmtzIHdpdGggYSBCYWNrZW5kIFNlcnZpY2UgQVBJKSAqL1xyXG4gIGhpZGVSZWZyZXNoRGF0YXNldENvbW1hbmQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHNob3cvaGlkZSAxIG9mIHRoZSBsYXN0IDIgY2hlY2tib3ggYXQgdGhlIGVuZCBvZiB0aGUgcGlja2VyIGxpc3QgKi9cclxuICBoaWRlU3luY1Jlc2l6ZUJ1dHRvbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggd2lsbCBoaWRlIHRoZSBcIlRvZ2dsZSBGaWx0ZXIgUm93XCIgY29tbWFuZCBpbiB0aGUgR3JpZCBNZW51IChHcmlkIE9wdGlvbiBcImVuYWJsZUZpbHRlcmluZzogdHJ1ZVwiIGhhcyB0byBiZSBlbmFibGVkKSAqL1xyXG4gIGhpZGVUb2dnbGVGaWx0ZXJDb21tYW5kPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgaGlkZSB0aGUgXCJUb2dnbGUgUHJlLUhlYWRlciBSb3dcIiAodXNlZCBieSBkcmFnZ2FibGUgZ3JvdXBpbmcpIGNvbW1hbmQgaW4gdGhlIEdyaWQgTWVudSAoR3JpZCBPcHRpb24gXCJzaG93UHJlSGVhZGVyUGFuZWw6IHRydWVcIiBoYXMgdG8gYmUgZW5hYmxlZCkgKi9cclxuICBoaWRlVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDU1MgY2xhc3MgZm9yIHRoZSBkaXNwbGF5aW5nIHRoZSBHcmlkIG1lbnUgaWNvbiBpbWFnZSAoYmFzaWNhbGx5IHRoZSBoYW1idXJnZXIgbWVudSkgKi9cclxuICBpY29uQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBpY29uIGZvciB0aGUgXCJDbGVhciBBbGwgRmlsdGVyc1wiIGNvbW1hbmQgKi9cclxuICBpY29uQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIkNsZWFyIEFsbCBTb3J0aW5nXCIgY29tbWFuZCAqL1xyXG4gIGljb25DbGVhckFsbFNvcnRpbmdDb21tYW5kPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiRXhwb3J0IHRvIENTVlwiIGNvbW1hbmQgKi9cclxuICBpY29uRXhwb3J0Q3N2Q29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIkV4cG9ydCB0byBUZXh0IERlbGltaXRlZFwiIGNvbW1hbmQgKi9cclxuICBpY29uRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBMaW5rIGZvciB0aGUgZGlzcGxheWluZyB0aGUgR3JpZCBtZW51IGljb24gaW1hZ2UgKGJhc2ljYWxseSB0aGUgaGFtYnVyZ2VyIG1lbnUpICovXHJcbiAgaWNvbkltYWdlPzogc3RyaW5nO1xyXG5cclxuICAvKiogaWNvbiBmb3IgdGhlIFwiUmVmcmVzaCBEYXRhc2V0XCIgY29tbWFuZCAqL1xyXG4gIGljb25SZWZyZXNoRGF0YXNldENvbW1hbmQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBpY29uIGZvciB0aGUgXCJUb2dnbGUgRmlsdGVyIFJvd1wiIGNvbW1hbmQgKi9cclxuICBpY29uVG9nZ2xlRmlsdGVyQ29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIGljb24gZm9yIHRoZSBcIlRvZ2dsZSBQcmUtSGVhZGVyIFJvd1wiIGNvbW1hbmQgKi9cclxuICBpY29uVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZD86IHN0cmluZztcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIEZhbHNlLCB3aGljaCBsZWFkcyB0byBsZWF2aW5nIHRoZSBtZW51IG9wZW4gYWZ0ZXIgYSBjbGljayAqL1xyXG4gIGxlYXZlT3Blbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byAxNiBwaXhlbHMgKG9ubHkgdGhlIG51bWJlciksIHdoaWNoIGlzIHRoZSB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIEdyaWQgTWVudSBpY29uICovXHJcbiAgbWVudVdpZHRoPzogbnVtYmVyO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gRmFsc2UsIHdoaWNoIHdpbGwgcmVzaXplIHRoZSBIZWFkZXIgUm93IGFuZCByZW1vdmUgdGhlIHdpZHRoIG9mIHRoZSBHcmlkIE1lbnUgaWNvbiBmcm9tIGl0J3MgdG90YWwgd2lkdGguICovXHJcbiAgcmVzaXplT25TaG93SGVhZGVyUm93PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIFwiU3luY2hyb25vdXMgcmVzaXplXCIgd2hpY2ggaXMgMSBvZiB0aGUgbGFzdCAyIGNoZWNrYm94IHRpdGxlIHNob3duIGF0IHRoZSBlbmQgb2YgdGhlIHBpY2tlciBsaXN0ICovXHJcbiAgc3luY1Jlc2l6ZVRpdGxlPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2FtZSBhcyBcInN5bmNSZXNpemVUaXRsZVwiLCBleGNlcHQgdGhhdCBpdCdzIGEgdHJhbnNsYXRpb24ga2V5IHdoaWNoIGNhbiBiZSB1c2VkIG9uIHBhZ2UgbG9hZCBhbmQvb3Igd2hlbiBzd2l0Y2hpbmcgbG9jYWxlICovXHJcbiAgc3luY1Jlc2l6ZVRpdGxlS2V5Pzogc3RyaW5nO1xyXG5cclxuICAvL1xyXG4gIC8vIEV2ZW50c1xyXG5cclxuICAvKiogU2xpY2tHcmlkIEV2ZW50IGZpcmVkIGJlZm9yZSB0aGUgbWVudSBpcyBzaG93bi4gKi9cclxuICBvbkJlZm9yZU1lbnVTaG93PzogKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBTbGlja0dyaWQgRXZlbnQgZmlyZWQgd2hlbiBhbnkgb2YgdGhlIGNvbHVtbnMgY2hlY2tib3ggc2VsZWN0aW9uIGNoYW5nZXMuICovXHJcbiAgb25Db2x1bW5zQ2hhbmdlZD86IChlOiBFdmVudCwgYXJnczogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogU2xpY2tHcmlkIEV2ZW50IGZpcmVkIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2luZy4gKi9cclxuICBvbk1lbnVDbG9zZT86IChlOiBFdmVudCwgYXJnczogYW55KSA9PiB2b2lkO1xyXG5cclxuICAvKiogU2xpY2tHcmlkIEV2ZW50IGZpcmVkIG9uIG1lbnUgaXRlbSBjbGljayBmb3IgYnV0dG9ucyB3aXRoICdjb21tYW5kJyBzcGVjaWZpZWQuICovXHJcbiAgb25Db21tYW5kPzogKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHZvaWQ7XHJcbn1cclxuIl19