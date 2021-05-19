export interface ResizeByContentOption {
  /** defaults to false, if a column `width` is provided (or was previously calculated) should we recalculate it or not when resizing by cell content? */
  alwaysRecalculateColumnWidth?: boolean;

  /**
   * Defaults to 7, width in pixels of a string character which is used by the resize columns by its content, this can vary depending on which font family/size is used & cell padding.
   * This is only used when resizing the columns width by their content, we need to know the width of a character in pixel to do all calculations.
   * Requires `enableAutoResizeColumnsByCellContent` to be set.
   */
  cellCharWidthInPx?: number;

  /** Defaults to 6, cell padding width to add to the calculation when resizing columns by their cell text content (requires `enableAutoResizeColumnsByCellContent` to be set) */
  cellPaddingWidthInPx?: number;

  /** Defaults to around ~0.9, what is the ratio to use (on field `type` "string" only) in the calculation when resizing columns by their cell text content (requires `enableAutoResizeColumnsByCellContent` to be set). */
  defaultRatioForStringType?: number;

  /** Defaults to 6, padding width to add to the calculation when using a Formatter and resizing columns by their cell text content (requires `enableAutoResizeColumnsByCellContent` to be set). */
  formatterPaddingWidthInPx?: number;

  /**
   * Defaults to 1000, how many rows are we going to inspect cell content width?
   * This is use when calculating all column width by their cell content, it requires `enableAutoResizeColumnsByCellContent` to be set.
   */
  maxItemToInspectCellContentWidth?: number;

  /**
   * Defaults to 5000, how many rows (of a single column) are we going to inspect cell content width?
   * This is use when calculating column width by their cell content when calling "Resize by Content" (from header menu and/or double-click to resize single column)
   */
  maxItemToInspectSingleColumnWidthByContent?: number;

  /** Defaults to 50, what width to remove from new column width when the grid is a frozen (pinned) grid and its column width exceeds the viewport full width. */
  widthToRemoveFromExceededWidthReadjustment?: number;
}
