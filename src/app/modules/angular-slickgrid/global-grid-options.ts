import { GridOption } from './models';

/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 */
export const GlobalGridOptions: GridOption = {
  autoEdit: false,
  asyncEditorLoading: false,
  autoFitColumnsOnFirstLoad: true,
  autoResize: {
    bottomPadding: 20,
    minHeight: 180,
    minWidth: 300,
    sidePadding: 0
  },
  cellHighlightCssClass: 'slick-cell-modified',
  editable: false,
  enableAutoResize: true,
  enableCellNavigation: false,
  enableColumnPicker: true,
  enableColumnReorder: true,
  enableGridMenu: true,
  enableMouseHoverHighlightRow: true,
  enablePagination: false,
  enableSorting: true,
  enableTextSelectionOnCells: true,
  explicitInitialization: true,
  forceFitColumns: false,
  gridMenu: {
    columnTitle: 'Columns',
    iconCssClass: 'fa fa-bars',
    menuWidth: 16
  },
  headerRowHeight: 35,
  multiColumnSort: true,
  pagination: {
    pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
    pageSize: 25,
    totalItems: 0
  },
  rowHeight: 35,
  showHeaderRow: false,
  topPanelHeight: 35
};
