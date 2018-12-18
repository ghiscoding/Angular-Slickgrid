/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Column() { }
if (false) {
    /**
     * async background post-rendering formatter
     * @type {?|undefined}
     */
    Column.prototype.asyncPostRender;
    /**
     * Row Move Behavior, used by the Row Move Manager Plugin
     * @type {?|undefined}
     */
    Column.prototype.behavior;
    /**
     * Block event triggering of an insert?
     * @type {?|undefined}
     */
    Column.prototype.cannotTriggerInsert;
    /**
     * Column group name for grouping of column headers spanning accross multiple columns
     * @type {?|undefined}
     */
    Column.prototype.columnGroup;
    /**
     * CSS class to add to the column cell
     * @type {?|undefined}
     */
    Column.prototype.cssClass;
    /**
     * Column span in pixels or `*`, only input the number value
     * @type {?|undefined}
     */
    Column.prototype.colspan;
    /**
     * Do we want default sort to be ascending? True by default
     * @type {?|undefined}
     */
    Column.prototype.defaultSortAsc;
    /**
     * Any inline editor function that implements Editor for the cell value or ColumnEditor
     * @type {?|undefined}
     */
    Column.prototype.editor;
    /**
     * Default to false, which leads to exclude the column from the export?
     * @type {?|undefined}
     */
    Column.prototype.excludeFromExport;
    /**
     * Defaults to false, which leads to exclude the field from the query (mostly a backend service query)
     * @type {?|undefined}
     */
    Column.prototype.excludeFromQuery;
    /**
     * Defaults to false, which leads to exclude the column from getting a header menu. For example, the checkbox row selection should not have a header menu.
     * @type {?|undefined}
     */
    Column.prototype.excludeFromHeaderMenu;
    /**
     * Export with a Custom Formatter, useful when we want to use a different Formatter for the export.
     * For example, we might have a boolean field with "Formatters.checkmark" but we would like see a translated value for (True/False).
     * @type {?|undefined}
     */
    Column.prototype.exportCustomFormatter;
    /**
     * Defaults to false, which leads to Formatters being evaluated on export.
     * Most often used with dates that are stored as UTC but displayed as Date ISO (or any other format) with a Formatter.
     * @type {?|undefined}
     */
    Column.prototype.exportWithFormatter;
    /**
     * Do we want to force the cell value to be a string?
     * When set to True, it will wrap the cell value in double quotes and add an equal sign (=) at the beginning of the cell to force Excel to evaluate it as a string and not change it's format.
     * For example, without this flag a cell value with "1E06" would be interpreted as a number becoming (1.0E06) by Excel.
     * When set this flag to True, the cell value will be wrapped with an equal sign and double quotes, which forces Excel to evaluate it as a string. The output will be:: ="1E06"
     * @type {?|undefined}
     */
    Column.prototype.exportCsvForceToKeepAsString;
    /**
     * Field property name to use from the dataset that is used to display the column data.
     * @type {?}
     */
    Column.prototype.field;
    /**
     * Only used by Backend Services since the query is built using the column definitions, this is a way to pass extra properties to the backend query.
     * It can help in getting more fields for a Formatter without adding a new column definition every time that we don't want to display.
     * For example: { id: 'Users', field: 'user.firstName', fields: ['user.lastName', 'user.middleName'], formatter: fullNameFormatter }
     * @type {?|undefined}
     */
    Column.prototype.fields;
    /**
     * Filter class to use when filtering this column
     * @type {?|undefined}
     */
    Column.prototype.filter;
    /**
     * is the column filterable? Goes with grid option "enableFiltering: true".
     * @type {?|undefined}
     */
    Column.prototype.filterable;
    /**
     * Extra option to filter more easily. For example, a "UTC Date" field can use a search format of US Format like ">02/28/2017"
     * @type {?|undefined}
     */
    Column.prototype.filterSearchType;
    /**
     * are we allowed to focus on the column?
     * @type {?|undefined}
     */
    Column.prototype.focusable;
    /**
     * Formatter function that can be used to change and format certain column(s) in the grid
     * @type {?|undefined}
     */
    Column.prototype.formatter;
    /**
     * Grouping option used by a Draggable Grouping Column
     * @type {?|undefined}
     */
    Column.prototype.grouping;
    /**
     * Group Totals Formatter function that can be used to add grouping totals in the grid
     * @type {?|undefined}
     */
    Column.prototype.groupTotalsFormatter;
    /**
     * Options that can be provide to the Header Menu Plugin
     * @type {?|undefined}
     */
    Column.prototype.header;
    /**
     * CSS class that can be added to the column header
     * @type {?|undefined}
     */
    Column.prototype.headerCssClass;
    /**
     * Column header translation key that can be used by the Translate Service (i18n)
     * @type {?|undefined}
     */
    Column.prototype.headerKey;
    /**
     * ID of the column, each row have to be unique or SlickGrid will throw an error.
     * @type {?}
     */
    Column.prototype.id;
    /**
     * \@internal used internally by Angular-Slickgrid, to copy over the Column Editor Options
     * @type {?|undefined}
     */
    Column.prototype.internalColumnEditor;
    /**
     * Maximum Width of the column in pixels (number only).
     * @type {?|undefined}
     */
    Column.prototype.maxWidth;
    /**
     * Minimum Width of the column in pixels (number only).
     * @type {?|undefined}
     */
    Column.prototype.minWidth;
    /**
     * Field Name to be displayed in the Grid (UI)
     * @type {?|undefined}
     */
    Column.prototype.name;
    /**
     * an event that can be used for triggering an action after a cell change
     * @type {?|undefined}
     */
    Column.prototype.onCellChange;
    /**
     * an event that can be used for triggering an action after a cell click
     * @type {?|undefined}
     */
    Column.prototype.onCellClick;
    /**
     * column output type
     * @type {?|undefined}
     */
    Column.prototype.outputType;
    /**
     * if you want to pass custom paramaters to your Formatter/Editor or anything else
     * @type {?|undefined}
     */
    Column.prototype.params;
    /**
     * The previous column width in pixels (number only)
     * @type {?|undefined}
     */
    Column.prototype.previousWidth;
    /**
     * Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering/Sorting.
     * @type {?|undefined}
     */
    Column.prototype.queryField;
    /**
     * Similar to "queryField" but only used with Filtering. Useful when you want to display a certain field to the UI, but you want to use another field to query for Filtering.
     * @type {?|undefined}
     */
    Column.prototype.queryFieldFilter;
    /**
     * Similar to "queryField" but only used with Sorting. Useful when you want to display a certain field to the UI, but you want to use another field to query for Sorting.
     * @type {?|undefined}
     */
    Column.prototype.queryFieldSorter;
    /**
     * Is the column resizable, can we make it wider/thinner? A resize cursor will show on the right side of the column when enabled.
     * @type {?|undefined}
     */
    Column.prototype.resizable;
    /**
     * Do we want to re-render the grid on a grid resize
     * @type {?|undefined}
     */
    Column.prototype.rerenderOnResize;
    /**
     * Defaults to false, which leads to Sanitizing all data (striping out any HTML tags) when being evaluated on export.
     * @type {?|undefined}
     */
    Column.prototype.sanitizeDataExport;
    /**
     * Is the column selectable? Goes with grid option "enableCellNavigation: true".
     * @type {?|undefined}
     */
    Column.prototype.selectable;
    /**
     * Is the column sortable? Goes with grid option "enableSorting: true".
     * @type {?|undefined}
     */
    Column.prototype.sortable;
    /**
     * Custom Sorter function that can be provided to the column
     * @type {?|undefined}
     */
    Column.prototype.sorter;
    /**
     * Custom Tooltip that can ben shown to the column
     * @type {?|undefined}
     */
    Column.prototype.toolTip;
    /**
     * What is the Field Type, this can be used in the Formatters/Editors/...
     * @type {?|undefined}
     */
    Column.prototype.type;
    /**
     * Editor Validator
     * @type {?|undefined}
     */
    Column.prototype.validator;
    /**
     * Width of the column in pixels (number only).
     * @type {?|undefined}
     */
    Column.prototype.width;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbW9kZWxzL2NvbHVtbi5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVlBLDRCQXlLQzs7Ozs7O0lBdktDLGlDQUErRjs7Ozs7SUFHL0YsMEJBQWtCOzs7OztJQUdsQixxQ0FBOEI7Ozs7O0lBRzlCLDZCQUFxQjs7Ozs7SUFHckIsMEJBQWtCOzs7OztJQUdsQix5QkFBdUI7Ozs7O0lBR3ZCLGdDQUF5Qjs7Ozs7SUFHekIsd0JBQTRCOzs7OztJQUc1QixtQ0FBNEI7Ozs7O0lBRzVCLGtDQUEyQjs7Ozs7SUFHM0IsdUNBQWdDOzs7Ozs7SUFNaEMsdUNBQWtDOzs7Ozs7SUFNbEMscUNBQThCOzs7Ozs7OztJQU85Qiw4Q0FBdUM7Ozs7O0lBR3ZDLHVCQUFjOzs7Ozs7O0lBT2Qsd0JBQWtCOzs7OztJQUdsQix3QkFBc0I7Ozs7O0lBR3RCLDRCQUFxQjs7Ozs7SUFHckIsa0NBQTZCOzs7OztJQUc3QiwyQkFBb0I7Ozs7O0lBR3BCLDJCQUFzQjs7Ozs7SUFHdEIsMEJBQW9COzs7OztJQUdwQixzQ0FBNEM7Ozs7O0lBRzVDLHdCQU1FOzs7OztJQUdGLGdDQUF3Qjs7Ozs7SUFHeEIsMkJBQW1COzs7OztJQUduQixvQkFBb0I7Ozs7O0lBS3BCLHNDQUFvQzs7Ozs7SUFHcEMsMEJBQWtCOzs7OztJQUdsQiwwQkFBa0I7Ozs7O0lBR2xCLHNCQUFjOzs7OztJQUdkLDhCQUFxRDs7Ozs7SUFHckQsNkJBQW9EOzs7OztJQUdwRCw0QkFBdUI7Ozs7O0lBR3ZCLHdCQUFxQjs7Ozs7SUFHckIsK0JBQXVCOzs7OztJQUd2Qiw0QkFBb0I7Ozs7O0lBR3BCLGtDQUEwQjs7Ozs7SUFHMUIsa0NBQTBCOzs7OztJQUcxQiwyQkFBb0I7Ozs7O0lBR3BCLGtDQUEyQjs7Ozs7SUFHM0Isb0NBQTZCOzs7OztJQUc3Qiw0QkFBcUI7Ozs7O0lBR3JCLDBCQUFtQjs7Ozs7SUFHbkIsd0JBQWdCOzs7OztJQUdoQix5QkFBaUI7Ozs7O0lBR2pCLHNCQUFpQjs7Ozs7SUFHakIsMkJBQTRCOzs7OztJQUc1Qix1QkFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbkVkaXRvciB9IGZyb20gJy4vY29sdW1uRWRpdG9yLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IENvbHVtbkZpbHRlciB9IGZyb20gJy4vY29sdW1uRmlsdGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEVkaXRvclZhbGlkYXRvciB9IGZyb20gJy4vZWRpdG9yVmFsaWRhdG9yLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vZmllbGRUeXBlLmVudW0nO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBHcm91cGluZyB9IGZyb20gJy4vZ3JvdXBpbmcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgR3JvdXBUb3RhbHNGb3JtYXR0ZXIgfSBmcm9tICcuL2dyb3VwVG90YWxzRm9ybWF0dGVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEhlYWRlckJ1dHRvbkl0ZW0gfSBmcm9tICcuL2hlYWRlckJ1dHRvbkl0ZW0uaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgSGVhZGVyTWVudUl0ZW0gfSBmcm9tICcuL2hlYWRlck1lbnVJdGVtLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9uRXZlbnRBcmdzIH0gZnJvbSAnLi9vbkV2ZW50QXJncy5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBTb3J0ZXIgfSBmcm9tICcuL3NvcnRlci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb2x1bW4ge1xyXG4gIC8qKiBhc3luYyBiYWNrZ3JvdW5kIHBvc3QtcmVuZGVyaW5nIGZvcm1hdHRlciAqL1xyXG4gIGFzeW5jUG9zdFJlbmRlcj86IChkb21DZWxsTm9kZTogYW55LCByb3c6IG51bWJlciwgZGF0YUNvbnRleHQ6IGFueSwgY29sdW1uRGVmOiBDb2x1bW4pID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBSb3cgTW92ZSBCZWhhdmlvciwgdXNlZCBieSB0aGUgUm93IE1vdmUgTWFuYWdlciBQbHVnaW4gKi9cclxuICBiZWhhdmlvcj86IHN0cmluZztcclxuXHJcbiAgLyoqIEJsb2NrIGV2ZW50IHRyaWdnZXJpbmcgb2YgYW4gaW5zZXJ0PyAqL1xyXG4gIGNhbm5vdFRyaWdnZXJJbnNlcnQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogQ29sdW1uIGdyb3VwIG5hbWUgZm9yIGdyb3VwaW5nIG9mIGNvbHVtbiBoZWFkZXJzIHNwYW5uaW5nIGFjY3Jvc3MgbXVsdGlwbGUgY29sdW1ucyAqL1xyXG4gIGNvbHVtbkdyb3VwPzogc3RyaW5nO1xyXG5cclxuICAvKiogQ1NTIGNsYXNzIHRvIGFkZCB0byB0aGUgY29sdW1uIGNlbGwgKi9cclxuICBjc3NDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIENvbHVtbiBzcGFuIGluIHBpeGVscyBvciBgKmAsIG9ubHkgaW5wdXQgdGhlIG51bWJlciB2YWx1ZSAqL1xyXG4gIGNvbHNwYW4/OiBudW1iZXIgfCAnKic7XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IGRlZmF1bHQgc29ydCB0byBiZSBhc2NlbmRpbmc/IFRydWUgYnkgZGVmYXVsdCAqL1xyXG4gIGRlZmF1bHRTb3J0QXNjPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEFueSBpbmxpbmUgZWRpdG9yIGZ1bmN0aW9uIHRoYXQgaW1wbGVtZW50cyBFZGl0b3IgZm9yIHRoZSBjZWxsIHZhbHVlIG9yIENvbHVtbkVkaXRvciAqL1xyXG4gIGVkaXRvcj86IGFueSB8IENvbHVtbkVkaXRvcjtcclxuXHJcbiAgLyoqIERlZmF1bHQgdG8gZmFsc2UsIHdoaWNoIGxlYWRzIHRvIGV4Y2x1ZGUgdGhlIGNvbHVtbiBmcm9tIHRoZSBleHBvcnQ/ICovXHJcbiAgZXhjbHVkZUZyb21FeHBvcnQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIGxlYWRzIHRvIGV4Y2x1ZGUgdGhlIGZpZWxkIGZyb20gdGhlIHF1ZXJ5IChtb3N0bHkgYSBiYWNrZW5kIHNlcnZpY2UgcXVlcnkpICovXHJcbiAgZXhjbHVkZUZyb21RdWVyeT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gZXhjbHVkZSB0aGUgY29sdW1uIGZyb20gZ2V0dGluZyBhIGhlYWRlciBtZW51LiBGb3IgZXhhbXBsZSwgdGhlIGNoZWNrYm94IHJvdyBzZWxlY3Rpb24gc2hvdWxkIG5vdCBoYXZlIGEgaGVhZGVyIG1lbnUuICovXHJcbiAgZXhjbHVkZUZyb21IZWFkZXJNZW51PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3J0IHdpdGggYSBDdXN0b20gRm9ybWF0dGVyLCB1c2VmdWwgd2hlbiB3ZSB3YW50IHRvIHVzZSBhIGRpZmZlcmVudCBGb3JtYXR0ZXIgZm9yIHRoZSBleHBvcnQuXHJcbiAgICogRm9yIGV4YW1wbGUsIHdlIG1pZ2h0IGhhdmUgYSBib29sZWFuIGZpZWxkIHdpdGggXCJGb3JtYXR0ZXJzLmNoZWNrbWFya1wiIGJ1dCB3ZSB3b3VsZCBsaWtlIHNlZSBhIHRyYW5zbGF0ZWQgdmFsdWUgZm9yIChUcnVlL0ZhbHNlKS5cclxuICAgKi9cclxuICBleHBvcnRDdXN0b21Gb3JtYXR0ZXI/OiBGb3JtYXR0ZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBGb3JtYXR0ZXJzIGJlaW5nIGV2YWx1YXRlZCBvbiBleHBvcnQuXHJcbiAgICogTW9zdCBvZnRlbiB1c2VkIHdpdGggZGF0ZXMgdGhhdCBhcmUgc3RvcmVkIGFzIFVUQyBidXQgZGlzcGxheWVkIGFzIERhdGUgSVNPIChvciBhbnkgb3RoZXIgZm9ybWF0KSB3aXRoIGEgRm9ybWF0dGVyLlxyXG4gICAqL1xyXG4gIGV4cG9ydFdpdGhGb3JtYXR0ZXI/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBEbyB3ZSB3YW50IHRvIGZvcmNlIHRoZSBjZWxsIHZhbHVlIHRvIGJlIGEgc3RyaW5nP1xyXG4gICAqIFdoZW4gc2V0IHRvIFRydWUsIGl0IHdpbGwgd3JhcCB0aGUgY2VsbCB2YWx1ZSBpbiBkb3VibGUgcXVvdGVzIGFuZCBhZGQgYW4gZXF1YWwgc2lnbiAoPSkgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgY2VsbCB0byBmb3JjZSBFeGNlbCB0byBldmFsdWF0ZSBpdCBhcyBhIHN0cmluZyBhbmQgbm90IGNoYW5nZSBpdCdzIGZvcm1hdC5cclxuICAgKiBGb3IgZXhhbXBsZSwgd2l0aG91dCB0aGlzIGZsYWcgYSBjZWxsIHZhbHVlIHdpdGggXCIxRTA2XCIgd291bGQgYmUgaW50ZXJwcmV0ZWQgYXMgYSBudW1iZXIgYmVjb21pbmcgKDEuMEUwNikgYnkgRXhjZWwuXHJcbiAgICogV2hlbiBzZXQgdGhpcyBmbGFnIHRvIFRydWUsIHRoZSBjZWxsIHZhbHVlIHdpbGwgYmUgd3JhcHBlZCB3aXRoIGFuIGVxdWFsIHNpZ24gYW5kIGRvdWJsZSBxdW90ZXMsIHdoaWNoIGZvcmNlcyBFeGNlbCB0byBldmFsdWF0ZSBpdCBhcyBhIHN0cmluZy4gVGhlIG91dHB1dCB3aWxsIGJlOjogPVwiMUUwNlwiICovXHJcbiAgZXhwb3J0Q3N2Rm9yY2VUb0tlZXBBc1N0cmluZz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBGaWVsZCBwcm9wZXJ0eSBuYW1lIHRvIHVzZSBmcm9tIHRoZSBkYXRhc2V0IHRoYXQgaXMgdXNlZCB0byBkaXNwbGF5IHRoZSBjb2x1bW4gZGF0YS4gICovXHJcbiAgZmllbGQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogT25seSB1c2VkIGJ5IEJhY2tlbmQgU2VydmljZXMgc2luY2UgdGhlIHF1ZXJ5IGlzIGJ1aWx0IHVzaW5nIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMsIHRoaXMgaXMgYSB3YXkgdG8gcGFzcyBleHRyYSBwcm9wZXJ0aWVzIHRvIHRoZSBiYWNrZW5kIHF1ZXJ5LlxyXG4gICAqIEl0IGNhbiBoZWxwIGluIGdldHRpbmcgbW9yZSBmaWVsZHMgZm9yIGEgRm9ybWF0dGVyIHdpdGhvdXQgYWRkaW5nIGEgbmV3IGNvbHVtbiBkZWZpbml0aW9uIGV2ZXJ5IHRpbWUgdGhhdCB3ZSBkb24ndCB3YW50IHRvIGRpc3BsYXkuXHJcbiAgICogRm9yIGV4YW1wbGU6IHsgaWQ6ICdVc2VycycsIGZpZWxkOiAndXNlci5maXJzdE5hbWUnLCBmaWVsZHM6IFsndXNlci5sYXN0TmFtZScsICd1c2VyLm1pZGRsZU5hbWUnXSwgZm9ybWF0dGVyOiBmdWxsTmFtZUZvcm1hdHRlciB9XHJcbiAgICovXHJcbiAgZmllbGRzPzogc3RyaW5nW107XHJcblxyXG4gIC8qKiBGaWx0ZXIgY2xhc3MgdG8gdXNlIHdoZW4gZmlsdGVyaW5nIHRoaXMgY29sdW1uICovXHJcbiAgZmlsdGVyPzogQ29sdW1uRmlsdGVyO1xyXG5cclxuICAvKiogaXMgdGhlIGNvbHVtbiBmaWx0ZXJhYmxlPyBHb2VzIHdpdGggZ3JpZCBvcHRpb24gXCJlbmFibGVGaWx0ZXJpbmc6IHRydWVcIi4gKi9cclxuICBmaWx0ZXJhYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEV4dHJhIG9wdGlvbiB0byBmaWx0ZXIgbW9yZSBlYXNpbHkuIEZvciBleGFtcGxlLCBhIFwiVVRDIERhdGVcIiBmaWVsZCBjYW4gdXNlIGEgc2VhcmNoIGZvcm1hdCBvZiBVUyBGb3JtYXQgbGlrZSBcIj4wMi8yOC8yMDE3XCIgKi9cclxuICBmaWx0ZXJTZWFyY2hUeXBlPzogRmllbGRUeXBlO1xyXG5cclxuICAvKiogYXJlIHdlIGFsbG93ZWQgdG8gZm9jdXMgb24gdGhlIGNvbHVtbj8gKi9cclxuICBmb2N1c2FibGU/OiBib29sZWFuO1xyXG5cclxuICAvKiogRm9ybWF0dGVyIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hhbmdlIGFuZCBmb3JtYXQgY2VydGFpbiBjb2x1bW4ocykgaW4gdGhlIGdyaWQgKi9cclxuICBmb3JtYXR0ZXI/OiBGb3JtYXR0ZXI7XHJcblxyXG4gIC8qKiBHcm91cGluZyBvcHRpb24gdXNlZCBieSBhIERyYWdnYWJsZSBHcm91cGluZyBDb2x1bW4gKi9cclxuICBncm91cGluZz86IEdyb3VwaW5nO1xyXG5cclxuICAvKiogR3JvdXAgVG90YWxzIEZvcm1hdHRlciBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBncm91cGluZyB0b3RhbHMgaW4gdGhlIGdyaWQgKi9cclxuICBncm91cFRvdGFsc0Zvcm1hdHRlcj86IEdyb3VwVG90YWxzRm9ybWF0dGVyO1xyXG5cclxuICAvKiogT3B0aW9ucyB0aGF0IGNhbiBiZSBwcm92aWRlIHRvIHRoZSBIZWFkZXIgTWVudSBQbHVnaW4gKi9cclxuICBoZWFkZXI/OiB7XHJcbiAgICAvKiogbGlzdCBvZiBCdXR0b25zIHRvIHNob3cgaW4gdGhlIGhlYWRlciAqL1xyXG4gICAgYnV0dG9ucz86IEhlYWRlckJ1dHRvbkl0ZW1bXTtcclxuICAgIG1lbnU/OiB7XHJcbiAgICAgIGl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvKiogQ1NTIGNsYXNzIHRoYXQgY2FuIGJlIGFkZGVkIHRvIHRoZSBjb2x1bW4gaGVhZGVyICovXHJcbiAgaGVhZGVyQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBDb2x1bW4gaGVhZGVyIHRyYW5zbGF0aW9uIGtleSB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBUcmFuc2xhdGUgU2VydmljZSAoaTE4bikgKi9cclxuICBoZWFkZXJLZXk/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBJRCBvZiB0aGUgY29sdW1uLCBlYWNoIHJvdyBoYXZlIHRvIGJlIHVuaXF1ZSBvciBTbGlja0dyaWQgd2lsbCB0aHJvdyBhbiBlcnJvci4gKi9cclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBAaW50ZXJuYWwgdXNlZCBpbnRlcm5hbGx5IGJ5IEFuZ3VsYXItU2xpY2tncmlkLCB0byBjb3B5IG92ZXIgdGhlIENvbHVtbiBFZGl0b3IgT3B0aW9uc1xyXG4gICAqL1xyXG4gIGludGVybmFsQ29sdW1uRWRpdG9yPzogQ29sdW1uRWRpdG9yO1xyXG5cclxuICAvKiogTWF4aW11bSBXaWR0aCBvZiB0aGUgY29sdW1uIGluIHBpeGVscyAobnVtYmVyIG9ubHkpLiAqL1xyXG4gIG1heFdpZHRoPzogbnVtYmVyO1xyXG5cclxuICAvKiogTWluaW11bSBXaWR0aCBvZiB0aGUgY29sdW1uIGluIHBpeGVscyAobnVtYmVyIG9ubHkpLiAqL1xyXG4gIG1pbldpZHRoPzogbnVtYmVyO1xyXG5cclxuICAvKiogRmllbGQgTmFtZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIEdyaWQgKFVJKSAqL1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBhbiBldmVudCB0aGF0IGNhbiBiZSB1c2VkIGZvciB0cmlnZ2VyaW5nIGFuIGFjdGlvbiBhZnRlciBhIGNlbGwgY2hhbmdlICovXHJcbiAgb25DZWxsQ2hhbmdlPzogKGU6IEV2ZW50LCBhcmdzOiBPbkV2ZW50QXJncykgPT4gdm9pZDtcclxuXHJcbiAgLyoqIGFuIGV2ZW50IHRoYXQgY2FuIGJlIHVzZWQgZm9yIHRyaWdnZXJpbmcgYW4gYWN0aW9uIGFmdGVyIGEgY2VsbCBjbGljayAqL1xyXG4gIG9uQ2VsbENsaWNrPzogKGU6IEV2ZW50LCBhcmdzOiBPbkV2ZW50QXJncykgPT4gdm9pZDtcclxuXHJcbiAgLyoqIGNvbHVtbiBvdXRwdXQgdHlwZSAqL1xyXG4gIG91dHB1dFR5cGU/OiBGaWVsZFR5cGU7XHJcblxyXG4gIC8qKiBpZiB5b3Ugd2FudCB0byBwYXNzIGN1c3RvbSBwYXJhbWF0ZXJzIHRvIHlvdXIgRm9ybWF0dGVyL0VkaXRvciBvciBhbnl0aGluZyBlbHNlICovXHJcbiAgcGFyYW1zPzogYW55IHwgYW55W107XHJcblxyXG4gIC8qKiBUaGUgcHJldmlvdXMgY29sdW1uIHdpZHRoIGluIHBpeGVscyAobnVtYmVyIG9ubHkpICovXHJcbiAgcHJldmlvdXNXaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqIFVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGRpc3BsYXkgYSBjZXJ0YWluIGZpZWxkIHRvIHRoZSBVSSwgYnV0IHlvdSB3YW50IHRvIHVzZSBhbm90aGVyIGZpZWxkIHRvIHF1ZXJ5IGZvciBGaWx0ZXJpbmcvU29ydGluZy4gKi9cclxuICBxdWVyeUZpZWxkPzogc3RyaW5nO1xyXG5cclxuICAvKiogU2ltaWxhciB0byBcInF1ZXJ5RmllbGRcIiBidXQgb25seSB1c2VkIHdpdGggRmlsdGVyaW5nLiBVc2VmdWwgd2hlbiB5b3Ugd2FudCB0byBkaXNwbGF5IGEgY2VydGFpbiBmaWVsZCB0byB0aGUgVUksIGJ1dCB5b3Ugd2FudCB0byB1c2UgYW5vdGhlciBmaWVsZCB0byBxdWVyeSBmb3IgRmlsdGVyaW5nLiAqL1xyXG4gIHF1ZXJ5RmllbGRGaWx0ZXI/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTaW1pbGFyIHRvIFwicXVlcnlGaWVsZFwiIGJ1dCBvbmx5IHVzZWQgd2l0aCBTb3J0aW5nLiBVc2VmdWwgd2hlbiB5b3Ugd2FudCB0byBkaXNwbGF5IGEgY2VydGFpbiBmaWVsZCB0byB0aGUgVUksIGJ1dCB5b3Ugd2FudCB0byB1c2UgYW5vdGhlciBmaWVsZCB0byBxdWVyeSBmb3IgU29ydGluZy4gKi9cclxuICBxdWVyeUZpZWxkU29ydGVyPzogc3RyaW5nO1xyXG5cclxuICAvKiogSXMgdGhlIGNvbHVtbiByZXNpemFibGUsIGNhbiB3ZSBtYWtlIGl0IHdpZGVyL3RoaW5uZXI/IEEgcmVzaXplIGN1cnNvciB3aWxsIHNob3cgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGNvbHVtbiB3aGVuIGVuYWJsZWQuICovXHJcbiAgcmVzaXphYmxlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gcmUtcmVuZGVyIHRoZSBncmlkIG9uIGEgZ3JpZCByZXNpemUgKi9cclxuICByZXJlbmRlck9uUmVzaXplPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBTYW5pdGl6aW5nIGFsbCBkYXRhIChzdHJpcGluZyBvdXQgYW55IEhUTUwgdGFncykgd2hlbiBiZWluZyBldmFsdWF0ZWQgb24gZXhwb3J0LiAqL1xyXG4gIHNhbml0aXplRGF0YUV4cG9ydD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBJcyB0aGUgY29sdW1uIHNlbGVjdGFibGU/IEdvZXMgd2l0aCBncmlkIG9wdGlvbiBcImVuYWJsZUNlbGxOYXZpZ2F0aW9uOiB0cnVlXCIuICovXHJcbiAgc2VsZWN0YWJsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBJcyB0aGUgY29sdW1uIHNvcnRhYmxlPyBHb2VzIHdpdGggZ3JpZCBvcHRpb24gXCJlbmFibGVTb3J0aW5nOiB0cnVlXCIuICovXHJcbiAgc29ydGFibGU/OiBib29sZWFuO1xyXG5cclxuICAvKiogQ3VzdG9tIFNvcnRlciBmdW5jdGlvbiB0aGF0IGNhbiBiZSBwcm92aWRlZCB0byB0aGUgY29sdW1uICovXHJcbiAgc29ydGVyPzogU29ydGVyO1xyXG5cclxuICAvKiogQ3VzdG9tIFRvb2x0aXAgdGhhdCBjYW4gYmVuIHNob3duIHRvIHRoZSBjb2x1bW4gKi9cclxuICB0b29sVGlwPzogc3RyaW5nO1xyXG5cclxuICAvKiogV2hhdCBpcyB0aGUgRmllbGQgVHlwZSwgdGhpcyBjYW4gYmUgdXNlZCBpbiB0aGUgRm9ybWF0dGVycy9FZGl0b3JzLy4uLiAqL1xyXG4gIHR5cGU/OiBGaWVsZFR5cGU7XHJcblxyXG4gIC8qKiBFZGl0b3IgVmFsaWRhdG9yICovXHJcbiAgdmFsaWRhdG9yPzogRWRpdG9yVmFsaWRhdG9yO1xyXG5cclxuICAvKiogV2lkdGggb2YgdGhlIGNvbHVtbiBpbiBwaXhlbHMgKG51bWJlciBvbmx5KS4gKi9cclxuICB3aWR0aD86IG51bWJlcjtcclxufVxyXG4iXX0=