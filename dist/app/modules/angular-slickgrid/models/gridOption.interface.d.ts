import { TranslateService } from '@ngx-translate/core';
import { AutoResizeOption, BackendServiceApi, Column, ColumnPicker, CheckboxSelector, EditCommand, ExportOption, GridMenu, GridState, HeaderButton, HeaderMenu, Pagination } from './../models/index';
export interface GridOption {
    /** CSS class name used on newly added row */
    addNewRowCssClass?: string;
    /** Defaults to true, which leads to always show a vertical scrolling. This is rather important to use when using the Grid Menu (hamburger) */
    alwaysShowVerticalScroll?: boolean;
    /** Defaults to 100, which is the asynchronous editor loading delay */
    asyncEditorLoadDelay?: number;
    /** Defaults to false, which leads to load editor asynchronously (delayed) */
    asyncEditorLoading?: boolean;
    /** Defaults to 50, which is the delay before the asynchronous post renderer start execution */
    asyncPostRenderDelay?: number;
    /** Defaults to 40, which is the delay before the asynchronous post renderer start cleanup execution */
    asyncPostRenderCleanupDelay?: number;
    /** Defaults to false, when enabled will automatically open the inlined editor as soon as there is a focus on the cell (can be combined with "enableCellNavigation: true"). */
    autoEdit?: boolean;
    /** Defaults to true, which leads to automatically adjust the size of each column with the available space. Similar to "Force Fit Column" but only happens on first page/component load. */
    autoFitColumnsOnFirstLoad?: boolean;
    /** Defaults to false, when enabled will automatically adjust grid height. */
    autoHeight?: boolean;
    /** Auto-resize options (bottom padding, minHeight, ...)  */
    autoResize?: AutoResizeOption;
    /** Auto-tooltip options (enableForCells, enableForHeaderCells, maxToolTipLength) */
    autoTooltipOptions?: {
        /** are tooltip enabled for all cells? */
        enableForCells: boolean;
        /** are tooltip enabled for column headers */
        enableForHeaderCells: boolean;
        /** what is the maximum tooltip length in pixels (only type the number) */
        maxToolTipLength: number;
    };
    /** Backend Service API definition (GraphQL/OData Services) */
    backendServiceApi?: BackendServiceApi;
    /** CSS class name used to simulate cell flashing */
    cellFlashingCssClass?: string;
    /** CSS class name used when highlighting a cell value. Useful to change background color of the activated cell */
    cellHighlightCssClass?: string | null;
    /** Checkbox Select Plugin options (columnId, cssClass, toolTip, width) */
    checkboxSelector?: CheckboxSelector;
    /** Checkbox Select Plugin options (columnTitle, forceFitTitle, syncResizeTitle) */
    columnPicker?: ColumnPicker;
    /** Defaults to false, which leads to create the footer row of the grid */
    createFooterRow?: boolean;
    /** A callback function that will be used to define row spanning accross multiple columns */
    colspanCallback?: (item: any) => {
        columns: any;
    };
    /** Default to false, which leads to create an extra pre-header panel (on top of column header) for column grouping purposes */
    createPreHeaderPanel?: boolean;
    /** Data item column value extractor (getter) that can be used by the Excel like copy buffer plugin */
    dataItemColumnValueExtractor?: (item: any, columnDef: Column) => any;
    /** Data item column value setter that can be used by the Excel like copy buffer plugin */
    dataItemColumnValueSetter?: (item: any, columnDef: Column, value: any) => void;
    /** Unique property name on the dataset used by Slick.Data.DataView */
    datasetIdPropertyName?: string;
    /** Default column width, is set to 80 when null */
    defaultColumnWidth?: number;
    /** Default placeholder to use in Filters that support placeholder (input, flatpickr) */
    defaultFilterPlaceholder?: string;
    /** The default filter model to use when none is specified */
    defaultFilter?: any;
    /** Defaults to false, when enabled will give the possibility to edit cell values with inline editors. */
    editable?: boolean;
    /** option to intercept edit commands and implement undo support. */
    editCommandHandler?: (item: any, column: Column, command: EditCommand) => void;
    /** Editor classes factory */
    editorFactory?: any;
    /** a global singleton editor lock. */
    editorLock?: any;
    /** Do we want to emulate paging when we are scrolling? */
    emulatePagingWhenScrolling?: boolean;
    /** Defaults to false, which leads to give user possibility to add row to the grid */
    enableAddRow?: boolean;
    /** Do we want to enable asynchronous (delayed) post rendering */
    enableAsyncPostRender?: boolean;
    /** Defaults to false, which leads to cleanup after the post render is finished executing */
    enableAsyncPostRenderCleanup?: boolean;
    /** Defaults to true, which will automatically resize the grid whenever the browser size changes  */
    enableAutoResize?: boolean;
    /** Defaults to false, which leads to showing tooltip over cell & header values that are not shown completely (... ellipsis) */
    enableAutoTooltip?: boolean;
    /** Defaults to false, which will let user click on cell and navigate with arrow keys. */
    enableCellNavigation?: boolean;
    /** Defaults to false, when enabled it will add a column for checkbox selection at the 1st column position. A selection will trigger the "onSelectedRowsChanged" event. */
    enableCheckboxSelector?: boolean;
    /** Defaults to true, when enabled will give the possibility to do a right+click on any header title which will open the list of column. User can show/hide a column by using the checkbox from that picker list. */
    enableColumnPicker?: boolean;
    /** Defaults to true, which permits the user to move an entire column from a position to another. */
    enableColumnReorder?: boolean;
    /** Defaults to true, which leads to use an Excel like copy buffer that gets copied in clipboard and can be pasted back in Excel or any other app */
    enableExcelCopyBuffer?: boolean;
    /** Do we want to enable the Export to File? (if Yes, it will show up in the Grid Menu) */
    enableExport?: boolean;
    /** Do we want to enable Filters? */
    enableFiltering?: boolean;
    /** Do we want to enable Grid Menu (aka hamburger menu) */
    enableGridMenu?: boolean;
    /** Defaults to false, do we want to enable the Grouping & Aggregator? */
    enableGrouping?: boolean;
    /** Do we want to enable Header Buttons? (buttons with commands that can be shown beside each column)  */
    enableHeaderButton?: boolean;
    /** Do we want to enable Header Menu? (when hovering a column, a menu will appear for that column) */
    enableHeaderMenu?: boolean;
    /** Do we want to enable a styling effect when hovering any row from the grid? */
    enableMouseHoverHighlightRow?: boolean;
    /** Do we want to enable pagination? Currently only works with a Backend Service API */
    enablePagination?: boolean;
    /** Do we want to enable row selection? */
    enableRowSelection?: boolean;
    /** Do we want to enable sorting? */
    enableSorting?: boolean;
    /** Do we want to enable text selection on cells? Useful when user wants to do copy to clipboard. */
    enableTextSelectionOnCells?: boolean;
    /** Do we want to enable localization translation (i18n)? */
    enableTranslate?: boolean;
    /** Do we want explicit grid initialization? */
    explicitInitialization?: boolean;
    /** Some default options to set for the export service */
    exportOptions?: ExportOption;
    /** Defaults to 25, which is the grid footer row panel height */
    footerRowHeight?: number;
    /** Do we want to force fit columns in the grid at all time? */
    forceFitColumns?: boolean;
    /** Defaults to false, force synchronous scrolling */
    forceSyncScrolling?: boolean;
    /** Formatter classes factory */
    formatterFactory?: any;
    /** Defaults to false, which leads to have row with full width */
    fullWidthRows?: boolean;
    /** Grid DOM element container ID (used Angular-Slickgrid auto-resizer) */
    gridContainerId?: string;
    /** Grid Menu options (aka hamburger menu) */
    gridMenu?: GridMenu;
    /** Grid DOM element ID */
    gridId?: string;
    /** Header row height in pixels (only type the number). Header row is where the filters are. */
    headerRowHeight?: number;
    /** Header button options */
    headerButton?: HeaderButton;
    /** Header menu options */
    headerMenu?: HeaderMenu;
    /** ngx-translate i18n translation service instance */
    i18n?: TranslateService;
    /** Do we leave space for new rows in the DOM visible buffer */
    leaveSpaceForNewRows?: boolean;
    /** What is the minimum row buffer to use? */
    minRowBuffer?: number;
    /** Defaults to false, which leads to be able to do multiple columns sorting (or single sort when false) */
    multiColumnSort?: boolean;
    /** Defaults to true, which leads to be able to do multiple selection */
    multiSelect?: boolean;
    /** Defaults to true, which will display numbers indicating column sort precedence are displayed in the columns when multiple columns selected */
    numberedMultiColumnSort?: boolean;
    /** Pagination options, these are currently used ONLY with a Backend Service API (GraphQL/OData Services) */
    pagination?: Pagination;
    /** if you want to pass custom paramaters to your Formatter/Editor or anything else */
    params?: any | any[];
    /** Extra pre-header panel height (on top of column header) */
    preHeaderPanelHeight?: number;
    /** Do we want to preserve copied selection on paste? */
    preserveCopiedSelectionOnPaste?: boolean;
    /** Query presets before grid load (filters, sorters, pagination) */
    presets?: GridState;
    /** Preselect certain rows by their row index ("enableCheckboxSelector" must be enabled) */
    preselectedRows?: number[];
    /** Register 1 or more Slick Plugins */
    registerPlugins?: any | any[];
    /** Grid row height in pixels (only type the number). Row of cell values. */
    rowHeight?: number;
    /** Row selection options */
    rowSelectionOptions?: {
        /** do we want to select the active row? */
        selectActiveRow: boolean;
    };
    /** CSS class name used when cell is selected */
    selectedCellCssClass?: string;
    /** Do we want to show cell selection? */
    showCellSelection?: boolean;
    /** Do we want to show the footer row? */
    showFooterRow?: boolean;
    /** Do we want to show header row? */
    showHeaderRow?: boolean;
    /** Do we want to show the extra pre-header panel (on top of column header) for column grouping purposes */
    showPreHeaderPanel?: boolean;
    /** Do we want to show top panel row? */
    showTopPanel?: boolean;
    /** Defaults to true, which leads to render a separate span for the number and styles it with css class <i>slick-sort-indicator-numbered</i> */
    sortColNumberInSeparateSpan?: boolean;
    /**
     * Defaults to true, which leads to suppress the cell from becoming active when cell as an editor and is clicked.
     * This flag should be enabled especially when mixing these 2 features (Row Selections & Inline Editors)
     */
    suppressActiveCellChangeOnEdit?: boolean;
    /** What is the top panel height in pixels (only type the number) */
    topPanelHeight?: number;
    /** Defaults to false, when set to True will lead to multiple columns sorting without the need to hold or do shift-click to execute a multiple sort. */
    tristateMultiColumnSort?: boolean;
    /** Defaults to null, which is the default Viewport CSS class name */
    viewportClass?: string;
}
