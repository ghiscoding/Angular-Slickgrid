import { AutoResizeOption } from './autoResizeOption.interface';
import { BackendEventChanged } from './backendEventChanged.interface';
import { GridMenu } from './gridMenu.interface';
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
  headerButtonOptions?: {
    buttonCssClass?: string;
  };
  headerMenuOptions?: {
    buttonCssClass?: string;
    buttonImage?: string;
  };
  multiColumnSort?: boolean;
  onGridMenuCommand?: (e: Event, args: any) => void;
  onHeaderButtonCommand?: (e: Event, args: any) => void;
  onHeaderMenuCommand?: (e: Event, args: any) => void;
  pagination?: Pagination;
  registerPlugins?: any | any[]; // e.g.: Slick.CheckboxSelectColumn
  rowHeight?: number;
  rowSelectionOptions?: {
    selectActiveRow: boolean;
  };
  showHeaderRow?: boolean;
  topPanelHeight?: number;
  onBackendEventApi?: BackendEventChanged;
}
