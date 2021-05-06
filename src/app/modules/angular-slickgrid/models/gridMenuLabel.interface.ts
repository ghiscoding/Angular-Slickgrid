export interface GridMenuLabel {
  /** Defaults to "Clear all Filters" */
  clearAllFiltersCommand?: string;

  /** Defaults to "CLEAR_ALL_FILTERS" translation key */
  clearAllFiltersCommandKey?: string;

  /** Defaults to "Clear all Sorting" */
  clearAllSortingCommand?: string;

  /** Defaults to "CLEAR_ALL_SORTING" translation key */
  clearAllSortingCommandKey?: string;

  /** Defaults to "Unfreeze Columns/Rows" */
  clearFrozenColumnsCommand?: string;

  /** Defaults to "CLEAR_PINNING" translation key */
  clearFrozenColumnsCommandKey?: string;

  /** Defaults to "Export to CSV" */
  exportCsvCommand?: string;

  /** Defaults to "EXPORT_TO_CSV" translation key */
  exportCsvCommandKey?: string;

  /** Defaults to "Export to Excel" */
  exportExcelCommand?: string;

  /** Defaults to "EXPORT_TO_EXCEL" translation key */
  exportExcelCommandKey?: string;

  /** Defaults to "Export to Text Delimited" */
  exportTextDelimitedCommand?: string;

  /** Defaults to "EXPORT_TO_TAB_DELIMITED" translation key */
  exportTextDelimitedCommandKey?: string;

  /** Defaults to "Refresh Dataset" */
  refreshDatasetCommand?: string;

  /** Defaults to "REFRESH_DATASET" translation key */
  refreshDatasetCommandKey?: string;

  /** Defaults to "Toggle Filter Row" */
  toggleFilterCommand?: string;

  /** Defaults to "TOGGLE_FILTER_ROW" translation key */
  toggleFilterCommandKey?: string;

  /** Defaults to "Toggle Pre-Header Row" */
  togglePreHeaderCommand?: string;

  /** Defaults to "TOGGLE_PRE_HEADER_ROW" translation key */
  togglePreHeaderCommandKey?: string;
}
