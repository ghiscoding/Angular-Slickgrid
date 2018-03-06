import {
  AutoResizeOption,
  BackendEventChanged,
  BackendServiceApi,
  Column,
  ColumnPicker,
  CheckboxSelector,
  EditCommand,
  ExportOption,
  FilterType,
  GridMenu,
  GridState,
  HeaderButton,
  HeaderMenu,
  Pagination
} from './../models/index';

export interface GridOption {
  /** Defaults to false, which leads to load editor asynchronously (delayed) */
  asyncEditorLoading?: boolean;

  /** Defaults to false, when enabled will automatically open the inlined editor as soon as there is a focus on the cell (can be combined with "enableCellNavigation: true"). */
  autoEdit?: boolean;

  /** Defaults to true, which leads to automatically adjust the size of each column with the available space. Similar to "Force Fit Column" but only happens on first page/component load. */
  autoFitColumnsOnFirstLoad?: boolean;

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

  /** Backend Service API definition (GraphQL/OData Services), also goes with onBackendEventApi */
  backendServiceApi?: BackendServiceApi;

  /** CSS class for when highlighting a cell value. Useful to change background color of the activated cell */
  cellHighlightCssClass?: string | null;

  /** Checkbox Select Plugin options (columnId, cssClass, toolTip, width) */
  checkboxSelector?: CheckboxSelector;

  /** Checkbox Select Plugin options (columnTitle, forceFitTitle, syncResizeTitle) */
  columnPicker?: ColumnPicker;

  /** Unique property name on the dataset used by Slick.Data.DataView */
  datasetIdPropertyName?: string;

  /** The default filter type to use when none is specified */
  defaultFilterType?: FilterType;

  /** Defaults to false, when enabled will give the possibility to edit cell values with inline editors. */
  editable?: boolean;

  /** option to intercept edit commands and implement undo support. */
  editCommandHandler?: (item: any, column: Column, command: EditCommand) => void;

  /** Do we want to enable asynchronous (delayed) post rendering */
  enableAsyncPostRender?: boolean;

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

  /** Do we want to enable the Export to File? (if Yes, it will show up in the Grid Menu) */
  enableExport?: boolean;

  /** Defaults to false, which leads to all Formatters of the grid being evaluated on export. You can also override a column by changing the propery on the column itself */
  exportWithFormatter?: boolean;

  /** Do we want to enable Filters? */
  enableFiltering?: boolean;

  /** Do we want to enable Grid Menu (aka hamburger menu) */
  enableGridMenu?: boolean;

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

  /** Do we want to enable text selection cells? */
  enableTextSelectionOnCells?: boolean;

  /** Do we want to enable localization translation (i18n)? */
  enableTranslate?: boolean;

  /** Do we want explicit grid initialization? */
  explicitInitialization?: boolean;

  /** Do we want to force fit columns in the grid at all time? */
  forceFitColumns?: boolean;

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

  /** Do we want to enable multi-column sorting? */
  multiColumnSort?: boolean;

  /** DEPRECATED, Please use "backendServiceApi" instead */
  onBackendEventApi?: BackendEventChanged;

  /** Pagination options, these are currently used ONLY with a Backend Service API (GraphQL/OData Services) */
  pagination?: Pagination;

  /** if you want to pass custom paramaters to your Formatter/Editor or anything else */
  params?: any | any[];

  /** Query presets before grid load (filters, sorters, pagination) */
  presets?: GridState;

  /** Register 1 or more Slick Plugins */
  registerPlugins?: any | any[];

  /** Grid row height in pixels (only type the number). Row of cell values. */
  rowHeight?: number;

  /** Row selection options */
  rowSelectionOptions?: {
    /** do we want to select the active row? */
    selectActiveRow: boolean;
  };

  /** Do we want to show header row? */
  showHeaderRow?: boolean;

  /** Do we want to show top panel row? */
  showTopPanel?: boolean;

  /** What is the top panel height in pixels (only type the number) */
  topPanelHeight?: number;
}
