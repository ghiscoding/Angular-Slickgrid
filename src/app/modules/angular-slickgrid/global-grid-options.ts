import { Column, DelimiterType, FileType, GridOption, OperatorType } from './models/index';
import { Filters } from './filters/index';

/** Global Grid Options Defaults */
export const GlobalGridOptions: Partial<GridOption> = {
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
    fadeSpeed: 0,
    hideForceFitButton: false,
    hideSyncResizeButton: true
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
    dateFormat: 'yyyy-MM-dd hh:mm aaaaa\'m\'',
    hideTotalItemCount: false,
    hideLastUpdateTimestamp: true,
    footerHeight: 20,
    leftContainerClass: 'col-xs-12 col-sm-5',
    rightContainerClass: 'col-xs-6 col-sm-7',
    metricSeparator: '|',
    metricTexts: {
      items: 'items',
      of: 'of',
      itemsKey: 'ITEMS',
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
  enableFilterTrimWhiteSpace: false, // do we want to trim white spaces on all Filters?
  defaultFilterPlaceholder: '&#128269;',
  defaultFilterRangeOperator: OperatorType.rangeExclusive,
  editable: false,
  enableAutoResize: true,
  enableAutoSizeColumns: true,
  enableCellNavigation: false,
  enableColumnPicker: true,
  enableColumnReorder: true,
  enableContextMenu: true,
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
    resizeOnShowHeaderRow: true,
    useClickToRepositionMenu: false, // use icon location to reposition instead
    headerColumnValueExtractor: (column: Column) => {
      const headerGroup = column && column.columnGroup || '';
      if (headerGroup) {
        // when using Column Header Grouping, we'll prefix the column group title
        return headerGroup + ' - ' + column.name;
      }
      return column && column.name || '';
    }
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
  // technically speaking the Row Detail requires the process & viewComponent but we'll ignore it just to set certain options
  // @ts-ignore
  rowDetailView: {
    cssClass: 'detail-view-toggle',
    panelRows: 1,
    keyPrefix: '__',
    useRowClick: false,
    useSimpleViewportCalc: true,
    saveDetailViewOnScroll: false,
  },
  rowHeight: 35,
  topPanelHeight: 35
};
