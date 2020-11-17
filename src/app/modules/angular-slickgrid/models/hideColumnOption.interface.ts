export interface HideColumnOption {
  /** Defaults to true, do we want to auto-reize the columns in the grid after hidding the column(s)? */
  autoResizeColumns?: boolean;

  /** Defaults to false, do we want to hide the column name from the column picker after hidding the column from the grid? */
  hideFromColumnPicker?: boolean;

  /** Defaults to false, do we want to hide the column name from the grid menu after hidding the column from the grid? */
  hideFromGridMenu?: boolean;

  /** Defaults to true, do we want to trigger an even "onHeaderMenuColumnsChanged" after hidding the column(s)? */
  triggerEvent?: boolean;
}
