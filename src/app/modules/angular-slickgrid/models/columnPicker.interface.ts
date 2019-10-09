export interface ColumnPicker {
  /** Defaults to "Columns" which is the title that shows up over the columns */
  columnTitle?: string;

  /** Defaults to "Force fit columns" which is 1 of the last 2 checkbox title shown at the end of the picker list */
  forceFitTitle?: string;

  /** Defaults to True, show/hide 1 of the last 2 checkbox at the end of the picker list */
  hideForceFitButton?: boolean;

  /** Defaults to True, show/hide 1 of the last 2 checkbox at the end of the picker list */
  hideSyncResizeButton?: boolean;

  /** Defaults to "Synchronous resize" which is 1 of the last 2 checkbox title shown at the end of the picker list */
  syncResizeTitle?: string;

  // --
  // Events

  /** Fired after extension (control) is registered by SlickGrid */
  onExtensionRegistered?: (plugin: any) => void;

  /** SlickGrid Event fired when any of the columns checkbox selection changes. */
  onColumnsChanged?: (e: Event, args: any) => void;
}
