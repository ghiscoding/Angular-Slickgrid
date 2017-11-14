import { AutoResizeOption } from './autoResizeOption.interface';
import { BackendEventChanged } from './backendEventChanged.interface';
import { GridMenu } from './gridMenu.interface';
import { HeaderButton } from './headerButton.interface';
import { HeaderMenu } from './headerMenu.interface';
import { Pagination } from './pagination.interface';
import { PaginationChangedArgs } from './paginationChangedArgs.interface';
import { SortChangedArgs } from './sortChangedArgs.interface';

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
  cellHighlightCssClass?: string | null;
  editable?: boolean;
  enableAsyncPostRender?: boolean;
  enableAutoResize?: boolean;
  enableAutoTooltip?: boolean;
  enableCellNavigation?: boolean;
  enableColumnPicker?: boolean;
  enableColumnReorder?: boolean;
  enableFiltering?: boolean;
  enableGridMenu?: boolean;
  enableHeaderButton?: boolean;
  enableHeaderMenu?: boolean;
  enableMouseHoverHighlightRow?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  enableTextSelectionOnCells?: boolean;
  explicitInitialization?: boolean;
  forceFitColumns?: boolean;
  gridContainerId?: string;
  gridMenu?: GridMenu;
  gridId?: string;
  headerRowHeight?: number;
  headerButton?: HeaderButton;
  headerMenu?: HeaderMenu;
  multiColumnSort?: boolean;
  onBackendEventApi?: BackendEventChanged;
  pagination?: Pagination;
  registerPlugins?: any | any[]; // e.g.: Slick.CheckboxSelectColumn
  rowHeight?: number;
  rowSelectionOptions?: {
    selectActiveRow: boolean;
  };
  showHeaderRow?: boolean;
  showTopPanel?: boolean;
  topPanelHeight?: number;
}
