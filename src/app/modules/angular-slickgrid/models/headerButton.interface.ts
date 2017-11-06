export interface HeaderButton {
  cssClass?: string;            // CSS class to add to the button.
  image?: string;               // Relative button image path.
  tooltip?: string;             // Button tooltip.
  showOnHover?: boolean;        // Only show the button on hover.
  handler?: (e: Event) => void; // Button click handler.
  command?: string;             // A command identifier to be passed to the onCommand event handlers.
}
