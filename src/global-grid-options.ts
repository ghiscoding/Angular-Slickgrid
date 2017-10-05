import { GridOption } from './models/gridOption.interface';

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
  enableAutoResize: true,
  cellHighlightCssClass: 'slick-cell-modified',
  editable: false,
  enableCellNavigation: false,
  enableColumnPicker: true,
  enableColumnReorder: true,
  enableMouseOverRow: true,
  enablePagination: false,
  enableSorting: true,
  enableTextSelectionOnCells: true,
  explicitInitialization: false,
  forceFitColumns: false,
  headerRowHeight: 35,
  multiColumnSort: true,
  pagination: {
    pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
    pageSize: 25,
    totalItems: 0
  },
  rowHeight: 35,
  showHeaderRow: false,
  topPanelHeight: 25
};
