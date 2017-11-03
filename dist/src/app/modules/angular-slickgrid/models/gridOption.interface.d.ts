import { BackendEventChanged } from './backendEventChanged.interface';
import { AutoResizeOption } from './autoResizeOption.interface';
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
    cellHighlightCssClass?: string | null;
    editable?: boolean;
    enableAsyncPostRender?: boolean;
    enableAutoResize?: boolean;
    enableAutoTooltip?: boolean;
    enableCellNavigation?: boolean;
    enableColumnPicker?: boolean;
    enableColumnReorder?: boolean;
    enableFiltering?: boolean;
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
    pagination?: Pagination;
    registerPlugins?: any | any[];
    rowHeight?: number;
    rowSelectionOptions?: {
        selectActiveRow: boolean;
    };
    showHeaderRow?: boolean;
    topPanelHeight?: number;
    onBackendEventApi?: BackendEventChanged;
}
