import { DelimiterType, FileType, GridOption, OperatorType } from './models/index';
import { Filters } from './filters/index';

/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 */
export const GlobalGridOptions: GridOption = {
  alwaysShowVerticalScroll: true,
  autoEdit: false,
  asyncEditorLoading: false,
  autoFitColumnsOnFirstLoad: true,
  autoResize: {
    calculateAvailableSizeBy: 'window',
    bottomPadding: 20,
    minHeight: 180,
    minWidth: 300,
    sidePadding: 0
  },
  cellHighlightCssClass: 'slick-cell-modified',
  checkboxSelector: {
    cssClass: 'slick-cell-checkboxsel'
  },
  columnPicker: {
    hideForceFitButton: false,
    hideSyncResizeButton: true
  },
  datasetIdPropertyName: 'id',
  defaultFilter: Filters.input,
  enableFilterTrimWhiteSpace: false, // do we want to trim white spaces on all Filters?
  defaultFilterPlaceholder: '&#128269;',
  defaultFilterRangeOperator: OperatorType.rangeExclusive,
  editable: false,
  enableAutoResize: true,
  enableAutoSizeColumns: true,
  enableCellNavigation: false,
  enableColumnPicker: true,
  enableColumnReorder: true,
  enableExcelExport: true, // Excel Export is the new default,
  enableExport: false, // CSV/Text with Tab Delimited
  enableGridMenu: true,
  enableHeaderMenu: true,
  enableMouseHoverHighlightRow: true,
  enableSorting: true,
  enableTextSelectionOnCells: true,
  explicitInitialization: true,
  excelExportOptions: {
    addGroupIndentation: true,
    exportWithFormatter: false,
    filename: 'export',
    format: FileType.xlsx,
    groupingColumnHeaderTitle: 'Group By',
    groupCollapsedSymbol: '\u25B9',
    groupExpandedSymbol: '\u25BF',
    groupingAggregatorRowText: '',
    sanitizeDataExport: false,
  },
  exportOptions: {
    delimiter: DelimiterType.comma,
    exportWithFormatter: false,
    filename: 'export',
    format: FileType.csv,
    groupingColumnHeaderTitle: 'Group By',
    groupingAggregatorRowText: '',
    sanitizeDataExport: false,
    useUtf8WithBom: true
  },
  forceFitColumns: false,
  gridMenu: {
    hideClearAllFiltersCommand: false,
    hideClearAllSortingCommand: false,
    hideExportCsvCommand: false,
    hideExportExcelCommand: false,
    hideExportTextDelimitedCommand: true,
    hideForceFitButton: false,
    hideRefreshDatasetCommand: false,
    hideSyncResizeButton: true,
    hideToggleFilterCommand: false,
    hideTogglePreHeaderCommand: false,
    iconCssClass: 'fa fa-bars',
    iconClearAllFiltersCommand: 'fa fa-filter text-danger',
    iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
    iconExportCsvCommand: 'fa fa-download',
    iconExportExcelCommand: 'fa fa-file-excel-o text-success',
    iconExportTextDelimitedCommand: 'fa fa-download',
    iconRefreshDatasetCommand: 'fa fa-refresh',
    iconToggleFilterCommand: 'fa fa-random',
    iconTogglePreHeaderCommand: 'fa fa-random',
    menuWidth: 16,
    resizeOnShowHeaderRow: true
  },
  headerMenu: {
    autoAlign: true,
    autoAlignOffset: 12,
    minWidth: 140,
    iconClearFilterCommand: 'fa fa-filter text-danger',
    iconClearSortCommand: 'fa fa-unsorted',
    iconSortAscCommand: 'fa fa-sort-amount-asc',
    iconSortDescCommand: 'fa fa-sort-amount-desc',
    iconColumnHideCommand: 'fa fa-times',
    hideColumnHideCommand: false,
    hideClearFilterCommand: false,
    hideClearSortCommand: false,
    hideSortCommands: false
  },
  headerRowHeight: 35,
  multiColumnSort: true,
  numberedMultiColumnSort: true,
  tristateMultiColumnSort: false,
  sortColNumberInSeparateSpan: true,
  suppressActiveCellChangeOnEdit: true,
  pagination: {
    pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
    pageSize: 25,
    totalItems: 0
  },
  rowDetailView: {
    cssClass: 'detail-view-toggle',
    panelRows: 1,
    keyPrefix: '__',
    useRowClick: true,
    useSimpleViewportCalc: true,
    saveDetailViewOnScroll: false,

    // the following 2 property/method should always be override by the user
    process: undefined,
    viewComponent: null
  },
  rowHeight: 35,
  topPanelHeight: 35
};
