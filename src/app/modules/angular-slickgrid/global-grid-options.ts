import { Column, DelimiterType, EventNamingStyle, FileType, Filters, GridAutosizeColsMode, OperatorType, TreeDataOption } from '@slickgrid-universal/common';
import { GridOption, RowDetailView } from './models/index';

/** Global Grid Options Defaults */
export const GlobalGridOptions: Partial<GridOption> = {
  alwaysShowVerticalScroll: true,
  autoEdit: false,
  asyncEditorLoading: false,
  autoFitColumnsOnFirstLoad: true,
  autoResize: {
    applyResizeToContainer: true,
    calculateAvailableSizeBy: 'window',
    bottomPadding: 20,
    minHeight: 180,
    minWidth: 300,
    rightPadding: 0
  },
  cellHighlightCssClass: 'slick-cell-modified',
  checkboxSelector: {
    cssClass: 'slick-cell-checkboxsel'
  },
  columnPicker: {
    fadeSpeed: 0,
    hideForceFitButton: false,
    hideSyncResizeButton: true,
    headerColumnValueExtractor: pickerHeaderColumnValueExtractor
  },
  cellMenu: {
    autoAdjustDrop: true,
    autoAlignSide: true,
    hideCloseButton: true,
    hideCommandSection: false,
    hideOptionSection: false,
  },
  contextMenu: {
    autoAdjustDrop: true,
    autoAlignSide: true,
    hideCloseButton: true,
    hideClearAllGrouping: false,
    hideCollapseAllGroups: false,
    hideCommandSection: false,
    hideCopyCellValueCommand: false,
    hideExpandAllGroups: false,
    hideExportCsvCommand: false,
    hideExportExcelCommand: false,
    hideExportTextDelimitedCommand: true,
    hideMenuOnScroll: true,
    hideOptionSection: false,
    iconCopyCellValueCommand: 'fa fa-clone',
    iconExportCsvCommand: 'fa fa-download',
    iconExportExcelCommand: 'fa fa-file-excel-o text-success',
    iconExportTextDelimitedCommand: 'fa fa-download',
    width: 200,
  },
  customFooterOptions: {
    dateFormat: 'YYYY-MM-DD, hh:mm a',
    hideRowSelectionCount: false,
    hideTotalItemCount: false,
    hideLastUpdateTimestamp: true,
    footerHeight: 25,
    leftContainerClass: 'col-xs-12 col-sm-5',
    rightContainerClass: 'col-xs-6 col-sm-7',
    metricSeparator: '|',
    metricTexts: {
      items: 'items',
      itemsKey: 'ITEMS',
      itemsSelected: 'items selected',
      itemsSelectedKey: 'ITEMS_SELECTED',
      of: 'of',
      ofKey: 'OF',
    }
  },
  dataView: {
    syncGridSelection: true, // when enabled, this will preserve the row selection even after filtering/sorting/grouping
    syncGridSelectionWithBackendService: false, // but disable it when using backend services
  },
  datasetIdPropertyName: 'id',
  defaultColumnSortFieldId: 'id',
  defaultFilter: Filters.input,
  defaultBackendServiceFilterTypingDebounce: 500,
  enableFilterTrimWhiteSpace: false, // do we want to trim white spaces on all Filters?
  defaultFilterPlaceholder: '🔎︎',
  defaultFilterRangeOperator: OperatorType.rangeInclusive,
  editable: false,
  enableAutoResize: true,
  enableAutoSizeColumns: true,
  enableCellNavigation: false,
  enableColumnPicker: true,
  enableColumnReorder: true,
  enableColumnResizeOnDoubleClick: true,
  enableContextMenu: true,
  enableExcelExport: true, // Excel Export is the new default,
  enableExport: false, // CSV/Text with Tab Delimited
  enableGridMenu: true,
  enableHeaderMenu: true,
  enableEmptyDataWarningMessage: true,
  emptyDataWarning: {
    className: 'slick-empty-data-warning',
    message: 'No data to display.',
    messageKey: 'EMPTY_DATA_WARNING_MESSAGE',
    hideFrozenLeftWarning: false,
    hideFrozenRightWarning: false,
    leftViewportMarginLeft: '40%',
    rightViewportMarginLeft: '40%',
    frozenLeftViewportMarginLeft: '0px',
    frozenRightViewportMarginLeft: '40%',
  },
  enableMouseHoverHighlightRow: true,
  enableSorting: true,
  enableTextSelectionOnCells: true,
  eventNamingStyle: EventNamingStyle.camelCase,
  explicitInitialization: true,
  excelExportOptions: {
    addGroupIndentation: true,
    exportWithFormatter: false,
    filename: 'export',
    format: FileType.xlsx,
    groupingColumnHeaderTitle: 'Group By',
    groupCollapsedSymbol: '⮞',
    groupExpandedSymbol: '⮟',
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
  filterTypingDebounce: 0,
  forceFitColumns: false,
  frozenHeaderWidthCalcDifferential: 0,
  gridMenu: {
    commandLabels: {
      clearAllFiltersCommandKey: 'CLEAR_ALL_FILTERS',
      clearAllSortingCommandKey: 'CLEAR_ALL_SORTING',
      clearFrozenColumnsCommandKey: 'CLEAR_PINNING',
      exportCsvCommandKey: 'EXPORT_TO_CSV',
      exportExcelCommandKey: 'EXPORT_TO_EXCEL',
      exportTextDelimitedCommandKey: 'EXPORT_TO_TAB_DELIMITED',
      refreshDatasetCommandKey: 'REFRESH_DATASET',
      toggleFilterCommandKey: 'TOGGLE_FILTER_ROW',
      togglePreHeaderCommandKey: 'TOGGLE_PRE_HEADER_ROW',
    },
    hideClearAllFiltersCommand: false,
    hideClearAllSortingCommand: false,
    hideClearFrozenColumnsCommand: true, // opt-in command
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
    iconClearFrozenColumnsCommand: 'fa fa-times',
    iconExportCsvCommand: 'fa fa-download',
    iconExportExcelCommand: 'fa fa-file-excel-o text-success',
    iconExportTextDelimitedCommand: 'fa fa-download',
    iconRefreshDatasetCommand: 'fa fa-refresh',
    iconToggleFilterCommand: 'fa fa-random',
    iconTogglePreHeaderCommand: 'fa fa-random',
    menuWidth: 16,
    resizeOnShowHeaderRow: true,
    useClickToRepositionMenu: false, // use icon location to reposition instead
    headerColumnValueExtractor: pickerHeaderColumnValueExtractor
  },
  headerMenu: {
    autoAlign: true,
    autoAlignOffset: 12,
    minWidth: 140,
    iconClearFilterCommand: 'fa fa-filter text-danger',
    iconClearSortCommand: 'fa fa-unsorted',
    iconFreezeColumns: 'fa fa-thumb-tack',
    iconSortAscCommand: 'fa fa-sort-amount-asc',
    iconSortDescCommand: 'fa fa-sort-amount-desc',
    iconColumnHideCommand: 'fa fa-times',
    iconColumnResizeByContentCommand: 'fa fa-arrows-h',
    hideColumnResizeByContentCommand: false,
    hideColumnHideCommand: false,
    hideClearFilterCommand: false,
    hideClearSortCommand: false,
    hideFreezeColumnsCommand: true, // opt-in command
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
  // technically speaking the Row Detail requires the process & viewComponent but we'll ignore it just to set certain options
  rowDetailView: {
    cssClass: 'detail-view-toggle',
    panelRows: 1,
    keyPrefix: '__',
    useRowClick: false,
    useSimpleViewportCalc: true,
    saveDetailViewOnScroll: false,
  } as RowDetailView,
  rowHeight: 35,
  topPanelHeight: 35,
  translationNamespaceSeparator: ':',
  resizeByContentOnlyOnFirstLoad: true,
  resizeByContentOptions: {
    alwaysRecalculateColumnWidth: false,
    cellCharWidthInPx: 7.8,
    cellPaddingWidthInPx: 14,
    defaultRatioForStringType: 0.88,
    formatterPaddingWidthInPx: 0,
    maxItemToInspectCellContentWidth: 1000,
    maxItemToInspectSingleColumnWidthByContent: 5000,
    widthToRemoveFromExceededWidthReadjustment: 50,
  },
  treeDataOptions: {
    exportIndentMarginLeft: 5,
    exportIndentationLeadingChar: '͏͏͏͏͏͏͏͏͏·',
  } as unknown as TreeDataOption
};

/**
 * Value Extractor for both ColumnPicker & GridMenu Picker
 * when using Column Header Grouping, we'll prefix the column group title
 * else we'll simply return the column name title
 */
function pickerHeaderColumnValueExtractor(column: Column) {
  const headerGroup = column && column.columnGroup || '';
  if (headerGroup) {
    return headerGroup + ' - ' + column.name;
  }
  return column && column.name || '';
}
