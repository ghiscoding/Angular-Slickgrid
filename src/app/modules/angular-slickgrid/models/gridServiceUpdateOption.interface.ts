export interface GridServiceUpdateOption {
  /** Defaults to true, highlight the row(s) in the grid after update */
  highlightRow?: boolean;

  /** Defaults to false, select the row(s) in the grid after update */
  selectRow?: boolean;

  /** Defaults to false, scroll to the row so that it shows up in the Viewport (UI) */
  scrollRowIntoView?: boolean;

  /** Defaults to true, trigger an onItemUpdated event after the update */
  triggerEvent?: boolean;
}
