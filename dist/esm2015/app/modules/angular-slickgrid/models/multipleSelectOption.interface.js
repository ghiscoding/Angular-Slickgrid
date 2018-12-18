/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function MultipleSelectOption() { }
if (false) {
    /**
     * Add a title. By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.addTitle;
    /**
     * defaults to 20, when using "autoAdjustDropHeight" we might want to add a bottom (or top) padding instead of taking the entire available space
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.adjustHeightPadding;
    /**
     * Use animation, options are ('none', 'fade', 'slide'). By default this option is set to 'none'
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.animate;
    /**
     * The text displays when the select all selected.By default this option is set to "All selected".
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.allSelected;
    /**
     * Auto-adjust the Drop menu height to fit with available space
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.autoAdjustDropHeight;
    /**
     * Auto-adjust the Drop position on the side with the most available space (dropup / dropdown)
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.autoAdjustDropPosition;
    /**
     * Drop menu to automatically set same width as the input select element
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.autoDropWidth;
    /**
     * Drop menu to automatically set it's width as the maximum available width of text
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.autoAdjustDropWidthByTextSize;
    /**
     * HTML container to use for the drop menu, e.g. 'body'
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.container;
    /**
     * `#` is replaced with the count of selected items, `%` is replaces with total items.By default this option is set to # of % selected.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.countSelected;
    /**
     * Delimiter to use when display the selected options. By default this option is set to `,`
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.delimiter;
    /**
     * Display selected values on the element. By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.displayValues;
    /**
     * Defaults to 26 (as per CSS), that is the "OK" button element height in pixels inside the drop when using multiple-selection
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.domElmOkButtonHeight;
    /**
     * Defaults to 26 (as per CSS), that is the select DOM element padding in pixels (that is not the drop but the select itself, how tall is it)
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.domElmSelectSidePadding;
    /**
     * Defaults to 39 (as per CSS), that is the DOM element of the "Select All" text area
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.domElmSelectAllHeight;
    /**
     * Define the width of the dropdown list
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.dropWidth;
    /**
     * Add `…` after selected options if minimumCountSelected is set. Overrides countSelected option.By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.ellipsis;
    /**
     * Whether or not Multiple Select show a search field to search through checkbox items.By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.filter;
    /**
     * Accept a filter by typing Enter on the keyboard. By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.filterAcceptOnEnter;
    /**
     * Hide the option groupd checkboses. By default this is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.hideOptgroupCheckboxes;
    /**
     * Whether or not Multiple Select open the select dropdown.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.isOpen;
    /**
     * Keep the select dropdown always open.By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.keepOpen;
    /**
     * Defaults to 250, define the maximum height property of the dropdown list.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.maxHeight;
    /**
     * Defaults to 500, define the maximum width of the drop when using the "autoAdjustDropWidthByTextSize: true" flag.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.maxWidth;
    /**
     * Define the minimum width of the drop when using the "autoAdjustDropWidthByTextSize: true" flag.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.minWidth;
    /**
     * countSelected will be shown only if more than X items where selected.By default this option is set to 3.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.minimumCountSelected;
    /**
     * Whether or not Multiple Select show multiple items in a row.By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.multiple;
    /**
     * Multiple Select show multiple items width.By default this option is set to 80.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.multipleWidth;
    /**
     * Provide a name to the multiple select element. By default this option is set to ''.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.name;
    /**
     * Text to display when nothing is found. By default the text is "No matches found"
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.noMatchesFound;
    /**
     * Add an offset to the dropdown menu list. By default this option is set to 0.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.offsetLeft;
    /**
     * Display the OK button at bottom of the list. By default this is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.okButton;
    /**
     * Text to display on the bottom OK button. By default the text is "OK"
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.okButtonText;
    /**
     * A placeholder value can be defined and will be displayed until you select a item.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.placeholder;
    /**
     * Defines the position of select dropdown, can only be bottom or top.By default this option is set to bottom.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.position;
    /**
     * Whether or not Multiple Select show select all checkbox.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.selectAll;
    /**
     * Multiple Select select all checkbox delimiter. By default this option is set to ['[',']'].
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.selectAllDelimiter;
    /**
     * Multiple Select select all checkbox text. By default this option is set to "Select all"
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.selectAllText;
    /**
     * Whether or not Multiple Select allows you to select only one option.By default this option is set to false.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.single;
    /**
     * Defaults to false, when set to True it will use the "title" that were defined in each select option
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.useSelectOptionTitle;
    /**
     * Defaults to False, when set to True it will use the <option label=""> that can be used to display selected options
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.useSelectOptionLabel;
    /**
     * Defaults to False, same as "useSelectOptionLabel" but will also render html
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.useSelectOptionLabelToHtml;
    /**
     * Define the width property of the dropdown list, support a percentage setting.By default this option is set to undefined. Which is the same as the select input field.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.width;
    /**
     * Blur the multiple select.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.blur;
    /**
     * Enables Select.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.enable;
    /**
     * Focus the multiple select.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.focus;
    /**
     * Disables Select. During this mode the user is not allowed to manipulate the selection.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.disable;
    /**
     * Check all checkboxes.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.checkAll;
    /**
     * Uncheck all checkboxes.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.uncheckAll;
    /**
     * Reloads the Multiple Select. If you’re dynamically adding/removing option tags on the original select via AJAX or DOM manipulation methods, call refresh to reflect the changes.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.refresh;
    /**
     * Gets the selected values.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.getSelects;
    /**
     * Sets the selected values.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.setSelects;
    /**
     * The item styler function, return style string to custom the item style such as background: red. The function take one parameter: value.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.styler;
    /**
     * Returns HTML label attribute of a DOM element
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.labelTemplate;
    /**
     * Returns HTML text template of a DOM element
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.textTemplate;
    /**
     * Fires when the dropdown list is open.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onOpen;
    /**
     * Fires when the dropdown list is close.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onClose;
    /**
     * Fires when all the options are checked by either clicking the `Select all` checkbox, or when the `checkall` method is programatically called.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onCheckAll;
    /**
     * Fires when all the options are unchecked by either clicking the `Select all` checkbox, or when the `uncheckall` method is programatically called.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onUncheckAll;
    /**
     * Bind an event handler to the “focus”.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onFocus;
    /**
     * Bind an event handler to the “blur”
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onBlur;
    /**
     * Fires when a an optgroup label is clicked on.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onOptgroupClick;
    /**
     * Fires when a checkbox is checked or unchecked.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onClick;
    /**
     * Fires when a checkbox filter is changed.
     * @type {?|undefined}
     */
    MultipleSelectOption.prototype.onFilter;
}
/**
 * @record
 */
