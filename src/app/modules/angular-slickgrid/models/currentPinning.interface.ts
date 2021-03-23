export interface CurrentPinning {
  /** Defaults to false, do we want to freeze (pin) the bottom portion instead of the top */
  frozenBottom?: boolean;

  /** Number of column index(es) to freeze (pin) in the grid */
  frozenColumn?: number;

  /** Number of row index(es) to freeze (pin) in the grid */
  frozenRow?: number;
}
