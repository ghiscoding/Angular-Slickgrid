export interface CurrentRowSelection {
  /** Grid Row Indexes, based on the row position in the grid (what we see in the UI) */
  gridRowIndexes?: number[];

  /** Row Selection by the Row Data Context, in other words we select the row by the data object ID */
  dataContextIds?: number[];
}
