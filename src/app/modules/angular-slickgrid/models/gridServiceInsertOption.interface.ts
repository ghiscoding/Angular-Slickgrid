export interface GridServiceInsertOption {
  /** Defaults to "top", which position in the grid do we want to insert and show the new row (on top or bottom of the grid) */
  position?: 'top' | 'bottom';

  /** Defaults to true, highlight the row(s) in the grid after insert */
  highlightRow?: boolean;

  /** Defaults to false, resort the grid after the insert */
  resortGrid?: boolean;

  /** Defaults to false, select the row(s) in the grid after insert */
  selectRow?: boolean;

  /** Defaults to true, trigger an onItemAdded event after the insert */
  triggerEvent?: boolean;
}
