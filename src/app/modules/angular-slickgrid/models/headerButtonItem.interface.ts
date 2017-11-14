export interface HeaderButtonItem {
  command?: string;             // A command identifier to be passed to the onCommand event handlers.
  cssClass?: string;            // CSS class to add to the button.
  handler?: (e: Event) => void; // Button click handler.
  image?: string;               // Relative button image path.
  showOnHover?: boolean;        // Only show the button on hover.
  tooltip?: string;             // Button tooltip.
}
