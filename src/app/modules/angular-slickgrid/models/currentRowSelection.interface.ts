export interface CurrentRowSelection {
  /**
   * Grid Row Indexes, based on the row position in the grid (what we see in the UI).
   * NOTE: when using Pagination, this value will be showing ONLY what is shown in the current Page,
   * this is a limitation from SlickGrid itself, it is recommended to use the "dataContextIds" to know the exact set of selection by their IDs
   */
  gridRowIndexes?: number[];

  /** Row Selection by the Row Data Context IDs, in other words the selected row data object ID */
  dataContextIds?: Array<number | string>;
}
