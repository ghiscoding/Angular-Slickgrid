/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function GridOption() { }
if (false) {
    /**
     * CSS class name used on newly added row
     * @type {?|undefined}
     */
    GridOption.prototype.addNewRowCssClass;
    /**
     * Defaults to true, which leads to always show a vertical scrolling. This is rather important to use when using the Grid Menu (hamburger)
     * @type {?|undefined}
     */
    GridOption.prototype.alwaysShowVerticalScroll;
    /**
     * Defaults to 100, which is the asynchronous editor loading delay
     * @type {?|undefined}
     */
    GridOption.prototype.asyncEditorLoadDelay;
    /**
     * Defaults to false, which leads to load editor asynchronously (delayed)
     * @type {?|undefined}
     */
    GridOption.prototype.asyncEditorLoading;
    /**
     * Defaults to 50, which is the delay before the asynchronous post renderer start execution
     * @type {?|undefined}
     */
    GridOption.prototype.asyncPostRenderDelay;
    /**
     * Defaults to 40, which is the delay before the asynchronous post renderer start cleanup execution
     * @type {?|undefined}
     */
    GridOption.prototype.asyncPostRenderCleanupDelay;
    /**
     * Defaults to false, when enabled will try to commit the current edit without focusing on the next row. If a custom editor is implemented and the grid cannot auto commit, you must use this option to implement it yourself
     * @type {?|undefined}
     */
    GridOption.prototype.autoCommitEdit;
    /**
     * Defaults to false, when enabled will automatically open the inlined editor as soon as there is a focus on the cell (can be combined with "enableCellNavigation: true").
     * @type {?|undefined}
     */
    GridOption.prototype.autoEdit;
    /**
     * Defaults to true, which leads to automatically adjust the size of each column with the available space. Similar to "Force Fit Column" but only happens on first page/component load.
     * @type {?|undefined}
     */
    GridOption.prototype.autoFitColumnsOnFirstLoad;
    /**
     * Auto-resize options (bottom padding, minHeight, ...)
     * @type {?|undefined}
     */
    GridOption.prototype.autoResize;
    /**
     * Auto-tooltip options (enableForCells, enableForHeaderCells, maxToolTipLength)
     * @type {?|undefined}
     */
    GridOption.prototype.autoTooltipOptions;
    /**
     * Backend Service API definition (GraphQL/OData Services)
     * @type {?|undefined}
     */
    GridOption.prototype.backendServiceApi;
    /**
     * CSS class name used to simulate cell flashing
     * @type {?|undefined}
     */
    GridOption.prototype.cellFlashingCssClass;
    /**
     * CSS class name used when highlighting a cell value. Useful to change background color of the activated cell
     * @type {?|undefined}
     */
    GridOption.prototype.cellHighlightCssClass;
    /**
     * Checkbox Select Plugin options (columnId, cssClass, toolTip, width)
     * @type {?|undefined}
     */
    GridOption.prototype.checkboxSelector;
    /**
     * Column Picker Plugin options (columnTitle, forceFitTitle, syncResizeTitle)
     * @type {?|undefined}
     */
    GridOption.prototype.columnPicker;
    /**
     * Defaults to false, which leads to create the footer row of the grid
     * @type {?|undefined}
     */
    GridOption.prototype.createFooterRow;
    /**
     * A callback function that will be used to define row spanning accross multiple columns
     * @type {?|undefined}
     */
    GridOption.prototype.colspanCallback;
    /**
     * Default to false, which leads to create an extra pre-header panel (on top of column header) for column grouping purposes
     * @type {?|undefined}
     */
    GridOption.prototype.createPreHeaderPanel;
    /**
     * Data item column value extractor (getter) that can be used by the Excel like copy buffer plugin
     * @type {?|undefined}
     */
    GridOption.prototype.dataItemColumnValueExtractor;
    /**
     * Data item column value setter that can be used by the Excel like copy buffer plugin
     * @type {?|undefined}
     */
    GridOption.prototype.dataItemColumnValueSetter;
    /**
     * Unique property name on the dataset used by Slick.Data.DataView
     * @type {?|undefined}
     */
    GridOption.prototype.datasetIdPropertyName;
    /**
     * Default column width, is set to 80 when null
     * @type {?|undefined}
     */
    GridOption.prototype.defaultColumnWidth;
    /**
     * Default placeholder to use in Filters that support placeholder (input, flatpickr)
     * @type {?|undefined}
     */
    GridOption.prototype.defaultFilterPlaceholder;
    /**
     * The default filter model to use when none is specified
     * @type {?|undefined}
     */
    GridOption.prototype.defaultFilter;
    /**
     * Draggable Grouping Plugin options & events
     * @type {?|undefined}
     */
    GridOption.prototype.draggableGrouping;
    /**
     * Defaults to false, when enabled will give the possibility to edit cell values with inline editors.
     * @type {?|undefined}
     */
    GridOption.prototype.editable;
    /**
     * option to intercept edit commands and implement undo support.
     * @type {?|undefined}
     */
    GridOption.prototype.editCommandHandler;
    /**
     * Editor classes factory
     * @type {?|undefined}
     */
    GridOption.prototype.editorFactory;
    /**
     * a global singleton editor lock.
     * @type {?|undefined}
     */
    GridOption.prototype.editorLock;
    /**
     * Do we want to emulate paging when we are scrolling?
     * @type {?|undefined}
     */
    GridOption.prototype.emulatePagingWhenScrolling;
    /**
     * Defaults to false, which leads to give user possibility to add row to the grid
     * @type {?|undefined}
     */
    GridOption.prototype.enableAddRow;
    /**
     * Do we want to enable asynchronous (delayed) post rendering
     * @type {?|undefined}
     */
    GridOption.prototype.enableAsyncPostRender;
    /**
     * Defaults to false, which leads to cleanup after the post render is finished executing
     * @type {?|undefined}
     */
    GridOption.prototype.enableAsyncPostRenderCleanup;
    /**
     * Defaults to true, which will automatically resize the grid whenever the browser size changes
     * @type {?|undefined}
     */
    GridOption.prototype.enableAutoResize;
    /**
     * Defaults to true, which will automatically resize the column headers whenever the grid size changes
     * @type {?|undefined}
     */
    GridOption.prototype.enableAutoSizeColumns;
    /**
     * Defaults to false, which leads to showing tooltip over cell & header values that are not shown completely (... ellipsis)
     * @type {?|undefined}
     */
    GridOption.prototype.enableAutoTooltip;
    /**
     * Defaults to false, which will let user click on cell and navigate with arrow keys.
     * @type {?|undefined}
     */
    GridOption.prototype.enableCellNavigation;
    /**
     * Defaults to false, when enabled it will add a column for checkbox selection at the 1st column position. A selection will trigger the "onSelectedRowsChanged" event.
     * @type {?|undefined}
     */
    GridOption.prototype.enableCheckboxSelector;
    /**
     * Defaults to true, when enabled will give the possibility to do a right+click on any header title which will open the list of column. User can show/hide a column by using the checkbox from that picker list.
     * @type {?|undefined}
     */
    GridOption.prototype.enableColumnPicker;
    /**
     * Defaults to true, which permits the user to move an entire column from a position to another.
     * @type {?|undefined}
     */
    GridOption.prototype.enableColumnReorder;
    /**
     * Defaults to false, do we want to enable the Draggable Grouping Plugin?
     * @type {?|undefined}
     */
    GridOption.prototype.enableDraggableGrouping;
    /**
     * Defaults to true, which leads to use an Excel like copy buffer that gets copied in clipboard and can be pasted back in Excel or any other app
     * @type {?|undefined}
     */
    GridOption.prototype.enableExcelCopyBuffer;
    /**
     * Do we want to enable the Export to File? (if Yes, it will show up in the Grid Menu)
     * @type {?|undefined}
     */
    GridOption.prototype.enableExport;
    /**
     * Do we want to enable Filters?
     * @type {?|undefined}
     */
    GridOption.prototype.enableFiltering;
    /**
     * Do we want to enable Grid Menu (aka hamburger menu)
     * @type {?|undefined}
     */
    GridOption.prototype.enableGridMenu;
    /**
     * Defaults to false, do we want to enable the Grouping & Aggregator?
     * @type {?|undefined}
     */
    GridOption.prototype.enableGrouping;
    /**
     * Do we want to enable Header Buttons? (buttons with commands that can be shown beside each column)
     * @type {?|undefined}
     */
    GridOption.prototype.enableHeaderButton;
    /**
     * Do we want to enable Header Menu? (when hovering a column, a menu will appear for that column)
     * @type {?|undefined}
     */
    GridOption.prototype.enableHeaderMenu;
    /**
     * Do we want to enable a styling effect when hovering any row from the grid?
     * @type {?|undefined}
     */
    GridOption.prototype.enableMouseHoverHighlightRow;
    /**
     * Do we want to enable pagination? Currently only works with a Backend Service API
     * @type {?|undefined}
     */
    GridOption.prototype.enablePagination;
    /**
     * Defaults to false, when enabled it will make possible to move rows in the grid.
     * @type {?|undefined}
     */
    GridOption.prototype.enableRowMoveManager;
    /**
     * Do we want to enable row selection?
     * @type {?|undefined}
     */
    GridOption.prototype.enableRowSelection;
    /**
     * Do we want to enable sorting?
     * @type {?|undefined}
     */
    GridOption.prototype.enableSorting;
    /**
     * Do we want to enable text selection on cells? Useful when user wants to do copy to clipboard.
     * @type {?|undefined}
     */
    GridOption.prototype.enableTextSelectionOnCells;
    /**
     * Do we want to enable localization translation (i18n)?
     * @type {?|undefined}
     */
    GridOption.prototype.enableTranslate;
    /**
     * Do we want explicit grid initialization?
     * @type {?|undefined}
     */
    GridOption.prototype.explicitInitialization;
    /**
     * Some default options to set for the export service
     * @type {?|undefined}
     */
    GridOption.prototype.exportOptions;
    /**
     * Defaults to 25, which is the grid footer row panel height
     * @type {?|undefined}
     */
    GridOption.prototype.footerRowHeight;
    /**
     * Do we want to force fit columns in the grid at all time?
     * @type {?|undefined}
     */
    GridOption.prototype.forceFitColumns;
    /**
     * Defaults to false, force synchronous scrolling
     * @type {?|undefined}
     */
    GridOption.prototype.forceSyncScrolling;
    /**
     * Formatter classes factory
     * @type {?|undefined}
     */
    GridOption.prototype.formatterFactory;
    /**
     * Defaults to false, which leads to have row with full width
     * @type {?|undefined}
     */
    GridOption.prototype.fullWidthRows;
    /**
     * Grid DOM element container ID (used Angular-Slickgrid auto-resizer)
     * @type {?|undefined}
     */
    GridOption.prototype.gridContainerId;
    /**
     * Grid Menu options (aka hamburger menu)
     * @type {?|undefined}
     */
    GridOption.prototype.gridMenu;
    /**
     * Grid DOM element ID
     * @type {?|undefined}
     */
    GridOption.prototype.gridId;
    /**
     * Header row height in pixels (only type the number). Header row is where the filters are.
     * @type {?|undefined}
     */
    GridOption.prototype.headerRowHeight;
    /**
     * Header button options
     * @type {?|undefined}
     */
    GridOption.prototype.headerButton;
    /**
     * Header menu options
     * @type {?|undefined}
     */
    GridOption.prototype.headerMenu;
    /**
     * ngx-translate i18n translation service instance
     * @type {?|undefined}
     */
    GridOption.prototype.i18n;
    /**
     * Do we leave space for new rows in the DOM visible buffer
     * @type {?|undefined}
     */
    GridOption.prototype.leaveSpaceForNewRows;
    /**
     * What is the minimum row buffer to use?
     * @type {?|undefined}
     */
    GridOption.prototype.minRowBuffer;
    /**
     * Defaults to false, which leads to be able to do multiple columns sorting (or single sort when false)
     * @type {?|undefined}
     */
    GridOption.prototype.multiColumnSort;
    /**
     * Defaults to true, which leads to be able to do multiple selection
     * @type {?|undefined}
     */
    GridOption.prototype.multiSelect;
    /**
     * Defaults to true, which will display numbers indicating column sort precedence are displayed in the columns when multiple columns selected
     * @type {?|undefined}
     */
    GridOption.prototype.numberedMultiColumnSort;
    /**
     * Pagination options, these are currently used ONLY with a Backend Service API (GraphQL/OData Services)
     * @type {?|undefined}
     */
    GridOption.prototype.pagination;
    /**
     * if you want to pass custom paramaters to your Formatter/Editor or anything else
     * @type {?|undefined}
     */
    GridOption.prototype.params;
    /**
     * Extra pre-header panel height (on top of column header)
     * @type {?|undefined}
     */
    GridOption.prototype.preHeaderPanelHeight;
    /**
     * Do we want to preserve copied selection on paste?
     * @type {?|undefined}
     */
    GridOption.prototype.preserveCopiedSelectionOnPaste;
    /**
     * Query presets before grid load (filters, sorters, pagination)
     * @type {?|undefined}
     */
    GridOption.prototype.presets;
    /**
     * Preselect certain rows by their row index ("enableCheckboxSelector" must be enabled)
     * @type {?|undefined}
     */
    GridOption.prototype.preselectedRows;
    /**
     * Register 1 or more Slick Plugins
     * @type {?|undefined}
     */
    GridOption.prototype.registerPlugins;
    /**
     * Grid row height in pixels (only type the number). Row of cell values.
     * @type {?|undefined}
     */
    GridOption.prototype.rowHeight;
    /**
     * Row Move Manager Plugin options & events
     * @type {?|undefined}
     */
    GridOption.prototype.rowMoveManager;
    /**
     * Row selection options
     * @type {?|undefined}
     */
    GridOption.prototype.rowSelectionOptions;
    /**
     * Optionally pass some options to the 3rd party lib "cure32/DOMPurify" used in some Filters.
     * For this to work, "enableRenderHtml" as to be enabled.
     * @type {?|undefined}
     */
    GridOption.prototype.sanitizeHtmlOptions;
    /**
     * CSS class name used when cell is selected
     * @type {?|undefined}
     */
    GridOption.prototype.selectedCellCssClass;
    /**
     * Do we want to show cell selection?
     * @type {?|undefined}
     */
    GridOption.prototype.showCellSelection;
    /**
     * Do we want to show the footer row?
     * @type {?|undefined}
     */
    GridOption.prototype.showFooterRow;
    /**
     * Do we want to show header row?
     * @type {?|undefined}
     */
    GridOption.prototype.showHeaderRow;
    /**
     * Do we want to show the extra pre-header panel (on top of column header) for column grouping purposes
     * @type {?|undefined}
     */
    GridOption.prototype.showPreHeaderPanel;
    /**
     * Do we want to show top panel row?
     * @type {?|undefined}
     */
    GridOption.prototype.showTopPanel;
    /**
     * Defaults to true, which leads to render a separate span for the number and styles it with css class <i>slick-sort-indicator-numbered</i>
     * @type {?|undefined}
     */
    GridOption.prototype.sortColNumberInSeparateSpan;
    /**
     * Defaults to true, which leads to suppress the cell from becoming active when cell as an editor and is clicked.
     * This flag should be enabled especially when mixing these 2 features (Row Selections & Inline Editors)
     * @type {?|undefined}
     */
    GridOption.prototype.suppressActiveCellChangeOnEdit;
    /**
     * What is the top panel height in pixels (only type the number)
     * @type {?|undefined}
     */
    GridOption.prototype.topPanelHeight;
    /**
     * Defaults to false, when set to True will lead to multiple columns sorting without the need to hold or do shift-click to execute a multiple sort.
     * @type {?|undefined}
     */
    GridOption.prototype.tristateMultiColumnSort;
    /**
     * Defaults to null, which is the default Viewport CSS class name
     * @type {?|undefined}
     */
    GridOption.prototype.viewportClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE9wdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9ncmlkT3B0aW9uLmludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBa0JBLGdDQXFUQzs7Ozs7O0lBblRDLHVDQUEyQjs7Ozs7SUFHM0IsOENBQW1DOzs7OztJQUduQywwQ0FBOEI7Ozs7O0lBRzlCLHdDQUE2Qjs7Ozs7SUFHN0IsMENBQThCOzs7OztJQUc5QixpREFBcUM7Ozs7O0lBR3JDLG9DQUF5Qjs7Ozs7SUFHekIsOEJBQW1COzs7OztJQUduQiwrQ0FBb0M7Ozs7O0lBR3BDLGdDQUE4Qjs7Ozs7SUFHOUIsd0NBU0U7Ozs7O0lBR0YsdUNBQXNDOzs7OztJQUd0QywwQ0FBOEI7Ozs7O0lBRzlCLDJDQUFzQzs7Ozs7SUFHdEMsc0NBQW9DOzs7OztJQUdwQyxrQ0FBNEI7Ozs7O0lBRzVCLHFDQUEwQjs7Ozs7SUFHMUIscUNBQWtEOzs7OztJQUdsRCwwQ0FBK0I7Ozs7O0lBRy9CLGtEQUFxRTs7Ozs7SUFHckUsK0NBQStFOzs7OztJQUcvRSwyQ0FBK0I7Ozs7O0lBRy9CLHdDQUE0Qjs7Ozs7SUFHNUIsOENBQWtDOzs7OztJQUdsQyxtQ0FBb0I7Ozs7O0lBR3BCLHVDQUFzQzs7Ozs7SUFHdEMsOEJBQW1COzs7OztJQUduQix3Q0FBK0U7Ozs7O0lBRy9FLG1DQUFvQjs7Ozs7SUFHcEIsZ0NBQWlCOzs7OztJQUdqQixnREFBcUM7Ozs7O0lBR3JDLGtDQUF1Qjs7Ozs7SUFHdkIsMkNBQWdDOzs7OztJQUdoQyxrREFBdUM7Ozs7O0lBR3ZDLHNDQUEyQjs7Ozs7SUFHM0IsMkNBQWdDOzs7OztJQUdoQyx1Q0FBNEI7Ozs7O0lBRzVCLDBDQUErQjs7Ozs7SUFHL0IsNENBQWlDOzs7OztJQUdqQyx3Q0FBNkI7Ozs7O0lBRzdCLHlDQUE4Qjs7Ozs7SUFHOUIsNkNBQWtDOzs7OztJQUdsQywyQ0FBZ0M7Ozs7O0lBR2hDLGtDQUF1Qjs7Ozs7SUFHdkIscUNBQTBCOzs7OztJQUcxQixvQ0FBeUI7Ozs7O0lBR3pCLG9DQUF5Qjs7Ozs7SUFHekIsd0NBQTZCOzs7OztJQUc3QixzQ0FBMkI7Ozs7O0lBRzNCLGtEQUF1Qzs7Ozs7SUFHdkMsc0NBQTJCOzs7OztJQUczQiwwQ0FBK0I7Ozs7O0lBRy9CLHdDQUE2Qjs7Ozs7SUFHN0IsbUNBQXdCOzs7OztJQUd4QixnREFBcUM7Ozs7O0lBR3JDLHFDQUEwQjs7Ozs7SUFHMUIsNENBQWlDOzs7OztJQUdqQyxtQ0FBNkI7Ozs7O0lBRzdCLHFDQUF5Qjs7Ozs7SUFHekIscUNBQTBCOzs7OztJQUcxQix3Q0FBNkI7Ozs7O0lBRzdCLHNDQUF1Qjs7Ozs7SUFHdkIsbUNBQXdCOzs7OztJQUd4QixxQ0FBeUI7Ozs7O0lBR3pCLDhCQUFvQjs7Ozs7SUFHcEIsNEJBQWdCOzs7OztJQUdoQixxQ0FBeUI7Ozs7O0lBR3pCLGtDQUE0Qjs7Ozs7SUFHNUIsZ0NBQXdCOzs7OztJQUd4QiwwQkFBd0I7Ozs7O0lBR3hCLDBDQUErQjs7Ozs7SUFHL0Isa0NBQXNCOzs7OztJQUd0QixxQ0FBMEI7Ozs7O0lBRzFCLGlDQUFzQjs7Ozs7SUFHdEIsNkNBQWtDOzs7OztJQUdsQyxnQ0FBd0I7Ozs7O0lBR3hCLDRCQUFxQjs7Ozs7SUFHckIsMENBQThCOzs7OztJQUc5QixvREFBeUM7Ozs7O0lBR3pDLDZCQUFvQjs7Ozs7SUFHcEIscUNBQTJCOzs7OztJQUczQixxQ0FBOEI7Ozs7O0lBRzlCLCtCQUFtQjs7Ozs7SUFHbkIsb0NBQWdDOzs7OztJQUdoQyx5Q0FHRTs7Ozs7O0lBTUYseUNBQTBCOzs7OztJQUcxQiwwQ0FBOEI7Ozs7O0lBRzlCLHVDQUE0Qjs7Ozs7SUFHNUIsbUNBQXdCOzs7OztJQUd4QixtQ0FBd0I7Ozs7O0lBR3hCLHdDQUE2Qjs7Ozs7SUFHN0Isa0NBQXVCOzs7OztJQUd2QixpREFBc0M7Ozs7OztJQU10QyxvREFBeUM7Ozs7O0lBR3pDLG9DQUF3Qjs7Ozs7SUFHeEIsNkNBQWtDOzs7OztJQUdsQyxtQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQXV0b1Jlc2l6ZU9wdGlvbixcclxuICBCYWNrZW5kU2VydmljZUFwaSxcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uUGlja2VyLFxyXG4gIENoZWNrYm94U2VsZWN0b3IsXHJcbiAgRHJhZ2dhYmxlR3JvdXBpbmcsXHJcbiAgRWRpdENvbW1hbmQsXHJcbiAgRXhwb3J0T3B0aW9uLFxyXG4gIEdyaWRNZW51LFxyXG4gIEdyaWRTdGF0ZSxcclxuICBIZWFkZXJCdXR0b24sXHJcbiAgSGVhZGVyTWVudSxcclxuICBQYWdpbmF0aW9uLFxyXG4gIFJvd01vdmVNYW5hZ2VyXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkT3B0aW9uIHtcclxuICAvKiogQ1NTIGNsYXNzIG5hbWUgdXNlZCBvbiBuZXdseSBhZGRlZCByb3cgKi9cclxuICBhZGROZXdSb3dDc3NDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIGxlYWRzIHRvIGFsd2F5cyBzaG93IGEgdmVydGljYWwgc2Nyb2xsaW5nLiBUaGlzIGlzIHJhdGhlciBpbXBvcnRhbnQgdG8gdXNlIHdoZW4gdXNpbmcgdGhlIEdyaWQgTWVudSAoaGFtYnVyZ2VyKSAqL1xyXG4gIGFsd2F5c1Nob3dWZXJ0aWNhbFNjcm9sbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byAxMDAsIHdoaWNoIGlzIHRoZSBhc3luY2hyb25vdXMgZWRpdG9yIGxvYWRpbmcgZGVsYXkgKi9cclxuICBhc3luY0VkaXRvckxvYWREZWxheT86IG51bWJlcjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBsb2FkIGVkaXRvciBhc3luY2hyb25vdXNseSAoZGVsYXllZCkgKi9cclxuICBhc3luY0VkaXRvckxvYWRpbmc/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gNTAsIHdoaWNoIGlzIHRoZSBkZWxheSBiZWZvcmUgdGhlIGFzeW5jaHJvbm91cyBwb3N0IHJlbmRlcmVyIHN0YXJ0IGV4ZWN1dGlvbiAqL1xyXG4gIGFzeW5jUG9zdFJlbmRlckRlbGF5PzogbnVtYmVyO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gNDAsIHdoaWNoIGlzIHRoZSBkZWxheSBiZWZvcmUgdGhlIGFzeW5jaHJvbm91cyBwb3N0IHJlbmRlcmVyIHN0YXJ0IGNsZWFudXAgZXhlY3V0aW9uICovXHJcbiAgYXN5bmNQb3N0UmVuZGVyQ2xlYW51cERlbGF5PzogbnVtYmVyO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gZW5hYmxlZCB3aWxsIHRyeSB0byBjb21taXQgdGhlIGN1cnJlbnQgZWRpdCB3aXRob3V0IGZvY3VzaW5nIG9uIHRoZSBuZXh0IHJvdy4gSWYgYSBjdXN0b20gZWRpdG9yIGlzIGltcGxlbWVudGVkIGFuZCB0aGUgZ3JpZCBjYW5ub3QgYXV0byBjb21taXQsIHlvdSBtdXN0IHVzZSB0aGlzIG9wdGlvbiB0byBpbXBsZW1lbnQgaXQgeW91cnNlbGYgKi9cclxuICBhdXRvQ29tbWl0RWRpdD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hlbiBlbmFibGVkIHdpbGwgYXV0b21hdGljYWxseSBvcGVuIHRoZSBpbmxpbmVkIGVkaXRvciBhcyBzb29uIGFzIHRoZXJlIGlzIGEgZm9jdXMgb24gdGhlIGNlbGwgKGNhbiBiZSBjb21iaW5lZCB3aXRoIFwiZW5hYmxlQ2VsbE5hdmlnYXRpb246IHRydWVcIikuICovXHJcbiAgYXV0b0VkaXQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggbGVhZHMgdG8gYXV0b21hdGljYWxseSBhZGp1c3QgdGhlIHNpemUgb2YgZWFjaCBjb2x1bW4gd2l0aCB0aGUgYXZhaWxhYmxlIHNwYWNlLiBTaW1pbGFyIHRvIFwiRm9yY2UgRml0IENvbHVtblwiIGJ1dCBvbmx5IGhhcHBlbnMgb24gZmlyc3QgcGFnZS9jb21wb25lbnQgbG9hZC4gKi9cclxuICBhdXRvRml0Q29sdW1uc09uRmlyc3RMb2FkPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIEF1dG8tcmVzaXplIG9wdGlvbnMgKGJvdHRvbSBwYWRkaW5nLCBtaW5IZWlnaHQsIC4uLikgICovXHJcbiAgYXV0b1Jlc2l6ZT86IEF1dG9SZXNpemVPcHRpb247XHJcblxyXG4gIC8qKiBBdXRvLXRvb2x0aXAgb3B0aW9ucyAoZW5hYmxlRm9yQ2VsbHMsIGVuYWJsZUZvckhlYWRlckNlbGxzLCBtYXhUb29sVGlwTGVuZ3RoKSAqL1xyXG4gIGF1dG9Ub29sdGlwT3B0aW9ucz86IHtcclxuICAgIC8qKiBhcmUgdG9vbHRpcCBlbmFibGVkIGZvciBhbGwgY2VsbHM/ICovXHJcbiAgICBlbmFibGVGb3JDZWxsczogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogYXJlIHRvb2x0aXAgZW5hYmxlZCBmb3IgY29sdW1uIGhlYWRlcnMgKi9cclxuICAgIGVuYWJsZUZvckhlYWRlckNlbGxzOiBib29sZWFuO1xyXG5cclxuICAgIC8qKiB3aGF0IGlzIHRoZSBtYXhpbXVtIHRvb2x0aXAgbGVuZ3RoIGluIHBpeGVscyAob25seSB0eXBlIHRoZSBudW1iZXIpICovXHJcbiAgICBtYXhUb29sVGlwTGVuZ3RoOiBudW1iZXI7XHJcbiAgfTtcclxuXHJcbiAgLyoqIEJhY2tlbmQgU2VydmljZSBBUEkgZGVmaW5pdGlvbiAoR3JhcGhRTC9PRGF0YSBTZXJ2aWNlcykgKi9cclxuICBiYWNrZW5kU2VydmljZUFwaT86IEJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAvKiogQ1NTIGNsYXNzIG5hbWUgdXNlZCB0byBzaW11bGF0ZSBjZWxsIGZsYXNoaW5nICovXHJcbiAgY2VsbEZsYXNoaW5nQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBDU1MgY2xhc3MgbmFtZSB1c2VkIHdoZW4gaGlnaGxpZ2h0aW5nIGEgY2VsbCB2YWx1ZS4gVXNlZnVsIHRvIGNoYW5nZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBhY3RpdmF0ZWQgY2VsbCAqL1xyXG4gIGNlbGxIaWdobGlnaHRDc3NDbGFzcz86IHN0cmluZyB8IG51bGw7XHJcblxyXG4gIC8qKiBDaGVja2JveCBTZWxlY3QgUGx1Z2luIG9wdGlvbnMgKGNvbHVtbklkLCBjc3NDbGFzcywgdG9vbFRpcCwgd2lkdGgpICovXHJcbiAgY2hlY2tib3hTZWxlY3Rvcj86IENoZWNrYm94U2VsZWN0b3I7XHJcblxyXG4gIC8qKiBDb2x1bW4gUGlja2VyIFBsdWdpbiBvcHRpb25zIChjb2x1bW5UaXRsZSwgZm9yY2VGaXRUaXRsZSwgc3luY1Jlc2l6ZVRpdGxlKSAqL1xyXG4gIGNvbHVtblBpY2tlcj86IENvbHVtblBpY2tlcjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBjcmVhdGUgdGhlIGZvb3RlciByb3cgb2YgdGhlIGdyaWQgKi9cclxuICBjcmVhdGVGb290ZXJSb3c/OiBib29sZWFuO1xyXG5cclxuICAvKiogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZWZpbmUgcm93IHNwYW5uaW5nIGFjY3Jvc3MgbXVsdGlwbGUgY29sdW1ucyAqL1xyXG4gIGNvbHNwYW5DYWxsYmFjaz86IChpdGVtOiBhbnkpID0+IHsgY29sdW1uczogYW55IH07XHJcblxyXG4gIC8qKiBEZWZhdWx0IHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBjcmVhdGUgYW4gZXh0cmEgcHJlLWhlYWRlciBwYW5lbCAob24gdG9wIG9mIGNvbHVtbiBoZWFkZXIpIGZvciBjb2x1bW4gZ3JvdXBpbmcgcHVycG9zZXMgKi9cclxuICBjcmVhdGVQcmVIZWFkZXJQYW5lbD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEYXRhIGl0ZW0gY29sdW1uIHZhbHVlIGV4dHJhY3RvciAoZ2V0dGVyKSB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBFeGNlbCBsaWtlIGNvcHkgYnVmZmVyIHBsdWdpbiAqL1xyXG4gIGRhdGFJdGVtQ29sdW1uVmFsdWVFeHRyYWN0b3I/OiAoaXRlbTogYW55LCBjb2x1bW5EZWY6IENvbHVtbikgPT4gYW55O1xyXG5cclxuICAvKiogRGF0YSBpdGVtIGNvbHVtbiB2YWx1ZSBzZXR0ZXIgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgRXhjZWwgbGlrZSBjb3B5IGJ1ZmZlciBwbHVnaW4gKi9cclxuICBkYXRhSXRlbUNvbHVtblZhbHVlU2V0dGVyPzogKGl0ZW06IGFueSwgY29sdW1uRGVmOiBDb2x1bW4sIHZhbHVlOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gIC8qKiBVbmlxdWUgcHJvcGVydHkgbmFtZSBvbiB0aGUgZGF0YXNldCB1c2VkIGJ5IFNsaWNrLkRhdGEuRGF0YVZpZXcgKi9cclxuICBkYXRhc2V0SWRQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBEZWZhdWx0IGNvbHVtbiB3aWR0aCwgaXMgc2V0IHRvIDgwIHdoZW4gbnVsbCAqL1xyXG4gIGRlZmF1bHRDb2x1bW5XaWR0aD86IG51bWJlcjtcclxuXHJcbiAgLyoqIERlZmF1bHQgcGxhY2Vob2xkZXIgdG8gdXNlIGluIEZpbHRlcnMgdGhhdCBzdXBwb3J0IHBsYWNlaG9sZGVyIChpbnB1dCwgZmxhdHBpY2tyKSAqL1xyXG4gIGRlZmF1bHRGaWx0ZXJQbGFjZWhvbGRlcj86IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBkZWZhdWx0IGZpbHRlciBtb2RlbCB0byB1c2Ugd2hlbiBub25lIGlzIHNwZWNpZmllZCAqL1xyXG4gIGRlZmF1bHRGaWx0ZXI/OiBhbnk7XHJcblxyXG4gIC8qKiBEcmFnZ2FibGUgR3JvdXBpbmcgUGx1Z2luIG9wdGlvbnMgJiBldmVudHMgKi9cclxuICBkcmFnZ2FibGVHcm91cGluZz86IERyYWdnYWJsZUdyb3VwaW5nO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoZW4gZW5hYmxlZCB3aWxsIGdpdmUgdGhlIHBvc3NpYmlsaXR5IHRvIGVkaXQgY2VsbCB2YWx1ZXMgd2l0aCBpbmxpbmUgZWRpdG9ycy4gKi9cclxuICBlZGl0YWJsZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBvcHRpb24gdG8gaW50ZXJjZXB0IGVkaXQgY29tbWFuZHMgYW5kIGltcGxlbWVudCB1bmRvIHN1cHBvcnQuICovXHJcbiAgZWRpdENvbW1hbmRIYW5kbGVyPzogKGl0ZW06IGFueSwgY29sdW1uOiBDb2x1bW4sIGNvbW1hbmQ6IEVkaXRDb21tYW5kKSA9PiB2b2lkO1xyXG5cclxuICAvKiogRWRpdG9yIGNsYXNzZXMgZmFjdG9yeSAqL1xyXG4gIGVkaXRvckZhY3Rvcnk/OiBhbnk7XHJcblxyXG4gIC8qKiBhIGdsb2JhbCBzaW5nbGV0b24gZWRpdG9yIGxvY2suICovXHJcbiAgZWRpdG9yTG9jaz86IGFueTtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gZW11bGF0ZSBwYWdpbmcgd2hlbiB3ZSBhcmUgc2Nyb2xsaW5nPyAqL1xyXG4gIGVtdWxhdGVQYWdpbmdXaGVuU2Nyb2xsaW5nPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBnaXZlIHVzZXIgcG9zc2liaWxpdHkgdG8gYWRkIHJvdyB0byB0aGUgZ3JpZCAqL1xyXG4gIGVuYWJsZUFkZFJvdz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IHRvIGVuYWJsZSBhc3luY2hyb25vdXMgKGRlbGF5ZWQpIHBvc3QgcmVuZGVyaW5nICovXHJcbiAgZW5hYmxlQXN5bmNQb3N0UmVuZGVyPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBjbGVhbnVwIGFmdGVyIHRoZSBwb3N0IHJlbmRlciBpcyBmaW5pc2hlZCBleGVjdXRpbmcgKi9cclxuICBlbmFibGVBc3luY1Bvc3RSZW5kZXJDbGVhbnVwPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIHdpbGwgYXV0b21hdGljYWxseSByZXNpemUgdGhlIGdyaWQgd2hlbmV2ZXIgdGhlIGJyb3dzZXIgc2l6ZSBjaGFuZ2VzICovXHJcbiAgZW5hYmxlQXV0b1Jlc2l6ZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIGF1dG9tYXRpY2FsbHkgcmVzaXplIHRoZSBjb2x1bW4gaGVhZGVycyB3aGVuZXZlciB0aGUgZ3JpZCBzaXplIGNoYW5nZXMgKi9cclxuICBlbmFibGVBdXRvU2l6ZUNvbHVtbnM/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIGxlYWRzIHRvIHNob3dpbmcgdG9vbHRpcCBvdmVyIGNlbGwgJiBoZWFkZXIgdmFsdWVzIHRoYXQgYXJlIG5vdCBzaG93biBjb21wbGV0ZWx5ICguLi4gZWxsaXBzaXMpICovXHJcbiAgZW5hYmxlQXV0b1Rvb2x0aXA/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIHdoaWNoIHdpbGwgbGV0IHVzZXIgY2xpY2sgb24gY2VsbCBhbmQgbmF2aWdhdGUgd2l0aCBhcnJvdyBrZXlzLiAqL1xyXG4gIGVuYWJsZUNlbGxOYXZpZ2F0aW9uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIGVuYWJsZWQgaXQgd2lsbCBhZGQgYSBjb2x1bW4gZm9yIGNoZWNrYm94IHNlbGVjdGlvbiBhdCB0aGUgMXN0IGNvbHVtbiBwb3NpdGlvbi4gQSBzZWxlY3Rpb24gd2lsbCB0cmlnZ2VyIHRoZSBcIm9uU2VsZWN0ZWRSb3dzQ2hhbmdlZFwiIGV2ZW50LiAqL1xyXG4gIGVuYWJsZUNoZWNrYm94U2VsZWN0b3I/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hlbiBlbmFibGVkIHdpbGwgZ2l2ZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gYSByaWdodCtjbGljayBvbiBhbnkgaGVhZGVyIHRpdGxlIHdoaWNoIHdpbGwgb3BlbiB0aGUgbGlzdCBvZiBjb2x1bW4uIFVzZXIgY2FuIHNob3cvaGlkZSBhIGNvbHVtbiBieSB1c2luZyB0aGUgY2hlY2tib3ggZnJvbSB0aGF0IHBpY2tlciBsaXN0LiAqL1xyXG4gIGVuYWJsZUNvbHVtblBpY2tlcj86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCBwZXJtaXRzIHRoZSB1c2VyIHRvIG1vdmUgYW4gZW50aXJlIGNvbHVtbiBmcm9tIGEgcG9zaXRpb24gdG8gYW5vdGhlci4gKi9cclxuICBlbmFibGVDb2x1bW5SZW9yZGVyPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCBkbyB3ZSB3YW50IHRvIGVuYWJsZSB0aGUgRHJhZ2dhYmxlIEdyb3VwaW5nIFBsdWdpbj8gKi9cclxuICBlbmFibGVEcmFnZ2FibGVHcm91cGluZz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCBsZWFkcyB0byB1c2UgYW4gRXhjZWwgbGlrZSBjb3B5IGJ1ZmZlciB0aGF0IGdldHMgY29waWVkIGluIGNsaXBib2FyZCBhbmQgY2FuIGJlIHBhc3RlZCBiYWNrIGluIEV4Y2VsIG9yIGFueSBvdGhlciBhcHAgKi9cclxuICBlbmFibGVFeGNlbENvcHlCdWZmZXI/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgdGhlIEV4cG9ydCB0byBGaWxlPyAoaWYgWWVzLCBpdCB3aWxsIHNob3cgdXAgaW4gdGhlIEdyaWQgTWVudSkgKi9cclxuICBlbmFibGVFeHBvcnQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgRmlsdGVycz8gKi9cclxuICBlbmFibGVGaWx0ZXJpbmc/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgR3JpZCBNZW51IChha2EgaGFtYnVyZ2VyIG1lbnUpICovXHJcbiAgZW5hYmxlR3JpZE1lbnU/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gZmFsc2UsIGRvIHdlIHdhbnQgdG8gZW5hYmxlIHRoZSBHcm91cGluZyAmIEFnZ3JlZ2F0b3I/ICovXHJcbiAgZW5hYmxlR3JvdXBpbmc/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgSGVhZGVyIEJ1dHRvbnM/IChidXR0b25zIHdpdGggY29tbWFuZHMgdGhhdCBjYW4gYmUgc2hvd24gYmVzaWRlIGVhY2ggY29sdW1uKSAgKi9cclxuICBlbmFibGVIZWFkZXJCdXR0b24/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgSGVhZGVyIE1lbnU/ICh3aGVuIGhvdmVyaW5nIGEgY29sdW1uLCBhIG1lbnUgd2lsbCBhcHBlYXIgZm9yIHRoYXQgY29sdW1uKSAqL1xyXG4gIGVuYWJsZUhlYWRlck1lbnU/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgYSBzdHlsaW5nIGVmZmVjdCB3aGVuIGhvdmVyaW5nIGFueSByb3cgZnJvbSB0aGUgZ3JpZD8gKi9cclxuICBlbmFibGVNb3VzZUhvdmVySGlnaGxpZ2h0Um93PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIHBhZ2luYXRpb24/IEN1cnJlbnRseSBvbmx5IHdvcmtzIHdpdGggYSBCYWNrZW5kIFNlcnZpY2UgQVBJICovXHJcbiAgZW5hYmxlUGFnaW5hdGlvbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hlbiBlbmFibGVkIGl0IHdpbGwgbWFrZSBwb3NzaWJsZSB0byBtb3ZlIHJvd3MgaW4gdGhlIGdyaWQuICovXHJcbiAgZW5hYmxlUm93TW92ZU1hbmFnZXI/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgcm93IHNlbGVjdGlvbj8gKi9cclxuICBlbmFibGVSb3dTZWxlY3Rpb24/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBlbmFibGUgc29ydGluZz8gKi9cclxuICBlbmFibGVTb3J0aW5nPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIHRleHQgc2VsZWN0aW9uIG9uIGNlbGxzPyBVc2VmdWwgd2hlbiB1c2VyIHdhbnRzIHRvIGRvIGNvcHkgdG8gY2xpcGJvYXJkLiAqL1xyXG4gIGVuYWJsZVRleHRTZWxlY3Rpb25PbkNlbGxzPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gZW5hYmxlIGxvY2FsaXphdGlvbiB0cmFuc2xhdGlvbiAoaTE4bik/ICovXHJcbiAgZW5hYmxlVHJhbnNsYXRlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgZXhwbGljaXQgZ3JpZCBpbml0aWFsaXphdGlvbj8gKi9cclxuICBleHBsaWNpdEluaXRpYWxpemF0aW9uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFNvbWUgZGVmYXVsdCBvcHRpb25zIHRvIHNldCBmb3IgdGhlIGV4cG9ydCBzZXJ2aWNlICovXHJcbiAgZXhwb3J0T3B0aW9ucz86IEV4cG9ydE9wdGlvbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIDI1LCB3aGljaCBpcyB0aGUgZ3JpZCBmb290ZXIgcm93IHBhbmVsIGhlaWdodCAqL1xyXG4gIGZvb3RlclJvd0hlaWdodD86IG51bWJlcjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gZm9yY2UgZml0IGNvbHVtbnMgaW4gdGhlIGdyaWQgYXQgYWxsIHRpbWU/ICovXHJcbiAgZm9yY2VGaXRDb2x1bW5zPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCBmb3JjZSBzeW5jaHJvbm91cyBzY3JvbGxpbmcgKi9cclxuICBmb3JjZVN5bmNTY3JvbGxpbmc/OiBib29sZWFuO1xyXG5cclxuICAvKiogRm9ybWF0dGVyIGNsYXNzZXMgZmFjdG9yeSAqL1xyXG4gIGZvcm1hdHRlckZhY3Rvcnk/OiBhbnk7XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byBmYWxzZSwgd2hpY2ggbGVhZHMgdG8gaGF2ZSByb3cgd2l0aCBmdWxsIHdpZHRoICovXHJcbiAgZnVsbFdpZHRoUm93cz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBHcmlkIERPTSBlbGVtZW50IGNvbnRhaW5lciBJRCAodXNlZCBBbmd1bGFyLVNsaWNrZ3JpZCBhdXRvLXJlc2l6ZXIpICovXHJcbiAgZ3JpZENvbnRhaW5lcklkPzogc3RyaW5nO1xyXG5cclxuICAvKiogR3JpZCBNZW51IG9wdGlvbnMgKGFrYSBoYW1idXJnZXIgbWVudSkgKi9cclxuICBncmlkTWVudT86IEdyaWRNZW51O1xyXG5cclxuICAvKiogR3JpZCBET00gZWxlbWVudCBJRCAqL1xyXG4gIGdyaWRJZD86IHN0cmluZztcclxuXHJcbiAgLyoqIEhlYWRlciByb3cgaGVpZ2h0IGluIHBpeGVscyAob25seSB0eXBlIHRoZSBudW1iZXIpLiBIZWFkZXIgcm93IGlzIHdoZXJlIHRoZSBmaWx0ZXJzIGFyZS4gKi9cclxuICBoZWFkZXJSb3dIZWlnaHQ/OiBudW1iZXI7XHJcblxyXG4gIC8qKiBIZWFkZXIgYnV0dG9uIG9wdGlvbnMgKi9cclxuICBoZWFkZXJCdXR0b24/OiBIZWFkZXJCdXR0b247XHJcblxyXG4gIC8qKiBIZWFkZXIgbWVudSBvcHRpb25zICovXHJcbiAgaGVhZGVyTWVudT86IEhlYWRlck1lbnU7XHJcblxyXG4gIC8qKiBuZ3gtdHJhbnNsYXRlIGkxOG4gdHJhbnNsYXRpb24gc2VydmljZSBpbnN0YW5jZSAqL1xyXG4gIGkxOG4/OiBUcmFuc2xhdGVTZXJ2aWNlO1xyXG5cclxuICAvKiogRG8gd2UgbGVhdmUgc3BhY2UgZm9yIG5ldyByb3dzIGluIHRoZSBET00gdmlzaWJsZSBidWZmZXIgKi9cclxuICBsZWF2ZVNwYWNlRm9yTmV3Um93cz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBXaGF0IGlzIHRoZSBtaW5pbXVtIHJvdyBidWZmZXIgdG8gdXNlPyAqL1xyXG4gIG1pblJvd0J1ZmZlcj86IG51bWJlcjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGljaCBsZWFkcyB0byBiZSBhYmxlIHRvIGRvIG11bHRpcGxlIGNvbHVtbnMgc29ydGluZyAob3Igc2luZ2xlIHNvcnQgd2hlbiBmYWxzZSkgKi9cclxuICBtdWx0aUNvbHVtblNvcnQ/OiBib29sZWFuO1xyXG5cclxuICAvKiogRGVmYXVsdHMgdG8gdHJ1ZSwgd2hpY2ggbGVhZHMgdG8gYmUgYWJsZSB0byBkbyBtdWx0aXBsZSBzZWxlY3Rpb24gKi9cclxuICBtdWx0aVNlbGVjdD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCB3aWxsIGRpc3BsYXkgbnVtYmVycyBpbmRpY2F0aW5nIGNvbHVtbiBzb3J0IHByZWNlZGVuY2UgYXJlIGRpc3BsYXllZCBpbiB0aGUgY29sdW1ucyB3aGVuIG11bHRpcGxlIGNvbHVtbnMgc2VsZWN0ZWQgKi9cclxuICBudW1iZXJlZE11bHRpQ29sdW1uU29ydD86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBQYWdpbmF0aW9uIG9wdGlvbnMsIHRoZXNlIGFyZSBjdXJyZW50bHkgdXNlZCBPTkxZIHdpdGggYSBCYWNrZW5kIFNlcnZpY2UgQVBJIChHcmFwaFFML09EYXRhIFNlcnZpY2VzKSAqL1xyXG4gIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uO1xyXG5cclxuICAvKiogaWYgeW91IHdhbnQgdG8gcGFzcyBjdXN0b20gcGFyYW1hdGVycyB0byB5b3VyIEZvcm1hdHRlci9FZGl0b3Igb3IgYW55dGhpbmcgZWxzZSAqL1xyXG4gIHBhcmFtcz86IGFueSB8IGFueVtdO1xyXG5cclxuICAvKiogRXh0cmEgcHJlLWhlYWRlciBwYW5lbCBoZWlnaHQgKG9uIHRvcCBvZiBjb2x1bW4gaGVhZGVyKSAqL1xyXG4gIHByZUhlYWRlclBhbmVsSGVpZ2h0PzogbnVtYmVyO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBwcmVzZXJ2ZSBjb3BpZWQgc2VsZWN0aW9uIG9uIHBhc3RlPyAqL1xyXG4gIHByZXNlcnZlQ29waWVkU2VsZWN0aW9uT25QYXN0ZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBRdWVyeSBwcmVzZXRzIGJlZm9yZSBncmlkIGxvYWQgKGZpbHRlcnMsIHNvcnRlcnMsIHBhZ2luYXRpb24pICovXHJcbiAgcHJlc2V0cz86IEdyaWRTdGF0ZTtcclxuXHJcbiAgLyoqIFByZXNlbGVjdCBjZXJ0YWluIHJvd3MgYnkgdGhlaXIgcm93IGluZGV4IChcImVuYWJsZUNoZWNrYm94U2VsZWN0b3JcIiBtdXN0IGJlIGVuYWJsZWQpICovXHJcbiAgcHJlc2VsZWN0ZWRSb3dzPzogbnVtYmVyW107XHJcblxyXG4gIC8qKiBSZWdpc3RlciAxIG9yIG1vcmUgU2xpY2sgUGx1Z2lucyAqL1xyXG4gIHJlZ2lzdGVyUGx1Z2lucz86IGFueSB8IGFueVtdO1xyXG5cclxuICAvKiogR3JpZCByb3cgaGVpZ2h0IGluIHBpeGVscyAob25seSB0eXBlIHRoZSBudW1iZXIpLiBSb3cgb2YgY2VsbCB2YWx1ZXMuICovXHJcbiAgcm93SGVpZ2h0PzogbnVtYmVyO1xyXG5cclxuICAvKiogUm93IE1vdmUgTWFuYWdlciBQbHVnaW4gb3B0aW9ucyAmIGV2ZW50cyAqL1xyXG4gIHJvd01vdmVNYW5hZ2VyPzogUm93TW92ZU1hbmFnZXI7XHJcblxyXG4gIC8qKiBSb3cgc2VsZWN0aW9uIG9wdGlvbnMgKi9cclxuICByb3dTZWxlY3Rpb25PcHRpb25zPzoge1xyXG4gICAgLyoqIGRvIHdlIHdhbnQgdG8gc2VsZWN0IHRoZSBhY3RpdmUgcm93PyAqL1xyXG4gICAgc2VsZWN0QWN0aXZlUm93OiBib29sZWFuO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbmFsbHkgcGFzcyBzb21lIG9wdGlvbnMgdG8gdGhlIDNyZCBwYXJ0eSBsaWIgXCJjdXJlMzIvRE9NUHVyaWZ5XCIgdXNlZCBpbiBzb21lIEZpbHRlcnMuXHJcbiAgICogRm9yIHRoaXMgdG8gd29yaywgXCJlbmFibGVSZW5kZXJIdG1sXCIgYXMgdG8gYmUgZW5hYmxlZC5cclxuICAgKi9cclxuICBzYW5pdGl6ZUh0bWxPcHRpb25zPzogYW55O1xyXG5cclxuICAvKiogQ1NTIGNsYXNzIG5hbWUgdXNlZCB3aGVuIGNlbGwgaXMgc2VsZWN0ZWQgKi9cclxuICBzZWxlY3RlZENlbGxDc3NDbGFzcz86IHN0cmluZztcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gc2hvdyBjZWxsIHNlbGVjdGlvbj8gKi9cclxuICBzaG93Q2VsbFNlbGVjdGlvbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IHRvIHNob3cgdGhlIGZvb3RlciByb3c/ICovXHJcbiAgc2hvd0Zvb3RlclJvdz86IGJvb2xlYW47XHJcblxyXG4gIC8qKiBEbyB3ZSB3YW50IHRvIHNob3cgaGVhZGVyIHJvdz8gKi9cclxuICBzaG93SGVhZGVyUm93PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERvIHdlIHdhbnQgdG8gc2hvdyB0aGUgZXh0cmEgcHJlLWhlYWRlciBwYW5lbCAob24gdG9wIG9mIGNvbHVtbiBoZWFkZXIpIGZvciBjb2x1bW4gZ3JvdXBpbmcgcHVycG9zZXMgKi9cclxuICBzaG93UHJlSGVhZGVyUGFuZWw/OiBib29sZWFuO1xyXG5cclxuICAvKiogRG8gd2Ugd2FudCB0byBzaG93IHRvcCBwYW5lbCByb3c/ICovXHJcbiAgc2hvd1RvcFBhbmVsPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIGxlYWRzIHRvIHJlbmRlciBhIHNlcGFyYXRlIHNwYW4gZm9yIHRoZSBudW1iZXIgYW5kIHN0eWxlcyBpdCB3aXRoIGNzcyBjbGFzcyA8aT5zbGljay1zb3J0LWluZGljYXRvci1udW1iZXJlZDwvaT4gKi9cclxuICBzb3J0Q29sTnVtYmVySW5TZXBhcmF0ZVNwYW4/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCBsZWFkcyB0byBzdXBwcmVzcyB0aGUgY2VsbCBmcm9tIGJlY29taW5nIGFjdGl2ZSB3aGVuIGNlbGwgYXMgYW4gZWRpdG9yIGFuZCBpcyBjbGlja2VkLlxyXG4gICAqIFRoaXMgZmxhZyBzaG91bGQgYmUgZW5hYmxlZCBlc3BlY2lhbGx5IHdoZW4gbWl4aW5nIHRoZXNlIDIgZmVhdHVyZXMgKFJvdyBTZWxlY3Rpb25zICYgSW5saW5lIEVkaXRvcnMpXHJcbiAgICovXHJcbiAgc3VwcHJlc3NBY3RpdmVDZWxsQ2hhbmdlT25FZGl0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFdoYXQgaXMgdGhlIHRvcCBwYW5lbCBoZWlnaHQgaW4gcGl4ZWxzIChvbmx5IHR5cGUgdGhlIG51bWJlcikgKi9cclxuICB0b3BQYW5lbEhlaWdodD86IG51bWJlcjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIGZhbHNlLCB3aGVuIHNldCB0byBUcnVlIHdpbGwgbGVhZCB0byBtdWx0aXBsZSBjb2x1bW5zIHNvcnRpbmcgd2l0aG91dCB0aGUgbmVlZCB0byBob2xkIG9yIGRvIHNoaWZ0LWNsaWNrIHRvIGV4ZWN1dGUgYSBtdWx0aXBsZSBzb3J0LiAqL1xyXG4gIHRyaXN0YXRlTXVsdGlDb2x1bW5Tb3J0PzogYm9vbGVhbjtcclxuXHJcbiAgLyoqIERlZmF1bHRzIHRvIG51bGwsIHdoaWNoIGlzIHRoZSBkZWZhdWx0IFZpZXdwb3J0IENTUyBjbGFzcyBuYW1lICovXHJcbiAgdmlld3BvcnRDbGFzcz86IHN0cmluZztcclxufVxyXG4iXX0=