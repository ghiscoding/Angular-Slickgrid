export interface HeaderMenu {
  title?: string;         // Menu item text.
  disabled?: boolean;     // Whether the item is disabled.
  tooltip?: string;       // Item tooltip.
  command?: string;          // A command identifier to be passed to the onCommand event handlers.
  iconCssClass?: string;  // A CSS class to be added to the menu item icon.
  iconImage?: string;     // A url to the icon image.
}