export function MultipleSelectView() { }
if (false) {
    /** @type {?} */
    MultipleSelectView.prototype.label;
    /** @type {?} */
    MultipleSelectView.prototype.value;
    /** @type {?} */
    MultipleSelectView.prototype.checked;
    /** @type {?} */
    MultipleSelectView.prototype.instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVTZWxlY3RPcHRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2RlbHMvbXVsdGlwbGVTZWxlY3RPcHRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwQ0F3TUM7Ozs7OztJQXRNQyx3Q0FBbUI7Ozs7O0lBR25CLG1EQUE2Qjs7Ozs7SUFHN0IsdUNBQW9DOzs7OztJQUdwQywyQ0FBK0I7Ozs7O0lBRy9CLG9EQUErQjs7Ozs7SUFHL0Isc0RBQWlDOzs7OztJQUdqQyw2Q0FBd0I7Ozs7O0lBR3hCLDZEQUF3Qzs7Ozs7SUFHeEMseUNBQW1COzs7OztJQUduQiw2Q0FBdUI7Ozs7O0lBR3ZCLHlDQUFtQjs7Ozs7SUFHbkIsNkNBQXdCOzs7OztJQUd4QixvREFBOEI7Ozs7O0lBRzlCLHVEQUFpQzs7Ozs7SUFHakMscURBQStCOzs7OztJQUcvQix5Q0FBbUI7Ozs7O0lBR25CLHdDQUFtQjs7Ozs7SUFHbkIsc0NBQWlCOzs7OztJQUdqQixtREFBOEI7Ozs7O0lBRzlCLHNEQUFpQzs7Ozs7SUFHakMsc0NBQWlCOzs7OztJQUdqQix3Q0FBbUI7Ozs7O0lBR25CLHlDQUFtQjs7Ozs7SUFHbkIsd0NBQWtCOzs7OztJQUdsQix3Q0FBa0I7Ozs7O0lBR2xCLG9EQUE4Qjs7Ozs7SUFHOUIsd0NBQW1COzs7OztJQUduQiw2Q0FBdUI7Ozs7O0lBR3ZCLG9DQUFjOzs7OztJQUdkLDhDQUF3Qjs7Ozs7SUFHeEIsMENBQW9COzs7OztJQUdwQix3Q0FBbUI7Ozs7O0lBR25CLDRDQUFzQjs7Ozs7SUFHdEIsMkNBQXFCOzs7OztJQUdyQix3Q0FBa0I7Ozs7O0lBR2xCLHlDQUFvQjs7Ozs7SUFHcEIsa0RBQThCOzs7OztJQUc5Qiw2Q0FBdUI7Ozs7O0lBR3ZCLHNDQUFpQjs7Ozs7SUFHakIsb0RBQStCOzs7OztJQUcvQixvREFBK0I7Ozs7O0lBRy9CLDBEQUFxQzs7Ozs7SUFHckMscUNBQXdCOzs7OztJQU94QixvQ0FBa0I7Ozs7O0lBR2xCLHNDQUFvQjs7Ozs7SUFHcEIscUNBQW1COzs7OztJQUduQix1Q0FBcUI7Ozs7O0lBR3JCLHdDQUFzQjs7Ozs7SUFHdEIsMENBQXdCOzs7OztJQUd4Qix1Q0FBcUI7Ozs7O0lBR3JCLDBDQUFxQzs7Ozs7SUFHckMsMENBQWdEOzs7OztJQUdoRCxzQ0FBaUM7Ozs7O0lBR2pDLDZDQUFrQzs7Ozs7SUFHbEMsNENBQWlDOzs7OztJQU9qQyxzQ0FBb0I7Ozs7O0lBR3BCLHVDQUFxQjs7Ozs7SUFHckIsMENBQXdCOzs7OztJQUd4Qiw0Q0FBMEI7Ozs7O0lBRzFCLHVDQUFxQjs7Ozs7SUFHckIsc0NBQW9COzs7OztJQUdwQiwrQ0FBcUQ7Ozs7O0lBR3JELHVDQUE2Qzs7Ozs7SUFHN0Msd0NBQXNCOzs7OztBQUd4Qix3Q0FLQzs7O0lBSkMsbUNBQWM7O0lBQ2QsbUNBQVc7O0lBQ1gscUNBQWlCOztJQUNqQixzQ0FBYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgTXVsdGlwbGVTZWxlY3RPcHRpb24ge1xuICAvKiogQWRkIGEgdGl0bGUuIEJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIGZhbHNlLiAqL1xuICBhZGRUaXRsZT86IGJvb2xlYW47XG5cbiAgLyoqIGRlZmF1bHRzIHRvIDIwLCB3aGVuIHVzaW5nIFwiYXV0b0FkanVzdERyb3BIZWlnaHRcIiB3ZSBtaWdodCB3YW50IHRvIGFkZCBhIGJvdHRvbSAob3IgdG9wKSBwYWRkaW5nIGluc3RlYWQgb2YgdGFraW5nIHRoZSBlbnRpcmUgYXZhaWxhYmxlIHNwYWNlICovXG4gIGFkanVzdEhlaWdodFBhZGRpbmc/OiBudW1iZXI7XG5cbiAgLyoqIFVzZSBhbmltYXRpb24sIG9wdGlvbnMgYXJlICgnbm9uZScsICdmYWRlJywgJ3NsaWRlJykuIEJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvICdub25lJyAgKi9cbiAgYW5pbWF0ZT86ICdub25lJyB8ICdmYWRlJyB8ICdzbGlkZSc7XG5cbiAgLyoqIFRoZSB0ZXh0IGRpc3BsYXlzIHdoZW4gdGhlIHNlbGVjdCBhbGwgc2VsZWN0ZWQuQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gXCJBbGwgc2VsZWN0ZWRcIi4gKi9cbiAgYWxsU2VsZWN0ZWQ/OiBib29sZWFuIHwgc3RyaW5nO1xuXG4gIC8qKiBBdXRvLWFkanVzdCB0aGUgRHJvcCBtZW51IGhlaWdodCB0byBmaXQgd2l0aCBhdmFpbGFibGUgc3BhY2UgKi9cbiAgYXV0b0FkanVzdERyb3BIZWlnaHQ/OiBib29sZWFuO1xuXG4gIC8qKiBBdXRvLWFkanVzdCB0aGUgRHJvcCBwb3NpdGlvbiBvbiB0aGUgc2lkZSB3aXRoIHRoZSBtb3N0IGF2YWlsYWJsZSBzcGFjZSAoZHJvcHVwIC8gZHJvcGRvd24pICovXG4gIGF1dG9BZGp1c3REcm9wUG9zaXRpb24/OiBib29sZWFuO1xuXG4gIC8qKiBEcm9wIG1lbnUgdG8gYXV0b21hdGljYWxseSBzZXQgc2FtZSB3aWR0aCBhcyB0aGUgaW5wdXQgc2VsZWN0IGVsZW1lbnQgKi9cbiAgYXV0b0Ryb3BXaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqIERyb3AgbWVudSB0byBhdXRvbWF0aWNhbGx5IHNldCBpdCdzIHdpZHRoIGFzIHRoZSBtYXhpbXVtIGF2YWlsYWJsZSB3aWR0aCBvZiB0ZXh0ICovXG4gIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplPzogYm9vbGVhbjtcblxuICAvKiogSFRNTCBjb250YWluZXIgdG8gdXNlIGZvciB0aGUgZHJvcCBtZW51LCBlLmcuICdib2R5JyAqL1xuICBjb250YWluZXI/OiBzdHJpbmc7XG5cbiAgLyoqIGAjYCBpcyByZXBsYWNlZCB3aXRoIHRoZSBjb3VudCBvZiBzZWxlY3RlZCBpdGVtcywgYCVgIGlzIHJlcGxhY2VzIHdpdGggdG90YWwgaXRlbXMuQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gIyBvZiAlIHNlbGVjdGVkLiAqL1xuICBjb3VudFNlbGVjdGVkPzogc3RyaW5nO1xuXG4gIC8qKiBEZWxpbWl0ZXIgdG8gdXNlIHdoZW4gZGlzcGxheSB0aGUgc2VsZWN0ZWQgb3B0aW9ucy4gQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gYCxgICovXG4gIGRlbGltaXRlcj86IHN0cmluZztcblxuICAvKiogRGlzcGxheSBzZWxlY3RlZCB2YWx1ZXMgb24gdGhlIGVsZW1lbnQuIEJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIGZhbHNlLiAqL1xuICBkaXNwbGF5VmFsdWVzPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gMjYgKGFzIHBlciBDU1MpLCB0aGF0IGlzIHRoZSBcIk9LXCIgYnV0dG9uIGVsZW1lbnQgaGVpZ2h0IGluIHBpeGVscyBpbnNpZGUgdGhlIGRyb3Agd2hlbiB1c2luZyBtdWx0aXBsZS1zZWxlY3Rpb24gKi9cbiAgZG9tRWxtT2tCdXR0b25IZWlnaHQ/OiBudW1iZXI7XG5cbiAgLyoqIERlZmF1bHRzIHRvIDI2IChhcyBwZXIgQ1NTKSwgdGhhdCBpcyB0aGUgc2VsZWN0IERPTSBlbGVtZW50IHBhZGRpbmcgaW4gcGl4ZWxzICh0aGF0IGlzIG5vdCB0aGUgZHJvcCBidXQgdGhlIHNlbGVjdCBpdHNlbGYsIGhvdyB0YWxsIGlzIGl0KSAqL1xuICBkb21FbG1TZWxlY3RTaWRlUGFkZGluZz86IG51bWJlcjtcblxuICAvKiogRGVmYXVsdHMgdG8gMzkgKGFzIHBlciBDU1MpLCB0aGF0IGlzIHRoZSBET00gZWxlbWVudCBvZiB0aGUgXCJTZWxlY3QgQWxsXCIgdGV4dCBhcmVhICovXG4gIGRvbUVsbVNlbGVjdEFsbEhlaWdodD86IG51bWJlcjtcblxuICAvKiogRGVmaW5lIHRoZSB3aWR0aCBvZiB0aGUgZHJvcGRvd24gbGlzdCAqL1xuICBkcm9wV2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqIEFkZCBg4oCmYCBhZnRlciBzZWxlY3RlZCBvcHRpb25zIGlmIG1pbmltdW1Db3VudFNlbGVjdGVkIGlzIHNldC4gT3ZlcnJpZGVzIGNvdW50U2VsZWN0ZWQgb3B0aW9uLkJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIGZhbHNlLiAqL1xuICBlbGxpcHNpcz86IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IE11bHRpcGxlIFNlbGVjdCBzaG93IGEgc2VhcmNoIGZpZWxkIHRvIHNlYXJjaCB0aHJvdWdoIGNoZWNrYm94IGl0ZW1zLkJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIGZhbHNlLiAqL1xuICBmaWx0ZXI/OiBib29sZWFuO1xuXG4gIC8qKiBBY2NlcHQgYSBmaWx0ZXIgYnkgdHlwaW5nIEVudGVyIG9uIHRoZSBrZXlib2FyZC4gQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gZmFsc2UuICovXG4gIGZpbHRlckFjY2VwdE9uRW50ZXI/OiBib29sZWFuO1xuXG4gIC8qKiBIaWRlIHRoZSBvcHRpb24gZ3JvdXBkIGNoZWNrYm9zZXMuIEJ5IGRlZmF1bHQgdGhpcyBpcyBzZXQgdG8gZmFsc2UuICovXG4gIGhpZGVPcHRncm91cENoZWNrYm94ZXM/OiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCBNdWx0aXBsZSBTZWxlY3Qgb3BlbiB0aGUgc2VsZWN0IGRyb3Bkb3duLiAqL1xuICBpc09wZW4/OiBib29sZWFuO1xuXG4gIC8qKiBLZWVwIHRoZSBzZWxlY3QgZHJvcGRvd24gYWx3YXlzIG9wZW4uQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gZmFsc2UuICovXG4gIGtlZXBPcGVuPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gMjUwLCBkZWZpbmUgdGhlIG1heGltdW0gaGVpZ2h0IHByb3BlcnR5IG9mIHRoZSBkcm9wZG93biBsaXN0LiAqL1xuICBtYXhIZWlnaHQ/OiBudW1iZXI7XG5cbiAgLyoqIERlZmF1bHRzIHRvIDUwMCwgZGVmaW5lIHRoZSBtYXhpbXVtIHdpZHRoIG9mIHRoZSBkcm9wIHdoZW4gdXNpbmcgdGhlIFwiYXV0b0FkanVzdERyb3BXaWR0aEJ5VGV4dFNpemU6IHRydWVcIiBmbGFnLiAqL1xuICBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKiogRGVmaW5lIHRoZSBtaW5pbXVtIHdpZHRoIG9mIHRoZSBkcm9wIHdoZW4gdXNpbmcgdGhlIFwiYXV0b0FkanVzdERyb3BXaWR0aEJ5VGV4dFNpemU6IHRydWVcIiBmbGFnLiAqL1xuICBtaW5XaWR0aD86IG51bWJlcjtcblxuICAvKiogY291bnRTZWxlY3RlZCB3aWxsIGJlIHNob3duIG9ubHkgaWYgbW9yZSB0aGFuIFggaXRlbXMgd2hlcmUgc2VsZWN0ZWQuQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gMy4gKi9cbiAgbWluaW11bUNvdW50U2VsZWN0ZWQ/OiBudW1iZXI7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IE11bHRpcGxlIFNlbGVjdCBzaG93IG11bHRpcGxlIGl0ZW1zIGluIGEgcm93LkJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIGZhbHNlLiAqL1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG5cbiAgLyoqIE11bHRpcGxlIFNlbGVjdCBzaG93IG11bHRpcGxlIGl0ZW1zIHdpZHRoLkJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIDgwLiAqL1xuICBtdWx0aXBsZVdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKiBQcm92aWRlIGEgbmFtZSB0byB0aGUgbXVsdGlwbGUgc2VsZWN0IGVsZW1lbnQuIEJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvICcnLiAqL1xuICBuYW1lPzogc3RyaW5nO1xuXG4gIC8qKiBUZXh0IHRvIGRpc3BsYXkgd2hlbiBub3RoaW5nIGlzIGZvdW5kLiBCeSBkZWZhdWx0IHRoZSB0ZXh0IGlzIFwiTm8gbWF0Y2hlcyBmb3VuZFwiICovXG4gIG5vTWF0Y2hlc0ZvdW5kPzogc3RyaW5nO1xuXG4gIC8qKiBBZGQgYW4gb2Zmc2V0IHRvIHRoZSBkcm9wZG93biBtZW51IGxpc3QuIEJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIDAuICovXG4gIG9mZnNldExlZnQ/OiBudW1iZXI7XG5cbiAgLyoqIERpc3BsYXkgdGhlIE9LIGJ1dHRvbiBhdCBib3R0b20gb2YgdGhlIGxpc3QuIEJ5IGRlZmF1bHQgdGhpcyBpcyBzZXQgdG8gZmFsc2UuICovXG4gIG9rQnV0dG9uPzogYm9vbGVhbjtcblxuICAvKiogVGV4dCB0byBkaXNwbGF5IG9uIHRoZSBib3R0b20gT0sgYnV0dG9uLiBCeSBkZWZhdWx0IHRoZSB0ZXh0IGlzIFwiT0tcIiAqL1xuICBva0J1dHRvblRleHQ/OiBzdHJpbmc7XG5cbiAgLyoqIEEgcGxhY2Vob2xkZXIgdmFsdWUgY2FuIGJlIGRlZmluZWQgYW5kIHdpbGwgYmUgZGlzcGxheWVkIHVudGlsIHlvdSBzZWxlY3QgYSBpdGVtLiAqL1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcblxuICAvKiogRGVmaW5lcyB0aGUgcG9zaXRpb24gb2Ygc2VsZWN0IGRyb3Bkb3duLCBjYW4gb25seSBiZSBib3R0b20gb3IgdG9wLkJ5IGRlZmF1bHQgdGhpcyBvcHRpb24gaXMgc2V0IHRvIGJvdHRvbS4gKi9cbiAgcG9zaXRpb24/OiBzdHJpbmc7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IE11bHRpcGxlIFNlbGVjdCBzaG93IHNlbGVjdCBhbGwgY2hlY2tib3guICovXG4gIHNlbGVjdEFsbD86IGJvb2xlYW47XG5cbiAgLyoqIE11bHRpcGxlIFNlbGVjdCBzZWxlY3QgYWxsIGNoZWNrYm94IGRlbGltaXRlci4gQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gWydbJywnXSddLiAqL1xuICBzZWxlY3RBbGxEZWxpbWl0ZXI/OiBzdHJpbmdbXTtcblxuICAvKiogTXVsdGlwbGUgU2VsZWN0IHNlbGVjdCBhbGwgY2hlY2tib3ggdGV4dC4gQnkgZGVmYXVsdCB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gXCJTZWxlY3QgYWxsXCIgKi9cbiAgc2VsZWN0QWxsVGV4dD86IHN0cmluZztcblxuICAvKiogV2hldGhlciBvciBub3QgTXVsdGlwbGUgU2VsZWN0IGFsbG93cyB5b3UgdG8gc2VsZWN0IG9ubHkgb25lIG9wdGlvbi5CeSBkZWZhdWx0IHRoaXMgb3B0aW9uIGlzIHNldCB0byBmYWxzZS4gKi9cbiAgc2luZ2xlPzogYm9vbGVhbjtcblxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gc2V0IHRvIFRydWUgaXQgd2lsbCB1c2UgdGhlIFwidGl0bGVcIiB0aGF0IHdlcmUgZGVmaW5lZCBpbiBlYWNoIHNlbGVjdCBvcHRpb24gKi9cbiAgdXNlU2VsZWN0T3B0aW9uVGl0bGU/OiBib29sZWFuO1xuXG4gIC8qKiBEZWZhdWx0cyB0byBGYWxzZSwgd2hlbiBzZXQgdG8gVHJ1ZSBpdCB3aWxsIHVzZSB0aGUgPG9wdGlvbiBsYWJlbD1cIlwiPiB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgc2VsZWN0ZWQgb3B0aW9ucyAqL1xuICB1c2VTZWxlY3RPcHRpb25MYWJlbD86IGJvb2xlYW47XG5cbiAgLyoqIERlZmF1bHRzIHRvIEZhbHNlLCBzYW1lIGFzIFwidXNlU2VsZWN0T3B0aW9uTGFiZWxcIiBidXQgd2lsbCBhbHNvIHJlbmRlciBodG1sICovXG4gIHVzZVNlbGVjdE9wdGlvbkxhYmVsVG9IdG1sPzogYm9vbGVhbjtcblxuICAvKiogRGVmaW5lIHRoZSB3aWR0aCBwcm9wZXJ0eSBvZiB0aGUgZHJvcGRvd24gbGlzdCwgc3VwcG9ydCBhIHBlcmNlbnRhZ2Ugc2V0dGluZy5CeSBkZWZhdWx0IHRoaXMgb3B0aW9uIGlzIHNldCB0byB1bmRlZmluZWQuIFdoaWNoIGlzIHRoZSBzYW1lIGFzIHRoZSBzZWxlY3QgaW5wdXQgZmllbGQuICovXG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xuXG4gIC8vIC0tXG4gIC8vIE1ldGhvZHNcbiAgLy8gLS0tLS0tLS0tLS0tXG5cbiAgLyoqIEJsdXIgdGhlIG11bHRpcGxlIHNlbGVjdC4gKi9cbiAgYmx1cj86ICgpID0+IHZvaWQ7XG5cbiAgLyoqIEVuYWJsZXMgU2VsZWN0LiAqL1xuICBlbmFibGU/OiAoKSA9PiB2b2lkO1xuXG4gIC8qKiBGb2N1cyB0aGUgbXVsdGlwbGUgc2VsZWN0LiAqL1xuICBmb2N1cz86ICgpID0+IHZvaWQ7XG5cbiAgLyoqIERpc2FibGVzIFNlbGVjdC4gRHVyaW5nIHRoaXMgbW9kZSB0aGUgdXNlciBpcyBub3QgYWxsb3dlZCB0byBtYW5pcHVsYXRlIHRoZSBzZWxlY3Rpb24uICovXG4gIGRpc2FibGU/OiAoKSA9PiB2b2lkO1xuXG4gIC8qKiBDaGVjayBhbGwgY2hlY2tib3hlcy4gKi9cbiAgY2hlY2tBbGw/OiAoKSA9PiB2b2lkO1xuXG4gIC8qKiBVbmNoZWNrIGFsbCBjaGVja2JveGVzLiAqL1xuICB1bmNoZWNrQWxsPzogKCkgPT4gdm9pZDtcblxuICAvKiogUmVsb2FkcyB0aGUgTXVsdGlwbGUgU2VsZWN0LiBJZiB5b3XigJlyZSBkeW5hbWljYWxseSBhZGRpbmcvcmVtb3Zpbmcgb3B0aW9uIHRhZ3Mgb24gdGhlIG9yaWdpbmFsIHNlbGVjdCB2aWEgQUpBWCBvciBET00gbWFuaXB1bGF0aW9uIG1ldGhvZHMsIGNhbGwgcmVmcmVzaCB0byByZWZsZWN0IHRoZSBjaGFuZ2VzLiAqL1xuICByZWZyZXNoPzogKCkgPT4gdm9pZDtcblxuICAvKiogR2V0cyB0aGUgc2VsZWN0ZWQgdmFsdWVzLiAqL1xuICBnZXRTZWxlY3RzPzogKCkgPT4gc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgLyoqIFNldHMgdGhlIHNlbGVjdGVkIHZhbHVlcy4gKi9cbiAgc2V0U2VsZWN0cz86ICh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pID0+IHZvaWQ7XG5cbiAgLyoqIFRoZSBpdGVtIHN0eWxlciBmdW5jdGlvbiwgcmV0dXJuIHN0eWxlIHN0cmluZyB0byBjdXN0b20gdGhlIGl0ZW0gc3R5bGUgc3VjaCBhcyBiYWNrZ3JvdW5kOiByZWQuIFRoZSBmdW5jdGlvbiB0YWtlIG9uZSBwYXJhbWV0ZXI6IHZhbHVlLiAqL1xuICBzdHlsZXI/OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcblxuICAvKiogUmV0dXJucyBIVE1MIGxhYmVsIGF0dHJpYnV0ZSBvZiBhIERPTSBlbGVtZW50ICovXG4gIGxhYmVsVGVtcGxhdGU/OiAoZWxtOiBhbnkpID0+IGFueTtcblxuICAvKiogUmV0dXJucyBIVE1MIHRleHQgdGVtcGxhdGUgb2YgYSBET00gZWxlbWVudCAqL1xuICB0ZXh0VGVtcGxhdGU/OiAoZWxtOiBhbnkpID0+IGFueTtcblxuICAvLyAtLVxuICAvLyBFdmVudHNcbiAgLy8gLS0tLS0tLS0tLS0tXG5cbiAgLyoqIEZpcmVzIHdoZW4gdGhlIGRyb3Bkb3duIGxpc3QgaXMgb3Blbi4gKi9cbiAgb25PcGVuPzogKCkgPT4gdm9pZDtcblxuICAvKiogRmlyZXMgd2hlbiB0aGUgZHJvcGRvd24gbGlzdCBpcyBjbG9zZS4gKi9cbiAgb25DbG9zZT86ICgpID0+IHZvaWQ7XG5cbiAgLyoqIEZpcmVzIHdoZW4gYWxsIHRoZSBvcHRpb25zIGFyZSBjaGVja2VkIGJ5IGVpdGhlciBjbGlja2luZyB0aGUgYFNlbGVjdCBhbGxgIGNoZWNrYm94LCBvciB3aGVuIHRoZSBgY2hlY2thbGxgIG1ldGhvZCBpcyBwcm9ncmFtYXRpY2FsbHkgY2FsbGVkLiAqL1xuICBvbkNoZWNrQWxsPzogKCkgPT4gdm9pZDtcblxuICAvKiogRmlyZXMgd2hlbiBhbGwgdGhlIG9wdGlvbnMgYXJlIHVuY2hlY2tlZCBieSBlaXRoZXIgY2xpY2tpbmcgdGhlIGBTZWxlY3QgYWxsYCBjaGVja2JveCwgb3Igd2hlbiB0aGUgYHVuY2hlY2thbGxgIG1ldGhvZCBpcyBwcm9ncmFtYXRpY2FsbHkgY2FsbGVkLiAqL1xuICBvblVuY2hlY2tBbGw/OiAoKSA9PiB2b2lkO1xuXG4gIC8qKiBCaW5kIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIOKAnGZvY3Vz4oCdLiAqL1xuICBvbkZvY3VzPzogKCkgPT4gdm9pZDtcblxuICAvKiogQmluZCBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSDigJxibHVy4oCdICovXG4gIG9uQmx1cj86ICgpID0+IHZvaWQ7XG5cbiAgLyoqIEZpcmVzIHdoZW4gYSBhbiBvcHRncm91cCBsYWJlbCBpcyBjbGlja2VkIG9uLiAqL1xuICBvbk9wdGdyb3VwQ2xpY2s/OiAodmlldzogTXVsdGlwbGVTZWxlY3RWaWV3KSA9PiB2b2lkO1xuXG4gIC8qKiBGaXJlcyB3aGVuIGEgY2hlY2tib3ggaXMgY2hlY2tlZCBvciB1bmNoZWNrZWQuICovXG4gIG9uQ2xpY2s/OiAodmlldzogTXVsdGlwbGVTZWxlY3RWaWV3KSA9PiB2b2lkO1xuXG4gIC8qKiBGaXJlcyB3aGVuIGEgY2hlY2tib3ggZmlsdGVyIGlzIGNoYW5nZWQuICovXG4gIG9uRmlsdGVyPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNdWx0aXBsZVNlbGVjdFZpZXcge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogYW55O1xuICBjaGVja2VkOiBib29sZWFuO1xuICBpbnN0YW5jZTogYW55O1xufVxuIl19