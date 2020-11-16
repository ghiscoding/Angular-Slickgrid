export interface EmptyWarning {
  /** Empty data warning message, defaults to "No data to display." */
  message: string;

  /** Empty data warning message translation key, defaults to "EMPTY_DATA_WARNING_MESSAGE" */
  messageKey?: string;

  /** DOM Element class name, defaults to "empty-data-warning" */
  className?: string;

  /** Defaults to False, when using a frozen/pinned grid, do we want to hide the warning on the left side? */
  hideFrozenLeftWarning?: boolean;

  /** Defaults to False, when using a frozen/pinned grid, do we want to hide the warning on the right side? */
  hideFrozenRightWarning?: boolean;

  /** Defaults to "40%", what is the margin-left CSS style to use when we have a regular grid (non-frozen grid)? */
  leftViewportMarginLeft?: number | string;

  /** Defaults to "10px", what is the margin-left CSS style to use when the grid is a frozen/pinned grid? */
  frozenLeftViewportMarginLeft?: number | string;

  /** Defaults to "40%", what is the margin-left CSS style to use when we have a regular grid (non-frozen grid)? */
  rightViewportMarginLeft?: number | string;

  /** Defaults to "10px", what is the margin-left CSS style to use when the grid is a frozen/pinned grid? */
  frozenRightViewportMarginLeft?: number | string;
}
