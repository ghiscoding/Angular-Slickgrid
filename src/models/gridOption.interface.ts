import { AutoResizeOption } from './autoResizeOption.interface';
import { Pagination } from './pagination.interface';
import { PaginationChangedArgs } from './paginationChangedArgs.interface';
import { SortChangedArgs } from './sortChangedArgs.interface';

export interface GridOption {
  asyncEditorLoading?: boolean;
  autoEdit?: boolean;
  autoFitColumnsOnFirstLoad?: boolean;
  autoResize?: AutoResizeOption;
  cellHighlightCssClass?: string | null;
  editable?: boolean;
  enableAutoResize?: boolean;
  enableColumnPicker?: boolean;
  enableCellNavigation?: boolean;
  enableColumnReorder?: boolean;
  enableFiltering?: boolean;
  enableMouseOverRow?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableTextSelectionOnCells?: boolean;
  explicitInitialization?: boolean;
  forceFitColumns?: boolean;
  gridContainerId?: string;
  gridId?: string;
  headerRowHeight?: number;
  multiColumnSort?: boolean;
  pagination?: Pagination;
  rowHeight?: number;
  showHeaderRow?: boolean;
  topPanelHeight?: number;
  onFilterChanged?: (event: Event, args: any) => void;
  onPaginationChanged?: (event: Event, args: PaginationChangedArgs) => void;
  onSortChanged?: (event: Event, args: SortChangedArgs) => void;
}
