export interface CurrentRowSelection {
  /**
   * Grid Row Indexes, based on the row position in the grid (what you see in the UI).
   * NOTE: when using Pagination, this value will be showing ONLY what is shown in the current Page,
   * this is a limitation from SlickGrid itself, so it is RECOMMENDED to use the "dataContextIds" to know the exact set of selections following your dataset IDs
   */
  gridRowIndexes?: number[];

  /**
   * Selection by the Object Data Context IDs, in other words the selected IDs from your dataset.
   * This selection will contain every selections, if you want the filtered selection only then use "filteredDataContextIds"
   * For example if you have Task 1-10 selected in your dataset and you filter with number 2, the "filteredDataContextIds" will have Task 1-10 and "filteredDataContextIds" will have Task 2 only
   */
  dataContextIds?: Array<number | string>;

  /**
   * Similar to the "dataContextIds" property, with the difference that it returns the filtered selections only
   * For example if you have Task 1-10 selected in your dataset and you filter with number 2, the "filteredDataContextIds" will have Task 1-10 and "filteredDataContextIds" will have Task 2 only
   */
  filteredDataContextIds?: Array<number | string>;
}
