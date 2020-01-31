export interface CurrentRowSelection {
  /**
   * Grid Row Indexes, based on the row position in the grid (what you see in the UI).
   * NOTE: when using Pagination, this value will be showing ONLY what is shown in the current Page,
   * this is a limitation from SlickGrid itself, so it is RECOMMENDED to use the "dataContextIds" to know the exact set of selections following your dataset IDs
   */
  gridRowIndexes?: number[];

  /** Selection by the Object Data Context IDs, in other words the selected IDs from your dataset */
  dataContextIds?: Array<number | string>;
}
