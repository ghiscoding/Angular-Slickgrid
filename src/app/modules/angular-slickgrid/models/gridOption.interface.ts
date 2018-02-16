import { AutoResizeOption } from './autoResizeOption.interface';
import { BackendEventChanged } from './backendEventChanged.interface';
import { BackendServiceApi } from './backendServiceApi.interface';
import { ColumnPicker } from './columnPicker.interface';
import { CheckboxSelector } from './checkboxSelector.interface';
import { ExportOption } from './exportOption.interface';
import { GridMenu } from './gridMenu.interface';
import { HeaderButton } from './headerButton.interface';
import { HeaderMenu } from './headerMenu.interface';
import { Pagination } from './pagination.interface';

export interface GridOption {
  asyncEditorLoading?: boolean;
  autoEdit?: boolean;
  autoFitColumnsOnFirstLoad?: boolean;
  autoResize?: AutoResizeOption;
  autoTooltipOptions?: {
    enableForCells: boolean;
    enableForHeaderCells: boolean;
    maxToolTipLength: number;
  };

  /** Backend Service API definition (GraphQL/OData Services), also goes with onBackendEventApi */
  backendServiceApi?: BackendServiceApi;
  cellHighlightCssClass?: string | null;
  checkboxSelector?: CheckboxSelector;
  columnPicker?: ColumnPicker;
  editable?: boolean;
  enableAsyncPostRender?: boolean;
  enableAutoResize?: boolean;
  enableAutoTooltip?: boolean;
  enableCellNavigation?: boolean;
  enableCheckboxSelector?: boolean;
  enableColumnPicker?: boolean;
  enableColumnReorder?: boolean;

  /** Do we want to enable the Export to File? (if Yes, it will show up in the Grid Menu) */
  enableExport?: boolean;

  /** Export to File options */
  exportOptions?: ExportOption;

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

  /** Header row height in pixels (header row is where the filters are) */
  headerRowHeight?: number;

  /** Header button options */
  headerButton?: HeaderButton;

  /** Header menu options */
  headerMenu?: HeaderMenu;

  /** Do we want to enable multi-column sorting? */
  multiColumnSort?: boolean;

  /** DEPRECATED, Please use "backendServiceApi" instead */
  onBackendEventApi?: BackendEventChanged;

  /** Pagination options, these are used ONLY with a Backend Service API (GraphQL/OData Services) */
  pagination?: Pagination;

  /** if you want to pass custom paramaters to your Formatter/Editor or anything else */
  params?: any | any[];

  /** Register 1 or more Slick Plugins */
  registerPlugins?: any | any[];

  /** grid row height in pixels (row of cell values) */
  rowHeight?: number;

  /** Row selection options */
  rowSelectionOptions?: {
    selectActiveRow: boolean;
  };

  /** Do we want to show header row? */
  showHeaderRow?: boolean;

  /** Do we want to show top panel row? */
  showTopPanel?: boolean;

  /** What is the top panel height in pixels */
  topPanelHeight?: number;
}
