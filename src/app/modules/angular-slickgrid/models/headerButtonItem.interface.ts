export interface HeaderButtonItem {
  /** A command identifier to be passed to the onCommand event handlers. */
  command?: string;

  /** CSS class to add to the button. */
  cssClass?: string;

  /** Button click handler. */
  handler?: (e: Event) => void;

  /** Relative button image path. */
  image?: string;

  /** Only show the button on hover. */
  showOnHover?: boolean;

  /** Button tooltip. */
  tooltip?: string;
}
